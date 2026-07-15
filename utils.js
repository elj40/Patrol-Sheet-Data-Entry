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

function getInputByPos(x, y, table)
{
    return getElementByPos({x,y},table).getElementsByTagName("input")[0];
}

function fillTestData()
{
    let fp = front_table;
    let bp = back_table;

    let first_date_input_el = front_table.getElementsByTagName("tr")[1]
        .getElementsByTagName("td")[1]
        .getElementsByTagName("input")[0];
    first_date_input_el.value = "11/11/1111";
    updateDates(first_date_input_el);

    let rows = [1,4,6,8,9,10,11]
    let cell_blocks = ['a','b','d','e','f','g','h'].map((c) => c + '1')

    console.assert(rows.length == cell_blocks.length, "rows.length == cell_blocks.length");

    for (let i = 0; i < rows.length; i++)
    {
        getInputByPos(1,rows[i],back_table).value = cell_blocks[i];
        getInputByPos(2,rows[i],back_table).value = 1 + i;

        getInputByPos(1 + i, 34, back_table).value = cell_blocks[i];
    }
}
