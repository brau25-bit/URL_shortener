import {describe, expect, it, jest} from '@jest/globals';
import type { Request, Response as ExpressResponse, NextFunction } from 'express';

import {CreateShortUrlCase} from '../../../src/domain/useCase/url.useCase.ts';
import { Response } from '../../../src/domain/response/response.ts';
import {UrlController} from '../../../src/presentation/http/url/urlController.ts';

const execute = jest.fn<() => Promise<Response>>();

const urlUseCase: CreateShortUrlCase = {
    execute
}

const controller = new UrlController(urlUseCase);

const mockResponse = {
    id: "1",
    originalUrl: "https://google.com",
    shortCode: "abc1234",
    createdAt: new Date()
}

const response: Response = {
    status: 200,
    success: 'ok',
    response: mockResponse
}

const req = {
    body: {
        originalUrl: "https://google.com"
    }
} as Request;

const json = jest.fn();

const status = jest.fn().mockReturnValue({
    json
});

const res = {
    status
} as unknown as ExpressResponse;

const next = jest.fn();

describe("Url controller", () => {
    it("Returns successfully", async () => {
        execute.mockResolvedValue(response);

        await controller.createShortCode(req, res, next);

        expect(status).toHaveBeenCalledWith(200);

        expect(json).toBeCalledWith({
            success: 'ok',
            response: mockResponse
        });
    })
})