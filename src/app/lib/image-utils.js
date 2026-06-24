export const getSafeImageSrc = (value) => {
  if (typeof value !== "string") return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='900' viewBox='0 0 600 900'%3E%3Crect width='600' height='900' rx='32' fill='%23f3e8df'/%3E%3Cpath d='M180 720h240' stroke='%239b7b63' stroke-width='16' stroke-linecap='round'/%3E%3Cpath d='M220 620h160' stroke='%239b7b63' stroke-width='14' stroke-linecap='round'/%3E%3Cpath d='M190 500c40-80 180-120 240-20' stroke='%239b7b63' stroke-width='16' stroke-linecap='round'/%3E%3Ccircle cx='300' cy='260' r='90' fill='%23d7bba'/%3E%3C/svg%3E";

  const trimmed = value.trim();
  if (!trimmed) return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='900' viewBox='0 0 600 900'%3E%3Crect width='600' height='900' rx='32' fill='%23f3e8df'/%3E%3Cpath d='M180 720h240' stroke='%239b7b63' stroke-width='16' stroke-linecap='round'/%3E%3Cpath d='M220 620h160' stroke='%239b7b63' stroke-width='14' stroke-linecap='round'/%3E%3Cpath d='M190 500c40-80 180-120 240-20' stroke='%239b7b63' stroke-width='16' stroke-linecap='round'/%3E%3Ccircle cx='300' cy='260' r='90' fill='%23d7bba'/%3E%3C/svg%3E";

  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith("/")) {
    return trimmed;
  }

  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='900' viewBox='0 0 600 900'%3E%3Crect width='600' height='900' rx='32' fill='%23f3e8df'/%3E%3Cpath d='M180 720h240' stroke='%239b7b63' stroke-width='16' stroke-linecap='round'/%3E%3Cpath d='M220 620h160' stroke='%239b7b63' stroke-width='14' stroke-linecap='round'/%3E%3Cpath d='M190 500c40-80 180-120 240-20' stroke='%239b7b63' stroke-width='16' stroke-linecap='round'/%3E%3Ccircle cx='300' cy='260' r='90' fill='%23d7bba'/%3E%3C/svg%3E";
};

export const getSafeBookTitle = (book, fallback = "Untitled Book") => {
  const title = book?.title || book?.booktitle || book?.name || "";
  return title || fallback;
};

export const getSafeBookAuthor = (book, fallback = "Unknown Author") => {
  const author = book?.writer || book?.author || book?.writtenBy || "";
  return author || fallback;
};

export const getSafeBookPrice = (book) => {
  const price = Number(book?.price ?? 0);
  return Number.isFinite(price) ? price : 0;
};
