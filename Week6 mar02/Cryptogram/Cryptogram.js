var map = new Object();
var unknownChar = "-";
var upr = 0;

function CryptogramData() {
	this.cipher = new Array();
	this.encrypt = new Array();
	this.currAnswer = new Array();
	this.Msg = new Array();
	this.error ="";
	this.startTime = -1;
	this.endTime = -1;
}
function createPuzzles(div_id,codes, key) {
	map[div_id] = new CryptogramData();
	if(key==undefined)
		{
		createCipher(div_id);
		createPuzzle(div_id, codes);
		}
	else{
	if (userCipher(div_id,codes, key))
		createPuzzle(div_id, codes);
	else
		{
		alert(map[div_id].error);
		playSound("media/enter_invalid.mp3");
		}
	}
}

function createPuzzle(div_id, codes) {
	var outerDiv = document.getElementById(div_id);
	var ProblemDiv = document.createElement("div");
	ProblemDiv.className = 'container1';
	ProblemDiv.id = div_id + "div_showCipher";

	var SolveDiv = document.createElement("div");
	SolveDiv.className = 'container2';
	SolveDiv.id = div_id + "div_decipher";
	SolveDiv.style.visibility = "hidden";

	var solveLabel = document.createElement("label");
	solveLabel.id = div_id + "lb_ciphered";
	SolveDiv.appendChild(solveLabel);

	var solveInput = document.createElement("input");
	solveInput.setAttribute("type", "text");
	solveInput.setAttribute("value", "");
	solveInput.setAttribute("maxlength", "1");
	solveInput.setAttribute("onkeydown",
			"if (event.keyCode == 13) replaceChar(" + div_id + ");");
	solveInput.id = div_id + "tx_deciphered";
	SolveDiv.appendChild(solveInput);

	var SolutionDiv = document.createElement("div");
	SolutionDiv.className = 'container1';
	SolutionDiv.id = div_id + "div_answerBoard";
	outerDiv.appendChild(ProblemDiv);
	outerDiv.appendChild(SolveDiv);
	outerDiv.appendChild(SolutionDiv);
	dyCreateContainer(div_id, div_id + 'div_showCipher', div_id
			+ 'div_answerBoard', div_id + "div_decipher", codes);
}
function createCipher(div_id) {
	var next = 0;
	var i, x, unique = 1;
	cipher = new Array(26);
	for (i = 0; i < 26; i++) {
		do {
			unique = 1;
			next = Math.floor((Math.random() * 26));
			for (x = 0; x < i && unique == 1; x++) {
				if (((cipher[x].charCodeAt(0)) - 65) == next) {
					unique = 0;
				}
			}
		} while ((unique != 1) || (next == i));
		cipher[i] = String.fromCharCode(next + 65);
	}
	var crData = map[div_id];
	crData.cipher = cipher;
}

function encryptMsg(originalMsg, div_id) {
	encrypt = new Array(originalMsg.length);
	Msg = new Array(originalMsg.length);
	for (var i = 0; i < originalMsg.length; i++) {
		Msg[i] = String.fromCharCode(originalMsg.charCodeAt(i));
		xx = originalMsg.charCodeAt(i);
		if (xx >= 65 && xx <= 90) {
			xx = xx - 65;
			encrypt[i] = cipher[xx];
		} else if (xx >= 97 && xx <= 122) {
			xx = xx - 32 - 65;
			upr = cipher[xx].charCodeAt(0);
			encrypt[i] = String.fromCharCode(upr + 32);
		} else {
			encrypt[i] = originalMsg[i];
		}
	}
	var crData = map[div_id];
	crData.encrypt = encrypt;
	crData.Msg = Msg;
	map[div_id] = crData;
}

