const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/dev');

aws.config.update({
    secretAccessKey: config.SECRET_ACCESS_KEY,
    accessKeyId: config.ACCESS_KEY_ID,
    region: 'ap-south-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type!'), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3: s3,
        bucket: 'bwm-learning',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_METADATA' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

module.exports = upload;

