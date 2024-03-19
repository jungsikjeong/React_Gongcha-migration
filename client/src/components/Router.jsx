import { Route, Routes } from 'react-router-dom';

import AboutPage from '../pages/about';
import HomePage from '../pages/home';
import PostsPage from '../pages/posts';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/posts' element={<PostsPage />} />

        {/* 경로 외에 곳으로 갔을때 */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default Router;
