// BoardFilter.js

import React from 'react';
import { FormControl, Select, MenuItem, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: grey[400],
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: grey[400],
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const BoardFilter = ({ filterOption, setFilterOption }) => {
  return (
    <FormControl sx={{ width: '100%', minWidth: '6.25rem' }}>
      <CustomSelect
        size="small"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
        renderValue={(value) => {
          if (value === 'all') return '전체';
          if (value === 'request') return '요청';
          if (value === 'register') return '등록';
          if (value === 'inProgress') return '진행';
          if (value === 'complete') return '완료';
          if (value === 'cancel') return '취소';
        }}
        sx={{ fontSize: '0.875rem' }}
      >
        <MenuItem value="all" sx={{ fontSize: '0.875rem' }}>전체</MenuItem>
        <MenuItem value="request" sx={{ fontSize: '0.875rem' }}>요청</MenuItem>
        <MenuItem value="register" sx={{ fontSize: '0.875rem' }}>등록</MenuItem>
        <MenuItem value="inProgress" sx={{ fontSize: '0.875rem' }}>진행</MenuItem>
        <MenuItem value="complete" sx={{ fontSize: '0.875rem' }}>완료</MenuItem>
        <MenuItem value="cancel" sx={{ fontSize: '0.875rem' }}>취소</MenuItem>
      </CustomSelect>
    </FormControl>
  );
};

export default BoardFilter;
