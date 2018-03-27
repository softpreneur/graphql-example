Coomplete GraphQL endpoint example with node.js + express.js + mongoose.js + mongodb + apollo graphql stack.
This example covers, graphql queries, mutations and subscriptions. If you find it difficult to wrap your head around it, you can use  tutorials from 
1. Emmanuel Quimper (https://www.youtube.com/channel/UC7R7bcH9-KEBDiGNP1mZnmw)
2. Ben Awad (https://www.youtube.com/user/99baddawg)

You can also read my experience with graphql on medium ()

If you customize this to work for you, kindly follow these step to get it working
1. I use some ES6 and ES7 features, after editing or customizing this, run: "npm run build" to transpile from ES6 + ES7 syntax to ES5
2. Then open the build folder find where you have require("babel-core/register");
require("babel-polyfill"); cut it and past it before any line of code in the same app.js to avoid getting this error:

 Error: Cannot find module 'compression'
    at Function.Module._resolveFilename (module.js:555:15)
    at Function.Module._load (module.js:482:25)
    at Module.require (module.js:604:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/Users/apple/Documents/CompleteGraphQL/build/app.js:3:20)
    at Module._compile (module.js:660:30)
    at Object.Module._extensions..js (module.js:671:10)
    at Module.load (module.js:573:32)
    at tryModuleLoad (module.js:513:12)
    at Function.Module._load (module.js:505:3)
[nodemon] app crashed - waiting for file changes before starting...

3. Finally run "npm run start" to start the server.