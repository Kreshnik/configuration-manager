# configuration-man
> A node module, inspired by Laravel's configuration class.


The module expects a folder called **config** within your application root (can be changed). It looks for **.json** files, which represent configuration files. 

Example:

1. config/app.json
2. config/services.json
3. config/auth.json
4. config/database.json
4. config/mail.json



## Install

```
$ npm install --save configuration-man
```


## Include the module

```
const config = require('configuration-man')();
```

### Options
You can pass the following options object to the ```configuration-man```. 

#### Properties 

**basePath** -> The application root folder.

**configPath** -> The folder that contains the configuration files.
 
```
const config = require('configuration-man')({
    basePath: path.dirname(__filename),
    configPath: "/config/"
});
```

## Methods

You can use the following methods with the module.

Determine if the given configuration value exists. (Note: The first word before the dot, is the json file name.)

**config.has('app.env')** -> Check if the configuration file app.js has a property called ```env```.

Get the specified configuration value. (Note: The first word before the dot, is the json file name.)

**config.get('app.env')** -> Get the property ```env``` from the configuration file ```app.js```.

Set a given configuration value. (Note: The first word before the dot, is the json file name.)

**config.set('app.env', 'Production')** -> Set the property ```env``` to ```Production``` in the configuration file ```app.js```.

## Running tests

To run test cases, execute ```npm test``` within the module folder.

## License

MIT
