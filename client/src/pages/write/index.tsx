import { useState } from 'react';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { postImageUpload } from 'api/file-upload';
import { fileObjectState } from 'atom/file-object-atoms';
import 'react-quill/dist/quill.snow.css';

import PostDetailHeader from 'components/common/post-detail-header';
import FileForm from 'components/file-form';

const Container = styled.div`
  background-color: black;
  color: rgb(245, 245, 245);
  min-height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;
const StyledQuillWrapper = styled.div`
  padding: 0 1rem;
  padding-top: 1rem;

  .quill {
    border: 1px solid rgb(38, 38, 38);
    border-radius: 5px;
    background-color: transparent;
    color: white;
  }
  .ql-container {
    border: none;
  }
  .ql-editor {
    min-height: 150px;
    max-height: 150px;
  }

  // placeholder
  .quill > .ql-container > .ql-editor.ql-blank::before {
    font-style: normal;
    font-size: 14px;
    color: gray;
  }
`;

const WritePage = () => {
  const [value, setValue] = useState('');
  const fileObject = useRecoilValue(fileObjectState);

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

      await postImageUpload({ formData });
    }
  };

  return (
    <Container>
      <Wrapper>
        <PostDetailHeader text={'게시물 작성'} />
        <FileForm />
        <StyledQuillWrapper>
          <ReactQuill
            placeholder='당신의 공차를 공유하고 소개해주세요!'
            theme='snow'
            modules={modules}
            value={value}
            onChange={setValue}
          />

          <button style={{ color: 'white' }} onClick={onSubmit}>
            전송
          </button>
        </StyledQuillWrapper>
      </Wrapper>
    </Container>
  );
};

export default WritePage;
