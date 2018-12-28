//Islamic Inheritance Calculator, IRTH
//Author: Dr. Ayman Abu-Mostafa
//Terms: May not be sold, but may be freely distributed, as long as this header is included and kept unchanged.

//Load rational.js and define debug() before this file

//Constants
whole = new Rational(1,1);	
none = new Rational(0,1);
twothirds = new Rational(2,3);
half = new Rational(1,2);
third = new Rational(1,3);
quarter = new Rational(1,4);
sixth = new Rational(1,6);
eighth = new Rational(1,8);

function toshare() {			//defining it as a constant didn't work!
	return new Rational(-1,1);
}

bequest = 0;
son = 1;		daughter = 2;	gson = 3;		gdaughter = 4;
husband = 5;	wife = 6;		father = 7;		mother = 8;
gfather = 9;	gmotherF = 10;	gmotherM = 11;	brother = 12;
sister = 13;	brotherF = 14;	sisterF = 15;	siblingM = 16;
nephew = 17;	nephewF = 18;	uncle = 19;		uncleF = 20;
cousin = 21;	cousinF = 22;	freed = 23;		relativeM = 24;
treasury= 25;
heirCategory = new Array("Bequest to non-heirs", "Son", "Daughter", "Son of son", "Daughter of son",
	"Husband", "Wife", "Father", "Mother", "Father of father (or higher)", "Mother of father (or higher)",
	"Mother of mother (or higher)", "Full brother", "Full sister", "Half-brother from father",
	"Half-sister from father", "Sibling from mother", "Son of full brother", 
	"Son of half-brother from father", "Full brother of father", 
	"Half-brother of father from his father", "Son of full brother of father",
	"Son of half-brother of father from his father", "Servant", "Other relative to mother", "Islamic Treasury");
heirsCategory = new Array("Bequest to non-heirs", "Sons", "Daughters", "Sons of sons", "Daughters of sons",
	"Husband", "Wife", "Father", "Mother", "Father of father (or higher)", "Mother of father (or higher)",
	"Mother of mother (or higher)", "Full brothers", "Full sisters", "Half-brothers from father",
	"Half-sisters from father", "Siblings from mother", "Sons of full brother", 
	"Sons of half-brother from father", "Full brothers of father", 
	"Half-brothers of father from his father", "Sons of full brothers of father",
	"Sons of half-brothers of father from his father", "Servants", "Other relatives to mother", "Islamic Treasury");

//Preferences
DETAILS = 1;
RESULTS = 0;
DEBUG = 2;
TABLE = 3;

var allowRudd = true;
var allowRuddToSpouses = false;
Hanafi = 1;
Maliki = 2;
Shafii = 3;
Hanbali = 4;
Egypt = 5;
var school = 0;
schoolNames = new Array("None", "Abu-Haneefa", "Malik", "Shafii", "Ibn-Hanbal", "Egyptian Law");

//Variables
var nheirs;		//Array(26)
var shares;  	//Array(26)
var namedShares;//Array(26)
var firstHeir;	
var lastHeir;
var mdec;		//Flag if there's a male descendant	
var fdec;		//Flag if there's a female descendant
var fasab;		//Flag if there's female agnates with other females
var gfb;		//Flag if it's the case of a grandfather and brothers
var gfs;        //Flag if it's the case of a grandfather and sisters
var mushtarika;	//Flag if it's the Mushtarika case
var akdaria;    //Flag if it's the Akdaria case
var existsBequest;
var bequestShare;
var remain;
var sum;

function assertTrue(condition, errmsg) {
	if (!condition) {
		alert("BUG:\n" + errmsg + "\nPlease report it to the author.");
		detail("[ERROR] " + errmsg);
	}
	return condition;
}

function gets(h, sh) {
	if ((nheirs[h]>0) || (h==treasury) || (h==bequest)) {
		if (nheirs[h] == 1) debug(heirCategory[h] + " gets " + toString(sh));
		else debug(heirsCategory[h] + " get " + toString(sh));
		shares[h] = sh;
	}
}

function has(h) {
	if ((nheirs[h]>0) || (h==treasury) || (h==bequest)) {
		if (nheirs[h] == 1) debug(heirCategory[h] + " has " + toString(shares[h]));
		else debug(heirsCategory[h] + " have " + toString(shares[h]));
		return shares[h];
	}
	else return none;
}

function isToShare(h) {
	if (nheirs[h] > 0) {
		var sh = has(h);
		var b = (sh.num < 0) && (sh.denom >= 1);
		if (nheirs[h] == 1) debug(heirCategory[h] + (b? " agnates" : " does not agnate"));
		else debug(heirsCategory[h] + (b? " agnate" : " do not agnate"));
		return b;
	}
	else return false;
}

function isVoid(h) {
	return ((nheirs[h] == 0) || isZero(shares[h]));
}

function deprive(h, reason) {
	if (nheirs[h] == 0) return;
	if (nheirs[h] == 1) detail(heirCategory[h] + " is deprived " + reason);
	else detail(heirsCategory[h] + " are deprived " + reason);
	shares[h] = none;
}

function depriveRange(h1, h2, reason) {
	for (var i=h1; i<=h2; i++)
		deprive(i,reason);
}

/**
 * Sums up all given shares (not including amount to be shared)
 * and sets the global variables sum and remain.
 * Notice that calculation is done on estate, which is one less any bequest.
 */
function sumUp() {
	var summ = none;
	for (var i=firstHeir; i<=lastHeir; i++) {
		if ((nheirs[i]>0) && !isToShare(i)) 		//add only unmarked shares
			summ = add(summ, shares[i]);
	}
	summ = add(summ, shares[treasury]);
	detail("===> Sum now is " + toString(summ));
	sum = summ;
	remain = subtract(whole,sum);
	detail(toString(remain) + " now remains");
}

function addsUp() {
	sumUp();
	return isZero(remain);
}

function calculateRemainder() {
	sumUp();
	return remain;
}

function isOversubscribed() {
	return isGt(sum, whole);
}

function isUndersubscribed() {
	return isLt(sum, whole);
}

