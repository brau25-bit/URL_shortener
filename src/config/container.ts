
import { DrizzlerUrlRepository } from "../infrastructure/db/drizzlerUrlRepository.js";
import { CreateShortUrl } from "../application/createShortUrl.js";
import { UrlController } from "../presentation/http/url/urlController.js";
import { CodeGenerator } from "../domain/shortCodeGenerator/codeGenerator.js";
import { RedirectUrl } from "../application/redirectUrl.js";
import { PinoLogger } from "../infrastructure/logger/logger.js";
import { RedisCache } from "../infrastructure/redis/redisRepository.js";
import { RedisClient } from "../infrastructure/redis/redisClient.js";

const repository = new DrizzlerUrlRepository();
const codeGenerator = new CodeGenerator();
const logger = new PinoLogger();

const redisProvider = new RedisClient(logger);
const redis = await redisProvider.connect();
const redisCache = new RedisCache(logger, redis)

export const controller = new UrlController(
    new CreateShortUrl(repository, codeGenerator, logger),
    new RedirectUrl(repository, redisCache, logger)
)