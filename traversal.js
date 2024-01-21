function arrowTraverse(e) {
        let current = getCurrentPosition(document.activeElement);

        let next = {x: current.x, y: current.y}
	switch (e.keyCode) {
		case 37: next.x--; break;    //left
		case 38: next.y--; break;    //top
		case 39: next.x++; break;   //right
		case 40: next.y++; break;   //down
		case 13: next = next_x(current); break;
		default: return;
	}


	next_cell = current.table.children[next.y].children[next.x] 
	
	if (!next_cell) return;
	if (next_cell.firstChild.nodeName != 'INPUT') return;

	//move focus to next cell
	if (e.shiftKey) next_cell.firstChild.value = document.activeElement.value;
	next_cell.firstChild.focus();
	next_cell.firstChild.select();


}

function shiftRowRight(pos) {
	
}

function next_x(pos){
	x=pos.x;y=pos.y;table=pos.table;
	let ny = y+1
	let nx = x
	while (table.children[ny].children[nx].innerText.length < 1) {
		nx--
		if (nx<0) {
			nx = 0
			ny++
		}
	}
	return {x: nx+1, y: ny}
}
