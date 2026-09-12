import { ShortCodeGenerator } from "./ShortCodeGenerator.js";
import {customAlphabet} from 'nanoid';


const nanoId = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7
);

export class CodeGenerator implements ShortCodeGenerator {
    generate(): string {
        return nanoId();
    }
}

