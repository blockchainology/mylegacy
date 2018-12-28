//Rational number arithmetic
function Rational(i, j) {
	this.num = i*1;
	this.denom = j*1;
}

function zero() {
	return new Rational(0,1);
}

function one() {
	return new Rational(1,1);
}

function divides(i, j) {
	return ((i % j) == 0);
}

/**
 * Greatest common denominator of two integers x,y
 */
function gcd(x, y) {
	var i = x.denom;
	var j = y.denom;
	if (divides(i,j)) return i;
	else if (divides(j,i)) return j;
	else return i*j;
}

function isNegative(x) {
	return (x.num < 0);
}

function negate(x) {
	x.num = -(x.num);
	return x;
}

function isZero(x) {
	return (x.num == 0);
}

/**
 * Simplifies a fraction by reducing its numerator and denominator
 * to their simplest
 */
function simplify(x) {
	var isNeg = isNegative(x);
	var t = (isNeg? -(x.num) : x.num);
	var b = x.denom;
	var smaller = Math.min(t, b);
	if (divides(t,b)) {
		t /= b;
		b = 1;
	}
	else if (divides(b,t)) {
		b /= t;
		t = 1;
	}
	else {
		for (var i = 2; i <= smaller; i++) {
			while (divides(t,i) && divides(b,i)) {
				t /= i;
				b /= i;
			}
			smaller = Math.min(t,b);
		}
	}
	var z = new Rational(1,1);
	z.num = (isNeg? -t : t);
	z.denom = b;
	return z;
}

function multiply(x, y) {
	var r = new Rational(1,1);
	r.num = x.num * y.num;
	r.denom = x.denom * y.denom;
	return simplify(r);
}

function divide(x, y) {
	var r = new Rational(1,1);
	r.num = x.num * y.denom;
	r.denom = x.denom * y.num;
	return simplify(r);
}

function add(x, y) {
	var i = gcd(x, y);
	var r = new Rational(1,1);
	r.num = x.num * i / x.denom + y.num * i / y.denom;
	r.denom = i;
	return simplify(r);
}

function subtract(x, y) {
	var i = gcd(x, y);
	var r = new Rational(1,1);
	r.num = x.num * i / x.denom - y.num * i / y.denom;
	r.denom = i;
	return simplify(r);
}

function max(x, y) {
	var z = subtract(x,y);
	if (isNegative(z)) return y;
	else return x;
}

function min(x, y) {
	var z = subtract(y,x);
	if (isNegative(z)) return y;
	else return x;
}

function isLtOne(x) {
	var z = simplify(x);
	return ((z.num - z.denom) < 0);
}

function isGtOne(x) {
	var z = simplify(x);
	return ((z.num - z.denom) > 0);
}

function isOne(x) {
	var z = simplify(x);
	return ((z.num - z.denom) == 0);
}

function isLt(x, y) {
	var z = subtract(x,y);
	if (isNegative(z)) return true;
	else return false;
}

function isGt(x, y) {
	var z = subtract(y,x);
	if (isNegative(z)) return true;
	else return false;
}

function equals(x, y) {
	var z = subtract(x,y);
	if (isZero(z)) return true;
	else return false;
}

function toRational(s) {
	if (!s) return zero();
	if ("" == s) return zero();
	if ("NONE" == s.toUpperCase()) return zero();
	var i = s.indexOf("/");
	if (i < 0) {
		alert("Cannot convert " + s + " to a rational number");
		return null;
	}
	var z = one();
	z.num = s.substring(0,i);
	z.denom = s.substring(i+1);
	if (z.denom < 0) {
		z.num = -(z.num);
		z.denom = -(z.denom);
	}
	return z;
}

function toString(x) {
	if (isZero(x)) return "NONE";
	else if (isOne(x)) return "WHOLE";
	else if ((x.num == -1) && (x.denom == 1)) return "TOSHARE";
	else return x.num + "/" + x.denom;
}


			
		
	
	