### MongoDb

#### For local osx development
Start mongo db for the server.
```sh
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

See [MongoDb] for more info.

#### For production server
Follow [MongoDb on Ubuntu].

### Server setup [1hr]

### Nginx setup [15m]
I created a digital ocean Ubuntu 18 droplet.

Then, follow [Digital Ocean Initial Server Setup with Ubuntu 18.04 Guide].

We create the user `prmichaelsen` for running our services.

Next, we [Install Nginx]. 

Quick reference:
* Restarting nginx: `sudo systemctl restart nginx`

#### Setting DNS records [15m]
Register your domain name on Google Domains.

Then, follow this guide on [Google Domain & Digital Ocean].

Once Google Domain is set up, [Configure the DNS Records]. Create an A record for each `@` and `www`.

### Set up SSL/HTTPS [15m]
After that, we need to setup [SSL].

Once certs are setup, you can renew them with `sudo certbot renew`. It might make sense to setup a cron job to do this once a quarter.

Quick reference:
```
# expand cert
sudo certbot --expand -d your.app,www.domains.app,to.app,*.add.app
```

#### Set up for node
Now we follow the [Setup NodeJs Production Application] guide. Note: install node 12, not node 8.

#### Start server
To start the server on the remote, run:
```sh
pm2 start ./pm2/greenroom.config.js
pm2 save
```

[Configure the DNS Records]: https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/
[Google Domain & Digital Ocean]: https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars
[SSL]: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04
[Install Nginx]: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
[Digital Ocean Initial Server Setup with Ubuntu 18.04 Guide]: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
[Setup NodeJs Production Application]: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04
[MongoDb]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
[MongoDb on Ubuntu]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04