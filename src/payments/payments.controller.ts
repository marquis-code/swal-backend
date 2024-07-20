// payments.controller.ts
import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get('verify')
  async verify(@Query('paymentReference') paymentReference: string) {
    return this.paymentsService.verifyPayment(paymentReference);
  }
}
