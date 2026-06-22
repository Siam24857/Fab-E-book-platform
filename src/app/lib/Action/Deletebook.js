const servelurls = process.env.NEXT_PUBLIC_SERVER_URL;

export const BookDelete = async (id) => {
  const res = await fetch(`${servelurls}/bookdeleted/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
 
 