<a href="http://github.com/gusmendez99/AzenStoreMobile"><img src="https://i.imgur.com/SKZIB6d.jpg" title="FVCproductions" alt="FVCproductions" height=200 ></a>

# Azen Store Mobile

> Web Development Project - E-commerce Mobile App made with React Native


[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) 




**Screens**

<img src="https://i.imgur.com/Ovo5l4F.jpg" alt="Your image title" width="900"/>

Watch complete demo on YouTube: [https://youtu.be/LN4_xqLlAZI](https://youtu.be/LN4_xqLlAZI).

## Table of Contents
- [Azen Store Mobile](#azen-store-mobile)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Clone](#clone)
    - [Setup](#setup)
  - [Features](#features)
  - [Team](#team)
  - [License](#license)



---

## Installation


### Clone

- Clone this repo to your local machine using `https://github.com/gusmendez99/AzenStoreMobile`

### Setup

> Navigate to './directory-where-you-cloned-this-repo/AzenStoreMobile' then
> run the react-native server (install dependencies if it's the first time run this) 

```shell
$ yarn install
$ yarn start
```

> Launch the react-native application in android

```shell
$ yarn android
```

- The React Native app will run port `8081` (default configuration).

- PostgreSQL DB is already running online in **CloudClusters** this month. Also, the API is running online in **Heroku**, If you want to keep your db on localhost, clone the api repo  `https://github.com/gusmendez99/AzenStoreAPI` and follow the installation and setup guide to set your database and run the API.
- Once everything is configured correctly in the API and the server is running on  `http://localhost:8000` you will need to make some changes in the AzenStoreMobile project

```javascript
// Find all occurrences of this declaration
const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';
// And replace them with
const API_BASE_URL = 'http://localhost:8000/api/v1';
```


---

## Features

- React-Native
- Redux
- Redux-Sagas
- Django using a PostgreSQL database
- JWT Authentication
- etc.

**Extras**

- Sign In / Sign Up with Facebook
- Invoice pdf sent via SendGrid  

_Note._ SendGrid was tested with free account. It may happen that the sending of pdf does not work in the future.

## Team


| Gustavo Mendez | Luis Urbina |
| :---: |:---:|
| [![Gustavo](https://avatars0.githubusercontent.com/u/19374517?s=200&u=c1481289dc10f8babb1bdd0853e0bcf82a213d26&v=4)](http://github.com/gusmendez99)    | [![Urbina](https://avatars3.githubusercontent.com/u/35355445?s=200&u=851bb2374c95ac3baaaca3de5f51212441ebff57&v=4)](http://github.com/virtualmonkey) |
| <a href="http://github.com/gusmendez99" target="_blank">`github.com/gusmendez99`</a> | <a href="http://github.com/virtualmonkey" target="_blank">`github.com/virtualmonkey`</a> |

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="http://gusmendez99.github.io" target="_blank">Gus Mendez</a> & <a href="https://github.com/virtualmonkey" target="_blank">Luis Urbina</a>.
