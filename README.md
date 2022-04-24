# Project n°6 - Hot Takes (Piiquante!) - OpenClassrooms courses

:lock: Build a secure API for a food site :hotsprings: (front-end already provided)


## Project targets
:outbox_tray: Use CRUD operation in a secure manner :white_check_mark:
:bookmark_tabs: Implement a logical data model :white_check_mark:
:key: Secure data storing :white_check_mark:

## Expected operations
:busts_in_silhouette: Create a user :white_check_mark:
:unlock: Login with user ID :white_check_mark:
:pencil2: Create a Sauce :white_check_mark:
:pencil: Modify a Sauce (by creator :lock_with_ink_pen:) :white_check_mark:
:x: Delete a Sauce (by creator:lock_with_ink_pen:) :white_check_mark:
:+1::-1: Like OR dislike a Sauce :white_check_mark:

## User guide: :clipboard:

### Install node js (16.10.0 or 12.20.2 or 14.15.5 ) [to be compatible with the frontend angular cli version 13.2.4]
### From withing the back-end folder provided 
1- Create an "images" file
2- Create an ".env" file and define the environnement variables:
- PORT= ""
- DB_USERNAME = "your database username"
- DB_PASSWORD = "your database password"
- DB_NAME = "your database name"
- DB_CLUSTER = "your database cluster"
- SECRET_TOKEN = "your database password generated secret token"

3- Run  `npm install`
4- Run `node server` or `nodemon server`

#### Project dependencies:
bcrypt, dotenv, email-validator, express, fs, helmet, jsonwebtoken,mongoose, mongoose-unique-validator, multer, password-validator

### After cloning the front-end repo (Web-Developper-P6)
Run  `npm install`
Install Angular (cli version 13.2.4)

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.