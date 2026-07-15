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

    getInputByPos(1,1,back_table).value = "a1";
    getInputByPos(2,1,back_table).value = "1";

    getInputByPos(1,4,back_table).value = "b1";
    getInputByPos(2,4,back_table).value = "2";

    getInputByPos(1,6,back_table).value = "c1";
    getInputByPos(2,6,back_table).value = "3";

    getInputByPos(1,8,back_table).value = "d1";
    getInputByPos(2,8,back_table).value = "4";

    getInputByPos(1,9,back_table).value = "e1";
    getInputByPos(2,9,back_table).value = "5";

    getInputByPos(1,10,back_table).value = "f1";
    getInputByPos(2,10,back_table).value = "6";

    getInputByPos(1,11,back_table).value = "g1";
    getInputByPos(2,11,back_table).value = "7";
}
