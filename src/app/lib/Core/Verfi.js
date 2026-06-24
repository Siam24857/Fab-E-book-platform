import { redirect } from "next/navigation";
import { userdata } from "../../Action/Userinfo";

export const getrole = async (role) => {
  const userrole = await userdata();
  const normalizedRole = String(role || "").toLowerCase();
  const userRole = String(userrole?.role || "").toLowerCase();

  if (!userRole) {
    redirect("/Login");
    return;
  }

  if (userRole !== normalizedRole) {
    redirect("/unauthorized");
  }
};