import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      const uploadsPath = path.resolve(__dirname, '..', 'public', 'uploads');

      callback(null, uploadsPath);
    },
    filename: (request, file, callback) => {
      const uuid = crypto.randomUUID();
      const extension = path.extname(file.originalname);
      const filename = uuid + extension;

      callback(null, filename);
    },
  }),
};
