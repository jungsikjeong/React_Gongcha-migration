import { Route, Routes } from 'react-router-dom';

import AboutPage from '../pages/about';
import CommentListPage from '../pages/commentList';
import HomePage from '../pages/home';
import PostsPage from '../pages/posts';
import WritePage from '../pages/write';
import NotFound from './not-found';
import { PrivateRoute } from './private-route';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/:id/commentList' element={<CommentListPage />} />

        <Route element={<PrivateRoute />}>
          <Route path='/write' element={<WritePage />} />
        </Route>

        {/* 경로 외에 곳으로 갔을때 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
