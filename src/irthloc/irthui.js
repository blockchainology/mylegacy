var debugText = "";
var testCase = -1;
var resultsWindow;

function put(elem, val)
{
	if (isModern)
	{
		document.getElementById(elem).innerHTML = val;
	}
	else if (isIE)
	{
		document.all[elem].innerText = val;
	}
}

function initPage() {
	clearForm();
	clearPreferences();
	clearBequest();
	window.status = "Thank you for visiting IslamicSoftware.org.";
	if (_JavascriptVersion < 1.1) {
		var s = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"" + "><html" + "><head" + "><title" + ">Javascript Required</title" + "><meta http-equiv=\"X-UA-Compatible\" content=\"IE=EmulateIE7\"" + "></head" + "><body bgcolor='#fffacd'" + "><h1 align='center'" + ">This page requires JavaScript 1.1</h1><p>This page requires a browser which supports JavaScript 1.1 or later.</p><p>Your browser either does not support JavaScript, or it has JavaScript disabled. If you want to correctly view this page, please upgrade your browser or enable JavaScript support.</p></body" + "></html" + ">";
		var w = window.open(
			"blank-IGNORE.html", 
			"BadJavaScript", 
			"directories=0,status=0,toolbar=0,location=0,resizable=0,width=480,height=400,left=160,screenX=160,top=150,screenY=150"
		);
		if (!w.opener) w.opener = self;
		w.document.open();
		w.document.write(s);
		w.document.close();
		w.focus();
	}
}

function getStatusPrefix() {
	var s = "";
	if (getMode()==DEBUG) s += "[DEBUG]";
	if (school!=0) s += "[" + schoolNames[school] + "]";
	if (allowRuddToSpouses==true) s += "[Full Reversion]";
	else if (allowRudd==true) s += "[Reversion]";
	else s += "[No Reversion]";
	if (existsBequest==true) s += "[Bequest]";
	return s; 
}

function setStatus(s) {
	window.status = getStatusPrefix() + " " + s;
}

function getMode() {
	if (document.forms['PreferencesForm'].elements['ReportingMode'][2].checked==true)
		return (DEBUG);
	else if (document.forms['PreferencesForm'].elements['ReportingMode'][0].checked==true)
		return (RESULTS);
	else if (document.forms['PreferencesForm'].elements['ReportingMode'][3].checked==true)
		return (TABLE);
	else return (DETAILS);
}

function debug(msg) {
	if (getMode() == DEBUG) debugText += "[debug] " + msg + "<br" + ">";
}

function detail(msg) {
	if ((getMode() == DETAILS) || (getMode() == DEBUG)) debugText += msg + "<br" + ">";
}

function promptForBequest()
{
	var win = window.open(
		"bequest.html", 
		"BequestWindow", 
		"directories=0,status=0,toolbar=0,location=0,resizable=0,width=480,height=300,left=160,screenX=160,top=150,screenY=150"
	);
	if (!win.opener) win.opener = self;
	win.focus();
}

function collectInput() {
	var i;
	for (i=son; i<treasury; i++)
		nheirs[i] = eval("document.forms['IrthForm'].elements['num" + i + "'].value") *1;
	bequestShare = toRational(document.forms['PreferencesForm'].elements['bequestField'].value);
	if (isGt(bequestShare, none)) {
		existsBequest = true;
		nheirs[bequest] = 1 * 1;
	}
	else {
		existsBequest = false;
		nheirs[bequest] = 0 * 1;
	}
	nheirs[treasury] = 0 * 1;
	debug("===>collectInput: " + getHeirList());
	getHeirRange();
}

