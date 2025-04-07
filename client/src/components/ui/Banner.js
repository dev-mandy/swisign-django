import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Link, styled } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import BannerData from '../../data/BannerData.json';

const BannerCard = styled(Card) ({
  display: 'block', 
  width: '100%', 
  borderRadius: '0.5rem', 
  borderColor: 'grey.200'
});

const Banner = () => {
  const [paddingValue, setPaddingValue] = useState('1rem');

  useEffect(() => {
    // 화면 크기에 따라 패딩 값 업데이트하는 함수 정의
    const updatePadding = () => {
      setPaddingValue(window.innerWidth >= 600 ? '1.5rem' : '1rem');
    };
    // 초기 로드 및 윈도우 리사이즈 시 패딩 업데이트
    updatePadding();
    window.addEventListener('resize', updatePadding);

    return () => window.removeEventListener('resize', updatePadding);
    
  }, []);

  return (
    <Box sx={{ ml: { xs: -2, sm: -3 }, mr: { xs: -2, sm: -3 } }}>
      <Swiper 
        spaceBetween={24} 
        slidesPerView={1} 
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={500}
        pagination={false} 
        modules={[Autoplay, Pagination]}
        style={{ paddingLeft: paddingValue, paddingRight: paddingValue }}
      >
        {BannerData.map((banner, index) => (
          <SwiperSlide key={index}>
            <BannerCard variant="outlined" component={Link} href={banner.linkUrl} target="_blank">
              <CardMedia image={banner.imageUrl} alt={banner.title} sx={{ paddingTop: '32%' }} />
            </BannerCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;