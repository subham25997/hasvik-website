"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "radix-ui";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { getDemoCategories, searchDemoCities, submitDemoRequest, type DemoCategory } from "@/app/actions/demo";
import { demoFieldsSchema, type DemoFields } from "@/lib/demo-schema";
import type { Dictionary } from "@/i18n/dictionaries";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  strings: Dictionary["hero"]["demoForm"];
  triggerLabel: string;
  triggerClassName?: string;
  privacyHref: string;
};

const isIndividualCategory = (category: DemoCategory) => /^individuals?$/i.test(category.name.trim());

export function BookDemo({ strings, triggerLabel, triggerClassName, privacyHref }: Props) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<DemoCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoryError, setCategoryError] = useState<"configuration" | "crm" | null>(null);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [cityError, setCityError] = useState<"configuration" | "crm" | null>(null);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const [submitError, setSubmitError] = useState<"configuration" | "crm" | "rate_limited" | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const schema = useMemo(() => demoFieldsSchema(strings.validation), [strings.validation]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DemoFields>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      leadType: "business",
      name: "",
      phone: "",
      email: "",
      categoryId: "",
      city: "",
      description: "",
      website: "",
    },
  });
  const leadType = useWatch({ control, name: "leadType" });
  const categoryId = useWatch({ control, name: "categoryId" });
  const city = useWatch({ control, name: "city" });
  const options = categories.filter((category) => isIndividualCategory(category) === (leadType === "individual"));
  const inputClass =
    "block min-h-11 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-base text-foreground shadow-sm placeholder:text-muted-foreground/70 focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-600/15 aria-[invalid=true]:border-red-600 sm:text-sm";
  const labelClass = "mb-1.5 block text-sm font-semibold text-heading";
  const errorClass = "mt-1 text-xs font-medium text-red-700 dark:text-red-300";

  const loadCategories = async () => {
    setCategoriesLoading(true);
    setCategoryError(null);
    setSubmitError(null);
    try {
      const result = await getDemoCategories();
      if (result.ok) {
        setCategories(result.categories);
      } else {
        setCategoryError(result.error === "not_configured" ? "configuration" : "crm");
      }
    } catch (error) {
      console.error("[demo] Could not load categories:", error);
      setCategoryError("crm");
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    if (categoriesLoading || !categories.length) return;
    const currentAvailable = options.some((category) => category.id === categoryId);
    if (currentAvailable) return;
    const nextCategory = options[0]?.id ?? "";
    if (categoryId !== nextCategory) setValue("categoryId", nextCategory, { shouldValidate: true });
  }, [categories, categoriesLoading, categoryId, options, setValue]);

  useEffect(() => {
    const query = city.trim();
    if (!open || query.length < 2) return;

    let active = true;
    const timer = setTimeout(async () => {
      setCitiesLoading(true);
      setCityError(null);
      try {
        const result = await searchDemoCities(query);
        if (!active) return;
        if (result.ok) {
          setCityOptions(result.cities);
        } else {
          setCityError(result.error === "not_configured" ? "configuration" : "crm");
        }
      } catch (error) {
        console.error("[demo] Could not load matching cities:", error);
        if (active) setCityError("crm");
      } finally {
        if (active) setCitiesLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [city, open]);

  const onSubmit = (data: DemoFields) => {
    setSubmitError(null);
    startTransition(async () => {
      try {
        const result = await submitDemoRequest({ ...data, startedAt: startedAt.current });
        if (result.ok) {
          setSent(true);
          reset();
          return;
        }
        if (result.error === "not_configured") setSubmitError("configuration");
        else if (result.error === "rate_limited") setSubmitError("rate_limited");
        else setSubmitError("crm");
      } catch (error) {
        console.error("[demo] Could not submit demo request:", error);
        setSubmitError("crm");
      }
    });
  };

  const onOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      startedAt.current = Date.now();
      setSent(false);
      setSubmitError(null);
      setCityOptions([]);
      setCityError(null);
      setCityMenuOpen(false);
      reset();
      void loadCategories();
    }
    setOpen(nextOpen);
  };

  const leadTypeField = register("leadType");
  const cityField = register("city");
  const errorMessage =
    submitError === "configuration"
      ? strings.configurationError
      : submitError === "rate_limited"
        ? strings.rateLimited
        : submitError === "crm"
          ? strings.submitError
          : null;
  const categoryMessage =
    categoryError === "configuration" ? strings.configurationError : categoryError === "crm" ? strings.categoryLoadError : null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "primary", size: "sm" }),
            "shrink-0 rounded-full bg-accent-500 px-4 text-white shadow-[0_8px_24px_-8px_rgb(91_177_64/0.55)] hover:bg-accent-teal",
            triggerClassName,
          )}
        >
          {triggerLabel}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-[60] bg-brand-950/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[60] flex h-[min(90dvh,48rem)] w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-border bg-background text-foreground shadow-2xl outline-none">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-background px-5 py-5 sm:px-7">
            <div>
              <Dialog.Title className="text-xl font-bold text-heading sm:text-2xl">{strings.title}</Dialog.Title>
              <Dialog.Description className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {strings.description}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={strings.close}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          {sent ? (
            <div role="status" className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-y-auto p-8 text-center">
              <CheckCircle2 className="size-12 text-accent-ink dark:text-accent" aria-hidden="true" />
              <h3 className="text-lg font-bold text-heading">{strings.successTitle}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{strings.successDescription}</p>
              <Dialog.Close className={buttonVariants({ variant: "outline", size: "sm" })}>{strings.successClose}</Dialog.Close>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              className="flex min-h-0 flex-1 flex-col overflow-hidden"
            >
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="demo-website">Website</label>
                <input id="demo-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-7">
                {categoryMessage ? (
                  <div
                    role={categoryError === "configuration" ? "status" : "alert"}
                    className="rounded-xl border border-border bg-surface p-3 text-sm text-muted-foreground"
                  >
                    <p>{categoryMessage}</p>
                    {categoryError === "crm" ? (
                      <button
                        type="button"
                        onClick={() => void loadCategories()}
                        className="mt-2 font-semibold underline underline-offset-2"
                      >
                        {strings.retry}
                      </button>
                    ) : null}
                  </div>
                ) : null}

                {errorMessage ? (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-400/40 dark:bg-red-950/40 dark:text-red-200"
                  >
                    {errorMessage}
                  </p>
                ) : null}

                <fieldset>
                  <legend className={labelClass}>{strings.leadType}</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(["business", "individual"] as const).map((type) => (
                      <label
                        key={type}
                        className={cn(
                          "flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3.5 text-sm font-medium transition-colors",
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
                            setValue("categoryId", "");
                          }}
                        />
                        {type === "business" ? strings.business : strings.individual}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="demo-name" className={labelClass}>
                      {leadType === "business" ? strings.businessName : strings.individualName}
                    </label>
                    <input
                      id="demo-name"
                      autoComplete="name"
                      className={inputClass}
                      aria-invalid={!!errors.name}
                      aria-required="true"
                      {...register("name")}
                    />
                    {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="demo-phone" className={labelClass}>
                      {strings.phone}
                    </label>
                    <input
                      id="demo-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className={inputClass}
                      aria-invalid={!!errors.phone}
                      aria-required="true"
                      {...register("phone")}
                    />
                    {errors.phone ? <p className={errorClass}>{errors.phone.message}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="demo-email" className={labelClass}>
                      {strings.email}
                    </label>
                    <input
                      id="demo-email"
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="demo-category" className={labelClass}>
                      {strings.category}
                    </label>
                    <select
                      id="demo-category"
                      className={inputClass}
                      disabled={categoriesLoading}
                      aria-invalid={!!errors.categoryId}
                      aria-required="true"
                      {...register("categoryId")}
                    >
                      <option value="">
                        {categoriesLoading
                          ? strings.loadingCategories
                          : categoryError || !options.length
                            ? strings.categoryUnavailable
                            : strings.chooseCategory}
                      </option>
                      {options.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.categoryId ? <p className={errorClass}>{errors.categoryId.message}</p> : null}
                    {!categoriesLoading && !categoryError && !options.length ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {leadType === "individual" ? strings.noIndividualCategory : strings.noBusinessCategories}
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="demo-city" className={labelClass}>
                      {strings.city}
                    </label>
                    <div className="relative">
                      <input
                        id="demo-city"
                        autoComplete="address-level2"
                        className={inputClass}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={cityMenuOpen}
                        aria-controls="demo-city-options"
                        aria-activedescendant={
                          cityMenuOpen && cityOptions[activeCityIndex] ? `demo-city-option-${activeCityIndex}` : undefined
                        }
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
                        onBlur={() => {
                          window.setTimeout(() => setCityMenuOpen(false), 120);
                        }}
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
                          id="demo-city-options"
                          role="listbox"
                          className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-border bg-background p-1 shadow-xl"
                        >
                          {citiesLoading ? (
                            <p className="px-3 py-2 text-sm text-muted-foreground">{strings.loadingCities}</p>
                          ) : cityError ? (
                            <p role="status" className="px-3 py-2 text-sm text-muted-foreground">
                              {cityError === "configuration" ? strings.configurationError : strings.cityLoadError}
                            </p>
                          ) : cityOptions.length ? (
                            cityOptions.map((option, index) => (
                              <button
                                id={`demo-city-option-${index}`}
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
                      <p role="status" className="mt-1 text-xs text-muted-foreground">
                        {cityError === "configuration" ? strings.configurationError : strings.cityLoadError}
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="demo-description" className={labelClass}>
                      {strings.notes}
                    </label>
                    <textarea
                      id="demo-description"
                      rows={3}
                      placeholder={strings.notesPlaceholder}
                      className={cn(inputClass, "min-h-24 resize-y")}
                      {...register("description")}
                    />
                  </div>
                </div>
              </div>
              <div className="shrink-0 space-y-3 border-t border-border bg-background px-5 py-4 sm:px-7">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {strings.privacy}{" "}
                  <Link href={privacyHref} className="font-medium text-link underline underline-offset-2">
                    {strings.privacyPolicyLink}
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={pending || categoriesLoading || !!categoryError || !options.length}
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                  {pending ? strings.submitting : strings.submit}
                </button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
