function loadCSV(loc = "nyamvu") {
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

function getDataStyle(loc) {
    switch (loc) {
        case "nyamvu":
            return nyamvuStyleBack();
    }
}

function getData(loc) {
    switch (loc) {
        case "nyamvu": 
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
             Khola (Sable);;;;;;;;;;;Kanga (Crested);;;;;;;;;;;;
            Chinkoma (Klipspringer);;;;;;;;;;;Kanga (Helmeted);;;;;;;;;;;;;
            Kafundo (Grysbuck);;;;;;;;;;;M'ng'omba;;;;;;;;;;;;;
            Sanje (S. monkey);;;;;;;;;;;;;;;;;;;;;;;;
            Kolwe (Baboon);;;;;;;;;;;;;;;;;;;;;;;;
            Cheta (V. monkey);;;;;;;;;;;;;;;Kandwe ;;;;;;;;;
            Mwena (Crocodile);;;;;;;;;;;;;;;Kaingo;;;;;;;;;
            Nungu (Porcupine);;;;;;;;;;;;;;;Kalamo;;;;;;;;;
            Ngulube (Bushpig);;;;;;;;;;;;;;;Nimbulu;;;;;;;;;
            Nkoka (Pangolin);;;;;;;;;;;;;;;Chimwi;;;;;;;;;
            ;;;;;;;;;;;;;;;Fungofungo;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;
            Wayenda kuti lero?;;;;;;"* Species not on the list must be added in the open space or placed under the ""off-interest"" section";;;;;;;;;;;;;;;;;;
            Date;;;;;;;;;;;;;;;;;;;;;;;;
            1;;;;;;;;;;;;;;;;;;;;;;;;
            2;;;;;;;;;;;;;;;;;;;;;;;;
            3;;;;;;;;;;;;;;;;;;;;;;;;
            4;;;;;;;;;;;;;;;;;;;;;;;;
            5;;;;;;;;;;;;;;;;;;;;;;;;
            6;;;;;;;;;;;;;;;;;;;;;;;;
            7;;;;;;;;;;;;;;;;;;;;;;;;`; break;
    }
}

function styleElement(el, style) {
    console.log(style);
    if ('content' in style) el.innerHTML = style.content;
    for (let key in style.style) {
        el.style[key] = style.style[key];
        console.log(key, el.style[style.style[key]]);
    }

    return el;
}