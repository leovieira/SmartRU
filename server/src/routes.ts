import express from 'express';
import multer from 'multer';

import UserController from './controllers/UserController';
import UploadController from './controllers/UploadController';
import AuthController from './controllers/AuthController';
import TicketController from './controllers/TicketController';
import PaymentController from './controllers/PaymentController';
import UtilController from './controllers/UtilController';

import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

const userController = new UserController();
const uploadController = new UploadController();
const authController = new AuthController();
const ticketController = new TicketController();
const paymentController = new PaymentController();
const utilController = new UtilController();

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.create);

routes.post('/upload', upload.single('file'), uploadController.upload);

routes.post('/auth/login', authController.login);

routes.get('/users/:id/tickets', ticketController.show);
routes.put('/users/:id/tickets', ticketController.update);

routes.get('/payments/:id', paymentController.show);
routes.get('/payments/:id/status', paymentController.status);
routes.post('/payments', paymentController.create);
routes.delete('/payments/:id', paymentController.cancel);

routes.delete('/utils/customers/:id', utilController.deleteCustomer);

export default routes;
