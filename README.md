# scrute

`scrute` allows you to *scrutinize* your data and watch it for changes. You can also add properties to objects which are a computed value based on watched values.

```javascript
// when using in plain JS, scrute.observe, scrute.watch, and scrute.computed are available.

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
