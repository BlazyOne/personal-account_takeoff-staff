import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { currentUser } from './redux/slices/user';
import { checkAuthorization } from './redux/actions/user'

export const RequireAuth = ({ children }: { children?: JSX.Element}) => {
  const currentUserRedux = useAppSelector(currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      navigate('/');
    } else if (!currentUserRedux) {
      dispatch(checkAuthorization());
    }
  }, [currentUserRedux, dispatch, navigate]);

  return children ? children : <Outlet/>;
}