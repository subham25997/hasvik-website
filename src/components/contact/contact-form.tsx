"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { getQuoteCategories, searchQuoteCities, submitContact } from "@/app/actions/contact";
import type { DemoCategory } from "@/app/actions/demo";
import { contactFieldsSchema, type ContactFields } from "@/lib/contact-schema";
import { whatsappLink } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { buttonVariants } from "@/components/ui/button";
import { WhatsappGlyph } from "@/components/layout/whatsapp-fab";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

function isStaleServerActionError(error: unknown) {
  return error instanceof Error && (error.name === "UnrecognizedActionError" || error.message.includes("was not found on the server"));
}

type Props = {
  strings: Dictionary["contact"]["form"];
  validation: Dictionary["contact"]["validation"];
  privacyHref: string;
  techOptions: Option[];
  nonTechOptions: Option[];
  defaultService?: string;
};

const fieldOrder = ["leadType", "name", "phone", "email", "service", "categoryId", "city", "message"] as const;
const fieldIds: Record<(typeof fieldOrder)[number], string> = {
  leadType: "cf-lead-type",
  name: "cf-name",
  phone: "cf-phone",
  email: "cf-email",
  service: "cf-service",
  categoryId: "cf-category",
  city: "cf-city",
  message: "cf-message",
};
const isIndividualCategory = (category: DemoCategory) => /^individuals?$/i.test(category.name.trim());

function Req({ label }: { label: string }) {
  return (
    <span className="text-red-700 dark:text-red-300">
      <span aria-hidden="true"> *</span>
      <span className="sr-only"> ({label})</span>
    </span>
  );
}

