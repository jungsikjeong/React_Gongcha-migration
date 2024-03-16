import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSwiper } from 'swiper/react';

import { postRegister } from '../../api/auth';
import {
  emailValidation,
  nicknameValidation,
  password2Validation,
  passwordValidation,
} from '../../utils/validation';

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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .or {
    color: #fff;
    font-size: 20px;
  }
`;

const Input = styled.input<{ iserror: string }>`
  width: 100%;
  border: none;
  box-shadow: ${({ iserror }) =>
    iserror ? ' 0 0 10px tomato' : ' 0 0 10px #bbb'};
  border-radius: 5px;
  outline: 0;
  padding: 8px;
  margin-top: 15px;
  color: black;
  font-size: 15px;
  font-weight: 400;
  transition: all 0.2s ease;
  position: relative;

  &:focus {
    box-shadow: 0 0 10px #007bff;
  }
`;

const SignUpButton = styled(Button)<{ disabled: boolean }>`
  margin-top: 15px;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 0;
  color: #eee;
  background: #ef4b3f;
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '' : '#ed2a1c')};
  }
`;

const AuthWrapper = styled.div`
  padding-top: 1rem;
  color: #bbb;
  font-size: 12px;

  .auth-text {
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #bbb;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      color: white;
      border-bottom: 1px solid white;
    }
  }
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
    formState: { errors },
  } = useForm<IRegisterTypes>();

  const onSubmit: SubmitHandler<IRegisterTypes> = async (
    data: IRegisterTypes
  ) => {
    await postRegister(data);
  };

  const password = watch('password');
  // 007bff
  return (
    <Container>
      <Alert />
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            autoComplete='off'
            placeholder='닉네임'
            iserror={errors?.nickname ? 'true' : ''}
            {...register('nickname', nicknameValidation)}
          />

          <Input
            autoComplete='off'
            placeholder='이메일'
            iserror={errors?.email ? 'true' : ''}
            {...register('email', emailValidation)}
          />

          <Input
            autoComplete='off'
            type='password'
            placeholder='비밀번호'
            iserror={errors?.password ? 'true' : ''}
            {...register('password', passwordValidation)}
          />

          <Input
            autoComplete='off'
            type='password'
            placeholder='비밀번호 확인'
            className='input-last'
            iserror={errors?.password2 ? 'true' : ''}
            {...register('password2', password2Validation(password))}
          />

          {Object.values(errors).length !== 0 && (
            <ErrorText text={Object.values(errors)[0].message} />
          )}

          <SignUpButton disabled={Object.keys(errors).length > 0} type='submit'>
            가입하기
          </SignUpButton>

          <AuthWrapper>
            이미 회원이신가요?...&nbsp;
            <span className='auth-text' onClick={() => swiper.slideNext()}>
              로그인하러 가기
            </span>
          </AuthWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
