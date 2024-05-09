import { useUser } from 'hook/auth/use-user';
import { PostsDataType } from 'interface/posts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  commentFormStatus,
  replyCommentStatus,
  replyCommentUserStatus,
} from 'atom/comment-atoms';
import usePostComment from './hook/use-post-comment';
import usePostReplyComment from './hook/use-post-reply-comment';

import FlexBox from 'components/common/flex-box';

const Container = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid rgb(38, 38, 38);
  padding: 0 16px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 50px;
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

interface ICommentFormProps {
  post: PostsDataType | undefined;
}

const CommentForm = ({ post }: ICommentFormProps) => {
  const { user } = useUser();

  const [contents, setContents] = useState('');
  const { mutate, isPending } = usePostComment();
  const { mutate: replyCommentMutate, isPending: replyCommentIsPending } =
    usePostReplyComment();

  const [isReplyCommentStatus, setIsReplyCommentStatus] =
    useRecoilState(replyCommentStatus);
  const [replyCommentUser, setReplyCommentUser] = useRecoilState(
    replyCommentUserStatus
  );
  const [isCommentFormFocus, setIsCommentFormFocus] =
    useRecoilState(commentFormStatus);

  const formRef = useRef<HTMLTextAreaElement | null>(null);

  const submitComment = useCallback(async () => {
    if (post?._id) {
      // 대댓글작성
      if (replyCommentUser.commentId) {
        const newContents = contents.replace(
          `@${replyCommentUser.nickName}`,
          ''
        );

        replyCommentMutate({
          contents: newContents,
          postId: post._id,
          commentId: replyCommentUser.commentId,
        });
        setReplyCommentUser({
          userId: '',
          commentId: '',
          nickName: '',
        });
        setContents('');
      } else {
        // 일반 댓글 작성
        mutate({ contents, postId: post._id });
        setContents('');
      }
    }
  }, [post?._id, replyCommentUser, contents]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await submitComment();
  };

  // 답글 달기 버튼 눌렀을 때 혹은
  // 댓글 이모티콘 눌렀을 때 댓글 form에 focus줌
  useEffect(() => {
    if (isReplyCommentStatus && formRef.current) {
      formRef.current.focus();
      setContents(`@${replyCommentUser.nickName} `);
    } else if (isCommentFormFocus && formRef.current) {
      formRef.current.focus();
    }
  }, [isReplyCommentStatus, isCommentFormFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        // Textarea 이외의 요소를 클릭한 경우
        setIsReplyCommentStatus(false);
        setIsCommentFormFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef, setIsReplyCommentStatus, submitComment]);
  return (
    <Container>
      {user ? (
        <Form onSubmit={onSubmit}>
          <Image src={user?.avatar} alt='' />
          {isPending || replyCommentIsPending ? (
            <FlexBox $justifyContent='center' style={{ width: '100%' }}>
              <img
                src='./spinner.svg'
                alt='spinner'
                className='spinner'
                style={{ zIndex: '999' }}
              />
            </FlexBox>
          ) : (
            <>
              <Textarea
                placeholder={`${user?.nickname}님으로 댓글 달기...`}
                onChange={(e) => setContents(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    await submitComment();
                  }
                }}
                value={contents}
                ref={formRef}
              />

              <PostBtn value={contents?.length !== 0 ? 'true' : ''}>
                게시
              </PostBtn>
            </>
          )}
        </Form>
      ) : (
        ''
      )}
    </Container>
  );
};

export default CommentForm;
