
function populateDB(tx) {
	$('#busy').show();
	
	//Create User Table
	tx.executeSql('DROP TABLE IF EXISTS user');
	var sql = 
		"CREATE TABLE IF NOT EXISTS user ( "+
		"userid INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"username VARCHAR(50), " +
		"password VARCHAR(50))";
    tx.executeSql(sql);
	
	//Create Patient Table
	tx.executeSql('DROP TABLE IF EXISTS patient');
	var sql = 
		"CREATE TABLE IF NOT EXISTS patient (" +
		"patientid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ," +
		"userid INTEGER NOT NULL ," +
		"patinitials VARCHAR(3) NULL ," +
		"patcity VARCHAR(45) NULL ," +
		"patstate VARCHAR(2) NULL ," +
		"patzip INTEGER NULL ," +
		"patdob DATE NULL ," +
		"patdesc BLOB NULL , " +
		"FOREIGN KEY (userid ) " +
		"REFERENCES user (userid) " +
		"ON DELETE CASCADE " +
		"ON UPDATE CASCADE)";
	tx.executeSql(sql);

	//Create Medication Table
	tx.executeSql('DROP TABLE IF EXISTS patmedication');
	var sql = 
		"CREATE TABLE IF NOT EXISTS patmedication (" +
		"patientid INTEGER NOT NULL PRIMARY KEY ," +
		"medicationdesc VARCHAR(45) NOT NULL ," +
		"FOREIGN KEY (patientid ) " +
		"REFERENCES patient (patientid) " +
		"ON DELETE CASCADE " +
		"ON UPDATE CASCADE)";
	tx.executeSql(sql);
	
	//Create Patient Condition Table
	tx.executeSql('DROP TABLE IF EXISTS patcondition');
	var sql = 
		"CREATE TABLE IF NOT EXISTS patcondition (" +
		"patientid INTEGER NOT NULL PRIMARY KEY ," +
		"diagnosis VARCHAR(150) NOT NULL ," +
		"dietaryplan BIT NULL ," +
		"comments BLOB NULL ," +
		"FOREIGN KEY (patientid ) " +
		"REFERENCES patient (patientid) " +
		"ON DELETE CASCADE " +
		"ON UPDATE CASCADE)";
	tx.executeSql(sql);
	
	//Create Physician Speciality Table
	tx.executeSql('DROP TABLE IF EXISTS physicianspec');
	var sql = 
		"CREATE TABLE IF NOT EXISTS physicianspec ( "+
		"physspecid INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"physspecialtydesc VARCHAR(50))";
    tx.executeSql(sql);
	
	//Create Physician Table
	tx.executeSql('DROP TABLE IF EXISTS physician');
	var sql = 
		"CREATE TABLE IF NOT EXISTS physician (" +
		"physicianid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ," +
		"physfname VARCHAR(45) NULL  ," +
		"physlname VARCHAR(45) NULL ," +
		"physaddress1 VARCHAR(45) NULL  ," +
		"physaddress2 VARCHAR(45) NULL ," +
		"physcity VARCHAR(45) NULL  ," +
		"physstate VARCHAR(2) NULL ," +
		"patzip INTEGER NULL ," +
		"physspecid INTEGER NOT NULL ," +
		"physcomments BLOB NULL , " +
		"FOREIGN KEY (physspecid ) " +
		"REFERENCES physicianspec (physspecid) " +
		"ON DELETE CASCADE " +
		"ON UPDATE CASCADE)";
	tx.executeSql(sql);
	
	//Create Checklist Objective Table
	tx.executeSql('DROP TABLE IF EXISTS objective');
	var sql = 
		"CREATE TABLE IF NOT EXISTS objective ( "+
		"objectiveid INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"objectivedesc VARCHAR(150))";
    tx.executeSql(sql);
	
	//Create Checklist Table
	tx.executeSql('DROP TABLE IF EXISTS checklist');
	var sql = 
		"CREATE TABLE IF NOT EXISTS checklist ( "+
		"checklistid INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"checklistdesc VARCHAR(150))";
    tx.executeSql(sql);
	
	//Create Checklist Objective Table (maps objectives to checklists)
	tx.executeSql('DROP TABLE IF EXISTS checklistobjective');
	var sql = 
		"CREATE TABLE IF NOT EXISTS checklistobjective (" +
		"checklistobjectiveid INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"checklistid INTEGER NOT NULL  ," +
		"objectiveid INTEGER NOT NULL  ," +
		"FOREIGN KEY (checklistid ) " +
		"REFERENCES checklist (checklistid) " +
		"ON DELETE CASCADE " +
		"ON UPDATE CASCADE , " +
		"FOREIGN KEY (objectiveid ) " +
		"REFERENCES objective (objectiveid) " +
		"ON DELETE CASCADE " +
		"ON UPDATE CASCADE )";
	tx.executeSql(sql);
	
	//Create Checklist Patient Response Table
	tx.executeSql('DROP TABLE IF EXISTS patientresponse');
	var sql = 
		"CREATE TABLE IF NOT EXISTS patientresponse (" +
		"patientid INTEGER NOT NULL  ," +
		"checklistobjectiveid INTEGER NOT NULL  ," +
		"response VARCHAR(45) NULL  ," +
		"FOREIGN KEY (patientid ) " +
		"REFERENCES patient (patientid) " +
		"ON DELETE CASCADE " +
		"ON UPDATE CASCADE , " +
		"FOREIGN KEY (checklistobjectiveid ) " +
		"REFERENCES checklistobjective (checklistobjectiveid) " +
		"ON DELETE CASCADE " +
		"ON UPDATE CASCADE )";
	tx.executeSql(sql);
	
	//Sample Data

	tx.executeSql("INSERT INTO user (userid, username, password) VALUES (1,'jdixon','test123')");
	tx.executeSql("INSERT INTO patient (patientid, userid, patinitials, patcity, patstate, patzip, patdob, patdesc) VALUES (1,1,'JAD', 'Glen Rock', 'PA', '17327', '1975-08-16', 'Downs Syndrome')");
	tx.executeSql("INSERT INTO patient (patientid, userid, patinitials, patcity, patstate, patzip, patdob, patdesc) VALUES (2,1,'SMD', 'Glen Rock', 'PA', '17327', '1974-08-26', 'Princess')");	
	tx.executeSql("INSERT INTO patient (patientid, userid, patinitials, patcity, patstate, patzip, patdob, patdesc) VALUES (3,1,'CHD', 'Glen Rock', 'PA', '17327', '2012-01-24', 'Genius')");
	alert("DB Populated");
}