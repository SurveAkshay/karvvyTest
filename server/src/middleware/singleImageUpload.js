const multer = require("multer") 
	
var storage = multer.diskStorage({ 
	destination: function (req, file, cb) {
		// images is the Upload_folder_name
		cb(null, "images");
	}, 
	filename: function (req, file, cb) { 
        cb(null, file.originalname) 
	} 
}) 
	
// Define the maximum size for uploading
const maxSize = 4 * 1000 * 1000; 
	
const uploadSingleImage = multer({ 
	storage: storage, 
	limits: { fileSize: maxSize }, 
	fileFilter: function (req, file, cb){ 
	
		// Set the filetypes, it is optional 
		var filetypes = /jpeg|jpg|png/; 
		var mimetype = filetypes.test(file.mimetype); 

		if (mimetype) { 
			return cb(null, true); 
		} 
	
		cb("Error: File upload only supports the " + "following filetypes - " + filetypes); 
	} 
})

module.exports = uploadSingleImage;