const servelurl = process.env.SERVER_URL;

export const Writerbooks = async (token, id) => {
  const res = await fetch(`${servelurl}/writerbook/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};