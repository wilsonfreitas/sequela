var sequela = (function () {
    'use strict';

    function Table(id, cls) {
        var that = {},
            table = document.createElement('table'),
            createHeader = function (header) {
                var i = 0,
                    thead = document.createElement('thead'),
                    tr = thead.insertRow(0),
                    td = document.createElement('th');
                td.innerHTML = '#';
                // td.className = 'first-col-head';
                tr.appendChild(td);
                for (i = 0; i < header.length; i += 1) {
                    td = document.createElement('th');
                    td.innerHTML = header[i].toUpperCase();
                    tr.appendChild(td);
                }
                return thead;
            },
            createBody = function (rows) {
                var i, j, row, tr, td,
                    tbody = document.createElement('tbody');
                for (i = 0; i < rows.length; i += 1) {
                    row = rows[i];
                    tr = tbody.insertRow(tbody.rows.length);
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = i + 1;
                    // td.className = 'first-col-body';
                    for (j = 1; j < (row.length + 1); j += 1) {
                        td = tr.insertCell(tr.cells.length);
                        td.innerHTML = row[j - 1];
                    }
                }
                return tbody;
            };
        table.id = id;
        table.className = cls;
        that.addContent = function (qr) {
            table.appendChild(createHeader(qr.colnames));
            table.appendChild(createBody(qr.rows));
        };
        that.getElement = function () {
            return table;
        }
        return that;
    }


    function QueryResult(serverResult) {
        var i, that = {};
        that.query = serverResult.query;
        that.rows = serverResult.rows;
        that.colnames = null;
        that.error = serverResult.error;
        if (serverResult.description !== null) {
            that.colnames = [];
            for (i = 0; i < serverResult.description.length; i += 1) {
                that.colnames[that.colnames.length] = serverResult.description[i][0];
            }
        }
        return that;
    }

    var identity = function identity(x) {
        return x;
    }, createQueryResult = function createQueryResult(result) {
        return new QueryResult(result);
    };

    function Sequela(resultWraper) {
        resultWraper = resultWraper || identity;
        var that = {},
            wrapToQueryResult = function (callback) {
                return function (serverResult) {
                    callback(resultWraper(serverResult));
                };
            };
        that.execute = function (database, query, callback) {
            marajax.go({
                url: '/execute',
                params: { database: database, query: query },
                success: wrapToQueryResult(callback),
                output: 'json',
                post: true
            });
        };
        that.check = function (database, callback) {
            marajax.go({
                url: '/check',
                params: { database: database },
                success: callback,
                output: 'json'
            });
        };
        return that;
    }

    return {
        createSequela: function (qrFactory) {
            return new Sequela(qrFactory);
        },
        createQueryResult: createQueryResult,
        createTable: function (id, cls) {
            return new Table(id, cls);
        }
    };
}());
