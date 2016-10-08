<h1 align='center'>Boiler ES6</h1>

# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm` `mongod`
Once you have these, install the following as globals:  
`npm install -g gulp`

## Installing
* `git clone`
* `npm install`

## Running the app
* Make sure you have a mongod server running : `sudo mongod`

## Developer mode HRM + eval build  
* `npm run dev`

## Build for deployment && Deploy After setting up app on Heroku
* `npm run build`
* `git push heroku branch-name:master`

## Test production locally
* `npm run prod`

## Lint the client
* `npm run lint`

## Generating Components

Following a consistent directory structure between components offers us the certainty of predictability. We can take advantage of this certainty by creating a gulp task to automate the "instantiation" of our components. The component boilerplate task generates this:
```
⋅⋅⋅⋅⋅⋅componentName/
⋅⋅⋅⋅⋅⋅⋅⋅index.js // entry file where all its dependencies load
⋅⋅⋅⋅⋅⋅⋅⋅componentName.component.js
⋅⋅⋅⋅⋅⋅⋅⋅componentName.controller.js
⋅⋅⋅⋅⋅⋅⋅⋅componentName.tmpl.html
⋅⋅⋅⋅⋅⋅⋅⋅componentName.css // scoped to affect only its own template
```
You may, of course, create these files manually, every time a new module is needed, but that gets quickly tedious.
To generate a component, run `gulp component --name componentName`.

The parameter following the `--name` flag is the name of the component to be created. Ensure that it is unique or it will overwrite the preexisting identically-named component.

The component will be created, by default, inside `_client/`. To change this, apply the `--parent` flag, followed by a path relative to `_client/`.

For example, running `gulp component --name signup --parent ./components/auth` will create a `signup` component at `_client/components/auth/signup`.  

Running `gulp component --name footer --parent ../common/components` creates a `footer` component at `_client/common/components/footer`.  

Because the argument to `--name` applies to the folder name **and** the actual component name, make sure to camelcase the component names.


## Resources (inspired on)
* AngularClass NG6 - https://github.com/Braincompiler/NG6-starter
* toddmotto's Style Guide - https://github.com/toddmotto/angular-styleguide

