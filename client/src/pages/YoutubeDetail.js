import React, {useEffect, useState} from 'react';
import FullpageLayout from '../layouts/FullpageLayout';
import BoardDetail from '../components/board/BoardDetail';
import {getYoutube} from "../apis/API/Youtube";
import {useParams} from "react-router-dom";

const YoutubeDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const getData = async () => {
        const data = await getYoutube(id);
        setData(data)
  };

  useEffect(() =>{
      getData()
  },[]);

  return (
    <FullpageLayout>
      <BoardDetail
        data={data}
        showYoutube
      />
    </FullpageLayout>
  )
}

export default YoutubeDetail;