import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, List, ListItem, Card, CardMedia, CardContent, CardActionArea, Chip, styled } from '@mui/material';
import { orange, green, blue, grey, red } from '@mui/material/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const SectionHeader = ({ title, link }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
    <Typography component="h2" sx={{ fontSize: '1.25rem', fontWeight: '600' }}>{title}</Typography>
    <Button variant="text" size="small" endIcon={<AddRoundedIcon />} component={Link} to={link} sx={{ mr: -0.5 }}>더보기</Button>
  </Box>
);

const PostTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: (theme.vars || theme).palette.text.primary,
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const PostDate = styled(Typography)({
  color: '#757575',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
});

const RecentPosts = ({ title, link, detailLink, data, type, showSource = false }) => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [paddingValue, setPaddingValue] = useState('1rem');

  useEffect(() => {
    // 데이터 날짜 기준으로 정렬하여 최신 게시물 3개만 가져오기
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setLatestPosts(sortedData.slice(0, 3));

    // 화면 크기에 따라 패딩 값 업데이트하는 함수 정의
    const updatePadding = () => {
      setPaddingValue(window.innerWidth >= 600 ? '1.5rem' : '1rem');
    };
    // 초기 로드 및 윈도우 리사이즈 시 패딩 업데이트
    updatePadding();
    window.addEventListener('resize', updatePadding);

    return () => window.removeEventListener('resize', updatePadding);

  }, [data]);
  
  // 상태별 배경 색상을 결정하는 함수
  const getChipColor = (state) => {
    switch (state) {
      case '요청':
        return orange[500];
      case '등록':
        return green[500];
      case '진행':
        return blue[500];
      case '완료':
        return grey[500];
      case '취소':
        return red[500];
      default:
        return 'primary';
    }
  };

  // type에 따라 switch 문으로 레이아웃 구분
  switch (type) {
    case "youtube":
      return (
        <>
          <SectionHeader title={title} link={link} />
          <Box sx={{ ml: { xs: -2, sm: -3 }, mr: { xs: -2, sm: -3 } }}>
            <Swiper
              spaceBetween={24}
              slidesPerView={1.6}
              freeMode={true} 
              style={{ paddingLeft: paddingValue, paddingRight: paddingValue }}
            >
              {latestPosts.map((item) => (
                <SwiperSlide key={item.id}>
                  <Card variant="outlined" sx={{ width: '100%', borderRadius: 2, borderColor: 'grey.200' }}>
                    <CardActionArea>
                      <CardMedia component={Link} to={`/YoutubeDetail/${item.id}`} sx={{ display: 'block' }}>
                        <Box component="img" src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} alt={item.title} sx={{ width: '100%' }} />
                      </CardMedia>
                      <CardContent sx={{ pt: 1, pb: 2 }}>
                        <PostTitle component={Link} to={`/YoutubeDetail/${item.id}`}>{item.title}</PostTitle>
                        <PostDate sx={{ mt: 0.5 }}>{item.date}</PostDate>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </>
      );
    case "schedule":
      return (
        <>
          <SectionHeader title={title} link={link} />
          <List sx={{ p: 0, borderTop: 1, borderColor: 'grey.200' }}>
            {latestPosts.map((item) => (
              <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center', p: 0, pt: 1.5, pb: 1.5, borderBottom: 1, borderColor: 'grey.200' }}>
                <Box sx={{ pr: 4 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 'medium',}}>{item.date}&nbsp;&nbsp;{item.time}</Typography>
                  <Typography sx={{ mt: 0.5, fontSize: '1rem', color: 'grey.800' }}>{item.address}</Typography>
                </Box>
                <Chip variant="outlined" color="primary" label={item.content} sx={{ ml: 'auto', fontSize: '0.875rem', fontWeight: '500', borderRadius: '0.25rem' }} />
              </ListItem>
            ))}
          </List>
        </>
      );
    case "sale":
      return (
        <>
          <SectionHeader title={title} link={link} />
          <List sx={{ p: 0, borderTop: 1, borderColor: 'grey.200' }}>
            {latestPosts.map((item) => (
              <ListItem key={item.id} sx={{ display: 'flex', p: 0, pt: 1.5, pb: 1.5, borderBottom: 1, borderColor: 'grey.200' }}>
                <Box sx={{ display: { xs: 'block', sm: 'flex' }, alignItems: 'center', width: '100%', overflow: 'hidden' }}>
                  <PostTitle component={Link} to={`${detailLink}/${item.id}`} sx={{ pr: { xs: 0, sm: 4 } }}>
                    <Box component="span" sx={{ mr: 1, fontWeight: 'medium' }}>[{item.type}]</Box> {item.address}
                  </PostTitle>
                  <PostDate sx={{ display: 'flex', ml: 'auto', mt: { xs: 0.5, sm: 0 } }}>{item.date}</PostDate>
                </Box>
                <Box sx={{ ml: 'auto' }}><Chip color="primary" size="small" label={item.state} sx={{ ml: { xs: 2, sm: 4 }, fontSize: '0.875rem', color: 'white', backgroundColor: getChipColor(item.state), borderRadius: '0.25rem' }} /> 
                </Box>
              </ListItem>
            ))}
          </List>
        </>
      );
    default:
      return (
        <>
          <SectionHeader title={title} link={link} />
          <List sx={{ p: 0, borderTop: 1, borderColor: 'grey.200' }}>
            {latestPosts.map((item) => (
              <ListItem key={item.id} sx={{ display: { xs: 'block', sm: 'flex' }, p: 0, pt: 1.5, pb: 1.5, borderBottom: 1, borderColor: 'grey.200' }}>
                <PostTitle component={Link} to={`${detailLink}/${item.id}`} sx={{ pr: { xs: 0, sm: 4 } }} dangerouslySetInnerHTML={{__html: item.title}}></PostTitle>
                <Box sx={{ display: 'flex', ml: 'auto', mt: { xs: 0.5, sm: 0 }}} >
                  {showSource && (
                    <PostDate sx={{ pr: { xs: 2, sm: 4 } }}>{item.source}</PostDate>
                  )}
                  <PostDate>{item.date}</PostDate>
                </Box>
              </ListItem>
            ))}
          </List>
        </>
      );
  }

};

export default RecentPosts;