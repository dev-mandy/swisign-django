from drf_yasg import openapi

#공통 response
api_responses = {
    200: openapi.Schema(
        title="200 OK",
        description="요청 성공",
        type=openapi.TYPE_OBJECT,
        properties={
            'status': openapi.Schema(type=openapi.TYPE_NUMBER, description="상태", example=200),
            'result': openapi.Schema(type=openapi.TYPE_BOOLEAN, description="결과", example=True),
            'result_code': openapi.Schema(type=openapi.TYPE_NUMBER, description="상태코드", example=200),
            'data': openapi.Schema(type=openapi.TYPE_OBJECT, description="데이터", properties={} ),
        }
    ),
    500: openapi.Schema(
        title="500 Error",
        description="요청 실패",
        type=openapi.TYPE_OBJECT,
        properties={
            'status': openapi.Schema(type=openapi.TYPE_NUMBER, description="상태", example=500),
            'result': openapi.Schema(type=openapi.TYPE_BOOLEAN, description="결과", example=False),
            'result_code': openapi.Schema(type=openapi.TYPE_NUMBER, description="상태코드", example=500),
            'data': openapi.Schema(type=openapi.TYPE_OBJECT,
                properties={
                    'resultMessage': openapi.Schema(type=openapi.TYPE_STRING, description="실패메세지", example="문제가 발생했습니다.")
                }
            ),
        }
    ),
}