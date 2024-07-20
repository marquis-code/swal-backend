// payments.service.ts
import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentsService {
  private readonly flutterwaveUrl: string;
  private readonly flutterwaveSecretKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private readonly usersService: UsersService,
  ) {
    this.flutterwaveUrl = 'https://api.flutterwave.com/v3';
    this.flutterwaveSecretKey = this.configService.get<string>(
      'FLUTTERWAVE_SECRET_KEY',
    );
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    const user = await this.usersService.findById(createPaymentDto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const payload = {
      tx_ref: `tx_${Date.now()}`,
      amount: createPaymentDto.amount,
      currency: createPaymentDto.currency,
      redirect_url: 'http://localhost:3000/payments/verify', // Adjust this URL to your frontend
      customer: {
        email: user.email,
        phonenumber: user.phoneNumber,
        name: user.name,
      },
      payment_type: 'card',
      payment_plan: createPaymentDto.paymentPlan,
    };

    const response = await this.httpService
      .post(`${this.flutterwaveUrl}/payments`, payload, {
        headers: {
          Authorization: `Bearer ${this.flutterwaveSecretKey}`,
        },
      })
      .toPromise();

    if (response.data.status !== 'success') {
      throw new HttpException(
        'Payment initiation failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPayment = new this.paymentModel({
      userId: createPaymentDto.userId,
      amount: createPaymentDto.amount,
      currency: createPaymentDto.currency,
      paymentPlan: createPaymentDto.paymentPlan,
      paymentReference: response.data.data.flw_ref,
      status: 'pending',
    });

    await newPayment.save();

    return response.data;
  }

  async verifyPayment(paymentReference: string): Promise<any> {
    const response = await this.httpService
      .get(`${this.flutterwaveUrl}/transactions/${paymentReference}/verify`, {
        headers: {
          Authorization: `Bearer ${this.flutterwaveSecretKey}`,
        },
      })
      .toPromise();

    if (response.data.status !== 'success') {
      throw new HttpException(
        'Payment verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payment = await this.paymentModel.findOne({ paymentReference });
    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    payment.status = 'completed';
    await payment.save();

    return response.data;
  }
}
