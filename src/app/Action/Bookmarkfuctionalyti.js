const servelurl = process.env.SERVER_URL;

export const  Bookmarkbooks = async (Bookmark) => {
  const res = await fetch(`${servelurl}/bookmark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Bookmark),
  });

  const data = await res.json();
  return data;
};