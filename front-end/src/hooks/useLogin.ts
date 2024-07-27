import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';

export const useLogin = () => {
  const isLogin = useSelector((state: RootState) => state?.Auth?.isSignedIn);

  return isLogin;
};
