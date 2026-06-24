const servelurls = process.env.NEXT_PUBLIC_SERVER_URL;

export const BookDelete = async (token, id) => {
  const res = await fetch(`${servelurls}/delteeuser/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
       Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();
  return data;
};
 
 