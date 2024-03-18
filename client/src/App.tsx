import Layout from './components/layouts';
import Router from './components/router';

const App = () => {
  // const userInfo = useRecoilValueLoadable(getUserInfo);
  // console.log(userInfo);

  return (
    <>
      <Layout>
        <Router />
      </Layout>
    </>
  );
};

export default App;
