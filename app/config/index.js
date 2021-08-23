const Joi = require('joi')

const schema = Joi.object({
  port: Joi.number().default(3000),
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  cacheName: Joi.string(),
  redisHost: Joi.string(),
  redisPort: Joi.number().default(6379),
  redisPassword: Joi.string().default(''),
  redisPartition: Joi.string().default('ea-incident-form'),
  cookiePassword: Joi.string().required(),
  sessionTimeoutMinutes: Joi.number().default(30),
  staticCacheTimeoutMillis: Joi.number().default(15 * 60 * 1000),
  cookieOptions: Joi.object({
    ttl: Joi.number().default(1000 * 60 * 60 * 24 * 365),
    encoding: Joi.string().valid('base64json').default('base64json'),
    isSameSite: Joi.string().valid('Lax').default('Lax'),
    isSecure: Joi.bool().default(true),
    isHttpOnly: Joi.bool().default(true),
    clearInvalid: Joi.bool().default(false),
    strictHeader: Joi.bool().default(true)
  }),
  emailToAddress: Joi.string().email().required(),
  notifyApiKey: Joi.string().required(),
  notifyTemplateId: Joi.string().required()
})

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  cacheName: 'redisCache',
  redisHost: process.env.REDIS_HOSTNAME,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPartition: process.env.REDIS_PARTITION,
  cookiePassword: process.env.COOKIE_PASSWORD,
  sessionTimeoutMinutes: process.env.SESSION_TIMEOUT_IN_MINUTES,
  staticCacheTimeoutMillis: process.env.STATIC_CACHE_TIMEOUT_IN_MILLIS,
  cookieOptions: {
    ttl: process.env.COOKIE_TTL_IN_MILLIS,
    encoding: 'base64json',
    isSameSite: 'Lax',
    isSecure: process.env.NODE_ENV === 'production',
    isHttpOnly: true,
    clearInvalid: false,
    strictHeader: true
  },
  emailToAddress: process.env.EMAIL_TO_ADDRESS,
  notifyApiKey: process.env.NOTIFY_API_KEY,
  notifyTemplateId: process.env.NOTIFY_TEMPLATE_ID
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the Joi validated value
const value = result.value

// Add some helper props
value.isDev = (value.env === 'development' || value.env === 'test')
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'

// Don't try to connect to Redis for testing or if Redis not available
value.useRedis = !value.isTest && value.redisHost !== undefined

if (!value.useRedis) {
  console.info('Redis disabled, using in memory cache')
}

value.catboxOptions = {
  host: value.redisHost,
  port: value.redisPort,
  password: value.redisPassword,
  tls: value.isProd ? {} : undefined,
  partition: value.redisPartition
}

module.exports = value
