let report_data = {};

function createReports(front,back) {

    const front_p = parseCSV(front);
    const back_p = parseCSV(back);

    console.log(front_p)

    report_data.call_sign = front_p[0][1];
    report_data.person = front_p[0][3];
    report_data.sheet_id = front_p[0][7];
    report_data.date = front_p[1][1];

    //const animal = createAnimalReport(front_p,back_p);
    //const patrol = createPatrolReport(front_p,back_p);
	const weather = createWeatherReport(front_p);
	const interest = createInterestReport(front_p);
	const carcass = createCarcassReport(front_p);
	
	console.log(weather);
	console.log(interest);
	console.log(carcass);
	
	if (!debug_mode) {
			download(animal, report_data.sheet_id+"_animal.csv", "text/plain");
			download(patrol, report_data.sheet_id+"_patrol.csv", "text/plain");
			download(weather, report_data.sheet_id+"_weather.csv", "text/plain");
			download(interest, report_data.sheet_id+"_interst.csv", "text/plain");
			download(carcass, report_data.sheet_id+"_carcass.csv", "text/plain");
	}

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
	//CONSTANTS!
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
//CONSTANTS!
function getSpeciePositions(table, limit=34) {
    let pos = [];
    //console.log(table);
    for (let i = 1; i<limit;i++){
        if (table[i][0].match(wordRegex)) pos.push(i);
    }

    return pos;
}

//SheetID, Call_Sign, patrolDate, numGridBlock(1), gridCode, patrolType(Foot patrol), Scout1, Scout2, Scout3, Scout4, Scout5, Scout6
function createPatrolReport(fp,bp) {
    csv = "Sheet_ID;Call_Sign;patrolDate;numGridBlock;gridCode;patrolType;Scout1;Scout2;Scout3;Scout4;Scout5;Scout6"
    csv+="\n";
    for (let i = 0; i<7; i++) {
        const patrol = parseArea(bp,1,36+i,50,1); //CONSTANTS!
        if (patrol.data[0].trim() == "") continue;

        for (let cell of patrol.data) {
            if (cell.trim()=="") continue;
            csv+=report_data.sheet_id+";"  //Sheet_Id
            csv+=report_data.call_sign+";" //Call_Sign
            csv+=patrol.name+";"    //patrol_date
            csv+= "1;"              //numGridBlock
            csv+=cell+";"           //gridcode
            csv+="Foot Patrol;"     //patrolType
			csv+= report_data.person + ';'; //Main Scout (only one for sango)
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

function createWeatherReport(fp) {
	const conditions = ["Clear", "Quarter_Cloudy", "Half_Cloudy", "Three_Quarter_Cloudy", "Full_Cloud", "Rain", "Hard_Rain"]
	csv = "Date;Rainfall (mm);Morning;Noon;Evening\n"

	for (let i = 1; i <= 7 ; i++) { //CONSTANTS!
			csv += fp[1][i] + ';';			//Date
			csv += fp[7][i] + ';';			//Rainfall
			weather = [];
			if (fp[6][i].trim().length == 0) weather = [1,1,1];
			else weather = fp[6][i].match(/\b\w+\b/g).map(n => parseInt(n));
			csv += conditions[weather[0]-1] + ';'; 		//Weather Morning
			csv += conditions[weather[1]-1] + ';'; 		//Weather Noon
			csv += conditions[weather[2]-1]; 				//Weather Evening
			csv += '\n';
	}

	return csv;

}

function createInterestReport(fp) {
	csv = 'Date;Animal of interest;Number seen\n';
	
	for (let i = 1; i <= 7; i++) {
		animals = parseArea(fp,i,1,1,5); //CONSTANTS!
		for (let a of animals.data) {
			if (a.trim() == '') continue;
			csv += fp[1][i] + ';';
			const [animal, count] = a.split(' ');
			csv += animal+';';
			csv += count;
			csv += '\n';
		}
	}
	
	return csv;
}

function createCarcassReport(fp) {
	csv = 'Date;Carcass Info\n';
	for (let i = 1; i <= 7; i++) {
		carcass_info = parseArea(fp,i,7,1,4); //CONSTANTS!
		
		for (let carcass of carcass_info.data) {
			if (carcass.trim() == '') continue;
			csv += fp[1][i] + ';';
			csv += carcass;
			csv += '\n';
		}
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
