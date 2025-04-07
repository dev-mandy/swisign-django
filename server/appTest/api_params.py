from drf_yasg import openapi
from rest_framework import serializers as rest_framework_serializers #views의 serializers와 중복됨

# get_create_params = openapi.Schema(
#     type=openapi.TYPE_OBJECT,
#     required=['testname','age','email','gender'],
#     properties={
#         'testname': openapi.Schema(type=openapi.TYPE_STRING, description="유저 이름", example="mandy"),
#         'age': openapi.Schema(type=openapi.TYPE_STRING, description="유저 나이", example="28"),
#         'email': openapi.Schema(type=openapi.TYPE_STRING, description="유저 이메일", example="mandy@mandy.com"),
#         'gender': openapi.Schema(type=openapi.TYPE_STRING, description="유저 성별", example="F", choices=['M', 'F']),
#     },
# )

# class get_create_params(rest_framework_serializers.Serializer):
#     testname    = rest_framework_serializers.CharField(help_text='유저 이름', default='mandy')
#     age         = rest_framework_serializers.IntegerField(help_text='유저 나이', default=28)
#     email       = rest_framework_serializers.CharField(help_text='유저 이메일', default='mandy@mandy.com')
#     gender      = rest_framework_serializers.ChoiceField(help_text='유저 성별', default='F', choices=['M', 'F'])

# get_update_params = openapi.Schema(
#     type=openapi.TYPE_OBJECT,
#     required=['seq','testname','age','email','gender'], #해당 배열에 없는 파라미터는 필수값 표시 제외됨
#     properties={
#         'seq': openapi.Schema(type=openapi.TYPE_NUMBER, description="시퀀스 넘버", example=1),
#         'testname': openapi.Schema(type=openapi.TYPE_STRING, description="유저 이름", example="mandy"),
#         'age': openapi.Schema(type=openapi.TYPE_STRING, description="유저 나이", example="28"),
#         'email': openapi.Schema(type=openapi.TYPE_STRING, description="유저 이메일", example="mandy@mandy.com"),
#         'gender': openapi.Schema(type=openapi.TYPE_STRING, description="유저 성별", example="F", choices=['M', 'F']),
#     },
# )

# get_delete_params = openapi.Schema(
#     type=openapi.TYPE_OBJECT,
#     required=['seq'],
#     properties={
#         'seq': openapi.Schema(type=openapi.TYPE_ARRAY, description="시퀀스 넘버", items=openapi.Schema(type=openapi.TYPE_NUMBER), example=[1, 2]),
#     },
# )

#openapi.IN_FORM -> 폼데이터, openapi.IN_QUERY -> 쿼리데이터
#위 방법들로도 parameters는 생성되지만, swagger ui 에서 post 전송 시 formdata로 받을 수 없어 아래처럼 작성

#등록 폼 파라미터
get_create_params = [
    openapi.Parameter(
        'testname',
        openapi.IN_FORM,
        description="유저 이름",
        type=openapi.TYPE_STRING,
        default='mandy',
        required=True
    ),
    openapi.Parameter(
        'age',
        openapi.IN_FORM,
        description="유저 나이",
        type=openapi.TYPE_INTEGER,
        default=28,
        required=True
    ),
    openapi.Parameter('email',
        openapi.IN_FORM,
        description="유저 이메일",
        type=openapi.TYPE_STRING,
        default='mandy@mandy.com',
        required=True
    ),
    openapi.Parameter('gender',
        openapi.IN_FORM,
        description="유저 성별",
        type=openapi.TYPE_STRING,
        enum=['M', 'F'],
        default='F',
        required=True
    ),
]

#수정 폼 파라미터
get_update_params = [
    openapi.Parameter(
        'seq',
        openapi.IN_FORM,
        description="유저 시퀀스",
        type=openapi.TYPE_INTEGER,
        default=1,
        required=True
    ),
    openapi.Parameter(
        'testname',
        openapi.IN_FORM,
        description="유저 이름",
        type=openapi.TYPE_STRING,
        default='mandy',
        required=True
    ),
    openapi.Parameter(
        'age',
        openapi.IN_FORM,
        description="유저 나이",
        type=openapi.TYPE_INTEGER,
        default=28,
        required=True
    ),
    openapi.Parameter('email',
        openapi.IN_FORM,
        description="유저 이메일",
        type=openapi.TYPE_STRING,
        default='mandy@mandy.com',
        required=True
    ),
    openapi.Parameter('gender',
        openapi.IN_FORM,
        description="유저 성별",
        type=openapi.TYPE_STRING,
        enum=['M', 'F'],
        default='F',
        required=True
    ),
]

#삭제 폼 파라미터
get_delete_params = [
    openapi.Parameter(
        'seq',
        in_=openapi.IN_FORM,
        description='유저 시퀀스 배열',
        required=True,
        type=openapi.TYPE_ARRAY,
        items=openapi.Items(type=openapi.TYPE_INTEGER),
        collection_format='multi'
    ),
]

