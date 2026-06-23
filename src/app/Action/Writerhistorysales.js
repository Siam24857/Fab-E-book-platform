const servelurl = process.env.SERVER_URL;

export const WriterHistorybook = async (token, id) => {
  const res = await fetch(`${servelurl}/writerbookhistory/${id}`,{
    headers:{
      Authorization: token ? `Bearer ${token}` : "",
    }
  })
  const data = await res.json();
  return data;
}; 