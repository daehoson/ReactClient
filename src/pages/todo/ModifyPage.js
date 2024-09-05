import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/todo/ModiftComponent";

const ModifyPage = () => {

  const {tno} = useParams()

  return ( 
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        Todo 수정 페이지 
      </div>  
      <ModifyComponent tno={tno}></ModifyComponent>
    </div> 
   );
}
 
export default ModifyPage;
