function saveCSV() {
    //checkForErrors(front_table)
    let front_data = stringifyTable(front_table);
    let safe = checkForFrontErrors(front_data);


    let back_data = stringifyTable(back_table);
    safe = safe && checkForBackErrors(back_data);

    console.log("Validation returned: ", safe);

    //console.log(front_data);
    //console.log(back_data);

    if (safe) createReports(front_data, back_data);
}

function checkForBackErrors(data) {
    let csv = parseCSV(data);
    return validate_patrol([1,1], [2,1], csv) && validate_back_dates([0,36],csv);
}

function checkForFrontErrors(data) {
    let csv = parseCSV(data);
    return validate_front([1,0],csv);
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function loadCSV(loc = "nyamvu_back") {
    let data =  {
        style: getDataStyle(loc),
        content: getData(loc)
    }
    return data;
}

function parseCSV(csv) {
    let data = []
    let lines = csv.split("\n")
    for (let l of lines) {
        data.push(l.split(";"))
    }
    return data;
}

function stringifyCell(cell) {
    let bracketRegex = /\(.*\)/
    let s = ""

    let text = cell.innerText.trim().match(bracketRegex);

    if (cell.hasAttribute("colspan")) {
        for (let i = 0; i < cell.getAttribute("colspan")-1; i++) {
            s+=";";
        }
    }

    if (text != null) s+= text[0].slice(1,-1);
    else s+= cell.innerText;


    if (cell.firstElementChild) {
        if (cell.firstElementChild.nodeName == "INPUT") s += cell.firstElementChild.value;
    }

    

    s+=";";

    return s;
}

function stringifyTable(table) {
    let csv = ""
    let rows = table.children;

    for (let row of rows) {
        for (let cell of row.children) {

            csv += stringifyCell(cell);
        }
        csv = csv.slice(0,-1) +  "\n";
    }

    csv = csv.slice(0,-1);

    return csv;
}

function getDataStyle(loc) {
    switch (loc) {
        case "nyamvu_back":
            return nyamvuStyleBack();
        case "nyamvu_front":
            return nyamvuStyleFront();
    }
}

