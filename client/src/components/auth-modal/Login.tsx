import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useSwiper } from 'swiper/react';
import { authModalState } from '../../atom/auth-modal-atoms';
import { emailValidation, passwordValidation } from '../../utils/validation';

import { postLogin } from '../../api/auth';
import { authState } from '../../atom/auth-atoms';

import Button from '../common/button';
import ErrorText from '../common/error-text';

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
`;

const Input = styled.input<{ $iserror: string }>`
  width: 100%;
  border: none;
  box-shadow: ${({ $iserror }) =>
    $iserror ? ' 0 0 10px tomato' : ' 0 0 10px #bbb'};
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

const LoginButton = styled(Button)<{ disabled: boolean }>`
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

interface ILoginTypes {
  email: string;
  password: string;
}

const Login = () => {
  const swiper = useSwiper();

  const setAuthModalState = useSetRecoilState(authModalState);
  const setUserInfo = useSetRecoilState(authState);

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<ILoginTypes>();

  const onSubmit: SubmitHandler<ILoginTypes> = async (data: ILoginTypes) => {
    const res: any = await postLogin(data);

    if (res.status === 400) {
      setError(res.type, {
        message: res.msg,
      });
    }

    if (res.status === 200) {
      const user = JSON.parse(localStorage.getItem('user') as string);
      setUserInfo(user);

      setAuthModalState(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoComplete='on'
            {...register('email', emailValidation)}
            placeholder='이메일'
            $iserror={errors?.email ? 'true' : ''}
          />
          <Input
            autoComplete='off'
            type='password'
            placeholder='비밀번호'
            $iserror={errors?.password ? 'true' : ''}
            {...register('password', passwordValidation)}
          />
          {Object.values(errors).length !== 0 && (
            <ErrorText text={Object.values(errors)[0].message} />
          )}
          <LoginButton disabled={Object.keys(errors).length > 0} type='submit'>
            로그인
          </LoginButton>

          <AuthWrapper>
            아이디가 없으시나요?...&nbsp;
            <span className='auth-text' onClick={() => swiper.slideNext()}>
              회원가입하러 가기
            </span>
          </AuthWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
