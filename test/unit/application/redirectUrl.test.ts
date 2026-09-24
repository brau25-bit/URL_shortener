import {describe, expect, it, jest, beforeEach} from '@jest/globals';

import {RedirectUrl} from '../../../src/application/redirectUrl.ts';
import { UrlRepository } from '../../../src/domain/urlRepository/urlRepository.ts';
import { UrlCache } from '../../../src/domain/cache/cache.ts';
import { Logger } from '../../../src/domain/logger/logger.ts';
import { ResponseUrl } from '../../../src/domain/response/URL.ts';
import { Redis } from '../../../src/domain/response/redis.ts';
import { cacheRes, repoRes, urlResponse, cache, badUrl } from './mocks/response.mock.ts';
import { BadRequest } from '../../../src/presentation/http/url/errors/badRequestError.ts';

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

const cacheMock: UrlCache = {
    set,
    get
}

// Mock de logger
const info = jest.fn<(message: string, meta?: object) => void>();
const warn = jest.fn<(message: string, meta?: object) => void>();
const error = jest.fn<(message: string, meta?: object) => void>();

const logger: Logger = {
    info,
    warn,
    error
}

describe("Redirect.UseCase", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Returns successfully from repository", async () => {
        findByShortCode.mockResolvedValue(urlResponse);
        get.mockResolvedValue(null);

        const redirect = new RedirectUrl(repository, cacheMock, logger);

        const result = await redirect.execute(urlResponse.shortCode);

        expect(
            findByShortCode
        ).toHaveBeenCalledWith(urlResponse.shortCode);

        expect(
            get
        ).toReturn();

        expect(
            get
        ).toHaveBeenCalledWith(urlResponse.shortCode);

        expect(
            set
        ).toHaveBeenCalledWith(urlResponse.shortCode, urlResponse.originalUrl);

        expect(
            result
        ).toEqual(repoRes);
    });

    it("Returns successfully from cache", async () => {
        get.mockResolvedValue(cache);

        const redirect = new RedirectUrl(repository, cacheMock, logger);

        const result = await redirect.execute(urlResponse.shortCode);

        expect(
            findByShortCode
        ).not.toHaveBeenCalled();

        expect(
            set
        ).not.toHaveBeenCalled();

        expect(
            get
        ).toHaveBeenCalled();

        expect(
            result
        ).toEqual(cacheRes);

        expect(
            get
        ).toHaveBeenCalledWith(urlResponse.shortCode);
    });

    it("Enforces domain rules for shortCode", async () => {
        const redirect = new RedirectUrl(repository, cacheMock, logger);
        
        await expect(
            redirect.execute("")
        ).rejects.toThrow(BadRequest);
    });
});