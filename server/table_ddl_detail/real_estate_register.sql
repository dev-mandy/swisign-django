-- auto-generated definition
-- codef https://developer.codef.io/products/public/each/ck/real-estate-register
create table real_estate_register
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

