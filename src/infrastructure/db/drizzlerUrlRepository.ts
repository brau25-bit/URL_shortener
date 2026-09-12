import { ResponseUrl } from "../../domain/response/URL.js";
import { UrlRepository } from "../../domain/urlRepository/urlRepository.js";
import { db } from "../../index.js";
import { urlTable } from "./schema.js";
import { NotFoundError } from "../../presentation/http/url/errors/notFoundError.js";
import { RepositoryError } from "../../presentation/http/url/errors/repositoryError.js";
import { eq } from "drizzle-orm";

export class DrizzlerUrlRepository implements UrlRepository{
    async create(originalUrl: string, shortCode: string): Promise<ResponseUrl> {
        try {
                const [result] = await db.insert(urlTable).values({
                originalUrl: originalUrl,  
                shortCode: shortCode
            }).returning();

            if(!result) throw new NotFoundError();

            return result;
        } catch (error) {
            throw new RepositoryError()
        }
    }

    async findByShortCode(shortCode: string): Promise<ResponseUrl | null> {
        try {
            const [result] = await db
            .select()
            .from(urlTable)
            .where(eq(urlTable.shortCode, shortCode));

            return result ?? null;
        } catch (error) {
            throw new RepositoryError();
        }
    }

    async deleteUrl(shortCode: string): Promise<void> {
        
    }
}