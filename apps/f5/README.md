> April 24 2020

### F5

F5 is s a massive multiplayer online text adventure.

The multiplayer component is that if you reach the end of the "adventure" by following a certain path you have to wait for someone else to add the next part of the story, but currently that's not enforced. Once someone replies, the adventure continues.

### Bugs
* random option selection re-selects on every render

### Roadmap
* cookie to enforce users can't reply to self
* routing for each selection
* perma-link to a node
* go back
* algorithmic selection of available options
* some notification system for when someone has replied to your option that previously had 0 children

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