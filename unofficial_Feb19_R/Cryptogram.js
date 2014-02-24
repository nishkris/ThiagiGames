var cipher = new Array();
var encrypt = new Array();
var decrypt = new Array();
currAnswer = new Array();
var Msg = new Array();
var solution="";
var unknownChar = "-";

function createCipher() {
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
			if(next == i)
				unique =0;
		} while (unique != 1);
		cipher[i] = String.fromCharCode(next + 65);
	}
}

function encryptMsg(originalMsg) {
	encrypt = new Array(originalMsg.length);
	decrypt = new Array(originalMsg.length);
	Msg = new Array(originalMsg.length);
	createCipher();
	for (i = 0; i < originalMsg.length; i++) {
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
}

/*function decryptMsg() {

	for (i = 0; i < encrypt.length; i++) {
		var xx = encrypt[i].charCodeAt(0);
		if (xx >= 65 && xx <= 90) {
			lower = 0;
		} else if (xx >= 97 && xx <= 122) {
			xx = xx - 32;
			lower = 1;
		} else {
			lower = 2;
		}
		for (x = 0; x < 26; x++) {
			if ((cipher[x].charCodeAt(0) == xx) && lower == 0) {
				decrypt[i] = String.fromCharCode(x + 65);
			} else if ((cipher[x].charCodeAt(0) == xx) && lower == 1) {
				decrypt[i] = String.fromCharCode(x + 65 + 32);
			} else if(lower==2)
				decrypt[i] = encrypt[i];
		}
	}
}
*/

function dyCreateContainer(cipheredId, answeredId, codes){
	encryptMsg(codes);
	solution=codes;
	var container = document.getElementById(cipheredId);
	var answerArea = document.getElementById(answeredId);
	for(var i=0; i<encrypt.length;i++){
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
			thelabel.id="lbCiphered"+i;
			thelabel.value = i;
			container.appendChild(thelabel);

			thelabel.onclick =  function(){
				dechipher(this.value);
				var textbox = document.getElementById("tx_deciphered");
				textbox.value = "";
				textbox.focus();
				if((currAnswer[this.value].charCodeAt(0) >= 65 && currAnswer[this.value].charCodeAt(0) <= 90) || 
						(currAnswer[this.value].charCodeAt(0) >= 97 && currAnswer[this.value].charCodeAt(0) <= 122))
							textbox.value = currAnswer[this.value];

			};
			var thelabelAnswer = document.createElement("label");
			thelabelAnswer.id="lbAnswerItm"+i;
			var textNode2 = document.createTextNode(unknownChar);
			thelabelAnswer.appendChild(textNode2);
			thelabelAnswer.value = i;
			answerArea.appendChild(thelabelAnswer);
			thelabelAnswer = document.getElementById("lbAnswerItm"+i);
			thelabelAnswer.onclick = function(){
				dechipher(this.value);
				var textbox = document.getElementById("tx_deciphered");
				textbox.value = "";
				textbox.focus();
				if((currAnswer[this.value].charCodeAt(0) >= 65 && currAnswer[this.value].charCodeAt(0) <= 90) || 
				(currAnswer[this.value].charCodeAt(0) >= 97 && currAnswer[this.value].charCodeAt(0) <= 122))
					textbox.value = currAnswer[this.value];
			}
		}
		else{
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(encrypt[i]);
			var thelabelAnswer = document.createElement("label");
			thelabelAnswer.id="lbAnswerItm"+i;
			var textNode2 = document.createTextNode(encrypt[i]);
			thelabelAnswer.appendChild(textNode2);
			answerArea.appendChild(thelabelAnswer);
			thelabel.appendChild(textNode);
			thelabel.id="lbCiphered"+i;
			thelabel.value = i;
			container.appendChild(thelabel);
		}
	}
}
function replaceChar(){
	var inpBox = document.getElementById("tx_deciphered");
	replacement = inpBox.value; 
	if(replacement==undefined ||replacement==""){
		replacement=unknownChar;
	}
	if((replacement.charCodeAt(0) >= 65 && replacement.charCodeAt(0) <= 90) || 
			(replacement.charCodeAt(0) >= 97 && replacement.charCodeAt(0) <= 122) || replacement==unknownChar){
		var lbCiphered = document.getElementById("lb_ciphered");
		var str = encrypt[lbCiphered.value];
		decrypt[lbCiphered.value] =str;
		if(str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90){
			var str2 = String.fromCharCode(str.charCodeAt(0) + 32);
		}
		else if(str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122){
			var str2 = String.fromCharCode(str.charCodeAt(0) - 32);
		}
		if(replacement.charCodeAt(0) >= 65 && replacement.charCodeAt(0) <= 90){
			replacement = String.fromCharCode(replacement.charCodeAt(0) + 32);
		}
		for(var i=0; i<encrypt.length; i++){
			var q = document.getElementById("lbCiphered"+i);
			if(currAnswer[i]==replacement|| currAnswer[i]==String.fromCharCode(replacement.charCodeAt(0)-32)){
				var a = document.getElementById("lbAnswerItm"+i);
				var newChild = document.createTextNode("-");
				var oldChild =a.childNodes[0];
				a.replaceChild(newChild, oldChild);
				currAnswer[i]="-";
			}
			if(encrypt[q.value] == str || encrypt[q.value] == str2){
				var a = document.getElementById("lbAnswerItm"+i);
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
		document.getElementById("div_decipher").style.visibility = "hidden";
	}
	else
		inpBox.value = "";
	
	if(chkAnswer()){
		alert('You got it right!!');
	}
}
function chkAnswer(){
	for(var i = 0; i< Msg.length;i++){
		if(Msg[i]!= currAnswer[i]){
			return false;
		}
	}
	return true;
}
function dechipher(index){
	var divDecipher=document.getElementById("div_decipher");
	divDecipher.style.visibility= "visible";
	var lbCiphered = document.getElementById("lb_ciphered");
	lbCiphered.value = index;
	lbCiphered.innerHTML= encrypt[index] + ":";
}

function func()
{
	replaceChar();
	win();
	}
function win()
{
	winner =1;
	for(i=0;i<solution.length;i++)
		{
		 if(decrypt[i]==undefined)
			 winner =0;
		 else if(decrypt[i]!=solution[i])
			 winner=0;
		 else winner =1;
		}
	
	if(winner==1)
		alert("Win");
	
		
}