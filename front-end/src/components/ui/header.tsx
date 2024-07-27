import { Link } from 'react-router-dom';
import AntDropdown from '~/components/ui/dropdown';

const AntHeader = () => {
  return (
    <header>
      <nav className='fixed top-0 left-0 right-0 z-[3] px-3 bg-white border-b shadow-sm py-2 flex items-center h-16'>
        <div className='2xl:container flex flex-wrap items-center justify-between 2xl:mx-auto grow'>
          <Link className='flex items-center' to='/'>
            <img src='/logo.png' alt='logo' width={100} />
            {/* <h1 className='font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-violet-400 to-orange-600'>
              ĐTN
            </h1> */}
          </Link>
          <AntDropdown />
        </div>
      </nav>
    </header>
  );
};

export default AntHeader;
