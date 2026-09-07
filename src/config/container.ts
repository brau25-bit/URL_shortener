
import { DrizzlerUrlRepository } from "../infrastructure/db/drizzlerUrlRepository.js";
import { CreateShortUrl } from "../application/createShortUrl.js";
import { UrlController } from "../presentation/http/url/urlController.js";
import { CodeGenerator } from "../domain/shortCodeGenerator/codeGenerator.js";

const repository = new DrizzlerUrlRepository();
const codeGenerator = new CodeGenerator();

export const urlController = new UrlController(
    new CreateShortUrl(repository, codeGenerator),
)