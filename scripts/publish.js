#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join } from 'path';
import eik from '@eik/cli';
import semver from 'semver';

// usage: EIK_TOKEN=<eik token> ./publish.js <name of package folder> <name of dependency> <stripPrerelease>
// example: EIK_TOKEN=<eik token> ./publish.js react @esm-bundle/react
// example: EIK_TOKEN=<eik token> ./publish.js react @esm-bundle/react stripPrerelease

const { EIK_TOKEN } = process.env;
const dirname = new URL('./', import.meta.url).pathname;
const [, , packageNameArg, dependencyNameArg, stripPrerelease] = process.argv;
const cwd = join(dirname, '../packages', packageNameArg);

// read package.json file
const packageJSONPath = join(cwd, './package.json');
const packageJSON = JSON.parse(readFileSync(packageJSONPath, 'utf8'));

// grab Eik variables from package.json
const { eik: { name, server, files, type } } = packageJSON;

// grab version directly from the dependency
let version = packageJSON.dependencies[dependencyNameArg];

if (stripPrerelease) {
    version = `${semver.major(version)}.${semver.minor(version)}.${semver.patch(version)}`;
}

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