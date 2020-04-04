exports.handlers = function(goodPayload, options = { timeout: 1000 }) {
	return {
		cases: {
			bad_payload: () => {
				return new Promise((resolve) => {
					resolve('bad_payload');
				});
			},
			empty: () => {
				return new Promise((resolve) => {
					resolve('bad_payload');
				});
			},
			is_null: () => {
				return new Promise((resolve) => {
					resolve(null);
				});
			},
			slow: () => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(goodPayload);
					}, 100);
				});
			},
			err: () => {
				return new Promise((_, reject) => {
					reject('err');
				});
			},
			timeout: () => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(goodPayload);
					}, options.timeout);
				});
			},
			valid: () => {
				return new Promise((resolve) => {
					resolve(goodPayload);
				});
			}
		},
		casesDesc: ['valid', 'slow', 'err', 'bad_payload', 'timeout', 'is_null', 'empty']
	}
}

function random(min=0, max) {
	return Math.floor(Math.random() * max);
}

exports.pickRandomHandler = function(handlers, successRate = .9) {
	if (successRate < 0 || successRate > 1) {
		successRate = .9;
	}
	const shouldSucceed = Math.random();
	const responseCase = (shouldSucceed < successRate) ? 0 : random(0, handlers.casesDesc.length-1);
	const caseName = handlers.casesDesc[responseCase];
	const handler = handlers.cases[caseName];
	return {
		caseName,
		handler,
	}
}