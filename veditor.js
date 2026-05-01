import { $ as e, Bt as t, C as n, Ct as r, Dt as i, Et as a, F as o, Ft as s, Ht as c, It as l, L as u, Lt as d, M as f, N as p, Nt as m, O as h, Ot as g, Pt as _, Q as v, R as y, Rt as b, S as x, St as ee, T as S, Tt as C, U as w, V as T, Vt as E, X as D, Z as O, _ as te, _t as ne, a as re, at as ie, b as k, bt as ae, ct as oe, dt as se, et as A, f as ce, ft as le, gt as j, ht as ue, it as de, j as fe, jt as pe, k as me, kt as he, l as M, lt as ge, m as _e, mt as N, nt as ve, o as ye, p as be, rt as xe, st as Se, tt as Ce, u as we, ut as Te, wt as Ee, xt as De, yt as P, zt as Oe } from "./dist-CK9QBJOt.js";
import { i as ke, n as F, o as Ae, r as I } from "./dist-KlkOukDQ.js";
import { n as je } from "./dist-C4f5DzeA.js";
//#region node_modules/@codemirror/search/dist/index.js
var Me = typeof String.prototype.normalize == "function" ? (e) => e.normalize("NFKD") : (e) => e, Ne = class {
	constructor(e, t, n = 0, r = e.length, i, a) {
		this.test = a, this.value = {
			from: 0,
			to: 0
		}, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(n, r), this.bufferStart = n, this.normalize = i ? (e) => i(Me(e)) : Me, this.query = this.normalize(t);
	}
	peek() {
		if (this.bufferPos == this.buffer.length) {
			if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done) return -1;
			this.bufferPos = 0, this.buffer = this.iter.value;
		}
		return d(this.buffer, this.bufferPos);
	}
	next() {
		for (; this.matches.length;) this.matches.pop();
		return this.nextOverlapping();
	}
	nextOverlapping() {
		for (;;) {
			let e = this.peek();
			if (e < 0) return this.done = !0, this;
			let t = c(e), n = this.bufferStart + this.bufferPos;
			this.bufferPos += b(e);
			let r = this.normalize(t);
			if (r.length) for (let e = 0, i = n;; e++) {
				let a = r.charCodeAt(e), o = this.match(a, i, this.bufferPos + this.bufferStart);
				if (e == r.length - 1) {
					if (o) return this.value = o, this;
					break;
				}
				i == n && e < t.length && t.charCodeAt(e) == a && i++;
			}
		}
	}
	match(e, t, n) {
		let r = null;
		for (let t = 0; t < this.matches.length; t += 2) {
			let i = this.matches[t], a = !1;
			this.query.charCodeAt(i) == e && (i == this.query.length - 1 ? r = {
				from: this.matches[t + 1],
				to: n
			} : (this.matches[t]++, a = !0)), a || (this.matches.splice(t, 2), t -= 2);
		}
		return this.query.charCodeAt(0) == e && (this.query.length == 1 ? r = {
			from: t,
			to: n
		} : this.matches.push(1, t)), r && this.test && !this.test(r.from, r.to, this.buffer, this.bufferStart) && (r = null), r;
	}
};
typeof Symbol < "u" && (Ne.prototype[Symbol.iterator] = function() {
	return this;
});
var Pe = {
	from: -1,
	to: -1,
	match: /* @__PURE__ */ /.*/.exec("")
}, L = "gm" + (/x/.unicode == null ? "" : "u"), R = class {
	constructor(e, t, n, r = 0, i = e.length) {
		if (this.text = e, this.to = i, this.curLine = "", this.done = !1, this.value = Pe, /\\[sWDnr]|\n|\r|\[\^/.test(t)) return new Fe(e, t, n, r, i);
		this.re = new RegExp(t, L + (n?.ignoreCase ? "i" : "")), this.test = n?.test, this.iter = e.iter(), this.curLineStart = e.lineAt(r).from, this.matchPos = V(e, r), this.getLine(this.curLineStart);
	}
	getLine(e) {
		this.iter.next(e), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
	}
	nextLine() {
		this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
	}
	next() {
		for (let e = this.matchPos - this.curLineStart;;) {
			this.re.lastIndex = e;
			let t = this.matchPos <= this.to && this.re.exec(this.curLine);
			if (t) {
				let n = this.curLineStart + t.index, r = n + t[0].length;
				if (this.matchPos = V(this.text, r + +(n == r)), n == this.curLineStart + this.curLine.length && this.nextLine(), (n < r || n > this.value.to) && (!this.test || this.test(n, r, t))) return this.value = {
					from: n,
					to: r,
					match: t
				}, this;
				e = this.matchPos - this.curLineStart;
			} else if (this.curLineStart + this.curLine.length < this.to) this.nextLine(), e = 0;
			else return this.done = !0, this;
		}
	}
}, z = /* @__PURE__ */ new WeakMap(), B = class e {
	constructor(e, t) {
		this.from = e, this.text = t;
	}
	get to() {
		return this.from + this.text.length;
	}
	static get(t, n, r) {
		let i = z.get(t);
		if (!i || i.from >= r || i.to <= n) {
			let i = new e(n, t.sliceString(n, r));
			return z.set(t, i), i;
		}
		if (i.from == n && i.to == r) return i;
		let { text: a, from: o } = i;
		return o > n && (a = t.sliceString(n, o) + a, o = n), i.to < r && (a += t.sliceString(i.to, r)), z.set(t, new e(o, a)), new e(n, a.slice(n - o, r - o));
	}
}, Fe = class {
	constructor(e, t, n, r, i) {
		this.text = e, this.to = i, this.done = !1, this.value = Pe, this.matchPos = V(e, r), this.re = new RegExp(t, L + (n?.ignoreCase ? "i" : "")), this.test = n?.test, this.flat = B.get(e, r, this.chunkEnd(r + 5e3));
	}
	chunkEnd(e) {
		return e >= this.to ? this.to : this.text.lineAt(e).to;
	}
	next() {
		for (;;) {
			let e = this.re.lastIndex = this.matchPos - this.flat.from, t = this.re.exec(this.flat.text);
			if (t && !t[0] && t.index == e && (this.re.lastIndex = e + 1, t = this.re.exec(this.flat.text)), t) {
				let e = this.flat.from + t.index, n = e + t[0].length;
				if ((this.flat.to >= this.to || t.index + t[0].length <= this.flat.text.length - 10) && (!this.test || this.test(e, n, t))) return this.value = {
					from: e,
					to: n,
					match: t
				}, this.matchPos = V(this.text, n + +(e == n)), this;
			}
			if (this.flat.to == this.to) return this.done = !0, this;
			this.flat = B.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
		}
	}
};
typeof Symbol < "u" && (R.prototype[Symbol.iterator] = Fe.prototype[Symbol.iterator] = function() {
	return this;
});
function Ie(e) {
	try {
		return new RegExp(e, L), !0;
	} catch {
		return !1;
	}
}
function V(e, t) {
	if (t >= e.length) return t;
	let n = e.lineAt(t), r;
	for (; t < n.to && (r = n.text.charCodeAt(t - n.from)) >= 56320 && r < 57344;) t++;
	return t;
}
var Le = (e) => {
	let { state: t } = e, n = String(t.doc.lineAt(e.state.selection.main.head).number), { close: r, result: i } = j(e, {
		label: t.phrase("Go to line"),
		input: {
			type: "text",
			name: "line",
			value: n
		},
		focus: !0,
		submitLabel: t.phrase("go")
	});
	return i.then((n) => {
		let i = n && /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(n.elements.line.value);
		if (!i) {
			e.dispatch({ effects: r });
			return;
		}
		let a = t.doc.lineAt(t.selection.main.head), [, o, s, c, l] = i, u = c ? +c.slice(1) : 0, d = s ? +s : a.number;
		if (s && l) {
			let e = d / 100;
			o && (e = e * (o == "-" ? -1 : 1) + a.number / t.doc.lines), d = Math.round(t.doc.lines * e);
		} else s && o && (d = d * (o == "-" ? -1 : 1) + a.number);
		let f = t.doc.line(Math.max(1, Math.min(t.doc.lines, d))), p = C.cursor(f.from + Math.max(0, Math.min(u, f.length)));
		e.dispatch({
			effects: [r, v.scrollIntoView(p.from, { y: "center" })],
			selection: p
		});
	}), !0;
}, Re = {
	highlightWordAroundCursor: !1,
	minSelectionLength: 1,
	maxMatches: 100,
	wholeWords: !1
}, ze = /* @__PURE__ */ i.define({ combine(e) {
	return Oe(e, Re, {
		highlightWordAroundCursor: (e, t) => e || t,
		minSelectionLength: Math.min,
		maxMatches: Math.min
	});
} });
function Be(e) {
	let t = [Ke, Ge];
	return e && t.push(ze.of(e)), t;
}
var Ve = /* @__PURE__ */ D.mark({ class: "cm-selectionMatch" }), He = /* @__PURE__ */ D.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function Ue(e, t, n, i) {
	return (n == 0 || e(t.sliceDoc(n - 1, n)) != r.Word) && (i == t.doc.length || e(t.sliceDoc(i, i + 1)) != r.Word);
}
function We(e, t, n, i) {
	return e(t.sliceDoc(n, n + 1)) == r.Word && e(t.sliceDoc(i - 1, i)) == r.Word;
}
var Ge = /* @__PURE__ */ e.fromClass(class {
	constructor(e) {
		this.decorations = this.getDeco(e);
	}
	update(e) {
		(e.selectionSet || e.docChanged || e.viewportChanged) && (this.decorations = this.getDeco(e.view));
	}
	getDeco(e) {
		let t = e.state.facet(ze), { state: n } = e, r = n.selection;
		if (r.ranges.length > 1) return D.none;
		let i = r.main, a, o = null;
		if (i.empty) {
			if (!t.highlightWordAroundCursor) return D.none;
			let e = n.wordAt(i.head);
			if (!e) return D.none;
			o = n.charCategorizer(i.head), a = n.sliceDoc(e.from, e.to);
		} else {
			let e = i.to - i.from;
			if (e < t.minSelectionLength || e > 200) return D.none;
			if (t.wholeWords) {
				if (a = n.sliceDoc(i.from, i.to), o = n.charCategorizer(i.head), !(Ue(o, n, i.from, i.to) && We(o, n, i.from, i.to))) return D.none;
			} else if (a = n.sliceDoc(i.from, i.to), !a) return D.none;
		}
		let s = [];
		for (let r of e.visibleRanges) {
			let e = new Ne(n.doc, a, r.from, r.to);
			for (; !e.next().done;) {
				let { from: r, to: a } = e.value;
				if ((!o || Ue(o, n, r, a)) && (i.empty && r <= i.from && a >= i.to ? s.push(He.range(r, a)) : (r >= i.to || a <= i.from) && s.push(Ve.range(r, a)), s.length > t.maxMatches)) return D.none;
			}
		}
		return D.set(s);
	}
}, { decorations: (e) => e.decorations }), Ke = /* @__PURE__ */ v.baseTheme({
	".cm-selectionMatch": { backgroundColor: "#99ff7780" },
	".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
}), qe = ({ state: e, dispatch: t }) => {
	let { selection: n } = e, r = C.create(n.ranges.map((t) => e.wordAt(t.head) || C.cursor(t.head)), n.mainIndex);
	return r.eq(n) ? !1 : (t(e.update({ selection: r })), !0);
};
function Je(e, t) {
	let { main: n, ranges: r } = e.selection, i = e.wordAt(n.head), a = i && i.from == n.from && i.to == n.to;
	for (let n = !1, i = new Ne(e.doc, t, r[r.length - 1].to);;) if (i.next(), i.done) {
		if (n) return null;
		i = new Ne(e.doc, t, 0, Math.max(0, r[r.length - 1].from - 1)), n = !0;
	} else {
		if (n && r.some((e) => e.from == i.value.from)) continue;
		if (a) {
			let t = e.wordAt(i.value.from);
			if (!t || t.from != i.value.from || t.to != i.value.to) continue;
		}
		return i.value;
	}
}
var Ye = ({ state: e, dispatch: t }) => {
	let { ranges: n } = e.selection;
	if (n.some((e) => e.from === e.to)) return qe({
		state: e,
		dispatch: t
	});
	let r = e.sliceDoc(n[0].from, n[0].to);
	if (e.selection.ranges.some((t) => e.sliceDoc(t.from, t.to) != r)) return !1;
	let i = Je(e, r);
	return i ? (t(e.update({
		selection: e.selection.addRange(C.range(i.from, i.to), !1),
		effects: v.scrollIntoView(i.to)
	})), !0) : !1;
}, Xe = /* @__PURE__ */ i.define({ combine(e) {
	return Oe(e, {
		top: !1,
		caseSensitive: !1,
		literal: !1,
		regexp: !1,
		wholeWord: !1,
		createPanel: (e) => new kt(e),
		scrollToMatch: (e) => v.scrollIntoView(e)
	});
} }), Ze = class {
	constructor(e) {
		this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.literal = !!e.literal, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || Ie(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!e.wholeWord, this.test = e.test;
	}
	unquote(e) {
		return this.literal ? e : e.replace(/\\([nrt\\])/g, (e, t) => t == "n" ? "\n" : t == "r" ? "\r" : t == "t" ? "	" : "\\");
	}
	eq(e) {
		return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp && this.wholeWord == e.wholeWord && this.test == e.test;
	}
	create() {
		return this.regexp ? new ct(this) : new nt(this);
	}
	getCursor(e, t = 0, n) {
		let r = e.doc ? e : a.create({ doc: e });
		return n ??= r.doc.length, this.regexp ? it(this, r, t, n) : et(this, r, t, n);
	}
}, Qe = class {
	constructor(e) {
		this.spec = e;
	}
};
function $e(e, t, n) {
	return (r, i, a, o) => n && !n(r, i, a, o) ? !1 : e(r >= o && i <= o + a.length ? a.slice(r - o, i - o) : t.doc.sliceString(r, i), t, r, i);
}
function et(e, t, n, r) {
	let i;
	return e.wholeWord && (i = tt(t.doc, t.charCategorizer(t.selection.main.head))), e.test && (i = $e(e.test, t, i)), new Ne(t.doc, e.unquoted, n, r, e.caseSensitive ? void 0 : (e) => e.toLowerCase(), i);
}
function tt(e, t) {
	return (n, i, a, o) => ((o > n || o + a.length < i) && (o = Math.max(0, n - 2), a = e.sliceString(o, Math.min(e.length, i + 2))), (t(at(a, n - o)) != r.Word || t(ot(a, n - o)) != r.Word) && (t(ot(a, i - o)) != r.Word || t(at(a, i - o)) != r.Word));
}
var nt = class extends Qe {
	constructor(e) {
		super(e);
	}
	nextMatch(e, t, n) {
		let r = et(this.spec, e, n, e.doc.length).nextOverlapping();
		if (r.done) {
			let n = Math.min(e.doc.length, t + this.spec.unquoted.length);
			r = et(this.spec, e, 0, n).nextOverlapping();
		}
		return r.done || r.value.from == t && r.value.to == n ? null : r.value;
	}
	prevMatchInRange(e, t, n) {
		for (let r = n;;) {
			let n = Math.max(t, r - 1e4 - this.spec.unquoted.length), i = et(this.spec, e, n, r), a = null;
			for (; !i.nextOverlapping().done;) a = i.value;
			if (a) return a;
			if (n == t) return null;
			r -= 1e4;
		}
	}
	prevMatch(e, t, n) {
		let r = this.prevMatchInRange(e, 0, t);
		return r ||= this.prevMatchInRange(e, Math.max(0, n - this.spec.unquoted.length), e.doc.length), r && (r.from != t || r.to != n) ? r : null;
	}
	getReplacement(e) {
		return this.spec.unquote(this.spec.replace);
	}
	matchAll(e, t) {
		let n = et(this.spec, e, 0, e.doc.length), r = [];
		for (; !n.next().done;) {
			if (r.length >= t) return null;
			r.push(n.value);
		}
		return r;
	}
	highlight(e, t, n, r) {
		let i = et(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(n + this.spec.unquoted.length, e.doc.length));
		for (; !i.next().done;) r(i.value.from, i.value.to);
	}
};
function rt(e, t, n) {
	return (r, i, a) => (!n || n(r, i, a)) && e(a[0], t, r, i);
}
function it(e, t, n, r) {
	let i;
	return e.wholeWord && (i = st(t.charCategorizer(t.selection.main.head))), e.test && (i = rt(e.test, t, i)), new R(t.doc, e.search, {
		ignoreCase: !e.caseSensitive,
		test: i
	}, n, r);
}
function at(e, t) {
	return e.slice(E(e, t, !1), t);
}
function ot(e, t) {
	return e.slice(t, E(e, t));
}
function st(e) {
	return (t, n, i) => !i[0].length || (e(at(i.input, i.index)) != r.Word || e(ot(i.input, i.index)) != r.Word) && (e(ot(i.input, i.index + i[0].length)) != r.Word || e(at(i.input, i.index + i[0].length)) != r.Word);
}
var ct = class extends Qe {
	nextMatch(e, t, n) {
		let r = it(this.spec, e, n, e.doc.length).next();
		return r.done && (r = it(this.spec, e, 0, t).next()), r.done ? null : r.value;
	}
	prevMatchInRange(e, t, n) {
		for (let r = 1;; r++) {
			let i = Math.max(t, n - r * 1e4), a = it(this.spec, e, i, n), o = null;
			for (; !a.next().done;) o = a.value;
			if (o && (i == t || o.from > i + 10)) return o;
			if (i == t) return null;
		}
	}
	prevMatch(e, t, n) {
		return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, n, e.doc.length);
	}
	getReplacement(e) {
		return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g, (t, n) => {
			if (n == "&") return e.match[0];
			if (n == "$") return "$";
			for (let t = n.length; t > 0; t--) {
				let r = +n.slice(0, t);
				if (r > 0 && r < e.match.length) return e.match[r] + n.slice(t);
			}
			return t;
		});
	}
	matchAll(e, t) {
		let n = it(this.spec, e, 0, e.doc.length), r = [];
		for (; !n.next().done;) {
			if (r.length >= t) return null;
			r.push(n.value);
		}
		return r;
	}
	highlight(e, t, n, r) {
		let i = it(this.spec, e, Math.max(0, t - 250), Math.min(n + 250, e.doc.length));
		for (; !i.next().done;) r(i.value.from, i.value.to);
	}
}, lt = /* @__PURE__ */ m.define(), ut = /* @__PURE__ */ m.define(), H = /* @__PURE__ */ _.define({
	create(e) {
		return new dt(Ct(e).create(), null);
	},
	update(e, t) {
		for (let n of t.effects) n.is(lt) ? e = new dt(n.value.create(), e.panel) : n.is(ut) && (e = new dt(e.query, n.value ? St : null));
		return e;
	},
	provide: (e) => ne.from(e, (e) => e.panel)
}), dt = class {
	constructor(e, t) {
		this.query = e, this.panel = t;
	}
}, ft = /* @__PURE__ */ D.mark({ class: "cm-searchMatch" }), pt = /* @__PURE__ */ D.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), mt = /* @__PURE__ */ e.fromClass(class {
	constructor(e) {
		this.view = e, this.decorations = this.highlight(e.state.field(H));
	}
	update(e) {
		let t = e.state.field(H);
		(t != e.startState.field(H) || e.docChanged || e.selectionSet || e.viewportChanged) && (this.decorations = this.highlight(t));
	}
	highlight({ query: e, panel: t }) {
		if (!t || !e.spec.valid) return D.none;
		let { view: n } = this, r = new pe();
		for (let t = 0, i = n.visibleRanges, a = i.length; t < a; t++) {
			let { from: o, to: s } = i[t];
			for (; t < a - 1 && s > i[t + 1].from - 500;) s = i[++t].to;
			e.highlight(n.state, o, s, (e, t) => {
				let i = n.state.selection.ranges.some((n) => n.from == e && n.to == t);
				r.add(e, t, i ? pt : ft);
			});
		}
		return r.finish();
	}
}, { decorations: (e) => e.decorations });
function ht(e) {
	return (t) => {
		let n = t.state.field(H, !1);
		return n && n.query.spec.valid ? e(t, n) : Et(t);
	};
}
var gt = /* @__PURE__ */ ht((e, { query: t }) => {
	let { to: n } = e.state.selection.main, r = t.nextMatch(e.state, n, n);
	if (!r) return !1;
	let i = C.single(r.from, r.to), a = e.state.facet(Xe);
	return e.dispatch({
		selection: i,
		effects: [Mt(e, r), a.scrollToMatch(i.main, e)],
		userEvent: "select.search"
	}), Tt(e), !0;
}), _t = /* @__PURE__ */ ht((e, { query: t }) => {
	let { state: n } = e, { from: r } = n.selection.main, i = t.prevMatch(n, r, r);
	if (!i) return !1;
	let a = C.single(i.from, i.to), o = e.state.facet(Xe);
	return e.dispatch({
		selection: a,
		effects: [Mt(e, i), o.scrollToMatch(a.main, e)],
		userEvent: "select.search"
	}), Tt(e), !0;
}), vt = /* @__PURE__ */ ht((e, { query: t }) => {
	let n = t.matchAll(e.state, 1e3);
	return !n || !n.length ? !1 : (e.dispatch({
		selection: C.create(n.map((e) => C.range(e.from, e.to))),
		userEvent: "select.search.matches"
	}), !0);
}), yt = ({ state: e, dispatch: t }) => {
	let n = e.selection;
	if (n.ranges.length > 1 || n.main.empty) return !1;
	let { from: r, to: i } = n.main, a = [], o = 0;
	for (let t = new Ne(e.doc, e.sliceDoc(r, i)); !t.next().done;) {
		if (a.length > 1e3) return !1;
		t.value.from == r && (o = a.length), a.push(C.range(t.value.from, t.value.to));
	}
	return t(e.update({
		selection: C.create(a, o),
		userEvent: "select.search.matches"
	})), !0;
}, bt = /* @__PURE__ */ ht((e, { query: t }) => {
	let { state: n } = e, { from: r, to: i } = n.selection.main;
	if (n.readOnly) return !1;
	let a = t.nextMatch(n, r, r);
	if (!a) return !1;
	let o = a, s = [], c, l, u = [];
	o.from == r && o.to == i && (l = n.toText(t.getReplacement(o)), s.push({
		from: o.from,
		to: o.to,
		insert: l
	}), o = t.nextMatch(n, o.from, o.to), u.push(v.announce.of(n.phrase("replaced match on line $", n.doc.lineAt(r).number) + ".")));
	let d = e.state.changes(s);
	return o && (c = C.single(o.from, o.to).map(d), u.push(Mt(e, o)), u.push(n.facet(Xe).scrollToMatch(c.main, e))), e.dispatch({
		changes: d,
		selection: c,
		effects: u,
		userEvent: "input.replace"
	}), !0;
}), xt = /* @__PURE__ */ ht((e, { query: t }) => {
	if (e.state.readOnly) return !1;
	let n = t.matchAll(e.state, 1e9).map((e) => {
		let { from: n, to: r } = e;
		return {
			from: n,
			to: r,
			insert: t.getReplacement(e)
		};
	});
	if (!n.length) return !1;
	let r = e.state.phrase("replaced $ matches", n.length) + ".";
	return e.dispatch({
		changes: n,
		effects: v.announce.of(r),
		userEvent: "input.replace.all"
	}), !0;
});
function St(e) {
	return e.state.facet(Xe).createPanel(e);
}
function Ct(e, t) {
	let n = e.selection.main, r = n.empty || n.to > n.from + 100 ? "" : e.sliceDoc(n.from, n.to);
	if (t && !r) return t;
	let i = e.facet(Xe);
	return new Ze({
		search: t?.literal ?? i.literal ? r : r.replace(/\n/g, "\\n"),
		caseSensitive: t?.caseSensitive ?? i.caseSensitive,
		literal: t?.literal ?? i.literal,
		regexp: t?.regexp ?? i.regexp,
		wholeWord: t?.wholeWord ?? i.wholeWord
	});
}
function wt(e) {
	let t = ie(e, St);
	return t && t.dom.querySelector("[main-field]");
}
function Tt(e) {
	let t = wt(e);
	t && t == e.root.activeElement && t.select();
}
var Et = (e) => {
	let t = e.state.field(H, !1);
	if (t && t.panel) {
		let n = wt(e);
		if (n && n != e.root.activeElement) {
			let r = Ct(e.state, t.query.spec);
			r.valid && e.dispatch({ effects: lt.of(r) }), n.focus(), n.select();
		}
	} else e.dispatch({ effects: [ut.of(!0), t ? lt.of(Ct(e.state, t.query.spec)) : m.appendConfig.of(Pt)] });
	return !0;
}, Dt = (e) => {
	let t = e.state.field(H, !1);
	if (!t || !t.panel) return !1;
	let n = ie(e, St);
	return n && n.dom.contains(e.root.activeElement) && e.focus(), e.dispatch({ effects: ut.of(!1) }), !0;
}, Ot = [
	{
		key: "Mod-f",
		run: Et,
		scope: "editor search-panel"
	},
	{
		key: "F3",
		run: gt,
		shift: _t,
		scope: "editor search-panel",
		preventDefault: !0
	},
	{
		key: "Mod-g",
		run: gt,
		shift: _t,
		scope: "editor search-panel",
		preventDefault: !0
	},
	{
		key: "Escape",
		run: Dt,
		scope: "editor search-panel"
	},
	{
		key: "Mod-Shift-l",
		run: yt
	},
	{
		key: "Mod-Alt-g",
		run: Le
	},
	{
		key: "Mod-d",
		run: Ye,
		preventDefault: !0
	}
], kt = class {
	constructor(e) {
		this.view = e;
		let t = this.query = e.state.field(H).query.spec;
		this.commit = this.commit.bind(this), this.searchField = P("input", {
			value: t.search,
			placeholder: U(e, "Find"),
			"aria-label": U(e, "Find"),
			class: "cm-textfield",
			name: "search",
			form: "",
			"main-field": "true",
			onchange: this.commit,
			onkeyup: this.commit
		}), this.replaceField = P("input", {
			value: t.replace,
			placeholder: U(e, "Replace"),
			"aria-label": U(e, "Replace"),
			class: "cm-textfield",
			name: "replace",
			form: "",
			onchange: this.commit,
			onkeyup: this.commit
		}), this.caseField = P("input", {
			type: "checkbox",
			name: "case",
			form: "",
			checked: t.caseSensitive,
			onchange: this.commit
		}), this.reField = P("input", {
			type: "checkbox",
			name: "re",
			form: "",
			checked: t.regexp,
			onchange: this.commit
		}), this.wordField = P("input", {
			type: "checkbox",
			name: "word",
			form: "",
			checked: t.wholeWord,
			onchange: this.commit
		});
		function n(e, t, n) {
			return P("button", {
				class: "cm-button",
				name: e,
				onclick: t,
				type: "button"
			}, n);
		}
		this.dom = P("div", {
			onkeydown: (e) => this.keydown(e),
			class: "cm-search"
		}, [
			this.searchField,
			n("next", () => gt(e), [U(e, "next")]),
			n("prev", () => _t(e), [U(e, "previous")]),
			n("select", () => vt(e), [U(e, "all")]),
			P("label", null, [this.caseField, U(e, "match case")]),
			P("label", null, [this.reField, U(e, "regexp")]),
			P("label", null, [this.wordField, U(e, "by word")]),
			...e.state.readOnly ? [] : [
				P("br"),
				this.replaceField,
				n("replace", () => bt(e), [U(e, "replace")]),
				n("replaceAll", () => xt(e), [U(e, "replace all")])
			],
			P("button", {
				name: "close",
				onclick: () => Dt(e),
				"aria-label": U(e, "close"),
				type: "button"
			}, ["×"])
		]);
	}
	commit() {
		let e = new Ze({
			search: this.searchField.value,
			caseSensitive: this.caseField.checked,
			regexp: this.reField.checked,
			wholeWord: this.wordField.checked,
			replace: this.replaceField.value
		});
		e.eq(this.query) || (this.query = e, this.view.dispatch({ effects: lt.of(e) }));
	}
	keydown(e) {
		ue(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? _t : gt)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), bt(this.view));
	}
	update(e) {
		for (let t of e.transactions) for (let e of t.effects) e.is(lt) && !e.value.eq(this.query) && this.setQuery(e.value);
	}
	setQuery(e) {
		this.query = e, this.searchField.value = e.search, this.replaceField.value = e.replace, this.caseField.checked = e.caseSensitive, this.reField.checked = e.regexp, this.wordField.checked = e.wholeWord;
	}
	mount() {
		this.searchField.select();
	}
	get pos() {
		return 80;
	}
	get top() {
		return this.view.state.facet(Xe).top;
	}
};
function U(e, t) {
	return e.state.phrase(t);
}
var At = 30, jt = /[\s\.,:;?!]/;
function Mt(e, { from: t, to: n }) {
	let r = e.state.doc.lineAt(t), i = e.state.doc.lineAt(n).to, a = Math.max(r.from, t - At), o = Math.min(i, n + At), s = e.state.sliceDoc(a, o);
	if (a != r.from) {
		for (let e = 0; e < At; e++) if (!jt.test(s[e + 1]) && jt.test(s[e])) {
			s = s.slice(e);
			break;
		}
	}
	if (o != i) {
		for (let e = s.length - 1; e > s.length - At; e--) if (!jt.test(s[e - 1]) && jt.test(s[e])) {
			s = s.slice(0, e);
			break;
		}
	}
	return v.announce.of(`${e.state.phrase("current match")}. ${s} ${e.state.phrase("on line")} ${r.number}.`);
}
var Nt = /* @__PURE__ */ v.baseTheme({
	".cm-panel.cm-search": {
		padding: "2px 6px 4px",
		position: "relative",
		"& [name=close]": {
			position: "absolute",
			top: "0",
			right: "4px",
			backgroundColor: "inherit",
			border: "none",
			font: "inherit",
			padding: 0,
			margin: 0
		},
		"& input, & button, & label": { margin: ".2em .6em .2em 0" },
		"& input[type=checkbox]": { marginRight: ".2em" },
		"& label": {
			fontSize: "80%",
			whiteSpace: "pre"
		}
	},
	"&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
	"&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
	"&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
	"&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
}), Pt = [
	H,
	/* @__PURE__ */ he.low(mt),
	Nt
], Ft = (e) => {
	let { state: t } = e, n = t.doc.lineAt(t.selection.main.from), r = Bt(e.state, n.from);
	return r.line ? Lt(e) : r.block ? zt(e) : !1;
};
function It(e, t) {
	return ({ state: n, dispatch: r }) => {
		if (n.readOnly) return !1;
		let i = e(t, n);
		return i ? (r(n.update(i)), !0) : !1;
	};
}
var Lt = /* @__PURE__ */ It(Gt, 0), Rt = /* @__PURE__ */ It(Wt, 0), zt = /* @__PURE__ */ It((e, t) => Wt(e, t, Ut(t)), 0);
function Bt(e, t) {
	let n = e.languageDataAt("commentTokens", t, 1);
	return n.length ? n[0] : {};
}
var Vt = 50;
function Ht(e, { open: t, close: n }, r, i) {
	let a = e.sliceDoc(r - Vt, r), o = e.sliceDoc(i, i + Vt), s = /\s*$/.exec(a)[0].length, c = /^\s*/.exec(o)[0].length, l = a.length - s;
	if (a.slice(l - t.length, l) == t && o.slice(c, c + n.length) == n) return {
		open: {
			pos: r - s,
			margin: s && 1
		},
		close: {
			pos: i + c,
			margin: c && 1
		}
	};
	let u, d;
	i - r <= 2 * Vt ? u = d = e.sliceDoc(r, i) : (u = e.sliceDoc(r, r + Vt), d = e.sliceDoc(i - Vt, i));
	let f = /^\s*/.exec(u)[0].length, p = /\s*$/.exec(d)[0].length, m = d.length - p - n.length;
	return u.slice(f, f + t.length) == t && d.slice(m, m + n.length) == n ? {
		open: {
			pos: r + f + t.length,
			margin: +!!/\s/.test(u.charAt(f + t.length))
		},
		close: {
			pos: i - p - n.length,
			margin: +!!/\s/.test(d.charAt(m - 1))
		}
	} : null;
}
function Ut(e) {
	let t = [];
	for (let n of e.selection.ranges) {
		let r = e.doc.lineAt(n.from), i = n.to <= r.to ? r : e.doc.lineAt(n.to);
		i.from > r.from && i.from == n.to && (i = n.to == r.to + 1 ? r : e.doc.lineAt(n.to - 1));
		let a = t.length - 1;
		a >= 0 && t[a].to > r.from ? t[a].to = i.to : t.push({
			from: r.from + /^\s*/.exec(r.text)[0].length,
			to: i.to
		});
	}
	return t;
}
function Wt(e, t, n = t.selection.ranges) {
	let r = n.map((e) => Bt(t, e.from).block);
	if (!r.every((e) => e)) return null;
	let i = n.map((e, n) => Ht(t, r[n], e.from, e.to));
	if (e != 2 && !i.every((e) => e)) return { changes: t.changes(n.map((e, t) => i[t] ? [] : [{
		from: e.from,
		insert: r[t].open + " "
	}, {
		from: e.to,
		insert: " " + r[t].close
	}])) };
	if (e != 1 && i.some((e) => e)) {
		let e = [];
		for (let t = 0, n; t < i.length; t++) if (n = i[t]) {
			let i = r[t], { open: a, close: o } = n;
			e.push({
				from: a.pos - i.open.length,
				to: a.pos + a.margin
			}, {
				from: o.pos - o.margin,
				to: o.pos + i.close.length
			});
		}
		return { changes: e };
	}
	return null;
}
function Gt(e, t, n = t.selection.ranges) {
	let r = [], i = -1;
	ranges: for (let { from: e, to: a } of n) {
		let n = r.length, o = 1e9, s;
		for (let n = e; n <= a;) {
			let c = t.doc.lineAt(n);
			if (s == null && (s = Bt(t, c.from).line, !s)) continue ranges;
			if (c.from > i && (e == a || a > c.from)) {
				i = c.from;
				let e = /^\s*/.exec(c.text)[0].length, t = e == c.length, n = c.text.slice(e, e + s.length) == s ? e : -1;
				e < c.text.length && e < o && (o = e), r.push({
					line: c,
					comment: n,
					token: s,
					indent: e,
					empty: t,
					single: !1
				});
			}
			n = c.to + 1;
		}
		if (o < 1e9) for (let e = n; e < r.length; e++) r[e].indent < r[e].line.text.length && (r[e].indent = o);
		r.length == n + 1 && (r[n].single = !0);
	}
	if (e != 2 && r.some((e) => e.comment < 0 && (!e.empty || e.single))) {
		let e = [];
		for (let { line: t, token: n, indent: i, empty: a, single: o } of r) (o || !a) && e.push({
			from: t.from + i,
			insert: n + " "
		});
		let n = t.changes(e);
		return {
			changes: n,
			selection: t.selection.map(n, 1)
		};
	} else if (e != 1 && r.some((e) => e.comment >= 0)) {
		let e = [];
		for (let { line: t, comment: n, token: i } of r) if (n >= 0) {
			let r = t.from + n, a = r + i.length;
			t.text[a - t.from] == " " && a++, e.push({
				from: r,
				to: a
			});
		}
		return { changes: e };
	}
	return null;
}
var W = /* @__PURE__ */ ae.define(), Kt = /* @__PURE__ */ ae.define(), qt = /* @__PURE__ */ i.define(), Jt = /* @__PURE__ */ i.define({ combine(e) {
	return Oe(e, {
		minDepth: 100,
		newGroupDelay: 500,
		joinToEvent: (e, t) => t
	}, {
		minDepth: Math.max,
		newGroupDelay: Math.min,
		joinToEvent: (e, t) => (n, r) => e(n, r) || t(n, r)
	});
} }), Yt = /* @__PURE__ */ _.define({
	create() {
		return mn.empty;
	},
	update(e, t) {
		let n = t.state.facet(Jt), r = t.annotation(W);
		if (r) {
			let i = nn.fromTransaction(t, r.selection), a = r.side, o = a == 0 ? e.undone : e.done;
			return o = i ? rn(o, o.length, n.minDepth, i) : ln(o, t.startState.selection), new mn(a == 0 ? r.rest : o, a == 0 ? o : r.rest);
		}
		let i = t.annotation(Kt);
		if ((i == "full" || i == "before") && (e = e.isolate()), t.annotation(l.addToHistory) === !1) return t.changes.empty ? e : e.addMapping(t.changes.desc);
		let a = nn.fromTransaction(t), o = t.annotation(l.time), s = t.annotation(l.userEvent);
		return a ? e = e.addChanges(a, o, s, n, t) : t.selection && (e = e.addSelection(t.startState.selection, o, s, n.newGroupDelay)), (i == "full" || i == "after") && (e = e.isolate()), e;
	},
	toJSON(e) {
		return {
			done: e.done.map((e) => e.toJSON()),
			undone: e.undone.map((e) => e.toJSON())
		};
	},
	fromJSON(e) {
		return new mn(e.done.map(nn.fromJSON), e.undone.map(nn.fromJSON));
	}
});
function Xt(e = {}) {
	return [
		Yt,
		Jt.of(e),
		v.domEventHandlers({ beforeinput(e, t) {
			let n = e.inputType == "historyUndo" ? Qt : e.inputType == "historyRedo" ? $t : null;
			return n ? (e.preventDefault(), n(t)) : !1;
		} })
	];
}
function Zt(e, t) {
	return function({ state: n, dispatch: r }) {
		if (!t && n.readOnly) return !1;
		let i = n.field(Yt, !1);
		if (!i) return !1;
		let a = i.pop(e, n, t);
		return a ? (r(a), !0) : !1;
	};
}
var Qt = /* @__PURE__ */ Zt(0, !1), $t = /* @__PURE__ */ Zt(1, !1), en = /* @__PURE__ */ Zt(0, !0), tn = /* @__PURE__ */ Zt(1, !0), nn = class e {
	constructor(e, t, n, r, i) {
		this.changes = e, this.effects = t, this.mapped = n, this.startSelection = r, this.selectionsAfter = i;
	}
	setSelAfter(t) {
		return new e(this.changes, this.effects, this.mapped, this.startSelection, t);
	}
	toJSON() {
		return {
			changes: this.changes?.toJSON(),
			mapped: this.mapped?.toJSON(),
			startSelection: this.startSelection?.toJSON(),
			selectionsAfter: this.selectionsAfter.map((e) => e.toJSON())
		};
	}
	static fromJSON(t) {
		return new e(t.changes && ee.fromJSON(t.changes), [], t.mapped && De.fromJSON(t.mapped), t.startSelection && C.fromJSON(t.startSelection), t.selectionsAfter.map(C.fromJSON));
	}
	static fromTransaction(t, n) {
		let r = G;
		for (let e of t.startState.facet(qt)) {
			let n = e(t);
			n.length && (r = r.concat(n));
		}
		return !r.length && t.changes.empty ? null : new e(t.changes.invert(t.startState.doc), r, void 0, n || t.startState.selection, G);
	}
	static selection(t) {
		return new e(void 0, G, void 0, void 0, t);
	}
};
function rn(e, t, n, r) {
	let i = t + 1 > n + 20 ? t - n - 1 : 0, a = e.slice(i, t);
	return a.push(r), a;
}
function an(e, t) {
	let n = [], r = !1;
	return e.iterChangedRanges((e, t) => n.push(e, t)), t.iterChangedRanges((e, t, i, a) => {
		for (let e = 0; e < n.length;) {
			let t = n[e++], o = n[e++];
			a >= t && i <= o && (r = !0);
		}
	}), r;
}
function on(e, t) {
	return e.ranges.length == t.ranges.length && e.ranges.filter((e, n) => e.empty != t.ranges[n].empty).length === 0;
}
function sn(e, t) {
	return e.length ? t.length ? e.concat(t) : e : t;
}
var G = [], cn = 200;
function ln(e, t) {
	if (e.length) {
		let n = e[e.length - 1], r = n.selectionsAfter.slice(Math.max(0, n.selectionsAfter.length - cn));
		return r.length && r[r.length - 1].eq(t) ? e : (r.push(t), rn(e, e.length - 1, 1e9, n.setSelAfter(r)));
	} else return [nn.selection([t])];
}
function un(e) {
	let t = e[e.length - 1], n = e.slice();
	return n[e.length - 1] = t.setSelAfter(t.selectionsAfter.slice(0, t.selectionsAfter.length - 1)), n;
}
function dn(e, t) {
	if (!e.length) return e;
	let n = e.length, r = G;
	for (; n;) {
		let i = fn(e[n - 1], t, r);
		if (i.changes && !i.changes.empty || i.effects.length) {
			let t = e.slice(0, n);
			return t[n - 1] = i, t;
		} else t = i.mapped, n--, r = i.selectionsAfter;
	}
	return r.length ? [nn.selection(r)] : G;
}
function fn(e, t, n) {
	let r = sn(e.selectionsAfter.length ? e.selectionsAfter.map((e) => e.map(t)) : G, n);
	if (!e.changes) return nn.selection(r);
	let i = e.changes.map(t), a = t.mapDesc(e.changes, !0), o = e.mapped ? e.mapped.composeDesc(a) : a;
	return new nn(i, m.mapEffects(e.effects, t), o, e.startSelection.map(a), r);
}
var pn = /^(input\.type|delete)($|\.)/, mn = class e {
	constructor(e, t, n = 0, r = void 0) {
		this.done = e, this.undone = t, this.prevTime = n, this.prevUserEvent = r;
	}
	isolate() {
		return this.prevTime ? new e(this.done, this.undone) : this;
	}
	addChanges(t, n, r, i, a) {
		let o = this.done, s = o[o.length - 1];
		return o = s && s.changes && !s.changes.empty && t.changes && (!r || pn.test(r)) && (!s.selectionsAfter.length && n - this.prevTime < i.newGroupDelay && i.joinToEvent(a, an(s.changes, t.changes)) || r == "input.type.compose") ? rn(o, o.length - 1, i.minDepth, new nn(t.changes.compose(s.changes), sn(m.mapEffects(t.effects, s.changes), s.effects), s.mapped, s.startSelection, G)) : rn(o, o.length, i.minDepth, t), new e(o, G, n, r);
	}
	addSelection(t, n, r, i) {
		let a = this.done.length ? this.done[this.done.length - 1].selectionsAfter : G;
		return a.length > 0 && n - this.prevTime < i && r == this.prevUserEvent && r && /^select($|\.)/.test(r) && on(a[a.length - 1], t) ? this : new e(ln(this.done, t), this.undone, n, r);
	}
	addMapping(t) {
		return new e(dn(this.done, t), dn(this.undone, t), this.prevTime, this.prevUserEvent);
	}
	pop(e, t, n) {
		let r = e == 0 ? this.done : this.undone;
		if (r.length == 0) return null;
		let i = r[r.length - 1], a = i.selectionsAfter[0] || (i.startSelection ? i.startSelection.map(i.changes.invertedDesc, 1) : t.selection);
		if (n && i.selectionsAfter.length) return t.update({
			selection: i.selectionsAfter[i.selectionsAfter.length - 1],
			annotations: W.of({
				side: e,
				rest: un(r),
				selection: a
			}),
			userEvent: e == 0 ? "select.undo" : "select.redo",
			scrollIntoView: !0
		});
		if (i.changes) {
			let n = r.length == 1 ? G : r.slice(0, r.length - 1);
			return i.mapped && (n = dn(n, i.mapped)), t.update({
				changes: i.changes,
				selection: i.startSelection,
				effects: i.effects,
				annotations: W.of({
					side: e,
					rest: n,
					selection: a
				}),
				filter: !1,
				userEvent: e == 0 ? "undo" : "redo",
				scrollIntoView: !0
			});
		} else return null;
	}
};
mn.empty = /* @__PURE__ */ new mn(G, G);
var hn = [
	{
		key: "Mod-z",
		run: Qt,
		preventDefault: !0
	},
	{
		key: "Mod-y",
		mac: "Mod-Shift-z",
		run: $t,
		preventDefault: !0
	},
	{
		linux: "Ctrl-Shift-z",
		run: $t,
		preventDefault: !0
	},
	{
		key: "Mod-u",
		run: en,
		preventDefault: !0
	},
	{
		key: "Alt-u",
		mac: "Mod-Shift-u",
		run: tn,
		preventDefault: !0
	}
];
function gn(e, t) {
	return C.create(e.ranges.map(t), e.mainIndex);
}
function _n(e, t) {
	return e.update({
		selection: t,
		scrollIntoView: !0,
		userEvent: "select"
	});
}
function vn({ state: e, dispatch: t }, n) {
	let r = gn(e.selection, n);
	return r.eq(e.selection, !0) ? !1 : (t(_n(e, r)), !0);
}
function yn(e, t) {
	return C.cursor(t ? e.to : e.from);
}
function bn(e, t) {
	return vn(e, (n) => n.empty ? e.moveByChar(n, t) : yn(n, t));
}
function K(e) {
	return e.textDirectionAt(e.state.selection.main.head) == O.LTR;
}
var xn = (e) => bn(e, !K(e)), Sn = (e) => bn(e, K(e)), Cn = (e) => bn(e, !1);
function wn(e, t) {
	return vn(e, (n) => n.empty ? e.moveByGroup(n, t) : yn(n, t));
}
var Tn = (e) => wn(e, !K(e)), En = (e) => wn(e, K(e));
typeof Intl < "u" && Intl.Segmenter;
function Dn(e, t, n) {
	if (t.type.prop(n)) return !0;
	let r = t.to - t.from;
	return r && (r > 2 || /[^\s,.;:]/.test(e.sliceDoc(t.from, t.to))) || t.firstChild;
}
function On(e, t, n) {
	let r = y(e).resolveInner(t.head), i = n ? w.closedBy : w.openedBy;
	for (let a = t.head;;) {
		let t = n ? r.childAfter(a) : r.childBefore(a);
		if (!t) break;
		Dn(e, t, i) ? r = t : a = n ? t.to : t.from;
	}
	let a = r.type.prop(i), s, c;
	return c = a && (s = n ? o(e, r.from, 1) : o(e, r.to, -1)) && s.matched ? n ? s.end.to : s.end.from : n ? r.to : r.from, C.cursor(c, n ? -1 : 1);
}
var kn = (e) => vn(e, (t) => On(e.state, t, !K(e))), An = (e) => vn(e, (t) => On(e.state, t, K(e)));
function jn(e, t) {
	return vn(e, (n) => {
		if (!n.empty) return yn(n, t);
		let r = e.moveVertically(n, t);
		return r.head == n.head ? e.moveToLineBoundary(n, t) : r;
	});
}
var Mn = (e) => jn(e, !1), Nn = (e) => jn(e, !0);
function Pn(e) {
	let t = e.scrollDOM.clientHeight < e.scrollDOM.scrollHeight - 2, n = 0, r = 0, i;
	if (t) {
		for (let t of e.state.facet(v.scrollMargins)) {
			let i = t(e);
			i?.top && (n = Math.max(i?.top, n)), i?.bottom && (r = Math.max(i?.bottom, r));
		}
		i = e.scrollDOM.clientHeight - n - r;
	} else i = (e.dom.ownerDocument.defaultView || window).innerHeight;
	return {
		marginTop: n,
		marginBottom: r,
		selfScroll: t,
		height: Math.max(e.defaultLineHeight, i - 5)
	};
}
function Fn(e, t) {
	let n = Pn(e), { state: r } = e, i = gn(r.selection, (r) => r.empty ? e.moveVertically(r, t, n.height) : yn(r, t));
	if (i.eq(r.selection)) return !1;
	let a;
	if (n.selfScroll) {
		let t = e.coordsAtPos(r.selection.main.head), o = e.scrollDOM.getBoundingClientRect(), s = o.top + n.marginTop, c = o.bottom - n.marginBottom;
		t && t.top > s && t.bottom < c && (a = v.scrollIntoView(i.main.head, {
			y: "start",
			yMargin: t.top - s
		}));
	}
	return e.dispatch(_n(r, i), { effects: a }), !0;
}
var In = (e) => Fn(e, !1), Ln = (e) => Fn(e, !0);
function Rn(e, t, n) {
	let r = e.lineBlockAt(t.head), i = e.moveToLineBoundary(t, n);
	if (i.head == t.head && i.head != (n ? r.to : r.from) && (i = e.moveToLineBoundary(t, n, !1)), !n && i.head == r.from && r.length) {
		let n = /^\s*/.exec(e.state.sliceDoc(r.from, Math.min(r.from + 100, r.to)))[0].length;
		n && t.head != r.from + n && (i = C.cursor(r.from + n));
	}
	return i;
}
var zn = (e) => vn(e, (t) => Rn(e, t, !0)), Bn = (e) => vn(e, (t) => Rn(e, t, !1)), Vn = (e) => vn(e, (t) => Rn(e, t, !K(e))), Hn = (e) => vn(e, (t) => Rn(e, t, K(e))), Un = (e) => vn(e, (t) => C.cursor(e.lineBlockAt(t.head).from, 1)), Wn = (e) => vn(e, (t) => C.cursor(e.lineBlockAt(t.head).to, -1));
function Gn(e, t, n) {
	let r = !1, i = gn(e.selection, (t) => {
		let i = o(e, t.head, -1) || o(e, t.head, 1) || t.head > 0 && o(e, t.head - 1, 1) || t.head < e.doc.length && o(e, t.head + 1, -1);
		if (!i || !i.end) return t;
		r = !0;
		let a = i.start.from == t.head ? i.end.to : i.end.from;
		return n ? C.range(t.anchor, a) : C.cursor(a);
	});
	return r ? (t(_n(e, i)), !0) : !1;
}
var Kn = ({ state: e, dispatch: t }) => Gn(e, t, !1);
function qn(e, t) {
	let n = gn(e.state.selection, (e) => {
		let n = t(e);
		return C.range(e.anchor, n.head, n.goalColumn, n.bidiLevel || void 0, n.assoc);
	});
	return n.eq(e.state.selection) ? !1 : (e.dispatch(_n(e.state, n)), !0);
}
function Jn(e, t) {
	return qn(e, (n) => e.moveByChar(n, t));
}
var Yn = (e) => Jn(e, !K(e)), Xn = (e) => Jn(e, K(e));
function Zn(e, t) {
	return qn(e, (n) => e.moveByGroup(n, t));
}
var Qn = (e) => Zn(e, !K(e)), $n = (e) => Zn(e, K(e)), er = (e) => qn(e, (t) => On(e.state, t, !K(e))), tr = (e) => qn(e, (t) => On(e.state, t, K(e)));
function nr(e, t) {
	return qn(e, (n) => e.moveVertically(n, t));
}
var rr = (e) => nr(e, !1), ir = (e) => nr(e, !0);
function ar(e, t) {
	return qn(e, (n) => e.moveVertically(n, t, Pn(e).height));
}
var or = (e) => ar(e, !1), sr = (e) => ar(e, !0), cr = (e) => qn(e, (t) => Rn(e, t, !0)), lr = (e) => qn(e, (t) => Rn(e, t, !1)), ur = (e) => qn(e, (t) => Rn(e, t, !K(e))), dr = (e) => qn(e, (t) => Rn(e, t, K(e))), fr = (e) => qn(e, (t) => C.cursor(e.lineBlockAt(t.head).from)), pr = (e) => qn(e, (t) => C.cursor(e.lineBlockAt(t.head).to)), mr = ({ state: e, dispatch: t }) => (t(_n(e, { anchor: 0 })), !0), hr = ({ state: e, dispatch: t }) => (t(_n(e, { anchor: e.doc.length })), !0), gr = ({ state: e, dispatch: t }) => (t(_n(e, {
	anchor: e.selection.main.anchor,
	head: 0
})), !0), _r = ({ state: e, dispatch: t }) => (t(_n(e, {
	anchor: e.selection.main.anchor,
	head: e.doc.length
})), !0), vr = ({ state: e, dispatch: t }) => (t(e.update({
	selection: {
		anchor: 0,
		head: e.doc.length
	},
	userEvent: "select"
})), !0), yr = ({ state: e, dispatch: t }) => {
	let n = Rr(e).map(({ from: t, to: n }) => C.range(t, Math.min(n + 1, e.doc.length)));
	return t(e.update({
		selection: C.create(n),
		userEvent: "select"
	})), !0;
}, br = ({ state: e, dispatch: t }) => {
	let n = gn(e.selection, (t) => {
		let n = y(e), r = n.resolveStack(t.from, 1);
		if (t.empty) {
			let e = n.resolveStack(t.from, -1);
			e.node.from >= r.node.from && e.node.to <= r.node.to && (r = e);
		}
		for (let e = r; e; e = e.next) {
			let { node: n } = e;
			if ((n.from < t.from && n.to >= t.to || n.to > t.to && n.from <= t.from) && e.next) return C.range(n.to, n.from);
		}
		return t;
	});
	return n.eq(e.selection) ? !1 : (t(_n(e, n)), !0);
};
function xr(e, t) {
	let { state: n } = e, r = n.selection, i = n.selection.ranges.slice();
	for (let r of n.selection.ranges) {
		let a = n.doc.lineAt(r.head);
		if (t ? a.to < e.state.doc.length : a.from > 0) for (let n = r;;) {
			let r = e.moveVertically(n, t);
			if (r.head < a.from || r.head > a.to) {
				i.some((e) => e.head == r.head) || i.push(r);
				break;
			} else if (r.head == n.head) break;
			else n = r;
		}
	}
	return i.length == r.ranges.length ? !1 : (e.dispatch(_n(n, C.create(i, i.length - 1))), !0);
}
var Sr = (e) => xr(e, !1), Cr = (e) => xr(e, !0), wr = ({ state: e, dispatch: t }) => {
	let n = e.selection, r = null;
	return n.ranges.length > 1 ? r = C.create([n.main]) : n.main.empty || (r = C.create([C.cursor(n.main.head)])), r ? (t(_n(e, r)), !0) : !1;
};
function Tr(e, t) {
	if (e.state.readOnly) return !1;
	let n = "delete.selection", { state: r } = e, i = r.changeByRange((r) => {
		let { from: i, to: a } = r;
		if (i == a) {
			let o = t(r);
			o < i ? (n = "delete.backward", o = Er(e, o, !1)) : o > i && (n = "delete.forward", o = Er(e, o, !0)), i = Math.min(i, o), a = Math.max(a, o);
		} else i = Er(e, i, !1), a = Er(e, a, !0);
		return i == a ? { range: r } : {
			changes: {
				from: i,
				to: a
			},
			range: C.cursor(i, i < r.head ? -1 : 1)
		};
	});
	return i.changes.empty ? !1 : (e.dispatch(r.update(i, {
		scrollIntoView: !0,
		userEvent: n,
		effects: n == "delete.selection" ? v.announce.of(r.phrase("Selection deleted")) : void 0
	})), !0);
}
function Er(e, t, n) {
	if (e instanceof v) for (let r of e.state.facet(v.atomicRanges).map((t) => t(e))) r.between(t, t, (e, r) => {
		e < t && r > t && (t = n ? r : e);
	});
	return t;
}
var Dr = (e, n, r) => Tr(e, (i) => {
	let a = i.from, { state: o } = e, s = o.doc.lineAt(a), c, l;
	if (r && !n && a > s.from && a < s.from + 200 && !/[^ \t]/.test(c = s.text.slice(0, a - s.from))) {
		if (c[c.length - 1] == "	") return a - 1;
		let e = t(c, o.tabSize) % h(o) || h(o);
		for (let t = 0; t < e && c[c.length - 1 - t] == " "; t++) a--;
		l = a;
	} else l = E(s.text, a - s.from, n, n) + s.from, l == a && s.number != (n ? o.doc.lines : 1) ? l += n ? 1 : -1 : !n && /[\ufe00-\ufe0f]/.test(s.text.slice(l - s.from, a - s.from)) && (l = E(s.text, l - s.from, !1, !1) + s.from);
	return l;
}), Or = (e) => Dr(e, !1, !0), kr = (e) => Dr(e, !0, !1), Ar = (e, t) => Tr(e, (n) => {
	let r = n.head, { state: i } = e, a = i.doc.lineAt(r), o = i.charCategorizer(r);
	for (let e = null;;) {
		if (r == (t ? a.to : a.from)) {
			r == n.head && a.number != (t ? i.doc.lines : 1) && (r += t ? 1 : -1);
			break;
		}
		let s = E(a.text, r - a.from, t) + a.from, c = a.text.slice(Math.min(r, s) - a.from, Math.max(r, s) - a.from), l = o(c);
		if (e != null && l != e) break;
		(c != " " || r != n.head) && (e = l), r = s;
	}
	return r;
}), jr = (e) => Ar(e, !1), Mr = (e) => Ar(e, !0), Nr = (e) => Tr(e, (t) => {
	let n = e.lineBlockAt(t.head).to;
	return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
}), Pr = (e) => Tr(e, (t) => {
	let n = e.moveToLineBoundary(t, !1).head;
	return t.head > n ? n : Math.max(0, t.head - 1);
}), Fr = (e) => Tr(e, (t) => {
	let n = e.moveToLineBoundary(t, !0).head;
	return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
}), Ir = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = e.changeByRange((e) => ({
		changes: {
			from: e.from,
			to: e.to,
			insert: s.of(["", ""])
		},
		range: C.cursor(e.from)
	}));
	return t(e.update(n, {
		scrollIntoView: !0,
		userEvent: "input"
	})), !0;
}, Lr = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = e.changeByRange((t) => {
		if (!t.empty || t.from == 0 || t.from == e.doc.length) return { range: t };
		let n = t.from, r = e.doc.lineAt(n), i = n == r.from ? n - 1 : E(r.text, n - r.from, !1) + r.from, a = n == r.to ? n + 1 : E(r.text, n - r.from, !0) + r.from;
		return {
			changes: {
				from: i,
				to: a,
				insert: e.doc.slice(n, a).append(e.doc.slice(i, n))
			},
			range: C.cursor(a)
		};
	});
	return n.changes.empty ? !1 : (t(e.update(n, {
		scrollIntoView: !0,
		userEvent: "move.character"
	})), !0);
};
function Rr(e) {
	let t = [], n = -1;
	for (let r of e.selection.ranges) {
		let i = e.doc.lineAt(r.from), a = e.doc.lineAt(r.to);
		if (!r.empty && r.to == a.from && (a = e.doc.lineAt(r.to - 1)), n >= i.number) {
			let e = t[t.length - 1];
			e.to = a.to, e.ranges.push(r);
		} else t.push({
			from: i.from,
			to: a.to,
			ranges: [r]
		});
		n = a.number + 1;
	}
	return t;
}
function zr(e, t, n) {
	if (e.readOnly) return !1;
	let r = [], i = [];
	for (let t of Rr(e)) {
		if (n ? t.to == e.doc.length : t.from == 0) continue;
		let a = e.doc.lineAt(n ? t.to + 1 : t.from - 1), o = a.length + 1;
		if (n) {
			r.push({
				from: t.to,
				to: a.to
			}, {
				from: t.from,
				insert: a.text + e.lineBreak
			});
			for (let n of t.ranges) i.push(C.range(Math.min(e.doc.length, n.anchor + o), Math.min(e.doc.length, n.head + o)));
		} else {
			r.push({
				from: a.from,
				to: t.from
			}, {
				from: t.to,
				insert: e.lineBreak + a.text
			});
			for (let e of t.ranges) i.push(C.range(e.anchor - o, e.head - o));
		}
	}
	return r.length ? (t(e.update({
		changes: r,
		scrollIntoView: !0,
		selection: C.create(i, e.selection.mainIndex),
		userEvent: "move.line"
	})), !0) : !1;
}
var Br = ({ state: e, dispatch: t }) => zr(e, t, !1), Vr = ({ state: e, dispatch: t }) => zr(e, t, !0);
function Hr(e, t, n) {
	if (e.readOnly) return !1;
	let r = [];
	for (let t of Rr(e)) n ? r.push({
		from: t.from,
		insert: e.doc.slice(t.from, t.to) + e.lineBreak
	}) : r.push({
		from: t.to,
		insert: e.lineBreak + e.doc.slice(t.from, t.to)
	});
	let i = e.changes(r);
	return t(e.update({
		changes: i,
		selection: e.selection.map(i, n ? 1 : -1),
		scrollIntoView: !0,
		userEvent: "input.copyline"
	})), !0;
}
var Ur = ({ state: e, dispatch: t }) => Hr(e, t, !1), Wr = ({ state: e, dispatch: t }) => Hr(e, t, !0), Gr = (e) => {
	if (e.state.readOnly) return !1;
	let { state: t } = e, n = t.changes(Rr(t).map(({ from: e, to: n }) => (e > 0 ? e-- : n < t.doc.length && n++, {
		from: e,
		to: n
	}))), r = gn(t.selection, (t) => {
		let n;
		if (e.lineWrapping) {
			let r = e.lineBlockAt(t.head), i = e.coordsAtPos(t.head, t.assoc || 1);
			i && (n = r.bottom + e.documentTop - i.bottom + e.defaultLineHeight / 2);
		}
		return e.moveVertically(t, !0, n);
	}).map(n);
	return e.dispatch({
		changes: n,
		selection: r,
		scrollIntoView: !0,
		userEvent: "delete.line"
	}), !0;
};
function Kr(e, t) {
	if (/\(\)|\[\]|\{\}/.test(e.sliceDoc(t - 1, t + 1))) return {
		from: t,
		to: t
	};
	let n = y(e).resolveInner(t), r = n.childBefore(t), i = n.childAfter(t), a;
	return r && i && r.to <= t && i.from >= t && (a = r.type.prop(w.closedBy)) && a.indexOf(i.name) > -1 && e.doc.lineAt(r.to).from == e.doc.lineAt(i.from).from && !/\S/.test(e.sliceDoc(r.to, i.from)) ? {
		from: r.to,
		to: i.from
	} : null;
}
var qr = /* @__PURE__ */ Yr(!1), Jr = /* @__PURE__ */ Yr(!0);
function Yr(e) {
	return ({ state: n, dispatch: r }) => {
		if (n.readOnly) return !1;
		let i = n.changeByRange((r) => {
			let { from: i, to: a } = r, o = n.doc.lineAt(i), c = !e && i == a && Kr(n, i);
			e && (i = a = (a <= o.to ? o : n.doc.lineAt(a)).to);
			let l = new ye(n, {
				simulateBreak: i,
				simulateDoubleBreak: !!c
			}), u = me(l, i);
			for (u ??= t(/^\s*/.exec(n.doc.lineAt(i).text)[0], n.tabSize); a < o.to && /\s/.test(o.text[a - o.from]);) a++;
			c ? {from: i, to: a} = c : i > o.from && i < o.from + 100 && !/\S/.test(o.text.slice(0, i)) && (i = o.from);
			let d = ["", f(n, u)];
			return c && d.push(f(n, l.lineIndent(o.from, -1))), {
				changes: {
					from: i,
					to: a,
					insert: s.of(d)
				},
				range: C.cursor(i + 1 + d[1].length)
			};
		});
		return r(n.update(i, {
			scrollIntoView: !0,
			userEvent: "input"
		})), !0;
	};
}
function Xr(e, t) {
	let n = -1;
	return e.changeByRange((r) => {
		let i = [];
		for (let a = r.from; a <= r.to;) {
			let o = e.doc.lineAt(a);
			o.number > n && (r.empty || r.to > o.from) && (t(o, i, r), n = o.number), a = o.to + 1;
		}
		let a = e.changes(i);
		return {
			changes: i,
			range: C.range(a.mapPos(r.anchor, 1), a.mapPos(r.head, 1))
		};
	});
}
var Zr = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = Object.create(null), r = new ye(e, { overrideIndentation: (e) => n[e] ?? -1 }), i = Xr(e, (t, i, a) => {
		let o = me(r, t.from);
		if (o == null) return;
		/\S/.test(t.text) || (o = 0);
		let s = /^\s*/.exec(t.text)[0], c = f(e, o);
		(s != c || a.from < t.from + s.length) && (n[t.from] = o, i.push({
			from: t.from,
			to: t.from + s.length,
			insert: c
		}));
	});
	return i.changes.empty || t(e.update(i, { userEvent: "indent" })), !0;
}, Qr = ({ state: e, dispatch: t }) => e.readOnly ? !1 : (t(e.update(Xr(e, (t, n) => {
	n.push({
		from: t.from,
		insert: e.facet(p)
	});
}), { userEvent: "input.indent" })), !0), $r = ({ state: e, dispatch: n }) => e.readOnly ? !1 : (n(e.update(Xr(e, (n, r) => {
	let i = /^\s*/.exec(n.text)[0];
	if (!i) return;
	let a = t(i, e.tabSize), o = 0, s = f(e, Math.max(0, a - h(e)));
	for (; o < i.length && o < s.length && i.charCodeAt(o) == s.charCodeAt(o);) o++;
	r.push({
		from: n.from + o,
		to: n.from + i.length,
		insert: s.slice(o)
	});
}), { userEvent: "delete.dedent" })), !0), ei = (e) => (e.setTabFocusMode(), !0), ti = [
	{
		key: "Ctrl-b",
		run: xn,
		shift: Yn,
		preventDefault: !0
	},
	{
		key: "Ctrl-f",
		run: Sn,
		shift: Xn
	},
	{
		key: "Ctrl-p",
		run: Mn,
		shift: rr
	},
	{
		key: "Ctrl-n",
		run: Nn,
		shift: ir
	},
	{
		key: "Ctrl-a",
		run: Un,
		shift: fr
	},
	{
		key: "Ctrl-e",
		run: Wn,
		shift: pr
	},
	{
		key: "Ctrl-d",
		run: kr
	},
	{
		key: "Ctrl-h",
		run: Or
	},
	{
		key: "Ctrl-k",
		run: Nr
	},
	{
		key: "Ctrl-Alt-h",
		run: jr
	},
	{
		key: "Ctrl-o",
		run: Ir
	},
	{
		key: "Ctrl-t",
		run: Lr
	},
	{
		key: "Ctrl-v",
		run: Ln
	}
], ni = /* @__PURE__ */ [
	{
		key: "ArrowLeft",
		run: xn,
		shift: Yn,
		preventDefault: !0
	},
	{
		key: "Mod-ArrowLeft",
		mac: "Alt-ArrowLeft",
		run: Tn,
		shift: Qn,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowLeft",
		run: Vn,
		shift: ur,
		preventDefault: !0
	},
	{
		key: "ArrowRight",
		run: Sn,
		shift: Xn,
		preventDefault: !0
	},
	{
		key: "Mod-ArrowRight",
		mac: "Alt-ArrowRight",
		run: En,
		shift: $n,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowRight",
		run: Hn,
		shift: dr,
		preventDefault: !0
	},
	{
		key: "ArrowUp",
		run: Mn,
		shift: rr,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowUp",
		run: mr,
		shift: gr
	},
	{
		mac: "Ctrl-ArrowUp",
		run: In,
		shift: or
	},
	{
		key: "ArrowDown",
		run: Nn,
		shift: ir,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowDown",
		run: hr,
		shift: _r
	},
	{
		mac: "Ctrl-ArrowDown",
		run: Ln,
		shift: sr
	},
	{
		key: "PageUp",
		run: In,
		shift: or
	},
	{
		key: "PageDown",
		run: Ln,
		shift: sr
	},
	{
		key: "Home",
		run: Bn,
		shift: lr,
		preventDefault: !0
	},
	{
		key: "Mod-Home",
		run: mr,
		shift: gr
	},
	{
		key: "End",
		run: zn,
		shift: cr,
		preventDefault: !0
	},
	{
		key: "Mod-End",
		run: hr,
		shift: _r
	},
	{
		key: "Enter",
		run: qr,
		shift: qr
	},
	{
		key: "Mod-a",
		run: vr
	},
	{
		key: "Backspace",
		run: Or,
		shift: Or,
		preventDefault: !0
	},
	{
		key: "Delete",
		run: kr,
		preventDefault: !0
	},
	{
		key: "Mod-Backspace",
		mac: "Alt-Backspace",
		run: jr,
		preventDefault: !0
	},
	{
		key: "Mod-Delete",
		mac: "Alt-Delete",
		run: Mr,
		preventDefault: !0
	},
	{
		mac: "Mod-Backspace",
		run: Pr,
		preventDefault: !0
	},
	{
		mac: "Mod-Delete",
		run: Fr,
		preventDefault: !0
	}
].concat(/* @__PURE__ */ ti.map((e) => ({
	mac: e.key,
	run: e.run,
	shift: e.shift
}))), ri = /* @__PURE__ */ [
	{
		key: "Alt-ArrowLeft",
		mac: "Ctrl-ArrowLeft",
		run: kn,
		shift: er
	},
	{
		key: "Alt-ArrowRight",
		mac: "Ctrl-ArrowRight",
		run: An,
		shift: tr
	},
	{
		key: "Alt-ArrowUp",
		run: Br
	},
	{
		key: "Shift-Alt-ArrowUp",
		run: Ur
	},
	{
		key: "Alt-ArrowDown",
		run: Vr
	},
	{
		key: "Shift-Alt-ArrowDown",
		run: Wr
	},
	{
		key: "Mod-Alt-ArrowUp",
		run: Sr
	},
	{
		key: "Mod-Alt-ArrowDown",
		run: Cr
	},
	{
		key: "Escape",
		run: wr
	},
	{
		key: "Mod-Enter",
		run: Jr
	},
	{
		key: "Alt-l",
		mac: "Ctrl-l",
		run: yr
	},
	{
		key: "Mod-i",
		run: br,
		preventDefault: !0
	},
	{
		key: "Mod-[",
		run: $r
	},
	{
		key: "Mod-]",
		run: Qr
	},
	{
		key: "Mod-Alt-\\",
		run: Zr
	},
	{
		key: "Shift-Mod-k",
		run: Gr
	},
	{
		key: "Shift-Mod-\\",
		run: Kn
	},
	{
		key: "Mod-/",
		run: Ft
	},
	{
		key: "Alt-A",
		run: Rt
	},
	{
		key: "Ctrl-m",
		mac: "Shift-Alt-m",
		run: ei
	}
].concat(ni);
//#endregion
//#region node_modules/@replit/codemirror-vim/dist/index.js
function ii(e) {
	var t = e.Pos;
	function n(e, t, n) {
		if (t.line === n.line && t.ch >= n.ch - 1) {
			var r = e.getLine(t.line).charCodeAt(t.ch);
			55296 <= r && r <= 55551 && (n.ch += 1);
		}
		return {
			start: t,
			end: n
		};
	}
	var r = [
		{
			keys: "<Left>",
			type: "keyToKey",
			toKeys: "h"
		},
		{
			keys: "<Right>",
			type: "keyToKey",
			toKeys: "l"
		},
		{
			keys: "<Up>",
			type: "keyToKey",
			toKeys: "k"
		},
		{
			keys: "<Down>",
			type: "keyToKey",
			toKeys: "j"
		},
		{
			keys: "g<Up>",
			type: "keyToKey",
			toKeys: "gk"
		},
		{
			keys: "g<Down>",
			type: "keyToKey",
			toKeys: "gj"
		},
		{
			keys: "<Space>",
			type: "keyToKey",
			toKeys: "l"
		},
		{
			keys: "<BS>",
			type: "keyToKey",
			toKeys: "h"
		},
		{
			keys: "<Del>",
			type: "keyToKey",
			toKeys: "x"
		},
		{
			keys: "<C-Space>",
			type: "keyToKey",
			toKeys: "W"
		},
		{
			keys: "<C-BS>",
			type: "keyToKey",
			toKeys: "B"
		},
		{
			keys: "<S-Space>",
			type: "keyToKey",
			toKeys: "w"
		},
		{
			keys: "<S-BS>",
			type: "keyToKey",
			toKeys: "b"
		},
		{
			keys: "<C-n>",
			type: "keyToKey",
			toKeys: "j"
		},
		{
			keys: "<C-p>",
			type: "keyToKey",
			toKeys: "k"
		},
		{
			keys: "<C-[>",
			type: "keyToKey",
			toKeys: "<Esc>"
		},
		{
			keys: "<C-c>",
			type: "keyToKey",
			toKeys: "<Esc>"
		},
		{
			keys: "<C-[>",
			type: "keyToKey",
			toKeys: "<Esc>",
			context: "insert"
		},
		{
			keys: "<C-c>",
			type: "keyToKey",
			toKeys: "<Esc>",
			context: "insert"
		},
		{
			keys: "<C-Esc>",
			type: "keyToKey",
			toKeys: "<Esc>"
		},
		{
			keys: "<C-Esc>",
			type: "keyToKey",
			toKeys: "<Esc>",
			context: "insert"
		},
		{
			keys: "s",
			type: "keyToKey",
			toKeys: "cl",
			context: "normal"
		},
		{
			keys: "s",
			type: "keyToKey",
			toKeys: "c",
			context: "visual"
		},
		{
			keys: "S",
			type: "keyToKey",
			toKeys: "cc",
			context: "normal"
		},
		{
			keys: "S",
			type: "keyToKey",
			toKeys: "VdO",
			context: "visual"
		},
		{
			keys: "<Home>",
			type: "keyToKey",
			toKeys: "0"
		},
		{
			keys: "<End>",
			type: "keyToKey",
			toKeys: "$"
		},
		{
			keys: "<PageUp>",
			type: "keyToKey",
			toKeys: "<C-b>"
		},
		{
			keys: "<PageDown>",
			type: "keyToKey",
			toKeys: "<C-f>"
		},
		{
			keys: "<CR>",
			type: "keyToKey",
			toKeys: "j^",
			context: "normal"
		},
		{
			keys: "<Ins>",
			type: "keyToKey",
			toKeys: "i",
			context: "normal"
		},
		{
			keys: "<Ins>",
			type: "action",
			action: "toggleOverwrite",
			context: "insert"
		},
		{
			keys: "H",
			type: "motion",
			motion: "moveToTopLine",
			motionArgs: {
				linewise: !0,
				toJumplist: !0
			}
		},
		{
			keys: "M",
			type: "motion",
			motion: "moveToMiddleLine",
			motionArgs: {
				linewise: !0,
				toJumplist: !0
			}
		},
		{
			keys: "L",
			type: "motion",
			motion: "moveToBottomLine",
			motionArgs: {
				linewise: !0,
				toJumplist: !0
			}
		},
		{
			keys: "h",
			type: "motion",
			motion: "moveByCharacters",
			motionArgs: { forward: !1 }
		},
		{
			keys: "l",
			type: "motion",
			motion: "moveByCharacters",
			motionArgs: { forward: !0 }
		},
		{
			keys: "j",
			type: "motion",
			motion: "moveByLines",
			motionArgs: {
				forward: !0,
				linewise: !0
			}
		},
		{
			keys: "k",
			type: "motion",
			motion: "moveByLines",
			motionArgs: {
				forward: !1,
				linewise: !0
			}
		},
		{
			keys: "gj",
			type: "motion",
			motion: "moveByDisplayLines",
			motionArgs: { forward: !0 }
		},
		{
			keys: "gk",
			type: "motion",
			motion: "moveByDisplayLines",
			motionArgs: { forward: !1 }
		},
		{
			keys: "w",
			type: "motion",
			motion: "moveByWords",
			motionArgs: {
				forward: !0,
				wordEnd: !1
			}
		},
		{
			keys: "W",
			type: "motion",
			motion: "moveByWords",
			motionArgs: {
				forward: !0,
				wordEnd: !1,
				bigWord: !0
			}
		},
		{
			keys: "e",
			type: "motion",
			motion: "moveByWords",
			motionArgs: {
				forward: !0,
				wordEnd: !0,
				inclusive: !0
			}
		},
		{
			keys: "E",
			type: "motion",
			motion: "moveByWords",
			motionArgs: {
				forward: !0,
				wordEnd: !0,
				bigWord: !0,
				inclusive: !0
			}
		},
		{
			keys: "b",
			type: "motion",
			motion: "moveByWords",
			motionArgs: {
				forward: !1,
				wordEnd: !1
			}
		},
		{
			keys: "B",
			type: "motion",
			motion: "moveByWords",
			motionArgs: {
				forward: !1,
				wordEnd: !1,
				bigWord: !0
			}
		},
		{
			keys: "ge",
			type: "motion",
			motion: "moveByWords",
			motionArgs: {
				forward: !1,
				wordEnd: !0,
				inclusive: !0
			}
		},
		{
			keys: "gE",
			type: "motion",
			motion: "moveByWords",
			motionArgs: {
				forward: !1,
				wordEnd: !0,
				bigWord: !0,
				inclusive: !0
			}
		},
		{
			keys: "{",
			type: "motion",
			motion: "moveByParagraph",
			motionArgs: {
				forward: !1,
				toJumplist: !0
			}
		},
		{
			keys: "}",
			type: "motion",
			motion: "moveByParagraph",
			motionArgs: {
				forward: !0,
				toJumplist: !0
			}
		},
		{
			keys: "(",
			type: "motion",
			motion: "moveBySentence",
			motionArgs: { forward: !1 }
		},
		{
			keys: ")",
			type: "motion",
			motion: "moveBySentence",
			motionArgs: { forward: !0 }
		},
		{
			keys: "<C-f>",
			type: "motion",
			motion: "moveByPage",
			motionArgs: { forward: !0 }
		},
		{
			keys: "<C-b>",
			type: "motion",
			motion: "moveByPage",
			motionArgs: { forward: !1 }
		},
		{
			keys: "<C-d>",
			type: "motion",
			motion: "moveByScroll",
			motionArgs: {
				forward: !0,
				explicitRepeat: !0
			}
		},
		{
			keys: "<C-u>",
			type: "motion",
			motion: "moveByScroll",
			motionArgs: {
				forward: !1,
				explicitRepeat: !0
			}
		},
		{
			keys: "gg",
			type: "motion",
			motion: "moveToLineOrEdgeOfDocument",
			motionArgs: {
				forward: !1,
				explicitRepeat: !0,
				linewise: !0,
				toJumplist: !0
			}
		},
		{
			keys: "G",
			type: "motion",
			motion: "moveToLineOrEdgeOfDocument",
			motionArgs: {
				forward: !0,
				explicitRepeat: !0,
				linewise: !0,
				toJumplist: !0
			}
		},
		{
			keys: "g$",
			type: "motion",
			motion: "moveToEndOfDisplayLine"
		},
		{
			keys: "g^",
			type: "motion",
			motion: "moveToStartOfDisplayLine"
		},
		{
			keys: "g0",
			type: "motion",
			motion: "moveToStartOfDisplayLine"
		},
		{
			keys: "0",
			type: "motion",
			motion: "moveToStartOfLine"
		},
		{
			keys: "^",
			type: "motion",
			motion: "moveToFirstNonWhiteSpaceCharacter"
		},
		{
			keys: "+",
			type: "motion",
			motion: "moveByLines",
			motionArgs: {
				forward: !0,
				toFirstChar: !0
			}
		},
		{
			keys: "-",
			type: "motion",
			motion: "moveByLines",
			motionArgs: {
				forward: !1,
				toFirstChar: !0
			}
		},
		{
			keys: "_",
			type: "motion",
			motion: "moveByLines",
			motionArgs: {
				forward: !0,
				toFirstChar: !0,
				repeatOffset: -1
			}
		},
		{
			keys: "$",
			type: "motion",
			motion: "moveToEol",
			motionArgs: { inclusive: !0 }
		},
		{
			keys: "%",
			type: "motion",
			motion: "moveToMatchedSymbol",
			motionArgs: {
				inclusive: !0,
				toJumplist: !0
			}
		},
		{
			keys: "f<character>",
			type: "motion",
			motion: "moveToCharacter",
			motionArgs: {
				forward: !0,
				inclusive: !0
			}
		},
		{
			keys: "F<character>",
			type: "motion",
			motion: "moveToCharacter",
			motionArgs: { forward: !1 }
		},
		{
			keys: "t<character>",
			type: "motion",
			motion: "moveTillCharacter",
			motionArgs: {
				forward: !0,
				inclusive: !0
			}
		},
		{
			keys: "T<character>",
			type: "motion",
			motion: "moveTillCharacter",
			motionArgs: { forward: !1 }
		},
		{
			keys: ";",
			type: "motion",
			motion: "repeatLastCharacterSearch",
			motionArgs: { forward: !0 }
		},
		{
			keys: ",",
			type: "motion",
			motion: "repeatLastCharacterSearch",
			motionArgs: { forward: !1 }
		},
		{
			keys: "'<register>",
			type: "motion",
			motion: "goToMark",
			motionArgs: {
				toJumplist: !0,
				linewise: !0
			}
		},
		{
			keys: "`<register>",
			type: "motion",
			motion: "goToMark",
			motionArgs: { toJumplist: !0 }
		},
		{
			keys: "]`",
			type: "motion",
			motion: "jumpToMark",
			motionArgs: { forward: !0 }
		},
		{
			keys: "[`",
			type: "motion",
			motion: "jumpToMark",
			motionArgs: { forward: !1 }
		},
		{
			keys: "]'",
			type: "motion",
			motion: "jumpToMark",
			motionArgs: {
				forward: !0,
				linewise: !0
			}
		},
		{
			keys: "['",
			type: "motion",
			motion: "jumpToMark",
			motionArgs: {
				forward: !1,
				linewise: !0
			}
		},
		{
			keys: "]p",
			type: "action",
			action: "paste",
			isEdit: !0,
			actionArgs: {
				after: !0,
				isEdit: !0,
				matchIndent: !0
			}
		},
		{
			keys: "[p",
			type: "action",
			action: "paste",
			isEdit: !0,
			actionArgs: {
				after: !1,
				isEdit: !0,
				matchIndent: !0
			}
		},
		{
			keys: "]<character>",
			type: "motion",
			motion: "moveToSymbol",
			motionArgs: {
				forward: !0,
				toJumplist: !0
			}
		},
		{
			keys: "[<character>",
			type: "motion",
			motion: "moveToSymbol",
			motionArgs: {
				forward: !1,
				toJumplist: !0
			}
		},
		{
			keys: "|",
			type: "motion",
			motion: "moveToColumn"
		},
		{
			keys: "o",
			type: "motion",
			motion: "moveToOtherHighlightedEnd",
			context: "visual"
		},
		{
			keys: "O",
			type: "motion",
			motion: "moveToOtherHighlightedEnd",
			motionArgs: { sameLine: !0 },
			context: "visual"
		},
		{
			keys: "d",
			type: "operator",
			operator: "delete"
		},
		{
			keys: "y",
			type: "operator",
			operator: "yank"
		},
		{
			keys: "c",
			type: "operator",
			operator: "change"
		},
		{
			keys: "=",
			type: "operator",
			operator: "indentAuto"
		},
		{
			keys: ">",
			type: "operator",
			operator: "indent",
			operatorArgs: { indentRight: !0 }
		},
		{
			keys: "<",
			type: "operator",
			operator: "indent",
			operatorArgs: { indentRight: !1 }
		},
		{
			keys: "g~",
			type: "operator",
			operator: "changeCase"
		},
		{
			keys: "gu",
			type: "operator",
			operator: "changeCase",
			operatorArgs: { toLower: !0 },
			isEdit: !0
		},
		{
			keys: "gU",
			type: "operator",
			operator: "changeCase",
			operatorArgs: { toLower: !1 },
			isEdit: !0
		},
		{
			keys: "n",
			type: "motion",
			motion: "findNext",
			motionArgs: {
				forward: !0,
				toJumplist: !0
			}
		},
		{
			keys: "N",
			type: "motion",
			motion: "findNext",
			motionArgs: {
				forward: !1,
				toJumplist: !0
			}
		},
		{
			keys: "gn",
			type: "motion",
			motion: "findAndSelectNextInclusive",
			motionArgs: { forward: !0 }
		},
		{
			keys: "gN",
			type: "motion",
			motion: "findAndSelectNextInclusive",
			motionArgs: { forward: !1 }
		},
		{
			keys: "gq",
			type: "operator",
			operator: "hardWrap"
		},
		{
			keys: "gw",
			type: "operator",
			operator: "hardWrap",
			operatorArgs: { keepCursor: !0 }
		},
		{
			keys: "g?",
			type: "operator",
			operator: "rot13"
		},
		{
			keys: "x",
			type: "operatorMotion",
			operator: "delete",
			motion: "moveByCharacters",
			motionArgs: { forward: !0 },
			operatorMotionArgs: { visualLine: !1 }
		},
		{
			keys: "X",
			type: "operatorMotion",
			operator: "delete",
			motion: "moveByCharacters",
			motionArgs: { forward: !1 },
			operatorMotionArgs: { visualLine: !0 }
		},
		{
			keys: "D",
			type: "operatorMotion",
			operator: "delete",
			motion: "moveToEol",
			motionArgs: { inclusive: !0 },
			context: "normal"
		},
		{
			keys: "D",
			type: "operator",
			operator: "delete",
			operatorArgs: { linewise: !0 },
			context: "visual"
		},
		{
			keys: "Y",
			type: "operatorMotion",
			operator: "yank",
			motion: "expandToLine",
			motionArgs: { linewise: !0 },
			context: "normal"
		},
		{
			keys: "Y",
			type: "operator",
			operator: "yank",
			operatorArgs: { linewise: !0 },
			context: "visual"
		},
		{
			keys: "C",
			type: "operatorMotion",
			operator: "change",
			motion: "moveToEol",
			motionArgs: { inclusive: !0 },
			context: "normal"
		},
		{
			keys: "C",
			type: "operator",
			operator: "change",
			operatorArgs: { linewise: !0 },
			context: "visual"
		},
		{
			keys: "~",
			type: "operatorMotion",
			operator: "changeCase",
			motion: "moveByCharacters",
			motionArgs: { forward: !0 },
			operatorArgs: { shouldMoveCursor: !0 },
			context: "normal"
		},
		{
			keys: "~",
			type: "operator",
			operator: "changeCase",
			context: "visual"
		},
		{
			keys: "<C-u>",
			type: "operatorMotion",
			operator: "delete",
			motion: "moveToStartOfLine",
			context: "insert"
		},
		{
			keys: "<C-w>",
			type: "operatorMotion",
			operator: "delete",
			motion: "moveByWords",
			motionArgs: {
				forward: !1,
				wordEnd: !1
			},
			context: "insert"
		},
		{
			keys: "<C-w>",
			type: "idle",
			context: "normal"
		},
		{
			keys: "<C-i>",
			type: "action",
			action: "jumpListWalk",
			actionArgs: { forward: !0 }
		},
		{
			keys: "<C-o>",
			type: "action",
			action: "jumpListWalk",
			actionArgs: { forward: !1 }
		},
		{
			keys: "<C-e>",
			type: "action",
			action: "scroll",
			actionArgs: {
				forward: !0,
				linewise: !0
			}
		},
		{
			keys: "<C-y>",
			type: "action",
			action: "scroll",
			actionArgs: {
				forward: !1,
				linewise: !0
			}
		},
		{
			keys: "a",
			type: "action",
			action: "enterInsertMode",
			isEdit: !0,
			actionArgs: { insertAt: "charAfter" },
			context: "normal"
		},
		{
			keys: "A",
			type: "action",
			action: "enterInsertMode",
			isEdit: !0,
			actionArgs: { insertAt: "eol" },
			context: "normal"
		},
		{
			keys: "A",
			type: "action",
			action: "enterInsertMode",
			isEdit: !0,
			actionArgs: { insertAt: "endOfSelectedArea" },
			context: "visual"
		},
		{
			keys: "i",
			type: "action",
			action: "enterInsertMode",
			isEdit: !0,
			actionArgs: { insertAt: "inplace" },
			context: "normal"
		},
		{
			keys: "gi",
			type: "action",
			action: "enterInsertMode",
			isEdit: !0,
			actionArgs: { insertAt: "lastEdit" },
			context: "normal"
		},
		{
			keys: "I",
			type: "action",
			action: "enterInsertMode",
			isEdit: !0,
			actionArgs: { insertAt: "firstNonBlank" },
			context: "normal"
		},
		{
			keys: "gI",
			type: "action",
			action: "enterInsertMode",
			isEdit: !0,
			actionArgs: { insertAt: "bol" },
			context: "normal"
		},
		{
			keys: "I",
			type: "action",
			action: "enterInsertMode",
			isEdit: !0,
			actionArgs: { insertAt: "startOfSelectedArea" },
			context: "visual"
		},
		{
			keys: "o",
			type: "action",
			action: "newLineAndEnterInsertMode",
			isEdit: !0,
			interlaceInsertRepeat: !0,
			actionArgs: { after: !0 },
			context: "normal"
		},
		{
			keys: "O",
			type: "action",
			action: "newLineAndEnterInsertMode",
			isEdit: !0,
			interlaceInsertRepeat: !0,
			actionArgs: { after: !1 },
			context: "normal"
		},
		{
			keys: "v",
			type: "action",
			action: "toggleVisualMode"
		},
		{
			keys: "V",
			type: "action",
			action: "toggleVisualMode",
			actionArgs: { linewise: !0 }
		},
		{
			keys: "<C-v>",
			type: "action",
			action: "toggleVisualMode",
			actionArgs: { blockwise: !0 }
		},
		{
			keys: "<C-q>",
			type: "action",
			action: "toggleVisualMode",
			actionArgs: { blockwise: !0 }
		},
		{
			keys: "gv",
			type: "action",
			action: "reselectLastSelection"
		},
		{
			keys: "J",
			type: "action",
			action: "joinLines",
			isEdit: !0
		},
		{
			keys: "gJ",
			type: "action",
			action: "joinLines",
			actionArgs: { keepSpaces: !0 },
			isEdit: !0
		},
		{
			keys: "p",
			type: "action",
			action: "paste",
			isEdit: !0,
			actionArgs: {
				after: !0,
				isEdit: !0
			}
		},
		{
			keys: "P",
			type: "action",
			action: "paste",
			isEdit: !0,
			actionArgs: {
				after: !1,
				isEdit: !0
			}
		},
		{
			keys: "r<character>",
			type: "action",
			action: "replace",
			isEdit: !0
		},
		{
			keys: "@<register>",
			type: "action",
			action: "replayMacro"
		},
		{
			keys: "q<register>",
			type: "action",
			action: "enterMacroRecordMode"
		},
		{
			keys: "R",
			type: "action",
			action: "enterInsertMode",
			isEdit: !0,
			actionArgs: { replace: !0 },
			context: "normal"
		},
		{
			keys: "R",
			type: "operator",
			operator: "change",
			operatorArgs: {
				linewise: !0,
				fullLine: !0
			},
			context: "visual",
			exitVisualBlock: !0
		},
		{
			keys: "u",
			type: "action",
			action: "undo",
			context: "normal"
		},
		{
			keys: "u",
			type: "operator",
			operator: "changeCase",
			operatorArgs: { toLower: !0 },
			context: "visual",
			isEdit: !0
		},
		{
			keys: "U",
			type: "operator",
			operator: "changeCase",
			operatorArgs: { toLower: !1 },
			context: "visual",
			isEdit: !0
		},
		{
			keys: "<C-r>",
			type: "action",
			action: "redo"
		},
		{
			keys: "m<register>",
			type: "action",
			action: "setMark"
		},
		{
			keys: "\"<register>",
			type: "action",
			action: "setRegister"
		},
		{
			keys: "<C-r><register>",
			type: "action",
			action: "insertRegister",
			context: "insert",
			isEdit: !0
		},
		{
			keys: "<C-o>",
			type: "action",
			action: "oneNormalCommand",
			context: "insert"
		},
		{
			keys: "zz",
			type: "action",
			action: "scrollToCursor",
			actionArgs: { position: "center" }
		},
		{
			keys: "z.",
			type: "action",
			action: "scrollToCursor",
			actionArgs: { position: "center" },
			motion: "moveToFirstNonWhiteSpaceCharacter"
		},
		{
			keys: "zt",
			type: "action",
			action: "scrollToCursor",
			actionArgs: { position: "top" }
		},
		{
			keys: "z<CR>",
			type: "action",
			action: "scrollToCursor",
			actionArgs: { position: "top" },
			motion: "moveToFirstNonWhiteSpaceCharacter"
		},
		{
			keys: "zb",
			type: "action",
			action: "scrollToCursor",
			actionArgs: { position: "bottom" }
		},
		{
			keys: "z-",
			type: "action",
			action: "scrollToCursor",
			actionArgs: { position: "bottom" },
			motion: "moveToFirstNonWhiteSpaceCharacter"
		},
		{
			keys: ".",
			type: "action",
			action: "repeatLastEdit"
		},
		{
			keys: "<C-a>",
			type: "action",
			action: "incrementNumberToken",
			isEdit: !0,
			actionArgs: {
				increase: !0,
				backtrack: !1
			}
		},
		{
			keys: "<C-x>",
			type: "action",
			action: "incrementNumberToken",
			isEdit: !0,
			actionArgs: {
				increase: !1,
				backtrack: !1
			}
		},
		{
			keys: "<C-t>",
			type: "action",
			action: "indent",
			actionArgs: { indentRight: !0 },
			context: "insert"
		},
		{
			keys: "<C-d>",
			type: "action",
			action: "indent",
			actionArgs: { indentRight: !1 },
			context: "insert"
		},
		{
			keys: "a<register>",
			type: "motion",
			motion: "textObjectManipulation"
		},
		{
			keys: "i<register>",
			type: "motion",
			motion: "textObjectManipulation",
			motionArgs: { textObjectInner: !0 }
		},
		{
			keys: "/",
			type: "search",
			searchArgs: {
				forward: !0,
				querySrc: "prompt",
				toJumplist: !0
			}
		},
		{
			keys: "?",
			type: "search",
			searchArgs: {
				forward: !1,
				querySrc: "prompt",
				toJumplist: !0
			}
		},
		{
			keys: "*",
			type: "search",
			searchArgs: {
				forward: !0,
				querySrc: "wordUnderCursor",
				wholeWordOnly: !0,
				toJumplist: !0
			}
		},
		{
			keys: "#",
			type: "search",
			searchArgs: {
				forward: !1,
				querySrc: "wordUnderCursor",
				wholeWordOnly: !0,
				toJumplist: !0
			}
		},
		{
			keys: "g*",
			type: "search",
			searchArgs: {
				forward: !0,
				querySrc: "wordUnderCursor",
				toJumplist: !0
			}
		},
		{
			keys: "g#",
			type: "search",
			searchArgs: {
				forward: !1,
				querySrc: "wordUnderCursor",
				toJumplist: !0
			}
		},
		{
			keys: ":",
			type: "ex"
		}
	], i = Object.create(null), a = r.length, o = [
		{
			name: "colorscheme",
			shortName: "colo"
		},
		{ name: "map" },
		{
			name: "imap",
			shortName: "im"
		},
		{
			name: "nmap",
			shortName: "nm"
		},
		{
			name: "vmap",
			shortName: "vm"
		},
		{
			name: "omap",
			shortName: "om"
		},
		{
			name: "noremap",
			shortName: "no"
		},
		{
			name: "nnoremap",
			shortName: "nn"
		},
		{
			name: "vnoremap",
			shortName: "vn"
		},
		{
			name: "inoremap",
			shortName: "ino"
		},
		{
			name: "onoremap",
			shortName: "ono"
		},
		{ name: "unmap" },
		{
			name: "mapclear",
			shortName: "mapc"
		},
		{
			name: "nmapclear",
			shortName: "nmapc"
		},
		{
			name: "vmapclear",
			shortName: "vmapc"
		},
		{
			name: "imapclear",
			shortName: "imapc"
		},
		{
			name: "omapclear",
			shortName: "omapc"
		},
		{
			name: "write",
			shortName: "w"
		},
		{
			name: "undo",
			shortName: "u"
		},
		{
			name: "redo",
			shortName: "red"
		},
		{
			name: "set",
			shortName: "se"
		},
		{
			name: "setlocal",
			shortName: "setl"
		},
		{
			name: "setglobal",
			shortName: "setg"
		},
		{
			name: "sort",
			shortName: "sor"
		},
		{
			name: "substitute",
			shortName: "s",
			possiblyAsync: !0
		},
		{
			name: "startinsert",
			shortName: "start"
		},
		{
			name: "nohlsearch",
			shortName: "noh"
		},
		{
			name: "yank",
			shortName: "y"
		},
		{
			name: "delmarks",
			shortName: "delm"
		},
		{
			name: "marks",
			excludeFromCommandHistory: !0
		},
		{
			name: "registers",
			shortName: "reg",
			excludeFromCommandHistory: !0
		},
		{
			name: "vglobal",
			shortName: "v"
		},
		{
			name: "delete",
			shortName: "d"
		},
		{
			name: "join",
			shortName: "j"
		},
		{
			name: "normal",
			shortName: "norm"
		},
		{
			name: "global",
			shortName: "g"
		}
	], s = ge("");
	function c(t) {
		t.setOption("disableInput", !0), t.setOption("showCursorWhenSelecting", !1), e.signal(t, "vim-mode-change", { mode: "normal" }), t.on("cursorActivity", rn), ie(t), e.on(t.getInputField(), "paste", u(t));
	}
	function l(t) {
		t.setOption("disableInput", !1), t.off("cursorActivity", rn), e.off(t.getInputField(), "paste", u(t)), t.state.vim = null, Ft && clearTimeout(Ft);
	}
	function u(e) {
		var t = e.state.vim;
		return t.onPasteFn ||= function() {
			t.insertMode || (e.setCursor(I(e.getCursor(), 0, 1)), Oe.enterInsertMode(e, {}, t));
		}, t.onPasteFn;
	}
	var d = /[\d]/, f = [e.isWordChar, function(t) {
		return t && !e.isWordChar(t) && !/\s/.test(t);
	}], p = [function(e) {
		return /\S/.test(e);
	}], m = ["<", ">"], h = [
		"-",
		"\"",
		".",
		":",
		"_",
		"/",
		"+"
	], g = /^\w$/, _ = /^[A-Z]$/;
	try {
		_ = /* @__PURE__ */ RegExp("^[\\p{Lu}]$", "u");
	} catch {}
	function v(e, t) {
		return t >= e.firstLine() && t <= e.lastLine();
	}
	function y(e) {
		return /^[a-z]$/.test(e);
	}
	function b(e) {
		return "()[]{}".indexOf(e) != -1;
	}
	function x(e) {
		return d.test(e);
	}
	function ee(e) {
		return _.test(e);
	}
	function S(e) {
		return /^\s*$/.test(e);
	}
	function C(e) {
		return ".?!".indexOf(e) != -1;
	}
	function w(e, t) {
		for (var n = 0; n < t.length; n++) if (t[n] == e) return !0;
		return !1;
	}
	var T = {};
	function E(e, t, n, r, i) {
		if (t === void 0 && !i) throw Error("defaultValue is required unless callback is provided");
		if (n ||= "string", T[e] = {
			type: n,
			defaultValue: t,
			callback: i
		}, r) for (var a = 0; a < r.length; a++) T[r[a]] = T[e];
		t && D(e, t);
	}
	function D(e, t, n, r) {
		var i = T[e];
		r ||= {};
		var a = r.scope;
		if (!i) return /* @__PURE__ */ Error("Unknown option: " + e);
		if (i.type == "boolean") {
			if (t && t !== !0) return /* @__PURE__ */ Error("Invalid argument: " + e + "=" + t);
			t !== !1 && (t = !0);
		}
		i.callback ? (a !== "local" && i.callback(t, void 0), a !== "global" && n && i.callback(t, n)) : (a !== "local" && (i.value = i.type == "boolean" ? !!t : t), a !== "global" && n && (n.state.vim.options[e] = { value: t }));
	}
	function O(e, t, n) {
		var r = T[e];
		n ||= {};
		var i = n.scope;
		if (!r) return /* @__PURE__ */ Error("Unknown option: " + e);
		if (r.callback) {
			let e = t && r.callback(void 0, t);
			return i !== "global" && e !== void 0 ? e : i === "local" ? void 0 : r.callback();
		} else return (i !== "global" && t && t.state.vim.options[e] || i !== "local" && r || {}).value;
	}
	E("filetype", void 0, "string", ["ft"], function(e, t) {
		if (t !== void 0) if (e === void 0) {
			let e = t.getOption("mode");
			return e == "null" ? "" : e;
		} else {
			let n = e == "" ? "null" : e;
			t.setOption("mode", n);
		}
	}), E("textwidth", 80, "number", ["tw"], function(e, t) {
		if (t !== void 0) {
			if (e === void 0) return t.getOption("textwidth");
			var n = Math.round(e);
			n > 1 && t.setOption("textwidth", n);
		}
	});
	var te = function() {
		var e = 100, t = -1, n = 0, r = 0, i = Array(e);
		function a(a, o, s) {
			var c = i[t % e];
			function l(n) {
				var r = ++t % e, o = i[r];
				o && o.clear(), i[r] = a.setBookmark(n);
			}
			if (c) {
				var u = c.find();
				u && !R(u, o) && l(o);
			} else l(o);
			l(s), n = t, r = t - e + 1, r < 0 && (r = 0);
		}
		function o(a, o) {
			t += o, t > n ? t = n : t < r && (t = r);
			var s = i[(e + t) % e];
			if (s && !s.find()) {
				var c = o > 0 ? 1 : -1, l, u = a.getCursor();
				do
					if (t += c, s = i[(e + t) % e], s && (l = s.find()) && !R(u, l)) break;
				while (t < n && t > r);
			}
			return s;
		}
		function s(e, n) {
			var r = t, i = o(e, n);
			return t = r, i && i.find();
		}
		return {
			cachedCursor: void 0,
			add: a,
			find: s,
			move: o
		};
	}, ne = function(e) {
		return e ? {
			changes: e.changes,
			expectCursorActivityForChange: e.expectCursorActivityForChange
		} : {
			changes: [],
			expectCursorActivityForChange: !1
		};
	};
	class re {
		constructor() {
			this.latestRegister = void 0, this.isPlaying = !1, this.isRecording = !1, this.replaySearchQueries = [], this.onRecordingDone = void 0, this.lastInsertModeChanges = ne();
		}
		exitMacroRecordMode() {
			var e = k.macroModeState;
			e.onRecordingDone && e.onRecordingDone(), e.onRecordingDone = void 0, e.isRecording = !1;
		}
		enterMacroRecordMode(e, t) {
			var n = k.registerController.getRegister(t);
			if (n) {
				if (n.clear(), this.latestRegister = t, e.openDialog) {
					var r = kt("span", { class: "cm-vim-message" }, "recording @" + t);
					this.onRecordingDone = e.openDialog(r, function() {}, { bottom: !0 });
				}
				this.isRecording = !0;
			}
		}
	}
	function ie(e) {
		return e.state.vim || (e.state.vim = {
			inputState: new _e(),
			lastEditInputState: void 0,
			lastEditActionCommand: void 0,
			lastHPos: -1,
			lastHSPos: -1,
			lastMotion: null,
			marks: {},
			insertMode: !1,
			insertModeReturn: !1,
			insertModeRepeat: void 0,
			visualMode: !1,
			visualLine: !1,
			visualBlock: !1,
			lastSelection: null,
			lastPastedText: void 0,
			sel: {
				anchor: new t(0, 0),
				head: new t(0, 0)
			},
			options: {},
			expectLiteralNext: !1,
			status: ""
		}), e.state.vim;
	}
	var k;
	function ae() {
		for (var e in k = {
			searchQuery: null,
			searchIsReversed: !1,
			lastSubstituteReplacePart: void 0,
			jumpList: te(),
			macroModeState: new re(),
			lastCharacterSearch: {
				increment: 0,
				forward: !0,
				selectedCharacter: ""
			},
			registerController: new xe({}),
			searchHistoryController: new Se(),
			exCommandHistoryController: new Se()
		}, T) {
			var t = T[e];
			t.value = t.defaultValue;
		}
	}
	class oe {
		constructor(e, t) {
			this.keyName = e, this.key = t.key, this.ctrlKey = t.ctrlKey, this.altKey = t.altKey, this.metaKey = t.metaKey, this.shiftKey = t.shiftKey;
		}
	}
	var se, A = {
		enterVimMode: c,
		leaveVimMode: l,
		buildKeyMap: function() {},
		getRegisterController: function() {
			return k.registerController;
		},
		resetVimGlobalState_: ae,
		getVimGlobalState_: function() {
			return k;
		},
		maybeInitVimState_: ie,
		suppressErrorLogging: !1,
		InsertModeKey: oe,
		map: function(e, t, n) {
			W.map(e, t, n);
		},
		unmap: function(e, t) {
			return W.unmap(e, t);
		},
		noremap: function(e, t, n) {
			W.map(e, t, n, !0);
		},
		mapclear: function(e) {
			var t = r.length, n = a, i = r.slice(0, t - n);
			if (r = r.slice(t - n), e) for (var o = i.length - 1; o >= 0; o--) {
				var s = i[o];
				if (e !== s.context) if (s.context) this._mapCommand(s);
				else {
					var c = [
						"normal",
						"insert",
						"visual"
					];
					for (var l in c) if (c[l] !== e) {
						var u = Object.assign({}, s);
						u.context = c[l], this._mapCommand(u);
					}
				}
			}
		},
		langmap: M,
		vimKeyFromEvent: he,
		setOption: D,
		getOption: O,
		defineOption: E,
		defineEx: function(e, t, n) {
			if (!t) t = e;
			else if (e.indexOf(t) !== 0) throw Error("(Vim.defineEx) \"" + t + "\" is not a prefix of \"" + e + "\", command not registered");
			Gt[e] = n, W.commandMap_[t] = {
				name: e,
				shortName: t,
				type: "api"
			};
		},
		handleKey: function(e, t, n) {
			var r = this.findKey(e, t, n);
			if (typeof r == "function") return r();
		},
		multiSelectHandleKey: un,
		findKey: function(t, n, i) {
			var a = ie(t), o = t;
			function s() {
				var e = k.macroModeState;
				if (e.isRecording) {
					if (n == "q") return e.exitMacroRecordMode(), N(o), !0;
					i != "mapping" && $t(e, n);
				}
			}
			function c() {
				if (n == "<Esc>") {
					if (a.visualMode) Ye(o);
					else if (a.insertMode) qt(o);
					else return;
					return N(o), !0;
				}
			}
			function l() {
				if (c()) return !0;
				a.inputState.keyBuffer.push(n);
				var e = a.inputState.keyBuffer.join(""), t = n.length == 1, i = Ce.matchCommand(e, r, a.inputState, "insert"), s = a.inputState.changeQueue;
				if (i.type == "none") return N(o), !1;
				if (i.type == "partial") {
					if (i.expectLiteralNext && (a.expectLiteralNext = !0), se && window.clearTimeout(se), se = t && window.setTimeout(function() {
						a.insertMode && a.inputState.keyBuffer.length && N(o);
					}, O("insertModeEscKeysTimeout")), t) {
						var l = o.listSelections();
						(!s || s.removed.length != l.length) && (s = a.inputState.changeQueue = new ve()), s.inserted += n;
						for (var u = 0; u < l.length; u++) {
							var d = B(l[u].anchor, l[u].head), f = Fe(l[u].anchor, l[u].head), p = o.getRange(d, o.state.overwrite ? I(f, 0, 1) : f);
							s.removed[u] = (s.removed[u] || "") + p;
						}
					}
					return !t;
				} else i.type == "full" && (a.inputState.keyBuffer.length = 0);
				if (a.expectLiteralNext = !1, se && window.clearTimeout(se), i.command && s) {
					for (var l = o.listSelections(), u = 0; u < l.length; u++) {
						var m = l[u].head;
						o.replaceRange(s.removed[u] || "", I(m, 0, -s.inserted.length), m, "+input");
					}
					k.macroModeState.lastInsertModeChanges.changes.pop();
				}
				return i.command || N(o), i.command;
			}
			function u() {
				if (s() || c()) return !0;
				a.inputState.keyBuffer.push(n);
				var e = a.inputState.keyBuffer.join("");
				if (/^[1-9]\d*$/.test(e)) return !0;
				var t = /^(\d*)(.*)$/.exec(e);
				if (!t) return N(o), !1;
				var i = a.visualMode ? "visual" : "normal", l = t[2] || t[1];
				a.inputState.operatorShortcut && a.inputState.operatorShortcut.slice(-1) == l && (l = a.inputState.operatorShortcut);
				var u = Ce.matchCommand(l, r, a.inputState, i);
				return u.type == "none" ? (N(o), !1) : u.type == "partial" ? (u.expectLiteralNext && (a.expectLiteralNext = !0), !0) : u.type == "clear" ? (N(o), !0) : (a.expectLiteralNext = !1, a.inputState.keyBuffer.length = 0, t = /^(\d*)(.*)$/.exec(e), t && t[1] && t[1] != "0" && a.inputState.pushRepeatDigit(t[1]), u.command);
			}
			var d = a.insertMode ? l() : u();
			if (d === !1) return !a.insertMode && (n.length === 1 || e.isMac && /<A-.>/.test(n)) ? function() {
				return !0;
			} : void 0;
			if (d === !0) return function() {
				return !0;
			};
			if (d) return function() {
				return o.operation(function() {
					o.curOp.isVimOp = !0;
					try {
						if (typeof d != "object") return;
						d.type == "keyToKey" ? de(o, d.toKeys, d) : Ce.processCommand(o, a, d);
					} catch (e) {
						throw o.state.vim = void 0, ie(o), A.suppressErrorLogging || console.log(e), e;
					}
					return !0;
				});
			};
		},
		handleEx: function(e, t) {
			W.processCommand(e, t);
		},
		defineMotion: Te,
		defineAction: ke,
		defineOperator: P,
		mapCommand: Zt,
		_mapCommand: Jt,
		defineRegister: be,
		exitVisualMode: Ye,
		exitInsertMode: qt
	}, ce = [], le = !1, j;
	function ue(e) {
		if (!j) throw Error("No prompt to send key to");
		if (e[0] == "<") {
			var t = e.toLowerCase().slice(1, -1);
			if (t = t.split("-").pop() || "", t == "lt") e = "<";
			else if (t == "space") e = " ";
			else if (t == "cr") e = "\n";
			else if (me[t]) {
				var n = j.value || "", r = {
					key: me[t],
					target: {
						value: n,
						selectionEnd: n.length,
						selectionStart: n.length
					}
				};
				j.onKeyDown && j.onKeyDown(r, j.value, a), j && j.onKeyUp && j.onKeyUp(r, j.value, a);
				return;
			}
		}
		if (e == "\n") {
			var i = j;
			j = null, i.onClose && i.onClose(i.value);
		} else j.value = (j.value || "") + e;
		function a(e) {
			j && (typeof e == "string" ? j.value = e : j = null);
		}
	}
	function de(e, t, n) {
		var r = le;
		if (n) {
			if (ce.indexOf(n) != -1) return;
			ce.push(n), le = n.noremap != 0;
		}
		try {
			for (var i = ie(e), a = /<(?:[CSMA]-)*\w+>|./gi, o; o = a.exec(t);) {
				var s = o[0], c = i.insertMode;
				if (j) {
					ue(s);
					continue;
				}
				if (!A.handleKey(e, s, "mapping") && c && i.insertMode) {
					if (s[0] == "<") {
						var l = s.toLowerCase().slice(1, -1);
						if (l = l.split("-").pop() || "", l == "lt") s = "<";
						else if (l == "space") s = " ";
						else if (l == "cr") s = "\n";
						else if (me.hasOwnProperty(l)) {
							s = me[l], G(e, s);
							continue;
						} else s = s[0], a.lastIndex = o.index + 1;
					}
					e.replaceSelection(s);
				}
			}
		} finally {
			if (ce.pop(), le = ce.length ? r : !1, !ce.length && j) {
				var u = j;
				j = null, jt(e, u);
			}
		}
	}
	var fe = {
		Return: "CR",
		Backspace: "BS",
		Delete: "Del",
		Escape: "Esc",
		Insert: "Ins",
		ArrowLeft: "Left",
		ArrowRight: "Right",
		ArrowUp: "Up",
		ArrowDown: "Down",
		Enter: "CR",
		" ": "Space"
	}, pe = {
		Shift: 1,
		Alt: 1,
		Command: 1,
		Control: 1,
		CapsLock: 1,
		AltGraph: 1,
		Dead: 1,
		Unidentified: 1
	}, me = {};
	"Left|Right|Up|Down|End|Home".split("|").concat(Object.keys(fe)).forEach(function(e) {
		me[(fe[e] || "").toLowerCase()] = me[e.toLowerCase()] = e;
	});
	function he(t, n) {
		var r = t.key;
		if (!pe[r]) {
			r.length > 1 && r[0] == "n" && (r = r.replace("Numpad", "")), r = fe[r] || r;
			var a = "";
			if (t.ctrlKey && (a += "C-"), t.altKey && (a += "A-"), t.metaKey && (a += "M-"), e.isMac && a == "A-" && r.length == 1 && (a = a.slice(2)), (a || r.length > 1) && t.shiftKey && (a += "S-"), n && !n.expectLiteralNext && r.length == 1) {
				if (s.keymap && r in s.keymap) (s.remapCtrl != 0 || !a) && (r = s.keymap[r]);
				else if (r.charCodeAt(0) > 128 && !i[r]) {
					var o = t.code?.slice(-1) || "";
					t.shiftKey || (o = o.toLowerCase()), o && (r = o, !a && t.altKey && (a = "A-"));
				}
			}
			return a += r, a.length > 1 && (a = "<" + a + ">"), a;
		}
	}
	function M(e, t) {
		s.string !== e && (s = ge(e)), s.remapCtrl = t;
	}
	function ge(e) {
		let t = {};
		if (!e) return {
			keymap: t,
			string: ""
		};
		function n(e) {
			return e.split(/\\?(.)/).filter(Boolean);
		}
		return e.split(/((?:[^\\,]|\\.)+),/).map((e) => {
			if (!e) return;
			let r = e.split(/((?:[^\\;]|\\.)+);/);
			if (r.length == 3) {
				let e = n(r[1]), i = n(r[2]);
				if (e.length !== i.length) return;
				for (let n = 0; n < e.length; ++n) t[e[n]] = i[n];
			} else if (r.length == 1) {
				let r = n(e);
				if (r.length % 2 != 0) return;
				for (let e = 0; e < r.length; e += 2) t[r[e]] = r[e + 1];
			}
		}), {
			keymap: t,
			string: e
		};
	}
	E("langmap", void 0, "string", ["lmap"], function(e, t) {
		if (e === void 0) return s.string;
		M(e);
	});
	class _e {
		constructor() {
			this.prefixRepeat = [], this.motionRepeat = [], this.operator = null, this.operatorArgs = null, this.motion = null, this.motionArgs = null, this.keyBuffer = [], this.registerName = void 0, this.changeQueue = null;
		}
		pushRepeatDigit(e) {
			this.operator ? this.motionRepeat = this.motionRepeat.concat(e) : this.prefixRepeat = this.prefixRepeat.concat(e);
		}
		getRepeat() {
			var e = 0;
			return (this.prefixRepeat.length > 0 || this.motionRepeat.length > 0) && (e = 1, this.prefixRepeat.length > 0 && (e *= parseInt(this.prefixRepeat.join(""), 10)), this.motionRepeat.length > 0 && (e *= parseInt(this.motionRepeat.join(""), 10))), e;
		}
	}
	function N(t, n) {
		t.state.vim.inputState = new _e(), t.state.vim.expectLiteralNext = !1, e.signal(t, "vim-command-done", n);
	}
	function ve() {
		this.removed = [], this.inserted = "";
	}
	class ye {
		constructor(e, t, n) {
			this.clear(), this.keyBuffer = [e || ""], this.insertModeChanges = [], this.searchQueries = [], this.linewise = !!t, this.blockwise = !!n;
		}
		setText(e, t, n) {
			this.keyBuffer = [e || ""], this.linewise = !!t, this.blockwise = !!n;
		}
		pushText(e, t) {
			t && (this.linewise || this.keyBuffer.push("\n"), this.linewise = !0), this.keyBuffer.push(e);
		}
		pushInsertModeChanges(e) {
			this.insertModeChanges.push(ne(e));
		}
		pushSearchQuery(e) {
			this.searchQueries.push(e);
		}
		clear() {
			this.keyBuffer = [], this.insertModeChanges = [], this.searchQueries = [], this.linewise = !1;
		}
		toString() {
			return this.keyBuffer.join("");
		}
	}
	function be(e, t) {
		var n = k.registerController.registers;
		if (!e || e.length != 1) throw Error("Register name must be 1 character");
		if (n[e]) throw Error("Register already defined " + e);
		n[e] = t, h.push(e);
	}
	class xe {
		constructor(e) {
			this.registers = e, this.unnamedRegister = e["\""] = new ye(), e["."] = new ye(), e[":"] = new ye(), e["/"] = new ye(), e["+"] = new ye();
		}
		pushText(e, t, n, r, i) {
			if (e !== "_") {
				r && n.charAt(n.length - 1) !== "\n" && (n += "\n");
				var a = this.isValidRegister(e) ? this.getRegister(e) : null;
				if (!a || !e) {
					switch (t) {
						case "yank":
							this.registers[0] = new ye(n, r, i);
							break;
						case "delete":
						case "change":
							n.indexOf("\n") == -1 ? this.registers["-"] = new ye(n, r) : (this.shiftNumericRegisters_(), this.registers[1] = new ye(n, r));
							break;
					}
					this.unnamedRegister.setText(n, r, i);
					return;
				}
				ee(e) ? a.pushText(n, r) : a.setText(n, r, i), e === "+" && navigator.clipboard.writeText(n), this.unnamedRegister.setText(a.toString(), r);
			}
		}
		getRegister(e) {
			return this.isValidRegister(e) ? (e = e.toLowerCase(), this.registers[e] || (this.registers[e] = new ye()), this.registers[e]) : this.unnamedRegister;
		}
		isValidRegister(e) {
			return e && (w(e, h) || g.test(e));
		}
		shiftNumericRegisters_() {
			for (var e = 9; e >= 2; e--) this.registers[e] = this.getRegister("" + (e - 1));
		}
	}
	class Se {
		constructor() {
			this.historyBuffer = [], this.iterator = 0, this.initialPrefix = null;
		}
		nextMatch(e, t) {
			var n = this.historyBuffer, r = t ? -1 : 1;
			this.initialPrefix === null && (this.initialPrefix = e);
			for (var i = this.iterator + r; t ? i >= 0 : i < n.length; i += r) for (var a = n[i], o = 0; o <= a.length; o++) if (this.initialPrefix == a.substring(0, o)) return this.iterator = i, a;
			if (i >= n.length) return this.iterator = n.length, this.initialPrefix;
			if (i < 0) return e;
		}
		pushInput(e) {
			var t = this.historyBuffer.indexOf(e);
			t > -1 && this.historyBuffer.splice(t, 1), e.length && this.historyBuffer.push(e);
		}
		reset() {
			this.initialPrefix = null, this.iterator = this.historyBuffer.length;
		}
	}
	var Ce = {
		matchCommand: function(e, t, n, r) {
			var i = je(e, t, r, n), a = i.full[0];
			if (!a) return i.partial.length ? {
				type: "partial",
				expectLiteralNext: i.partial.length == 1 && i.partial[0].keys.slice(-11) == "<character>"
			} : { type: "none" };
			if (a.keys.slice(-11) == "<character>" || a.keys.slice(-10) == "<register>") {
				var o = Ne(e);
				if (!o || o.length > 1) return { type: "clear" };
				n.selectedCharacter = o;
			}
			return {
				type: "full",
				command: a
			};
		},
		processCommand: function(e, t, n) {
			switch (t.inputState.repeatOverride = n.repeatOverride, n.type) {
				case "motion":
					this.processMotion(e, t, n);
					break;
				case "operator":
					this.processOperator(e, t, n);
					break;
				case "operatorMotion":
					this.processOperatorMotion(e, t, n);
					break;
				case "action":
					this.processAction(e, t, n);
					break;
				case "search":
					this.processSearch(e, t, n);
					break;
				case "ex":
				case "keyToEx":
					this.processEx(e, t, n);
					break;
			}
		},
		processMotion: function(e, t, n) {
			t.inputState.motion = n.motion, t.inputState.motionArgs = Ae(n.motionArgs), this.evalInput(e, t);
		},
		processOperator: function(e, t, n) {
			var r = t.inputState;
			if (r.operator) if (r.operator == n.operator) {
				r.motion = "expandToLine", r.motionArgs = {
					linewise: !0,
					repeat: 1
				}, this.evalInput(e, t);
				return;
			} else N(e);
			r.operator = n.operator, r.operatorArgs = Ae(n.operatorArgs), n.keys.length > 1 && (r.operatorShortcut = n.keys), n.exitVisualBlock && (t.visualBlock = !1, Ke(e)), t.visualMode && this.evalInput(e, t);
		},
		processOperatorMotion: function(e, t, n) {
			var r = t.visualMode, i = Ae(n.operatorMotionArgs);
			i && r && i.visualLine && (t.visualLine = !0), this.processOperator(e, t, n), r || this.processMotion(e, t, n);
		},
		processAction: function(e, t, n) {
			var r = t.inputState, i = r.getRepeat(), a = !!i, o = Ae(n.actionArgs) || { repeat: 1 };
			r.selectedCharacter && (o.selectedCharacter = r.selectedCharacter), n.operator && this.processOperator(e, t, n), n.motion && this.processMotion(e, t, n), (n.motion || n.operator) && this.evalInput(e, t), o.repeat = i || 1, o.repeatIsExplicit = a, o.registerName = r.registerName, N(e), t.lastMotion = null, n.isEdit && this.recordLastEdit(t, r, n), Oe[n.action](e, o, t);
		},
		processSearch: function(t, n, r) {
			if (!t.getSearchCursor) return;
			var i = r.searchArgs.forward, a = r.searchArgs.wholeWordOnly;
			vt(t).setReversed(!i);
			var o = i ? "/" : "?", s = vt(t).getQuery(), c = t.getScrollInfo(), l = "";
			function u(e, i, a) {
				k.searchHistoryController.pushInput(e), k.searchHistoryController.reset();
				try {
					Nt(t, e, i, a);
				} catch {
					U(t, "Invalid regex: " + e), N(t);
					return;
				}
				Ce.processMotion(t, n, {
					keys: "",
					type: "motion",
					motion: "findNext",
					motionArgs: {
						forward: !0,
						toJumplist: r.searchArgs.toJumplist
					}
				});
			}
			function d(e) {
				t.scrollTo(c.left, c.top), u(e, !0, !0);
				var n = k.macroModeState;
				n.isRecording && tn(n, e);
			}
			function f() {
				return O("pcre") ? "(JavaScript regexp: set pcre)" : "(Vim regexp: set nopcre)";
			}
			function p(e, t, n) {
				var r = he(e), i, a;
				r == "<Up>" || r == "<Down>" ? (i = r == "<Up>", a = e.target ? e.target.selectionEnd : 0, t = k.searchHistoryController.nextMatch(t, i) || "", n(t), a && e.target && (e.target.selectionEnd = e.target.selectionStart = Math.min(a, e.target.value.length))) : r && r != "<Left>" && r != "<Right>" && k.searchHistoryController.reset(), l = t, m();
			}
			function m() {
				var e;
				try {
					e = Nt(t, l, !0, !0);
				} catch {}
				e ? t.scrollIntoView(Lt(t, !i, e), 30) : (zt(t), t.scrollTo(c.left, c.top));
			}
			function h(n, r, i) {
				var a = he(n);
				a == "<Esc>" || a == "<C-c>" || a == "<C-[>" || a == "<BS>" && r == "" ? (k.searchHistoryController.pushInput(r), k.searchHistoryController.reset(), Nt(t, s?.source || ""), zt(t), t.scrollTo(c.left, c.top), e.e_stop(n), N(t), i(), t.focus()) : a == "<Up>" || a == "<Down>" ? e.e_stop(n) : a == "<C-u>" && (e.e_stop(n), i(""));
			}
			switch (r.searchArgs.querySrc) {
				case "prompt":
					var g = k.macroModeState;
					g.isPlaying ? u(g.replaySearchQueries.shift() || "", !0, !1) : jt(t, {
						onClose: d,
						prefix: o,
						desc: kt("span", {
							$cursor: "pointer",
							onmousedown: function(e) {
								e.preventDefault(), D("pcre", !O("pcre")), this.textContent = f(), m();
							}
						}, f()),
						onKeyUp: p,
						onKeyDown: h
					});
					break;
				case "wordUnderCursor":
					var _ = $e(t, { noSymbol: !0 }), v = !0;
					if (_ || (_ = $e(t, { noSymbol: !1 }), v = !1), !_) {
						U(t, "No word under cursor"), N(t);
						return;
					}
					let e = t.getLine(_.start.line).substring(_.start.ch, _.end.ch);
					e = v && a ? "\\b" + e + "\\b" : Re(e), k.jumpList.cachedCursor = t.getCursor(), t.setCursor(_.start), u(e, !0, !1);
					break;
			}
		},
		processEx: function(t, n, r) {
			function i(e) {
				k.exCommandHistoryController.pushInput(e), k.exCommandHistoryController.reset(), W.processCommand(t, e), t.state.vim && N(t), zt(t);
			}
			function a(n, r, i) {
				var a = he(n), o, s;
				(a == "<Esc>" || a == "<C-c>" || a == "<C-[>" || a == "<BS>" && r == "") && (k.exCommandHistoryController.pushInput(r), k.exCommandHistoryController.reset(), e.e_stop(n), N(t), zt(t), i(), t.focus()), a == "<Up>" || a == "<Down>" ? (e.e_stop(n), o = a == "<Up>", s = n.target ? n.target.selectionEnd : 0, r = k.exCommandHistoryController.nextMatch(r, o) || "", i(r), s && n.target && (n.target.selectionEnd = n.target.selectionStart = Math.min(s, n.target.value.length))) : a == "<C-u>" ? (e.e_stop(n), i("")) : a && a != "<Left>" && a != "<Right>" && k.exCommandHistoryController.reset();
			}
			function o(n, r) {
				var i = new e.StringStream(r), a = {};
				try {
					if (W.parseInput_(t, i, a), a.commandName != "s") {
						zt(t);
						return;
					}
					var o = W.matchCommand_(a.commandName);
					if (!o || (W.parseCommandArgs_(i, a, o), !a.argString)) return;
					var s = Ot(a.argString.slice(1), !0, !0);
					s && It(t, s);
				} catch {}
			}
			if (r.type == "keyToEx") W.processCommand(t, r.exArgs.input);
			else {
				var s = {
					onClose: i,
					onKeyDown: a,
					onKeyUp: o,
					prefix: ":"
				};
				n.visualMode && (s.value = "'<,'>", s.selectValueOnOpen = !1), jt(t, s);
			}
		},
		evalInput: function(e, r) {
			var i = r.inputState, a = i.motion, o = i.motionArgs || { repeat: 1 }, s = i.operator, c = i.operatorArgs || {}, l = i.registerName, u = r.sel, d = L(r.visualMode ? F(e, u.head) : e.getCursor("head")), f = L(r.visualMode ? F(e, u.anchor) : e.getCursor("anchor")), p = L(d), m = L(f), h, g, _;
			if (s && this.recordLastEdit(r, i), _ = i.repeatOverride === void 0 ? i.getRepeat() : i.repeatOverride, _ > 0 && o.explicitRepeat ? o.repeatIsExplicit = !0 : (o.noRepeat || !o.explicitRepeat && _ === 0) && (_ = 1, o.repeatIsExplicit = !1), i.selectedCharacter && (o.selectedCharacter = c.selectedCharacter = i.selectedCharacter), o.repeat = _, N(e), a) {
				var v = we[a](e, d, o, r, i);
				if (r.lastMotion = we[a], !v) return;
				if (o.toJumplist) {
					var y = k.jumpList, b = y.cachedCursor;
					b ? (tt(e, b, v), delete y.cachedCursor) : tt(e, d, v);
				}
				v instanceof Array ? (g = v[0], h = v[1]) : h = v, h ||= L(d), r.visualMode ? (r.visualBlock && h.ch === Infinity || (h = F(e, h, p)), g &&= F(e, g), g ||= m, u.anchor = g, u.head = h, Ke(e), H(e, r, "<", z(g, h) ? g : h), H(e, r, ">", z(g, h) ? h : g)) : s || (h = F(e, h, p), e.setCursor(h.line, h.ch));
			}
			if (s) {
				if (c.lastSel) {
					g = m;
					var x = c.lastSel, ee = Math.abs(x.head.line - x.anchor.line), S = Math.abs(x.head.ch - x.anchor.ch);
					h = x.visualLine ? new t(m.line + ee, m.ch) : x.visualBlock ? new t(m.line + ee, m.ch + S) : x.head.line == x.anchor.line ? new t(m.line, m.ch + S) : new t(m.line + ee, m.ch), r.visualMode = !0, r.visualLine = x.visualLine, r.visualBlock = x.visualBlock, u = r.sel = {
						anchor: g,
						head: h
					}, Ke(e);
				} else r.visualMode && (c.lastSel = {
					anchor: L(u.anchor),
					head: L(u.head),
					visualBlock: r.visualBlock,
					visualLine: r.visualLine
				});
				var C, w, T, E, D;
				if (r.visualMode) {
					C = B(u.head, u.anchor), w = Fe(u.head, u.anchor), T = r.visualLine || c.linewise, E = r.visualBlock ? "block" : T ? "line" : "char";
					var O = n(e, C, w);
					if (D = qe(e, {
						anchor: O.start,
						head: O.end
					}, E), T) {
						var te = D.ranges;
						if (E == "block") for (var ne = 0; ne < te.length; ne++) te[ne].head.ch = V(e, te[ne].head.line);
						else E == "line" && (te[0].head = new t(te[0].head.line + 1, 0));
					}
				} else {
					if (C = L(g || m), w = L(h || p), z(w, C)) {
						var re = C;
						C = w, w = re;
					}
					T = o.linewise || c.linewise, T ? Ze(e, C, w) : o.forward && Xe(e, C, w), E = "char";
					var ie = !o.inclusive || T, O = n(e, C, w);
					D = qe(e, {
						anchor: O.start,
						head: O.end
					}, E, ie);
				}
				e.setSelections(D.ranges, D.primary), r.lastMotion = null, c.repeat = _, c.registerName = l, c.linewise = T;
				var ae = De[s](e, c, D.ranges, m, h);
				r.visualMode && Ye(e, ae != null), ae && e.setCursor(ae);
			}
		},
		recordLastEdit: function(e, t, n) {
			var r = k.macroModeState;
			r.isPlaying || (e.lastEditInputState = t, e.lastEditActionCommand = n, r.lastInsertModeChanges.changes = [], r.lastInsertModeChanges.expectCursorActivityForChange = !1, r.lastInsertModeChanges.visualBlock = e.visualBlock ? e.sel.head.line - e.sel.anchor.line : 0);
		}
	}, we = {
		moveToTopLine: function(e, n, r) {
			var i = Vt(e).top + r.repeat - 1;
			return new t(i, Qe(e.getLine(i)));
		},
		moveToMiddleLine: function(e) {
			var n = Vt(e), r = Math.floor((n.top + n.bottom) * .5);
			return new t(r, Qe(e.getLine(r)));
		},
		moveToBottomLine: function(e, n, r) {
			var i = Vt(e).bottom - r.repeat + 1;
			return new t(i, Qe(e.getLine(i)));
		},
		expandToLine: function(e, n, r) {
			return new t(n.line + r.repeat - 1, Infinity);
		},
		findNext: function(e, t, n) {
			var r = vt(e), i = r.getQuery();
			if (i) {
				var a = !n.forward;
				a = r.isReversed() ? !a : a, It(e, i);
				var o = Lt(e, a, i, n.repeat);
				return o || U(e, "No match found " + i + (O("pcre") ? " (set nopcre to use Vim regexps)" : "")), o;
			}
		},
		findAndSelectNextInclusive: function(n, r, i, a, o) {
			var s = vt(n), c = s.getQuery();
			if (c) {
				var l = !i.forward;
				l = s.isReversed() ? !l : l;
				var u = Rt(n, l, c, i.repeat, a);
				if (u) {
					if (o.operator) return u;
					var d = u[0], f = new t(u[1].line, u[1].ch - 1);
					if (a.visualMode) {
						(a.visualLine || a.visualBlock) && (a.visualLine = !1, a.visualBlock = !1, e.signal(n, "vim-mode-change", {
							mode: "visual",
							subMode: ""
						}));
						var p = a.sel.anchor;
						if (p) return s.isReversed() ? i.forward ? [p, d] : [p, f] : i.forward ? [p, f] : [p, d];
					} else a.visualMode = !0, a.visualLine = !1, a.visualBlock = !1, e.signal(n, "vim-mode-change", {
						mode: "visual",
						subMode: ""
					});
					return l ? [f, d] : [d, f];
				}
			}
		},
		goToMark: function(e, t, n, r) {
			var i = Ht(e, r, n.selectedCharacter || "");
			return i ? n.linewise ? {
				line: i.line,
				ch: Qe(e.getLine(i.line))
			} : i : null;
		},
		moveToOtherHighlightedEnd: function(e, n, r, i) {
			var a = i.sel;
			return i.visualBlock && r.sameLine ? [F(e, new t(a.anchor.line, a.head.ch)), F(e, new t(a.head.line, a.anchor.ch))] : [a.head, a.anchor];
		},
		jumpToMark: function(e, n, r, i) {
			for (var a = n, o = 0; o < r.repeat; o++) {
				var s = a;
				for (var c in i.marks) if (y(c)) {
					var l = i.marks[c].find();
					if (!(r.forward ? z(l, s) : z(s, l)) && !(r.linewise && l.line == s.line)) {
						var u = R(s, a), d = r.forward ? Ie(s, l, a) : Ie(a, l, s);
						(u || d) && (a = l);
					}
				}
			}
			return r.linewise && (a = new t(a.line, Qe(e.getLine(a.line)))), a;
		},
		moveByCharacters: function(e, n, r) {
			var i = n, a = r.repeat, o = r.forward ? i.ch + a : i.ch - a;
			return new t(i.line, o);
		},
		moveByLines: function(e, n, r, i) {
			var a = n, o = a.ch;
			switch (i.lastMotion) {
				case this.moveByLines:
				case this.moveByDisplayLines:
				case this.moveByScroll:
				case this.moveToColumn:
				case this.moveToEol:
					o = i.lastHPos;
					break;
				default: i.lastHPos = o;
			}
			var s = r.repeat + (r.repeatOffset || 0), c = r.forward ? a.line + s : a.line - s, l = e.firstLine(), u = e.lastLine(), d = e.findPosV(a, r.forward ? s : -s, "line", i.lastHSPos);
			return (r.forward ? d.line > c : d.line < c) && (c = d.line, o = d.ch), c < l && a.line == l ? this.moveToStartOfLine(e, n, r, i) : c > u && a.line == u ? ct(e, n, r, i, !0) : (r.toFirstChar && (o = Qe(e.getLine(c)), i.lastHPos = o), i.lastHSPos = e.charCoords(new t(c, o), "div").left, new t(c, o));
		},
		moveByDisplayLines: function(e, n, r, i) {
			var a = n;
			switch (i.lastMotion) {
				case this.moveByDisplayLines:
				case this.moveByScroll:
				case this.moveByLines:
				case this.moveToColumn:
				case this.moveToEol: break;
				default: i.lastHSPos = e.charCoords(a, "div").left;
			}
			var o = r.repeat, s = e.findPosV(a, r.forward ? o : -o, "line", i.lastHSPos);
			if (s.hitSide) if (r.forward) {
				var c = {
					top: e.charCoords(s, "div").top + 8,
					left: i.lastHSPos
				};
				s = e.coordsChar(c, "div");
			} else {
				var l = e.charCoords(new t(e.firstLine(), 0), "div");
				l.left = i.lastHSPos, s = e.coordsChar(l, "div");
			}
			return i.lastHPos = s.ch, s;
		},
		moveByPage: function(e, t, n) {
			var r = t, i = n.repeat;
			return e.findPosV(r, n.forward ? i : -i, "page");
		},
		moveByParagraph: function(e, t, n) {
			var r = n.forward ? 1 : -1;
			return ft(e, t, n.repeat, r).start;
		},
		moveBySentence: function(e, t, n) {
			var r = n.forward ? 1 : -1;
			return mt(e, t, n.repeat, r);
		},
		moveByScroll: function(e, t, n, r) {
			var i = e.getScrollInfo(), a = null, o = n.repeat;
			o ||= i.clientHeight / (2 * e.defaultTextHeight());
			var s = e.charCoords(t, "local");
			if (n.repeat = o, a = we.moveByDisplayLines(e, t, n, r), !a) return null;
			var c = e.charCoords(a, "local");
			return e.scrollTo(null, i.top + c.top - s.top), a;
		},
		moveByWords: function(e, t, n) {
			return st(e, t, n.repeat, !!n.forward, !!n.wordEnd, !!n.bigWord);
		},
		moveTillCharacter: function(e, t, n) {
			var r = n.repeat, i = lt(e, r, n.forward, n.selectedCharacter, t), a = n.forward ? -1 : 1;
			return nt(a, n), i ? (i.ch += a, i) : null;
		},
		moveToCharacter: function(e, t, n) {
			var r = n.repeat;
			return nt(0, n), lt(e, r, n.forward, n.selectedCharacter, t) || t;
		},
		moveToSymbol: function(e, t, n) {
			var r = n.repeat;
			return n.selectedCharacter && at(e, r, n.forward, n.selectedCharacter) || t;
		},
		moveToColumn: function(e, t, n, r) {
			var i = n.repeat;
			return r.lastHPos = i - 1, r.lastHSPos = e.charCoords(t, "div").left, ut(e, i);
		},
		moveToEol: function(e, t, n, r) {
			return ct(e, t, n, r, !1);
		},
		moveToFirstNonWhiteSpaceCharacter: function(e, n) {
			var r = n;
			return new t(r.line, Qe(e.getLine(r.line)));
		},
		moveToMatchedSymbol: function(e, n) {
			for (var r = n, i = r.line, a = r.ch, o = e.getLine(i), s; a < o.length; a++) if (s = o.charAt(a), s && b(s)) {
				var c = e.getTokenTypeAt(new t(i, a + 1));
				if (c !== "string" && c !== "comment") break;
			}
			if (a < o.length) {
				var l = s === "<" || s === ">" ? /[(){}[\]<>]/ : /[(){}[\]]/;
				return e.findMatchingBracket(new t(i, a), { bracketRegex: l }).to;
			} else return r;
		},
		moveToStartOfLine: function(e, n) {
			return new t(n.line, 0);
		},
		moveToLineOrEdgeOfDocument: function(e, n, r) {
			var i = r.forward ? e.lastLine() : e.firstLine();
			return r.repeatIsExplicit && (i = r.repeat - e.getOption("firstLineNumber")), new t(i, Qe(e.getLine(i)));
		},
		moveToStartOfDisplayLine: function(e) {
			return e.execCommand("goLineLeft"), e.getCursor();
		},
		moveToEndOfDisplayLine: function(e) {
			e.execCommand("goLineRight");
			var t = e.getCursor();
			return t.sticky == "before" && t.ch--, t;
		},
		textObjectManipulation: function(e, t, n, r) {
			var i = {
				"(": ")",
				")": "(",
				"{": "}",
				"}": "{",
				"[": "]",
				"]": "[",
				"<": ">",
				">": "<"
			}, a = {
				"'": !0,
				"\"": !0,
				"`": !0
			}, o = n.selectedCharacter || "";
			o == "b" ? o = "(" : o == "B" && (o = "{");
			var s = !n.textObjectInner, c, l;
			if (i[o]) {
				if (l = !0, c = ht(e, t, o, s), !c) {
					var u = e.getSearchCursor(RegExp("\\" + o, "g"), t);
					u.find() && (c = ht(e, u.from(), o, s));
				}
			} else if (a[o]) l = !0, c = gt(e, t, o, s);
			else if (o === "W" || o === "w") for (var d = n.repeat || 1; d-- > 0;) {
				var f = $e(e, {
					inclusive: s,
					innerWord: !s,
					bigWord: o === "W",
					noSymbol: o === "W",
					multiline: !0
				}, c && c.end);
				f && (c ||= f, c.end = f.end);
			}
			else if (o === "p") if (c = ft(e, t, n.repeat, 0, s), n.linewise = !0, r.visualMode) r.visualLine ||= !0;
			else {
				var p = r.inputState.operatorArgs;
				p && (p.linewise = !0), c.end.line--;
			}
			else if (o === "t") c = et(e, t, s);
			else if (o === "s") {
				var m = e.getLine(t.line);
				t.ch > 0 && C(m[t.ch]) && --t.ch;
				var h = pt(e, t, n.repeat, 1, s), g = pt(e, t, n.repeat, -1, s);
				S(e.getLine(g.line)[g.ch]) && S(e.getLine(h.line)[h.ch - 1]) && (g = {
					line: g.line,
					ch: g.ch + 1
				}), c = {
					start: g,
					end: h
				};
			}
			return c ? e.state.vim.visualMode ? Ge(e, c.start, c.end, l) : [c.start, c.end] : null;
		},
		repeatLastCharacterSearch: function(e, t, n) {
			var r = k.lastCharacterSearch, i = n.repeat, a = n.forward === r.forward, o = !!r.increment * (a ? -1 : 1);
			e.moveH(-o, "char"), n.inclusive = !!a;
			var s = lt(e, i, a, r.selectedCharacter);
			return s ? (s.ch += o, s) : (e.moveH(o, "char"), t);
		}
	};
	function Te(e, t) {
		we[e] = t;
	}
	function Ee(e, t) {
		for (var n = [], r = 0; r < t; r++) n.push(e);
		return n;
	}
	var De = {
		change: function(e, n, r) {
			var i, a, o = e.state.vim, s = r[0].anchor, c = r[0].head;
			if (!o.visualMode) {
				a = e.getRange(s, c);
				var l = o.lastEditInputState;
				if (l?.motion == "moveByWords" && !S(a)) {
					var u = /\s+$/.exec(a);
					u && l.motionArgs && l.motionArgs.forward && (c = I(c, 0, -u[0].length), a = a.slice(0, -u[0].length));
				}
				n.linewise && (s = new t(s.line, Qe(e.getLine(s.line))), c.line > s.line && (c = new t(c.line - 1, Number.MAX_VALUE))), e.replaceRange("", s, c), i = s;
			} else if (n.fullLine) c.ch = Number.MAX_VALUE, c.line--, e.setSelection(s, c), a = e.getSelection(), e.replaceSelection(""), i = s;
			else {
				a = e.getSelection();
				var d = Ee("", r.length);
				e.replaceSelections(d), i = B(r[0].head, r[0].anchor);
			}
			k.registerController.pushText(n.registerName, "change", a, n.linewise, r.length > 1), Oe.enterInsertMode(e, { head: i }, e.state.vim);
		},
		delete: function(e, n, r) {
			var i, a, o = e.state.vim;
			if (o.visualBlock) {
				a = e.getSelection();
				var s = Ee("", r.length);
				e.replaceSelections(s), i = B(r[0].head, r[0].anchor);
			} else {
				var c = r[0].anchor, l = r[0].head;
				n.linewise && l.line != e.firstLine() && c.line == e.lastLine() && c.line == l.line - 1 && (c.line == e.firstLine() ? c.ch = 0 : c = new t(c.line - 1, V(e, c.line - 1))), a = e.getRange(c, l), e.replaceRange("", c, l), i = c, n.linewise && (i = we.moveToFirstNonWhiteSpaceCharacter(e, c));
			}
			return k.registerController.pushText(n.registerName, "delete", a, n.linewise, o.visualBlock), F(e, i);
		},
		indent: function(e, t, n) {
			var r = e.state.vim, i = r.visualMode && t.repeat || 1;
			if (r.visualBlock) {
				for (var a = e.getOption("tabSize"), o = e.getOption("indentWithTabs") ? "	" : " ".repeat(a), s, c = n.length - 1; c >= 0; c--) if (s = B(n[c].anchor, n[c].head), t.indentRight) e.replaceRange(o.repeat(i), s, s);
				else {
					for (var l = e.getLine(s.line), u = 0, d = 0; d < i; d++) {
						var f = l[s.ch + u];
						if (f == "	") u++;
						else if (f == " ") {
							u++;
							for (var p = 1; p < o.length && (f = l[s.ch + u], f === " "); p++) u++;
						} else break;
					}
					e.replaceRange("", s, I(s, 0, u));
				}
				return s;
			} else if (e.indentMore) for (var d = 0; d < i; d++) t.indentRight ? e.indentMore() : e.indentLess();
			else {
				var m = n[0].anchor.line, h = r.visualBlock ? n[n.length - 1].anchor.line : n[0].head.line;
				t.linewise && h--;
				for (var c = m; c <= h; c++) for (var d = 0; d < i; d++) e.indentLine(c, t.indentRight);
			}
			return we.moveToFirstNonWhiteSpaceCharacter(e, n[0].anchor);
		},
		indentAuto: function(e, t, n) {
			return e.execCommand("indentAuto"), we.moveToFirstNonWhiteSpaceCharacter(e, n[0].anchor);
		},
		hardWrap: function(e, n, r, i) {
			if (e.hardWrap) {
				var a = r[0].anchor.line, o = r[0].head.line;
				n.linewise && o--;
				var s = e.hardWrap({
					from: a,
					to: o
				});
				return s > a && n.linewise && s--, n.keepCursor ? i : new t(s, 0);
			}
		},
		changeCase: function(e, t, n, r, i) {
			for (var a = e.getSelections(), o = [], s = t.toLower, c = 0; c < a.length; c++) {
				var l = a[c], u = "";
				if (s === !0) u = l.toLowerCase();
				else if (s === !1) u = l.toUpperCase();
				else for (var d = 0; d < l.length; d++) {
					var f = l.charAt(d);
					u += ee(f) ? f.toLowerCase() : f.toUpperCase();
				}
				o.push(u);
			}
			return e.replaceSelections(o), t.shouldMoveCursor ? i : !e.state.vim.visualMode && t.linewise && n[0].anchor.line + 1 == n[0].head.line ? we.moveToFirstNonWhiteSpaceCharacter(e, r) : t.linewise ? r : B(n[0].anchor, n[0].head);
		},
		yank: function(e, t, n, r) {
			var i = e.state.vim, a = e.getSelection(), o = i.visualMode ? B(i.sel.anchor, i.sel.head, n[0].head, n[0].anchor) : r;
			return k.registerController.pushText(t.registerName, "yank", a, t.linewise, i.visualBlock), o;
		},
		rot13: function(e, t, n, r, i) {
			for (var a = e.getSelections(), o = [], s = 0; s < a.length; s++) {
				let e = a[s].split("").map((e) => {
					let t = e.charCodeAt(0);
					return t >= 65 && t <= 90 ? String.fromCharCode(65 + (t - 65 + 13) % 26) : t >= 97 && t <= 122 ? String.fromCharCode(97 + (t - 97 + 13) % 26) : e;
				}).join("");
				o.push(e);
			}
			return e.replaceSelections(o), t.shouldMoveCursor ? i : !e.state.vim.visualMode && t.linewise && n[0].anchor.line + 1 == n[0].head.line ? we.moveToFirstNonWhiteSpaceCharacter(e, r) : t.linewise ? r : B(n[0].anchor, n[0].head);
		}
	};
	function P(e, t) {
		De[e] = t;
	}
	var Oe = {
		jumpListWalk: function(e, t, n) {
			if (!n.visualMode) {
				var r = t.repeat || 1, i = t.forward, a = k.jumpList.move(e, i ? r : -r), o = a ? a.find() : void 0;
				o ||= e.getCursor(), e.setCursor(o);
			}
		},
		scroll: function(e, t, n) {
			if (!n.visualMode) {
				var r = t.repeat || 1, i = e.defaultTextHeight(), a = e.getScrollInfo().top, o = i * r, s = t.forward ? a + o : a - o, c = L(e.getCursor()), l = e.charCoords(c, "local");
				if (t.forward) s > l.top ? (c.line += (s - l.top) / i, c.line = Math.ceil(c.line), e.setCursor(c), l = e.charCoords(c, "local"), e.scrollTo(null, l.top)) : e.scrollTo(null, s);
				else {
					var u = s + e.getScrollInfo().clientHeight;
					u < l.bottom ? (c.line -= (l.bottom - u) / i, c.line = Math.floor(c.line), e.setCursor(c), l = e.charCoords(c, "local"), e.scrollTo(null, l.bottom - e.getScrollInfo().clientHeight)) : e.scrollTo(null, s);
				}
			}
		},
		scrollToCursor: function(e, n) {
			var r = e.getCursor().line, i = e.charCoords(new t(r, 0), "local"), a = e.getScrollInfo().clientHeight, o = i.top;
			switch (n.position) {
				case "center":
					o = i.bottom - a / 2;
					break;
				case "bottom":
					var s = new t(r, e.getLine(r).length - 1), c = e.charCoords(s, "local").bottom - o;
					o = o - a + c;
					break;
			}
			e.scrollTo(null, o);
		},
		replayMacro: function(e, t, n) {
			var r = t.selectedCharacter || "", i = t.repeat || 1, a = k.macroModeState;
			for (r == "@" ? r = a.latestRegister || "" : a.latestRegister = r; i--;) Qt(e, n, a, r);
		},
		enterMacroRecordMode: function(e, t) {
			var n = k.macroModeState, r = t.selectedCharacter;
			k.registerController.isValidRegister(r) && n.enterMacroRecordMode(e, r);
		},
		toggleOverwrite: function(t) {
			t.state.overwrite ? (t.toggleOverwrite(!1), t.setOption("keyMap", "vim-insert"), e.signal(t, "vim-mode-change", { mode: "insert" })) : (t.toggleOverwrite(!0), t.setOption("keyMap", "vim-replace"), e.signal(t, "vim-mode-change", { mode: "replace" }));
		},
		enterInsertMode: function(r, i, a) {
			if (!r.getOption("readOnly")) {
				a.insertMode = !0, a.insertModeRepeat = i && i.repeat || 1;
				var o = i ? i.insertAt : null, s = a.sel, c = i.head || r.getCursor("head"), l = r.listSelections().length;
				if (o == "eol") c = new t(c.line, V(r, c.line));
				else if (o == "bol") c = new t(c.line, 0);
				else if (o == "charAfter") {
					var u = n(r, c, I(c, 0, 1));
					c = u.end;
				} else if (o == "firstNonBlank") {
					var u = n(r, c, we.moveToFirstNonWhiteSpaceCharacter(r, c));
					c = u.end;
				} else if (o == "startOfSelectedArea") {
					if (!a.visualMode) return;
					a.visualBlock ? (c = new t(Math.min(s.head.line, s.anchor.line), Math.min(s.head.ch, s.anchor.ch)), l = Math.abs(s.head.line - s.anchor.line) + 1) : c = s.head.line < s.anchor.line ? s.head : new t(s.anchor.line, 0);
				} else if (o == "endOfSelectedArea") {
					if (!a.visualMode) return;
					a.visualBlock ? (c = new t(Math.min(s.head.line, s.anchor.line), Math.max(s.head.ch, s.anchor.ch) + 1), l = Math.abs(s.head.line - s.anchor.line) + 1) : c = s.head.line >= s.anchor.line ? I(s.head, 0, 1) : new t(s.anchor.line, 0);
				} else if (o == "inplace") {
					if (a.visualMode) return;
				} else o == "lastEdit" && (c = Ut(r) || c);
				r.setOption("disableInput", !1), i && i.replace ? (r.toggleOverwrite(!0), r.setOption("keyMap", "vim-replace"), e.signal(r, "vim-mode-change", { mode: "replace" })) : (r.toggleOverwrite(!1), r.setOption("keyMap", "vim-insert"), e.signal(r, "vim-mode-change", { mode: "insert" })), k.macroModeState.isPlaying || (r.on("change", nn), a.insertEnd && a.insertEnd.clear(), a.insertEnd = r.setBookmark(c, { insertLeft: !0 }), e.on(r.getInputField(), "keydown", on)), a.visualMode && Ye(r), Ve(r, c, l);
			}
		},
		toggleVisualMode: function(r, i, a) {
			var o = i.repeat, s = r.getCursor(), c;
			if (a.visualMode) a.visualLine != !!i.linewise || a.visualBlock != !!i.blockwise ? (a.visualLine = !!i.linewise, a.visualBlock = !!i.blockwise, e.signal(r, "vim-mode-change", {
				mode: "visual",
				subMode: a.visualLine ? "linewise" : a.visualBlock ? "blockwise" : ""
			}), Ke(r)) : Ye(r);
			else {
				a.visualMode = !0, a.visualLine = !!i.linewise, a.visualBlock = !!i.blockwise, c = F(r, new t(s.line, s.ch + o - 1));
				var l = n(r, s, c);
				a.sel = {
					anchor: l.start,
					head: l.end
				}, e.signal(r, "vim-mode-change", {
					mode: "visual",
					subMode: a.visualLine ? "linewise" : a.visualBlock ? "blockwise" : ""
				}), Ke(r), H(r, a, "<", B(s, c)), H(r, a, ">", Fe(s, c));
			}
		},
		reselectLastSelection: function(t, n, r) {
			var i = r.lastSelection;
			if (r.visualMode && We(t, r), i) {
				var a = i.anchorMark.find(), o = i.headMark.find();
				if (!a || !o) return;
				r.sel = {
					anchor: a,
					head: o
				}, r.visualMode = !0, r.visualLine = i.visualLine, r.visualBlock = i.visualBlock, Ke(t), H(t, r, "<", B(a, o)), H(t, r, ">", Fe(a, o)), e.signal(t, "vim-mode-change", {
					mode: "visual",
					subMode: r.visualLine ? "linewise" : r.visualBlock ? "blockwise" : ""
				});
			}
		},
		joinLines: function(e, n, r) {
			var i, a;
			if (r.visualMode) {
				if (i = e.getCursor("anchor"), a = e.getCursor("head"), z(a, i)) {
					var o = a;
					a = i, i = o;
				}
				a.ch = V(e, a.line) - 1;
			} else {
				var s = Math.max(n.repeat, 2);
				i = e.getCursor(), a = F(e, new t(i.line + s - 1, Infinity));
			}
			for (var c = 0, l = i.line; l < a.line; l++) {
				c = V(e, i.line);
				var u = "", d = 0;
				if (!n.keepSpaces) {
					var f = e.getLine(i.line + 1);
					d = f.search(/\S/), d == -1 ? d = f.length : u = " ";
				}
				e.replaceRange(u, new t(i.line, c), new t(i.line + 1, d));
			}
			var p = F(e, new t(i.line, c));
			r.visualMode && Ye(e, !1), e.setCursor(p);
		},
		newLineAndEnterInsertMode: function(n, r, i) {
			i.insertMode = !0;
			var a = L(n.getCursor());
			a.line === n.firstLine() && !r.after ? (n.replaceRange("\n", new t(n.firstLine(), 0)), n.setCursor(n.firstLine(), 0)) : (a.line = r.after ? a.line : a.line - 1, a.ch = V(n, a.line), n.setCursor(a), (e.commands.newlineAndIndentContinueComment || e.commands.newlineAndIndent)(n)), this.enterInsertMode(n, { repeat: r.repeat }, i);
		},
		paste: function(e, t, n) {
			var r = k.registerController.getRegister(t.registerName);
			if (t.registerName === "+") navigator.clipboard.readText().then((i) => {
				this.continuePaste(e, t, n, i, r);
			});
			else {
				var i = r.toString();
				this.continuePaste(e, t, n, i, r);
			}
		},
		continuePaste: function(e, n, r, i, a) {
			var o = L(e.getCursor());
			if (i) {
				if (n.matchIndent) {
					var s = e.getOption("tabSize"), c = function(e) {
						var t = e.split("	").length - 1, n = e.split(" ").length - 1;
						return t * s + n * 1;
					}, l = c(e.getLine(e.getCursor().line).match(/^\s*/)[0]), u = i.replace(/\n$/, ""), d = i !== u, f = c(i.match(/^\s*/)[0]), i = u.replace(/^\s*/gm, function(t) {
						var n = l + (c(t) - f);
						if (n < 0) return "";
						if (e.getOption("indentWithTabs")) {
							var r = Math.floor(n / s);
							return Array(r + 1).join("	");
						} else return Array(n + 1).join(" ");
					});
					i += d ? "\n" : "";
				}
				n.repeat > 1 && (i = Array(n.repeat + 1).join(i));
				var p = a.linewise, m = a.blockwise, h = m ? i.split("\n") : void 0;
				if (h) {
					p && h.pop();
					for (var g = 0; g < h.length; g++) h[g] = h[g] == "" ? " " : h[g];
					o.ch += +!!n.after, o.ch = Math.min(V(e, o.line), o.ch);
				} else p ? r.visualMode ? i = r.visualLine ? i.slice(0, -1) : "\n" + i.slice(0, i.length - 1) + "\n" : n.after ? (i = "\n" + i.slice(0, i.length - 1), o.ch = V(e, o.line)) : o.ch = 0 : o.ch += +!!n.after;
				var _;
				if (r.visualMode) {
					r.lastPastedText = i;
					var v, y = Ue(e), b = y[0], x = y[1], ee = e.getSelection(), S = e.listSelections(), C = Array(S.length).join("1").split("1");
					r.lastSelection && (v = r.lastSelection.headMark.find()), k.registerController.unnamedRegister.setText(ee), m ? (e.replaceSelections(C), x = new t(b.line + i.length - 1, b.ch), e.setCursor(b), Be(e, x), e.replaceSelections(i), _ = b) : r.visualBlock ? (e.replaceSelections(C), e.setCursor(b), e.replaceRange(i, b, b), _ = b) : (e.replaceRange(i, b, x), _ = e.posFromIndex(e.indexFromPos(b) + i.length - 1)), v && (r.lastSelection.headMark = e.setBookmark(v)), p && (_.ch = 0);
				} else if (m && h) {
					e.setCursor(o);
					for (var g = 0; g < h.length; g++) {
						var w = o.line + g;
						w > e.lastLine() && e.replaceRange("\n", new t(w, 0)), V(e, w) < o.ch && ze(e, w, o.ch);
					}
					e.setCursor(o), Be(e, new t(o.line + h.length - 1, o.ch)), e.replaceSelections(h), _ = o;
				} else if (e.replaceRange(i, o), p) {
					var w = n.after ? o.line + 1 : o.line;
					_ = new t(w, Qe(e.getLine(w)));
				} else _ = L(o), /\n/.test(i) || (_.ch += i.length - +!!n.after);
				r.visualMode && Ye(e, !1), e.setCursor(_);
			}
		},
		undo: function(t, n) {
			t.operation(function() {
				Pe(t, e.commands.undo, n.repeat)(), t.setCursor(F(t, t.getCursor("start")));
			});
		},
		redo: function(t, n) {
			Pe(t, e.commands.redo, n.repeat)();
		},
		setRegister: function(e, t, n) {
			n.inputState.registerName = t.selectedCharacter;
		},
		insertRegister: function(e, t, n) {
			var r = t.selectedCharacter, i = k.registerController.getRegister(r), a = i && i.toString();
			a && e.replaceSelection(a);
		},
		oneNormalCommand: function(t, n, r) {
			qt(t, !0), r.insertModeReturn = !0, e.on(t, "vim-command-done", function n() {
				r.visualMode || (r.insertModeReturn && (r.insertModeReturn = !1, r.insertMode || Oe.enterInsertMode(t, {}, r)), e.off(t, "vim-command-done", n));
			});
		},
		setMark: function(e, t, n) {
			var r = t.selectedCharacter;
			r && H(e, n, r, e.getCursor());
		},
		replace: function(r, i, a) {
			var o = i.selectedCharacter || "", s = r.getCursor(), c, l, u = r.listSelections();
			if (a.visualMode) s = r.getCursor("start"), l = r.getCursor("end");
			else {
				var d = r.getLine(s.line);
				c = s.ch + i.repeat, c > d.length && (c = d.length), l = new t(s.line, c);
			}
			var f = n(r, s, l);
			if (s = f.start, l = f.end, o == "\n") a.visualMode || r.replaceRange("", s, l), (e.commands.newlineAndIndentContinueComment || e.commands.newlineAndIndent)(r);
			else {
				var p = r.getRange(s, l);
				if (p = p.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, o), p = p.replace(/[^\n]/g, o), a.visualBlock) {
					var m = Array(r.getOption("tabSize") + 1).join(" ");
					p = r.getSelection(), p = p.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, o);
					var h = p.replace(/\t/g, m).replace(/[^\n]/g, o).split("\n");
					r.replaceSelections(h);
				} else r.replaceRange(p, s, l);
				a.visualMode ? (s = z(u[0].anchor, u[0].head) ? u[0].anchor : u[0].head, r.setCursor(s), Ye(r, !1)) : r.setCursor(I(l, 0, -1));
			}
		},
		incrementNumberToken: function(e, n) {
			for (var r = e.getCursor(), i = e.getLine(r.line), a = /(-?)(?:(0x)([\da-f]+)|(0b|0|)(\d+))/gi, o, s, c, l; (o = a.exec(i)) !== null && (s = o.index, c = s + o[0].length, !(r.ch < c)););
			if (!(!n.backtrack && c <= r.ch)) {
				if (o) {
					var u = o[2] || o[4], d = o[3] || o[5], f = n.increase ? 1 : -1, p = {
						"0b": 2,
						0: 8,
						"": 10,
						"0x": 16
					}[u.toLowerCase()];
					l = (parseInt(o[1] + d, p) + f * n.repeat).toString(p);
					var m = u ? Array(d.length - l.length + 1 + o[1].length).join("0") : "";
					l = l.charAt(0) === "-" ? "-" + u + m + l.substr(1) : u + m + l;
					var h = new t(r.line, s), g = new t(r.line, c);
					e.replaceRange(l, h, g);
				} else return;
				e.setCursor(new t(r.line, s + l.length - 1));
			}
		},
		repeatLastEdit: function(e, t, n) {
			var r = n.lastEditInputState;
			if (r) {
				var i = t.repeat;
				i && t.repeatIsExplicit ? r.repeatOverride = i : i = r.repeatOverride || i, sn(e, n, i, !1);
			}
		},
		indent: function(e, t) {
			e.indentLine(e.getCursor().line, t.indentRight);
		},
		exitInsertMode: function(e, t) {
			qt(e);
		}
	};
	function ke(e, t) {
		Oe[e] = t;
	}
	function F(e, n, r) {
		var i = e.state.vim, a = i.insertMode || i.visualMode, o = Math.min(Math.max(e.firstLine(), n.line), e.lastLine()), s = e.getLine(o), c = s.length - 1 + Number(!!a), l = Math.min(Math.max(0, n.ch), c), u = s.charCodeAt(l);
		if (56320 <= u && u <= 57343) {
			var d = 1;
			r && r.line == o && r.ch > l && (d = -1), l += d, l > c && (l -= 2);
		}
		return new t(o, l);
	}
	function Ae(e) {
		var t = {};
		for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
		return t;
	}
	function I(e, n, r) {
		return typeof n == "object" && (r = n.ch, n = n.line), new t(e.line + n, e.ch + r);
	}
	function je(e, t, n, r) {
		r.operator && (n = "operatorPending");
		for (var i, o = [], s = [], c = le ? t.length - a : 0; c < t.length; c++) {
			var l = t[c];
			n == "insert" && l.context != "insert" || l.context && l.context != n || r.operator && l.type == "action" || !(i = Me(e, l.keys)) || (i == "partial" && o.push(l), i == "full" && s.push(l));
		}
		return {
			partial: o,
			full: s
		};
	}
	function Me(e, t) {
		let n = t.slice(-11) == "<character>", r = t.slice(-10) == "<register>";
		if (n || r) {
			var i = t.length - (n ? 11 : 10), a = e.slice(0, i), o = t.slice(0, i);
			return a == o && e.length > i ? "full" : o.indexOf(a) == 0 ? "partial" : !1;
		} else return e == t ? "full" : t.indexOf(e) == 0 ? "partial" : !1;
	}
	function Ne(e) {
		var t = /^.*(<[^>]+>)$/.exec(e), n = t ? t[1] : e.slice(-1);
		if (n.length > 1) switch (n) {
			case "<CR>":
			case "<S-CR>":
				n = "\n";
				break;
			case "<Space>":
			case "<S-Space>":
				n = " ";
				break;
			default:
				n = "";
				break;
		}
		return n;
	}
	function Pe(e, t, n) {
		return function() {
			for (var r = 0; r < n; r++) t(e);
		};
	}
	function L(e) {
		return new t(e.line, e.ch);
	}
	function R(e, t) {
		return e.ch == t.ch && e.line == t.line;
	}
	function z(e, t) {
		return e.line < t.line || e.line == t.line && e.ch < t.ch;
	}
	function B(e, t) {
		return arguments.length > 2 && (t = B.apply(void 0, Array.prototype.slice.call(arguments, 1))), z(e, t) ? e : t;
	}
	function Fe(e, t) {
		return arguments.length > 2 && (t = Fe.apply(void 0, Array.prototype.slice.call(arguments, 1))), z(e, t) ? t : e;
	}
	function Ie(e, t, n) {
		var r = z(e, t), i = z(t, n);
		return r && i;
	}
	function V(e, t) {
		return e.getLine(t).length;
	}
	function Le(e) {
		return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
	}
	function Re(e) {
		return e.replace(/([.?*+$\[\]\/\\(){}|\-])/g, "\\$1");
	}
	function ze(e, n, r) {
		var i = V(e, n), a = Array(r - i + 1).join(" ");
		e.setCursor(new t(n, i)), e.replaceRange(a, e.getCursor());
	}
	function Be(e, n) {
		var r = [], i = e.listSelections(), a = L(e.clipPos(n)), o = !R(n, a), s = He(i, e.getCursor("head")), c = R(i[s].head, i[s].anchor), l = i.length - 1, u = l - s > s ? l : 0, d = i[u].anchor, f = Math.min(d.line, a.line), p = Math.max(d.line, a.line), m = d.ch, h = a.ch, g = i[u].head.ch - m, _ = h - m;
		g > 0 && _ <= 0 ? (m++, o || h--) : g < 0 && _ >= 0 ? (m--, c || h++) : g < 0 && _ == -1 && (m--, h++);
		for (var v = f; v <= p; v++) {
			var y = {
				anchor: new t(v, m),
				head: new t(v, h)
			};
			r.push(y);
		}
		return e.setSelections(r), n.ch = h, d.ch = m, d;
	}
	function Ve(e, t, n) {
		for (var r = [], i = 0; i < n; i++) {
			var a = I(t, i, 0);
			r.push({
				anchor: a,
				head: a
			});
		}
		e.setSelections(r, 0);
	}
	function He(e, t, n) {
		for (var r = 0; r < e.length; r++) {
			var i = R(e[r].anchor, t), a = R(e[r].head, t);
			if (i || a) return r;
		}
		return -1;
	}
	function Ue(e, t) {
		var n = e.listSelections(), r = n[0], i = n[n.length - 1];
		return [z(r.anchor, r.head) ? r.anchor : r.head, z(i.anchor, i.head) ? i.head : i.anchor];
	}
	function We(e, t) {
		var n = t.sel.anchor, r = t.sel.head;
		t.lastPastedText &&= (r = e.posFromIndex(e.indexFromPos(n) + t.lastPastedText.length), void 0), t.lastSelection = {
			anchorMark: e.setBookmark(n),
			headMark: e.setBookmark(r),
			anchor: L(n),
			head: L(r),
			visualMode: t.visualMode,
			visualLine: t.visualLine,
			visualBlock: t.visualBlock
		};
	}
	function Ge(e, n, r, i) {
		var a = e.state.vim.sel, o = i ? n : a.head, s = i ? n : a.anchor, c;
		return z(r, n) && (c = r, r = n, n = c), z(o, s) ? (o = B(n, o), s = Fe(s, r)) : (s = B(n, s), o = Fe(o, r), o = I(o, 0, -1), o.ch == -1 && o.line != e.firstLine() && (o = new t(o.line - 1, V(e, o.line - 1)))), [s, o];
	}
	function Ke(e, t, n) {
		var r = e.state.vim;
		t ||= r.sel, n ||= r.visualLine ? "line" : r.visualBlock ? "block" : "char";
		var i = qe(e, t, n);
		e.setSelections(i.ranges, i.primary);
	}
	function qe(e, n, r, i) {
		var a = L(n.head), o = L(n.anchor);
		if (r == "char") {
			var s = +(!i && !z(n.head, n.anchor)), c = +!!z(n.head, n.anchor);
			return a = I(n.head, 0, s), o = I(n.anchor, 0, c), {
				ranges: [{
					anchor: o,
					head: a
				}],
				primary: 0
			};
		} else if (r == "line") {
			if (z(n.head, n.anchor)) a.ch = 0, o.ch = V(e, o.line);
			else {
				o.ch = 0;
				var l = e.lastLine();
				a.line > l && (a.line = l), a.ch = V(e, a.line);
			}
			return {
				ranges: [{
					anchor: o,
					head: a
				}],
				primary: 0
			};
		} else if (r == "block") {
			var u = Math.min(o.line, a.line), d = o.ch, f = Math.max(o.line, a.line), p = a.ch;
			d < p ? p += 1 : d += 1;
			for (var m = f - u + 1, h = a.line == u ? 0 : m - 1, g = [], _ = 0; _ < m; _++) g.push({
				anchor: new t(u + _, d),
				head: new t(u + _, p)
			});
			return {
				ranges: g,
				primary: h
			};
		}
		throw "never happens";
	}
	function Je(e) {
		var t = e.getCursor("head");
		return e.getSelection().length == 1 && (t = B(t, e.getCursor("anchor"))), t;
	}
	function Ye(t, n) {
		var r = t.state.vim;
		n !== !1 && t.setCursor(F(t, r.sel.head)), We(t, r), r.visualMode = !1, r.visualLine = !1, r.visualBlock = !1, r.insertMode || e.signal(t, "vim-mode-change", { mode: "normal" });
	}
	function Xe(e, t, n) {
		var r = e.getRange(t, n);
		if (/\n\s*$/.test(r)) {
			var i = r.split("\n");
			i.pop();
			for (var a = i.pop(); i.length > 0 && a && S(a); a = i.pop()) n.line--, n.ch = 0;
			a ? (n.line--, n.ch = V(e, n.line)) : n.ch = 0;
		}
	}
	function Ze(e, t, n) {
		t.ch = 0, n.ch = 0, n.line++;
	}
	function Qe(e) {
		if (!e) return 0;
		var t = e.search(/\S/);
		return t == -1 ? e.length : t;
	}
	function $e(e, { inclusive: n, innerWord: r, bigWord: i, noSymbol: a, multiline: o }, s) {
		var c = s || Je(e), l = e.getLine(c.line), u = l, d = c.line, m = d, h = c.ch, g, _ = a ? f[0] : p[0];
		if (r && /\s/.test(l.charAt(h))) _ = function(e) {
			return /\s/.test(e);
		};
		else {
			for (; !_(l.charAt(h));) if (h++, h >= l.length) {
				if (!o) return null;
				h--, g = ot(e, c, !0, i, !0);
				break;
			}
			i ? _ = p[0] : (_ = f[0], _(l.charAt(h)) || (_ = f[1]));
		}
		for (var v = h, y = h; _(l.charAt(y)) && y >= 0;) y--;
		if (y++, g) v = g.to, m = g.line, u = e.getLine(m), !u && v == 0 && v++;
		else for (; _(l.charAt(v)) && v < l.length;) v++;
		if (n) {
			var b = v, x = c.ch <= y && /\s/.test(l.charAt(c.ch));
			if (!x) for (; /\s/.test(u.charAt(v)) && v < u.length;) v++;
			if (b == v || x) {
				for (var ee = y; /\s/.test(l.charAt(y - 1)) && y > 0;) y--;
				!y && !x && (y = ee);
			}
		}
		return {
			start: new t(d, y),
			end: new t(m, v)
		};
	}
	function et(t, n, r) {
		var i = n;
		if (!e.findMatchingTag || !e.findEnclosingTag) return {
			start: i,
			end: i
		};
		var a = e.findMatchingTag(t, n) || e.findEnclosingTag(t, n);
		return !a || !a.open || !a.close ? {
			start: i,
			end: i
		} : r ? {
			start: a.open.from,
			end: a.close.to
		} : {
			start: a.open.to,
			end: a.close.from
		};
	}
	function tt(e, t, n) {
		R(t, n) || k.jumpList.add(e, t, n);
	}
	function nt(e, t) {
		k.lastCharacterSearch.increment = e, k.lastCharacterSearch.forward = t.forward, k.lastCharacterSearch.selectedCharacter = t.selectedCharacter;
	}
	var rt = {
		"(": "bracket",
		")": "bracket",
		"{": "bracket",
		"}": "bracket",
		"[": "section",
		"]": "section",
		"*": "comment",
		"/": "comment",
		m: "method",
		M: "method",
		"#": "preprocess"
	}, it = {
		bracket: { isComplete: function(e) {
			if (e.nextCh === e.symb) {
				if (e.depth++, e.depth >= 1) return !0;
			} else e.nextCh === e.reverseSymb && e.depth--;
			return !1;
		} },
		section: {
			init: function(e) {
				e.curMoveThrough = !0, e.symb = (e.forward ? "]" : "[") === e.symb ? "{" : "}";
			},
			isComplete: function(e) {
				return e.index === 0 && e.nextCh === e.symb;
			}
		},
		comment: { isComplete: function(e) {
			var t = e.lastCh === "*" && e.nextCh === "/";
			return e.lastCh = e.nextCh, t;
		} },
		method: {
			init: function(e) {
				e.symb = e.symb === "m" ? "{" : "}", e.reverseSymb = e.symb === "{" ? "}" : "{";
			},
			isComplete: function(e) {
				return e.nextCh === e.symb;
			}
		},
		preprocess: {
			init: function(e) {
				e.index = 0;
			},
			isComplete: function(e) {
				if (e.nextCh === "#") {
					var t = e.lineText.match(/^#(\w+)/)?.[1];
					if (t === "endif") {
						if (e.forward && e.depth === 0) return !0;
						e.depth++;
					} else if (t === "if") {
						if (!e.forward && e.depth === 0) return !0;
						e.depth--;
					}
					if (t === "else" && e.depth === 0) return !0;
				}
				return !1;
			}
		}
	};
	function at(e, n, r, i) {
		var a = L(e.getCursor()), o = r ? 1 : -1, s = r ? e.lineCount() : -1, c = a.ch, l = a.line, u = e.getLine(l), d = {
			lineText: u,
			nextCh: u.charAt(c),
			lastCh: null,
			index: c,
			symb: i,
			reverseSymb: (r ? {
				")": "(",
				"}": "{"
			} : {
				"(": ")",
				"{": "}"
			})[i],
			forward: r,
			depth: 0,
			curMoveThrough: !1
		}, f = rt[i];
		if (!f) return a;
		var p = it[f].init, m = it[f].isComplete;
		for (p && p(d); l !== s && n;) {
			if (d.index += o, d.nextCh = d.lineText.charAt(d.index), !d.nextCh) {
				if (l += o, d.lineText = e.getLine(l) || "", o > 0) d.index = 0;
				else {
					var h = d.lineText.length;
					d.index = h > 0 ? h - 1 : 0;
				}
				d.nextCh = d.lineText.charAt(d.index);
			}
			m(d) && (a.line = l, a.ch = d.index, n--);
		}
		return d.nextCh || d.curMoveThrough ? new t(l, d.index) : a;
	}
	function ot(e, t, n, r, i) {
		var a = t.line, o = t.ch, s = e.getLine(a), c = n ? 1 : -1, l = r ? p : f;
		if (i && s == "") {
			if (a += c, s = e.getLine(a), !v(e, a)) return null;
			o = n ? 0 : s.length;
		}
		for (;;) {
			if (i && s == "") return {
				from: 0,
				to: 0,
				line: a
			};
			for (var u = c > 0 ? s.length : -1, d = u, m = u; o != u;) {
				for (var h = !1, g = 0; g < l.length && !h; ++g) if (l[g](s.charAt(o))) {
					for (d = o; o != u && l[g](s.charAt(o));) o += c;
					if (m = o, h = d != m, d == t.ch && a == t.line && m == d + c) continue;
					return {
						from: Math.min(d, m + 1),
						to: Math.max(d, m),
						line: a
					};
				}
				h || (o += c);
			}
			if (a += c, !v(e, a)) return null;
			s = e.getLine(a), o = c > 0 ? 0 : s.length;
		}
	}
	function st(e, n, r, i, a, o) {
		var s = L(n), c = [];
		(i && !a || !i && a) && r++;
		for (var l = !(i && a), u = 0; u < r; u++) {
			var d = ot(e, n, i, o, l);
			if (!d) {
				var f = V(e, e.lastLine());
				c.push(i ? {
					line: e.lastLine(),
					from: f,
					to: f
				} : {
					line: 0,
					from: 0,
					to: 0
				});
				break;
			}
			c.push(d), n = new t(d.line, i ? d.to - 1 : d.from);
		}
		var p = c.length != r, m = c[0], h = c.pop();
		return i && !a ? (!p && (m.from != s.ch || m.line != s.line) && (h = c.pop()), h && new t(h.line, h.from)) : i && a ? h && new t(h.line, h.to - 1) : !i && a ? (!p && (m.to != s.ch || m.line != s.line) && (h = c.pop()), h && new t(h.line, h.to)) : h && new t(h.line, h.from);
	}
	function ct(e, n, r, i, a) {
		var o = new t(n.line + r.repeat - 1, Infinity), s = e.clipPos(o);
		return s.ch--, a || (i.lastHPos = Infinity, i.lastHSPos = e.charCoords(s, "div").left), o;
	}
	function lt(e, n, r, i, a) {
		if (i) {
			for (var o = a || e.getCursor(), s = o.ch, c, l = 0; l < n; l++) {
				var u = e.getLine(o.line);
				if (c = dt(s, u, i, r), c == -1) return;
				s = c;
			}
			if (c != null) return new t(e.getCursor().line, c);
		}
	}
	function ut(e, n) {
		var r = e.getCursor().line;
		return F(e, new t(r, n - 1));
	}
	function H(e, t, n, r) {
		!w(n, m) && !g.test(n) || (t.marks[n] && t.marks[n].clear(), t.marks[n] = e.setBookmark(r));
	}
	function dt(e, t, n, r, i) {
		return r ? t.indexOf(n, e + 1) : t.lastIndexOf(n, e - 1);
	}
	function ft(e, n, r, i, a) {
		var o = n.line, s = e.firstLine(), c = e.lastLine(), l, u, d = o;
		function f(t) {
			return !e.getLine(t);
		}
		function p(e, t, n) {
			return n ? f(e) != f(e + t) : !f(e) && f(e + t);
		}
		if (i) {
			for (; s <= d && d <= c && r > 0;) p(d, i) && r--, d += i;
			return {
				start: new t(d, 0),
				end: n
			};
		}
		var m = e.state.vim;
		if (m.visualLine && p(o, 1, !0)) {
			var h = m.sel.anchor;
			p(h.line, -1, !0) && (!a || h.line != o) && (o += 1);
		}
		var g = f(o);
		for (d = o; d <= c && r; d++) p(d, 1, !0) && (!a || f(d) != g) && r--;
		for (u = new t(d, 0), d > c && !g ? g = !0 : a = !1, d = o; d > s && !((!a || f(d) == g || d == o) && p(d, -1, !0)); d--);
		return l = new t(d, 0), {
			start: l,
			end: u
		};
	}
	function pt(e, n, r, i, a) {
		function o(e) {
			e.line !== null && (e.pos + e.dir < 0 || e.pos + e.dir >= e.line.length ? e.line = null : e.pos += e.dir);
		}
		function s(e, t, n, r) {
			var i = {
				line: e.getLine(t),
				ln: t,
				pos: n,
				dir: r
			};
			if (i.line === "") return {
				ln: i.ln,
				pos: i.pos
			};
			var s = i.pos;
			for (o(i); i.line !== null;) {
				if (s = i.pos, C(i.line[i.pos])) if (a) {
					for (o(i); i.line !== null && S(i.line[i.pos]);) s = i.pos, o(i);
					return {
						ln: i.ln,
						pos: s + 1
					};
				} else return {
					ln: i.ln,
					pos: i.pos + 1
				};
				o(i);
			}
			return {
				ln: i.ln,
				pos: s + 1
			};
		}
		function c(e, t, n, r) {
			var i = e.getLine(t), s = {
				line: i,
				ln: t,
				pos: n,
				dir: r
			};
			if (s.line === "") return {
				ln: s.ln,
				pos: s.pos
			};
			var c = s.pos;
			for (o(s); s.line !== null;) {
				if (!S(s.line[s.pos]) && !C(s.line[s.pos])) c = s.pos;
				else if (C(s.line[s.pos])) return a && S(s.line[s.pos + 1]) ? {
					ln: s.ln,
					pos: s.pos + 1
				} : {
					ln: s.ln,
					pos: c
				};
				o(s);
			}
			return s.line = i, a && S(s.line[s.pos]) ? {
				ln: s.ln,
				pos: s.pos
			} : {
				ln: s.ln,
				pos: c
			};
		}
		for (var l = {
			ln: n.line,
			pos: n.ch
		}; r > 0;) l = i < 0 ? c(e, l.ln, l.pos, i) : s(e, l.ln, l.pos, i), r--;
		return new t(l.ln, l.pos);
	}
	function mt(e, n, r, i) {
		function a(e, t) {
			if (t.line !== null) if (t.pos + t.dir < 0 || t.pos + t.dir >= t.line.length) {
				if (t.ln += t.dir, !v(e, t.ln)) {
					t.line = null;
					return;
				}
				t.line = e.getLine(t.ln), t.pos = t.dir > 0 ? 0 : t.line.length - 1;
			} else t.pos += t.dir;
		}
		function o(e, t, n, r) {
			var i = e.getLine(t), o = i === "", s = {
				line: i,
				ln: t,
				pos: n,
				dir: r
			}, c = {
				ln: s.ln,
				pos: s.pos
			}, l = s.line === "";
			for (a(e, s); s.line !== null;) {
				if (c.ln = s.ln, c.pos = s.pos, s.line === "" && !l || o && s.line !== "" && !S(s.line[s.pos])) return {
					ln: s.ln,
					pos: s.pos
				};
				C(s.line[s.pos]) && !o && (s.pos === s.line.length - 1 || S(s.line[s.pos + 1])) && (o = !0), a(e, s);
			}
			var i = e.getLine(c.ln);
			c.pos = 0;
			for (var u = i.length - 1; u >= 0; --u) if (!S(i[u])) {
				c.pos = u;
				break;
			}
			return c;
		}
		function s(e, t, n, r) {
			var i = e.getLine(t), o = {
				line: i,
				ln: t,
				pos: n,
				dir: r
			}, s = o.ln, c = null, l = o.line === "";
			for (a(e, o); o.line !== null;) {
				if (o.line === "" && !l) return c === null ? {
					ln: o.ln,
					pos: o.pos
				} : {
					ln: s,
					pos: c
				};
				if (C(o.line[o.pos]) && c !== null && !(o.ln === s && o.pos + 1 === c)) return {
					ln: s,
					pos: c
				};
				o.line !== "" && !S(o.line[o.pos]) && (l = !1, s = o.ln, c = o.pos), a(e, o);
			}
			var i = e.getLine(s);
			c = 0;
			for (var u = 0; u < i.length; ++u) if (!S(i[u])) {
				c = u;
				break;
			}
			return {
				ln: s,
				pos: c
			};
		}
		for (var c = {
			ln: n.line,
			pos: n.ch
		}; r > 0;) c = i < 0 ? s(e, c.ln, c.pos, i) : o(e, c.ln, c.pos, i), r--;
		return new t(c.ln, c.pos);
	}
	function ht(e, n, r, i) {
		var a = n, o = {
			"(": /[()]/,
			")": /[()]/,
			"[": /[[\]]/,
			"]": /[[\]]/,
			"{": /[{}]/,
			"}": /[{}]/,
			"<": /[<>]/,
			">": /[<>]/
		}[r], s = {
			"(": "(",
			")": "(",
			"[": "[",
			"]": "[",
			"{": "{",
			"}": "{",
			"<": "<",
			">": "<"
		}[r], c = +(e.getLine(a.line).charAt(a.ch) === s), l = e.scanForBracket(new t(a.line, a.ch + c), -1, void 0, { bracketRegex: o }), u = e.scanForBracket(new t(a.line, a.ch + c), 1, void 0, { bracketRegex: o });
		if (!l || !u) return null;
		var d = l.pos, f = u.pos;
		if (d.line == f.line && d.ch > f.ch || d.line > f.line) {
			var p = d;
			d = f, f = p;
		}
		return i ? f.ch += 1 : d.ch += 1, {
			start: d,
			end: f
		};
	}
	function gt(e, n, r, i) {
		var a = L(n), o = e.getLine(a.line).split(""), s, c, l, u, d = o.indexOf(r);
		if (a.ch < d) a.ch = d;
		else if (d < a.ch && o[a.ch] == r) {
			var f = /string/.test(e.getTokenTypeAt(I(n, 0, 1))), p = /string/.test(e.getTokenTypeAt(n));
			f && !p || (c = a.ch, --a.ch);
		}
		if (o[a.ch] == r && !c) s = a.ch + 1;
		else for (l = a.ch; l > -1 && !s; l--) o[l] == r && (s = l + 1);
		if (s && !c) for (l = s, u = o.length; l < u && !c; l++) o[l] == r && (c = l);
		return !s || !c ? {
			start: a,
			end: a
		} : (i && (--s, ++c), {
			start: new t(a.line, s),
			end: new t(a.line, c)
		});
	}
	E("pcre", !0, "boolean");
	class _t {
		constructor() {
			this.highlightTimeout;
		}
		getQuery() {
			return k.query;
		}
		setQuery(e) {
			k.query = e;
		}
		getOverlay() {
			return this.searchOverlay;
		}
		setOverlay(e) {
			this.searchOverlay = e;
		}
		isReversed() {
			return k.isReversed;
		}
		setReversed(e) {
			k.isReversed = e;
		}
		getScrollbarAnnotate() {
			return this.annotate;
		}
		setScrollbarAnnotate(e) {
			this.annotate = e;
		}
	}
	function vt(e) {
		var t = e.state.vim;
		return t.searchState_ ||= new _t();
	}
	function yt(e) {
		return xt(e, "/");
	}
	function bt(e) {
		return St(e, "/");
	}
	function xt(e, t) {
		var n = St(e, t) || [];
		if (!n.length) return [];
		var r = [];
		if (n[0] === 0) {
			for (var i = 0; i < n.length; i++) typeof n[i] == "number" && r.push(e.substring(n[i] + 1, n[i + 1]));
			return r;
		}
	}
	function St(e, t) {
		t ||= "/";
		for (var n = !1, r = [], i = 0; i < e.length; i++) {
			var a = e.charAt(i);
			!n && a == t && r.push(i), n = !n && a == "\\";
		}
		return r;
	}
	function Ct(e) {
		var t = {
			V: "|(){+?*.[$^",
			M: "|(){+?*.[",
			m: "|(){+?",
			v: "<>"
		}, n = {
			">": "(?<=[\\w])(?=[^\\w]|$)",
			"<": "(?<=[^\\w]|^)(?=[\\w])"
		}, r = t.m, i = e.replace(/\\.|[\[|(){+*?.$^<>]/g, function(e) {
			if (e[0] === "\\") {
				var i = e[1];
				return i === "}" || r.indexOf(i) != -1 ? i : i in t ? (r = t[i], "") : i in n ? n[i] : e;
			} else return r.indexOf(e) == -1 ? e : n[e] || "\\" + e;
		}), a = i.indexOf("\\zs");
		return a != -1 && (i = "(?<=" + i.slice(0, a) + ")" + i.slice(a + 3)), a = i.indexOf("\\ze"), a != -1 && (i = i.slice(0, a) + "(?=" + i.slice(a + 3) + ")"), i;
	}
	var wt = {
		"\\n": "\n",
		"\\r": "\r",
		"\\t": "	"
	};
	function Tt(e) {
		for (var t = !1, n = [], r = -1; r < e.length; r++) {
			var i = e.charAt(r) || "", a = e.charAt(r + 1) || "";
			wt[i + a] ? (n.push(wt[i + a]), r++) : t ? (n.push(i), t = !1) : i === "\\" ? (t = !0, x(a) || a === "$" ? n.push("$") : a !== "/" && a !== "\\" && n.push("\\")) : (i === "$" && n.push("$"), n.push(i), a === "/" && n.push("\\"));
		}
		return n.join("");
	}
	var Et = {
		"\\/": "/",
		"\\\\": "\\",
		"\\n": "\n",
		"\\r": "\r",
		"\\t": "	",
		"\\&": "&"
	};
	function Dt(t) {
		for (var n = new e.StringStream(t), r = []; !n.eol();) {
			for (; n.peek() && n.peek() != "\\";) r.push(n.next());
			var i = !1;
			for (var a in Et) if (n.match(a, !0)) {
				i = !0, r.push(Et[a]);
				break;
			}
			i || r.push(n.next());
		}
		return r.join("");
	}
	function Ot(e, t, n) {
		k.registerController.getRegister("/").setText(e);
		var r = bt(e), i, a;
		return r.length ? (i = e.substring(0, r[0]), a = e.substring(r[0]).indexOf("i") != -1) : i = e, i ? (O("pcre") || (i = Ct(i)), n && (t = /^[^A-Z]*$/.test(i)), new RegExp(i, t || a ? "im" : "m")) : null;
	}
	function kt(e) {
		typeof e == "string" && (e = document.createElement(e));
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			if (n) if (typeof n != "object" && (n = document.createTextNode(n)), n.nodeType) e.appendChild(n);
			else for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (r[0] === "$" ? e.style[r.slice(1)] = n[r] : typeof n[r] == "function" ? e[r] = n[r] : e.setAttribute(r, n[r]));
		}
		return e;
	}
	function U(e, t, n) {
		var r = kt("div", {
			$color: "red",
			$whiteSpace: "pre",
			class: "cm-vim-message"
		}, t);
		e.openNotification ? n ? (r = kt("div", {}, r, kt("div", {}, "Press ENTER or type command to continue")), e.state.closeVimNotification && e.state.closeVimNotification(), e.state.closeVimNotification = e.openNotification(r, {
			bottom: !0,
			duration: 0
		})) : e.openNotification(r, {
			bottom: !0,
			duration: 15e3
		}) : alert(r.innerText);
	}
	function At(e, t) {
		return kt("div", {
			$display: "flex",
			$flex: 1
		}, kt("span", {
			$fontFamily: "monospace",
			$whiteSpace: "pre",
			$flex: 1,
			$display: "flex"
		}, e, kt("input", {
			type: "text",
			autocorrect: "off",
			autocapitalize: "off",
			spellcheck: "false",
			$flex: 1
		})), t && kt("span", { $color: "#888" }, t));
	}
	function jt(e, t) {
		if (ce.length) {
			t.value ||= "", j = t;
			return;
		}
		var n = At(t.prefix, t.desc);
		if (e.openDialog) e.openDialog(n, t.onClose, {
			onKeyDown: t.onKeyDown,
			onKeyUp: t.onKeyUp,
			bottom: !0,
			selectValueOnOpen: !1,
			value: t.value
		});
		else {
			var r = "";
			typeof t.prefix != "string" && t.prefix && (r += t.prefix.textContent), t.desc && (r += " " + t.desc), t.onClose?.(prompt(r, ""));
		}
	}
	function Mt(e, t) {
		return e instanceof RegExp && t instanceof RegExp ? e.flags == t.flags && e.source == t.source : !1;
	}
	function Nt(e, t, n, r) {
		if (t) {
			var i = vt(e), a = Ot(t, !!n, !!r);
			if (a) return It(e, a), Mt(a, i.getQuery()) || i.setQuery(a), a;
		}
	}
	function Pt(e) {
		if (e.source.charAt(0) == "^") var t = !0;
		return {
			token: function(n) {
				if (t && !n.sol()) {
					n.skipToEnd();
					return;
				}
				var r = n.match(e, !1);
				if (r) return r[0].length == 0 ? (n.next(), "searching") : !n.sol() && (n.backUp(1), !e.exec(n.next() + r[0])) ? (n.next(), null) : (n.match(e), "searching");
				for (; !n.eol() && (n.next(), !n.match(e, !1)););
			},
			query: e
		};
	}
	var Ft = 0;
	function It(e, t) {
		clearTimeout(Ft);
		var n = vt(e);
		n.highlightTimeout = Ft, Ft = setTimeout(function() {
			if (e.state.vim) {
				var n = vt(e);
				n.highlightTimeout = void 0;
				var r = n.getOverlay();
				(!r || t != r.query) && (r && e.removeOverlay(r), r = Pt(t), e.addOverlay(r), e.showMatchesOnScrollbar && (n.getScrollbarAnnotate() && n.getScrollbarAnnotate().clear(), n.setScrollbarAnnotate(e.showMatchesOnScrollbar(t))), n.setOverlay(r));
			}
		}, 50);
	}
	function Lt(e, n, r, i) {
		return e.operation(function() {
			i === void 0 && (i = 1);
			for (var a = e.getCursor(), o = e.getSearchCursor(r, a), s = 0; s < i; s++) {
				var c = o.find(n);
				if (s == 0 && c && R(o.from(), a)) {
					var l = n ? o.from() : o.to();
					c = o.find(n), c && !c[0] && R(o.from(), l) && e.getLine(l.line).length == l.ch && (c = o.find(n));
				}
				if (!c && (o = e.getSearchCursor(r, n ? new t(e.lastLine()) : new t(e.firstLine(), 0)), !o.find(n))) return;
			}
			return o.from();
		});
	}
	function Rt(e, n, r, i, a) {
		return e.operation(function() {
			i === void 0 && (i = 1);
			var o = e.getCursor(), s = e.getSearchCursor(r, o), c = s.find(!n);
			!a.visualMode && c && R(s.from(), o) && s.find(!n);
			for (var l = 0; l < i; l++) if (c = s.find(n), !c && (s = e.getSearchCursor(r, n ? new t(e.lastLine()) : new t(e.firstLine(), 0)), !s.find(n))) return;
			var u = s.from(), d = s.to();
			return u && d && [u, d];
		});
	}
	function zt(e) {
		var t = vt(e);
		t.highlightTimeout &&= (clearTimeout(t.highlightTimeout), void 0), e.removeOverlay(vt(e).getOverlay()), t.setOverlay(null), t.getScrollbarAnnotate() && (t.getScrollbarAnnotate().clear(), t.setScrollbarAnnotate(null));
	}
	function Bt(e, t, n) {
		return typeof e != "number" && (e = e.line), t instanceof Array ? w(e, t) : typeof n == "number" ? e >= t && e <= n : e == t;
	}
	function Vt(e) {
		var t = e.getScrollInfo(), n = 6, r = 10, i = e.coordsChar({
			left: 0,
			top: n + t.top
		}, "local"), a = t.clientHeight - r + t.top, o = e.coordsChar({
			left: 0,
			top: a
		}, "local");
		return {
			top: i.line,
			bottom: o.line
		};
	}
	function Ht(e, n, r) {
		if (r == "'" || r == "`") return k.jumpList.find(e, -1) || new t(0, 0);
		if (r == ".") return Ut(e);
		var i = n.marks[r];
		return i && i.find();
	}
	function Ut(e) {
		if (e.getLastEditEnd) return e.getLastEditEnd();
		for (var t = e.doc.history.done, n = t.length; n--;) if (t[n].changes) return L(t[n].changes[0].to);
	}
	class Wt {
		constructor() {
			this.commandMap_, this.buildCommandMap_();
		}
		processCommand(e, t, n) {
			var r = this;
			e.operation(function() {
				e.curOp && (e.curOp.isVimOp = !0), r._processCommand(e, t, n);
			});
		}
		_processCommand(t, n, r) {
			var i = t.state.vim, a = k.registerController.getRegister(":"), o = a.toString(), s = new e.StringStream(n);
			a.setText(n);
			var c = r || {};
			c.input = n;
			try {
				this.parseInput_(t, s, c);
			} catch (e) {
				throw U(t, e + ""), e;
			}
			i.visualMode && Ye(t);
			var l, u;
			if (!c.commandName) c.line !== void 0 && (u = "move");
			else if (l = this.matchCommand_(c.commandName), l) {
				if (u = l.name, l.excludeFromCommandHistory && a.setText(o), this.parseCommandArgs_(s, c, l), l.type == "exToKey") {
					de(t, l.toKeys || "", l);
					return;
				} else if (l.type == "exToEx") {
					this.processCommand(t, l.toInput || "");
					return;
				}
			}
			if (!u) {
				U(t, "Not an editor command \":" + n + "\"");
				return;
			}
			try {
				Gt[u](t, c), (!l || !l.possiblyAsync) && c.callback && c.callback();
			} catch (e) {
				throw U(t, e + ""), e;
			}
		}
		parseInput_(e, t, n) {
			t.eatWhile(":"), t.eat("%") ? (n.line = e.firstLine(), n.lineEnd = e.lastLine()) : (n.line = this.parseLineSpec_(e, t), n.line !== void 0 && t.eat(",") && (n.lineEnd = this.parseLineSpec_(e, t))), n.line == null ? e.state.vim.visualMode ? (n.selectionLine = Ht(e, e.state.vim, "<")?.line, n.selectionLineEnd = Ht(e, e.state.vim, ">")?.line) : n.selectionLine = e.getCursor().line : (n.selectionLine = n.line, n.selectionLineEnd = n.lineEnd);
			var r = t.match(/^(\w+|!!|@@|[!#&*<=>@~])/);
			return r ? n.commandName = r[1] : n.commandName = (t.match(/.*/) || [""])[0], n;
		}
		parseLineSpec_(e, t) {
			var n = t.match(/^(\d+)/);
			if (n) return parseInt(n[1], 10) - 1;
			switch (t.next()) {
				case ".": return this.parseLineSpecOffset_(t, e.getCursor().line);
				case "$": return this.parseLineSpecOffset_(t, e.lastLine());
				case "'":
					var r = t.next() || "", i = Ht(e, e.state.vim, r);
					if (!i) throw Error("Mark not set");
					return this.parseLineSpecOffset_(t, i.line);
				case "-":
				case "+": return t.backUp(1), this.parseLineSpecOffset_(t, e.getCursor().line);
				default:
					t.backUp(1);
					return;
			}
		}
		parseLineSpecOffset_(e, t) {
			var n = e.match(/^([+-])?(\d+)/);
			if (n) {
				var r = parseInt(n[2], 10);
				n[1] == "-" ? t -= r : t += r;
			}
			return t;
		}
		parseCommandArgs_(e, t, n) {
			if (!e.eol()) {
				t.argString = e.match(/.*/)?.[0];
				var r = n.argDelimiter || /\s+/, i = Le(t.argString || "").split(r);
				i.length && i[0] && (t.args = i);
			}
		}
		matchCommand_(e) {
			for (var t = e.length; t > 0; t--) {
				var n = e.substring(0, t);
				if (this.commandMap_[n]) {
					var r = this.commandMap_[n];
					if (r.name.indexOf(e) === 0) return r;
				}
			}
		}
		buildCommandMap_() {
			this.commandMap_ = {};
			for (var e = 0; e < o.length; e++) {
				var t = o[e], n = t.shortName || t.name;
				this.commandMap_[n] = t;
			}
		}
		map(e, t, n, r) {
			if (e != ":" && e.charAt(0) == ":") {
				if (n) throw Error("Mode not supported for ex mappings");
				var i = e.substring(1);
				t != ":" && t.charAt(0) == ":" ? this.commandMap_[i] = {
					name: i,
					type: "exToEx",
					toInput: t.substring(1),
					user: !0
				} : this.commandMap_[i] = {
					name: i,
					type: "exToKey",
					toKeys: t,
					user: !0
				};
			} else {
				var a = {
					keys: e,
					type: "keyToKey",
					toKeys: t,
					noremap: !!r
				};
				n && (a.context = n), Jt(a);
			}
		}
		unmap(e, t) {
			if (e != ":" && e.charAt(0) == ":") {
				if (t) throw Error("Mode not supported for ex mappings");
				var n = e.substring(1);
				if (this.commandMap_[n] && this.commandMap_[n].user) return delete this.commandMap_[n], !0;
			} else for (var i = e, a = 0; a < r.length; a++) if (i == r[a].keys && r[a].context === t) return r.splice(a, 1), Xt(i), !0;
		}
	}
	var Gt = {
		colorscheme: function(e, t) {
			if (!t.args || t.args.length < 1) {
				U(e, e.getOption("theme"));
				return;
			}
			e.setOption("theme", t.args[0]);
		},
		map: function(e, t, n, r) {
			var i = t.args;
			if (!i || i.length < 2) {
				e && U(e, "Invalid mapping: " + t.input);
				return;
			}
			W.map(i[0], i[1], n, r);
		},
		imap: function(e, t) {
			this.map(e, t, "insert");
		},
		nmap: function(e, t) {
			this.map(e, t, "normal");
		},
		vmap: function(e, t) {
			this.map(e, t, "visual");
		},
		omap: function(e, t) {
			this.map(e, t, "operatorPending");
		},
		noremap: function(e, t) {
			this.map(e, t, void 0, !0);
		},
		inoremap: function(e, t) {
			this.map(e, t, "insert", !0);
		},
		nnoremap: function(e, t) {
			this.map(e, t, "normal", !0);
		},
		vnoremap: function(e, t) {
			this.map(e, t, "visual", !0);
		},
		onoremap: function(e, t) {
			this.map(e, t, "operatorPending", !0);
		},
		unmap: function(e, t, n) {
			var r = t.args;
			(!r || r.length < 1 || !W.unmap(r[0], n)) && e && U(e, "No such mapping: " + t.input);
		},
		mapclear: function(e, t) {
			A.mapclear();
		},
		imapclear: function(e, t) {
			A.mapclear("insert");
		},
		nmapclear: function(e, t) {
			A.mapclear("normal");
		},
		vmapclear: function(e, t) {
			A.mapclear("visual");
		},
		omapclear: function(e, t) {
			A.mapclear("operatorPending");
		},
		move: function(e, t) {
			Ce.processCommand(e, e.state.vim, {
				keys: "",
				type: "motion",
				motion: "moveToLineOrEdgeOfDocument",
				motionArgs: {
					forward: !1,
					explicitRepeat: !0,
					linewise: !0
				},
				repeatOverride: t.line + 1
			});
		},
		set: function(e, t) {
			var n = t.args, r = t.setCfg || {};
			if (!n || n.length < 1) {
				e && U(e, "Invalid mapping: " + t.input);
				return;
			}
			var i = n[0].split("="), a = i.shift() || "", o = i.length > 0 ? i.join("=") : void 0, s = !1, c = !1;
			if (a.charAt(a.length - 1) == "?") {
				if (o) throw Error("Trailing characters: " + t.argString);
				a = a.substring(0, a.length - 1), s = !0;
			} else a.charAt(a.length - 1) == "!" && (a = a.substring(0, a.length - 1), c = !0);
			o === void 0 && a.substring(0, 2) == "no" && (a = a.substring(2), o = !1);
			var l = T[a] && T[a].type == "boolean";
			if (l && (c ? o = !O(a, e, r) : o ??= !0), !l && o === void 0 || s) {
				var u = O(a, e, r);
				u instanceof Error ? U(e, u.message) : u === !0 || u === !1 ? U(e, " " + (u ? "" : "no") + a) : U(e, "  " + a + "=" + u);
			} else {
				var d = D(a, o, e, r);
				d instanceof Error && U(e, d.message);
			}
		},
		setlocal: function(e, t) {
			t.setCfg = { scope: "local" }, this.set(e, t);
		},
		setglobal: function(e, t) {
			t.setCfg = { scope: "global" }, this.set(e, t);
		},
		registers: function(e, t) {
			var n = t.args, r = k.registerController.registers, i = "----------Registers----------\n\n";
			if (n) for (var a = n.join(""), o = 0; o < a.length; o++) {
				var s = a.charAt(o);
				if (k.registerController.isValidRegister(s)) {
					var c = r[s] || new ye();
					i += "\"" + s + "    " + c.toString() + "\n";
				}
			}
			else for (var s in r) {
				var l = r[s].toString();
				l.length && (i += "\"" + s + "    " + l + "\n");
			}
			U(e, i, !0);
		},
		marks: function(e, t) {
			var n = t.args, r = e.state.vim.marks, i = "-----------Marks-----------\nmark	line	col\n\n";
			if (n) for (var a = n.join(""), o = 0; o < a.length; o++) {
				var s = a.charAt(o), c = r[s] && r[s].find();
				c && (i += s + "	" + c.line + "	" + c.ch + "\n");
			}
			else for (var s in r) {
				var c = r[s] && r[s].find();
				c && (i += s + "	" + c.line + "	" + c.ch + "\n");
			}
			U(e, i, !0);
		},
		sort: function(n, r) {
			var i, a, o, s, c;
			function l() {
				if (r.argString) {
					var t = new e.StringStream(r.argString);
					if (t.eat("!") && (i = !0), t.eol()) return;
					if (!t.eatSpace()) return "Invalid arguments";
					var n = t.match(/([dinuox]+)?\s*(\/.+\/)?\s*/);
					if (!n || !t.eol()) return "Invalid arguments";
					if (n[1]) {
						a = n[1].indexOf("i") != -1, o = n[1].indexOf("u") != -1;
						var l = n[1].indexOf("d") != -1 || n[1].indexOf("n") != -1, u = n[1].indexOf("x") != -1, d = n[1].indexOf("o") != -1;
						if (Number(l) + Number(u) + Number(d) > 1) return "Invalid arguments";
						s = l && "decimal" || u && "hex" || d && "octal";
					}
					n[2] && (c = new RegExp(n[2].substr(1, n[2].length - 2), a ? "i" : ""));
				}
			}
			var u = l();
			if (u) {
				U(n, u + ": " + r.argString);
				return;
			}
			var d = r.line || n.firstLine(), f = r.lineEnd || r.line || n.lastLine();
			if (d == f) return;
			var p = new t(d, 0), m = new t(f, V(n, f)), h = n.getRange(p, m).split("\n"), g = s == "decimal" ? /(-?)([\d]+)/ : s == "hex" ? /(-?)(?:0x)?([0-9a-f]+)/i : s == "octal" ? /([0-7]+)/ : null, _ = s == "decimal" ? 10 : s == "hex" ? 16 : s == "octal" ? 8 : void 0, v = [], y = [];
			if (s || c) for (var b = 0; b < h.length; b++) {
				var x = c ? h[b].match(c) : null;
				x && x[0] != "" ? v.push(x) : g && g.exec(h[b]) ? v.push(h[b]) : y.push(h[b]);
			}
			else y = h;
			function ee(e, t) {
				if (i) {
					var n = e;
					e = t, t = n;
				}
				a && (e = e.toLowerCase(), t = t.toLowerCase());
				var r = g && g.exec(e), o = g && g.exec(t);
				return !r || !o ? e < t ? -1 : 1 : parseInt((r[1] + r[2]).toLowerCase(), _) - parseInt((o[1] + o[2]).toLowerCase(), _);
			}
			function S(e, t) {
				if (i) {
					var n = e;
					e = t, t = n;
				}
				return a && (e[0] = e[0].toLowerCase(), t[0] = t[0].toLowerCase()), e[0] < t[0] ? -1 : 1;
			}
			if (v.sort(c ? S : ee), c) for (var b = 0; b < v.length; b++) v[b] = v[b].input;
			else s || y.sort(ee);
			if (h = i ? v.concat(y) : y.concat(v), o) {
				var C = h, w;
				h = [];
				for (var b = 0; b < C.length; b++) C[b] != w && h.push(C[b]), w = C[b];
			}
			n.replaceRange(h.join("\n"), p, m);
		},
		vglobal: function(e, t) {
			this.global(e, t);
		},
		normal: function(e, t) {
			var n = !1, r = t.argString;
			if (r && r[0] == "!" && (r = r.slice(1), n = !0), r = r.trimStart(), !r) {
				U(e, "Argument is required.");
				return;
			}
			var i = t.line;
			if (typeof i == "number") for (var a = isNaN(t.lineEnd) ? i : t.lineEnd, o = i; o <= a; o++) e.setCursor(o, 0), de(e, t.argString.trimStart(), { noremap: n }), e.state.vim.insertMode && qt(e, !0);
			else de(e, t.argString.trimStart(), { noremap: n }), e.state.vim.insertMode && qt(e, !0);
		},
		global: function(e, t) {
			var n = t.argString;
			if (!n) {
				U(e, "Regular Expression missing from global");
				return;
			}
			var r = t.commandName[0] === "v";
			n[0] === "!" && t.commandName[0] === "g" && (r = !0, n = n.slice(1));
			var i = t.line === void 0 ? e.firstLine() : t.line, a = t.lineEnd || t.line || e.lastLine(), o = yt(n), s = n, c = "";
			if (o && o.length && (s = o[0], c = o.slice(1, o.length).join("/")), s) try {
				Nt(e, s, !0, !0);
			} catch {
				U(e, "Invalid regex: " + s);
				return;
			}
			for (var l = vt(e).getQuery(), u = [], d = i; d <= a; d++) {
				var f = e.getLine(d);
				l.test(f) !== r && u.push(c ? e.getLineHandle(d) : f);
			}
			if (!c) {
				U(e, u.join("\n"));
				return;
			}
			var p = 0, m = function() {
				if (p < u.length) {
					var t = u[p++], n = e.getLineNumber(t);
					if (n == null) {
						m();
						return;
					}
					var r = n + 1 + c;
					W.processCommand(e, r, { callback: m });
				} else e.releaseLineHandles && e.releaseLineHandles();
			};
			m();
		},
		substitute: function(e, n) {
			if (!e.getSearchCursor) throw Error("Search feature not available. Requires searchcursor.js or any other getSearchCursor implementation.");
			var r = n.argString, i = r ? xt(r, r[0]) : [], a = "", o = "", s, c, l, u = !1, d = !1;
			if (i && i.length) a = i[0], O("pcre") && a !== "" && (a = new RegExp(a).source), o = i[1], o !== void 0 && (o = O("pcre") ? Dt(o.replace(/([^\\])&/g, "$1$$&")) : Tt(o), k.lastSubstituteReplacePart = o), s = i[2] ? i[2].split(" ") : [];
			else if (r && r.length) {
				U(e, "Substitutions should be of the form :s/pattern/replace/");
				return;
			}
			if (s && (c = s[0], l = parseInt(s[1]), c && (c.indexOf("c") != -1 && (u = !0), c.indexOf("g") != -1 && (d = !0), a = O("pcre") ? a + "/" + c : a.replace(/\//g, "\\/") + "/" + c)), a) try {
				Nt(e, a, !0, !0);
			} catch {
				U(e, "Invalid regex: " + a);
				return;
			}
			if (o ||= k.lastSubstituteReplacePart, o === void 0) {
				U(e, "No previous substitute regular expression");
				return;
			}
			var f = vt(e).getQuery(), p = n.line === void 0 ? e.getCursor().line : n.line, m = n.lineEnd || p;
			p == e.firstLine() && m == e.lastLine() && (m = Infinity), l && (p = m, m = p + l - 1);
			var h = F(e, new t(p, 0)), g = e.getSearchCursor(f, h);
			Kt(e, u, d, p, m, g, f, o, n.callback);
		},
		startinsert: function(e, t) {
			de(e, t.argString == "!" ? "A" : "i", {});
		},
		redo: e.commands.redo,
		undo: e.commands.undo,
		write: function(t) {
			e.commands.save ? e.commands.save(t) : t.save && t.save();
		},
		nohlsearch: function(e) {
			zt(e);
		},
		yank: function(e) {
			var t = L(e.getCursor()).line, n = e.getLine(t);
			k.registerController.pushText("0", "yank", n, !0, !0);
		},
		delete: function(e, n) {
			var r = n.selectionLine, i = isNaN(n.selectionLineEnd) ? r : n.selectionLineEnd;
			De.delete(e, { linewise: !0 }, [{
				anchor: new t(r, 0),
				head: new t(i + 1, 0)
			}]);
		},
		join: function(e, n) {
			var r = n.selectionLine, i = isNaN(n.selectionLineEnd) ? r : n.selectionLineEnd;
			e.setCursor(new t(r, 0)), Oe.joinLines(e, { repeat: i - r }, e.state.vim);
		},
		delmarks: function(t, n) {
			if (!n.argString || !Le(n.argString)) {
				U(t, "Argument required");
				return;
			}
			for (var r = t.state.vim, i = new e.StringStream(Le(n.argString)); !i.eol();) {
				i.eatSpace();
				var a = i.pos;
				if (!i.match(/[a-zA-Z]/, !1)) {
					U(t, "Invalid argument: " + n.argString.substring(a));
					return;
				}
				var o = i.next();
				if (i.match("-", !0)) {
					if (!i.match(/[a-zA-Z]/, !1)) {
						U(t, "Invalid argument: " + n.argString.substring(a));
						return;
					}
					var s = o, c = i.next();
					if (s && c && y(s) == y(c)) {
						var l = s.charCodeAt(0), u = c.charCodeAt(0);
						if (l >= u) {
							U(t, "Invalid argument: " + n.argString.substring(a));
							return;
						}
						for (var d = 0; d <= u - l; d++) {
							var f = String.fromCharCode(l + d);
							delete r.marks[f];
						}
					} else {
						U(t, "Invalid argument: " + s + "-");
						return;
					}
				} else o && delete r.marks[o];
			}
		}
	}, W = new Wt();
	A.defineEx("version", "ve", (e) => {
		U(e, "Codemirror-vim version: 6.3.0");
	});
	function Kt(t, n, r, i, a, o, s, c, l) {
		t.state.vim.exMode = !0;
		var u = !1, d = 0, f, p, m;
		function h() {
			t.operation(function() {
				for (; !u;) g(), v();
				y();
			});
		}
		function g() {
			var e = "", n = o.match || o.pos && o.pos.match;
			e = n ? c.replace(/\$(\d{1,3}|[$&])/g, function(e, t) {
				if (t == "$") return "$";
				if (t == "&") return n[0];
				for (var r = t; parseInt(r) >= n.length && r.length > 0;) r = r.slice(0, r.length - 1);
				return r ? n[r] + t.slice(r.length, t.length) : e;
			}) : t.getRange(o.from(), o.to()).replace(s, c);
			var r = o.to().line;
			o.replace(e), p = o.to().line, a += p - r, m = p < r;
		}
		function _() {
			var e = f && L(o.to()), t = o.findNext();
			return t && !t[0] && e && R(o.from(), e) && (t = o.findNext()), t && d++, t;
		}
		function v() {
			for (; _() && Bt(o.from(), i, a);) if (!(!r && o.from().line == p && !m)) {
				t.scrollIntoView(o.from(), 30), t.setSelection(o.from(), o.to()), f = o.from(), u = !1;
				return;
			}
			u = !0;
		}
		function y(e) {
			if (e && e(), t.focus(), f) {
				t.setCursor(f);
				var n = t.state.vim;
				n.exMode = !1, n.lastHPos = n.lastHSPos = f.ch;
			}
			l ? l() : u && U(t, (d ? "Found " + d + " matches" : "No matches found") + " for pattern: " + s + (O("pcre") ? " (set nopcre to use Vim regexps)" : ""));
		}
		function b(n, r, i) {
			switch (e.e_stop(n), he(n)) {
				case "y":
					g(), v();
					break;
				case "n":
					v();
					break;
				case "a":
					var a = l;
					l = void 0, t.operation(h), l = a;
					break;
				case "l": g();
				case "q":
				case "<Esc>":
				case "<C-c>":
				case "<C-[>":
					y(i);
					break;
			}
			return u && y(i), !0;
		}
		if (v(), u) {
			U(t, "No matches for " + s + (O("pcre") ? " (set nopcre to use vim regexps)" : ""));
			return;
		}
		if (!n) {
			h(), l && l();
			return;
		}
		jt(t, {
			prefix: kt("span", "replace with ", kt("strong", c), " (y/n/a/q/l)"),
			onKeyDown: b
		});
	}
	function qt(t, n) {
		var r = t.state.vim, i = k.macroModeState, a = k.registerController.getRegister("."), o = i.isPlaying, s = i.lastInsertModeChanges;
		o || (t.off("change", nn), r.insertEnd && r.insertEnd.clear(), r.insertEnd = void 0, e.off(t.getInputField(), "keydown", on)), !o && r.insertModeRepeat && r.insertModeRepeat > 1 && (sn(t, r, r.insertModeRepeat - 1, !0), r.lastEditInputState.repeatOverride = r.insertModeRepeat), delete r.insertModeRepeat, r.insertMode = !1, n || t.setCursor(t.getCursor().line, t.getCursor().ch - 1), t.setOption("keyMap", "vim"), t.setOption("disableInput", !0), t.toggleOverwrite(!1), a.setText(s.changes.join("")), e.signal(t, "vim-mode-change", { mode: "normal" }), i.isRecording && en(i);
	}
	function Jt(e) {
		r.unshift(e), e.keys && Yt(e.keys);
	}
	function Yt(e) {
		e.split(/(<(?:[CSMA]-)*\w+>|.)/i).forEach(function(e) {
			e && (i[e] || (i[e] = 0), i[e]++);
		});
	}
	function Xt(e) {
		e.split(/(<(?:[CSMA]-)*\w+>|.)/i).forEach(function(e) {
			i[e] && i[e]--;
		});
	}
	function Zt(e, t, n, r, i) {
		var a = {
			keys: e,
			type: t
		};
		for (var o in a[t] = n, a[t + "Args"] = r, i) a[o] = i[o];
		Jt(a);
	}
	E("insertModeEscKeysTimeout", 200, "number");
	function Qt(e, t, n, r) {
		var i = k.registerController.getRegister(r);
		if (r == ":") {
			i.keyBuffer[0] && W.processCommand(e, i.keyBuffer[0]), n.isPlaying = !1;
			return;
		}
		var a = i.keyBuffer, o = 0;
		n.isPlaying = !0, n.replaySearchQueries = i.searchQueries.slice(0);
		for (var s = 0; s < a.length; s++) for (var c = a[s], l, u, d = /<(?:[CSMA]-)*\w+>|./gi; l = d.exec(c);) if (u = l[0], A.handleKey(e, u, "macro"), t.insertMode) {
			var f = i.insertModeChanges[o++].changes;
			k.macroModeState.lastInsertModeChanges.changes = f, cn(e, f, 1), qt(e);
		}
		n.isPlaying = !1;
	}
	function $t(e, t) {
		if (!e.isPlaying) {
			var n = e.latestRegister, r = k.registerController.getRegister(n);
			r && r.pushText(t);
		}
	}
	function en(e) {
		if (!e.isPlaying) {
			var t = e.latestRegister, n = k.registerController.getRegister(t);
			n && n.pushInsertModeChanges && n.pushInsertModeChanges(e.lastInsertModeChanges);
		}
	}
	function tn(e, t) {
		if (!e.isPlaying) {
			var n = e.latestRegister, r = k.registerController.getRegister(n);
			r && r.pushSearchQuery && r.pushSearchQuery(t);
		}
	}
	function nn(e, t) {
		var n = k.macroModeState, r = n.lastInsertModeChanges;
		if (!n.isPlaying) for (var i = e.state.vim; t;) {
			if (r.expectCursorActivityForChange = !0, r.ignoreCount > 1) r.ignoreCount--;
			else if (t.origin == "+input" || t.origin == "paste" || t.origin === void 0) {
				var a = e.listSelections().length;
				a > 1 && (r.ignoreCount = a);
				var o = t.text.join("\n");
				if (r.maybeReset &&= (r.changes = [], !1), o) if (e.state.overwrite && !/\n/.test(o)) r.changes.push([o]);
				else {
					if (o.length > 1) {
						var s = i && i.insertEnd && i.insertEnd.find(), c = e.getCursor();
						if (s && s.line == c.line) {
							var l = s.ch - c.ch;
							l > 0 && l < o.length && (r.changes.push([o, l]), o = "");
						}
					}
					o && r.changes.push(o);
				}
			}
			t = t.next;
		}
	}
	function rn(e) {
		var t = e.state.vim;
		if (t.insertMode) {
			var n = k.macroModeState;
			if (n.isPlaying) return;
			var r = n.lastInsertModeChanges;
			r.expectCursorActivityForChange ? r.expectCursorActivityForChange = !1 : (r.maybeReset = !0, t.insertEnd && t.insertEnd.clear(), t.insertEnd = e.setBookmark(e.getCursor(), { insertLeft: !0 }));
		} else e.curOp?.isVimOp || an(e, t);
	}
	function an(t, n) {
		var r = t.getCursor("anchor"), i = t.getCursor("head");
		if (n.visualMode && !t.somethingSelected() ? Ye(t, !1) : !n.visualMode && !n.insertMode && t.somethingSelected() && (n.visualMode = !0, n.visualLine = !1, e.signal(t, "vim-mode-change", { mode: "visual" })), n.visualMode) {
			var a = z(i, r) ? 0 : -1, o = z(i, r) ? -1 : 0;
			i = I(i, 0, a), r = I(r, 0, o), n.sel = {
				anchor: r,
				head: i
			}, H(t, n, "<", B(i, r)), H(t, n, ">", Fe(i, r));
		} else n.insertMode || (n.lastHPos = t.getCursor().ch);
	}
	function on(t) {
		var n = k.macroModeState.lastInsertModeChanges, r = e.keyName ? e.keyName(t) : t.key;
		r && (r.indexOf("Delete") != -1 || r.indexOf("Backspace") != -1) && (n.maybeReset &&= (n.changes = [], !1), n.changes.push(new oe(r, t)));
	}
	function sn(e, t, n, r) {
		var i = k.macroModeState;
		i.isPlaying = !0;
		var a = t.lastEditActionCommand, o = t.inputState;
		function s() {
			a ? Ce.processAction(e, t, a) : Ce.evalInput(e, t);
		}
		function c(n) {
			if (i.lastInsertModeChanges.changes.length > 0) {
				n = t.lastEditActionCommand ? n : 1;
				var r = i.lastInsertModeChanges;
				cn(e, r.changes, n);
			}
		}
		if (t.inputState = t.lastEditInputState, a && a.interlaceInsertRepeat) for (var l = 0; l < n; l++) s(), c(1);
		else r || s(), c(n);
		t.inputState = o, t.insertMode && !r && qt(e), i.isPlaying = !1;
	}
	function G(t, n) {
		e.lookupKey(n, "vim-insert", function(n) {
			return typeof n == "string" ? e.commands[n](t) : n(t), !0;
		});
	}
	function cn(e, t, n) {
		var r = e.getCursor("head"), i = k.macroModeState.lastInsertModeChanges.visualBlock;
		i && (Ve(e, r, i + 1), n = e.listSelections().length, e.setCursor(r));
		for (var a = 0; a < n; a++) {
			i && e.setCursor(I(r, a, 0));
			for (var o = 0; o < t.length; o++) {
				var s = t[o];
				if (s instanceof oe) G(e, s.keyName);
				else if (typeof s == "string") e.replaceSelection(s);
				else {
					var c = e.getCursor(), l = I(c, 0, s[0].length - (s[1] || 0));
					e.replaceRange(s[0], c, s[1] ? c : l), e.setCursor(l);
				}
			}
		}
		i && e.setCursor(I(r, 0, 1));
	}
	function ln(e) {
		var t = new e.constructor();
		return Object.keys(e).forEach(function(n) {
			if (n != "insertEnd") {
				var r = e[n];
				Array.isArray(r) ? r = r.slice() : r && typeof r == "object" && r.constructor != Object && (r = ln(r)), t[n] = r;
			}
		}), e.sel && (t.sel = {
			head: e.sel.head && L(e.sel.head),
			anchor: e.sel.anchor && L(e.sel.anchor)
		}), t;
	}
	function un(e, t, n) {
		var r = ie(e), i = e, a = !1, r = A.maybeInitVimState_(i), o = r.visualBlock || r.wasInVisualBlock;
		if (i.state.closeVimNotification) {
			var s = i.state.closeVimNotification;
			if (i.state.closeVimNotification = null, s(), t == "<CR>") return N(i), !0;
		}
		var c = i.isInMultiSelectMode();
		if (r.wasInVisualBlock && !c ? r.wasInVisualBlock = !1 : c && r.visualBlock && (r.wasInVisualBlock = !0), t == "<Esc>" && !r.insertMode && !r.visualMode && c && r.status == "<Esc>") N(i);
		else if (o || !c || i.inVirtualSelectionMode) a = A.handleKey(i, t, n);
		else {
			var l = ln(r), u = r.inputState.changeQueueList || [];
			i.operation(function() {
				i.curOp && (i.curOp.isVimOp = !0);
				var e = 0;
				i.forEachSelection(function() {
					i.state.vim.inputState.changeQueue = u[e];
					var r = i.getCursor("head"), o = i.getCursor("anchor"), s = z(r, o) ? 0 : -1, c = z(r, o) ? -1 : 0;
					r = I(r, 0, s), o = I(o, 0, c), i.state.vim.sel.head = r, i.state.vim.sel.anchor = o, a = A.handleKey(i, t, n), i.virtualSelection && (u[e] = i.state.vim.inputState.changeQueue, i.state.vim = ln(l)), e++;
				}), i.curOp?.cursorActivity && !a && (i.curOp.cursorActivity = !1), i.state.vim = r, r.inputState.changeQueueList = u, r.inputState.changeQueue = null;
			}, !0);
		}
		return a && !r.visualMode && !r.insertMode && r.visualMode != i.somethingSelected() && an(i, r), a;
	}
	return ae(), A;
}
function q(e, t) {
	var n = t.ch, r = t.line + 1;
	r < 1 && (r = 1, n = 0), r > e.lines && (r = e.lines, n = Number.MAX_VALUE);
	var i = e.line(r);
	return Math.min(i.from + Math.max(0, n), i.to);
}
function ai(e, t) {
	let n = e.lineAt(t);
	return {
		line: n.number - 1,
		ch: t - n.from
	};
}
var oi = class {
	constructor(e, t) {
		this.line = e, this.ch = t;
	}
};
function si(e, t, n) {
	if (e.addEventListener) e.addEventListener(t, n, !1);
	else {
		var r = e._handlers ||= {};
		r[t] = (r[t] || []).concat(n);
	}
}
function ci(e, t, n) {
	if (e.removeEventListener) e.removeEventListener(t, n, !1);
	else {
		var r = e._handlers, i = r && r[t];
		if (i) {
			var a = i.indexOf(n);
			a > -1 && (r[t] = i.slice(0, a).concat(i.slice(a + 1)));
		}
	}
}
function li(e, t, ...n) {
	var r = e._handlers?.[t];
	if (r) for (var i = 0; i < r.length; ++i) r[i](...n);
}
function ui(e, ...t) {
	if (e) for (var n = 0; n < e.length; ++n) e[n](...t);
}
var di;
try {
	di = /* @__PURE__ */ RegExp("[\\w\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
	di = /[\w]/;
}
function fi(e, t) {
	var n = e.cm6;
	if (!n.state.readOnly) {
		var r = "input.type.compose";
		if (e.curOp && (e.curOp.lastChange || (r = "input.type.compose.start")), t.annotations) try {
			t.annotations.some(function(e) {
				e.value == "input" && (e.value = r);
			});
		} catch (e) {
			console.error(e);
		}
		else t.userEvent = r;
		return n.dispatch(t);
	}
}
function pi(e, t) {
	e.curOp && (e.curOp.$changeStart = void 0), (t ? Qt : $t)(e.cm6);
	let n = e.curOp?.$changeStart;
	n != null && e.cm6.dispatch({ selection: { anchor: n } });
}
var mi = {
	Left: (e) => ue(e.cm6, { key: "Left" }, "editor"),
	Right: (e) => ue(e.cm6, { key: "Right" }, "editor"),
	Up: (e) => ue(e.cm6, { key: "Up" }, "editor"),
	Down: (e) => ue(e.cm6, { key: "Down" }, "editor"),
	Backspace: (e) => ue(e.cm6, { key: "Backspace" }, "editor"),
	Delete: (e) => ue(e.cm6, { key: "Delete" }, "editor")
}, J = class e {
	openDialog(e, t, n) {
		return bi(this, e, t, n);
	}
	openNotification(e, t) {
		return _i(this, e, t);
	}
	constructor(e) {
		this.state = {}, this.marks = Object.create(null), this.$mid = 0, this.options = {}, this._handlers = {}, this.$lastChangeEndOffset = 0, this.virtualSelection = null, this.cm6 = e, this.onChange = this.onChange.bind(this), this.onSelectionChange = this.onSelectionChange.bind(this);
	}
	on(e, t) {
		si(this, e, t);
	}
	off(e, t) {
		ci(this, e, t);
	}
	signal(e, t, n) {
		li(this, e, t, n);
	}
	indexFromPos(e) {
		return q(this.cm6.state.doc, e);
	}
	posFromIndex(e) {
		return ai(this.cm6.state.doc, e);
	}
	foldCode(e) {
		let t = this.cm6, n = t.state.selection.ranges, r = this.cm6.state.doc, i = q(r, e), a = C.create([C.range(i, i)], 0).ranges;
		t.state.selection.ranges = a, x(t), t.state.selection.ranges = n;
	}
	firstLine() {
		return 0;
	}
	lastLine() {
		return this.cm6.state.doc.lines - 1;
	}
	lineCount() {
		return this.cm6.state.doc.lines;
	}
	setCursor(e, t) {
		typeof e == "object" && (t = e.ch, e = e.line);
		var n = q(this.cm6.state.doc, {
			line: e,
			ch: t || 0
		});
		this.cm6.dispatch({ selection: { anchor: n } }, { scrollIntoView: !this.curOp }), this.curOp && !this.curOp.isVimOp && this.onBeforeEndOperation();
	}
	getCursor(e) {
		var t = this.cm6.state.selection.main, n = e == "head" || !e ? t.head : e == "anchor" ? t.anchor : e == "start" ? t.from : e == "end" ? t.to : null;
		if (n == null) throw Error("Invalid cursor type");
		return this.posFromIndex(n);
	}
	listSelections() {
		var e = this.cm6.state.doc;
		return this.cm6.state.selection.ranges.map((t) => ({
			anchor: ai(e, t.anchor),
			head: ai(e, t.head)
		}));
	}
	setSelections(e, t) {
		var n = this.cm6.state.doc, r = e.map((e) => {
			var t = q(n, e.head), r = q(n, e.anchor);
			return t == r ? C.cursor(t, 1) : C.range(r, t);
		});
		this.cm6.dispatch({ selection: C.create(r, t) });
	}
	setSelection(e, t, n) {
		this.setSelections([{
			anchor: e,
			head: t
		}], 0), n && n.origin == "*mouse" && this.onBeforeEndOperation();
	}
	getLine(e) {
		var t = this.cm6.state.doc;
		return e < 0 || e >= t.lines ? "" : this.cm6.state.doc.line(e + 1).text;
	}
	getLineHandle(e) {
		return this.$lineHandleChanges ||= [], {
			row: e,
			index: this.indexFromPos(new oi(e, 0))
		};
	}
	getLineNumber(e) {
		var t = this.$lineHandleChanges;
		if (!t) return null;
		for (var n = e.index, r = 0; r < t.length; r++) if (n = t[r].changes.mapPos(n, 1, g.TrackAfter), n == null) return null;
		var i = this.posFromIndex(n);
		return i.ch == 0 ? i.line : null;
	}
	releaseLineHandles() {
		this.$lineHandleChanges = void 0;
	}
	getRange(e, t) {
		var n = this.cm6.state.doc;
		return this.cm6.state.sliceDoc(q(n, e), q(n, t));
	}
	replaceRange(e, t, n, r) {
		n ||= t;
		var i = this.cm6.state.doc, a = q(i, t), o = q(i, n);
		fi(this, { changes: {
			from: a,
			to: o,
			insert: e
		} });
	}
	replaceSelection(e) {
		fi(this, this.cm6.state.replaceSelection(e));
	}
	replaceSelections(e) {
		var t = this.cm6.state.selection.ranges.map((t, n) => ({
			from: t.from,
			to: t.to,
			insert: e[n] || ""
		}));
		fi(this, { changes: t });
	}
	getSelection() {
		return this.getSelections().join("\n");
	}
	getSelections() {
		var e = this.cm6;
		return e.state.selection.ranges.map((t) => e.state.sliceDoc(t.from, t.to));
	}
	somethingSelected() {
		return this.cm6.state.selection.ranges.some((e) => !e.empty);
	}
	getInputField() {
		return this.cm6.contentDOM;
	}
	clipPos(e) {
		var t = this.cm6.state.doc, n = e.ch, r = e.line + 1;
		r < 1 && (r = 1, n = 0), r > t.lines && (r = t.lines, n = Number.MAX_VALUE);
		var i = t.line(r);
		return n = Math.min(Math.max(0, n), i.to - i.from), new oi(r - 1, n);
	}
	getValue() {
		return this.cm6.state.doc.toString();
	}
	setValue(e) {
		var t = this.cm6;
		return t.dispatch({
			changes: {
				from: 0,
				to: t.state.doc.length,
				insert: e
			},
			selection: C.range(0, 0)
		});
	}
	focus() {
		return this.cm6.focus();
	}
	blur() {
		return this.cm6.contentDOM.blur();
	}
	defaultTextHeight() {
		return this.cm6.defaultLineHeight;
	}
	findMatchingBracket(e, t) {
		var n = this.cm6.state, r = q(n.doc, e), i = o(n, r + 1, -1);
		return i && i.end || (i = o(n, r, 1), i && i.end) ? { to: ai(n.doc, i.end.from) } : { to: void 0 };
	}
	scanForBracket(e, t, n, r) {
		return Ci(this, e, t, n, r);
	}
	indentLine(e, t) {
		t ? this.indentMore() : this.indentLess();
	}
	indentMore() {
		Qr(this.cm6);
	}
	indentLess() {
		$r(this.cm6);
	}
	execCommand(t) {
		if (t == "indentAuto") e.commands.indentAuto(this);
		else if (t == "goLineLeft") Bn(this.cm6);
		else if (t == "goLineRight") {
			zn(this.cm6);
			let e = this.cm6.state, t = e.selection.main.head;
			t < e.doc.length && e.sliceDoc(t, t + 1) !== "\n" && Cn(this.cm6);
		} else console.log(t + " is not implemented");
	}
	setBookmark(e, t) {
		var n = t?.insertLeft ? 1 : -1, r = this.indexFromPos(e);
		return new Di(this, r, n);
	}
	addOverlay({ query: e }) {
		let t = new Ze({
			regexp: !0,
			search: e.source,
			caseSensitive: !/i/.test(e.flags)
		});
		if (t.valid) {
			t.forVim = !0, this.cm6Query = t;
			let e = lt.of(t);
			return this.cm6.dispatch({ effects: e }), t;
		}
	}
	removeOverlay(e) {
		if (!this.cm6Query) return;
		this.cm6Query.forVim = !1;
		let t = lt.of(this.cm6Query);
		this.cm6.dispatch({ effects: t });
	}
	getSearchCursor(e, t) {
		var n = this, r = null, i = null, a = !1;
		t.ch ??= Number.MAX_VALUE;
		var o = q(n.cm6.state.doc, t), s = e.source.replace(/(\\.|{(?:\d+(?:,\d*)?|,\d+)})|[{}]/g, function(e, t) {
			return t || "\\" + e;
		});
		function c(t, n = 0, r = t.length) {
			return new R(t, s, { ignoreCase: e.ignoreCase }, n, r);
		}
		function l(e) {
			var t = n.cm6.state.doc;
			if (e > t.length) return null;
			let r = c(t, e).next();
			return r.done ? null : r.value;
		}
		var u = 1e4;
		function d(e, t) {
			var r = n.cm6.state.doc;
			for (let n = 1;; n++) {
				let i = Math.max(e, t - n * u), a = c(r, i, t), o = null;
				for (; !a.next().done;) o = a.value;
				if (o && (i == e || o.from > i + 10)) return o;
				if (i == e) return null;
			}
		}
		return {
			findNext: function() {
				return this.find(!1);
			},
			findPrevious: function() {
				return this.find(!0);
			},
			find: function(e) {
				var t = n.cm6.state.doc;
				return r = e ? d(0, r ? a ? r.to - 1 : r.from : o) : l(r ? a ? r.to + 1 : r.to : o), i = r && {
					from: ai(t, r.from),
					to: ai(t, r.to),
					match: r.match
				}, a = r ? r.from == r.to : !1, r && r.match;
			},
			from: function() {
				return i?.from;
			},
			to: function() {
				return i?.to;
			},
			replace: function(e) {
				r && (fi(n, { changes: {
					from: r.from,
					to: r.to,
					insert: e
				} }), r.to = r.from + e.length, i && (i.to = ai(n.cm6.state.doc, r.to)));
			},
			get match() {
				return i && i.match;
			}
		};
	}
	findPosV(e, t, n, r) {
		let { cm6: i } = this, a = i.state.doc, o = n == "page" ? i.dom.clientHeight : 0, s = q(a, e), c = C.cursor(s, 1, void 0, r), l = Math.round(Math.abs(t));
		for (let e = 0; e < l; e++) n == "page" ? c = i.moveVertically(c, t > 0, o) : n == "line" && (c = i.moveVertically(c, t > 0));
		let u = ai(a, c.head);
		return (t < 0 && c.head == 0 && r != 0 && e.line == 0 && e.ch != 0 || t > 0 && c.head == a.length && u.ch != r && e.line == u.line) && (u.hitSide = !0), u;
	}
	charCoords(e, t) {
		var n = this.cm6.contentDOM.getBoundingClientRect(), r = q(this.cm6.state.doc, e), i = this.cm6.coordsAtPos(r), a = -n.top;
		return {
			left: (i?.left || 0) - n.left,
			top: (i?.top || 0) + a,
			bottom: (i?.bottom || 0) + a
		};
	}
	coordsChar(e, t) {
		var n = this.cm6.contentDOM.getBoundingClientRect(), r = this.cm6.posAtCoords({
			x: e.left + n.left,
			y: e.top + n.top
		}) || 0;
		return ai(this.cm6.state.doc, r);
	}
	getScrollInfo() {
		var e = this.cm6.scrollDOM;
		return {
			left: e.scrollLeft,
			top: e.scrollTop,
			height: e.scrollHeight,
			width: e.scrollWidth,
			clientHeight: e.clientHeight,
			clientWidth: e.clientWidth
		};
	}
	scrollTo(e, t) {
		e != null && (this.cm6.scrollDOM.scrollLeft = e), t != null && (this.cm6.scrollDOM.scrollTop = t);
	}
	scrollIntoView(e, t) {
		if (e) {
			var n = this.indexFromPos(e);
			this.cm6.dispatch({ effects: v.scrollIntoView(n) });
		} else this.cm6.dispatch({
			scrollIntoView: !0,
			userEvent: "scroll"
		});
	}
	getWrapperElement() {
		return this.cm6.dom;
	}
	getMode() {
		return { name: this.getOption("mode") };
	}
	setSize(e, t) {
		this.cm6.dom.style.width = e + 4 + "px", this.cm6.dom.style.height = t + "px", this.refresh();
	}
	refresh() {
		this.cm6.measure();
	}
	destroy() {
		this.removeOverlay();
	}
	getLastEditEnd() {
		return this.posFromIndex(this.$lastChangeEndOffset);
	}
	onChange(e) {
		this.$lineHandleChanges && this.$lineHandleChanges.push(e);
		for (let t in this.marks) this.marks[t].update(e.changes);
		this.virtualSelection && (this.virtualSelection.ranges = this.virtualSelection.ranges.map((t) => t.map(e.changes)));
		var t = this.curOp = this.curOp || {};
		e.changes.iterChanges((e, n, r, i, a) => {
			(t.$changeStart == null || t.$changeStart > r) && (t.$changeStart = r), this.$lastChangeEndOffset = i;
			var o = { text: a.toJSON() };
			t.lastChange ? t.lastChange.next = t.lastChange = o : t.lastChange = t.change = o;
		}, !0), t.changeHandlers ||= this._handlers.change && this._handlers.change.slice();
	}
	onSelectionChange() {
		var e = this.curOp = this.curOp || {};
		e.cursorActivityHandlers ||= this._handlers.cursorActivity && this._handlers.cursorActivity.slice(), this.curOp.cursorActivity = !0;
	}
	operation(e, t) {
		this.curOp ||= { $d: 0 }, this.curOp.$d++;
		try {
			var n = e();
		} finally {
			this.curOp && (this.curOp.$d--, this.curOp.$d || this.onBeforeEndOperation());
		}
		return n;
	}
	onBeforeEndOperation() {
		var e = this.curOp, t = !1;
		e && (e.change && ui(e.changeHandlers, this, e.change), e && e.cursorActivity && (ui(e.cursorActivityHandlers, this, null), e.isVimOp && (t = !0)), this.curOp = null), t && this.scrollIntoView();
	}
	moveH(e, t) {
		if (t == "char") {
			var n = this.getCursor();
			this.setCursor(n.line, n.ch + e);
		}
	}
	setOption(e, t) {
		switch (e) {
			case "keyMap":
				this.state.keyMap = t;
				break;
			case "textwidth":
				this.state.textwidth = t;
				break;
		}
	}
	getOption(e) {
		switch (e) {
			case "firstLineNumber": return 1;
			case "tabSize": return this.cm6.state.tabSize || 4;
			case "readOnly": return this.cm6.state.readOnly;
			case "indentWithTabs": return this.cm6.state.facet(p) == "	";
			case "indentUnit": return this.cm6.state.facet(p).length || 2;
			case "textwidth": return this.state.textwidth;
			case "keyMap": return this.state.keyMap || "vim";
		}
	}
	toggleOverwrite(e) {
		this.state.overwrite = e;
	}
	getTokenTypeAt(e) {
		var t = this.indexFromPos(e), n = (k(this.cm6.state, t)?.resolve(t))?.type?.name || "";
		return /comment/i.test(n) ? "comment" : /string/i.test(n) ? "string" : "";
	}
	overWriteSelection(e) {
		var t = this.cm6.state.doc, n = this.cm6.state.selection, r = n.ranges.map((e) => {
			if (e.empty) {
				var n = e.to < t.length ? t.sliceString(e.from, e.to + 1) : "";
				if (n && !/\n/.test(n)) return C.range(e.from, e.to + 1);
			}
			return e;
		});
		this.cm6.dispatch({ selection: C.create(r, n.mainIndex) }), this.replaceSelection(e);
	}
	isInMultiSelectMode() {
		return this.cm6.state.selection.ranges.length > 1;
	}
	virtualSelectionMode() {
		return !!this.virtualSelection;
	}
	forEachSelection(e) {
		var t = this.cm6.state.selection;
		this.virtualSelection = C.create(t.ranges, t.mainIndex);
		for (var n = 0; n < this.virtualSelection.ranges.length; n++) {
			var r = this.virtualSelection.ranges[n];
			r && (this.cm6.dispatch({ selection: C.create([r]) }), e(), this.virtualSelection.ranges[n] = this.cm6.state.selection.ranges[0]);
		}
		this.cm6.dispatch({ selection: this.virtualSelection }), this.virtualSelection = null;
	}
	hardWrap(e) {
		return Oi(this, e);
	}
};
J.isMac = typeof navigator < "u" && /* @__PURE__ */ /Mac/.test(navigator.platform), J.Pos = oi, J.StringStream = be, J.commands = {
	cursorCharLeft: function(e) {
		xn(e.cm6);
	},
	redo: function(e) {
		pi(e, !1);
	},
	undo: function(e) {
		pi(e, !0);
	},
	newlineAndIndent: function(e) {
		qr({
			state: e.cm6.state,
			dispatch: (t) => fi(e, t)
		});
	},
	indentAuto: function(e) {
		Zr(e.cm6);
	},
	newlineAndIndentContinueComment: void 0,
	save: void 0
}, J.isWordChar = function(e) {
	return di.test(e);
}, J.keys = mi, J.addClass = function(e, t) {}, J.rmClass = function(e, t) {}, J.e_preventDefault = function(e) {
	e.preventDefault();
}, J.e_stop = function(e) {
	var t, n;
	(t = e?.stopPropagation) == null || t.call(e), (n = e?.preventDefault) == null || n.call(e);
}, J.lookupKey = function(e, t, n) {
	var r = J.keys[e];
	!r && /^Arrow/.test(e) && (r = J.keys[e.slice(5)]), r && n(r);
}, J.on = si, J.off = ci, J.signal = li, J.findMatchingTag = wi, J.findEnclosingTag = Ti, J.keyName = void 0;
function hi(e, t, n) {
	var r = document.createElement("div");
	return r.appendChild(t), r;
}
function gi(e, t) {
	e.state.currentNotificationClose && e.state.currentNotificationClose(), e.state.currentNotificationClose = t;
}
function _i(e, t, n) {
	gi(e, s);
	var r = hi(e, t, n && n.bottom), i = !1, a, o = n && n.duration !== void 0 ? n.duration : 5e3;
	function s() {
		i || (i = !0, clearTimeout(a), r.remove(), yi(e, r));
	}
	return r.onclick = function(e) {
		e.preventDefault(), s();
	}, vi(e, r), o && (a = setTimeout(s, o)), s;
}
function vi(e, t) {
	var n = e.state.dialog;
	e.state.dialog = t, t.style.flex = "1", t && n !== t && (n && n.contains(document.activeElement) && e.focus(), n && n.parentElement ? n.parentElement.replaceChild(t, n) : n && n.remove(), J.signal(e, "dialog"));
}
function yi(e, t) {
	e.state.dialog == t && (e.state.dialog = null, J.signal(e, "dialog"));
}
function bi(e, t, n, r) {
	r ||= {}, gi(e, void 0);
	var i = hi(e, t, r.bottom), a = !1;
	vi(e, i);
	function o(t) {
		if (typeof t == "string") s.value = t;
		else {
			if (a) return;
			a = !0, yi(e, i), e.state.dialog || e.focus(), r.onClose && r.onClose(i);
		}
	}
	var s = i.getElementsByTagName("input")[0];
	return s && (r.value && (s.value = r.value, r.selectValueOnOpen !== !1 && s.select()), r.onInput && J.on(s, "input", function(e) {
		r.onInput(e, s.value, o);
	}), r.onKeyUp && J.on(s, "keyup", function(e) {
		r.onKeyUp(e, s.value, o);
	}), J.on(s, "keydown", function(e) {
		r && r.onKeyDown && r.onKeyDown(e, s.value, o) || (e.keyCode == 13 && n && n(s.value), (e.keyCode == 27 || r.closeOnEnter !== !1 && e.keyCode == 13) && (s.blur(), J.e_stop(e), o()));
	}), r.closeOnBlur !== !1 && J.on(s, "blur", function() {
		setTimeout(function() {
			document.activeElement !== s && o();
		});
	}), s.focus()), o;
}
var xi = {
	"(": ")>",
	")": "(<",
	"[": "]>",
	"]": "[<",
	"{": "}>",
	"}": "{<",
	"<": ">>",
	">": "<<"
};
function Si(e) {
	return e && e.bracketRegex || /[(){}[\]]/;
}
function Ci(e, t, n, r, i) {
	for (var a = i && i.maxScanLineLength || 1e4, o = i && i.maxScanLines || 1e3, s = [], c = Si(i), l = n > 0 ? Math.min(t.line + o, e.lastLine() + 1) : Math.max(e.firstLine() - 1, t.line - o), u = t.line; u != l; u += n) {
		var d = e.getLine(u);
		if (d) {
			var f = n > 0 ? 0 : d.length - 1, p = n > 0 ? d.length : -1;
			if (!(d.length > a)) for (u == t.line && (f = t.ch - +(n < 0)); f != p; f += n) {
				var m = d.charAt(f);
				if (c.test(m)) {
					var h = xi[m];
					if (h && h.charAt(1) == ">" == n > 0) s.push(m);
					else if (s.length) s.pop();
					else return {
						pos: new oi(u, f),
						ch: m
					};
				}
			}
		}
	}
	return u - n == (n > 0 ? e.lastLine() : e.firstLine()) ? !1 : null;
}
function wi(e, t) {
	return null;
}
function Ti(e, t) {
	var n = e.cm6.state, r = e.indexFromPos(t);
	r < n.doc.length && n.sliceDoc(r, r + 1) == "<" && r++;
	for (var i = k(n, r)?.resolve(r) || null; i;) {
		if (i.firstChild?.type.name == "OpenTag" && i.lastChild?.type.name == "CloseTag") return {
			open: Ei(n.doc, i.firstChild),
			close: Ei(n.doc, i.lastChild)
		};
		i = i.parent;
	}
}
function Ei(e, t) {
	return {
		from: ai(e, t.from),
		to: ai(e, t.to)
	};
}
var Di = class {
	constructor(e, t, n) {
		this.cm = e, this.id = e.$mid++, this.offset = t, this.assoc = n, e.marks[this.id] = this;
	}
	clear() {
		delete this.cm.marks[this.id];
	}
	find() {
		return this.offset == null ? null : this.cm.posFromIndex(this.offset);
	}
	update(e) {
		this.offset != null && (this.offset = e.mapPos(this.offset, this.assoc, g.TrackDel));
	}
};
function Oi(e, t) {
	for (var n = t.column || e.getOption("textwidth") || 80, r = t.allowMerge != 0, i = Math.min(t.from, t.to), a = Math.max(t.from, t.to); i <= a;) {
		var o = e.getLine(i);
		if (o.length > n) {
			var s = p(o, n, 5);
			if (s) {
				var c = /^\s*/.exec(o)?.[0];
				e.replaceRange("\n" + c, new oi(i, s.start), new oi(i, s.end));
			}
			a++;
		} else if (r && /\S/.test(o) && i != a) {
			var l = e.getLine(i + 1);
			if (l && /\S/.test(l)) {
				var u = o.replace(/\s+$/, ""), d = l.replace(/^\s+/, ""), f = u + " " + d, s = p(f, n, 5);
				s && s.start > u.length || f.length < n ? (e.replaceRange(" ", new oi(i, u.length), new oi(i + 1, l.length - d.length)), i--, a--) : u.length < o.length && e.replaceRange("", new oi(i, u.length), new oi(i, o.length));
			}
		}
		i++;
	}
	return i;
	function p(e, t, n) {
		if (!(e.length < t)) {
			var r = e.slice(0, t), i = e.slice(t), a = /^(?:(\s+)|(\S+)(\s+))/.exec(i), o = /(?:(\s+)|(\s+)(\S+))$/.exec(r), s = 0, c = 0;
			if (o && !o[2] && (s = t - o[1].length, c = t), a && !a[2] && (s ||= t, c = t + a[1].length), s) return {
				start: s,
				end: c
			};
			if (o && o[2] && o.index > n) return {
				start: o.index,
				end: o.index + o[2].length
			};
			if (a && a[2]) return s = t + a[2].length, {
				start: s,
				end: s + a[3].length
			};
		}
	}
}
var ki = de || /* @__PURE__ */ function() {
	let e = { cursorBlinkRate: 1200 };
	return function() {
		return e;
	};
}(), Ai = class {
	constructor(e, t, n, r, i, a, o, s, c, l) {
		this.left = e, this.top = t, this.height = n, this.fontFamily = r, this.fontSize = i, this.fontWeight = a, this.color = o, this.className = s, this.letter = c, this.partial = l;
	}
	draw() {
		let e = document.createElement("div");
		return e.className = this.className, this.adjust(e), e;
	}
	adjust(e) {
		e.style.left = this.left + "px", e.style.top = this.top + "px", e.style.height = this.height + "px", e.style.lineHeight = this.height + "px", e.style.fontFamily = this.fontFamily, e.style.fontSize = this.fontSize, e.style.fontWeight = this.fontWeight, e.style.color = this.partial ? "transparent" : this.color, e.className = this.className, e.textContent = this.letter;
	}
	eq(e) {
		return this.left == e.left && this.top == e.top && this.height == e.height && this.fontFamily == e.fontFamily && this.fontSize == e.fontSize && this.fontWeight == e.fontWeight && this.color == e.color && this.className == e.className && this.letter == e.letter;
	}
}, ji = class {
	constructor(e, t) {
		this.view = e, this.rangePieces = [], this.cursors = [], this.cm = t, this.measureReq = {
			read: this.readPos.bind(this),
			write: this.drawSel.bind(this)
		}, this.cursorLayer = e.scrollDOM.appendChild(document.createElement("div")), this.cursorLayer.className = "cm-cursorLayer cm-vimCursorLayer", this.cursorLayer.setAttribute("aria-hidden", "true"), e.requestMeasure(this.measureReq), this.setBlinkRate();
	}
	setBlinkRate() {
		let e = ki(this.cm.cm6.state).cursorBlinkRate;
		this.cursorLayer.style.animationDuration = e + "ms";
	}
	update(e) {
		(e.selectionSet || e.geometryChanged || e.viewportChanged) && (this.view.requestMeasure(this.measureReq), this.cursorLayer.style.animationName = this.cursorLayer.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink"), Mi(e) && this.setBlinkRate();
	}
	scheduleRedraw() {
		this.view.requestMeasure(this.measureReq);
	}
	readPos() {
		let { state: e } = this.view, t = [];
		for (let n of e.selection.ranges) {
			let r = n == e.selection.main, i = Fi(this.cm, this.view, n, r);
			i && t.push(i);
		}
		return { cursors: t };
	}
	drawSel({ cursors: e }) {
		if (e.length != this.cursors.length || e.some((e, t) => !e.eq(this.cursors[t]))) {
			let t = this.cursorLayer.children;
			if (t.length !== e.length) {
				this.cursorLayer.textContent = "";
				for (let t of e) this.cursorLayer.appendChild(t.draw());
			} else e.forEach((e, n) => e.adjust(t[n]));
			this.cursors = e;
		}
	}
	destroy() {
		this.cursorLayer.remove();
	}
};
function Mi(e) {
	return ki(e.startState) != ki(e.state);
}
var Ni = /* @__PURE__ */ he.highest(/* @__PURE__ */ v.theme({
	".cm-vimMode .cm-line": {
		"& ::selection": { backgroundColor: "transparent !important" },
		"&::selection": { backgroundColor: "transparent !important" },
		caretColor: "transparent !important"
	},
	".cm-fat-cursor": {
		position: "absolute",
		background: "#ff9696",
		border: "none",
		whiteSpace: "pre"
	},
	"&:not(.cm-focused) .cm-fat-cursor": {
		background: "none",
		outline: "solid 1px #ff9696",
		color: "transparent !important"
	}
}));
function Pi(e) {
	let t = e.scrollDOM.getBoundingClientRect();
	return {
		left: (e.textDirection == O.LTR ? t.left : t.right - e.scrollDOM.clientWidth) - e.scrollDOM.scrollLeft * e.scaleX,
		top: t.top - e.scrollDOM.scrollTop * e.scaleY
	};
}
function Fi(e, t, n, r) {
	var i;
	let a = n.head, o = !1, s = 1, c = e.state.vim;
	if (c && (!c.insertMode || e.state.overwrite)) {
		if (o = !0, c.visualBlock && !r) return null;
		n.anchor < n.head && (a < t.state.doc.length && t.state.sliceDoc(a, a + 1)) != "\n" && a--, e.state.overwrite ? s = .2 : c.status && (s = .5);
	}
	if (o) {
		let e = a < t.state.doc.length && t.state.sliceDoc(a, a + 1);
		e && /[\uDC00-\uDFFF]/.test(e) && a > 1 && (a--, e = t.state.sliceDoc(a, a + 1));
		let n = t.coordsAtPos(a, 1);
		if (!n) return null;
		let o = Pi(t), c = t.domAtPos(a), u = c ? c.node : t.contentDOM;
		for (u instanceof Text && c.offset >= u.data.length && u.parentElement?.nextSibling && (u = u.parentElement?.nextSibling, c = {
			node: u,
			offset: 0
		}); c && c.node instanceof HTMLElement;) u = c.node, c = {
			node: c.node.childNodes[c.offset],
			offset: 0
		};
		if (!(u instanceof HTMLElement)) {
			if (!u.parentNode) return null;
			u = u.parentNode;
		}
		let d = getComputedStyle(u), f = n.left, p = (i = t).coordsForChar?.call(i, a);
		if (p && (f = p.left), !e || e == "\n" || e == "\r") e = "\xA0";
		else if (e == "	") {
			e = "\xA0";
			var l = t.coordsAtPos(a + 1, -1);
			l && (f = l.left - (l.left - n.left) / parseInt(d.tabSize));
		} else /[\uD800-\uDBFF]/.test(e) && a < t.state.doc.length - 1 && (e += t.state.sliceDoc(a + 1, a + 2));
		let m = n.bottom - n.top;
		return new Ai((f - o.left) / t.scaleX, (n.top - o.top + m * (1 - s)) / t.scaleY, m * s / t.scaleY, d.fontFamily, d.fontSize, d.fontWeight, d.color, r ? "cm-fat-cursor cm-cursor-primary" : "cm-fat-cursor cm-cursor-secondary", e, s != 1);
	} else return null;
}
var Ii = typeof navigator < "u" && /* @__PURE__ */ /linux/i.test(navigator.platform) && /* @__PURE__ */ / Gecko\/\d+/.exec(navigator.userAgent), Y = /* @__PURE__ */ ii(J), Li = 250, Ri = /* @__PURE__ */ v.baseTheme({
	".cm-vimMode .cm-cursorLayer:not(.cm-vimCursorLayer)": { display: "none" },
	".cm-vim-panel": {
		padding: "0px 10px",
		fontFamily: "monospace",
		minHeight: "1.3em",
		display: "flex"
	},
	".cm-vim-panel input": {
		border: "none",
		outline: "none",
		backgroundColor: "inherit"
	},
	"&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
	"&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" }
}), zi = /* @__PURE__ */ e.fromClass(class {
	constructor(e) {
		this.status = "", this.query = null, this.decorations = D.none, this.waitForCopy = !1, this.lastKeydown = "", this.useNextTextInput = !1, this.compositionText = "", this.view = e;
		let t = this.cm = new J(e);
		Y.enterVimMode(this.cm), this.view.cm = this.cm, this.cm.state.vimPlugin = this, this.blockCursor = new ji(e, t), this.updateClass(), this.cm.on("vim-command-done", () => {
			t.state.vim && (t.state.vim.status = ""), this.blockCursor.scheduleRedraw(), this.updateStatus();
		}), this.cm.on("vim-mode-change", (e) => {
			t.state.vim && (t.state.vim.mode = e.mode, e.subMode && (t.state.vim.mode += " block"), t.state.vim.status = "", this.blockCursor.scheduleRedraw(), this.updateClass(), this.updateStatus());
		}), this.cm.on("dialog", () => {
			this.cm.state.statusbar ? this.updateStatus() : e.dispatch({ effects: Hi.of(!!this.cm.state.dialog) });
		}), this.dom = document.createElement("span"), this.spacer = document.createElement("span"), this.spacer.style.flex = "1", this.statusButton = document.createElement("span"), this.statusButton.onclick = (e) => {
			Y.handleKey(this.cm, "<Esc>", "user"), this.cm.focus();
		}, this.statusButton.style.cssText = "cursor: pointer";
	}
	update(e) {
		if ((e.viewportChanged || e.docChanged) && this.query && this.highlight(this.query), e.docChanged && this.cm.onChange(e), e.selectionSet && this.cm.onSelectionChange(), e.viewportChanged, this.cm.curOp && !this.cm.curOp.isVimOp && this.cm.onBeforeEndOperation(), e.transactions) {
			for (let t of e.transactions) for (let e of t.effects) if (e.is(lt)) if (!e.value?.forVim) this.highlight(null);
			else {
				let t = e.value.create();
				this.highlight(t);
			}
		}
		this.blockCursor.update(e);
	}
	updateClass() {
		let e = this.cm.state;
		!e.vim || e.vim.insertMode && !e.overwrite ? this.view.scrollDOM.classList.remove("cm-vimMode") : this.view.scrollDOM.classList.add("cm-vimMode");
	}
	updateStatus() {
		let e = this.cm.state.statusbar, t = this.cm.state.vim;
		if (!e || !t) return;
		let n = this.cm.state.dialog;
		if (n) n.parentElement != e && (e.textContent = "", e.appendChild(n));
		else {
			e.textContent = "";
			var r = (t.mode || "normal").toUpperCase();
			t.insertModeReturn && (r += "(C-O)"), this.statusButton.textContent = `--${r}--`, e.appendChild(this.statusButton), e.appendChild(this.spacer);
		}
		this.dom.textContent = t.status, e.appendChild(this.dom);
	}
	destroy() {
		Y.leaveVimMode(this.cm), this.updateClass(), this.blockCursor.destroy(), delete this.view.cm;
	}
	highlight(e) {
		if (this.query = e, !e) return this.decorations = D.none;
		let { view: t } = this, n = new pe();
		for (let r = 0, i = t.visibleRanges, a = i.length; r < a; r++) {
			let { from: o, to: s } = i[r];
			for (; r < a - 1 && s > i[r + 1].from - 2 * Li;) s = i[++r].to;
			e.highlight(t.state, o, s, (e, t) => {
				n.add(e, t, Vi);
			});
		}
		return this.decorations = n.finish();
	}
	handleKey(e, t) {
		let n = this.cm, r = n.state.vim;
		if (!r) return;
		let i = Y.vimKeyFromEvent(e, r);
		if (J.signal(this.cm, "inputEvent", {
			type: "handleKey",
			key: i
		}), !i) return;
		if (i == "<Esc>" && !r.insertMode && !r.visualMode && this.query) {
			let e = r.searchState_;
			e && (n.removeOverlay(e.getOverlay()), e.setOverlay(null));
		}
		if (i === "<C-c>" && !J.isMac && n.somethingSelected()) return this.waitForCopy = !0, !0;
		r.status = (r.status || "") + i;
		let a = Y.multiSelectHandleKey(n, i, "user");
		return r = Y.maybeInitVimState_(n), !a && r.insertMode && n.state.overwrite && (e.key && e.key.length == 1 && !/\n/.test(e.key) ? (a = !0, n.overWriteSelection(e.key)) : e.key == "Backspace" && (a = !0, J.commands.cursorCharLeft(n))), a && (J.signal(this.cm, "vim-keypress", i), e.preventDefault(), e.stopPropagation(), this.blockCursor.scheduleRedraw()), this.updateStatus(), !!a;
	}
}, {
	eventHandlers: {
		copy: function(e, t) {
			this.waitForCopy && (this.waitForCopy = !1, Promise.resolve().then(() => {
				var e = this.cm, t = e.state.vim;
				t && (t.insertMode ? e.setSelection(e.getCursor(), e.getCursor()) : e.operation(() => {
					e.curOp && (e.curOp.isVimOp = !0), Y.handleKey(e, "<Esc>", "user");
				}));
			}));
		},
		compositionstart: function(e, t) {
			this.useNextTextInput = !0, J.signal(this.cm, "inputEvent", e);
		},
		compositionupdate: function(e, t) {
			J.signal(this.cm, "inputEvent", e);
		},
		compositionend: function(e, t) {
			J.signal(this.cm, "inputEvent", e);
		},
		keypress: function(e, t) {
			J.signal(this.cm, "inputEvent", e), this.lastKeydown == "Dead" && this.handleKey(e, t);
		},
		keydown: function(e, t) {
			J.signal(this.cm, "inputEvent", e), this.lastKeydown = e.key, this.lastKeydown == "Unidentified" || this.lastKeydown == "Process" || this.lastKeydown == "Dead" ? this.useNextTextInput = !0 : (this.useNextTextInput = !1, this.handleKey(e, t));
		}
	},
	provide: () => [v.inputHandler.of((e, t, n, r) => {
		var i = qi(e);
		if (!i) return !1;
		var a = i.state?.vim, o = i.state.vimPlugin;
		if (a && !a.insertMode && !i.curOp?.isVimOp) {
			if (r === "\0\0") return !0;
			if (J.signal(i, "inputEvent", {
				type: "text",
				text: r,
				from: t,
				to: n
			}), r.length == 1 && o.useNextTextInput) {
				if (a.expectLiteralNext && e.composing) return o.compositionText = r, !1;
				if (o.compositionText) {
					var s = o.compositionText;
					o.compositionText = "";
					var c = e.state.selection.main.head;
					if (s === e.state.sliceDoc(c - s.length, c)) {
						var l = i.getCursor();
						i.replaceRange("", i.posFromIndex(c - s.length), l);
					}
				}
				return o.handleKey({
					key: r,
					preventDefault: () => {},
					stopPropagation: () => {}
				}), Bi(e), !0;
			}
		}
		return !1;
	})],
	decorations: (e) => e.decorations
});
function Bi(e) {
	var t = e.scrollDOM.parentElement;
	if (t) {
		if (Ii) {
			e.contentDOM.textContent = "\0\0", e.contentDOM.dispatchEvent(new CustomEvent("compositionend"));
			return;
		}
		var n = e.scrollDOM.nextSibling, r = window.getSelection(), i = r && {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		};
		e.scrollDOM.remove(), t.insertBefore(e.scrollDOM, n);
		try {
			i && r && (r.setPosition(i.anchorNode, i.anchorOffset), i.focusNode && r.extend(i.focusNode, i.focusOffset));
		} catch (e) {
			console.error(e);
		}
		e.focus(), e.contentDOM.dispatchEvent(new CustomEvent("compositionend"));
	}
}
var Vi = /* @__PURE__ */ D.mark({ class: "cm-searchMatch" }), Hi = /* @__PURE__ */ m.define(), Ui = /* @__PURE__ */ _.define({
	create: () => !1,
	update(e, t) {
		for (let n of t.effects) n.is(Hi) && (e = n.value);
		return e;
	},
	provide: (e) => ne.from(e, (e) => e ? Wi : null)
});
function Wi(e) {
	let t = document.createElement("div");
	t.className = "cm-vim-panel";
	let n = e.cm;
	return n.state.dialog && t.appendChild(n.state.dialog), {
		top: !1,
		dom: t
	};
}
function Gi(e) {
	let t = document.createElement("div");
	t.className = "cm-vim-panel";
	let n = e.cm;
	return n.state.statusbar = t, n.state.vimPlugin.updateStatus(), { dom: t };
}
function Ki(e = {}) {
	return [
		Ri,
		zi,
		Ni,
		e.status ? ne.of(Gi) : Ui
	];
}
function qi(e) {
	return e.cm || null;
}
//#endregion
//#region node_modules/@codemirror/language-data/dist/index.js
function X(e) {
	return new we(ce.define(e));
}
function Ji(e) {
	return import("./dist-BAGwuVHZ.js").then((t) => t.sql({ dialect: t[e] }));
}
var Yi = [
	/* @__PURE__ */ M.of({
		name: "C",
		extensions: [
			"c",
			"h",
			"ino"
		],
		load() {
			return import("./dist-BvgxJFSi.js").then((e) => e.cpp());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "C++",
		alias: ["cpp"],
		extensions: [
			"cpp",
			"c++",
			"cc",
			"cxx",
			"hpp",
			"h++",
			"hh",
			"hxx"
		],
		load() {
			return import("./dist-BvgxJFSi.js").then((e) => e.cpp());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "CQL",
		alias: ["cassandra"],
		extensions: ["cql"],
		load() {
			return Ji("Cassandra");
		}
	}),
	/* @__PURE__ */ M.of({
		name: "CSS",
		extensions: ["css"],
		load() {
			return import("./dist-CRgIQ-6c.js").then((e) => e.i).then((e) => e.css());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Go",
		extensions: ["go"],
		load() {
			return import("./dist-BglWUZ1s.js").then((e) => e.go());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "HTML",
		alias: ["xhtml"],
		extensions: [
			"html",
			"htm",
			"handlebars",
			"hbs"
		],
		load() {
			return import("./dist-vWw5T2gM.js").then((e) => e.t).then((e) => e.html());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Java",
		extensions: ["java"],
		load() {
			return import("./dist-ndiCxR9U.js").then((e) => e.java());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "JavaScript",
		alias: [
			"ecmascript",
			"js",
			"node"
		],
		extensions: [
			"js",
			"mjs",
			"cjs"
		],
		load() {
			return import("./dist-DXJvOlIy.js").then((e) => e.t).then((e) => e.javascript());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Jinja",
		extensions: [
			"j2",
			"jinja",
			"jinja2"
		],
		load() {
			return import("./dist-3cPvdrue.js").then((e) => e.jinja());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "JSON",
		alias: ["json5"],
		extensions: ["json", "map"],
		load() {
			return import("./dist-D26YqCd5.js").then((e) => e.json());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "JSX",
		extensions: ["jsx"],
		load() {
			return import("./dist-DXJvOlIy.js").then((e) => e.t).then((e) => e.javascript({ jsx: !0 }));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "LESS",
		extensions: ["less"],
		load() {
			return import("./dist-xTnKw8dg.js").then((e) => e.less());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Liquid",
		extensions: ["liquid"],
		load() {
			return import("./dist-BIzFn0ba.js").then((e) => e.liquid());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "MariaDB SQL",
		load() {
			return Ji("MariaSQL");
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Markdown",
		extensions: [
			"md",
			"markdown",
			"mkd"
		],
		load() {
			return import("./dist-C4f5DzeA.js").then((e) => e.t).then((e) => e.markdown());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "MS SQL",
		load() {
			return Ji("MSSQL");
		}
	}),
	/* @__PURE__ */ M.of({
		name: "MySQL",
		load() {
			return Ji("MySQL");
		}
	}),
	/* @__PURE__ */ M.of({
		name: "PHP",
		extensions: [
			"php",
			"php3",
			"php4",
			"php5",
			"php7",
			"phtml"
		],
		load() {
			return import("./dist-SyUTRAEc.js").then((e) => e.php());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "PLSQL",
		extensions: ["pls"],
		load() {
			return Ji("PLSQL");
		}
	}),
	/* @__PURE__ */ M.of({
		name: "PostgreSQL",
		load() {
			return Ji("PostgreSQL");
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Python",
		extensions: [
			"BUILD",
			"bzl",
			"py",
			"pyw"
		],
		filename: /^(BUCK|BUILD)$/,
		load() {
			return import("./dist-DHiOvpma.js").then((e) => e.python());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Rust",
		extensions: ["rs"],
		load() {
			return import("./dist-BVhgY_rW.js").then((e) => e.rust());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Sass",
		extensions: ["sass"],
		load() {
			return import("./dist-Dc5JS0hj.js").then((e) => e.sass({ indented: !0 }));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "SCSS",
		extensions: ["scss"],
		load() {
			return import("./dist-Dc5JS0hj.js").then((e) => e.sass());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "SQL",
		extensions: ["sql"],
		load() {
			return Ji("StandardSQL");
		}
	}),
	/* @__PURE__ */ M.of({
		name: "SQLite",
		load() {
			return Ji("SQLite");
		}
	}),
	/* @__PURE__ */ M.of({
		name: "TSX",
		extensions: ["tsx"],
		load() {
			return import("./dist-DXJvOlIy.js").then((e) => e.t).then((e) => e.javascript({
				jsx: !0,
				typescript: !0
			}));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "TypeScript",
		alias: ["ts"],
		extensions: [
			"ts",
			"mts",
			"cts"
		],
		load() {
			return import("./dist-DXJvOlIy.js").then((e) => e.t).then((e) => e.javascript({ typescript: !0 }));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "WebAssembly",
		extensions: ["wat", "wast"],
		load() {
			return import("./dist-B9oId31z.js").then((e) => e.wast());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "XML",
		alias: [
			"rss",
			"wsdl",
			"xsd"
		],
		extensions: [
			"xml",
			"xsl",
			"xsd",
			"svg"
		],
		load() {
			return import("./dist-DY8u_ySH.js").then((e) => e.xml());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "YAML",
		alias: ["yml"],
		extensions: ["yaml", "yml"],
		load() {
			return import("./dist-CS1ZpsQJ.js").then((e) => e.yaml());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "APL",
		extensions: ["dyalog", "apl"],
		load() {
			return import("./apl-DDiu7opd.js").then((e) => X(e.apl));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "PGP",
		alias: ["asciiarmor"],
		extensions: [
			"asc",
			"pgp",
			"sig"
		],
		load() {
			return import("./asciiarmor-CIMIPOjI.js").then((e) => X(e.asciiArmor));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "ASN.1",
		extensions: ["asn", "asn1"],
		load() {
			return import("./asn1-RqwryRRj.js").then((e) => X(e.asn1({})));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Asterisk",
		filename: /^extensions\.conf$/i,
		load() {
			return import("./asterisk-BbNj4rRL.js").then((e) => X(e.asterisk));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Brainfuck",
		extensions: ["b", "bf"],
		load() {
			return import("./brainfuck-DbCW0rY6.js").then((e) => X(e.brainfuck));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Cobol",
		extensions: ["cob", "cpy"],
		load() {
			return import("./cobol-De7jV7cN.js").then((e) => X(e.cobol));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "C#",
		alias: ["csharp", "cs"],
		extensions: ["cs"],
		load() {
			return import("./clike-BRfujg7B.js").then((e) => X(e.csharp));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Clojure",
		extensions: [
			"clj",
			"cljc",
			"cljx"
		],
		load() {
			return import("./clojure-DfM6xOPb.js").then((e) => X(e.clojure));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "ClojureScript",
		extensions: ["cljs"],
		load() {
			return import("./clojure-DfM6xOPb.js").then((e) => X(e.clojure));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Closure Stylesheets (GSS)",
		extensions: ["gss"],
		load() {
			return import("./css-B8WhNyQF.js").then((e) => X(e.gss));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "CMake",
		extensions: ["cmake", "cmake.in"],
		filename: /^CMakeLists\.txt$/,
		load() {
			return import("./cmake-F0GxnU8h.js").then((e) => X(e.cmake));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "CoffeeScript",
		alias: ["coffee", "coffee-script"],
		extensions: ["coffee"],
		load() {
			return import("./coffeescript-Bo_-E1Fn.js").then((e) => X(e.coffeeScript));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Common Lisp",
		alias: ["lisp"],
		extensions: [
			"cl",
			"lisp",
			"el"
		],
		load() {
			return import("./commonlisp-DpjtM-vQ.js").then((e) => X(e.commonLisp));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Cypher",
		extensions: ["cyp", "cypher"],
		load() {
			return import("./cypher-U-Hy2qy1.js").then((e) => X(e.cypher));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Cython",
		extensions: [
			"pyx",
			"pxd",
			"pxi"
		],
		load() {
			return import("./python-B2ksBFAV.js").then((e) => X(e.cython));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Crystal",
		extensions: ["cr"],
		load() {
			return import("./crystal-CyHO8Aq3.js").then((e) => X(e.crystal));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "D",
		extensions: ["d"],
		load() {
			return import("./d-DmPVrjyh.js").then((e) => X(e.d));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Dart",
		extensions: ["dart"],
		load() {
			return import("./clike-BRfujg7B.js").then((e) => X(e.dart));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "diff",
		extensions: ["diff", "patch"],
		load() {
			return import("./diff-CRfiGSsr.js").then((e) => X(e.diff));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Dockerfile",
		filename: /^Dockerfile$/,
		load() {
			return import("./dockerfile-DoslQzSE.js").then((e) => X(e.dockerFile));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "DTD",
		extensions: ["dtd"],
		load() {
			return import("./dtd-Ds_rNh4D.js").then((e) => X(e.dtd));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Dylan",
		extensions: [
			"dylan",
			"dyl",
			"intr"
		],
		load() {
			return import("./dylan-rZK1r6tb.js").then((e) => X(e.dylan));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "EBNF",
		load() {
			return import("./ebnf-C_q-ydwh.js").then((e) => X(e.ebnf));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "ECL",
		extensions: ["ecl"],
		load() {
			return import("./ecl-DlikNOCl.js").then((e) => X(e.ecl));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "edn",
		extensions: ["edn"],
		load() {
			return import("./clojure-DfM6xOPb.js").then((e) => X(e.clojure));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Eiffel",
		extensions: ["e"],
		load() {
			return import("./eiffel-D_zr4F-I.js").then((e) => X(e.eiffel));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Elm",
		extensions: ["elm"],
		load() {
			return import("./elm-CndGgOQz.js").then((e) => X(e.elm));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Erlang",
		extensions: ["erl"],
		load() {
			return import("./erlang-DwDTiYaD.js").then((e) => X(e.erlang));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Esper",
		load() {
			return import("./sql-DeJ-YETY.js").then((e) => X(e.esper));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Factor",
		extensions: ["factor"],
		load() {
			return import("./factor-Dca7rzuK.js").then((e) => X(e.factor));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "FCL",
		load() {
			return import("./fcl-BdLoe1w9.js").then((e) => X(e.fcl));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Forth",
		extensions: [
			"forth",
			"fth",
			"4th"
		],
		load() {
			return import("./forth-TgYFnPi2.js").then((e) => X(e.forth));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Fortran",
		extensions: [
			"f",
			"for",
			"f77",
			"f90",
			"f95"
		],
		load() {
			return import("./fortran-D6JDl-Uu.js").then((e) => X(e.fortran));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "F#",
		alias: ["fsharp"],
		extensions: ["fs"],
		load() {
			return import("./mllike-D1TI_A98.js").then((e) => X(e.fSharp));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Gas",
		extensions: ["s"],
		load() {
			return import("./gas-DjTCvf7i.js").then((e) => X(e.gas));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Gherkin",
		extensions: ["feature"],
		load() {
			return import("./gherkin-Cg-56M4k.js").then((e) => X(e.gherkin));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Groovy",
		extensions: ["groovy", "gradle"],
		filename: /^Jenkinsfile$/,
		load() {
			return import("./groovy-Cc8tNndJ.js").then((e) => X(e.groovy));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Haskell",
		extensions: ["hs"],
		load() {
			return import("./haskell-CWYrKtyv.js").then((e) => X(e.haskell));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Haxe",
		extensions: ["hx"],
		load() {
			return import("./haxe-ByNy2nVM.js").then((e) => X(e.haxe));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "HXML",
		extensions: ["hxml"],
		load() {
			return import("./haxe-ByNy2nVM.js").then((e) => X(e.hxml));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "HTTP",
		load() {
			return import("./http-DBqPXUwx.js").then((e) => X(e.http));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "IDL",
		extensions: ["pro"],
		load() {
			return import("./idl-DQxkZCeY.js").then((e) => X(e.idl));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "JSON-LD",
		alias: ["jsonld"],
		extensions: ["jsonld"],
		load() {
			return import("./javascript-CkVIuUyP.js").then((e) => X(e.jsonld));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Julia",
		extensions: ["jl"],
		load() {
			return import("./julia-3UyNYdID.js").then((e) => X(e.julia));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Kotlin",
		extensions: ["kt", "kts"],
		load() {
			return import("./clike-BRfujg7B.js").then((e) => X(e.kotlin));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "LiveScript",
		alias: ["ls"],
		extensions: ["ls"],
		load() {
			return import("./livescript-Y5yIT8gp.js").then((e) => X(e.liveScript));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Lua",
		extensions: ["lua"],
		load() {
			return import("./lua-CECMVgo8.js").then((e) => X(e.lua));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "mIRC",
		extensions: ["mrc"],
		load() {
			return import("./mirc-Cp0tJODu.js").then((e) => X(e.mirc));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Mathematica",
		extensions: [
			"m",
			"nb",
			"wl",
			"wls"
		],
		load() {
			return import("./mathematica-DklBJqU6.js").then((e) => X(e.mathematica));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Modelica",
		extensions: ["mo"],
		load() {
			return import("./modelica-8nTvKWqp.js").then((e) => X(e.modelica));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "MUMPS",
		extensions: ["mps"],
		load() {
			return import("./mumps-DyH7EJvi.js").then((e) => X(e.mumps));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Mbox",
		extensions: ["mbox"],
		load() {
			return import("./mbox-DyXrZYlP.js").then((e) => X(e.mbox));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Nginx",
		filename: /nginx.*\.conf$/i,
		load() {
			return import("./nginx-DXLc35H4.js").then((e) => X(e.nginx));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "NSIS",
		extensions: ["nsh", "nsi"],
		load() {
			return import("./nsis-DT9qtSHL.js").then((e) => X(e.nsis));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "NTriples",
		extensions: ["nt", "nq"],
		load() {
			return import("./ntriples-BeX8aG14.js").then((e) => X(e.ntriples));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Objective-C",
		alias: ["objective-c", "objc"],
		extensions: ["m"],
		load() {
			return import("./clike-BRfujg7B.js").then((e) => X(e.objectiveC));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Objective-C++",
		alias: ["objective-c++", "objc++"],
		extensions: ["mm"],
		load() {
			return import("./clike-BRfujg7B.js").then((e) => X(e.objectiveCpp));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "OCaml",
		extensions: [
			"ml",
			"mli",
			"mll",
			"mly"
		],
		load() {
			return import("./mllike-D1TI_A98.js").then((e) => X(e.oCaml));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Octave",
		extensions: ["m"],
		load() {
			return import("./octave-DKFfk8IT.js").then((e) => X(e.octave));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Oz",
		extensions: ["oz"],
		load() {
			return import("./oz-B2OGpBfL.js").then((e) => X(e.oz));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Pascal",
		extensions: ["p", "pas"],
		load() {
			return import("./pascal-BaiLzK2F.js").then((e) => X(e.pascal));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Perl",
		extensions: ["pl", "pm"],
		load() {
			return import("./perl-DS7J5Exo.js").then((e) => X(e.perl));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Pig",
		extensions: ["pig"],
		load() {
			return import("./pig-Dz9DIpW1.js").then((e) => X(e.pig));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "PowerShell",
		extensions: [
			"ps1",
			"psd1",
			"psm1"
		],
		load() {
			return import("./powershell-DKcjRkmh.js").then((e) => X(e.powerShell));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Properties files",
		alias: ["ini", "properties"],
		extensions: [
			"properties",
			"ini",
			"in"
		],
		load() {
			return import("./properties-D4CCnkhx.js").then((e) => X(e.properties));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "ProtoBuf",
		extensions: ["proto"],
		load() {
			return import("./protobuf-DxdMJAcE.js").then((e) => X(e.protobuf));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Pug",
		alias: ["jade"],
		extensions: ["pug", "jade"],
		load() {
			return import("./pug-DnYYgLTd.js").then((e) => X(e.pug));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Puppet",
		extensions: ["pp"],
		load() {
			return import("./puppet-BeRaqTGi.js").then((e) => X(e.puppet));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Q",
		extensions: ["q"],
		load() {
			return import("./q-CQAFm9wr.js").then((e) => X(e.q));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "R",
		alias: ["rscript"],
		extensions: ["r", "R"],
		load() {
			return import("./r-TuJk497E.js").then((e) => X(e.r));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "RPM Changes",
		load() {
			return import("./rpm-CXcOeVj_.js").then((e) => X(e.rpmChanges));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "RPM Spec",
		extensions: ["spec"],
		load() {
			return import("./rpm-CXcOeVj_.js").then((e) => X(e.rpmSpec));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Ruby",
		alias: [
			"jruby",
			"macruby",
			"rake",
			"rb",
			"rbx"
		],
		extensions: ["rb"],
		filename: /^(Gemfile|Rakefile)$/,
		load() {
			return import("./ruby-CnwrpymU.js").then((e) => X(e.ruby));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "SAS",
		extensions: ["sas"],
		load() {
			return import("./sas-Bx0PAjtX.js").then((e) => X(e.sas));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Scala",
		extensions: ["scala"],
		load() {
			return import("./clike-BRfujg7B.js").then((e) => X(e.scala));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Scheme",
		extensions: ["scm", "ss"],
		load() {
			return import("./scheme-CXsEPq9n.js").then((e) => X(e.scheme));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Shell",
		alias: [
			"bash",
			"sh",
			"zsh"
		],
		extensions: [
			"sh",
			"ksh",
			"bash"
		],
		filename: /^PKGBUILD$/,
		load() {
			return import("./shell-DSyjpS5H.js").then((e) => X(e.shell));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Sieve",
		extensions: ["siv", "sieve"],
		load() {
			return import("./sieve-CIy-TAL2.js").then((e) => X(e.sieve));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Smalltalk",
		extensions: ["st"],
		load() {
			return import("./smalltalk-_5TSigtJ.js").then((e) => X(e.smalltalk));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Solr",
		load() {
			return import("./solr-Dn9KEPod.js").then((e) => X(e.solr));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "SML",
		extensions: [
			"sml",
			"sig",
			"fun",
			"smackspec"
		],
		load() {
			return import("./mllike-D1TI_A98.js").then((e) => X(e.sml));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "SPARQL",
		alias: ["sparul"],
		extensions: ["rq", "sparql"],
		load() {
			return import("./sparql-C7VZ2_xN.js").then((e) => X(e.sparql));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Spreadsheet",
		alias: ["excel", "formula"],
		load() {
			return import("./spreadsheet-BHpoJMTG.js").then((e) => X(e.spreadsheet));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Squirrel",
		extensions: ["nut"],
		load() {
			return import("./clike-BRfujg7B.js").then((e) => X(e.squirrel));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Stylus",
		extensions: ["styl"],
		load() {
			return import("./stylus-DutUiqlM.js").then((e) => X(e.stylus));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Swift",
		extensions: ["swift"],
		load() {
			return import("./swift-DeEbr0j8.js").then((e) => X(e.swift));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "sTeX",
		load() {
			return import("./stex-Bak9_e_0.js").then((e) => X(e.stex));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "LaTeX",
		alias: ["tex"],
		extensions: [
			"text",
			"ltx",
			"tex"
		],
		load() {
			return import("./stex-Bak9_e_0.js").then((e) => X(e.stex));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "SystemVerilog",
		extensions: [
			"v",
			"sv",
			"svh"
		],
		load() {
			return import("./verilog-DhPg3LuH.js").then((e) => X(e.verilog));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Tcl",
		extensions: ["tcl"],
		load() {
			return import("./tcl-DqT-w9d-.js").then((e) => X(e.tcl));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Textile",
		extensions: ["textile"],
		load() {
			return import("./textile-9UQz4LHd.js").then((e) => X(e.textile));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "TiddlyWiki",
		load() {
			return import("./tiddlywiki-0bxtfA1B.js").then((e) => X(e.tiddlyWiki));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Tiki wiki",
		load() {
			return import("./tiki-VtF4Ggye.js").then((e) => X(e.tiki));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "TOML",
		extensions: ["toml"],
		load() {
			return import("./toml-By4hTZdB.js").then((e) => X(e.toml));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Troff",
		extensions: [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9"
		],
		load() {
			return import("./troff-clcb3j5O.js").then((e) => X(e.troff));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "TTCN",
		extensions: [
			"ttcn",
			"ttcn3",
			"ttcnpp"
		],
		load() {
			return import("./ttcn-Cp3qcylD.js").then((e) => X(e.ttcn));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "TTCN_CFG",
		extensions: ["cfg"],
		load() {
			return import("./ttcn-cfg-CCZh5xuZ.js").then((e) => X(e.ttcnCfg));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Turtle",
		extensions: ["ttl"],
		load() {
			return import("./turtle-DibV1pol.js").then((e) => X(e.turtle));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Web IDL",
		extensions: ["webidl"],
		load() {
			return import("./webidl-Cwq8WZD0.js").then((e) => X(e.webIDL));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "VB.NET",
		extensions: ["vb"],
		load() {
			return import("./vb-D2-t8wJa.js").then((e) => X(e.vb));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "VBScript",
		extensions: ["vbs"],
		load() {
			return import("./vbscript-BGrQhsrS.js").then((e) => X(e.vbScript));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Velocity",
		extensions: ["vtl"],
		load() {
			return import("./velocity-DjHwF-yU.js").then((e) => X(e.velocity));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Verilog",
		extensions: ["v"],
		load() {
			return import("./verilog-DhPg3LuH.js").then((e) => X(e.verilog));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "VHDL",
		extensions: ["vhd", "vhdl"],
		load() {
			return import("./vhdl-CJUc9HHg.js").then((e) => X(e.vhdl));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "XQuery",
		extensions: [
			"xy",
			"xquery",
			"xq",
			"xqm",
			"xqy"
		],
		load() {
			return import("./xquery-BQFQTLfy.js").then((e) => X(e.xQuery));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Yacas",
		extensions: ["ys"],
		load() {
			return import("./yacas-SDCg77g6.js").then((e) => X(e.yacas));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Z80",
		extensions: ["z80"],
		load() {
			return import("./z80-Bf4KLEgB.js").then((e) => X(e.z80));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "MscGen",
		extensions: [
			"mscgen",
			"mscin",
			"msc"
		],
		load() {
			return import("./mscgen-Wj53llQf.js").then((e) => X(e.mscgen));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Xù",
		extensions: ["xu"],
		load() {
			return import("./mscgen-Wj53llQf.js").then((e) => X(e.xu));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "MsGenny",
		extensions: ["msgenny"],
		load() {
			return import("./mscgen-Wj53llQf.js").then((e) => X(e.msgenny));
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Vue",
		extensions: ["vue"],
		load() {
			return import("./dist-ClNMMcTA.js").then((e) => e.vue());
		}
	}),
	/* @__PURE__ */ M.of({
		name: "Angular Template",
		load() {
			return import("./dist-CHnBxvJA.js").then((e) => e.angular());
		}
	})
], Xi = class {
	constructor(e, t, n) {
		this.from = e, this.to = t, this.diagnostic = n;
	}
}, Zi = class e {
	constructor(e, t, n) {
		this.diagnostics = e, this.panel = t, this.selected = n;
	}
	static init(t, n, r) {
		let i = r.facet(ua).markerFilter;
		i && (t = i(t, r));
		let a = t.slice().sort((e, t) => e.from - t.from || e.to - t.to), o = new pe(), s = [], c = 0, l = r.doc.iter(), u = 0, d = r.doc.length;
		for (let e = 0;;) {
			let t = e == a.length ? null : a[e];
			if (!t && !s.length) break;
			let n, r;
			if (s.length) n = c, r = s.reduce((e, t) => Math.min(e, t.to), t && t.from > n ? t.from : 1e8);
			else {
				if (n = t.from, n > d) break;
				r = t.to, s.push(t), e++;
			}
			for (; e < a.length;) {
				let t = a[e];
				if (t.from == n && (t.to > t.from || t.to == n)) s.push(t), e++, r = Math.min(t.to, r);
				else {
					r = Math.min(t.from, r);
					break;
				}
			}
			r = Math.min(r, d);
			let i = !1;
			if (s.some((e) => e.from == n && (e.to == r || r == d)) && (i = n == r, !i && r - n < 10)) {
				let e = n - (u + l.value.length);
				e > 0 && (l.next(e), u = n);
				for (let e = n;;) {
					if (e >= r) {
						i = !0;
						break;
					}
					if (!l.lineBreak && u + l.value.length > e) break;
					e = u + l.value.length, u += l.value.length, l.next();
				}
			}
			let f = xa(s);
			if (i) o.add(n, n, D.widget({
				widget: new ma(f),
				diagnostics: s.slice()
			}));
			else {
				let e = s.reduce((e, t) => t.markClass ? e + " " + t.markClass : e, "");
				o.add(n, r, D.mark({
					class: "cm-lintRange cm-lintRange-" + f + e,
					diagnostics: s.slice(),
					inclusiveEnd: s.some((e) => e.to > r)
				}));
			}
			if (c = r, c == d) break;
			for (let e = 0; e < s.length; e++) s[e].to <= c && s.splice(e--, 1);
		}
		let f = o.finish();
		return new e(f, n, Qi(f));
	}
};
function Qi(e, t = null, n = 0) {
	let r = null;
	return e.between(n, 1e9, (e, n, { spec: i }) => {
		if (!(t && i.diagnostics.indexOf(t) < 0)) if (!r) r = new Xi(e, n, t || i.diagnostics[0]);
		else if (i.diagnostics.indexOf(r.diagnostic) < 0) return !1;
		else r = new Xi(r.from, n, r.diagnostic);
	}), r;
}
function $i(e, t) {
	let n = t.pos, r = t.end || n, i = e.state.facet(ua).hideOn(e, n, r);
	if (i != null) return i;
	let a = e.startState.doc.lineAt(t.pos);
	return !!(e.effects.some((e) => e.is(ta)) || e.changes.touchesRange(a.from, Math.max(a.to, r)));
}
function ea(e, t) {
	return e.field(Z, !1) ? t : t.concat(m.appendConfig.of(Sa));
}
var ta = /* @__PURE__ */ m.define(), na = /* @__PURE__ */ m.define(), ra = /* @__PURE__ */ m.define(), Z = /* @__PURE__ */ _.define({
	create() {
		return new Zi(D.none, null, null);
	},
	update(e, t) {
		if (t.docChanged && e.diagnostics.size) {
			let n = e.diagnostics.map(t.changes), r = null, i = e.panel;
			if (e.selected) {
				let i = t.changes.mapPos(e.selected.from, 1);
				r = Qi(n, e.selected.diagnostic, i) || Qi(n, null, i);
			}
			!n.size && i && t.state.facet(ua).autoPanel && (i = null), e = new Zi(n, i, r);
		}
		for (let n of t.effects) if (n.is(ta)) {
			let r = t.state.facet(ua).autoPanel ? n.value.length ? ga.open : null : e.panel;
			e = Zi.init(n.value, r, t.state);
		} else n.is(na) ? e = new Zi(e.diagnostics, n.value ? ga.open : null, e.selected) : n.is(ra) && (e = new Zi(e.diagnostics, e.panel, n.value));
		return e;
	},
	provide: (e) => [ne.from(e, (e) => e.panel), v.decorations.from(e, (e) => e.diagnostics)]
}), ia = /* @__PURE__ */ D.mark({ class: "cm-lintRange cm-lintRange-active" });
function aa(e, t, n) {
	let { diagnostics: r } = e.state.field(Z), i, a = -1, o = -1;
	r.between(t - +(n < 0), t + +(n > 0), (e, r, { spec: s }) => {
		if (t >= e && t <= r && (e == r || (t > e || n > 0) && (t < r || n < 0))) return i = s.diagnostics, a = e, o = r, !1;
	});
	let s = e.state.facet(ua).tooltipFilter;
	return i && s && (i = s(i, e.state)), i ? {
		pos: a,
		end: o,
		above: e.state.doc.lineAt(a).to < o,
		create() {
			return { dom: oa(e, i) };
		}
	} : null;
}
function oa(e, t) {
	return P("ul", { class: "cm-tooltip-lint" }, t.map((t) => pa(e, t, !1)));
}
var sa = (e) => {
	let t = e.state.field(Z, !1);
	(!t || !t.panel) && e.dispatch({ effects: ea(e.state, [na.of(!0)]) });
	let n = ie(e, ga.open);
	return n && n.dom.querySelector(".cm-panel-lint ul").focus(), !0;
}, ca = (e) => {
	let t = e.state.field(Z, !1);
	return !t || !t.panel ? !1 : (e.dispatch({ effects: na.of(!1) }), !0);
}, la = [{
	key: "Mod-Shift-m",
	run: sa,
	preventDefault: !0
}, {
	key: "F8",
	run: (e) => {
		let t = e.state.field(Z, !1);
		if (!t) return !1;
		let n = e.state.selection.main, r = Qi(t.diagnostics, null, n.to + 1);
		return !r && (r = Qi(t.diagnostics, null, 0), !r || r.from == n.from && r.to == n.to) ? !1 : (e.dispatch({
			selection: {
				anchor: r.from,
				head: r.to
			},
			scrollIntoView: !0
		}), !0);
	}
}], ua = /* @__PURE__ */ i.define({ combine(e) {
	return {
		sources: e.map((e) => e.source).filter((e) => e != null),
		...Oe(e.map((e) => e.config), {
			delay: 750,
			markerFilter: null,
			tooltipFilter: null,
			needsRefresh: null,
			hideOn: () => null
		}, {
			delay: Math.max,
			markerFilter: da,
			tooltipFilter: da,
			needsRefresh: (e, t) => e ? t ? (n) => e(n) || t(n) : e : t,
			hideOn: (e, t) => e ? t ? (n, r, i) => e(n, r, i) || t(n, r, i) : e : t,
			autoPanel: (e, t) => e || t
		})
	};
} });
function da(e, t) {
	return e ? t ? (n, r) => t(e(n, r), r) : e : t;
}
function fa(e) {
	let t = [];
	if (e) actions: for (let { name: n } of e) {
		for (let e = 0; e < n.length; e++) {
			let r = n[e];
			if (/[a-zA-Z]/.test(r) && !t.some((e) => e.toLowerCase() == r.toLowerCase())) {
				t.push(r);
				continue actions;
			}
		}
		t.push("");
	}
	return t;
}
function pa(e, t, n) {
	let r = n ? fa(t.actions) : [];
	return P("li", { class: "cm-diagnostic cm-diagnostic-" + t.severity }, P("span", { class: "cm-diagnosticText" }, t.renderMessage ? t.renderMessage(e) : t.message), t.actions?.map((n, i) => {
		let a = !1, o = (r) => {
			if (r.preventDefault(), a) return;
			a = !0;
			let i = Qi(e.state.field(Z).diagnostics, t);
			i && n.apply(e, i.from, i.to);
		}, { name: s } = n, c = r[i] ? s.indexOf(r[i]) : -1, l = c < 0 ? s : [
			s.slice(0, c),
			P("u", s.slice(c, c + 1)),
			s.slice(c + 1)
		];
		return P("button", {
			type: "button",
			class: "cm-diagnosticAction" + (n.markClass ? " " + n.markClass : ""),
			onclick: o,
			onmousedown: o,
			"aria-label": ` Action: ${s}${c < 0 ? "" : ` (access key "${r[i]})"`}.`
		}, l);
	}), t.source && P("div", { class: "cm-diagnosticSource" }, t.source));
}
var ma = class extends A {
	constructor(e) {
		super(), this.sev = e;
	}
	eq(e) {
		return e.sev == this.sev;
	}
	toDOM() {
		return P("span", { class: "cm-lintPoint cm-lintPoint-" + this.sev });
	}
}, ha = class {
	constructor(e, t) {
		this.diagnostic = t, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = pa(e, t, !0), this.dom.id = this.id, this.dom.setAttribute("role", "option");
	}
}, ga = class e {
	constructor(e) {
		this.view = e, this.items = [], this.list = P("ul", {
			tabIndex: 0,
			role: "listbox",
			"aria-label": this.view.state.phrase("Diagnostics"),
			onkeydown: (t) => {
				if (!(t.ctrlKey || t.altKey || t.metaKey)) {
					if (t.keyCode == 27) ca(this.view), this.view.focus();
					else if (t.keyCode == 38 || t.keyCode == 33) this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
					else if (t.keyCode == 40 || t.keyCode == 34) this.moveSelection((this.selectedIndex + 1) % this.items.length);
					else if (t.keyCode == 36) this.moveSelection(0);
					else if (t.keyCode == 35) this.moveSelection(this.items.length - 1);
					else if (t.keyCode == 13) this.view.focus();
					else if (t.keyCode >= 65 && t.keyCode <= 90 && this.selectedIndex >= 0) {
						let { diagnostic: n } = this.items[this.selectedIndex], r = fa(n.actions);
						for (let i = 0; i < r.length; i++) if (r[i].toUpperCase().charCodeAt(0) == t.keyCode) {
							let t = Qi(this.view.state.field(Z).diagnostics, n);
							t && n.actions[i].apply(e, t.from, t.to);
						}
					} else return;
					t.preventDefault();
				}
			},
			onclick: (e) => {
				for (let t = 0; t < this.items.length; t++) this.items[t].dom.contains(e.target) && this.moveSelection(t);
			}
		}), this.dom = P("div", { class: "cm-panel-lint" }, this.list, P("button", {
			type: "button",
			name: "close",
			"aria-label": this.view.state.phrase("close"),
			onclick: () => ca(this.view)
		}, "×")), this.update();
	}
	get selectedIndex() {
		let e = this.view.state.field(Z).selected;
		if (!e) return -1;
		for (let t = 0; t < this.items.length; t++) if (this.items[t].diagnostic == e.diagnostic) return t;
		return -1;
	}
	update() {
		let { diagnostics: e, selected: t } = this.view.state.field(Z), n = 0, r = !1, i = null, a = /* @__PURE__ */ new Set();
		for (e.between(0, this.view.state.doc.length, (e, o, { spec: s }) => {
			for (let e of s.diagnostics) {
				if (a.has(e)) continue;
				a.add(e);
				let o = -1, s;
				for (let t = n; t < this.items.length; t++) if (this.items[t].diagnostic == e) {
					o = t;
					break;
				}
				o < 0 ? (s = new ha(this.view, e), this.items.splice(n, 0, s), r = !0) : (s = this.items[o], o > n && (this.items.splice(n, o - n), r = !0)), t && s.diagnostic == t.diagnostic ? s.dom.hasAttribute("aria-selected") || (s.dom.setAttribute("aria-selected", "true"), i = s) : s.dom.hasAttribute("aria-selected") && s.dom.removeAttribute("aria-selected"), n++;
			}
		}); n < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0);) r = !0, this.items.pop();
		this.items.length == 0 && (this.items.push(new ha(this.view, {
			from: -1,
			to: -1,
			severity: "info",
			message: this.view.state.phrase("No diagnostics")
		})), r = !0), i ? (this.list.setAttribute("aria-activedescendant", i.id), this.view.requestMeasure({
			key: this,
			read: () => ({
				sel: i.dom.getBoundingClientRect(),
				panel: this.list.getBoundingClientRect()
			}),
			write: ({ sel: e, panel: t }) => {
				let n = t.height / this.list.offsetHeight;
				e.top < t.top ? this.list.scrollTop -= (t.top - e.top) / n : e.bottom > t.bottom && (this.list.scrollTop += (e.bottom - t.bottom) / n);
			}
		})) : this.selectedIndex < 0 && this.list.removeAttribute("aria-activedescendant"), r && this.sync();
	}
	sync() {
		let e = this.list.firstChild;
		function t() {
			let t = e;
			e = t.nextSibling, t.remove();
		}
		for (let n of this.items) if (n.dom.parentNode == this.list) {
			for (; e != n.dom;) t();
			e = n.dom.nextSibling;
		} else this.list.insertBefore(n.dom, e);
		for (; e;) t();
	}
	moveSelection(e) {
		if (this.selectedIndex < 0) return;
		let t = Qi(this.view.state.field(Z).diagnostics, this.items[e].diagnostic);
		t && this.view.dispatch({
			selection: {
				anchor: t.from,
				head: t.to
			},
			scrollIntoView: !0,
			effects: ra.of(t)
		});
	}
	static open(t) {
		return new e(t);
	}
};
function _a(e, t = "viewBox=\"0 0 40 40\"") {
	return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${t}>${encodeURIComponent(e)}</svg>')`;
}
function va(e) {
	return _a(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${e}" fill="none" stroke-width=".7"/>`, "width=\"6\" height=\"3\"");
}
var ya = /* @__PURE__ */ v.baseTheme({
	".cm-diagnostic": {
		padding: "3px 6px 3px 8px",
		marginLeft: "-1px",
		display: "block",
		whiteSpace: "pre-wrap"
	},
	".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
	".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
	".cm-diagnostic-info": { borderLeft: "5px solid #999" },
	".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
	".cm-diagnosticAction": {
		font: "inherit",
		border: "none",
		padding: "2px 4px",
		backgroundColor: "#444",
		color: "white",
		borderRadius: "3px",
		marginLeft: "8px",
		cursor: "pointer"
	},
	".cm-diagnosticSource": {
		fontSize: "70%",
		opacity: .7
	},
	".cm-lintRange": {
		backgroundPosition: "left bottom",
		backgroundRepeat: "repeat-x",
		paddingBottom: "0.7px"
	},
	".cm-lintRange-error": { backgroundImage: /* @__PURE__ */ va("#d11") },
	".cm-lintRange-warning": { backgroundImage: /* @__PURE__ */ va("orange") },
	".cm-lintRange-info": { backgroundImage: /* @__PURE__ */ va("#999") },
	".cm-lintRange-hint": { backgroundImage: /* @__PURE__ */ va("#66d") },
	".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
	".cm-tooltip-lint": {
		padding: 0,
		margin: 0
	},
	".cm-lintPoint": {
		position: "relative",
		"&:after": {
			content: "\"\"",
			position: "absolute",
			bottom: 0,
			left: "-2px",
			borderLeft: "3px solid transparent",
			borderRight: "3px solid transparent",
			borderBottom: "4px solid #d11"
		}
	},
	".cm-lintPoint-warning": { "&:after": { borderBottomColor: "orange" } },
	".cm-lintPoint-info": { "&:after": { borderBottomColor: "#999" } },
	".cm-lintPoint-hint": { "&:after": { borderBottomColor: "#66d" } },
	".cm-panel.cm-panel-lint": {
		position: "relative",
		"& ul": {
			maxHeight: "100px",
			overflowY: "auto",
			"& [aria-selected]": {
				backgroundColor: "#ddd",
				"& u": { textDecoration: "underline" }
			},
			"&:focus [aria-selected]": {
				background_fallback: "#bdf",
				backgroundColor: "Highlight",
				color_fallback: "white",
				color: "HighlightText"
			},
			"& u": { textDecoration: "none" },
			padding: 0,
			margin: 0
		},
		"& [name=close]": {
			position: "absolute",
			top: "0",
			right: "2px",
			background: "inherit",
			border: "none",
			font: "inherit",
			padding: 0,
			margin: 0
		}
	},
	"&dark .cm-lintRange-active": { backgroundColor: "#86714a80" },
	"&dark .cm-panel.cm-panel-lint ul": { "& [aria-selected]": { backgroundColor: "#2e343e" } }
});
function ba(e) {
	return e == "error" ? 4 : e == "warning" ? 3 : e == "info" ? 2 : 1;
}
function xa(e) {
	let t = "hint", n = 1;
	for (let r of e) {
		let e = ba(r.severity);
		e > n && (n = e, t = r.severity);
	}
	return t;
}
var Sa = [
	Z,
	/* @__PURE__ */ v.decorations.compute([Z], (e) => {
		let { selected: t, panel: n } = e.field(Z);
		return !t || !n || t.from == t.to ? D.none : D.set([ia.range(t.from, t.to)]);
	}),
	/* @__PURE__ */ Te(aa, { hideOn: $i }),
	ya
], Ca = [
	le(),
	oe(),
	ge(),
	Xt(),
	n(),
	ve(),
	xe(),
	a.allowMultipleSelections.of(!0),
	fe(),
	u(te, { fallback: !0 }),
	_e(),
	I(),
	F(),
	N(),
	Ce(),
	Se(),
	Be(),
	se.of([
		...ke,
		...ri,
		...Ot,
		...hn,
		...S,
		...Ae,
		...la
	])
];
ge(), Xt(), ve(), u(te, { fallback: !0 }), se.of([...ri, ...hn]);
//#endregion
//#region node_modules/@codemirror/theme-one-dark/dist/index.js
var wa = "#e5c07b", Ta = "#e06c75", Ea = "#56b6c2", Da = "#ffffff", Oa = "#abb2bf", ka = "#7d8799", Aa = "#61afef", ja = "#98c379", Ma = "#d19a66", Na = "#c678dd", Pa = "#21252b", Fa = "#2c313a", Ia = "#282c34", La = "#353a42", Ra = "#3E4451", za = "#528bff", Ba = [/* @__PURE__ */ v.theme({
	"&": {
		color: Oa,
		backgroundColor: Ia
	},
	".cm-content": { caretColor: za },
	".cm-cursor, .cm-dropCursor": { borderLeftColor: za },
	"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: Ra },
	".cm-panels": {
		backgroundColor: Pa,
		color: Oa
	},
	".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
	".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
	".cm-searchMatch": {
		backgroundColor: "#72a1ff59",
		outline: "1px solid #457dff"
	},
	".cm-searchMatch.cm-searchMatch-selected": { backgroundColor: "#6199ff2f" },
	".cm-activeLine": { backgroundColor: "#6699ff0b" },
	".cm-selectionMatch": { backgroundColor: "#aafe661a" },
	"&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bad0f847" },
	".cm-gutters": {
		backgroundColor: Ia,
		color: ka,
		border: "none"
	},
	".cm-activeLineGutter": { backgroundColor: Fa },
	".cm-foldPlaceholder": {
		backgroundColor: "transparent",
		border: "none",
		color: "#ddd"
	},
	".cm-tooltip": {
		border: "none",
		backgroundColor: La
	},
	".cm-tooltip .cm-tooltip-arrow:before": {
		borderTopColor: "transparent",
		borderBottomColor: "transparent"
	},
	".cm-tooltip .cm-tooltip-arrow:after": {
		borderTopColor: La,
		borderBottomColor: La
	},
	".cm-tooltip-autocomplete": { "& > ul > li[aria-selected]": {
		backgroundColor: Fa,
		color: Oa
	} }
}, { dark: !0 }), /* @__PURE__ */ u(/* @__PURE__ */ re.define([
	{
		tag: T.keyword,
		color: Na
	},
	{
		tag: [
			T.name,
			T.deleted,
			T.character,
			T.propertyName,
			T.macroName
		],
		color: Ta
	},
	{
		tag: [/* @__PURE__ */ T.function(T.variableName), T.labelName],
		color: Aa
	},
	{
		tag: [
			T.color,
			/* @__PURE__ */ T.constant(T.name),
			/* @__PURE__ */ T.standard(T.name)
		],
		color: Ma
	},
	{
		tag: [/* @__PURE__ */ T.definition(T.name), T.separator],
		color: Oa
	},
	{
		tag: [
			T.typeName,
			T.className,
			T.number,
			T.changed,
			T.annotation,
			T.modifier,
			T.self,
			T.namespace
		],
		color: wa
	},
	{
		tag: [
			T.operator,
			T.operatorKeyword,
			T.url,
			T.escape,
			T.regexp,
			T.link,
			/* @__PURE__ */ T.special(T.string)
		],
		color: Ea
	},
	{
		tag: [T.meta, T.comment],
		color: ka
	},
	{
		tag: T.strong,
		fontWeight: "bold"
	},
	{
		tag: T.emphasis,
		fontStyle: "italic"
	},
	{
		tag: T.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: T.link,
		color: ka,
		textDecoration: "underline"
	},
	{
		tag: T.heading,
		fontWeight: "bold",
		color: Ta
	},
	{
		tag: [
			T.atom,
			T.bool,
			/* @__PURE__ */ T.special(T.variableName)
		],
		color: Ma
	},
	{
		tag: [
			T.processingInstruction,
			T.string,
			T.inserted
		],
		color: ja
	},
	{
		tag: T.invalid,
		color: Da
	}
]))];
//#endregion
//#region src/util.ts
function Va(e) {
	let t = [
		1116352408,
		1899447441,
		3049323471,
		3921009573,
		961987163,
		1508970993,
		2453635748,
		2870763221,
		3624381080,
		310598401,
		607225278,
		1426881987,
		1925078388,
		2162078206,
		2614888103,
		3248222580,
		3835390401,
		4022224774,
		264347078,
		604807628,
		770255983,
		1249150122,
		1555081692,
		1996064986,
		2554220882,
		2821834349,
		2952996808,
		3210313671,
		3336571891,
		3584528711,
		113926993,
		338241895,
		666307205,
		773529912,
		1294757372,
		1396182291,
		1695183700,
		1986661051,
		2177026350,
		2456956037,
		2730485921,
		2820302411,
		3259730800,
		3345764771,
		3516065817,
		3600352804,
		4094571909,
		275423344,
		430227734,
		506948616,
		659060556,
		883997877,
		958139571,
		1322822218,
		1537002063,
		1747873779,
		1955562222,
		2024104815,
		2227730452,
		2361852424,
		2428436474,
		2756734187,
		3204031479,
		3329325298
	], n = [];
	for (let t = 0; t < e.length; t++) {
		let r = e.charCodeAt(t);
		r < 128 ? n.push(r) : r < 2048 ? n.push(192 | r >> 6, 128 | r & 63) : n.push(224 | r >> 12, 128 | r >> 6 & 63, 128 | r & 63);
	}
	let r = n.length * 8;
	for (n.push(128); n.length % 64 != 56;) n.push(0);
	for (let e = 56; e >= 0; e -= 8) n.push(r / 2 ** e & 255);
	let i = 1779033703, a = 3144134277, o = 1013904242, s = 2773480762, c = 1359893119, l = 2600822924, u = 528734635, d = 1541459225;
	for (let e = 0; e < n.length; e += 64) {
		let r = Array(64);
		for (let t = 0; t < 16; t++) r[t] = n[e + t * 4] << 24 | n[e + t * 4 + 1] << 16 | n[e + t * 4 + 2] << 8 | n[e + t * 4 + 3];
		for (let e = 16; e < 64; e++) {
			let t = (r[e - 15] >>> 7 | r[e - 15] << 25) ^ (r[e - 15] >>> 18 | r[e - 15] << 14) ^ r[e - 15] >>> 3 | 0, n = (r[e - 2] >>> 17 | r[e - 2] << 15) ^ (r[e - 2] >>> 19 | r[e - 2] << 13) ^ r[e - 2] >>> 10 | 0;
			r[e] = r[e - 16] + t + r[e - 7] + n | 0;
		}
		let f = i, p = a, m = o, h = s, g = c, _ = l, v = u, y = d;
		for (let e = 0; e < 64; e++) {
			let n = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7) | 0, i = g & _ ^ ~g & v | 0, a = y + n + i + t[e] + r[e] | 0, o = ((f >>> 2 | f << 30) ^ (f >>> 13 | f << 19) ^ (f >>> 22 | f << 10) | 0) + (f & p ^ f & m ^ p & m | 0) | 0;
			y = v, v = _, _ = g, g = h + a | 0, h = m, m = p, p = f, f = a + o | 0;
		}
		i = i + f | 0, a = a + p | 0, o = o + m | 0, s = s + h | 0, c = c + g | 0, l = l + _ | 0, u = u + v | 0, d = d + y | 0;
	}
	return [
		i,
		a,
		o,
		s,
		c,
		l,
		u,
		d
	].map((e) => ("00000000" + (e >>> 0).toString(16)).slice(-8)).join("");
}
function Ha(e) {
	return Va(e).slice(0, 8);
}
//#endregion
//#region src/prefs.ts
var Ua = "veditor_vim_mode";
function Wa(e) {
	return localStorage.getItem(Ua) === "true";
}
function Ga(e, t) {
	localStorage.setItem(Ua, String(t));
}
function Ka(e) {
	return `${e}_line_wrap`;
}
function qa(e) {
	return localStorage.getItem(Ka(e)) !== "false";
}
function Ja(e, t) {
	localStorage.setItem(Ka(e), String(t));
}
//#endregion
//#region src/url-decorator.ts
var Ya = /https?:\/\/[^\s)\]>]+/g, Xa = D.mark({
	class: "veditor-url",
	title: "Ctrl+Click to open"
});
function Za(e) {
	let t = [];
	for (let n = 1; n <= e.state.doc.lines; n++) {
		let r = e.state.doc.line(n), i;
		for (Ya.lastIndex = 0; (i = Ya.exec(r.text)) !== null;) {
			let e = r.from + i.index, n = e + i[0].length;
			t.push(Xa.range(e, n));
		}
	}
	return console.log("[url-decorator] Found", t.length, "URLs"), D.set(t, !0);
}
var Qa = e.fromClass(class {
	decorations;
	constructor(e) {
		console.log("[url-decorator] Plugin instantiated"), this.decorations = Za(e);
	}
	update(e) {
		e.docChanged && (this.decorations = Za(e.view));
	}
}, { decorations: (e) => e.decorations }), $a = "0.18.0";
function eo(e, t) {
	let n = /https?:\/\/[^\s)\]>]+/g, r;
	for (; (r = n.exec(e)) !== null;) if (t >= r.index && t < r.index + r[0].length) return r[0];
	return null;
}
var to = v.domEventHandlers({ click(e, t) {
	if (!e.ctrlKey) return !1;
	let n = t.posAtCoords({
		x: e.clientX,
		y: e.clientY
	});
	if (n == null) return !1;
	let r = t.state.doc.lineAt(n), i = n - r.from, a = eo(r.text, i);
	return a ? (window.open(a, Ha(a)), e.preventDefault(), !0) : !1;
} }), Q = null, no = "", $ = null, ro = "veditor", io = null, ao = new Ee(), oo = new Ee(), so = new Ee(), co = null, lo = null;
function uo() {
	if (!$) return;
	let e = xo(no);
	$.classList.toggle("veditor-dirty", e);
}
function fo(e) {
	$ && ($.classList.remove("veditor-vim-normal", "veditor-vim-insert"), e === "insert" || e === "replace" ? $.classList.add("veditor-vim-insert") : $.classList.add("veditor-vim-normal"));
}
function po() {
	if (!Q) return;
	let e = qi(Q);
	e && e.on("vim-mode-change", (e) => {
		fo(e.mode);
	});
}
function mo(e, t, n) {
	return se.of([
		{
			key: "Mod-s",
			run: () => ((async () => {
				await e.onSave(), no = bo(), uo();
			})(), !0)
		},
		{
			key: "Escape",
			run: () => (_o(!1, t, e), !0)
		},
		{
			key: "Mod-Shift-s",
			run: () => ((async () => {
				await e.onSave(), no = bo(), uo(), _o(!1, t, e);
			})(), !0)
		},
		{
			key: "Mod-Shift-w",
			run: () => {
				if (!Q) return !1;
				let e = !qa(n);
				return Ja(n, e), Q.dispatch({ effects: ao.reconfigure(e ? v.lineWrapping : []) }), !0;
			}
		}
	]);
}
function ho(e) {
	co && (co.textContent = `${e ? "VIM" : "CUA"} · v${$a}`, co.title = e ? "Vim mode active — click to switch to standard editing" : "Standard editing — click to switch to Vim mode");
}
function go(e, t) {
	co?.remove();
	let n = document.createElement("button");
	n.className = "veditor-mode-toggle", n.type = "button", n.addEventListener("click", () => Eo()), e.appendChild(n), co = n, ho(t);
}
function _o(e, t, n) {
	if (e) {
		n.onQuit();
		return;
	}
	if (xo(no) || n.isAppDirty?.()) {
		vo(t, () => n.onQuit(), async () => {
			await n.onSave(), n.onQuit();
		});
		return;
	}
	n.onQuit();
}
function vo(e, t, n) {
	e.querySelector(".veditor-confirm-bar")?.remove();
	let r = (e, t) => e.slice(0, t) + `<u>${e[t]}</u>` + e.slice(t + 1), i = document.createElement("div");
	i.className = "veditor-confirm-bar", i.innerHTML = `
    <span>Unsaved changes —</span>
    ${n ? `<button class="veditor-confirm-btn veditor-confirm-save">${r("Save & Quit", 0)}</button>` : ""}
    <button class="veditor-confirm-btn veditor-confirm-yes">${r("Discard", 0)}</button>
    <button class="veditor-confirm-btn veditor-confirm-no">${r("Cancel", 0)}</button>
  `, e.prepend(i);
	let a = () => {
		i.remove(), document.removeEventListener("keydown", o, !0);
	}, o = (e) => {
		e.key === "s" && n ? (e.stopPropagation(), e.preventDefault(), a(), n()) : e.key === "d" ? (e.stopPropagation(), e.preventDefault(), a(), t()) : (e.key === "c" || e.key === "Escape") && (e.stopPropagation(), e.preventDefault(), a());
	};
	document.addEventListener("keydown", o, !0), n && i.querySelector(".veditor-confirm-save").addEventListener("click", () => {
		a(), n();
	}), i.querySelector(".veditor-confirm-yes").addEventListener("click", () => {
		a(), t();
	}), i.querySelector(".veditor-confirm-no").addEventListener("click", () => {
		a();
	});
}
function yo(e, t, n, r) {
	Co(), no = t, $ = e, e.classList.add("veditor-dirty-aware"), e.classList.remove("veditor-dirty");
	let i = r?.storagePrefix ?? "veditor";
	ro = i, io = n;
	let o = r?.clickableLinks ?? !0, s = Wa(i);
	if (Y.defineEx("w", "w", async () => {
		await n.onSave(), no = bo(), uo();
	}), Y.defineEx("q", "q", (t, r) => {
		_o(r?.bang ?? !1, e, n);
	}), Y.defineEx("wq", "wq", async () => {
		await n.onSave(), no = bo(), uo(), _o(!1, e, n);
	}), Y.defineEx("cua", "cua", () => {
		Wa(ro) && setTimeout(() => Eo(), 0);
	}), Y.defineEx("wrap", "wrap", () => {
		if (!Q) return;
		let e = !qa(i);
		Ja(i, e), Q.dispatch({ effects: ao.reconfigure(e ? v.lineWrapping : []) });
	}), Y.map("jk", "<Esc>", "insert"), Y.setOption("insertModeEscKeysTimeout", 750), Y.defineAction("veditor_quit", () => {
		_o(!1, e, n);
	}), Y.mapCommand("u", "action", "veditor_quit", {}, { context: "normal" }), r?.exCommands) for (let [e, t] of Object.entries(r.exCommands)) Y.defineEx(e, e, t);
	if (r?.normalMappings) for (let [e, t] of Object.entries(r.normalMappings)) {
		let n = `veditor_${e}`;
		Y.defineAction(n, t), Y.mapCommand(e, "action", n, {}, { context: "normal" });
	}
	let c = Y.getRegisterController(), l = c.pushText.bind(c);
	c.pushText = (e, t, n, r, i) => {
		l(e, t, n, r, i), e !== "_" && navigator.clipboard.writeText(n).catch(() => {});
	};
	let u = mo(n, e, i);
	console.log("[veditor] Creating editor with urlDecorator extension");
	let d = [
		oo.of(s ? Ki() : []),
		so.of(s ? [] : u),
		Ca,
		je({ codeLanguages: Yi }),
		Ba,
		Qa,
		se.of([{
			key: "Tab",
			run: Qr
		}, {
			key: "Shift-Tab",
			run: $r
		}]),
		ao.of(qa(i) ? v.lineWrapping : []),
		v.theme({
			"&": { height: "100%" },
			".cm-scroller": { overflow: "auto" },
			".cm-vim-panel": {
				background: "#45475a",
				color: "#cdd6f4",
				padding: "2px 6px",
				fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
				fontSize: "14px"
			},
			".cm-vim-panel input": {
				background: "transparent",
				border: "none",
				outline: "none",
				color: "#cdd6f4",
				fontFamily: "inherit",
				fontSize: "inherit"
			}
		})
	];
	return d.push(v.updateListener.of((e) => {
		e.docChanged && uo();
	})), o && d.push(to), r?.extensions && d.push(...r.extensions), Q = new v({
		state: a.create({
			doc: t,
			extensions: d
		}),
		parent: e
	}), s && (e.classList.add("veditor-vim-normal"), po()), e.addEventListener("keydown", (t) => {
		if (t.key !== "p" && t.key !== "P" || !Wa(ro) || !e.classList.contains("veditor-vim-normal") || !Q) return;
		t.preventDefault(), t.stopPropagation();
		let n = qi(Q), r = t.key;
		navigator.clipboard.readText().then((e) => {
			e && c.unnamedRegister.setText(e);
		}).catch(() => {}).finally(() => {
			Y.handleKey(n, r, "user");
		});
	}, { capture: !0 }), Q.contentDOM.addEventListener("paste", (e) => {
		if (!Wa(ro)) return;
		let t = e.clipboardData?.getData("text/plain");
		t && c.unnamedRegister.setText(t);
	}), lo = new AbortController(), window.addEventListener("beforeunload", (e) => {
		xo(no) && (e.preventDefault(), e.returnValue = "");
	}, { signal: lo.signal }), go(e, s), Q.focus(), Q;
}
function bo() {
	return Q ? Q.state.doc.toString() : "";
}
function xo(e) {
	return bo() !== e;
}
function So() {
	Q?.focus();
}
function Co() {
	Q &&= (Q.destroy(), null), co &&= (co.remove(), null), $ &&= ($.classList.remove("veditor-dirty", "veditor-dirty-aware", "veditor-vim-normal", "veditor-vim-insert"), null), lo &&= (lo.abort(), null), io = null;
}
function wo() {
	Q && Wa(ro) && Q.contentDOM.dispatchEvent(new KeyboardEvent("keydown", {
		key: "Escape",
		code: "Escape",
		bubbles: !0
	}));
}
function To(e) {
	if (!Q || !Wa(ro)) return;
	let t = qi(Q);
	t && Y.handleEx(t, e);
}
function Eo() {
	if (!Q) return Wa(ro);
	let e = !Wa(ro);
	Ga(ro, e);
	let t = io && $ ? mo(io, $, ro) : [];
	return Q.dispatch({ effects: [oo.reconfigure(e ? Ki() : []), so.reconfigure(e ? [] : t)] }), ho(e), e ? ($?.classList.add("veditor-vim-normal"), $?.classList.remove("veditor-vim-insert"), po()) : $?.classList.remove("veditor-vim-normal", "veditor-vim-insert"), Q.focus(), e;
}
function Do() {
	return Wa(ro);
}
async function Oo() {
	io && (await io.onSave(), no = bo(), uo());
}
function ko(e) {
	!io || !$ || _o(e ?? !1, $, io);
}
//#endregion
//#region src/vim-input.ts
function Ao(e, t) {
	let n = document.createElement("div");
	n.className = "vim-input", e.appendChild(n);
	let r = t?.storagePrefix ?? "veditor", i = Wa(r), o = new Ee(), s = v.updateListener.of((e) => {
		e.docChanged && t?.onChange?.(e.state.doc.toString());
	}), c = a.transactionFilter.of((e) => e.newDoc.lines > 1 ? {
		...e,
		changes: void 0
	} : e);
	Y.map("jk", "<Esc>", "insert"), Y.setOption("insertModeEscKeysTimeout", 750);
	let l = [
		o.of(i ? Ki() : []),
		Ba,
		s,
		c,
		v.theme({
			"&": {
				height: "auto",
				maxHeight: "1.8em",
				overflow: "hidden"
			},
			".cm-scroller": {
				overflow: "hidden",
				lineHeight: "1.6"
			},
			".cm-content": { padding: "2px 4px" },
			".cm-gutters": { display: "none" },
			".cm-vim-panel": {
				background: "#45475a",
				color: "#cdd6f4",
				padding: "1px 4px",
				fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
				fontSize: "13px"
			},
			".cm-vim-panel input": {
				background: "transparent",
				border: "none",
				outline: "none",
				color: "#cdd6f4",
				fontFamily: "inherit",
				fontSize: "inherit"
			},
			".cm-activeLine": { backgroundColor: "transparent" },
			".cm-activeLineGutter": { backgroundColor: "transparent" },
			"&.cm-focused": { outline: "none" }
		})
	];
	t?.extensions && l.push(...t.extensions);
	let u = new v({
		state: a.create({
			doc: t?.value ?? "",
			extensions: l
		}),
		parent: n
	});
	return u.dom.addEventListener("keydown", (e) => {
		e.key === "Enter" && t?.onEnter ? (e.preventDefault(), e.stopImmediatePropagation(), t.onEnter()) : e.key === "Escape" && t?.onEscape && (e.preventDefault(), e.stopImmediatePropagation(), t.onEscape());
	}, { capture: !0 }), {
		getValue() {
			return u.state.doc.toString();
		},
		setValue(e) {
			u.dispatch({ changes: {
				from: 0,
				to: u.state.doc.length,
				insert: e
			} });
		},
		focus() {
			if (u.focus(), t?.initialInsert && Wa(r)) {
				let e = qi(u);
				e && Y.handleKey(e, "i", "mapping");
			}
		},
		destroy() {
			u.destroy(), n.remove();
		},
		dom: n
	};
}
//#endregion
//#region src/logging.ts
var jo = "_app_debug_logs", Mo = 1e3;
function No() {
	try {
		let e = localStorage.getItem(jo);
		return e ? JSON.parse(e) : [];
	} catch {
		return [];
	}
}
function Po(e) {
	try {
		let t = e.slice(-Mo);
		localStorage.setItem(jo, JSON.stringify(t));
	} catch {}
}
function Fo(e, t) {
	let n = {
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		level: e,
		message: t
	}, r = No();
	r.push(n), Po(r), console[e === "warn" ? "warn" : e === "error" ? "error" : "log"](`[${e.toUpperCase()}] ${t}`);
}
function Io(e) {
	Fo("error", e);
}
function Lo(e) {
	Fo("warn", e);
}
function Ro(e) {
	Fo("info", e);
}
function zo(e) {
	Fo("debug", e);
}
function Bo() {
	let e = No();
	return e.length === 0 ? "(no logs)" : e.map((e) => `[${new Date(e.timestamp).toLocaleTimeString()}] ${e.level.toUpperCase()}: ${e.message}`).join("\n");
}
function Vo() {
	try {
		localStorage.removeItem(jo);
	} catch {}
}
function Ho() {
	let e = document.createElement("div");
	e.id = "log-viewer-modal", e.style.cssText = "\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.7);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 10000;\n  ";
	let t = document.createElement("div");
	t.style.cssText = "\n    background: #1e1e1e;\n    color: #e0e0e0;\n    border: 1px solid #444;\n    border-radius: 4px;\n    width: 80vw;\n    max-width: 800px;\n    height: 70vh;\n    display: flex;\n    flex-direction: column;\n    font-family: monospace;\n    font-size: 12px;\n  ";
	let n = document.createElement("div");
	n.style.cssText = "\n    padding: 10px;\n    border-bottom: 1px solid #444;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  ", n.innerHTML = "<div>Debug Logs</div>";
	let r = document.createElement("button");
	r.textContent = "×", r.style.cssText = "\n    background: none;\n    border: none;\n    color: #e0e0e0;\n    font-size: 20px;\n    cursor: pointer;\n    padding: 0;\n    width: 30px;\n    height: 30px;\n  ", r.addEventListener("click", () => e.remove()), n.appendChild(r);
	let i = document.createElement("textarea");
	i.readOnly = !0, i.value = Bo(), i.style.cssText = "\n    flex: 1;\n    padding: 10px;\n    background: #1e1e1e;\n    color: #e0e0e0;\n    border: none;\n    font-family: monospace;\n    font-size: 12px;\n    resize: none;\n    overflow: auto;\n  ", i.scrollTop = i.scrollHeight;
	let a = document.createElement("div");
	a.style.cssText = "\n    padding: 10px;\n    border-top: 1px solid #444;\n    display: flex;\n    gap: 10px;\n    justify-content: flex-end;\n  ";
	let o = document.createElement("button");
	o.textContent = "Clear Logs", o.style.cssText = "\n    padding: 6px 12px;\n    background: #d32f2f;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 12px;\n  ", o.addEventListener("click", () => {
		Vo(), i.value = "(no logs)";
	}), a.appendChild(o);
	let s = document.createElement("button");
	return s.textContent = "Refresh", s.style.cssText = "\n    padding: 6px 12px;\n    background: #1976d2;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 12px;\n  ", s.addEventListener("click", () => {
		i.value = Bo(), i.scrollTop = i.scrollHeight;
	}), a.appendChild(s), t.appendChild(n), t.appendChild(i), t.appendChild(a), e.appendChild(t), e.addEventListener("click", (t) => {
		t.target === e && e.remove();
	}), e;
}
//#endregion
//#region src/index.ts
var Uo = "0.18.0";
//#endregion
export { Uo as VERSION, Vo as clearLogs, yo as createEditor, Ho as createLogViewer, Ao as createVimInput, Co as destroyEditor, To as executeExCommand, wo as exitInsertMode, So as focusEditor, bo as getEditorContent, Bo as getFormattedLogs, Ha as hashTarget, xo as isEditorDirty, Do as isVimMode, zo as logDebug, Io as logError, Ro as logInfo, Lo as logWarn, ko as requestQuit, Oo as requestSave, Eo as toggleVimMode };

//# sourceMappingURL=veditor.js.map