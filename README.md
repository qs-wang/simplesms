# A simple REACT UI for sending SMS 

This is an example UI which sends SMS to mobile phone. 

- [Overview](#overview)
- [System Requirements](#system-requirements)
- [Install and Build](#install-and-build)
- [Configure](#configure)
- [Run](#run)
<!-- tocstop -->

## Overview
- A simple `SMSForm` component that communicates with a server endpoint to [send SMS messages via the REST API]().
- The messeages have to be inputed as the array of JSON strging.
- Supports send up to 3 SMSs to given phone no.
- Uses the [Create React App](https://github.com/facebook/create-react-app) for ceating, managing the project.

## System Requirements
- node 8.14.0
- npm

## Install and Build
```bash
git clone https://github.com/qs-wang/simplesms
cd simplesms
npm install
npm run build
```
### Install and Run the backend server
This APP uses the [send-sms](https://github.com/qs-wang/send-sms) as the backend API server. Need install, and run it seperately. 
Please following the instruction at [send-sms](https://github.com/qs-wang/send-sms).

## Configure
- Customized environment varabiles shoud go to .env
- .env file should be created manully
- The .env file conatins following key
```
REACT_APP_TEST_PHONE=
```

## Run

Make sure the proxy definition in package.json file is matching the URL of he backend server, which is running as described at - [Install and Run the backend server](#install-and-run-the-backend-server) 

Start the application in dev mode on its own with the command:

```bash
npm run dev
```
Open the app at [localhost:3000](http://localhost:3000). You can now use the form to send SMS messages via your mobile number.

Note: the messages in the body filed should be the JSON array format, which can only contain no more than 3 messages. A sample is as below:
```
[
  "Hi",
  "www.example.com",
  "How are you?"
]
```