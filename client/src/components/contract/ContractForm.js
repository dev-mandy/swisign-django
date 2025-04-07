import { TextField, Button, Box, Stack, Grid, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContractForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // 기본 정보
    lessorName: '',
    lessorBirth: '',
    lessorPhone: '',
    lessorAddress: '',
    lesseeName: '',
    lesseeBirth: '',
    lesseePhone: '',
    lesseeAddress: '',
    
    // 계약 목적물
    propertyAddress: '',
    exclusiveArea: '',
    commonArea: '',
    buildingStructure: '',
    buildingYear: '',
    
    // 계약 내용
    leaseStartDate: '',
    leaseEndDate: '',
    deposit: '',
    depositInKorean: '',
    downPayment: '',
    downPaymentInKorean: '',
    middlePayment: '',
    middlePaymentInKorean: '',
    middlePaymentDate: '',
    balance: '',
    balanceInKorean: '',
    balanceDate: '',
    rentAmount: '',
    rentPaymentDay: '',
    
    // 특약사항
    specialAgreement: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    navigate('/contract');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>계약 당사자 정보</Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="임대인 성명"
            name="lessorName"
            value={formData.lessorName}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="임대인 생년월일"
            name="lessorBirth"
            value={formData.lessorBirth}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="임대인 전화번호"
            name="lessorPhone"
            value={formData.lessorPhone}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      
      <TextField
        fullWidth
        label="임대인 주소"
        name="lessorAddress"
        value={formData.lessorAddress}
        onChange={handleChange}
        margin="normal"
      />
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="임차인 성명"
            name="lesseeName"
            value={formData.lesseeName}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="임차인 생년월일"
            name="lesseeBirth"
            value={formData.lesseeBirth}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="임차인 전화번호"
            name="lesseePhone"
            value={formData.lesseePhone}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      
      <TextField
        fullWidth
        label="임차인 주소"
        name="lesseeAddress"
        value={formData.lesseeAddress}
        onChange={handleChange}
        margin="normal"
      />
      
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>계약 목적물</Typography>
      <Divider sx={{ mb: 2 }} />
      
      <TextField
        fullWidth
        label="소재지"
        name="propertyAddress"
        value={formData.propertyAddress}
        onChange={handleChange}
        margin="normal"
      />
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="전용면적(㎡)"
            name="exclusiveArea"
            value={formData.exclusiveArea}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="공용면적(㎡)"
            name="commonArea"
            value={formData.commonArea}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="건물구조"
            name="buildingStructure"
            value={formData.buildingStructure}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="건축년도"
            name="buildingYear"
            value={formData.buildingYear}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>계약 내용</Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="임대차 시작일"
            name="leaseStartDate"
            value={formData.leaseStartDate}
            onChange={handleChange}
            margin="normal"
            placeholder="YYYY-MM-DD"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="임대차 종료일"
            name="leaseEndDate"
            value={formData.leaseEndDate}
            onChange={handleChange}
            margin="normal"
            placeholder="YYYY-MM-DD"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="보증금(숫자)"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="보증금(한글)"
            name="depositInKorean"
            value={formData.depositInKorean}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="계약금(숫자)"
            name="downPayment"
            value={formData.downPayment}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="계약금(한글)"
            name="downPaymentInKorean"
            value={formData.downPaymentInKorean}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="중도금(숫자)"
            name="middlePayment"
            value={formData.middlePayment}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="중도금(한글)"
            name="middlePaymentInKorean"
            value={formData.middlePaymentInKorean}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="중도금 지급일"
            name="middlePaymentDate"
            value={formData.middlePaymentDate}
            onChange={handleChange}
            margin="normal"
            placeholder="YYYY-MM-DD"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="잔금(숫자)"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="잔금(한글)"
            name="balanceInKorean"
            value={formData.balanceInKorean}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="잔금 지급일"
            name="balanceDate"
            value={formData.balanceDate}
            onChange={handleChange}
            margin="normal"
            placeholder="YYYY-MM-DD"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="월 차임(임대료)"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="월 차임 지급일"
            name="rentPaymentDay"
            value={formData.rentPaymentDay}
            onChange={handleChange}
            margin="normal"
            placeholder="매월 몇 일"
          />
        </Grid>
      </Grid>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>특약사항</Typography>
      <Divider sx={{ mb: 2 }} />
      
      <TextField
        fullWidth
        label="특약사항"
        name="specialAgreement"
        value={formData.specialAgreement}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />
      
      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent="center"
        sx={{ mt: 3 }}
      >
        <Button 
          variant="outlined" 
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button 
          type="submit" 
          variant="contained"
        >
          적용
        </Button>
      </Stack>
    </Box>
  );
};

export default ContractForm;
