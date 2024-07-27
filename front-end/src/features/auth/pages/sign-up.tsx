import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='text-2xl text-red-500'>
      <title>Đăng ký</title>
      SignUp
      <Link to='/auth/sign-in'>Sign In</Link>
    </div>
  );
};

export default SignUp;
