import { fileObjectState } from 'atom/file-object-atoms';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { deleteFile, postFileUpload } from 'api/file-upload';
import useFetchPostDetail from 'pages/post-detail/hook/use-fetch-post-detail';
import useEditWrite from './hook/use-edit-write';

import Button from 'components/common/button';
import Loading from 'components/common/loading';
import PostHeader from 'components/common/post-header';
import FileForm from 'components/file-form';
import Editor from './editor';

const Container = styled.div`
  background-color: black;
  color: rgb(245, 245, 245);
  min-height: 100vh;
`;

const Box = styled.div`
  max-width: 500px;
  width: 100%;
  background-color: black;
  position: fixed;
  top: 0;
  z-index: 20;
`;

const Wrapper = styled(motion.div)`
  max-width: 500px;
  margin: 0 auto;
`;

const StyledQuillWrapper = styled.div`
  position: relative;
  padding: 0 1rem;
  padding-top: 1rem;
  border: 1px solid rgb(38, 38, 38);
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
`;

const UploadBtn = styled(Button)<{ disabled: boolean }>`
  position: absolute;
  right: 0;
  bottom: 15px;
  width: 100px;

  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const PostEditPage = () => {
  const params = useParams();

  const [value, setValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [fileObject, setFileObject] = useRecoilState(fileObjectState); // 새로운 이미지
  const [deleteImages, setDeleteImages] = useState<string[]>([]); // 기존 이미지중에서 삭제한거

  const { data, isLoading } = useFetchPostDetail(params?.id as string);
  const { mutate: editWrite, isPending: isWriting } = useEditWrite();

  const onSubmit = async () => {
    let updateImageUrl: string[] = [];
    let isNewImage: boolean = false;

    if (fileObject.length === 0 || null) {
      return toast.error('이미지를 하나 이상 업로드해주세요!');
    }

    if (fileObject.length > 5) {
      return toast.error('이미지는 최대 다섯개까지만 올려주세요!');
    }

    // 기존 이미지에 삭제버튼을 눌렀으면,
    // 기존 이미지 삭제
    if (deleteImages.length !== 0) {
      await deleteFile({ images: deleteImages });
    }

    if (data) {
      // 새롭게 업로드한 이미지 있으면 이미지 업로드
      if (fileObject.length !== 0) {
        const formData = new FormData();

        fileObject.forEach((file, index) => {
          if (file instanceof Blob) {
            isNewImage = true;
            formData.append(`files`, file);
          }
        });
        if (isNewImage) {
          // 파일 업로드 및 업로드한 경로 가져오기
          const fileInfo = await postFileUpload({ formData });
          // 기존 이미지중에서 삭제되지 않은 이미지와
          // 새롭게 업로드한 이미지를 합침
          const oldImages = data?.images.filter(
            (image) =>
              !deleteImages.some((deleteImage) => deleteImage === image)
          );
          updateImageUrl = [...oldImages, ...(fileInfo as string[])];
        }
      }

      editWrite({
        value,
        hashtags: tags,
        fileInfo: updateImageUrl.length === 0 ? data?.images : updateImageUrl,
        postId: data?._id,
      });
    }

    // 완료후 초기화
    setFileObject([]);
  };
  useEffect(() => {
    if (data) {
      setTags(data?.hashtags);
      setValue(data.contents);
    }
  }, [data]);
  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box>
            <PostHeader text={'게시물 작성'} />
          </Box>

          <Wrapper
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <StyledQuillWrapper>
              <Editor
                placeholder={`당신의 공차를 공유하고 소개해주세요!<br/>(이미지를 하나 이상 업로드해주세요)`}
                value={value}
                setValue={setValue}
                tags={tags}
                setTags={setTags}
              />

              <FileForm
                oldImages={data?.images}
                setDeleteImages={setDeleteImages}
                deleteImages={deleteImages}
              />

              <UploadBtn
                type='submit'
                onClick={onSubmit}
                disabled={fileObject.length === 0}
              >
                {isWriting ? (
                  <img src='/spinner.svg' alt='loading' className='spinner' />
                ) : (
                  '작성'
                )}
              </UploadBtn>
            </StyledQuillWrapper>
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default PostEditPage;
