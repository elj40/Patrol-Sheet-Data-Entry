
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

    species.push(getSpecieData(parseArea(bp,1,27,50,1)));  //serval

    species.push(getSpecieData(parseArea(bp,17,24,50,1)));  //jackal
    species.push(getSpecieData(parseArea(bp,17,25,50,1)));  //nimbulu
    species.push(getSpecieData(parseArea(bp,17,26,50,1)));  //chimwi
    species.push(getSpecieData(parseArea(bp,17,27,50,1)));  //fungofungo
    
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

function getSpeciePositions(table, limit=28) {
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
        const patrol = parseArea(bp,1,31+i,50,1);
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
            throw err;
        }
        

        
        cx++;
    }
}