import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../client/src/assets/images/'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})