function correctInput() {	//returns boolean
	for (var i=son; i<treasury; i++) {
		if (!nheirs[i]) nheirs[i] = 0;
		if (isNaN(nheirs[i])) {
			alert("Non-numeric input next to " + heirCategory[i]);
			return false;
		}
		if ( (nheirs[i]>1) && ((i==husband) || (i==father) || (i==mother) || (i==gfather) ||
			(i==gmotherF) || (i==gmotherM) ) ) 
		{
			nheirs[i] = 1;
			detail("<b" + ">Correction:</b" + ">Number of " + heirsCategory[i] + " corrected to one");
			document.forms['IrthForm'].elements[eval("'num" + i + "'")].value = 1;
		}
	}
	if ((nheirs[husband]>0) && (nheirs[wife]>0)) {
		alert("Who survived, husband or wife?\nPlease correct input");
		return false;
	}
	if (nheirs[wife]>4) {
		nheirs[wife] = 4;
		detail("<b" + ">Correction:</b" + ">Number of wives reduced to four");
		document.forms['IrthForm'].elements['num6'].value = 4;
	}
	if (isNegative(bequestShare)) bequestShare = none;
	if (isGt(bequestShare, third)) {
		bequestShare = third;
		detail("<b" + ">Correction:</b" + ">Bequest reduced to one third");
	}
	return true;
}

function showGmGen()
{
	var win = window.open(
		"gmgen.html", 
		"GmGenWindow", 
		"directories=0,status=0,toolbar=0,location=0,resizable=0,width=480,height=400,left=160,screenX=160,top=150,screenY=150"
	);
	if (!win.opener) win.opener = self;
	win.focus();
}

function getGmGen() {
	var g = 0;
	if (document.forms['IrthForm'].elements['gmfy'].checked) g = 1;
	if (document.forms['IrthForm'].elements['gmmy'].checked) g = 2;
	debug("GM level = " + g);
	return g;
}

function getTableHeader() {
	return "<tr style='font: bold'" + "><td" + ">&nbsp;</td" + "><td" + ">Case</td" + "><td" + ">Sn</td><td" + ">Dr</td><td" + ">Ss</td><td" + ">Ds</td><td" + ">Hb</td><td" + ">Wf</td><td" + ">Fr</td><td" + ">Mr</td><td" + ">GF</td><td" + ">Gf</td><td" + ">Gm</td><td" + ">Br</td><td" + ">Sr</td><td" + ">Bf</td><td" + ">Sf</td><td" + ">Sm</td><td" + ">Nu</td><td" + ">Nf</td><td" + ">Un</td><td" + ">Uf</td><td" + ">Cz</td><td" + ">Cf</td><td" + ">Fs</td><td" + ">Rm</td><td" + ">Tr</td><td" + ">Sch</td><td" + ">Rev</td><td" + ">Bq</td></tr>";
}

function getTabulatedPageHeader() {
	return 	"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"" + "><!-- saved from url=(0056)http://www.islamicsoftware.org/irth/blank-IGNORE.html --" + "><html" + "><head" + "><title" + ">Irth Results</title" + "><meta http-equiv=\"X-UA-Compatible\" content=\"IE=EmulateIE7\"" + "></head" + "><body" + "><table border='1'" + ">" + getTableHeader();
}

function getTabulatedRow(c) {
	var multiplier;
	var i, num;
	var results = "<tr style='background: #fffacd'" + "><td" + ">Heirs</td" + ">";
	results += "<td align='right'" + ">" + (c || c>=0? c : "&nbsp;") + "</td" + ">";
	for (i=son; i<treasury; i++) {
		results += "<td align='right'" + ">" + nheirs[i] + "</td" + ">";
	}
	for (i=0; i<4; i++) {
		results += "<td" + ">&nbsp;</td" + ">";
	}
	results += "</tr" + "><tr" + "><td" + ">Shares</td" + ">";
	results += "<td" + ">&nbsp;</td" + ">";
	for (i=son; i<=treasury; i++) {
		if (i==treasury) multiplier = whole;
		else multiplier = new Rational(1, nheirs[i]);
		if (isZero(has(i))) results += "<td align='right'" + ">0</td" + ">";
		else if (isOne(has(i))) results += "<td" + ">ALL</td" + ">";
		else results += "<td align='right'" + ">" + toString(multiply(has(i), multiplier)) + "</td" + ">";
	}	
	if (school>0) results += "<td" + ">" + schoolNames[school] + "</td" + ">";
	else results += "<td" + ">&nbsp;</td" + ">";
	var rev;
	if (allowRuddToSpouses==true) rev = "Full";
	else if (allowRudd==true) rev = "Yes";
	else rev = "No";
	results += "<td" + ">" + rev + "</td" + ">";
	if (isZero(has(bequest))) results += "<td" + ">0</td" + ">";
	else if (isOne(has(bequest))) results += "<td" + ">ALL</td" + ">";
	else results += "<td" + ">" + toString(has(bequest)) + "</td" + ">";
	results += "</tr" + ">";
	return results;
}

