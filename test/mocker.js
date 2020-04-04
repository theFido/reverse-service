const Server = require('..').Server;
const createHandler = require('..').Handler;
const responseRandomizer = require('..').responseRandomizer;

const fakeServer = new Server(3000);

fakeServer.on('error', (err) => {
	console.error(err);
});

fakeServer.on('unhandled_endpoint', endpoint => {
	console.log(`Unhandled: ${JSON.stringify(endpoint)}`);
});

fakeServer.on('ready', () => {
	console.log('fake server is up and running');
});

fakeServer.setHandlers(app => {
	const somethingHandler = createHandler({ hello: 'world' });
	app.get('/something', (_, res) => {
		const { caseName, handler } = responseRandomizer(somethingHandler, .3);
		console.log(`/something ${caseName}`);
		handler().then(r => {
			res.send(r);
		}).catch(e => {
			res.status(500).send(e);
		});
	});
});

fakeServer.start();