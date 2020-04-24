module.exports = {
  apps: [
    {
      name: 'greenroom-rest-api',
      cwd: '/home/prmichaelsen/workplace/ts-npm-template',
      script: 'ng',
      args: 'run greenroom-rest-api:serve:production',
      autorestart: true,
      max_memory_restart: '1G',
      out_file: '/dev/null',
      error_file: '/dev/null'
    },
    {
      name: 'greenroom-ui',
      cwd: '/home/prmichaelsen/workplace/ts-npm-template',
      script: 'ng',
      args: 'run greenroom-ui:production --prod --allowed-hosts greenroomfinder.app,www.greenroomfinder.app',
      autorestart: true,
      max_memory_restart: '1G',
      out_file: '/dev/null',
      error_file: '/dev/null'
    },
    {
      name: 'names-not-numbers',
      cwd: '/home/prmichaelsen/workplace/ts-npm-template',
      script: 'ng',
      args: 'run names-not-numbers:serve:production --allowed-hosts namesnotnumbers.app,www.namesnotnumbers.app',
      autorestart: true,
      max_memory_restart: '1G',
      out_file: '/dev/null',
      error_file: '/dev/null'
    },
    {
      name: 'move-it',
      cwd: '/home/prmichaelsen/workplace/ts-npm-template',
      script: 'ng',
      args: 'run move-it-app:serve:production --allowed-hosts moveit.parm.app,www.moveit.parm.app,greenroomfinder.app',
      autorestart: true,
      max_memory_restart: '1G',
      out_file: '/dev/null',
      error_file: '/dev/null'
    },
    {
      name: 'f5',
      cwd: '/home/prmichaelsen/workplace/ts-npm-template',
      script: 'ng',
      args: 'run f5:serve:production --allowed-hosts parm.app,www.parm.app',
      autorestart: true,
      max_memory_restart: '1G',
      out_file: '/dev/null',
      error_file: '/dev/null'
    },
  ]
};
