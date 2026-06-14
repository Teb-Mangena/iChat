import Redis from "ioredis";
import { ENV } from "../config/env.js";

export const redis = new Redis(ENV.UPSTASH_REDIS_REST_URL);
