// notifications.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailerService: MailerService) {}

  @Cron('0 0 * * *') // Run daily at midnight
  async handleCron() {
    // logic to fetch users whose subscription is about to end
    // and send them notifications
    const users = await this.fetchUsersWithEndingSubscriptions();
    users.forEach(user => {
      this.mailerService.sendMail({
        to: user.email,
        subject: 'Your subscription is ending soon',
        template: './subscription-ending',
        context: {
          name: user.name,
          endDate: user.subscriptionEndDate,
        },
      });
    });
  }

  async fetchUsersWithEndingSubscriptions() {
    // implement logic to fetch users from the database
    return [];
  }
}