const serverUrl = process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;
const publicServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;

const fetchJson = async (path, options = {}) => {
  if (!serverUrl) {
    console.warn(`No server URL configured for ${path}; returning empty response.`);
    return [];
  }

  try {
    const res = await fetch(`${serverUrl}${path}`, {
      cache: "no-store",
      ...options,
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${path}: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    return [];
  }
};

export const USerget = async (id) => fetchJson(`/readers/${id}`);

export const allUSerget = async () => fetchJson(`/alluser`);

export const Userupdate = async(token, id, userdata) =>{
  if (!publicServerUrl) {
    return { success: false, message: "Server URL not configured." };
  }

  const reseses = await fetch(`${publicServerUrl}/updateuser/${id}`,{
     method: "PATCH",
        headers: {
          "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(userdata),
  })
  const dataeses = await reseses.json()
  return dataeses
}

export const Bookuipdate = async(token, id, status) =>{
  if (!publicServerUrl) {
    return { success: false, message: "Server URL not configured." };
  }

  const datarespons = await fetch(`${publicServerUrl}/updatebook/${id}`,{
     method: "PATCH",
        headers: {
          "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({status: status})
  })
  const dataese = await datarespons.json()
  return dataese
}

export const UserDelte = async(id) =>{
  if (!publicServerUrl) {
    return { success: false, message: "Server URL not configured." };
  }

  const  responsdata = await fetch(`${publicServerUrl}/delteeuser/${id}`,{
     method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
  })
  const  deltedata = await  responsdata.json()
  return deltedata
}

export const bookDelte = async(id) =>{
  if (!publicServerUrl) {
    return { success: false, message: "Server URL not configured." };
  }

  const  responsdat = await fetch(`${publicServerUrl}/deltebook/${id}`,{
     method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
  })
  const  deltedat = await  responsdat.json()
  return deltedat
}


export const Historyget = async(token) =>{
  if (!serverUrl) {
    return [];
  }

  const respons = await fetch(`${serverUrl}/historybooks`,{
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    }
  })
  const datas = await respons.json()
  return datas
}
 
