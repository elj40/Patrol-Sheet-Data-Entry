const gridRegex = /[a-zA-Z][0-9][0-9]/;
const countRegex = /\d{1,}/;
const dateRegex = /[0-3][0-9]-[0-1][0-9]-[0-9]{4}/;

console.log("Rules are here")
function validate_patrol(p, c, table) {
    if (c[1]>=34) return;
    let prev = table[p[1]][p[0]].toUpperCase().trim();
    let current = table[c[1]][c[0]].toUpperCase().trim();
    let cpos = c.toString();
     if (prev.match(gridRegex)) {
        if (!current.match(countRegex)) {
            alert(current + " found\n" + "Count expected at " + cpos);
            return;
        }
    }
    else if (prev.match(countRegex)) {
        if (current != "X"&&current.length!=0&&!current.match(gridRegex)) {
            alert(current + " found\n"+"x or empty expected at "+ cpos);
            return;
        }
    }else if (prev == "X")  {
        if (current != "X"&&!current.match(gridRegex)&&current.length!=0) {
            alert(current+ " found\n"+"Gridspace or empty expected at " + cpos);
            return;
        }
    }

    if (c[0] == table[c[1]].length-1) validate_patrol([c[0],c[1]],[1,c[1]+1],table);
    else validate_patrol([c[0],c[1]],[c[0]+1,c[1]],table);
}

function validate_back_dates(c, table, tableEl) {
    try {
    if (c[1]>=table.length) return;

    let current = table[c[1]][c[0]].toUpperCase().trim(); 
    let cpos = c.toString();

    //console.log(current, cpos, current.length);
    if (c[0]==0) {
        if (!current.match(dateRegex)&&!current.length==0) {
            alert(current + " found\n" + "Expected dd-mm-yyyy at " + cpos);
            return;
        }
    }else {
        let prev = table[c[1]-1][c[0]].toUpperCase().trim();
        if (prev.length==0&&current.length>0) {
            alert("Empty space found before " + cpos + "\nPlease enter a value");
            tableEl.children[c[1]].children[c[0]].firstChildElement.focus();
            return;
        }
        if (!current.match(gridRegex)&&current.length>0) {
            alert("Incorrect value at " + cpos + "\nIf no patrol, leave empty");
            return;
        }
    }

    if (c[0] == table[0].length-1) validate_back_dates([0,c[1]+1],table,tableEl);
    else validate_back_dates([c[0]+1,c[1]],table,tableEl);

}
catch(err) {
    console.log(c);
    throw err;
}

}