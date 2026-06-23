const servelurls = process.env.NEXT_PUBLIC_SERVER_URL;

export const  Updatekbooks = async (token, id, Bookdata) => {
  const res = await fetch(`${servelurls}/Bookdataupdate/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(Bookdata),
  });

  const data = await res.json();
  return data;
};

