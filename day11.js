/** Day 11: 2621. Sleep
Given a positive integer millis, 
write an asyncronous function that sleeps for millis milliseconds. 
It can resolve any value. */

/**
 * @param {number} millis
 */


// arrow function
async function sleep(millis) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, millis)
    })
}

// without arrow function
async function sleep(millis) {
  return new Promise(resolve => {
    setTimeout(resolve, millis);
  });
}

//  try catch
async function sleep(millis) {
    try {
        await new Promise(resolve => setTimeout(resolve, millis))
    } catch (err) {
        console.log(err)
    }
}

// without return
async function sleep(milliseconds) {
	await new Promise(res => setTimeout(res, milliseconds)); 
}

/** 
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */