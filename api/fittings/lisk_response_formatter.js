/*
 * Copyright © 2018 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

'use strict';

var debug = require('debug')('swagger:lisk:response_formatter');
var _ = require('lodash');

/**
 * Description of the function.
 *
 * @func create_response_formatter
 * @memberof api/fittings
 * @requires debug
 * @requires lodash
 * @param {Object} fittingDef - Description of the param
 * @param {Object} bagpipes - Description of the param
 * @returns {function} {@link api/fittings.lisk_response_formatter}
 * @todo: Add description of the function and its parameters
 */
module.exports = function create() {
	/**
	 * Description of the function.
	 *
	 * @func lisk_response_formatter
	 * @memberof api/fittings
	 * @param {Object} context - Description of the param
	 * @param {function} next - Description of the param
	 * @todo: Add description of the function and its parameters
	 */
	return function lisk_response_formatter(context, next) {
		debug('exec');
		debug('received data:', context.input);

		if (_.isEmpty(context.input)) {
			context.headers = { 'content-type': 'application/json' };
			next(null, {});
			return;
		}

		var output = {};

		if (_.isArray(context.input)) {
			output = {
				meta: {},
				data: context.input,
				links: {},
			};
		} else if (_.isObject(context.input)) {
			if (Object.keys(context.input).sort() === ['data', 'links', 'meta']) {
				output = context.input;
			} else {
				output = {
					meta: context.input.meta || {},
					data: context.input.data || context.input,
					links: context.input.links || {},
				};
			}
		}

		debug("setting headers: 'content-type': 'application/json'");

		context.headers = { 'content-type': 'application/json' };
		next(null, output);
	};
};
