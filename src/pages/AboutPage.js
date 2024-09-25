import React from "react";
import useCustomLogin from "../hooks/useCustomLogin";
import BasicLayout from "../layouts/BasicLayout";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AboutPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  // 로그인 체크
  if (!isLogin) {
    return moveToLoginReturn();
  }

  // 열 정의
  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Age", field: "age", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
  ];

  // 행 데이터
  const rowData = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Doe', age: 25, email: 'jane@example.com' },
    { name: 'Sam Smith', age: 28, email: 'sam@example.com' }
  ];

  return (
    <BasicLayout>
      <div className="text-3xl">소개 Page</div>
      <li>안녕하세요. 손대호의 리액트 토이 프로젝트에 오신 것을 환영합니다.</li>
      <li>미래의 세상은 어떨까요?</li>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>
    </BasicLayout>
  );
};

export default AboutPage;
