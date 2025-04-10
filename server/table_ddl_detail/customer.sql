create or replace table swisign.customer
(
    C_seq                 bigint auto_increment comment 'Customer 시퀀스 넘버'
        primary key,
    C_name                varchar(100)                           not null comment 'Customer 이름 (암호화)',
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