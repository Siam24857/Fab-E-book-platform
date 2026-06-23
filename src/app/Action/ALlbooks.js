
const getServerBaseUrls = () => {
  const configured = [process.env.SERVER_URL, process.env.NEXT_PUBLIC_SERVER_URL]
    .filter(Boolean)
    .map((value) => value.replace(/\/$/, ""));

  return [...new Set([...configured, "http://127.0.0.1:5000", "http://localhost:5000"])];
};

const normalizeBooksPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    return Array.isArray(payload.books)
      ? payload.books
      : Array.isArray(payload.data)
        ? payload.data
        : Array.isArray(payload.result)
          ? payload.result
          : [];
  }

  return [];
};

const fetchBooks = async (path) => {
  const candidates = getServerBaseUrls();

  for (const baseUrl of candidates) {
    try {
      const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });

      if (!res.ok) {
        console.warn(`Failed to fetch ${path} from ${baseUrl}: ${res.status}`);
        continue;
      }

      const payload = await res.json();
      const normalized = normalizeBooksPayload(payload);

      if (normalized.length > 0) {
        return normalized;
      }

      return normalized;
    } catch (error) {
      console.warn(`Failed to fetch ${path} from ${baseUrl}:`, error.message || error);
    }
  }

  console.warn(`Could not reach the backend for ${path}; returning empty data.`);
  return [];
};

export const allbookdata = async () => fetchBooks("/allbooks");

export const Somebookdata = async () => fetchBooks("/somebooks");