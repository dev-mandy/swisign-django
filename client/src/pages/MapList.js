import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';
import AddressData from '../data/AddressData.json';

const MapList = () => {
  const navigate = useNavigate();
  const handleMapClick = (address) => {
    // 지도로 이동할 때 해당 주소를 전달
    // navigate(`/MapView?address=${encodeURIComponent(address)}`);
    navigate(`/MapSearch?address=${encodeURIComponent(address)}`);
  };

  return (
    <SubpageLayout>

      <List>
        {AddressData.map((item) => (
          <ListItem key={item.id} secondaryAction={
            <IconButton edge="end" aria-label="map" onClick={() => handleMapClick(item.address)}>
              <MapIcon />
            </IconButton>
          }>
            <ListItemText primary={item.name} secondary={item.address} />
          </ListItem>
        ))}
      </List>

    </SubpageLayout>
  )
}

export default MapList;