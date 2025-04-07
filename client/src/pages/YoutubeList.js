import React, {useEffect, useState} from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardList from '../components/board/BoardList';
import {getYoutubeList} from "../apis/API/Youtube";

const YoutubeList = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
        const data = await getYoutubeList('PLYaCGrl8l3vDsjozdbRb8Ed0bjetKbmWK');
        setData(data)
  };

  useEffect(() =>{
      getData()
  },[]);

  return (
    <SubpageLayout>
      <BoardList
        data={data}
        detailLink="/YoutubeDetail"
        type="youtube"
      />
    </SubpageLayout>
  )
}

export default YoutubeList;