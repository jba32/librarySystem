(function() {
  
  var libraryStorage = {};

  function librarySystem(libraryName, dependencies, callback) {
    
    // If callback exists, create a new library object and store properties
    if (arguments.length > 1) {
      libraryStorage[libraryName] = {};
      libraryStorage[libraryName]['dependencies'] = dependencies;
      libraryStorage[libraryName]['callback'] = callback;
   
    // No callback, just return the saved value
    } else {
      return memoizedRetrieve(libraryName);
    }
  }
  
  function retrieve(libraryName) {
    
    var dependencies = libraryStorage[libraryName]['dependencies'].map(function(dependency) {
    return retrieve(dependency);
    });
    
    var callbackAppliedToDependencies = libraryStorage[libraryName]['callback'].apply(null, dependencies);
    return callbackAppliedToDependencies;
  }
  
  // Creates a function which is a memoized copy of `fn` (works with 1 parameter).
  // Copy/pasted from:
  // https://medium.freecodecamp.org/understanding-memoize-in-javascript-51d07d19430e
  const memoize = (fn) => {
    // `cache` is stored as a property of the `memoizedRetrieve` function!
    let cache = {};
    return (...args) => {
      let n = args[0]; // Works with exactly 1 parameter
      // If `libraryName` (n) is already stored in the `cache` object
      if (n in cache) {
        // return its value, equal to `callbackAppliedToDependencies`, which is stored in cache[n].
        return cache[n];
      } else {
        // Create a result variable, equal to the result of calling `retrieve` on `libraryName` (`callbackAppliedToDependencies`).
        let result = fn(n);
        // Store it, then return it.
        cache[n] = result;
        return result;
      }
    }
  }
  // Creates a memoized version of `retrieve`.
  const memoizedRetrieve = memoize(retrieve);
  window.librarySystem = librarySystem;
})();
