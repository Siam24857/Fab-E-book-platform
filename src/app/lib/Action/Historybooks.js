const servelurl = process.env.SERVER_URL;

export const Booupdatehistory = async (historydata) => {
  const res = await fetch(`${servelurl}/historybook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(historydata),
  });

  const data = await res.json();
  return data;
};