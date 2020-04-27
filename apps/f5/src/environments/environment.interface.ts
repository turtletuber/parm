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
}