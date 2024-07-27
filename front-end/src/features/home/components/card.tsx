import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardItemProps {
  backgroundImageURL: string;
  linkTo: string;
  iconSrc: string;
  altText: string;
  title: string;
  bgColor: string;
}

export const CardItem: React.FC<DashboardItemProps> = ({
  backgroundImageURL,
  linkTo,
  iconSrc,
  altText,
  title,
  bgColor
}) => {
  return (
    <li
      className='min-w-[300px] overflow-hidden'
      style={{
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Link
        className='group p-3 flex items-center rounded-lg gap-3 shadow-sm hover:transition-all bg-[-8px_50%] bg-[length:45%] hover:bg-[-70px_50%] hover:bg-[length:100%] duration-1000 hover:duration-1000'
        style={{ backgroundColor: bgColor }}
        to={linkTo}
      >
        <div className='p-2'>
          <img src={iconSrc} alt={altText} className='w-12 h-12 group-hover:scale-110 duration-1000' />
        </div>
        <div className='grow text-base text-gray-100'>{title}</div>
      </Link>
    </li>
  );
};
