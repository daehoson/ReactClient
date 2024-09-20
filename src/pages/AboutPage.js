import useCustomLogin from "../hooks/useCustomLogin";
import BasicLayout from "../layouts/BasicLayout";

const AboutPage = () => {

  const {isLogin, moveToLoginReturn} = useCustomLogin()
  if(!isLogin){
    return moveToLoginReturn()
  }

  return ( 
    <BasicLayout>
      <div className=" text-3xl">소개 Page</div>
      <li>안녕하세요. 손대호의 리액트 토이 프로젝트에 오신 것을 환영합니다.</li>
      <li>미래의 세상은 어떨까요?</li>
    </BasicLayout>
    
   );
}
 
export default AboutPage;
