from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from requests import session
from django.http import JsonResponse


# getAddressList      POST
# 회원에 따라 주소 리스트
@require_http_methods(["GET"])
def getAddressList(request):
    print('Request:: getAddressList')
    try:

        return makeResponse(200, 'success', 200, '')
    except Exception as e:
        print('-----------------------')
        print('Error:: getAddressList')
        print(e)
        print('-----------------------')
        return makeResponse(500, False, 500, {"resultMessage": "문제가 발생했습니다."})

# getAddressList      POST
@require_http_methods(["GET"])
def getAddressList(request):
    #원랜 인풋으로 입력받기
    #Building Ledger Summary = 건축물대장 총괄표제부
    address = ''
    print('Request:: getAddressList')
    try:

        return makeResponse(200, 'success', 200, '')
    except Exception as e:
        print('-----------------------')
        print('Error:: getAddressList')
        print(e)
        print('-----------------------')
        return makeResponse(500, False, 500, {"resultMessage": "문제가 발생했습니다."})

# makeResponse
def makeResponse(status, result, resultCode, data):
    return JsonResponse({'result': result, 'resultCode': resultCode, 'data': data, 'status': status})