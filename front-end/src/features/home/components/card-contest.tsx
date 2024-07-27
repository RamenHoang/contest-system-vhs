import { Image } from 'antd';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { ICompetition } from '~/types';
import { toSlug } from '~/utils/helpers';

export const CardContest = ({ competition }: { competition: ICompetition }) => {
  return (
    <div className='relative w-full mt-4'>
      <Link to={`competition/cuoc-thi/intro/${competition?.id}/${toSlug(competition?.name)}`}>
        <div className='p-2 shadow-md rounded-2xl w-full'>
          <div className='flex items-center md:gap-10 flex-col sm:flex-row'>
            <div className='flex-shrink-0 w-full sm:w-60'>
              <Image
                loading='lazy'
                crossOrigin='anonymous'
                preview={false}
                src={
                  competition?.bannerUrl !== null && competition?.bannerUrl !== ''
                    ? `${import.meta.env.VITE_DOMAIN_URL}${competition?.bannerUrl}`
                    : `${import.meta.env.VITE_DOMAIN_URL}/default_banner.jpg`
                }
                alt='banner'
                className='rounded-xl !w-[400px] sm:!w-64 max-h-32 object-cover'
              />
            </div>
            <div className='flex flex-col flex-grow sm:hidden'>
              <div className='text-base font-medium text-gray-600'>{competition?.name}</div>
              <div className='text-gray-500 font-light'>
                {format(new Date(competition?.timeStart), 'dd/MM/yyyy HH:mm:ss') ?? '-'}
              </div>
              <div className='text-gray-500 font-light'>
                {format(new Date(competition?.timeEnd), 'dd/MM/yyyy HH:mm:ss') ?? '-'}
              </div>
            </div>
            <div className='hidden sm:flex flex-col flex-grow'>
              <div className='text-base font-medium text-gray-600'>{competition?.name}</div>
              <div className='flex flex-col'>
                <div className='text-base text-gray-500 font-light'>
                  {format(new Date(competition?.timeStart), 'dd/MM/yyyy HH:mm:ss') ?? '-'}
                </div>
                <div className='text-base text-gray-500 font-light'>
                  {format(new Date(competition?.timeEnd), 'dd/MM/yyyy HH:mm:ss') ?? '-'}
                </div>
              </div>
            </div>
            {/* <div className='hidden sm:flex flex-col sm:w-[20%] text-gray-500 font-light'>
              <div className='text-base'>{competition?.Units.map(unit => unit.name).join(' / ')}</div>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};
