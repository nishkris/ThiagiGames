var chunkArray = new Array();
var chunckPuzzle = new Array();
var chunkPuzzleAnswer = undefined;
var chunkSize;
var currentStyle;
var gEndTime,gStartTime;

function getMapKeysCount(){
	  var count = 0;
       for (var key in solutionMap){
	   if(solutionMap[key] != undefined){
        count++;
	    }
     }
     return count;
}

function checkSolution(){
    if(getMapKeysCount() == chunkArray.length){
		  var solution='';
		  for(var x=0;x<chunkArray.length;x++){
			    solution +=  solutionMap['puzzleLableSolDiv#'+x];
			  }
           if(solution === input){
			     alert('Correct solution');
			   }
		}
}

function soundEffect(soundFile, id){
	//alert("run here");
	document.getElementById(id).innerHTML = "<embed src=\""+soundFile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
}


function createChunksPuzzle(inputString, chunkSize) {
	if (chunkSize == undefined) {
		chunkSize = 3;
	}
	chunkEngine(inputString, chunkSize);

}
function changeCSS(cssFile, cssLinkIndex) {

	var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

	var newlink = document.createElement("link");
	newlink.setAttribute("rel", "stylesheet");
	newlink.setAttribute("type", "text/css");
	newlink.setAttribute("href", cssFile);

	document.getElementsByTagName("head").item(0)
			.replaceChild(oldlink, oldlink);
}

function changeCSSDemo(className, cssLinkIndex) {
	var elems = document.getElementsByTagName('*');
	for ( var i = 0, max = elems.length; i < max; i++) {
		if (elems[i].className == currentStyle) {
			elems[i].className = className;
		}
	}
	currentStyle = className;
}

function chunkEngine(chunkInput, chunkSize) {
	var length = chunkInput.length;
	chunkCount = Math.ceil(length / chunkSize);
	chunkArray = new Array(chunkCount);
	for ( var i = 0; i < chunkCount; i++) {
		if (chunkSize < chunkInput.length) {
			chunkArray[i] = chunkInput.substr(0, chunkSize);
			chunkInput = chunkInput.substr(chunkSize, chunkInput.length
					- chunkSize);
		} else {
			chunkArray[i] = chunkInput;
		}
	}
	createPuzzle(chunkArray);
	initializeLayout();
}
function addClass(element, myClass) {
	element.className += ' ' + myClass;
}
function initializeLayout() {
	var parentDivElement = document.getElementById('chunksPuzzle');
	parentDivElement.innerHTML = '';

    var parentSize = 0;
    parentSize = bindParent();

	var puzzleContainer = document.createElement('div');
	puzzleContainer.id = 'puzzleDivStyle';
	puzzleContainer.className = 'puzzleDivStyle';
	puzzleContainer.align = 'center';
	puzzleContainer.style.width=parentSize.toString()+"em";

    var solutionContainer = document.createElement('div');
	solutionContainer.id = 'puzzleSolveDiv';
	solutionContainer.className = 'container2';
	solutionContainer.align = 'center';
	solutionContainer.style.width=parentSize.toString()+"em";

	//var innerDivElement = createThemeDiv();

	puzzleContainer.innerHTML = '';
	solutionContainer.innerHTML = '';

	for ( var count = 0; count < chunckPuzzle.length; count++) {
        var chunkLableSolDiv = document.createElement('div');
         chunkLableSolDiv.className = 'lableDivStyle';
         chunkLableSolDiv.id = 'puzzleLableSolDiv#' + count;

		var chunkLabel = document.createElement('div');
		chunkLabel.innerHTML = chunckPuzzle[count];
		chunkLabel.id = 'puzzleLable#' + count;
		chunkLabel.className = 'btn-primary0';
		chunkLabel.align = 'center';
		//chunkLableDiv.appendChild(chunkLabel);
		puzzleContainer.appendChild(chunkLabel);
		solutionContainer.appendChild(chunkLableSolDiv);
		puzzleContainer.style.display = 'block';
	}

	parentDivElement.appendChild(puzzleContainer);
	parentDivElement.appendChild(solutionContainer);


	startTime();
}

