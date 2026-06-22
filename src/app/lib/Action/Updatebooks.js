const servelurl = process.env.SERVER_URL;

export const  Updatekbooks = async (id, Bookdata) => {
  const res = await fetch(`${servelurl}/Bookdataupdate/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Bookdata),
  });

  const data = await res.json();
  return data;
};

