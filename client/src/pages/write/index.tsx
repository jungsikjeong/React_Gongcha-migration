import styled from 'styled-components';

import FileForm from '../../components/write-post/file-form';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: rgb(245, 245, 245);
  min-height: 100vh;
`;

const Wrapper = styled.div``;

const Form = styled.form``;

const TextArea = styled.textarea`
  resize: none;
  background-color: transparent;
  width: 200px;
  height: 200px;
`;

const WritePage = () => {
  return (
    <Container>
      <Wrapper>
        <FileForm />
        <Form>
          <TextArea placeholder='오늘 어떤 공차를 하셨나요?   (최소 25글자로 작성해주세요)' />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default WritePage;
