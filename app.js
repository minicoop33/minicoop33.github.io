
var wrapper = document.querySelector("#wrapper");
var outerwrapper = document.querySelector("#outerwrapper");

var aveKDR = document.querySelector("#aveKDR");

// https://afternoon-ridge-42970.herokuapp.com/
var BASE_URL = "https://" #TODO

function getKD() {
	fetch(BASE_URL + "/KDRs", {
		credentials: "include"
	}).then(function(response) {
		// DO THE AUTHORIZATION THING I TOOK A PICTURE OF TO SEE WHAT TO LOAD
		if (response.status == 200){
			outerwrapper.style.display = "none";
			wrapper.style.display = "block";
		}
		else {
			outerwrapper.style.display = "block";
			wrapper.style.display = "none";
			return;
		}
		console.log("server responded");
		response.json().then(function(data){
			var newAveKDR = findAve(data);
			console.log("MY AVE KDR: " + newAveKDR);
			aveKDR.innerHTML = newAveKDR.toFixed(2);
			if (newAveKDR >= 1){
				aveKDR.style.color = "green";
			}
			if (newAveKDR < 1){
				aveKDR.style.color = "red";
			}
			
			console.log("data recieved from server:", data);
			// data is ready to use (an array of strings)
			var myTable = document.querySelector("#statTable");
			myTable.innerHTML = ""
			var fRow = document.createElement("tr");
			
			var fKill = document.createElement("th");
			fKill.innerHTML = "Kills";
			fRow.appendChild(fKill);

			var fDeath = document.createElement("th");
			fDeath.innerHTML = "Deaths";
			fRow.appendChild(fDeath);

			var fAssist = document.createElement("th");
			fAssist.innerHTML = "Assist";
			fRow.appendChild(fAssist);

			var fHS = document.createElement("th");
			fHS.innerHTML = "HS%";
			fRow.appendChild(fHS);

			var fUD = document.createElement("th");
			fUD.innerHTML = "UD";
			fRow.appendChild(fUD);

			var fEF = document.createElement("th");
			fEF.innerHTML = "EF";
			fRow.appendChild(fEF);

			var fDelete = document.createElement("th");
			fDelete.innerHTML = "Delete";
			fRow.appendChild(fDelete);

			var fEdit = document.createElement("th");
			fEdit.innerHTML = "Edit";
			fRow.appendChild(fEdit);

			myTable.appendChild(fRow);

			data.forEach(function ( KD ) {
				var newRow = document.createElement("tr");
				

				//Kill
				var tKill = document.createElement("td");
				tKill.innerHTML = KD.kill;
				newRow.appendChild(tKill);

				

				var tDeath = document.createElement("td");
				tDeath.innerHTML = KD.death;
				newRow.appendChild(tDeath);

				var tAssist = document.createElement("td");
				tAssist.innerHTML = KD.assist;
				newRow.appendChild(tAssist);

				var tHS = document.createElement("td");
				tHS.innerHTML = KD.hs;
				newRow.appendChild(tHS);

				var tUD = document.createElement("td");
				tUD.innerHTML = KD.ud;
				newRow.appendChild(tUD);

				var tEF = document.createElement("td");
				tEF.innerHTML = KD.ef;
				newRow.appendChild(tEF);

				var deleteButton = document.createElement("button");
				deleteButton.innerHTML = "Delete";
				deleteButton.onclick = function () {
					console.log("Delete working")
					if (confirm("Are you sure you want to delete this entry?")) {
						deleteKD(KD.id);
					}
				}
				var tDelete = document.createElement("td");
				tDelete.appendChild(deleteButton);
				newRow.appendChild(tDelete);	
				



				var editButton = document.createElement("button");
				editButton.innerHTML = "Edit";
				editButton.onclick = function () {
					console.log("Edit working")
					editKD(KD.id, KD.kill, KD.death, KD.assist, KD.hs, KD.ud, KD.ef);
				}
				var tEdit = document.createElement("td");
				tEdit.appendChild(editButton);
				newRow.appendChild(tEdit)

				myTable.appendChild(newRow);
			});
		});
	});	
}	

getKD();



