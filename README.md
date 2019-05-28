# Introduction
This is s codeceptJS Rest project. Use BDD approach in test case development.

# How to use
This is done using CodeceptJS https://codecept.io/

### Tech
This test uses a number of open source projects to work properly:

* https://nodejs.org/en/ - evented I/O for the backend
* https://codecept.io/ - CodeceptJS
* https://developer.marvel.com/documentation/getting_started - Endpoints that are used in this porject

### Installation
This requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies.

```sh
$ cd codeceptjs-apiTest
$ npm install
```

### How to trigger API tests
To run all api tests just simply type

```sh
$ npx codeceptjs run --steps
```

### How to change your private key

Go to data.js file and change your private and public keys.

### How to install Allure report

First you need to download [allure-framework](https://github.com/allure-framework/allure2/releases).

Then add the bin folder location into your PATH variable.
To view the allure report,

```sh
$ cd codeceptjs-apiTest
$ allure serve output
```

To run all e2e tests with mocha report, just simply type

```sh
$ npx codeceptjs run --steps --reporter mochawesome
```

This will give you cli with steps in console and HTML report in output directory.