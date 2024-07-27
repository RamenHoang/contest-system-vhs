import { useState } from 'react';
import { CompetitionApi } from '~/api/competition-api';

export const useExportExcelRow = () => {
  const [loading, setLoading] = useState(false);

  const exportExcel = async (id: string, pageIndex: number, pageSize: number) => {
    setLoading(true);
    try {
      await CompetitionApi.exportExcelFast(id, pageIndex, pageSize);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { exportExcel, loading };
};
