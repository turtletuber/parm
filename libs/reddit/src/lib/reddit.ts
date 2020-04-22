import * as snoowrap from 'snoowrap';
import { reddit as redditSecrets } from '@parm/util';

export function reddit() {
  return new snoowrap(redditSecrets);
} 