const multer = require('multer');
const path = require('path');

module.exports = {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)

			cb(null, `${req.headers.user_id}-${Date.now()}${ext}`);	 
		},
	}),
};