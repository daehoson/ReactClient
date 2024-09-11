import { useEffect, useState, useRef } from "react";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST, putOne,getOne } from "../../api/products";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal"; // ResultModal 컴포넌트를 임포트


const initState = {
    pno:0,
    pname:'',
    pdesc:'',
    price:0,
    delFlag:false,
    uploadFileNames:[]
}

const host = API_SERVER_HOST

const ModifyComponent = ({pno}) => {

    const [product, setProduct] = useState(initState)

    const [fetching, setFetching] = useState(false)

    //결과 모달
    const [result, setResult] = useState(null)
    //이동용 함수
    const [moveToRead, moveToList] = useCustomMove()

    const uploadRef = useRef()

    

    useEffect(() =>{
        setFetching(true)
        getOne(pno).then(data => {
            setProduct(data)
            setFetching(false)
        })
    }, [pno])

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }

    const deleteOldImages = (imageName) =>{
        const resultFileNames = product.uploadFileNames.filter(fileName =>
            fileName !== imageName)
            product.uploadFileNames = resultFileNames
            setProduct({...product})
    }

    const handleClickModify = () => {
        
        const files = uploadRef.current.files
        const formData = new FormData()
        for(let i = 0; i < files.length; i++){
            formData.append("files", files[i])
        }
        // other data
        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)
        formData.append("delFlag", product.delFlag)
        
        for(let i = 0; i< product.uploadFileNames.length; i++){
            formData.append("uploadFileNames", product.uploadFileNames[i])
        }
        
        // fetching
        setFetching(true)

        putOne(pno, formData).then(data => {
            setResult('Modified')
            setFetching(false)
        })
    }

    const closeModal = () => {
        if(result === 'Modified'){
            moveToRead(pno) //조회 화면으로 이동
        }
        setResult(null)
    }

    return(
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {fetching ? <FetchingModal/>:<></>}
            
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="pname"
                           type={'text'}
                           value={product.pname}
                           onChange={handleChangeProduct}
                           ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                        name="pdesc"
                        rows="4"
                        onChange={handleChangeProduct}
                        value={product.pdesc}>
                            {product.pdesc}
                        </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="price"
                           type={'number'}
                           value={product.price}
                           onChange={handleChangeProduct}
                           ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Delete</div>
                    <select
                        name="delFlag"
                        value={product.delFlag}
                        onChange={handleChangeProduct}
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
                            <option value={false}>사용</option>
                            <option value={true}>삭제</option>
                        </select>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input ref={uploadRef}
                           className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           type={'file'}
                           multiple={true}
                           ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Images</div>
                    {product.uploadFileNames.map((imgFile,i)=>
                        <div className="flex justify-center flex-col w-1/3"
                             key = {i}>
                                <button className="bg-blue-500 text-3xl text-white"
                                        onClick={()=>deleteOldImages(imgFile)}>DELETE</button>
                                <img
                                    alt="img"
                                    src={`${host}/api/products/view/s_${imgFile}`}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500">
                            DELETE
                        </button>
                <button type="button"
                        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
                        onClick={handleClickModify}
                        >
                            Modify
                        </button>
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500">
                            List
                        </button>
            </div>
        </div>
    );
}

export default ModifyComponent;