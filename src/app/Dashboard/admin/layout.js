import { getrole } from "@/app/lib/Core/Verfi";

 

 

const layout = async({children}) => {
     
    await getrole("admin");
    return children;
};

export default layout;