function bindParent(){
    var chunkNumber = chunkArray.length;
    var parentSize = 0;
    //if(chunkNumber>8){
   //     parentSize = 8*3.5 + 1;
   // }else
   //     {
        parentSize = chunkNumber*3.5+1;
   //     }
    return parentSize;
}

function createThemeDiv(){
	var themeDiv = document.createElement("div");
	themeDiv.id = 'puzzleColorTheme';
	themeDiv.style.display = 'none';
	themeDiv.align = 'center';

	//adding the color buttons
	var newSpan = document.createElement('span');
	newSpan.innerHTML = 'Change Color';

	var colorBtn0 = document.createElement('button');
	colorBtn0.className = 'themeButton themeButtonColor0';
	colorBtn0.onclick = function (){
		changeCSSDemo('btn-primary0',0);
	   };

	var colorBtn1 = document.createElement('button');
	colorBtn1.className = 'themeButton themeButtonColor1';
	colorBtn1.onclick = function (){
		changeCSSDemo('btn-primary1',0);
	   };

	var colorBtn2 = document.createElement('button');
	colorBtn2.className = 'themeButton themeButtonColor2';
	colorBtn2.onclick = function (){
		changeCSSDemo('btn-primary2',0);
	   };


	var colorBtn3 = document.createElement('button');
	colorBtn3.className = 'themeButton themeButtonColor3';
	colorBtn3.onclick = function (){
		changeCSSDemo('btn-primary3',0);
	   };

	themeDiv.appendChild(newSpan);
	themeDiv.appendChild(colorBtn0);
	themeDiv.appendChild(colorBtn1);
	themeDiv.appendChild(colorBtn2);
	themeDiv.appendChild(colorBtn3);

	return themeDiv;
}


function createElement(parentElementId, childElementType, idValue) {
	var newElement = document.createElement(childElementType);
	newElement.id = idValue;
	document.getElementById(parentElementId).appendChild(newElement);
}

function createPuzzle(chunkArray) {
	var counter = 0;
	chunckPuzzle = new Array(chunkArray.length);
	while (counter != chunkArray.length) {
		var index = randomNumberGenerate(chunkArray.length);
		if (chunkArray[index] != undefined) {
			chunckPuzzle[counter] = chunkArray[index];
			counter++;
			chunkArray[index] = undefined;
		}
	}
}

function randomNumberGenerate(limit) {
	return Math.floor(Math.random() * limit);
}

function startTime() {
	// alert(gStartTime);
	gStartTime = new Date();
}

function endTime() {
	gEndTime = new Date();
}

function timeElapsed(minutes, seconds, milliseconds) {
	// three elements in interval, first is minutes, second is seconds, third is
	// milliseconds
	var interval = new Array();
	interval[0] = minutes;
	interval[1] = seconds;
	interval[2] = milliseconds;
	return interval;
}

function calculateTime() {
	var milliseconds = 0;
	var seconds = 0;
	var minutes = 0;
	if (gStartTime == undefined) {
		return timeElapsed(0, 0, 0);
	}
	if (gEndTime == undefined) {
		return timeElapsed(0, 0, 0);
	}

	var diff = gEndTime - gStartTime;
	milliseconds = diff;

	if (milliseconds >= 1000) {
		seconds = Math.floor(milliseconds / 1000);
		milliseconds = milliseconds % 1000;
	}

	if (seconds >= 60) {
		minutes = Math.floor(seconds / 60);
		seconds = seconds % 60;
	}

	return timeElapsed(minutes, seconds, milliseconds);

}

function showTime() {
	endTime();
	var interval = calculateTime();
	var timeStr = "time passed: ";
	timeStr = timeStr + interval[0] + " minutes " + interval[1] + " seconds ";

	alert(timeStr);
}


