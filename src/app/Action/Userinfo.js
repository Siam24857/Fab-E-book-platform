import { headers } from "next/headers";
import { auth } from "../lib/auth";

export const userdata = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};

export const userseissondata = async () => {
  const usersession = await auth.api.getSession({
    headers: await headers(),
  });

  return usersession?.session.token;
};


const servelurl = process.env.SERVER_URL;


export const userhistory =  async(token, id) =>{
const res = await fetch(`${servelurl}/readerbookhistory/${id}`,{
  headers:{
    Authorization: token ? `Bearer ${token}` : "",
  }
})
  const data = await res.json();
  return data;
}