function dyCreateContainer(outerDiv, cipheredId, answeredId, solveDiv, codes) {
	encryptMsg(codes, outerDiv);
	var crData = map[outerDiv];
	var encrypt = crData.encrypt;
	var currAnswer = crData.currAnswer;
	var container = document.getElementById(cipheredId);
	var answerArea = document.getElementById(answeredId);
	for (var i = 0; i < crData.encrypt.length; i++) {
		if ((encrypt[i].charCodeAt(0) >= 65 && encrypt[i].charCodeAt(0) <= 90)
				|| (encrypt[i].charCodeAt(0) >= 97 && encrypt[i].charCodeAt(0) <= 122)) {
			currAnswer[i] = unknownChar;
		} else {
			currAnswer[i] = encrypt[i];
		}
	}
	for (var i = 0; i < encrypt.length; i++) {
		if ((encrypt[i].charCodeAt(0) >= 65 && encrypt[i].charCodeAt(0) <= 90)
				|| (encrypt[i].charCodeAt(0) >= 97 && encrypt[i].charCodeAt(0) <= 122)) {
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(encrypt[i]);
			thelabel.appendChild(textNode);
			thelabel.id = outerDiv + "lbCiphered" + i;
			thelabel.value = i;
			container.appendChild(thelabel);

			thelabel.onclick = function() {
				if(crData.startTime<0){
					crData.startTime = new Date();
				}
				dechipher(this.value, outerDiv);
				var textbox = document.getElementById(outerDiv
						+ "tx_deciphered");
				textbox.value = "";
				textbox.focus();
				if ((currAnswer[this.value].charCodeAt(0) >= 65 && currAnswer[this.value]
						.charCodeAt(0) <= 90)
						|| (currAnswer[this.value].charCodeAt(0) >= 97 && currAnswer[this.value]
								.charCodeAt(0) <= 122))
					textbox.value = currAnswer[this.value];

			};
			thelabel.onmousedown = function(){
				playSound("media/click_char.mp3");
			};
			var thelabelAnswer = document.createElement("label");
			thelabelAnswer.id = outerDiv + "lbAnswerItm" + i;
			var textNode2 = document.createTextNode(unknownChar);
			thelabelAnswer.appendChild(textNode2);
			thelabelAnswer.value = i;
			answerArea.appendChild(thelabelAnswer);
			thelabelAnswer = document.getElementById(outerDiv + "lbAnswerItm"
					+ i);
			thelabelAnswer.onclick = function() {
				dechipher(this.value, outerDiv);
				var textbox = document.getElementById(outerDiv
						+ "tx_deciphered");
				textbox.value = "";
				textbox.focus();
				if ((currAnswer[this.value].charCodeAt(0) >= 65 && currAnswer[this.value]
						.charCodeAt(0) <= 90)
						|| (currAnswer[this.value].charCodeAt(0) >= 97 && currAnswer[this.value]
								.charCodeAt(0) <= 122))
					textbox.value = currAnswer[this.value];
			};
			thelabelAnswer.onmousedown = function(){
				playSound("media/click_char.mp3");
			};
		} else {
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(encrypt[i]);
			var thelabelAnswer = document.createElement("label");
			thelabelAnswer.id = outerDiv + "lbAnswerItm" + i;
			var textNode2 = document.createTextNode(encrypt[i]);
			thelabelAnswer.appendChild(textNode2);
			answerArea.appendChild(thelabelAnswer);
			thelabel.appendChild(textNode);
			thelabel.id = outerDiv + "lbCiphered" + i;
			thelabel.value = i;
			container.appendChild(thelabel);
		}
	}
	crData.currAnswer = currAnswer;
	map[outerDiv] = crData;
}
function replaceChar(outerDiv) {
	var crData = map[outerDiv];
	var encrypt = crData.encrypt;
	var currAnswer = crData.currAnswer;
	var inpBox = document.getElementById(outerDiv + "tx_deciphered");
	replacement = inpBox.value;
	if (replacement == undefined || replacement == "") {
		replacement = unknownChar;
	}
	if ((replacement.charCodeAt(0) >= 65 && replacement.charCodeAt(0) <= 90)
			|| (replacement.charCodeAt(0) >= 97 && replacement.charCodeAt(0) <= 122)
			|| replacement == unknownChar) {
		var lbCiphered = document.getElementById(outerDiv + "lb_ciphered");
		var str = encrypt[lbCiphered.value];
		var str2 = "";
		if (str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90) {
			str2 = String.fromCharCode(str.charCodeAt(0) + 32);
		} else if (str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122) {
			str2 = String.fromCharCode(str.charCodeAt(0) - 32);
		}
		if (replacement.charCodeAt(0) >= 65 && replacement.charCodeAt(0) <= 90) {
			replacement = String.fromCharCode(replacement.charCodeAt(0) + 32);
		}
		for (var i = 0; i < encrypt.length; i++) {
			var q = document.getElementById(outerDiv + "lbCiphered" + i);
			if (currAnswer[i] == replacement
					|| currAnswer[i] == String.fromCharCode(replacement
							.charCodeAt(0) - 32)) {
				var a = document.getElementById(outerDiv + "lbAnswerItm" + i);
				var newChild = document.createTextNode("-");
				var oldChild = a.childNodes[0];
				a.replaceChild(newChild, oldChild);
				currAnswer[i] = "-";
			}
			if (encrypt[q.value] == str || encrypt[q.value] == str2) {
				var a = document.getElementById(outerDiv + "lbAnswerItm" + i);
				if (encrypt[q.value].charCodeAt(0) >= 65
						&& encrypt[q.value].charCodeAt(0) <= 90
						&& replacement != unknownChar) {
					var newChild = document.createTextNode(String
							.fromCharCode(replacement.charCodeAt(0) - 32));
					currAnswer[i] = String.fromCharCode(replacement
							.charCodeAt(0) - 32);
				} else {
					var newChild = document.createTextNode(replacement);
					currAnswer[i] = replacement;
				}
				var oldChild = a.childNodes[0];
				a.replaceChild(newChild, oldChild);

			}

		}
		inpBox.value = "";
		document.getElementById(outerDiv + "div_decipher").style.visibility = "hidden";
		playSound("media/char_changed.mp3");
	} else
		inpBox.value = "";
		playSound("media/enter_invalid.mp3");	
	crData.currAnswer = currAnswer;
	map[outerDiv] = crData;
	if (chkAnswer(outerDiv)) {
		playSound("media/successful.mp3");
		crData.endTime = new Date();
		var timeInfo = showTime(crData.startTime, crData.endTime, outerDiv);
		alert('You got it right!!'+" \n"+timeInfo);
	}
}
function chkAnswer(outerDiv) {
	var crData = map[outerDiv];
	var Msg = crData.Msg;
	var currAnswer = crData.currAnswer;
	for (var i = 0; i < Msg.length; i++) {
		if (Msg[i] != currAnswer[i]) {
			return false;
		}
	}
	return true;
}
function dechipher(index, outerDiv) {
	var crData = map[outerDiv];
	var encrypt = crData.encrypt;
	var divDecipher = document.getElementById(outerDiv + "div_decipher");
	divDecipher.style.visibility = "visible";
	var lbCiphered = document.getElementById(outerDiv + "lb_ciphered");
	lbCiphered.value = index;
	lbCiphered.innerHTML = encrypt[index] + ":";
}

