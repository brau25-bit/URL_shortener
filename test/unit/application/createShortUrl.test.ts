import { jest, describe, it, expect } from '@jest/globals';

import {CreateShortUrl} from '../../../src/application/createShortUrl.ts';
import type { UrlRepository } from '../../../src/domain/urlRepository/urlRepository.ts';
import { ShortCodeGenerator } from '../../../src/domain/shortCodeGenerator/ShortCodeGenerator.ts';
import type { ResponseUrl } from '../../../src/domain/response/URL.ts';
import {RepositoryError} from '../../../src/presentation/http/url/errors/repositoryError.ts'

const generate = jest.fn<() =>  string>();

const shortCodeGenerator: ShortCodeGenerator = {
    generate
}

const create = jest.fn<(originalUrl: string, shortCode: string) => Promise<ResponseUrl>>();

const findByShortCode = jest.fn<(shortCode: string) => Promise<ResponseUrl | null>>();

const deleteUrl = jest.fn<(shortCode: string) => Promise<void>>();

const repository: UrlRepository = {
    create,
    findByShortCode,
    deleteUrl
}

const mockResponse = {
    id: "1",
    originalUrl: "https://google.com",
    shortCode: "abc1234",
    createdAt: new Date()
}

const response = {
    status: 200,
    success: 'ok',
    response: mockResponse
}

describe("CreateShortCode.application", () => {
    it("Returns after successful creation", async () => {
        generate.mockReturnValue(mockResponse.shortCode);
        create.mockResolvedValue(mockResponse);

        const createShortUrl = new CreateShortUrl(repository, shortCodeGenerator);
        
        const result = await createShortUrl.execute(mockResponse.originalUrl);

        expect(result).toEqual({
            status: 200,
            success: 'ok',
            response: mockResponse}
        );

        expect(create).toHaveBeenCalledWith(
            mockResponse.originalUrl,
            mockResponse.shortCode
        );

        expect(create).toHaveBeenCalledTimes(1);

        expect(generate).toHaveReturnedWith(mockResponse.shortCode)
    });

    it("Throws error on domain rules", async () => {
        generate.mockReturnValue("");
        
        const createShortUrl = new CreateShortUrl(repository, shortCodeGenerator);

        expect(
            createShortUrl.execute(mockResponse.originalUrl)
        ).rejects.toThrowError();
    });

    it("Repository error", () => {
        create.mockRejectedValue(
            new RepositoryError()
        )
        generate.mockReturnValue(mockResponse.shortCode)

        const createShortUrl = new CreateShortUrl(repository, shortCodeGenerator);

        expect(
            createShortUrl.execute(mockResponse.originalUrl)
        ).rejects.toThrow(RepositoryError);
    })
})