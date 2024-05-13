import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';

import { Suspense, lazy } from 'react';
import Loading from './common/loading';

const HomePage = lazy(() => import('../pages/home'));
const AboutPage = lazy(() => import('../pages/about'));
const PostsPage = lazy(() => import('../pages/posts'));
const CommentListPage = lazy(() => import('../pages/comment-list'));
const PostDetailPage = lazy(() => import('../pages/post-detail'));
const WritePage = lazy(() => import('../pages/write'));
const MyPage = lazy(() => import('../pages/my-page'));
const ProfileEditPage = lazy(() => import('../pages/edit'));
const NotFound = lazy(() => import('./not-found'));

const Router = () => {
  return (
    <Suspense fallback={<Loading initialLoading={true} />}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/:id/commentList' element={<CommentListPage />} />
        <Route path='/post/:id' element={<PostDetailPage />} />

        <Route element={<PrivateRoute />}>
          <Route path='/write' element={<WritePage />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/edit/:id' element={<ProfileEditPage />} />
        </Route>

        {/* 경로 외에 곳으로 갔을때 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