function isRevertTo(h) {
	/*if (school == Maliki) {
		return false;
	}*/
	//Commented out because user may override with preference.
	if (allowRudd==false) {
		return false;
	}
	var b = (h==daughter) || (h==gdaughter) || (h==mother) || (h==gmotherF) || (h==gmotherM) || 
		(h==sister) || (h==sisterF) || (h==siblingM);
	if (allowRuddToSpouses==true) {
		detail("Following Uthman's opinion to include spouses in reversion");
		b = b || (h==husband) || (h==wife);
	}
	if ((!isVoid(h)) && (nheirs[h] == 1)) 
		detail(heirCategory[h] + (b? " participates " : " does not participate ") + "in 'rudd' (reversion)");
	else if ((!isVoid(h)) && (nheirs[h] > 1))
		detail(heirsCategory[h] + (b? " participate " : " do not participate ") + "in 'rudd' (reversion)");
	return b;
} 

function initialize() {
	//defining this as a global constant didn't work!
	var named_shares = new Array(none,whole,half,whole,half,half,quarter,whole,third,whole,sixth,sixth,whole,half,
		whole,half,sixth,whole,whole,whole,whole,whole,whole,whole,none,none);	
	nheirs = new Array(26);
	shares = new Array(26);	
	namedShares = new Array(26);	
	for (var i=0; i<nheirs.length && i<shares.length && i<named_shares.length && i<namedShares.length; i++) {
		namedShares[i] = named_shares[i];
		nheirs[i] = 0 * 1;	
		shares[i] = named_shares[i];
	}
	mdec = false;	fdec = false;	fasab = false;	gfb = false;    gfs = false;	
	mushtarika = false;     akdaria = false;
	remain = whole;	    sum = none;		
	existsBequest = false;			bequestShare = none;
	firstHeir = 0;	    lastHeir = 0;
}

function getHeirList() {
	var heirList = "";
	for (var j=son; j<treasury; j++) {
		if (nheirs[j]>0) {
			if (nheirs[j]==1) heirList += heirCategory[j] + ";";
			else heirList += nheirs[j] + " " + heirsCategory[j] + ";";
		}
	}
	debug("===>getHeirList: " + heirList);
	return heirList;
}

function getHeirRange() {
	firstHeir = 0;
	for (var i=son; i<treasury; i++) {
		if (nheirs[i]>0) {
			firstHeir = i;
			break;
		}
	}
	lastHeir = 0;
	for (var j=treasury-1; j>=son; j--) {
		if (nheirs[j]>0) {
			lastHeir = j;
			break;
		}
	}
	if ((firstHeir>0) && (lastHeir<treasury))
		debug("First heir is " + heirCategory[firstHeir] + " and last heir is " + heirCategory[lastHeir]);
}