var addButton = document.querySelector("#add");
addButton.onclick = function() {
	// inputField.value
	// var body = "name=Outback";
	var newKillinput = document.querySelector("#kill");
	var newDeathInput = document.querySelector("#death");
	var newAssistInput = document.querySelector("#assist");
	var newHSInput = document.querySelector("#hs");
	var newUDInput = document.querySelector("#ud");
	var newEFInput = document.querySelector("#ef");
	var newKill = newKillinput.value;
	var newDeath = newDeathInput.value;
	var newAssist = newAssistInput.value;
	var newHS = newHSInput.value;
	var newUD = newUDInput.value;
	var newEF = newEFInput.value;
	console.log(newKill);
	var bodyStr = "kill=" + encodeURIComponent(newKill);
	bodyStr += "&death=" + encodeURIComponent(newDeath);
	bodyStr += "&assist=" + encodeURIComponent(newAssist);
	bodyStr += "&hs=" + encodeURIComponent(newHS);
	bodyStr += "&ud=" + encodeURIComponent(newUD);
	bodyStr += "&ef=" + encodeURIComponent(newEF);

	console.log("BODYSTR: ", bodyStr)

	fetch(BASE_URL + "/KDRs", {
		method: "POST",
		credentials: "include",
		body: bodyStr,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then( function (response) {
		newKillinput.value = "";
		newDeathInput.value = "";
		newAssistInput.value = "";
		newHSInput.value = "";
		newUDInput.value = "";
		newEFInput.value = "";
		getKD();
	});
};


var deleteKD = function (kdID) {
	fetch(BASE_URL + "/KDRs/" + kdID, {
		method: "DELETE",
		credentials: "include"
	}).then( function (response) {
		getKD();
	});	
};


var editKD = function (kdID, kill, death, assist, hs, ud, ef) {
	var newKillinput = document.querySelector("#kill");
	var newDeathInput = document.querySelector("#death");
	var newAssistInput = document.querySelector("#assist");
	var newHSInput = document.querySelector("#hs");
	var newUDInput = document.querySelector("#ud");
	var newEFInput = document.querySelector("#ef");
	newKillinput.value = kill;
	newDeathInput.value = death;
	newAssistInput.value = assist;
	newHSInput.value = hs;
	newUDInput.value = ud;
	newEFInput.value = ef;

	var addButton = document.querySelector("#add");
	addButton.style.display = "none";
	var editButton = document.querySelector("#edit");
	editButton.style.display = "inline";
	// editButton.innerHTML = "Update Stats"
	editButton.onclick = function () {
		var newKill = newKillinput.value;
		var newDeath = newDeathInput.value;
		var newAssist = newAssistInput.value;
		var newHS = newHSInput.value;
		var newUD = newUDInput.value;
		var newEF = newEFInput.value;
		var bodyStr = "kill=" + encodeURIComponent(newKill);
		bodyStr += "&death=" + encodeURIComponent(newDeath);
		bodyStr += "&assist=" + encodeURIComponent(newAssist);
		bodyStr += "&hs=" + encodeURIComponent(newHS);
		bodyStr += "&ud=" + encodeURIComponent(newUD);
		bodyStr += "&ef=" + encodeURIComponent(newEF);

		fetch(BASE_URL + "/KDRs/" + kdID, {
			method: "PUT",
			credentials: "include",
			body: bodyStr,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}	
		}).then( function (response) {
			editButton.style.display = "none";
			addButton.style.display = "inline";
			newKillinput.value = "";
			newDeathInput.value = "";
			newAssistInput.value = "";
			newHSInput.value = "";
			newUDInput.value = "";
			newEFInput.value = "";
			getKD();
		});

	}
}


var findAve = function (data) {
	var totalKills = 0;
	var totalDeaths = 0;
	data.forEach( function (KD) {
		totalKills += KD.kill;
		totalDeaths += KD.death;
	});
	var KDR = totalKills / totalDeaths;
	return KDR;
}


var createAcc = document.querySelector("#createAcc");
createAcc.onclick = function() {
	console.log("Create account");
	// inputField.value
	// var body = "name=Outback";
	var newFNameInput = document.querySelector("#fname");
	var newLNameInput = document.querySelector("#lname");
	var newEmailInput = document.querySelector("#email");
	var newPSWInput = document.querySelector("#psw");
	var newPSW2Input = document.querySelector("#psw2");
	var newFName = newFNameInput.value;
	var newLName = newLNameInput.value;
	var newEmail = newEmailInput.value;
	var newPSW = newPSWInput.value;
	var newPSW2 = newPSW2Input.value;
	console.log("PSW= " + newPSW + " PSW2= " + newPSW2)
	if (newPSW == newPSW2) {
		var bodyStr = "fname=" + encodeURIComponent(newFName);
		bodyStr += "&lname=" + encodeURIComponent(newLName);
		bodyStr += "&email=" + encodeURIComponent(newEmail);
		bodyStr += "&psw=" + encodeURIComponent(newPSW);
		

		console.log("BODYSTR: ", bodyStr)

		fetch(BASE_URL + "/users", {
			method: "POST",
			credentials: "include",
			body: bodyStr,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then( function (response) {
			if (response.status == 201){
				newFNameInput.value = "";
				newLNameInput.value = "";
				newEmailInput.value = "";
				newPSWInput.value = "";
				newPSW2Input.value = "";
				outerwrapper.style.display = "none";
				wrapper.style.display = "block";
				getKD();
			}
			else{
				alert("This email already exists! Please login or try a different email.")
				newEmailInput.value = "";
				newPSWInput.value = "";
				newPSW2Input.value = "";
			}
			
		});
	}
	else {
		alert("Passwords do not match. Please try again.");
		newPSWInput.value = "";
		newPSW2Input.value = "";
	}
	
};

var login = document.querySelector("#login");
login.onclick = function() {
	console.log("Login");
	// inputField.value
	// var body = "name=Outback";
	var newUNameInput = document.querySelector("#uname");
	var newPSWInput = document.querySelector("#loginpsw");
	var newUName = newUNameInput.value;
	var newPSW = newPSWInput.value;
	var bodyStr = "uname=" + encodeURIComponent(newUName);
	bodyStr += "&psw=" + encodeURIComponent(newPSW);
	

	console.log("BODYSTR: ", bodyStr)

	fetch(BASE_URL + "/sessions", {
		method: "POST",
		credentials: "include",
		body: bodyStr,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then( function (response) {
		console.log(response.status);
		if (response.status == 401){
			alert("Username and Password do not match. Please try again.");
			newUNameInput.value = "";
			newPSWInput.value = "";
		}
		else{
			newUNameInput.value = "";
			newPSWInput.value = "";
			outerwrapper.style.display = "none";
			wrapper.style.display = "block";
			getKD();
		}	
	});
	
};