# Cloth Store Admin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3

## Install Nodejs npm to run Angular:
Link download: https://nodejs.org/en/download/package-manager/current

## Install Angular Framework
Run `npm install -g @angular/cli`

## Deloyment Docker
This is an instructional clip: https://youtu.be/GE7tn2l9B1E

Build image for this : " docker build -t ctadfe . "

Create Container from image : " docker run -p 4202:4202 --name ctad ctadfe "

## Start run project
Run `npm run install` when run project first time in message bottom right.

Run `ng serve` for a dev server. Navigate to `http://localhost:4202/`. The application will run project from your local.

## Code config if folder path capital letters, lower case letters not correct is change path name in class import paths

Example: `import {environment} from "../../../Environment/Environment";` if path error you can edit it `import {environment} from "../../../environment/environment`

## Images demo our websites
  - Product mananagement
    ![product-list](src/assets/images/Screenshot%202024-05-20%20002025.png)

    ##
  - Bill status
    ![product-list](src/assets/images/Screenshot%202024-05-20%20002322.png)

    ##
  - Order management
    ![product-list](src/assets/images/Screenshot%202024-05-20%20002346.png)
