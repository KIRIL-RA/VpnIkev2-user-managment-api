# ikev2 vpn users managment server

## Introduction

This application intended for manage(get, adding, removing) ikev2 vpn users using api routes. This application only manage users, you need to install vpn server apart.

### Features

Adding new users by api routes, revoke existing users. 

For existing users you can download connection certificates/configurations using api. 
Configurations available for:
- Ios/MacOs
- Strogngswann app
Certificates available for all platforms. 

Description of all api routes you can find in swagger on route /swagger. NOTICE swagger available only inn dev mode. 
## Instal application

### 1. Install ikev2 vpn server.

You can do it using this instruction:

https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/docs/ikev2-howto.md#set-up-ikev2-using-helper-script

### 2. Download this application to your vpn server

Clone this repository to your server, install all dependencies using ```npm i```

### 3. Install and configure PostgreSQL database

Database need for collecting info about users. Install database on your server using default instructions for installation. Create new user and save credentials, it needed in next steps.

Connect to postgre and create new database named ```vpn```

### 3. Configuration

Firstly you need to create *.env* in application directory. File example:
```
PORT=3000
API_SECRET="A1B2C3D4"
DB_USER="user"
DB_PASSWORD="password"
CERTIFITES_DIRECTORY="/root"
DEV="true"
HOSTNAME="localhost"
```
#### Paramters description
***PORT*** - application port<br>
***API_SECRET*** - generate your own secret, it will be used for make api requests. Save it in safe place, its token cricital for safety reasons.<br>
***DB_USER*** - database username<br>
***DB_PASSWORD*** - database user password<br>
***CERTIFITES_DIRECTORY*** - directory, where vpn server save certificates/configs. Change it on directory, where your vpn server save certs. By default it will be your root user directory<br>
***DEV*** - enable/disable dev mode<br>
***HOSTNAME*** - name or ip of your server. Used for setup swagger route.<br>

After creating *.env* file you need to create folders structure for certificates. 
Create folder such as on scheme, in project directory
```
├── certificates
│   ├── common
│   ├── ios
│   ├── strongswan
├── {Another project files}
└── readme.md
```

In next step, you need initialize database. Copy created early *.env* file in *ini* folder and run fillDb.js script. After compliting script, you can launch this application using node.