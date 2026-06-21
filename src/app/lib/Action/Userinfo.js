import { headers } from "next/headers";
import { auth } from "../auth";

export const userdata = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};

const servelurl = process.env.SERVER_URL;


export const userhistory =  async(id) =>{
const res = await fetch(`${servelurl}/readerbookhistory/${id}`)
  const data = await res.json();
  return data;
}