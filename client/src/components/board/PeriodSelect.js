import React from 'react';
import { ButtonGroup, Button, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const CustomButton = styled(Button)(({ theme }) => ({
  fontWeight: '400',
  borderColor: grey[400], // 기본 상태의 라인 색상을 grey.400으로 설정
  '&:hover': {
    borderColor: grey[400], // hover 상태에서도 라인 색상을 grey.400으로 유지
    borderRightColor: grey[400], // hover 시 border-right-color를 강제로 grey.400으로 설정
  },
  '&.MuiButton-outlinedPrimary:hover': {
    borderColor: grey[400], // outlinedPrimary 클래스 hover 시에도 일관된 색상 유지
  },
}));

const PeriodSelect = ({ setSelectedDateRange }) => {
  return (
    <ButtonGroup variant="outlined" aria-label="기간 범위 선택" fullWidth sx={{ maxWidth: { xs: '100%', sm: '17.5rem' } }}>
      <CustomButton  onClick={() => setSelectedDateRange('all')}>전체</CustomButton>
      <CustomButton  onClick={() => setSelectedDateRange(1)}>1개월</CustomButton>
      <CustomButton  onClick={() => setSelectedDateRange(3)}>3개월</CustomButton>
      <CustomButton  onClick={() => setSelectedDateRange(6)}>6개월</CustomButton>
    </ButtonGroup>
  );
};

export default PeriodSelect;