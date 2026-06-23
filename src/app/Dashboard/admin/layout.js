import { getrole } from "@/app/core/getuser";

 

const layout = async({children}) => {
     
    await getrole("admin");
    return children;
};

export default layout;




