## Deployment
To deploy all f5 apps:
```sh
# *requires npm i -g typescript ts-node
./tools/scrips/f5/0-deploy.ts
```

This script:
* pulls the live config for each app from firestore
* bundles the apps
* updates the dist with some assets
* deploys to firebase hosting 