import { headers } from "next/headers"
import { auth } from "../auth"

export const userdata = async() =>{
    const seison = auth.api.getSession({
        headers: await headers()
    })

    return seison?.user
}