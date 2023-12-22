const front_csv = `Call sign:;bravo charlie;Name:;buffalo camp;Sheet no.;four-4;;
Date;08/22/2023;08/23/2023;08/24/2023;08/25/2023;08/26/2023;08/27/2023;08/28/2023
Scout 1;li;lg;lh;lt;lw;le;ll
Scout 2;;;;;;;
Scout 3;;;;;;;
Scout 4;;;;;;;
Scout 5;;;;;;;
Scout 6;;;;;;;
M'vula?;mm-;mm-;mm-;mm-;mm-;mm-;mm-
Incident Report No.;x;x;no patrol;x;x;x;NO PATROL
Nyama zina?;x;x;NO PATROL;x;x;x;NO PATROL
;;;;;;;
;;;;;;;
Nyama yafa?;x;x;NO PATROL;x;x;one bushbuck;NO PATROL
;;;;;;h27;
;;;;;;cause leopard;`

const back_csv = `Species;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M
Impala;h27;2;h25;7;x;x;i27;9;x;x;x;x;h27;15;f26;18;x;x;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;
Kudu;x;x;h28;3;j29;5;j31;2;x;x;h28;1;x;x;d27;2;x;x;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;
Elephant;x;x;x;x;h28;11;x;x;f26;7;e28;17;x;x;;;;;;;;;;
Hippo;x;x;x;x;x;x;x;x;;;;;;;;;;;;;;;;
Buffalo;x;x;x;x;x;x;x;x;;;;;;;;;;;;;;;;
Waterbuck;x;x;x;x;x;x;x;x;;;;;;;;;;;;;;;;
Roan;x;x;x;x;x;x;x;x;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;
Giraffe;x;x;x;x;x;x;d27;4;x;x;g27;5;;;;;;;;;;;;
Warthog;h26;1;x;x;x;x;x;x;h27;1;x;x;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;
Zebra;x;x;x;x;x;x;x;x;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;
Bushbuck;x;x;i28;2;j31;1;k30;2;x;x;h28;3;x;x;g26;2;g26;1;f27;3;c27;1;x;x
;h28;1;x;x;x;x;x;x;x;x;;;;;;;;;;;;;;
Puku;x;x;x;x;x;x;x;x;x;x;;;;;;;;;;;;;;
Wildebeest;x;x;x;x;x;x;x;x;x;x;;;;;;;;;;;;;;
Duiker;x;x;k30;1;x;x;x;x;x;x;;;;;;;;;;;;;;
Sable;x;x;x;x;x;x;x;x;;;Crested;h27;18;x;x;x;x;x;x;x;x;;;
Klipspringer;x;x;j28;2;x;x;x;x;;;Helmeted;;;;;;;;;;;;;
Grysbuck;i26;1;x;x;x;x;x;x;;;M'ng'omba;x;x;x;x;h28;5;x;x;x;x;;;
S. monkey;x;x;x;x;x;x;h27;11;x;x;;;;;;;;;;;;;;
Baboon;h25;1;x;x;i28;1;x;x;h28;1;x;x;b27;1;x;x;h28;1;;;;;;
V. monkey;x;x;x;x;x;x;x;x;;;;;;;Kandwe;;;;;;;;;
Crocodile;x;x;x;x;x;x;x;x;;;;;;;Kaingo;;;;;;;;;
Porcupine;x;x;x;x;x;x;x;x;;;;;;;Kalamo;g26;1;;;;;;;;;
Bushpig;x;x;x;x;x;x;x;x;;;;;;;Nimbulu;;;;;;;;;
Pangolin;f12;1;x;x;x;x;x;x;;;;;;;Chimwi;;;;;;;;;
Hartebeest;g34;2;x;x;x;x;x;x;;;;;;;Fungofungo;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;
Wayenda kuti lero?;* Species not on the list must be added in the open space or placed under the "off-interest" section;;;;;;;;;;;;;;;;;;;;;;;
Date;;;;;;;;;;;;;;;;;;;;;;;;
08/22/2023;h27;h26;h25;h25;i26;h27;;;;;;;;;;;;;;;;;;
08/23/2023;h28;i28;i28;j29;j30;j31;k30;j28;i27;h28;;;;;;;;;;;;;;
08/24/2023;;;;;;;;;;;;;;;;;;;;;;;;
08/25/2023;h28;h28;h28;h28;h28;;;;;;;;;;;;;;;;;;;
08/26/2023;h27;h27;h27;g26;g26;f27;f26;d27;d27;c27;b27;c27;e28;g26;h27;;;;;;;;;
08/27/2023;h28;h28;h27;g27;;;;;;;;;;;;;;;;;;;;
08/28/2023;;;;;;;;;;;;;;;;;;;;;;;;`;


let report_data = {};