function getTabulatedPageFooter() {
	return "</table" + "></body" + "></html" + ">";
}

function runTests(c1, c2) { 
	var results = getTabulatedPageHeader();
	var saveMode = RESULTS;
	for (var i=0; i<4; i++) {
		if (document.forms['PreferencesForm'].elements['ReportingMode'][i].checked==true) {
			saveMode = i;
			break;
		}
	}
	var currentSchool = 0;
	for (i=0; i<6; i++) {
		if (document.forms['PreferencesForm'].elements['School'][i].checked==true) {
			currentSchool = i;
			break;
		}
	}
	document.forms['PreferencesForm'].elements['ReportingMode'][3].click();
	for (var c=c1; c<=c2; c++) {
		initialize(); 
		var carray = getTestCase(c);
		for (i=1; i<treasury; i++) {
			nheirs[i] = carray[i]-0;
		}
		nheirs[bequest] = 0;
		nheirs[treasury] = 0;
		if (carray.length > 26) school = carray[26]-0;
		else school = currentSchool;
		if (carray.length > 25) {
			if (carray[25]>1) allowRuddToSpouses = true;
			else allowRuddToSpouses = false;
			if (carray[25]>0) allowRudd = true;
			else allowRudd = false;
		}
		else {
			allowRuddToSpouses = (document.forms['PreferencesForm'].elements['allowRuddToSpousesBox'].checked == true);
			allowRudd = (document.forms['PreferencesForm'].elements['allowRuddBox'].checked == true);
		}
		bequestShare = toRational(document.forms['PreferencesForm'].elements['bequestField'].value);
		if (isGt(bequestShare, third)) bequestShare = third;
		getHeirList();
		calculateShares();
		//sum = whole, so make sure any -ve share marks left are voided
		for (i=son; i<=treasury; i++) {
			if (nheirs[i] > 0 && isNegative(has(i))) gets(i, none);
		}
		results += getTabulatedRow(c);
		if ((c>c1) && (c<c2) && ((c-c1)%10==0)) results += getTableHeader();
	}
	results += getTabulatedPageFooter();
	if (resultsWindow) {
		resultsWindow.close();
		resultsWindow = null;
	}
	resultsWindow = open("blank-IGNORE.html","IrthResults");
	resultsWindow.document.open();
	resultsWindow.document.write(results);
	resultsWindow.document.close();
	document.forms['IrthForm'].elements['DetailsButton'].disabled=false;
	document.forms['PreferencesForm'].elements['ReportingMode'][saveMode].click();
} 

function runAllTests() {
	runTests(0, lastCase());
}

function displaySharesTabulated() {		
	var results = getTabulatedPageHeader() +
		getTabulatedRow() +
		getTabulatedPageFooter();
	
	if (resultsWindow) {
		resultsWindow.close();
		resultsWindow = null;
	}
	resultsWindow = open("blank-IGNORE.html","IrthResults");
	resultsWindow.document.open();
	resultsWindow.document.write(results);
	resultsWindow.document.close();
	document.forms['IrthForm'].elements['DetailsButton'].disabled=false;
}

