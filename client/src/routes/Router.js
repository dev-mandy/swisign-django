import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ui/ScrollToTop';

import Main from '../pages/Main';	
import MapList from '../pages/MapList';
import MapView from '../pages/MapView';
import AddressList from '../pages/AddressList';
import AddressReg from '../pages/AddressReg';
import SafetyCheckList from '../pages/SafetyCheckList';
import MarketPrice from '../pages/MarketPrice';
import MapSearch from '../pages/MapSearch';
import ChangeInfoList from '../pages/ChangeInfoList';
import NoticeList from '../pages/NoticeList';
import NoticeDetail from '../pages/NoticeDetail';
import YoutubeList from '../pages/YoutubeList';
import YoutubeDetail from '../pages/YoutubeDetail';
import NewsList from '../pages/NewsList';
import NewsDetail from '../pages/NewsDetail';
import SaleRequest from '../pages/SaleRequest';
import SaleList from '../pages/SaleList';
import SaleDetail from '../pages/SaleDetail';
import ScheduleList from '../pages/ScheduleList';
import CertificateCheck from '../pages/CertificateCheck';
import Contract from '../pages/Contract';
import ContractInput  from '../pages/ContractInput';
import Register from "../pages/Register";
import AddBuildingTest from "../pages/AddBuildingTest";

const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/MapList" element={<MapList />} />
        <Route path="/MapView" element={<MapView />} />
        <Route path="/AddressList" element={<AddressList />} />
        <Route path="/AddressReg" element={<AddressReg />} />
        <Route path="/SafetyCheckList" element={<SafetyCheckList />} />
        <Route path="/MarketPrice" element={<MarketPrice />} />
        <Route path="/MapSearch" element={<MapSearch />} />
        <Route path="/ChangeInfoList" element={<ChangeInfoList />} />
        <Route path="/NoticeList" element={<NoticeList />} />
        <Route path="/NoticeDetail/:id" element={<NoticeDetail />} />
        <Route path="/YoutubeList" element={<YoutubeList />} />
        <Route path="/YoutubeDetail/:id" element={<YoutubeDetail />} />
        <Route path="/NewsList" element={<NewsList />} />
        <Route path="/NewsDetail/:id" element={<NewsDetail />} />
        <Route path="/SaleRequest" element={<SaleRequest />} />
        <Route path="/SaleList" element={<SaleList />} />
        <Route path="/SaleDetail/:id" element={<SaleDetail />} />
        <Route path="/ScheduleList" element={<ScheduleList />} />
        <Route path="/CertificateCheck" element={<CertificateCheck />} />
        <Route path="/Contract" element={<Contract />} />
        <Route path="/Contract/Input" element={<ContractInput />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AddBuildingTest" element={<AddBuildingTest />} />
      </Routes>
    </>
  );
};

export default Router;