//Test cases for calculating inheritance shares of eligible heirs according to Islamic law.
//Cases taken from ISNA's booklet, Last Will and Testament.
//First 21 cases are famous jurisprudence cases.

var testCases = new Array();

//Helper ruler:..........BqSnDrSsDsHbWfFrMrGFGfGmBrSrBfSfSmNuNfUnUfCzCfFsRmRvSc
//Abu-Bakr
testCases[0] = new Array(0,2,3,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[1] = new Array(0,2,3,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[2] = new Array(0,2,3,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
//Omar (Gharraiya)
testCases[3] = new Array(0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[4] = new Array(0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
//Ali (Minbariya)
testCases[5] = new Array(0,0,2,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
//Judge Shuraih
testCases[6] = new Array(0,0,0,0,0,1,0,0,1,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0);
//Shafiia
testCases[7]= new Array(0,0,2,0,0,0,1,0,1,0,0,0,12,1,0,0,0,0,0,0,0,0,0,0,0);
//Kharqaa
testCases[8] = new Array(0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0);
//Malikiya
testCases[9] = new Array(0,0,0,0,0,1,0,0,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2);
testCases[10]= new Array(0,0,0,0,0,1,0,0,1,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2);
testCases[11]= new Array(0,0,0,0,0,1,0,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,2);
//Pseudo-Malikiya
testCases[12]= new Array(0,0,0,0,0,1,0,0,1,1,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,2);
//Akdariya
testCases[13]= new Array(0,0,0,0,0,1,0,0,1,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,3);
testCases[14]= new Array(0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,3);
testCases[15]= new Array(0,0,0,0,0,1,0,0,0,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,3);
testCases[16]= new Array(0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,3);
testCases[17]= new Array(0,0,0,0,0,0,1,0,1,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,3);
testCases[18]= new Array(0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,3);
testCases[19]= new Array(0,0,0,0,0,0,1,0,0,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,3);
testCases[20]= new Array(0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,3);
//Mushtarika (Himmariya)
testCases[21]= new Array(0,0,0,0,0,1,0,0,1,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,1,3);

function firstCase() {
	return 22;
}

var t = firstCase();
//Cases of sons and daughters
//Helper ruler:..........BqSnDrSsDsHbWfFrMrGFGfGmBrSrBfSfSmNuNfUnUfCzCfFsRmRvSc
testCases[t++] = new Array(0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,2,3,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

//Cases of daughters and no sons
//Helper ruler:..........BqSnDrSsDsHbWfFrMrGFGfGmBrSrBfSfSmNuNfUnUfCzCfFsRmRvSc
testCases[t++] = new Array(0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
//Helper ruler:..........BqSnDrSsDsHbWfFrMrGFGfGmBrSrBfSfSmNuNfUnUfCzCfFsRmRvSc
testCases[t++] = new Array(0,0,2,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
//Helper ruler:..........BqSnDrSsDsHbWfFrMrGFGfGmBrSrBfSfSmNuNfUnUfCzCfFsRmRvSc
testCases[t++] = new Array(0,0,2,3,4,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,3,4,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,0,0,0,3,4,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,1,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,1,0,0,0,0,3,4,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,1,0,0,0,0,0,3,4,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,4,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,2,0,0,0,0,0,0,0,1,1,0,0,0,0,4,0,0,0,0,0,0,0,0);

//Cases of parents and no offspring
//Helper ruler:..........BqSnDrSsDsHbWfFrMrGFGfGmBrSrBfSfSmNuNfUnUfCzCfFsRmRvSc
testCases[t++] = new Array(0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,1,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,1,1,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,1,1,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0);
//Helper ruler:..........BqSnDrSsDsHbWfFrMrGFGfGmBrSrBfSfSmNuNfUnUfCzCfFsRmRvSc
testCases[t++] = new Array(0,0,0,0,0,1,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,1,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,0,0,1,1,0,0,3,4,0,0,0,0,0,0,0,0,0,0,0);

//Cases of spouses
//Helper ruler:..........BqSnDrSsDsHbWfFrMrGFGfGmBrSrBfSfSmNuNfUnUfCzCfFsRmRvSc
testCases[t++] = new Array(0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0);
testCases[t++] = new Array(0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0);

function lastCase() {
	return t-1;
}

function getTestCase(caseNumber) {
	return testCases[caseNumber];
}

function getRandomTestCase() {
	var lc = lastCase();
	var tc = Math.floor(Math.random() * lc);
	return (tc>0? tc: 1);
}