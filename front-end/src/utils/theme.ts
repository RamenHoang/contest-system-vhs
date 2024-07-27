import type { ThemeConfig } from 'antd';

export const primaryColor = '#1677ff';
export const errorColor = '#ff4d4f';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: primaryColor,
    colorError: errorColor,

    colorWarning: '#fdb812',
    colorSuccess: '#10B981',
    borderRadius: 4,

    fontFamily: 'Lexend',
    fontWeightStrong: 400,

    colorPrimaryBg: 'rgba(0,0,0,0.05)'

    // motion: false,
  },
  components: {
    Button: {
      primaryShadow: 'none',
      boxShadowSecondary: 'none',
      colorPrimary: '#1677ff', // Secondary color
      colorPrimaryHover: '#146ae6', // Slightly darker for hover
      colorPrimaryActive: '#125ecc', // Even darker for active
      colorError: '#ff4d4f', // Secondary color
      colorErrorHover: '#e04446', // Slightly darker for hover
      colorErrorActive: '#c0393b', // Even darker for active
      // lineWidth: 0
    }
  }
};
