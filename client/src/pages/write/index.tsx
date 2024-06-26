import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { postFileUpload } from 'api/file-upload';
import { fileObjectState } from 'atom/file-object-atoms';

import usePostWrite from './hook/use-post-write';

import Button from 'components/common/button';
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

const WritePage = () => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [fileObject, setFileObject] = useRecoilState(fileObjectState);

  const { mutate: postWrite, isPending: isWriting } = usePostWrite();

  const onSubmit = async () => {
    if (fileObject.length === 0 || null) {
      return toast.error('이미지를 하나 이상 업로드해주세요!');
    } else {
      const formData = new FormData();

      fileObject.forEach((file, index) => {
        formData.append(`files`, file);
      });

      const fileInfo = await postFileUpload({ formData });

      if (fileInfo && fileInfo.length !== 0) {
        postWrite({ value, fileInfo, tags });

        setFileObject([]);
      }
    }
  };

  return (
    <Container>
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

          <FileForm />

          <UploadBtn
            type='submit'
            onClick={onSubmit}
            disabled={fileObject.length === 0}
          >
            {isWriting ? (
              <img src='./spinner.svg' alt='loading' className='spinner' />
            ) : (
              '작성'
            )}
          </UploadBtn>
        </StyledQuillWrapper>
      </Wrapper>
    </Container>
  );
};

export default WritePage;
