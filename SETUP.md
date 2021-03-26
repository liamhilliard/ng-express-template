# Angular + Typescript Environment Setup
## Installing Angular
* Install Angular CLI with `npm i -g @angular/cli`
* Create a workspace with `ng new <app-name>` or `ng new --directory <dir>` for an existing folder. In this case, the name "client" will be used for the project
* Serve the application with `ng serve --open`
* Select routing and styling preferences when prompted. We will use Angular Routing and CSS for this project
* Create a "client" folder under "src" and move all of the default Angular files under it
*

## Typescript and Express
* Angular projects come with the `typescript` and `@types/node` packages installed. If you do not have Typescript installed globally, run `npm i -g typescript`
* Install express (server framework), helmet (security middleware), and related Typescript declarations with `npm i express helmet` (project dependencies) and `npm i -D @types/express @types/helmet` (dev dependencies)
