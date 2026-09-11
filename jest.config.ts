import type { Config } from "jest";

const config: Config = {
    testEnvironment: "node",

    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "./tsconfig.test.json",
                useESM: true
            }
        ]
    },

    extensionsToTreatAsEsm: [".ts"],

    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    }
};

export default config;