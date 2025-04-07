import React from 'react';
import FullpageLayout from '../layouts/FullpageLayout';
import BoardDetail from '../components/board/BoardDetail';
import NoticeData from '../data/NoticeData.json';

const NoticeDetail = () => {
  return (
    <FullpageLayout>
      <BoardDetail
        data={NoticeData}
      />
    </FullpageLayout>
  )
}

export default NoticeDetail;