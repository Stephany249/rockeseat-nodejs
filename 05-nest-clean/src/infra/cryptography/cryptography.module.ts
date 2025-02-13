import { Module } from '@nestjs/common'

import { BcryptHasher } from './bcryptHasher'
import { JwtEncrypter } from './jwtEncrypter'
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hashComparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hashGenerator'

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
  ],
  exports: [HashGenerator, HashComparer, Encrypter],
})
export class CryptographyModule {}
