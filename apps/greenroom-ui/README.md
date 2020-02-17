### What is this?
It's a CRUD app for capturing open mic registrations.

### Press Release
Parm has released Greenroom, the web app for comics who are sick of waiting for open mics. 

Greenroom is a service that allows comics to register for open mics online. After signing up online, they are given a one hour time window in which they will have a guaranteed 5 minutes. The order for each comic in the one hour window is randomly announced at the venue during the mic. The plus is that once your mic is up, you don't have to stick around!

Local comic Antonio Smith says, "one of the worst part about mics in Phoenix is trying to rush there after work, only to sign up last", Smith continues, "after waiting for two hours to do your slot, the audience is dwindling and is mostly other comics".

Another comic points out, "sometimes you've been waiting an hour to do your set and a better known mic shows up and jumps your spot in line." 

Greenroom attempts to make open mic experience hassle-free, fair and accessible to everyone.

"My favorite part is since the order is random, you're still guaranteed at least 8 other mics who are there waiting for their set while you're on," says Smith, "you don't always get that with these other mics."

### Roadmap
#### Critical
* email confirmation client
* front end validation of event registration
* CSRF protection
* lockdown mongo
* ssh only access for root user

#### Required
* presentable error state
* facebook pixel tracker
* google analytics tracker
* local cookie tracker
* registration ip tracker
* location tracker

#### Nice
* schema validation
* auth/user registration
* remote mongo access
* jenkins build process
* deploy production build
* logging to elastic search
* metrics to elastic search

### User stories
* reserve specific position time in slot
* host mics to get premium benefits

### Tenets
* only build what we need