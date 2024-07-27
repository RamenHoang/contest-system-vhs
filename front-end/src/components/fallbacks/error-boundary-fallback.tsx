import { Result } from 'antd';
import type { FallbackProps } from 'react-error-boundary';
import { Button } from '../ui';

export const ErrorBoundaryFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const onBack = () => {
    resetErrorBoundary();
    window.location.reload();
  };
  return (
    <Result
      status='500'
      title='500'
      subTitle='Sorry, something went wrong.'
      extra={
        <Button type='primary' onClick={onBack}>
          Trở về trang chủ
        </Button>
      }
    />
  );
};
