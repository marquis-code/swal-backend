/* eslint-disable prettier/prettier */
// create-subscription.dto.ts
export class CreateSubscriptionDto {
    readonly userId: string;
    readonly amount: number;
    readonly currency: string;
    readonly paymentPlan: string; // 'basic' or 'premium'
    readonly startDate?: Date;
    readonly endDate?: Date;
  }
  