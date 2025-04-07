import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, MenuList, MenuItem, ListItemText, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '0.063rem solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: (theme.vars || theme).palette.background.default,
  boxShadow: 0,
}));

const HeaderTitle = styled(Typography)({
  flexGrow: 1, 
  fontSize: '1.125rem',
  fontWeight: '500',
});

const Header = ({ title, showBackButton = false, showCloseButton = false, enableDrawer = false }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

   // Drawer 상태 변경 함수
   const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // 뒤로가기 버튼 클릭 시 이전 페이지로 이동
  const handleBack = () => {
    navigate(-1);
  };

  // 메뉴 데이터
  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: '등록된 주소 보기', path: '/AddressList' },
    { name: '주소등록', path: '/AddressReg' },
    { name: '전세안전체크', path: '/SafetyCheckList' },
    { name: '주변 시세보기', path: '/MarketPrice' },
    { name: '지도 검색', path: '/MapSearch' },
    { name: '주요 변동정보', path: '/ChangeInfoList' },
    { name: '공지사항', path: '/NoticeList' },
    { name: '유튜브', path: '/YoutubeList' },
    { name: '뉴스', path: '/NewsList' },
    { name: '매물등록 요청', path: '/SaleRequest' },
    { name: '매물요청 현황', path: '/SaleList' },
    { name: '일정', path: '/ScheduleList' },
    { name: '공인중개사 공제증서 확인', path: '/CertificateCheck' },
    { name: '전자계약서', path: '/Contract' },
    { name: 'test', path: '/Register' },
    { name: 'AddBuildingTest', path: '/AddBuildingTest' },
  ];

  const Gnb = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: 250 }}
    >
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem button component={Link} to={item.path}>
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );

  return (
    <>
      {/* AppBar 설정 */}
      <AppBar position="fixed" sx={{ boxShadow: 0, color: 'text.primary' }}
      >
        <StyledToolbar>

          {/* DefaultLayout Header */}
          {!showBackButton && !showCloseButton && enableDrawer && (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
              <HeaderTitle variant="h2" sx={{ paddingLeft: '2.5rem'}}>{title}</HeaderTitle>
              <IconButton color="inherit" aria-label="login"><PersonOutlineIcon /></IconButton>
              <IconButton edge="end" color="inherit" aria-label="send"><SendOutlinedIcon /></IconButton>
            </>
          )}

          {/* SubpageLayout Header */}
          {showBackButton && (
            <>
              <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}><ArrowBackIcon /></IconButton>
              <HeaderTitle variant="h2" sx={{ paddingLeft: '0.25rem', textAlign: 'left' }} >{title}</HeaderTitle>
            </>
          )}

          {/* FullpageLayout Header */}
          {showCloseButton && (
            <>
              <HeaderTitle variant="h2" sx={{ textAlign: 'left' }} >{title}</HeaderTitle>
              <IconButton edge="end" color="inherit" aria-label="close" onClick={handleBack}><CloseIcon /></IconButton>
            </> 
          )}

        </StyledToolbar>
      </AppBar>

      {/* Drawer 설정 */}
      {enableDrawer && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {Gnb()}
        </Drawer>
      )}
      <Toolbar />
    </>
  );
};

export default Header;