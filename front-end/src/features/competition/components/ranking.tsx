import { IStatistic } from '~/types';

const RankingList = ({ listRanking }: { listRanking: IStatistic[] }) => {
  const sortedData = listRanking?.sort((a, b) => b.totalCorrectAnswers - a.totalCorrectAnswers);

  const getBackgroundColor = (index: number) => {
    if (index === 0) return 'bg-amber-300 font-bold';
    if (index === 1) return 'bg-amber-200 font-bold';
    if (index === 2) return 'bg-amber-100 font-bold';
    return 'bg-[#F8F5F5]';
  };

  return (
    <div>
      {sortedData?.map((item, index: number) => (
        <div
          key={index}
          className={`grid-cols-12 rounded-xl py-6 px-6 mt-4 shadow-md grid ${getBackgroundColor(index)}`}
        >
          <div className='col-span-6 md:col-span-4 flex items-center gap-4'>
            <div className='w-8 h-8 flex items-center justify-center font-semibold text-base'>{index + 1}</div>
            <span className='inline-block'>{item?.fullName}</span>
          </div>
          <div className='col-span-6 md:col-span-3 flex items-center'>
            <span data-v-tippy=''>
              <div>Số câu đúng: {item?.totalCorrectAnswers}</div>
            </span>
          </div>
          <div className='md:col-span-3 flex items-center'>
            <span data-v-tippy=''>
              <div>Tỉ lệ: {item?.correctAnswersRate}%</div>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankingList;
