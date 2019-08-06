var diff = 4;
var score = 1;
var numCorrect = 3;
var numClicks = 0;
var incDiff = true;
const boxes = [];
const correctBoxes = [];

function playSound() {
    var audio = new Audio('sound.mp3');
	audio.loop = false;
}

function game() {
	console.log('game func');
	clean();
	newBoard(diff);
	randomBox();
	updateScore();
	setTimeout(() => {
		show();
	}, 500);
	playSound();
	setTimeout(() => {
		spin();
	}, 2000);
}


function clean() {
	boxes.length = 0;
	correctBoxes.length = 0;
	numClicks = 0;
	incDiff = true;
}

function updateScore() {
	console.log("update score");
	document.getElementById("pscore").innerHTML = score;
}

function increaseDiff() {
	numCorrect++;
	diff++;
	if(diff >= 7){
		diff = 7;
	}
}

function decreaseDiff() {
	numCorrect--;
	if(numCorrect < 3) {
		numCorrect = 3;
	}
	diff--;
	if(diff <= 3) {
		diff = 3;
	}
}

function spin() {
	document.getElementById("mem").classList.add("spinBoard")
}

function show() {
	for (i = 0; i < correctBoxes.length; i++) {
		correctBoxes[i].classList.add('turn');
	}
	setTimeout(() => {
		resetShow();
	}, 1000);
}
function resetShow() {
	for (i = 0; i < correctBoxes.length; i++) {
		correctBoxes[i].classList.remove('turn');
	}
}

function clickedBox(b) {
	b.classList.add('flip-transform');

	checkBox(b);
}

function checkBox(b) {
	if (correctBoxes.includes(b)) {
		score++;
		b.classList.add('pickedBox');
	} else {
		score--;
		b.classList.add('wrongBox');
		incDiff = false;
		if(score == 0){
			terminate();
		}
	}
	updateScore();
	numClicks++;
	if (numClicks == numCorrect) {
		endLevel();
	}
}

function newBoard(diff) {
	$("div.box").remove();
	for (i = 0; i < diff * diff; i++) {
		let b = document.createElement('div');
		b.className = 'box';
		if(diff == 3) {
			b.style.width = 'calc(33% - 10px)';
			b.style.height = 'calc(33% - 10px)';
		}
		if(diff == 4) {
			b.style.width = 'calc(25% - 10px)';
			b.style.height = 'calc(25% - 10px)';
		}
		if(diff == 5) {
			b.style.width = 'calc(20% - 10px)';
			b.style.height = 'calc(20% - 10px)';
		}
		if(diff == 6) {
			b.style.width = 'calc(16% - 10px)';
			b.style.height = 'calc(16% - 10px)';
		}
		if(diff == 7) {
			b.style.width = 'calc(14% - 10px)';
			b.style.height = 'calc(14% - 10px)';
		}
		b.onclick = () => { clickedBox(b) }
		boxes.push(b);
		//grid.appendChild(b);
		mem.appendChild(b);
	}
	randomBox();
}

// function shuffle(a) {
//     var j, x, i;
//     for (i = a.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = a[i];
//         a[i] = a[j];
//         a[j] = x;
//     }
//     return a;
// }

// function randomBox(diff) {
// 	correctBoxes.length = 0;
// 	if(diff = 3) {
// 		shuffle(diff3);
// 		for(i = 0; i < numCorrect; i++) {
// 			correctBoxes.push(diff3[i]);
// 		}
// 	}
	
// 	if(diff = 4) {
// 		shuffle(diff4);
// 		for(i = 0; i < numCorrect; i++) {
// 			correctBoxes.push(diff4[i]);
// 		}
// 	}
	
// 	if(diff = 5) {
// 		shuffle(diff5);
// 		for(i = 0; i < numCorrect; i++) {
// 			correctBoxes.push(diff5[i]);
// 		}
// 	}
	
// 	if(diff = 6) {
// 		shuffle(diff6);
// 		for(i = 0; i < numCorrect; i++) {
// 			correctBoxes.push(diff6[i]);
// 		}
// 	}
	
// 	if(diff = 7) {
// 		shuffle(diff7);
// 		for(i = 0; i < numCorrect; i++) {
// 			correctBoxes.push(diff7[i]);
// 		}
// 	}

// }

function randomBox() {
	for (i = 0; i < numCorrect + 1; i++) {
		let rand = Math.floor(Math.random() * boxes.length);
		if (!correctBoxes.includes(boxes[rand])) {
			correctBoxes.push(boxes[rand]);
		}
	}
	correctBoxes.length = numCorrect;
}

function endLevel() {
	show();
	if(score <= 0) {
		gameover();
	}
	if (incDiff) {
		increaseDiff();
	} else {
		decreaseDiff();
	}

	
	document.getElementById("mem").classList.remove("spinBoard");
	setTimeout(() => {
		game();
	}, 1000);

}

function terminate() {
	window.location = 'summary.html' + '?score=' + score;
}

function restart() {
	window.location = 'index.html';
}

$(document).ready(function () {
	game();
});

