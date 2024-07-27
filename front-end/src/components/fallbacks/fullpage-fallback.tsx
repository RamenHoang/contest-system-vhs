import { Spin } from 'antd';

export const FullPageFallback = () => {
  return (
    <div className='grid h-full w-full place-items-center'>
      <Spin spinning tip='Đang tải trang. Vui lòng chờ đợi ...'>
        <div className='w-[230px]' />
      </Spin>
    </div>
  );
};
