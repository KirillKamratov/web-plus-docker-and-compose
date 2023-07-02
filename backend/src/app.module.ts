import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { Offer } from './offers/entities/offer.entity';
import { ConfigModule } from '@nestjs/config';
import config from './config';
require('dotenv').config()

@Module({
  imports: [
    UsersModule,
    OffersModule,
    WishesModule,
    WishlistsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().db.host,
      username: config().db.username,
      password: config().db.password,
      database: config().db.name,
      entities: [User, Wish, Wishlist, Offer],
      synchronize: true,
    }),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