function userCipher(div_id,message, keys) {
	upr = message.toUpperCase();
	str = upr.split("");
	sortedMsg = str.sort();
	elem = new Array();
	key=keys.toUpperCase();
	var crData = map[div_id];
	//Key Length check
	if (key.length != 26) {
		crData.error = "Key is short. Please give the required length of 26";
		return false;
	}
	cipher = new Array(26);
	for (var i = 0; i < 26; i++) {
		cipher[i] = key[i];
	}
	//Character validation
	for (i = 0; i < sortedMsg.length; i++) {
		msg = sortedMsg[i].charCodeAt(0);
		if (msg >= 65 && msg <= 90) {
			code = cipher[i].charCodeAt(0);
			if (!(code >= 65 && code <= 90) ) {
				crData.error ="Key not valid";
				return false;
			}
		}
	}
	
	crData.cipher = cipher;
	p=0;
	//Removing duplicates from message to check repetition of key use
	for (i = 0; i < sortedMsg.length; i++) {
		msg = sortedMsg[i].charCodeAt(0);
		k=0;
		for (j = 0; j < i; j++) {
			if (msg == sortedMsg[j].charCodeAt(0)){
				k=1;
				break;
		}
		}
		if(k==0 &&(msg>=65&& msg<=90)){
			elem[p]=sortedMsg[i];
			p++;}
		
		}
	//Check for repetition of key
	for (i = 0; i < elem.length; i++) {
		a1=elem[i].charCodeAt(0);
		pre = cipher[a1-65].charCodeAt(0);
		for (x = i+1; x < elem.length; x++) {
			a2=elem[x].charCodeAt(0);
			nex = cipher[a2-65].charCodeAt(0);
			if (pre == nex) {
				crData.error ="Sorry ..Repetition of key use is not allowed";
				return false;
			}
		}
	}
	return true;
}


function playSound(filePath){
	var snd = new Audio(filePath); // buffers automatically when created
	snd.play();
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

function calculateTime(gStartTime, gEndTime) {
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

function showTime(gStartTime, gEndTime, gameNo) {
	var interval = calculateTime(gStartTime, gEndTime);
	var timeStr = "Time Taken: "+gameNo+": ";
	timeStr = timeStr + interval[0] + " minutes " + interval[1] + " seconds "
			+ interval[2] + " milliseconds";
	return timeStr;
}