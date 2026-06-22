const servelurl = process.env.SERVER_URL;

export const WriterHistorybook = async (id) => {
  const res = await fetch(`${servelurl}/writerbookhistory/${id}`)
  const data = await res.json();
  return data;
}; 