//Inheritance Rules
function calcShare(h) {
	if (!assertTrue((h>0) && (h<=treasury), "calcShare: " + h + " is not a valid heir")) return false;
	var n = nheirs[h];
	debug(h + ":" + n + "=" + (shares[h]? toString(shares[h]): "NULL"));
	if (n==0) {
		shares[h] = none;
		return true;
	}
	else if (shares[h] && isZero(shares[h])) return true;		//been deprived in a previous iteration
	if (n == 1) detail("(" + h + ") Calculating share of: " + heirCategory[h]);
	else detail("(" + h + ") Calculating share of: " + heirsCategory[h]);
	var sh = has(h);
	switch(h) {
	case son:
		if (n == 1) {
			deprive(gson,"because of son");
			deprive(gdaughter,"because of son");
			depriveRange(brother,treasury,"because of son");
		}
		else {
			deprive(gson,"because of sons");
			deprive(gdaughter,"because of sons");
			depriveRange(brother,treasury,"because of sons");
		}
		sh = toshare();
		if (n == 1) detail("Son will share by agnation");
		else detail("Sons will share by agnation");
		mdec = true;
		break;
	case daughter:
		if (n==1) deprive(siblingM,"because of daughter");		
		else deprive(siblingM,"because of daughters");
		if ((n>1) && (nheirs[gson]==0))
			deprive(gdaughter,"because more than one daughter and no sons of sons (cannot agnate)");
		fdec = true;
		if (nheirs[son]>0) {
			sh = multiply(has(son), half);
			if (n == 1 && nheirs[son] == 1) detail("Daughter will share with son by ratio of 1:2");
			else if (n == 1 && nheirs[son] > 1) detail("Daughter will share with sons by ratio of 1:2");
			if (n > 1 && nheirs[son] == 1) detail("Daughters will share with son by ratio of 1:2");
			else detail("Daughters will share with sons by ratio of 1:2");
		}
		//May agnate with other females, in which case the following
		//else statements still apply
		else if (n==1) {
			sh = half;
			detail("One daughter and no sons, she gets half");
		}
		else {
			sh = twothirds;
			detail("More than one daughter and no sons, they share two thirds");
		}
		break;
	case gson:
		if (n == 1) depriveRange(brother,treasury,"because of son of son");	
		else depriveRange(brother,treasury,"because of sons of sons");
		mdec = true;
		sh = toshare();
		if (n == 1) detail("son of son may share by agnation");
		else detail("sons of sons may share by agnation");
		break;
	case gdaughter:
		if (n==1) deprive(siblingM,"because of daughter of son");	
		else deprive(siblingM,"because of daughters of sons");		
		fdec = true;
		if (nheirs[gson]>0) {
			sh = multiply(has(gson), half);
			if (n==1 && nheirs[gson]==1) detail("Daughter of son will share with son of son by ratio of 1:2");
			else if (n==1 && nheirs[gson]>1) detail("Daughter of son will share with sons of sons by ratio of 1:2");
			else if (n>1 && nheirs[gson]==1) detail("Daughters of sons will share with son of son by ratio of 1:2");
			else detail("Daughters of sons will share with sons of sons by ratio of 1:2");
		}
		else if ((nheirs[daughter]==1) || (nheirs[sister]==1) || (nheirs[sisterF]==1)) {	
			sh = sixth;
			detail("No sons of sons and one daughter, sister or half-sister from father, so daughter(s) of son(s) get one sixth to complete two thirds");
		}
		//Case of nheirs[daughter]>1 taken care of under daughter above
		else if (n==1) {
			sh = half;
			detail("One daughter of son and no sons of sons, she gets half");
		}
		else {
			sh = twothirds;
			detail("More than one daughter of son(s) and no sons of sons, they share two thirds");
		}
		break;
	case husband:
		if (!assertTrue(nheirs[wife]==0, "husband and wife cannot have both survived")) return false;
		deprive(wife,"because she is the testator!");	
		if ((mdec==true) || (fdec==true)) {
			sh = quarter;
			detail("Testator left children or grandchildren, husband gets quarter");
		}
		else {
			sh = half;	
			detail("Testator left no children nor grandchildren, husband gets half");
		}
		break;
	case wife:
		if (!assertTrue(nheirs[husband]==0, "husband and wife cannot have both survived")) return false;
		deprive(husband,"because he is the testator!");	
		if ((mdec==true) || (fdec==true)) {
			sh = eighth;
			detail("Testator left children or grandchildren, wife gets one eighth");
		}
		else {
			sh = quarter;
			detail("Testator left no children nor grandchildren, wife gets quarter");
		}
		break;
	case father:
		deprive(gfather,"because of father");
		if (school != Hanbali) deprive(gmotherF,"because of father");
		depriveRange(brother,treasury,"because of father");	
		if (mdec==true) {
			sh = sixth;
			detail("Testator left male descendants, father gets one sixth");
		}
		else if (fdec==true) {
			sh = sixth;
			detail("Testator left female descendants, father gets one sixth. He may get more by agnation");		
		}
		else if ( ((nheirs[husband]*1+nheirs[wife]*1)>0) && (nheirs[mother]>0) ) {	//Al-Gharraa, or the Umariyyatan
		    detail("Al-Gharraa case");
			var numsib = 0;
			numsib += nheirs[brother]*1;
			numsib += nheirs[sister]*1;
			numsib += nheirs[siblingM]*1;
			numsib += nheirs[brotherF]*1;
			numsib += nheirs[sisterF]*1;
			debug("Number of siblings = " + numsib);
			if ( numsib>1 ) {
				shares[mother] = sixth;
				sh = toshare();
				detail("Testator left a spouse, a father, a mother and siblings. Mother gets one sixth and father inherits by agnation");
			}
			else {
				shares[father] = none;	//So we can add up the others
				shares[mother] = none;
				sumUp();
				sh = multiply(remain, twothirds);
				shares[mother] = multiply(remain, third);
				detail("Testator left a spouse, a father and a mother, father shares remainder with mother by ratio of 2:1 (Omar's verdict)");
			}
		}
		else {
			//sh = third;
			//detail("Testator left no descendants, father gets one third. He may get more by agnation.");
			sh = toshare();
			detail("Testator left no descendants, father inherits by agnation.");
		}
		break;
	case mother:
		deprive(gmotherM,"because of mother");
		deprive(gmotherF,"because of mother");	
		//See if siblings have not been deprived
		var sumsib = none;
		sumsib = add(has(brother), sumsib);
		sumsib = add(has(sister), sumsib);
		sumsib = add(has(siblingM), sumsib);
		sumsib = add(has(brotherF), sumsib);
		sumsib = add(has(sisterF), sumsib);
		debug("Sum of shares of siblings is " + toString(sumsib));
		numsib = 0;
		numsib += nheirs[brother]*1;
		numsib += nheirs[sister]*1;
		numsib += nheirs[siblingM]*1;
		numsib += nheirs[brotherF]*1;
		numsib += nheirs[sisterF]*1;
		debug("Number of siblings = " + numsib);
		if ((mdec==true) || (fdec==true)) {
			sh = sixth;
			detail("Testator left decendants, mother gets one sixth");
		}
		else if ( (nheirs[husband]+nheirs[wife]>0) && (nheirs[father]>0) ) {
			//Do nothing. It's been taken care of under father above	//Omar's verdict
			//detail("Testator left a spouse, a father and a mother, mother shares remainder with father by ratio of 1:2 (Omar's verdict)");
		}
		//else if (numsib>1 && !isZero(sumsib)) {
		else if (numsib>1) {
			sh = sixth;
			detail("Testator left more than one sibling, mother gets one sixth");
		}
		else {
			sh = third;
			detail("Mother gets a third");
		}
		break;
	case gfather:
		if (school==Hanafi) depriveRange(brother,treasury,"because of father of father, according to Abu-Haneefa");
		else depriveRange(siblingM,treasury,"because of father of father");
		//See if we have the grandfther-and-brothers case
		var numsib = 0;
		var numbro = nheirs[brother]*1 + nheirs[brotherF]*1;
		var numsis = nheirs[sister]*1 + nheirs[sisterF]*1;
		//siblingM excluded becaue deprived
		numsib = numbro + numsis;
		if (numsib > 0) gfb = true;
		if (mdec==true) {
			sh = sixth;
			detail("Testator left male descendants. Father of father gets one sixth.");
		}
		else if (fdec==true) {
			sh = sixth;
			detail("Testator left female descendants. Father of father gets one sixth. He may get more by agnation");		
		}
		else if (numsis>0 && numbro==0) {
		    gfs = true;
		    if ((nheirs[mother]*1+nheirs[gmotherF]*1+nheirs[gmotherM]*1>0) && (nheirs[husband]*1+nheirs[wife]*1>0) && (nheirs[sister]*1+nheirs[sisterF]*1>0))
		    {
		        akdaria = true;
		        sh = sixth;
		        detail("Akdaria case. Setting share of father of father to 1/6 before redivision.");
		        //To be followed, for the later schools, by redivision then agnation!
		    }
		    else {
		        sh = toshare(); 
			    detail("Testator left no descendants. Father of father inherits by agnation.");
		    }    
		}
		else {
			sh = toshare();
			detail("Testator left no descendants. Father of father inherits by agnation.");
		}
		break;
	case gmotherF:
		if ((school != 0) && !isVoid(gmotherM)) {
			var g = getGmGen();
			if ((g == 1) && ((school == Hanafi) || (school == Hanbali))) {
				deprive(gmotherM, "because mother of father is a younger generation than mother of mother (Hanafi and Hanbali juristic schools)");
				sh = sixth;
				detail("Mother of father gets one sixth as mother of mother is deprived");
				break;
			}
			else if (g == 2) {
				deprive(gmotherF, "because mother of mother is a younger generation than mother of father");
				sh = none;
				break;
			}
			else {
				sh = new Rational(1,12);
				detail("Mother of father shares with mother of mother, each gets 1/12");
			}
		}
		else if (isVoid(gmotherM)) {
			sh = sixth;
			detail("No mother of mother or she got none, mother of father gets one sixth (Abu-Bakr's verdict)");
		}
		else {
			sh = new Rational(1,12);
			detail("Mother of father shares with mother of mother, each gets 1/12");
		}
		break;
	case gmotherM:
		if (school == Hanafi)	//Pointed out by Rizwan, confirmed by grandpa
		{
			g = getGmGen();
			if (g == 1)
			{
				deprive(gmotherM, "because mother of father is a younger generation than mother of mother (Hanafi school)");
				sh = none;
				break;
			}
		}
		if ((school != 0) && !isVoid(gmotherF)) {
			g = getGmGen();
			if ((g == 1) && ((school == Hanafi) || (school == Hanbali))) {
				deprive(gmotherM, "because mother of father is a younger generation than mother of mother (Hanafi and Hanbali juristic schools)");
				sh = none;
				break;
			}
			else if (g == 2) {
				deprive(gmotherF, "because mother of mother is a younger generation than mother of father");
				sh = sixth;
				detail("Mother of father gets one sixth as mother of mother is deprived");
				break;
			}
			else {
				sh = new Rational(1,12);
				detail("Mother of father shares with mother of mother, each gets 1/12");
			}
		}
		else if (isVoid(gmotherF)) {
			sh = sixth;
			detail("No mother of father or she got none, mother of mother gets one sixth (Abu-Bakr's verdict)");
		}
		else {
			sh = new Rational(1,12);
			detail("Mother of father shares with mother of mother, each gets 1/12");
		}
		break;
	case brother:
		if (n == 1) {
			deprive(brotherF,"because of brother");
			deprive(sisterF,"because of brother");
			depriveRange(nephew,treasury,"because of brother");
		}
		else {
			deprive(brotherF,"because of brothers");
			deprive(sisterF,"because of brothers");
			depriveRange(nephew,treasury,"because of brothers");
		}
		sh = toshare();
		if (n==1) detail("Brother may share by agnation");
		else  detail("Brothers may share by agnation");
		break;
	case sister:
		if ((nheirs[brotherF]==0) && (n>1) && (fdec==false)) 
			deprive(sisterF,"because of more than one full sister and no half-brothers from father (cannot agnate)");
		if ((n==1) && (fdec==true))
			deprive(sisterF,"because of one full sister and one or more female decendants");
		if (nheirs[brother]>0) {
			sh = multiply(has(brother), half);
			if (n==1 && nheirs[brother]==1) detail("Full sister will share with full brother by ratio of 1:2");
			else if (n==1 && nheirs[brother]>1) detail("Full sister will share with full brothers by ratio of 1:2");
			else if (n>1 && nheirs[brother]==1) detail("Full sisters will share with full brother by ratio of 1:2");
			else detail("Full sister will share with full brother by ratio of 1:2");
		}
		else if (fdec==true) {
			sh = toshare();
			fasab = true;
			detail("Full sister(s) will share by agnation");
			deprive(brotherF,"because of female agnation");
			deprive(sisterF,"because of female agnation");
			depriveRange(nephew,treasury,"because of female agnation");
		}
		//we already set gfs in the gfather case
		else if (n==1) {
			sh = half;
			detail("One full sister and no full brothers, she gets half");
		}
		else {
		 	sh = twothirds;
			detail("More than one full sister and no full brothers, they share two thirds");
		}
		break;
	case brotherF:
		if (n==1) depriveRange(nephew,treasury,"because of half-brother from father");
		else depriveRange(nephew,treasury,"because of half-brothers from father");
		sh = toshare();
		if (n==1) detail("Half-brother from father will share by agnation");
		else detail("Half-brothers from father will share by agnation");
		break;
	case sisterF:
		if (nheirs[brotherF]>0) {
			sh = multiply(has(brotherF), half);
			if (n==1 && nheirs[brotherF]==1) detail("Half-sister from father shares with half-brother from father by ratio of 1:2");
			else if (n==1 && nheirs[brotherF]>1) detail("Half-sister from father shares with half-brothers from father by ratio of 1:2");
			else if (n>1 && nheirs[brotherF]==1) detail("Half-sisters from father share with half-brother from father by ratio of 1:2");
			else detail("Half-sisters from father share with half-brothers from father by ratio of 1:2");
		}
		else if ((nheirs[sister]==1) && (fdec==false)) {
			sh = sixth;
			if (n==1) detail("One full sister and no half-brothers from father and no female decendants, so half-sister from father gets one sixth to complete two thirds");
			else detail("One full sister and no half-brothers from father and no female decendants, so half-sisters from father share one sixth to complete two thirds");
		}
		else if (fdec==true) {
			sh = toshare();
			fasab = true;
			detail("Half sister(s) from father will share by agnation");
			depriveRange(nephew,treasury,"because of female agnation");
		}
		//we already set gfs in the gfather case
		else if (n==1) {
			sh = half;
			detail("One half-sister from father and no half-brothers from father, she gets half");
			//Case of nheirs[sister]>1 deprives sisterF is taken care of under sister above
		}
		else {
			sh = twothirds;
			detail("More than one half-sister from father and no half-brothers from father, they share two thirds");
		}
		break;
	case siblingM:
		debug(isVoid(brother)? "No brothers" : nheirs[brother]+" brother(s)");
		if (n==1) {
			sh = sixth;
			detail("One sibling from mother gets one sixth");
		}
		else if (
			((school==Maliki) || (school==Shafii)) &&
			(nheirs[husband]>0) && (nheirs[mother]>0) &&
			isVoid(gfather) &&
			(!isVoid(brother)) && isVoid(sister)  
		)
		{
			mushtarika = true;
			sh = toshare();
			detail("Mushtarika case: Sibling from mother shares with brothers (Malik/Shafii).");
		}
		else {
			sh = third;
			detail("More than one sibling from mother, they share in one third");
		}
		break;
	case relativeM:
		if ((school==Maliki) || (school==Shafii)) deprive(relativeM, "in Maliki/Shafii opinions");
		else sh = toshare();
		break;
	case treasury:
		sh = zero;
		break;
	default:	//e.g., uncle, etc.
		if (h<treasury) {
			sh = toshare();
			if (n==1) depriveRange(h+1, treasury, "because of "+heirCategory[h]);
			else depriveRange(h+1, treasury, "because of "+heirsCategory[h]);
		}
	}
	gets(h, sh);
	return true;
}

