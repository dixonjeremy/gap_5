var db;
var dbCreated = false;

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("mtna", "1.0", "MTNA", 200000);
    if (dbCreated)
    	db.transaction(getPatients, transaction_error);
    else
    	db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getPatients, transaction_error);
}

function getPatients(tx) {
	var sql = "select p.patientid, p.patinitials, p.patcity, p.patstate, p.patzip, p.patdob, p.patdesc " + 
				"from patient p order by p.patientid";
	tx.executeSql(sql, [], getPatient_success);
}

function getPatient_success(tx, results) {
	$('#busy').hide();
    var len = results.rows.length;
	if (len == 0) {
		$('#patientList').append('<p>You currently do not have any patients.</p>');
	} else {
    for (var i=0; i<len; i++) {
    	var patient = results.rows.item(i);
		$('#patientList').append('<li><a href="patientdetails.html?id=' + patient.patientid + '">' +
				'<p class="line1">' + patient.patinitials + "|" + patient.patcity + "|" + patient.patstate + "|" + patient.patzip + '</p>' +
				'<p class="line2">' +patient.patdob + "|" + patient.patdesc + '</p></a><a href="patientedit.html?id=' + patient.patientid + '"class="button blue">Edit Patient</a></li>');
    }
	}
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}

