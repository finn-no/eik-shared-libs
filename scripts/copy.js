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

import { join } from "path";
import { execSync } from "child_process";

const dirname = new URL("./", import.meta.url).pathname;
const [, , packageNameArg, dependencyNameArg, dependencyFilePathArg] = process.argv;
const packageDir = join(dirname, "../packages", packageNameArg);
const rootDir = join(dirname, "../");

// build the dependency path from the closest node_modules folder
const localDependencyPath = join(packageDir, "node_modules", dependencyNameArg);
// navigate to the root node_modules folder as a backup
const rootDependencyPath = join(rootDir, "node_modules", dependencyNameArg);

// make directory if it doesn't already exist
console.log(`  ==> Making directory ${join(packageDir, "dist")}`);
execSync(`mkdir -p ${join(packageDir, "dist")}`);
// copy the dependency files to the packages dist folder ready for uploading
try {
  // try to copy from package node_modules folder
  console.log(`  ==> Copying file ${dependencyFilePathArg}`);
  console.log(`      From ${localDependencyPath}`);
  console.log(`      To ${join(packageDir, "dist/")}`);
  execSync(
    `cp -R ${join(localDependencyPath, dependencyFilePathArg)} ${join(packageDir, "dist/")}`
  );
} catch (e) {
  // fallback to root node_modules folder
  console.log(`  ==> Copying failed`);
  console.log(`  ==> Retrying copy from root node_modules folder...`);
  console.log(`  ==> Copying file ${dependencyFilePathArg}`);
  console.log(`      From ${rootDependencyPath}`);
  console.log(`      To ${join(packageDir, "dist/")}`);
  try {
    execSync(
      `cp -R ${join(rootDependencyPath, dependencyFilePathArg)} ${join(packageDir, "dist/")}`
    );
    console.log(`  ==> Copying successful`);
  } catch (e) {
    console.log(`  ==> Copying failed, aborting`);
  }
}
