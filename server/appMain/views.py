from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.http import require_http_methods
from django.template.loader import render_to_string
from django.core import serializers
from openai import OpenAI
from dotenv import load_dotenv
from xhtml2pdf import pisa
import os
import uuid
import boto3
from botocore.exceptions import ClientError
import logging
import requests



load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
messages = []
messagesObj = {}

def index(request):
    return HttpResponse("장고서버 인덱스 페이지입니다. :)")

# login      POST
@require_http_methods(["POST"])
def login(request):
    print('Request:: Login')
    try:
        session['user'] = request.POST;
        isMember = request.POST['email'] != None and request.POST['password'] != None

        return makeResponse(200, isMember, 200, {"email": request.POST['email']})
    except Exception as e:
        print('-----------------------')
        print('Error:: Login')
        print(e)
        print('-----------------------')
        return makeResponse(500, False, 500, {"resultMessage": "문제가 발생했습니다."})


# logout      GET/POST
@require_http_methods(["GET","POST"])
def logout(request):
    print('Request:: Logout')
    try:
        session['user'] = None;
        return makeResponse(200, True, 200, {})
    except Exception as e:
        print('-----------------------')
        print('Error:: Logout')
        print(e)
        print('-----------------------')
        return makeResponse(500, False, 500, {"resultMessage": "문제가 발생했습니다."})


# chatting API     POST
@require_http_methods(["POST"])
def chat(request):
    print('Request:: Chat')
    try:
        question = request.POST['question']
        print(question)
        addMessage("user", question)
        answer = requestAI(True)
        uid = addMessage("assistant", answer)
        # 특약사항인지 확인해
        displayButton = requestAI(True, answer + "위 글이 계약서에 바로 사용할 수 있는 특약사항만을 나열한 글이라면 T, 아니면 F라고 한 글자로 대답해줘.")

        return makeResponse(200, True, 200, {"answer": answer, "uid": uid, "displayButton": displayButton})
    except Exception as e:
        print('-----------------------')
        print('Error:: Chat')
        print(e)
        print('-----------------------')
        return makeResponse(500, False, 500, {"resultMessage": "문제가 발생했습니다."})


# 특약사항 선택    /terms/accept   POST
@require_http_methods(["POST"])
def acceptTerms(request):
    print('Request:: Accept Terms')
    try:
        items = request.POST['items'];
        # 모두 좋아요
        enable = requestAI(False, items + '위 글이 계약서에 바로 사용할 수 있는 특약사항만을 나열한 글이라면 T, 아니면 F라고 한 글자로 대답해줘.')
        if (enable == 'T'):
            """ requestAI(False, message) """
            print("~~~~~~~~~~~~~~~~~~~~~~~")
            url = makeFile(items.split('|'))

        return makeResponse(200, True, 200, {"answer": "", "url": url})
    except Exception as e:
        print('-----------------------')
        print('Error:: Accept Terms')
        print(e)
        print('-----------------------')
        return makeResponse(500, False, 500, {"resultMessage": "문제가 발생했습니다."})


# 특약사항 선택 Before     /terms/list     POST
@require_http_methods(["POST"])
def getTermsList(request):
    print('Request:: Get Terms List')
    try:
        # div
        # title = 항목 나열
        # content = 특약사항 나열
        div = request.POST['div']
        type = request.POST['type']
        title = request.POST['title']

        answer = ''
        uid = ''
        displayButton = 'terms'
        if (div == 'title'):
            question = type + '특약사항에 넣을 수 있는 항목을 ["", ""] 형식의 json array로 답변해'
            addMessage("user", question)
            answer = requestAI(False, question)
            addMessage("assistant", answer)
        elif (div == 'content'):
            question = type + " " + title + '에 대한 특약사항을 추천해줘. 바로 계약서에 입력할 수 있는 문장으로 ["", ""] 형식의 json array로 답변해'
            addMessage("user", question)
            answer = requestAI(True)
            uid = addMessage("assistant", answer)
            # 특약사항인지 확인해
            displayButton = requestAI(True, answer + "위 글이 계약서에 바로 사용할 수 있는 특약사항만을 나열한 글이라면 T, 아니면 F라고 한 글자로 대답해줘.")

        return makeResponse(200, True, 200, {"terms": answer, "uid": uid, "displayButton": displayButton})
    except Exception as e:
        print('-----------------------')
        print('Error:: Get Terms List')
        print(e)
        print('-----------------------')
        return makeResponse(500, False, 500, {"resultMessage": "문제가 발생했습니다."})


def makeFile(items):
    print('Request:: Make File')
    try:
        html = render_to_string('pdf.html', {'items': items});
        s3 = boto3.client(
            's3',
            aws_access_key_id=os.getenv('aws_access_key_id'),
            aws_secret_access_key=os.getenv('aws_secret_access_key'),
            region_name=os.getenv('region_name'),
            endpoint_url=os.getenv('endpoint_url')
        )
        isPrd = os.getenv('is_prd')
        fileName = uuid.uuid4().hex + '.pdf'
        fullPath = ''
        if (isPrd == True):
            fullPath = os.getenv('prd_pdf_path') + '/' + fileName
        else:
            fullPath = os.getenv('dev_pdf_path') + '/' + fileName

        with open(fullPath, "wb") as f:
            pisa_status = pisa.CreatePDF(
                html,  # the HTML to convert
                dest=f
            )
        result = ''
        with open(fullPath, "rb") as f:
            result = s3.upload_fileobj(f, "server", fileName)
        os.remove(fullPath)
        print(result);
        print(pisa_status.err);

        return 'https://cnqvnltzd6ao.objectstorage.ap-seoul-1.oci.customer-oci.com/n/cnqvnltzd6ao/b/swisign/o/' + fileName

        # return makeResponse(200, True, 200, {"filePath": ""});
    except Exception as e:
        print('-----------------------')
        print('Error:: Make File')
        print(e)
        print('-----------------------')
        return makeResponse(500, False, 500, {"resultMessage": "문제가 발생했습니다."})

# AI요청
# includePast = 과거대화 포함 여부
def requestAI(includePast, message = None):
    tempMessages = []
    if(includePast == True):
        tempMessages = messages[-4:] if len(messages) > 2 else messages
    else:
        tempMessages = messages[-1:]

    for item in tempMessages:
        if('uid' in item): del item['uid']

    #message가 있으면
    if(message != None): tempMessages.append({"role": "user", "content": message})

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=tempMessages
    )
    return completion.choices[0].message.content

# messages array 누적
def addMessage(role, content):
    uid = uuid.uuid4().hex;
    messages.append({"role": role, "content": content, "uid": uid})
    messagesObj[uid] = {"role": role, "content": content}
    return uid;

# makeResponse
def makeResponse(status, result, resultCode, data):
    return JsonResponse({'result':result, 'resultCode':resultCode, 'data':data, 'status':status})

def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True