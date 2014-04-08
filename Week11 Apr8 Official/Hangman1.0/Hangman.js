var map = new Object();
var unknownChar = "-";
function HangmanData() {
	this.AnswerArray = new Array();
	this.CurrAnswer = new Array();
}
function chkAnswer(OuterDiv) {
	var Hdata2 = map[OuterDiv];
	for (var i = 0; i < Hdata2.AnswerArray.length; i++) {
		if (Hdata2.AnswerArray[i] != Hdata2.CurrAnswer[i]) {
			return false;
		}
	}
	return true;
}
function createProblemDiv(OuterDiv,Question,Answer){
	var Hdata = map[OuterDiv];
	var outerDivObj = document.getElementById(OuterDiv);
	var ProblemDiv = document.createElement("div");
	ProblemDiv.className = 'container1';
	ProblemDiv.id = OuterDiv + "div_problem";

	var QuestionLabel = document.createElement("label");
	QuestionLabel.id = OuterDiv + "lb_Question";
	QuestionLabel.innerHTML = Question;
	ProblemDiv.appendChild(QuestionLabel);

	var br = document.createElement('br');
	ProblemDiv.appendChild(br);

	var AnswerArray = new Array(Answer.length);
	var CurrAnswer = new Array(Answer.length);
	for (var i = 0; i < AnswerArray.length; i++) {
		if ((Answer.charCodeAt(i) >= 65 && Answer.charCodeAt(i) <= 90)
				|| (Answer.charCodeAt(i) >= 97 && Answer.charCodeAt(i) <= 122)
				|| (Answer.charCodeAt(i)>=48 && Answer.charCodeAt(i)<=57)){
			AnswerArray[i] = Answer.charAt(i);
			CurrAnswer[i] = unknownChar;
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(unknownChar);
			thelabel.appendChild(textNode);
			thelabel.id = OuterDiv + "lb_answer" + i;
			thelabel.value = i;
			ProblemDiv.appendChild(thelabel);
		}
		else{
			AnswerArray[i] = Answer.charAt(i);
			CurrAnswer[i] = Answer.charAt(i);
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(AnswerArray[i]);
			thelabel.appendChild(textNode);
			thelabel.id = OuterDiv + "lb_answer" + i;
			thelabel.value = i;
			ProblemDiv.appendChild(thelabel);
		}
	}
	outerDivObj.appendChild(ProblemDiv);
	Hdata.AnswerArray = AnswerArray;
	Hdata.CurrAnswer = CurrAnswer;
	map[OuterDiv] = Hdata;
}
function createSolveDiv(OuterDiv){
	var outerDivObj = document.getElementById(OuterDiv);
	var SolveDiv = document.createElement("div");

	SolveDiv.className = 'container1';
	SolveDiv.id = OuterDiv + "div_solve";
	for(var i = 65;i<=90;i++){
		var thelabel = document.createElement("label");
		var textNode = document.createTextNode(String.fromCharCode(i));
		thelabel.appendChild(textNode);
		thelabel.id = OuterDiv + "lb_solve" + i;
		thelabel.value = String.fromCharCode(i);
		thelabel.className = 'labelcolor1';
		thelabel.onclick = function() {
			var bool = false;
			var Hdata = map[OuterDiv];
			var str = this.value;
			var str2 = String.fromCharCode(str.charCodeAt(0) + 32);
			for(var i = 0;i<Hdata.AnswerArray.length;i++){
				//alert(Hdata.AnswerArray[i]);
				if(Hdata.AnswerArray[i] == str){
					var a = document.getElementById(OuterDiv + "lb_answer" + i);
					var newChild = document.createTextNode(str);
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					Hdata.CurrAnswer[i] = str;
					this.className = 'labelcolor3';
					bool = true;
					map[OuterDiv] = Hdata;
					if(chkAnswer(OuterDiv))
						alert("You did it!!!");
				}
				else if(Hdata.AnswerArray[i] == str2){
					var a = document.getElementById(OuterDiv + "lb_answer" + i);
					var newChild = document.createTextNode(str2);
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					Hdata.CurrAnswer[i] = str2;
					this.className = 'labelcolor3';
					bool = true;
					map[OuterDiv] = Hdata;
					if(chkAnswer(OuterDiv))
						alert("You did it!!!");
				}
				else{
					if(!bool)
						this.className = 'labelcolor2';
				}
			}

		}
		SolveDiv.appendChild(thelabel);
		var space = document.createElement("label");
		var spaceNode = document.createTextNode(" ");
		space.appendChild(spaceNode);
		SolveDiv.appendChild(space);
	}
	var br = document.createElement('br');
	SolveDiv.appendChild(br);
	var br = document.createElement('br');
	SolveDiv.appendChild(br);
	for(var i = 48;i<=57;i++){
		var thelabel = document.createElement("label");
		var textNode = document.createTextNode(String.fromCharCode(i));
		thelabel.appendChild(textNode);
		thelabel.id = OuterDiv + "lb_solve" + i;
		thelabel.value = String.fromCharCode(i);
		thelabel.className = 'labelcolor1';
		thelabel.onclick = function() {
			var bool = false;
			var Hdata = map[OuterDiv];
			var str = this.value;
			for(var i = 0;i<Hdata.AnswerArray.length;i++){
				if(Hdata.AnswerArray[i] == str){
					var a = document.getElementById(OuterDiv + "lb_answer" + i);
					var newChild = document.createTextNode(str);
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					Hdata.CurrAnswer[i] = str;
					this.className = 'labelcolor3';
					bool = true;
					map[OuterDiv] = Hdata;
					if(chkAnswer(OuterDiv))
						alert("you did it!!");
				}
				else{
					if(!bool)
						this.className = 'labelcolor2';
				}
			}

		}
		SolveDiv.appendChild(thelabel);
		var space = document.createElement("label");
		var spaceNode = document.createTextNode(" ");
		space.appendChild(spaceNode);
		SolveDiv.appendChild(space);
	}
	outerDivObj.appendChild(SolveDiv);
}
function createPuzzles(OuterDiv,Question,Answer){

	map[OuterDiv] = new HangmanData();
	//alert("aa");
	createProblemDiv(OuterDiv,Question,Answer);
	createSolveDiv(OuterDiv);

}
