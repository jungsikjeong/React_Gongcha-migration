import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import styled from 'styled-components';

import { profileFileUpload } from 'api/file-upload';
import { dataURItoFile } from 'components/uitls/data-url-to-file';
import { useUser } from 'hook/auth/use-user';
import useImageCompress from 'hook/use-image-compress';
import { IEditMyProfile } from 'interface/auth';
import {
  introductionValidation,
  nicknameEditValidation,
  password2EditValidation,
  passwordEditValidation,
} from 'utils/validation';
import usePostEditProfile from './hook/use-post-edit-profile';

import Button from 'components/common/button';
import ErrorText from 'components/common/error-text';
import FlexBox from 'components/common/flex-box';
import ImageCropper from 'components/common/image-cropper';
import Typography from 'components/common/typography';

const Container = styled.div`
  padding-top: 1rem;
  height: 100vh;
  background-color: black;
  color: rgb(245, 245, 245);

  .inside {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }

  .edit-icon-img {
    position: absolute;
    top: 5px;
    left: 3rem;
    filter: drop-shadow(-1px -3px 10px rgb(245, 245, 245));
  }
  .edit-icon-close-box {
    position: relative;

    .edit-icon-close {
      position: absolute;
      top: -10px;
      right: -10px;
      filter: drop-shadow(-1px -3px 10px rgb(245, 245, 245));
      font-weight: 600;
    }
  }
`;
const Wrapper = styled.div`
  max-width: 1024px;
  padding: 1rem;
  margin: 0 auto;
  color: rgb(245, 245, 245);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Box = styled.div`
  position: relative;
  margin: 1rem 0;
  border-radius: 20px;
  background-color: rgb(38, 38, 38);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 1rem;
`;

const EditIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(38, 38, 38);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 14px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgb(48, 48, 48);
  }
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
  cursor: pointer;
`;

const Form = styled.form``;

const Input = styled.input<{
  $iserror: string;
}>`
  border: none;
  outline: 0;
  padding: 8px;
  font-size: 15px;
  transition: all 0.2s ease;
  border-radius: 8px;
  box-shadow: ${({ $iserror }) => ($iserror ? ' 0 0 10px tomato' : '')};
  background-color: transparent;
  border: 1px solid rgb(50, 53, 57);
  color: rgb(245, 245, 245);

  &:focus + .limit-text {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
    border: 1px solid rgb(248, 249, 249);
  }
  &:focus::placeholder {
    color: rgb(245, 245, 245);
  }
`;

const InputNickname = styled.input<{
  $iserror: string;
}>`
  border: none;
  outline: 0;
  padding: 8px;
  font-size: 15px;
  transition: all 0.2s ease;
  box-shadow: ${({ $iserror }) => ($iserror ? ' 0 0 10px tomato' : '')};
  background-color: transparent;
  border-bottom: 1px solid rgb(120 120 120);
  color: rgb(245, 245, 245);

  &::placeholder {
    color: rgb(245, 245, 245);
  }

  &:focus + .limit-text {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
    border-bottom: 1px solid rgb(248, 249, 249);
  }
`;
const TextArea = styled.textarea<{ $iserror: string }>`
  border: none;
  outline: 0;
  width: 100%;
  padding: 9.5px 80px 2rem 15px;
  resize: none;
  font-size: 15px;
  border-radius: 12px;
  box-shadow: ${({ $iserror }) => ($iserror ? ' 0 0 10px tomato' : '')};
  border: 1px solid rgb(50, 53, 57);
  background-color: transparent;
  color: rgb(245, 245, 245);

  &::placeholder {
    opacity: 0.5;
    color: rgb(245, 245, 245);
  }

  &:focus {
    opacity: 1;
    border: 1px solid rgb(248, 249, 249);
  }

  &:focus::placeholder {
    opacity: 1;
  }
`;

const LimitText = styled.span<{ $islimit: string; opacity: string }>`
  opacity: ${({ opacity }) => opacity};
  color: ${({ $islimit }) => ($islimit ? 'rgb(237, 73, 86)' : 'white')};
  font-weight: 400;
  font-size: 12px;
`;

