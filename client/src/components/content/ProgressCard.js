import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Stack, CircularProgress, Box } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';

const ProgressCard = ({ date, message, targetProgress }) => {

  const [progress, setProgress] = useState(0);

  const getProgressAttributes = (value) => {
    if (value <= 20) return { color: "#f13939", status: "불안" };
    if (value <= 40) return { color: "#e09e0d", status: "불안" };
    if (value <= 60) return { color: "#bac305", status: "보통" };
    if (value <= 80) return { color: "#68a605", status: "안전" };
    return { color: "#238901", status: "안전" };
  };

  const { color, status } = getProgressAttributes(progress);

  useEffect(() => {
    setProgress(targetProgress);
  }, [targetProgress]);

  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'flex-start',  gap: 1, mb: 2 }}>
        <HomeWorkOutlinedIcon size="small" />
        <Typography variant="body1" component="p">
          서울특별시 종로구 대학로 86 한국방송통신대학교 나눔관 509호
        </Typography>
      </Stack>
      <Card variant='outlined' sx={{ display: "flex", alignItems: "center",  p: 2 }}>
        <CardContent sx={{ flex: 1, p: 0 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '0.875rem'}}>
            기준 : {date}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <NotificationsIcon fontSize="small" />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{message}</Typography>
          </Box>
        </CardContent>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          {/* 배경 원형 */}
          <CircularProgress
            variant="determinate"
            value={100}
            sx={{
              color: "#f0f0f0",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            size={110}
            thickness={4}
          />
          {/* 실제 프로그래스 */}
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{ color,  strokeLinecap: "round" }}
            size={110}
            thickness={4}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* %값 */}
            <Typography variant="h5" component="div" color="textPrimary" sx={{ fontWeight: 600 }}>
              {progress}<small>점</small>
            </Typography>
            {/* 상태 메시지 */}
            <Typography variant="body2" component="div" color="textSecondary">
              ({status})
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ProgressCard;