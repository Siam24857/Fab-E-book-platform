const servelurl = process.env.SERVER_URL;

export const BookDelete = async (id) => {
  const res = await fetch(`${servelurl}/bookdeleted/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};