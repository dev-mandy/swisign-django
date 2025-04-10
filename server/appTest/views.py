import json
from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import FormParser, MultiPartParser
from .api_params import *
from .api_responses import api_responses
from appModels.models.TestData import TestData

import json
from easycodefpy import Codef, ServiceType
from dotenv import load_dotenv
import os
load_dotenv()
# 코드에프 인스턴스 생성
codef = Codef()
codef.public_key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjjYTugtEcRbCVE/y1X5Z5kVz7AWd/2X4/aimn59ftqiIHIAZ3I7paGF12f0IYtNWb9nWZipERibZ64fmobjQ7xQLYi+6BnABrJZmWZgrLceUFu86Z0FaDf+v/r39LD6qVIdwGRGTcPf68iIODZPwznzX3udZknDWmYrUsZusmpd5bsQud/ScDJj5cjjB5CYZBwK4wadK9FoHN1qgtA1P+8hWK3XR43pzhqhM/ub0g/DDyxl+4ZXZBhehT1lsP77jTEZyW98tvmWDN5YOFbLoiF13ibThaHNIR0P8dLr/OOtgQVwwk6XAYvgJqilKfXk48C4p3ZMoSTkNNv4CpjwrTQIDAQAB'
#codef 테스트
@swagger_auto_schema(
    method='get',
    tags=['Try Codef API'],
    operation_description='Codef API를 테스트합니다. 한 달 최대 100건 테스트 가능',
    operation_summary='Try Codef API',
    responses=api_responses
)
@api_view(['GET'])
def codef_test(request):
    codef.set_demo_client_info(os.getenv('codef_client_id'), os.getenv('codef_client_secret'))
    parameter = {
        "organization": "0001",
        "loginType": "1",
        "userId": "yhl2780",
        "userPassword": "Sc8O0Zell2XvnTElY70IT/JecOaYscqwJP6byRVsORZBrXMysqis2yZrqY1JWakXyZU3kDH8nd9hdNtNNMiQ1myt/Qs5Emb++jAI49WleLwkF6zrQf8N8nIGd9GR/lUY50H/mwnSGiWeK7nX20ttB3gAJK1hpeCEQJ42xpxB1IGJbiPzl7NdzxK873CkXT1hozZNIBjFAJBfv3HhioR9PwDOpOWOF2lE9+8C9eJOH369R9DzBfJxeBbl7n/hjHqawReWu7JIKI7zIhq7p8YAmeA9jc3G5KDlsRrPPU9wKRizp9EBCn4h0AoGHoWX+n3xvwVMGzZkX5tRz24Pdm2+NQ==",
        "address": "인천광역시 계양구 하느재로20번길 5-28",
        "dong": "1",
        "ho": "202",
        "type": "0",
        "zipCode": "21040"
    }
    # 코드에프 정보 조회 요청
    # - 서비스타입(0:정식, 1:데모, 2:샌드박스)
    # 개인 보유계좌 조회 (https://developer.codef.io/products/bank/common/p/account)
    product_url = "/v1/kr/public/mw/multiowned-buildings/possession-ledger"
    res = codef.request_product(product_url, ServiceType.DEMO, parameter)
    print(res)

    return make_response(200, True, 200, {"codef_response": res})

# 테스트 화면
def index(request):
    return render(request, 'test/index.html')

'''
* 필드명__lt: 값
필드명 < 값

* 필드명__lte: 값
필드명 <= 값

* 필드명__gt: 값
필드명 > 값

* 필드명__gte: 값
필드명 >= 값

* 필드명__startswith: 값
값으로 시작하는
__istartswith의 경우 대소문자 구분x

* 필드명__endswith: 값
값으로 끝나는
__iendswith의 경우 대소문자 구분x

* 필드명__contains: 값
값이 포함되는
__icontains의 경우 대소문자 구분x

* 필드명__in: [...값]
배열 중 하나라도 일치하면

'''

@swagger_auto_schema(
    method='get',
    tags=['Get List'],
    operation_description='테스트 데이터를 조건없이 모두 조회합니다.',
    operation_summary='테스트 데이터 단순 조회',
    responses=api_responses
)
@api_view(['GET'])
@require_http_methods(["GET"])
def get_test_data(request):
    print('Request:: GetTestData')
    try:
        # primary key (sequence)는 항상 select 하여야 함.
        test_data = serializers.serialize('json', TestData.objects.raw("SELECT * FROM test_data ORDER BY testName desc"))
        # testData2 = serializers.serialize('json',TestData.objects.extra(tables=['customer'], where=['customer.c_name=test_data.testName']))
        # testData2 = serializers.serialize('json',TestData.objects.select_related('customer'))
        test_data2 = serializers.serialize('json', TestData.objects.all())

        update_list = []
        temp = TestData.objects.all()
        for i, obj in enumerate(temp):
            obj.testname = obj.testname
            update_list.append(obj)

        result = TestData.objects.bulk_update(update_list, ['testname'])
        print(result)


        return make_response(200, True, 200, {"list": json.loads(test_data)})

    except Exception as e:
        print('-----------------------')
        print('Error:: GetTestData')
        print(e)
        print('-----------------------')
        return make_response(500, False, 500, {"resultMessage": "문제가 발생했습니다."})



