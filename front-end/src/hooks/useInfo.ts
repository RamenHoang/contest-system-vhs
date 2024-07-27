import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';

export const useInfo = () => {
  const user = useSelector((state: RootState) => state?.Auth?.data);

  return user;
};
