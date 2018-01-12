console.log('https://www.ibm.com/developerworks/library/wa-node-single-threaded-event-loop/index.html');
console.log('https://youtu.be/PNa9OMajw9w');
console.log('https://www.youtube.com/watch?v=P9csgxBgaZ8');

function printEventually(message) {
    setTimeout(() => {console.log(message)}, 200);
}

function printSoon(message) {
    setTimeout(() => {console.log(message)}, 100);
}

function printNow(message) {
    console.log(message);
}

printEventually('world!');
printNow('Hello');
printSoon('there, ');

// The Node engine has a single thread that handles every notification from the operating system that something is ready to be acted upon.
// If that thing is asynchronous (a call to a database or a REST interface, for example), the Node engine asks the operating system to notify it when that call is ready for processing
// In the meantime, the Node event loop moves on to the next thing that needs to be done.

console.log('The callback pattern');

// callback is another function
// function asyncCode(arg1, arg2, callback)
function printMessage(timeout, message, callback) {
    let error = null;
    setTimeout(() => {return callback(error, message);}, timeout);
}

printMessage(200, 'world!', function(error, message) {
    if (error !== null) {
        console.error('Something went wrong!');
    } else {
        console.log(message);
    }
});

console.log('Hello');

printMessage(100, 'there,', function(error, message) {
    if (error !== null) {
        console.error('Something went wrong!');
    } else {
        console.log(message);
    }
});

console.log('Nesting callbacks');

// Want the three words of the message to print in a particular order
printMessage(200, 'world!', (error, message) => {
    console.log(message);
    printMessage(0, 'Hello', (error, message) => {
        console.log(message);
        printMessage(100, 'there,', (error, message) => {
            console.log(message);
        });
    });
});