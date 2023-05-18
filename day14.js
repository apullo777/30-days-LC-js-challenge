/** Day 14: 2622. Cache With Time Limit
Write a class that allows getting and setting key-value pairs, 
however a time until expiration is associated with each key.

The class has three public methods:
set(key, value, duration): 
    accepts an integer key, an integer value, and a duration in milliseconds. 
    Once the duration has elapsed, the key should be inaccessible. 
    The method should return true if the same un-expired key already exists and false otherwise. 
    Both the value and duration should be overwritten if the key already exists.

get(key): 
    if an un-expired key exists, 
    it should return the associated value. 
    Otherwise it should return -1.

count(): returns the count of un-expired keys.


Example 1:

Input: 
["TimeLimitedCache", "set", "get", "count", "get"]
[[], [1, 42, 100], [1], [], [1]]
[0, 0, 50, 50, 150]
Output: [null, false, 42, 1, -1]
Explanation:
At t=0, the cache is constructed.
At t=0, a key-value pair (1: 42) is added with a time limit of 100ms. The value doesn't exist so false is returned.
At t=50, key=1 is requested and the value of 42 is returned.
At t=50, count() is called and there is one active key in the cache.
At t=100, key=1 expires.
At t=150, get(1) is called but -1 is returned because the cache is empty. */

// Approach 1: setTimeout + clearTimeout + Class Syntax
class TimeLimitedCache {
  cache = new Map();

  set(key, value, duration) {
    const valueInCache = this.cache.get(key);
    if (valueInCache) {
      clearTimeout(valueInCache.timeout);
    }
    const timeout = setTimeout(() => this.cache.delete(key), duration);
    this.cache.set(key, { value, timeout });
    return Boolean(valueInCache);
  }

  get(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
  }

  count() {
    return this.cache.size;
  }
};

// Approach 2: setTimeout + clearTimeout + Function Syntax
function TimeLimitedCache() {
  this.cache = new Map();
}

TimeLimitedCache.prototype.set = function(key, value, duration) {
    const valueInCache = this.cache.get(key);
    if (valueInCache) {
      clearTimeout(valueInCache.timeout);
    }
    const timeout = setTimeout(() => this.cache.delete(key), duration);
    this.cache.set(key, { value, timeout });
    return Boolean(valueInCache);
}

TimeLimitedCache.prototype.get = function(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
}

TimeLimitedCache.prototype.count = function() {
    return this.cache.size;
}

// Approach 3: Maintain Expiration Times
class TimeLimitedCache {
  cache = {};

  set(key, value, duration) {
    const hasUnexpiredValue = key in this.cache && Date.now() < this.cache[key].expiration;
    this.cache[key] = { value, expiration: Date.now() + duration };
    return hasUnexpiredValue;
  }

  get(key) {
    if (this.cache[key] === undefined) return -1;
    if (Date.now() > this.cache[key].expiration) return -1;
    return this.cache[key].value;
  }

  count() {
    let count = 0;
    for (const entry of Object.values(this.cache)) {
        if (Date.now() < entry.expiration) {
            count += 1;
        }
    }
    return count;
  }
};

// Approach 4: Maintain Expiration Times + Priority Queue
class TimeLimitedCache {
  cache = {};
  queue = new MinPriorityQueue();
  size = 0;

  handleExpiredData() {
    const now = Date.now();
    while (this.queue.size() > 0 && this.queue.front().priority < now) {
      const entry = this.queue.dequeue().element;
      if (!entry.overwritten) {
        delete this.cache[entry.key];
        this.size -= 1;
      }
    }
  };

  set(key, value, duration) {
    this.handleExpiredData();
    const hasVal = key in this.cache
    if (hasVal) {
      this.cache[key].overwritten = true
    } else {
      this.size += 1;
    }
    const expiration = Date.now() + duration;
    const entry = { key, value, expiration, overwritten: false }
    this.cache[key] = entry
    this.queue.enqueue(entry, expiration);
    return hasVal;
  }

  get(key) {
    this.handleExpiredData();
    if (this.cache[key] === undefined) return -1;
    return this.cache[key].value;
  }

  count() {
    this.handleExpiredData();
    return this.size;
  }
};
