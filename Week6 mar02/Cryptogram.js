var map = new Object();
var unknownChar = "-";
var upr = 0;
function CryptogramData(){
	this.cipher = new Array();
	this.encrypt = new Array();
	this.currAnswer = new Array();
	this.Msg = new Array();
}
function createPuzzleWithKey(codes,key){
	userCipher(codes, key);
	createPuzzle(codes);
}
function createPuzzleWithoutKey(div_id,codes){
	map[div_id] = new CryptogramData();
	createCipher(div_id);
	createPuzzle(div_id,codes);
}
function createPuzzle(div_id,codes){
	var outerDiv = document.getElementById(div_id);
	var ProblemDiv = document.createElement("div");
	ProblemDiv.className = 'container1';
	ProblemDiv.id = div_id + "div_showCipher";
	
	var SolveDiv = document.createElement("div");
	SolveDiv.className = 'container2';
	SolveDiv.id =div_id + "div_decipher";
	SolveDiv.style.visibility= "hidden";
	
	var solveLabel = document.createElement("label");
	solveLabel.id = div_id + "lb_ciphered";
	SolveDiv.appendChild(solveLabel);
	
	var solveInput = document.createElement("input");
	solveInput.setAttribute("type", "text");
	solveInput.setAttribute("value", "");
	solveInput.setAttribute("maxlength", "1");
	solveInput.setAttribute("onkeydown", "if (event.keyCode == 13) replaceChar("+div_id+");");
	solveInput.id = div_id + "tx_deciphered";
	SolveDiv.appendChild(solveInput);
	
	var SolutionDiv = document.createElement("div");
	SolutionDiv.className = 'container1';
	SolutionDiv.id = div_id + "div_answerBoard";
	outerDiv.appendChild(ProblemDiv);
	outerDiv.appendChild(SolveDiv);
	outerDiv.appendChild(SolutionDiv);
	//alert("1");
	dyCreateContainer(div_id,div_id + 'div_showCipher', div_id + 'div_answerBoard',div_id + "div_decipher", codes);
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
		} while ((unique != 1)||(next==i));
		cipher[i] = String.fromCharCode(next + 65);
	}
	var crData = map[div_id];
	crData.cipher = cipher;
}

