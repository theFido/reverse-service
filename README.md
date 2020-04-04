# Dependencies Faker

Useful to mock responses or perform reverse engineering of REST services. Powered by express.


```javascript
const { Server, Handler, responseRandomizer } = require('reverse-service');

// initialize a server in port 3000
const testServer = new Server(3000);

// listen for errors
testServer.on('error', (err) => {
	console.error(err);
});

// listen for unknown calls
testServer.on('unhandled_endpoint', endpoint => {
	console.log(`Unhandled: ${JSON.stringify(endpoint)}`);
});

testServer.on('ready', () => {
	console.log('fake server is up and running');
});

testServer.setHandlers(app => {
	// create a response handler, passing what is consider a 'valid payload'
	const somethingHandler = createHandler({ hello: 'world' });

	// set handlers for known endpoints, the express way
	app.get('/something', (_, res) => {
		
		// from the handler, allow a 30% of random errors (i.e. different payload, timeouts, etc)
		const { caseName, handler } = responseRandomizer(somethingHandler, .3);
		
		// printing the selected case from the randomizer
		console.log(`/something ${caseName}`);

		// execute the handler
		handler().then(r => {
			res.send(r); // if is a valid response return it
		}).catch(e => {
			res.status(500).send(e); // if the handler fails, return an error
		});
	});
});

testServer.start();
```

## Included handler responses

* Bad payload: Returns a simple string (`bad_payload`)
* Empty: Returns nothing
* Null: Returns null
* Slow: Returns a response in 100ms
* Error: Plain promise rejection with the text `err`
* Timeout: Returns a response in 1s
* Valid: Returns the valid payload as defined in the first argument of the `createHandler` function