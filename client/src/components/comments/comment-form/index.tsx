import { useUser } from 'hook/auth/use-user';
import { PostsDataType } from 'interface/posts';
import { useState } from 'react';
import styled from 'styled-components';

import usePostComment from './hook/use-post-comment';

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 50px;
  border-top: 1px solid rgb(38, 38, 38);
  margin-top: 1.5rem;
  padding: 0.875rem 0.1rem;
  .spinner {
    width: 25px;
    height: 25px;
  }
  @media (max-width: 768px) {
    padding: 0 1rem;
    padding-top: 0.875rem;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 18px;
  max-height: 50px;
  resize: none;
  background-color: transparent;
  outline: none;
  border: none;
  color: rgb(245, 245, 245);
  margin-top: 20px;

  &::placeholder {
    color: rgb(168, 168, 168);
    font-weight: 600;
  }
`;

const PostBtn = styled.button<{ value: string }>`
  visibility: ${({ value }) => (value ? 'visible' : 'hidden')};
  opacity: ${({ value }) => (value ? '1' : '0')};
  transition: all 0.1s ease;
  flex-shrink: 0;
  font-size: 14px;
  color: rgb(0, 149, 246);
  font-weight: 600;
  padding-right: 0.5rem;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
`;

const CommentForm = ({ post }: { post: PostsDataType | undefined }) => {
  const { user } = useUser();

  const [contents, setContents] = useState('');
  const { mutate, isPending } = usePostComment();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post?._id) {
      mutate({ contents, postId: post._id });
      setContents('');
    }
  };

  return (
    <>
      {user ? (
        <Form onSubmit={onSubmit}>
          <Image src={user?.avatar} alt='' />
          <Textarea
            placeholder={`${user?.nickname}님으로 댓글 달기...`}
            onChange={(e) => setContents(e.target.value)}
            value={contents}
          />

          {isPending ? (
            <img
              src='./spinner.gif'
              className='spinner'
              alt='spinner-loading'
            />
          ) : (
            <PostBtn value={contents?.length !== 0 ? 'true' : ''}>게시</PostBtn>
          )}
        </Form>
      ) : (
        ''
      )}
    </>
  );
};

export default CommentForm;
