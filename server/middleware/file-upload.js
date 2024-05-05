const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 파일 업로드를 위한 multer 설정
function createMulterStorage(bucketName, folderName) {
  return multer({
    storage: multerS3({
      s3: s3Client,
      bucket: bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        var filename = uuidv4();
        var ext = file.mimetype.split('/')[1];
        if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
          return cb(new Error('Only images are allowed'));
        }
        var filePath = folderName + filename + '.' + ext;
        cb(null, filePath);
      },
    }),
  });
}

// 이미지 업로드를 위한 multer 설정 (게시글 이미지)
const imageUpload = createMulterStorage(
  process.env.AWS_BUCKET_NAME,
  'postImages/'
);
const avatarUpload = createMulterStorage(
  process.env.AWS_BUCKET_NAME,
  'avatarImages/'
);

module.exports = { imageUpload, avatarUpload };
