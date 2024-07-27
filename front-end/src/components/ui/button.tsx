import type { ButtonProps } from 'antd';
import { Button as AntButton } from 'antd';
import type { Ref } from 'react';
import { forwardRef } from 'react';

interface Props extends ButtonProps {}

export const Button = forwardRef((props: Props, ref: Ref<HTMLButtonElement>) => {
  return <AntButton ref={ref} {...props} />;
});
