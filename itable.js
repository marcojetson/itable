(function ($) {

$.iTableDefaults = {
    matcher: function (query, candidate) {
        return candidate.toLowerCase().indexOf(query.toLowerCase()) === 0;
    },
    namespace: 'itable',
    sortable: true
};

$.fn.iTable = function (options) {
    options = $.extend($.iTableDefaults, options);

    var namespace = function (string) {
        return options.namespace + '-' + string;
    };

    var parseValue = function (value) {
        var matches = value.replace(',', '.').match(/(\+|-)?((\d+(\.\d+)?)|(\.\d+))/);
        return matches && parseFloat(matches[0]) || value;
    };

    var Table = {
        search: function (table, query) {
            var rows = Row.get(table);

            rows.show();
            if (typeof query !== 'undefined') {
                rows.each(function (i, row) {
                    var row = $(row),
                        match = false;

                    row.children('td').each(function (i, td) {
                        var td = $(td),
                            value = td.data('search') || td.text();

                        match = options.matcher(query, value);
                        return !match;
                    });

                    if (!match) {
                        row.hide();
                    }
                });
            }
        },
        sort: function (table, index, direction) {
            var headers = table.find('> thead > tr > th'),
                rows = Row.get(table);

            headers.removeClass(namespace('sort-asc') + ' ' + namespace('sort-desc'));
            headers.eq(index).addClass(namespace('sort-' + direction));

            rows.sort(function (row1, row2) {
                var row1 = $(row1).children().eq(index),
                    row2 = $(row2).children().eq(index),
                    value1 = parseValue(row1.data('sort') || row1.text()),
                    value2 = parseValue(row2.data('sort') || row2.text()),
                    result;

                if (value1 > value2) {
                    result = 1;
                } else if(value1 < value2) {
                    result = -1;
                } else {
                    result = 0;
                }

                if (direction === 'desc') {
                    result *= -1;
                }

                return result;
            });

            table.data('sort', {
                index: index,
                direction: direction
            });

            rows.detach().appendTo(table.children('tbody'));
        }
    };

    var Row = {
        build: function (columns) {
            var row = '<tr>';
            $.each(columns, function (i, column) {
                row += '<td>' + column + '</td>';
            });
            row += '</tr>';

            return row;
        },
        get: function (table) {
            return table.find('> tbody > tr');
        }
    };

    var sortable = function (table, options) {
        var headers = table.find('thead > tr > th');

        if ($.isArray(options)) {
            headers = headers.filter(function (index) {
                return $.inArray(index, options) !== -1;
            });
        }

        headers.addClass(namespace('sort'));
        headers.append('<i></i>');

        headers.on('click', function () {
            var header = $(this),
                index = header.parent().children().index(this),
                sort = table.data('sort') || {};

            if (!sort.direction || sort.direction === 'desc') {
                sort.direction = 'asc';
            } else {
                sort.direction = 'desc';
            }

            if (sort.index !== index) {
                sort.index = index;
                sort.direction = 'asc';
            }

            Table.sort(table, sort.index, sort.direction);
        });
    };

    var tables = this.each(function () {
        var table = $(this),
            key = namespace('instance');

        if (table.data(key) !== undefined) {
            options = table.data(key);
            return table;
        }

        table.addClass(options.namespace);
        options.sortable && sortable(table, options.sortable);

        table.data(key, options);
    });

    return {
        append: function (columns) {
            tables.append(Row.build(columns));
        },
        prepend: function (columns) {
            tables.prepend(Row.build(columns));
        },
        row: function (index) {
            return Row.get(tables).eq(index);
        },
        rows: function () {
            return Row.get(tables);
        },
        empty: function () {
            Row.get(tables).remove();
        },
        search: function (query) {
            $.each(tables, function (i, table) {
                Table.search($(table), query);
            });
        },
        sort: function (index, direction) {
            if (typeof index === 'undefined' && typeof direction === 'undefined') {
                return tables.data('sort');
            }

            $.each(tables, function (i, table) {
                Table.sort($(table), index, direction);
            });
        },
        size: function () {
            return Row.get(tables).length;
        }
    };
};

})(jQuery);