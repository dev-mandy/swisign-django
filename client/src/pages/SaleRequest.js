import React, { useState } from 'react';
import { Button, Typography, Card, List, ListItem, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import ErrorIcon from '@mui/icons-material/Error';
import SubpageLayout from '../layouts/SubpageLayout';
import RealEstateAgencyList from '../components/content/RealEstateAgencyList';

import BuildingData from '../data/BuildingData.json';

const GuideMsg = styled(Card)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.75rem',
  wordBreak: 'keep-all',
  color: grey[700],
  borderColor: grey[200],
  backgroundColor: grey[100],
}));

const ListUnit = ({ title, content, selectItem, onClick }) => {
  return (
    <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
      <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>{title}</Typography>
      <Typography variant="body2">{content}</Typography>
      { selectItem && 
        <Button variant="outlined" size="small" sx={{ marginLeft: 'auto', lineHeight: 'inherit', minWidth: '3rem' }} onClick={onClick}>선택</Button>
      }
    </ListItem>
  )
}

const SaleRequest = () => {
  const [state, setState] = useState('initial');
  const [filteredBuildingInfo, setFilteredBuildingInfo] = useState(null);

  const handleLoadClick = () => {
    setState('loaded');
  };
  const handleResetClick = () => {
    setState('initial');
  };
  const handleSelect = (info) => {
    setFilteredBuildingInfo(info);
  };

  return (
    <SubpageLayout>
      <Typography variant="h6" mb={2}>
        {!filteredBuildingInfo ? '건축물대장 첨부하기' : '부동산중개소 매물등록 요청'}
      </Typography>

      {state === 'initial' && (
        <>
          <Button variant="outlined" fullWidth onClick={handleLoadClick} sx={{ marginBottom: '1rem' }}>불러오기</Button>
          <GuideMsg variant="outlined">
            <ErrorIcon fontSize="small" />
            <Typography variant="body2">건축물관리대장을 등록하시려면 ‘불러오기’ 버튼으로  진행해주세요.</Typography>
          </GuideMsg>
        </>
      )}
      {state === 'loaded' && (
        <>
          {!filteredBuildingInfo && (
            <Button variant="outlined" fullWidth onClick={handleResetClick} sx={{ marginBottom: '1rem' }}>다시하기</Button>
          )}

          {BuildingData.map((building, index) => (
            <List key={index} sx={{ marginBottom: '1rem', padding: '0', borderTop: `1px solid ${grey[300]}` }}>

              {!filteredBuildingInfo && (
                <>
                  <ListUnit title="문서확인번호" content={building.documentNumber} />
                  <ListUnit title="고유번호" content={building.uniqueNumber} />
                  {building.units.map((units, unitsIndex) => (
                    <ListUnit 
                      key={unitsIndex} 
                      title="호수[매수]" 
                      content={`${units.unit}호 / ${units.households}가구 / ${units.families}세대`} 
                    />
                  ))}
                </>
              )}

              <ListUnit title="주소" content={building.address} />
              <ListUnit title="주소_지번" content={building.lotNumber} />
              <ListUnit title="주소_도로명" content={building.roadName} />
              
              {(filteredBuildingInfo ? [filteredBuildingInfo] : building.buildingInfo).map((info, infoIndex) => (
                <ListUnit 
                  key={infoIndex} 
                  title="층/호/면적" 
                  content={`${info.floor}층 / ${info.unit}호 / ${info.area}m²`}
                  selectItem={!filteredBuildingInfo}
                  onClick={()=> handleSelect(info)}
                />
              ))}

              {!filteredBuildingInfo && (
                <>
                  <ListUnit title="발급일" content={building.issueDate} />
                  <ListUnit title="발급기관" content={building.issuingAuthority} />
                </>
              )}

            </List>
          ))}

          {!filteredBuildingInfo && (
            <GuideMsg variant="outlined">
              <ErrorIcon fontSize="small" />
              <Typography variant="body2">임대할 호수선택해주세요.</Typography>
            </GuideMsg>
          )}

          {filteredBuildingInfo && (
            <>
              <GuideMsg variant="outlined" sx={{ marginBottom: '1rem' }}>
                <ErrorIcon fontSize="small" />
                <Typography variant="body2">위치검색으로 부동산중개소를 선택해주세요.</Typography>
              </GuideMsg>
              <Button variant="outlined" fullWidth sx={{ marginBottom: '1rem' }}>지도검색</Button>
              <RealEstateAgencyList />
              <Button variant="contained" fullWidth sx={{ marginTop: '2rem' }}>매물등록 요청</Button>
            </>
          )}

        </>
      )}
    </SubpageLayout>
  )
}

export default SaleRequest;