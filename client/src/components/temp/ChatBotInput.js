import React from 'react';
import {InputAdornment, OutlinedInput, styled} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {grey} from "@mui/material/colors";

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

const ChatbotInput = ({ value, setValue, placeholder }) => {

  return (
        <CustomOutlinedInput
            size="small"
            id="search"
            placeholder={placeholder}
            sx={{ flexGrow: 1 }}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            }
            value={value}
            onChange={(e) => {setValue(e.target.value);}}
            inputProps={{
              'aria-label': '검색',
            }}
      />
  );
};

export default ChatbotInput;