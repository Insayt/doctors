/* eslint-disable @typescript-eslint/no-var-requires */
const { generateApi } = require('swagger-typescript-api');
const path = require('path');

const srcPath = path.resolve(__dirname, '../../src');
const apiPath = path.resolve(srcPath, 'api');

const apiList = [
  {
    name: 'v3.ts',
    output: path.resolve(apiPath, 'auth/types'),
    url: 'http://master.renhealth-auth.k8s.dev.renhealth/swagger/v3/swagger.json',
  },
  {
    name: 'v1.ts',
    output: path.resolve(apiPath, 'doctor/types'),
    url: 'http://master.renhealth-doctor.k8s.dev.renhealth/swagger/v1/swagger.json',
  },
  {
    name: 'v2.ts',
    output: path.resolve(apiPath, 'doctor/types'),
    url: 'http://master.renhealth-doctor.k8s.dev.renhealth/swagger/v2/swagger.json',
  },
  {
    name: 'v1.ts',
    output: path.resolve(apiPath, 'renfiles/types'),
    url: 'http://master.renhealth-renfiles.k8s.dev.renhealth/swagger/v1/swagger.json',
  },
  {
    name: 'v2.ts',
    output: path.resolve(apiPath, 'supporttask/types'),
    url: 'http://master.renhealth-supporttask.k8s.dev.renhealth/swagger/v2/swagger.json',
  },
  {
    name: 'v1.ts',
    output: path.resolve(apiPath, 'account/types'),
    url: 'http://master.renhealth-account.k8s.dev.renhealth/swagger/v1/swagger.json',
  },
  {
    name: 'v2.ts',
    output: path.resolve(apiPath, 'account/types'),
    url: 'http://master.renhealth-account.k8s.dev.renhealth/swagger/v2/swagger.json',
  },
  {
    name: 'v1.ts',
    output: path.resolve(apiPath, 'telemed/types'),
    url: 'http://master.renhealth-telemed.k8s.dev.renhealth/swagger/v1/swagger.json',
  },
  {
    name: 'v2.ts',
    output: path.resolve(apiPath, 'renchat/types'),
    url: 'http://master.renhealth-renchat.k8s.dev.renhealth/swagger/v2/swagger.json',
  },
  {
    name: 'types.ts',
    output: path.resolve(apiPath, 'rate/v1'),
    url: 'http://master.renhealth-rate.k8s.dev.renhealth/swagger/v1/swagger.json',
  },
];

Promise.all(
  apiList.map((c) => generateApi({ ...c, generateClient: false }))
).catch(console.log);
