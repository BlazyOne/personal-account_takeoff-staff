import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthForm } from '../../components';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { currentUser } from '../../redux/slices/user';
import { checkAuthorization } from '../../redux/actions/user';

const { Content } = Layout;

const PageAuth: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUserRedux = useAppSelector(currentUser);

  useEffect(() => {
    if (currentUserRedux) {
      navigate('/contacts');
    } else {
      dispatch(checkAuthorization());
    }
  }, [currentUserRedux, navigate, dispatch]);

  return (
    <Layout className='site-layout'>
      <Content className='site-layout__content site-layout__content--auth-form'>
        <div className='site-layout__auth-form-wrapper'>
          <AuthForm />
        </div>
      </Content>
    </Layout>
  );
};

export default PageAuth;