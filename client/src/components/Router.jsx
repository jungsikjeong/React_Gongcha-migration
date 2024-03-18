import { Route, Routes } from 'react-router-dom';

import About from '../pages/about';
import Home from '../pages/home';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />

        {/* 경로 외에 곳으로 갔을때 */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default Router;
