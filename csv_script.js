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
    let s = ""

    s += cell.innerText;

    for (let child in cell.children) {
        if (child.nodeName == "INPUT") {
            s+=child.valueOf;
        }
    }

    if (cell.hasAttribute("colspan")) {
        for (let i = 0; i < cell.getAttribute("colspan"); i++) {
            s+=";";
        }
    }

    s+=";";
}

function stringifyTable(table) {
    let csv = ""
    let rows = table.children;

    for (let row of rows) {
        for (let cell of row) {

            csv += stringifyCell(cell);
        }
        csv[csv.length-1] = "\n";
    }
}

function getDataStyle(loc) {
    switch (loc) {
        case "nyamvu_back":
            return nyamvuStyleBack();
        case "nyamvu_front":
            return nyamvuStyleFront();
    }
}

function getData(loc) {
    switch (loc) {
        case "nyamvu_back": 
            return `Species;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M
            ;;;;;;;;;;;;;;;;;;;;;;;;
            Mpala (Impala);;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;
            Mphuluphulu (Kudu);;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;
            Njovu (Elephant);;;;;;;;;;;;;;;;;;;;;;;;
            Mvuu (Hippo);;;;;;;;;;;;;;;;;;;;;;;;
            Njati (Buffalo);;;;;;;;;;;;;;;;;;;;;;;;
            Chuzu (Waterbuck);;;;;;;;;;;;;;;;;;;;;;;;
            Chiloko (Roan);;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;
            Nyamalikiti (Giraffe);;;;;;;;;;;;;;;;;;;;;;;;
            Munjili  (Warthog);;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;
            Mbizi (Zebra);;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;
            Nkhwani (Bushbuck);;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;
            Nseula (Puku);;;;;;;;;;;;;;;;;;;;;;;;
            Numbu (Wildebeest);;;;;;;;;;;;;;;;;;;;;;;;
            Insha (Duiker);;;;;;;;;;;;;;;;;;;;;;;;
             Khola (Sable);;;;;;;;;;;Kanga (Crested);;;;;;;;;;
            Chinkoma (Klipspringer);;;;;;;;;;;Kanga (Helmeted);;;;;;;;;;;
            Kafundo (Grysbuck);;;;;;;;;;;M'ng'omba;;;;;;;;;;;
            Sanje (S. monkey);;;;;;;;;;;;;;;;;;;;;;;;
            Kolwe (Baboon);;;;;;;;;;;;;;;;;;;;;;;;
            Cheta (V. monkey);;;;;;;;;;;;;;;Kandwe ;;;;;;;
            Mwena (Crocodile);;;;;;;;;;;;;;;Kaingo;;;;;;;
            Nungu (Porcupine);;;;;;;;;;;;;;;Kalamo;;;;;;;
            Ngulube (Bushpig);;;;;;;;;;;;;;;Nimbulu;;;;;;;
            Nkoka (Pangolin);;;;;;;;;;;;;;;Chimwi;;;;;;;
            ;;;;;;;;;;;;;;;Fungofungo;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;
            Wayenda kuti lero?;* Species not on the list must be added in the open space or placed under the "off-interest" section
            Date;;;;;;;;;;;;;;;;;;;;;;;;
            <input type="text"class="cell-input" placeholder="1 dd-mm-yyyy">;;;;;;;;;;;;;;;;;;;;;;;;
            <input type="text"class="cell-input" placeholder="2 dd-mm-yyyy">;;;;;;;;;;;;;;;;;;;;;;;;
            <input type="text"class="cell-input" placeholder="3 dd-mm-yyyy">;;;;;;;;;;;;;;;;;;;;;;;;
            <input type="text"class="cell-input" placeholder="4 dd-mm-yyyy">;;;;;;;;;;;;;;;;;;;;;;;;
            <input type="text"class="cell-input" placeholder="5 dd-mm-yyyy">;;;;;;;;;;;;;;;;;;;;;;;;
            <input type="text"class="cell-input" placeholder="6 dd-mm-yyyy">;;;;;;;;;;;;;;;;;;;;;;;;
            <input type="text"class="cell-input" placeholder="7 dd-mm-yyyy">;;;;;;;;;;;;;;;;;;;;;;;;`; break;
        
        case "nyamvu_front":
            return `Call sign:;;Name:;;Sheet no.;
            Date;;;;;;
            Scout names;;;;;;
            ;;;;;;
            ;;;;;;
            ;;;;;;
            ;;;;;;
            ;;;;;;
            M'vula?;<input type="text"class="cell-input">mm;<input type="text"class="cell-input">mm;<input type="text"class="cell-input">mm;<input type="text"class="cell-input">mm;<input type="text"class="cell-input">mm;<input type="text"class="cell-input">mm
            Incident Report No.?;;;;;;
            Nyama zina?;;;;;;
            ;;;;;;
            ;;;;;;
            Nyama yafa?;;;;;;
            ;;;;;;
            ;;;;;;
            `
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