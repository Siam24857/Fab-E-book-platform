

const servelurl = process.env.SERVER_URL

export const allbookdata = async()=>{
     const res = await fetch(`${servelurl}/allbooks`)
     const data = await res.json()
     return data
}