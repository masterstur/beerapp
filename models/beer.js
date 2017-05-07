'use strict';

module.exports = function(sql, types) {
    let beer = sql.define('beer', {
        name: types.TEXT,
        abv: types.DECIMAL(4,2),
        style: types.TEXT,
        brewery: types.TEXT,
        rating: types.DECIMAL(4,2)
    });

    return beer;
};