import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
};

const ListComponent = () => {
    const { page, size, moveToList, refresh, moveToRead } = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    const [gridApi, setGridApi] = useState(null);

    useEffect(() => {
        getList({ page, size })
            .then(data => {
                console.log('API Response:', data);
                if (data && data.dtoList) {
                    setServerData(data);
                } else {
                    console.error('Unexpected API response structure:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [page, size, refresh]);

    // AG Grid 열 정의
    const columnDefs = [
        { headerName: "TNO", field: "tno", sortable: true, filter: true },
        { headerName: "Title", field: "title", sortable: true, filter: true },
        { headerName: "Due Date", field: "dueDate", sortable: true, filter: true }
    ];

    // 그리드 준비 이벤트 핸들러
    const onGridReady = params => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit(); // 초기 열 크기 조정
    };

    // 데이터 변경 시 열 크기 조정
    useEffect(() => {
        if (gridApi) {
            gridApi.sizeColumnsToFit();
        }
    }, [serverData.dtoList, gridApi]);

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.dtoList.map(todo => 
                    <div
                        key={todo.tno}
                        className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
                        onClick={()=> moveToRead(todo.tno)}
                    >
                        <div className="flex">
                            <div className="font-extrabold text-2xl p-2 w-1/12">
                                {todo.tno}
                            </div>
                            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                                {todo.title}
                            </div>
                            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                                {todo.dueDate}
                            </div>
                        </div>
                    </div>
                    
                )}
                <div className="ag-theme-alpine" style={{ height: 700, width: '100%' }}>
                    <AgGridReact
                        onGridReady={onGridReady}
                        columnDefs={columnDefs}
                        rowData={serverData.dtoList} // dtoList로 데이터 설정
                        onRowClicked={params => moveToRead(params.data.tno)} // 행 클릭 시 이동
                    />
                </div>
            </div>
            <PageComponent serverData={serverData} movePage={moveToList} />
        </div>
    );
}

export default ListComponent;
