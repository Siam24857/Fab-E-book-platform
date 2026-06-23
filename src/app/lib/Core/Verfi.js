import { redirect } from "next/navigation";
import { userdata } from "../../Action/Userinfo";

export const getrole = async (role) =>{
    const userrole = await userdata();

    if(userrole.role !== role){
       redirect("/unauthorized")
    }
}