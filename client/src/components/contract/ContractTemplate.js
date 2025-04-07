import { Paper, Typography, Grid, Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import SignatureModal from './SignatureModal';
import {priceComma, priceToKorean} from "../../utils/StringUtils";

const SignatureBox = ({ title, signature, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      border: '1px dashed grey',
      height: 100,
      width: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      '& img': {
        maxWidth: '100%',
        maxHeight: '100%',
      },
    }}
  >
    {signature ? (
      <img src={signature} alt="서명" />
    ) : (
      <Typography color="text.secondary">
        {title} 서명하기
      </Typography>
    )}
  </Box>
);

const ContractTemplate = ({ contractData, onSignatureUpdate }) => {
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [currentSignatureType, setCurrentSignatureType] = useState(null);

  const handleSignatureClick = (type) => {
    setCurrentSignatureType(type);
    setSignatureModalOpen(true);
  };

  const handleSignatureSave = (signatureData) => {
    onSignatureUpdate(currentSignatureType, signatureData);
    setSignatureModalOpen(false);
  };

  const formatDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  // 날짜 포맷 함수
  const formatDateString = (dateString) => {
    if (!dateString) return '';
    
    try {
      const [year, month, day] = dateString.split('-');
      return `${year}년 ${month}월 ${day}일`;
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 4,
        width: '210mm',  // A4 너비
        margin: '0 auto'
      }}
    >
      <Box sx={{ mb: 4}}>
        <Typography variant="caption" alilgn="left" component="p">
          이 계약서는 법무부가 국토교통부·서울시 및 관련 전문가들과 함께 민법, 주택임대차보호법, 공인중개사법 등 관계법령에 근거하여 만들었습니다. 법의 보호를 받기 위해 【중요확인사항】(별지1)을 꼭 확인하시기 바랍니다.
        </Typography>
      </Box>

      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        주택임대차 표준계약서
      </Typography>
      
      {/* 계약 당사자 정보 */}
      <Box sx={{ mb: 4 }}>
        <Typography component="p">
          임대인( {contractData?.lessorName || <Typography component="span" color="text.secondary">이름 또는 법인명 기재</Typography>} )과 임차인( {contractData?.lesseeName || <Typography component="span" color="text.secondary">이름 또는 법인명 기재</Typography>} )은 아래와 같이 임대차 계약을 체결한다
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {/* 계약 목적물 */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        1. 계약 목적물
      </Typography>
      
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" sx={{ width: '20%', bgcolor: '#f5f5f5' }}>소재지</TableCell>
              <TableCell>{contractData?.propertyAddress || '___________________'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" sx={{ bgcolor: '#f5f5f5' }}>면적</TableCell>
              <TableCell>
                <Grid container spacing={2}>
                  <Grid item xs={6}>전용면적: {contractData?.exclusiveArea || '________'}㎡</Grid>
                  <Grid item xs={6}>공용면적: {contractData?.commonArea || '________'}㎡</Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" sx={{ bgcolor: '#f5f5f5' }}>구조</TableCell>
              <TableCell>
                <Grid container spacing={2}>
                  <Grid item xs={6}>건물구조: {contractData?.buildingStructure || '__________'}</Grid>
                  <Grid item xs={6}>건물용도: {contractData?.principalUse || '__________'}</Grid>
                  <Grid item xs={6}>건축년도: {contractData?.buildingYear || '__________'}</Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* 계약 내용 */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        2. 계약 내용
      </Typography>
      
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" sx={{ width: '20%', bgcolor: '#f5f5f5' }}>임대차 기간</TableCell>
              <TableCell>
                {formatDateString(contractData?.leaseStartDate) || '________년 ________월 ________일'}부터 {formatDateString(contractData?.leaseEndDate) || '________년 ________월 ________일'}까지
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" sx={{ bgcolor: '#f5f5f5' }}>보증금</TableCell>
              <TableCell>
                금 {priceToKorean(contractData?.deposit) || '_________________'}원정 (￦{priceComma(contractData?.deposit) || '_________________'})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" sx={{ bgcolor: '#f5f5f5' }}>계약금</TableCell>
              <TableCell>
                금 {priceToKorean(contractData?.downPayment) || '_________________'}원정 (￦{priceComma(contractData?.downPayment) || '_________________'})은 계약시에 지불하고 영수함.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" sx={{ bgcolor: '#f5f5f5' }}>중도금</TableCell>
              <TableCell>
                금 {priceToKorean(contractData?.middlePayment) || '____________________'}원정 (￦{priceComma(contractData?.middlePayment) || '____________________'})은
                {formatDateString(contractData?.middlePaymentDate) || '________년 ____월 ____일'}에 지불하기로 함.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" sx={{ bgcolor: '#f5f5f5' }}>잔금</TableCell>
              <TableCell>
                금 {priceToKorean(contractData?.balance) || '____________________'}원정 (￦{priceComma(contractData?.balance) || '____________________'})은
                {formatDateString(contractData?.balanceDate) || '________년 ____월 ____일'}에 지불하기로 함.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" sx={{ bgcolor: '#f5f5f5' }}>차임(월세)</TableCell>
              <TableCell>
                금 {priceToKorean(contractData?.rentAmount) || '____________________'}원정은 매월 {priceComma(contractData?.rentPaymentDay) || '____'}일에 지불하기로 함. (입금계좌: {contractData?.rentPaymentAccountBank || ''} {contractData?.rentPaymentAccount || '____'})
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제1조(보증금과 차임 및 관리비) 위 부동산의 임대차에 관하여 임대인과 임차인은 합의에 의하여 보증금과 차임 및 관리비를 아래와 같이 지불하기로 한다.
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제2조(임대차기간) 임대인은 임차주택을 임대차 목적대로 사용‧수익할 수 있는 상태로 ________년 ____월 ____일까지 임차인에게 인도하고, 임대차기간은 인도일로부터 ________년 ____월 ____일까지로 한다. 
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제3조(입주 전 수리) 임대인과 임차인은 임차주택의 수리가 필요한 시설물 및 비용부담에 관하여 다음과 같이 합의한다.
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제4조(임차주택의 사용·관리·수선) ① 임차인은 임대인의 동의 없이 임차주택의 구조변경 및 전대나 임차권 양도를 할 수 없으며, 임대차 목적인 주거 이외의 용도로 사용할 수 없다. <br/>
          ② 임대인은 계약 존속 중 임차주택을 사용·수익에 필요한 상태로 유지하여야 하고, 임차인은 임대인이 임차주택의 보존에 필요한 행위를 하는 때 이를 거절하지 못한다. <br/>
          ③ 임대인과 임차인은 계약 존속 중에 발생하는 임차주택의 수리 및 비용부담에 관하여 다음과 같이 합의한다. 다만, 합의되지 아니한 기타 수선비용에 관한 부담은 민법, 판례 기타 관습에 따른다. <br/>
          ④ 임차인이 임대인의 부담에 속하는 수선비용을 지출한 때에는 임대인에게 그 상환을 청구할 수 있다.
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제5조(계약의 해제) 임차인이 임대인에게 중도금(중도금이 없을 때는 잔금)을 지급하기 전까지, 임대인은 계약금의 배액을 상환하고, 임차인은 계약금을 포기하고 이 계약을 해제할 수 있다.
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제6조(채무불이행과 손해배상) 당사자 일방이 채무를 이행하지 아니하는 때에는 상대방은 상당한 기간을 정하여 그 이행을 최고하고 계약을 해제할 수 있으며,그로 인한 손해배상을 청구할 수 있다. 다만, 채무자가 미리 이행하지 아니할 의사를 표시한 경우의 계약해제는 최고를 요하지 아니한다.
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제7조(계약의 해지) ① 임차인은 본인의 과실 없이 임차주택의 일부가 멸실 기타 사유로 인하여 임대차의 목적대로 사용할 수 없는 경우에는 계약을 해지할 수 있다. <br/>
          ② 임대인은 임차인이 2기의 차임액에 달하도록 연체하거나, 제4조 제1항을 위반한 경우 계약을 해지할 수 있다. 
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제8조(갱신요구와 거절) ① 임차인은 임대차기간이 끝나기 6개월 전부터 2개월 전까지의 기간에 계약갱신을 요구할 수 있다. 다만, 임대인은 자신 또는 그 직계존속·직계비속의 실거주 등 주택임대차보호법 제6조의3 제1항 각 호의 사유가 있는 경우에 한하여 계약갱신의 요구를 거절할 수 있다.<br/>
          ※별지2) 계약갱신 거절통지서 양식 사용가능 <br/>
          ② 임대인이 주택임대차보호법 제6조의3 제1항 제8호에 따른 실거주를 사유로 갱신을 거절하였음에도 불구하고 갱신요구가 거절되지 아니하였더라면 갱신되었을 기간이 만료되기 전에 정당한 사유 없이 제3자에게 주택을 임대한 경우, 임대인은 갱신거절로 인하여 임차인이 입은 손해를 배상하여야 한다. <br/>
          ③ 제2항에 따른 손해배상액은 주택임대차보호법 제6조의3 제6항에 의한다.
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제9조(계약의 종료) 임대차계약이 종료된 경우에 임차인은 임차주택을 원래의 상태로 복구하여 임대인에게 반환하고, 이와 동시에 임대인은 보증금을 임차인에게 반환하여야 한다. 다만, 시설물의 노후화나 통상 생길 수 있는 파손 등은 임차인의 원상복구의무에 포함되지 아니한다. 
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제10조(비용의 정산) ① 임차인은 계약종료 시 공과금과 관리비를 정산하여야 한다. <br/>
          ② 임차인은 이미 납부한 관리비 중 장기수선충당금을 임대인(소유자인 경우)에게 반환 청구할 수 있다. 다만, 관리사무소 등 관리주체가 장기수선충당금을 정산하는 경우에는 그 관리주체에게 청구할 수 있다. 
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제11조(분쟁의 해결) 임대인과 임차인은 본 임대차계약과 관련한 분쟁이 발생하는 경우, 당사자 간의 협의 또는 주택임대차분쟁조정위원회의 조정을 통해 호혜적으로 해결하기 위해 노력한다. 
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제12조(중개보수 등) 중개보수는 거래 가액의 ______%인 ____________________원(□ 부가가치세 포함  □ 불포함)으로 임대인과 임차인이 각각 부담한다. 다만, 개업공인중개사의 고의 또는 과실로 인하여 중개의뢰인간의 거래행위가 무효‧취소 또는 해제된 경우에는 그러하지 아니하다.
        </Typography>
        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
          제13조(중개대상물확인․설명서 교부) 개업공인중개사는 중개대상물 확인․설명서를 작성하고 업무보증관계증서 (공제증서등) 사본을 첨부하여 ________년 ____월 ____일 임대인과 임차인에게 각각 교부한다.
        </Typography>
      </Box>
      
      {/* 특약사항 */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        3. 특약사항
      </Typography>
      
      <Box sx={{ border: '1px solid #ccc', p: 2, mb: 4, minHeight: '100px' }}>
        {contractData?.specialAgreement ? (
          <Typography variant="body2" align="left">{contractData.specialAgreement}</Typography>
        ) : (
          <Typography variant="body2" align="left" color="text.secondary">
            특약사항이 있는 경우 기재하세요.
          </Typography>
        )}
      </Box>
      
      {/* 표준약관 */}
      <Typography variant="body2" component="p" sx={{ mb: 4}}>
        본 계약을 증명하기 위해 계약 당사자가 이의 없음을 확인하고 각각 서명 날인 후 임대인, 임차인은 각각 1통씩 보관한다.
      </Typography>
      
      <Typography variant="body1" component="p">
        {formatDate()}
      </Typography>
      
      {/* 서명란 */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item>
          <Typography align="center" gutterBottom>임대인(갑)</Typography>
          <SignatureBox 
            title="임대인"
            signature={contractData?.signatures?.lessor}
            onClick={() => handleSignatureClick('lessor')}
          />
        </Grid>
        <Grid item>
          <Typography align="center" gutterBottom>임차인(을)</Typography>
          <SignatureBox 
            title="임차인"
            signature={contractData?.signatures?.lessee}
            onClick={() => handleSignatureClick('lessee')}
          />
        </Grid>
      </Grid>

      <SignatureModal 
        open={signatureModalOpen}
        onClose={() => setSignatureModalOpen(false)}
        onSave={handleSignatureSave}
      />
    </Paper>
  );
};

export default ContractTemplate;