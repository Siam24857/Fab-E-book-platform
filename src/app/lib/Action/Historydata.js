const servelurl = process.env.SERVER_URL;

export const Historybook = async (id) => {
  const res = await fetch(`${servelurl}/bookhistory/${id}`)
  const data = await res.json();
  return data;
};