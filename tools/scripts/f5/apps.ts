import { App } from './interface';
import { environment } from './util';
import { firebase } from './firebase';


const apps = async () => {
  const env = environment();
  const collection = `${env}.parm.f5.apps`;

  const e = await firebase()
    .firestore()
    .collection(collection)
    .get();

  return e.docs.map(d => d.data() as App);
}

export const fetch = {
  apps,
};