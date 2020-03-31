https://namesnotnumbers.app

This site is designed to illustrate the human cost of ignoring the thread of Covid-19.

### Sharing
If you would like to share this website, please use the communication here: [introduction](./communication/introduction.md).

### Contributing
If you would like to contribute, please create an issue describing your planned changes before creating a PR. This is to avoid potential sticker-shock for the amount of effort you may spend contributing towards a feature that I ultimately don't plan on including. I have no specific guidelines for contribution.

### Roadmap
Critical:
* clean up secrets
* change styling to 'Times New Roman'
* include birth and death date, location of the dead

Non-critical:
* add "banner" for health workers
* leave flowers
* track visitors
* "see more" for obituaries

Completed Roadmap:
* use actual number of deaths
* include github link for contributors
* add website icon
* force re-approval of edits
* include email link to report deaths, obituaries
* virtualize loading of list
* include real names of the dead
* include photos of the dead

### Design
#### Name intake
Names are sumbitted via google forms. Entries require a manual approval from me. Then, a google apps script that lives in the google sheets docs commits the data to a  firestore collection. This collection is surfaced in the web UI.

* Relevant resources: [FirestoreGoogleAppsScript] and [Managing Responses].
* Submission Link: https://forms.gle/9N6S9DEfGbhiyuX78

### Resources:
Resources that are relevant or were referenced when developing this project.

* [FirestoreGoogleAppsScript] 
* [Managing Responses]

[FirestoreGoogleAppsScript]: https://github.com/grahamearley/FirestoreGoogleAppsScript
[Managing Responses]: https://developers.google.com/apps-script/quickstart/forms