function displaySharesNS() {		//older, non-IE browsers
	if (getMode()==TABLE) {
		displaySharesTabulated();
		return;
	}
	var results = 
		"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"" + "><!-- saved from url=(0053)http://www.islamicsoftware.org/irth/blank-IGNORE.html --" + "><html" + "><head" + "><title" + ">Irth Results</title" + "><meta http-equiv=\"X-UA-Compatible\" content=\"IE=EmulateIE7\"" + "></head" + "><body" + "><b" + ">***** START *****</b" + "><br" + ">";
	results += "<" + "table border=\"1\"><" + "tr><" + "td><" + "b>THE HEIRS<" + "/td><" + "/tr><" + "/table>";
	results += getHeirList() + "<br" + ">";
	
	results += "<" + "table border=\"1\"><" + "tr><" + "td><" + "b>ESTATE DISTRIBUTION<" + "/td><" + "/tr><" + "/table>";
	var multiplier;
	var i, num;
	for (i=son; i<treasury; i++) {
		num = nheirs[i]-0;
		if (num > 1) {
			multiplier = new Rational(1, nheirs[i]);
			results += "<b" + ">" + heirsCategory[i] + "</b" + "> get <b" + ">" + 
				toString(multiply(has(i), multiplier)) + "</b" + "> each<br" + ">";
		}
		else if (num > 0)
			results += "<b" + ">" + heirCategory[i] + "</b" + "> gets <b" + ">" + 
				toString(has(i)) + "</b><br>";
	}
	results += "<b" + ">" + heirCategory[treasury] + "</b> gets <b" + ">" +
		toString(has(treasury)) + "</b><br>";
	results += "<b" + ">Bequest to non-heirs</b" + "> is <b" + ">" + toString(has(bequest)) + "</b" + "><br" + ">";
	
	results += "<" + "table border=\"1\"><" + "tr><" + "td><" + "b>Preferences<" + "/td><" + "/tr><" + "/table>";
	results += "Preferred juristic school: " + schoolNames[school] + "<br" + ">";
	results += "Reversion " + ((allowRudd==true)? "is" : "is not") + " allowed.<br" + ">";
	results += "Reversion to spouses " + ((allowRuddToSpouses==true)? "is" : "is not") + " allowed.<br" + ">";
	results += "Bequest to non-heirs: " + toString(bequestShare) + "<br" + ">";

	if (debugText != null && debugText != "") {
		results += "<" + "table border=\"1\"><" + "tr><" + "td><" + "b>Details<" + "/td><" + "/tr><" + "/table>" + debugText;
	}
	results += "<b" + ">***** END *****</b" + "><br" + "><br" + "></body" + "></html" + ">";

	if (resultsWindow) {
		resultsWindow.close();
		resultsWindow = null;
	}
	resultsWindow = open("blank-IGNORE.html","IrthResults");
	resultsWindow.document.open();
	resultsWindow.document.write(results);
	resultsWindow.document.close();
	if (typeof resultsWindow.focus != "undefined") resultsWindow.focus();
}

function displayShares() {
	clearShares();
	displaySharesNS();
	document.forms['IrthForm'].elements['DetailsButton'].disabled=false;
	if (isModern || isIE) {
		var multiplier;
		var i;
		for (i=son; i<treasury; i++) {
			if ((nheirs[i]-0) > 1) {
				multiplier = new Rational(1, nheirs[i]);
				put('get'+i, toString(multiply(has(i), multiplier)));
			}
			else if ((nheirs[i]-0) > 0) {
				put('get'+i, toString(has(i)));
			}
		}
		put('get'+bequest, toString(has(bequest)));
		put('get'+treasury, toString(has(treasury)));
	}
	window.focus();
}

function calculate() {
	debugText = "";
	detail("<b" + ">*** Initializing ***</b" + ">");
	initialize();
	detail("<b" + ">*** Collecting Input ***</b" + ">");
	collectInput();		//populates nheirs[] from num input array
	if (correctInput()) {
		detail("<b" + ">*** Calculating ***</b" + ">");
		if (assertTrue(calculateShares(), "Error during share calculation"))
		{
			setStatus("Calculation done");
		}
		else {
			setStatus("Calculation incomplete");
		}
		detail("<b" + ">*** Displaying Results ***</b" + ">");
		displayShares();
	}
	else
		alert("Error occured during input validation. Please correct and re-try.");
}