//"Awl" (oversubscription), when sum of shares > 1. Normalize by redividing by ratios of shares
function redivide() {
	if (!assertTrue(isOversubscribed(), "redivide() called when sum is " + toString(sum)))
		return;
	detail("<b" + ">*** Redividing ***</b" + ">");
	if (isNegative(shares[father])) {
		shares[father]=third;
		detail("Father's share is restored to one third for redividing.");
		sumUp();
	}
	//I don't think the above can happen
	if (isNegative(shares[gfather])) {
		if (school==Egypt) {
			shares[gfather] = sixth;
			detail("Father of father's share is restored to one sixth for redividing. (Egyptian law/Ali's opinion)");
		}
		else {
			shares[gfather] = third;
			detail("Father of father's share is restored to one third for redividing. (Consensus/Zaid's opinion)");
		}
		sumUp();
	}
	//The above can happen, e.g., husband, mother, gfather, 2 sisters (variation of Akdaria)
	var sh = none;
	for (var i=firstHeir; i<=lastHeir; i++) {
		if ((!isVoid(i)) && isGt(shares[i],none)) {
		//if ( (nheirs[i]>0) && !isNegative(shares[i]) && !isZero(shares[i]) ) {
			gets(i, divide(shares[i], sum));
		}
	}
}

function isMaleAgnate(h) {
	return (h==son) || (h==gson) || (h==father) || (h==gfather) || (h==brother) || (h==brotherF) ||
		(h==nephew) || (h==nephewF) || (h==uncle) || (h==uncleF) || (h==cousin) || (h==cousinF);
}

