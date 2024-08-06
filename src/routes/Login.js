import React, { useState, useEffect } from 'react';
import './Login.css';
import InputBox from '../components/InputBox';
import { ButtonGroup, Button } from '../components/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useUser } from '../context/UserContext'; // UserContext import
import logo from '../asset/ssuik-logo.png';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // UserContext에서 setUser 가져오기
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      console.log('User logged in:', userCredential.user); // 디버깅: 로그인한 사용자 정보 확인
      setUser(userCredential.user);
      navigate('/home'); // 로그인 후 home 페이지로 이동
    } catch (err) {
      console.error('Error logging in with email and password', err);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
    } catch (err) {
      console.error(err);
    }
    //console.log(auth.currentUser.email);
  };

  useEffect(() => {
    // 현재 로그인된 사용자 정보 설정
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log('Auth state changed:', currentUser); // 디버깅: 인증 상태 변경 확인
      setUser(currentUser);
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [setUser]);

  return (
    <div className="login-container">
      <div className="text-blue-500 text-xl font-bold">
        <img src={logo} className="w-32 mt-20"></img>
      </div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <InputBox
          label="이메일"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <InputBox
          label="비밀번호"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <ButtonGroup>
          <Button variant="subtle" type="submit">
            Login
          </Button>
          <Button variant="primary" onPress={() => navigate('/signup')}>
            Sign up
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default Login;
