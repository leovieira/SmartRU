import { Request, Response } from 'express';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_TOKEN as string,
});

class UtilController {
  async deleteCustomer(request: Request, response: Response) {
    try {
      const customerId = request.params.id;

      const rs = await (
        await mercadopago.customers.remove(customerId)
      ).response;

      return response.json(rs);
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}

export default UtilController;
