import { __dirname } from "../path.js";
import multer from "multer";

const storage = multer.diskStorage({


    destination: function(req,file,cb){
        const archiveName= file.fieldname;
        let destinationFolder=""
        switch(archiveName){
            case "product":
                destinationFolder="products"
                break;
            case "profileImage":
                destinationFolder="profiles"
                break;
            case "document":
                destinationFolder="documents"
                break;

        }
        cb(null,`${__dirname}/public/${destinationFolder}`)
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({storage})
export default uploader;