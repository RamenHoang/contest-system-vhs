import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, message, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { AuthApi } from '~/api/auth-api';
import { useInfo } from '~/hooks/useInfo';
import { useLogin } from '~/hooks/useLogin';
import { logoutFailed, logoutStart, logoutSuccess } from '~/store/slice/AuthSlice';

const AntDropdown = () => {
  const dispatch = useDispatch();
  const user = useInfo();
  const isLoggedIn = useLogin();

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      const res = await AuthApi.logoutAccount(user?.refreshToken as string);
      if (res?.statusCode === 200) {
        dispatch(logoutSuccess());
        message.success('Đăng xuất thành công');
        <Navigate to='/auth/sign-in' replace={true} />;
      }
    } catch (error) {
      dispatch(logoutFailed());
      <Navigate to='/auth/sign-in' replace={true} />;
      console.log(error);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: <p onClick={handleLogout}>Đăng xuất</p>,
      key: '3'
    }
  ];

  return isLoggedIn ? (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00', fontWeight: 'bold' }}>N</Avatar>
          <p className='text-primary-900'>{user?.username}</p>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  ) : (
    <Button type='primary' size='large'>
      <Link to='/auth/sign-in'>Đăng nhập</Link>
    </Button>
  );
};

export default AntDropdown;
