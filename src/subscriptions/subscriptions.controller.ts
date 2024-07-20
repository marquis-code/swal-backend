// subscriptions.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from '../payments/payments.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const userId = req.user.userId;
    createSubscriptionDto.userId = userId;
    const payment = await this.paymentsService.createPayment({
      userId,
      amount: createSubscriptionDto.amount,
      currency: createSubscriptionDto.currency,
      paymentPlan: createSubscriptionDto.paymentPlan,
    });
    return payment;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const userId = req.user.userId;
    return this.subscriptionsService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.subscriptionsService.findOne(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateSubscriptionDto: CreateSubscriptionDto,
  ) {
    const userId = req.user.userId;
    return this.subscriptionsService.update(userId, id, updateSubscriptionDto);
  }
}
