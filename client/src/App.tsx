import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/layouts';
import Router from './components/router';

const App = () => {
  // const userInfo = useRecoilValueLoadable(getUserInfo);
  // console.log(userInfo);

  return (
    <>
      <ToastContainer
        stacked
        autoClose={1000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <Layout>
        <Router />
      </Layout>
    </>
  );
};

export default App;
