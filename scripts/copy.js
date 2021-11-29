#!/usr/bin/env node

// Copy script for packages that don't use a rollup build.
// Purpose of this script is to locate the correct node_modules folder
// and copy the necessary files to a dist folder for uploading.

// EXAMPLE USAGE
// ./scripts/copy.js fabric-css @fabric-ds/css dist/fabric.min.css

// ARGs (all required)
// 1. package name eg. fabric-css
// 2. dependency name eg. @fabric-ds/css
// 3. dependency file or dir path eg. dist/fabric.min.css eg. dist/*

import { join } from 'path';
import findup from 'findup-sync';
import { execSync } from 'child_process';

const dirname = new URL('./', import.meta.url).pathname;
const [, , packageNameArg, dependencyNameArg, dependencyFilePathArg] = process.argv;
const cwd = join(dirname, '../packages', packageNameArg);

// find closest node_modules folder. This might be in the package folder or at the monorepo root.
const nodeModulesPath = findup(`node_modules`, { cwd }); 
// build the dependency path from the closest node_modules folder
const dependencyPath = join(nodeModulesPath, dependencyNameArg);

// make directory if it doesn't already exist
execSync(`mkdir -p ${join(cwd, 'dist')}`);
// copy the dependency files to the packages dist folder ready for uploading
execSync(`cp -R ${join(dependencyPath, dependencyFilePathArg)} ${join(cwd, 'dist/')}`);
