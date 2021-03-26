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
    * `angular.json`
        * Change `"sourceRoot"` to `"client"`
        * Change any references to `"src/<something>"` further in the file to `"client/<something>"`
        * Change any references to `"e2e/<something>"` in the `"e2e"` target to `"e2e/client/<something>"`
    * `tsconfig.app.json`:
        * Change any references to `"src/<something>"` to `"client/<something>"`. `"OutDir"` is overridden by angular.json
    * `tsconfig.spec.json`:
        * Change any references to `"src/<something>"` to `"client/<something>"`. `"OutDir"` is overridden by angular.json
    * `e2e/client/protractor.conf.js`:
        * Change `"capabilities"` from `["chrome"]` to your browser of choice if required.
    * `e2e/client/protractor.conf.js` (Optional: We will be changing to Cypress later on but this makes for a good sanity test of these config changes):
        * Change `"capabilities"` from `["chrome"]` to your browser of choice if required. You may need to run `node node_modules/protractor/bin/webdriver-manager update` after this

## Running the Angular project
To ensure our changes above have worked, run the following Angular commands and ensure that you can build, run, and test the application with the new configuration. Ensure that the builds are created under `dist/client` and `e2e/client` for running and testing, respectively.
* `ng build`
* `ng serve --open`
* `ng test`
* `ng lint`
* `ng e2e`


## Typescript and Express
* Angular projects come with the `typescript` and `@types/node` packages installed. If you do not have Typescript installed globally, run `npm i -g typescript`
* Install express (server framework), helmet (security middleware), and related Typescript declarations with `npm i express helmet` (project dependencies) and `npm i -D @types/express @types/helmet` (dev dependencies)
