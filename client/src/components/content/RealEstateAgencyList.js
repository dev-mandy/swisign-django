import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Checkbox, Typography, Button, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import RealEstateAgencyData from '../../data/RealEstateAgencyData.json';

const AgencyList = styled(List)(({ theme }) => ({
  padding: '0',
  '& > li': {
    gap: '0.5rem',
    paddingLeft: '0.25rem',
    border: `1px solid ${grey[300]}`,
    borderRadius: '0.25rem',
  },
  '& > li:not(:first-child)': {
    marginTop: '0.5rem'
  },
}));

const RealEstateAgencyList = () => {
  return (
    <AgencyList>
      {RealEstateAgencyData.map((agency, index) => (
        <ListItem key={index} secondaryAction={
          <IconButton edge="end" aria-label="map">
            <MapOutlinedIcon />
          </IconButton>
        }>
          <Checkbox size="small" />
          <ListItemText 
            primary={agency.name} 
            secondary={
            <React.Fragment>
              <Typography variant="body2" sx={{ margin: '0.125rem 0', color: 'text.primary' }}>
                {agency.address}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {agency.tel}
                <Button variant="text" sx={{ minWidth: '0', marginLeft: '0.75rem', padding: '0', fontSize: '0.813rem', lineHeight: 'inherit' }}>복사</Button>
              </Box>
            </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </AgencyList>
  )
}

export default RealEstateAgencyList;