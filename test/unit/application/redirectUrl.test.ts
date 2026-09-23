import {describe, it, jest} from '@jest/globals';

import {RedirectUrl} from '../../../src/application/redirectUrl.ts';
import { UrlRepository } from '../../../src/domain/urlRepository/urlRepository.ts';
import { UrlCache } from '../../../src/domain/cache/cache.ts';
import { Logger } from '../../../src/domain/logger/logger.ts';
import { ResponseUrl } from '../../../src/domain/response/URL.ts';
import { Redis } from '../../../src/domain/response/redis.ts';

// Mock repository
const create = jest.fn<(originalUrl: string, shortCode: string) => Promise<ResponseUrl>>();
const findByShortCode = jest.fn<(shortCode: string) => Promise<ResponseUrl | null>>();
const deleteUrl = jest.fn<(shortCode: string) => Promise<void>>();

const repository: UrlRepository = {
    create,
    findByShortCode,
    deleteUrl
};

// Mock cache
const set = jest.fn<(shortCode: string, originalUrl: string) => Promise<void>>();
const get = jest.fn<(shortCode: string) => Promise<Redis | null>>();

const cache: UrlCache = {
    set,
    get
}