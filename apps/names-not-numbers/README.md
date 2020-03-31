https://namesnotnumbers.app

This site is designed to illustrate the human cost of ignoring the thread of Covid-19.

Roadmap:
* clean up secrets
* use actual number of deaths
* change styling to 'Times New Roman'
* include birth and death date, location of the dead

Stretch Roadmap:
* add "banner" for health workers
* leave flowers
* track visitors
* "see more" for obituaries

Completed Roadmap:
* include github link for contributors
* add website icon
* force re-approval of edits
* include email link to report deaths, obituaries
* virtualize loading of list
* include real names of the dead
* include photos of the dead

### name intake design
Names are sumbitted via google forms. Entries require a manual approval from me. Then, a google apps script that lives in the google sheets docs commits the data to a  firestore collection. This collection is surfaced in the web UI.

* Relevant resources: [FirestoreGoogleAppsScript] and [Managing Responses].
* Submission Link: https://forms.gle/9N6S9DEfGbhiyuX78

Resources:
* [FirestoreGoogleAppsScript] 
* [Managing Responses]

[FirestoreGoogleAppsScript]: https://github.com/grahamearley/FirestoreGoogleAppsScript
[Managing Responses]: https://developers.google.com/apps-script/quickstart/forms
