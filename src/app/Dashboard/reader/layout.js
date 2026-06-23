import { getrole } from "@/app/lib/Core/Verfi";

 
 

const layout = async({children}) => {
     
    await getrole("reader");
    return children;
};

export default layout;




