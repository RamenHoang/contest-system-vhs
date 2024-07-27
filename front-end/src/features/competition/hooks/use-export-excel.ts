import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';

export const useExportExcel = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const exportExcel = async (pageIndex: number, pageSize: number, fromDate: string, toDate: string) => {
    setLoading(true);
    try {
      await CompetitionApi.exportExcel(id as string, pageIndex, pageSize, fromDate, toDate);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { exportExcel, loading };
};
