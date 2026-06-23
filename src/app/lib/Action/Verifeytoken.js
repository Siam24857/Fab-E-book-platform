import { useSession } from "../auth-client";
import { userseissondata } from "./Userinfo";

export const tokenverify = async () => {
  const usertoken = await userseissondata();

  return {
    Authorization: `Bearer ${usertoken}`,
  };
};

 