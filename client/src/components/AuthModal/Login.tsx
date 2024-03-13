import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSwiper } from 'swiper/react';

import Alert from '../Common/Alert';
import Button from '../Common/Button';
import ErrorText from '../Common/ErrorText';

const Container = styled.div`
  padding: 0 2rem;
  height: 100%;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 60%;
  }
  span {
    color: #fff;
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
  outline: 0;
  padding: 10px 15px;
  margin-top: 15px;
  color: #000;
`;

const LoginButton = styled(Button)<{ disabled: boolean }>`
  margin-top: 15px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: #eee;
  background: ${({ disabled }) => (disabled ? 'red' : 'tomato')};
  opacity: ${({ disabled }) => (disabled ? '1' : '.5')};
  transition: all 0.2s ease;
`;

const RegisterButton = styled(Button)`
  margin-top: 5px;
  background: #c1575f;
  text-align: center;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
`;

interface ILoginTypes {
  email: string;
  password: string;
}

const Login = () => {
  const swiper = useSwiper();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginTypes>();

  const onSubmit: SubmitHandler<ILoginTypes> = (data) => console.log(data);

  return (
    <Container>
      <Alert />
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoComplete='off'
            placeholder='email@example.com'
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
          />
          {errors.email && (
            <ErrorText text='올바른 형식의 이메일을 입력해주세요!' />
          )}
          <Input
            autoComplete='off'
            type='password'
            placeholder='password...'
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 8,
            })}
          />
          {errors.password && (
            <ErrorText text='비밀번호는 6~8자로 작성해주세요!' />
          )}
          <LoginButton disabled={isValid} type='submit'>
            로그인
          </LoginButton>
          <span>or</span>
          <RegisterButton onClick={() => swiper.slideNext()} type='button'>
            회원가입
          </RegisterButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
