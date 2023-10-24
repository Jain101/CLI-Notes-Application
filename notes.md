nodeJS is a runtime, browser is a runtime, js is a language

window object in browser <-> global in nodeJS

In Node.js, there is no DOM, so we cannot access or manipulate HTML elements.
Node.js is mainly used for server-side applications, while the browser is used for websites
The console object works the same way in both the browser and Node.js

To start the Node REPL, simply open your terminal and type node 

understanding the process and environment in Node.js is crucial for building scalable and high-performance applications
By using the process object and environment variables, developers can access and manipulate the runtime environment of their programs.
# use cases
1. handling concurrent requests in server

* can't be used for cpu intensive work coz it uses just one thread, python would be good for that

# asynchronous?
1. interacting with a network/doing something over the internet
2. using some type of timing function
3. interacting with storage, file system/database

# promises?
to solve callback hell problem