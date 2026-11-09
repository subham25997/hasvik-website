export type CrmError = "not_configured" | "crm" | "conflict";
export type CrmCategory = { id: string; name: string };
export type CrmAuth = { apiUrl: string; token: string };
export type CrmResult<T> = { ok: true; value: T } | { ok: false; error: CrmError };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function findList(value: unknown, keys: string[], depth = 0): unknown[] | null {
  if (Array.isArray(value)) return value;
  if (!isRecord(value) || depth >= 3) return null;

  for (const key of keys) {
    if (key in value) {
      const result = findList(value[key], keys, depth + 1);
      if (result) return result;
    }
  }
  return null;
}

function parseCategories(value: unknown): CrmCategory[] | null {
  const list = findList(value, ["data", "categories", "items", "results"]);
  if (!list) return null;

  const categories: CrmCategory[] = [];
  for (const item of list) {
    if (!isRecord(item)) return null;
    const id = typeof item.id === "string" ? item.id : typeof item._id === "string" ? item._id : "";
    const name = typeof item.name === "string" ? item.name.trim() : "";
    if (!id || !name) return null;
    if (item.isActive !== false) categories.push({ id, name });
  }
  return categories;
}

function parseCities(value: unknown): string[] | null {
  const list = findList(value, ["data", "cities", "items", "results"]);
  if (!list) return null;

  const cities: string[] = [];
  for (const item of list) {
    const city =
      typeof item === "string"
        ? item.trim()
        : isRecord(item)
          ? (typeof item.city === "string" ? item.city : typeof item.name === "string" ? item.name : "").trim()
          : "";
    if (!city) return null;
    if (!cities.some((existing) => existing.toLocaleLowerCase() === city.toLocaleLowerCase())) cities.push(city);
  }
  return cities;
}

export async function authenticateCrm(): Promise<CrmResult<CrmAuth>> {
  const configuredApiUrl = process.env.CRM_API_URL?.trim();
  const email = process.env.CRM_API_EMAIL;
  const password = process.env.CRM_API_PASSWORD;
  if (!configuredApiUrl || !email || !password) return { ok: false, error: "not_configured" };

  let apiUrl: string;
  try {
    const url = new URL(configuredApiUrl);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
      throw new Error("CRM_API_URL must be an HTTP(S) base URL without credentials, query, or fragment.");
    }
    apiUrl = configuredApiUrl.replace(/\/+$/, "");
  } catch (error) {
    console.error("[crm] CRM_API_URL is invalid:", error);
    return { ok: false, error: "not_configured" };
  }

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[crm] Login request failed:", error);
    return { ok: false, error: "crm" };
  }

  if (!response.ok) {
    console.error(`[crm] Login failed (HTTP ${response.status}).`);
    return { ok: false, error: response.status === 401 ? "not_configured" : "crm" };
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    console.error("[crm] Login returned invalid JSON:", error);
    return { ok: false, error: "crm" };
  }

  const root = isRecord(payload) ? payload : null;
  const data = root && isRecord(root.data) ? root.data : null;
  const token = root?.accessToken ?? root?.access_token ?? data?.accessToken ?? data?.access_token;
  if (typeof token !== "string" || !token) {
    console.error("[crm] Login response did not contain an access token.");
    return { ok: false, error: "crm" };
  }

  return { ok: true, value: { apiUrl, token } };
}

export async function getCrmCategories(auth: CrmAuth): Promise<CrmResult<CrmCategory[]>> {
  let response: Response;
  try {
    response = await fetch(`${auth.apiUrl}/api/categories?isActive=true&page=1&limit=100`, {
      headers: { Authorization: `Bearer ${auth.token}` },
      cache: "no-store",
    });
  } catch (error) {
    console.error("[crm] Categories request failed:", error);
    return { ok: false, error: "crm" };
  }

  if (!response.ok) {
    console.error(`[crm] Categories request failed (HTTP ${response.status}).`);
    return { ok: false, error: response.status === 401 ? "not_configured" : "crm" };
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    console.error("[crm] Categories returned invalid JSON:", error);
    return { ok: false, error: "crm" };
  }

  const categories = parseCategories(payload);
  if (!categories) {
    console.error("[crm] Categories response did not match the expected shape.");
    return { ok: false, error: "crm" };
  }
  return { ok: true, value: categories };
}

export async function searchCrmCities(auth: CrmAuth, search: string): Promise<CrmResult<string[]>> {
  let response: Response;
  try {
    response = await fetch(`${auth.apiUrl}/api/businesses/city/autocomplete?search=${encodeURIComponent(search)}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
      cache: "no-store",
    });
  } catch (error) {
    console.error("[crm] Cities request failed:", error);
    return { ok: false, error: "crm" };
  }

  if (!response.ok) {
    console.error(`[crm] Cities request failed (HTTP ${response.status}).`);
    return { ok: false, error: response.status === 401 ? "not_configured" : "crm" };
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    console.error("[crm] Cities returned invalid JSON:", error);
    return { ok: false, error: "crm" };
  }

  const cities = parseCities(payload);
  if (!cities) {
    console.error("[crm] Cities response did not match the expected shape.");
    return { ok: false, error: "crm" };
  }
  return { ok: true, value: cities };
}

export async function createCrmBusiness(auth: CrmAuth, body: Record<string, unknown>): Promise<CrmResult<null>> {
  let response: Response;
  try {
    response = await fetch(`${auth.apiUrl}/api/businesses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[crm] Business submission request failed:", error);
    return { ok: false, error: "crm" };
  }

  if (!response.ok) {
    console.error(`[crm] Business submission failed (HTTP ${response.status}).`);
    if (response.status === 409) return { ok: false, error: "conflict" };
    return { ok: false, error: response.status === 401 ? "not_configured" : "crm" };
  }
  return { ok: true, value: null };
}
