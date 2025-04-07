import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import getTitle from '../utils/getTitle';

const DefaultLayout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {/* enableDrawer 속성을 통해 햄버거 메뉴와 Drawer 기능 활성화 */}
      <Header onMenuClick={() => {}} title={getTitle(location.pathname)} enableDrawer />
      <main>
        <Container sx={{ 
          pt: { xs: 3, sm: 6 }, 
          pb: { xs: 3, sm: 6 },
          textAlign: 'left',
        }}>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;