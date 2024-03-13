import PropTypes from 'prop-types';
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
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    width: 60%;
  }
  input {
    width: 100%;
    font-size: 16px;
    border: 0;
    border-radius: 5px;
    outline: 0;
    padding: 10px 15px;
    margin-top: 15px;
    color: black;
  }

  span {
    color: #fff;
    font-size: 20px;
  }
`;

const SignUpButton = styled(Button)<{ disabled: boolean }>`
  margin-top: 15px;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: #eee;
  background: ${({ disabled }) => (disabled ? 'red' : 'tomato')};
  opacity: ${({ disabled }) => (disabled ? '1' : '.5')};
`;

const LoginButton = styled(Button)`
  margin-top: 5px;
  background: #c1575f;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
`;

interface IRegisterTypes {
  email: string;
  nickname: string;
  password: string;
  password2: string;
}

const Register = () => {
  const swiper = useSwiper();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IRegisterTypes>();

  const onSubmit: SubmitHandler<IRegisterTypes> = (data) => console.log(data);
  const password = watch('password');

  return (
    <Container>
      <Alert />
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            autoComplete='off'
            placeholder='닉네임 입력을 입력해주세요'
            {...register('nickname', {
              required: true,
              minLength: 2,
              maxLength: 6,
              pattern: /^[가-힣a-zA-Z0-9]+$/,
            })}
          />
          {errors.nickname && errors.nickname.type === 'pattern' && (
            <ErrorText text='닉네임은 한글, 알파벳, 숫자만 입력해주세요!' />
          )}
          {errors.nickname && errors.nickname.type !== 'pattern' && (
            <ErrorText text='닉네임은 2~6글자만 입력해주세요!' />
          )}
          <input
            autoComplete='off'
            placeholder='email@example.com'
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
          />{' '}
          {errors.email && (
            <ErrorText text='올바른 형식의 이메일을 입력해주세요!' />
          )}
          <input
            autoComplete='off'
            type='password'
            placeholder='비밀번호를 입력해주세요'
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 8,
            })}
          />
          {errors.password && (
            <ErrorText text='비밀번호는 6~8자로 작성해주세요!' />
          )}
          <input
            autoComplete='off'
            type='password'
            placeholder='비밀번호를 재입력해주세요'
            {...register('password2', {
              required: true,
              minLength: 6,
              maxLength: 8,
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.password2 && <ErrorText text={errors.password2.message} />}
          <SignUpButton disabled={isValid} type='submit'>
            회원가입
          </SignUpButton>
          <span>or</span>
          <LoginButton onClick={() => swiper.slideNext()} type='button'>
            로그인
          </LoginButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func,
  register: PropTypes.func,
};

export default Register;
