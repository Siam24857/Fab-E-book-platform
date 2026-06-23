 
const servelurl = process.env.SERVER_URL
const servelurls = process.env.NEXT_PUBLIC_SERVER_URL;
export const USerget = async(id) =>{
  const res = await fetch(`${servelurl}/readers/${id}`)
  const data = await res.json()
  return data
}

export const allUSerget = async() =>{
  const reses = await fetch(`${servelurl}/alluser`)
  const dataes = await reses.json()
  return dataes
}

export const Userupdate = async(token, id, userdata) =>{
  const reseses = await fetch(`${servelurls}/updateuser/${id}`,{
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
  const datarespons = await fetch(`${servelurls}/updatebook/${id}`,{
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
  const  responsdata = await fetch(`${servelurls}/delteeuser/${id}`,{
     method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
  })
  const  deltedata = await  responsdata.json()
  return deltedata
}

export const bookDelte = async(id) =>{
  const  responsdat = await fetch(`${servelurls}/deltebook/${id}`,{
     method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
  })
  const  deltedat = await  responsdat.json()
  return deltedat
}


export const Historyget = async(token) =>{
  const respons = await fetch(`${servelurl}/historybooks`,{
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    }
  })
  const datas = await respons.json()
  return datas
}
 
