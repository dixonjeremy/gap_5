var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

var db;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("opening database");
    db = window.openDatabase("mtna", "1.0", "MTNA", 200000);
	console.log("database opened");
    db.transaction(getPatient, transaction_error);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function getPatient(tx) {
	$('#busy').show();
	var sql = "select p.patinitials, p.patcity, p.patstate, p.patzip, p.patdob, p.patdesc " + 
				"from patient p where p.patientid = :id order by p.patientid";
	tx.executeSql(sql, [id], getPatient_success);
}

function getPatient_success(tx, results) {
	$('#busy').hide();
	var patient = results.rows.item(0);
	if (patient.patinitials) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + patient.patientid + '"><p class="line1">Patient Initials</p>' +
				'<p class="line2">' + patient.patinitials + '</p></a></li>');
	}
	if (patient.patcity) {
		$('#actionList').append('<li><a href="editdetails.html?id=' + patient.patientid + '">' +
				'<p class="line2">' + patient.patcity + '</p></a></li>');
	}
	if (patient.patstate) {
		$('#actionList').append('<li><a href="editdetails.html?id=' + patient.patientid + '">' +
				'<p class="line2">' + patient.patstate + '</p></a></li>');
	}
		if (patient.patzip) {
		$('#actionList').append('<li><a href="editdetails.html?id=' + patient.patientid + '">' +
				'<p class="line2">' + patient.patzip + '</p></a></li>');
	}
		if (patient.patdob) {
		$('#actionList').append('<li><a href="editdetails.html?id=' + patient.patientid + '">' +
				'<p class="line2">' + patient.patdob + '</p></a></li>');
	}
		if (patient.patdesc) {
		$('#actionList').append('<li><a href="editdetails.html?id=' + patient.patientid + '">' +
				'<p class="line2">' + patient.patdesc + '</p></a></li>');
	}
	setTimeout(function(){
	scroll.refresh();
	});
	db = null;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