function encryptMsg(originalMsg,div_id) {
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


function dyCreateContainer(outerDiv,cipheredId, answeredId,solveDiv ,codes){
	encryptMsg(codes,outerDiv);
	var crData = map[outerDiv];
	var encrypt = crData.encrypt;
	var currAnswer = crData.currAnswer;
	var container = document.getElementById(cipheredId);
	var answerArea = document.getElementById(answeredId);
	for(var i=0; i<crData.encrypt.length;i++){
		if((encrypt[i].charCodeAt(0) >= 65 && encrypt[i].charCodeAt(0) <= 90) || 
				(encrypt[i].charCodeAt(0) >= 97 && encrypt[i].charCodeAt(0) <= 122)){
			currAnswer[i] = unknownChar;
		}
		else {
			currAnswer[i] = encrypt[i];
		}
	}
	for(var i=0; i<encrypt.length; i++){
		if((encrypt[i].charCodeAt(0) >= 65 && encrypt[i].charCodeAt(0) <= 90) || 
				(encrypt[i].charCodeAt(0) >= 97 && encrypt[i].charCodeAt(0) <= 122)){
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(encrypt[i]);
			thelabel.appendChild(textNode);
			thelabel.id=outerDiv + "lbCiphered"+i;
			thelabel.value = i;
			container.appendChild(thelabel);

			thelabel.onclick =  function(){
				dechipher(this.value,outerDiv);
				var textbox = document.getElementById(outerDiv + "tx_deciphered");
				textbox.value = "";
				textbox.focus();
				if((currAnswer[this.value].charCodeAt(0) >= 65 && currAnswer[this.value].charCodeAt(0) <= 90) || 
						(currAnswer[this.value].charCodeAt(0) >= 97 && currAnswer[this.value].charCodeAt(0) <= 122))
							textbox.value = currAnswer[this.value];

			};
			var thelabelAnswer = document.createElement("label");
			thelabelAnswer.id=outerDiv + "lbAnswerItm"+i;
			var textNode2 = document.createTextNode(unknownChar);
			thelabelAnswer.appendChild(textNode2);
			thelabelAnswer.value = i;
			answerArea.appendChild(thelabelAnswer);
			thelabelAnswer = document.getElementById(outerDiv +"lbAnswerItm"+i);
			thelabelAnswer.onclick = function(){
				dechipher(this.value,outerDiv);
				var textbox = document.getElementById(outerDiv+"tx_deciphered");
				textbox.value = "";
				textbox.focus();
				if((currAnswer[this.value].charCodeAt(0) >= 65 && currAnswer[this.value].charCodeAt(0) <= 90) || 
				(currAnswer[this.value].charCodeAt(0) >= 97 && currAnswer[this.value].charCodeAt(0) <= 122))
					textbox.value = currAnswer[this.value];
			};
		}
		else{
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(encrypt[i]);
			var thelabelAnswer = document.createElement("label");
			thelabelAnswer.id=outerDiv+"lbAnswerItm"+i;
			var textNode2 = document.createTextNode(encrypt[i]);
			thelabelAnswer.appendChild(textNode2);
			answerArea.appendChild(thelabelAnswer);
			thelabel.appendChild(textNode);
			thelabel.id=outerDiv+"lbCiphered"+i;
			thelabel.value = i;
			container.appendChild(thelabel);
		}
	}
	crData.currAnswer = currAnswer;
	map[outerDiv] = crData;
}
function replaceChar(outerDiv){
	var crData = map[outerDiv];
	var encrypt = crData.encrypt;
	var currAnswer = crData.currAnswer;
	var inpBox = document.getElementById(outerDiv+"tx_deciphered");
	replacement = inpBox.value; 
	if(replacement==undefined ||replacement==""){
		replacement=unknownChar;
	}
	if((replacement.charCodeAt(0) >= 65 && replacement.charCodeAt(0) <= 90) || 
			(replacement.charCodeAt(0) >= 97 && replacement.charCodeAt(0) <= 122) || replacement==unknownChar){
		var lbCiphered = document.getElementById(outerDiv+"lb_ciphered");
		var str = encrypt[lbCiphered.value];
		var str2 = "";
		if(str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90){
			str2 = String.fromCharCode(str.charCodeAt(0) + 32);
		}
		else if(str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122){
			str2 = String.fromCharCode(str.charCodeAt(0) - 32);
		}
		if(replacement.charCodeAt(0) >= 65 && replacement.charCodeAt(0) <= 90){
			replacement = String.fromCharCode(replacement.charCodeAt(0) + 32);
		}
		for(var i=0; i<encrypt.length; i++){
			var q = document.getElementById(outerDiv+"lbCiphered"+i);
			if(currAnswer[i]==replacement|| currAnswer[i]==String.fromCharCode(replacement.charCodeAt(0)-32)){
				var a = document.getElementById(outerDiv+"lbAnswerItm"+i);
				var newChild = document.createTextNode("-");
				var oldChild =a.childNodes[0];
				a.replaceChild(newChild, oldChild);
				currAnswer[i]="-";
			}
			if(encrypt[q.value] == str || encrypt[q.value] == str2){
				var a = document.getElementById(outerDiv+"lbAnswerItm"+i);
				if(encrypt[q.value].charCodeAt(0) >= 65 && encrypt[q.value].charCodeAt(0) <= 90 && replacement != unknownChar){
					var newChild = document.createTextNode(String.fromCharCode(replacement.charCodeAt(0) - 32));
					currAnswer[i]=String.fromCharCode(replacement.charCodeAt(0) - 32);
				}
				else{
					var newChild = document.createTextNode(replacement);
					currAnswer[i]=replacement;
				}
				var oldChild = a.childNodes[0]; 
				a.replaceChild(newChild, oldChild);
				
			}


		}
		inpBox.value = "";
		document.getElementById(outerDiv + "div_decipher").style.visibility = "hidden";
	}
	else
		inpBox.value = "";
	crData.currAnswer = currAnswer;
	map[outerDiv] = crData;
	if(chkAnswer(outerDiv)){
		alert('You got it right!!');
	}
}
function chkAnswer(outerDiv){
	var crData = map[outerDiv];
	var Msg = crData.Msg;
	var currAnswer = crData.currAnswer;
	for(var i = 0; i< Msg.length;i++){
		if(Msg[i]!= currAnswer[i]){
			return false;
		}
	}
	return true;
}
function dechipher(index,outerDiv){
	var crData = map[outerDiv];
	var encrypt = crData.encrypt;
	var divDecipher=document.getElementById(outerDiv + "div_decipher");
	divDecipher.style.visibility= "visible";
	var lbCiphered = document.getElementById(outerDiv + "lb_ciphered");
	lbCiphered.value = index;
	lbCiphered.innerHTML= encrypt[index] + ":";
}

function userCipher(message,key){
	for(i=0;i<26;i++){
		if(!((key[i]>=65 && key[i]<=90)||(key[i]>=97&&key[i]<=122)))
			//alert("Invalid key");
		cipher[i] = key[i];
		
	}
	
	for (i = 0; i < 26; i++) {
			unique = 1;
			for (x = 0; x < i; x++) {
				if (cipher[x]==cipher[i]) {
					unique = 0;
					break;
				}
			}
	}
	if(unique==0)
		alert("not valid");
}



