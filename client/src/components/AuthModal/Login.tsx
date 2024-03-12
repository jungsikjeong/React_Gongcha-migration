import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Alert from '../Common/Alert';

const LoginContainer = styled.div``;

const Wrapper = styled.div`
  margin-top: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;

  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 1024px) {
    width: 70%;
  }

  input {
    width: 100%;
    font-size: 16px;
    border: 0;
    border-radius: 5px;
    outline: 0;
    padding: 10px 15px;
    margin-top: 15px;
    color: #000;
  }

  span {
    color: #fff;
    font-size: 20px;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: red;
`;

const SLink = styled(Link)`
  margin-top: 5px;
  background: #c1575f;
  text-align: center;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <LoginContainer>
      <Alert />
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <input
            autoComplete='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            placeholder='Email@admin.com'
          />
          <input
            autoComplete='new-password'
            type='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            placeholder='Password'
          />
          <Button style={{ marginTop: '15px' }}>sign in</Button>
          <span>or</span>
          <SLink to='/register'> sign up </SLink>
        </Form>
      </Wrapper>
    </LoginContainer>
  );
};

export default Login;
