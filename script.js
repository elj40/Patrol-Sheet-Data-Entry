const back_table = document.getElementById("back");
const front_table = document.getElementById("front");

window.onload = ()=>{setup()}

function setup() {
    console.log("Running")
    let data = loadCSV();
    let parsed_data = parseCSV(data.content);
    createTable(back_table, parsed_data, data.style);

    data = loadCSV("nyamvu_front");
    parsed_data = parseCSV(data.content);
    createTable(front_table,parsed_data, data.style);

    back_table.addEventListener("keydown", arrowTraverse);
    front_table.addEventListener("keydown", arrowTraverse);
}

function createTable(table,data,style) {
    let r=0,c=0;
    for (let row of data) {
        let tr = document.createElement("tr");
        for (let col of row) {
            let td = document.createElement("td");

            if (col.length > 0) td.innerHTML = col;
            else td.innerHTML = '<input type="text"class="cell-input">'

            //Style td
            if (r in style.rows) styleElement(td, style.rows[r]);
            if (c in style.cols) styleElement(td, style.cols[c]);
            if ((c.toString()+"_"+r.toString()) in style.cells) styleElement(td, style.cells[(c.toString()+"_"+r.toString())]);

            tr.appendChild(td);
            c++;
        }
        table.appendChild(tr);
        r++;c=0;
    }

}


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

function arrowTraverse(e) {

    if (e.keyCode>=37&&e.keyCode<=40||e.keyCode==13) {
        let current = getCurrentPosition(document.activeElement);

        let next = {x: current.x, y: current.y}
        if (e.keyCode==37) next.x--;    //left
        if (e.keyCode==38) next.y--;    //top
        if (e.keyCode==39||e.keyCode==13) next.x++;    //right
        if (e.keyCode==40) next.y++;    //down


        //move focus to next cell
        try {current.table.children[next.y].children[next.x].firstChild.focus();}
        catch (TypeError) {}

    }

}

