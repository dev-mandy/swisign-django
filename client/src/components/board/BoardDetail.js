import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { List, ListItem, ListItemText, Chip, IconButton, styled } from '@mui/material';
import { grey, green } from '@mui/material/colors';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CallIcon from '@mui/icons-material/Call';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const ReplyList = styled(List)(({ theme }) => ({
  padding: '0',
  marginBottom: '2rem',
  '& > li': {
    gap: '0.5rem',
    border: `1px solid ${grey[300]}`,
    borderRadius: '0.25rem',
  },
  '& > li:not(:first-child)': {
    marginTop: '0.5rem'
  },
}));

const BoardDetail = ({ data, type, showYoutube = false, showSource = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const parsedId = isNaN(parseInt(id)) ? id : parseInt(id)
  const boardItem = data.find((item) => item.id === parsedId);

  if (!boardItem) {
    return <Box>해당 게시물을 찾을 수 없습니다.</Box>;
  }

  // type에 따라 switch 문으로 레이아웃 구분
  switch (type) {
    case "sale":
      return (
        <>
        
          <Typography variant="h6" mb={2}>기본정보</Typography>

          <List sx={{ marginBottom: '2rem', padding: '0', borderTop: `1px solid ${grey[300]}` }}>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>주소</Typography>
              <Typography variant="body2">서울특별시 강동구 천호동</Typography>
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>주소_지번</Typography>
              <Typography variant="body2">50-22</Typography>
              <IconButton aria-label="map" sx={{ marginLeft: 'auto', p: 0 }}>
                <MapOutlinedIcon />
              </IconButton>
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>주소_도로명</Typography>
              <Typography variant="body2">서울특별시 강동구 천중로43길 48(천호동)</Typography>
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>층/호/면적</Typography>
              <Typography variant="body2">2층 / 201호 / 14.8</Typography>
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>진행상태</Typography>
              <Chip color="primary" size="small" label="등록" sx={{ fontSize: '0.875rem', color: 'white', backgroundColor: green[500], borderRadius: '0.25rem' }} />
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>등록일시</Typography>
              <Typography variant="body2">2024.10.03</Typography>
            </ListItem>
          </List>

          <Typography variant="h6" mb={2}>진행내용</Typography>

          <ReplyList>
            <ListItem secondaryAction={
              <IconButton edge="end" aria-label="call">
                <CallIcon />
              </IconButton>
            }>
              <ListItemText 
                primary={
                  <React.Fragment>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    방문하여 보고 싶어요...
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                <React.Fragment>
                  <Box mt={0.5} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>a***d</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>&nbsp;&nbsp;|&nbsp;&nbsp;2024.10.12</Typography>
                  </Box>
                </React.Fragment>
                }
              />
            </ListItem>
            <ListItem secondaryAction={
              <IconButton edge="end" aria-label="call">
                <CallIcon />
              </IconButton>
            }>
              <ListItemText 
                primary={
                  <React.Fragment>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    방문하여 보고 싶어요...
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                <React.Fragment>
                  <Box mt={0.5} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>c****k</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>&nbsp;&nbsp;|&nbsp;&nbsp;2024.10.12</Typography>
                  </Box>
                </React.Fragment>
                }
              />
            </ListItem>
            <ListItem secondaryAction={
              <IconButton edge="end" aria-label="call">
                <CallIcon />
              </IconButton>
            }>
              <ListItemText 
                primary={
                  <React.Fragment>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    방문하여 보고 싶어요...
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                <React.Fragment>
                  <Box mt={0.5} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>e****y</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>&nbsp;&nbsp;|&nbsp;&nbsp;2024.10.12</Typography>
                  </Box>
                </React.Fragment>
                }
              />
            </ListItem>
          </ReplyList>
          
          <Button variant="text" fullWidth sx={{ fontWeight: '500' }}><AddRoundedIcon sx={{ fontSize: '1rem' }} /> 10개 더보기</Button>
        </>
      );
    default:
      return (
        <>
          <Typography component="h3" sx={{ 
            fontSize: '1.75rem',
            fontWeight: 'medium',
            lineHeight: 1.3,
          }}>{boardItem.title}</Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 3,
            color: 'grey.600',
            fontSize: '0.875rem',
          }}>
            <Box component="p" sx={{ m: 0 }}>등록일: {boardItem.date}</Box>
            <Box component="p" sx={{ m: 0 }}>조회수: {boardItem.views}</Box>
          </Box>
          <Box sx={{ 
            mt: 4, 
            mb: 4, 
            pt: 4, 
            pb: 4, 
            borderTop: 1, 
            borderBottom: 1, 
            borderColor: 'grey.200',
            color: 'grey.900',
            fontSize: '1.125rem',
            fontWeight: 'regular',
            lineHeight: 1.5,
          }}>
            {showYoutube && (
              <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
                <iframe
                  title={boardItem.title}
                  src={`https://www.youtube.com/embed/${boardItem.videoId}`}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                ></iframe>
              </Box>
            )}
            <Box>{boardItem.content}</Box>
            {showSource && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 3,
                color: 'grey.600',
                fontSize: '0.875rem',
              }}>[ 출처 : {boardItem.source} ]</Box>
            )}
          </Box>
          <Button onClick={() => navigate(-1)} variant="outlined" fullWidth>닫기</Button>
        </>
      );
  }
};

export default BoardDetail;