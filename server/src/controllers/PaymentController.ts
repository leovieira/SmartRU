import { Request, Response } from 'express';
import mercadopago from 'mercadopago';
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model';

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_TOKEN as string,
});

class PaymentController {
  async show(request: Request, response: Response) {
    try {
      const paymentId = parseInt(request.params.id);

      const paymentResponse = await (
        await mercadopago.payment.get(paymentId)
      ).response;

      return response.status(200).json({
        id: paymentResponse.id,
        createdAt: paymentResponse.date_created,
        updatedAt: paymentResponse.date_last_updated,
        expiresAt: paymentResponse.date_of_expiration,
        approvedAt: paymentResponse.date_approved,
        operationType: paymentResponse.operation_type,
        method: paymentResponse.payment_method_id,
        status: paymentResponse.status,
        statusDetail: paymentResponse.status_detail,
        currency: paymentResponse.currency_id,
        amount: paymentResponse.transaction_amount,
        amountRefunded: paymentResponse.transaction_amount_refunded,
        installments: paymentResponse.installments,
        description: paymentResponse.description,
        payerId: paymentResponse.payer.id,
        binaryMode: paymentResponse.binary_mode,
        notificationUrl: paymentResponse.notification_url,
        qrCode: paymentResponse.point_of_interaction.transaction_data.qr_code,
        qrCodeBase64:
          paymentResponse.point_of_interaction.transaction_data.qr_code_base64,
        ticketUrl:
          paymentResponse.point_of_interaction.transaction_data.ticket_url,
        transactionId:
          paymentResponse.point_of_interaction.transaction_data.transaction_id,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }

  async status(request: Request, response: Response) {
    try {
      const paymentId = parseInt(request.params.id);

      const paymentResponse = await (
        await mercadopago.payment.get(paymentId)
      ).response;

      return response.status(200).json({
        id: paymentResponse.id,
        status: paymentResponse.status,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const body = request.body;
      const now = new Date();
      const expiration = new Date(now.getTime() + 30 * 60 * 1000);

      const paymentData: CreatePaymentPayload = {
        transaction_amount: body.transaction.amount,
        installments: 1,
        date_of_expiration: expiration.toISOString(),
        description: 'Tickets SmartRU',
        statement_descriptor: 'SmartRU',
        payment_method_id: 'pix',
        payer: {
          id: body.customer.id,
          email: body.customer.email,
          type: 'customer',
        },
      };

      const paymentResponse = await (
        await mercadopago.payment.create(paymentData)
      ).response;

      return response.status(201).json({
        id: paymentResponse.id,
        createdAt: paymentResponse.date_created,
        updatedAt: paymentResponse.date_last_updated,
        expiresAt: paymentResponse.date_of_expiration,
        approvedAt: paymentResponse.date_approved,
        operationType: paymentResponse.operation_type,
        method: paymentResponse.payment_method_id,
        status: paymentResponse.status,
        statusDetail: paymentResponse.status_detail,
        currency: paymentResponse.currency_id,
        amount: paymentResponse.transaction_amount,
        amountRefunded: paymentResponse.transaction_amount_refunded,
        installments: paymentResponse.installments,
        description: paymentResponse.description,
        payerId: paymentResponse.payer.id,
        binaryMode: paymentResponse.binary_mode,
        notificationUrl: paymentResponse.notification_url,
        qrCode: paymentResponse.point_of_interaction.transaction_data.qr_code,
        qrCodeBase64:
          paymentResponse.point_of_interaction.transaction_data.qr_code_base64,
        ticketUrl:
          paymentResponse.point_of_interaction.transaction_data.ticket_url,
        transactionId:
          paymentResponse.point_of_interaction.transaction_data.transaction_id,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }

  async cancel(request: Request, response: Response) {
    try {
      const paymentId = parseInt(request.params.id);

      const paymentResponse = await (
        await mercadopago.payment.cancel(paymentId)
      ).response;

      return response.status(200).json({
        id: paymentResponse.id,
        status: paymentResponse.status,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }
}

export default PaymentController;
