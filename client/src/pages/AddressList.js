import React, {useEffect, useState} from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import {getTestData} from "../apis/AddressList/AddressListApi";

const AddressList = () => {

  const [data, setData] = useState([]);

  const getData = async () => {
        const data = await getTestData();
        setData(data)
  };
  useEffect(() =>{
      getData()
  },[]);

  return (
    <SubpageLayout>
      <p>API 연동 테스트</p>
      <table>
          <thead>
            <tr>
                <th>이름</th>
                <th>나이</th>
                <th>이메일</th>
                <th>성별</th>
            </tr>
          </thead>
          <tbody>
                {
                    data.map((row) => (
                        <tr key={row.fields.seq}>
                            <td>{row.fields.testname}</td>
                            <td>{row.fields.age}</td>
                            <td>{row.fields.email}</td>
                            <td>{row.fields.gender}</td>
                        </tr>
                    ))
                }
          </tbody>
      </table>
    </SubpageLayout>
  )
}

export default AddressList;