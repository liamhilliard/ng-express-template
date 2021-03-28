# Angular + Typescript Environment Setup
## Installing Angular
* Install Angular CLI with `npm i -g @angular/cli`
* Create a workspace with `ng new <app-name>` or `ng new --directory <dir>` for an existing folder. In this case, the name "client" will be used for the project
* Serve the application with `ng serve --open`
* Select routing and styling preferences when prompted. We will use Angular Routing and CSS for this project

### Configuring the Angular project
* Rename the "src" folder to "client"
* Create a "client" folder under "e2e" and move existing files in "e2e" under it
* Make the following updates to Angular's config files:

    | File | Changes |
    |------|---------|
    |`angular.json` | Change `sourceRoot` to `"client"` |
    ||Change any references to `src/<something>` further in the file to `client/<something>` |
    ||Change any references to `e2e/<something>` in the `e2e` target to `e2e/client/<something>`|
    ||To enable Karma code coverage, add `"codeCoverage": true` to the `test` target's options|
    |`tsconfig.app.json`|Change any references to `src/<something>` to `client/<something>`. `OutDir` is overridden by angular.json |
    |`tsconfig.spec.json`| Change any references to `src/<something>` to `client/<something>`. `OutDir` is overridden by angular.json |
    |`e2e/client/tsconfig.json`| Change `extends` to `"../../tsconfig.json"` |
    |`e2e/client/protractor.conf.js`| (Optional: We will be switching to Cypress later) Change `capabilities` from `["chrome"]` to your browser of choice if desired. You may need to run `node node_modules/protractor/bin/webdriver-manager update` afterwards. Note that in Firefox, the `afterEach` call in `e2e/client/src/app.e2e-spec.ts` may cause a "HTTP method is not allowed" error. Removing the `afterEach` block will fix this |
    |`karma.conf.js`| If you aren't using Chrome, install the appropriate Karma launcher (e.g. `karma-firefox-launcher`) and add it to the `plugins` array. Update the `browsers` array as well |


### Running the Angular project
To ensure our changes above have worked, run the following Angular commands and ensure that you can build, run, and test the application with the new configuration. Ensure that the builds are created under `dist/client` and `e2e/client` for running and testing, respectively.
* `ng build`
* `ng serve --open`
* `ng test`
* `ng lint`
* `ng e2e`


### Install Cypress as the E2E Test Runner (Optional)
* Install cypress and the nrwl dependencies with `npm i -D cypress @nrwl/workspace @nrwl/cypress`
* Edit and create the following files:
* Edit `angular.json` and update the configuration of the e2e target:
    ```json 
    "e2e": {
        "builder": "@nrwl/cypress:cypress",
        "options": {
            "cypressConfig": "e2e/cypress/cypress.json",
            "tsConfig": "e2e/cypress/tsconfig.e2e.json",
            "devServerTarget": "client:serve"
        },
        etc...
    ```
* Delete the contents of `e2e` and replace them with the following folders:
    * `e2e/cypress`
    * `e2e/cypress/cypress.json`
    * `e2e/cypress/tsconfig.e2e.json`
    * `e2e/cypress/tsconfig.json`
    * `e2e/cypress/fixtures/example.json`
    * `e2e/cypress/integration/app.spec.ts`
    * `e2e/cypress/plugins/index.json`
    * `e2e/cypress/support/app.po.ts`
* Update the contents of `e2e/cypress/cypress.json` to:
    ```json
    {
        "fileServerFolder": ".",
        "fixturesFolder": "./fixtures",
        "integrationFolder": "./integration",
        "pluginsFile": "./plugins/index",
        "supportFile": false,
        "video": true,
        "videosFolder": "../../dist/cypress/client/videos",
        "screenshotsFolder": "../../dist/cypress/client/screenshots",
        "chromeWebSecurity": false
    }
    ```
* Update the contents of `e2e/cypress/tsconfig.e2e.json` to:
    ```json
    {
        "extends": "./tsconfig.json",
        "compilerOptions": {
            "sourceMap": false,
            "outDir": "../../dist/out-tsc"
        },
        "include": [
            "**/*.ts"
        ]
    }
    ```
* Update the contents of `e2e/cypress/tsconfig.json` to:
    ```json
    {
        "extends": "../../tsconfig.json",
        "compilerOptions": {
            "outDir": "../../out-tsc/e2e",
            "module": "commonjs",
            "target": "es2018",
            "types": [
                "cypress",
                "node"
            ]
        }
    }
    ```
* Update the contents of `e2e/cypress/fixtures/example.json` to:
    ```json
    {
        "name": "Using fixtures to represent data",
        "email": "hello@cypress.io"
    }
    ```
* Update the contents of `e2e/cypress/integration/app.spec.ts` to:
    ```typescript
    import { getGreeting } from '../support/app.po';
    describe('{your-app}', () => {
        beforeEach(() => cy.visit('/'));

        it('should display welcome message', () => {
            getGreeting().contains('Welcome to {your-app}!');
        });
    });
    ```
* Update the contents of `e2e/cypress/plugins/index.js` to:
    ```javascript
    const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');
    module.exports = (on, config) => {
        on('file:preprocessor', preprocessTypescript(config));
    };
    ```
* Update the contents of `e2e/cypress/support/app.po.ts` to:
    ```typescript
    export const getGreeting = () => cy.get('h1');
    ```
* Ensure that the `cy` global variable is not flagged by your linter or Typescript
* Run ng e2e and watch the test run

## Typescript and Express

### Installation
* Angular projects come with the `typescript` and `@types/node` packages installed. If you do not have Typescript installed globally, run `npm i -g typescript`
* Install Express (server framework), Helmet (security middleware), and Dotenv (config module) with `npm i express helmet dotenv`
* Install Express, Helmet, and Dotenv's related Typescript declarations with `npm i -D @types/express @types/helmet @types/dotenv`
* Create a "server" folder at the top level of the project
* Create a `server/tsconfig.json` with the following content:
    ```json
    {
    "extends": "../tsconfig.json",
        "compilerOptions": {
            "target": "es5",
            "outDir": "../dist/server",
            "module": "CommonJS"
        }
    }
    ```
* Create a `.env` file at the root level of your project containing the line `PORT=7077`
* Create a `server/index.js` file with the following content:
    ```typescript
    import { Request, Response } from "express";

    const express = require('express')
    const helmet = require('helmet')
    const config = require('dotenv').config();

    if(config.error){
        throw config.error
    }

    const PORT:number = parseInt(process.env.PORT as string)

    const app = express()
    app.use(express.json())
    app.use(helmet())
    app.get('/', (req: Request, res: Response) => {
        res.send(`Express + TS`)
    })
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
    })

    export {app}
    ```
* Compile and run this server with `tsc -p server && node dist/server/index.js` and connect to your server on `http://localhost:7077`. You should see your message "Express + TS"

