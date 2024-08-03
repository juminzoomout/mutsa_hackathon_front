import React, { useState } from 'react';
import './Signup.css';
import InputBox from '../components/InputBox';
import { ButtonGroup, Button } from '../components/ButtonGroup';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        name: '',
        username: '',
        password: '',
        birthdate: '',
        email: '',
        termsAccepted: false,
        privacyAccepted: false,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 회원가입 처리 로직을 여기에 추가합니다.
        console.log(formValues);
        // 회원가입 후 로그인 페이지로 이동
        navigate('/');
    };

    return (
        <div className="signup-container">
            <div className="logo-placeholder">기막힌 로고/서비스 이름</div>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <InputBox
                    label="이름"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                />
                <InputBox
                    label="아이디"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                />
                <InputBox
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                <InputBox
                    label="생년월일"
                    type="date"
                    name="birthdate"
                    value={formValues.birthdate}
                    onChange={handleChange}
                />
                <InputBox
                    label="이메일"
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formValues.termsAccepted}
                        onChange={handleChange}
                    />
                    <label>이용 약관 동의</label>
                </div>
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        name="privacyAccepted"
                        checked={formValues.privacyAccepted}
                        onChange={handleChange}
                    />
                    <label>개인정보 수집 동의</label>
                </div>
                <ButtonGroup>
                    <Button variant="subtle" onPress={() => navigate('/')}>
                        취소
                    </Button>
                    <Button variant="primary" type="submit">
                        완료
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default Signup;