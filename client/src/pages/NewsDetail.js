import React from 'react';
import FullpageLayout from '../layouts/FullpageLayout';
import BoardDetail from '../components/board/BoardDetail';
import NewsData from '../data/NewsData.json';

const NewsDetail = () => {
  return (
    <FullpageLayout>
      <BoardDetail
        data={NewsData}
        showSource
      />
    </FullpageLayout>
  )
}

export default NewsDetail;