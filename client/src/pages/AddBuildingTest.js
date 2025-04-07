import {useNavigate} from 'react-router-dom';
import {
    Box,
    Button,
    Checkbox,
    Container,
    IconButton,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import ContractForm from '../components/contract/ContractForm';
import useStateRef from "react-usestateref";
import {getBuildingInfo} from "../apis/API/getBuildingInfo";
import {getJibun} from "../apis/API/JibunAddress";
import RealEstateAgencyData from "../data/RealEstateAgencyData.json";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import React from "react";
import Contract from "./Contract";

const AddBuildingTest = () => {
    const [address, setAddress, addressRef] = useStateRef(null);
    const [hoList, setHoList, hoListRef] = useStateRef([]);
    const [contractData, setContractData, contractDataRef] = useStateRef({});
    const [viewContract, setViewContract, viewContractRef] = useStateRef(false);
    //다음 우편번호 API 호출
    const openPostcode = () => {
        // eslint-disable-next-line
        new daum.Postcode({
            oncomplete: async function (data) {
                const addressList = await getJibun(data.address);
                const buildingList = await getBuildingInfo(addressList[0])
                if (buildingList.length > 0) {
                    console.log(buildingList)
                    setHoList([...buildingList]);
                } else {
                    //다가구

                }
            }
        }).open();
    }

    const confirmHoNm = (obj) => {
        setViewContract(true);
        setContractData({
            propertyAddress: `${obj.newPlatPlc} ${obj.bldNm} ${obj.hoNm.endsWith("호") ? obj.hoNm : obj.hoNm + '호'}`, //소재지
            exclusiveArea: obj.area, //전용면적
            commonArea: obj.totalCommonArea, //공용면적
            buildingStructure: obj.strctCdNm, //건물구조 -> etcStrct일지도?
            principalUse: obj.mainPurpsCdNm //건물용도
        })

    }

    const setDagagu = () => {

    }

    return (
        <Container maxWidth="md">
            <Paper sx={{p: 3, my: 3}}>
                <Typography variant="h5" gutterBottom align="center">
                    매물 등록 테스트
                </Typography>
                <Button type="submit" variant="contained" onClick={openPostcode}>
                    주소 검색
                </Button>
                { hoList.length > 0 && hoList.map((ho, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={ho.hoNm}
                            secondary={
                                <React.Fragment>
                                    <Typography variant="body2" sx={{margin: '0.125rem 0', color: 'text.primary'}}>
                                        {ho.flrNoNm} {ho.hoNm}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        <Button type="submit" variant="contained" onClick={() => {confirmHoNm(ho)}}>
                            선택
                        </Button>
                    </ListItem>
                ))}
                {setDagagu()}
                { viewContract &&
                    <Contract data={contractData}></Contract>
                }
            </Paper>
        </Container>
    );
};

export default AddBuildingTest;