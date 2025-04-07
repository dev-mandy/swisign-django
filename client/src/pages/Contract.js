import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Stack, styled } from '@mui/material';
import ContractTemplate from '../components/contract/ContractTemplate';
import generatePDF from '../components/contract/PDFGenerator';

const ContractWrap = styled(Container)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: 0
}));

const Contract = ({data}) => {

  const navigate = useNavigate();
  const [isButtonView, setIsButtonView] = useState(true);
  const [contractData, setContractData] = useState({
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
    principalUse: '',

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
    rentPaymentAccountBank: '',
    rentPaymentAccount: '',
    maintenancePee: '',
    maintenanceType: '',

    // 특약사항
    specialAgreement: '',
    
    // 서명
    signatures: {
      lessor: null,
      lessee: null
    }
  });

  // 컴포넌트 마운트 시 localStorage에서 데이터 불러오기
  useEffect(() => {
    /*const savedData = localStorage.getItem('contractData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setContractData(prev => ({
        ...prev,
        ...parsedData
      }));
    }*/

    if (data) {
      const parsedData = data;
      console.log(data)
      setIsButtonView(false);
      setContractData(prev => ({
        ...prev,
        ...parsedData
      }));
    }
  }, []);

  const handleSignatureUpdate = (type, signatureData) => {
    setContractData(prev => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [type]: signatureData
      }
    }));
    
    // 서명 데이터도 localStorage에 저장
    const updatedData = {
      ...contractData,
      signatures: {
        ...contractData.signatures,
        [type]: signatureData
      }
    };
    localStorage.setItem('contractData', JSON.stringify(updatedData));
  };

  const handleGeneratePDF = () => {
    generatePDF('contract-template');
  };

  const handleInputClick = () => {
    navigate('/contract/input');
  };

  return (
    <ContractWrap>
      <Box id="contract-template">
        <ContractTemplate 
          contractData={contractData}
          onSignatureUpdate={handleSignatureUpdate}
        />
      </Box>

      { isButtonView &&
          <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2, mb: 2 }}
      >
        <Button
          variant="outlined"
          onClick={handleInputClick}
        >
          계약정보 입력
        </Button>
        <Button
          variant="contained"
          onClick={handleGeneratePDF}
          // disabled={!contractData.lessorName || !contractData.lesseeName}
        >
          PDF 저장
        </Button>
      </Stack>

      }
    </ContractWrap>
  );
};

export default Contract;