function clearHeirs() {
	debug("===>clearHeirs()");
	var j;
	for (j=son; j<treasury; j++) {
		document.forms['IrthForm'].elements['num'+j].value = "";
	}
	if (document.forms['IrthForm'].elements['gmfy'].checked==true)
		document.forms['IrthForm'].elements['gmfy'].click();
	if (document.forms['IrthForm'].elements['gmmy'].checked==true)
		document.forms['IrthForm'].elements['gmmy'].click();
}

function clearShares() {
	if (isModern || isIE) {
		debug("===>clearShares()");
		var i;
		for (i=bequest; i<=treasury; i++) {
			put('get'+i, "");
		}
	}
}

function clearBequest() {
	document.forms['PreferencesForm'].elements['bequestField'].value = "";
}

function clearPreferences() {
	document.forms['PreferencesForm'].elements['ReportingMode'][0].click();
	document.forms['PreferencesForm'].elements['School'][0].click();
	if (document.forms['PreferencesForm'].elements['allowRuddBox'].checked==false)
		document.forms['PreferencesForm'].elements['allowRuddBox'].click();
	if (document.forms['PreferencesForm'].elements['allowRuddToSpousesBox'].checked==true)
		document.forms['PreferencesForm'].elements['allowRuddToSpousesBox'].click();
}

function clearForm() {
	debug("===>clearForm()");
	clearHeirs();
	clearShares();
	document.forms['IrthForm'].elements['TestCaseSelector'].selectedIndex=0;
	if (isModern || isIE) put('caseNum', "");
	else document.forms['IrthForm'].elements['caseNum'].value="";
	document.forms['IrthForm'].elements['DetailsButton'].disabled=true;
	if (resultsWindow) {
		resultsWindow.close();	
		resultsWindow = null;
	}
}

function populateForm(harray) { 
	debug("===>populateForm(...)"); 
	var i; 
	for (i=son; i<treasury && i<harray.length; i++) 
		document.forms['IrthForm'].elements['num'+i].value = harray[i]; 
} 

function updateTestButtons() {
	if (testCase<=0)
		document.forms['IrthForm'].elements['PreviousTestButton'].disabled=true;
	else if (testCase>=lastCase())
		document.forms['IrthForm'].elements['NextTestButton'].disabled=true;
	else {
		document.forms['IrthForm'].elements['PreviousTestButton'].disabled=false;
		document.forms['IrthForm'].elements['NextTestButton'].disabled=false;
	}
	if (isModern || isIE) {
		if (testCase>=0 && testCase<=lastCase()) 
			put('caseNum', "Case " + (testCase-0+1) + " of " + (lastCase()-0+1)); 
		else 
			put('caseNum', ""); 
	}
	else
	{
		if (testCase>=0 && testCase<=lastCase()) 
			document.forms['IrthForm'].elements['caseNum'].value = "Case " + (testCase-0+1) + " of " + (lastCase()-0+1); 
		else 
			document.forms['IrthForm'].elements['caseNum'].value = ""; 	
	}
}

function populateFromCase(caseNumber) { 
	var harray = getTestCase(caseNumber);
	 
	var currentSchool = 0;
	for (var i=0; i<6; i++) {
		if (document.forms['PreferencesForm'].elements['School'][i].checked==true) {
			currentSchool = i;
			break;
		}
	}
	if (harray.length > 26) school = harray[26]-0;
	else school = currentSchool;
	if (harray.length > 25) {
		if (harray[25]>1) allowRuddToSpouses = true;
		else allowRuddToSpouses = false;
		if (harray[25]>0) allowRudd = true;
		else allowRudd = false;
	}
	else {
		allowRuddToSpouses = (document.forms['PreferencesForm'].elements['allowRuddToSpousesBox'].checked == true);
		allowRudd = (document.forms['PreferencesForm'].elements['allowRuddBox'].checked == true);
	}
	bequestShare = toRational(document.forms['PreferencesForm'].elements['bequestField'].value);
	if (isGt(bequestShare, third)) bequestShare = third;

	harray[treasury] = 0;
	harray[bequest] = 0;
	populateForm(harray);
	for (i=0; i<harray.length; i++) {
		nheirs[i] = harray[i] * 1;
	}
	debug("===>populateFromCase #" + caseNumber + ":" + getHeirList()); 
	getHeirRange();
	updateTestButtons(); 
} 

