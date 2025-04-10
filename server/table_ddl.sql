create or replace table swisign.api_key
(
    AK_seq      bigint auto_increment comment 'APIKey 시퀀스'
        primary key,
    CC_code     varchar(10)                            not null comment 'APIKey 유형 코드
ex) kakao',
    AK_key      varchar(100)                           not null comment 'APIKey API Key',
    AK_useYn    tinyint(1) default 1                   not null comment 'APIKey 사용 여부
0: 미사용
1: 사용',
    AK_deleteYn tinyint(1) default 0                   not null comment 'APIKey 삭제 여부
0: 미삭제
1: 삭제',
    AK_created  timestamp  default current_timestamp() not null comment 'APIKey 생성일시',
    AK_updated  timestamp  default current_timestamp() not null comment 'APIKey 수정일시',
    constraint api_key_AK_seq_uindex
        unique (AK_seq)
)
    comment 'API Key Data' collate = utf8mb3_unicode_ci;

create or replace table swisign.api_log
(
    AL_seq          bigint auto_increment
        primary key,
    AL_tableName    varchar(50)                           not null comment 'API Log 테이블 명',
    AL_apiName      varchar(100)                          not null comment 'API Log API 명',
    AL_successCount bigint    default 0                   not null comment 'API Log 성공데이터수',
    AL_failCount    bigint    default 0                   not null comment 'API Log 실패데이터수',
    AL_memo         varchar(500)                          null comment 'API Log 비고',
    AL_created      timestamp default current_timestamp() not null comment 'API Log 생성일',
    AL_updated      timestamp default current_timestamp() not null comment 'API Log 수정일',
    constraint api_log_AL_seq_uindex
        unique (AL_seq)
)
    comment 'API Log' collate = utf8mb3_unicode_ci;

