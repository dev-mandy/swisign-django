import React, {useEffect} from 'react';
import useState from 'react-usestateref'
import SubpageLayout from '../layouts/SubpageLayout';
import Chatbot from "../components/temp/Chatbot";
import uuid from 'react-uuid';
import moment from 'moment';
import {getJibun} from "../apis/API/JibunAddress";
import {getBuildingInfo} from "../apis/API/getBuildingInfo";
import ChatBotCalendar from "../components/temp/ChatBotCalendar";
import ChatbotInput from "../components/temp/ChatBotInput";
import Contract from "./Contract";
import {priceComma} from "../utils/StringUtils";

const Register = () => {

    const [messages, setMessages] = useState([]);
    const [hoNm, setHoNm, hoRef] = useState(null); // 호수
    const [leaseStartDate, setLeaseStartDate, leaseStartDateRef] = useState(null); // 계약 시작 일자
    const [leaseEndDate, setLeaseEndDate, leaseEndDateRef] = useState(null); // 계약 종료 일자
    const [deposit, setDeposit, depositRef] = useState(null); // 보증금
    const [rentAmount, setRentAmount, rentAmountRef] = useState(null); // 월세
    const [rentAmountDay, setRentAmountDay, rentAmountDayRef] = useState(null); // 월세 지불 날짜 (매월)
    const [rentPaymentAccount, setRentPaymentAccount, rentPaymentAccountRef] = useState(null); // 월세 지불 날짜 (매월)
    const [rentPaymentAccountBank, setRentPaymentAccountBank, rentPaymentAccountBankRef] = useState(null); // 월세 지불 은행 명
    const [downPayment, setDownPayment, downPaymentRef] = useState(null); // 계약금
    const [middlePayment, setMiddlePayment, middlePaymentRef] = useState(null); // 중도금
    const [middlePaymentDate, setMiddlePaymentDate, middlePaymentDateRef] = useState(null); // 중도금 지불 일자
    const [balance, setBalance, balanceRef] = useState(null); // 잔금
    const [balanceDate, setBalanceDate, balanceDateRef] = useState(null); // 잔금 지불 일자
    const [maintenanceType, setMaintenanceType, maintenanceTypeRef] = useState(null); // 관리비 유형
    const [maintenancePee, setMaintenancePee, maintenancePeeRef] = useState(null); // 관리비
    //계약서 작성 값
    const [contractValues, setContractValues, contractValuesRef] = useState({
        customerType: '',         //임차인/임대인/중개인
        contractType: '',         //매매/전세/월세
        propertyAddress: '',      //소재지
        exclusiveArea: '',        //전용면적
        commonArea: '',           //공용면적
        buildingStructure: '',    //건물구조
        principalUse: '',         //건물용도
        buildingYear: '',         //건축년도
        leaseStartDate: '',       //임대차기간(시작)
        leaseEndDate: '',         //임대차기간(종료)
        deposit: '',              //보증금
        downPayment: '',          //계약금
        middlePayment: '',        //중도금
        middlePaymentDate: '',    //중도금지불일
        balance: '',              //잔금
        balanceDate: '',          //잔금지불일
        rentAmount: '',           //월세
        rentPaymentDay: '',       //월세지불일
        rentPaymentAccountBank: '',//월세입금계좌은행명
        rentPaymentAccount: '',   //월세입금계좌
        maintenanceType: '',      //관리비 타입 (fixed: 고정, notFixed: 가변)
        maintenancePee: '',       //관리비
    }); // 계약금

    //메세지 생성 기본 폼
    const messageSetting = (content, role, buttons, components) => {
        return {
            id: uuid(),
            content,
            role,
            buttons,
            components: components || [],
            activeEvent: true,
            resetEvent: resetEvent
        }
    }
    /*

        const components = [
            <Contract data={contractValuesRef.current}></Contract>
        ];
    */

    const setTemp = () => {

    }

    /**
     * 관리비 입력 완료
     * Order No : 22
     * Before Event
     * * confirmBalanceDate()
     */
    const confirmMaintenancePrice = () => {
        setContractValues({...contractValuesRef.current, maintenanceType: maintenanceTypeRef.current});
        setContractValues({...contractValuesRef.current, maintenancePee: maintenancePeeRef.current});

        const components = [
            <Contract data={contractValuesRef.current}></Contract>
        ];

        if(maintenanceTypeRef.current === 'fixed'){
            //고정 관리비
            messages.push(messageSetting(`관리비는 ${priceComma(maintenancePeeRef.current)}원 입니다.`, 'user', [], components));
        }else{
            //가변 관리비
            messages.push(messageSetting(`관리비는 ${maintenancePeeRef.current} 와 같이 산정됩니다.`, 'user', [], components));
        }

        setMessages([...messages])
    }

    /**
     * 관리비 확인
     * Order No : 21
     * Before Event
     * * confirmBalanceDate()
     */
    const setMaintenancePeeInput = (type) => {
        setMaintenanceType(type)
        setContractValues({...contractValuesRef.current, maintenanceType: maintenanceTypeRef.current});
        const userContent = type === 'fixed' ? '관리비가 매 월 같아요.' : '관리비가 매 월 달라요.'
        messages.push(messageSetting(userContent, 'user', []));

        const placeholderContent = type === 'fixed' ? '금액을 입력해주세요.' : '관리비 산정방식을 입력해주세요.'
        const buttons = [
            {callback: confirmMaintenancePrice, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatbotInput value={maintenancePee} setValue={setMaintenancePee} placeholder={placeholderContent}></ChatbotInput>
        ]

        messages.push(messageSetting(placeholderContent, 'bot', buttons, components))

        setMessages([...messages])
    }

    /**
     * 관리비 확인
     * Order No : 20
     * Before Event
     * * confirmBalanceDate()
     */
    const setMaintenancePeeType = () => {
        setContractValues({...contractValuesRef.current, balanceDate: moment(balanceDateRef.current).format('YYYY-MM-DD')});
        messages.push(messageSetting(`잔금 지불일 ${moment(balanceDateRef.current).format('YYYY-MM-DD')}`, 'user', []));

        const buttons = [
            {callback: () => setMaintenancePeeInput('fixed'), color: 'white', text: '관리비가 매 월 같아요.'},
            {callback: () => setMaintenancePeeInput('notFixed'), color: 'white', text: '관리비가 매 월 달라요.'}
        ];

        messages.push(messageSetting('관리비는 어떻게 되나요?', 'bot', buttons))
        setMessages([...messages])
    }


    /**
     * 잔금 지불 일자 다시 선택
     * Order No : 19
     * Before Event
     * * confirmBalanceDate()
     */
    const reConfirmBalanceDate = () => {
        //confirmBalanceDate
        setMessages([...messages])
    }

    /**
     * 잔금 지불 일자 선택 완료
     * Order No : 18
     * Before Event
     * * confirmBalance()
     */
    const confirmBalanceDate = () => {
        setContractValues({...contractValuesRef.current, balanceDate: moment(balanceDateRef.current).format('YYYY-MM-DD')});
        const buttons = [
            {callback: reConfirmBalanceDate, color: 'white', text: '다시 선택(이후 개발)'},
            {callback: setMaintenancePeeType, color: 'white', text: '맞아요'}
        ];
        messages.push(messageSetting(`잔금 지불일은 ${moment(balanceDateRef.current).format('YYYY-MM-DD')}입니다. 맞습니까?`, 'user', buttons));
        setMessages([...messages])
    }

    /**
     * 잔금 확인 및 잔금 지불 일자 선택
     * Order No : 17
     * Before Event
     * * confirmMiddlePaymentDate()
     * * reConfirmMiddlePaymentDate()
     */
    const confirmBalance = () => {
        const balanceValue = Number(depositRef.current) - Number(downPaymentRef.current) - Number(middlePaymentRef.current); //보증금 - 계약금 - 중도금
        setContractValues({...contractValuesRef.current, balance: `${balanceValue}0000`});
        messages.push(messageSetting(`잔금은 ${priceComma(balanceValue)}만원입니다.`, 'user', []));

        const buttons = [
            {callback: confirmBalanceDate, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatBotCalendar selectedDate={balanceDate} setSelectedDate={setBalanceDate}/>
        ];
        messages.push(messageSetting(`잔금 지불 일자를 선택해주세요.`, 'user', buttons, components));
        setMessages([...messages])
    }

    /**
     * 중도금 지불 일자 다시 선택
     * Order No : 16
     * Before Event
     * * confirmMiddlePaymentDate()
     */
    const reConfirmMiddlePaymentDate = () => {
        setContractValues({...contractValuesRef.current, middlePaymentDate: ''});
        messages.push(messageSetting('다시 선택', 'user', []));
        const buttons = [
            {callback: confirmMiddlePaymentDate, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatBotCalendar selectedDate={middlePaymentDate} setSelectedDate={setMiddlePaymentDate}/>
        ];
        messages.push(messageSetting(`중도금 지불 일자를 선택해주세요.`, 'user', buttons, components));
        setMessages([...messages])
    }

    /**
     * 중도금 지불 일자 선택 완료 및 잔금 확인 호출
     * Order No : 15
     * Before Event
     * * setMiddlePaymentPrice()
     */
    const confirmMiddlePaymentDate = () => {
        setContractValues({...contractValuesRef.current, middlePaymentDate: moment(middlePaymentDateRef.current).format('YYYY-MM-DD')});
        const buttons = [
            {callback: reConfirmMiddlePaymentDate, color: 'white', text: '다시 선택(이후 개발)'},
            {callback: confirmBalance, color: 'white', text: '맞아요'}
        ];
        messages.push(messageSetting(`중도금 지불일은 ${moment(middlePaymentDate.current).format('YYYY-MM-DD')}입니다. 맞습니까?`, 'user', buttons));
        setMessages([...messages])
    }


    /**
     * 중도금 입력 완료 및 중도금 지불 일자 선택
     * Order No : 14
     * Before Event
     * * setDownPaymentPrice()
     */
    const setMiddlePaymentPrice = () => {
        setContractValues({...contractValuesRef.current, middlePayment: middlePaymentRef.current == '0' ? '0' : `${middlePaymentRef.current}0000`});
        messages.push(messageSetting(`${priceComma(middlePaymentRef.current)}만원`, 'user', []));

        if(middlePaymentRef.current != '0'){
            //중도금이 0원이 아니면
            const buttons = [
                {callback: confirmMiddlePaymentDate, color: 'white', text: '완료'}
            ];
            const components = [
                <ChatBotCalendar selectedDate={middlePaymentDate} setSelectedDate={setMiddlePaymentDate}/>
            ];
            messages.push(messageSetting(`중도금 지불 일자를 선택해주세요.`, 'user', buttons, components));
            setMessages([...messages])
        }else{
            //중도금이 0원이면
            setMessages([...messages])
            confirmBalance()
        }
    }

    /**
     * 계약금 입력 완료 및 중도금 입력
     * Order No : 13
     * Before Event
     * * setContractPeriod()
     */
    const setDownPaymentPrice = () => {
        setContractValues({...contractValuesRef.current, downPayment: `${downPaymentRef.current}0000`});
        messages.push(messageSetting(`${priceComma(downPaymentRef.current)}만원`, 'user', []));

        const buttons = [
            {callback: setMiddlePaymentPrice, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatbotInput value={middlePayment} setValue={setMiddlePayment} placeholder={'금액을 입력해주세요.'}></ChatbotInput>
        ]

        messages.push(messageSetting('중도금을 만원단위로 입력 해주세요.', 'bot', buttons, components))
        setMessages([...messages])
    }

    /**
     * 월세 입력 완료 및 계약금 입력
     * Order No : 13
     * Before Event
     * * setContractPeriod()
     *
     * 은행계좌 및 은행종류 입력받아야함 250328 mandy
     */
    const setRentAmountPrice = () => {
        setContractValues({...contractValuesRef.current, rentAmount: rentAmountRef.current == '0' ? '0' : `${rentAmountRef.current}0000`});
        messages.push(messageSetting(`${priceComma(rentAmountRef.current)}만원`, 'user', []));
        const buttons = [
            {callback: setDownPaymentPrice, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatbotInput value={downPayment} setValue={setDownPayment} placeholder={'금액을 입력해주세요.'}></ChatbotInput>
        ]
        messages.push(messageSetting('계약금을 만원단위로 입력해주세요.', 'bot', buttons, components))
        setMessages([...messages])
    }

    /**
     * 보증금 입력 완료 및 월세 입력
     * Order No : 12
     * Before Event
     * * setContractPeriod()
     */
    const setDepositPrice = () => {
        setContractValues({...contractValuesRef.current, deposit: `${depositRef.current}0000`});
        messages.push(messageSetting(`${priceComma(depositRef.current)}만원`, 'user', []));
        const buttons = [
            {callback: setRentAmountPrice, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatbotInput value={rentAmount} setValue={setRentAmount} placeholder={'금액을 입력해주세요.'}></ChatbotInput>
        ]
        messages.push(messageSetting('월세를 만원단위로 입력해주세요. 전세의 경우 0원으로 입력해주세요.', 'bot', buttons, components))
        setMessages([...messages])
    }

    /**
     * 계약 기간 모두 입력 완료 및 보증급 입력
     * Order No : 11
     * Before Event
     * * confirmEndDate()
     */
    const setContractPeriod = () => {
        setContractValues({...contractValuesRef.current, leaseStartDate: moment(leaseStartDateRef.current).format('YYYY-MM-DD')});
        setContractValues({...contractValuesRef.current, leaseEndDate: moment(leaseEndDateRef.current).format('YYYY-MM-DD')});
        messages.push(messageSetting(`종료일 ${moment(leaseEndDateRef.current).format('YYYY.MM.DD')}`, 'user', []));
        const content = `계약기간은 ${moment(leaseStartDateRef.current).format('YYYY.MM.DD')} ~ ${moment(leaseEndDateRef.current).format('YYYY.MM.DD')}입니다.`;
        messages.push(messageSetting(content, 'bot', [], []))
        const buttons = [
            {callback: setDepositPrice, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatbotInput value={deposit} setValue={setDeposit} placeholder={'금액을 입력해주세요.'}></ChatbotInput>
        ]
        messages.push(messageSetting('보증금을 만원단위로 입력해주세요. 예시) 50,000,000원 -> 5000', 'bot', buttons, components))
        setMessages([...messages])
    }

    /**
     * 계약 종료 날짜 입력 완료 및 계약 기간 확정
     * Order No : 10
     * Before Event
     * * setContractPeriodEnd()
     * * confirmStartDate() -> 계약 종료 날짜 2년 디폴트 선택 시
     */
    const confirmEndDate = () => {
        messages.push(messageSetting(moment(leaseEndDateRef.current).format('YYYY.MM.DD'), 'user', []));
        const content = `계약기간은 ${moment(leaseStartDateRef.current).format('YYYY.MM.DD')} ~ ${moment(leaseEndDateRef.current).format('YYYY.MM.DD')}입니까?`;
        const buttons = [
            {callback: setContractPeriodEnd, color: 'white', text: '다시 선택(이후 개발)'},
            {callback: setContractPeriod, color: 'white', text: '맞아요'}
        ];
        messages.push(messageSetting(content, 'bot', buttons, []))
        setMessages([...messages])
    }

    /**
     * 계약 종료 날짜 입력
     * Order No : 9
     * Before Event
     * * confirmStartDate() -> 계약 종료 날짜 직접 입력 선택 시
     */
    const setContractPeriodEnd = () => {
        messages.push(messageSetting('종료일 선택', 'user', []));
        const buttons = [
            {callback: confirmEndDate, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatBotCalendar selectedDate={leaseEndDate} setSelectedDate={setLeaseEndDate}/>
        ];
        messages.push(messageSetting('계약 종료 날짜를 선택해주세요.', 'bot', buttons, components))
        setMessages([...messages])
    }

    /**
     * 계약 시작 날짜 입력 완료 및 계약 종료 날짜 입력(확정)
     * Order No : 8
     * Before Event
     * * setContractPeriodStart()
     */
    const confirmStartDate = () => {
        messages.push(messageSetting(moment(leaseStartDateRef.current).format('YYYY.MM.DD'), 'user', []));
        //우선 2년뒤로
        setLeaseEndDate(moment(leaseStartDateRef.current).add(2, 'years'));
        const content = `계약기간은 2년 ${moment(leaseStartDateRef.current).format('YYYY.MM.DD')} ~ ${moment(leaseStartDateRef.current).add(2, 'years').format('YYYY.MM.DD')}입니까?`;
        const buttons = [
            {callback: setContractPeriodEnd, color: 'white', text: '종료일 선택'},
            {callback: setContractPeriod, color: 'white', text: '맞아요'}
        ];
        messages.push(messageSetting(content, 'bot', buttons, []))
        setMessages([...messages])
    }

    /**
     * 계약 시작 날짜 입력
     * Order No : 7
     * Before Event
     * * selectDetail()
     */
    const setContractPeriodStart = () => {
        messages.push(messageSetting('진행', 'user', []));
        const buttons = [
            {callback: confirmStartDate, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatBotCalendar selectedDate={leaseStartDate} setSelectedDate={setLeaseStartDate}/>
        ];
        messages.push(messageSetting('계약 시작 날짜를 선택해주세요.', 'bot', buttons, components))
        setMessages([...messages])
    }

    /**
     * 호수가 입력이 완료된 경우 건물 정보를 포함한 계약서 노출 및 계약 정보 입력으로 넘어가는 함수
     * Order No : 6
     * Before Event
     * * inputHoNm()
     */
    const selectDetail = (obj) => {
        setContractValues({
            ...contractValuesRef.current,
            buildingYear: obj.useAprDay,
            hoNm: obj.hoNm,
            propertyAddress: `${obj.newPlatPlc} ${obj.bldNm} ${obj.hoNm.endsWith("호") ? obj.hoNm : obj.hoNm + '호'}`, //소재지
            exclusiveArea: obj.area, //전용면적
            commonArea: obj.totalCommonArea, //공용면적
            buildingStructure: obj.strctCdNm, //건물구조 -> etcStrct일지도?
            principalUse: obj.mainPurpsCdNm //건물용도
        });
        messages.push(messageSetting(`${obj.hoNm}호`, 'user', []));

        const components = [
            <Contract data={contractValuesRef.current}></Contract>
        ];
        const buttons = [
            {callback: setContractPeriodStart, color: 'white', text: '진행'},
            {callback: cancel, color: 'white', text: '취소 (추후 되돌아가기 작업)'}
        ];
        messages.push(messageSetting(`${obj.hoNm}호를 선택(입력)하셨습니다. 계약서 양식을 보여드릴게요. 확인해보시고 진행해주세요.`, 'bot', buttons, components))
        setMessages([...messages])
    }

    /**
     * 다가구의 경우 호수가 입력 완료된 후 건물 상세 정보 호출
     * Order No : 5
     * Before Event
     * * inputHoNm()
     */
    const submitHoNm = () => {
        messages.push(messageSetting(hoRef.current, 'user', []));
        //공공데이터포털 API 조회값이 없기 때문에 obj 나머지 값을 채우는 작업 필요함.
        const obj = {hoNm: hoRef.current};
        const buttons = [
            {
                callback: () => {
                    selectDetail(obj)
                }, color: 'white', text: `진행`
            }
        ];
        messages.push(messageSetting(`${hoRef.current}호를 입력하셨습니다. 맞으면 진행을 눌러주세요`, 'bot', buttons))
        setMessages([...messages])
    }

    /**
     * 다가구 주택인 경우 호수 직접 입력
     * 전유공용면적조회에서 호수를 조회할 수 없을 때
     * Order No : 4
     * Before Event
     * * openPostcode() -> 검색된 호수가 없는 경우 + 다가구 주택인 경우
     */
    const inputHoNm = () => {
        messages.push(messageSetting('다가구 주택이에요.', 'user', []));

        const buttons = [
            {callback: submitHoNm, color: 'white', text: '완료'}
        ];
        const components = [
            <ChatbotInput value={hoNm} setValue={setHoNm} placeholder={'호수를 입력해주세요. 예시) 302,B01'}></ChatbotInput>
        ]
        messages.push(messageSetting('호수를 입력해주세요.', 'bot', buttons, components))
        setMessages([...messages])
    }

    /**
     * 다음 우편번호 API 호출
     * 주소 검색
     * Order No : 3
     * Before Event
     * * bargain()
     * * charter()
     * * monthly()
     */
    const openPostcode = () => {
        // eslint-disable-next-line
        new daum.Postcode({
            oncomplete: async function (data) {
                const addressList = await getJibun(data.address);
                const buildingList = await getBuildingInfo(addressList[0])
                setContractValues({...contractValuesRef.current, address: data.address});
                messages.push(messageSetting(data.address, 'user', []))
                messages.push(messageSetting(`${data.address}를 기준으로 건축물대장 전유공용면적을 조회합니다.`, 'bot', []))
                if (buildingList.length > 1) {
                    let buttons = []

                    buildingList.map((obj) => {
                        buttons.push({
                            callback: () => {
                                selectDetail(obj)
                            }, color: 'white', text: `${obj.hoNm}호`
                        })
                    })
                    messages.push(messageSetting('호수가 여러 개 검색됩니다. 호수를 선택해주세요.', 'bot', buttons))
                } else if (buildingList.length === 1) {
                    const obj = buildingList[0];
                    const buttons = [
                        {
                            callback: () => {
                                selectDetail(obj)
                            }, color: 'white', text: `진행`
                        },
                        {callback: cancel, color: 'white', text: `취소 (추후 되돌아가기 작업)`}
                    ];
                    messages.push(messageSetting(`${obj.hoNm}호만 존재하는 것으로 검색됩니다. 맞으면 진행을 눌러주세요`, 'bot', buttons))
                } else {
                    const buttons = [
                        {callback: inputHoNm, color: 'white', text: `다가구 주택이에요.`},
                        {callback: cancel, color: 'white', text: `취소 (추후 되돌아가기 작업)`}
                    ];
                    messages.push(messageSetting('검색된 호수가 없습니다. 다가구주택이라면 호수를 직접 입력해주세요.', 'bot', buttons))
                }
                setMessages([...messages])
            }
        }).open();
    }

    /**
     * 계약서 종류 - 매매
     * Order No : 2
     * @param type  renter : 임차인 / landlord : 임대인 / agent : 공인중개사
     * Before Event
     * * role1()
     * * role2()
     * * role3()
     */
    const bargain = (type) => {
            setContractValues({...contractValuesRef.current, contractType: '매매'});
            messages.push(messageSetting('매매', 'user', []));
            messages.push(messageSetting('매매를 선택하셨습니다.', 'bot', []));
            if (type === 'renter') {
                //임차인일 때
                messages.push(messageSetting('계약하실 주소를 검색해 주세요.', 'bot', []));
                openPostcode()
            } else {
                //임대인/중개인일 때
                messages.push(messageSetting('계약하실 주소를 선택해 주세요.', 'bot', []));
                openPostcode()
            }
        }

    /**
     * 계약서 종류 - 전세
     * Order No : 2
     * @param type  renter : 임차인 / landlord : 임대인 / agent : 공인중개사
     * Before Event
     * * role1()
     * * role2()
     * * role3()
     */
    const charter = (type) => {
        setContractValues({...contractValuesRef.current, contractType: '전세'});
        messages.push(messageSetting('전세', 'user', []));
        messages.push(messageSetting('전세를 선택하셨습니다.', 'bot', []));
        if (type === 'renter') {
            //임차인일 때
            messages.push(messageSetting('계약하실 주소를 검색해 주세요.', 'bot', []));
            openPostcode()
        } else {
            //임대인/중개인일 때
            messages.push(messageSetting('계약하실 주소를 선택해 주세요.', 'bot', []));
            openPostcode()
        }
    }

    /**
     * 계약서 종류 - 월세
     * Order No : 2
     * @param type  renter : 임차인 / landlord : 임대인 / agent : 공인중개사
     * Before Event
     * * role1()
     * * role2()
     * * role3()
     */
    const monthly = (type) => {
        setContractValues({...contractValuesRef.current, contractType: '월세'});
        messages.push(messageSetting('월세', 'user', []));
        messages.push(messageSetting('월세를 선택하셨습니다.', 'bot', []));
        if (type === 'renter') {
            //임차인일 때
            messages.push(messageSetting('계약하실 주소를 검색해 주세요.', 'bot', []));
            openPostcode()
        } else {
            //임대인/중개인일 때
            messages.push(messageSetting('계약하실 주소를 선택해 주세요.', 'bot', []));
            openPostcode()
        }
    }

    //계약서 작성 -> YES

    /**
     * 계약서 작성 시작
     * Order No : 0
     */
    const next = () => {
        messages.push(messageSetting('예', 'user', []))
        const buttons = [
            {callback: role1, color: 'white', text: '임차인'},
            {callback: role2, color: 'white', text: '임대인'},
            {callback: role3, color: 'white', text: '중개인'}
        ];
        const content = '계약서 작성에 필요한 정보입니다. 아래에서 선택해주세요.';
        messages.push(messageSetting(content, 'bot', buttons))
        setMessages([...messages])
    }

    /**
     * 계약서 작성 취소
     * Order No : 0
     */
    const cancel = () => {
        messages.push(messageSetting('아니오', 'user', []))
        messages.push(messageSetting('계약서 작성이 종료되었습니다.', 'bot', []))
        setMessages([...messages])
    }

    /**
     * 임차인 작성 시작
     * Order No : 1
     * Before Event
     * * next()
     */
    const role1 = () => {
        setContractValues({...contractValuesRef.current, customerType: '임차인'});
        messages.push(messageSetting('임차인', 'user', []));
        messages.push(messageSetting('임차인을 선택하셨습니다.', 'bot', []));
        const buttons = [
            {
                callback: () => {
                    bargain('renter')
                }, color: 'white', text: '매매'
            },
            {
                callback: () => {
                    charter('renter')
                }, color: 'white', text: '전세'
            },
            {
                callback: () => {
                    monthly('renter')
                }, color: 'white', text: '월세'
            }
        ];
        messages.push(messageSetting('계약서 종류를 선택해주세요.', 'bot', buttons));
        setMessages([...messages])
    }

    /**
     * 임대인 작성 시작
     * Order No : 1
     * Before Event
     * * next()
     */
    const role2 = () => {
        setContractValues({...contractValuesRef.current, customerType: '임대인'});
        messages.push(messageSetting('임대인', 'user', []));
        messages.push(messageSetting('임대인을 선택하셨습니다.', 'bot', []));
        const buttons = [
            {
                callback: () => {
                    bargain('landlord')
                }, color: 'white', text: '매매'
            },
            {
                callback: () => {
                    charter('landlord')
                }, color: 'white', text: '전세'
            },
            {
                callback: () => {
                    monthly('landlord')
                }, color: 'white', text: '월세'
            }
        ];
        messages.push(messageSetting('계약서 종류를 선택해주세요.', 'bot', buttons));
        setMessages([...messages])
    }

    /**
     * 중개인 작성 시작
     * Order No : 1
     * Before Event
     * * next()
     */
    const role3 = () => {
        setContractValues({...contractValuesRef.current, customerType: '중개인'});
        messages.push(messageSetting('중개인', 'user', []));
        messages.push(messageSetting('중개인을 선택하셨습니다.', 'bot', []));
        const buttons = [
            {
                callback: () => {
                    bargain('agent')
                }, color: 'white', text: '매매'
            },
            {
                callback: () => {
                    charter('agent')
                }, color: 'white', text: '전세'
            },
            {
                callback: () => {
                    monthly('agent')
                }, color: 'white', text: '월세'
            }
        ];
        messages.push(messageSetting('계약서 종류를 선택해주세요.', 'bot', buttons));
        setMessages([...messages])
    }

    /**
     * 아래부터 변경없는 이벤트
     */

    /**
     * 한 번 클릭한 버튼은 동작하지 않도록 이벤트 삭제
     * @param id    메세지 ID
     */
    const resetEvent = (id) => {
        messages.every((message) => {
            if (message.id === id) {
                message.activeEvent = false;
                return false;
            } else return true;
        })
        setMessages([...messages])
    }

    /**
     * 첫 메세지 생성
     */
    const welcomeMessage = () => {
        const welcomeButtons = [
            {callback: cancel, color: 'white', text: '아니오'},
            {callback: next, color: 'black', text: '예'}
        ];
        const welcomeContent = '안녕하세요. AI도미입니다. 계약진행을 도와드릴까요?';
        messages.push(messageSetting(welcomeContent, 'bot', welcomeButtons))
        setMessages([...messages])
    };

    //messages 바뀔때마다
    useEffect(() => {
        if (messages.length === 0) welcomeMessage()
    }, [messages]);

    //최초 한 번만
    useEffect(() => {

    }, [])


    return (
        <SubpageLayout>
            <Chatbot data={messages}/>
        </SubpageLayout>
    )
}

export default Register;