module.exports = {
  apps: [
    {
      name: 'greenroom-rest-api',
      cwd: '/home/prmichaelsen/workplace/ts-npm-template',
      script: 'ng',
      args: 'serve greenroom-rest-api',
      autorestart: true,
      max_memory_restart: '1G',
      out_file: '/dev/null',
      error_file: '/dev/null'
    },
    {
      name: 'greenroom-ui',
      cwd: '/home/prmichaelsen/workplace/ts-npm-template',
      script: 'ng',
      args: 'serve greenroom-ui --prod --allowed-hosts greenroomfinder.app,www.greenroomfinder.app',
      autorestart: true,
      max_memory_restart: '1G',
      out_file: '/dev/null',
      error_file: '/dev/null'
    }
  ]
};
