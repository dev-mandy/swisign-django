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

const BoardSort = ({ sortOption, setSortOption }) => {
  return (
    <FormControl sx={{ width: '100%', minWidth: '6.25rem' }}>
      <CustomSelect
        size="small"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        renderValue={(value) => {
          if (value === 'latest') return '최신순';
          if (value === 'oldest') return '오래된순';
        }}
        sx={{ fontSize: '0.875rem' }}
      >
        <MenuItem value="latest" sx={{ fontSize: '0.875rem' }}>최신순</MenuItem>
        <MenuItem value="oldest" sx={{ fontSize: '0.875rem' }}>오래된순</MenuItem>
      </CustomSelect>
    </FormControl>
  );
};

export default BoardSort;