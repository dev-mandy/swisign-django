import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography } from '@mui/material';
import ContractForm from '../components/contract/ContractForm';

const ContractInput = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    // localStorage를 사용하여 데이터 임시 저장
    localStorage.setItem('contractData', JSON.stringify(data));
    // 메인 계약서 페이지로 돌아가기
    navigate('/contract');
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, my: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          계약 정보 입력
        </Typography>
        <ContractForm onSubmit={handleFormSubmit} />
      </Paper>
    </Container>
  );
};

export default ContractInput;