create or replace table swisign.auth_group
(
    id   int auto_increment
        primary key,
    name varchar(150) not null,
    constraint name
        unique (name)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.auth_user
(
    id           int auto_increment
        primary key,
    password     varchar(128) not null,
    last_login   datetime(6)  null,
    is_superuser tinyint(1)   not null,
    username     varchar(150) not null,
    first_name   varchar(150) not null,
    last_name    varchar(150) not null,
    email        varchar(254) not null,
    is_staff     tinyint(1)   not null,
    is_active    tinyint(1)   not null,
    date_joined  datetime(6)  not null,
    constraint username
        unique (username)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.auth_user_groups
(
    id       bigint auto_increment
        primary key,
    user_id  int not null,
    group_id int not null,
    constraint auth_user_groups_user_id_group_id_94350c0c_uniq
        unique (user_id, group_id),
    constraint auth_user_groups_group_id_97559544_fk_auth_group_id
        foreign key (group_id) references swisign.auth_group (id),
    constraint auth_user_groups_user_id_6a12ed8b_fk_auth_user_id
        foreign key (user_id) references swisign.auth_user (id)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.building_register_set
(
    BRS_seq                     bigint auto_increment comment 'Building Register Set 시퀀스'
        primary key,
    BRS_resUserAddr             varchar(1000)                         not null comment 'Building Register Set 주소 [대지위치]',
    BRS_resOriGinalData         longtext                              null comment 'Building Register Set 원문 DATA [PDF파일 Base64값
* originDataYN="1"인 경우 포함]',
    BRS_resIssueDate            varchar(10)                           not null comment 'Building Register Set 발급일자 [YYYYMMDD]',
    BRS_resIssueOgzNm           varchar(100)                          not null comment 'Building Register Set 발급기관',
    BRS_resNote                 varchar(1000)                         not null comment 'Building Register Set 비고 [그 밖의 기재사항]',
    BRS_resDocNo                longtext                              not null comment 'Building Register Set 문서확인번호',
    BRS_resReceiptNo            longtext                              not null comment 'Building Register Set 접수번호 [정부24접수번호]',
    BRS_resNumber               varchar(100)                          not null comment 'Building Register Set 호수 [호수/가구수/세대수]',
    BRS_commUniqueNo            longtext                              not null comment 'Building Register Set 고유번호',
    BRS_commAddrRoadName        varchar(1000)                         not null comment 'Building Register Set 도로명주소',
    BRS_commAddrLotNumber       varchar(1000)                         not null comment 'Building Register Set 지번주소',
    BRS_resAddrDong             varchar(100)                          null comment 'Building Register Set 동 명칭',
    BRS_resLicenseClassList     longtext                              null comment 'Building Register Set 면허종별 List',
    BRS_resDetailList           longtext                              null comment 'Building Register Set 상세내역 List',
    BRS_resChangeList           longtext                              null comment 'Building Register Set 변동사항 List',
    BRS_resBuildingStatusList   longtext                              null comment 'Building Register Set 건축물 현황 List',
    BRS_resParkingLotStatusList longtext                              null comment 'Building Register Set 주차장 현황 List',
    BRS_resAuthStatusList       longtext                              null comment 'Building Register Set 인증 현황 List',
    BRS_resViolationStatus      varchar(10)                           null comment 'Building Register Set 위반 상태 [위반건축물일 경우 "위반건축물"]',
    BRS_created                 timestamp default current_timestamp() not null comment 'Building Register Set 등록일시',
    BRS_updated                 timestamp default current_timestamp() not null comment 'Building Register Set 수정일시',
    constraint building_register_set_BRS_seq_uindex
        unique (BRS_seq),
    constraint BRS_resAuthStatusList
        check (json_valid(`BRS_resAuthStatusList`)),
    constraint BRS_resBuildingStatusList
        check (json_valid(`BRS_resBuildingStatusList`)),
    constraint BRS_resChangeList
        check (json_valid(`BRS_resChangeList`)),
    constraint BRS_resDetailList
        check (json_valid(`BRS_resDetailList`)),
    constraint BRS_resLicenseClassList
        check (json_valid(`BRS_resLicenseClassList`)),
    constraint BRS_resParkingLotStatusList
        check (json_valid(`BRS_resParkingLotStatusList`))
)
    comment '집합건축물대장 표제부 API' collate = utf8mb3_unicode_ci;

create or replace table swisign.common_code
(
    CC_seq         bigint auto_increment comment 'CommonCode 시퀀스'
        primary key,
    CC_parentCode  varchar(10)                            null comment 'CommonCode 부모코드',
    CC_code        varchar(10)                            not null comment 'CommonCode 코드',
    CC_name        varchar(50)                            not null comment 'CommonCode 코드명',
    CC_description varchar(100)                           not null comment 'CommonCode 설명',
    CC_useYn       tinyint(1) default 1                   not null comment 'CommonCode 사용여부
0: 미사용
1: 사용',
    CC_deleteYn    tinyint(1) default 0                   not null comment 'CommonCode 삭제여부
0: 미삭제
1: 삭제',
    CC_created     timestamp  default current_timestamp() not null comment 'CommonCode 생성일시',
    CC_updated     timestamp  default current_timestamp() not null comment 'CommonCode 수정일시',
    constraint common_code_CC_seq_uindex
        unique (CC_seq)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.company_data
(
    CD_seq            bigint auto_increment comment 'CompanyData 시퀀스'
        primary key,
    CD_name           varchar(100)                          not null comment 'CompanyData 회사명',
    CD_bossName       varchar(100)                          null comment 'CompanyData 대표자명',
    CD_privacyManager varchar(100)                          not null comment 'CompanyData 개인정보보호책임자',
    CD_BusinessNo     varchar(100)                          not null comment 'CompanyData 사업자등록번호',
    CD_contact        varchar(15)                           not null comment 'CompanyData 연락처',
    CD_email          varchar(100)                          not null comment 'CompanyData 이메일',
    CD_address        varchar(500)                          not null comment 'CompanyData 주소',
    CD_copyRight      varchar(100)                          not null comment 'CompanyData 카피라이트',
    CD_useTerm        longtext                              not null comment 'CompanyData 이용약관',
    CD_privacyTerm    longtext                              not null comment 'CompanyData 개인정보처리방침(개인정보 수집 및 이용동의)',
    CD_promotionTerm  longtext                              null comment 'CompanyData 프로모션 정보 수신 동의',
    CD_created        timestamp default current_timestamp() not null comment 'CompanyData 생성일시',
    CD_updated        timestamp default current_timestamp() not null comment 'CompanyData 수정일시',
    constraint company_data_cd_seq_uindex
        unique (CD_seq)
)
    comment '회사정보 (footer) 하드코딩할 경우 테이블 삭제' collate = utf8mb3_unicode_ci;

create or replace table swisign.customer
(
    C_seq                 bigint auto_increment comment 'Customer 시퀀스 넘버'
        primary key,
    C_name                varchar(100)                           null,
    C_id                  varchar(100)                           not null comment 'Customer ID (암호화)',
    C_snsId               varchar(100)                           null comment 'Customer SNS 회원가입 시 넘겨받은 ID',
    C_phone               varchar(100)                           not null comment 'Customer 핸드폰 번호 (암호화)',
    C_CI                  varchar(500)                           not null comment 'Customer 핸드폰 인증 CI',
    C_DI                  varchar(500)                           not null comment 'Customer 핸드폰 인증 DI',
    C_password            varchar(500)                           not null comment 'Customer 비밀번호 (암호화)',
    C_accountType         tinyint(1) default 1                   not null comment 'Customer 계정 유형
1: 일반
2: 카카오
3: 네이버
4: 구글
5: 애플',
    C_roadAddress         varchar(500)                           null comment 'Customer 도로명 주소',
    C_bunjiAddress        varchar(500)                           null comment 'Customer 구주소',
    C_detailAddress       varchar(500)                           null comment 'Customer 상세주소',
    C_postCode            varchar(10)                            null comment 'Customer 우편번호',
    C_email               varchar(100)                           null comment 'Customer 이메일 (암호화)',
    C_gender              char                                   null comment 'Customer 성별
M:남성
W:여성',
    C_swisignBit          smallint   default 0                   not null comment 'Customer 전자계약 이용 설정
0: 선택안함
1: 임차인
2: 임대인
4: 중개인
8: 기타',
    C_houseBit            smallint   default 0                   not null comment 'Customer 주택 유형
0: 선택안함
1: 자가
2: 전세
4: 월세
8: 기타',
    C_useTermAgree        tinyint(1) default 1                   not null comment 'Customer 이용 약관 동의 여부
0: 미동의
1: 동의',
    C_privacyTermAgree    tinyint(1) default 1                   not null comment 'Customer 개인정보 수집 및 이용동의 여부
0: 미동의
1: 동의',
    C_promotionAgree      tinyint(1) default 1                   not null comment 'Customer 프로모션 정보 수신 동의 여부
0: 미동의
1: 동의',
    C_created             timestamp  default current_timestamp() not null comment 'Customer 생성일시',
    C_updated             timestamp  default current_timestamp() not null comment 'Customer 수정일시',
    C_lastLoggedIn        timestamp  default current_timestamp() not null comment 'Customer 마지막 로그인일시',
    C_lastPasswordChanged timestamp  default current_timestamp() not null comment 'Customer 마지막 비밀번호 변경일시',
    C_deleteYn            tinyint(1) default 0                   not null comment 'Customer 삭제여부 (soft delete 방식 사용 시)
0: 정상회원
1: 삭제회원',
    C_sleepYn             tinyint(1) default 0                   not null comment 'Customer 휴면 여부
0: 정상회원
1: 휴면회원',
    constraint customer_C_seq_uindex
        unique (C_seq)
)
    comment '고객 테이블' collate = utf8mb3_unicode_ci;

create or replace table swisign.django_content_type
(
    id        int auto_increment
        primary key,
    app_label varchar(100) not null,
    model     varchar(100) not null,
    constraint django_content_type_app_label_model_76bd3d3b_uniq
        unique (app_label, model)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.auth_permission
(
    id              int auto_increment
        primary key,
    name            varchar(255) not null,
    content_type_id int          not null,
    codename        varchar(100) not null,
    constraint auth_permission_content_type_id_codename_01ab375a_uniq
        unique (content_type_id, codename),
    constraint auth_permission_content_type_id_2f476e4b_fk_django_co
        foreign key (content_type_id) references swisign.django_content_type (id)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.auth_group_permissions
(
    id            bigint auto_increment
        primary key,
    group_id      int not null,
    permission_id int not null,
    constraint auth_group_permissions_group_id_permission_id_0cd325b0_uniq
        unique (group_id, permission_id),
    constraint auth_group_permissio_permission_id_84c5c92e_fk_auth_perm
        foreign key (permission_id) references swisign.auth_permission (id),
    constraint auth_group_permissions_group_id_b120cbf9_fk_auth_group_id
        foreign key (group_id) references swisign.auth_group (id)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.auth_user_user_permissions
(
    id            bigint auto_increment
        primary key,
    user_id       int not null,
    permission_id int not null,
    constraint auth_user_user_permissions_user_id_permission_id_14a6b632_uniq
        unique (user_id, permission_id),
    constraint auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm
        foreign key (permission_id) references swisign.auth_permission (id),
    constraint auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id
        foreign key (user_id) references swisign.auth_user (id)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.django_admin_log
(
    id              int auto_increment
        primary key,
    action_time     datetime(6)       not null,
    object_id       longtext          null,
    object_repr     varchar(200)      not null,
    action_flag     smallint unsigned not null,
    change_message  longtext          not null,
    content_type_id int               null,
    user_id         int               not null,
    constraint django_admin_log_content_type_id_c4bce8eb_fk_django_co
        foreign key (content_type_id) references swisign.django_content_type (id),
    constraint django_admin_log_user_id_c564eba6_fk_auth_user_id
        foreign key (user_id) references swisign.auth_user (id),
    constraint action_flag
        check (`action_flag` >= 0)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.django_migrations
(
    id      bigint auto_increment
        primary key,
    app     varchar(255) not null,
    name    varchar(255) not null,
    applied datetime(6)  not null
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.django_session
(
    session_key  varchar(40) not null
        primary key,
    session_data longtext    not null,
    expire_date  datetime(6) not null
)
    collate = utf8mb3_unicode_ci;

create or replace index django_session_expire_date_a5c62663
    on swisign.django_session (expire_date);

create or replace table swisign.general_buildings
(
    resDocNo bigint auto_increment comment 'General Buildings ResDocNo'
        primary key,
    constraint general_buildings_resDocNo_uindex
        unique (resDocNo)
)
    collate = utf8mb3_unicode_ci;

create or replace table swisign.med_office_name
(
    MON_seq             bigint auto_increment comment 'Med Office Name 시퀀스'
        primary key,
    MON_medOfficeNm     varchar(100)                          not null comment 'Med Office Name 중개사무소명',
    MON_estblRegNo      varchar(100)                          not null comment 'Med Office Name 개설등록번호',
    MON_opbizLreaClscSe varchar(100)                          null comment 'Med Office Name 개업공인중개사종별구분',
    MON_lctnRoadNmAddr  varchar(1000)                         null comment 'Med Office Name 소재지도로명주소',
    MON_lctnLotnoAddr   varchar(1000)                         null comment 'Med Office Name 소재지지번주소',
    MON_telno           varchar(15)                           null comment 'Med Office Name 전화번호',
    MON_estblRegYmd     varchar(11)                           null comment 'Med Office Name 개설등록일자',
    MON_ddcJoinYn       varchar(1)                            null comment 'Med Office Name 공제가입유무 [Y,N]',
    MON_rprsvNm         varchar(10)                           null comment 'Med Office Name 대표자명',
    MON_latitude        varchar(100)                          null comment 'Med Office Name 위도',
    MON_longitude       varchar(100)                          not null comment '경도',
    MON_medSpmbrCnt     varchar(100)                          not null comment 'Med Office Name 중개보조원수',
    MON_ogdpLreaCnt     varchar(100)                          null comment 'Med Office Name 소속공인중개사수',
    MON_hmpgAddr        varchar(100)                          null comment 'Med Office Name 홈페이지주소',
    MON_crtrYmd         varchar(11)                           null comment 'Med Office Name 데이터기준일자',
    MON_insttCode       varchar(15)                           null comment 'Med Office Name 제공기관코드',
    MON_insttNm         varchar(20)                           null comment 'Med Office Name 제공기관기관명',
    MON_created         timestamp default current_timestamp() not null comment 'Med Office Name 생성일시',
    MON_updated         timestamp default current_timestamp() not null comment 'Med Office Name 수정일시',
    constraint med_office_name_MON_seq_uindex
        unique (MON_seq)
)
    comment '전국공인중개사 사무소 표준 데이터 API' collate = utf8mb3_unicode_ci;

create or replace table swisign.pg_cancel_data
(
    PCD_seq          bigint auto_increment comment 'PG Cancel Data 시퀀스'
        primary key,
    PCD_resultCode   varchar(4)                            not null comment 'PG Cancel Data 결제결과코드',
    PCD_resultMsg    varchar(100)                          not null comment 'PG Cancel Data 결제결과메세지',
    PCD_cancelAmt    varchar(12)                           not null comment 'PG Cancel Data 취소 금액',
    PCD_mid          varchar(10)                           not null comment 'PG Cancel Data 상점 ID',
    PCD_moid         varchar(64)                           null comment 'PG Cancel Data 상점 주문번호',
    PCD_signature    varchar(500)                          null comment 'PG Cancel Data hex(sha256(TID+MID+CacelAmt+MerchantKey)), 위변조 검증 데이터',
    PCD_payMethod    varchar(10)                           null comment 'PG Cancel Data 결제수단',
    PCD_tid          varchar(30)                           null comment 'PG Cancel Data 거래ID',
    PCD_cancelDate   varchar(8)                            null comment 'PG Cancel Data 취소일자 (YYYYMMDD)',
    PCD_cancelTime   varchar(6)                            null comment 'PG Cancel Data 취소시간 (HHmmss)',
    PCD_cancelNum    varchar(8)                            null comment 'PG Cancel Data 취소번호',
    PCD_remainAmt    varchar(12)                           null comment 'PG Cancel Data 취소 후 잔액',
    PCD_mallReserved varchar(500)                          null comment 'PG Cancel Data 가맹점 여분 필드',
    PCD_created      timestamp default current_timestamp() not null comment 'PG Cancel Data 생성일',
    PCD_updated      timestamp default current_timestamp() null comment 'PG Cancel Data 수정일',
    constraint pg_cancel_data_PCD_seq_uindex
        unique (PCD_seq)
)
    comment 'PG Cancel Data 테이블' collate = utf8mb3_unicode_ci;

create or replace table swisign.pg_data
(
    PD_seq              bigint auto_increment comment 'PG Data 시퀀스'
        primary key,
    PD_resultCode       varchar(4)                            not null comment 'PG Data 성공코드',
    PD_resultMsg        varchar(100)                          not null comment 'PG Data 결과메세지 (euc-kr)',
    PD_amt              varchar(12)                           not null comment 'PG Data 금액 12자리',
    PD_mid              varchar(10)                           not null comment 'PG Data 상점 ID',
    PD_moid             varchar(64)                           not null comment 'PG Data 상점주문번호',
    PD_signature        varchar(500)                          not null comment 'PG Data hex(sha256(TID+MID+Amt+MerchantKey)), 위변조 검증 데이터',
    PD_buyerEmail       varchar(60)                           null comment 'PG Data 구매자 메일주소',
    PD_buyerTel         varchar(20)                           not null comment 'PG Data 구매자 연락처',
    PD_buyerName        varchar(30)                           null comment 'PG Data 구매자 이름',
    PD_goodsName        varchar(40)                           not null comment 'PG Data 상품명',
    PD_tid              varchar(30)                           not null comment 'PG Data 거래ID',
    PD_authCode         varchar(30)                           not null comment 'PG Data 승인 번호',
    PD_authDate         varchar(12)                           not null comment 'PG Data 승인 날짜(YYYYMMDDHHMMSS)',
    PD_payMethod        varchar(10)                           null comment 'PG Data 결제수단',
    PD_mallReserved     varchar(500)                          null comment 'PG Data 가맹점 여분 필드',
    PD_cardCode         varchar(3)                            null comment 'PG Data 결제 카드사 코드',
    PD_cardName         varchar(20)                           null comment 'PG Data 결제 카드사 이름',
    PD_cardNo           varchar(20)                           null comment 'PG Data 카드번호',
    PD_cardQuota        varchar(2)                            null comment 'PG Data 할부개월',
    PD_cardInterest     varchar(1)                            null comment 'PG Data 상점분담 무이자 적용 여부
0: 미적용
1: 적용',
    PD_AcquCardCode     varchar(3)                            null comment 'PG Data 매입 카드사 코드',
    PD_AcquCardName     varchar(100)                          null comment 'PG Data 매입 카드사 이름',
    PD_cardCl           varchar(1)                            null comment 'PG Data 카드 구분
0: 신용
1: 체크',
    PD_ccPartCl         varchar(2)                            null comment 'PG Data 부분취소 가능 여부
0: 불가능
1: 가능',
    PD_cardType         varchar(2)                            null comment 'PG Data 카드 형태
01: 개인
02: 법인
03: 해외',
    PD_clickplayCl      varchar(2)                            null comment 'PG Data 간편결제구분
6: SKPAY
7: SSGPAY
8: SAMSUNGPAY(구버전)
15: PAYCO
16: KAKAOPLAY
18: LPAY
20: NAVERPAY
21: SAMSUNGPAY
22: APPLEPAY',
    PD_couponAmt        varchar(12)                           null comment 'PG Data 쿠폰 금액',
    PD_couponMinAmt     varchar(12)                           null comment 'PG Data 쿠폰 최소금액',
    PD_pointAppAmt      varchar(12)                           null comment 'PG Data 포인트 승인금액',
    PD_multiCl          varchar(1)                            null comment 'PG Data 복합결제 여부
0: 복합결제 미사용
1: 복합결제 사용',
    PD_multiCardAcquAmt varchar(12)                           null comment 'PG Data 복합결제 신용카드 금액',
    PD_multiPointAmt    varchar(12)                           null comment 'PG Data 복합결제 포인트 금액',
    PD_multiCouponAmt   varchar(12)                           null comment 'PG Data 복합결제 쿠폰 금액',
    PD_multiRcptAmt     varchar(12)                           null comment 'PG Data 페이코 머니 거래건 현금영수증 발급 대상 금액',
    PD_rcptType         varchar(1)                            null comment 'PG Data 현금영수증 타입
1: 소득공제
2: 지출증빙
이외 발행안함',
    PD_rcptTID          varchar(30)                           null comment 'PG Data 현금영수증TID',
    PD_rcptAuthCode     varchar(30)                           null comment 'PG Data 현금영수증 승인번호',
    PD_vbankBankCode    varchar(3)                            null comment 'PG Data 결제은행코드 (가상계좌)',
    PD_vbankBankName    varchar(20)                           null comment 'PG Data 결제은행명 (euc-kr) (가상계좌)',
    PD_vbankNum         varchar(20)                           null comment 'PG Data 가상계좌번호 (가상계좌)',
    PD_vbankExpDate     varchar(8)                            null comment 'PG Data 가상계좌 입금만료일 (yyyyMMdd) (가상계좌)',
    PD_vbankExpTime     varchar(6)                            null comment 'PG Data 가상계좌 입금만료시간(HHmmss) (가상계좌)',
    PD_bankCode         varchar(3)                            null comment 'PG Data 결제은행코드 (계좌이체)',
    PD_bankName         varchar(20)                           null comment 'PG Data 결제은행명 (euc-kr) (계좌이체)',
    PD_created          timestamp default current_timestamp() not null comment 'PG Data 생성일',
    PD_updated          timestamp default current_timestamp() not null comment 'PG Data 수정일',
    constraint pg_data_PD_seq_uindex
        unique (PD_seq)
)
    comment 'PG Data' collate = utf8mb3_unicode_ci;

create or replace table swisign.proof_issue_tax_cert
(
    PITC_seq                   bigint auto_increment comment 'Proof Issue Tax Cert 시퀀스'
        primary key,
    PITC_resIssueNo            longtext                              not null comment 'Proof Issue Tax Cert 발급번호',
    PITC_resUserNm             varchar(100)                          null comment 'Proof Issue Tax Cert 성명(대표자)',
    PITC_resUserAddr           varchar(1000)                         not null comment 'Proof Issue Tax Cert 주소(본점)',
    PITC_resUserIdentiyNo      varchar(20)                           null comment 'Proof Issue Tax Cert 주민등록번호 [법인의 경우 법인등록번호]',
    PITC_resCompanyNm          varchar(100)                          null comment 'Proof Issue Tax Cert 상호(법인명) [법인의 경우 필수]',
    PITC_resCompanyIdentityNo  varchar(20)                           null comment 'Proof Issue Tax Cert 사업자등록번호 [법인의 경우 필수]',
    PITC_resPaymentTaxStatusCd varchar(5)                            null comment 'Proof Issue Tax Cert 납세상태코드 [ex. "ZZ"]',
    PITC_resPaymentTaxStatus   varchar(10)                           null comment 'Proof Issue Tax Cert 납세상태 [ex. "해당없음"]',
    PITC_resUsePurpose         varchar(100)                          null comment 'Proof Issue Tax Cert 증명서 사용목적',
    PITC_resOriGinalData       longtext                              null comment 'Proof Issue Tax Cert XML원문(originDataYN="1"인 경우 포함)',
    PITC_resValidPeriod        varchar(10)                           null comment 'Proof Issue Tax Cert 유효기간 [증명서 유효기간]',
    PITC_resReason             varchar(100)                          null comment 'Proof Issue Tax Cert 사유 [유효기간을 정한 사유]',
    PITC_resReceiptNo          longtext                              null comment 'Proof Issue Tax Cert 접수번호',
    PITC_resDepartmentName     varchar(100)                          null comment 'Proof Issue Tax Cert 부서명 [담당부서]',
    PITC_resUserNm1            varchar(100)                          null comment 'Proof Issue Tax Cert 성명1 [담당자]',
    PITC_resPhoneNo            varchar(20)                           null comment 'Proof Issue Tax Cert 전화번호 [연락처]',
    PITC_resIssueOgzNm         varchar(100)                          null comment 'Proof Issue Tax Cert 발급기관',
    PITC_resIssueDate          varchar(10)                           null comment 'Proof Issue Tax Cert 발급일자 [YYYYMMDD]',
    PITC_resRespiteList        longtext                              null comment 'Proof Issue Tax Cert 징수유예등 또는 체납처분 유예의 명세 List',
    PITC_resArrearsList        longtext                              null comment 'Proof Issue Tax Cert 체납 List',
    PITC_resOriGinalData1      longtext                              null comment 'Proof Issue Tax Cert 원문 DATA1 [PDF파일 Base64 값 (originDataYN="1"인 경우 포함)]',
    PITC_created               timestamp default current_timestamp() not null comment 'Proof Issue Tax Cert 생성일시',
    PITC_updated               timestamp default current_timestamp() not null comment 'Proof Issue Tax Cert 수정일시',
    constraint proof_issue_tax_cert_PITC_seq_uindex
        unique (PITC_seq),
    constraint PITC_resArrearsList
        check (json_valid(`PITC_resArrearsList`)),
    constraint PITC_resRespiteList
        check (json_valid(`PITC_resRespiteList`))
)
    comment '납세증명서 API' collate = utf8mb3_unicode_ci;

create or replace table swisign.property_listings
(
    pl_seq                bigint auto_increment comment 'Property Listings 시퀀스'
        primary key,
    pl_status             varchar(10) collate utf8mb4_unicode_ci default 'request'           not null comment 'Property Listings 매물 진행 상태
request: 요청
post: 등록
ing: 진행
done: 완료
cancel: 취소',
    pl_document_num       varchar(25) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 문서확인번호',
    pl_unique_num         varchar(25) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 고유번호',
    pl_address            varchar(50) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 주소',
    pl_jibun              varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 지번',
    pl_road_address       varchar(50) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 도로명주소',
    pl_building_type      varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 건물 유형 *choices*',
    pl_total_floor        tinyint                                default 0                   not null comment 'Property Listings 총 층수',
    pl_total_ho           smallint                               default 0                   not null comment 'Property Listings 총 호수',
    pl_total_household    smallint                               default 0                   not null comment 'Property Listings 총 세대수',
    pl_floor              tinyint                                default 0                   not null comment 'Property Listings 해당 매물 층',
    pl_ho                 varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 해당 매물 호',
    pl_area               decimal(6, 2)                                                      not null comment 'Property Listings 면적 (총 6자리 중 2자리 소수점)',
    pl_common_area        decimal(6, 2)                                                      not null comment 'Property Listings 공용 면적 (총 6자리 중 2자리 소수점)',
    pl_issue_date         datetime                                                           not null comment 'Property Listings 문서 발급일',
    pl_issuer             varchar(20) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 발급기관',
    pl_contract_type      varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 전세/월세 *choices*',
    pl_deposit            int                                    default 0                   not null comment 'Property Listings 보증금',
    pl_monthly_rent       int                                    default 0                   not null comment 'Property Listings 월세',
    pl_maintenance_fee_yn tinyint(1)                             default 1                   not null comment 'Property Listings 관리비 여부
0: 불가능
1: 가능',
    pl_maintenance_fee    longtext collate utf8mb4_bin           default 0                   not null comment 'Property Listings 관리비 (항목별로 입력해야 할 것 같아 json)',
    pl_parking_yn         tinyint(1)                             default 1                   not null comment 'Property Listings 주차가능여부
0: 불가능
1: 가능',
    pl_parking_fee        int                                    default 0                   not null comment 'Property Listings 주차비',
    pl_loan_yn            tinyint(1)                             default 1                   not null comment 'Property Listings 대출가능여부
0: 불가능
1: 가능',
    pl_loan               int                                    default 0                   not null comment 'Property Listings 대출가능상품
예시
0: 가능상품없음
1: 카카오전세대출
2: hug
4: ...',
    pl_move_in_now_yn     tinyint(1)                             default 0                   not null comment 'Property Listings 즉시 입주 가능 여부
0: 불가능 (날짜선택)
1: 가능',
    pl_move_in_date       datetime                               default current_timestamp() not null comment 'Property Listings 입주 가능 날짜 (즉시 가능은 Now())',
    pl_etc                varchar(500) collate utf8mb4_unicode_ci                            null comment 'Property Listings 비고',
    c_seq_landlord        bigint                                                             not null comment 'Property Listings 임대인 회원 번호',
    c_seq_agent           bigint                                                             not null comment 'Property Listings 중개인 회원 번호',
    pl_created            datetime                               default current_timestamp() not null comment 'Property Listings 등록일',
    pl_updated            datetime                               default current_timestamp() not null comment 'Property Listings 수정일',
    pl_views              int                                    default 0                   not null comment 'Property Listings 조회수',
    pl_view_yn            tinyint(1)                             default 1                   not null comment 'Property Listings 노출 여부
0: 숨김
1: 노출',
    pl_deleted_yn         tinyint(1)                             default 0                   not null comment 'Property Listings 삭제 여부
0: 삭제안됨
1: 삭제됨',
    pl_deleted            datetime                               default current_timestamp() not null comment 'Property Listings 삭제일',
    constraint property_listings_pl_seq_uindex
        unique (pl_seq),
    constraint pl_maintenance_fee
        check (json_valid(`pl_maintenance_fee`))
)
    comment '매물 리스트' collate = utf8mb3_unicode_ci;

create or replace table swisign.real_estate_register
(
    RER_seq                    bigint auto_increment comment 'Real Estate Register 시퀀스'
        primary key,
    RER_commIssueCode          varchar(10)                           null comment 'Real Estate Register 발행코드 [issueType이 "1:열람"일 때만 출력]',
    RER_resIssueYN             varchar(1)                            not null comment 'Real Estate Register 발행여부
[
0: 발행실패 (공동담보 및 매매목록 500건 이상)
1: 발행성공
2: 고유번호조회
3: 결과처리 실패 (발급성공)
4: 발급성공 이후 처리 실패 (발급목록에 미발급으로 표시)
]',
    RER_resTotalPageCount      longtext                              null comment 'Real Estate Register 총 페이지 수 [inquiryType=1 간편검색,조회실패]',
    RER_commStartPageNo        longtext                              null comment 'Real Estate Register 시작페이지 번호 [inquiryType=1 간편검색, 조회실패]',
    RER_resEndPageNo           longtext                              null comment 'Real Estate Register 종료페이지 번호 [inquiryType=1 간편검색, 조회실패]',
    RER_resWarningMessage      varchar(1000)                         null comment 'Real Estate Register 경고 메세지 [warningSkipYN=1인 경우 필수]',
    RER_resOriGinalData        longtext                              null comment 'Real Estate Register 원문 DATA [사이트 결과 XML 원문 데이터]',
    RER_resAddrList            longtext                              null comment 'Real Estate Register 주소 List [reIssueYN이 0(발행실패) 또는 2(고유번호조회)이면서 다수의 부동산 검색된 경우 조회된 목록]',
    RER_resSearchList          longtext                              null comment 'Real Estate Register 검색 List [발행실패 매매목록 or 공동담보/전세목록]',
    RER_resRegisterEntriesList longtext                              null comment 'Real Estate Register 등기사항 List [부동산등기부등본 문서 내용]',
    RER_created                timestamp default current_timestamp() not null comment 'Real Estate Register 등록일시',
    RER_updatted               timestamp default current_timestamp() not null comment 'Real Estate Register 수정일시',
    constraint real_estate_register_RER_seq_uindex
        unique (RER_seq),
    constraint RER_resAddrList
        check (json_valid(`RER_resAddrList`)),
    constraint RER_resRegisterEntriesList
        check (json_valid(`RER_resRegisterEntriesList`)),
    constraint RER_resSearchList
        check (json_valid(`RER_resSearchList`))
)
    comment '부동산등기부등본 열람/발급 API' collate = utf8mb3_unicode_ci;

create or replace table swisign.stan_region_cd
(
    SRC_seq             bigint auto_increment
        primary key,
    SRC_regionCd        varchar(10)                           not null comment 'Standard Region Code 지역코드',
    SRC_sidoeCd         varchar(2)                            not null comment 'Standard Region Code 시도코드',
    SRC_sggCd           varchar(3)                            not null comment 'Standard Region Code 시군구코드',
    SRC_umdCd           varchar(3)                            not null comment 'Standard Region Code 읍면동코드',
    SRC_riCd            varchar(2)                            null comment 'Standard Region Code 리코드',
    SRC_locationjuminCd varchar(10)                           null comment 'Standard Region Code 지역코드-주민',
    SRC_locationjijukCd varchar(10)                           not null comment 'Standard Region Code 지역코드-지적',
    SRC_locataddNm      varchar(50)                           not null comment 'Standard Region Code 지역주소명',
    SRC_locatOrder      varchar(3)                            null comment 'Standard Region Code 서열',
    SRC_locatRm         varchar(200)                          null comment 'Standard Region Code 비고',
    SRC_locathighCd     varchar(10)                           null comment 'Standard Region Code 상위지역코드',
    SRC_locallowNm      varchar(20)                           null comment 'Standard Region Code 최하위지역명',
    SRC_adptDe          varchar(8)                            null comment 'Standard Region Code 생성일',
    SRC_created         timestamp default current_timestamp() not null comment 'Standard Region Code 생성일',
    SRC_updated         timestamp default current_timestamp() not null comment 'Standard Region Code 수정일'
)
    comment '법정동코드' collate = utf8mb3_unicode_ci;

create or replace table swisign.test_data
(
    seq      bigint auto_increment
        primary key,
    testName varchar(20) null,
    age      int         null,
    email    varchar(20) null,
    gender   varchar(1)  null,
    constraint test_data_seq_uindex
        unique (seq)
)
    collate = utf8mb3_unicode_ci;

