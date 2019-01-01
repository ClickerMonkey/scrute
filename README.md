# scrute

`scrute` allows you to *scrutinize* your data and watch it for changes. You can also add properties to objects which are a computed value based on watched values.

**Notice**: This library depends on Proxy [being supported](https://caniuse.com/#search=Proxy) by the browser. If you wish to support IE you will have to use this: [proxy-polyfill](https://github.com/GoogleChrome/proxy-polyfill).

- [Example](#example)
- [API](#api)


## Example

```javascript
// when using in plain JS, Scrute.observe, Scrute.watch, and Scrute.computed are available.

import { observe, watch, computed } from 'scrute';

var data = observe({
  name: 'scrute',
  keywords: ['js', 'typescript', 'observe', 'computed'],
  version: {
    major: 0,
    minor: 0,
    patch: 1
  }
});

// data now can be used in watch and computed and when anything in data changes,
// watch and computed are notified.

// ==========================================
// watch example
// ==========================================

watch(() => {
  console.log( 'name changed:', data.name );
})

// function will run a second time above
data.name = 'reactive';

// ==========================================
// computed example
// ==========================================

var obj = {};

computed( obj, 'version', () => {
  return data.version.major + '.' + data.version.minor + '.' + data.version.patch;
});

// obj.version = '0.0.1';

data.version.major = 1;

// obj.version = '1.0.1';

```

## API

### observe ( objectOrArray )

Given an object or an array this returns a value which can be observed for changes by [watch](#watch) and [computed](#computed). You must use the reference returned by this function.

### watch ( func, { deep = false, immediate = true } )

Pass a function which uses [observed](#observe) objects to do something. When any of the used values change the function is automatically called again. The second argument is an object which can have two properties:

- `deep`: If true, this function will run when any sub-properties change - not just the variables directly referenced.
- `immediate`: If true, when a change is detected on an observed object this function is executed immediately. If false, the returned watcher is simply marked dirty and the user must call update themselves.

This function returns an instance of Watcher. A watcher has the following methods:

- `isWatching`: Returns whether the function is currently watching anything.
- `notify`: If the function is not currently running, this will mark the watcher as dirty and call the function if immediate was true.
- `update`: Calls the passed function and keeps track of which variables are referenced in the function.
- `off`: Stops listening for observed changes.
- `pause`: Stops listening for observed changes but can be resumed with `resume`.
- `resume`: Resumes listening for observed changes and immediately executes the function.

### computed ( target, property, func )

When `target.property` is referenced the result of the `func` function will be returned. The value will be cached and is only recalculated when it needs to be to return an up-to-date value.
