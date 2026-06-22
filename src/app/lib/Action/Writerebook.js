
const servelurl = process.env.SERVER_URL
export const Writerbooks = async(id) =>{
  const res = await fetch(`${servelurl}/writerbook/${id}`)
  const data = await res.json()
  return data
} 