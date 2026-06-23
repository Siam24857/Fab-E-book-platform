
const serverUrl = process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;

const fetchBooks = async (path) => {
  if (!serverUrl) {
    console.warn("SERVER_URL is not configured; returning empty book data.");
    return [];
  }

  try {
    const res = await fetch(`${serverUrl}${path}`, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to fetch ${path}: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    return [];
  }
};

export const allbookdata = async () => fetchBooks("/allbooks");

export const Somebookdata = async () => fetchBooks("/somebooks");