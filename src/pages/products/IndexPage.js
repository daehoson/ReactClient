import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

function IndexPage(props) {

    const navigate = useNavigate()

    return (
        <BasicLayout>
            <div className="text-black font-extrabold -mt-10">
                Product Menus
            </div>
            <div className="w-full flex m-2 p-2">
                className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
                onChange={() => navigate('list')}
                LIST
            </div>
            <div className="w-full flex m-2 p-2">
                className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
                onChange={() => navigate('add')}
                ADD
            </div>
            <div className="flex flex-wrap w-full">
                <Outlet/>
            </div>
        </BasicLayout>
    )
}