function generateRandomHeirs() { 
	var harray = new Array(26); 
	harray[0] = 0; //always 
	var i; 
	for (i=son; i<treasury; i++) { 
		if (	(i==father) || (i==mother) || (i==gfather) || 
			(i==gmotherF) || (i==gmotherM)
		) 
			harray[i] = Math.round(Math.random()); //a zero or one 
		else harray[i] = Math.floor(Math.random() * 12); //a number from 0 to 12 
	} 
	if ((harray[husband]>0) && (harray[wife]>0)) { 
		if (harray[husband]>=harray[wife]) { 
			harray[husband] = 1; 
			harray[wife] = 0; 
		} 
		else harray[husband] = 0; 
	} 
	if (harray[wife] > 4) harray[wife] = 4; 
	if (harray[husband] > 1) harray[husband] = 1; 
	harray[treasury] = 0; 
	return harray; 
} 

function populateRandomly() { 
	var harray = generateRandomHeirs(); 
	populateForm(harray); 
	nheirs = harray; 
	debug("===>populateRandomly: " + getHeirList()); 
	getHeirRange(); 
} 

function calculateTestCase(caseNumber) { 
	initialize(); 
	clearForm(); 
	populateFromCase(caseNumber); 
	debug("===>calculateTestCase(" + caseNumber + ")"); 
	if (assertTrue(calculateShares(), "Error during share calculation")) { 
		//sum = whole, so make sure any -ve share marks left are voided
		for (var i=son; i<=treasury; i++) {
			if (nheirs[i] > 0 && isNegative(has(i))) 
				deprive(i, "Because estate is now fully subscribed after applying all the rules");
		}
		displayShares(); 
		testCase = caseNumber;
		updateTestButtons(); 
	} 
} 

function previousTest() { 
	if (testCase>0) calculateTestCase(testCase-1); 
} 

function nextTest() { 
	if (testCase<lastCase()) calculateTestCase(testCase-0+1); 
} 

function randomTest() { 
	initialize(); 
	clearForm(); 
	populateRandomly(); 
	debug("===>Random test: " + getHeirList()); 
	if (assertTrue(calculateShares(), "Error during share calculation")) 
		displayShares(); 
} 

function showTestCase(tc)
{
	debug("Test case #" + tc);
	var tc1 = tc * 1;
	if ((tc1>=0) && (tc1<=lastCase())) {
		calculateTestCase(tc1);
	}
	else if (tc1==-2) {
		calculateTestCase(getRandomTestCase());
	}
	else if (tc1==-3) {
		randomTest();
	}
	else if (tc1==-7) {
		runAllTests();
	}
	setStatus("Test case calculation done");
}

function translate(lng)
{
	window.status = "Translating to " + lng;	//setStatus() didn't work for Firefox!
	//alert("host="+location.host+"\nhostname="+location.hostname+"\npathname="+location.pathname+"\nprotocol="+location.protocol+"\nport="+location.port+"\nhash="+location.hash+"\nsearch="+location.search);
	var path0 = location.pathname;
	var path = "";
	var c0, c;
	for (i=0; i<path0.length; i++)
	{
		c0 = path0.substr(i,1);
		if (c0=="\\")
		{
			c = "/";
		}
		else
		{
			c = c0;
		}
		path += c; 
	}
	var lastx = path.lastIndexOf("/");
	var fil, dir;
	if (lastx<0)
	{
		fil = path;
		dir = "";
	}
	else
	{
		fil = path.substr(lastx + 1);
		dir = path.substr(0, lastx);
	}
	//alert(path0 + "\n" + path + "\n" + lastx + "\n" + fil + "\n" + dir);
	var nuloc = dir + "/" + lng + "/" + fil;
	//alert(nuloc);
	top.location.href = nuloc;
	window.status = "";
}

