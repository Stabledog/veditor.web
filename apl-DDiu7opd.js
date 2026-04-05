//#region node_modules/@codemirror/legacy-modes/mode/apl.js
var e = {
	"+": ["conjugate", "add"],
	"−": ["negate", "subtract"],
	"×": ["signOf", "multiply"],
	"÷": ["reciprocal", "divide"],
	"⌈": ["ceiling", "greaterOf"],
	"⌊": ["floor", "lesserOf"],
	"∣": ["absolute", "residue"],
	"⍳": ["indexGenerate", "indexOf"],
	"?": ["roll", "deal"],
	"⋆": ["exponentiate", "toThePowerOf"],
	"⍟": ["naturalLog", "logToTheBase"],
	"○": ["piTimes", "circularFuncs"],
	"!": ["factorial", "binomial"],
	"⌹": ["matrixInverse", "matrixDivide"],
	"<": [null, "lessThan"],
	"≤": [null, "lessThanOrEqual"],
	"=": [null, "equals"],
	">": [null, "greaterThan"],
	"≥": [null, "greaterThanOrEqual"],
	"≠": [null, "notEqual"],
	"≡": ["depth", "match"],
	"≢": [null, "notMatch"],
	"∈": ["enlist", "membership"],
	"⍷": [null, "find"],
	"∪": ["unique", "union"],
	"∩": [null, "intersection"],
	"∼": ["not", "without"],
	"∨": [null, "or"],
	"∧": [null, "and"],
	"⍱": [null, "nor"],
	"⍲": [null, "nand"],
	"⍴": ["shapeOf", "reshape"],
	",": ["ravel", "catenate"],
	"⍪": [null, "firstAxisCatenate"],
	"⌽": ["reverse", "rotate"],
	"⊖": ["axis1Reverse", "axis1Rotate"],
	"⍉": ["transpose", null],
	"↑": ["first", "take"],
	"↓": [null, "drop"],
	"⊂": ["enclose", "partitionWithAxis"],
	"⊃": ["diclose", "pick"],
	"⌷": [null, "index"],
	"⍋": ["gradeUp", null],
	"⍒": ["gradeDown", null],
	"⊤": ["encode", null],
	"⊥": ["decode", null],
	"⍕": ["format", "formatByExample"],
	"⍎": ["execute", null],
	"⊣": ["stop", "left"],
	"⊢": ["pass", "right"]
}, t = /[\.\/⌿⍀¨⍣]/, n = /⍬/, r = /[\+−×÷⌈⌊∣⍳\?⋆⍟○!⌹<≤=>≥≠≡≢∈⍷∪∩∼∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⌷⍋⍒⊤⊥⍕⍎⊣⊢]/, i = /←/, a = /[⍝#].*$/, o = function(e) {
	var t = !1;
	return function(n) {
		return t = n, n === e ? t === "\\" : !0;
	};
}, s = {
	name: "apl",
	startState: function() {
		return {
			prev: !1,
			func: !1,
			op: !1,
			string: !1,
			escape: !1
		};
	},
	token: function(s, c) {
		var l;
		return s.eatSpace() ? null : (l = s.next(), l === "\"" || l === "'" ? (s.eatWhile(o(l)), s.next(), c.prev = !0, "string") : /[\[{\(]/.test(l) ? (c.prev = !1, null) : /[\]}\)]/.test(l) ? (c.prev = !0, null) : n.test(l) ? (c.prev = !1, "atom") : /[¯\d]/.test(l) ? (c.func ? (c.func = !1, c.prev = !1) : c.prev = !0, s.eatWhile(/[\w\.]/), "number") : t.test(l) || i.test(l) ? "operator" : r.test(l) ? (c.func = !0, c.prev = !1, e[l] ? "variableName.function.standard" : "variableName.function") : a.test(l) ? (s.skipToEnd(), "comment") : l === "∘" && s.peek() === "." ? (s.next(), "variableName.function") : (s.eatWhile(/[\w\$_]/), c.prev = !0, "keyword"));
	}
};
//#endregion
export { s as apl };