const SButton = styled(Button)<{ disabled: boolean }>`
  width: inherit;
  background-color: rgb(0, 149, 246);
  font-weight: 600;
  padding: 16px 20px;
  width: 253px;
  margin-top: 2rem;
  margin-left: auto;
  border-radius: 8px;
  font-size: 14px;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const EditPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [uuId, setUuId] = useState<string>('');
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<Blob | null>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IEditMyProfile>();

  const nickname = watch('nickname');
  const introduction = watch('introduction');
  const password = watch('password');

  const { mutate, isPending } = usePostEditProfile();

  const onSubmit: SubmitHandler<IEditMyProfile> = async (
    data: IEditMyProfile
  ) => {
    let imgAddress: string = '';

    if (compressedImage) {
      const formData = new FormData();

      formData.append('file', compressedImage);

      imgAddress = await profileFileUpload({ formData });
    }

    if (imgAddress || nickname || introduction || password || data?.password2) {
      const body = {
        nickname,
        introduction,
        password,
        password2: data?.password2,
        avatar: imgAddress,
      };

      await mutate(body);

      setUploadImage(null);
      setCompressedImage(null);
      reset();
    }
  };

  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const handleUploadImage = (image: string) => {
    setUuId(uuid());
    setUploadImage(image);
  };

  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);
    // Blob객체를 리턴함
    const compressedImage = await compressImage(imageFile);
    setCompressedImage(compressedImage);

    // 이미지 서버 저장 로직
    if (!compressedImage) return;
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage, uuid]);

  return (
    <Container>
      <Wrapper>
        <FlexBox $alignItems='center'>
          <IoIosArrowBack
            size={30}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(-1)}
          />

          <Typography tag='h3' padding='1rem 0'>
            프로필 편집
          </Typography>
        </FlexBox>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <ImageCropper
              profileImg={true}
              onCrop={handleUploadImage}
              aspectRatio={1 / 1}
            >
              <EditIcon className='edit-icon-img'>
                <LuPlus />
              </EditIcon>

              <UserImage
                src={uploadImage ? uploadImage : user?.avatar}
                alt=''
              />
            </ImageCropper>

            <InputNickname
              autoComplete='on'
              {...register('nickname', nicknameEditValidation)}
              placeholder={user?.nickname}
              $iserror={errors?.nickname ? 'true' : ''}
            />
            <LimitText
              opacity='0'
              $islimit={nickname && nickname.length > 6 ? 'true' : ''}
              className='limit-text'
            >
              {nickname !== undefined &&
                nickname.length !== 0 &&
                nickname.length}
            </LimitText>
          </Box>

          <Grid>
            <div>
              <Typography tag='h4' padding='1rem 0'>
                소개
              </Typography>

              <div className='relative'>
                <TextArea
                  wrap='hard'
                  autoComplete='on'
                  {...register('introduction', introductionValidation)}
                  placeholder={user?.introduction ? user?.introduction : '소개'}
                  $iserror={
                    errors?.introduction ||
                    (introduction?.length as number) > 150
                      ? 'true'
                      : ''
                  }
                />

                <div className='inside'>
                  <LimitText
                    opacity='1'
                    $islimit={
                      introduction && introduction.length > 150 ? 'true' : ''
                    }
                    className='limit-text'
                  >
                    {introduction !== undefined &&
                    introduction.length !== 0 &&
                    introduction.length
                      ? introduction.length
                      : '0'}
                    / 150
                  </LimitText>
                </div>
              </div>
            </div>

            <div>
              <Typography tag='h4' padding='1rem 0'>
                비밀번호 변경
              </Typography>

              <FlexBox $direction='column' $gap='10px'>
                <Input
                  autoComplete='on'
                  type='password'
                  placeholder='비밀번호'
                  $iserror={errors?.password ? 'true' : ''}
                  {...register('password', passwordEditValidation)}
                />

                <Input
                  autoComplete='on'
                  type='password'
                  placeholder='비밀번호 확인'
                  className='input-last'
                  $iserror={errors?.password2 ? 'true' : ''}
                  {...register(
                    'password2',
                    password2EditValidation(password as string)
                  )}
                />
              </FlexBox>
            </div>
          </Grid>

          {Object.values(errors).length !== 0 && (
            <ErrorText text={Object.values(errors)[0]?.message} />
          )}

          <FlexBox>
            <SButton
              type='submit'
              disabled={
                isCompressLoading ||
                Object.keys(errors).length !== 0 ||
                !(nickname || introduction || password)
                  ? true
                  : false
              }
            >
              {isCompressLoading || isPending ? (
                <img src='/spinner.svg' alt='loading' className='spinner' />
              ) : (
                '제출'
              )}
            </SButton>
          </FlexBox>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default EditPage;
