import React from 'react';
import { FormControl, OutlinedInput, InputAdornment, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: grey[400],
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: grey[400],
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.dark,
  },
}));

const BoardSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <FormControl fullWidth>
      <CustomOutlinedInput
        size="small"
        id="search"
        placeholder="제목 및 내용으로 검색하세요"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        inputProps={{
          'aria-label': '검색',
        }}
      />
    </FormControl>
  );
};

export default BoardSearch;