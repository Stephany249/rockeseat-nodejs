import { Module } from '@nestjs/common'
import { CacheRepository } from './cacheRepository'
import { EnvModule } from '../env/env.module'
import { RedisService } from '../redis/redis.service'
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