@swagger_auto_schema(
    method='post',
    tags=['Update Test Data'],
    operation_description='테스트 데이터를 수정합니다.',
    operation_summary='테스트 데이터 단일 수정',
    manual_parameters=get_update_params,
    responses=api_responses
)
@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
@require_http_methods(["POST"])
def update_test_data(request):
    print('Request:: UpdateTestData')
    try:
        '''
        다중 update의 경우 bulk_update 사용
        * 다만 모델이 아니라 DB에 직접 update하는 방식이기 때문에 기본 메서드 사용 불가 -> 무결성 깨짐 발생 가능
        
        1) 특정 값을 가진 모든 행을 업데이트 할 경우
        * age가 20인 모든 행을 age가 21이 되도록 업데이트
        
        updateRows = TestData.objects.filter(age=20).update(age=21)

        * 이름이 mandy인 모든 행을 mandy+index 형태로 업데이트
        
        update_list = []
        temp = TestData.objects.filter(testname='mandy')
        for i, obj in enumerate(temp):
            obj.testname = obj.testname + str(i)
            update_list.append(obj)
        
        #마지막 값의 경우 업데이트 할 컬럼명 필요
        updateRows = TestData.objects.bulk_update(update_list, [testname])
        
        '''
        result = TestData.objects.filter(seq=request.POST['seq']).update(
            testname=request.POST['testname'],
            age=request.POST['age'],
            email=request.POST['email'],
            gender=request.POST['gender']
        )

        return make_response(200, True, 200, {"updateRows": result})

    except Exception as e:
        print('------------------------')
        print('Error:: UpdateTestData')
        print(e)
        print('-----------------------')
        return make_response(500, False, 500, {"resultMessage": "문제가 발생했습니다."})


@swagger_auto_schema(
    method='POST',
    tags=['Create Test Data'],
    consumes=["application/x-www-form-urlencoded"],
    operation_description='테스트 데이터를 등록합니다.',
    operation_summary='테스트 데이터 단일 등록',
    manual_parameters=get_create_params,
    responses=api_responses,
)
@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
@require_http_methods(["POST"])
def save_test_data(request):
    print('Request:: SaveTestData')
    try:
        print(request.POST)
        test_data = TestData()
        test_data.testname = request.POST['testname']
        test_data.age = int(request.POST['age'])
        test_data.email = request.POST['email']
        test_data.gender = request.POST['gender']
        #save의 경우 리턴 값 없음
        #save(force_insert=True) → upsert 가 아닌 insert 고정
        #save() → upsert
        test_data.save(force_insert=True)

        '''
        아래와 같이 insert 가능
        TestData.objects.create(testname=request.POST['testname'],age=int(request.POST['age']),email=request.POST['email'],gender=request.POST['gender'])
        
        혹은
        
        test_data = TestData(testname=request.POST['testname'],age=int(request.POST['age']),email=request.POST['email'],gender=request.POST['gender'])
        test_data.save(force_insert=True)
        
        
        다중 insert의 경우 bulk_create 사용
        * 다만 모델이 아니라 DB에 직접 insert하는 방식이기 때문에 기본 메서드 사용 불가 -> 무결성 깨짐 발생 가능
        * 일부 실패 시 전체 롤백
        
        test_data1 = TestData(testname='oren',age=19,email='oren@naver.com',gender='M')
        test_data2 = TestData(testname='ari',age=15,email='ari@naver.com',gender='F')
        TestData.objects.bulk_create([test_data1, test_data2])
        
        혹은
        
        batch_data = []
        {batch_data에 append하는 반복문}
        TestData.objects.bulk_create(batch_data)
        
        '''

        return make_response(200, True, 200, {})

    except Exception as e:
        print('------------------------')
        print('Error:: SaveTestData')
        print(e)
        print('-----------------------')
        return make_response(500, False, 500, {"resultMessage": "문제가 발생했습니다."})

@swagger_auto_schema(
    method='post',
    tags=['Delete Test Data'],
    operation_description='테스트 데이터를 삭제합니다.',
    operation_summary='테스트 데이터 다건 삭제',
    manual_parameters=get_delete_params,
    responses=api_responses
)
@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
@require_http_methods(["POST"])
def delete_test_data(request):
    print('Request:: DeleteTestData')
    try:
        #soft delete의 경우 update를 사용, 해당 함수의 경우 hard delete
        '''
        단건 삭제의 경우 (Request Body 의 seq 가 배열이 아닌 문자열/숫자일 경우)
        TestData.objects.filter(seq=request.POST['seq']).delete()
        
        전체 삭제의 경우
        TestData.objects.all().delete()
        
        특정 값을 만족한 모든 컬럼을 삭제할 경우 (20살인 모든 컬럼 제거)
        TestData.objects.filter(age=20).delete()
        '''

        result = TestData.objects.filter(seq__in=request.POST.getlist('seq')).delete()
        print(result[0])

        return make_response(200, True, 200, {"deleteRows": result[0]})

    except Exception as e:
        print('------------------------')
        print('Error:: DeleteTestData')
        print(e)
        print('-----------------------')
        return make_response(500, False, 500, {"resultMessage": "문제가 발생했습니다."})


# makeResponse
def make_response(status, result, result_code, data):
    return JsonResponse({'result':result, 'resultCode':result_code, 'data':data, 'status':status})