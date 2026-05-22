import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { $ as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Ht as h, It as g, J as _, L as v, Lt as y, M as b, N as x, Nt as ee, O as S, Ot as C, P as w, Q as T, R as E, Rt as te, S as D, St as ne, T as re, Tt as ie, U as O, Ut as k, V as A, Vt as ae, W as oe, Wt as se, X as j, Y as ce, Z as M, _ as le, _t as ue, a as de, at as fe, b as pe, c as me, ct as he, d as ge, dt as _e, et as N, f as ve, ft as ye, gt as be, it as xe, j as Se, jt as Ce, k as we, kt as Te, l as P, lt as Ee, m as De, mt as Oe, nt as ke, o as F, ot as Ae, p as I, pt as je, q as Me, rt as Ne, tt as Pe, u as L, ut as Fe, v as R, vt as z, wt as Ie, xt as B, yt as V, z as Le, zt as Re } from "./dist-1T0MK0Nn.js";
import { i as ze, n as Be, o as Ve, r as He, t as Ue } from "./dist-8AphrkCp.js";
import { n as We, r as Ge } from "./dist-DjI0KX1F.js";
//#region node_modules/@codemirror/search/dist/index.js
var Ke = typeof String.prototype.normalize == "function" ? (e) => e.normalize("NFKD") : (e) => e, qe = class {
	constructor(e, t, n = 0, r = e.length, i, a) {
		this.test = a, this.value = {
			from: 0,
			to: 0,
			precise: !1
		}, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(n, r), this.bufferStart = n, this.normalize = i ? (e) => i(Ke(e)) : Ke, this.query = this.normalize(t);
	}
	peek() {
		if (this.bufferPos == this.buffer.length) {
			if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done) return -1;
			this.bufferPos = 0, this.buffer = this.iter.value;
		}
		return Re(this.buffer, this.bufferPos);
	}
	next() {
		for (; this.matches.length;) this.matches.pop();
		return this.nextOverlapping();
	}
	nextOverlapping() {
		for (;;) {
			let e = this.peek();
			if (e < 0) return this.done = !0, this;
			let t = se(e), n = this.bufferStart + this.bufferPos;
			this.bufferPos += a(e);
			let r = this.normalize(t);
			if (r.length) for (let e = 0, i = n, a = !0;; e++) {
				let n = r.charCodeAt(e), o = this.match(n, i, a, this.bufferPos + this.bufferStart, e == r.length - 1);
				if (o) return this.value = o, this;
				if (e == r.length - 1) break;
				a && e < t.length && t.charCodeAt(e) == n ? i++ : a = !1;
			}
		}
	}
	match(e, t, n, r, i) {
		let a = null;
		for (let t = 0; t < this.matches.length;) {
			let n = this.matches[t], o = !1;
			this.query.charCodeAt(n.index) == e && (n.index == this.query.length - 1 ? a = {
				from: n.from,
				to: r,
				precise: i && n.precise
			} : (n.index++, o = !0)), o ? t++ : this.matches.splice(t, 1);
		}
		return this.query.charCodeAt(0) == e && (this.query.length == 1 ? a = {
			from: t,
			to: r,
			precise: n && i
		} : this.matches.push({
			from: t,
			index: 1,
			precise: n
		})), a && this.test && !this.test(a.from, a.to, this.buffer, this.bufferStart) && (a = null), a;
	}
};
typeof Symbol < "u" && (qe.prototype[Symbol.iterator] = function() {
	return this;
});
var Je = {
	from: -1,
	to: -1,
	match: /* @__PURE__ */ /.*/.exec(""),
	precise: !0
}, Ye = "gm" + (/x/.unicode == null ? "" : "u"), Xe = class {
	constructor(e, t, n, r = 0, i = e.length) {
		if (this.text = e, this.to = i, this.curLine = "", this.done = !1, this.value = Je, /\\[sWDnr]|\n|\r|\[\^/.test(t)) return new $e(e, t, n, r, i);
		this.re = new RegExp(t, Ye + (n?.ignoreCase ? "i" : "")), this.test = n?.test, this.iter = e.iter();
		let a = e.lineAt(r);
		this.curLineStart = a.from, this.matchPos = tt(e, r), this.getLine(this.curLineStart);
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
				if (this.matchPos = tt(this.text, r + +(n == r)), n == this.curLineStart + this.curLine.length && this.nextLine(), (n < r || n > this.value.to) && (!this.test || this.test(n, r, t))) return this.value = {
					from: n,
					to: r,
					precise: !0,
					match: t
				}, this;
				e = this.matchPos - this.curLineStart;
			} else if (this.curLineStart + this.curLine.length < this.to) this.nextLine(), e = 0;
			else return this.done = !0, this;
		}
	}
}, Ze = /* @__PURE__ */ new WeakMap(), Qe = class e {
	constructor(e, t) {
		this.from = e, this.text = t;
	}
	get to() {
		return this.from + this.text.length;
	}
	static get(t, n, r) {
		let i = Ze.get(t);
		if (!i || i.from >= r || i.to <= n) {
			let i = new e(n, t.sliceString(n, r));
			return Ze.set(t, i), i;
		}
		if (i.from == n && i.to == r) return i;
		let { text: a, from: o } = i;
		return o > n && (a = t.sliceString(n, o) + a, o = n), i.to < r && (a += t.sliceString(i.to, r)), Ze.set(t, new e(o, a)), new e(n, a.slice(n - o, r - o));
	}
}, $e = class {
	constructor(e, t, n, r, i) {
		this.text = e, this.to = i, this.done = !1, this.value = Je, this.matchPos = tt(e, r), this.re = new RegExp(t, Ye + (n?.ignoreCase ? "i" : "")), this.test = n?.test, this.flat = Qe.get(e, r, this.chunkEnd(r + 5e3));
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
					precise: !0,
					match: t
				}, this.matchPos = tt(this.text, n + +(e == n)), this;
			}
			if (this.flat.to == this.to) return this.done = !0, this;
			this.flat = Qe.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
		}
	}
};
typeof Symbol < "u" && (Xe.prototype[Symbol.iterator] = $e.prototype[Symbol.iterator] = function() {
	return this;
});
function et(e) {
	try {
		return new RegExp(e, Ye), !0;
	} catch {
		return !1;
	}
}
function tt(e, t) {
	if (t >= e.length) return t;
	let n = e.lineAt(t), r;
	for (; t < n.to && (r = n.text.charCodeAt(t - n.from)) >= 56320 && r < 57344;) t++;
	return t;
}
var nt = (e) => {
	let { state: t } = e, n = String(t.doc.lineAt(e.state.selection.main.head).number), { close: r, result: i } = z(e, {
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
		let a = t.doc.lineAt(t.selection.main.head), [, o, s, c, u] = i, d = c ? +c.slice(1) : 0, f = s ? +s : a.number;
		if (s && u) {
			let e = f / 100;
			o && (e = e * (o == "-" ? -1 : 1) + a.number / t.doc.lines), f = Math.round(t.doc.lines * e);
		} else s && o && (f = f * (o == "-" ? -1 : 1) + a.number);
		let p = t.doc.line(Math.max(1, Math.min(t.doc.lines, f))), m = l.cursor(p.from + Math.max(0, Math.min(d, p.length)));
		e.dispatch({
			effects: [r, T.scrollIntoView(m.from, { y: "center" })],
			selection: m
		});
	}), !0;
}, rt = {
	highlightWordAroundCursor: !1,
	minSelectionLength: 1,
	maxMatches: 100,
	wholeWords: !1
}, it = /* @__PURE__ */ Te.define({ combine(e) {
	return ae(e, rt, {
		highlightWordAroundCursor: (e, t) => e || t,
		minSelectionLength: Math.min,
		maxMatches: Math.min
	});
} });
function at(e) {
	let t = [dt, ut];
	return e && t.push(it.of(e)), t;
}
var ot = /* @__PURE__ */ j.mark({ class: "cm-selectionMatch" }), st = /* @__PURE__ */ j.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function ct(e, t, n, r) {
	return (n == 0 || e(t.sliceDoc(n - 1, n)) != ie.Word) && (r == t.doc.length || e(t.sliceDoc(r, r + 1)) != ie.Word);
}
function lt(e, t, n, r) {
	return e(t.sliceDoc(n, n + 1)) == ie.Word && e(t.sliceDoc(r - 1, r)) == ie.Word;
}
var ut = /* @__PURE__ */ t.fromClass(class {
	constructor(e) {
		this.decorations = this.getDeco(e);
	}
	update(e) {
		(e.selectionSet || e.docChanged || e.viewportChanged) && (this.decorations = this.getDeco(e.view));
	}
	getDeco(e) {
		let t = e.state.facet(it), { state: n } = e, r = n.selection;
		if (r.ranges.length > 1) return j.none;
		let i = r.main, a, o = null;
		if (i.empty) {
			if (!t.highlightWordAroundCursor) return j.none;
			let e = n.wordAt(i.head);
			if (!e) return j.none;
			o = n.charCategorizer(i.head), a = n.sliceDoc(e.from, e.to);
		} else {
			let e = i.to - i.from;
			if (e < t.minSelectionLength || e > 200) return j.none;
			if (t.wholeWords) {
				if (a = n.sliceDoc(i.from, i.to), o = n.charCategorizer(i.head), !(ct(o, n, i.from, i.to) && lt(o, n, i.from, i.to))) return j.none;
			} else if (a = n.sliceDoc(i.from, i.to), !a) return j.none;
		}
		let s = [];
		for (let r of e.visibleRanges) {
			let e = new qe(n.doc, a, r.from, r.to);
			for (; !e.next().done;) {
				let { from: r, to: a } = e.value;
				if ((!o || ct(o, n, r, a)) && (i.empty && r <= i.from && a >= i.to ? s.push(st.range(r, a)) : (r >= i.to || a <= i.from) && s.push(ot.range(r, a)), s.length > t.maxMatches)) return j.none;
			}
		}
		return j.set(s);
	}
}, { decorations: (e) => e.decorations }), dt = /* @__PURE__ */ T.baseTheme({
	".cm-selectionMatch": { backgroundColor: "#99ff7780" },
	".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
}), ft = ({ state: e, dispatch: t }) => {
	let { selection: n } = e, r = l.create(n.ranges.map((t) => e.wordAt(t.head) || l.cursor(t.head)), n.mainIndex);
	return r.eq(n) ? !1 : (t(e.update({ selection: r })), !0);
};
function pt(e, t) {
	let { main: n, ranges: r } = e.selection, i = e.wordAt(n.head), a = i && i.from == n.from && i.to == n.to;
	for (let n = !1, i = new qe(e.doc, t, r[r.length - 1].to);;) if (i.next(), i.done) {
		if (n) return null;
		i = new qe(e.doc, t, 0, Math.max(0, r[r.length - 1].from - 1)), n = !0;
	} else {
		if (n && r.some((e) => e.from == i.value.from)) continue;
		if (a) {
			let t = e.wordAt(i.value.from);
			if (!t || t.from != i.value.from || t.to != i.value.to) continue;
		}
		return i.value;
	}
}
var mt = ({ state: e, dispatch: t }) => {
	let { ranges: n } = e.selection;
	if (n.some((e) => e.from === e.to)) return ft({
		state: e,
		dispatch: t
	});
	let r = e.sliceDoc(n[0].from, n[0].to);
	if (e.selection.ranges.some((t) => e.sliceDoc(t.from, t.to) != r)) return !1;
	let i = pt(e, r);
	return i ? (t(e.update({
		selection: e.selection.addRange(l.range(i.from, i.to), !1),
		effects: T.scrollIntoView(i.to)
	})), !0) : !1;
}, ht = /* @__PURE__ */ Te.define({ combine(e) {
	return ae(e, {
		top: !1,
		caseSensitive: !1,
		literal: !1,
		regexp: !1,
		wholeWord: !1,
		createPanel: (e) => new Kt(e),
		scrollToMatch: (e) => T.scrollIntoView(e)
	});
} }), gt = class {
	constructor(e) {
		this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.literal = !!e.literal, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || et(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!e.wholeWord, this.test = e.test;
	}
	unquote(e) {
		return this.literal ? e : e.replace(/\\([nrt\\])/g, (e, t) => t == "n" ? "\n" : t == "r" ? "\r" : t == "t" ? "	" : "\\");
	}
	eq(e) {
		return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp && this.wholeWord == e.wholeWord && this.test == e.test;
	}
	create() {
		return this.regexp ? new Et(this) : new bt(this);
	}
	getCursor(e, t = 0, n) {
		let r = e.doc ? e : C.create({ doc: e });
		return n ??= r.doc.length, this.regexp ? St(this, r, t, n) : H(this, r, t, n);
	}
}, _t = class {
	constructor(e) {
		this.spec = e;
	}
};
function vt(e, t, n) {
	return (r, i, a, o) => n && !n(r, i, a, o) ? !1 : e(r >= o && i <= o + a.length ? a.slice(r - o, i - o) : t.doc.sliceString(r, i), t, r, i);
}
function H(e, t, n, r) {
	let i;
	return e.wholeWord && (i = yt(t.doc, t.charCategorizer(t.selection.main.head))), e.test && (i = vt(e.test, t, i)), new qe(t.doc, e.unquoted, n, r, e.caseSensitive ? void 0 : (e) => e.toLowerCase(), i);
}
function yt(e, t) {
	return (n, r, i, a) => ((a > n || a + i.length < r) && (a = Math.max(0, n - 2), i = e.sliceString(a, Math.min(e.length, r + 2))), (t(Ct(i, n - a)) != ie.Word || t(wt(i, n - a)) != ie.Word) && (t(wt(i, r - a)) != ie.Word || t(Ct(i, r - a)) != ie.Word));
}
var bt = class extends _t {
	constructor(e) {
		super(e);
	}
	nextMatch(e, t, n) {
		let r = H(this.spec, e, n, e.doc.length).nextOverlapping();
		if (r.done) {
			let n = Math.min(e.doc.length, t + this.spec.unquoted.length);
			r = H(this.spec, e, 0, n).nextOverlapping();
		}
		return r.done || r.value.from == t && r.value.to == n ? null : r.value;
	}
	prevMatchInRange(e, t, n) {
		for (let r = n;;) {
			let n = Math.max(t, r - 1e4 - this.spec.unquoted.length), i = H(this.spec, e, n, r), a = null;
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
		let n = H(this.spec, e, 0, e.doc.length), r = [];
		for (; !n.next().done;) {
			if (r.length >= t) return null;
			r.push(n.value);
		}
		return r;
	}
	highlight(e, t, n, r) {
		let i = H(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(n + this.spec.unquoted.length, e.doc.length));
		for (; !i.next().done;) r(i.value.from, i.value.to);
	}
};
function xt(e, t, n) {
	return (r, i, a) => (!n || n(r, i, a)) && e(a[0], t, r, i);
}
function St(e, t, n, r) {
	let i;
	return e.wholeWord && (i = Tt(t.charCategorizer(t.selection.main.head))), e.test && (i = xt(e.test, t, i)), new Xe(t.doc, e.search, {
		ignoreCase: !e.caseSensitive,
		test: i
	}, n, r);
}
function Ct(e, t) {
	return e.slice(k(e, t, !1), t);
}
function wt(e, t) {
	return e.slice(t, k(e, t));
}
function Tt(e) {
	return (t, n, r) => !r[0].length || (e(Ct(r.input, r.index)) != ie.Word || e(wt(r.input, r.index)) != ie.Word) && (e(wt(r.input, r.index + r[0].length)) != ie.Word || e(Ct(r.input, r.index + r[0].length)) != ie.Word);
}
var Et = class extends _t {
	nextMatch(e, t, n) {
		let r = St(this.spec, e, n, e.doc.length).next();
		return r.done && (r = St(this.spec, e, 0, t).next()), r.done ? null : r.value;
	}
	prevMatchInRange(e, t, n) {
		for (let r = 1;; r++) {
			let i = Math.max(t, n - r * 1e4), a = St(this.spec, e, i, n), o = null;
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
		let n = St(this.spec, e, 0, e.doc.length), r = [];
		for (; !n.next().done;) {
			if (r.length >= t) return null;
			r.push(n.value);
		}
		return r;
	}
	highlight(e, t, n, r) {
		let i = St(this.spec, e, Math.max(0, t - 250), Math.min(n + 250, e.doc.length));
		for (; !i.next().done;) r(i.value.from, i.value.to);
	}
}, Dt = /* @__PURE__ */ p.define(), Ot = /* @__PURE__ */ p.define(), U = /* @__PURE__ */ g.define({
	create(e) {
		return new W(Bt(e).create(), null);
	},
	update(e, t) {
		for (let n of t.effects) n.is(Dt) ? e = new W(n.value.create(), e.panel) : n.is(Ot) && (e = new W(e.query, n.value ? zt : null));
		return e;
	},
	provide: (e) => V.from(e, (e) => e.panel)
}), W = class {
	constructor(e, t) {
		this.query = e, this.panel = t;
	}
}, kt = /* @__PURE__ */ j.mark({ class: "cm-searchMatch" }), At = /* @__PURE__ */ j.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), jt = /* @__PURE__ */ t.fromClass(class {
	constructor(e) {
		this.view = e, this.decorations = this.highlight(e.state.field(U));
	}
	update(e) {
		let t = e.state.field(U);
		(t != e.startState.field(U) || e.docChanged || e.selectionSet || e.viewportChanged) && (this.decorations = this.highlight(t));
	}
	highlight({ query: e, panel: t }) {
		if (!t || !e.spec.valid) return j.none;
		let { view: n } = this, r = new ee();
		for (let t = 0, i = n.visibleRanges, a = i.length; t < a; t++) {
			let { from: o, to: s } = i[t];
			for (; t < a - 1 && s > i[t + 1].from - 500;) s = i[++t].to;
			e.highlight(n.state, o, s, (e, t) => {
				let i = n.state.selection.ranges.some((n) => n.from == e && n.to == t);
				r.add(e, t, i ? At : kt);
			});
		}
		return r.finish();
	}
}, { decorations: (e) => e.decorations });
function Mt(e) {
	return (t) => {
		let n = t.state.field(U, !1);
		return n && n.query.spec.valid ? e(t, n) : Ut(t);
	};
}
var Nt = /* @__PURE__ */ Mt((e, { query: t }) => {
	let { to: n } = e.state.selection.main, r = t.nextMatch(e.state, n, n);
	if (!r) return !1;
	let i = l.single(r.from, r.to), a = e.state.facet(ht);
	return e.dispatch({
		selection: i,
		effects: [Yt(e, r), a.scrollToMatch(i.main, e)],
		userEvent: "select.search"
	}), Ht(e), !0;
}), Pt = /* @__PURE__ */ Mt((e, { query: t }) => {
	let { state: n } = e, { from: r } = n.selection.main, i = t.prevMatch(n, r, r);
	if (!i) return !1;
	let a = l.single(i.from, i.to), o = e.state.facet(ht);
	return e.dispatch({
		selection: a,
		effects: [Yt(e, i), o.scrollToMatch(a.main, e)],
		userEvent: "select.search"
	}), Ht(e), !0;
}), Ft = /* @__PURE__ */ Mt((e, { query: t }) => {
	let n = t.matchAll(e.state, 1e3);
	return !n || !n.length ? !1 : (e.dispatch({
		selection: l.create(n.map((e) => l.range(e.from, e.to))),
		userEvent: "select.search.matches"
	}), !0);
}), It = ({ state: e, dispatch: t }) => {
	let n = e.selection;
	if (n.ranges.length > 1 || n.main.empty) return !1;
	let { from: r, to: i } = n.main, a = [], o = 0;
	for (let t = new qe(e.doc, e.sliceDoc(r, i)); !t.next().done;) {
		if (a.length > 1e3) return !1;
		t.value.from == r && (o = a.length), a.push(l.range(t.value.from, t.value.to));
	}
	return t(e.update({
		selection: l.create(a, o),
		userEvent: "select.search.matches"
	})), !0;
}, Lt = /* @__PURE__ */ Mt((e, { query: t }) => {
	let { state: n } = e, { from: r, to: i } = n.selection.main;
	if (n.readOnly) return !1;
	let a = t.nextMatch(n, r, r);
	if (!a) return !1;
	let o = a, s = [], c, u, d = [];
	o.precise ? o.from == r && o.to == i && (u = n.toText(t.getReplacement(o)), s.push({
		from: o.from,
		to: o.to,
		insert: u
	}), d.push(T.announce.of(n.phrase("replaced match on line $", n.doc.lineAt(r).number) + "."))) : o = t.nextMatch(n, o.from, o.to);
	let f = e.state.changes(s);
	return o && (c = l.single(o.from, o.to).map(f), d.push(Yt(e, o)), d.push(n.facet(ht).scrollToMatch(c.main, e))), e.dispatch({
		changes: f,
		selection: c,
		effects: d,
		userEvent: "input.replace"
	}), !0;
}), Rt = /* @__PURE__ */ Mt((e, { query: t }) => {
	if (e.state.readOnly) return !1;
	let n = [];
	for (let r of t.matchAll(e.state, 1e9)) {
		let { from: e, to: i, precise: a } = r;
		a && n.push({
			from: e,
			to: i,
			insert: t.getReplacement(r)
		});
	}
	if (!n.length) return !1;
	let r = e.state.phrase("replaced $ matches", n.length) + ".";
	return e.dispatch({
		changes: n,
		effects: T.announce.of(r),
		userEvent: "input.replace.all"
	}), !0;
});
function zt(e) {
	return e.state.facet(ht).createPanel(e);
}
function Bt(e, t) {
	let n = e.selection.main, r = n.empty || n.to > n.from + 100 ? "" : e.sliceDoc(n.from, n.to);
	if (t && !r) return t;
	let i = e.facet(ht);
	return new gt({
		search: t?.literal ?? i.literal ? r : r.replace(/\n/g, "\\n"),
		caseSensitive: t?.caseSensitive ?? i.caseSensitive,
		literal: t?.literal ?? i.literal,
		regexp: t?.regexp ?? i.regexp,
		wholeWord: t?.wholeWord ?? i.wholeWord
	});
}
function Vt(e) {
	let t = Ae(e, zt);
	return t && t.dom.querySelector("[main-field]");
}
function Ht(e) {
	let t = Vt(e);
	t && t == e.root.activeElement && t.select();
}
var Ut = (e) => {
	let t = e.state.field(U, !1);
	if (t && t.panel) {
		let n = Vt(e);
		if (n && n != e.root.activeElement) {
			let r = Bt(e.state, t.query.spec);
			r.valid && e.dispatch({ effects: Dt.of(r) }), n.focus(), n.select();
		}
	} else e.dispatch({ effects: [Ot.of(!0), t ? Dt.of(Bt(e.state, t.query.spec)) : p.appendConfig.of(Zt)] });
	return !0;
}, Wt = (e) => {
	let t = e.state.field(U, !1);
	if (!t || !t.panel) return !1;
	let n = Ae(e, zt);
	return n && n.dom.contains(e.root.activeElement) && e.focus(), e.dispatch({ effects: Ot.of(!1) }), !0;
}, Gt = [
	{
		key: "Mod-f",
		run: Ut,
		scope: "editor search-panel"
	},
	{
		key: "F3",
		run: Nt,
		shift: Pt,
		scope: "editor search-panel",
		preventDefault: !0
	},
	{
		key: "Mod-g",
		run: Nt,
		shift: Pt,
		scope: "editor search-panel",
		preventDefault: !0
	},
	{
		key: "Escape",
		run: Wt,
		scope: "editor search-panel"
	},
	{
		key: "Mod-Shift-l",
		run: It
	},
	{
		key: "Mod-Alt-g",
		run: nt
	},
	{
		key: "Mod-d",
		run: mt,
		preventDefault: !0
	}
], Kt = class {
	constructor(e) {
		this.view = e;
		let t = this.query = e.state.field(U).query.spec;
		this.commit = this.commit.bind(this), this.searchField = B("input", {
			value: t.search,
			placeholder: G(e, "Find"),
			"aria-label": G(e, "Find"),
			class: "cm-textfield",
			name: "search",
			form: "",
			"main-field": "true",
			onchange: this.commit,
			onkeyup: this.commit
		}), this.replaceField = B("input", {
			value: t.replace,
			placeholder: G(e, "Replace"),
			"aria-label": G(e, "Replace"),
			class: "cm-textfield",
			name: "replace",
			form: "",
			onchange: this.commit,
			onkeyup: this.commit
		}), this.caseField = B("input", {
			type: "checkbox",
			name: "case",
			form: "",
			checked: t.caseSensitive,
			onchange: this.commit
		}), this.reField = B("input", {
			type: "checkbox",
			name: "re",
			form: "",
			checked: t.regexp,
			onchange: this.commit
		}), this.wordField = B("input", {
			type: "checkbox",
			name: "word",
			form: "",
			checked: t.wholeWord,
			onchange: this.commit
		});
		function n(e, t, n) {
			return B("button", {
				class: "cm-button",
				name: e,
				onclick: t,
				type: "button"
			}, n);
		}
		this.dom = B("div", {
			onkeydown: (e) => this.keydown(e),
			class: "cm-search"
		}, [
			this.searchField,
			n("next", () => Nt(e), [G(e, "next")]),
			n("prev", () => Pt(e), [G(e, "previous")]),
			n("select", () => Ft(e), [G(e, "all")]),
			B("label", null, [this.caseField, G(e, "match case")]),
			B("label", null, [this.reField, G(e, "regexp")]),
			B("label", null, [this.wordField, G(e, "by word")]),
			...e.state.readOnly ? [] : [
				B("br"),
				this.replaceField,
				n("replace", () => Lt(e), [G(e, "replace")]),
				n("replaceAll", () => Rt(e), [G(e, "replace all")])
			],
			B("button", {
				name: "close",
				onclick: () => Wt(e),
				"aria-label": G(e, "close"),
				type: "button"
			}, ["×"])
		]);
	}
	commit() {
		let e = new gt({
			search: this.searchField.value,
			caseSensitive: this.caseField.checked,
			regexp: this.reField.checked,
			wholeWord: this.wordField.checked,
			replace: this.replaceField.value
		});
		e.eq(this.query) || (this.query = e, this.view.dispatch({ effects: Dt.of(e) }));
	}
	keydown(e) {
		ue(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? Pt : Nt)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), Lt(this.view));
	}
	update(e) {
		for (let t of e.transactions) for (let e of t.effects) e.is(Dt) && !e.value.eq(this.query) && this.setQuery(e.value);
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
		return this.view.state.facet(ht).top;
	}
};
function G(e, t) {
	return e.state.phrase(t);
}
var qt = 30, Jt = /[\s\.,:;?!]/;
function Yt(e, { from: t, to: n }) {
	let r = e.state.doc.lineAt(t), i = e.state.doc.lineAt(n).to, a = Math.max(r.from, t - qt), o = Math.min(i, n + qt), s = e.state.sliceDoc(a, o);
	if (a != r.from) {
		for (let e = 0; e < qt; e++) if (!Jt.test(s[e + 1]) && Jt.test(s[e])) {
			s = s.slice(e);
			break;
		}
	}
	if (o != i) {
		for (let e = s.length - 1; e > s.length - qt; e--) if (!Jt.test(s[e - 1]) && Jt.test(s[e])) {
			s = s.slice(0, e);
			break;
		}
	}
	return T.announce.of(`${e.state.phrase("current match")}. ${s} ${e.state.phrase("on line")} ${r.number}.`);
}
var Xt = /* @__PURE__ */ T.baseTheme({
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
}), Zt = [
	U,
	/* @__PURE__ */ Ce.low(jt),
	Xt
], Qt = (e) => {
	let { state: t } = e, n = t.doc.lineAt(t.selection.main.from), r = rn(e.state, n.from);
	return r.line ? en(e) : r.block ? nn(e) : !1;
};
function $t(e, t) {
	return ({ state: n, dispatch: r }) => {
		if (n.readOnly) return !1;
		let i = e(t, n);
		return i ? (r(n.update(i)), !0) : !1;
	};
}
var en = /* @__PURE__ */ $t(ln, 0), tn = /* @__PURE__ */ $t(cn, 0), nn = /* @__PURE__ */ $t((e, t) => cn(e, t, sn(t)), 0);
function rn(e, t) {
	let n = e.languageDataAt("commentTokens", t, 1);
	return n.length ? n[0] : {};
}
var an = 50;
function on(e, { open: t, close: n }, r, i) {
	let a = e.sliceDoc(r - an, r), o = e.sliceDoc(i, i + an), s = /\s*$/.exec(a)[0].length, c = /^\s*/.exec(o)[0].length, l = a.length - s;
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
	i - r <= 2 * an ? u = d = e.sliceDoc(r, i) : (u = e.sliceDoc(r, r + an), d = e.sliceDoc(i - an, i));
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
function sn(e) {
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
function cn(e, t, n = t.selection.ranges) {
	let r = n.map((e) => rn(t, e.from).block);
	if (!r.every((e) => e)) return null;
	let i = n.map((e, n) => on(t, r[n], e.from, e.to));
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
function ln(e, t, n = t.selection.ranges) {
	let r = [], i = -1;
	ranges: for (let { from: e, to: a } of n) {
		let n = r.length, o = 1e9, s;
		for (let n = e; n <= a;) {
			let c = t.doc.lineAt(n);
			if (s == null && (s = rn(t, c.from).line, !s)) continue ranges;
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
var un = /* @__PURE__ */ ne.define(), dn = /* @__PURE__ */ ne.define(), fn = /* @__PURE__ */ Te.define(), pn = /* @__PURE__ */ Te.define({ combine(e) {
	return ae(e, {
		minDepth: 100,
		newGroupDelay: 500,
		joinToEvent: (e, t) => t
	}, {
		minDepth: Math.max,
		newGroupDelay: Math.min,
		joinToEvent: (e, t) => (n, r) => e(n, r) || t(n, r)
	});
} }), mn = /* @__PURE__ */ g.define({
	create() {
		return Nn.empty;
	},
	update(e, t) {
		let n = t.state.facet(pn), r = t.annotation(un);
		if (r) {
			let i = xn.fromTransaction(t, r.selection), a = r.side, o = a == 0 ? e.undone : e.done;
			return o = i ? Sn(o, o.length, n.minDepth, i) : On(o, t.startState.selection), new Nn(a == 0 ? r.rest : o, a == 0 ? o : r.rest);
		}
		let i = t.annotation(dn);
		if ((i == "full" || i == "before") && (e = e.isolate()), t.annotation(te.addToHistory) === !1) return t.changes.empty ? e : e.addMapping(t.changes.desc);
		let a = xn.fromTransaction(t), o = t.annotation(te.time), s = t.annotation(te.userEvent);
		return a ? e = e.addChanges(a, o, s, n, t) : t.selection && (e = e.addSelection(t.startState.selection, o, s, n.newGroupDelay)), (i == "full" || i == "after") && (e = e.isolate()), e;
	},
	toJSON(e) {
		return {
			done: e.done.map((e) => e.toJSON()),
			undone: e.undone.map((e) => e.toJSON())
		};
	},
	fromJSON(e) {
		return new Nn(e.done.map(xn.fromJSON), e.undone.map(xn.fromJSON));
	}
});
function hn(e = {}) {
	return [
		mn,
		pn.of(e),
		T.domEventHandlers({ beforeinput(e, t) {
			let n = e.inputType == "historyUndo" ? _n : e.inputType == "historyRedo" ? vn : null;
			return n ? (e.preventDefault(), n(t)) : !1;
		} })
	];
}
function gn(e, t) {
	return function({ state: n, dispatch: r }) {
		if (!t && n.readOnly) return !1;
		let i = n.field(mn, !1);
		if (!i) return !1;
		let a = i.pop(e, n, t);
		return a ? (r(a), !0) : !1;
	};
}
var _n = /* @__PURE__ */ gn(0, !1), vn = /* @__PURE__ */ gn(1, !1), yn = /* @__PURE__ */ gn(0, !0), bn = /* @__PURE__ */ gn(1, !0), xn = class e {
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
		return new e(t.changes && Ie.fromJSON(t.changes), [], t.mapped && s.fromJSON(t.mapped), t.startSelection && l.fromJSON(t.startSelection), t.selectionsAfter.map(l.fromJSON));
	}
	static fromTransaction(t, n) {
		let r = En;
		for (let e of t.startState.facet(fn)) {
			let n = e(t);
			n.length && (r = r.concat(n));
		}
		return !r.length && t.changes.empty ? null : new e(t.changes.invert(t.startState.doc), r, void 0, n || t.startState.selection, En);
	}
	static selection(t) {
		return new e(void 0, En, void 0, void 0, t);
	}
};
function Sn(e, t, n, r) {
	let i = t + 1 > n + 20 ? t - n - 1 : 0, a = e.slice(i, t);
	return a.push(r), a;
}
function Cn(e, t) {
	let n = [], r = !1;
	return e.iterChangedRanges((e, t) => n.push(e, t)), t.iterChangedRanges((e, t, i, a) => {
		for (let e = 0; e < n.length;) {
			let t = n[e++], o = n[e++];
			a >= t && i <= o && (r = !0);
		}
	}), r;
}
function wn(e, t) {
	return e.ranges.length == t.ranges.length && e.ranges.filter((e, n) => e.empty != t.ranges[n].empty).length === 0;
}
function Tn(e, t) {
	return e.length ? t.length ? e.concat(t) : e : t;
}
var En = [], Dn = 200;
function On(e, t) {
	if (e.length) {
		let n = e[e.length - 1], r = n.selectionsAfter.slice(Math.max(0, n.selectionsAfter.length - Dn));
		return r.length && r[r.length - 1].eq(t) ? e : (r.push(t), Sn(e, e.length - 1, 1e9, n.setSelAfter(r)));
	} else return [xn.selection([t])];
}
function kn(e) {
	let t = e[e.length - 1], n = e.slice();
	return n[e.length - 1] = t.setSelAfter(t.selectionsAfter.slice(0, t.selectionsAfter.length - 1)), n;
}
function An(e, t) {
	if (!e.length) return e;
	let n = e.length, r = En;
	for (; n;) {
		let i = jn(e[n - 1], t, r);
		if (i.changes && !i.changes.empty || i.effects.length) {
			let t = e.slice(0, n);
			return t[n - 1] = i, t;
		} else t = i.mapped, n--, r = i.selectionsAfter;
	}
	return r.length ? [xn.selection(r)] : En;
}
function jn(e, t, n) {
	let r = Tn(e.selectionsAfter.length ? e.selectionsAfter.map((e) => e.map(t)) : En, n);
	if (!e.changes) return xn.selection(r);
	let i = e.changes.map(t), a = t.mapDesc(e.changes, !0), o = e.mapped ? e.mapped.composeDesc(a) : a;
	return new xn(i, p.mapEffects(e.effects, t), o, e.startSelection.map(a), r);
}
var Mn = /^(input\.type|delete)($|\.)/, Nn = class e {
	constructor(e, t, n = 0, r = void 0) {
		this.done = e, this.undone = t, this.prevTime = n, this.prevUserEvent = r;
	}
	isolate() {
		return this.prevTime ? new e(this.done, this.undone) : this;
	}
	addChanges(t, n, r, i, a) {
		let o = this.done, s = o[o.length - 1];
		return o = s && s.changes && !s.changes.empty && t.changes && (!r || Mn.test(r)) && (!s.selectionsAfter.length && n - this.prevTime < i.newGroupDelay && i.joinToEvent(a, Cn(s.changes, t.changes)) || r == "input.type.compose") ? Sn(o, o.length - 1, i.minDepth, new xn(t.changes.compose(s.changes), Tn(p.mapEffects(t.effects, s.changes), s.effects), s.mapped, s.startSelection, En)) : Sn(o, o.length, i.minDepth, t), new e(o, En, n, r);
	}
	addSelection(t, n, r, i) {
		let a = this.done.length ? this.done[this.done.length - 1].selectionsAfter : En;
		return a.length > 0 && n - this.prevTime < i && r == this.prevUserEvent && r && /^select($|\.)/.test(r) && wn(a[a.length - 1], t) ? this : new e(On(this.done, t), this.undone, n, r);
	}
	addMapping(t) {
		return new e(An(this.done, t), An(this.undone, t), this.prevTime, this.prevUserEvent);
	}
	pop(e, t, n) {
		let r = e == 0 ? this.done : this.undone;
		if (r.length == 0) return null;
		let i = r[r.length - 1], a = i.selectionsAfter[0] || (i.startSelection ? i.startSelection.map(i.changes.invertedDesc, 1) : t.selection);
		if (n && i.selectionsAfter.length) return t.update({
			selection: i.selectionsAfter[i.selectionsAfter.length - 1],
			annotations: un.of({
				side: e,
				rest: kn(r),
				selection: a
			}),
			userEvent: e == 0 ? "select.undo" : "select.redo",
			scrollIntoView: !0
		});
		if (i.changes) {
			let n = r.length == 1 ? En : r.slice(0, r.length - 1);
			return i.mapped && (n = An(n, i.mapped)), t.update({
				changes: i.changes,
				selection: i.startSelection,
				effects: i.effects,
				annotations: un.of({
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
Nn.empty = /* @__PURE__ */ new Nn(En, En);
var Pn = [
	{
		key: "Mod-z",
		run: _n,
		preventDefault: !0
	},
	{
		key: "Mod-y",
		mac: "Mod-Shift-z",
		run: vn,
		preventDefault: !0
	},
	{
		linux: "Ctrl-Shift-z",
		run: vn,
		preventDefault: !0
	},
	{
		key: "Mod-u",
		run: yn,
		preventDefault: !0
	},
	{
		key: "Alt-u",
		mac: "Mod-Shift-u",
		run: bn,
		preventDefault: !0
	}
];
function Fn(e, t) {
	return l.create(e.ranges.map(t), e.mainIndex);
}
function In(e, t) {
	return e.update({
		selection: t,
		scrollIntoView: !0,
		userEvent: "select"
	});
}
function Ln({ state: e, dispatch: t }, n) {
	let r = Fn(e.selection, n);
	return r.eq(e.selection, !0) ? !1 : (t(In(e, r)), !0);
}
function Rn(e, t) {
	return l.cursor(t ? e.to : e.from);
}
function zn(e, t) {
	return Ln(e, (n) => n.empty ? e.moveByChar(n, t) : Rn(n, t));
}
function K(e) {
	return e.textDirectionAt(e.state.selection.main.head) == M.LTR;
}
var Bn = (e) => zn(e, !K(e)), Vn = (e) => zn(e, K(e)), Hn = (e) => zn(e, !1);
function Un(e, t) {
	return Ln(e, (n) => n.empty ? e.moveByGroup(n, t) : Rn(n, t));
}
var Wn = (e) => Un(e, !K(e)), Gn = (e) => Un(e, K(e));
typeof Intl < "u" && Intl.Segmenter;
function Kn(e, t, n) {
	if (t.type.prop(n)) return !0;
	let r = t.to - t.from;
	return r && (r > 2 || /[^\s,.;:]/.test(e.sliceDoc(t.from, t.to))) || t.firstChild;
}
function qn(e, t, n) {
	let r = E(e).resolveInner(t.head), i = n ? O.closedBy : O.openedBy;
	for (let a = t.head;;) {
		let t = n ? r.childAfter(a) : r.childBefore(a);
		if (!t) break;
		Kn(e, t, i) ? r = t : a = n ? t.to : t.from;
	}
	let a = r.type.prop(i), o, s;
	return s = a && (o = n ? f(e, r.from, 1) : f(e, r.to, -1)) && o.matched ? n ? o.end.to : o.end.from : n ? r.to : r.from, l.cursor(s, n ? -1 : 1);
}
var Jn = (e) => Ln(e, (t) => qn(e.state, t, !K(e))), Yn = (e) => Ln(e, (t) => qn(e.state, t, K(e)));
function Xn(e, t) {
	return Ln(e, (n) => {
		if (!n.empty) return Rn(n, t);
		let r = e.moveVertically(n, t);
		return r.head == n.head ? e.moveToLineBoundary(n, t) : r;
	});
}
var Zn = (e) => Xn(e, !1), Qn = (e) => Xn(e, !0);
function $n(e) {
	let t = e.scrollDOM.clientHeight < e.scrollDOM.scrollHeight - 2, n = 0, r = 0, i;
	if (t) {
		for (let t of e.state.facet(T.scrollMargins)) {
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
function er(e, t) {
	let n = $n(e), { state: r } = e, i = Fn(r.selection, (r) => r.empty ? e.moveVertically(r, t, n.height) : Rn(r, t));
	if (i.eq(r.selection)) return !1;
	let a;
	if (n.selfScroll) {
		let t = e.coordsAtPos(r.selection.main.head), o = e.scrollDOM.getBoundingClientRect(), s = o.top + n.marginTop, c = o.bottom - n.marginBottom;
		t && t.top > s && t.bottom < c && (a = T.scrollIntoView(i.main.head, {
			y: "start",
			yMargin: t.top - s
		}));
	}
	return e.dispatch(In(r, i), { effects: a }), !0;
}
var tr = (e) => er(e, !1), nr = (e) => er(e, !0);
function rr(e, t, n) {
	let r = e.lineBlockAt(t.head), i = e.moveToLineBoundary(t, n);
	if (i.head == t.head && i.head != (n ? r.to : r.from) && (i = e.moveToLineBoundary(t, n, !1)), !n && i.head == r.from && r.length) {
		let n = /^\s*/.exec(e.state.sliceDoc(r.from, Math.min(r.from + 100, r.to)))[0].length;
		n && t.head != r.from + n && (i = l.cursor(r.from + n));
	}
	return i;
}
var ir = (e) => Ln(e, (t) => rr(e, t, !0)), ar = (e) => Ln(e, (t) => rr(e, t, !1)), or = (e) => Ln(e, (t) => rr(e, t, !K(e))), sr = (e) => Ln(e, (t) => rr(e, t, K(e))), cr = (e) => Ln(e, (t) => l.cursor(e.lineBlockAt(t.head).from, 1)), lr = (e) => Ln(e, (t) => l.cursor(e.lineBlockAt(t.head).to, -1));
function ur(e, t, n) {
	let r = !1, i = Fn(e.selection, (t) => {
		let i = f(e, t.head, -1) || f(e, t.head, 1) || t.head > 0 && f(e, t.head - 1, 1) || t.head < e.doc.length && f(e, t.head + 1, -1);
		if (!i || !i.end) return t;
		r = !0;
		let a = i.start.from == t.head ? i.end.to : i.end.from;
		return n ? l.range(t.anchor, a) : l.cursor(a);
	});
	return r ? (t(In(e, i)), !0) : !1;
}
var dr = ({ state: e, dispatch: t }) => ur(e, t, !1);
function fr(e, t) {
	let n = Fn(e.state.selection, (e) => {
		let n = t(e);
		return l.range(e.anchor, n.head, n.goalColumn, n.bidiLevel || void 0, n.assoc);
	});
	return n.eq(e.state.selection) ? !1 : (e.dispatch(In(e.state, n)), !0);
}
function pr(e, t) {
	return fr(e, (n) => e.moveByChar(n, t));
}
var mr = (e) => pr(e, !K(e)), hr = (e) => pr(e, K(e));
function gr(e, t) {
	return fr(e, (n) => e.moveByGroup(n, t));
}
var _r = (e) => gr(e, !K(e)), vr = (e) => gr(e, K(e)), yr = (e) => fr(e, (t) => qn(e.state, t, !K(e))), br = (e) => fr(e, (t) => qn(e.state, t, K(e)));
function xr(e, t) {
	return fr(e, (n) => e.moveVertically(n, t));
}
var Sr = (e) => xr(e, !1), Cr = (e) => xr(e, !0);
function wr(e, t) {
	return fr(e, (n) => e.moveVertically(n, t, $n(e).height));
}
var Tr = (e) => wr(e, !1), Er = (e) => wr(e, !0), Dr = (e) => fr(e, (t) => rr(e, t, !0)), Or = (e) => fr(e, (t) => rr(e, t, !1)), kr = (e) => fr(e, (t) => rr(e, t, !K(e))), Ar = (e) => fr(e, (t) => rr(e, t, K(e))), jr = (e) => fr(e, (t) => l.cursor(e.lineBlockAt(t.head).from)), Mr = (e) => fr(e, (t) => l.cursor(e.lineBlockAt(t.head).to)), Nr = ({ state: e, dispatch: t }) => (t(In(e, { anchor: 0 })), !0), Pr = ({ state: e, dispatch: t }) => (t(In(e, { anchor: e.doc.length })), !0), Fr = ({ state: e, dispatch: t }) => (t(In(e, {
	anchor: e.selection.main.anchor,
	head: 0
})), !0), Ir = ({ state: e, dispatch: t }) => (t(In(e, {
	anchor: e.selection.main.anchor,
	head: e.doc.length
})), !0), Lr = ({ state: e, dispatch: t }) => (t(e.update({
	selection: {
		anchor: 0,
		head: e.doc.length
	},
	userEvent: "select"
})), !0), Rr = ({ state: e, dispatch: t }) => {
	let n = ri(e).map(({ from: t, to: n }) => l.range(t, Math.min(n + 1, e.doc.length)));
	return t(e.update({
		selection: l.create(n),
		userEvent: "select"
	})), !0;
}, zr = ({ state: e, dispatch: t }) => {
	let n = Fn(e.selection, (t) => {
		let n = E(e), r = n.resolveStack(t.from, 1);
		if (t.empty) {
			let e = n.resolveStack(t.from, -1);
			e.node.from >= r.node.from && e.node.to <= r.node.to && (r = e);
		}
		for (let e = r; e; e = e.next) {
			let { node: n } = e;
			if ((n.from < t.from && n.to >= t.to || n.to > t.to && n.from <= t.from) && e.next) return l.range(n.to, n.from);
		}
		return t;
	});
	return n.eq(e.selection) ? !1 : (t(In(e, n)), !0);
};
function Br(e, t) {
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
	return i.length == r.ranges.length ? !1 : (e.dispatch(In(n, l.create(i, i.length - 1))), !0);
}
var Vr = (e) => Br(e, !1), Hr = (e) => Br(e, !0), Ur = ({ state: e, dispatch: t }) => {
	let n = e.selection, r = null;
	return n.ranges.length > 1 ? r = l.create([n.main]) : n.main.empty || (r = l.create([l.cursor(n.main.head)])), r ? (t(In(e, r)), !0) : !1;
};
function Wr(e, t) {
	if (e.state.readOnly) return !1;
	let n = "delete.selection", { state: r } = e, i = r.changeByRange((r) => {
		let { from: i, to: a } = r;
		if (i == a) {
			let o = t(r);
			o < i ? (n = "delete.backward", o = Gr(e, o, !1)) : o > i && (n = "delete.forward", o = Gr(e, o, !0)), i = Math.min(i, o), a = Math.max(a, o);
		} else i = Gr(e, i, !1), a = Gr(e, a, !0);
		return i == a ? { range: r } : {
			changes: {
				from: i,
				to: a
			},
			range: l.cursor(i, i < r.head ? -1 : 1)
		};
	});
	return i.changes.empty ? !1 : (e.dispatch(r.update(i, {
		scrollIntoView: !0,
		userEvent: n,
		effects: n == "delete.selection" ? T.announce.of(r.phrase("Selection deleted")) : void 0
	})), !0);
}
function Gr(e, t, n) {
	if (e instanceof T) for (let r of e.state.facet(T.atomicRanges).map((t) => t(e))) r.between(t, t, (e, r) => {
		e < t && r > t && (t = n ? r : e);
	});
	return t;
}
var Kr = (e, t, n) => Wr(e, (r) => {
	let i = r.from, { state: a } = e, o = a.doc.lineAt(i), s, c;
	if (n && !t && i > o.from && i < o.from + 200 && !/[^ \t]/.test(s = o.text.slice(0, i - o.from))) {
		if (s[s.length - 1] == "	") return i - 1;
		let e = h(s, a.tabSize) % S(a) || S(a);
		for (let t = 0; t < e && s[s.length - 1 - t] == " "; t++) i--;
		c = i;
	} else c = k(o.text, i - o.from, t, t) + o.from, c == i && o.number != (t ? a.doc.lines : 1) ? c += t ? 1 : -1 : !t && /[\ufe00-\ufe0f]/.test(o.text.slice(c - o.from, i - o.from)) && (c = k(o.text, c - o.from, !1, !1) + o.from);
	return c;
}), qr = (e) => Kr(e, !1, !0), Jr = (e) => Kr(e, !0, !1), Yr = (e, t) => Wr(e, (n) => {
	let r = n.head, { state: i } = e, a = i.doc.lineAt(r), o = i.charCategorizer(r);
	for (let e = null;;) {
		if (r == (t ? a.to : a.from)) {
			r == n.head && a.number != (t ? i.doc.lines : 1) && (r += t ? 1 : -1);
			break;
		}
		let s = k(a.text, r - a.from, t) + a.from, c = a.text.slice(Math.min(r, s) - a.from, Math.max(r, s) - a.from), l = o(c);
		if (e != null && l != e) break;
		(c != " " || r != n.head) && (e = l), r = s;
	}
	return r;
}), Xr = (e) => Yr(e, !1), Zr = (e) => Yr(e, !0), Qr = (e) => Wr(e, (t) => {
	let n = e.lineBlockAt(t.head).to;
	return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
}), $r = (e) => Wr(e, (t) => {
	let n = e.moveToLineBoundary(t, !1).head;
	return t.head > n ? n : Math.max(0, t.head - 1);
}), ei = (e) => Wr(e, (t) => {
	let n = e.moveToLineBoundary(t, !0).head;
	return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
}), ti = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = e.changeByRange((e) => ({
		changes: {
			from: e.from,
			to: e.to,
			insert: y.of(["", ""])
		},
		range: l.cursor(e.from)
	}));
	return t(e.update(n, {
		scrollIntoView: !0,
		userEvent: "input"
	})), !0;
}, ni = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = e.changeByRange((t) => {
		if (!t.empty || t.from == 0 || t.from == e.doc.length) return { range: t };
		let n = t.from, r = e.doc.lineAt(n), i = n == r.from ? n - 1 : k(r.text, n - r.from, !1) + r.from, a = n == r.to ? n + 1 : k(r.text, n - r.from, !0) + r.from;
		return {
			changes: {
				from: i,
				to: a,
				insert: e.doc.slice(n, a).append(e.doc.slice(i, n))
			},
			range: l.cursor(a)
		};
	});
	return n.changes.empty ? !1 : (t(e.update(n, {
		scrollIntoView: !0,
		userEvent: "move.character"
	})), !0);
};
function ri(e) {
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
function ii(e, t, n) {
	if (e.readOnly) return !1;
	let r = [], i = [];
	for (let t of ri(e)) {
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
			for (let n of t.ranges) i.push(l.range(Math.min(e.doc.length, n.anchor + o), Math.min(e.doc.length, n.head + o)));
		} else {
			r.push({
				from: a.from,
				to: t.from
			}, {
				from: t.to,
				insert: e.lineBreak + a.text
			});
			for (let e of t.ranges) i.push(l.range(e.anchor - o, e.head - o));
		}
	}
	return r.length ? (t(e.update({
		changes: r,
		scrollIntoView: !0,
		selection: l.create(i, e.selection.mainIndex),
		userEvent: "move.line"
	})), !0) : !1;
}
var ai = ({ state: e, dispatch: t }) => ii(e, t, !1), oi = ({ state: e, dispatch: t }) => ii(e, t, !0);
function si(e, t, n) {
	if (e.readOnly) return !1;
	let r = [];
	for (let t of ri(e)) n ? r.push({
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
var ci = ({ state: e, dispatch: t }) => si(e, t, !1), li = ({ state: e, dispatch: t }) => si(e, t, !0), ui = (e) => {
	if (e.state.readOnly) return !1;
	let { state: t } = e, n = t.changes(ri(t).map(({ from: e, to: n }) => (e > 0 ? e-- : n < t.doc.length && n++, {
		from: e,
		to: n
	}))), r = Fn(t.selection, (t) => {
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
function di(e, t) {
	if (/\(\)|\[\]|\{\}/.test(e.sliceDoc(t - 1, t + 1))) return {
		from: t,
		to: t
	};
	let n = E(e).resolveInner(t), r = n.childBefore(t), i = n.childAfter(t), a;
	return r && i && r.to <= t && i.from >= t && (a = r.type.prop(O.closedBy)) && a.indexOf(i.name) > -1 && e.doc.lineAt(r.to).from == e.doc.lineAt(i.from).from && !/\S/.test(e.sliceDoc(r.to, i.from)) ? {
		from: r.to,
		to: i.from
	} : null;
}
var fi = /* @__PURE__ */ mi(!1), pi = /* @__PURE__ */ mi(!0);
function mi(e) {
	return ({ state: t, dispatch: n }) => {
		if (t.readOnly) return !1;
		let r = t.changeByRange((n) => {
			let { from: r, to: i } = n, a = t.doc.lineAt(r), o = !e && r == i && di(t, r);
			e && (r = i = (i <= a.to ? a : t.doc.lineAt(i)).to);
			let s = new F(t, {
				simulateBreak: r,
				simulateDoubleBreak: !!o
			}), c = we(s, r);
			for (c ??= h(/^\s*/.exec(t.doc.lineAt(r).text)[0], t.tabSize); i < a.to && /\s/.test(a.text[i - a.from]);) i++;
			o ? {from: r, to: i} = o : r > a.from && r < a.from + 100 && !/\S/.test(a.text.slice(0, r)) && (r = a.from);
			let u = ["", b(t, c)];
			return o && u.push(b(t, s.lineIndent(a.from, -1))), {
				changes: {
					from: r,
					to: i,
					insert: y.of(u)
				},
				range: l.cursor(r + 1 + u[1].length)
			};
		});
		return n(t.update(r, {
			scrollIntoView: !0,
			userEvent: "input"
		})), !0;
	};
}
function hi(e, t) {
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
			range: l.range(a.mapPos(r.anchor, 1), a.mapPos(r.head, 1))
		};
	});
}
var gi = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = Object.create(null), r = new F(e, { overrideIndentation: (e) => n[e] ?? -1 }), i = hi(e, (t, i, a) => {
		let o = we(r, t.from);
		if (o == null) return;
		/\S/.test(t.text) || (o = 0);
		let s = /^\s*/.exec(t.text)[0], c = b(e, o);
		(s != c || a.from < t.from + s.length) && (n[t.from] = o, i.push({
			from: t.from,
			to: t.from + s.length,
			insert: c
		}));
	});
	return i.changes.empty || t(e.update(i, { userEvent: "indent" })), !0;
}, _i = ({ state: e, dispatch: t }) => e.readOnly ? !1 : (t(e.update(hi(e, (t, n) => {
	n.push({
		from: t.from,
		insert: e.facet(x)
	});
}), { userEvent: "input.indent" })), !0), vi = ({ state: e, dispatch: t }) => e.readOnly ? !1 : (t(e.update(hi(e, (t, n) => {
	let r = /^\s*/.exec(t.text)[0];
	if (!r) return;
	let i = h(r, e.tabSize), a = 0, o = b(e, Math.max(0, i - S(e)));
	for (; a < r.length && a < o.length && r.charCodeAt(a) == o.charCodeAt(a);) a++;
	n.push({
		from: t.from + a,
		to: t.from + r.length,
		insert: o.slice(a)
	});
}), { userEvent: "delete.dedent" })), !0), yi = (e) => (e.setTabFocusMode(), !0), bi = [
	{
		key: "Ctrl-b",
		run: Bn,
		shift: mr,
		preventDefault: !0
	},
	{
		key: "Ctrl-f",
		run: Vn,
		shift: hr
	},
	{
		key: "Ctrl-p",
		run: Zn,
		shift: Sr
	},
	{
		key: "Ctrl-n",
		run: Qn,
		shift: Cr
	},
	{
		key: "Ctrl-a",
		run: cr,
		shift: jr
	},
	{
		key: "Ctrl-e",
		run: lr,
		shift: Mr
	},
	{
		key: "Ctrl-d",
		run: Jr
	},
	{
		key: "Ctrl-h",
		run: qr
	},
	{
		key: "Ctrl-k",
		run: Qr
	},
	{
		key: "Ctrl-Alt-h",
		run: Xr
	},
	{
		key: "Ctrl-o",
		run: ti
	},
	{
		key: "Ctrl-t",
		run: ni
	},
	{
		key: "Ctrl-v",
		run: nr
	}
], xi = /* @__PURE__ */ [
	{
		key: "ArrowLeft",
		run: Bn,
		shift: mr,
		preventDefault: !0
	},
	{
		key: "Mod-ArrowLeft",
		mac: "Alt-ArrowLeft",
		run: Wn,
		shift: _r,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowLeft",
		run: or,
		shift: kr,
		preventDefault: !0
	},
	{
		key: "ArrowRight",
		run: Vn,
		shift: hr,
		preventDefault: !0
	},
	{
		key: "Mod-ArrowRight",
		mac: "Alt-ArrowRight",
		run: Gn,
		shift: vr,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowRight",
		run: sr,
		shift: Ar,
		preventDefault: !0
	},
	{
		key: "ArrowUp",
		run: Zn,
		shift: Sr,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowUp",
		run: Nr,
		shift: Fr
	},
	{
		mac: "Ctrl-ArrowUp",
		run: tr,
		shift: Tr
	},
	{
		key: "ArrowDown",
		run: Qn,
		shift: Cr,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowDown",
		run: Pr,
		shift: Ir
	},
	{
		mac: "Ctrl-ArrowDown",
		run: nr,
		shift: Er
	},
	{
		key: "PageUp",
		run: tr,
		shift: Tr
	},
	{
		key: "PageDown",
		run: nr,
		shift: Er
	},
	{
		key: "Home",
		run: ar,
		shift: Or,
		preventDefault: !0
	},
	{
		key: "Mod-Home",
		run: Nr,
		shift: Fr
	},
	{
		key: "End",
		run: ir,
		shift: Dr,
		preventDefault: !0
	},
	{
		key: "Mod-End",
		run: Pr,
		shift: Ir
	},
	{
		key: "Enter",
		run: fi,
		shift: fi
	},
	{
		key: "Mod-a",
		run: Lr
	},
	{
		key: "Backspace",
		run: qr,
		shift: qr,
		preventDefault: !0
	},
	{
		key: "Delete",
		run: Jr,
		preventDefault: !0
	},
	{
		key: "Mod-Backspace",
		mac: "Alt-Backspace",
		run: Xr,
		preventDefault: !0
	},
	{
		key: "Mod-Delete",
		mac: "Alt-Delete",
		run: Zr,
		preventDefault: !0
	},
	{
		mac: "Mod-Backspace",
		run: $r,
		preventDefault: !0
	},
	{
		mac: "Mod-Delete",
		run: ei,
		preventDefault: !0
	}
].concat(/* @__PURE__ */ bi.map((e) => ({
	mac: e.key,
	run: e.run,
	shift: e.shift
}))), Si = /* @__PURE__ */ [
	{
		key: "Alt-ArrowLeft",
		mac: "Ctrl-ArrowLeft",
		run: Jn,
		shift: yr
	},
	{
		key: "Alt-ArrowRight",
		mac: "Ctrl-ArrowRight",
		run: Yn,
		shift: br
	},
	{
		key: "Alt-ArrowUp",
		run: ai
	},
	{
		key: "Shift-Alt-ArrowUp",
		run: ci
	},
	{
		key: "Alt-ArrowDown",
		run: oi
	},
	{
		key: "Shift-Alt-ArrowDown",
		run: li
	},
	{
		key: "Mod-Alt-ArrowUp",
		run: Vr
	},
	{
		key: "Mod-Alt-ArrowDown",
		run: Hr
	},
	{
		key: "Escape",
		run: Ur
	},
	{
		key: "Mod-Enter",
		run: pi
	},
	{
		key: "Alt-l",
		mac: "Ctrl-l",
		run: Rr
	},
	{
		key: "Mod-i",
		run: zr,
		preventDefault: !0
	},
	{
		key: "Mod-[",
		run: vi
	},
	{
		key: "Mod-]",
		run: _i
	},
	{
		key: "Mod-Alt-\\",
		run: gi
	},
	{
		key: "Shift-Mod-k",
		run: ui
	},
	{
		key: "Shift-Mod-\\",
		run: dr
	},
	{
		key: "Mod-/",
		run: Qt
	},
	{
		key: "Alt-A",
		run: tn
	},
	{
		key: "Ctrl-m",
		mac: "Shift-Alt-m",
		run: yi
	}
].concat(xi);
//#endregion
//#region node_modules/@replit/codemirror-vim/dist/index.js
function Ci(e) {
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
		t.setOption("disableInput", !0), t.setOption("showCursorWhenSelecting", !1), e.signal(t, "vim-mode-change", { mode: "normal" }), t.on("cursorActivity", nn), O(t), e.on(t.getInputField(), "paste", u(t));
	}
	function l(t) {
		t.setOption("disableInput", !1), t.off("cursorActivity", nn), e.off(t.getInputField(), "paste", u(t)), t.state.vim = null, Pt && clearTimeout(Pt);
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
		t && te(e, t);
	}
	function te(e, t, n, r) {
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
	function D(e, t, n) {
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
	var ne = function() {
		var e = 100, t = -1, n = 0, r = 0, i = Array(e);
		function a(a, o, s) {
			var c = i[t % e];
			function l(n) {
				var r = ++t % e, o = i[r];
				o && o.clear(), i[r] = a.setBookmark(n);
			}
			if (c) {
				var u = c.find();
				u && !Fe(u, o) && l(o);
			} else l(o);
			l(s), n = t, r = t - e + 1, r < 0 && (r = 0);
		}
		function o(a, o) {
			t += o, t > n ? t = n : t < r && (t = r);
			var s = i[(e + t) % e];
			if (s && !s.find()) {
				var c = o > 0 ? 1 : -1, l, u = a.getCursor();
				do
					if (t += c, s = i[(e + t) % e], s && (l = s.find()) && !Fe(u, l)) break;
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
	}, re = function(e) {
		return e ? {
			changes: e.changes,
			expectCursorActivityForChange: e.expectCursorActivityForChange
		} : {
			changes: [],
			expectCursorActivityForChange: !1
		};
	};
	class ie {
		constructor() {
			this.latestRegister = void 0, this.isPlaying = !1, this.isRecording = !1, this.replaySearchQueries = [], this.onRecordingDone = void 0, this.lastInsertModeChanges = re();
		}
		exitMacroRecordMode() {
			var e = k.macroModeState;
			e.onRecordingDone && e.onRecordingDone(), e.onRecordingDone = void 0, e.isRecording = !1;
		}
		enterMacroRecordMode(e, t) {
			var n = k.registerController.getRegister(t);
			if (n) {
				if (n.clear(), this.latestRegister = t, e.openDialog) {
					var r = U("span", { class: "cm-vim-message" }, "recording @" + t);
					this.onRecordingDone = e.openDialog(r, function() {}, { bottom: !0 });
				}
				this.isRecording = !0;
			}
		}
	}
	function O(e) {
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
	function A() {
		for (var e in k = {
			searchQuery: null,
			searchIsReversed: !1,
			lastSubstituteReplacePart: void 0,
			jumpList: ne(),
			macroModeState: new ie(),
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
	class ae {
		constructor(e, t) {
			this.keyName = e, this.key = t.key, this.ctrlKey = t.ctrlKey, this.altKey = t.altKey, this.metaKey = t.metaKey, this.shiftKey = t.shiftKey;
		}
	}
	var oe, se = {
		enterVimMode: c,
		leaveVimMode: l,
		buildKeyMap: function() {},
		getRegisterController: function() {
			return k.registerController;
		},
		resetVimGlobalState_: A,
		getVimGlobalState_: function() {
			return k;
		},
		maybeInitVimState_: O,
		suppressErrorLogging: !1,
		InsertModeKey: ae,
		map: function(e, t, n) {
			Gt.map(e, t, n);
		},
		unmap: function(e, t) {
			return Gt.unmap(e, t);
		},
		noremap: function(e, t, n) {
			Gt.map(e, t, n, !0);
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
		langmap: he,
		vimKeyFromEvent: me,
		setOption: te,
		getOption: D,
		defineOption: E,
		defineEx: function(e, t, n) {
			if (!t) t = e;
			else if (e.indexOf(t) !== 0) throw Error("(Vim.defineEx) \"" + t + "\" is not a prefix of \"" + e + "\", command not registered");
			Wt[e] = n, Gt.commandMap_[t] = {
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
			var a = O(t), o = t;
			function s() {
				var e = k.macroModeState;
				if (e.isRecording) {
					if (n == "q") return e.exitMacroRecordMode(), N(o), !0;
					i != "mapping" && Qt(e, n);
				}
			}
			function c() {
				if (n == "<Esc>") {
					if (a.visualMode) Ye(o);
					else if (a.insertMode) G(o);
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
					if (i.expectLiteralNext && (a.expectLiteralNext = !0), oe && window.clearTimeout(oe), oe = t && window.setTimeout(function() {
						a.insertMode && a.inputState.keyBuffer.length && N(o);
					}, D("insertModeEscKeysTimeout")), t) {
						var l = o.listSelections();
						(!s || s.removed.length != l.length) && (s = a.inputState.changeQueue = new ve()), s.inserted += n;
						for (var u = 0; u < l.length; u++) {
							var d = z(l[u].anchor, l[u].head), f = Ie(l[u].anchor, l[u].head), p = o.getRange(d, o.state.overwrite ? I(f, 0, 1) : f);
							s.removed[u] = (s.removed[u] || "") + p;
						}
					}
					return !t;
				} else i.type == "full" && (a.inputState.keyBuffer.length = 0);
				if (a.expectLiteralNext = !1, oe && window.clearTimeout(oe), i.command && s) {
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
						d.type == "keyToKey" ? ue(o, d.toKeys, d) : Ce.processCommand(o, a, d);
					} catch (e) {
						throw o.state.vim = void 0, O(o), se.suppressErrorLogging || console.log(e), e;
					}
					return !0;
				});
			};
		},
		handleEx: function(e, t) {
			Gt.processCommand(e, t);
		},
		defineMotion: Te,
		defineAction: ke,
		defineOperator: De,
		mapCommand: Xt,
		_mapCommand: qt,
		defineRegister: be,
		exitVisualMode: Ye,
		exitInsertMode: G
	}, j = [], ce = !1, M;
	function le(e) {
		if (!M) throw Error("No prompt to send key to");
		if (e[0] == "<") {
			var t = e.toLowerCase().slice(1, -1);
			if (t = t.split("-").pop() || "", t == "lt") e = "<";
			else if (t == "space") e = " ";
			else if (t == "cr") e = "\n";
			else if (pe[t]) {
				var n = M.value || "", r = {
					key: pe[t],
					target: {
						value: n,
						selectionEnd: n.length,
						selectionStart: n.length
					}
				};
				M.onKeyDown && M.onKeyDown(r, M.value, a), M && M.onKeyUp && M.onKeyUp(r, M.value, a);
				return;
			}
		}
		if (e == "\n") {
			var i = M;
			M = null, i.onClose && i.onClose(i.value);
		} else M.value = (M.value || "") + e;
		function a(e) {
			M && (typeof e == "string" ? M.value = e : M = null);
		}
	}
	function ue(e, t, n) {
		var r = ce;
		if (n) {
			if (j.indexOf(n) != -1) return;
			j.push(n), ce = n.noremap != 0;
		}
		try {
			for (var i = O(e), a = /<(?:[CSMA]-)*\w+>|./gi, o; o = a.exec(t);) {
				var s = o[0], c = i.insertMode;
				if (M) {
					le(s);
					continue;
				}
				if (!se.handleKey(e, s, "mapping") && c && i.insertMode) {
					if (s[0] == "<") {
						var l = s.toLowerCase().slice(1, -1);
						if (l = l.split("-").pop() || "", l == "lt") s = "<";
						else if (l == "space") s = " ";
						else if (l == "cr") s = "\n";
						else if (pe.hasOwnProperty(l)) {
							s = pe[l], sn(e, s);
							continue;
						} else s = s[0], a.lastIndex = o.index + 1;
					}
					e.replaceSelection(s);
				}
			}
		} finally {
			if (j.pop(), ce = j.length ? r : !1, !j.length && M) {
				var u = M;
				M = null, At(e, u);
			}
		}
	}
	var de = {
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
	}, fe = {
		Shift: 1,
		Alt: 1,
		Command: 1,
		Control: 1,
		CapsLock: 1,
		AltGraph: 1,
		Dead: 1,
		Unidentified: 1
	}, pe = {};
	"Left|Right|Up|Down|End|Home".split("|").concat(Object.keys(de)).forEach(function(e) {
		pe[(de[e] || "").toLowerCase()] = pe[e.toLowerCase()] = e;
	});
	function me(t, n) {
		var r = t.key;
		if (!fe[r]) {
			r.length > 1 && r[0] == "n" && (r = r.replace("Numpad", "")), r = de[r] || r;
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
	function he(e, t) {
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
		he(e);
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
			this.insertModeChanges.push(re(e));
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
			H(t).setReversed(!i);
			var o = i ? "/" : "?", s = H(t).getQuery(), c = t.getScrollInfo(), l = "";
			function u(e, i, a) {
				k.searchHistoryController.pushInput(e), k.searchHistoryController.reset();
				try {
					Mt(t, e, i, a);
				} catch {
					W(t, "Invalid regex: " + e), N(t);
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
				n.isRecording && en(n, e);
			}
			function f() {
				return D("pcre") ? "(JavaScript regexp: set pcre)" : "(Vim regexp: set nopcre)";
			}
			function p(e, t, n) {
				var r = me(e), i, a;
				r == "<Up>" || r == "<Down>" ? (i = r == "<Up>", a = e.target ? e.target.selectionEnd : 0, t = k.searchHistoryController.nextMatch(t, i) || "", n(t), a && e.target && (e.target.selectionEnd = e.target.selectionStart = Math.min(a, e.target.value.length))) : r && r != "<Left>" && r != "<Right>" && k.searchHistoryController.reset(), l = t, m();
			}
			function m() {
				var e;
				try {
					e = Mt(t, l, !0, !0);
				} catch {}
				e ? t.scrollIntoView(It(t, !i, e), 30) : (Rt(t), t.scrollTo(c.left, c.top));
			}
			function h(n, r, i) {
				var a = me(n);
				a == "<Esc>" || a == "<C-c>" || a == "<C-[>" || a == "<BS>" && r == "" ? (k.searchHistoryController.pushInput(r), k.searchHistoryController.reset(), Mt(t, s?.source || ""), Rt(t), t.scrollTo(c.left, c.top), e.e_stop(n), N(t), i(), t.focus()) : a == "<Up>" || a == "<Down>" ? e.e_stop(n) : a == "<C-u>" && (e.e_stop(n), i(""));
			}
			switch (r.searchArgs.querySrc) {
				case "prompt":
					var g = k.macroModeState;
					g.isPlaying ? u(g.replaySearchQueries.shift() || "", !0, !1) : At(t, {
						onClose: d,
						prefix: o,
						desc: U("span", {
							$cursor: "pointer",
							onmousedown: function(e) {
								e.preventDefault(), te("pcre", !D("pcre")), this.textContent = f(), m();
							}
						}, f()),
						onKeyUp: p,
						onKeyDown: h
					});
					break;
				case "wordUnderCursor":
					var _ = $e(t, { noSymbol: !0 }), v = !0;
					if (_ || (_ = $e(t, { noSymbol: !1 }), v = !1), !_) {
						W(t, "No word under cursor"), N(t);
						return;
					}
					let e = t.getLine(_.start.line).substring(_.start.ch, _.end.ch);
					e = v && a ? "\\b" + e + "\\b" : Re(e), k.jumpList.cachedCursor = t.getCursor(), t.setCursor(_.start), u(e, !0, !1);
					break;
			}
		},
		processEx: function(t, n, r) {
			function i(e) {
				k.exCommandHistoryController.pushInput(e), k.exCommandHistoryController.reset(), Gt.processCommand(t, e), t.state.vim && N(t), Rt(t);
			}
			function a(n, r, i) {
				var a = me(n), o, s;
				(a == "<Esc>" || a == "<C-c>" || a == "<C-[>" || a == "<BS>" && r == "") && (k.exCommandHistoryController.pushInput(r), k.exCommandHistoryController.reset(), e.e_stop(n), N(t), Rt(t), i(), t.focus()), a == "<Up>" || a == "<Down>" ? (e.e_stop(n), o = a == "<Up>", s = n.target ? n.target.selectionEnd : 0, r = k.exCommandHistoryController.nextMatch(r, o) || "", i(r), s && n.target && (n.target.selectionEnd = n.target.selectionStart = Math.min(s, n.target.value.length))) : a == "<C-u>" ? (e.e_stop(n), i("")) : a && a != "<Left>" && a != "<Right>" && k.exCommandHistoryController.reset();
			}
			function o(n, r) {
				var i = new e.StringStream(r), a = {};
				try {
					if (Gt.parseInput_(t, i, a), a.commandName != "s") {
						Rt(t);
						return;
					}
					var o = Gt.matchCommand_(a.commandName);
					if (!o || (Gt.parseCommandArgs_(i, a, o), !a.argString)) return;
					var s = Ot(a.argString.slice(1), !0, !0);
					s && Ft(t, s);
				} catch {}
			}
			if (r.type == "keyToEx") Gt.processCommand(t, r.exArgs.input);
			else {
				var s = {
					onClose: i,
					onKeyDown: a,
					onKeyUp: o,
					prefix: ":"
				};
				n.visualMode && (s.value = "'<,'>", s.selectValueOnOpen = !1), At(t, s);
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
				v instanceof Array ? (g = v[0], h = v[1]) : h = v, h ||= L(d), r.visualMode ? (r.visualBlock && h.ch === Infinity || (h = F(e, h, p)), g &&= F(e, g), g ||= m, u.anchor = g, u.head = h, Ke(e), dt(e, r, "<", R(g, h) ? g : h), dt(e, r, ">", R(g, h) ? h : g)) : s || (h = F(e, h, p), e.setCursor(h.line, h.ch));
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
				var C, w, T, E, te;
				if (r.visualMode) {
					C = z(u.head, u.anchor), w = Ie(u.head, u.anchor), T = r.visualLine || c.linewise, E = r.visualBlock ? "block" : T ? "line" : "char";
					var D = n(e, C, w);
					if (te = qe(e, {
						anchor: D.start,
						head: D.end
					}, E), T) {
						var ne = te.ranges;
						if (E == "block") for (var re = 0; re < ne.length; re++) ne[re].head.ch = V(e, ne[re].head.line);
						else E == "line" && (ne[0].head = new t(ne[0].head.line + 1, 0));
					}
				} else {
					if (C = L(g || m), w = L(h || p), R(w, C)) {
						var ie = C;
						C = w, w = ie;
					}
					T = o.linewise || c.linewise, T ? Ze(e, C, w) : o.forward && Xe(e, C, w), E = "char";
					var O = !o.inclusive || T, D = n(e, C, w);
					te = qe(e, {
						anchor: D.start,
						head: D.end
					}, E, O);
				}
				e.setSelections(te.ranges, te.primary), r.lastMotion = null, c.repeat = _, c.registerName = l, c.linewise = T;
				var A = Ee[s](e, c, te.ranges, m, h);
				r.visualMode && Ye(e, A != null), A && e.setCursor(A);
			}
		},
		recordLastEdit: function(e, t, n) {
			var r = k.macroModeState;
			r.isPlaying || (e.lastEditInputState = t, e.lastEditActionCommand = n, r.lastInsertModeChanges.changes = [], r.lastInsertModeChanges.expectCursorActivityForChange = !1, r.lastInsertModeChanges.visualBlock = e.visualBlock ? e.sel.head.line - e.sel.anchor.line : 0);
		}
	}, we = {
		moveToTopLine: function(e, n, r) {
			var i = Bt(e).top + r.repeat - 1;
			return new t(i, Qe(e.getLine(i)));
		},
		moveToMiddleLine: function(e) {
			var n = Bt(e), r = Math.floor((n.top + n.bottom) * .5);
			return new t(r, Qe(e.getLine(r)));
		},
		moveToBottomLine: function(e, n, r) {
			var i = Bt(e).bottom - r.repeat + 1;
			return new t(i, Qe(e.getLine(i)));
		},
		expandToLine: function(e, n, r) {
			return new t(n.line + r.repeat - 1, Infinity);
		},
		findNext: function(e, t, n) {
			var r = H(e), i = r.getQuery();
			if (i) {
				var a = !n.forward;
				a = r.isReversed() ? !a : a, Ft(e, i);
				var o = It(e, a, i, n.repeat);
				return o || W(e, "No match found " + i + (D("pcre") ? " (set nopcre to use Vim regexps)" : "")), o;
			}
		},
		findAndSelectNextInclusive: function(n, r, i, a, o) {
			var s = H(n), c = s.getQuery();
			if (c) {
				var l = !i.forward;
				l = s.isReversed() ? !l : l;
				var u = Lt(n, l, c, i.repeat, a);
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
			var i = Vt(e, r, n.selectedCharacter || "");
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
					if (!(r.forward ? R(l, s) : R(s, l)) && !(r.linewise && l.line == s.line)) {
						var u = Fe(s, a), d = r.forward ? B(s, l, a) : B(a, l, s);
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
			return pt(e, t, n.repeat, r).start;
		},
		moveBySentence: function(e, t, n) {
			var r = n.forward ? 1 : -1;
			return ht(e, t, n.repeat, r);
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
				if (l = !0, c = gt(e, t, o, s), !c) {
					var u = e.getSearchCursor(RegExp("\\" + o, "g"), t);
					u.find() && (c = gt(e, u.from(), o, s));
				}
			} else if (a[o]) l = !0, c = _t(e, t, o, s);
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
			else if (o === "p") if (c = pt(e, t, n.repeat, 0, s), n.linewise = !0, r.visualMode) r.visualLine ||= !0;
			else {
				var p = r.inputState.operatorArgs;
				p && (p.linewise = !0), c.end.line--;
			}
			else if (o === "t") c = et(e, t, s);
			else if (o === "s") {
				var m = e.getLine(t.line);
				t.ch > 0 && C(m[t.ch]) && --t.ch;
				var h = mt(e, t, n.repeat, 1, s), g = mt(e, t, n.repeat, -1, s);
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
	function P(e, t) {
		for (var n = [], r = 0; r < t; r++) n.push(e);
		return n;
	}
	var Ee = {
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
				var d = P("", r.length);
				e.replaceSelections(d), i = z(r[0].head, r[0].anchor);
			}
			k.registerController.pushText(n.registerName, "change", a, n.linewise, r.length > 1), Oe.enterInsertMode(e, { head: i }, e.state.vim);
		},
		delete: function(e, n, r) {
			var i, a, o = e.state.vim;
			if (o.visualBlock) {
				a = e.getSelection();
				var s = P("", r.length);
				e.replaceSelections(s), i = z(r[0].head, r[0].anchor);
			} else {
				var c = r[0].anchor, l = r[0].head;
				n.linewise && l.line != e.firstLine() && c.line == e.lastLine() && c.line == l.line - 1 && (c.line == e.firstLine() ? c.ch = 0 : c = new t(c.line - 1, V(e, c.line - 1))), a = e.getRange(c, l), e.replaceRange("", c, l), i = c, n.linewise && (i = we.moveToFirstNonWhiteSpaceCharacter(e, c));
			}
			return k.registerController.pushText(n.registerName, "delete", a, n.linewise, o.visualBlock), F(e, i);
		},
		indent: function(e, t, n) {
			var r = e.state.vim, i = r.visualMode && t.repeat || 1;
			if (r.visualBlock) {
				for (var a = e.getOption("tabSize"), o = e.getOption("indentWithTabs") ? "	" : " ".repeat(a), s, c = n.length - 1; c >= 0; c--) if (s = z(n[c].anchor, n[c].head), t.indentRight) e.replaceRange(o.repeat(i), s, s);
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
			return e.replaceSelections(o), t.shouldMoveCursor ? i : !e.state.vim.visualMode && t.linewise && n[0].anchor.line + 1 == n[0].head.line ? we.moveToFirstNonWhiteSpaceCharacter(e, r) : t.linewise ? r : z(n[0].anchor, n[0].head);
		},
		yank: function(e, t, n, r) {
			var i = e.state.vim, a = e.getSelection(), o = i.visualMode ? z(i.sel.anchor, i.sel.head, n[0].head, n[0].anchor) : r;
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
			return e.replaceSelections(o), t.shouldMoveCursor ? i : !e.state.vim.visualMode && t.linewise && n[0].anchor.line + 1 == n[0].head.line ? we.moveToFirstNonWhiteSpaceCharacter(e, r) : t.linewise ? r : z(n[0].anchor, n[0].head);
		}
	};
	function De(e, t) {
		Ee[e] = t;
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
			for (r == "@" ? r = a.latestRegister || "" : a.latestRegister = r; i--;) Zt(e, n, a, r);
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
				} else o == "lastEdit" && (c = Ht(r) || c);
				r.setOption("disableInput", !1), i && i.replace ? (r.toggleOverwrite(!0), r.setOption("keyMap", "vim-replace"), e.signal(r, "vim-mode-change", { mode: "replace" })) : (r.toggleOverwrite(!1), r.setOption("keyMap", "vim-insert"), e.signal(r, "vim-mode-change", { mode: "insert" })), k.macroModeState.isPlaying || (r.on("change", tn), a.insertEnd && a.insertEnd.clear(), a.insertEnd = r.setBookmark(c, { insertLeft: !0 }), e.on(r.getInputField(), "keydown", an)), a.visualMode && Ye(r), Ve(r, c, l);
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
				}), Ke(r), dt(r, a, "<", z(s, c)), dt(r, a, ">", Ie(s, c));
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
				}, r.visualMode = !0, r.visualLine = i.visualLine, r.visualBlock = i.visualBlock, Ke(t), dt(t, r, "<", z(a, o)), dt(t, r, ">", Ie(a, o)), e.signal(t, "vim-mode-change", {
					mode: "visual",
					subMode: r.visualLine ? "linewise" : r.visualBlock ? "blockwise" : ""
				});
			}
		},
		joinLines: function(e, n, r) {
			var i, a;
			if (r.visualMode) {
				if (i = e.getCursor("anchor"), a = e.getCursor("head"), R(a, i)) {
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
			G(t, !0), r.insertModeReturn = !0, e.on(t, "vim-command-done", function n() {
				r.visualMode || (r.insertModeReturn && (r.insertModeReturn = !1, r.insertMode || Oe.enterInsertMode(t, {}, r)), e.off(t, "vim-command-done", n));
			});
		},
		setMark: function(e, t, n) {
			var r = t.selectedCharacter;
			r && dt(e, n, r, e.getCursor());
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
				a.visualMode ? (s = R(u[0].anchor, u[0].head) ? u[0].anchor : u[0].head, r.setCursor(s), Ye(r, !1)) : r.setCursor(I(l, 0, -1));
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
				i && t.repeatIsExplicit ? r.repeatOverride = i : i = r.repeatOverride || i, on(e, n, i, !1);
			}
		},
		indent: function(e, t) {
			e.indentLine(e.getCursor().line, t.indentRight);
		},
		exitInsertMode: function(e, t) {
			G(e);
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
		for (var i, o = [], s = [], c = ce ? t.length - a : 0; c < t.length; c++) {
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
	function Fe(e, t) {
		return e.ch == t.ch && e.line == t.line;
	}
	function R(e, t) {
		return e.line < t.line || e.line == t.line && e.ch < t.ch;
	}
	function z(e, t) {
		return arguments.length > 2 && (t = z.apply(void 0, Array.prototype.slice.call(arguments, 1))), R(e, t) ? e : t;
	}
	function Ie(e, t) {
		return arguments.length > 2 && (t = Ie.apply(void 0, Array.prototype.slice.call(arguments, 1))), R(e, t) ? t : e;
	}
	function B(e, t, n) {
		var r = R(e, t), i = R(t, n);
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
		var r = [], i = e.listSelections(), a = L(e.clipPos(n)), o = !Fe(n, a), s = He(i, e.getCursor("head")), c = Fe(i[s].head, i[s].anchor), l = i.length - 1, u = l - s > s ? l : 0, d = i[u].anchor, f = Math.min(d.line, a.line), p = Math.max(d.line, a.line), m = d.ch, h = a.ch, g = i[u].head.ch - m, _ = h - m;
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
			var i = Fe(e[r].anchor, t), a = Fe(e[r].head, t);
			if (i || a) return r;
		}
		return -1;
	}
	function Ue(e, t) {
		var n = e.listSelections(), r = n[0], i = n[n.length - 1];
		return [R(r.anchor, r.head) ? r.anchor : r.head, R(i.anchor, i.head) ? i.head : i.anchor];
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
		return R(r, n) && (c = r, r = n, n = c), R(o, s) ? (o = z(n, o), s = Ie(s, r)) : (s = z(n, s), o = Ie(o, r), o = I(o, 0, -1), o.ch == -1 && o.line != e.firstLine() && (o = new t(o.line - 1, V(e, o.line - 1)))), [s, o];
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
			var s = +(!i && !R(n.head, n.anchor)), c = +!!R(n.head, n.anchor);
			return a = I(n.head, 0, s), o = I(n.anchor, 0, c), {
				ranges: [{
					anchor: o,
					head: a
				}],
				primary: 0
			};
		} else if (r == "line") {
			if (R(n.head, n.anchor)) a.ch = 0, o.ch = V(e, o.line);
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
		return e.getSelection().length == 1 && (t = z(t, e.getCursor("anchor"))), t;
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
		Fe(t, n) || k.jumpList.add(e, t, n);
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
				if (c = ft(s, u, i, r), c == -1) return;
				s = c;
			}
			if (c != null) return new t(e.getCursor().line, c);
		}
	}
	function ut(e, n) {
		var r = e.getCursor().line;
		return F(e, new t(r, n - 1));
	}
	function dt(e, t, n, r) {
		!w(n, m) && !g.test(n) || (t.marks[n] && t.marks[n].clear(), t.marks[n] = e.setBookmark(r));
	}
	function ft(e, t, n, r, i) {
		return r ? t.indexOf(n, e + 1) : t.lastIndexOf(n, e - 1);
	}
	function pt(e, n, r, i, a) {
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
	function mt(e, n, r, i, a) {
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
	function ht(e, n, r, i) {
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
	function gt(e, n, r, i) {
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
	function _t(e, n, r, i) {
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
	class vt {
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
	function H(e) {
		var t = e.state.vim;
		return t.searchState_ ||= new vt();
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
		return r.length ? (i = e.substring(0, r[0]), a = e.substring(r[0]).indexOf("i") != -1) : i = e, i ? (D("pcre") || (i = Ct(i)), n && (t = /^[^A-Z]*$/.test(i)), new RegExp(i, t || a ? "im" : "m")) : null;
	}
	function U(e) {
		typeof e == "string" && (e = document.createElement(e));
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			if (n) if (typeof n != "object" && (n = document.createTextNode(n)), n.nodeType) e.appendChild(n);
			else for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (r[0] === "$" ? e.style[r.slice(1)] = n[r] : typeof n[r] == "function" ? e[r] = n[r] : e.setAttribute(r, n[r]));
		}
		return e;
	}
	function W(e, t, n) {
		var r = U("div", {
			$color: "red",
			$whiteSpace: "pre",
			class: "cm-vim-message"
		}, t);
		e.openNotification ? n ? (r = U("div", {}, r, U("div", {}, "Press ENTER or type command to continue")), e.state.closeVimNotification && e.state.closeVimNotification(), e.state.closeVimNotification = e.openNotification(r, {
			bottom: !0,
			duration: 0
		})) : e.openNotification(r, {
			bottom: !0,
			duration: 15e3
		}) : alert(r.innerText);
	}
	function kt(e, t) {
		return U("div", {
			$display: "flex",
			$flex: 1
		}, U("span", {
			$fontFamily: "monospace",
			$whiteSpace: "pre",
			$flex: 1,
			$display: "flex"
		}, e, U("input", {
			type: "text",
			autocorrect: "off",
			autocapitalize: "off",
			spellcheck: "false",
			$flex: 1
		})), t && U("span", { $color: "#888" }, t));
	}
	function At(e, t) {
		if (j.length) {
			t.value ||= "", M = t;
			return;
		}
		var n = kt(t.prefix, t.desc);
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
	function jt(e, t) {
		return e instanceof RegExp && t instanceof RegExp ? e.flags == t.flags && e.source == t.source : !1;
	}
	function Mt(e, t, n, r) {
		if (t) {
			var i = H(e), a = Ot(t, !!n, !!r);
			if (a) return Ft(e, a), jt(a, i.getQuery()) || i.setQuery(a), a;
		}
	}
	function Nt(e) {
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
	var Pt = 0;
	function Ft(e, t) {
		clearTimeout(Pt);
		var n = H(e);
		n.highlightTimeout = Pt, Pt = setTimeout(function() {
			if (e.state.vim) {
				var n = H(e);
				n.highlightTimeout = void 0;
				var r = n.getOverlay();
				(!r || t != r.query) && (r && e.removeOverlay(r), r = Nt(t), e.addOverlay(r), e.showMatchesOnScrollbar && (n.getScrollbarAnnotate() && n.getScrollbarAnnotate().clear(), n.setScrollbarAnnotate(e.showMatchesOnScrollbar(t))), n.setOverlay(r));
			}
		}, 50);
	}
	function It(e, n, r, i) {
		return e.operation(function() {
			i === void 0 && (i = 1);
			for (var a = e.getCursor(), o = e.getSearchCursor(r, a), s = 0; s < i; s++) {
				var c = o.find(n);
				if (s == 0 && c && Fe(o.from(), a)) {
					var l = n ? o.from() : o.to();
					c = o.find(n), c && !c[0] && Fe(o.from(), l) && e.getLine(l.line).length == l.ch && (c = o.find(n));
				}
				if (!c && (o = e.getSearchCursor(r, n ? new t(e.lastLine()) : new t(e.firstLine(), 0)), !o.find(n))) return;
			}
			return o.from();
		});
	}
	function Lt(e, n, r, i, a) {
		return e.operation(function() {
			i === void 0 && (i = 1);
			var o = e.getCursor(), s = e.getSearchCursor(r, o), c = s.find(!n);
			!a.visualMode && c && Fe(s.from(), o) && s.find(!n);
			for (var l = 0; l < i; l++) if (c = s.find(n), !c && (s = e.getSearchCursor(r, n ? new t(e.lastLine()) : new t(e.firstLine(), 0)), !s.find(n))) return;
			var u = s.from(), d = s.to();
			return u && d && [u, d];
		});
	}
	function Rt(e) {
		var t = H(e);
		t.highlightTimeout &&= (clearTimeout(t.highlightTimeout), void 0), e.removeOverlay(H(e).getOverlay()), t.setOverlay(null), t.getScrollbarAnnotate() && (t.getScrollbarAnnotate().clear(), t.setScrollbarAnnotate(null));
	}
	function zt(e, t, n) {
		return typeof e != "number" && (e = e.line), t instanceof Array ? w(e, t) : typeof n == "number" ? e >= t && e <= n : e == t;
	}
	function Bt(e) {
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
	function Vt(e, n, r) {
		if (r == "'" || r == "`") return k.jumpList.find(e, -1) || new t(0, 0);
		if (r == ".") return Ht(e);
		var i = n.marks[r];
		return i && i.find();
	}
	function Ht(e) {
		if (e.getLastEditEnd) return e.getLastEditEnd();
		for (var t = e.doc.history.done, n = t.length; n--;) if (t[n].changes) return L(t[n].changes[0].to);
	}
	class Ut {
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
				throw W(t, e + ""), e;
			}
			i.visualMode && Ye(t);
			var l, u;
			if (!c.commandName) c.line !== void 0 && (u = "move");
			else if (l = this.matchCommand_(c.commandName), l) {
				if (u = l.name, l.excludeFromCommandHistory && a.setText(o), this.parseCommandArgs_(s, c, l), l.type == "exToKey") {
					ue(t, l.toKeys || "", l);
					return;
				} else if (l.type == "exToEx") {
					this.processCommand(t, l.toInput || "");
					return;
				}
			}
			if (!u) {
				W(t, "Not an editor command \":" + n + "\"");
				return;
			}
			try {
				Wt[u](t, c), (!l || !l.possiblyAsync) && c.callback && c.callback();
			} catch (e) {
				throw W(t, e + ""), e;
			}
		}
		parseInput_(e, t, n) {
			t.eatWhile(":"), t.eat("%") ? (n.line = e.firstLine(), n.lineEnd = e.lastLine()) : (n.line = this.parseLineSpec_(e, t), n.line !== void 0 && t.eat(",") && (n.lineEnd = this.parseLineSpec_(e, t))), n.line == null ? e.state.vim.visualMode ? (n.selectionLine = Vt(e, e.state.vim, "<")?.line, n.selectionLineEnd = Vt(e, e.state.vim, ">")?.line) : n.selectionLine = e.getCursor().line : (n.selectionLine = n.line, n.selectionLineEnd = n.lineEnd);
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
					var r = t.next() || "", i = Vt(e, e.state.vim, r);
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
				n && (a.context = n), qt(a);
			}
		}
		unmap(e, t) {
			if (e != ":" && e.charAt(0) == ":") {
				if (t) throw Error("Mode not supported for ex mappings");
				var n = e.substring(1);
				if (this.commandMap_[n] && this.commandMap_[n].user) return delete this.commandMap_[n], !0;
			} else for (var i = e, a = 0; a < r.length; a++) if (i == r[a].keys && r[a].context === t) return r.splice(a, 1), Yt(i), !0;
		}
	}
	var Wt = {
		colorscheme: function(e, t) {
			if (!t.args || t.args.length < 1) {
				W(e, e.getOption("theme"));
				return;
			}
			e.setOption("theme", t.args[0]);
		},
		map: function(e, t, n, r) {
			var i = t.args;
			if (!i || i.length < 2) {
				e && W(e, "Invalid mapping: " + t.input);
				return;
			}
			Gt.map(i[0], i[1], n, r);
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
			(!r || r.length < 1 || !Gt.unmap(r[0], n)) && e && W(e, "No such mapping: " + t.input);
		},
		mapclear: function(e, t) {
			se.mapclear();
		},
		imapclear: function(e, t) {
			se.mapclear("insert");
		},
		nmapclear: function(e, t) {
			se.mapclear("normal");
		},
		vmapclear: function(e, t) {
			se.mapclear("visual");
		},
		omapclear: function(e, t) {
			se.mapclear("operatorPending");
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
				e && W(e, "Invalid mapping: " + t.input);
				return;
			}
			var i = n[0].split("="), a = i.shift() || "", o = i.length > 0 ? i.join("=") : void 0, s = !1, c = !1;
			if (a.charAt(a.length - 1) == "?") {
				if (o) throw Error("Trailing characters: " + t.argString);
				a = a.substring(0, a.length - 1), s = !0;
			} else a.charAt(a.length - 1) == "!" && (a = a.substring(0, a.length - 1), c = !0);
			o === void 0 && a.substring(0, 2) == "no" && (a = a.substring(2), o = !1);
			var l = T[a] && T[a].type == "boolean";
			if (l && (c ? o = !D(a, e, r) : o ??= !0), !l && o === void 0 || s) {
				var u = D(a, e, r);
				u instanceof Error ? W(e, u.message) : u === !0 || u === !1 ? W(e, " " + (u ? "" : "no") + a) : W(e, "  " + a + "=" + u);
			} else {
				var d = te(a, o, e, r);
				d instanceof Error && W(e, d.message);
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
			W(e, i, !0);
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
			W(e, i, !0);
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
				W(n, u + ": " + r.argString);
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
				W(e, "Argument is required.");
				return;
			}
			var i = t.line;
			if (typeof i == "number") for (var a = isNaN(t.lineEnd) ? i : t.lineEnd, o = i; o <= a; o++) e.setCursor(o, 0), ue(e, t.argString.trimStart(), { noremap: n }), e.state.vim.insertMode && G(e, !0);
			else ue(e, t.argString.trimStart(), { noremap: n }), e.state.vim.insertMode && G(e, !0);
		},
		global: function(e, t) {
			var n = t.argString;
			if (!n) {
				W(e, "Regular Expression missing from global");
				return;
			}
			var r = t.commandName[0] === "v";
			n[0] === "!" && t.commandName[0] === "g" && (r = !0, n = n.slice(1));
			var i = t.line === void 0 ? e.firstLine() : t.line, a = t.lineEnd || t.line || e.lastLine(), o = yt(n), s = n, c = "";
			if (o && o.length && (s = o[0], c = o.slice(1, o.length).join("/")), s) try {
				Mt(e, s, !0, !0);
			} catch {
				W(e, "Invalid regex: " + s);
				return;
			}
			for (var l = H(e).getQuery(), u = [], d = i; d <= a; d++) {
				var f = e.getLine(d);
				l.test(f) !== r && u.push(c ? e.getLineHandle(d) : f);
			}
			if (!c) {
				W(e, u.join("\n"));
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
					Gt.processCommand(e, r, { callback: m });
				} else e.releaseLineHandles && e.releaseLineHandles();
			};
			m();
		},
		substitute: function(e, n) {
			if (!e.getSearchCursor) throw Error("Search feature not available. Requires searchcursor.js or any other getSearchCursor implementation.");
			var r = n.argString, i = r ? xt(r, r[0]) : [], a = "", o = "", s, c, l, u = !1, d = !1;
			if (i && i.length) a = i[0], D("pcre") && a !== "" && (a = new RegExp(a).source), o = i[1], o !== void 0 && (o = D("pcre") ? Dt(o.replace(/([^\\])&/g, "$1$$&")) : Tt(o), k.lastSubstituteReplacePart = o), s = i[2] ? i[2].split(" ") : [];
			else if (r && r.length) {
				W(e, "Substitutions should be of the form :s/pattern/replace/");
				return;
			}
			if (s && (c = s[0], l = parseInt(s[1]), c && (c.indexOf("c") != -1 && (u = !0), c.indexOf("g") != -1 && (d = !0), a = D("pcre") ? a + "/" + c : a.replace(/\//g, "\\/") + "/" + c)), a) try {
				Mt(e, a, !0, !0);
			} catch {
				W(e, "Invalid regex: " + a);
				return;
			}
			if (o ||= k.lastSubstituteReplacePart, o === void 0) {
				W(e, "No previous substitute regular expression");
				return;
			}
			var f = H(e).getQuery(), p = n.line === void 0 ? e.getCursor().line : n.line, m = n.lineEnd || p;
			p == e.firstLine() && m == e.lastLine() && (m = Infinity), l && (p = m, m = p + l - 1);
			var h = F(e, new t(p, 0)), g = e.getSearchCursor(f, h);
			Kt(e, u, d, p, m, g, f, o, n.callback);
		},
		startinsert: function(e, t) {
			ue(e, t.argString == "!" ? "A" : "i", {});
		},
		redo: e.commands.redo,
		undo: e.commands.undo,
		write: function(t) {
			e.commands.save ? e.commands.save(t) : t.save && t.save();
		},
		nohlsearch: function(e) {
			Rt(e);
		},
		yank: function(e) {
			var t = L(e.getCursor()).line, n = e.getLine(t);
			k.registerController.pushText("0", "yank", n, !0, !0);
		},
		delete: function(e, n) {
			var r = n.selectionLine, i = isNaN(n.selectionLineEnd) ? r : n.selectionLineEnd;
			Ee.delete(e, { linewise: !0 }, [{
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
				W(t, "Argument required");
				return;
			}
			for (var r = t.state.vim, i = new e.StringStream(Le(n.argString)); !i.eol();) {
				i.eatSpace();
				var a = i.pos;
				if (!i.match(/[a-zA-Z]/, !1)) {
					W(t, "Invalid argument: " + n.argString.substring(a));
					return;
				}
				var o = i.next();
				if (i.match("-", !0)) {
					if (!i.match(/[a-zA-Z]/, !1)) {
						W(t, "Invalid argument: " + n.argString.substring(a));
						return;
					}
					var s = o, c = i.next();
					if (s && c && y(s) == y(c)) {
						var l = s.charCodeAt(0), u = c.charCodeAt(0);
						if (l >= u) {
							W(t, "Invalid argument: " + n.argString.substring(a));
							return;
						}
						for (var d = 0; d <= u - l; d++) {
							var f = String.fromCharCode(l + d);
							delete r.marks[f];
						}
					} else {
						W(t, "Invalid argument: " + s + "-");
						return;
					}
				} else o && delete r.marks[o];
			}
		}
	}, Gt = new Ut();
	se.defineEx("version", "ve", (e) => {
		W(e, "Codemirror-vim version: 6.3.0");
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
			return t && !t[0] && e && Fe(o.from(), e) && (t = o.findNext()), t && d++, t;
		}
		function v() {
			for (; _() && zt(o.from(), i, a);) if (!(!r && o.from().line == p && !m)) {
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
			l ? l() : u && W(t, (d ? "Found " + d + " matches" : "No matches found") + " for pattern: " + s + (D("pcre") ? " (set nopcre to use Vim regexps)" : ""));
		}
		function b(n, r, i) {
			switch (e.e_stop(n), me(n)) {
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
			W(t, "No matches for " + s + (D("pcre") ? " (set nopcre to use vim regexps)" : ""));
			return;
		}
		if (!n) {
			h(), l && l();
			return;
		}
		At(t, {
			prefix: U("span", "replace with ", U("strong", c), " (y/n/a/q/l)"),
			onKeyDown: b
		});
	}
	function G(t, n) {
		var r = t.state.vim, i = k.macroModeState, a = k.registerController.getRegister("."), o = i.isPlaying, s = i.lastInsertModeChanges;
		o || (t.off("change", tn), r.insertEnd && r.insertEnd.clear(), r.insertEnd = void 0, e.off(t.getInputField(), "keydown", an)), !o && r.insertModeRepeat && r.insertModeRepeat > 1 && (on(t, r, r.insertModeRepeat - 1, !0), r.lastEditInputState.repeatOverride = r.insertModeRepeat), delete r.insertModeRepeat, r.insertMode = !1, n || t.setCursor(t.getCursor().line, t.getCursor().ch - 1), t.setOption("keyMap", "vim"), t.setOption("disableInput", !0), t.toggleOverwrite(!1), a.setText(s.changes.join("")), e.signal(t, "vim-mode-change", { mode: "normal" }), i.isRecording && $t(i);
	}
	function qt(e) {
		r.unshift(e), e.keys && Jt(e.keys);
	}
	function Jt(e) {
		e.split(/(<(?:[CSMA]-)*\w+>|.)/i).forEach(function(e) {
			e && (i[e] || (i[e] = 0), i[e]++);
		});
	}
	function Yt(e) {
		e.split(/(<(?:[CSMA]-)*\w+>|.)/i).forEach(function(e) {
			i[e] && i[e]--;
		});
	}
	function Xt(e, t, n, r, i) {
		var a = {
			keys: e,
			type: t
		};
		for (var o in a[t] = n, a[t + "Args"] = r, i) a[o] = i[o];
		qt(a);
	}
	E("insertModeEscKeysTimeout", 200, "number");
	function Zt(e, t, n, r) {
		var i = k.registerController.getRegister(r);
		if (r == ":") {
			i.keyBuffer[0] && Gt.processCommand(e, i.keyBuffer[0]), n.isPlaying = !1;
			return;
		}
		var a = i.keyBuffer, o = 0;
		n.isPlaying = !0, n.replaySearchQueries = i.searchQueries.slice(0);
		for (var s = 0; s < a.length; s++) for (var c = a[s], l, u, d = /<(?:[CSMA]-)*\w+>|./gi; l = d.exec(c);) if (u = l[0], se.handleKey(e, u, "macro"), t.insertMode) {
			var f = i.insertModeChanges[o++].changes;
			k.macroModeState.lastInsertModeChanges.changes = f, cn(e, f, 1), G(e);
		}
		n.isPlaying = !1;
	}
	function Qt(e, t) {
		if (!e.isPlaying) {
			var n = e.latestRegister, r = k.registerController.getRegister(n);
			r && r.pushText(t);
		}
	}
	function $t(e) {
		if (!e.isPlaying) {
			var t = e.latestRegister, n = k.registerController.getRegister(t);
			n && n.pushInsertModeChanges && n.pushInsertModeChanges(e.lastInsertModeChanges);
		}
	}
	function en(e, t) {
		if (!e.isPlaying) {
			var n = e.latestRegister, r = k.registerController.getRegister(n);
			r && r.pushSearchQuery && r.pushSearchQuery(t);
		}
	}
	function tn(e, t) {
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
	function nn(e) {
		var t = e.state.vim;
		if (t.insertMode) {
			var n = k.macroModeState;
			if (n.isPlaying) return;
			var r = n.lastInsertModeChanges;
			r.expectCursorActivityForChange ? r.expectCursorActivityForChange = !1 : (r.maybeReset = !0, t.insertEnd && t.insertEnd.clear(), t.insertEnd = e.setBookmark(e.getCursor(), { insertLeft: !0 }));
		} else e.curOp?.isVimOp || rn(e, t);
	}
	function rn(t, n) {
		var r = t.getCursor("anchor"), i = t.getCursor("head");
		if (n.visualMode && !t.somethingSelected() ? Ye(t, !1) : !n.visualMode && !n.insertMode && t.somethingSelected() && (n.visualMode = !0, n.visualLine = !1, e.signal(t, "vim-mode-change", { mode: "visual" })), n.visualMode) {
			var a = R(i, r) ? 0 : -1, o = R(i, r) ? -1 : 0;
			i = I(i, 0, a), r = I(r, 0, o), n.sel = {
				anchor: r,
				head: i
			}, dt(t, n, "<", z(i, r)), dt(t, n, ">", Ie(i, r));
		} else n.insertMode || (n.lastHPos = t.getCursor().ch);
	}
	function an(t) {
		var n = k.macroModeState.lastInsertModeChanges, r = e.keyName ? e.keyName(t) : t.key;
		r && (r.indexOf("Delete") != -1 || r.indexOf("Backspace") != -1) && (n.maybeReset &&= (n.changes = [], !1), n.changes.push(new ae(r, t)));
	}
	function on(e, t, n, r) {
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
		t.inputState = o, t.insertMode && !r && G(e), i.isPlaying = !1;
	}
	function sn(t, n) {
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
				if (s instanceof ae) sn(e, s.keyName);
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
		var r = O(e), i = e, a = !1, r = se.maybeInitVimState_(i), o = r.visualBlock || r.wasInVisualBlock;
		if (i.state.closeVimNotification) {
			var s = i.state.closeVimNotification;
			if (i.state.closeVimNotification = null, s(), t == "<CR>") return N(i), !0;
		}
		var c = i.isInMultiSelectMode();
		if (r.wasInVisualBlock && !c ? r.wasInVisualBlock = !1 : c && r.visualBlock && (r.wasInVisualBlock = !0), t == "<Esc>" && !r.insertMode && !r.visualMode && c && r.status == "<Esc>") N(i);
		else if (o || !c || i.inVirtualSelectionMode) a = se.handleKey(i, t, n);
		else {
			var l = ln(r), u = r.inputState.changeQueueList || [];
			i.operation(function() {
				i.curOp && (i.curOp.isVimOp = !0);
				var e = 0;
				i.forEachSelection(function() {
					i.state.vim.inputState.changeQueue = u[e];
					var r = i.getCursor("head"), o = i.getCursor("anchor"), s = R(r, o) ? 0 : -1, c = R(r, o) ? -1 : 0;
					r = I(r, 0, s), o = I(o, 0, c), i.state.vim.sel.head = r, i.state.vim.sel.anchor = o, a = se.handleKey(i, t, n), i.virtualSelection && (u[e] = i.state.vim.inputState.changeQueue, i.state.vim = ln(l)), e++;
				}), i.curOp?.cursorActivity && !a && (i.curOp.cursorActivity = !1), i.state.vim = r, r.inputState.changeQueueList = u, r.inputState.changeQueue = null;
			}, !0);
		}
		return a && !r.visualMode && !r.insertMode && r.visualMode != i.somethingSelected() && rn(i, r), a;
	}
	return A(), se;
}
function wi(e, t) {
	var n = t.ch, r = t.line + 1;
	r < 1 && (r = 1, n = 0), r > e.lines && (r = e.lines, n = Number.MAX_VALUE);
	var i = e.line(r);
	return Math.min(i.from + Math.max(0, n), i.to);
}
function Ti(e, t) {
	let n = e.lineAt(t);
	return {
		line: n.number - 1,
		ch: t - n.from
	};
}
var Ei = class {
	constructor(e, t) {
		this.line = e, this.ch = t;
	}
};
function Di(e, t, n) {
	if (e.addEventListener) e.addEventListener(t, n, !1);
	else {
		var r = e._handlers ||= {};
		r[t] = (r[t] || []).concat(n);
	}
}
function Oi(e, t, n) {
	if (e.removeEventListener) e.removeEventListener(t, n, !1);
	else {
		var r = e._handlers, i = r && r[t];
		if (i) {
			var a = i.indexOf(n);
			a > -1 && (r[t] = i.slice(0, a).concat(i.slice(a + 1)));
		}
	}
}
function ki(e, t, ...n) {
	var r = e._handlers?.[t];
	if (r) for (var i = 0; i < r.length; ++i) r[i](...n);
}
function Ai(e, ...t) {
	if (e) for (var n = 0; n < e.length; ++n) e[n](...t);
}
var ji;
try {
	ji = /* @__PURE__ */ RegExp("[\\w\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
	ji = /[\w]/;
}
function Mi(e, t) {
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
function Ni(e, t) {
	e.curOp && (e.curOp.$changeStart = void 0), (t ? _n : vn)(e.cm6);
	let n = e.curOp?.$changeStart;
	n != null && e.cm6.dispatch({ selection: { anchor: n } });
}
var Pi = {
	Left: (e) => ue(e.cm6, { key: "Left" }, "editor"),
	Right: (e) => ue(e.cm6, { key: "Right" }, "editor"),
	Up: (e) => ue(e.cm6, { key: "Up" }, "editor"),
	Down: (e) => ue(e.cm6, { key: "Down" }, "editor"),
	Backspace: (e) => ue(e.cm6, { key: "Backspace" }, "editor"),
	Delete: (e) => ue(e.cm6, { key: "Delete" }, "editor")
}, q = class e {
	openDialog(e, t, n) {
		return Bi(this, e, t, n);
	}
	openNotification(e, t) {
		return Li(this, e, t);
	}
	constructor(e) {
		this.state = {}, this.marks = Object.create(null), this.$mid = 0, this.options = {}, this._handlers = {}, this.$lastChangeEndOffset = 0, this.virtualSelection = null, this.cm6 = e, this.onChange = this.onChange.bind(this), this.onSelectionChange = this.onSelectionChange.bind(this);
	}
	on(e, t) {
		Di(this, e, t);
	}
	off(e, t) {
		Oi(this, e, t);
	}
	signal(e, t, n) {
		ki(this, e, t, n);
	}
	indexFromPos(e) {
		return wi(this.cm6.state.doc, e);
	}
	posFromIndex(e) {
		return Ti(this.cm6.state.doc, e);
	}
	foldCode(e) {
		let t = this.cm6, n = t.state.selection.ranges, r = this.cm6.state.doc, i = wi(r, e), a = l.create([l.range(i, i)], 0).ranges;
		t.state.selection.ranges = a, D(t), t.state.selection.ranges = n;
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
		var n = wi(this.cm6.state.doc, {
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
			anchor: Ti(e, t.anchor),
			head: Ti(e, t.head)
		}));
	}
	setSelections(e, t) {
		var n = this.cm6.state.doc, r = e.map((e) => {
			var t = wi(n, e.head), r = wi(n, e.anchor);
			return t == r ? l.cursor(t, 1) : l.range(r, t);
		});
		this.cm6.dispatch({ selection: l.create(r, t) });
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
			index: this.indexFromPos(new Ei(e, 0))
		};
	}
	getLineNumber(e) {
		var t = this.$lineHandleChanges;
		if (!t) return null;
		for (var n = e.index, i = 0; i < t.length; i++) if (n = t[i].changes.mapPos(n, 1, r.TrackAfter), n == null) return null;
		var a = this.posFromIndex(n);
		return a.ch == 0 ? a.line : null;
	}
	releaseLineHandles() {
		this.$lineHandleChanges = void 0;
	}
	getRange(e, t) {
		var n = this.cm6.state.doc;
		return this.cm6.state.sliceDoc(wi(n, e), wi(n, t));
	}
	replaceRange(e, t, n, r) {
		n ||= t;
		var i = this.cm6.state.doc, a = wi(i, t), o = wi(i, n);
		Mi(this, { changes: {
			from: a,
			to: o,
			insert: e
		} });
	}
	replaceSelection(e) {
		Mi(this, this.cm6.state.replaceSelection(e));
	}
	replaceSelections(e) {
		var t = this.cm6.state.selection.ranges.map((t, n) => ({
			from: t.from,
			to: t.to,
			insert: e[n] || ""
		}));
		Mi(this, { changes: t });
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
		return n = Math.min(Math.max(0, n), i.to - i.from), new Ei(r - 1, n);
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
			selection: l.range(0, 0)
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
		var n = this.cm6.state, r = wi(n.doc, e), i = f(n, r + 1, -1);
		return i && i.end || (i = f(n, r, 1), i && i.end) ? { to: Ti(n.doc, i.end.from) } : { to: void 0 };
	}
	scanForBracket(e, t, n, r) {
		return Ui(this, e, t, n, r);
	}
	indentLine(e, t) {
		t ? this.indentMore() : this.indentLess();
	}
	indentMore() {
		_i(this.cm6);
	}
	indentLess() {
		vi(this.cm6);
	}
	execCommand(t) {
		if (t == "indentAuto") e.commands.indentAuto(this);
		else if (t == "goLineLeft") ar(this.cm6);
		else if (t == "goLineRight") {
			ir(this.cm6);
			let e = this.cm6.state, t = e.selection.main.head;
			t < e.doc.length && e.sliceDoc(t, t + 1) !== "\n" && Hn(this.cm6);
		} else console.log(t + " is not implemented");
	}
	setBookmark(e, t) {
		var n = t?.insertLeft ? 1 : -1, r = this.indexFromPos(e);
		return new qi(this, r, n);
	}
	addOverlay({ query: e }) {
		let t = new gt({
			regexp: !0,
			search: e.source,
			caseSensitive: !/i/.test(e.flags)
		});
		if (t.valid) {
			t.forVim = !0, this.cm6Query = t;
			let e = Dt.of(t);
			return this.cm6.dispatch({ effects: e }), t;
		}
	}
	removeOverlay(e) {
		if (!this.cm6Query) return;
		this.cm6Query.forVim = !1;
		let t = Dt.of(this.cm6Query);
		this.cm6.dispatch({ effects: t });
	}
	getSearchCursor(e, t) {
		var n = this, r = null, i = null, a = !1;
		t.ch ??= Number.MAX_VALUE;
		var o = wi(n.cm6.state.doc, t), s = e.source.replace(/(\\.|{(?:\d+(?:,\d*)?|,\d+)})|[{}]/g, function(e, t) {
			return t || "\\" + e;
		});
		function c(t, n = 0, r = t.length) {
			return new Xe(t, s, { ignoreCase: e.ignoreCase }, n, r);
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
					from: Ti(t, r.from),
					to: Ti(t, r.to),
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
				r && (Mi(n, { changes: {
					from: r.from,
					to: r.to,
					insert: e
				} }), r.to = r.from + e.length, i && (i.to = Ti(n.cm6.state.doc, r.to)));
			},
			get match() {
				return i && i.match;
			}
		};
	}
	findPosV(e, t, n, r) {
		let { cm6: i } = this, a = i.state.doc, o = n == "page" ? i.dom.clientHeight : 0, s = wi(a, e), c = l.cursor(s, 1, void 0, r), u = Math.round(Math.abs(t));
		for (let e = 0; e < u; e++) n == "page" ? c = i.moveVertically(c, t > 0, o) : n == "line" && (c = i.moveVertically(c, t > 0));
		let d = Ti(a, c.head);
		return (t < 0 && c.head == 0 && r != 0 && e.line == 0 && e.ch != 0 || t > 0 && c.head == a.length && d.ch != r && e.line == d.line) && (d.hitSide = !0), d;
	}
	charCoords(e, t) {
		var n = this.cm6.contentDOM.getBoundingClientRect(), r = wi(this.cm6.state.doc, e), i = this.cm6.coordsAtPos(r), a = -n.top;
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
		return Ti(this.cm6.state.doc, r);
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
			this.cm6.dispatch({ effects: T.scrollIntoView(n) });
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
		e && (e.change && Ai(e.changeHandlers, this, e.change), e && e.cursorActivity && (Ai(e.cursorActivityHandlers, this, null), e.isVimOp && (t = !0)), this.curOp = null), t && this.scrollIntoView();
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
			case "indentWithTabs": return this.cm6.state.facet(x) == "	";
			case "indentUnit": return this.cm6.state.facet(x).length || 2;
			case "textwidth": return this.state.textwidth;
			case "keyMap": return this.state.keyMap || "vim";
		}
	}
	toggleOverwrite(e) {
		this.state.overwrite = e;
	}
	getTokenTypeAt(e) {
		var t = this.indexFromPos(e), n = (pe(this.cm6.state, t)?.resolve(t))?.type?.name || "";
		return /comment/i.test(n) ? "comment" : /string/i.test(n) ? "string" : "";
	}
	overWriteSelection(e) {
		var t = this.cm6.state.doc, n = this.cm6.state.selection, r = n.ranges.map((e) => {
			if (e.empty) {
				var n = e.to < t.length ? t.sliceString(e.from, e.to + 1) : "";
				if (n && !/\n/.test(n)) return l.range(e.from, e.to + 1);
			}
			return e;
		});
		this.cm6.dispatch({ selection: l.create(r, n.mainIndex) }), this.replaceSelection(e);
	}
	isInMultiSelectMode() {
		return this.cm6.state.selection.ranges.length > 1;
	}
	virtualSelectionMode() {
		return !!this.virtualSelection;
	}
	forEachSelection(e) {
		var t = this.cm6.state.selection;
		this.virtualSelection = l.create(t.ranges, t.mainIndex);
		for (var n = 0; n < this.virtualSelection.ranges.length; n++) {
			var r = this.virtualSelection.ranges[n];
			r && (this.cm6.dispatch({ selection: l.create([r]) }), e(), this.virtualSelection.ranges[n] = this.cm6.state.selection.ranges[0]);
		}
		this.cm6.dispatch({ selection: this.virtualSelection }), this.virtualSelection = null;
	}
	hardWrap(e) {
		return Ji(this, e);
	}
};
q.isMac = typeof navigator < "u" && /* @__PURE__ */ /Mac/.test(navigator.platform), q.Pos = Ei, q.StringStream = I, q.commands = {
	cursorCharLeft: function(e) {
		Bn(e.cm6);
	},
	redo: function(e) {
		Ni(e, !1);
	},
	undo: function(e) {
		Ni(e, !0);
	},
	newlineAndIndent: function(e) {
		fi({
			state: e.cm6.state,
			dispatch: (t) => Mi(e, t)
		});
	},
	indentAuto: function(e) {
		gi(e.cm6);
	},
	newlineAndIndentContinueComment: void 0,
	save: void 0
}, q.isWordChar = function(e) {
	return ji.test(e);
}, q.keys = Pi, q.addClass = function(e, t) {}, q.rmClass = function(e, t) {}, q.e_preventDefault = function(e) {
	e.preventDefault();
}, q.e_stop = function(e) {
	var t, n;
	(t = e?.stopPropagation) == null || t.call(e), (n = e?.preventDefault) == null || n.call(e);
}, q.lookupKey = function(e, t, n) {
	var r = q.keys[e];
	!r && /^Arrow/.test(e) && (r = q.keys[e.slice(5)]), r && n(r);
}, q.on = Di, q.off = Oi, q.signal = ki, q.findMatchingTag = Wi, q.findEnclosingTag = Gi, q.keyName = void 0;
function Fi(e, t, n) {
	var r = document.createElement("div");
	return r.appendChild(t), r;
}
function Ii(e, t) {
	e.state.currentNotificationClose && e.state.currentNotificationClose(), e.state.currentNotificationClose = t;
}
function Li(e, t, n) {
	Ii(e, s);
	var r = Fi(e, t, n && n.bottom), i = !1, a, o = n && n.duration !== void 0 ? n.duration : 5e3;
	function s() {
		i || (i = !0, clearTimeout(a), r.remove(), zi(e, r));
	}
	return r.onclick = function(e) {
		e.preventDefault(), s();
	}, Ri(e, r), o && (a = setTimeout(s, o)), s;
}
function Ri(e, t) {
	var n = e.state.dialog;
	e.state.dialog = t, t.style.flex = "1", t && n !== t && (n && n.contains(document.activeElement) && e.focus(), n && n.parentElement ? n.parentElement.replaceChild(t, n) : n && n.remove(), q.signal(e, "dialog"));
}
function zi(e, t) {
	e.state.dialog == t && (e.state.dialog = null, q.signal(e, "dialog"));
}
function Bi(e, t, n, r) {
	r ||= {}, Ii(e, void 0);
	var i = Fi(e, t, r.bottom), a = !1;
	Ri(e, i);
	function o(t) {
		if (typeof t == "string") s.value = t;
		else {
			if (a) return;
			a = !0, zi(e, i), e.state.dialog || e.focus(), r.onClose && r.onClose(i);
		}
	}
	var s = i.getElementsByTagName("input")[0];
	return s && (r.value && (s.value = r.value, r.selectValueOnOpen !== !1 && s.select()), r.onInput && q.on(s, "input", function(e) {
		r.onInput(e, s.value, o);
	}), r.onKeyUp && q.on(s, "keyup", function(e) {
		r.onKeyUp(e, s.value, o);
	}), q.on(s, "keydown", function(e) {
		r && r.onKeyDown && r.onKeyDown(e, s.value, o) || (e.keyCode == 13 && n && n(s.value), (e.keyCode == 27 || r.closeOnEnter !== !1 && e.keyCode == 13) && (s.blur(), q.e_stop(e), o()));
	}), r.closeOnBlur !== !1 && q.on(s, "blur", function() {
		setTimeout(function() {
			document.activeElement !== s && o();
		});
	}), s.focus()), o;
}
var Vi = {
	"(": ")>",
	")": "(<",
	"[": "]>",
	"]": "[<",
	"{": "}>",
	"}": "{<",
	"<": ">>",
	">": "<<"
};
function Hi(e) {
	return e && e.bracketRegex || /[(){}[\]]/;
}
function Ui(e, t, n, r, i) {
	for (var a = i && i.maxScanLineLength || 1e4, o = i && i.maxScanLines || 1e3, s = [], c = Hi(i), l = n > 0 ? Math.min(t.line + o, e.lastLine() + 1) : Math.max(e.firstLine() - 1, t.line - o), u = t.line; u != l; u += n) {
		var d = e.getLine(u);
		if (d) {
			var f = n > 0 ? 0 : d.length - 1, p = n > 0 ? d.length : -1;
			if (!(d.length > a)) for (u == t.line && (f = t.ch - +(n < 0)); f != p; f += n) {
				var m = d.charAt(f);
				if (c.test(m)) {
					var h = Vi[m];
					if (h && h.charAt(1) == ">" == n > 0) s.push(m);
					else if (s.length) s.pop();
					else return {
						pos: new Ei(u, f),
						ch: m
					};
				}
			}
		}
	}
	return u - n == (n > 0 ? e.lastLine() : e.firstLine()) ? !1 : null;
}
function Wi(e, t) {
	return null;
}
function Gi(e, t) {
	var n = e.cm6.state, r = e.indexFromPos(t);
	r < n.doc.length && n.sliceDoc(r, r + 1) == "<" && r++;
	for (var i = pe(n, r)?.resolve(r) || null; i;) {
		if (i.firstChild?.type.name == "OpenTag" && i.lastChild?.type.name == "CloseTag") return {
			open: Ki(n.doc, i.firstChild),
			close: Ki(n.doc, i.lastChild)
		};
		i = i.parent;
	}
}
function Ki(e, t) {
	return {
		from: Ti(e, t.from),
		to: Ti(e, t.to)
	};
}
var qi = class {
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
		this.offset != null && (this.offset = e.mapPos(this.offset, this.assoc, r.TrackDel));
	}
};
function Ji(e, t) {
	for (var n = t.column || e.getOption("textwidth") || 80, r = t.allowMerge != 0, i = Math.min(t.from, t.to), a = Math.max(t.from, t.to); i <= a;) {
		var o = e.getLine(i);
		if (o.length > n) {
			var s = p(o, n, 5);
			if (s) {
				var c = /^\s*/.exec(o)?.[0];
				e.replaceRange("\n" + c, new Ei(i, s.start), new Ei(i, s.end));
			}
			a++;
		} else if (r && /\S/.test(o) && i != a) {
			var l = e.getLine(i + 1);
			if (l && /\S/.test(l)) {
				var u = o.replace(/\s+$/, ""), d = l.replace(/^\s+/, ""), f = u + " " + d, s = p(f, n, 5);
				s && s.start > u.length || f.length < n ? (e.replaceRange(" ", new Ei(i, u.length), new Ei(i + 1, l.length - d.length)), i--, a--) : u.length < o.length && e.replaceRange("", new Ei(i, u.length), new Ei(i, o.length));
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
var Yi = fe || /* @__PURE__ */ function() {
	let e = { cursorBlinkRate: 1200 };
	return function() {
		return e;
	};
}(), Xi = class {
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
}, Zi = class {
	constructor(e, t) {
		this.view = e, this.rangePieces = [], this.cursors = [], this.cm = t, this.measureReq = {
			read: this.readPos.bind(this),
			write: this.drawSel.bind(this)
		}, this.cursorLayer = e.scrollDOM.appendChild(document.createElement("div")), this.cursorLayer.className = "cm-cursorLayer cm-vimCursorLayer", this.cursorLayer.setAttribute("aria-hidden", "true"), e.requestMeasure(this.measureReq), this.setBlinkRate();
	}
	setBlinkRate() {
		let e = Yi(this.cm.cm6.state).cursorBlinkRate;
		this.cursorLayer.style.animationDuration = e + "ms";
	}
	update(e) {
		(e.selectionSet || e.geometryChanged || e.viewportChanged) && (this.view.requestMeasure(this.measureReq), this.cursorLayer.style.animationName = this.cursorLayer.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink"), Qi(e) && this.setBlinkRate();
	}
	scheduleRedraw() {
		this.view.requestMeasure(this.measureReq);
	}
	readPos() {
		let { state: e } = this.view, t = [];
		for (let n of e.selection.ranges) {
			let r = n == e.selection.main, i = ta(this.cm, this.view, n, r);
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
function Qi(e) {
	return Yi(e.startState) != Yi(e.state);
}
var $i = /* @__PURE__ */ Ce.highest(/* @__PURE__ */ T.theme({
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
function ea(e) {
	let t = e.scrollDOM.getBoundingClientRect();
	return {
		left: (e.textDirection == M.LTR ? t.left : t.right - e.scrollDOM.clientWidth) - e.scrollDOM.scrollLeft * e.scaleX,
		top: t.top - e.scrollDOM.scrollTop * e.scaleY
	};
}
function ta(e, t, n, r) {
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
		let o = ea(t), c = t.domAtPos(a), u = c ? c.node : t.contentDOM;
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
		return new Xi((f - o.left) / t.scaleX, (n.top - o.top + m * (1 - s)) / t.scaleY, m * s / t.scaleY, d.fontFamily, d.fontSize, d.fontWeight, d.color, r ? "cm-fat-cursor cm-cursor-primary" : "cm-fat-cursor cm-cursor-secondary", e, s != 1);
	} else return null;
}
var na = typeof navigator < "u" && /* @__PURE__ */ /linux/i.test(navigator.platform) && /* @__PURE__ */ / Gecko\/\d+/.exec(navigator.userAgent), J = /* @__PURE__ */ Ci(q), ra = 250, ia = /* @__PURE__ */ T.baseTheme({
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
}), aa = /* @__PURE__ */ t.fromClass(class {
	constructor(e) {
		this.status = "", this.query = null, this.decorations = j.none, this.waitForCopy = !1, this.lastKeydown = "", this.useNextTextInput = !1, this.compositionText = "", this.view = e;
		let t = this.cm = new q(e);
		J.enterVimMode(this.cm), this.view.cm = this.cm, this.cm.state.vimPlugin = this, this.blockCursor = new Zi(e, t), this.updateClass(), this.cm.on("vim-command-done", () => {
			t.state.vim && (t.state.vim.status = ""), this.blockCursor.scheduleRedraw(), this.updateStatus();
		}), this.cm.on("vim-mode-change", (e) => {
			t.state.vim && (t.state.vim.mode = e.mode, e.subMode && (t.state.vim.mode += " block"), t.state.vim.status = "", this.blockCursor.scheduleRedraw(), this.updateClass(), this.updateStatus());
		}), this.cm.on("dialog", () => {
			this.cm.state.statusbar ? this.updateStatus() : e.dispatch({ effects: ca.of(!!this.cm.state.dialog) });
		}), this.dom = document.createElement("span"), this.spacer = document.createElement("span"), this.spacer.style.flex = "1", this.statusButton = document.createElement("span"), this.statusButton.onclick = (e) => {
			J.handleKey(this.cm, "<Esc>", "user"), this.cm.focus();
		}, this.statusButton.style.cssText = "cursor: pointer";
	}
	update(e) {
		if ((e.viewportChanged || e.docChanged) && this.query && this.highlight(this.query), e.docChanged && this.cm.onChange(e), e.selectionSet && this.cm.onSelectionChange(), e.viewportChanged, this.cm.curOp && !this.cm.curOp.isVimOp && this.cm.onBeforeEndOperation(), e.transactions) {
			for (let t of e.transactions) for (let e of t.effects) if (e.is(Dt)) if (!e.value?.forVim) this.highlight(null);
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
		J.leaveVimMode(this.cm), this.updateClass(), this.blockCursor.destroy(), delete this.view.cm;
	}
	highlight(e) {
		if (this.query = e, !e) return this.decorations = j.none;
		let { view: t } = this, n = new ee();
		for (let r = 0, i = t.visibleRanges, a = i.length; r < a; r++) {
			let { from: o, to: s } = i[r];
			for (; r < a - 1 && s > i[r + 1].from - 2 * ra;) s = i[++r].to;
			e.highlight(t.state, o, s, (e, t) => {
				n.add(e, t, sa);
			});
		}
		return this.decorations = n.finish();
	}
	handleKey(e, t) {
		let n = this.cm, r = n.state.vim;
		if (!r) return;
		let i = J.vimKeyFromEvent(e, r);
		if (q.signal(this.cm, "inputEvent", {
			type: "handleKey",
			key: i
		}), !i) return;
		if (i == "<Esc>" && !r.insertMode && !r.visualMode && this.query) {
			let e = r.searchState_;
			e && (n.removeOverlay(e.getOverlay()), e.setOverlay(null));
		}
		if (i === "<C-c>" && !q.isMac && n.somethingSelected()) return this.waitForCopy = !0, !0;
		r.status = (r.status || "") + i;
		let a = J.multiSelectHandleKey(n, i, "user");
		return r = J.maybeInitVimState_(n), !a && r.insertMode && n.state.overwrite && (e.key && e.key.length == 1 && !/\n/.test(e.key) ? (a = !0, n.overWriteSelection(e.key)) : e.key == "Backspace" && (a = !0, q.commands.cursorCharLeft(n))), a && (q.signal(this.cm, "vim-keypress", i), e.preventDefault(), e.stopPropagation(), this.blockCursor.scheduleRedraw()), this.updateStatus(), !!a;
	}
}, {
	eventHandlers: {
		copy: function(e, t) {
			this.waitForCopy && (this.waitForCopy = !1, Promise.resolve().then(() => {
				var e = this.cm, t = e.state.vim;
				t && (t.insertMode ? e.setSelection(e.getCursor(), e.getCursor()) : e.operation(() => {
					e.curOp && (e.curOp.isVimOp = !0), J.handleKey(e, "<Esc>", "user");
				}));
			}));
		},
		compositionstart: function(e, t) {
			this.useNextTextInput = !0, q.signal(this.cm, "inputEvent", e);
		},
		compositionupdate: function(e, t) {
			q.signal(this.cm, "inputEvent", e);
		},
		compositionend: function(e, t) {
			q.signal(this.cm, "inputEvent", e);
		},
		keypress: function(e, t) {
			q.signal(this.cm, "inputEvent", e), this.lastKeydown == "Dead" && this.handleKey(e, t);
		},
		keydown: function(e, t) {
			q.signal(this.cm, "inputEvent", e), this.lastKeydown = e.key, this.lastKeydown == "Unidentified" || this.lastKeydown == "Process" || this.lastKeydown == "Dead" ? this.useNextTextInput = !0 : (this.useNextTextInput = !1, this.handleKey(e, t));
		}
	},
	provide: () => [T.inputHandler.of((e, t, n, r) => {
		var i = pa(e);
		if (!i) return !1;
		var a = i.state?.vim, o = i.state.vimPlugin;
		if (a && !a.insertMode && !i.curOp?.isVimOp) {
			if (r === "\0\0") return !0;
			if (q.signal(i, "inputEvent", {
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
				}), oa(e), !0;
			}
		}
		return !1;
	})],
	decorations: (e) => e.decorations
});
function oa(e) {
	var t = e.scrollDOM.parentElement;
	if (t) {
		if (na) {
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
var sa = /* @__PURE__ */ j.mark({ class: "cm-searchMatch" }), ca = /* @__PURE__ */ p.define(), la = /* @__PURE__ */ g.define({
	create: () => !1,
	update(e, t) {
		for (let n of t.effects) n.is(ca) && (e = n.value);
		return e;
	},
	provide: (e) => V.from(e, (e) => e ? ua : null)
});
function ua(e) {
	let t = document.createElement("div");
	t.className = "cm-vim-panel";
	let n = e.cm;
	return n.state.dialog && t.appendChild(n.state.dialog), {
		top: !1,
		dom: t
	};
}
function da(e) {
	let t = document.createElement("div");
	t.className = "cm-vim-panel";
	let n = e.cm;
	return n.state.statusbar = t, n.state.vimPlugin.updateStatus(), { dom: t };
}
function fa(e = {}) {
	return [
		ia,
		aa,
		$i,
		e.status ? V.of(da) : la
	];
}
function pa(e) {
	return e.cm || null;
}
//#endregion
//#region node_modules/@lezer/markdown/dist/index.js
var ma = class e {
	static create(t, n, r, i, a) {
		return new e(t, n, r, i + (i << 8) + t + (n << 4) | 0, a, [], []);
	}
	constructor(e, t, n, r, i, a, o) {
		this.type = e, this.value = t, this.from = n, this.hash = r, this.end = i, this.children = a, this.positions = o, this.hashProp = [[O.contextHash, r]];
	}
	addChild(e, t) {
		e.prop(O.contextHash) != this.hash && (e = new _(e.type, e.children, e.positions, e.length, this.hashProp)), this.children.push(e), this.positions.push(t);
	}
	toTree(e, t = this.end) {
		let n = this.children.length - 1;
		return n >= 0 && (t = Math.max(t, this.positions[n] + this.children[n].length + this.from)), new _(e.types[this.type], this.children, this.positions, t - this.from).balance({ makeTree: (e, t, n) => new _(m.none, e, t, n, this.hashProp) });
	}
}, Y;
(function(e) {
	e[e.Document = 1] = "Document", e[e.CodeBlock = 2] = "CodeBlock", e[e.FencedCode = 3] = "FencedCode", e[e.Blockquote = 4] = "Blockquote", e[e.HorizontalRule = 5] = "HorizontalRule", e[e.BulletList = 6] = "BulletList", e[e.OrderedList = 7] = "OrderedList", e[e.ListItem = 8] = "ListItem", e[e.ATXHeading1 = 9] = "ATXHeading1", e[e.ATXHeading2 = 10] = "ATXHeading2", e[e.ATXHeading3 = 11] = "ATXHeading3", e[e.ATXHeading4 = 12] = "ATXHeading4", e[e.ATXHeading5 = 13] = "ATXHeading5", e[e.ATXHeading6 = 14] = "ATXHeading6", e[e.SetextHeading1 = 15] = "SetextHeading1", e[e.SetextHeading2 = 16] = "SetextHeading2", e[e.HTMLBlock = 17] = "HTMLBlock", e[e.LinkReference = 18] = "LinkReference", e[e.Paragraph = 19] = "Paragraph", e[e.CommentBlock = 20] = "CommentBlock", e[e.ProcessingInstructionBlock = 21] = "ProcessingInstructionBlock", e[e.Escape = 22] = "Escape", e[e.Entity = 23] = "Entity", e[e.HardBreak = 24] = "HardBreak", e[e.Emphasis = 25] = "Emphasis", e[e.StrongEmphasis = 26] = "StrongEmphasis", e[e.Link = 27] = "Link", e[e.Image = 28] = "Image", e[e.InlineCode = 29] = "InlineCode", e[e.HTMLTag = 30] = "HTMLTag", e[e.Comment = 31] = "Comment", e[e.ProcessingInstruction = 32] = "ProcessingInstruction", e[e.Autolink = 33] = "Autolink", e[e.HeaderMark = 34] = "HeaderMark", e[e.QuoteMark = 35] = "QuoteMark", e[e.ListMark = 36] = "ListMark", e[e.LinkMark = 37] = "LinkMark", e[e.EmphasisMark = 38] = "EmphasisMark", e[e.CodeMark = 39] = "CodeMark", e[e.CodeText = 40] = "CodeText", e[e.CodeInfo = 41] = "CodeInfo", e[e.LinkTitle = 42] = "LinkTitle", e[e.LinkLabel = 43] = "LinkLabel", e[e.URL = 44] = "URL";
})(Y ||= {});
var ha = class {
	constructor(e, t) {
		this.start = e, this.content = t, this.marks = [], this.parsers = [];
	}
}, ga = class {
	constructor() {
		this.text = "", this.baseIndent = 0, this.basePos = 0, this.depth = 0, this.markers = [], this.pos = 0, this.indent = 0, this.next = -1;
	}
	forward() {
		this.basePos > this.pos && this.forwardInner();
	}
	forwardInner() {
		let e = this.skipSpace(this.basePos);
		this.indent = this.countIndent(e, this.pos, this.indent), this.pos = e, this.next = e == this.text.length ? -1 : this.text.charCodeAt(e);
	}
	skipSpace(e) {
		return ba(this.text, e);
	}
	reset(e) {
		for (this.text = e, this.baseIndent = this.basePos = this.pos = this.indent = 0, this.forwardInner(), this.depth = 1; this.markers.length;) this.markers.pop();
	}
	moveBase(e) {
		this.basePos = e, this.baseIndent = this.countIndent(e, this.pos, this.indent);
	}
	moveBaseColumn(e) {
		this.baseIndent = e, this.basePos = this.findColumn(e);
	}
	addMarker(e) {
		this.markers.push(e);
	}
	countIndent(e, t = 0, n = 0) {
		for (let r = t; r < e; r++) n += this.text.charCodeAt(r) == 9 ? 4 - n % 4 : 1;
		return n;
	}
	findColumn(e) {
		let t = 0;
		for (let n = 0; t < this.text.length && n < e; t++) n += this.text.charCodeAt(t) == 9 ? 4 - n % 4 : 1;
		return t;
	}
	scrub() {
		if (!this.baseIndent) return this.text;
		let e = "";
		for (let t = 0; t < this.basePos; t++) e += " ";
		return e + this.text.slice(this.basePos);
	}
};
function _a(e, t, n) {
	if (n.pos == n.text.length || e != t.block && n.indent >= t.stack[n.depth + 1].value + n.baseIndent) return !0;
	if (n.indent >= n.baseIndent + 4) return !1;
	let r = (e.type == Y.OrderedList ? Da : Ea)(n, t, !1);
	return r > 0 && (e.type != Y.BulletList || wa(n, t, !1) < 0) && n.text.charCodeAt(n.pos + r - 1) == e.value;
}
var va = {
	[Y.Blockquote](e, t, n) {
		return n.next == 62 ? (n.markers.push(X(Y.QuoteMark, t.lineStart + n.pos, t.lineStart + n.pos + 1)), n.moveBase(n.pos + (ya(n.text.charCodeAt(n.pos + 1)) ? 2 : 1)), e.end = t.lineStart + n.text.length, !0) : !1;
	},
	[Y.ListItem](e, t, n) {
		return n.indent < n.baseIndent + e.value && n.next > -1 ? !1 : (n.moveBaseColumn(n.baseIndent + e.value), !0);
	},
	[Y.OrderedList]: _a,
	[Y.BulletList]: _a,
	[Y.Document]() {
		return !0;
	}
};
function ya(e) {
	return e == 32 || e == 9 || e == 10 || e == 13;
}
function ba(e, t = 0) {
	for (; t < e.length && ya(e.charCodeAt(t));) t++;
	return t;
}
function xa(e, t, n) {
	for (; t > n && ya(e.charCodeAt(t - 1));) t--;
	return t;
}
function Sa(e) {
	if (e.next != 96 && e.next != 126) return -1;
	let t = e.pos + 1;
	for (; t < e.text.length && e.text.charCodeAt(t) == e.next;) t++;
	if (t < e.pos + 3) return -1;
	if (e.next == 96) {
		for (let n = t; n < e.text.length; n++) if (e.text.charCodeAt(n) == 96) return -1;
	}
	return t;
}
function Ca(e) {
	return e.next == 62 ? e.text.charCodeAt(e.pos + 1) == 32 ? 2 : 1 : -1;
}
function wa(e, t, n) {
	if (e.next != 42 && e.next != 45 && e.next != 95) return -1;
	let r = 1;
	for (let t = e.pos + 1; t < e.text.length; t++) {
		let n = e.text.charCodeAt(t);
		if (n == e.next) r++;
		else if (!ya(n)) return -1;
	}
	return n && e.next == 45 && ka(e) > -1 && e.depth == t.stack.length && t.parser.leafBlockParsers.indexOf(Va.SetextHeading) > -1 || r < 3 ? -1 : 1;
}
function Ta(e, t) {
	for (let n = e.stack.length - 1; n >= 0; n--) if (e.stack[n].type == t) return !0;
	return !1;
}
function Ea(e, t, n) {
	return (e.next == 45 || e.next == 43 || e.next == 42) && (e.pos == e.text.length - 1 || ya(e.text.charCodeAt(e.pos + 1))) && (!n || Ta(t, Y.BulletList) || e.skipSpace(e.pos + 2) < e.text.length) ? 1 : -1;
}
function Da(e, t, n) {
	let r = e.pos, i = e.next;
	for (; i >= 48 && i <= 57;) {
		if (r++, r == e.text.length) return -1;
		i = e.text.charCodeAt(r);
	}
	return r == e.pos || r > e.pos + 9 || i != 46 && i != 41 || r < e.text.length - 1 && !ya(e.text.charCodeAt(r + 1)) || n && !Ta(t, Y.OrderedList) && (e.skipSpace(r + 1) == e.text.length || r > e.pos + 1 || e.next != 49) ? -1 : r + 1 - e.pos;
}
function Oa(e) {
	if (e.next != 35) return -1;
	let t = e.pos + 1;
	for (; t < e.text.length && e.text.charCodeAt(t) == 35;) t++;
	if (t < e.text.length && e.text.charCodeAt(t) != 32) return -1;
	let n = t - e.pos;
	return n > 6 ? -1 : n;
}
function ka(e) {
	if (e.next != 45 && e.next != 61 || e.indent >= e.baseIndent + 4) return -1;
	let t = e.pos + 1;
	for (; t < e.text.length && e.text.charCodeAt(t) == e.next;) t++;
	let n = t;
	for (; t < e.text.length && ya(e.text.charCodeAt(t));) t++;
	return t == e.text.length ? n : -1;
}
var Aa = /^[ \t]*$/, ja = /-->/, Ma = /\?>/, Na = [
	[/^<(?:script|pre|style)(?:\s|>|$)/i, /<\/(?:script|pre|style)>/i],
	[/^\s*<!--/, ja],
	[/^\s*<\?/, Ma],
	[/^\s*<![A-Z]/, />/],
	[/^\s*<!\[CDATA\[/, /\]\]>/],
	[/^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i, Aa],
	[/^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i, Aa]
];
function Pa(e, t, n) {
	if (e.next != 60) return -1;
	let r = e.text.slice(e.pos);
	for (let e = 0, t = Na.length - +!!n; e < t; e++) if (Na[e][0].test(r)) return e;
	return -1;
}
function Fa(e, t) {
	let n = e.countIndent(t, e.pos, e.indent), r = e.countIndent(e.skipSpace(t), t, n);
	return r >= n + 5 ? n + 1 : r;
}
function Ia(e, t, n) {
	let r = e.length - 1;
	r >= 0 && e[r].to == t && e[r].type == Y.CodeText ? e[r].to = n : e.push(X(Y.CodeText, t, n));
}
var La = {
	LinkReference: void 0,
	IndentedCode(e, t) {
		let n = t.baseIndent + 4;
		if (t.indent < n) return !1;
		let r = t.findColumn(n), i = e.lineStart + r, a = e.lineStart + t.text.length, o = [], s = [];
		for (Ia(o, i, a); e.nextLine() && t.depth >= e.stack.length;) if (t.pos == t.text.length) {
			Ia(s, e.lineStart - 1, e.lineStart);
			for (let e of t.markers) s.push(e);
		} else if (t.indent < n) break;
		else {
			if (s.length) {
				for (let e of s) e.type == Y.CodeText ? Ia(o, e.from, e.to) : o.push(e);
				s = [];
			}
			Ia(o, e.lineStart - 1, e.lineStart);
			for (let e of t.markers) o.push(e);
			a = e.lineStart + t.text.length;
			let n = e.lineStart + t.findColumn(t.baseIndent + 4);
			n < a && Ia(o, n, a);
		}
		return s.length && (s = s.filter((e) => e.type != Y.CodeText), s.length && (t.markers = s.concat(t.markers))), e.addNode(e.buffer.writeElements(o, -i).finish(Y.CodeBlock, a - i), i), !0;
	},
	FencedCode(e, t) {
		let n = Sa(t);
		if (n < 0) return !1;
		let r = e.lineStart + t.pos, i = t.next, a = n - t.pos, o = t.skipSpace(n), s = xa(t.text, t.text.length, o), c = [X(Y.CodeMark, r, r + a)];
		o < s && c.push(X(Y.CodeInfo, e.lineStart + o, e.lineStart + s));
		for (let n = !0, r = !0, o = !1; e.nextLine() && t.depth >= e.stack.length; n = !1) {
			let s = t.pos;
			if (t.indent - t.baseIndent < 4) for (; s < t.text.length && t.text.charCodeAt(s) == i;) s++;
			if (s - t.pos >= a && t.skipSpace(s) == t.text.length) {
				for (let e of t.markers) c.push(e);
				r && o && Ia(c, e.lineStart - 1, e.lineStart), c.push(X(Y.CodeMark, e.lineStart + t.pos, e.lineStart + s)), e.nextLine();
				break;
			} else {
				o = !0, n || (Ia(c, e.lineStart - 1, e.lineStart), r = !1);
				for (let e of t.markers) c.push(e);
				let i = e.lineStart + t.basePos, a = e.lineStart + t.text.length;
				i < a && (Ia(c, i, a), r = !1);
			}
		}
		return e.addNode(e.buffer.writeElements(c, -r).finish(Y.FencedCode, e.prevLineEnd() - r), r), !0;
	},
	Blockquote(e, t) {
		let n = Ca(t);
		return n < 0 ? !1 : (e.startContext(Y.Blockquote, t.pos), e.addNode(Y.QuoteMark, e.lineStart + t.pos, e.lineStart + t.pos + 1), t.moveBase(t.pos + n), null);
	},
	HorizontalRule(e, t) {
		if (wa(t, e, !1) < 0) return !1;
		let n = e.lineStart + t.pos;
		return e.nextLine(), e.addNode(Y.HorizontalRule, n), !0;
	},
	BulletList(e, t) {
		let n = Ea(t, e, !1);
		if (n < 0) return !1;
		e.block.type != Y.BulletList && e.startContext(Y.BulletList, t.basePos, t.next);
		let r = Fa(t, t.pos + 1);
		return e.startContext(Y.ListItem, t.basePos, r - t.baseIndent), e.addNode(Y.ListMark, e.lineStart + t.pos, e.lineStart + t.pos + n), t.moveBaseColumn(r), null;
	},
	OrderedList(e, t) {
		let n = Da(t, e, !1);
		if (n < 0) return !1;
		e.block.type != Y.OrderedList && e.startContext(Y.OrderedList, t.basePos, t.text.charCodeAt(t.pos + n - 1));
		let r = Fa(t, t.pos + n);
		return e.startContext(Y.ListItem, t.basePos, r - t.baseIndent), e.addNode(Y.ListMark, e.lineStart + t.pos, e.lineStart + t.pos + n), t.moveBaseColumn(r), null;
	},
	ATXHeading(e, t) {
		let n = Oa(t);
		if (n < 0) return !1;
		let r = t.pos, i = e.lineStart + r, a = xa(t.text, t.text.length, r), o = a;
		for (; o > r && t.text.charCodeAt(o - 1) == t.next;) o--;
		(o == a || o == r || !ya(t.text.charCodeAt(o - 1))) && (o = t.text.length);
		let s = e.buffer.write(Y.HeaderMark, 0, n).writeElements(e.parser.parseInline(t.text.slice(r + n + 1, o), i + n + 1), -i);
		o < t.text.length && s.write(Y.HeaderMark, o - r, a - r);
		let c = s.finish(Y.ATXHeading1 - 1 + n, t.text.length - r);
		return e.nextLine(), e.addNode(c, i), !0;
	},
	HTMLBlock(e, t) {
		let n = Pa(t, e, !1);
		if (n < 0) return !1;
		let r = e.lineStart + t.pos, i = Na[n][1], a = [], o = i != Aa;
		for (; !i.test(t.text) && e.nextLine();) {
			if (t.depth < e.stack.length) {
				o = !1;
				break;
			}
			for (let e of t.markers) a.push(e);
		}
		o && e.nextLine();
		let s = i == ja ? Y.CommentBlock : i == Ma ? Y.ProcessingInstructionBlock : Y.HTMLBlock, c = e.prevLineEnd();
		return e.addNode(e.buffer.writeElements(a, -r).finish(s, c - r), r), !0;
	},
	SetextHeading: void 0
}, Ra = class {
	constructor(e) {
		this.stage = 0, this.elts = [], this.pos = 0, this.start = e.start, this.advance(e.content);
	}
	nextLine(e, t, n) {
		if (this.stage == -1) return !1;
		let r = n.content + "\n" + t.scrub(), i = this.advance(r);
		return i > -1 && i < r.length ? this.complete(e, n, i) : !1;
	}
	finish(e, t) {
		return (this.stage == 2 || this.stage == 3) && ba(t.content, this.pos) == t.content.length ? this.complete(e, t, t.content.length) : !1;
	}
	complete(e, t, n) {
		return e.addLeafElement(t, X(Y.LinkReference, this.start, this.start + n, this.elts)), !0;
	}
	nextStage(e) {
		return e ? (this.pos = e.to - this.start, this.elts.push(e), this.stage++, !0) : (e === !1 && (this.stage = -1), !1);
	}
	advance(e) {
		for (;;) if (this.stage == -1) return -1;
		else if (this.stage == 0) {
			if (!this.nextStage(po(e, this.pos, this.start, !0))) return -1;
			if (e.charCodeAt(this.pos) != 58) return this.stage = -1;
			this.elts.push(X(Y.LinkMark, this.pos + this.start, this.pos + this.start + 1)), this.pos++;
		} else if (this.stage == 1) {
			if (!this.nextStage(uo(e, ba(e, this.pos), this.start))) return -1;
		} else if (this.stage == 2) {
			let t = ba(e, this.pos), n = 0;
			if (t > this.pos) {
				let r = fo(e, t, this.start);
				if (r) {
					let t = za(e, r.to - this.start);
					t > 0 && (this.nextStage(r), n = t);
				}
			}
			return n ||= za(e, this.pos), n > 0 && n < e.length ? n : -1;
		} else return za(e, this.pos);
	}
};
function za(e, t) {
	for (; t < e.length; t++) {
		let n = e.charCodeAt(t);
		if (n == 10) break;
		if (!ya(n)) return -1;
	}
	return t;
}
var Ba = class {
	nextLine(e, t, n) {
		let r = t.depth < e.stack.length ? -1 : ka(t), i = t.next;
		if (r < 0) return !1;
		let a = X(Y.HeaderMark, e.lineStart + t.pos, e.lineStart + r);
		return e.nextLine(), e.addLeafElement(n, X(i == 61 ? Y.SetextHeading1 : Y.SetextHeading2, n.start, e.prevLineEnd(), [...e.parser.parseInline(n.content, n.start), a])), !0;
	}
	finish() {
		return !1;
	}
}, Va = {
	LinkReference(e, t) {
		return t.content.charCodeAt(0) == 91 ? new Ra(t) : null;
	},
	SetextHeading() {
		return new Ba();
	}
}, Ha = [
	(e, t) => Oa(t) >= 0,
	(e, t) => Sa(t) >= 0,
	(e, t) => Ca(t) >= 0,
	(e, t) => Ea(t, e, !0) >= 0,
	(e, t) => Da(t, e, !0) >= 0,
	(e, t) => wa(t, e, !0) >= 0,
	(e, t) => Pa(t, e, !0) >= 0
], Ua = {
	text: "",
	end: 0
}, Wa = class {
	constructor(e, t, n, r) {
		this.parser = e, this.input = t, this.ranges = r, this.line = new ga(), this.atEnd = !1, this.reusePlaceholders = /* @__PURE__ */ new Map(), this.stoppedAt = null, this.rangeI = 0, this.to = r[r.length - 1].to, this.lineStart = this.absoluteLineStart = this.absoluteLineEnd = r[0].from, this.block = ma.create(Y.Document, 0, this.lineStart, 0, 0), this.stack = [this.block], this.fragments = n.length ? new _o(n, t) : null, this.readLine();
	}
	get parsedPos() {
		return this.absoluteLineStart;
	}
	advance() {
		if (this.stoppedAt != null && this.absoluteLineStart > this.stoppedAt) return this.finish();
		let { line: e } = this;
		for (;;) {
			for (let t = 0;;) {
				let n = e.depth < this.stack.length ? this.stack[this.stack.length - 1] : null;
				for (; t < e.markers.length && (!n || e.markers[t].from < n.end);) {
					let n = e.markers[t++];
					this.addNode(n.type, n.from, n.to);
				}
				if (!n) break;
				this.finishContext();
			}
			if (e.pos < e.text.length) break;
			if (!this.nextLine()) return this.finish();
		}
		if (this.fragments && this.reuseFragment(e.basePos)) return null;
		start: for (;;) {
			for (let t of this.parser.blockParsers) if (t) {
				let n = t(this, e);
				if (n != 0) {
					if (n == 1) return null;
					e.forward();
					continue start;
				}
			}
			break;
		}
		let t = new ha(this.lineStart + e.pos, e.text.slice(e.pos));
		for (let e of this.parser.leafBlockParsers) if (e) {
			let n = e(this, t);
			n && t.parsers.push(n);
		}
		lines: for (; this.nextLine() && e.pos != e.text.length;) {
			if (e.indent < e.baseIndent + 4) {
				for (let n of this.parser.endLeafBlock) if (n(this, e, t)) break lines;
			}
			for (let n of t.parsers) if (n.nextLine(this, e, t)) return null;
			t.content += "\n" + e.scrub();
			for (let n of e.markers) t.marks.push(n);
		}
		return this.finishLeaf(t), null;
	}
	stopAt(e) {
		if (this.stoppedAt != null && this.stoppedAt < e) throw RangeError("Can't move stoppedAt forward");
		this.stoppedAt = e;
	}
	reuseFragment(e) {
		if (!this.fragments.moveTo(this.absoluteLineStart + e, this.absoluteLineStart) || !this.fragments.matches(this.block.hash)) return !1;
		let t = this.fragments.takeNodes(this);
		return t ? (this.absoluteLineStart += t, this.lineStart = vo(this.absoluteLineStart, this.ranges), this.moveRangeI(), this.absoluteLineStart < this.to ? (this.lineStart++, this.absoluteLineStart++, this.readLine()) : (this.atEnd = !0, this.readLine()), !0) : !1;
	}
	get depth() {
		return this.stack.length;
	}
	parentType(e = this.depth - 1) {
		return this.parser.nodeSet.types[this.stack[e].type];
	}
	nextLine() {
		return this.lineStart += this.line.text.length, this.absoluteLineEnd >= this.to ? (this.absoluteLineStart = this.absoluteLineEnd, this.atEnd = !0, this.readLine(), !1) : (this.lineStart++, this.absoluteLineStart = this.absoluteLineEnd + 1, this.moveRangeI(), this.readLine(), !0);
	}
	peekLine() {
		return this.scanLine(this.absoluteLineEnd + 1).text;
	}
	moveRangeI() {
		for (; this.rangeI < this.ranges.length - 1 && this.absoluteLineStart >= this.ranges[this.rangeI].to;) this.rangeI++, this.absoluteLineStart = Math.max(this.absoluteLineStart, this.ranges[this.rangeI].from);
	}
	scanLine(e) {
		let t = Ua;
		if (t.end = e, e >= this.to) t.text = "";
		else if (t.text = this.lineChunkAt(e), t.end += t.text.length, this.ranges.length > 1) {
			let e = this.absoluteLineStart, n = this.rangeI;
			for (; this.ranges[n].to < t.end;) {
				n++;
				let r = this.ranges[n].from, i = this.lineChunkAt(r);
				t.end = r + i.length, t.text = t.text.slice(0, this.ranges[n - 1].to - e) + i, e = t.end - t.text.length;
			}
		}
		return t;
	}
	readLine() {
		let { line: e } = this, { text: t, end: n } = this.scanLine(this.absoluteLineStart);
		for (this.absoluteLineEnd = n, e.reset(t); e.depth < this.stack.length; e.depth++) {
			let t = this.stack[e.depth], n = this.parser.skipContextMarkup[t.type];
			if (!n) throw Error("Unhandled block context " + Y[t.type]);
			let r = this.line.markers.length;
			if (!n(t, this, e)) {
				this.line.markers.length > r && (t.end = this.line.markers[this.line.markers.length - 1].to), e.forward();
				break;
			}
			e.forward();
		}
	}
	lineChunkAt(e) {
		let t = this.input.chunk(e), n;
		if (this.input.lineChunks) n = t == "\n" ? "" : t;
		else {
			let e = t.indexOf("\n");
			n = e < 0 ? t : t.slice(0, e);
		}
		return e + n.length > this.to ? n.slice(0, this.to - e) : n;
	}
	prevLineEnd() {
		return this.atEnd ? this.lineStart : this.lineStart - 1;
	}
	startContext(e, t, n = 0) {
		this.block = ma.create(e, n, this.lineStart + t, this.block.hash, this.lineStart + this.line.text.length), this.stack.push(this.block);
	}
	startComposite(e, t, n = 0) {
		this.startContext(this.parser.getNodeType(e), t, n);
	}
	addNode(e, t, n) {
		typeof e == "number" && (e = new _(this.parser.nodeSet.types[e], Za, Za, (n ?? this.prevLineEnd()) - t)), this.block.addChild(e, t - this.block.from);
	}
	addElement(e) {
		this.block.addChild(e.toTree(this.parser.nodeSet), e.from - this.block.from);
	}
	addLeafElement(e, t) {
		this.addNode(this.buffer.writeElements(ho(t.children, e.marks), -t.from).finish(t.type, t.to - t.from), t.from);
	}
	finishContext() {
		let e = this.stack.pop(), t = this.stack[this.stack.length - 1];
		t.addChild(e.toTree(this.parser.nodeSet), e.from - t.from), this.block = t;
	}
	finish() {
		for (; this.stack.length > 1;) this.finishContext();
		return this.addGaps(this.block.toTree(this.parser.nodeSet, this.lineStart));
	}
	addGaps(e) {
		return this.ranges.length > 1 ? Ga(this.ranges, 0, e.topNode, this.ranges[0].from, this.reusePlaceholders) : e;
	}
	finishLeaf(e) {
		for (let t of e.parsers) if (t.finish(this, e)) return;
		let t = ho(this.parser.parseInline(e.content, e.start), e.marks);
		this.addNode(this.buffer.writeElements(t, -e.start).finish(Y.Paragraph, e.content.length), e.start);
	}
	elt(e, t, n, r) {
		return typeof e == "string" ? X(this.parser.getNodeType(e), t, n, r) : new eo(e, t);
	}
	get buffer() {
		return new Qa(this.parser.nodeSet);
	}
};
function Ga(e, t, n, r, i) {
	let a = e[t].to, o = [], s = [], c = n.from + r;
	function l(n, i) {
		for (; i ? n >= a : n > a;) {
			let i = e[t + 1].from - a;
			r += i, n += i, t++, a = e[t].to;
		}
	}
	for (let u = n.firstChild; u; u = u.nextSibling) {
		l(u.from + r, !0);
		let n = u.from + r, d, f = i.get(u.tree);
		f ? d = f : u.to + r > a ? (d = Ga(e, t, u, r, i), l(u.to + r, !1)) : d = u.toTree(), o.push(d), s.push(n - c);
	}
	return l(n.to + r, !1), new _(n.type, o, s, n.to + r - c, n.tree ? n.tree.propValues : void 0);
}
var Ka = class e extends Me {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this.nodeSet = e, this.blockParsers = t, this.leafBlockParsers = n, this.blockNames = r, this.endLeafBlock = i, this.skipContextMarkup = a, this.inlineParsers = o, this.inlineNames = s, this.wrappers = c, this.nodeTypes = Object.create(null);
		for (let t of e.types) this.nodeTypes[t.name] = t.id;
	}
	createParse(e, t, n) {
		let r = new Wa(this, e, t, n);
		for (let i of this.wrappers) r = i(r, e, t, n);
		return r;
	}
	configure(t) {
		let n = Ja(t);
		if (!n) return this;
		let { nodeSet: r, skipContextMarkup: a } = this, o = this.blockParsers.slice(), s = this.leafBlockParsers.slice(), c = this.blockNames.slice(), l = this.inlineParsers.slice(), u = this.inlineNames.slice(), d = this.endLeafBlock.slice(), f = this.wrappers;
		if (qa(n.defineNodes)) {
			a = Object.assign({}, a);
			let e = r.types.slice(), t;
			for (let r of n.defineNodes) {
				let { name: n, block: i, composite: o, style: s } = typeof r == "string" ? { name: r } : r;
				if (e.some((e) => e.name == n)) continue;
				o && (a[e.length] = (e, t, n) => o(t, n, e.value));
				let c = e.length, l = o ? ["Block", "BlockContext"] : i ? c >= Y.ATXHeading1 && c <= Y.SetextHeading2 ? [
					"Block",
					"LeafBlock",
					"Heading"
				] : ["Block", "LeafBlock"] : void 0;
				e.push(m.define({
					id: c,
					name: n,
					props: l && [[O.group, l]]
				})), s && (t ||= {}, Array.isArray(s) || s instanceof Le ? t[n] = s : Object.assign(t, s));
			}
			r = new oe(e), t && (r = r.extend(i(t)));
		}
		if (qa(n.props) && (r = r.extend(...n.props)), qa(n.remove)) for (let e of n.remove) {
			let t = this.blockNames.indexOf(e), n = this.inlineNames.indexOf(e);
			t > -1 && (o[t] = s[t] = void 0), n > -1 && (l[n] = void 0);
		}
		if (qa(n.parseBlock)) for (let e of n.parseBlock) {
			let t = c.indexOf(e.name);
			if (t > -1) o[t] = e.parse, s[t] = e.leaf;
			else {
				let t = e.before ? Ya(c, e.before) : e.after ? Ya(c, e.after) + 1 : c.length - 1;
				o.splice(t, 0, e.parse), s.splice(t, 0, e.leaf), c.splice(t, 0, e.name);
			}
			e.endLeaf && d.push(e.endLeaf);
		}
		if (qa(n.parseInline)) for (let e of n.parseInline) {
			let t = u.indexOf(e.name);
			if (t > -1) l[t] = e.parse;
			else {
				let t = e.before ? Ya(u, e.before) : e.after ? Ya(u, e.after) + 1 : u.length - 1;
				l.splice(t, 0, e.parse), u.splice(t, 0, e.name);
			}
		}
		return n.wrap && (f = f.concat(n.wrap)), new e(r, o, s, c, d, a, l, u, f);
	}
	getNodeType(e) {
		let t = this.nodeTypes[e];
		if (t == null) throw RangeError(`Unknown node type '${e}'`);
		return t;
	}
	parseInline(e, t) {
		let n = new mo(this, e, t);
		outer: for (let e = t; e < n.end;) {
			let t = n.char(e);
			for (let r of this.inlineParsers) if (r) {
				let i = r(n, t, e);
				if (i >= 0) {
					e = i;
					continue outer;
				}
			}
			e++;
		}
		return n.resolveMarkers(0);
	}
};
function qa(e) {
	return e != null && e.length > 0;
}
function Ja(e) {
	if (!Array.isArray(e)) return e;
	if (e.length == 0) return null;
	let t = Ja(e[0]);
	if (e.length == 1) return t;
	let n = Ja(e.slice(1));
	if (!n || !t) return t || n;
	let r = (e, t) => (e || Za).concat(t || Za), i = t.wrap, a = n.wrap;
	return {
		props: r(t.props, n.props),
		defineNodes: r(t.defineNodes, n.defineNodes),
		parseBlock: r(t.parseBlock, n.parseBlock),
		parseInline: r(t.parseInline, n.parseInline),
		remove: r(t.remove, n.remove),
		wrap: i ? a ? (e, t, n, r) => i(a(e, t, n, r), t, n, r) : i : a
	};
}
function Ya(e, t) {
	let n = e.indexOf(t);
	if (n < 0) throw RangeError(`Position specified relative to unknown parser ${t}`);
	return n;
}
var Xa = [m.none];
for (let e = 1, t; t = Y[e]; e++) Xa[e] = m.define({
	id: e,
	name: t,
	props: e >= Y.Escape ? [] : [[O.group, e in va ? ["Block", "BlockContext"] : ["Block", "LeafBlock"]]],
	top: t == "Document"
});
var Za = [], Qa = class {
	constructor(e) {
		this.nodeSet = e, this.content = [], this.nodes = [];
	}
	write(e, t, n, r = 0) {
		return this.content.push(e, t, n, 4 + r * 4), this;
	}
	writeElements(e, t = 0) {
		for (let n of e) n.writeTo(this, t);
		return this;
	}
	finish(e, t) {
		return _.build({
			buffer: this.content,
			nodeSet: this.nodeSet,
			reused: this.nodes,
			topID: e,
			length: t
		});
	}
}, $a = class {
	constructor(e, t, n, r = Za) {
		this.type = e, this.from = t, this.to = n, this.children = r;
	}
	writeTo(e, t) {
		let n = e.content.length;
		e.writeElements(this.children, t), e.content.push(this.type, this.from + t, this.to + t, e.content.length + 4 - n);
	}
	toTree(e) {
		return new Qa(e).writeElements(this.children, -this.from).finish(this.type, this.to - this.from);
	}
}, eo = class {
	constructor(e, t) {
		this.tree = e, this.from = t;
	}
	get to() {
		return this.from + this.tree.length;
	}
	get type() {
		return this.tree.type.id;
	}
	get children() {
		return Za;
	}
	writeTo(e, t) {
		e.nodes.push(this.tree), e.content.push(e.nodes.length - 1, this.from + t, this.to + t, -1);
	}
	toTree() {
		return this.tree;
	}
};
function X(e, t, n, r) {
	return new $a(e, t, n, r);
}
var to = {
	resolve: "Emphasis",
	mark: "EmphasisMark"
}, no = {
	resolve: "Emphasis",
	mark: "EmphasisMark"
}, ro = {}, io = {}, ao = class {
	constructor(e, t, n, r) {
		this.type = e, this.from = t, this.to = n, this.side = r;
	}
}, oo = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~", so = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/;
try {
	so = /* @__PURE__ */ RegExp("[\\p{S}|\\p{P}]", "u");
} catch {}
var co = {
	Escape(e, t, n) {
		if (t != 92 || n == e.end - 1) return -1;
		let r = e.char(n + 1);
		for (let t = 0; t < 32; t++) if (oo.charCodeAt(t) == r) return e.append(X(Y.Escape, n, n + 2));
		return -1;
	},
	Entity(e, t, n) {
		if (t != 38) return -1;
		let r = /^(?:#\d+|#x[a-f\d]+|\w+);/i.exec(e.slice(n + 1, n + 31));
		return r ? e.append(X(Y.Entity, n, n + 1 + r[0].length)) : -1;
	},
	InlineCode(e, t, n) {
		if (t != 96 || n && e.char(n - 1) == 96) return -1;
		let r = n + 1;
		for (; r < e.end && e.char(r) == 96;) r++;
		let i = r - n, a = 0;
		for (; r < e.end; r++) if (e.char(r) == 96) {
			if (a++, a == i && e.char(r + 1) != 96) return e.append(X(Y.InlineCode, n, r + 1, [X(Y.CodeMark, n, n + i), X(Y.CodeMark, r + 1 - i, r + 1)]));
		} else a = 0;
		return -1;
	},
	HTMLTag(e, t, n) {
		if (t != 60 || n == e.end - 1) return -1;
		let r = e.slice(n + 1, e.end), i = /^(?:[a-z][-\w+.]+:[^\s>]+|[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*)>/i.exec(r);
		if (i) return e.append(X(Y.Autolink, n, n + 1 + i[0].length, [
			X(Y.LinkMark, n, n + 1),
			X(Y.URL, n + 1, n + i[0].length),
			X(Y.LinkMark, n + i[0].length, n + 1 + i[0].length)
		]));
		let a = /^!--[^>](?:-[^-]|[^-])*?-->/i.exec(r);
		if (a) return e.append(X(Y.Comment, n, n + 1 + a[0].length));
		let o = /^\?[^]*?\?>/.exec(r);
		if (o) return e.append(X(Y.ProcessingInstruction, n, n + 1 + o[0].length));
		let s = /^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/\s*[a-zA-Z][\w-]*\s*>|\s*[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*(\/\s*)?>)/.exec(r);
		return s ? e.append(X(Y.HTMLTag, n, n + 1 + s[0].length)) : -1;
	},
	Emphasis(e, t, n) {
		if (t != 95 && t != 42) return -1;
		let r = n + 1;
		for (; e.char(r) == t;) r++;
		let i = e.slice(n - 1, n), a = e.slice(r, r + 1), o = so.test(i), s = so.test(a), c = /\s|^$/.test(i), l = /\s|^$/.test(a), u = !l && (!s || c || o), d = !c && (!o || l || s), f = u && (t == 42 || !d || o), p = d && (t == 42 || !u || s);
		return e.append(new ao(t == 95 ? to : no, n, r, !!f | (p ? 2 : 0)));
	},
	HardBreak(e, t, n) {
		if (t == 92 && e.char(n + 1) == 10) return e.append(X(Y.HardBreak, n, n + 2));
		if (t == 32) {
			let t = n + 1;
			for (; e.char(t) == 32;) t++;
			if (e.char(t) == 10 && t >= n + 2) return e.append(X(Y.HardBreak, n, t + 1));
		}
		return -1;
	},
	Link(e, t, n) {
		return t == 91 ? e.append(new ao(ro, n, n + 1, 1)) : -1;
	},
	Image(e, t, n) {
		return t == 33 && e.char(n + 1) == 91 ? e.append(new ao(io, n, n + 2, 1)) : -1;
	},
	LinkEnd(e, t, n) {
		if (t != 93) return -1;
		for (let t = e.parts.length - 1; t >= 0; t--) {
			let r = e.parts[t];
			if (r instanceof ao && (r.type == ro || r.type == io)) {
				if (!r.side || e.skipSpace(r.to) == n && !/[(\[]/.test(e.slice(n + 1, n + 2))) return e.parts[t] = null, -1;
				let i = e.takeContent(t), a = e.parts[t] = lo(e, i, r.type == ro ? Y.Link : Y.Image, r.from, n + 1);
				if (r.type == ro) for (let n = 0; n < t; n++) {
					let t = e.parts[n];
					t instanceof ao && t.type == ro && (t.side = 0);
				}
				return a.to;
			}
		}
		return -1;
	}
};
function lo(e, t, n, r, i) {
	let { text: a } = e, o = e.char(i), s = i;
	if (t.unshift(X(Y.LinkMark, r, r + (n == Y.Image ? 2 : 1))), t.push(X(Y.LinkMark, i - 1, i)), o == 40) {
		let n = e.skipSpace(i + 1), r = uo(a, n - e.offset, e.offset), o;
		r && (n = e.skipSpace(r.to), n != r.to && (o = fo(a, n - e.offset, e.offset), o && (n = e.skipSpace(o.to)))), e.char(n) == 41 && (t.push(X(Y.LinkMark, i, i + 1)), s = n + 1, r && t.push(r), o && t.push(o), t.push(X(Y.LinkMark, n, s)));
	} else if (o == 91) {
		let n = po(a, i - e.offset, e.offset, !1);
		n && (t.push(n), s = n.to);
	}
	return X(n, r, s, t);
}
function uo(e, t, n) {
	if (e.charCodeAt(t) == 60) {
		for (let r = t + 1; r < e.length; r++) {
			let i = e.charCodeAt(r);
			if (i == 62) return X(Y.URL, t + n, r + 1 + n);
			if (i == 60 || i == 10) return !1;
		}
		return null;
	} else {
		let r = 0, i = t;
		for (let t = !1; i < e.length; i++) {
			let n = e.charCodeAt(i);
			if (ya(n)) break;
			if (t) t = !1;
			else if (n == 40) r++;
			else if (n == 41) {
				if (!r) break;
				r--;
			} else n == 92 && (t = !0);
		}
		return i > t ? X(Y.URL, t + n, i + n) : i == e.length ? null : !1;
	}
}
function fo(e, t, n) {
	let r = e.charCodeAt(t);
	if (r != 39 && r != 34 && r != 40) return !1;
	let i = r == 40 ? 41 : r;
	for (let r = t + 1, a = !1; r < e.length; r++) {
		let o = e.charCodeAt(r);
		if (a) a = !1;
		else if (o == i) return X(Y.LinkTitle, t + n, r + 1 + n);
		else o == 92 && (a = !0);
	}
	return null;
}
function po(e, t, n, r) {
	for (let i = !1, a = t + 1, o = Math.min(e.length, a + 999); a < o; a++) {
		let o = e.charCodeAt(a);
		if (i) i = !1;
		else if (o == 93) return r ? !1 : X(Y.LinkLabel, t + n, a + 1 + n);
		else {
			if (r && !ya(o) && (r = !1), o == 91) return !1;
			o == 92 && (i = !0);
		}
	}
	return null;
}
var mo = class {
	constructor(e, t, n) {
		this.parser = e, this.text = t, this.offset = n, this.parts = [];
	}
	char(e) {
		return e >= this.end ? -1 : this.text.charCodeAt(e - this.offset);
	}
	get end() {
		return this.offset + this.text.length;
	}
	slice(e, t) {
		return this.text.slice(e - this.offset, t - this.offset);
	}
	append(e) {
		return this.parts.push(e), e.to;
	}
	addDelimiter(e, t, n, r, i) {
		return this.append(new ao(e, t, n, !!r | (i ? 2 : 0)));
	}
	get hasOpenLink() {
		for (let e = this.parts.length - 1; e >= 0; e--) {
			let t = this.parts[e];
			if (t instanceof ao && (t.type == ro || t.type == io)) return !0;
		}
		return !1;
	}
	addElement(e) {
		return this.append(e);
	}
	resolveMarkers(e) {
		for (let t = e; t < this.parts.length; t++) {
			let n = this.parts[t];
			if (!(n instanceof ao && n.type.resolve && n.side & 2)) continue;
			let r = n.type == to || n.type == no, i = n.to - n.from, a, o = t - 1;
			for (; o >= e; o--) {
				let e = this.parts[o];
				if (e instanceof ao && e.side & 1 && e.type == n.type && !(r && (n.side & 1 || e.side & 2) && (e.to - e.from + i) % 3 == 0 && ((e.to - e.from) % 3 || i % 3))) {
					a = e;
					break;
				}
			}
			if (!a) continue;
			let s = n.type.resolve, c = [], l = a.from, u = n.to;
			if (r) {
				let e = Math.min(2, a.to - a.from, i);
				l = a.to - e, u = n.from + e, s = e == 1 ? "Emphasis" : "StrongEmphasis";
			}
			a.type.mark && c.push(this.elt(a.type.mark, l, a.to));
			for (let e = o + 1; e < t; e++) this.parts[e] instanceof $a && c.push(this.parts[e]), this.parts[e] = null;
			n.type.mark && c.push(this.elt(n.type.mark, n.from, u));
			let d = this.elt(s, l, u, c);
			this.parts[o] = r && a.from != l ? new ao(a.type, a.from, l, a.side) : null, (this.parts[t] = r && n.to != u ? new ao(n.type, u, n.to, n.side) : null) ? this.parts.splice(t, 0, d) : this.parts[t] = d;
		}
		let t = [];
		for (let n = e; n < this.parts.length; n++) {
			let e = this.parts[n];
			e instanceof $a && t.push(e);
		}
		return t;
	}
	findOpeningDelimiter(e) {
		for (let t = this.parts.length - 1; t >= 0; t--) {
			let n = this.parts[t];
			if (n instanceof ao && n.type == e && n.side & 1) return t;
		}
		return null;
	}
	takeContent(e) {
		let t = this.resolveMarkers(e);
		return this.parts.length = e, t;
	}
	getDelimiterAt(e) {
		let t = this.parts[e];
		return t instanceof ao ? t : null;
	}
	skipSpace(e) {
		return ba(this.text, e - this.offset) + this.offset;
	}
	elt(e, t, n, r) {
		return typeof e == "string" ? X(this.parser.getNodeType(e), t, n, r) : new eo(e, t);
	}
};
mo.linkStart = ro, mo.imageStart = io;
function ho(e, t) {
	if (!t.length) return e;
	if (!e.length) return t;
	let n = e.slice(), r = 0;
	for (let e of t) {
		for (; r < n.length && n[r].to < e.to;) r++;
		if (r < n.length && n[r].from < e.from) {
			let t = n[r];
			t instanceof $a && (n[r] = new $a(t.type, t.from, t.to, ho(t.children, [e])));
		} else n.splice(r++, 0, e);
	}
	return n;
}
var go = [
	Y.CodeBlock,
	Y.ListItem,
	Y.OrderedList,
	Y.BulletList
], _o = class {
	constructor(e, t) {
		this.fragments = e, this.input = t, this.i = 0, this.fragment = null, this.fragmentEnd = -1, this.cursor = null, e.length && (this.fragment = e[this.i++]);
	}
	nextFragment() {
		this.fragment = this.i < this.fragments.length ? this.fragments[this.i++] : null, this.cursor = null, this.fragmentEnd = -1;
	}
	moveTo(e, t) {
		for (; this.fragment && this.fragment.to <= e;) this.nextFragment();
		if (!this.fragment || this.fragment.from > (e ? e - 1 : 0)) return !1;
		if (this.fragmentEnd < 0) {
			let e = this.fragment.to;
			for (; e > 0 && this.input.read(e - 1, e) != "\n";) e--;
			this.fragmentEnd = e ? e - 1 : 0;
		}
		let n = this.cursor;
		n || (n = this.cursor = this.fragment.tree.cursor(), n.firstChild());
		let r = e + this.fragment.offset;
		for (; n.to <= r;) if (!n.parent()) return !1;
		for (;;) {
			if (n.from >= r) return this.fragment.from <= t;
			if (!n.childAfter(r)) return !1;
		}
	}
	matches(e) {
		let t = this.cursor.tree;
		return t && t.prop(O.contextHash) == e;
	}
	takeNodes(e) {
		let t = this.cursor, n = this.fragment.offset, r = this.fragmentEnd - +!!this.fragment.openEnd, i = e.absoluteLineStart, a = i, o = e.block.children.length, s = a, c = o;
		for (;;) {
			if (t.to - n > r) {
				if (t.type.isAnonymous && t.firstChild()) continue;
				break;
			}
			let i = vo(t.from - n, e.ranges);
			if (t.to - n <= e.ranges[e.rangeI].to) e.addNode(t.tree, i);
			else {
				let n = new _(e.parser.nodeSet.types[Y.Paragraph], [], [], 0, e.block.hashProp);
				e.reusePlaceholders.set(n, t.tree), e.addNode(n, i);
			}
			if (t.type.is("Block") && (go.indexOf(t.type.id) < 0 ? (a = t.to - n, o = e.block.children.length) : (a = s, o = c), s = t.to - n, c = e.block.children.length), !t.nextSibling()) break;
		}
		for (; e.block.children.length > o;) e.block.children.pop(), e.block.positions.pop();
		return a - i;
	}
};
function vo(e, t) {
	let n = e;
	for (let r = 1; r < t.length; r++) {
		let i = t[r - 1].to, a = t[r].from;
		i < e && (n -= a - i);
	}
	return n;
}
var yo = i({
	"Blockquote/...": A.quote,
	HorizontalRule: A.contentSeparator,
	"ATXHeading1/... SetextHeading1/...": A.heading1,
	"ATXHeading2/... SetextHeading2/...": A.heading2,
	"ATXHeading3/...": A.heading3,
	"ATXHeading4/...": A.heading4,
	"ATXHeading5/...": A.heading5,
	"ATXHeading6/...": A.heading6,
	"Comment CommentBlock": A.comment,
	Escape: A.escape,
	Entity: A.character,
	"Emphasis/...": A.emphasis,
	"StrongEmphasis/...": A.strong,
	"Link/... Image/...": A.link,
	"OrderedList/... BulletList/...": A.list,
	"BlockQuote/...": A.quote,
	"InlineCode CodeText": A.monospace,
	"URL Autolink": A.url,
	"HeaderMark HardBreak QuoteMark ListMark LinkMark EmphasisMark CodeMark": A.processingInstruction,
	"CodeInfo LinkLabel": A.labelName,
	LinkTitle: A.string,
	Paragraph: A.content
}), bo = new Ka(new oe(Xa).extend(yo), Object.keys(La).map((e) => La[e]), Object.keys(La).map((e) => Va[e]), Object.keys(La), Ha, va, Object.keys(co).map((e) => co[e]), Object.keys(co), []);
function xo(e, t, n) {
	let r = [];
	for (let i = e.firstChild, a = t;; i = i.nextSibling) {
		let e = i ? i.from : n;
		if (e > a && r.push({
			from: a,
			to: e
		}), !i) break;
		a = i.to;
	}
	return r;
}
function So(e) {
	let { codeParser: t, htmlParser: n } = e;
	return { wrap: ce((e, r) => {
		let i = e.type.id;
		if (t && (i == Y.CodeBlock || i == Y.FencedCode)) {
			let n = "";
			if (i == Y.FencedCode) {
				let t = e.node.getChild(Y.CodeInfo);
				t && (n = r.read(t.from, t.to));
			}
			let a = t(n);
			if (a) return {
				parser: a,
				overlay: (e) => e.type.id == Y.CodeText,
				bracketed: i == Y.FencedCode
			};
		} else if (n && (i == Y.HTMLBlock || i == Y.HTMLTag || i == Y.CommentBlock)) return {
			parser: n,
			overlay: xo(e.node, e.from, e.to)
		};
		return null;
	}) };
}
var Co = {
	resolve: "Strikethrough",
	mark: "StrikethroughMark"
}, wo = {
	defineNodes: [{
		name: "Strikethrough",
		style: { "Strikethrough/...": A.strikethrough }
	}, {
		name: "StrikethroughMark",
		style: A.processingInstruction
	}],
	parseInline: [{
		name: "Strikethrough",
		parse(e, t, n) {
			if (t != 126 || e.char(n + 1) != 126 || e.char(n + 2) == 126) return -1;
			let r = e.slice(n - 1, n), i = e.slice(n + 2, n + 3), a = /\s|^$/.test(r), o = /\s|^$/.test(i), s = so.test(r), c = so.test(i);
			return e.addDelimiter(Co, n, n + 2, !o && (!c || a || s), !a && (!s || o || c));
		},
		after: "Emphasis"
	}]
};
function To(e, t, n = 0, r, i = 0) {
	let a = 0, o = !0, s = -1, c = -1, l = !1, u = () => {
		r.push(e.elt("TableCell", i + s, i + c, e.parser.parseInline(t.slice(s, c), i + s)));
	};
	for (let d = n; d < t.length; d++) {
		let n = t.charCodeAt(d);
		n == 124 && !l ? ((!o || s > -1) && a++, o = !1, r && (s > -1 && u(), r.push(e.elt("TableDelimiter", d + i, d + i + 1))), s = c = -1) : (l || n != 32 && n != 9) && (s < 0 && (s = d), c = d + 1), l = !l && n == 92;
	}
	return s > -1 && (a++, r && u()), a;
}
function Eo(e, t) {
	for (let n = t; n < e.length; n++) {
		let t = e.charCodeAt(n);
		if (t == 124) return !0;
		t == 92 && n++;
	}
	return !1;
}
var Do = /^\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?$/, Oo = class {
	constructor() {
		this.rows = null;
	}
	nextLine(e, t, n) {
		if (this.rows == null) {
			this.rows = !1;
			let r;
			if ((t.next == 45 || t.next == 58 || t.next == 124) && Do.test(r = t.text.slice(t.pos))) {
				let i = [];
				To(e, n.content, 0, i, n.start) == To(e, r, t.pos) && (this.rows = [e.elt("TableHeader", n.start, n.start + n.content.length, i), e.elt("TableDelimiter", e.lineStart + t.pos, e.lineStart + t.text.length)]);
			}
		} else if (this.rows) {
			let n = [];
			To(e, t.text, t.pos, n, e.lineStart), this.rows.push(e.elt("TableRow", e.lineStart + t.pos, e.lineStart + t.text.length, n));
		}
		return !1;
	}
	finish(e, t) {
		return this.rows ? (e.addLeafElement(t, e.elt("Table", t.start, t.start + t.content.length, this.rows)), !0) : !1;
	}
}, ko = {
	defineNodes: [
		{
			name: "Table",
			block: !0
		},
		{
			name: "TableHeader",
			style: { "TableHeader/...": A.heading }
		},
		"TableRow",
		{
			name: "TableCell",
			style: A.content
		},
		{
			name: "TableDelimiter",
			style: A.processingInstruction
		}
	],
	parseBlock: [{
		name: "Table",
		leaf(e, t) {
			return Eo(t.content, 0) ? new Oo() : null;
		},
		endLeaf(e, t, n) {
			if (n.parsers.some((e) => e instanceof Oo) || !Eo(t.text, t.basePos)) return !1;
			let r = e.peekLine();
			return Do.test(r) && To(e, t.text, t.basePos) == To(e, r, t.basePos);
		},
		before: "SetextHeading"
	}]
}, Ao = class {
	nextLine() {
		return !1;
	}
	finish(e, t) {
		return e.addLeafElement(t, e.elt("Task", t.start, t.start + t.content.length, [e.elt("TaskMarker", t.start, t.start + 3), ...e.parser.parseInline(t.content.slice(3), t.start + 3)])), !0;
	}
}, jo = {
	defineNodes: [{
		name: "Task",
		block: !0,
		style: A.list
	}, {
		name: "TaskMarker",
		style: A.atom
	}],
	parseBlock: [{
		name: "TaskList",
		leaf(e, t) {
			return /^\[[ xX]\][ \t]/.test(t.content) && e.parentType().name == "ListItem" ? new Ao() : null;
		},
		after: "SetextHeading"
	}]
}, Mo = /(www\.)|(https?:\/\/)|([\w.+-]{1,100}@)|(mailto:|xmpp:)/gy, No = /[\w-]+(\.[\w-]+)+(\/[^\s<]*)?/gy, Po = /[\w-]+\.[\w-]+($|\/)/, Fo = /[\w.+-]+@[\w-]+(\.[\w.-]+)+/gy, Io = /\/[a-zA-Z\d@.]+/gy;
function Lo(e, t, n, r) {
	let i = 0;
	for (let a = t; a < n; a++) e[a] == r && i++;
	return i;
}
function Ro(e, t) {
	No.lastIndex = t;
	let n = No.exec(e);
	if (!n || Po.exec(n[0])[0].indexOf("_") > -1) return -1;
	let r = t + n[0].length;
	for (;;) {
		let n = e[r - 1], i;
		if (/[?!.,:*_~]/.test(n) || n == ")" && Lo(e, t, r, ")") > Lo(e, t, r, "(")) r--;
		else if (n == ";" && (i = /&(?:#\d+|#x[a-f\d]+|\w+);$/.exec(e.slice(t, r)))) r = t + i.index;
		else break;
	}
	return r;
}
function zo(e, t) {
	Fo.lastIndex = t;
	let n = Fo.exec(e);
	if (!n) return -1;
	let r = n[0][n[0].length - 1];
	return r == "_" || r == "-" ? -1 : t + n[0].length - +(r == ".");
}
var Bo = [
	ko,
	jo,
	wo,
	{ parseInline: [{
		name: "Autolink",
		parse(e, t, n) {
			let r = n - e.offset;
			if (r && /\w/.test(e.text[r - 1])) return -1;
			Mo.lastIndex = r;
			let i = Mo.exec(e.text), a = -1;
			return !i || (i[1] || i[2] ? (a = Ro(e.text, r + i[0].length), a > -1 && e.hasOpenLink && (a = r + /([^\[\]]|\[[^\]]*\])*/.exec(e.text.slice(r, a))[0].length)) : i[3] ? a = zo(e.text, r) : (a = zo(e.text, r + i[0].length), a > -1 && i[0] == "xmpp:" && (Io.lastIndex = a, i = Io.exec(e.text), i && (a = i.index + i[0].length))), a < 0) ? -1 : (e.addElement(e.elt("URL", n, a + e.offset)), a + e.offset);
		}
	}] }
];
function Vo(e, t, n) {
	return (r, i, a) => {
		if (i != e || r.char(a + 1) == e) return -1;
		let o = [r.elt(n, a, a + 1)];
		for (let i = a + 1; i < r.end; i++) {
			let s = r.char(i);
			if (s == e) return r.addElement(r.elt(t, a, i + 1, o.concat(r.elt(n, i, i + 1))));
			if (s == 92 && o.push(r.elt("Escape", i, i++ + 2)), ya(s)) break;
		}
		return -1;
	};
}
var Ho = {
	defineNodes: [{
		name: "Superscript",
		style: A.special(A.content)
	}, {
		name: "SuperscriptMark",
		style: A.processingInstruction
	}],
	parseInline: [{
		name: "Superscript",
		parse: Vo(94, "Superscript", "SuperscriptMark")
	}]
}, Uo = {
	defineNodes: [{
		name: "Subscript",
		style: A.special(A.content)
	}, {
		name: "SubscriptMark",
		style: A.processingInstruction
	}],
	parseInline: [{
		name: "Subscript",
		parse: Vo(126, "Subscript", "SubscriptMark")
	}]
}, Wo = {
	defineNodes: [{
		name: "Emoji",
		style: A.character
	}],
	parseInline: [{
		name: "Emoji",
		parse(e, t, n) {
			let r;
			return t != 58 || !(r = /^[a-zA-Z_0-9]+:/.exec(e.slice(n + 1, e.end))) ? -1 : e.addElement(e.elt("Emoji", n, n + 1 + r[0].length));
		}
	}]
}, Go = /* @__PURE__ */ e({
	commonmarkLanguage: () => es,
	deleteMarkupBackward: () => ms,
	insertNewlineContinueMarkup: () => ls,
	insertNewlineContinueMarkupCommand: () => cs,
	markdown: () => _s,
	markdownKeymap: () => hs,
	markdownLanguage: () => ts,
	pasteURLAsLink: () => Ss
}), Ko = /* @__PURE__ */ R({ commentTokens: { block: {
	open: "<!--",
	close: "-->"
} } }), qo = /* @__PURE__ */ new O(), Jo = /* @__PURE__ */ bo.configure({ props: [
	/* @__PURE__ */ u.add((e) => !e.is("Block") || e.is("Document") || Yo(e) != null || Xo(e) ? void 0 : (e, t) => ({
		from: t.doc.lineAt(e.from).to,
		to: e.to
	})),
	/* @__PURE__ */ qo.add(Yo),
	/* @__PURE__ */ n.add({ Document: () => null }),
	/* @__PURE__ */ w.add({ Document: Ko })
] });
function Yo(e) {
	let t = /^(?:ATX|Setext)Heading(\d)$/.exec(e.name);
	return t ? +t[1] : void 0;
}
function Xo(e) {
	return e.name == "OrderedList" || e.name == "BulletList";
}
function Zo(e, t) {
	let n = e;
	for (;;) {
		let e = n.nextSibling, r;
		if (!e || (r = Yo(e.type)) != null && r <= t) break;
		n = e;
	}
	return n.to;
}
var Qo = /* @__PURE__ */ c.of((e, t, n) => {
	for (let r = E(e).resolveInner(n, -1); r && !(r.from < t); r = r.parent) {
		let e = r.type.prop(qo);
		if (e == null) continue;
		let t = Zo(r, e);
		if (t > n) return {
			from: n,
			to: t
		};
	}
	return null;
});
function $o(e) {
	return new me(Ko, e, [], "markdown");
}
var es = /* @__PURE__ */ $o(Jo), ts = /* @__PURE__ */ $o(/* @__PURE__ */ Jo.configure([
	Bo,
	Uo,
	Ho,
	Wo,
	{ props: [/* @__PURE__ */ u.add({ Table: (e, t) => ({
		from: t.doc.lineAt(e.from).to,
		to: e.to
	}) })] }
]));
function ns(e, t) {
	return (n) => {
		if (n && e) {
			let t = null;
			if (n = /\S*/.exec(n)[0], t = typeof e == "function" ? e(n) : P.matchLanguageName(e, n, !0), t instanceof P) return t.support ? t.support.language.parser : ge.getSkippingParser(t.load());
			if (t) return t.parser;
		}
		return t ? t.parser : null;
	};
}
var rs = class {
	constructor(e, t, n, r, i, a, o) {
		this.node = e, this.from = t, this.to = n, this.spaceBefore = r, this.spaceAfter = i, this.type = a, this.item = o;
	}
	blank(e, t = !0) {
		let n = this.spaceBefore + (this.node.name == "Blockquote" ? ">" : "");
		if (e != null) {
			for (; n.length < e;) n += " ";
			return n;
		} else {
			for (let e = this.to - this.from - n.length - this.spaceAfter.length; e > 0; e--) n += " ";
			return n + (t ? this.spaceAfter : "");
		}
	}
	marker(e, t) {
		let n = this.node.name == "OrderedList" ? String(+as(this.item, e)[2] + t) : "";
		return this.spaceBefore + n + this.type + this.spaceAfter;
	}
};
function is(e, t) {
	let n = [], r = [];
	for (let t = e; t; t = t.parent) {
		if (t.name == "FencedCode") return r;
		(t.name == "ListItem" || t.name == "Blockquote") && n.push(t);
	}
	for (let e = n.length - 1; e >= 0; e--) {
		let i = n[e], a, o = t.lineAt(i.from), s = i.from - o.from;
		if (i.name == "Blockquote" && (a = /^ *>( ?)/.exec(o.text.slice(s)))) r.push(new rs(i, s, s + a[0].length, "", a[1], ">", null));
		else if (i.name == "ListItem" && i.parent.name == "OrderedList" && (a = /^( *)\d+([.)])( *)/.exec(o.text.slice(s)))) {
			let e = a[3], t = a[0].length;
			e.length >= 4 && (e = e.slice(0, e.length - 4), t -= 4), r.push(new rs(i.parent, s, s + t, a[1], e, a[2], i));
		} else if (i.name == "ListItem" && i.parent.name == "BulletList" && (a = /^( *)([-+*])( {1,4}\[[ xX]\])?( +)/.exec(o.text.slice(s)))) {
			let e = a[4], t = a[0].length;
			e.length > 4 && (e = e.slice(0, e.length - 4), t -= 4);
			let n = a[2];
			a[3] && (n += a[3].replace(/[xX]/, " ")), r.push(new rs(i.parent, s, s + t, a[1], e, n, i));
		}
	}
	return r;
}
function as(e, t) {
	return /^(\s*)(\d+)(?=[.)])/.exec(t.sliceString(e.from, e.from + 10));
}
function os(e, t, n, r = 0) {
	for (let i = -1, a = e;;) {
		if (a.name == "ListItem") {
			let e = as(a, t), o = +e[2];
			if (i >= 0) {
				if (o != i + 1) return;
				n.push({
					from: a.from + e[1].length,
					to: a.from + e[0].length,
					insert: String(i + 2 + r)
				});
			}
			i = o;
		}
		let e = a.nextSibling;
		if (!e) break;
		a = e;
	}
}
function ss(e, t) {
	let n = /^[ \t]*/.exec(e)[0].length;
	if (!n || t.facet(x) != "	") return e;
	let r = h(e, 4, n), i = "";
	for (let e = r; e > 0;) e >= 4 ? (i += "	", e -= 4) : (i += " ", e--);
	return i + e.slice(n);
}
var cs = (e = {}) => ({ state: t, dispatch: n }) => {
	let r = E(t), { doc: i } = t, a = null, o = t.changeByRange((n) => {
		if (!n.empty || !ts.isActiveAt(t, n.from, -1) && !ts.isActiveAt(t, n.from, 1)) return a = { range: n };
		let o = n.from, s = i.lineAt(o), c = is(r.resolveInner(o, -1), i);
		for (; c.length && c[c.length - 1].from > o - s.from;) c.pop();
		if (!c.length) return a = { range: n };
		let u = c[c.length - 1];
		if (u.to - u.spaceAfter.length > o - s.from) return a = { range: n };
		let d = o >= u.to - u.spaceAfter.length && !/\S/.test(s.text.slice(u.to));
		if (u.item && d) {
			let n = u.node.firstChild, r = u.node.getChild("ListItem", "ListItem");
			if (n.to >= o || r && r.to < o || s.from > 0 && !/[^\s>]/.test(i.lineAt(s.from - 1).text) || e.nonTightLists === !1) {
				let e = c.length > 1 ? c[c.length - 2] : null, t, n = "";
				e && e.item ? (t = s.from + e.from, n = e.marker(i, 1)) : t = s.from + (e ? e.to : 0);
				let r = [{
					from: t,
					to: o,
					insert: n
				}];
				return u.node.name == "OrderedList" && os(u.item, i, r, -2), e && e.node.name == "OrderedList" && os(e.item, i, r), {
					range: l.cursor(t + n.length),
					changes: r
				};
			} else {
				let e = fs(c, t, s);
				return {
					range: l.cursor(o + e.length + 1),
					changes: {
						from: s.from,
						insert: e + t.lineBreak
					}
				};
			}
		}
		if (u.node.name == "Blockquote" && d && s.from) {
			let e = i.lineAt(s.from - 1), r = />\s*$/.exec(e.text);
			if (r && r.index == u.from) {
				let i = t.changes([{
					from: e.from + r.index,
					to: e.to
				}, {
					from: s.from + u.from,
					to: s.to
				}]);
				return {
					range: n.map(i),
					changes: i
				};
			}
		}
		let f = [];
		u.node.name == "OrderedList" && os(u.item, i, f);
		let p = u.item && u.item.from < s.from, m = "";
		if (!p || /^[\s\d.)\-+*>]*/.exec(s.text)[0].length >= u.to) for (let e = 0, t = c.length - 1; e <= t; e++) m += e == t && !p ? c[e].marker(i, 1) : c[e].blank(e < t ? h(s.text, 4, c[e + 1].from) - m.length : null);
		let g = o;
		for (; g > s.from && /\s/.test(s.text.charAt(g - s.from - 1));) g--;
		return m = ss(m, t), ds(u.node, t.doc) && (m = fs(c, t, s) + t.lineBreak + m), f.push({
			from: g,
			to: o,
			insert: t.lineBreak + m
		}), {
			range: l.cursor(g + m.length + 1),
			changes: f
		};
	});
	return a ? !1 : (n(t.update(o, {
		scrollIntoView: !0,
		userEvent: "input"
	})), !0);
}, ls = /* @__PURE__ */ cs();
function us(e) {
	return e.name == "QuoteMark" || e.name == "ListMark";
}
function ds(e, t) {
	if (e.name != "OrderedList" && e.name != "BulletList") return !1;
	let n = e.firstChild, r = e.getChild("ListItem", "ListItem");
	if (!r) return !1;
	let i = t.lineAt(n.to), a = t.lineAt(r.from), o = /^[\s>]*$/.test(i.text);
	return i.number + +!o < a.number;
}
function fs(e, t, n) {
	let r = "";
	for (let t = 0, i = e.length - 2; t <= i; t++) r += e[t].blank(t < i ? h(n.text, 4, e[t + 1].from) - r.length : null, t < i);
	return ss(r, t);
}
function ps(e, t) {
	let n = e.resolveInner(t, -1), r = t;
	us(n) && (r = n.from, n = n.parent);
	for (let e; e = n.childBefore(r);) if (us(e)) r = e.from;
	else if (e.name == "OrderedList" || e.name == "BulletList") n = e.lastChild, r = n.to;
	else break;
	return n;
}
var ms = ({ state: e, dispatch: t }) => {
	let n = E(e), r = null, i = e.changeByRange((t) => {
		let i = t.from, { doc: a } = e;
		if (t.empty && ts.isActiveAt(e, t.from)) {
			let t = a.lineAt(i), r = is(ps(n, i), a);
			if (r.length) {
				let n = r[r.length - 1], a = n.to - n.spaceAfter.length + +!!n.spaceAfter;
				if (i - t.from > a && !/\S/.test(t.text.slice(a, i - t.from))) return {
					range: l.cursor(t.from + a),
					changes: {
						from: t.from + a,
						to: i
					}
				};
				if (i - t.from == a && (!n.item || t.from <= n.item.from || !/\S/.test(t.text.slice(0, n.to)))) {
					let r = t.from + n.from;
					if (n.item && n.node.from < n.item.from && /\S/.test(t.text.slice(n.from, n.to))) {
						let i = n.blank(h(t.text, 4, n.to) - h(t.text, 4, n.from));
						return r == t.from && (i = ss(i, e)), {
							range: l.cursor(r + i.length),
							changes: {
								from: r,
								to: t.from + n.to,
								insert: i
							}
						};
					}
					if (r < i) return {
						range: l.cursor(r),
						changes: {
							from: r,
							to: i
						}
					};
				}
			}
		}
		return r = { range: t };
	});
	return r ? !1 : (t(e.update(i, {
		scrollIntoView: !0,
		userEvent: "delete"
	})), !0);
}, hs = [{
	key: "Enter",
	run: ls
}, {
	key: "Backspace",
	run: ms
}], gs = /* @__PURE__ */ We({ matchClosingTags: !1 });
function _s(e = {}) {
	let { codeLanguages: t, defaultCodeLanguage: n, addKeymap: r = !0, base: { parser: i } = es, completeHTMLTags: a = !0, pasteURLAsLink: o = !0, htmlTagLanguage: s = gs } = e;
	if (!(i instanceof Ka)) throw RangeError("Base parser provided to `markdown` should be a Markdown parser");
	let c = e.extensions ? [e.extensions] : [], l = [s.support, Qo], u;
	o && l.push(Ss), n instanceof L ? (l.push(n.support), u = n.language) : n && (u = n);
	let d = t || u ? ns(t, u) : void 0;
	c.push(So({
		codeParser: d,
		htmlParser: s.language.parser
	})), r && l.push(Ce.high(je.of(hs)));
	let f = $o(i.configure(c));
	return a && l.push(f.data.of({ autocomplete: vs })), new L(f, l);
}
function vs(e) {
	let { state: t, pos: n } = e, r = /<[:\-\.\w\u00b7-\uffff]*$/.exec(t.sliceDoc(n - 25, n));
	if (!r) return null;
	let i = E(t).resolveInner(n, -1);
	for (; i && !i.type.isTop;) {
		if (i.name == "CodeBlock" || i.name == "FencedCode" || i.name == "ProcessingInstructionBlock" || i.name == "CommentBlock" || i.name == "Link" || i.name == "Image") return null;
		i = i.parent;
	}
	return {
		from: n - r[0].length,
		to: n,
		options: bs(),
		validFor: /^<[:\-\.\w\u00b7-\uffff]*$/
	};
}
var ys = null;
function bs() {
	if (ys) return ys;
	let e = Ge(new Ue(C.create({ extensions: gs }), 0, !0));
	return ys = e ? e.options : [];
}
var xs = /code|horizontalrule|html|link|comment|processing|escape|entity|image|mark|url/i, Ss = /* @__PURE__ */ T.domEventHandlers({ paste: (e, t) => {
	let { main: n } = t.state.selection;
	if (n.empty) return !1;
	let r = e.clipboardData?.getData("text/plain");
	if (!r || !/^(https?:\/\/|mailto:|xmpp:|www\.)/.test(r) || (/^www\./.test(r) && (r = "https://" + r), !ts.isActiveAt(t.state, n.from, 1))) return !1;
	let i = E(t.state), a = !1;
	return i.iterate({
		from: n.from,
		to: n.to,
		enter: (e) => {
			(e.from > n.from || xs.test(e.name)) && (a = !0);
		},
		leave: (e) => {
			e.to < n.to && (a = !0);
		}
	}), a ? !1 : (t.dispatch({
		changes: [{
			from: n.from,
			insert: "["
		}, {
			from: n.to,
			insert: `](${r})`
		}],
		userEvent: "input.paste",
		scrollIntoView: !0
	}), !0);
} });
//#endregion
//#region node_modules/@codemirror/language-data/dist/index.js
function Z(e) {
	return new L(ve.define(e));
}
function Cs(e) {
	return import("./dist-1bV2aa3m.js").then((t) => t.sql({ dialect: t[e] }));
}
var ws = [
	/* @__PURE__ */ P.of({
		name: "C",
		extensions: [
			"c",
			"h",
			"ino"
		],
		load() {
			return import("./dist-CTc-0JNc.js").then((e) => e.cpp());
		}
	}),
	/* @__PURE__ */ P.of({
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
			return import("./dist-CTc-0JNc.js").then((e) => e.cpp());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "CQL",
		alias: ["cassandra"],
		extensions: ["cql"],
		load() {
			return Cs("Cassandra");
		}
	}),
	/* @__PURE__ */ P.of({
		name: "CSS",
		extensions: ["css"],
		load() {
			return import("./dist-OwXP4Aeu.js").then((e) => e.i).then((e) => e.css());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Go",
		extensions: ["go"],
		load() {
			return import("./dist-D9J0UEkS.js").then((e) => e.go());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "HTML",
		alias: ["xhtml"],
		extensions: [
			"html",
			"htm",
			"handlebars",
			"hbs"
		],
		load() {
			return import("./dist-DjI0KX1F.js").then((e) => e.t).then((e) => e.html());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Java",
		extensions: ["java"],
		load() {
			return import("./dist-BReE0ufc.js").then((e) => e.java());
		}
	}),
	/* @__PURE__ */ P.of({
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
			return import("./dist-9mBnHYqk.js").then((e) => e.t).then((e) => e.javascript());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Jinja",
		extensions: [
			"j2",
			"jinja",
			"jinja2"
		],
		load() {
			return import("./dist-KZOCyihY.js").then((e) => e.jinja());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "JSON",
		alias: ["json5"],
		extensions: ["json", "map"],
		load() {
			return import("./dist-CVP1Dace.js").then((e) => e.json());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "JSX",
		extensions: ["jsx"],
		load() {
			return import("./dist-9mBnHYqk.js").then((e) => e.t).then((e) => e.javascript({ jsx: !0 }));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "LESS",
		extensions: ["less"],
		load() {
			return import("./dist-DyrE8SkY.js").then((e) => e.less());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Liquid",
		extensions: ["liquid"],
		load() {
			return import("./dist-DG-OWzll.js").then((e) => e.liquid());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "MariaDB SQL",
		load() {
			return Cs("MariaSQL");
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Markdown",
		extensions: [
			"md",
			"markdown",
			"mkd"
		],
		load() {
			return Promise.resolve().then(() => Go).then((e) => e.markdown());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "MS SQL",
		load() {
			return Cs("MSSQL");
		}
	}),
	/* @__PURE__ */ P.of({
		name: "MySQL",
		load() {
			return Cs("MySQL");
		}
	}),
	/* @__PURE__ */ P.of({
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
			return import("./dist-DyXX9r5A.js").then((e) => e.php());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "PLSQL",
		extensions: ["pls"],
		load() {
			return Cs("PLSQL");
		}
	}),
	/* @__PURE__ */ P.of({
		name: "PostgreSQL",
		load() {
			return Cs("PostgreSQL");
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Python",
		extensions: [
			"BUILD",
			"bzl",
			"py",
			"pyw"
		],
		filename: /^(BUCK|BUILD)$/,
		load() {
			return import("./dist-DFl3pJTh.js").then((e) => e.python());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Rust",
		extensions: ["rs"],
		load() {
			return import("./dist-ifYb7LjA.js").then((e) => e.rust());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Sass",
		extensions: ["sass"],
		load() {
			return import("./dist-CMFRu0K-.js").then((e) => e.sass({ indented: !0 }));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "SCSS",
		extensions: ["scss"],
		load() {
			return import("./dist-CMFRu0K-.js").then((e) => e.sass());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "SQL",
		extensions: ["sql"],
		load() {
			return Cs("StandardSQL");
		}
	}),
	/* @__PURE__ */ P.of({
		name: "SQLite",
		load() {
			return Cs("SQLite");
		}
	}),
	/* @__PURE__ */ P.of({
		name: "TSX",
		extensions: ["tsx"],
		load() {
			return import("./dist-9mBnHYqk.js").then((e) => e.t).then((e) => e.javascript({
				jsx: !0,
				typescript: !0
			}));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "TypeScript",
		alias: ["ts"],
		extensions: [
			"ts",
			"mts",
			"cts"
		],
		load() {
			return import("./dist-9mBnHYqk.js").then((e) => e.t).then((e) => e.javascript({ typescript: !0 }));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "WebAssembly",
		extensions: ["wat", "wast"],
		load() {
			return import("./dist-iNOiQ2RR.js").then((e) => e.wast());
		}
	}),
	/* @__PURE__ */ P.of({
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
			return import("./dist-PRY4xFOJ.js").then((e) => e.xml());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "YAML",
		alias: ["yml"],
		extensions: ["yaml", "yml"],
		load() {
			return import("./dist-DTCqNkLI.js").then((e) => e.yaml());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "APL",
		extensions: ["dyalog", "apl"],
		load() {
			return import("./apl-CV6eBKLj.js").then((e) => Z(e.apl));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "PGP",
		alias: ["asciiarmor"],
		extensions: [
			"asc",
			"pgp",
			"sig"
		],
		load() {
			return import("./asciiarmor-DbteC7tD.js").then((e) => Z(e.asciiArmor));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "ASN.1",
		extensions: ["asn", "asn1"],
		load() {
			return import("./asn1-DibYTi7G.js").then((e) => Z(e.asn1({})));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Asterisk",
		filename: /^extensions\.conf$/i,
		load() {
			return import("./asterisk-Bxn6UXTI.js").then((e) => Z(e.asterisk));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Brainfuck",
		extensions: ["b", "bf"],
		load() {
			return import("./brainfuck-lm4BpXQT.js").then((e) => Z(e.brainfuck));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Cobol",
		extensions: ["cob", "cpy"],
		load() {
			return import("./cobol-BD9gtADG.js").then((e) => Z(e.cobol));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "C#",
		alias: ["csharp", "cs"],
		extensions: ["cs"],
		load() {
			return import("./clike-BQDf0gbC.js").then((e) => Z(e.csharp));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Clojure",
		extensions: [
			"clj",
			"cljc",
			"cljx"
		],
		load() {
			return import("./clojure-D9uYfCVP.js").then((e) => Z(e.clojure));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "ClojureScript",
		extensions: ["cljs"],
		load() {
			return import("./clojure-D9uYfCVP.js").then((e) => Z(e.clojure));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Closure Stylesheets (GSS)",
		extensions: ["gss"],
		load() {
			return import("./css-BQWeBXmt.js").then((e) => Z(e.gss));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "CMake",
		extensions: ["cmake", "cmake.in"],
		filename: /^CMakeLists\.txt$/,
		load() {
			return import("./cmake-Dg8wFv3P.js").then((e) => Z(e.cmake));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "CoffeeScript",
		alias: ["coffee", "coffee-script"],
		extensions: ["coffee"],
		load() {
			return import("./coffeescript-BoWlfF5W.js").then((e) => Z(e.coffeeScript));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Common Lisp",
		alias: ["lisp"],
		extensions: [
			"cl",
			"lisp",
			"el"
		],
		load() {
			return import("./commonlisp-DXb5JKP4.js").then((e) => Z(e.commonLisp));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Cypher",
		extensions: ["cyp", "cypher"],
		load() {
			return import("./cypher-BW60-ri4.js").then((e) => Z(e.cypher));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Cython",
		extensions: [
			"pyx",
			"pxd",
			"pxi"
		],
		load() {
			return import("./python-C2-y2SY5.js").then((e) => Z(e.cython));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Crystal",
		extensions: ["cr"],
		load() {
			return import("./crystal-DuYzN9x3.js").then((e) => Z(e.crystal));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "D",
		extensions: ["d"],
		load() {
			return import("./d-C0q6d_5Y.js").then((e) => Z(e.d));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Dart",
		extensions: ["dart"],
		load() {
			return import("./clike-BQDf0gbC.js").then((e) => Z(e.dart));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "diff",
		extensions: ["diff", "patch"],
		load() {
			return import("./diff-DDml1c90.js").then((e) => Z(e.diff));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Dockerfile",
		filename: /^Dockerfile$/,
		load() {
			return import("./dockerfile-CJ7z7SOp.js").then((e) => Z(e.dockerFile));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "DTD",
		extensions: ["dtd"],
		load() {
			return import("./dtd-BeFB66od.js").then((e) => Z(e.dtd));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Dylan",
		extensions: [
			"dylan",
			"dyl",
			"intr"
		],
		load() {
			return import("./dylan-C-3uiUIB.js").then((e) => Z(e.dylan));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "EBNF",
		load() {
			return import("./ebnf-CWyol0yz.js").then((e) => Z(e.ebnf));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "ECL",
		extensions: ["ecl"],
		load() {
			return import("./ecl-jpLZv7aS.js").then((e) => Z(e.ecl));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "edn",
		extensions: ["edn"],
		load() {
			return import("./clojure-D9uYfCVP.js").then((e) => Z(e.clojure));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Eiffel",
		extensions: ["e"],
		load() {
			return import("./eiffel-hv3EEqzZ.js").then((e) => Z(e.eiffel));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Elm",
		extensions: ["elm"],
		load() {
			return import("./elm-CT9utmH9.js").then((e) => Z(e.elm));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Erlang",
		extensions: ["erl"],
		load() {
			return import("./erlang-HHNJwBor.js").then((e) => Z(e.erlang));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Esper",
		load() {
			return import("./sql-3cIBsSNG.js").then((e) => Z(e.esper));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Factor",
		extensions: ["factor"],
		load() {
			return import("./factor-BAX83gB_.js").then((e) => Z(e.factor));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "FCL",
		load() {
			return import("./fcl-BYuIpqDP.js").then((e) => Z(e.fcl));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Forth",
		extensions: [
			"forth",
			"fth",
			"4th"
		],
		load() {
			return import("./forth-CF2hbYa1.js").then((e) => Z(e.forth));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Fortran",
		extensions: [
			"f",
			"for",
			"f77",
			"f90",
			"f95"
		],
		load() {
			return import("./fortran-LJ1SLl7q.js").then((e) => Z(e.fortran));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "F#",
		alias: ["fsharp"],
		extensions: ["fs"],
		load() {
			return import("./mllike-CuP49gNE.js").then((e) => Z(e.fSharp));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Gas",
		extensions: ["s"],
		load() {
			return import("./gas-DV9Dcz3h.js").then((e) => Z(e.gas));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Gherkin",
		extensions: ["feature"],
		load() {
			return import("./gherkin-BRvFCLlm.js").then((e) => Z(e.gherkin));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Groovy",
		extensions: ["groovy", "gradle"],
		filename: /^Jenkinsfile$/,
		load() {
			return import("./groovy-B8QvAaK1.js").then((e) => Z(e.groovy));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Haskell",
		extensions: ["hs"],
		load() {
			return import("./haskell-D68UT879.js").then((e) => Z(e.haskell));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Haxe",
		extensions: ["hx"],
		load() {
			return import("./haxe-C1Ke4V1M.js").then((e) => Z(e.haxe));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "HXML",
		extensions: ["hxml"],
		load() {
			return import("./haxe-C1Ke4V1M.js").then((e) => Z(e.hxml));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "HTTP",
		load() {
			return import("./http-Cc_B2k6T.js").then((e) => Z(e.http));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "IDL",
		extensions: ["pro"],
		load() {
			return import("./idl-CQz7Swwd.js").then((e) => Z(e.idl));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "JSON-LD",
		alias: ["jsonld"],
		extensions: ["jsonld"],
		load() {
			return import("./javascript-BXLN1dMS.js").then((e) => Z(e.jsonld));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Julia",
		extensions: ["jl"],
		load() {
			return import("./julia-DxU7bNNF.js").then((e) => Z(e.julia));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Kotlin",
		extensions: ["kt", "kts"],
		load() {
			return import("./clike-BQDf0gbC.js").then((e) => Z(e.kotlin));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "LiveScript",
		alias: ["ls"],
		extensions: ["ls"],
		load() {
			return import("./livescript-CUXucnZu.js").then((e) => Z(e.liveScript));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Lua",
		extensions: ["lua"],
		load() {
			return import("./lua-CXKbZXEr.js").then((e) => Z(e.lua));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "mIRC",
		extensions: ["mrc"],
		load() {
			return import("./mirc-RLmK6mzY.js").then((e) => Z(e.mirc));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Mathematica",
		extensions: [
			"m",
			"nb",
			"wl",
			"wls"
		],
		load() {
			return import("./mathematica-9S8qXTAX.js").then((e) => Z(e.mathematica));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Modelica",
		extensions: ["mo"],
		load() {
			return import("./modelica-C42lTy2Y.js").then((e) => Z(e.modelica));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "MUMPS",
		extensions: ["mps"],
		load() {
			return import("./mumps-CSAk_T0d.js").then((e) => Z(e.mumps));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Mbox",
		extensions: ["mbox"],
		load() {
			return import("./mbox-B9BUrPcY.js").then((e) => Z(e.mbox));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Nginx",
		filename: /nginx.*\.conf$/i,
		load() {
			return import("./nginx-DUP57iSQ.js").then((e) => Z(e.nginx));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "NSIS",
		extensions: ["nsh", "nsi"],
		load() {
			return import("./nsis-BjywV0DW.js").then((e) => Z(e.nsis));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "NTriples",
		extensions: ["nt", "nq"],
		load() {
			return import("./ntriples-DJanlB2r.js").then((e) => Z(e.ntriples));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Objective-C",
		alias: ["objective-c", "objc"],
		extensions: ["m"],
		load() {
			return import("./clike-BQDf0gbC.js").then((e) => Z(e.objectiveC));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Objective-C++",
		alias: ["objective-c++", "objc++"],
		extensions: ["mm"],
		load() {
			return import("./clike-BQDf0gbC.js").then((e) => Z(e.objectiveCpp));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "OCaml",
		extensions: [
			"ml",
			"mli",
			"mll",
			"mly"
		],
		load() {
			return import("./mllike-CuP49gNE.js").then((e) => Z(e.oCaml));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Octave",
		extensions: ["m"],
		load() {
			return import("./octave-D0GJG_l2.js").then((e) => Z(e.octave));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Oz",
		extensions: ["oz"],
		load() {
			return import("./oz-BpXMqSV8.js").then((e) => Z(e.oz));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Pascal",
		extensions: ["p", "pas"],
		load() {
			return import("./pascal-Crp-T9Zt.js").then((e) => Z(e.pascal));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Perl",
		extensions: ["pl", "pm"],
		load() {
			return import("./perl-B7vqqAqX.js").then((e) => Z(e.perl));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Pig",
		extensions: ["pig"],
		load() {
			return import("./pig-CFRjgX9A.js").then((e) => Z(e.pig));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "PowerShell",
		extensions: [
			"ps1",
			"psd1",
			"psm1"
		],
		load() {
			return import("./powershell-CMi1r39u.js").then((e) => Z(e.powerShell));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Properties files",
		alias: ["ini", "properties"],
		extensions: [
			"properties",
			"ini",
			"in"
		],
		load() {
			return import("./properties-CYGPwUh9.js").then((e) => Z(e.properties));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "ProtoBuf",
		extensions: ["proto"],
		load() {
			return import("./protobuf-BtVohQAh.js").then((e) => Z(e.protobuf));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Pug",
		alias: ["jade"],
		extensions: ["pug", "jade"],
		load() {
			return import("./pug-DJfwVnvo.js").then((e) => Z(e.pug));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Puppet",
		extensions: ["pp"],
		load() {
			return import("./puppet-pyi7gdbN.js").then((e) => Z(e.puppet));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Q",
		extensions: ["q"],
		load() {
			return import("./q-B3vByUOp.js").then((e) => Z(e.q));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "R",
		alias: ["rscript"],
		extensions: ["r", "R"],
		load() {
			return import("./r-Cy0gFR1U.js").then((e) => Z(e.r));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "RPM Changes",
		load() {
			return import("./rpm-_GxzLaz-.js").then((e) => Z(e.rpmChanges));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "RPM Spec",
		extensions: ["spec"],
		load() {
			return import("./rpm-_GxzLaz-.js").then((e) => Z(e.rpmSpec));
		}
	}),
	/* @__PURE__ */ P.of({
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
			return import("./ruby-CkvgvAji.js").then((e) => Z(e.ruby));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "SAS",
		extensions: ["sas"],
		load() {
			return import("./sas-y7gVjwir.js").then((e) => Z(e.sas));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Scala",
		extensions: ["scala"],
		load() {
			return import("./clike-BQDf0gbC.js").then((e) => Z(e.scala));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Scheme",
		extensions: ["scm", "ss"],
		load() {
			return import("./scheme-B_A8HZXG.js").then((e) => Z(e.scheme));
		}
	}),
	/* @__PURE__ */ P.of({
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
			return import("./shell-COb1weP5.js").then((e) => Z(e.shell));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Sieve",
		extensions: ["siv", "sieve"],
		load() {
			return import("./sieve--Gp_8McL.js").then((e) => Z(e.sieve));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Smalltalk",
		extensions: ["st"],
		load() {
			return import("./smalltalk-CeUQZ-vC.js").then((e) => Z(e.smalltalk));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Solr",
		load() {
			return import("./solr-Btb7qNjM.js").then((e) => Z(e.solr));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "SML",
		extensions: [
			"sml",
			"sig",
			"fun",
			"smackspec"
		],
		load() {
			return import("./mllike-CuP49gNE.js").then((e) => Z(e.sml));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "SPARQL",
		alias: ["sparul"],
		extensions: ["rq", "sparql"],
		load() {
			return import("./sparql-4ogoOKKn.js").then((e) => Z(e.sparql));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Spreadsheet",
		alias: ["excel", "formula"],
		load() {
			return import("./spreadsheet-DZF_3zkJ.js").then((e) => Z(e.spreadsheet));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Squirrel",
		extensions: ["nut"],
		load() {
			return import("./clike-BQDf0gbC.js").then((e) => Z(e.squirrel));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Stylus",
		extensions: ["styl"],
		load() {
			return import("./stylus-Dn5mRARQ.js").then((e) => Z(e.stylus));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Swift",
		extensions: ["swift"],
		load() {
			return import("./swift-D6Aje7xD.js").then((e) => Z(e.swift));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "sTeX",
		load() {
			return import("./stex-8Uaksf4i.js").then((e) => Z(e.stex));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "LaTeX",
		alias: ["tex"],
		extensions: [
			"text",
			"ltx",
			"tex"
		],
		load() {
			return import("./stex-8Uaksf4i.js").then((e) => Z(e.stex));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "SystemVerilog",
		extensions: [
			"v",
			"sv",
			"svh"
		],
		load() {
			return import("./verilog-CAPDpcFC.js").then((e) => Z(e.verilog));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Tcl",
		extensions: ["tcl"],
		load() {
			return import("./tcl-A92p9aRx.js").then((e) => Z(e.tcl));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Textile",
		extensions: ["textile"],
		load() {
			return import("./textile-sc6Midk1.js").then((e) => Z(e.textile));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "TiddlyWiki",
		load() {
			return import("./tiddlywiki-C91zthtA.js").then((e) => Z(e.tiddlyWiki));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Tiki wiki",
		load() {
			return import("./tiki-KeYJ3fE8.js").then((e) => Z(e.tiki));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "TOML",
		extensions: ["toml"],
		load() {
			return import("./toml-C7tXKGzm.js").then((e) => Z(e.toml));
		}
	}),
	/* @__PURE__ */ P.of({
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
			return import("./troff-D_RUQsS2.js").then((e) => Z(e.troff));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "TTCN",
		extensions: [
			"ttcn",
			"ttcn3",
			"ttcnpp"
		],
		load() {
			return import("./ttcn-D8Azr9t3.js").then((e) => Z(e.ttcn));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "TTCN_CFG",
		extensions: ["cfg"],
		load() {
			return import("./ttcn-cfg-Dgvx7Sdi.js").then((e) => Z(e.ttcnCfg));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Turtle",
		extensions: ["ttl"],
		load() {
			return import("./turtle-vdIZyhVy.js").then((e) => Z(e.turtle));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Web IDL",
		extensions: ["webidl"],
		load() {
			return import("./webidl-DDl5OUBH.js").then((e) => Z(e.webIDL));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "VB.NET",
		extensions: ["vb"],
		load() {
			return import("./vb-BT4InImt.js").then((e) => Z(e.vb));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "VBScript",
		extensions: ["vbs"],
		load() {
			return import("./vbscript-DZZYr3Hu.js").then((e) => Z(e.vbScript));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Velocity",
		extensions: ["vtl"],
		load() {
			return import("./velocity-DHZtzyuC.js").then((e) => Z(e.velocity));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Verilog",
		extensions: ["v"],
		load() {
			return import("./verilog-CAPDpcFC.js").then((e) => Z(e.verilog));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "VHDL",
		extensions: ["vhd", "vhdl"],
		load() {
			return import("./vhdl-CFW_iYNI.js").then((e) => Z(e.vhdl));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "XQuery",
		extensions: [
			"xy",
			"xquery",
			"xq",
			"xqm",
			"xqy"
		],
		load() {
			return import("./xquery-hpRT2Dww.js").then((e) => Z(e.xQuery));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Yacas",
		extensions: ["ys"],
		load() {
			return import("./yacas-whoxMgik.js").then((e) => Z(e.yacas));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Z80",
		extensions: ["z80"],
		load() {
			return import("./z80-DC65NJMu.js").then((e) => Z(e.z80));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "MscGen",
		extensions: [
			"mscgen",
			"mscin",
			"msc"
		],
		load() {
			return import("./mscgen-B0d4g41-.js").then((e) => Z(e.mscgen));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Xù",
		extensions: ["xu"],
		load() {
			return import("./mscgen-B0d4g41-.js").then((e) => Z(e.xu));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "MsGenny",
		extensions: ["msgenny"],
		load() {
			return import("./mscgen-B0d4g41-.js").then((e) => Z(e.msgenny));
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Vue",
		extensions: ["vue"],
		load() {
			return import("./dist-Dj_3pQ8M.js").then((e) => e.vue());
		}
	}),
	/* @__PURE__ */ P.of({
		name: "Angular Template",
		load() {
			return import("./dist-XsXHQzIT.js").then((e) => e.angular());
		}
	})
], Ts = class {
	constructor(e, t, n) {
		this.from = e, this.to = t, this.diagnostic = n;
	}
}, Es = class e {
	constructor(e, t, n) {
		this.diagnostics = e, this.panel = t, this.selected = n;
	}
	static init(t, n, r) {
		let i = r.facet(Bs).markerFilter;
		i && (t = i(t, r));
		let a = t.slice().sort((e, t) => e.from - t.from || e.to - t.to), o = new ee(), s = [], c = 0, l = r.doc.iter(), u = 0, d = r.doc.length;
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
			let f = Zs(s);
			if (i) o.add(n, n, j.widget({
				widget: new Ws(f),
				diagnostics: s.slice()
			}));
			else {
				let e = s.reduce((e, t) => t.markClass ? e + " " + t.markClass : e, "");
				o.add(n, r, j.mark({
					class: "cm-lintRange cm-lintRange-" + f + e,
					diagnostics: s.slice(),
					inclusiveEnd: s.some((e) => e.to > r)
				}));
			}
			if (c = r, c == d) break;
			for (let e = 0; e < s.length; e++) s[e].to <= c && s.splice(e--, 1);
		}
		let f = o.finish();
		return new e(f, n, Ds(f));
	}
};
function Ds(e, t = null, n = 0) {
	let r = null;
	return e.between(n, 1e9, (e, n, { spec: i }) => {
		if (!(t && i.diagnostics.indexOf(t) < 0)) if (!r) r = new Ts(e, n, t || i.diagnostics[0]);
		else if (i.diagnostics.indexOf(r.diagnostic) < 0) return !1;
		else r = new Ts(r.from, n, r.diagnostic);
	}), r;
}
function Os(e, t) {
	let n = t.pos, r = t.end || n, i = e.state.facet(Bs).hideOn(e, n, r);
	if (i != null) return i;
	let a = e.startState.doc.lineAt(t.pos);
	return !!(e.effects.some((e) => e.is(As)) || e.changes.touchesRange(a.from, Math.max(a.to, r)));
}
function ks(e, t) {
	return e.field(Ns, !1) ? t : t.concat(p.appendConfig.of($s));
}
var As = /* @__PURE__ */ p.define(), js = /* @__PURE__ */ p.define(), Ms = /* @__PURE__ */ p.define(), Ns = /* @__PURE__ */ g.define({
	create() {
		return new Es(j.none, null, null);
	},
	update(e, t) {
		if (t.docChanged && e.diagnostics.size) {
			let n = e.diagnostics.map(t.changes), r = null, i = e.panel;
			if (e.selected) {
				let i = t.changes.mapPos(e.selected.from, 1);
				r = Ds(n, e.selected.diagnostic, i) || Ds(n, null, i);
			}
			!n.size && i && t.state.facet(Bs).autoPanel && (i = null), e = new Es(n, i, r);
		}
		for (let n of t.effects) if (n.is(As)) {
			let r = t.state.facet(Bs).autoPanel ? n.value.length ? Ks.open : null : e.panel;
			e = Es.init(n.value, r, t.state);
		} else n.is(js) ? e = new Es(e.diagnostics, n.value ? Ks.open : null, e.selected) : n.is(Ms) && (e = new Es(e.diagnostics, e.panel, n.value));
		return e;
	},
	provide: (e) => [V.from(e, (e) => e.panel), T.decorations.from(e, (e) => e.diagnostics)]
}), Ps = /* @__PURE__ */ j.mark({ class: "cm-lintRange cm-lintRange-active" });
function Fs(e, t, n) {
	let { diagnostics: r } = e.state.field(Ns), i, a = -1, o = -1;
	r.between(t - +(n < 0), t + +(n > 0), (e, r, { spec: s }) => {
		if (t >= e && t <= r && (e == r || (t > e || n > 0) && (t < r || n < 0))) return i = s.diagnostics, a = e, o = r, !1;
	});
	let s = e.state.facet(Bs).tooltipFilter;
	return i && s && (i = s(i, e.state)), i ? {
		pos: a,
		end: o,
		above: e.state.doc.lineAt(a).to < o,
		create() {
			return { dom: Is(e, i) };
		}
	} : null;
}
function Is(e, t) {
	return B("ul", { class: "cm-tooltip-lint" }, t.map((t) => Us(e, t, !1)));
}
var Ls = (e) => {
	let t = e.state.field(Ns, !1);
	(!t || !t.panel) && e.dispatch({ effects: ks(e.state, [js.of(!0)]) });
	let n = Ae(e, Ks.open);
	return n && n.dom.querySelector(".cm-panel-lint ul").focus(), !0;
}, Rs = (e) => {
	let t = e.state.field(Ns, !1);
	return !t || !t.panel ? !1 : (e.dispatch({ effects: js.of(!1) }), !0);
}, zs = [{
	key: "Mod-Shift-m",
	run: Ls,
	preventDefault: !0
}, {
	key: "F8",
	run: (e) => {
		let t = e.state.field(Ns, !1);
		if (!t) return !1;
		let n = e.state.selection.main, r = Ds(t.diagnostics, null, n.to + 1);
		return !r && (r = Ds(t.diagnostics, null, 0), !r || r.from == n.from && r.to == n.to) ? !1 : (e.dispatch({
			selection: {
				anchor: r.from,
				head: r.to
			},
			scrollIntoView: !0
		}), Pe(e, r.from, 1, {
			tooltip: Qs,
			until: (e) => e.docChanged || e.newSelection.main.head < r.from || e.newSelection.main.head > r.to
		}), !0);
	}
}], Bs = /* @__PURE__ */ Te.define({ combine(e) {
	return {
		sources: e.map((e) => e.source).filter((e) => e != null),
		...ae(e.map((e) => e.config), {
			delay: 750,
			markerFilter: null,
			tooltipFilter: null,
			needsRefresh: null,
			hideOn: () => null
		}, {
			delay: Math.max,
			markerFilter: Vs,
			tooltipFilter: Vs,
			needsRefresh: (e, t) => e ? t ? (n) => e(n) || t(n) : e : t,
			hideOn: (e, t) => e ? t ? (n, r, i) => e(n, r, i) || t(n, r, i) : e : t,
			autoPanel: (e, t) => e || t
		})
	};
} });
function Vs(e, t) {
	return e ? t ? (n, r) => t(e(n, r), r) : e : t;
}
function Hs(e) {
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
function Us(e, t, n) {
	let r = n ? Hs(t.actions) : [];
	return B("li", { class: "cm-diagnostic cm-diagnostic-" + t.severity }, B("span", { class: "cm-diagnosticText" }, t.renderMessage ? t.renderMessage(e) : t.message), t.actions?.map((n, i) => {
		let a = !1, o = (r) => {
			if (r.preventDefault(), a) return;
			a = !0;
			let i = Ds(e.state.field(Ns).diagnostics, t);
			i && n.apply(e, i.from, i.to);
		}, { name: s } = n, c = r[i] ? s.indexOf(r[i]) : -1, l = c < 0 ? s : [
			s.slice(0, c),
			B("u", s.slice(c, c + 1)),
			s.slice(c + 1)
		];
		return B("button", {
			type: "button",
			class: "cm-diagnosticAction" + (n.markClass ? " " + n.markClass : ""),
			onclick: o,
			onmousedown: o,
			"aria-label": ` Action: ${s}${c < 0 ? "" : ` (access key "${r[i]})"`}.`
		}, l);
	}), t.source && B("div", { class: "cm-diagnosticSource" }, t.source));
}
var Ws = class extends N {
	constructor(e) {
		super(), this.sev = e;
	}
	eq(e) {
		return e.sev == this.sev;
	}
	toDOM() {
		return B("span", { class: "cm-lintPoint cm-lintPoint-" + this.sev });
	}
}, Gs = class {
	constructor(e, t) {
		this.diagnostic = t, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = Us(e, t, !0), this.dom.id = this.id, this.dom.setAttribute("role", "option");
	}
}, Ks = class e {
	constructor(e) {
		this.view = e, this.items = [];
		let t = (t) => {
			if (!(t.ctrlKey || t.altKey || t.metaKey)) {
				if (t.keyCode == 27) Rs(this.view), this.view.focus();
				else if (t.keyCode == 38 || t.keyCode == 33) this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
				else if (t.keyCode == 40 || t.keyCode == 34) this.moveSelection((this.selectedIndex + 1) % this.items.length);
				else if (t.keyCode == 36) this.moveSelection(0);
				else if (t.keyCode == 35) this.moveSelection(this.items.length - 1);
				else if (t.keyCode == 13) this.view.focus();
				else if (t.keyCode >= 65 && t.keyCode <= 90 && this.selectedIndex >= 0) {
					let { diagnostic: n } = this.items[this.selectedIndex], r = Hs(n.actions);
					for (let i = 0; i < r.length; i++) if (r[i].toUpperCase().charCodeAt(0) == t.keyCode) {
						let t = Ds(this.view.state.field(Ns).diagnostics, n);
						t && n.actions[i].apply(e, t.from, t.to);
					}
				} else return;
				t.preventDefault();
			}
		}, n = (e) => {
			for (let t = 0; t < this.items.length; t++) this.items[t].dom.contains(e.target) && this.moveSelection(t);
		};
		this.list = B("ul", {
			tabIndex: 0,
			role: "listbox",
			"aria-label": this.view.state.phrase("Diagnostics"),
			onkeydown: t,
			onclick: n
		}), this.dom = B("div", { class: "cm-panel-lint" }, this.list, B("button", {
			type: "button",
			name: "close",
			"aria-label": this.view.state.phrase("close"),
			onclick: () => Rs(this.view)
		}, "×")), this.update();
	}
	get selectedIndex() {
		let e = this.view.state.field(Ns).selected;
		if (!e) return -1;
		for (let t = 0; t < this.items.length; t++) if (this.items[t].diagnostic == e.diagnostic) return t;
		return -1;
	}
	update() {
		let { diagnostics: e, selected: t } = this.view.state.field(Ns), n = 0, r = !1, i = null, a = /* @__PURE__ */ new Set();
		for (e.between(0, this.view.state.doc.length, (e, o, { spec: s }) => {
			for (let e of s.diagnostics) {
				if (a.has(e)) continue;
				a.add(e);
				let o = -1, s;
				for (let t = n; t < this.items.length; t++) if (this.items[t].diagnostic == e) {
					o = t;
					break;
				}
				o < 0 ? (s = new Gs(this.view, e), this.items.splice(n, 0, s), r = !0) : (s = this.items[o], o > n && (this.items.splice(n, o - n), r = !0)), t && s.diagnostic == t.diagnostic ? s.dom.hasAttribute("aria-selected") || (s.dom.setAttribute("aria-selected", "true"), i = s) : s.dom.hasAttribute("aria-selected") && s.dom.removeAttribute("aria-selected"), n++;
			}
		}); n < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0);) r = !0, this.items.pop();
		this.items.length == 0 && (this.items.push(new Gs(this.view, {
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
		let t = Ds(this.view.state.field(Ns).diagnostics, this.items[e].diagnostic);
		t && this.view.dispatch({
			selection: {
				anchor: t.from,
				head: t.to
			},
			scrollIntoView: !0,
			effects: Ms.of(t)
		});
	}
	static open(t) {
		return new e(t);
	}
};
function qs(e, t = "viewBox=\"0 0 40 40\"") {
	return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${t}>${encodeURIComponent(e)}</svg>')`;
}
function Js(e) {
	return qs(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${e}" fill="none" stroke-width=".7"/>`, "width=\"6\" height=\"3\"");
}
var Ys = /* @__PURE__ */ T.baseTheme({
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
	".cm-lintRange-error": { backgroundImage: /* @__PURE__ */ Js("#f11") },
	".cm-lintRange-warning": { backgroundImage: /* @__PURE__ */ Js("orange") },
	".cm-lintRange-info": { backgroundImage: /* @__PURE__ */ Js("#999") },
	".cm-lintRange-hint": { backgroundImage: /* @__PURE__ */ Js("#66d") },
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
function Xs(e) {
	return e == "error" ? 4 : e == "warning" ? 3 : e == "info" ? 2 : 1;
}
function Zs(e) {
	let t = "hint", n = 1;
	for (let r of e) {
		let e = Xs(r.severity);
		e > n && (n = e, t = r.severity);
	}
	return t;
}
var Qs = /* @__PURE__ */ ye(Fs, { hideOn: Os }), $s = [
	Ns,
	/* @__PURE__ */ T.decorations.compute([Ns], (e) => {
		let { selected: t, panel: n } = e.field(Ns);
		return !t || !n || t.from == t.to ? j.none : j.set([Ps.range(t.from, t.to)]);
	}),
	Qs,
	Ys
], ec = [
	Oe(),
	Ee(),
	Fe(),
	hn(),
	o(),
	Ne(),
	xe(),
	C.allowMultipleSelections.of(!0),
	Se(),
	v(le, { fallback: !0 }),
	De(),
	He(),
	Be(),
	be(),
	ke(),
	he(),
	at(),
	je.of([
		...ze,
		...Si,
		...Gt,
		...Pn,
		...re,
		...Ve,
		...zs
	])
], tc = "#e5c07b", nc = "#e06c75", rc = "#56b6c2", ic = "#ffffff", ac = "#abb2bf", oc = "#7d8799", sc = "#61afef", cc = "#98c379", lc = "#d19a66", uc = "#c678dd", dc = "#21252b", fc = "#2c313a", pc = "#282c34", mc = "#353a42", hc = "#3E4451", gc = "#528bff", _c = [/* @__PURE__ */ T.theme({
	"&": {
		color: ac,
		backgroundColor: pc
	},
	".cm-content": { caretColor: gc },
	".cm-cursor, .cm-dropCursor": { borderLeftColor: gc },
	"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: hc },
	".cm-panels": {
		backgroundColor: dc,
		color: ac
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
		backgroundColor: pc,
		color: oc,
		border: "none"
	},
	".cm-activeLineGutter": { backgroundColor: fc },
	".cm-foldPlaceholder": {
		backgroundColor: "transparent",
		border: "none",
		color: "#ddd"
	},
	".cm-tooltip": {
		border: "none",
		backgroundColor: mc
	},
	".cm-tooltip .cm-tooltip-arrow:before": {
		borderTopColor: "transparent",
		borderBottomColor: "transparent"
	},
	".cm-tooltip .cm-tooltip-arrow:after": {
		borderTopColor: mc,
		borderBottomColor: mc
	},
	".cm-tooltip-autocomplete": { "& > ul > li[aria-selected]": {
		backgroundColor: fc,
		color: ac
	} }
}, { dark: !0 }), /* @__PURE__ */ v(/* @__PURE__ */ de.define([
	{
		tag: A.keyword,
		color: uc
	},
	{
		tag: [
			A.name,
			A.deleted,
			A.character,
			A.propertyName,
			A.macroName
		],
		color: nc
	},
	{
		tag: [/* @__PURE__ */ A.function(A.variableName), A.labelName],
		color: sc
	},
	{
		tag: [
			A.color,
			/* @__PURE__ */ A.constant(A.name),
			/* @__PURE__ */ A.standard(A.name)
		],
		color: lc
	},
	{
		tag: [/* @__PURE__ */ A.definition(A.name), A.separator],
		color: ac
	},
	{
		tag: [
			A.typeName,
			A.className,
			A.number,
			A.changed,
			A.annotation,
			A.modifier,
			A.self,
			A.namespace
		],
		color: tc
	},
	{
		tag: [
			A.operator,
			A.operatorKeyword,
			A.url,
			A.escape,
			A.regexp,
			A.link,
			/* @__PURE__ */ A.special(A.string)
		],
		color: rc
	},
	{
		tag: [A.meta, A.comment],
		color: oc
	},
	{
		tag: A.strong,
		fontWeight: "bold"
	},
	{
		tag: A.emphasis,
		fontStyle: "italic"
	},
	{
		tag: A.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: A.link,
		color: oc,
		textDecoration: "underline"
	},
	{
		tag: A.heading,
		fontWeight: "bold",
		color: nc
	},
	{
		tag: [
			A.atom,
			A.bool,
			/* @__PURE__ */ A.special(A.variableName)
		],
		color: lc
	},
	{
		tag: [
			A.processingInstruction,
			A.string,
			A.inserted
		],
		color: cc
	},
	{
		tag: A.invalid,
		color: ic
	}
]))];
//#endregion
//#region src/util.ts
function vc(e) {
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
function yc(e) {
	return vc(e).slice(0, 8);
}
//#endregion
//#region src/prefs.ts
var bc = "veditor_vim_mode";
function xc(e) {
	return localStorage.getItem(bc) === "true";
}
function Sc(e, t) {
	localStorage.setItem(bc, String(t));
}
function Cc(e) {
	return `${e}_line_wrap`;
}
function wc(e) {
	return localStorage.getItem(Cc(e)) !== "false";
}
function Tc(e, t) {
	localStorage.setItem(Cc(e), String(t));
}
var Ec = "veditor_autosave_ms";
function Dc() {
	let e = localStorage.getItem(Ec);
	return e === null ? 5e3 : parseInt(e, 10) || 0;
}
function Oc(e) {
	return `${e}_list`;
}
function kc(e) {
	return localStorage.getItem(Oc(e)) === "true";
}
function Ac(e, t) {
	localStorage.setItem(Oc(e), String(t));
}
//#endregion
//#region src/url-decorator.ts
var jc = /https?:\/\/[^\s)\]>]+/g, Mc = j.mark({
	class: "veditor-url",
	title: "Ctrl+Click to open"
});
function Nc(e) {
	let t = [];
	for (let n = 1; n <= e.state.doc.lines; n++) {
		let r = e.state.doc.line(n), i;
		for (jc.lastIndex = 0; (i = jc.exec(r.text)) !== null;) {
			let e = r.from + i.index, n = e + i[0].length;
			t.push(Mc.range(e, n));
		}
	}
	return console.log("[url-decorator] Found", t.length, "URLs"), j.set(t, !0);
}
var Pc = t.fromClass(class {
	decorations;
	constructor(e) {
		console.log("[url-decorator] Plugin instantiated"), this.decorations = Nc(e);
	}
	update(e) {
		e.docChanged && (this.decorations = Nc(e.view));
	}
}, { decorations: (e) => e.decorations }), Fc = "0.34.0";
function Ic(e, t) {
	let n = /https?:\/\/[^\s)\]>]+/g, r;
	for (; (r = n.exec(e)) !== null;) if (t >= r.index && t < r.index + r[0].length) return r[0];
	return null;
}
function Lc(e, t) {
	let n = /https?:\/\/[^\s)\]>]+/g, r, i = null;
	for (; (r = n.exec(e)) !== null;) if (i ||= r[0], t >= r.index && t < r.index + r[0].length || r.index >= t) return r[0];
	return i;
}
var Rc = T.domEventHandlers({ click(e, t) {
	if (!e.ctrlKey) return !1;
	let n = t.posAtCoords({
		x: e.clientX,
		y: e.clientY
	});
	if (n == null) return !1;
	let r = t.state.doc.lineAt(n), i = n - r.from, a = Ic(r.text, i);
	return a ? (window.open(a, yc(a)), e.preventDefault(), !0) : !1;
} }), Q = null, zc = "", $ = null, Bc = "veditor", Vc = null, Hc = new d(), Uc = new d(), Wc = new d(), Gc = new d(), Kc = null, qc = null, Jc = null, Yc = null, Xc = null;
function Zc() {
	if (!$) return;
	let e = ll(zc);
	$.classList.toggle("veditor-dirty", e);
}
function Qc(e) {
	$ && ($.classList.remove("veditor-vim-normal", "veditor-vim-insert"), e === "insert" || e === "replace" ? $.classList.add("veditor-vim-insert") : $.classList.add("veditor-vim-normal"));
}
function $c() {
	if (!Q) return;
	let e = pa(Q);
	e && e.on("vim-mode-change", (e) => {
		Qc(e.mode);
	});
}
function el(e, t, n) {
	return je.of([
		{
			key: "Escape",
			run: () => (rl(!1, t, e), !0)
		},
		{
			key: "Mod-Shift-s",
			run: () => ((async () => {
				await e.onSave(), zc = cl(), Zc(), rl(!1, t, e);
			})(), !0)
		},
		{
			key: "Mod-Shift-w",
			run: () => {
				if (!Q) return !1;
				let e = !wc(n);
				return Tc(n, e), Q.dispatch({ effects: Hc.reconfigure(e ? T.lineWrapping : []) }), !0;
			}
		}
	]);
}
function tl(e) {
	Kc && (Kc.textContent = `${e ? "VIM" : "CUA"} · v${Fc}`, Kc.title = e ? "Vim mode active — click to switch to standard editing" : "Standard editing — click to switch to Vim mode");
}
function nl(e, t) {
	Kc?.remove();
	let n = document.createElement("button");
	n.className = "veditor-mode-toggle", n.type = "button", n.addEventListener("click", () => ml()), e.appendChild(n), Kc = n, tl(t);
}
function rl(e, t, n) {
	if (e) {
		n.onQuit();
		return;
	}
	if (ll(zc) || n.isAppDirty?.()) {
		il(t, () => n.onQuit(), async () => {
			await n.onSave(), zc = cl(), Zc(), n.onQuit();
		});
		return;
	}
	n.onQuit();
}
function il(e, t, n) {
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
function al() {
	Yc?.remove(), Yc = null;
}
function ol(e, t, n, r) {
	al();
	let i = document.createElement("div");
	i.className = "veditor-context-menu";
	let a = (e, t, n) => {
		let r = document.createElement("button");
		r.type = "button", r.className = `veditor-context-menu-item ${t}`, r.textContent = e, r.addEventListener("click", () => {
			al(), n();
		}), i.appendChild(r);
	};
	a("Save & Close", "veditor-cm-save", async () => {
		await r.onSave(), zc = cl(), Zc(), r.onQuit();
	}), a("Save", "veditor-cm-save", async () => {
		await r.onSave(), zc = cl(), Zc();
	}), a("Close", "veditor-cm-close", () => {
		rl(!1, n, r);
	}), a("Cancel", "veditor-cm-cancel", () => {}), document.body.appendChild(i), Yc = i;
	let o = Math.min(Math.max(e, 10), window.innerWidth - 180 - 10), s = Math.min(Math.max(t, 10), window.innerHeight - 178 - 10);
	i.style.left = `${o}px`, i.style.top = `${s}px`;
	let c = (e) => {
		i.contains(e.target) || (al(), document.removeEventListener("pointerdown", c, !0), document.removeEventListener("keydown", l, !0));
	}, l = (e) => {
		e.key === "Escape" && (e.stopPropagation(), al(), document.removeEventListener("pointerdown", c, !0), document.removeEventListener("keydown", l, !0));
	};
	setTimeout(() => {
		document.addEventListener("pointerdown", c, !0), document.addEventListener("keydown", l, !0);
	}, 0);
}
function sl(e, t, n, r) {
	dl(), zc = t, $ = e, e.classList.add("veditor-dirty-aware"), e.classList.remove("veditor-dirty");
	let i = r?.storagePrefix ?? "veditor";
	Bc = i, Vc = n;
	let a = r?.clickableLinks ?? !0, o = r?.autoSaveMs ?? 0, s = xc(i);
	if (J.defineEx("w", "w", async () => {
		await n.onSave(), zc = cl(), Zc();
	}), J.defineEx("q", "q", (t, r) => {
		rl(r?.bang ?? !1, e, n);
	}), J.defineEx("wq", "wq", async () => {
		await n.onSave(), zc = cl(), Zc(), rl(!1, e, n);
	}), J.defineEx("cua", "cua", () => {
		xc(Bc) && setTimeout(() => ml(), 0);
	}), J.defineEx("wrap", "wrap", () => {
		if (!Q) return;
		let e = !wc(i);
		Tc(i, e), Q.dispatch({ effects: Hc.reconfigure(e ? T.lineWrapping : []) });
	}), J.defineEx("list", "list", () => {
		if (!Q) return;
		let e = !kc(i);
		Ac(i, e), Q.dispatch({ effects: Gc.reconfigure(e ? _e() : []) });
	}), J.defineEx("nolist", "nol", () => {
		Q && (Ac(i, !1), Q.dispatch({ effects: Gc.reconfigure([]) }));
	}), J.map("jk", "<Esc>", "insert"), J.setOption("insertModeEscKeysTimeout", 750), J.defineAction("veditor_quit", () => {
		rl(!1, e, n);
	}), J.mapCommand("u", "action", "veditor_quit", {}, { context: "normal" }), J.defineAction("veditor_gx", () => {
		if (!Q) return;
		let e = Q.state.selection.main.head, t = Q.state.doc.lineAt(e), n = e - t.from, r = Lc(t.text, n);
		r && window.open(r, yc(r));
	}), J.mapCommand("gx", "action", "veditor_gx", {}, { context: "normal" }), r?.exCommands) for (let [e, t] of Object.entries(r.exCommands)) J.defineEx(e, e, t);
	if (r?.normalMappings) for (let [e, t] of Object.entries(r.normalMappings)) {
		let n = `veditor_${e}`;
		J.defineAction(n, t), J.mapCommand(e, "action", n, {}, { context: "normal" });
	}
	let c = J.getRegisterController(), l = c.pushText.bind(c);
	c.pushText = (e, t, n, r, i) => {
		l(e, t, n, r, i), e !== "_" && navigator.clipboard.writeText(n).catch(() => {
			window.postMessage({
				type: "barouse:clipboard-write",
				text: n
			}, "*");
		});
	};
	let u = el(n, e, i);
	console.log("[veditor] Creating editor with urlDecorator extension");
	let d = [
		Uc.of(s ? fa() : []),
		Wc.of(s ? [] : u),
		ec,
		_s({ codeLanguages: ws }),
		_c,
		Pc,
		je.of([
			{
				key: "Tab",
				run: _i
			},
			{
				key: "Shift-Tab",
				run: vi
			},
			{
				key: "Mod-s",
				run: () => ((async () => {
					await n.onSave(), zc = cl(), Zc();
				})(), !0)
			},
			{
				key: "Mod-w",
				run: () => (rl(!1, e, n), !0)
			}
		]),
		Hc.of(wc(i) ? T.lineWrapping : []),
		Gc.of(kc(i) ? _e() : []),
		T.theme({
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
	d.push(T.updateListener.of((e) => {
		e.docChanged && (Zc(), o > 0 && (Xc !== null && clearTimeout(Xc), Xc = setTimeout(() => {
			gl();
		}, o)));
	})), a && d.push(Rc), r?.extensions && d.push(...r.extensions), Q = new T({
		state: C.create({
			doc: t,
			extensions: d
		}),
		parent: e
	}), s && (e.classList.add("veditor-vim-normal"), $c());
	function f() {
		return new Promise((e) => {
			let t = setTimeout(() => {
				window.removeEventListener("message", n), e(null);
			}, 300);
			function n(r) {
				r.data?.type === "barouse:clipboard-read-result" && (clearTimeout(t), window.removeEventListener("message", n), e(r.data.text ?? null));
			}
			window.addEventListener("message", n), window.postMessage({ type: "barouse:clipboard-read" }, "*");
		});
	}
	e.addEventListener("keydown", (t) => {
		if (t.key !== "p" && t.key !== "P" || !xc(Bc) || !e.classList.contains("veditor-vim-normal") || !Q || t.target?.tagName === "INPUT") return;
		t.preventDefault(), t.stopPropagation();
		let n = pa(Q), r = t.key;
		navigator.clipboard.readText().then((e) => {
			e && c.unnamedRegister.setText(e);
		}).catch(() => f().then((e) => {
			e && c.unnamedRegister.setText(e);
		})).finally(() => {
			J.handleKey(n, r, "user");
		});
	}, { capture: !0 }), e.addEventListener("keydown", (e) => {
		xc(Bc) && (e.ctrlKey || e.metaKey) && e.key === "v" && e.stopPropagation();
	}, { capture: !0 }), Q.contentDOM.addEventListener("paste", (e) => {
		if (!xc(Bc)) return;
		let t = e.clipboardData?.getData("text/plain");
		t && c.unnamedRegister.setText(t);
	}), qc = new AbortController(), window.addEventListener("beforeunload", (e) => {
		ll(zc) && (e.preventDefault(), e.returnValue = "");
	}, { signal: qc.signal }), nl(e, s), Jc = new AbortController();
	let p = { signal: Jc.signal }, m = !1, h = 0, g = 0, _ = null;
	return e.addEventListener("touchstart", (e) => {
		e.touches.length === 2 ? (_ = [
			e.touches[0].clientX,
			e.touches[0].clientY,
			e.touches[1].clientX,
			e.touches[1].clientY
		], h = (e.touches[0].clientX + e.touches[1].clientX) / 2, g = (e.touches[0].clientY + e.touches[1].clientY) / 2, m = !0) : (m = !1, _ = null);
	}, p), e.addEventListener("touchmove", (e) => {
		if (!m || !_ || e.touches.length < 2) {
			m = !1;
			return;
		}
		let [t, n, r, i] = _;
		(Math.abs(e.touches[0].clientX - t) > 15 || Math.abs(e.touches[0].clientY - n) > 15 || Math.abs(e.touches[1].clientX - r) > 15 || Math.abs(e.touches[1].clientY - i) > 15) && (m = !1);
	}, p), e.addEventListener("touchend", (t) => {
		m && t.touches.length === 0 && (m = !1, ol(h, g, e, n));
	}, p), e.addEventListener("touchcancel", () => {
		m = !1, _ = null;
	}, p), Q.focus(), Q;
}
function cl() {
	return Q ? Q.state.doc.toString() : "";
}
function ll(e) {
	return cl() !== e;
}
function ul() {
	Q?.focus();
}
function dl() {
	Q &&= (Q.destroy(), null), Kc &&= (Kc.remove(), null), $ &&= ($.classList.remove("veditor-dirty", "veditor-dirty-aware", "veditor-vim-normal", "veditor-vim-insert"), null), qc &&= (qc.abort(), null), Jc?.abort(), Jc = null, Xc !== null && (clearTimeout(Xc), Xc = null), al(), Vc = null;
}
function fl() {
	Q && xc(Bc) && Q.contentDOM.dispatchEvent(new KeyboardEvent("keydown", {
		key: "Escape",
		code: "Escape",
		bubbles: !0
	}));
}
function pl(e) {
	if (!Q || !xc(Bc)) return;
	let t = pa(Q);
	t && J.handleEx(t, e);
}
function ml() {
	if (!Q) return xc(Bc);
	let e = !xc(Bc);
	Sc(Bc, e);
	let t = Vc && $ ? el(Vc, $, Bc) : [];
	return Q.dispatch({ effects: [Uc.reconfigure(e ? fa() : []), Wc.reconfigure(e ? [] : t)] }), tl(e), e ? ($?.classList.add("veditor-vim-normal"), $?.classList.remove("veditor-vim-insert"), $c()) : $?.classList.remove("veditor-vim-normal", "veditor-vim-insert"), Q.focus(), e;
}
function hl() {
	return xc(Bc);
}
async function gl() {
	Vc && (await Vc.onSave(), zc = cl(), Zc());
}
function _l(e) {
	!Vc || !$ || rl(e ?? !1, $, Vc);
}
//#endregion
//#region src/vim-input.ts
function vl(e, t) {
	let n = document.createElement("div");
	n.className = "vim-input", e.appendChild(n);
	let r = t?.storagePrefix ?? "veditor", i = xc(r), a = new d(), o = T.updateListener.of((e) => {
		e.docChanged && t?.onChange?.(e.state.doc.toString());
	}), s = C.transactionFilter.of((e) => e.newDoc.lines > 1 ? {
		...e,
		changes: void 0
	} : e);
	J.map("jk", "<Esc>", "insert"), J.setOption("insertModeEscKeysTimeout", 750);
	let c = [
		a.of(i ? fa() : []),
		_c,
		o,
		s,
		T.theme({
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
	t?.extensions && c.push(...t.extensions);
	let l = new T({
		state: C.create({
			doc: t?.value ?? "",
			extensions: c
		}),
		parent: n
	});
	return l.dom.addEventListener("keydown", (e) => {
		e.key === "Enter" && t?.onEnter ? (e.preventDefault(), e.stopImmediatePropagation(), t.onEnter()) : e.key === "Escape" && t?.onEscape && (e.preventDefault(), e.stopImmediatePropagation(), t.onEscape());
	}, { capture: !0 }), {
		getValue() {
			return l.state.doc.toString();
		},
		setValue(e) {
			l.dispatch({ changes: {
				from: 0,
				to: l.state.doc.length,
				insert: e
			} });
		},
		focus() {
			if (l.focus(), t?.initialInsert && xc(r)) {
				let e = pa(l);
				e && J.handleKey(e, "i", "mapping");
			}
		},
		destroy() {
			l.destroy(), n.remove();
		},
		dom: n
	};
}
//#endregion
//#region src/logging.ts
var yl = "_app_debug_logs";
function bl() {
	try {
		let e = localStorage.getItem(yl);
		return e ? JSON.parse(e) : [];
	} catch {
		return [];
	}
}
function xl(e) {
	try {
		let t = e.slice(-1e3);
		localStorage.setItem(yl, JSON.stringify(t));
	} catch {}
}
function Sl(e, t) {
	let n = {
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		level: e,
		message: t
	}, r = bl();
	r.push(n), xl(r), console[e === "warn" ? "warn" : e === "error" ? "error" : "log"](`[${e.toUpperCase()}] ${t}`);
}
function Cl(e) {
	Sl("error", e);
}
function wl(e) {
	Sl("warn", e);
}
function Tl(e) {
	Sl("info", e);
}
function El(e) {
	Sl("debug", e);
}
function Dl() {
	let e = bl();
	return e.length === 0 ? "(no logs)" : e.map((e) => `[${new Date(e.timestamp).toLocaleTimeString()}] ${e.level.toUpperCase()}: ${e.message}`).join("\n");
}
function Ol() {
	try {
		localStorage.removeItem(yl);
	} catch {}
}
function kl() {
	let e = document.createElement("div");
	e.id = "log-viewer-modal", e.style.cssText = "\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.7);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 10000;\n  ";
	let t = document.createElement("div");
	t.style.cssText = "\n    background: #1e1e1e;\n    color: #e0e0e0;\n    border: 1px solid #444;\n    border-radius: 4px;\n    width: 80vw;\n    max-width: 800px;\n    height: 70vh;\n    display: flex;\n    flex-direction: column;\n    font-family: monospace;\n    font-size: 12px;\n  ";
	let n = document.createElement("div");
	n.style.cssText = "\n    padding: 10px;\n    border-bottom: 1px solid #444;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  ", n.innerHTML = "<div>Debug Logs</div>";
	let r = document.createElement("button");
	r.textContent = "×", r.style.cssText = "\n    background: none;\n    border: none;\n    color: #e0e0e0;\n    font-size: 20px;\n    cursor: pointer;\n    padding: 0;\n    width: 30px;\n    height: 30px;\n  ", r.addEventListener("click", () => e.remove()), n.appendChild(r);
	let i = document.createElement("textarea");
	i.readOnly = !0, i.value = Dl(), i.style.cssText = "\n    flex: 1;\n    padding: 10px;\n    background: #1e1e1e;\n    color: #e0e0e0;\n    border: none;\n    font-family: monospace;\n    font-size: 12px;\n    resize: none;\n    overflow: auto;\n  ", i.scrollTop = i.scrollHeight;
	let a = document.createElement("div");
	a.style.cssText = "\n    padding: 10px;\n    border-top: 1px solid #444;\n    display: flex;\n    gap: 10px;\n    justify-content: flex-end;\n  ";
	let o = document.createElement("button");
	o.textContent = "Clear Logs", o.style.cssText = "\n    padding: 6px 12px;\n    background: #d32f2f;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 12px;\n  ", o.addEventListener("click", () => {
		Ol(), i.value = "(no logs)";
	}), a.appendChild(o);
	let s = document.createElement("button");
	return s.textContent = "Refresh", s.style.cssText = "\n    padding: 6px 12px;\n    background: #1976d2;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 12px;\n  ", s.addEventListener("click", () => {
		i.value = Dl(), i.scrollTop = i.scrollHeight;
	}), a.appendChild(s), t.appendChild(n), t.appendChild(i), t.appendChild(a), e.appendChild(t), e.addEventListener("click", (t) => {
		t.target === e && e.remove();
	}), e;
}
//#endregion
//#region src/index.ts
var Al = "0.34.0";
//#endregion
export { Al as VERSION, Ol as clearLogs, sl as createEditor, kl as createLogViewer, vl as createVimInput, dl as destroyEditor, pl as executeExCommand, fl as exitInsertMode, ul as focusEditor, Dc as getAutoSaveMs, cl as getEditorContent, Dl as getFormattedLogs, yc as hashTarget, ll as isEditorDirty, hl as isVimMode, El as logDebug, Cl as logError, Tl as logInfo, wl as logWarn, _l as requestQuit, gl as requestSave, ml as toggleVimMode };

//# sourceMappingURL=veditor.js.map