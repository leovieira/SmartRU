import { Request, Response } from 'express';

const baseUrl = process.env.BASE_URL;
const uploadsUrl = `${baseUrl}/static/uploads`;

class UploadController {
  async upload(request: Request, response: Response) {
    try {
      var filename = '';

      if (request.file !== undefined && request.file.filename !== '') {
        filename = request.file.filename;
      }

      if (filename) {
        return response
          .status(200)
          .json({ filename, url: `${uploadsUrl}/${filename}` });
      } else {
        return response
          .status(400)
          .json({ message: 'Could not load the file.' });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }
}

export default UploadController;
