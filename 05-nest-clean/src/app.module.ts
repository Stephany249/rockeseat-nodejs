import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthModule } from './auth/auth.module'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/createAccount.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AuthenticateController, CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
