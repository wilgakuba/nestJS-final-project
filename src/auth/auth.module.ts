import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  imports: [ ConfigModule, UsersModule, PassportModule, PrismaModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('jwt.secret'),
      signOptions: {
        expiresIn: configService.get('jwt.expiresIn'),
      },
    }),
    inject: [ConfigService],
  }),
  ],
})
export class AuthModule {}