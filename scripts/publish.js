#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join } from 'path';
import eik from '@eik/cli';

// usage: EIK_TOKEN=<eik token> ./publish.js <name of package folder> <name of dependency>
// example: EIK_TOKEN=<eik token> ./publish.js react @esm-bundle/react

const { EIK_TOKEN } = process.env;
const dirname = new URL('./', import.meta.url).pathname;
const [, , packageNameArg, dependencyNameArg] = process.argv;
const cwd = join(dirname, '../packages', packageNameArg);

// read package.json file
const packageJSONPath = join(cwd, './package.json');
const packageJSON = JSON.parse(readFileSync(packageJSONPath, 'utf8'));

// grab Eik variables from package.json
const { eik: { server, files, type }, name } = packageJSON;

// grab version directly from the dependency
const version = packageJSON.dependencies[dependencyNameArg];

const token = await eik.login({
    server,
    key: EIK_TOKEN,
    logger: console,
});

try {
    await eik.publish({
        cwd,
        token,
        server,
        name,
        type,
        version,
        files,
        logger: console,
    });
} catch (err) {
    if (err.message === `Package with name "${name}" and version "${version}" already exists on server`) {
        console.log(`  ==> ${err.message}`);
        process.exit(0);
    }
    throw err;
}