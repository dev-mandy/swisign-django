import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardList from '../components/board/BoardList';
import NoticeData from '../data/NoticeData.json';

const NoticeList = () => {
  return (
    <SubpageLayout>
      <BoardList
        data={NoticeData} 
        detailLink="/NoticeDetail" 
        type="default"
      />
    </SubpageLayout>
  )
}

export default NoticeList;