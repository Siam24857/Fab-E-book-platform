 
const servelurl = process.env.SERVER_URL
export const bookdettails = async(id) =>{
  const res = await fetch(`${servelurl}/bookdettails/${id}`)
  const data = await res.json()
  return data
}