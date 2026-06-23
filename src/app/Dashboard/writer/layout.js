import { getrole } from "@/app/lib/Core/Verfi";


 

const layout = async({children}) => {
     
    await getrole("writer");
    return children;
};

export default layout;

 



