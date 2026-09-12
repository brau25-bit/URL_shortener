import { describe, expect, it, jest } from "@jest/globals";

import {CodeGenerator} from '../../../src/domain/shortCodeGenerator/codeGenerator.ts';

describe("ShortCodeGenerator.domain", () => {
    it("Creates short code with correct length", async () => {
        const generator = new CodeGenerator();

        const code = generator.generate()

        expect(code).toHaveLength(7);
    });

    it("Uses only base62 characters", () => {
        const generator = new CodeGenerator();

        const code = generator.generate();

        expect(code).toMatch(/^[A-Za-z0-9]+$/)
    });

    it("Should not return an empty string", () => {
        const generator = new CodeGenerator();

        const code = generator.generate();

        expect(code).not.toBe("");
    });

    it("should generate mostly unique codes", () => {
        const generator = new CodeGenerator();

        const codes = new Set(
            Array.from({ length: 1000 }, () => generator.generate())
        );

        expect(codes.size).toBeGreaterThan(990);
    });
})