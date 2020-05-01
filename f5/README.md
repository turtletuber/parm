## Deployment
To deploy an f5 app, such as `one-word-story`:
```sh
# pull env from live config
# *requires npm i -g typescript ts-node
./tools/f5-env.ts

# build app
nx bundle f5 -c one-word-story

# update index.html, favicon.ico, and firebase.json
# *requires npm i -g typescript ts-node
./tools/f5-update-dist.ts

# create some-firebase-host in the firebase webconsole
# * you only need to do this the first time
firebase target:apply hosting one-word-story some-firebase-host

# deploy all firebase hosting apps
firebase deploy --only hosting
```