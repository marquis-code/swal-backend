// create-payment.dto.ts
export class CreatePaymentDto {
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
  readonly paymentPlan: string; // 'basic' or 'premium'
}
