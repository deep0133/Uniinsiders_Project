// multer/multerSetupForPosts.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: "Images/post",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniqueSuffix}${path.extname(file.originalname)}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

module.exports = upload;