function isFemaleAgnate(h) {
	return (h==daughter) || (h==gdaughter) || (h==sister) || (h==sisterF);
}

function existsFemaleAgnates() {
	return (
		(nheirs[daughter]>0 && ((!isVoid(sister)) || (!isVoid(sisterF))) ) ||
		(nheirs[gdaughter]>0 && ((!isVoid(sister)) || (!isVoid(sisterF))) )
	);
}

//Agnation
function sumOfParts(h1, h2) {
	var j,r;
	var rsum = none;
	for (var i=h1; i<=h2; i++) {
		j = has(i);
		if ((nheirs[i]>0) && isNegative(j)) {
			r = new Rational(j.num * nheirs[i], j.denom);
			rsum = subtract(rsum, r);		//Algebraic addition		
		}
	}
	return rsum;
}

function agnate() {
	//We don't get here unless sum is less than 1
	if (!assertTrue(isUndersubscribed(), "Agnation rules do not apply if estate is fully or oversubscribed")) return false;
	//Divide remainder among agnates by the ratios of their numbers
	//Most of them are marked by -ve shares by now
	detail("<b" + ">*** Applying agnation rules ***</b" + ">");
	var rsum = none;
	var j;
	var r;
	var special = (nheirs[father] != 0) && (mdec==false) && (fdec==true);
	if (special) {
		gets(father, toshare());		//his named share will be added later
		detail("Special case of father and no male descendants. He inherits his named share and by agnation.");
	}
	var specialg = (!isVoid(gfather)) && (mdec==false) && (fdec==true);
	if (specialg) {
		gets(gfather, toshare());		//his named share will be added later
		detail("Special case of father of father and no male descendants. He inherits his named share and by agnation.");
	}
	//Sum up again, father's or gfather's share may have changed
	sumUp();
	rsum = sumOfParts(firstHeir, lastHeir);
	detail("agnate: Sum of parts is: " + toString(rsum));
	
	for (i=firstHeir; i<=lastHeir; i++) {
		j = has(i);		//a -ve fraction indicating sharing
		if ((nheirs[i]>0) && isNegative(j)) {
			j.num = -(j.num) * nheirs[i];		//flip the -ve (sharing) mark	
			r = divide(j, rsum);		//i's ratio in sharing
			if (nheirs[i] == 1) detail("agnate: Share of " + heirCategory[i] + " in consolidation is: " + toString(r));
			else detail("agnate: Share of " + heirsCategory[i] + " in consolidation is: " + toString(r));
			if ((i==gfather) && (school!=0) && (gfb==true)) {
				//Handle the grandfather-and-brothers case
				var gb = multiply(r, remain);
				var gb3 = multiply(remain, third);
				if ((school==Maliki) || (school==Shafii) || (school==Hanbali)) {
					if (isLt(gb,gb3)) {
					    gb = gb3;
					    detail("Father of father gets at least a third of remainder (Malik/Shafii/Ibn-Hanbal)");
				    }
				}
				else {
				    detail("Father of father gets an equal share of remainder, or a sixth whichever is bigger");
				}
				if (isLt(gb, sixth)) {
					gets(gfather, sixth);
					detail("Share of father of father by agnation is increased to the minimum of one sixth.");
				}
				else {
					gets(gfather, gb);		//regular share in agnation, or 1/3 in majority opinion whichever is bigger			
				}
				sumUp();
				//Recalculate the sum of parts for everyone above gfather
				rsum = sumOfParts(gmotherF, lastHeir);
			}
			else if (mushtarika==true) {
				//Handle the Mushtarika case
				gets(i, multiply(r, remain));		//i's share in agnation	
				//That's all we need. Everything else appears to have been taken care of already
			}
			else {
				gets(i, multiply(r, remain));		//i's share in agnation
			}
		}
	}
	if (!addsUp()) {
		if (special==true) {
			var v = add(has(father), sixth);	//his named share added
			gets(father, min(v, remain));	
		}
		else if (specialg==true) 
			if (gfb==false) {
				var vg = add(has(gfather), sixth);	//his named share added
				gets(gfather, min(vg, remain));	
			}
	}
	
	if (!addsUp()) {		//e.g., case of father with fdec
		detail("agnate: distribution still incomplete after applying agnation rules.\n" + getHeirList());
		//Again, the only possibility now is that sum < 1
		if (!assertTrue(isUndersubscribed(), "Agnation rules do not apply if estate is fully or oversubscribed")) return false;

		for (var k=firstHeir; k<=lastHeir; k++) {
			if ( isMaleAgnate(k) && !isVoid(k) ) {
				gets(k, add(remain, has(k)));		//he gets the rest
				//gets(k, remain);
				if (nheirs[k] == 1) detail(heirCategory[k] + " gets the rest being the nearest male agnate");
				else detail(heirsCategory[k] + " get the rest being the nearest male agnate");
				break;
			}
		}
	}
	for (var h=firstHeir; h<=lastHeir; h++) {
		if ((nheirs[h]>0) && isNegative(has(h)))
			deprive(h,"because agnation and/or oversubscription have already been applied");	
		//if he didn't get it by now, he doesn't. e.g., brotherF
	}

	//By now sum is either 1 or less
	sumUp();
	if (isUndersubscribed()) {
		//See if there is female agnation
		var halfremain = multiply(remain, half);
		if (!existsFemaleAgnates()) {
			detail("No female agnation");
			return true;
		}
		else if ((nheirs[daughter]>0) && (!isVoid(sister))) {
			gets(daughter, halfremain);
			gets(sister, halfremain);
		}
		else if ((nheirs[daughter]>0) && (!isVoid(sisterF))) {
			gets(daughter, halfremain);
			gets(sisterF, halfremain);
		}
		else if ((!isVoid(gdaughter)) && (!isVoid(sister))) {
			gets(gdaughter, halfremain);
			gets(sister, halfremain);
		}
		else if ((!isVoid(gdaughter)) && (!isVoid(sisterF))) {
			gets(gdaughter, halfremain);
			gets(sisterF, halfremain);
		}
	}
	return true;
}

