# 이 프로젝트는 마이그레이션된 프로젝트입니다.

기존의 [프로젝트](https://github.com/jungsikjeong/React_Gongcha)를 마이그레이션 하였습니다.


테스트를 하고싶으시면, 다음의 순서를 따라주세요.

1. server/config/dev.js 파일을 생성해주시고 mongodb를 연결해주세요.

ex) server/config/dev.js

```js
module.exports = {
  mongoURI:
    'mongodb+srv://mongodbID:<password>@react-goncha.k8k7z6w.mongodb.net/',
};
```

2. 제일 상단, 루트 디렉토리에서 .env 파일을 생성해주시고,
   다음 빈칸을 입력해주세요
   (게시글 및 기타 기능들 작동이 필요없으시다면 건너뛰시면 됩니다.)

```js
MONGO_URI= 입력
PORT =  입력
JWT_SECRET= 입력
REFRESH_TOKEN_SECRET= 입력
AWS_ACCESS_KEY_ID= ..
AWS_SECRET_ACCESS_KEY=..
AWS_REGION= ..
AWS_BUCKET_NAME= ..
```

3. client/.env파일에서 REACT_APP_API_BASE_URL=자신의 로컬번호 를 입력해주세요

4. client / server 폴더 각각 npm install후 실행해주세요!
