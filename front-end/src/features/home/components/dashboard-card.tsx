// DashboardCard.tsx
import React from 'react';

interface DashboardCardProps {
  imgSrc: string;
  title: string;
  text: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ imgSrc, title, text }) => {
  return (
    <div className='p-2 shadow-md rounded-2xl w-full max-w-[12rem] min-h-40 bg-gray-50'>
      <div className='p-4 flex items-center flex-col'>
        <img src={imgSrc} className='w-[40px] h-auto mt-4' alt='' />
        <div className='card-title mt-4 font-medium text-base text-center'>
          {title}: {text}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
