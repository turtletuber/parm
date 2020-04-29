## Deployment
To deploy an f5 app, such as `one-word-story`:
```sh
# build app
nx build f5 -c one-word-story

# update index.html, favicon.ico, and firebase.json
# *requires npm i -g typescript ts-node
./tools/fetch-f5-apps.ts

# create some-firebase-host in the firebase webconsole
firebase target:apply hosting one-word-story some-firebase-host

# deploy all firebase hosting apps
firebase deploy --only hosting
```