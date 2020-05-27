#!/usr/bin/env ts-node-script
import { preBundle } from './pre-bundle';
import { deploy } from './deploy';
import { postBundle } from './post-bundle';
import { bundle } from './bundle';
import { preDeploy } from './pre-deploy';

const main = async () => {
  await preBundle();
  await bundle();
  await postBundle();
  await deploy();
  await preDeploy();
};

main();