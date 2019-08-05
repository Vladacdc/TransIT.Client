# TransITClient

[![Build status](https://ci.appveyor.com/api/projects/status/0vpx77bod7l3j9it?svg=true)](https://ci.appveyor.com/project/Vladacdc/transit-client)

This project was built with Angular CLI version 7.3.0, JQuery version 3.4.1, Typescript version 3.2.2, Node.js,
This repository contains client-side application, server-side is stored [here](https://github.com/Vladacdc/TransIT.API).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install to run this project and how to install them

- [Visual Studio Code](https://visualstudio.microsoft.com/) or similar Editor
- [Node.js](https://nodejs.org/en/)
- Packages for Angular, Webpack and so on.

### Installing

1) Install Visual Studio Code;
2) Install node.js;
3) Open Visual Studio Code;
4) Choose folder where you store your projects (CTRL+K, CTRL+O);
5) Create new terminal (CTRL+SHIFT+`);
6) Clone repository (`git clone https://github.com/Vladacdc/TransIT.Client.git`);
7) Choose created directory (`cd TransIT.Client`);
8) Checkout dev branch (`git checkout dev`);
9) Install packages (`npm install`);

### Running Client
1) Open project folder in VS Code(CTRL+K, CTRL+O);
2) Start Project (`npm run start`);
3) Do not close terminal, until you want server to stop;

#### Possible Errors and how to fix them
<details close>
<summary>'node' is not recognized as an internal or external command,
operable program or batch file</summary>
Install <a href ="https://nodejs.org/en/">node.js</a>
</details>
<details close>
<summary>Something about missing packages</summary>
try to install packages with specified version manually</a>
</details>
<details close>
<summary>Помилка з'єднання: Неможливо з'єднатися з сервером</summary>
API project isn't running, so start API project</a>
</details>
<details close>
<summary>Неправильне ім'я або пароль</summary>
Check that database on API project is seeded or try recreating database</a>
</details>

## Development

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Serve
Run `ng run start` to build project and development server. Site is hosted on [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Users
See [TransIT.API readme development](https://github.com/Vladacdc/TransIT.API/tree/dev#development) to find usernames and passwords seeded to database.

## Deployment

If you have a question about deployment, ask [Vladyslav](https://github.com/Vladacdc).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Built With

* [Angular CLI version 7.3.0](https://github.com/angular/angular-cli) - Main framework to build web application;
* [JQuery version 3.4.1](https://jquery.com/) - Second main framework, because sometimes one framework is not enough :);
* [Datatables.net](https://datatables.net/) - JQuery datatables;
* [Karma](https://karma-runner.github.io) - To run unit tests;
* [Protractor](http://www.protractortest.org/) - To run e2e tests;
* [Typescript version 3.2.2](https://www.typescriptlang.org/) - Programming language to combine libraries and frameworks together;
* [Node.js](https://nodejs.org/en/) - Package manager;
