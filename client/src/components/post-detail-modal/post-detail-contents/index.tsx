import { PostsDataType } from 'interface/posts';
import { useRef } from 'react';
import styled from 'styled-components';

import PostDetailContentsMobile from './post-detail-contents-mobile';
import PostDetailContentsPC from './post-detail-contents-pc';

const Container = styled.div`
  /* max-width: 335px; */
  min-width: 335px;
  background-color: black;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgb(38, 38, 38);

  .icon {
    margin-left: auto;
    cursor: pointer;
  }
`;

const User = styled.h2`
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
`;

const ContentsWrap = styled.ul`
  height: calc(100% - 200px);
  margin: 0;
  overflow-y: scroll;
  padding: 16px;
  scrollbar-width: none;
  background-color: black;

  @media (max-width: 768px) {
    height: 150px;
    padding-top: 0;
  }
`;

const ContentsItem = styled.li`
  display: flex;
  align-items: start;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
`;

const Post = styled.div`
  width: 100%;
  max-width: 335px;
  font-size: 14px;
  line-height: 18px;
  gap: 5px;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 12px;
  }
`;

const Tag = styled.span`
  color: rgb(224, 241, 255);
`;

const Footer = styled.div`
  width: 100%;
  border-top: 1px solid rgb(38, 38, 38);
  padding: 6px 16px 8px;
  background-color: black;
  span {
    cursor: pointer;
    padding-top: 6px;
    font-size: 14px;
    color: rgb(245, 245, 245);
    line-height: 18px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 23px;
  color: rgb(245, 245, 245);

  .bookmark {
    margin-left: auto;
  }

  .section-icons {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.2rem 0;
  }
`;

const Form = styled.form`
  display: flex;
  height: 100%;
  border-top: 1px solid rgb(38, 38, 38);
  margin-top: 1rem;
  padding-top: 0.875rem;
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

  &::placeholder {
    color: rgb(168, 168, 168);
    font-weight: 600;
  }
`;

const PostBtn = styled.div`
  flex-shrink: 0;
  font-size: 14px;
  color: rgb(179, 219, 255);
  opacity: 0.5;
`;

const MoreBtn = styled.div`
  color: rgb(168, 168, 168);
  font-size: 12px;
  cursor: pointer;
`;

interface IPostDetailContents {
  isMobile: boolean;
  post: PostsDataType | undefined;
}

const PostDetailContents = ({ isMobile, post }: IPostDetailContents) => {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const test = false;

  const handleCommentFocus = () => {
    if (commentRef.current) {
      commentRef.current.focus();
    }
  };

  return (
    <>
      {isMobile ? (
        <PostDetailContentsMobile post={post} />
      ) : (
        <PostDetailContentsPC post={post} />
      )}
    </>
  );
};

export default PostDetailContents;
