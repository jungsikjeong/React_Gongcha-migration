테스트를 하고싶으시면,
server/config/dev.js 파일을 생성해주시고
mongodb를 연결해주세요

ex) dev.js

```js
module.exports = {
  mongoURI:
    'mongodb+srv://mongodbID:<password>@react-goncha.k8k7z6w.mongodb.net/',
};
```
