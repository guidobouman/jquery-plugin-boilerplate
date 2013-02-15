# jQuery Plugin Boilerplate [![Build Status](https://travis-ci.org/guidobouman/jquery-plugin-boilerplate.png)](https://travis-ci.org/guidobouman/jquery-plugin-boilerplate)

A boilerplate for building great jQuery plugins.

The main feature is the instance binding which stores an instance of the plugin in the data attribute of each element it's invoked on. This allows for executing commands on the plugin after it's initialised while keeping track of element specific settings.

## Key features
- Uses a method object which takes care of Javascript's binding issues.
- Stores an instance of the plugin in each element's data attribute.
- Each time a command is executed on the plugin, the original instance is used.