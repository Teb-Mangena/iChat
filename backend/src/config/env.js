import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 5050,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL
};

const requiredKeys = [
  "MONGO_URI",
  "UPSTASH_REDIS_REST_URL"
];

for (const key of requiredKeys) {
  if (!ENV[key]) {
    throw new Error(`Missing key required: ${key}`);
  }
}
