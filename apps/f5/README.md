> April 24 2020

### F5

F5 is a massive multiplayer online text adventure.

The multiplayer component is that if you reach the end of the "adventure" by following a certain path you have to wait for someone else to add the next part of the story, but currently that's not enforced. Once someone replies, the adventure continues.

### Play it
https://parm.app/

### Development
```sh
# fetch code and start dev server
git clone https://github.com/prmichaelsen/parm.git
npm i && npm i -g @nrwl/cli
# fill this with the requisite secrets
touch ./env/parm-app.json
nx serve f5
```
You'll need some secrets, reach out to me if you want to run this locally and I can work with you.

### Roadmap
* track num times chosen 🟡6️⃣
* tap to show menu 🟢9️⃣
* algorithmic selection of available options 🟢6️⃣
* favorites 🟢6️⃣
* share options 🟢3️⃣
* some notification system for when someone has replied to your option that previously had 0 children 0️⃣
* report 0️⃣
* edit 0️⃣

### Completed Roadmap
The newest features are at the top of this list.
* perma-link to a node 🟡6️⃣
* go back 🟡3️⃣
* routing for each selection 🔴9️⃣
* markdown support
* cookie to enforce users can't reply to self
* random option selection re-selects on every render

### Key
This key is allows me to label roadmap items. Not everything will be assigned labels.

If I provide two keys for one category, it means its somewhere inbetween.

* 🟢🟡🔴 -  urgency, 🔴 being the most urgent
* 0️⃣3️⃣6️⃣9️⃣ -  most important, 9️⃣ being the most imporant, 0️⃣ being optional
* ✨🐞 - feature, bug

### FAQ

#### What if someone tries to make every option "you died"? That's no fun.
No that's fine. It's a build your-own-adventure. I'm not going to make up any rules about how you should play _your_ adventure. Anything can happen in the adventure. So your character died. What happens next?

### Design
#### Option Selection Design
The plan is to eventually intelligently select which options to display based on some criteria
such as
* longest path
* newest
* most travelled

> Open Question: which selection criteria not mentioned here would help enrich the gaming experience?

### Feedback
If you have feedback, create an issue or use the [google forms feedback link](https://docs.google.com/forms/d/e/1FAIpQLScNyQH8qODIN7895f7duAT3_NsQ54NfRiFzMr5yquhh5Aa_6A/viewform?entry.800675036=fuck+fuck+fuck+fuck+fuck).