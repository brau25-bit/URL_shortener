import { ShortCodeGenerator } from "./ShortCodeGenerator.js";
import {customAlphabet, nanoid} from 'nanoid';

export class CodeGenerator implements ShortCodeGenerator {
    generate(): string {
        return nanoid();
    }
}

const nanoId = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7
);