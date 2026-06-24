const servelurl = process.env.SERVER_URL;

export const Historybook = async (token, id) => {
  const res = await fetch(`${servelurl}/bookhistory/${id}`,{
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    }
  })
  const data = await res.json();
  return data;
};