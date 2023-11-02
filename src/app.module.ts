import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import * as cors from 'cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ProductsModule, PrismaModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client', 'build'),
  }), UsersModule, AuthModule, ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}