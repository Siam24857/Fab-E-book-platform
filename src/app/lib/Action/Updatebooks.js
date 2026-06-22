const servelurls = process.env.NEXT_PUBLIC_SERVER_URL;

export const  Updatekbooks = async (id, Bookdata) => {
  const res = await fetch(`${servelurls}/Bookdataupdate/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Bookdata),
  });

  const data = await res.json();
  return data;
};