function adjustIfBequest() {
	if (isGt(bequestShare, none)) {
		var multiplier = subtract(whole, bequestShare);
		for (var h=son; h<=treasury; h++) {
			if (!isZero(has(h))) {	
				//Bug fix: isVoid() checks nheirs which doesn't apply to treasury
				debug("Reducing share of " + heirsCategory[h] + " from " + toString(has(h)) + " because of bequest");
				gets(h, multiply(has(h), multiplier));
				debug("Share of " + heirsCategory[h] + " reduced to " + toString(has(h)) + " because of bequest");
			}
		}
		gets(bequest, bequestShare);
	}
}

/* Process the cases that do not follow the rules */
function processOddCases() {
    var ret = false;    //set to true if any odd case has been processed
    var noneother = (nheirs[son]==0) && (nheirs[daughter]==0) && (nheirs[gson]==0) && (nheirs[gdaughter]==0) && (nheirs[wife]==0) && (nheirs[father]==0) && (nheirs[gmotherF]==0) && (nheirs[gmotherM]==0) && (nheirs[uncle]==0) && (nheirs[uncleF]==0) && (nheirs[nephew]==0) && (nheirs[nephewF]==0) && (nheirs[cousin]==0) && (nheirs[cousinF]==0) && ((nheirs[relativeM]==0) || ((nheirs[relativeM]>0) && ((school==Maliki) || (school==Shafii)))) && (nheirs[freed]==0);
    
    //Case 1: mother,gfather,sister (Al-Kharqaa)
    if ((school==Maliki || school==Shafii || school==Hanbali) && (noneother==true) && (nheirs[husband]==0) && (nheirs[mother]>0) && (nheirs[gfather]>0) && (nheirs[sister]*1==1) && (nheirs[brotherF]==0) && (nheirs[sisterF]==0)&& (nheirs[brother]==0) && (nheirs[siblingM]==0)) {
        detail("Al-Kharqaa case. Applying ruling attributed to Zaid");
        shares[mother] = third;
        detail("No decendants; mother gets a third");
        detail("2/3 remaining");
        detail("Father of father agnates with sister by ratio of 2:1, gets at least 1/3 of it, or a minimum of 1/6");
        shares[gfather] = new Rational(4,9);
        detail("Father of father gets 4/9.");
        shares[sister] = new Rational(2,9);
        detail("Sister gets remainder after share of father of father.");
        if ((nheirs[relativeM]>0) && (school==Maliki || school==Shafii)) {
            shares[relativeM] = none;
            detail("Other relatives to mother voided according to Malik/Shafii");
        }
        ret = true;
    }
    //Case 2: husband,mother,gfather,sister (Akdaria)
    if ((school==Maliki || school==Shafii || school==Hanbali) && (noneother==true) && (nheirs[husband]>0) && (nheirs[mother]>0) && (nheirs[gfather]>0) && (nheirs[sister]*1==1) && (nheirs[brotherF]==0) && (nheirs[sisterF]==0)&& (nheirs[brother]==0) && (nheirs[siblingM]==0)) {
        detail("The Akdaria case. Applying ruling attributed to Zaid");
        detail("No decendants; husband gets half.");
        detail("No decendants; mother gets a third");
        detail("Sister gets half");
        detail("Estate is oversubscribed. Father of father gets 1/6 before redivision");
        shares[husband] = third;
        detail("Husband gets 1/3");
        shares[mother] = new Rational(2,9);
        detail("Mother gets 2/9");
        detail("12/27 remains");
        shares[gfather] = new Rational(8,27);
        detail("Father of father agnates with sister by ratio of 2:1, gets 1/3 of remainder or 1/6 of estate, whichever is bigger. He gets 8/27");
        shares[sister] = new Rational(4,27);
        detail("Sister gets remainder after share of father of father. She gets 4/27");
        if ((nheirs[relativeM]>0) && (school==Maliki || school==Shafii)) {
            shares[relativeM] = none;
            detail("Other relatives to mother voided according to Malik/Shafii");
        }
        ret = true;
    }
    //Case 3: husband,mother,gfather,2 sisters (variation of Akdaria)
    if ((school==Maliki || school==Shafii || school==Hanbali) && (noneother==true) && (nheirs[husband]>0) && (nheirs[mother]>0) && (nheirs[gfather]>0) && (nheirs[sister]*1>1) && (nheirs[brotherF]==0) && (nheirs[sisterF]==0)&& (nheirs[brother]==0) && (nheirs[siblingM]==0)) {
        detail("A variation of the Akdaria case. Applying ruling attributed to Zaid");
        shares[husband] = half;
        detail("No decendants; husband gets half");
        shares[mother] = sixth;
        detail("No decendants but more than one sister; mother gets 1/6");
        detail("1/3 remains, which allows for a 2:1 agnation between father of father and sisters without having to redivide and while keeping his share at the 1/6 minimum");
        shares[gfather] = sixth;
        detail("Father of father gets 1/6");
        shares[sister] = sixth;
        detail("Sister gets 1/6, the remainder after the share of father of father");
        if ((nheirs[relativeM]>0) && (school==Maliki || school==Shafii)) {
            shares[relativeM] = none;
            detail("Other relatives to mother voided according to Malik/Shafii");
        }
        ret = true;
    }
    //Case 4: husband,mother,gfather,brotherF,siblingM - Malik
    else if ((school==Maliki) && (noneother==true) && (nheirs[husband]>0) && (nheirs[mother]>0) && (nheirs[gfather]>0) && (nheirs[sister]==0) && (nheirs[brotherF]>0) && (nheirs[sisterF]==0) && (nheirs[brother]==0) && (nheirs[siblingM]>0)) {
        detail("Applying ruling attributed to Zaid");
        shares[husband] = half;
        detail("No decendants; husband gets half");
        shares[mother] = sixth;
        detail("No decendants, but more than one sibling. Mother gets 1/6");
        shares[brotherF] = none;
        detail("Brother from father deprived - Malik's ruling");
        shares[siblingM] = none;
        detail("Sibling from mother deprived - Malik's ruling");
        detail("1/3 remains");
        shares[gfather] = third;
        detail("Father of father gets the remainder, 1/3.");
        if (nheirs[relativeM]>0) {
            shares[relativeM] = none;
            detail("Other relatives to mother voided according to Malik/Shafii");
        }
        ret = true;
    }
    //Case 5: husband,mother,gfather,brother,siblingM - Malik
    else if ((school==Maliki) && (noneother==true) && (nheirs[husband]>0) && (nheirs[mother]>0) && (nheirs[gfather]>0) && (nheirs[sister]==0) && (nheirs[brotherF]==0) && (nheirs[sisterF]==0) && (nheirs[brother]>0) && (nheirs[siblingM]>0)) {
        detail("Applying ruling attributed to Zaid");
        shares[husband] = half;
        detail("No decendants; husband gets half");
        shares[mother] = sixth;
        detail("No decendants, but more than one sibling. Mother gets 1/6");
        shares[brother] = none;
        detail("Brother deprived - Malik's ruling");
        shares[siblingM] = none;
        detail("Sibling from mother deprived - Malik's ruling");
        detail("1/3 remains");
        shares[gfather] = third;
        detail("Father of father gets the remainder, 1/3.");
        if (nheirs[relativeM]>0) {
            shares[relativeM] = none;
            detail("Other relatives to mother voided according to Malik/Shafii");
        }
        ret = true;
    }
    //Case 6: mother,gfather,sister,brotherF,sisterF - Malik
    else if ((school==Maliki) && (noneother==true) && (nheirs[husband]==0) && (nheirs[mother]>0) && (nheirs[gfather]>0) && (nheirs[sister]>0) && (nheirs[brotherF]>0) && (nheirs[sisterF]>0) && (nheirs[brother]==0) && (nheirs[siblingM]==0)) {
        detail("Applying ruling attributed to Zaid");
        shares[mother] = sixth;
        detail("No decendants, but more than one sibling. Mother gets 1/6");
        shares[sister] = half;
        detail("Sister gets half");
        detail("1/3 remains, which can be agnated between father of father and siblings from father and still he gets no less than the minimum 1/6");
        shares[gfather] = new Rational(5, 18);
        detail("Father of father gets 5/18, the better of a regular agnation, a third of remainder and a 1/6 of estate");
        detail("Half-brother from father shares with half-sister from father by ratio of 2:1");
        shares[brotherF] = new Rational(1, 27);
        detail("Half-brother from father gets 1/27");
        shares[sisterF] = new Rational(1,54);
        detail("Half-sister from father gets 1/54");
        if (nheirs[relativeM]>0) {
            shares[relativeM] = none;
            detail("Other relatives to mother voided according to Malik/Shafii");
        }
        ret = true;
    }
    //Case 7: gfather,sister,brotherF,sisterF - Malik
    else if ((school==Maliki) && (noneother==true) && (nheirs[husband]==0) && (nheirs[mother]==0) && (nheirs[gfather]>0) && (nheirs[sister]>0) && (nheirs[brotherF]>0) && (nheirs[sisterF]>0) && (nheirs[brother]==0) && (nheirs[siblingM]==0)) {
        detail("Applying ruling attributed to Zaid");
        shares[gfather] = third;
        detail("Father of father gets 1/3 - Malik's ruling");
        shares[sister] = half;
        detail("Sister gets half");
        detail("1/6 remains");
        detail("Half-brother from father shares with half-sister from father by ratio of 2:1");
        shares[brotherF] = new Rational(1, 9);
        detail("Half-brother from father gets 1/9");
        shares[sisterF] = new Rational(1,18);
        detail("Half-sister from father gets 1/18");
        if (nheirs[relativeM]>0) {
            shares[relativeM] = none;
            detail("Other relatives to mother voided according to Malik/Shafii");
        }
        ret = true;
    }  
       
    return ret;
}

