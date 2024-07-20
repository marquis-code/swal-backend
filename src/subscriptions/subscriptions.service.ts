// subscriptions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from './schemas/subscription.schema';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const createdSubscription = new this.subscriptionModel(
      createSubscriptionDto,
    );
    return createdSubscription.save();
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    return this.subscriptionModel.find({ userId }).exec();
  }

  async findOne(userId: string, id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel
      .findOne({ userId, _id: id })
      .exec();
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    return subscription;
  }

  async update(
    userId: string,
    id: string,
    updateSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const updatedSubscription = await this.subscriptionModel
      .findOneAndUpdate({ userId, _id: id }, updateSubscriptionDto, {
        new: true,
      })
      .exec();
    if (!updatedSubscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    return updatedSubscription;
  }
}
