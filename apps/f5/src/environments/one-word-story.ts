// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { Enviroment } from './environment.interface';

export const environment: Enviroment = {
  app: 'one-word-story',
  stage: 'prod',
  config: {
    header: 'One Word Story',
    rootText: 'Once',
    numResponses: 1,
    maxResponses: 1,
  }
};