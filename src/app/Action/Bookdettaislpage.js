import { getBackendUrl } from "../lib/backend-url";

const servelurl = getBackendUrl();

export const bookdettails = async(id) =>{
  const res = await fetch(`${servelurl}/bookdettails/${id}`)
  const data = await res.json()
  return data
}