export function ContactForm({ strings, validation, privacyHref, techOptions, nonTechOptions, defaultService = "" }: Props) {
  const schema = useMemo(() => contactFieldsSchema(validation), [validation]);
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [categories, setCategories] = useState<DemoCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState<"configuration" | "crm" | "refresh" | null>(null);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [cityError, setCityError] = useState<"configuration" | "crm" | "refresh" | null>(null);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryFocusKey, setSummaryFocusKey] = useState(0);

  useEffect(() => {
    if (summaryFocusKey) summaryRef.current?.focus();
  }, [summaryFocusKey]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    shouldFocusError: false, // we manage focus: error summary (2+ errors) or the single invalid field
    defaultValues: {
      leadType: "business",
      name: "",
      phone: "",
      email: "",
      service: defaultService,
      budget: "",
      categoryId: "",
      city: "",
      message: "",
      website: "",
    },
  });
  const values = useWatch({ control });
  const allOptions = [...techOptions, ...nonTechOptions];
  const leadType = useWatch({ control, name: "leadType" });
  const categoryId = useWatch({ control, name: "categoryId" });
  const city = useWatch({ control, name: "city" });
  const categoryOptions = useMemo(
    () => categories.filter((category) => isIndividualCategory(category) === (leadType === "individual")),
    [categories, leadType],
  );
  const loadCategories = useCallback(async () => {
    try {
      const result = await getQuoteCategories();
      if (result.ok) {
        setCategories(result.categories);
        setCategoryError(null);
      } else {
        setCategoryError(result.error === "not_configured" ? "configuration" : "crm");
      }
    } catch (error) {
      if (isStaleServerActionError(error)) {
        setCategoryError("refresh");
      } else {
        console.error("[contact] Could not load CRM categories:", error);
        setCategoryError("crm");
      }
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const fetchCategories = async () => {
      try {
        const result = await getQuoteCategories();
        if (!active) return;
        if (result.ok) {
          setCategories(result.categories);
          setCategoryError(null);
        } else {
          setCategoryError(result.error === "not_configured" ? "configuration" : "crm");
        }
      } catch (error) {
        if (active && isStaleServerActionError(error)) {
          setCategoryError("refresh");
        } else if (active) {
          console.error("[contact] Could not load CRM categories:", error);
          setCategoryError("crm");
        }
      } finally {
        if (active) setCategoriesLoading(false);
      }
    };
    void fetchCategories();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (categoriesLoading || !categories.length) return;
    const currentAvailable = categoryOptions.some((category) => category.id === categoryId);
    if (currentAvailable) return;
    setValue("categoryId", categoryOptions[0]?.id ?? "", { shouldValidate: true });
  }, [categories, categoriesLoading, categoryId, categoryOptions, setValue]);

  useEffect(() => {
    const query = city.trim();
    if (query.length < 2) return;

    let active = true;
    const timer = setTimeout(async () => {
      setCitiesLoading(true);
      setCityError(null);
      try {
        const result = await searchQuoteCities(query);
        if (!active) return;
        if (result.ok) {
          setCityOptions(result.cities);
        } else {
          setCityError(result.error === "not_configured" ? "configuration" : "crm");
        }
      } catch (error) {
        if (active && isStaleServerActionError(error)) {
          setCityError("refresh");
        } else if (active) {
          console.error("[contact] Could not load matching CRM cities:", error);
          setCityError("crm");
        }
      } finally {
        if (active) setCitiesLoading(false);
      }
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [city]);

  const waText = [
    "Hello HASVIK,",
    values.leadType && `Enquiry type: ${values.leadType === "individual" ? strings.individual : strings.business}`,
    values.name && `Name: ${values.name}`,
    values.phone && `Phone: ${values.phone}`,
    values.email && `Email: ${values.email}`,
    values.service && `Service: ${allOptions.find((o) => o.value === values.service)?.label ?? values.service}`,
    values.budget && `Budget: ${values.budget}`,
    categoryOptions.find((category) => category.id === values.categoryId)?.name &&
      `Category: ${categoryOptions.find((category) => category.id === values.categoryId)?.name}`,
    values.city && `City: ${values.city}`,
    values.message,
  ]
    .filter(Boolean)
    .join("\n");

  const onValid = (data: ContactFields) => {
    setShowSummary(false);
    startTransition(async () => {
      try {
        const res = await submitContact({ ...data, startedAt: startedAt.current });
        if (res.ok) {
          setSent(true);
          reset();
          toast.success(strings.success);
          return;
        }
        if (res.error === "validation" && res.fields) {
          for (const f of res.fields)
            if ((fieldOrder as readonly string[]).includes(f))
              setError(f as (typeof fieldOrder)[number], { message: validation[f as keyof typeof validation] });
        }
        toast.error(
          res.error === "rate_limited" ? strings.rateLimited : res.error === "crm_conflict" ? strings.crmConflict : strings.error,
        );
      } catch (error) {
        if (isStaleServerActionError(error)) {
          toast.error(strings.actionOutdated, {
            action: { label: strings.refreshPage, onClick: () => window.location.reload() },
          });
        } else {
          console.error("[contact] Could not submit quote request:", error);
          toast.error(strings.error);
        }
      }
    });
  };

  const onInvalid = (errs: FieldErrors<ContactFields>) => {
    const count = fieldOrder.filter((f) => errs[f]).length;
    if (count > 1) {
      setShowSummary(true);
      setSummaryFocusKey((k) => k + 1); // focus moves in the effect below, after the summary renders
    } else {
      setShowSummary(false);
      const first = fieldOrder.find((f) => errs[f]);
      if (first) {
        const field = document.getElementById(fieldIds[first]);
        const target = field?.matches("input, select, textarea, button") ? field : field?.querySelector("input, select, textarea, button");
        if (target instanceof HTMLElement) target.focus();
      }
    }
  };

  const input =
    "block w-full min-h-12 rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/70 hover:border-brand-600/40 focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-600/15 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/15 dark:aria-[invalid=true]:border-red-400";
  const label = "mb-1.5 block text-sm font-semibold text-heading";
  const errorCls = "mt-1.5 text-sm font-medium text-red-700 dark:text-red-300";
  const leadTypeField = register("leadType");
  const cityField = register("city");

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-xl2 border border-accent/40 bg-eyebrow p-10 text-center">
        <CheckCircle2 className="size-14 text-accent-ink dark:text-accent" aria-hidden="true" />
        <p className="text-lg font-semibold text-heading">{strings.success}</p>
        <button type="button" onClick={() => setSent(false)} className={buttonVariants({ variant: "outline", size: "sm" })}>
          {strings.title}
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => void handleSubmit(onValid, onInvalid)(e)}
      onFocusCapture={() => {
        // First interaction time, used by the server-side time trap.
        if (!startedAt.current) startedAt.current = Date.now();
      }}
      className="flex flex-col gap-5"
    >
      {showSummary ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-400/40 dark:bg-red-950/40 dark:text-red-200"
        >
          <p className="mb-2 font-semibold">{strings.errorSummary}</p>
          <ul className="list-inside list-disc">
            {fieldOrder
              .filter((f) => errors[f])
              .map((f) => (
                <li key={f}>
                  <a href={`#${fieldIds[f]}`} className="underline">
                    {errors[f]?.message}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <fieldset id={fieldIds.leadType} aria-invalid={!!errors.leadType}>
        <legend className={label}>
          {strings.leadType}
          <Req label={strings.required} />
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(["business", "individual"] as const).map((type) => (
            <label
              key={type}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors",
                leadType === type
                  ? "border-accent bg-eyebrow text-heading"
                  : "border-border bg-background text-muted-foreground hover:border-accent/50",
              )}
            >
              <input
                type="radio"
                value={type}
                className="accent-accent-ink"
                {...leadTypeField}
                onChange={(event) => {
                  void leadTypeField.onChange(event);
                  setValue("categoryId", "", { shouldValidate: true });
                }}
              />
              {type === "business" ? strings.business : strings.individual}
            </label>
          ))}
        </div>
        {errors.leadType ? <p className={errorCls}>{errors.leadType.message}</p> : null}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            {leadType === "business" ? strings.businessName : strings.name}
            <Req label={strings.required} />
          </label>
          <input
            id="cf-name"
            autoComplete="name"
            className={input}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="cf-name-err" className={errorCls}>
              {errors.name.message}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>
            {strings.phone}
            <Req label={strings.required} />
          </label>
          <input
            id="cf-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={input}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cf-phone-err" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="cf-phone-err" className={errorCls}>
              {errors.phone.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={label}>
          {strings.email}
        </label>
        <input
          id="cf-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className={input}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="cf-email-err" className={errorCls}>
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-service" className={label}>
            {strings.service}
            <Req label={strings.required} />
          </label>
          <select
            id="cf-service"
            className={cn(input, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235e6c82' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "cf-service-err" : undefined}
            {...register("service")}
          >
            <option value="">{strings.servicePlaceholder}</option>
            <optgroup label={strings.serviceTech}>
              {techOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </optgroup>
            <optgroup label={strings.serviceNonTech}>
              {nonTechOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
              <option value="other">{strings.serviceOther}</option>
            </optgroup>
          </select>
          {errors.service ? (
            <p id="cf-service-err" className={errorCls}>
              {errors.service.message}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cf-budget" className={label}>
            {strings.budget}
          </label>
          <select
            id="cf-budget"
            className={cn(input, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235e6c82' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
            {...register("budget")}
          >
            <option value="">{strings.budgetPlaceholder}</option>
            {strings.budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-category" className={label}>
            {strings.category}
            <Req label={strings.required} />
          </label>
          <select
            id="cf-category"
            className={cn(input, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235e6c82' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
            disabled={categoriesLoading}
            aria-invalid={!!errors.categoryId}
            aria-describedby={errors.categoryId ? "cf-category-err" : undefined}
            {...register("categoryId")}
          >
            <option value="">
              {categoriesLoading ? strings.loadingCategories : categoryError ? strings.categoriesUnavailable : strings.categoryPlaceholder}
            </option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId ? (
            <p id="cf-category-err" className={errorCls}>
              {errors.categoryId.message}
            </p>
          ) : null}
          {categoryError ? (
            <p role="status" className="mt-1.5 text-sm text-muted-foreground">
              {categoryError === "configuration"
                ? strings.crmUnavailable
                : categoryError === "refresh"
                  ? strings.actionOutdated
                  : strings.categoryLoadError}{" "}
              {categoryError === "crm" || categoryError === "refresh" ? (
                <button
                  type="button"
                  className="font-semibold underline underline-offset-2"
                  onClick={() => {
                    if (categoryError === "refresh") {
                      window.location.reload();
                    } else {
                      setCategoriesLoading(true);
                      void loadCategories();
                    }
                  }}
                >
                  {categoryError === "refresh" ? strings.refreshPage : strings.retry}
                </button>
              ) : null}
            </p>
          ) : null}
          {!categoriesLoading && !categoryError && !categoryOptions.length ? (
            <p className="mt-1.5 text-sm text-muted-foreground">
              {leadType === "individual" ? strings.noIndividualCategory : strings.noBusinessCategories}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cf-city" className={label}>
            {strings.city}
          </label>
          <div className="relative">
            <input
              id="cf-city"
              autoComplete="address-level2"
              className={input}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={cityMenuOpen}
              aria-controls="cf-city-options"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "cf-city-err" : undefined}
              aria-activedescendant={cityMenuOpen && cityOptions[activeCityIndex] ? `cf-city-option-${activeCityIndex}` : undefined}
              placeholder={strings.cityPlaceholder}
              {...cityField}
              onChange={(event) => {
                void cityField.onChange(event);
                setCityOptions([]);
                setCityError(null);
                setActiveCityIndex(0);
                setCityMenuOpen(true);
              }}
              onFocus={() => setCityMenuOpen(true)}
              onBlur={() => window.setTimeout(() => setCityMenuOpen(false), 120)}
              onKeyDown={(event) => {
                if (!cityMenuOpen || !cityOptions.length) {
                  if (event.key === "Escape") setCityMenuOpen(false);
                  return;
                }
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveCityIndex((index) => (index + 1) % cityOptions.length);
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveCityIndex((index) => (index - 1 + cityOptions.length) % cityOptions.length);
                } else if (event.key === "Enter") {
                  event.preventDefault();
                  const selectedCity = cityOptions[activeCityIndex];
                  if (selectedCity) {
                    setValue("city", selectedCity, { shouldValidate: true });
                    setCityMenuOpen(false);
                  }
                } else if (event.key === "Escape") {
                  setCityMenuOpen(false);
                }
              }}
            />
            {cityMenuOpen && city.trim().length >= 2 ? (
              <div
                id="cf-city-options"
                role="listbox"
                className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-border bg-background p-1 shadow-xl"
              >
                {citiesLoading ? (
                  <p className="px-3 py-2 text-sm text-muted-foreground">{strings.loadingCities}</p>
                ) : cityError ? (
                  <p role="status" className="px-3 py-2 text-sm text-muted-foreground">
                    {cityError === "configuration"
                      ? strings.crmUnavailable
                      : cityError === "refresh"
                        ? strings.actionOutdated
                        : strings.cityLoadError}{" "}
                    {cityError === "refresh" ? (
                      <button type="button" className="font-semibold underline underline-offset-2" onClick={() => window.location.reload()}>
                        {strings.refreshPage}
                      </button>
                    ) : null}
                  </p>
                ) : cityOptions.length ? (
                  cityOptions.map((option, index) => (
                    <button
                      id={`cf-city-option-${index}`}
                      key={option}
                      type="button"
                      role="option"
                      aria-selected={index === activeCityIndex}
                      className={cn(
                        "block min-h-10 w-full rounded-lg px-3 py-2 text-left text-sm text-foreground",
                        index === activeCityIndex ? "bg-eyebrow" : "hover:bg-surface",
                      )}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setValue("city", option, { shouldValidate: true });
                        setCityMenuOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-muted-foreground">{strings.noCitiesFound}</p>
                )}
              </div>
            ) : null}
          </div>
          {cityError && !cityMenuOpen ? (
            <p role="status" className="mt-1.5 text-sm text-muted-foreground">
              {cityError === "configuration"
                ? strings.crmUnavailable
                : cityError === "refresh"
                  ? strings.actionOutdated
                  : strings.cityLoadError}
              {cityError === "refresh" ? (
                <>
                  {" "}
                  <button type="button" className="font-semibold underline underline-offset-2" onClick={() => window.location.reload()}>
                    {strings.refreshPage}
                  </button>
                </>
              ) : null}
            </p>
          ) : null}
          {errors.city ? (
            <p id="cf-city-err" className={errorCls}>
              {errors.city.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>
          {strings.message}
          <Req label={strings.required} />
        </label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder={strings.messagePlaceholder}
          className={cn(input, "resize-y")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : "cf-privacy"}
          {...register("message")}
        />
        {errors.message ? (
          <p id="cf-message-err" className={errorCls}>
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <p id="cf-privacy" className="text-xs text-muted-foreground">
        {strings.privacy}{" "}
        <Link href={privacyHref} className="font-medium text-link underline underline-offset-2">
          {strings.privacyPolicyLink}
        </Link>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} aria-disabled={pending} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
          {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {pending ? strings.sending : strings.submit}
        </button>
        <a
          href={whatsappLink(waText)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-link hover:underline"
        >
          <WhatsappGlyph className="size-4 text-[#1a9e4b]" />
          {strings.whatsappFallback}
        </a>
      </div>
    </form>
  );
}
