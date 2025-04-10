-- auto-generated definition
create table company_data
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

