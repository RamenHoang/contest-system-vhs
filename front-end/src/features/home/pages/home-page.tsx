import { CardContest, CardItem } from '~/features/home/components';
import { useCompetitions } from '~/features/home/hooks/use-competitions';
import { useInfo } from '~/hooks/useInfo';
import { ICompetition } from '~/types';

const HomePage = () => {
  const { data: competitions } = useCompetitions();
  const { role } = useInfo();

  return (
    <div className='max-w-screen-lg mx-auto p-4 min-h-screen'>
      {role === 'admin' && (
        <div className='sm:block'>
          <div className='text-[#707070] uppercase text-xl leading-7 font-base mb-4'>BẠN MUỐN TẠO ...</div>
          <ul className='flex items-center gap-4 text-white'>
            <CardItem
              backgroundImageURL={new URL('https://myaloha.vn/image/dashboard/bg_spread.svg').toString()}
              linkTo='/dashboard/contest'
              iconSrc='https://myaloha.vn/image/dashboard/ic_contest.svg'
              altText='online-test'
              title='Thi trực tuyến'
              bgColor='#FCB400'
            />
          </ul>
        </div>
      )}

      {/* <div className='mt-5'>
        <div className='text-[#707070] uppercase text-xl leading-7 font-base mb-4'>BẠN LÀ THÍ SINH DỰ THI</div>
      </div> */}
      <div className='mt-5'>
        <div className='text-[#707070] uppercase text-xl leading-7 font-base mb-4'>Những cuộc thi đang diễn ra</div>
        <div className='relative w-full'>
          {competitions?.data?.map((c: ICompetition, index: number) => <CardContest key={index} competition={c} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
