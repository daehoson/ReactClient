import React, { useState } from "react";
import useCustomLogin from "../hooks/useCustomLogin";
import BasicLayout from "../layouts/BasicLayout";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';


const AboutPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  // 부서 트리 데이터
  const treeData = [
    {
      value: '인사부',
      label: '인사부',
      children: [
        { value: '채용팀', label: '채용팀' },
        { value: '교육팀', label: '교육팀' },
        { value: '복리후생팀', label: '복리후생팀' },
      ],
    },
    {
      value: '재무부',
      label: '재무부',
      children: [
        { value: '회계팀', label: '회계팀' },
        { value: '예산팀', label: '예산팀' },
      ],
    },
    {
      value: 'IT부서',
      label: 'IT부서',
      children: [
        { value: '개발팀', label: '개발팀' },
        { value: '운영팀', label: '운영팀' },
        { value: '보안팀', label: '보안팀' },
      ],
    },
  ];

  // Hooks는 최상위에서 호출
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  // 로그인 체크 후 렌더링 결정
  if (!isLogin) {
    return moveToLoginReturn();
  }

  return (
    <BasicLayout>
      <div className="text-3xl">소개 Page</div>
      <li>안녕하세요. 손대호의 리액트 토이 프로젝트에 오신 것을 환영합니다.</li>
      <li>미래의 세상은 어떨까요?</li>
      <div style={{ height: '400px', width: '600px', overflowY: 'auto' }}>
        <CheckboxTree
          nodes={treeData}
          checked={checked}
          expanded={expanded}
          onCheck={setChecked}
          onExpand={setExpanded}
        />
      </div>
    </BasicLayout>
  );
};

export default AboutPage;
