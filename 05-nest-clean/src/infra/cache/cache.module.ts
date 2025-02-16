import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'
import { RedisService } from '../redis/redis.service'
import { CacheRepository } from './cacheRepository'
import { RedisCacheRepository } from '../redis/redisCacheRepository'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
