module.exports = {
  apps: [
    {
      name: 'names-not-numbers',
      cwd: '/home/prmichaelsen/workplace/ts-npm-template',
      script: 'ng',
      args: 'run names-not-numbers:serve:production --allowed-hosts namesnotnumbers.app,www.namesnotnumbers.app',
      autorestart: true,
      max_memory_restart: '1G',
      out_file: '/dev/null',
      error_file: '/dev/null'
    }
  ]
};
