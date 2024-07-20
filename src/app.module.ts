// // app.module.ts
// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { SubscriptionsModule } from './subscriptions/subscriptions.module';
// import { NotificationsModule } from './notifications/notifications.module';
// import { AdminModule } from './admin/admin.module';
// import { BlogModule } from './blog/blog.module';
// import { PodcastModule } from './podcast/podcast.module';
// import { PaymentsModule } from './payments/payments.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     MongooseModule.forRoot(process.env.MONGO_URI),
//     AuthModule,
//     UsersModule,
//     SubscriptionsModule,
//     NotificationsModule,
//     AdminModule,
//     BlogModule,
//     PodcastModule,
//     PaymentsModule,
//   ],
// })
// export class AppModule {}

// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { BlogModule } from './blog/blog.module';
import { PodcastModule } from './podcast/podcast.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    SubscriptionsModule,
    NotificationsModule,
    AdminModule,
    BlogModule,
    PodcastModule,
    PaymentsModule,
  ],
})
export class AppModule {}
