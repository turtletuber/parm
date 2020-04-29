/** 
 * the beta stage.
 * 
 * for use in local dev envs
 */
type dev = 'dev'; 
/**
 * the gamma stage.
 * 
 * for use in staging/integration enviroments.
 * Uses same data as prod.
 */
type qa = 'qa'; 
/**
 * the prod stage.
 * 
 * live production env.
 */
type prod = 'prod'; 

export interface Enviroment {
  /** which app to deploy */
  app: string,
  /** which stage */
  stage: dev | qa | prod,

  /** app configuration */ 
  config: {
    /** the header text for the app */
    header: string,
    /** the root node text */
    rootText: string,
    /** the num responses shown per option */
    numResponses: number,
    /** the max responses allowed per option */
    maxResponses: number,
  },
}

interface OtherOptions {
  /** the 'what now?' text */
  promptText: string,
  /** default 'Diviniate' **/
  newPromptLabel: string,
  newPromptPlaceholder: string,
  /** default 'Improvise' **/
  newActionLabel: string,
  newActionPlaceholder: string,
  validatePrompt: (text: string) => boolean,
  validateAction: (text: string) => boolean,
}