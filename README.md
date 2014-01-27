# Ryggrad.todos

A TODOS example app for [Ryggrad](http://github.com/ryggrad/Ryggrad) ported from the [Spine.js Todos Example](
https://github.com/maccman/spine.todos)

## Screenshot

![Todos](https://raw.github.com/ryggrad/Ryggrad.todos/master/screenshot.png)

## Usage

Open index.html in your browser. It is ready to go! All tasks are stored locally. Take a look at src/ to see how it is 
done. 

index.html links to static files in dist/ but if you want to make changes you should do it to the CoffeScript.

1. `$ npm install`

And then run the Grunt CoffeScript task with

2. `$ grunt`

The CoffeeScript will then be browserified and compiled to dist/
