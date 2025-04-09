# Swisign

기본적인 내용만 서술해두었습니다.

comment)

* 2025-04-08
  * .env 파일과 데이터베이스 DDL은 구글드라이브에 업로드함.
  * https://drive.google.com/drive/folders/1x8zJ_7IEd1C5J4bE-x6pe1m0MotAa4cT
  * swagger ui 및 sql crud 예시는 appTest 하위 파일들과 config/settings.py, config/urls.py를 참고해주세요.
  * swagger url: http://localhost:8000/swagger
  * test url: http://localhost:8000/test
* 2025-04-09
  * django는 변수명을 카멜 케이스가 아닌 스네이크 케이스를 사용하는 것으로 확인되어 db네이밍 규칙을 변경해야 할 것 같음.
  * 스네이크 케이스 적용한 테이블 테스트 겸 새로 생성함 (property_listings)

---

# 버전 & 다운로드
* ### python
  - 3.10.11
  - https://www.python.org/downloads/release/python-31011/
* ### node
  - v20.11.0 
  - https://nodejs.org/ko/blog/release/v20.11.0
* ### mariadb
  * 11.4.2
  * https://mariadb.org/download/?t=mariadb&o=true&p=mariadb&r=11.4.2&os=windows&cpu=x86_64&pkg=msi&mirror=archive

---

# 개발환경 최초 세팅 시 참고
### 임시 프로젝트 구조도
```bash
  swisign-django        # 프로젝트 최상위 폴더 (swisign-django는 임시로 정한 폴더명임)
  └───client            # 프론트엔드 폴더
    └───...               # 하위폴더들 (디테일은 프론트엔드 README.md 참고)
    .env                  # 프론트용 env
  └───server            # 백엔드 폴더
    └───appChatbot        # 챗봇용 App (임시)
    └───appMain           # 메인용 App (임시)
    └───appTest           # Swagger 및 ORM CRUD 테스트 용 App
    └───config            # 테스트 용
    .env                  # 백용 env
    manage.py             # 서버 실행
  └───swisign-venv      # 가상 환경 폴더 (해당 뎁스로 가상 환경 생성)
    └───Include           # ..
    └───Lib               # 설치된 라이브러리 폴더
    └───Scripts           # 실행파일 폴더
    └───share             # ..
    pyvenv.cfg            # ..
```
## Python 가상환경 설정 및 백엔드 기본 설정 실행
```bash
  cmd
→ swisign-django로 이동
# 가상환경 생성
→ python3 -m venv swisign-venv
# 가상환경 실행
→ swisign-venv/Scripts/activate
# 필요한 pip 라이브러리 설치
→ pip install django django-cors-headers openai oscrypto pillow pyinstaller pypdf requests virtualenv xhtml2pdf python-dotenv boto3 aws mysqlclient drf-yasg djangorestframework
# manage.py 마이그레이션
→ python manage.py migrate
```
## 프론트엔드 라이브러리 설치
```bash
  cmd
→ client로 이동
# 라이브러리 설치
→ yarn install
# 만약 퍼블리싱 폴더를 받은 후 추가 라이브러리를 받게 될 경우 (개발에서만 사용하는 라이브러리)
→ yarn add axios http-proxy-middleware react-uuid moment react-usestateref react-pdf@6.2.2
```

---
# 서버 실행

## 백엔드
```bash
  python manage.py runserver
```
#### 백엔드에서 가끔 사용할 명령어
```bash
  cmd
# db 모델 자동 출력
→ python manage.py inspectdb
# 어플리케이션 생성 (주의. 최초 생성 시 urls.py가 없으므로 만들어줘야 함)
→ python manage.py startapp [어플리케이션 이름 ex)appMain]
```

## 프론트엔드
```bash
  yarn start
```
---

## 로컬에서 개발 시 my.ini
```
[mysqld]
datadir=D:/MariaDB 11.4/data
port=3306
innodb_buffer_pool_size=943M
init_connect="SET collation_connection = utf8_general_ci"
init_connect="SET NAMES utf8"
character-set-server = utf8
collation-server = utf8_general_ci
[client]
port=3306
plugin-dir=C:\Program Files\MariaDB 11.4/lib/plugin
default-character-set = utf8
[mysqldump]
default-character-set = utf8
[mysql]
default-character-set = utf8

```
