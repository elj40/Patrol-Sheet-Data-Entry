function getCurrentPosition(e) {
	let col = e.parentElement;
	let row = col.parentElement;
	let table = row.parentElement;

	return {
			x: Array.prototype.indexOf.call(row.children, col),
		   y: Array.prototype.indexOf.call(table.children, row),
		   table: table
	}
}

function getElementByPos(p, table) {
	return table.children[p.y].children[p.x];	
}