function calculateShares() {
	var rsum = none;
	var r1 = none;
	var r2 = none;
	var j = none;

	getHeirRange();			//sets firstHeir and lastHeir
	assertTrue((firstHeir>=0) && (lastHeir<treasury), "Calculation of heir range failed!");
	
	if (lastHeir == 0) {		//no heirs
		if (existsBequest) {
			shares[bequest] = bequestShare;
			for (i=son; i<treasury; i++) shares[i]=none;
			gets(treasury, subtract(whole,bequestShare));
		}
		else {
			gets(treasury, whole);
			detail("No heirs and no bequest to non-heirs, Islamic treasury gets entire estate");	
		}
		return true;
	}
	
	else if (lastHeir == firstHeir) {	//sole heir
		if ((lastHeir==husband) || (lastHeir==wife)) {
			if (allowRuddToSpouses || (school==Egypt)) {
				gets(lastHeir, whole);
				detail("Spouse is sole heir and reversion to spouses is allowed. Spouse gets whole estate.");
			}
			//Majority opinion do not include spouses in Rudd
			else {
				gets(lastHeir, namedShares[lastHeir]);
				gets(treasury, subtract(whole, has(lastHeir)));
				detail("Spouse is sole heir but reversion to spouses is not allowed. Islamic treasury gets remainder of estate.");
			}
		}
		else if ((lastHeir == relativeM) && ((school == Maliki) || (school == Shafii))) {
			detail("Relatives to mother do not inherit (Malik/Shafii). Islamic treasury gets entire estate.");
			gets(treasury, whole);
			gets(relativeM, none);		
		}
		else if (allowRudd==false) {
		    debug("Sole heir but reversion (Rudd) is not allowed");
		    if ((lastHeir==sister || lastHeir==sisterF || lastHeir==daughter || lastHeir==gdaughter) && nheirs[lastHeir]>1) {
		        gets(lastHeir, twothirds);
		    }
		    else {
			    gets(lastHeir, namedShares[lastHeir]);
			}
			gets(treasury, subtract(whole, has(lastHeir)));
			detail("Reversion is not allowed. Islamic treasury gets remainder of the estate.");		
		}
		else {
			gets(lastHeir, whole);
		}
	}
	else {
	    if (!processOddCases()) {
		    for (var i=firstHeir; i<=lastHeir; i++)
			    if (!calcShare(i)) return false;
        }
        
		sumUp();
		if (isOversubscribed()) {		//Awl (oversubscription)
			detail("===> Oversubscription occurred. Redividing...");
			redivide();	
			//Sanity check:
			if (!assertTrue(addsUp(), "Estate not fully subscribed after redivision!")) return false;
			//Akdaria problems, etc.
			if (school==Maliki || school==Shafii || school==Hanafi) {
			    if (gfs==true) {
			        //They force an agnation for gfather with the sisters
			        detail(schoolNames[school] + " school rules an agnation between father of father and sisters.");
			        //gfather's share must be the bigger of at least 1/3 of portion agnated and 1/6 of the estate
			        //If #sisters > 4, gfather is better off with 1/3 of portion agnated
			        
			        //Now check that he did not end up with less than 1/6 of estate. If he did, he gets 1/6 and the sisters get the remainder, if any. 
			    }
			}
		}	
		else if (isUndersubscribed()) {	//Agnation then reversion (undersubscription)
			if (!agnate()) return false;
			//sum of shares must be <=1 by now
			if (isUndersubscribed()) {
				//no agnates; divide among named heirs, i.e., Rudd (undersubscription)
				if (school == Maliki) {
					if (allowRudd == false)
						detail("Following Maliki juristic school which does not allow reversion");
					else
						detail("User prefers to allow reversion");
				}
				else if (allowRudd == false) 
					detail("User prefers to not allow reversion");
				if (allowRuddToSpouses == true) 
					detail("User prefers to allow reversion to spouses");
				if (allowRudd == true) {
					detail("===> No agnates, dividing remainder among named heirs by ratio of their named shares");
					rsum = none;
					for (var k=firstHeir; k<=lastHeir; k++) {
						if ((nheirs[k]>0) && isRevertTo(k)) 
							rsum = add(rsum, has(k));
					}
					detail("calcualteShares: Sum of parts is: " + toString(rsum));
					for (var h=firstHeir; h<=lastHeir; h++) {
						if ((nheirs[h]>0) && isRevertTo(h)) {
							j = has(h);
							r1 = divide(j, rsum);
							r2 = multiply(r1, remain);	//additional share
							if (nheirs[h]==1) detail("Adding " + toString(r2) + " to share of " + heirCategory[h]);
							else detail("Adding " + toString(r2) + " to share of " + heirsCategory[h]);
							gets(h, add(j, r2));
						}
					}
				}
				else {
					gets(treasury, remain);
				}
			}
		}
	}
	
	//sum = whole, so make sure any -ve share marks left are voided
	for (i=son; i<=treasury; i++) {
		if ((nheirs[i] > 0) && isNegative(has(i))) 
			deprive(i, "Because estate is now fully subscribed after applying all the rules");
	}
	
	detail("<b" + ">*** Summing up ***</b" + ">");
	if (addsUp()) {
		detail("Estate is fully subscribed");
	}
	else {
		detail("Estate is not fully subscribed after applying all the rules. Giving the remainder to Islamic Treasury.");
		gets(treasury, remain);
		//return false;
	}
	
	//Final sanity checks
	detail("<b" + ">*** Final sum-up ***</b" + ">");
	if (!assertTrue(addsUp(), "Final sum of shares is " + toString(sum) + " after agnation and reversion!")) return false;
	
	adjustIfBequest();
	
	if (nheirs[son]>0) if (!assertTrue(!isZero(has(son)), "Son(s) did not inherit!")) return false;
	if (nheirs[daughter]>0) if (!assertTrue(!isZero(has(daughter)), "Daughter(s) did not inherit!")) return false;
	if (nheirs[husband]>0) if (!assertTrue(!isZero(has(husband)), "Husband did not inherit!")) return false;
	if (nheirs[wife]>0) if (!assertTrue(!isZero(has(wife)), "Wife did not inherit!")) return false;
	if (nheirs[father]>0) if (!assertTrue(!isZero(has(father)), "Father did not inherit!")) return false;
	if (nheirs[mother]>0) if (!assertTrue(!isZero(has(mother)), "Mother did not inherit!")) return false;
	
	detail("*** END Calculations ***");
	return true;
}
