// notifications.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'your_user',
          pass: 'your_pass',
        },
      },
    }),
  ],
  providers: [NotificationsService],
})
export class NotificationsModule {}