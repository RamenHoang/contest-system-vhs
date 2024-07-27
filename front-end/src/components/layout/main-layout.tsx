import { Suspense, useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { FullPageFallback } from '~/components/fallbacks';
import AntHeader from '~/components/ui/header';
import { AntMenu } from '~/components/ui/menu';
import { useInfo } from '~/hooks/useInfo';

const { Sider, Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); // 768px is the breakpoint for 'md'
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const user = useInfo();

  return (
    <Layout>
      <AntHeader />
      <Layout
        className='min-h-(calc(100vh - 70px)) min-h-screen text-[#757575] pt-[70px]'
        style={{ position: 'relative' }}
      >
        {!isMobile && user.role === 'admin' && (
          <Sider
            style={{
              backgroundColor: 'white',
              overflow: 'auto',
              height: 'calc(100vh - 70px)',
              position: 'fixed',
              left: 0
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width='240px'
          >
            <AntMenu />
          </Sider>
        )}
        <Content
          style={{
            marginLeft: !isMobile && user.role === 'admin' ? (collapsed ? '80px' : '240px') : '0',
            minHeight: 'calc(100vh - 70px)',
            background: '#ffffff'
          }}
        >
          <Suspense fallback={<FullPageFallback />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};
