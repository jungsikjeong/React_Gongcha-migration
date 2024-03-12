import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';

const Router = () => {
  return (
    <>
      <Routes>
        {/* 메인페이지 */}
        <Route path='/' element={<Home />} />

        {/* 경로 외에 곳으로 갔을때 */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default Router;
