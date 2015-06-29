iTable
======

Improved tables

Usage
-----

```javascript
$('.my-table').iTable();
```

Options
-------

### namespace

Used for prefixing classes, default _itable_

```javascript
$('.my-table').iTable({ namespace: 'custom-table' });
```

### matcher

A callback function to filter the table

```javascript
$('.my-table').iTable({
	matcher: function (query, candidate) {
		return candidate.indexOf(query) > -1;
	}
});
```

### sortable

Defines which columns are sortable, default _true_

```javascript
// sort all columns
$('.my-table-1').iTable({ sortable: true });

// disable sorting
$('.my-table-1').iTable({ sortable: false });

// only sort first column
$('.my-table-1').iTable({ sortable: [0] });
```

#### Global options

Override options globally by modifying the _$.iTableDefaults_ object

```javascript
$.iTableDefaults.namespace = 'the-table';
```

Data attributes
---------------

| Element | Attribute | Description |
|---------|-----------|-------------|
| td | data-search | Specifies a different search value for the column |
| td | data-sort | Specifies a different sorting value for the column |

Methods
-------

### append(columns)

Add a row to the end of the table

```javascript
$('.my-table').iTable().append([1, 'Marco']);
```

### prepend(columns)

Add a row to the beginning of the table

```javascript
$('.my-table').iTable().prepend([2, 'Omar']);
```

### row(index)

Return a specific row, zero-indexed

```javascript
$('.my-table').iTable().row(0).addClass('me');
```

### rows()

Return all rows

```javascript
$('.my-table').iTable().rows().click(function () {
	// @TODO implement click handler
});
```

### empty()

Remove all rows in the table

```javascript
$('.my-table').iTable().empty();
```

### search(query)

Filter the table rows

```javascript
$('.my-table').iTable().search('marco');
```

### sort(column, direction)

Sort rows by specific column and direction, zero-indexed

```javascript
$('.my-table').iTable().sort(0, 'asc');
```

### sort()

Return current sort

```javascript
$('.my-table').iTable().sort().index; // 0
$('.my-table').iTable().sort().direction; // asc
```

### size()

Return the quantity of rows in the table

```javascript
$('.my-table').iTable().size();
```

#### Accessing iTable instances

Call _.iTable()_ as many times as you want, it's going to be instantiated only once.

Theming
-------

The plugin add some useful classes for styling. Check _theme.css_ for an example.