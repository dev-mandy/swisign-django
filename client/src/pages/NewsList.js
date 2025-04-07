import React, {useEffect, useState} from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardList from '../components/board/BoardList';
import {getNewsList} from "../apis/newsList/NewsListApi";

const NewsList = () => {


  const [data, setData] = useState([]);

  const getData = async () => {
        const data = await getNewsList();
        setData(data)
  };

  useEffect(() =>{
      getData()
  },[]);

  return (
    <SubpageLayout>
      <BoardList
        data={data}
        detailLink="/NewsDetail"
        type="default"
        showSource
      />
    </SubpageLayout>
  )
}

export default NewsList;