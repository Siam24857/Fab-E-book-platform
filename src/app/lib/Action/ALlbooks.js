

const servelurl = process.env.SERVER_URL

export const allbookdata = async()=>{
     const res = await fetch(`${servelurl}/allbooks`)
     const data = await res.json()
     return data
}

export const Somebookdata = async()=>{
     const respons = await fetch(`${servelurl}/somebooks`)
     const datas = await respons.json()
     return datas
}