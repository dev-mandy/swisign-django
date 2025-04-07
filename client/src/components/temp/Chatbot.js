import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, Button } from '@mui/material';
import { red, blue, grey } from '@mui/material/colors';
import {Document, Page} from "react-pdf";
import contract from "../../assets/contract/주택임대차 표준계약서_계약서만(사용용).pdf";

const Chatbot = ({ data }) => {

  useEffect(() => {

  }, [data]);

  // 상태별 배경 색상을 결정하는 함수
  const getColor = (state) => {
    switch (state) {
      case 'grey':
        return grey[500];
      default:
        return 'primary';
    }
  };

  // 상태별 배경 색상을 결정하는 함수
  const getRole = (state) => {
    switch (state) {
      case 'bot':
        return red[500];
      default:
        return blue[500];
    }
  };

  return (
    <>
      <Box sx={{ mt: 4, mb: 4 }}>
        <List sx={{ p: 0, borderTop: 1, borderColor: 'grey.200' }}>
          {data.map((item) => (
            <ListItem key={item.id} sx={{ display: { xs: 'block' }, p: 1, pt: 2, pb: 2, borderBottom: 1, borderColor: 'grey.200'}}>
              <Box sx={{ display: 'flex', ml: 'auto', mt: { xs: 0.5, sm: 0 }}} >
                  <Typography sx={{
                    pr: { xs: 2, sm: 4 },
                    color: getRole(item.role),
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap'
                  }}>{item.content}</Typography>
              </Box>
              {
                item.components.map((component) => {
                  return component;
                })
              }
              {
                item.buttons.map((button) => (
                  <Button onClick={() => {
                    if(item.activeEvent === false) return false;
                    button.callback();
                    item.resetEvent(item.id);
                  }}  variant="text" fullWidth sx={{ fontWeight: '500' }}>{button.text}</Button>
                ))
              }
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

};

export default Chatbot;