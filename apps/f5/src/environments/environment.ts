// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { Enviroment } from './environment.interface';

export const environment: Enviroment = {
  app: 'f5',
  stage: 'prod',

  /** app configuration */ 
  config: {
    /** the header text for the app */
    header: 'Oh fuck! _Oh fuck!_',
    /** the root node text */
    rootText: 'You just spilled a _fuckton_ of hot fucking water on your lap!',
    /** the num responses shown per option */
    numResponses: 3,
    /** the max responses allowed per option */
    maxResponses: -1,
  },
};