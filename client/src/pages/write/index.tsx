import { useState } from 'react';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { postImageUpload } from 'api/file-upload';
import { fileObjectState } from 'atom/file-object-atoms';
import 'react-quill/dist/quill.snow.css';
import usePostWrite from './hook/use-post-write';

import Button from 'components/common/button';
import PostHeader from 'components/common/post-header';
import FileForm from 'components/file-form';

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

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const StyledQuillWrapper = styled.div`
  position: relative;
  padding: 0 1rem;
  padding-top: 1rem;
  border: 1px solid rgb(38, 38, 38);
  border-radius: 5px;
  .quill {
    padding-top: 1.5rem;
    background-color: transparent;
    color: white;
    padding-bottom: 30px;
  }
  .ql-container {
    border: none;
  }
  .ql-editor {
    min-height: 150px;
    max-height: 350px;
    scrollbar-width: none;

    @media (max-width: 375px) {
      max-height: 250px;
    }
  }

  // placeholder
  .quill > .ql-container > .ql-editor.ql-blank::before {
    font-style: normal;
    font-size: 14px;
    color: gray;
  }
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
  const fileObject = useRecoilValue(fileObjectState);

  const { mutate, isPending } = usePostWrite();

  const modules = {
    toolbar: false,
  };

  const onSubmit = async () => {
    if (fileObject.length === 0 || null) {
      return toast.error('이미지를 하나 이상 업로드해주세요!');
    } else {
      const formData = new FormData();

      fileObject.forEach((file, index) => {
        formData.append(`files`, file);
      });

      const fileInfo = await postImageUpload({ formData });

      if (fileInfo && fileInfo.length !== 0) {
        mutate({ value, fileInfo });
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Box>
          <PostHeader text={'게시물 작성'} />
        </Box>

        <StyledQuillWrapper>
          <ReactQuill
            placeholder={`당신의 공차를 공유하고 소개해주세요!\n(이미지는 하나 이상 업로드해주세요)`}
            theme='snow'
            modules={modules}
            value={value}
            onChange={setValue}
          />

          <FileForm />

          <UploadBtn
            type='submit'
            onClick={onSubmit}
            disabled={fileObject.length === 0}
          >
            전송
          </UploadBtn>
        </StyledQuillWrapper>
      </Wrapper>
    </Container>
  );
};

export default WritePage;
