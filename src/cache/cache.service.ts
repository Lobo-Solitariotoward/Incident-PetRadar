import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from 'src/config/envs';

@Injectable()
export class CacheService {
    private redis: Redis | null = null;

    constructor() {
        if (envs.REDIS_HOST) {
            this.redis = new Redis({
                host: envs.REDIS_HOST,
                port: envs.REDIS_PORT,
            });
        }
    }

    async set(key: string, value: any) {
        if (!this.redis) return;
        const json = JSON.stringify(value);
        await this.redis.set(key, json);
    }

    async get<T>(key: string): Promise<T | null> {
        if (!this.redis) return null;
        const data = await this.redis.get(key);
        if (!data) return null;
        return JSON.parse(data) as T;
    }

    async del(key: string) {
        if (!this.redis) return;
        await this.redis.del(key);
    }
}
