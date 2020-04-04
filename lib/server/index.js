const express = require('express');
const Events = require('events');

class Server extends Events {
	constructor(port = 3001) {
		super();
		this.port = port;
		this.app = express();
		this.app.use(express.json());
	}

	setHandlers(handler) {
		handler(this.app);
	}

	start() {
		this.app.all('*', (req, res) => {
			
			this.emit('unhandled_endpoint', {
				method: req.method,
				url: req.url,
				headers: req.headers,
				body: res.body || null,
			});

			res.status(404).send('not found');
		});

		this.app.listen(this.port, (err) => {
			if (err) {
				this.emit('error', err);
				return;
			}
			this.emit('ready', {});
		});
	}
}

exports.Server = Server;