function createReports(front,back) {

    const front_p = parseCSV(front);
    const back_p = parseCSV(back);

    report_data.call_sign = front_p[0][1];
    report_data.person = front_p[0][3];
    report_data.sheet_id = front_p[0][7];
    report_data.date = front_p[1][1];
    const animal = createAnimalReport(front_p,back_p);
    const patrol = createPatrolReport(front_p,back_p);
    const carcass = createYafaReport(front_p);

    download(animal, report_data.sheet_id+"_animal.csv", "text/plain");
    download(patrol, report_data.sheet_id+"_patrol.csv", "text/plain");
    download(carcass, report_data.sheet_id+"_carcass.csv", "text/plain");

}
//Sheet_ID, Call_Sign, Person, Department-, ReportDate, GridCode,Species, Quantity, Status(default:Sighting)
function createAnimalReport(fp,bp) {
    let csv = "Sheet_ID;Call_Sign;Person;Department;ReportDate;GridCode;Species;Quantity;Status\n"
    
    let animal_data = getAnimalData(fp,bp);
    
    for (let day of animal_data.sightings) {

        for (let i = 0; i < day.length; i++) {
            for (let sighting of day[i]) {
                
                csv += report_data.sheet_id + ";";
                csv += report_data.call_sign + ";";
                csv += report_data.person + ";";
                csv += ";";
                csv += animal_data.dates[i] + ";";
                csv += sighting.cell + ";";
                csv += sighting.species + ";";
                csv += sighting.count + ";";
                csv += "Sighting;";
                csv += "\n";
            }
        }
    }

    return csv;
}

function getAnimalData(fp,bp) {
    let spots = getSpeciePositions(bp);
    let dates = parseArea(fp,1,1,12,1).data;
    let species = [];

    for (let i =0; i < spots.length-1; i++) {

        const specie = parseArea(bp,1,spots[i],50,spots[i+1]-spots[i]);
        const info = getSpecieData(specie);

        species.push(info);
    }

    species.push(getSpecieData(parseArea(bp,1,32,50,1)));  //hartebeest

    species.push(getSpecieData(parseArea(bp,19,22,50,1)));  //crested
    species.push(getSpecieData(parseArea(bp,17,23,50,1)));  //helmeted
    species.push(getSpecieData(parseArea(bp,17,24,50,1)));  //mngomba
    
    species.push(getSpecieData(parseArea(bp,23,27,50,1)));  //kandwe
    species.push(getSpecieData(parseArea(bp,23,28,50,1)));  //kaingo
    species.push(getSpecieData(parseArea(bp,23,29,50,1)));  //kalamo
    species.push(getSpecieData(parseArea(bp,23,30,50,1)));  //nimbulu
    species.push(getSpecieData(parseArea(bp,23,31,50,1)));  //chimwi
    species.push(getSpecieData(parseArea(bp,23,32,50,1)));  //fungofungo
    
    return {dates: dates, sightings: species};
}

function getSpecieData(specie) {
    let data = [[]];
    let d_index = 0;
    for (let i=0; i<specie.data.length; i+=2) {
        let cell = specie.data[i].toUpperCase().trim();
        let next = specie.data[i+1].toUpperCase().trim();

        if (cell.length == 0||cell.match(wordRegex)||next.match(wordRegex)) break;

        if (cell.match(gridRegex)) {
            data[d_index].push({
                species: specie.name,
                cell: cell,
                count: next,
            })
        }

        if (cell == "X") {
            data.push([]);
            d_index++;
        }
    }

    return data;
}

function getSpeciePositions(table, limit=34) {
    let pos = [];
    //console.log(table);
    for (let i = 1; i<limit;i++){
        if (table[i][0].match(wordRegex)) pos.push(i);
    }

    return pos;
}

//SheetIID, Call_Sign, patrolDate, numGridBlock(1), gridCode, patrolType(Foot patrol), Scout1, Scout2, Scout3, Scout4, Scout5, Scout6
function createPatrolReport(fp,bp) {
    csv = "Sheet_ID;Call_Sign;patrolDate;numGridBlock;gridCode;patrolType;Scout1;Scout2;Scout3;Scout4;Scout5;Scout6"
    csv+="\n";
    for (let i = 0; i<7; i++) {
        const patrol = parseArea(bp,1,36+i,50,1);
        if (patrol.data[0].trim() == "") continue;

        const which_scouts = parseArea(fp,1+i,1,1,7);
        for (let cell of patrol.data) {
            if (cell.trim()=="") continue;
            csv+=report_data.sheet_id+";"  //Sheet_Id
            csv+=report_data.call_sign+";" //Call_Sign
            csv+=patrol.name+";"    //patrol_date
            csv+= "1;"              //numGridBlock
            csv+=cell+";"           //gridcode
            csv+="Foot Patrol;"     //patrolType
            which_scouts.data.forEach((scout)=>{
                csv += scout+";"    //Scouts 1-6
            })
            csv+="\n";               //New line
        }

        
    }
    return csv;
}

function createYafaReport(fp) {
    let csv = ""
    
    for (let i=0;i < fp[0].length; i++) csv += fp[1][i] + ";";
    csv += "\n";

    for (let j=10;j<16;j++) {
        for (let i=0;i < fp[0].length; i++) csv += fp[j][i] + ";";
        csv += "\n";
    }
    return csv;
}


function parseArea(table, x,y, sx, sy) {
    let data = {name: "", data:[]}
    data.name = table[y][x-1];
    if (sy>sx) data.name = table[y][x];
    let cx = x, cy =y;

    while (true) {
        if (cx >= table[cy].length || cx >= x+sx-1) {
            cx = x;
            cy++;
        }
        if (cy >= y+sy) return data;

        try {data.data.push(table[cy][cx]);}
        catch (err) {
            console.log(`Error on parsing: ${cx}, ${cy}`, table[cy][cx]);
            alert(`Error on parsing: ${cx}, ${cy}`, table[cy][cx]);
            throw err;
        }
        

        
        cx++;
    }
}
