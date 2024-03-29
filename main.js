const back_table = document.getElementById("back");
const front_table = document.getElementById("front");

const save_btn = document.getElementById("save");
const new_btn = document.getElementById("new");

window.onload = ()=>{setup()}

function setup() {
    console.log("Running")
    createNewSheet();

    back_table.addEventListener("keydown", arrowTraverse);
    front_table.addEventListener("keydown", arrowTraverse);

    save_btn.addEventListener("click", saveCSV);
    new_btn.addEventListener("click", createNewSheet);
}

function createNewSheet() {
    back_table.innerHTML = ""
    front_table.innerHTML = ""

    let data = NYA_BACK_CSV;
    let parsed_data = parseCSV(data);
    createTable(back_table, parsed_data, NYA_BACK_STYLE);

    data = NYA_FRONT_CSV;
    parsed_data = parseCSV(data);
    createTable(front_table,parsed_data, NYA_FRONT_STYLE);
}

function createTable(table,data,style) {
    let textRegex = /\w{3,}/;

    let r=0,c=0;
    for (let row of data) {
        let tr = document.createElement("tr");
        for (let col of row) {
            let td = document.createElement("td");

            if (col.length > 0) td.innerHTML = col;
            //else td.innerHTML = '<input type="text"class="cell-input" placeholder="'+c.toString()+'_'+r.toString()+'">'
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



 
function updateDates(el) {
	let pos = getCurrentPosition(el)
	let line = pos.table.children[pos.y].children
	let date = el.value
	for (let i = pos.x; i<line.length; i++) {
		let a = i-pos.x 
		
		let [ month, day, year ] = date.split('/').map((x)=>parseInt(x))

		if (day>31) {month++; day=1}
		if (day<10) day="0"+day
		if (month<10) month="0"+month
		new_date = month+'/'+day+'/'+year

		front_table.children[pos.y].children[i].firstChild.value=new_date
		back_table.children[35+i].children[0].innerHTML= new_date
		day++	
		date = month+'/'+day+'/'+year

	}
}


function styleElement(el, style) {
    if ('content' in style) el.innerHTML = style.content;
    if ("attributes" in style) {
        for (let key in style.attributes) {
            el.setAttribute(key, style.attributes[key]);
        }
    }
    for (let key in style.style) {
        el.style[key] = style.style[key];
    }
}
