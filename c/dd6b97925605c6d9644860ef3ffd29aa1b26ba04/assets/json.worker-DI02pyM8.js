(function() {
	var Do = class {
		constructor() {
			this.listeners = [], this.unexpectedErrorHandler = function(e) {
				setTimeout(() => {
					throw e.stack ? Wn.isErrorNoTelemetry(e) ? new Wn(e.message + `

` + e.stack) : /* @__PURE__ */ new Error(e.message + `

` + e.stack) : e;
				}, 0);
			};
		}
		emit(e) {
			this.listeners.forEach((t) => {
				t(e);
			});
		}
		onUnexpectedError(e) {
			this.unexpectedErrorHandler(e), this.emit(e);
		}
		onUnexpectedExternalError(e) {
			this.unexpectedErrorHandler(e);
		}
	};
	const vi = new Do();
	function an(e) {
		wi(e) || vi.onUnexpectedError(e);
	}
	function Oo(e) {
		wi(e) || vi.onUnexpectedExternalError(e);
	}
	function jn(e) {
		if (e instanceof Error) {
			const { name: t, message: n, cause: r } = e;
			return {
				$isError: !0,
				name: t,
				message: n,
				stack: e.stacktrace || e.stack,
				noTelemetry: Wn.isErrorNoTelemetry(e),
				cause: r ? jn(r) : void 0,
				code: e.code
			};
		}
		return e;
	}
	const $o = "Canceled";
	function wi(e) {
		return e instanceof Li ? !0 : e instanceof Error && e.name === "Canceled" && e.message === "Canceled";
	}
	var Li = class extends Error {
		constructor() {
			super($o), this.name = this.message;
		}
	}, Wn = class ui extends Error {
		constructor(t) {
			super(t), this.name = "CodeExpectedError";
		}
		static fromError(t) {
			if (t instanceof ui) return t;
			const n = new ui();
			return n.message = t.message, n.stack = t.stack, n;
		}
		static isErrorNoTelemetry(t) {
			return t.name === "CodeExpectedError";
		}
	}, ae = class Lo extends Error {
		constructor(t) {
			super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, Lo.prototype);
		}
	};
	function Bo(e, t = "Unreachable") {
		throw new Error(t);
	}
	function Uo(e, t = "unexpected state") {
		if (!e) throw typeof t == "string" ? new ae(`Assertion Failed: ${t}`) : t;
	}
	function It(e) {
		if (!e()) {
			debugger;
			e(), an(new ae("Assertion Failed"));
		}
	}
	function Hn(e, t) {
		let n = 0;
		for (; n < e.length - 1;) {
			const r = e[n], i = e[n + 1];
			if (!t(r, i)) return !1;
			n++;
		}
		return !0;
	}
	function qo(e) {
		return typeof e == "string";
	}
	function jo(e) {
		return !!e && typeof e[Symbol.iterator] == "function";
	}
	var on;
	(function(e) {
		function t(w) {
			return !!w && typeof w == "object" && typeof w[Symbol.iterator] == "function";
		}
		e.is = t;
		const n = Object.freeze([]);
		function r() {
			return n;
		}
		e.empty = r;
		function* i(w) {
			yield w;
		}
		e.single = i;
		function s(w) {
			return t(w) ? w : i(w);
		}
		e.wrap = s;
		function a(w) {
			return w ?? n;
		}
		e.from = a;
		function* l(w) {
			for (let k = w.length - 1; k >= 0; k--) yield w[k];
		}
		e.reverse = l;
		function o(w) {
			return !w || w[Symbol.iterator]().next().done === !0;
		}
		e.isEmpty = o;
		function c(w) {
			return w[Symbol.iterator]().next().value;
		}
		e.first = c;
		function h(w, k) {
			let P = 0;
			for (const D of w) if (k(D, P++)) return !0;
			return !1;
		}
		e.some = h;
		function f(w, k) {
			let P = 0;
			for (const D of w) if (!k(D, P++)) return !1;
			return !0;
		}
		e.every = f;
		function m(w, k) {
			for (const P of w) if (k(P)) return P;
		}
		e.find = m;
		function* g(w, k) {
			for (const P of w) k(P) && (yield P);
		}
		e.filter = g;
		function* d(w, k) {
			let P = 0;
			for (const D of w) yield k(D, P++);
		}
		e.map = d;
		function* p(w, k) {
			let P = 0;
			for (const D of w) yield* k(D, P++);
		}
		e.flatMap = p;
		function* y(...w) {
			for (const k of w) jo(k) ? yield* k : yield k;
		}
		e.concat = y;
		function L(w, k, P) {
			let D = P;
			for (const T of w) D = k(D, T);
			return D;
		}
		e.reduce = L;
		function _(w) {
			let k = 0;
			for (const P of w) k++;
			return k;
		}
		e.length = _;
		function* b(w, k, P = w.length) {
			for (k < -w.length && (k = 0), k < 0 && (k += w.length), P < 0 ? P += w.length : P > w.length && (P = w.length); k < P; k++) yield w[k];
		}
		e.slice = b;
		function N(w, k = Number.POSITIVE_INFINITY) {
			const P = [];
			if (k === 0) return [P, w];
			const D = w[Symbol.iterator]();
			for (let T = 0; T < k; T++) {
				const R = D.next();
				if (R.done) return [P, e.empty()];
				P.push(R.value);
			}
			return [P, { [Symbol.iterator]() {
				return D;
			} }];
		}
		e.consume = N;
		async function v(w) {
			const k = [];
			for await (const P of w) k.push(P);
			return k;
		}
		e.asyncToArray = v;
		async function S(w) {
			let k = [];
			for await (const P of w) k = k.concat(P);
			return k;
		}
		e.asyncToArrayFlat = S;
	})(on || (on = {}));
	function _i(e) {
		if (on.is(e)) {
			const t = [];
			for (const n of e) if (n) try {
				n.dispose();
			} catch (r) {
				t.push(r);
			}
			if (t.length === 1) throw t[0];
			if (t.length > 1) throw new AggregateError(t, "Encountered errors while disposing of store");
			return Array.isArray(e) ? [] : e;
		} else if (e) return e.dispose(), e;
	}
	function Wo(...e) {
		return Ft(() => _i(e));
	}
	var Ho = class {
		constructor(e) {
			this._isDisposed = !1, this._fn = e;
		}
		dispose() {
			if (!this._isDisposed) {
				if (!this._fn) throw new Error("Unbound disposable context: Need to use an arrow function to preserve the value of this");
				this._isDisposed = !0, this._fn();
			}
		}
	};
	function Ft(e) {
		return new Ho(e);
	}
	var zn = class _o {
		static {
			this.DISABLE_DISPOSED_WARNING = !1;
		}
		constructor() {
			this._toDispose = /* @__PURE__ */ new Set(), this._isDisposed = !1;
		}
		dispose() {
			this._isDisposed || (this._isDisposed = !0, this.clear());
		}
		get isDisposed() {
			return this._isDisposed;
		}
		clear() {
			if (this._toDispose.size !== 0) try {
				_i(this._toDispose);
			} finally {
				this._toDispose.clear();
			}
		}
		add(t) {
			if (!t || t === Vt.None) return t;
			if (t === this) throw new Error("Cannot register a disposable on itself!");
			return this._isDisposed ? _o.DISABLE_DISPOSED_WARNING || console.warn((/* @__PURE__ */ new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!")).stack) : this._toDispose.add(t), t;
		}
		delete(t) {
			if (t) {
				if (t === this) throw new Error("Cannot dispose a disposable on itself!");
				this._toDispose.delete(t), t.dispose();
			}
		}
	}, Vt = class {
		static {
			this.None = Object.freeze({ dispose() {} });
		}
		constructor() {
			this._store = new zn(), this._store;
		}
		dispose() {
			this._store.dispose();
		}
		_register(e) {
			if (e === this) throw new Error("Cannot register a disposable on itself!");
			return this._store.add(e);
		}
	}, Z = class Vn {
		static {
			this.Undefined = new Vn(void 0);
		}
		constructor(t) {
			this.element = t, this.next = Vn.Undefined, this.prev = Vn.Undefined;
		}
	}, zo = class {
		constructor() {
			this._first = Z.Undefined, this._last = Z.Undefined, this._size = 0;
		}
		get size() {
			return this._size;
		}
		isEmpty() {
			return this._first === Z.Undefined;
		}
		clear() {
			let e = this._first;
			for (; e !== Z.Undefined;) {
				const t = e.next;
				e.prev = Z.Undefined, e.next = Z.Undefined, e = t;
			}
			this._first = Z.Undefined, this._last = Z.Undefined, this._size = 0;
		}
		unshift(e) {
			return this._insert(e, !1);
		}
		push(e) {
			return this._insert(e, !0);
		}
		_insert(e, t) {
			const n = new Z(e);
			if (this._first === Z.Undefined) this._first = n, this._last = n;
			else if (t) {
				const i = this._last;
				this._last = n, n.prev = i, i.next = n;
			} else {
				const i = this._first;
				this._first = n, n.next = i, i.prev = n;
			}
			this._size += 1;
			let r = !1;
			return () => {
				r || (r = !0, this._remove(n));
			};
		}
		shift() {
			if (this._first !== Z.Undefined) {
				const e = this._first.element;
				return this._remove(this._first), e;
			}
		}
		pop() {
			if (this._last !== Z.Undefined) {
				const e = this._last.element;
				return this._remove(this._last), e;
			}
		}
		_remove(e) {
			if (e.prev !== Z.Undefined && e.next !== Z.Undefined) {
				const t = e.prev;
				t.next = e.next, e.next.prev = t;
			} else e.prev === Z.Undefined && e.next === Z.Undefined ? (this._first = Z.Undefined, this._last = Z.Undefined) : e.next === Z.Undefined ? (this._last = this._last.prev, this._last.next = Z.Undefined) : e.prev === Z.Undefined && (this._first = this._first.next, this._first.prev = Z.Undefined);
			this._size -= 1;
		}
		*[Symbol.iterator]() {
			let e = this._first;
			for (; e !== Z.Undefined;) yield e.element, e = e.next;
		}
	};
	function Go() {
		return globalThis._VSCODE_NLS_MESSAGES;
	}
	function Ni() {
		return globalThis._VSCODE_NLS_LANGUAGE;
	}
	const Jo = Ni() === "pseudo" || typeof document < "u" && document.location && typeof document.location.hash == "string" && document.location.hash.indexOf("pseudo=true") >= 0;
	function Si(e, t) {
		let n;
		return t.length === 0 ? n = e : n = e.replace(/\{(\d+)\}/g, (r, i) => {
			const s = t[i[0]];
			let a = r;
			return typeof s == "string" ? a = s : (typeof s == "number" || typeof s == "boolean" || s === void 0 || s === null) && (a = String(s)), a;
		}), Jo && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n;
	}
	function B(e, t, ...n) {
		return Si(typeof e == "number" ? Xo(e, t) : t, n);
	}
	function Xo(e, t) {
		const n = Go()?.[e];
		if (typeof n != "string") {
			if (typeof t == "string") return t;
			throw new Error(`!!! NLS MISSING: ${e} !!!`);
		}
		return n;
	}
	let ln = !1, un = !1, cn = !1, Ai = !1, Gn = !1, De;
	const Oe = globalThis;
	let pe;
	typeof Oe.vscode < "u" && typeof Oe.vscode.process < "u" ? pe = Oe.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (pe = process);
	const Zo = typeof pe?.versions?.electron == "string" && pe?.type === "renderer";
	if (typeof pe == "object") {
		ln = pe.platform === "win32", un = pe.platform === "darwin", cn = pe.platform === "linux", cn && pe.env.SNAP && pe.env.SNAP_REVISION, pe.env.CI || pe.env.BUILD_ARTIFACTSTAGINGDIRECTORY || pe.env.GITHUB_WORKSPACE;
		const e = pe.env.VSCODE_NLS_CONFIG;
		if (e) try {
			const t = JSON.parse(e);
			t.userLocale, t.osLocale, t.resolvedLanguage, t.languagePack?.translationsConfigFile;
		} catch {}
		Ai = !0;
	} else typeof navigator == "object" && !Zo ? (De = navigator.userAgent, ln = De.indexOf("Windows") >= 0, un = De.indexOf("Macintosh") >= 0, (De.indexOf("Macintosh") >= 0 || De.indexOf("iPad") >= 0 || De.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints, cn = De.indexOf("Linux") >= 0, De?.indexOf("Mobi"), Gn = !0, Ni(), navigator.language.toLowerCase()) : console.error("Unable to resolve platform.");
	const Dt = ln, Ko = un, el = Ai, tl = Gn, nl = Gn && typeof Oe.importScripts == "function" ? Oe.origin : void 0, Ce = De, rl = typeof Oe.postMessage == "function" && !Oe.importScripts;
	(() => {
		if (rl) {
			const e = [];
			Oe.addEventListener("message", (n) => {
				if (n.data && n.data.vscodeScheduleAsyncWork) for (let r = 0, i = e.length; r < i; r++) {
					const s = e[r];
					if (s.id === n.data.vscodeScheduleAsyncWork) {
						e.splice(r, 1), s.callback();
						return;
					}
				}
			});
			let t = 0;
			return (n) => {
				const r = ++t;
				e.push({
					id: r,
					callback: n
				}), Oe.postMessage({ vscodeScheduleAsyncWork: r }, "*");
			};
		}
		return (e) => setTimeout(e);
	})();
	const sl = !!(Ce && Ce.indexOf("Chrome") >= 0);
	Ce && Ce.indexOf("Firefox");
	!sl && Ce && Ce.indexOf("Safari");
	Ce && Ce.indexOf("Edg/");
	Ce && Ce.indexOf("Android");
	let ct;
	const Qn = globalThis.vscode;
	if (typeof Qn < "u" && typeof Qn.process < "u") {
		const e = Qn.process;
		ct = {
			get platform() {
				return e.platform;
			},
			get arch() {
				return e.arch;
			},
			get env() {
				return e.env;
			},
			cwd() {
				return e.cwd();
			}
		};
	} else typeof process < "u" && typeof process?.versions?.node == "string" ? ct = {
		get platform() {
			return process.platform;
		},
		get arch() {
			return process.arch;
		},
		get env() {
			return {};
		},
		cwd() {
			return {}.VSCODE_CWD || process.cwd();
		}
	} : ct = {
		get platform() {
			return Dt ? "win32" : Ko ? "darwin" : "linux";
		},
		get arch() {},
		get env() {
			return {};
		},
		cwd() {
			return "/";
		}
	};
	const fn = ct.cwd, xi = ct.env, al = ct.platform, ol = globalThis.performance.now.bind(globalThis.performance);
	var ki = class No {
		static create(t) {
			return new No(t);
		}
		constructor(t) {
			this._now = t === !1 ? Date.now : ol, this._startTime = this._now(), this._stopTime = -1;
		}
		stop() {
			this._stopTime = this._now();
		}
		reset() {
			this._startTime = this._now(), this._stopTime = -1;
		}
		elapsed() {
			return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
		}
	};
	const ll = 100, Ri = 6e4;
	function Ei() {
		return !!xi.VSCODE_DEV;
	}
	var Yn;
	(function(e) {
		e.None = () => Vt.None;
		function t(M, E, V) {
			return m(M, () => {}, 0, void 0, E ?? !0, void 0, V);
		}
		e.defer = t;
		function n(M) {
			return (E, V = null, I) => {
				let F = !1, O;
				return O = M((U) => {
					if (!F) return O ? O.dispose() : F = !0, E.call(V, U);
				}, null, I), F && O.dispose(), O;
			};
		}
		e.once = n;
		function r(M, E) {
			return e.once(e.filter(M, E));
		}
		e.onceIf = r;
		function i(M, E, V) {
			return h((I, F = null, O) => M((U) => I.call(F, E(U)), null, O), V);
		}
		e.map = i;
		function s(M, E, V) {
			return h((I, F = null, O) => M((U) => {
				E(U), I.call(F, U);
			}, null, O), V);
		}
		e.forEach = s;
		function a(M, E, V) {
			return h((I, F = null, O) => M((U) => E(U) && I.call(F, U), null, O), V);
		}
		e.filter = a;
		function l(M) {
			return M;
		}
		e.signal = l;
		function o(...M) {
			return (E, V = null, I) => f(Wo(...M.map((F) => F((O) => E.call(V, O)))), I);
		}
		e.any = o;
		function c(M, E, V, I) {
			let F = V;
			return i(M, (O) => (F = E(F, O), F), I);
		}
		e.reduce = c;
		function h(M, E) {
			let V;
			const I = new xe({
				onWillAddFirstListener() {
					V = M(I.fire, I);
				},
				onDidRemoveLastListener() {
					V?.dispose();
				}
			});
			return E?.add(I), I.event;
		}
		function f(M, E) {
			return E instanceof Array ? E.push(M) : E && E.add(M), M;
		}
		function m(M, E, V = 100, I = !1, F = !1, O, U) {
			let z, Q, de, ce = 0, ue;
			const Tt = new xe({
				leakWarningThreshold: O,
				onWillAddFirstListener() {
					z = M((uf) => {
						ce++, Q = E(Q, uf), I && !de && (Tt.fire(Q), Q = void 0), ue = () => {
							const cf = Q;
							Q = void 0, de = void 0, (!I || ce > 1) && Tt.fire(cf), ce = 0;
						}, typeof V == "number" ? (de && clearTimeout(de), de = setTimeout(ue, V)) : de === void 0 && (de = null, queueMicrotask(ue));
					});
				},
				onWillRemoveListener() {
					F && ce > 0 && ue?.();
				},
				onDidRemoveLastListener() {
					ue = void 0, z.dispose();
				}
			});
			return U?.add(Tt), Tt.event;
		}
		e.debounce = m;
		function g(M, E = 0, V, I) {
			return e.debounce(M, (F, O) => F ? (F.push(O), F) : [O], E, void 0, V ?? !0, void 0, I);
		}
		e.accumulate = g;
		function d(M, E, V = 100, I = !0, F = !0, O, U) {
			let z, Q, de, ce = 0;
			const ue = new xe({
				leakWarningThreshold: O,
				onWillAddFirstListener() {
					z = M((Tt) => {
						ce++, Q = E(Q, Tt), de === void 0 && (I && (ue.fire(Q), Q = void 0, ce = 0), typeof V == "number" ? de = setTimeout(() => {
							F && ce > 0 && ue.fire(Q), Q = void 0, de = void 0, ce = 0;
						}, V) : (de = 0, queueMicrotask(() => {
							F && ce > 0 && ue.fire(Q), Q = void 0, de = void 0, ce = 0;
						})));
					});
				},
				onDidRemoveLastListener() {
					z.dispose();
				}
			});
			return U?.add(ue), ue.event;
		}
		e.throttle = d;
		function p(M, E = (I, F) => I === F, V) {
			let I = !0, F;
			return a(M, (O) => {
				const U = I || !E(O, F);
				return I = !1, F = O, U;
			}, V);
		}
		e.latch = p;
		function y(M, E, V) {
			return [e.filter(M, E, V), e.filter(M, (I) => !E(I), V)];
		}
		e.split = y;
		function L(M, E, V = !1, I = [], F) {
			let O = I.slice(), U;
			Ei() && (U = {
				stack: Ti.create(),
				timerId: setTimeout(() => {
					O && O.length > 0 && U && !U.warned && (U.warned = !0, console.warn(`[Event.buffer][${E}] potential LEAK detected: ${O.length} events buffered for ${Ri / 1e3}s without being consumed. Buffered here:`), U.stack.print());
				}, Ri),
				warned: !1
			}, F && F.add(Ft(() => clearTimeout(U.timerId))));
			const z = () => {
				U && clearTimeout(U.timerId);
			};
			let Q = M((ue) => {
				O ? (O.push(ue), Ei() && U && !U.warned && O.length >= ll && (U.warned = !0, console.warn(`[Event.buffer][${E}] potential LEAK detected: ${O.length} events buffered without being consumed. Buffered here:`), U.stack.print())) : ce.fire(ue);
			});
			F && F.add(Q);
			const de = () => {
				O?.forEach((ue) => ce.fire(ue)), O = null, z();
			}, ce = new xe({
				onWillAddFirstListener() {
					Q || (Q = M((ue) => ce.fire(ue)), F && F.add(Q));
				},
				onDidAddFirstListener() {
					O && (V ? setTimeout(de) : de());
				},
				onDidRemoveLastListener() {
					Q && Q.dispose(), Q = null, z();
				}
			});
			return F && F.add(ce), ce.event;
		}
		e.buffer = L;
		function _(M, E) {
			return (I, F, O) => {
				const U = E(new N());
				return M(function(z) {
					const Q = U.evaluate(z);
					Q !== b && I.call(F, Q);
				}, void 0, O);
			};
		}
		e.chain = _;
		const b = Symbol("HaltChainable");
		class N {
			constructor() {
				this.steps = [];
			}
			map(E) {
				return this.steps.push(E), this;
			}
			forEach(E) {
				return this.steps.push((V) => (E(V), V)), this;
			}
			filter(E) {
				return this.steps.push((V) => E(V) ? V : b), this;
			}
			reduce(E, V) {
				let I = V;
				return this.steps.push((F) => (I = E(I, F), I)), this;
			}
			latch(E = (V, I) => V === I) {
				let V = !0, I;
				return this.steps.push((F) => {
					const O = V || !E(F, I);
					return V = !1, I = F, O ? F : b;
				}), this;
			}
			evaluate(E) {
				for (const V of this.steps) if (E = V(E), E === b) break;
				return E;
			}
		}
		function v(M, E, V = (I) => I) {
			const I = (...z) => U.fire(V(...z)), F = () => M.on(E, I), O = () => M.removeListener(E, I), U = new xe({
				onWillAddFirstListener: F,
				onDidRemoveLastListener: O
			});
			return U.event;
		}
		e.fromNodeEventEmitter = v;
		function S(M, E, V = (I) => I) {
			const I = (...z) => U.fire(V(...z)), F = () => M.addEventListener(E, I), O = () => M.removeEventListener(E, I), U = new xe({
				onWillAddFirstListener: F,
				onDidRemoveLastListener: O
			});
			return U.event;
		}
		e.fromDOMEventEmitter = S;
		function w(M, E) {
			let V, I;
			const F = new Promise((O) => {
				I = n(M)(O), Kn(I, E), V = () => {
					Ci(I, E);
				};
			});
			return F.cancel = V, E && F.finally(() => Ci(I, E)), F;
		}
		e.toPromise = w;
		function k(M, E) {
			return M((V) => E.fire(V));
		}
		e.forward = k;
		function P(M, E, V) {
			return E(V), M((I) => E(I));
		}
		e.runAndSubscribe = P;
		class D {
			constructor(E, V) {
				this._observable = E, this._counter = 0, this._hasChanged = !1;
				const I = {
					onWillAddFirstListener: () => {
						E.addObserver(this), this._observable.reportChanges();
					},
					onDidRemoveLastListener: () => {
						E.removeObserver(this);
					}
				};
				this.emitter = new xe(I), V && V.add(this.emitter);
			}
			beginUpdate(E) {
				this._counter++;
			}
			handlePossibleChange(E) {}
			handleChange(E, V) {
				this._hasChanged = !0;
			}
			endUpdate(E) {
				this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
			}
		}
		function T(M, E) {
			return new D(M, E).emitter.event;
		}
		e.fromObservable = T;
		function R(M) {
			return (E, V, I) => {
				let F = 0, O = !1;
				const U = {
					beginUpdate() {
						F++;
					},
					endUpdate() {
						F--, F === 0 && (M.reportChanges(), O && (O = !1, E.call(V)));
					},
					handlePossibleChange() {},
					handleChange() {
						O = !0;
					}
				};
				M.addObserver(U), M.reportChanges();
				const z = { dispose() {
					M.removeObserver(U);
				} };
				return Kn(z, I), z;
			};
		}
		e.fromObservableLight = R;
	})(Yn || (Yn = {}));
	var ul = class ci {
		static {
			this.all = /* @__PURE__ */ new Set();
		}
		static {
			this._idPool = 0;
		}
		constructor(t) {
			this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${ci._idPool++}`, ci.all.add(this);
		}
		start(t) {
			this._stopWatch = new ki(), this.listenerCount = t;
		}
		stop() {
			if (this._stopWatch) {
				const t = this._stopWatch.elapsed();
				this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
			}
		}
	};
	let cl = -1;
	var fl = class So {
		static {
			this._idPool = 1;
		}
		constructor(t, n, r = (So._idPool++).toString(16).padStart(3, "0")) {
			this._errorHandler = t, this.threshold = n, this.name = r, this._warnCountdown = 0;
		}
		dispose() {
			this._stacks?.clear();
		}
		check(t, n) {
			const r = this.threshold;
			if (r <= 0 || n < r) return;
			this._stacks || (this._stacks = /* @__PURE__ */ new Map());
			const i = this._stacks.get(t.value) || 0;
			if (this._stacks.set(t.value, i + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
				this._warnCountdown = r * .5;
				const [s, a] = this.getMostFrequentStack(), l = /^[0-9a-f]+$/i.test(this.name) ? void 0 : this.name, o = `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${a}):`;
				console.warn(o), console.warn(s);
				const h = new Mi(a / n > .3 ? "dominated" : "popular", o, s, n, l);
				this._errorHandler(h);
			}
			return () => {
				const s = this._stacks.get(t.value) || 0;
				this._stacks.set(t.value, s - 1);
			};
		}
		getMostFrequentStack() {
			if (!this._stacks) return;
			let t, n = 0;
			for (const [r, i] of this._stacks) (!t || n < i) && (t = [r, i], n = i);
			return t;
		}
	}, Ti = class Ao {
		static create() {
			return new Ao((/* @__PURE__ */ new Error()).stack ?? "");
		}
		constructor(t) {
			this.value = t;
		}
		print() {
			console.warn(this.value.split(`
`).slice(2).join(`
`));
		}
	}, Mi = class xo extends Error {
		constructor(t, n, r, i, s) {
			super(s ? `[${s}] potential listener LEAK detected, ${t}` : `potential listener LEAK detected, ${t}`), this.name = "ListenerLeakError", this.kind = t, this.listenerCount = i, this.details = n, this.stack = r;
		}
		static is(t) {
			return t instanceof xo || t instanceof Error && typeof t.kind == "string" && typeof t.listenerCount == "number";
		}
	}, hl = class extends Mi {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.name = "ListenerRefusalError";
		}
	}, Zn = class {
		constructor(e) {
			this.value = e;
		}
	};
	const ml = 2;
	var xe = class {
		constructor(e) {
			this._size = 0, this._options = e, this._leakageMon = this._options?.leakWarningThreshold ? new fl(e?.onListenerError ?? an, this._options?.leakWarningThreshold ?? cl, this._options?.leakWarningName) : void 0, this._perfMon = this._options?._profName ? new ul(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
		}
		dispose() {
			this._disposed || (this._disposed = !0, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose());
		}
		get event() {
			return this._event ??= (e, t, n) => {
				if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
					const a = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
					console.warn(a);
					const l = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], c = new hl(l[1] / this._size > .3 ? "dominated" : "popular", `${a}. HINT: Stack shows most frequent listener (${l[1]}-times)`, l[0], this._size, this._options?.leakWarningName);
					return (this._options?.onListenerError || an)(c), Vt.None;
				}
				if (this._disposed) return Vt.None;
				t && (e = e.bind(t));
				const r = new Zn(e);
				let i;
				this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * .2) && (r.stack = Ti.create(), i = this._leakageMon.check(r.stack, this._size + 1)), this._listeners ? this._listeners instanceof Zn ? (this._deliveryQueue ??= new gl(), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._options?.onDidAddListener?.(this), this._size++;
				const s = Ft(() => {
					i?.(), this._removeListener(r);
				});
				return Kn(s, n), s;
			}, this._event;
		}
		_removeListener(e) {
			if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
			if (this._size === 1) {
				this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
				return;
			}
			const t = this._listeners, n = t.indexOf(e);
			if (n === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), /* @__PURE__ */ new Error("Attempted to dispose unknown listener");
			this._size--, t[n] = void 0;
			const r = this._deliveryQueue.current === this;
			if (this._size * ml <= t.length) {
				let i = 0;
				for (let s = 0; s < t.length; s++) t[s] ? t[i++] = t[s] : r && i < this._deliveryQueue.end && (this._deliveryQueue.end--, i < this._deliveryQueue.i && this._deliveryQueue.i--);
				t.length = i;
			}
		}
		_deliver(e, t) {
			if (!e) return;
			const n = this._options?.onListenerError || an;
			if (!n) {
				e.value(t);
				return;
			}
			try {
				e.value(t);
			} catch (r) {
				n(r);
			}
		}
		_deliverQueue(e) {
			const t = e.current._listeners;
			for (; e.i < e.end;) this._deliver(t[e.i++], e.value);
			e.reset();
		}
		fire(e) {
			if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Zn) this._deliver(this._listeners, e);
			else {
				const t = this._deliveryQueue;
				t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
			}
			this._perfMon?.stop();
		}
		hasListeners() {
			return this._size > 0;
		}
	}, gl = class {
		constructor() {
			this.i = -1, this.end = 0;
		}
		enqueue(e, t, n) {
			this.i = 0, this.end = n, this.current = e, this.value = t;
		}
		reset() {
			this.i = this.end, this.current = void 0, this.value = void 0;
		}
	};
	function Kn(e, t) {
		t instanceof zn ? t.add(e) : Array.isArray(t) && t.push(e);
	}
	function Ci(e, t) {
		if (t instanceof zn) t.delete(e);
		else if (Array.isArray(t)) {
			const n = t.indexOf(e);
			n !== -1 && t.splice(n, 1);
		}
		e.dispose();
	}
	function dl(e) {
		return e;
	}
	var pl = class {
		constructor(e, t) {
			this.lastCache = void 0, this.lastArgKey = void 0, typeof e == "function" ? (this._fn = e, this._computeKey = dl) : (this._fn = t, this._computeKey = e.getCacheKey);
		}
		get(e) {
			const t = this._computeKey(e);
			return this.lastArgKey !== t && (this.lastArgKey = t, this.lastCache = this._fn(e)), this.lastCache;
		}
	}, Ke;
	(function(e) {
		e[e.Uninitialized = 0] = "Uninitialized", e[e.Running = 1] = "Running", e[e.Completed = 2] = "Completed";
	})(Ke || (Ke = {}));
	var er = class {
		constructor(e) {
			this.executor = e, this._state = Ke.Uninitialized;
		}
		get value() {
			if (this._state === Ke.Uninitialized) {
				this._state = Ke.Running;
				try {
					this._value = this.executor();
				} catch (e) {
					this._error = e;
				} finally {
					this._state = Ke.Completed;
				}
			} else if (this._state === Ke.Running) throw new Error("Cannot read the value of a lazy that is being initialized");
			if (this._error) throw this._error;
			return this._value;
		}
		get rawValue() {
			return this._value;
		}
	};
	function bl(e) {
		return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
	}
	function yl(e) {
		return e.source === "^" || e.source === "^$" || e.source === "$" || e.source === "^\\s*$" ? !1 : !!(e.exec("") && e.lastIndex === 0);
	}
	function vl(e) {
		return e.split(/\r\n|\r|\n/);
	}
	function wl(e) {
		for (let t = 0, n = e.length; t < n; t++) {
			const r = e.charCodeAt(t);
			if (r !== 32 && r !== 9) return t;
		}
		return -1;
	}
	function Ll(e, t = e.length - 1) {
		for (let n = t; n >= 0; n--) {
			const r = e.charCodeAt(n);
			if (r !== 32 && r !== 9) return n;
		}
		return -1;
	}
	function Pi(e) {
		return e >= 65 && e <= 90;
	}
	function tr(e, t) {
		const n = Math.min(e.length, t.length);
		let r;
		for (r = 0; r < n; r++) if (e.charCodeAt(r) !== t.charCodeAt(r)) return r;
		return n;
	}
	function nr(e, t) {
		const n = Math.min(e.length, t.length);
		let r;
		const i = e.length - 1, s = t.length - 1;
		for (r = 0; r < n; r++) if (e.charCodeAt(i - r) !== t.charCodeAt(s - r)) return r;
		return n;
	}
	function hn(e) {
		return 55296 <= e && e <= 56319;
	}
	function rr(e) {
		return 56320 <= e && e <= 57343;
	}
	function Ii(e, t) {
		return (e - 55296 << 10) + (t - 56320) + 65536;
	}
	function _l(e, t, n) {
		const r = e.charCodeAt(n);
		if (hn(r) && n + 1 < t) {
			const i = e.charCodeAt(n + 1);
			if (rr(i)) return Ii(r, i);
		}
		return r;
	}
	const Nl = /^[\t\n\r\x20-\x7E]*$/;
	function Sl(e) {
		return Nl.test(e);
	}
	(class Kt {
		static {
			this._INSTANCE = null;
		}
		static getInstance() {
			return Kt._INSTANCE || (Kt._INSTANCE = new Kt()), Kt._INSTANCE;
		}
		constructor() {
			this._data = Al();
		}
		getGraphemeBreakType(t) {
			if (t < 32) return t === 10 ? 3 : t === 13 ? 2 : 4;
			if (t < 127) return 0;
			const n = this._data, r = n.length / 3;
			let i = 1;
			for (; i <= r;) if (t < n[3 * i]) i = 2 * i;
			else if (t > n[3 * i + 1]) i = 2 * i + 1;
			else return n[3 * i + 2];
			return 0;
		}
	});
	function Al() {
		return JSON.parse("[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]");
	}
	var ir = class en {
		static {
			this.ambiguousCharacterData = new er(() => JSON.parse("{\"_common\":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,1523,96,8242,96,1370,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,118002,50,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,118003,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,118004,52,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,118005,53,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,118006,54,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,118007,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,118008,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,118009,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,117974,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,117975,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71913,67,71922,67,65315,67,8557,67,8450,67,8493,67,117976,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,117977,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,117978,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,117979,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,117980,71,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,117981,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,117983,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,117984,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,118001,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,117982,108,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,117985,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,117986,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,117987,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,118000,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,117988,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,117989,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,117990,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,117991,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,117992,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,117993,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,117994,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,117995,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71910,87,71919,87,117996,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,117997,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,117998,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,71909,90,66293,90,65338,90,8484,90,8488,90,117999,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65283,35,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],\"_default\":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"cs\":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"de\":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"es\":[8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"fr\":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"it\":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"ja\":[8211,45,8218,44,65281,33,8216,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65292,44,65297,49,65307,59],\"ko\":[8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"pl\":[65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"pt-BR\":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"qps-ploc\":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"ru\":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"tr\":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"zh-hans\":[160,32,65374,126,8218,44,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65297,49],\"zh-hant\":[8211,45,65374,126,8218,44,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89]}"));
		}
		static {
			this.cache = new pl((t) => {
				const n = t.split(",");
				function r(h) {
					const f = /* @__PURE__ */ new Map();
					for (let m = 0; m < h.length; m += 2) f.set(h[m], h[m + 1]);
					return f;
				}
				function i(h, f) {
					const m = new Map(h);
					for (const [g, d] of f) m.set(g, d);
					return m;
				}
				function s(h, f) {
					if (!h) return f;
					const m = /* @__PURE__ */ new Map();
					for (const [g, d] of h) f.has(g) && m.set(g, d);
					return m;
				}
				const a = this.ambiguousCharacterData.value;
				let l = n.filter((h) => !h.startsWith("_") && Object.hasOwn(a, h));
				l.length === 0 && (l = ["_default"]);
				let o;
				for (const h of l) {
					const f = r(a[h]);
					o = s(o, f);
				}
				const c = i(r(a._common), o);
				return new en(c);
			});
		}
		static getInstance(t) {
			return en.cache.get(Array.from(t).join(","));
		}
		static {
			this._locales = new er(() => Object.keys(en.ambiguousCharacterData.value).filter((t) => !t.startsWith("_")));
		}
		static getLocales() {
			return en._locales.value;
		}
		constructor(t) {
			this.confusableDictionary = t;
		}
		isAmbiguous(t) {
			return this.confusableDictionary.has(t);
		}
		getPrimaryConfusable(t) {
			return this.confusableDictionary.get(t);
		}
		getConfusableCodePoints() {
			return new Set(this.confusableDictionary.keys());
		}
	}, sr = class Dn {
		static getRawData() {
			return JSON.parse("{\"_common\":[11,12,13,127,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999],\"cs\":[173,8203,12288],\"de\":[173,8203,12288],\"es\":[8203,12288],\"fr\":[173,8203,12288],\"it\":[160,173,12288],\"ja\":[173],\"ko\":[173,12288],\"pl\":[173,8203,12288],\"pt-BR\":[173,8203,12288],\"qps-ploc\":[160,173,8203,12288],\"ru\":[173,12288],\"tr\":[160,173,8203,12288],\"zh-hans\":[160,173,8203,12288],\"zh-hant\":[173,12288]}");
		}
		static {
			this._data = void 0;
		}
		static getData() {
			return this._data || (this._data = new Set([...Object.values(Dn.getRawData())].flat())), this._data;
		}
		static isInvisibleCharacter(t) {
			return Dn.getData().has(t);
		}
		static get codePoints() {
			return Dn.getData();
		}
	};
	const ar = "default", xl = "$initialize";
	var kl = class {
		constructor(e, t, n, r, i) {
			this.vsWorker = e, this.req = t, this.channel = n, this.method = r, this.args = i, this.type = 0;
		}
	}, Fi = class {
		constructor(e, t, n, r) {
			this.vsWorker = e, this.seq = t, this.res = n, this.err = r, this.type = 1;
		}
	}, Rl = class {
		constructor(e, t, n, r, i) {
			this.vsWorker = e, this.req = t, this.channel = n, this.eventName = r, this.arg = i, this.type = 2;
		}
	}, El = class {
		constructor(e, t, n) {
			this.vsWorker = e, this.req = t, this.event = n, this.type = 3;
		}
	}, Tl = class {
		constructor(e, t) {
			this.vsWorker = e, this.req = t, this.type = 4;
		}
	}, Ml = class {
		constructor(e) {
			this._workerId = -1, this._handler = e, this._lastSentReq = 0, this._pendingReplies = Object.create(null), this._pendingEmitters = /* @__PURE__ */ new Map(), this._pendingEvents = /* @__PURE__ */ new Map();
		}
		setWorkerId(e) {
			this._workerId = e;
		}
		async sendMessage(e, t, n) {
			const r = String(++this._lastSentReq);
			return new Promise((i, s) => {
				this._pendingReplies[r] = {
					resolve: i,
					reject: s
				}, this._send(new kl(this._workerId, r, e, t, n));
			});
		}
		listen(e, t, n) {
			let r = null;
			const i = new xe({
				onWillAddFirstListener: () => {
					r = String(++this._lastSentReq), this._pendingEmitters.set(r, i), this._send(new Rl(this._workerId, r, e, t, n));
				},
				onDidRemoveLastListener: () => {
					this._pendingEmitters.delete(r), this._send(new Tl(this._workerId, r)), r = null;
				}
			});
			return i.event;
		}
		handleMessage(e) {
			!e || !e.vsWorker || this._workerId !== -1 && e.vsWorker !== this._workerId || this._handleMessage(e);
		}
		createProxyToRemoteChannel(e, t) {
			return new Proxy(Object.create(null), { get: (n, r) => (typeof r == "string" && !n[r] && (Di(r) ? n[r] = (i) => this.listen(e, r, i) : Vi(r) ? n[r] = this.listen(e, r, void 0) : r.charCodeAt(0) === 36 && (n[r] = async (...i) => (await t?.(), this.sendMessage(e, r, i)))), n[r]) });
		}
		_handleMessage(e) {
			switch (e.type) {
				case 1: return this._handleReplyMessage(e);
				case 0: return this._handleRequestMessage(e);
				case 2: return this._handleSubscribeEventMessage(e);
				case 3: return this._handleEventMessage(e);
				case 4: return this._handleUnsubscribeEventMessage(e);
			}
		}
		_handleReplyMessage(e) {
			if (!this._pendingReplies[e.seq]) {
				console.warn("Got reply to unknown seq");
				return;
			}
			const t = this._pendingReplies[e.seq];
			if (delete this._pendingReplies[e.seq], e.err) {
				let n = e.err;
				if (e.err.$isError) {
					const r = /* @__PURE__ */ new Error();
					r.name = e.err.name, r.message = e.err.message, r.stack = e.err.stack, n = r;
				}
				t.reject(n);
				return;
			}
			t.resolve(e.res);
		}
		_handleRequestMessage(e) {
			const t = e.req;
			this._handler.handleMessage(e.channel, e.method, e.args).then((n) => {
				this._send(new Fi(this._workerId, t, n, void 0));
			}, (n) => {
				n.detail instanceof Error && (n.detail = jn(n.detail)), this._send(new Fi(this._workerId, t, void 0, jn(n)));
			});
		}
		_handleSubscribeEventMessage(e) {
			const t = e.req, n = this._handler.handleEvent(e.channel, e.eventName, e.arg)((r) => {
				this._send(new El(this._workerId, t, r));
			});
			this._pendingEvents.set(t, n);
		}
		_handleEventMessage(e) {
			const t = this._pendingEmitters.get(e.req);
			if (t === void 0) {
				console.warn("Got event for unknown req");
				return;
			}
			t.fire(e.event);
		}
		_handleUnsubscribeEventMessage(e) {
			const t = this._pendingEvents.get(e.req);
			if (t === void 0) {
				console.warn("Got unsubscribe for unknown req");
				return;
			}
			t.dispose(), this._pendingEvents.delete(e.req);
		}
		_send(e) {
			const t = [];
			if (e.type === 0) for (let n = 0; n < e.args.length; n++) {
				const r = e.args[n];
				r instanceof ArrayBuffer && t.push(r);
			}
			else e.type === 1 && e.res instanceof ArrayBuffer && t.push(e.res);
			this._handler.sendMessage(e, t);
		}
	};
	function Vi(e) {
		return e[0] === "o" && e[1] === "n" && Pi(e.charCodeAt(2));
	}
	function Di(e) {
		return /^onDynamic/.test(e) && Pi(e.charCodeAt(9));
	}
	var Cl = class {
		constructor(e, t) {
			this._localChannels = /* @__PURE__ */ new Map(), this._remoteChannels = /* @__PURE__ */ new Map(), this._protocol = new Ml({
				sendMessage: (n, r) => {
					e(n, r);
				},
				handleMessage: (n, r, i) => this._handleMessage(n, r, i),
				handleEvent: (n, r, i) => this._handleEvent(n, r, i)
			}), this.requestHandler = t(this);
		}
		onmessage(e) {
			this._protocol.handleMessage(e);
		}
		_handleMessage(e, t, n) {
			if (e === ar && t === xl) return this.initialize(n[0]);
			const r = e === ar ? this.requestHandler : this._localChannels.get(e);
			if (!r) return Promise.reject(/* @__PURE__ */ new Error(`Missing channel ${e} on worker thread`));
			const i = r[t];
			if (typeof i != "function") return Promise.reject(/* @__PURE__ */ new Error(`Missing method ${t} on worker thread channel ${e}`));
			try {
				return Promise.resolve(i.apply(r, n));
			} catch (s) {
				return Promise.reject(s);
			}
		}
		_handleEvent(e, t, n) {
			const r = e === ar ? this.requestHandler : this._localChannels.get(e);
			if (!r) throw new Error(`Missing channel ${e} on worker thread`);
			if (Di(t)) {
				const i = r[t];
				if (typeof i != "function") throw new Error(`Missing dynamic event ${t} on request handler.`);
				const s = i.call(r, n);
				if (typeof s != "function") throw new Error(`Missing dynamic event ${t} on request handler.`);
				return s;
			}
			if (Vi(t)) {
				const i = r[t];
				if (typeof i != "function") throw new Error(`Missing event ${t} on request handler.`);
				return i;
			}
			throw new Error(`Malformed event name ${t}`);
		}
		getChannel(e) {
			let t = this._remoteChannels.get(e);
			return t === void 0 && (t = this._protocol.createProxyToRemoteChannel(e), this._remoteChannels.set(e, t)), t;
		}
		async initialize(e) {
			this._protocol.setWorkerId(e);
		}
	};
	let Oi = !1;
	function Pl(e) {
		if (Oi) throw new Error("WebWorker already initialized!");
		Oi = !0;
		const t = new Cl((n) => globalThis.postMessage(n), (n) => e(n));
		return globalThis.onmessage = (n) => {
			t.onmessage(n.data);
		}, t;
	}
	var ze = class {
		constructor(e, t, n, r) {
			this.originalStart = e, this.originalLength = t, this.modifiedStart = n, this.modifiedLength = r;
		}
		getOriginalEnd() {
			return this.originalStart + this.originalLength;
		}
		getModifiedEnd() {
			return this.modifiedStart + this.modifiedLength;
		}
	};
	const $i = typeof Buffer < "u";
	new er(() => /* @__PURE__ */ new Uint8Array(256));
	let or;
	var Il = class ko {
		static wrap(t) {
			return $i && !Buffer.isBuffer(t) && (t = Buffer.from(t.buffer, t.byteOffset, t.byteLength)), new ko(t);
		}
		constructor(t) {
			this.buffer = t, this.byteLength = this.buffer.byteLength;
		}
		toString() {
			return $i ? this.buffer.toString() : (or || (or = new TextDecoder(void 0, { ignoreBOM: !0 })), or.decode(this.buffer));
		}
	};
	const Bi = "0123456789abcdef";
	function Fl({ buffer: e }) {
		let t = "";
		for (let n = 0; n < e.length; n++) {
			const r = e[n];
			t += Bi[r >>> 4], t += Bi[r & 15];
		}
		return t;
	}
	function Ui(e, t) {
		return (t << 5) - t + e | 0;
	}
	function Vl(e, t) {
		t = Ui(149417, t);
		for (let n = 0, r = e.length; n < r; n++) t = Ui(e.charCodeAt(n), t);
		return t;
	}
	function lr(e, t, n = 32) {
		const r = n - t, i = ~((1 << r) - 1);
		return (e << t | (i & e) >>> r) >>> 0;
	}
	function Ot(e, t = 32) {
		return e instanceof ArrayBuffer ? Fl(Il.wrap(new Uint8Array(e))) : (e >>> 0).toString(16).padStart(t / 4, "0");
	}
	(class Ro {
		static {
			this._bigBlock32 = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(320));
		}
		constructor() {
			this._h0 = 1732584193, this._h1 = 4023233417, this._h2 = 2562383102, this._h3 = 271733878, this._h4 = 3285377520, this._buff = /* @__PURE__ */ new Uint8Array(67), this._buffDV = new DataView(this._buff.buffer), this._buffLen = 0, this._totalLen = 0, this._leftoverHighSurrogate = 0, this._finished = !1;
		}
		update(t) {
			const n = t.length;
			if (n === 0) return;
			const r = this._buff;
			let i = this._buffLen, s = this._leftoverHighSurrogate, a, l;
			for (s !== 0 ? (a = s, l = -1, s = 0) : (a = t.charCodeAt(0), l = 0);;) {
				let o = a;
				if (hn(a)) if (l + 1 < n) {
					const c = t.charCodeAt(l + 1);
					rr(c) ? (l++, o = Ii(a, c)) : o = 65533;
				} else {
					s = a;
					break;
				}
				else rr(a) && (o = 65533);
				if (i = this._push(r, i, o), l++, l < n) a = t.charCodeAt(l);
				else break;
			}
			this._buffLen = i, this._leftoverHighSurrogate = s;
		}
		_push(t, n, r) {
			return r < 128 ? t[n++] = r : r < 2048 ? (t[n++] = 192 | (r & 1984) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : r < 65536 ? (t[n++] = 224 | (r & 61440) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : (t[n++] = 240 | (r & 1835008) >>> 18, t[n++] = 128 | (r & 258048) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0), n >= 64 && (this._step(), n -= 64, this._totalLen += 64, t[0] = t[64], t[1] = t[65], t[2] = t[66]), n;
		}
		digest() {
			return this._finished || (this._finished = !0, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), Ot(this._h0) + Ot(this._h1) + Ot(this._h2) + Ot(this._h3) + Ot(this._h4);
		}
		_wrapUp() {
			this._buff[this._buffLen++] = 128, this._buff.subarray(this._buffLen).fill(0), this._buffLen > 56 && (this._step(), this._buff.fill(0));
			const t = 8 * this._totalLen;
			this._buffDV.setUint32(56, Math.floor(t / 4294967296), !1), this._buffDV.setUint32(60, t % 4294967296, !1), this._step();
		}
		_step() {
			const t = Ro._bigBlock32, n = this._buffDV;
			for (let f = 0; f < 64; f += 4) t.setUint32(f, n.getUint32(f, !1), !1);
			for (let f = 64; f < 320; f += 4) t.setUint32(f, lr(t.getUint32(f - 12, !1) ^ t.getUint32(f - 32, !1) ^ t.getUint32(f - 56, !1) ^ t.getUint32(f - 64, !1), 1), !1);
			let r = this._h0, i = this._h1, s = this._h2, a = this._h3, l = this._h4, o, c, h;
			for (let f = 0; f < 80; f++) f < 20 ? (o = i & s | ~i & a, c = 1518500249) : f < 40 ? (o = i ^ s ^ a, c = 1859775393) : f < 60 ? (o = i & s | i & a | s & a, c = 2400959708) : (o = i ^ s ^ a, c = 3395469782), h = lr(r, 5) + o + l + c + t.getUint32(f * 4, !1) & 4294967295, l = a, a = s, s = lr(i, 30), i = r, r = h;
			this._h0 = this._h0 + r & 4294967295, this._h1 = this._h1 + i & 4294967295, this._h2 = this._h2 + s & 4294967295, this._h3 = this._h3 + a & 4294967295, this._h4 = this._h4 + l & 4294967295;
		}
	});
	var qi = class {
		constructor(e) {
			this.source = e;
		}
		getElements() {
			const e = this.source, t = new Int32Array(e.length);
			for (let n = 0, r = e.length; n < r; n++) t[n] = e.charCodeAt(n);
			return t;
		}
	};
	function Dl(e, t, n) {
		return new Wi(new qi(e), new qi(t)).ComputeDiff(n).changes;
	}
	var ft = class {
		static Assert(e, t) {
			if (!e) throw new Error(t);
		}
	}, ht = class {
		static Copy(e, t, n, r, i) {
			for (let s = 0; s < i; s++) n[r + s] = e[t + s];
		}
		static Copy2(e, t, n, r, i) {
			for (let s = 0; s < i; s++) n[r + s] = e[t + s];
		}
	}, ji = class {
		constructor() {
			this.m_changes = [], this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824, this.m_originalCount = 0, this.m_modifiedCount = 0;
		}
		MarkNextChange() {
			(this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.m_changes.push(new ze(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount)), this.m_originalCount = 0, this.m_modifiedCount = 0, this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824;
		}
		AddOriginalElement(e, t) {
			this.m_originalStart = Math.min(this.m_originalStart, e), this.m_modifiedStart = Math.min(this.m_modifiedStart, t), this.m_originalCount++;
		}
		AddModifiedElement(e, t) {
			this.m_originalStart = Math.min(this.m_originalStart, e), this.m_modifiedStart = Math.min(this.m_modifiedStart, t), this.m_modifiedCount++;
		}
		getChanges() {
			return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes;
		}
		getReverseChanges() {
			return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes.reverse(), this.m_changes;
		}
	}, Wi = class Mt {
		constructor(t, n, r = null) {
			this.ContinueProcessingPredicate = r, this._originalSequence = t, this._modifiedSequence = n;
			const [i, s, a] = Mt._getElements(t), [l, o, c] = Mt._getElements(n);
			this._hasStrings = a && c, this._originalStringElements = i, this._originalElementsOrHash = s, this._modifiedStringElements = l, this._modifiedElementsOrHash = o, this.m_forwardHistory = [], this.m_reverseHistory = [];
		}
		static _isStringArray(t) {
			return t.length > 0 && typeof t[0] == "string";
		}
		static _getElements(t) {
			const n = t.getElements();
			if (Mt._isStringArray(n)) {
				const r = new Int32Array(n.length);
				for (let i = 0, s = n.length; i < s; i++) r[i] = Vl(n[i], 0);
				return [
					n,
					r,
					!0
				];
			}
			return n instanceof Int32Array ? [
				[],
				n,
				!1
			] : [
				[],
				new Int32Array(n),
				!1
			];
		}
		ElementsAreEqual(t, n) {
			return this._originalElementsOrHash[t] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[t] === this._modifiedStringElements[n] : !0;
		}
		ElementsAreStrictEqual(t, n) {
			return this.ElementsAreEqual(t, n) ? Mt._getStrictElement(this._originalSequence, t) === Mt._getStrictElement(this._modifiedSequence, n) : !1;
		}
		static _getStrictElement(t, n) {
			return typeof t.getStrictElement == "function" ? t.getStrictElement(n) : null;
		}
		OriginalElementsAreEqual(t, n) {
			return this._originalElementsOrHash[t] !== this._originalElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[t] === this._originalStringElements[n] : !0;
		}
		ModifiedElementsAreEqual(t, n) {
			return this._modifiedElementsOrHash[t] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._modifiedStringElements[t] === this._modifiedStringElements[n] : !0;
		}
		ComputeDiff(t) {
			return this._ComputeDiff(0, this._originalElementsOrHash.length - 1, 0, this._modifiedElementsOrHash.length - 1, t);
		}
		_ComputeDiff(t, n, r, i, s) {
			const a = [!1];
			let l = this.ComputeDiffRecursive(t, n, r, i, a);
			return s && (l = this.PrettifyChanges(l)), {
				quitEarly: a[0],
				changes: l
			};
		}
		ComputeDiffRecursive(t, n, r, i, s) {
			for (s[0] = !1; t <= n && r <= i && this.ElementsAreEqual(t, r);) t++, r++;
			for (; n >= t && i >= r && this.ElementsAreEqual(n, i);) n--, i--;
			if (t > n || r > i) {
				let f;
				return r <= i ? (ft.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), f = [new ze(t, 0, r, i - r + 1)]) : t <= n ? (ft.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), f = [new ze(t, n - t + 1, r, 0)]) : (ft.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), ft.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), f = []), f;
			}
			const a = [0], l = [0], o = this.ComputeRecursionPoint(t, n, r, i, a, l, s), c = a[0], h = l[0];
			if (o !== null) return o;
			if (!s[0]) {
				const f = this.ComputeDiffRecursive(t, c, r, h, s);
				let m = [];
				return s[0] ? m = [new ze(c + 1, n - (c + 1) + 1, h + 1, i - (h + 1) + 1)] : m = this.ComputeDiffRecursive(c + 1, n, h + 1, i, s), this.ConcatenateChanges(f, m);
			}
			return [new ze(t, n - t + 1, r, i - r + 1)];
		}
		WALKTRACE(t, n, r, i, s, a, l, o, c, h, f, m, g, d, p, y, L, _) {
			let b = null, N = null, v = new ji(), S = n, w = r, k = g[0] - y[0] - i, P = -1073741824, D = this.m_forwardHistory.length - 1;
			do {
				const T = k + t;
				T === S || T < w && c[T - 1] < c[T + 1] ? (f = c[T + 1], d = f - k - i, f < P && v.MarkNextChange(), P = f, v.AddModifiedElement(f + 1, d), k = T + 1 - t) : (f = c[T - 1] + 1, d = f - k - i, f < P && v.MarkNextChange(), P = f - 1, v.AddOriginalElement(f, d + 1), k = T - 1 - t), D >= 0 && (c = this.m_forwardHistory[D], t = c[0], S = 1, w = c.length - 1);
			} while (--D >= -1);
			if (b = v.getReverseChanges(), _[0]) {
				let T = g[0] + 1, R = y[0] + 1;
				if (b !== null && b.length > 0) {
					const M = b[b.length - 1];
					T = Math.max(T, M.getOriginalEnd()), R = Math.max(R, M.getModifiedEnd());
				}
				N = [new ze(T, m - T + 1, R, p - R + 1)];
			} else {
				v = new ji(), S = a, w = l, k = g[0] - y[0] - o, P = 1073741824, D = L ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
				do {
					const T = k + s;
					T === S || T < w && h[T - 1] >= h[T + 1] ? (f = h[T + 1] - 1, d = f - k - o, f > P && v.MarkNextChange(), P = f + 1, v.AddOriginalElement(f + 1, d + 1), k = T + 1 - s) : (f = h[T - 1], d = f - k - o, f > P && v.MarkNextChange(), P = f, v.AddModifiedElement(f + 1, d + 1), k = T - 1 - s), D >= 0 && (h = this.m_reverseHistory[D], s = h[0], S = 1, w = h.length - 1);
				} while (--D >= -1);
				N = v.getChanges();
			}
			return this.ConcatenateChanges(b, N);
		}
		ComputeRecursionPoint(t, n, r, i, s, a, l) {
			let o = 0, c = 0, h = 0, f = 0, m = 0, g = 0;
			t--, r--, s[0] = 0, a[0] = 0, this.m_forwardHistory = [], this.m_reverseHistory = [];
			const d = n - t + (i - r), p = d + 1, y = new Int32Array(p), L = new Int32Array(p), _ = i - r, b = n - t, N = t - r, v = n - i, S = (b - _) % 2 === 0;
			y[_] = t, L[b] = n, l[0] = !1;
			for (let w = 1; w <= d / 2 + 1; w++) {
				let k = 0, P = 0;
				h = this.ClipDiagonalBound(_ - w, w, _, p), f = this.ClipDiagonalBound(_ + w, w, _, p);
				for (let T = h; T <= f; T += 2) {
					T === h || T < f && y[T - 1] < y[T + 1] ? o = y[T + 1] : o = y[T - 1] + 1, c = o - (T - _) - N;
					const R = o;
					for (; o < n && c < i && this.ElementsAreEqual(o + 1, c + 1);) o++, c++;
					if (y[T] = o, o + c > k + P && (k = o, P = c), !S && Math.abs(T - b) <= w - 1 && o >= L[T]) return s[0] = o, a[0] = c, R <= L[T] && w <= 1448 ? this.WALKTRACE(_, h, f, N, b, m, g, v, y, L, o, n, s, c, i, a, S, l) : null;
				}
				const D = (k - t + (P - r) - w) / 2;
				if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(k, D)) return l[0] = !0, s[0] = k, a[0] = P, D > 0 && w <= 1448 ? this.WALKTRACE(_, h, f, N, b, m, g, v, y, L, o, n, s, c, i, a, S, l) : (t++, r++, [new ze(t, n - t + 1, r, i - r + 1)]);
				m = this.ClipDiagonalBound(b - w, w, b, p), g = this.ClipDiagonalBound(b + w, w, b, p);
				for (let T = m; T <= g; T += 2) {
					T === m || T < g && L[T - 1] >= L[T + 1] ? o = L[T + 1] - 1 : o = L[T - 1], c = o - (T - b) - v;
					const R = o;
					for (; o > t && c > r && this.ElementsAreEqual(o, c);) o--, c--;
					if (L[T] = o, S && Math.abs(T - _) <= w && o <= y[T]) return s[0] = o, a[0] = c, R >= y[T] && w <= 1448 ? this.WALKTRACE(_, h, f, N, b, m, g, v, y, L, o, n, s, c, i, a, S, l) : null;
				}
				if (w <= 1447) {
					let T = new Int32Array(f - h + 2);
					T[0] = _ - h + 1, ht.Copy2(y, h, T, 1, f - h + 1), this.m_forwardHistory.push(T), T = new Int32Array(g - m + 2), T[0] = b - m + 1, ht.Copy2(L, m, T, 1, g - m + 1), this.m_reverseHistory.push(T);
				}
			}
			return this.WALKTRACE(_, h, f, N, b, m, g, v, y, L, o, n, s, c, i, a, S, l);
		}
		PrettifyChanges(t) {
			for (let n = 0; n < t.length; n++) {
				const r = t[n], i = n < t.length - 1 ? t[n + 1].originalStart : this._originalElementsOrHash.length, s = n < t.length - 1 ? t[n + 1].modifiedStart : this._modifiedElementsOrHash.length, a = r.originalLength > 0, l = r.modifiedLength > 0;
				for (; r.originalStart + r.originalLength < i && r.modifiedStart + r.modifiedLength < s && (!a || this.OriginalElementsAreEqual(r.originalStart, r.originalStart + r.originalLength)) && (!l || this.ModifiedElementsAreEqual(r.modifiedStart, r.modifiedStart + r.modifiedLength));) {
					const c = this.ElementsAreStrictEqual(r.originalStart, r.modifiedStart);
					if (this.ElementsAreStrictEqual(r.originalStart + r.originalLength, r.modifiedStart + r.modifiedLength) && !c) break;
					r.originalStart++, r.modifiedStart++;
				}
				const o = [null];
				if (n < t.length - 1 && this.ChangesOverlap(t[n], t[n + 1], o)) {
					t[n] = o[0], t.splice(n + 1, 1), n--;
					continue;
				}
			}
			for (let n = t.length - 1; n >= 0; n--) {
				const r = t[n];
				let i = 0, s = 0;
				if (n > 0) {
					const f = t[n - 1];
					i = f.originalStart + f.originalLength, s = f.modifiedStart + f.modifiedLength;
				}
				const a = r.originalLength > 0, l = r.modifiedLength > 0;
				let o = 0, c = this._boundaryScore(r.originalStart, r.originalLength, r.modifiedStart, r.modifiedLength);
				for (let f = 1;; f++) {
					const m = r.originalStart - f, g = r.modifiedStart - f;
					if (m < i || g < s || a && !this.OriginalElementsAreEqual(m, m + r.originalLength) || l && !this.ModifiedElementsAreEqual(g, g + r.modifiedLength)) break;
					const d = (m === i && g === s ? 5 : 0) + this._boundaryScore(m, r.originalLength, g, r.modifiedLength);
					d > c && (c = d, o = f);
				}
				r.originalStart -= o, r.modifiedStart -= o;
				const h = [null];
				if (n > 0 && this.ChangesOverlap(t[n - 1], t[n], h)) {
					t[n - 1] = h[0], t.splice(n, 1), n++;
					continue;
				}
			}
			if (this._hasStrings) for (let n = 1, r = t.length; n < r; n++) {
				const i = t[n - 1], s = t[n], a = s.originalStart - i.originalStart - i.originalLength, l = i.originalStart, o = s.originalStart + s.originalLength, c = o - l, h = i.modifiedStart, f = s.modifiedStart + s.modifiedLength, m = f - h;
				if (a < 5 && c < 20 && m < 20) {
					const g = this._findBetterContiguousSequence(l, c, h, m, a);
					if (g) {
						const [d, p] = g;
						(d !== i.originalStart + i.originalLength || p !== i.modifiedStart + i.modifiedLength) && (i.originalLength = d - i.originalStart, i.modifiedLength = p - i.modifiedStart, s.originalStart = d + a, s.modifiedStart = p + a, s.originalLength = o - s.originalStart, s.modifiedLength = f - s.modifiedStart);
					}
				}
			}
			return t;
		}
		_findBetterContiguousSequence(t, n, r, i, s) {
			if (n < s || i < s) return null;
			const a = t + n - s + 1, l = r + i - s + 1;
			let o = 0, c = 0, h = 0;
			for (let f = t; f < a; f++) for (let m = r; m < l; m++) {
				const g = this._contiguousSequenceScore(f, m, s);
				g > 0 && g > o && (o = g, c = f, h = m);
			}
			return o > 0 ? [c, h] : null;
		}
		_contiguousSequenceScore(t, n, r) {
			let i = 0;
			for (let s = 0; s < r; s++) {
				if (!this.ElementsAreEqual(t + s, n + s)) return 0;
				i += this._originalStringElements[t + s].length;
			}
			return i;
		}
		_OriginalIsBoundary(t) {
			return t <= 0 || t >= this._originalElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._originalStringElements[t]);
		}
		_OriginalRegionIsBoundary(t, n) {
			if (this._OriginalIsBoundary(t) || this._OriginalIsBoundary(t - 1)) return !0;
			if (n > 0) {
				const r = t + n;
				if (this._OriginalIsBoundary(r - 1) || this._OriginalIsBoundary(r)) return !0;
			}
			return !1;
		}
		_ModifiedIsBoundary(t) {
			return t <= 0 || t >= this._modifiedElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[t]);
		}
		_ModifiedRegionIsBoundary(t, n) {
			if (this._ModifiedIsBoundary(t) || this._ModifiedIsBoundary(t - 1)) return !0;
			if (n > 0) {
				const r = t + n;
				if (this._ModifiedIsBoundary(r - 1) || this._ModifiedIsBoundary(r)) return !0;
			}
			return !1;
		}
		_boundaryScore(t, n, r, i) {
			return (this._OriginalRegionIsBoundary(t, n) ? 1 : 0) + (this._ModifiedRegionIsBoundary(r, i) ? 1 : 0);
		}
		ConcatenateChanges(t, n) {
			const r = [];
			if (t.length === 0 || n.length === 0) return n.length > 0 ? n : t;
			if (this.ChangesOverlap(t[t.length - 1], n[0], r)) {
				const i = new Array(t.length + n.length - 1);
				return ht.Copy(t, 0, i, 0, t.length - 1), i[t.length - 1] = r[0], ht.Copy(n, 1, i, t.length, n.length - 1), i;
			} else {
				const i = new Array(t.length + n.length);
				return ht.Copy(t, 0, i, 0, t.length), ht.Copy(n, 0, i, t.length, n.length), i;
			}
		}
		ChangesOverlap(t, n, r) {
			if (ft.Assert(t.originalStart <= n.originalStart, "Left change is not less than or equal to right change"), ft.Assert(t.modifiedStart <= n.modifiedStart, "Left change is not less than or equal to right change"), t.originalStart + t.originalLength >= n.originalStart || t.modifiedStart + t.modifiedLength >= n.modifiedStart) {
				const i = t.originalStart;
				let s = t.originalLength;
				const a = t.modifiedStart;
				let l = t.modifiedLength;
				return t.originalStart + t.originalLength >= n.originalStart && (s = n.originalStart + n.originalLength - t.originalStart), t.modifiedStart + t.modifiedLength >= n.modifiedStart && (l = n.modifiedStart + n.modifiedLength - t.modifiedStart), r[0] = new ze(i, s, a, l), !0;
			} else return r[0] = null, !1;
		}
		ClipDiagonalBound(t, n, r, i) {
			if (t >= 0 && t < i) return t;
			const s = r, a = i - r - 1, l = n % 2 === 0;
			return t < 0 ? l === (s % 2 === 0) ? 0 : 1 : l === (a % 2 === 0) ? i - 1 : i - 2;
		}
	}, G = class lt {
		constructor(t, n) {
			this.lineNumber = t, this.column = n;
		}
		with(t = this.lineNumber, n = this.column) {
			return t === this.lineNumber && n === this.column ? this : new lt(t, n);
		}
		delta(t = 0, n = 0) {
			return this.with(Math.max(1, this.lineNumber + t), Math.max(1, this.column + n));
		}
		equals(t) {
			return lt.equals(this, t);
		}
		static equals(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.lineNumber === n.lineNumber && t.column === n.column;
		}
		isBefore(t) {
			return lt.isBefore(this, t);
		}
		static isBefore(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column < n.column;
		}
		isBeforeOrEqual(t) {
			return lt.isBeforeOrEqual(this, t);
		}
		static isBeforeOrEqual(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column <= n.column;
		}
		static compare(t, n) {
			const r = t.lineNumber | 0, i = n.lineNumber | 0;
			return r === i ? (t.column | 0) - (n.column | 0) : r - i;
		}
		clone() {
			return new lt(this.lineNumber, this.column);
		}
		toString() {
			return "(" + this.lineNumber + "," + this.column + ")";
		}
		static lift(t) {
			return new lt(t.lineNumber, t.column);
		}
		static isIPosition(t) {
			return !!t && typeof t.lineNumber == "number" && typeof t.column == "number";
		}
		toJSON() {
			return {
				lineNumber: this.lineNumber,
				column: this.column
			};
		}
	}, q = class ne {
		constructor(t, n, r, i) {
			t > r || t === r && n > i ? (this.startLineNumber = r, this.startColumn = i, this.endLineNumber = t, this.endColumn = n) : (this.startLineNumber = t, this.startColumn = n, this.endLineNumber = r, this.endColumn = i);
		}
		isEmpty() {
			return ne.isEmpty(this);
		}
		static isEmpty(t) {
			return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn;
		}
		containsPosition(t) {
			return ne.containsPosition(this, t);
		}
		static containsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column < t.startColumn || n.lineNumber === t.endLineNumber && n.column > t.endColumn);
		}
		static strictContainsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column <= t.startColumn || n.lineNumber === t.endLineNumber && n.column >= t.endColumn);
		}
		containsRange(t) {
			return ne.containsRange(this, t);
		}
		static containsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn < t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn > t.endColumn);
		}
		strictContainsRange(t) {
			return ne.strictContainsRange(this, t);
		}
		static strictContainsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn <= t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn >= t.endColumn);
		}
		plusRange(t) {
			return ne.plusRange(this, t);
		}
		static plusRange(t, n) {
			let r, i, s, a;
			return n.startLineNumber < t.startLineNumber ? (r = n.startLineNumber, i = n.startColumn) : n.startLineNumber === t.startLineNumber ? (r = n.startLineNumber, i = Math.min(n.startColumn, t.startColumn)) : (r = t.startLineNumber, i = t.startColumn), n.endLineNumber > t.endLineNumber ? (s = n.endLineNumber, a = n.endColumn) : n.endLineNumber === t.endLineNumber ? (s = n.endLineNumber, a = Math.max(n.endColumn, t.endColumn)) : (s = t.endLineNumber, a = t.endColumn), new ne(r, i, s, a);
		}
		intersectRanges(t) {
			return ne.intersectRanges(this, t);
		}
		static intersectRanges(t, n) {
			let r = t.startLineNumber, i = t.startColumn, s = t.endLineNumber, a = t.endColumn;
			const l = n.startLineNumber, o = n.startColumn, c = n.endLineNumber, h = n.endColumn;
			return r < l ? (r = l, i = o) : r === l && (i = Math.max(i, o)), s > c ? (s = c, a = h) : s === c && (a = Math.min(a, h)), r > s || r === s && i > a ? null : new ne(r, i, s, a);
		}
		equalsRange(t) {
			return ne.equalsRange(this, t);
		}
		static equalsRange(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.startLineNumber === n.startLineNumber && t.startColumn === n.startColumn && t.endLineNumber === n.endLineNumber && t.endColumn === n.endColumn;
		}
		getEndPosition() {
			return ne.getEndPosition(this);
		}
		static getEndPosition(t) {
			return new G(t.endLineNumber, t.endColumn);
		}
		getStartPosition() {
			return ne.getStartPosition(this);
		}
		static getStartPosition(t) {
			return new G(t.startLineNumber, t.startColumn);
		}
		toString() {
			return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
		}
		setEndPosition(t, n) {
			return new ne(this.startLineNumber, this.startColumn, t, n);
		}
		setStartPosition(t, n) {
			return new ne(t, n, this.endLineNumber, this.endColumn);
		}
		collapseToStart() {
			return ne.collapseToStart(this);
		}
		static collapseToStart(t) {
			return new ne(t.startLineNumber, t.startColumn, t.startLineNumber, t.startColumn);
		}
		collapseToEnd() {
			return ne.collapseToEnd(this);
		}
		static collapseToEnd(t) {
			return new ne(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn);
		}
		delta(t) {
			return new ne(this.startLineNumber + t, this.startColumn, this.endLineNumber + t, this.endColumn);
		}
		isSingleLine() {
			return this.startLineNumber === this.endLineNumber;
		}
		static fromPositions(t, n = t) {
			return new ne(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static lift(t) {
			return t ? new ne(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : null;
		}
		static isIRange(t) {
			return !!t && typeof t.startLineNumber == "number" && typeof t.startColumn == "number" && typeof t.endLineNumber == "number" && typeof t.endColumn == "number";
		}
		static areIntersectingOrTouching(t, n) {
			return !(t.endLineNumber < n.startLineNumber || t.endLineNumber === n.startLineNumber && t.endColumn < n.startColumn || n.endLineNumber < t.startLineNumber || n.endLineNumber === t.startLineNumber && n.endColumn < t.startColumn);
		}
		static areIntersecting(t, n) {
			return !(t.endLineNumber < n.startLineNumber || t.endLineNumber === n.startLineNumber && t.endColumn <= n.startColumn || n.endLineNumber < t.startLineNumber || n.endLineNumber === t.startLineNumber && n.endColumn <= t.startColumn);
		}
		static areOnlyIntersecting(t, n) {
			return !(t.endLineNumber < n.startLineNumber - 1 || t.endLineNumber === n.startLineNumber && t.endColumn < n.startColumn - 1 || n.endLineNumber < t.startLineNumber - 1 || n.endLineNumber === t.startLineNumber && n.endColumn < t.startColumn - 1);
		}
		static compareRangesUsingStarts(t, n) {
			if (t && n) {
				const r = t.startLineNumber | 0, i = n.startLineNumber | 0;
				if (r === i) {
					const s = t.startColumn | 0, a = n.startColumn | 0;
					if (s === a) {
						const l = t.endLineNumber | 0, o = n.endLineNumber | 0;
						return l === o ? (t.endColumn | 0) - (n.endColumn | 0) : l - o;
					}
					return s - a;
				}
				return r - i;
			}
			return (t ? 1 : 0) - (n ? 1 : 0);
		}
		static compareRangesUsingEnds(t, n) {
			return t.endLineNumber === n.endLineNumber ? t.endColumn === n.endColumn ? t.startLineNumber === n.startLineNumber ? t.startColumn - n.startColumn : t.startLineNumber - n.startLineNumber : t.endColumn - n.endColumn : t.endLineNumber - n.endLineNumber;
		}
		static spansMultipleLines(t) {
			return t.endLineNumber > t.startLineNumber;
		}
		toJSON() {
			return this;
		}
	};
	function Hi(e) {
		return e < 0 ? 0 : e > 255 ? 255 : e | 0;
	}
	function mt(e) {
		return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0;
	}
	var Ol = class Eo {
		constructor(t) {
			const n = Hi(t);
			this._defaultValue = n, this._asciiMap = Eo._createAsciiMap(n), this._map = /* @__PURE__ */ new Map();
		}
		static _createAsciiMap(t) {
			const n = /* @__PURE__ */ new Uint8Array(256);
			return n.fill(t), n;
		}
		set(t, n) {
			const r = Hi(n);
			t >= 0 && t < 256 ? this._asciiMap[t] = r : this._map.set(t, r);
		}
		get(t) {
			return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue;
		}
		clear() {
			this._asciiMap.fill(this._defaultValue), this._map.clear();
		}
	}, $l = class {
		constructor(e, t, n) {
			const r = new Uint8Array(e * t);
			for (let i = 0, s = e * t; i < s; i++) r[i] = n;
			this._data = r, this.rows = e, this.cols = t;
		}
		get(e, t) {
			return this._data[e * this.cols + t];
		}
		set(e, t, n) {
			this._data[e * this.cols + t] = n;
		}
	}, Bl = class {
		constructor(e) {
			let t = 0, n = 0;
			for (let i = 0, s = e.length; i < s; i++) {
				const [a, l, o] = e[i];
				l > t && (t = l), a > n && (n = a), o > n && (n = o);
			}
			t++, n++;
			const r = new $l(n, t, 0);
			for (let i = 0, s = e.length; i < s; i++) {
				const [a, l, o] = e[i];
				r.set(a, l, o);
			}
			this._states = r, this._maxCharCode = t;
		}
		nextState(e, t) {
			return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t);
		}
	};
	let ur = null;
	function Ul() {
		return ur === null && (ur = new Bl([
			[
				1,
				104,
				2
			],
			[
				1,
				72,
				2
			],
			[
				1,
				102,
				6
			],
			[
				1,
				70,
				6
			],
			[
				2,
				116,
				3
			],
			[
				2,
				84,
				3
			],
			[
				3,
				116,
				4
			],
			[
				3,
				84,
				4
			],
			[
				4,
				112,
				5
			],
			[
				4,
				80,
				5
			],
			[
				5,
				115,
				9
			],
			[
				5,
				83,
				9
			],
			[
				5,
				58,
				10
			],
			[
				6,
				105,
				7
			],
			[
				6,
				73,
				7
			],
			[
				7,
				108,
				8
			],
			[
				7,
				76,
				8
			],
			[
				8,
				101,
				9
			],
			[
				8,
				69,
				9
			],
			[
				9,
				58,
				10
			],
			[
				10,
				47,
				11
			],
			[
				11,
				47,
				12
			]
		])), ur;
	}
	let $t = null;
	function ql() {
		if ($t === null) {
			$t = new Ol(0);
			const e = ` 	<>'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…|`;
			for (let n = 0; n < 36; n++) $t.set(e.charCodeAt(n), 1);
			const t = ".,;:";
			for (let n = 0; n < 4; n++) $t.set(t.charCodeAt(n), 2);
		}
		return $t;
	}
	var jl = class fi {
		static _createLink(t, n, r, i, s) {
			let a = s - 1;
			do {
				const l = n.charCodeAt(a);
				if (t.get(l) !== 2) break;
				a--;
			} while (a > i);
			if (i > 0) {
				const l = n.charCodeAt(i - 1), o = n.charCodeAt(a);
				(l === 40 && o === 41 || l === 91 && o === 93 || l === 123 && o === 125) && a--;
			}
			return {
				range: {
					startLineNumber: r,
					startColumn: i + 1,
					endLineNumber: r,
					endColumn: a + 2
				},
				url: n.substring(i, a + 1)
			};
		}
		static computeLinks(t, n = Ul()) {
			const r = ql(), i = [];
			for (let s = 1, a = t.getLineCount(); s <= a; s++) {
				const l = t.getLineContent(s), o = l.length;
				let c = 0, h = 0, f = 0, m = 1, g = !1, d = !1, p = !1, y = !1;
				for (; c < o;) {
					let L = !1;
					const _ = l.charCodeAt(c);
					if (m === 13) {
						let b;
						switch (_) {
							case 40:
								g = !0, b = 0;
								break;
							case 41:
								b = g ? 0 : 1;
								break;
							case 91:
								p = !0, d = !0, b = 0;
								break;
							case 93:
								p = !1, b = d ? 0 : 1;
								break;
							case 123:
								y = !0, b = 0;
								break;
							case 125:
								b = y ? 0 : 1;
								break;
							case 39:
							case 34:
							case 96:
								f === _ ? b = 1 : f === 39 || f === 34 || f === 96 ? b = 0 : b = 1;
								break;
							case 42:
								b = f === 42 ? 1 : 0;
								break;
							case 32:
								b = p ? 0 : 1;
								break;
							default: b = r.get(_);
						}
						b === 1 && (i.push(fi._createLink(r, l, s, h, c)), L = !0);
					} else if (m === 12) {
						let b;
						_ === 91 ? (d = !0, b = 0) : b = r.get(_), b === 1 ? L = !0 : m = 13;
					} else m = n.nextState(m, _), m === 0 && (L = !0);
					L && (m = 1, g = !1, d = !1, y = !1, h = c + 1, f = _), c++;
				}
				m === 13 && i.push(fi._createLink(r, l, s, h, o));
			}
			return i;
		}
	};
	function Wl(e) {
		return !e || typeof e.getLineCount != "function" || typeof e.getLineContent != "function" ? [] : jl.computeLinks(e);
	}
	var Hl = class To {
		constructor() {
			this._defaultValueSet = [
				["true", "false"],
				["True", "False"],
				[
					"Private",
					"Public",
					"Friend",
					"ReadOnly",
					"Partial",
					"Protected",
					"WriteOnly"
				],
				[
					"public",
					"protected",
					"private"
				]
			];
		}
		static {
			this.INSTANCE = new To();
		}
		navigateValueSet(t, n, r, i, s) {
			if (t && n) {
				const a = this.doNavigateValueSet(n, s);
				if (a) return {
					range: t,
					value: a
				};
			}
			if (r && i) {
				const a = this.doNavigateValueSet(i, s);
				if (a) return {
					range: r,
					value: a
				};
			}
			return null;
		}
		doNavigateValueSet(t, n) {
			const r = this.numberReplace(t, n);
			return r !== null ? r : this.textReplace(t, n);
		}
		numberReplace(t, n) {
			const r = Math.pow(10, t.length - (t.lastIndexOf(".") + 1));
			let i = Number(t);
			const s = parseFloat(t);
			return !isNaN(i) && !isNaN(s) && i === s ? i === 0 && !n ? null : (i = Math.floor(i * r), i += n ? r : -r, String(i / r)) : null;
		}
		textReplace(t, n) {
			return this.valueSetsReplace(this._defaultValueSet, t, n);
		}
		valueSetsReplace(t, n, r) {
			let i = null;
			for (let s = 0, a = t.length; i === null && s < a; s++) i = this.valueSetReplace(t[s], n, r);
			return i;
		}
		valueSetReplace(t, n, r) {
			let i = t.indexOf(n);
			return i >= 0 ? (i += r ? 1 : -1, i < 0 ? i = t.length - 1 : i %= t.length, t[i]) : null;
		}
	};
	const zi = Object.freeze(function(e, t) {
		const n = setTimeout(e.bind(t), 0);
		return { dispose() {
			clearTimeout(n);
		} };
	});
	var mn;
	(function(e) {
		function t(n) {
			return n === e.None || n === e.Cancelled || n instanceof gn ? !0 : !n || typeof n != "object" ? !1 : typeof n.isCancellationRequested == "boolean" && typeof n.onCancellationRequested == "function";
		}
		e.isCancellationToken = t, e.None = Object.freeze({
			isCancellationRequested: !1,
			onCancellationRequested: Yn.None
		}), e.Cancelled = Object.freeze({
			isCancellationRequested: !0,
			onCancellationRequested: zi
		});
	})(mn || (mn = {}));
	var gn = class {
		constructor() {
			this._isCancelled = !1, this._emitter = null;
		}
		cancel() {
			this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose()));
		}
		get isCancellationRequested() {
			return this._isCancelled;
		}
		get onCancellationRequested() {
			return this._isCancelled ? zi : (this._emitter || (this._emitter = new xe()), this._emitter.event);
		}
		dispose() {
			this._emitter && (this._emitter.dispose(), this._emitter = null);
		}
	}, zl = class {
		constructor(e) {
			this._token = void 0, this._parentListener = void 0, this._parentListener = e && e.onCancellationRequested(this.cancel, this);
		}
		get token() {
			return this._token || (this._token = new gn()), this._token;
		}
		cancel() {
			this._token ? this._token instanceof gn && this._token.cancel() : this._token = mn.Cancelled;
		}
		dispose(e = !1) {
			e && this.cancel(), this._parentListener?.dispose(), this._token ? this._token instanceof gn && this._token.dispose() : this._token = mn.None;
		}
	}, cr = class {
		constructor() {
			this._keyCodeToStr = [], this._strToKeyCode = Object.create(null);
		}
		define(e, t) {
			this._keyCodeToStr[e] = t, this._strToKeyCode[t.toLowerCase()] = e;
		}
		keyCodeToStr(e) {
			return this._keyCodeToStr[e];
		}
		strToKeyCode(e) {
			return this._strToKeyCode[e.toLowerCase()] || 0;
		}
	};
	const dn = new cr(), fr = new cr(), hr = new cr(), Gl = new Array(230), Jl = Object.create(null), Xl = Object.create(null), Gi = [];
	for (let e = 0; e <= 193; e++) Gi[e] = -1;
	(function() {
		const t = [
			[
				1,
				0,
				"None",
				0,
				"unknown",
				0,
				"VK_UNKNOWN",
				"",
				""
			],
			[
				1,
				1,
				"Hyper",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				2,
				"Super",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				3,
				"Fn",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				4,
				"FnLock",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				5,
				"Suspend",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				6,
				"Resume",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				7,
				"Turbo",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				8,
				"Sleep",
				0,
				"",
				0,
				"VK_SLEEP",
				"",
				""
			],
			[
				1,
				9,
				"WakeUp",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				0,
				10,
				"KeyA",
				31,
				"A",
				65,
				"VK_A",
				"",
				""
			],
			[
				0,
				11,
				"KeyB",
				32,
				"B",
				66,
				"VK_B",
				"",
				""
			],
			[
				0,
				12,
				"KeyC",
				33,
				"C",
				67,
				"VK_C",
				"",
				""
			],
			[
				0,
				13,
				"KeyD",
				34,
				"D",
				68,
				"VK_D",
				"",
				""
			],
			[
				0,
				14,
				"KeyE",
				35,
				"E",
				69,
				"VK_E",
				"",
				""
			],
			[
				0,
				15,
				"KeyF",
				36,
				"F",
				70,
				"VK_F",
				"",
				""
			],
			[
				0,
				16,
				"KeyG",
				37,
				"G",
				71,
				"VK_G",
				"",
				""
			],
			[
				0,
				17,
				"KeyH",
				38,
				"H",
				72,
				"VK_H",
				"",
				""
			],
			[
				0,
				18,
				"KeyI",
				39,
				"I",
				73,
				"VK_I",
				"",
				""
			],
			[
				0,
				19,
				"KeyJ",
				40,
				"J",
				74,
				"VK_J",
				"",
				""
			],
			[
				0,
				20,
				"KeyK",
				41,
				"K",
				75,
				"VK_K",
				"",
				""
			],
			[
				0,
				21,
				"KeyL",
				42,
				"L",
				76,
				"VK_L",
				"",
				""
			],
			[
				0,
				22,
				"KeyM",
				43,
				"M",
				77,
				"VK_M",
				"",
				""
			],
			[
				0,
				23,
				"KeyN",
				44,
				"N",
				78,
				"VK_N",
				"",
				""
			],
			[
				0,
				24,
				"KeyO",
				45,
				"O",
				79,
				"VK_O",
				"",
				""
			],
			[
				0,
				25,
				"KeyP",
				46,
				"P",
				80,
				"VK_P",
				"",
				""
			],
			[
				0,
				26,
				"KeyQ",
				47,
				"Q",
				81,
				"VK_Q",
				"",
				""
			],
			[
				0,
				27,
				"KeyR",
				48,
				"R",
				82,
				"VK_R",
				"",
				""
			],
			[
				0,
				28,
				"KeyS",
				49,
				"S",
				83,
				"VK_S",
				"",
				""
			],
			[
				0,
				29,
				"KeyT",
				50,
				"T",
				84,
				"VK_T",
				"",
				""
			],
			[
				0,
				30,
				"KeyU",
				51,
				"U",
				85,
				"VK_U",
				"",
				""
			],
			[
				0,
				31,
				"KeyV",
				52,
				"V",
				86,
				"VK_V",
				"",
				""
			],
			[
				0,
				32,
				"KeyW",
				53,
				"W",
				87,
				"VK_W",
				"",
				""
			],
			[
				0,
				33,
				"KeyX",
				54,
				"X",
				88,
				"VK_X",
				"",
				""
			],
			[
				0,
				34,
				"KeyY",
				55,
				"Y",
				89,
				"VK_Y",
				"",
				""
			],
			[
				0,
				35,
				"KeyZ",
				56,
				"Z",
				90,
				"VK_Z",
				"",
				""
			],
			[
				0,
				36,
				"Digit1",
				22,
				"1",
				49,
				"VK_1",
				"",
				""
			],
			[
				0,
				37,
				"Digit2",
				23,
				"2",
				50,
				"VK_2",
				"",
				""
			],
			[
				0,
				38,
				"Digit3",
				24,
				"3",
				51,
				"VK_3",
				"",
				""
			],
			[
				0,
				39,
				"Digit4",
				25,
				"4",
				52,
				"VK_4",
				"",
				""
			],
			[
				0,
				40,
				"Digit5",
				26,
				"5",
				53,
				"VK_5",
				"",
				""
			],
			[
				0,
				41,
				"Digit6",
				27,
				"6",
				54,
				"VK_6",
				"",
				""
			],
			[
				0,
				42,
				"Digit7",
				28,
				"7",
				55,
				"VK_7",
				"",
				""
			],
			[
				0,
				43,
				"Digit8",
				29,
				"8",
				56,
				"VK_8",
				"",
				""
			],
			[
				0,
				44,
				"Digit9",
				30,
				"9",
				57,
				"VK_9",
				"",
				""
			],
			[
				0,
				45,
				"Digit0",
				21,
				"0",
				48,
				"VK_0",
				"",
				""
			],
			[
				1,
				46,
				"Enter",
				3,
				"Enter",
				13,
				"VK_RETURN",
				"",
				""
			],
			[
				1,
				47,
				"Escape",
				9,
				"Escape",
				27,
				"VK_ESCAPE",
				"",
				""
			],
			[
				1,
				48,
				"Backspace",
				1,
				"Backspace",
				8,
				"VK_BACK",
				"",
				""
			],
			[
				1,
				49,
				"Tab",
				2,
				"Tab",
				9,
				"VK_TAB",
				"",
				""
			],
			[
				1,
				50,
				"Space",
				10,
				"Space",
				32,
				"VK_SPACE",
				"",
				""
			],
			[
				0,
				51,
				"Minus",
				88,
				"-",
				189,
				"VK_OEM_MINUS",
				"-",
				"OEM_MINUS"
			],
			[
				0,
				52,
				"Equal",
				86,
				"=",
				187,
				"VK_OEM_PLUS",
				"=",
				"OEM_PLUS"
			],
			[
				0,
				53,
				"BracketLeft",
				92,
				"[",
				219,
				"VK_OEM_4",
				"[",
				"OEM_4"
			],
			[
				0,
				54,
				"BracketRight",
				94,
				"]",
				221,
				"VK_OEM_6",
				"]",
				"OEM_6"
			],
			[
				0,
				55,
				"Backslash",
				93,
				"\\",
				220,
				"VK_OEM_5",
				"\\",
				"OEM_5"
			],
			[
				0,
				56,
				"IntlHash",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				0,
				57,
				"Semicolon",
				85,
				";",
				186,
				"VK_OEM_1",
				";",
				"OEM_1"
			],
			[
				0,
				58,
				"Quote",
				95,
				"'",
				222,
				"VK_OEM_7",
				"'",
				"OEM_7"
			],
			[
				0,
				59,
				"Backquote",
				91,
				"`",
				192,
				"VK_OEM_3",
				"`",
				"OEM_3"
			],
			[
				0,
				60,
				"Comma",
				87,
				",",
				188,
				"VK_OEM_COMMA",
				",",
				"OEM_COMMA"
			],
			[
				0,
				61,
				"Period",
				89,
				".",
				190,
				"VK_OEM_PERIOD",
				".",
				"OEM_PERIOD"
			],
			[
				0,
				62,
				"Slash",
				90,
				"/",
				191,
				"VK_OEM_2",
				"/",
				"OEM_2"
			],
			[
				1,
				63,
				"CapsLock",
				8,
				"CapsLock",
				20,
				"VK_CAPITAL",
				"",
				""
			],
			[
				1,
				64,
				"F1",
				59,
				"F1",
				112,
				"VK_F1",
				"",
				""
			],
			[
				1,
				65,
				"F2",
				60,
				"F2",
				113,
				"VK_F2",
				"",
				""
			],
			[
				1,
				66,
				"F3",
				61,
				"F3",
				114,
				"VK_F3",
				"",
				""
			],
			[
				1,
				67,
				"F4",
				62,
				"F4",
				115,
				"VK_F4",
				"",
				""
			],
			[
				1,
				68,
				"F5",
				63,
				"F5",
				116,
				"VK_F5",
				"",
				""
			],
			[
				1,
				69,
				"F6",
				64,
				"F6",
				117,
				"VK_F6",
				"",
				""
			],
			[
				1,
				70,
				"F7",
				65,
				"F7",
				118,
				"VK_F7",
				"",
				""
			],
			[
				1,
				71,
				"F8",
				66,
				"F8",
				119,
				"VK_F8",
				"",
				""
			],
			[
				1,
				72,
				"F9",
				67,
				"F9",
				120,
				"VK_F9",
				"",
				""
			],
			[
				1,
				73,
				"F10",
				68,
				"F10",
				121,
				"VK_F10",
				"",
				""
			],
			[
				1,
				74,
				"F11",
				69,
				"F11",
				122,
				"VK_F11",
				"",
				""
			],
			[
				1,
				75,
				"F12",
				70,
				"F12",
				123,
				"VK_F12",
				"",
				""
			],
			[
				1,
				76,
				"PrintScreen",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				77,
				"ScrollLock",
				84,
				"ScrollLock",
				145,
				"VK_SCROLL",
				"",
				""
			],
			[
				1,
				78,
				"Pause",
				7,
				"PauseBreak",
				19,
				"VK_PAUSE",
				"",
				""
			],
			[
				1,
				79,
				"Insert",
				19,
				"Insert",
				45,
				"VK_INSERT",
				"",
				""
			],
			[
				1,
				80,
				"Home",
				14,
				"Home",
				36,
				"VK_HOME",
				"",
				""
			],
			[
				1,
				81,
				"PageUp",
				11,
				"PageUp",
				33,
				"VK_PRIOR",
				"",
				""
			],
			[
				1,
				82,
				"Delete",
				20,
				"Del",
				46,
				"VK_DELETE",
				"Delete",
				""
			],
			[
				1,
				83,
				"End",
				13,
				"End",
				35,
				"VK_END",
				"",
				""
			],
			[
				1,
				84,
				"PageDown",
				12,
				"PageDown",
				34,
				"VK_NEXT",
				"",
				""
			],
			[
				1,
				85,
				"ArrowRight",
				17,
				"RightArrow",
				39,
				"VK_RIGHT",
				"Right",
				""
			],
			[
				1,
				86,
				"ArrowLeft",
				15,
				"LeftArrow",
				37,
				"VK_LEFT",
				"Left",
				""
			],
			[
				1,
				87,
				"ArrowDown",
				18,
				"DownArrow",
				40,
				"VK_DOWN",
				"Down",
				""
			],
			[
				1,
				88,
				"ArrowUp",
				16,
				"UpArrow",
				38,
				"VK_UP",
				"Up",
				""
			],
			[
				1,
				89,
				"NumLock",
				83,
				"NumLock",
				144,
				"VK_NUMLOCK",
				"",
				""
			],
			[
				1,
				90,
				"NumpadDivide",
				113,
				"NumPad_Divide",
				111,
				"VK_DIVIDE",
				"",
				""
			],
			[
				1,
				91,
				"NumpadMultiply",
				108,
				"NumPad_Multiply",
				106,
				"VK_MULTIPLY",
				"",
				""
			],
			[
				1,
				92,
				"NumpadSubtract",
				111,
				"NumPad_Subtract",
				109,
				"VK_SUBTRACT",
				"",
				""
			],
			[
				1,
				93,
				"NumpadAdd",
				109,
				"NumPad_Add",
				107,
				"VK_ADD",
				"",
				""
			],
			[
				1,
				94,
				"NumpadEnter",
				3,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				95,
				"Numpad1",
				99,
				"NumPad1",
				97,
				"VK_NUMPAD1",
				"",
				""
			],
			[
				1,
				96,
				"Numpad2",
				100,
				"NumPad2",
				98,
				"VK_NUMPAD2",
				"",
				""
			],
			[
				1,
				97,
				"Numpad3",
				101,
				"NumPad3",
				99,
				"VK_NUMPAD3",
				"",
				""
			],
			[
				1,
				98,
				"Numpad4",
				102,
				"NumPad4",
				100,
				"VK_NUMPAD4",
				"",
				""
			],
			[
				1,
				99,
				"Numpad5",
				103,
				"NumPad5",
				101,
				"VK_NUMPAD5",
				"",
				""
			],
			[
				1,
				100,
				"Numpad6",
				104,
				"NumPad6",
				102,
				"VK_NUMPAD6",
				"",
				""
			],
			[
				1,
				101,
				"Numpad7",
				105,
				"NumPad7",
				103,
				"VK_NUMPAD7",
				"",
				""
			],
			[
				1,
				102,
				"Numpad8",
				106,
				"NumPad8",
				104,
				"VK_NUMPAD8",
				"",
				""
			],
			[
				1,
				103,
				"Numpad9",
				107,
				"NumPad9",
				105,
				"VK_NUMPAD9",
				"",
				""
			],
			[
				1,
				104,
				"Numpad0",
				98,
				"NumPad0",
				96,
				"VK_NUMPAD0",
				"",
				""
			],
			[
				1,
				105,
				"NumpadDecimal",
				112,
				"NumPad_Decimal",
				110,
				"VK_DECIMAL",
				"",
				""
			],
			[
				0,
				106,
				"IntlBackslash",
				97,
				"OEM_102",
				226,
				"VK_OEM_102",
				"",
				""
			],
			[
				1,
				107,
				"ContextMenu",
				58,
				"ContextMenu",
				93,
				"",
				"",
				""
			],
			[
				1,
				108,
				"Power",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				109,
				"NumpadEqual",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				110,
				"F13",
				71,
				"F13",
				124,
				"VK_F13",
				"",
				""
			],
			[
				1,
				111,
				"F14",
				72,
				"F14",
				125,
				"VK_F14",
				"",
				""
			],
			[
				1,
				112,
				"F15",
				73,
				"F15",
				126,
				"VK_F15",
				"",
				""
			],
			[
				1,
				113,
				"F16",
				74,
				"F16",
				127,
				"VK_F16",
				"",
				""
			],
			[
				1,
				114,
				"F17",
				75,
				"F17",
				128,
				"VK_F17",
				"",
				""
			],
			[
				1,
				115,
				"F18",
				76,
				"F18",
				129,
				"VK_F18",
				"",
				""
			],
			[
				1,
				116,
				"F19",
				77,
				"F19",
				130,
				"VK_F19",
				"",
				""
			],
			[
				1,
				117,
				"F20",
				78,
				"F20",
				131,
				"VK_F20",
				"",
				""
			],
			[
				1,
				118,
				"F21",
				79,
				"F21",
				132,
				"VK_F21",
				"",
				""
			],
			[
				1,
				119,
				"F22",
				80,
				"F22",
				133,
				"VK_F22",
				"",
				""
			],
			[
				1,
				120,
				"F23",
				81,
				"F23",
				134,
				"VK_F23",
				"",
				""
			],
			[
				1,
				121,
				"F24",
				82,
				"F24",
				135,
				"VK_F24",
				"",
				""
			],
			[
				1,
				122,
				"Open",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				123,
				"Help",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				124,
				"Select",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				125,
				"Again",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				126,
				"Undo",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				127,
				"Cut",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				128,
				"Copy",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				129,
				"Paste",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				130,
				"Find",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				131,
				"AudioVolumeMute",
				117,
				"AudioVolumeMute",
				173,
				"VK_VOLUME_MUTE",
				"",
				""
			],
			[
				1,
				132,
				"AudioVolumeUp",
				118,
				"AudioVolumeUp",
				175,
				"VK_VOLUME_UP",
				"",
				""
			],
			[
				1,
				133,
				"AudioVolumeDown",
				119,
				"AudioVolumeDown",
				174,
				"VK_VOLUME_DOWN",
				"",
				""
			],
			[
				1,
				134,
				"NumpadComma",
				110,
				"NumPad_Separator",
				108,
				"VK_SEPARATOR",
				"",
				""
			],
			[
				0,
				135,
				"IntlRo",
				115,
				"ABNT_C1",
				193,
				"VK_ABNT_C1",
				"",
				""
			],
			[
				1,
				136,
				"KanaMode",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				0,
				137,
				"IntlYen",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				138,
				"Convert",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				139,
				"NonConvert",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				140,
				"Lang1",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				141,
				"Lang2",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				142,
				"Lang3",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				143,
				"Lang4",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				144,
				"Lang5",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				145,
				"Abort",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				146,
				"Props",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				147,
				"NumpadParenLeft",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				148,
				"NumpadParenRight",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				149,
				"NumpadBackspace",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				150,
				"NumpadMemoryStore",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				151,
				"NumpadMemoryRecall",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				152,
				"NumpadMemoryClear",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				153,
				"NumpadMemoryAdd",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				154,
				"NumpadMemorySubtract",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				155,
				"NumpadClear",
				131,
				"Clear",
				12,
				"VK_CLEAR",
				"",
				""
			],
			[
				1,
				156,
				"NumpadClearEntry",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				0,
				"",
				5,
				"Ctrl",
				17,
				"VK_CONTROL",
				"",
				""
			],
			[
				1,
				0,
				"",
				4,
				"Shift",
				16,
				"VK_SHIFT",
				"",
				""
			],
			[
				1,
				0,
				"",
				6,
				"Alt",
				18,
				"VK_MENU",
				"",
				""
			],
			[
				1,
				0,
				"",
				57,
				"Meta",
				91,
				"VK_COMMAND",
				"",
				""
			],
			[
				1,
				157,
				"ControlLeft",
				5,
				"",
				0,
				"VK_LCONTROL",
				"",
				""
			],
			[
				1,
				158,
				"ShiftLeft",
				4,
				"",
				0,
				"VK_LSHIFT",
				"",
				""
			],
			[
				1,
				159,
				"AltLeft",
				6,
				"",
				0,
				"VK_LMENU",
				"",
				""
			],
			[
				1,
				160,
				"MetaLeft",
				57,
				"",
				0,
				"VK_LWIN",
				"",
				""
			],
			[
				1,
				161,
				"ControlRight",
				5,
				"",
				0,
				"VK_RCONTROL",
				"",
				""
			],
			[
				1,
				162,
				"ShiftRight",
				4,
				"",
				0,
				"VK_RSHIFT",
				"",
				""
			],
			[
				1,
				163,
				"AltRight",
				6,
				"",
				0,
				"VK_RMENU",
				"",
				""
			],
			[
				1,
				164,
				"MetaRight",
				57,
				"",
				0,
				"VK_RWIN",
				"",
				""
			],
			[
				1,
				165,
				"BrightnessUp",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				166,
				"BrightnessDown",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				167,
				"MediaPlay",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				168,
				"MediaRecord",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				169,
				"MediaFastForward",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				170,
				"MediaRewind",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				171,
				"MediaTrackNext",
				124,
				"MediaTrackNext",
				176,
				"VK_MEDIA_NEXT_TRACK",
				"",
				""
			],
			[
				1,
				172,
				"MediaTrackPrevious",
				125,
				"MediaTrackPrevious",
				177,
				"VK_MEDIA_PREV_TRACK",
				"",
				""
			],
			[
				1,
				173,
				"MediaStop",
				126,
				"MediaStop",
				178,
				"VK_MEDIA_STOP",
				"",
				""
			],
			[
				1,
				174,
				"Eject",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				175,
				"MediaPlayPause",
				127,
				"MediaPlayPause",
				179,
				"VK_MEDIA_PLAY_PAUSE",
				"",
				""
			],
			[
				1,
				176,
				"MediaSelect",
				128,
				"LaunchMediaPlayer",
				181,
				"VK_MEDIA_LAUNCH_MEDIA_SELECT",
				"",
				""
			],
			[
				1,
				177,
				"LaunchMail",
				129,
				"LaunchMail",
				180,
				"VK_MEDIA_LAUNCH_MAIL",
				"",
				""
			],
			[
				1,
				178,
				"LaunchApp2",
				130,
				"LaunchApp2",
				183,
				"VK_MEDIA_LAUNCH_APP2",
				"",
				""
			],
			[
				1,
				179,
				"LaunchApp1",
				0,
				"",
				0,
				"VK_MEDIA_LAUNCH_APP1",
				"",
				""
			],
			[
				1,
				180,
				"SelectTask",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				181,
				"LaunchScreenSaver",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				182,
				"BrowserSearch",
				120,
				"BrowserSearch",
				170,
				"VK_BROWSER_SEARCH",
				"",
				""
			],
			[
				1,
				183,
				"BrowserHome",
				121,
				"BrowserHome",
				172,
				"VK_BROWSER_HOME",
				"",
				""
			],
			[
				1,
				184,
				"BrowserBack",
				122,
				"BrowserBack",
				166,
				"VK_BROWSER_BACK",
				"",
				""
			],
			[
				1,
				185,
				"BrowserForward",
				123,
				"BrowserForward",
				167,
				"VK_BROWSER_FORWARD",
				"",
				""
			],
			[
				1,
				186,
				"BrowserStop",
				0,
				"",
				0,
				"VK_BROWSER_STOP",
				"",
				""
			],
			[
				1,
				187,
				"BrowserRefresh",
				0,
				"",
				0,
				"VK_BROWSER_REFRESH",
				"",
				""
			],
			[
				1,
				188,
				"BrowserFavorites",
				0,
				"",
				0,
				"VK_BROWSER_FAVORITES",
				"",
				""
			],
			[
				1,
				189,
				"ZoomToggle",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				190,
				"MailReply",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				191,
				"MailForward",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				192,
				"MailSend",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				0,
				"",
				114,
				"KeyInComposition",
				229,
				"",
				"",
				""
			],
			[
				1,
				0,
				"",
				116,
				"ABNT_C2",
				194,
				"VK_ABNT_C2",
				"",
				""
			],
			[
				1,
				0,
				"",
				96,
				"OEM_8",
				223,
				"VK_OEM_8",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_KANA",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_HANGUL",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_JUNJA",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_FINAL",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_HANJA",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_KANJI",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_CONVERT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_NONCONVERT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_ACCEPT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_MODECHANGE",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_SELECT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PRINT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_EXECUTE",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_SNAPSHOT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_HELP",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_APPS",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PROCESSKEY",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PACKET",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_DBE_SBCSCHAR",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_DBE_DBCSCHAR",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_ATTN",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_CRSEL",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_EXSEL",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_EREOF",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PLAY",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_ZOOM",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_NONAME",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PA1",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_OEM_CLEAR",
				"",
				""
			]
		], n = [], r = [];
		for (const i of t) {
			const [s, a, l, o, c, h, f, m, g] = i;
			if (r[a] || (r[a] = !0, Jl[l] = a, Xl[l.toLowerCase()] = a, s && (Gi[a] = o)), !n[o]) {
				if (n[o] = !0, !c) throw new Error(`String representation missing for key code ${o} around scan code ${l}`);
				dn.define(o, c), fr.define(o, m || c), hr.define(o, g || m || c);
			}
			h && (Gl[h] = o);
		}
	})();
	var Ji;
	(function(e) {
		function t(l) {
			return dn.keyCodeToStr(l);
		}
		e.toString = t;
		function n(l) {
			return dn.strToKeyCode(l);
		}
		e.fromString = n;
		function r(l) {
			return fr.keyCodeToStr(l);
		}
		e.toUserSettingsUS = r;
		function i(l) {
			return hr.keyCodeToStr(l);
		}
		e.toUserSettingsGeneral = i;
		function s(l) {
			return fr.strToKeyCode(l) || hr.strToKeyCode(l);
		}
		e.fromUserSettings = s;
		function a(l) {
			if (l >= 98 && l <= 113) return null;
			switch (l) {
				case 16: return "Up";
				case 18: return "Down";
				case 15: return "Left";
				case 17: return "Right";
				case 20: return "Delete";
			}
			return dn.keyCodeToStr(l);
		}
		e.toElectronAccelerator = a;
	})(Ji || (Ji = {}));
	function Ql(e, t) {
		return (e | (t & 65535) << 16 >>> 0) >>> 0;
	}
	const Yl = 65, Zl = 97, Kl = 90, eu = 122, et = 46, oe = 47, be = 92, $e = 58, tu = 63;
	var Xi = class extends Error {
		constructor(e, t, n) {
			let r;
			typeof t == "string" && t.indexOf("not ") === 0 ? (r = "must not be", t = t.replace(/^not /, "")) : r = "must be";
			let i = `The "${e}" ${e.indexOf(".") !== -1 ? "property" : "argument"} ${r} of type ${t}`;
			i += `. Received type ${typeof n}`, super(i), this.code = "ERR_INVALID_ARG_TYPE";
		}
	};
	function nu(e, t) {
		if (e === null || typeof e != "object") throw new Xi(t, "Object", e);
	}
	function ee(e, t) {
		if (typeof e != "string") throw new Xi(t, "string", e);
	}
	const Be = al === "win32";
	function W(e) {
		return e === oe || e === be;
	}
	function mr(e) {
		return e === oe;
	}
	function Ue(e) {
		return e >= Yl && e <= Kl || e >= Zl && e <= eu;
	}
	function pn(e, t, n, r) {
		let i = "", s = 0, a = -1, l = 0, o = 0;
		for (let c = 0; c <= e.length; ++c) {
			if (c < e.length) o = e.charCodeAt(c);
			else {
				if (r(o)) break;
				o = oe;
			}
			if (r(o)) {
				if (!(a === c - 1 || l === 1)) if (l === 2) {
					if (i.length < 2 || s !== 2 || i.charCodeAt(i.length - 1) !== et || i.charCodeAt(i.length - 2) !== et) {
						if (i.length > 2) {
							const h = i.lastIndexOf(n);
							h === -1 ? (i = "", s = 0) : (i = i.slice(0, h), s = i.length - 1 - i.lastIndexOf(n)), a = c, l = 0;
							continue;
						} else if (i.length !== 0) {
							i = "", s = 0, a = c, l = 0;
							continue;
						}
					}
					t && (i += i.length > 0 ? `${n}..` : "..", s = 2);
				} else i.length > 0 ? i += `${n}${e.slice(a + 1, c)}` : i = e.slice(a + 1, c), s = c - a - 1;
				a = c, l = 0;
			} else o === et && l !== -1 ? ++l : l = -1;
		}
		return i;
	}
	function ru(e) {
		return e ? `${e[0] === "." ? "" : "."}${e}` : "";
	}
	function Qi(e, t) {
		nu(t, "pathObject");
		const n = t.dir || t.root, r = t.base || `${t.name || ""}${ru(t.ext)}`;
		return n ? n === t.root ? `${n}${r}` : `${n}${e}${r}` : r;
	}
	const fe = {
		resolve(...e) {
			let t = "", n = "", r = !1;
			for (let i = e.length - 1; i >= -1; i--) {
				let s;
				if (i >= 0) {
					if (s = e[i], ee(s, `paths[${i}]`), s.length === 0) continue;
				} else t.length === 0 ? s = fn() : (s = xi[`=${t}`] || fn(), (s === void 0 || s.slice(0, 2).toLowerCase() !== t.toLowerCase() && s.charCodeAt(2) === be) && (s = `${t}\\`));
				const a = s.length;
				let l = 0, o = "", c = !1;
				const h = s.charCodeAt(0);
				if (a === 1) W(h) && (l = 1, c = !0);
				else if (W(h)) if (c = !0, W(s.charCodeAt(1))) {
					let f = 2, m = f;
					for (; f < a && !W(s.charCodeAt(f));) f++;
					if (f < a && f !== m) {
						const g = s.slice(m, f);
						for (m = f; f < a && W(s.charCodeAt(f));) f++;
						if (f < a && f !== m) {
							for (m = f; f < a && !W(s.charCodeAt(f));) f++;
							(f === a || f !== m) && (o = `\\\\${g}\\${s.slice(m, f)}`, l = f);
						}
					}
				} else l = 1;
				else Ue(h) && s.charCodeAt(1) === $e && (o = s.slice(0, 2), l = 2, a > 2 && W(s.charCodeAt(2)) && (c = !0, l = 3));
				if (o.length > 0) if (t.length > 0) {
					if (o.toLowerCase() !== t.toLowerCase()) continue;
				} else t = o;
				if (r) {
					if (t.length > 0) break;
				} else if (n = `${s.slice(l)}\\${n}`, r = c, c && t.length > 0) break;
			}
			return n = pn(n, !r, "\\", W), r ? `${t}\\${n}` : `${t}${n}` || ".";
		},
		normalize(e) {
			ee(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = 0, r, i = !1;
			const s = e.charCodeAt(0);
			if (t === 1) return mr(s) ? "\\" : e;
			if (W(s)) if (i = !0, W(e.charCodeAt(1))) {
				let l = 2, o = l;
				for (; l < t && !W(e.charCodeAt(l));) l++;
				if (l < t && l !== o) {
					const c = e.slice(o, l);
					for (o = l; l < t && W(e.charCodeAt(l));) l++;
					if (l < t && l !== o) {
						for (o = l; l < t && !W(e.charCodeAt(l));) l++;
						if (l === t) return `\\\\${c}\\${e.slice(o)}\\`;
						l !== o && (r = `\\\\${c}\\${e.slice(o, l)}`, n = l);
					}
				}
			} else n = 1;
			else Ue(s) && e.charCodeAt(1) === $e && (r = e.slice(0, 2), n = 2, t > 2 && W(e.charCodeAt(2)) && (i = !0, n = 3));
			let a = n < t ? pn(e.slice(n), !i, "\\", W) : "";
			if (a.length === 0 && !i && (a = "."), a.length > 0 && W(e.charCodeAt(t - 1)) && (a += "\\"), !i && r === void 0 && e.includes(":")) {
				if (a.length >= 2 && Ue(a.charCodeAt(0)) && a.charCodeAt(1) === $e) return `.\\${a}`;
				let l = e.indexOf(":");
				do
					if (l === t - 1 || W(e.charCodeAt(l + 1))) return `.\\${a}`;
				while ((l = e.indexOf(":", l + 1)) !== -1);
			}
			return r === void 0 ? i ? `\\${a}` : a : i ? `${r}\\${a}` : `${r}${a}`;
		},
		isAbsolute(e) {
			ee(e, "path");
			const t = e.length;
			if (t === 0) return !1;
			const n = e.charCodeAt(0);
			return W(n) || t > 2 && Ue(n) && e.charCodeAt(1) === $e && W(e.charCodeAt(2));
		},
		join(...e) {
			if (e.length === 0) return ".";
			let t, n;
			for (let s = 0; s < e.length; ++s) {
				const a = e[s];
				ee(a, "path"), a.length > 0 && (t === void 0 ? t = n = a : t += `\\${a}`);
			}
			if (t === void 0) return ".";
			let r = !0, i = 0;
			if (typeof n == "string" && W(n.charCodeAt(0))) {
				++i;
				const s = n.length;
				s > 1 && W(n.charCodeAt(1)) && (++i, s > 2 && (W(n.charCodeAt(2)) ? ++i : r = !1));
			}
			if (r) {
				for (; i < t.length && W(t.charCodeAt(i));) i++;
				i >= 2 && (t = `\\${t.slice(i)}`);
			}
			return fe.normalize(t);
		},
		relative(e, t) {
			if (ee(e, "from"), ee(t, "to"), e === t) return "";
			const n = fe.resolve(e), r = fe.resolve(t);
			if (n === r || (e = n.toLowerCase(), t = r.toLowerCase(), e === t)) return "";
			if (n.length !== e.length || r.length !== t.length) {
				const d = n.split("\\"), p = r.split("\\");
				d[d.length - 1] === "" && d.pop(), p[p.length - 1] === "" && p.pop();
				const y = d.length, L = p.length, _ = y < L ? y : L;
				let b;
				for (b = 0; b < _ && d[b].toLowerCase() === p[b].toLowerCase(); b++);
				return b === 0 ? r : b === _ ? L > _ ? p.slice(b).join("\\") : y > _ ? "..\\".repeat(y - 1 - b) + ".." : "" : "..\\".repeat(y - b) + p.slice(b).join("\\");
			}
			let i = 0;
			for (; i < e.length && e.charCodeAt(i) === be;) i++;
			let s = e.length;
			for (; s - 1 > i && e.charCodeAt(s - 1) === be;) s--;
			const a = s - i;
			let l = 0;
			for (; l < t.length && t.charCodeAt(l) === be;) l++;
			let o = t.length;
			for (; o - 1 > l && t.charCodeAt(o - 1) === be;) o--;
			const c = o - l, h = a < c ? a : c;
			let f = -1, m = 0;
			for (; m < h; m++) {
				const d = e.charCodeAt(i + m);
				if (d !== t.charCodeAt(l + m)) break;
				d === be && (f = m);
			}
			if (m !== h) {
				if (f === -1) return r;
			} else {
				if (c > h) {
					if (t.charCodeAt(l + m) === be) return r.slice(l + m + 1);
					if (m === 2) return r.slice(l + m);
				}
				a > h && (e.charCodeAt(i + m) === be ? f = m : m === 2 && (f = 3)), f === -1 && (f = 0);
			}
			let g = "";
			for (m = i + f + 1; m <= s; ++m) (m === s || e.charCodeAt(m) === be) && (g += g.length === 0 ? ".." : "\\..");
			return l += f, g.length > 0 ? `${g}${r.slice(l, o)}` : (r.charCodeAt(l) === be && ++l, r.slice(l, o));
		},
		toNamespacedPath(e) {
			if (typeof e != "string" || e.length === 0) return e;
			const t = fe.resolve(e);
			if (t.length <= 2) return e;
			if (t.charCodeAt(0) === be) {
				if (t.charCodeAt(1) === be) {
					const n = t.charCodeAt(2);
					if (n !== tu && n !== et) return `\\\\?\\UNC\\${t.slice(2)}`;
				}
			} else if (Ue(t.charCodeAt(0)) && t.charCodeAt(1) === $e && t.charCodeAt(2) === be) return `\\\\?\\${t}`;
			return t;
		},
		dirname(e) {
			ee(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = -1, r = 0;
			const i = e.charCodeAt(0);
			if (t === 1) return W(i) ? e : ".";
			if (W(i)) {
				if (n = r = 1, W(e.charCodeAt(1))) {
					let l = 2, o = l;
					for (; l < t && !W(e.charCodeAt(l));) l++;
					if (l < t && l !== o) {
						for (o = l; l < t && W(e.charCodeAt(l));) l++;
						if (l < t && l !== o) {
							for (o = l; l < t && !W(e.charCodeAt(l));) l++;
							if (l === t) return e;
							l !== o && (n = r = l + 1);
						}
					}
				}
			} else Ue(i) && e.charCodeAt(1) === $e && (n = t > 2 && W(e.charCodeAt(2)) ? 3 : 2, r = n);
			let s = -1, a = !0;
			for (let l = t - 1; l >= r; --l) if (W(e.charCodeAt(l))) {
				if (!a) {
					s = l;
					break;
				}
			} else a = !1;
			if (s === -1) {
				if (n === -1) return ".";
				s = n;
			}
			return e.slice(0, s);
		},
		basename(e, t) {
			t !== void 0 && ee(t, "suffix"), ee(e, "path");
			let n = 0, r = -1, i = !0, s;
			if (e.length >= 2 && Ue(e.charCodeAt(0)) && e.charCodeAt(1) === $e && (n = 2), t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let a = t.length - 1, l = -1;
				for (s = e.length - 1; s >= n; --s) {
					const o = e.charCodeAt(s);
					if (W(o)) {
						if (!i) {
							n = s + 1;
							break;
						}
					} else l === -1 && (i = !1, l = s + 1), a >= 0 && (o === t.charCodeAt(a) ? --a === -1 && (r = s) : (a = -1, r = l));
				}
				return n === r ? r = l : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (s = e.length - 1; s >= n; --s) if (W(e.charCodeAt(s))) {
				if (!i) {
					n = s + 1;
					break;
				}
			} else r === -1 && (i = !1, r = s + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			ee(e, "path");
			let t = 0, n = -1, r = 0, i = -1, s = !0, a = 0;
			e.length >= 2 && e.charCodeAt(1) === $e && Ue(e.charCodeAt(0)) && (t = r = 2);
			for (let l = e.length - 1; l >= t; --l) {
				const o = e.charCodeAt(l);
				if (W(o)) {
					if (!s) {
						r = l + 1;
						break;
					}
					continue;
				}
				i === -1 && (s = !1, i = l + 1), o === et ? n === -1 ? n = l : a !== 1 && (a = 1) : n !== -1 && (a = -1);
			}
			return n === -1 || i === -1 || a === 0 || a === 1 && n === i - 1 && n === r + 1 ? "" : e.slice(n, i);
		},
		format: Qi.bind(null, "\\"),
		parse(e) {
			ee(e, "path");
			const t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			const n = e.length;
			let r = 0, i = e.charCodeAt(0);
			if (n === 1) return W(i) ? (t.root = t.dir = e, t) : (t.base = t.name = e, t);
			if (W(i)) {
				if (r = 1, W(e.charCodeAt(1))) {
					let f = 2, m = f;
					for (; f < n && !W(e.charCodeAt(f));) f++;
					if (f < n && f !== m) {
						for (m = f; f < n && W(e.charCodeAt(f));) f++;
						if (f < n && f !== m) {
							for (m = f; f < n && !W(e.charCodeAt(f));) f++;
							f === n ? r = f : f !== m && (r = f + 1);
						}
					}
				}
			} else if (Ue(i) && e.charCodeAt(1) === $e) {
				if (n <= 2) return t.root = t.dir = e, t;
				if (r = 2, W(e.charCodeAt(2))) {
					if (n === 3) return t.root = t.dir = e, t;
					r = 3;
				}
			}
			r > 0 && (t.root = e.slice(0, r));
			let s = -1, a = r, l = -1, o = !0, c = e.length - 1, h = 0;
			for (; c >= r; --c) {
				if (i = e.charCodeAt(c), W(i)) {
					if (!o) {
						a = c + 1;
						break;
					}
					continue;
				}
				l === -1 && (o = !1, l = c + 1), i === et ? s === -1 ? s = c : h !== 1 && (h = 1) : s !== -1 && (h = -1);
			}
			return l !== -1 && (s === -1 || h === 0 || h === 1 && s === l - 1 && s === a + 1 ? t.base = t.name = e.slice(a, l) : (t.name = e.slice(a, s), t.base = e.slice(a, l), t.ext = e.slice(s, l))), a > 0 && a !== r ? t.dir = e.slice(0, a - 1) : t.dir = t.root, t;
		},
		sep: "\\",
		delimiter: ";",
		win32: null,
		posix: null
	}, iu = (() => {
		if (Be) {
			const e = /\\/g;
			return () => {
				const t = fn().replace(e, "/");
				return t.slice(t.indexOf("/"));
			};
		}
		return () => fn();
	})(), he = {
		resolve(...e) {
			let t = "", n = !1;
			for (let r = e.length - 1; r >= 0 && !n; r--) {
				const i = e[r];
				ee(i, `paths[${r}]`), i.length !== 0 && (t = `${i}/${t}`, n = i.charCodeAt(0) === oe);
			}
			if (!n) {
				const r = iu();
				t = `${r}/${t}`, n = r.charCodeAt(0) === oe;
			}
			return t = pn(t, !n, "/", mr), n ? `/${t}` : t.length > 0 ? t : ".";
		},
		normalize(e) {
			if (ee(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === oe, n = e.charCodeAt(e.length - 1) === oe;
			return e = pn(e, !t, "/", mr), e.length === 0 ? t ? "/" : n ? "./" : "." : (n && (e += "/"), t ? `/${e}` : e);
		},
		isAbsolute(e) {
			return ee(e, "path"), e.length > 0 && e.charCodeAt(0) === oe;
		},
		join(...e) {
			if (e.length === 0) return ".";
			const t = [];
			for (let n = 0; n < e.length; ++n) {
				const r = e[n];
				ee(r, "path"), r.length > 0 && t.push(r);
			}
			return t.length === 0 ? "." : he.normalize(t.join("/"));
		},
		relative(e, t) {
			if (ee(e, "from"), ee(t, "to"), e === t || (e = he.resolve(e), t = he.resolve(t), e === t)) return "";
			const n = 1, r = e.length, i = r - n, s = 1, a = t.length - s, l = i < a ? i : a;
			let o = -1, c = 0;
			for (; c < l; c++) {
				const f = e.charCodeAt(n + c);
				if (f !== t.charCodeAt(s + c)) break;
				f === oe && (o = c);
			}
			if (c === l) if (a > l) {
				if (t.charCodeAt(s + c) === oe) return t.slice(s + c + 1);
				if (c === 0) return t.slice(s + c);
			} else i > l && (e.charCodeAt(n + c) === oe ? o = c : c === 0 && (o = 0));
			let h = "";
			for (c = n + o + 1; c <= r; ++c) (c === r || e.charCodeAt(c) === oe) && (h += h.length === 0 ? ".." : "/..");
			return `${h}${t.slice(s + o)}`;
		},
		toNamespacedPath(e) {
			return e;
		},
		dirname(e) {
			if (ee(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === oe;
			let n = -1, r = !0;
			for (let i = e.length - 1; i >= 1; --i) if (e.charCodeAt(i) === oe) {
				if (!r) {
					n = i;
					break;
				}
			} else r = !1;
			return n === -1 ? t ? "/" : "." : t && n === 1 ? "//" : e.slice(0, n);
		},
		basename(e, t) {
			t !== void 0 && ee(t, "suffix"), ee(e, "path");
			let n = 0, r = -1, i = !0, s;
			if (t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let a = t.length - 1, l = -1;
				for (s = e.length - 1; s >= 0; --s) {
					const o = e.charCodeAt(s);
					if (o === oe) {
						if (!i) {
							n = s + 1;
							break;
						}
					} else l === -1 && (i = !1, l = s + 1), a >= 0 && (o === t.charCodeAt(a) ? --a === -1 && (r = s) : (a = -1, r = l));
				}
				return n === r ? r = l : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (s = e.length - 1; s >= 0; --s) if (e.charCodeAt(s) === oe) {
				if (!i) {
					n = s + 1;
					break;
				}
			} else r === -1 && (i = !1, r = s + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			ee(e, "path");
			let t = -1, n = 0, r = -1, i = !0, s = 0;
			for (let a = e.length - 1; a >= 0; --a) {
				const l = e[a];
				if (l === "/") {
					if (!i) {
						n = a + 1;
						break;
					}
					continue;
				}
				r === -1 && (i = !1, r = a + 1), l === "." ? t === -1 ? t = a : s !== 1 && (s = 1) : t !== -1 && (s = -1);
			}
			return t === -1 || r === -1 || s === 0 || s === 1 && t === r - 1 && t === n + 1 ? "" : e.slice(t, r);
		},
		format: Qi.bind(null, "/"),
		parse(e) {
			ee(e, "path");
			const t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			const n = e.charCodeAt(0) === oe;
			let r;
			n ? (t.root = "/", r = 1) : r = 0;
			let i = -1, s = 0, a = -1, l = !0, o = e.length - 1, c = 0;
			for (; o >= r; --o) {
				const h = e.charCodeAt(o);
				if (h === oe) {
					if (!l) {
						s = o + 1;
						break;
					}
					continue;
				}
				a === -1 && (l = !1, a = o + 1), h === et ? i === -1 ? i = o : c !== 1 && (c = 1) : i !== -1 && (c = -1);
			}
			if (a !== -1) {
				const h = s === 0 && n ? 1 : s;
				i === -1 || c === 0 || c === 1 && i === a - 1 && i === s + 1 ? t.base = t.name = e.slice(h, a) : (t.name = e.slice(h, i), t.base = e.slice(h, a), t.ext = e.slice(i, a));
			}
			return s > 0 ? t.dir = e.slice(0, s - 1) : n && (t.dir = "/"), t;
		},
		sep: "/",
		delimiter: ":",
		win32: null,
		posix: null
	};
	he.win32 = fe.win32 = fe, he.posix = fe.posix = he;
	Be ? fe.normalize : he.normalize;
	const su = Be ? fe.join : he.join;
	Be ? fe.resolve : he.resolve;
	Be ? fe.relative : he.relative;
	Be ? fe.dirname : he.dirname;
	Be ? fe.basename : he.basename;
	Be ? fe.extname : he.extname;
	Be ? fe.sep : he.sep;
	const au = /^\w[\w\d+.-]*$/, ou = /^\//, lu = /^\/\//;
	function uu(e, t) {
		if (!e.scheme && t) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);
		if (e.scheme && !au.test(e.scheme)) {
			const n = [...e.scheme.matchAll(/[^\w\d+.-]/gu)], r = n.length > 0 ? ` Found '${n[0][0]}' at index ${n[0].index} (${n.length} total)` : "";
			throw new Error(`[UriError]: Scheme contains illegal characters.${r} (len:${e.scheme.length})`);
		}
		if (e.path) {
			if (e.authority) {
				if (!ou.test(e.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
			} else if (lu.test(e.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
		}
	}
	function cu(e, t) {
		return !e && !t ? "file" : e;
	}
	function fu(e, t) {
		switch (e) {
			case "https":
			case "http":
			case "file": t ? t[0] !== ke && (t = ke + t) : t = ke;
		}
		return t;
	}
	const Y = "", ke = "/", hu = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	var qe = class On {
		static isUri(t) {
			return t instanceof On ? !0 : !t || typeof t != "object" ? !1 : typeof t.authority == "string" && typeof t.fragment == "string" && typeof t.path == "string" && typeof t.query == "string" && typeof t.scheme == "string" && typeof t.fsPath == "string" && typeof t.with == "function" && typeof t.toString == "function";
		}
		constructor(t, n, r, i, s, a = !1) {
			typeof t == "object" ? (this.scheme = t.scheme || Y, this.authority = t.authority || Y, this.path = t.path || Y, this.query = t.query || Y, this.fragment = t.fragment || Y) : (this.scheme = cu(t, a), this.authority = n || Y, this.path = fu(this.scheme, r || Y), this.query = i || Y, this.fragment = s || Y, uu(this, a));
		}
		get fsPath() {
			return gr(this, !1);
		}
		with(t) {
			if (!t) return this;
			let { scheme: n, authority: r, path: i, query: s, fragment: a } = t;
			return n === void 0 ? n = this.scheme : n === null && (n = Y), r === void 0 ? r = this.authority : r === null && (r = Y), i === void 0 ? i = this.path : i === null && (i = Y), s === void 0 ? s = this.query : s === null && (s = Y), a === void 0 ? a = this.fragment : a === null && (a = Y), n === this.scheme && r === this.authority && i === this.path && s === this.query && a === this.fragment ? this : new gt(n, r, i, s, a);
		}
		static parse(t, n = !1) {
			const r = hu.exec(t);
			return r ? new gt(r[2] || Y, bn(r[4] || Y), bn(r[5] || Y), bn(r[7] || Y), bn(r[9] || Y), n) : new gt(Y, Y, Y, Y, Y);
		}
		static file(t) {
			let n = Y;
			if (Dt && (t = t.replace(/\\/g, ke)), t[0] === ke && t[1] === ke) {
				const r = t.indexOf(ke, 2);
				r === -1 ? (n = t.substring(2), t = ke) : (n = t.substring(2, r), t = t.substring(r) || ke);
			}
			return new gt("file", n, t, Y, Y);
		}
		static from(t, n) {
			return new gt(t.scheme, t.authority, t.path, t.query, t.fragment, n);
		}
		static joinPath(t, ...n) {
			if (!t.path) throw new Error(`[UriError]: cannot call joinPath on URI without path: ${t.toString()}`);
			let r;
			return Dt && t.scheme === "file" ? r = On.file(fe.join(gr(t, !0), ...n)).path : r = he.join(t.path, ...n), t.with({ path: r });
		}
		toString(t = !1) {
			return dr(this, t);
		}
		toJSON() {
			return this;
		}
		static revive(t) {
			if (t) {
				if (t instanceof On) return t;
				{
					const n = new gt(t);
					return n._formatted = t.external ?? null, n._fsPath = t._sep === Yi ? t.fsPath ?? null : null, n;
				}
			} else return t;
		}
	};
	const Yi = Dt ? 1 : void 0;
	var gt = class extends qe {
		constructor() {
			super(...arguments), this._formatted = null, this._fsPath = null;
		}
		get fsPath() {
			return this._fsPath || (this._fsPath = gr(this, !1)), this._fsPath;
		}
		toString(e = !1) {
			return e ? dr(this, !0) : (this._formatted || (this._formatted = dr(this, !1)), this._formatted);
		}
		toJSON() {
			const e = { $mid: 1 };
			return this._fsPath && (e.fsPath = this._fsPath, e._sep = Yi), this._formatted && (e.external = this._formatted), this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e;
		}
	};
	const Zi = {
		58: "%3A",
		47: "%2F",
		63: "%3F",
		35: "%23",
		91: "%5B",
		93: "%5D",
		64: "%40",
		33: "%21",
		36: "%24",
		38: "%26",
		39: "%27",
		40: "%28",
		41: "%29",
		42: "%2A",
		43: "%2B",
		44: "%2C",
		59: "%3B",
		61: "%3D",
		32: "%20"
	};
	function Ki(e, t, n) {
		let r, i = -1;
		for (let s = 0; s < e.length; s++) {
			const a = e.charCodeAt(s);
			if (a >= 97 && a <= 122 || a >= 65 && a <= 90 || a >= 48 && a <= 57 || a === 45 || a === 46 || a === 95 || a === 126 || t && a === 47 || n && a === 91 || n && a === 93 || n && a === 58) i !== -1 && (r += encodeURIComponent(e.substring(i, s)), i = -1), r !== void 0 && (r += e.charAt(s));
			else {
				r === void 0 && (r = e.substr(0, s));
				const l = Zi[a];
				l !== void 0 ? (i !== -1 && (r += encodeURIComponent(e.substring(i, s)), i = -1), r += l) : i === -1 && (i = s);
			}
		}
		return i !== -1 && (r += encodeURIComponent(e.substring(i))), r !== void 0 ? r : e;
	}
	function mu(e) {
		let t;
		for (let n = 0; n < e.length; n++) {
			const r = e.charCodeAt(n);
			r === 35 || r === 63 ? (t === void 0 && (t = e.substr(0, n)), t += Zi[r]) : t !== void 0 && (t += e[n]);
		}
		return t !== void 0 ? t : e;
	}
	function gr(e, t) {
		let n;
		return e.authority && e.path.length > 1 && e.scheme === "file" ? n = `//${e.authority}${e.path}` : e.path.charCodeAt(0) === 47 && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122) && e.path.charCodeAt(2) === 58 ? t ? n = e.path.substr(1) : n = e.path[1].toLowerCase() + e.path.substr(2) : n = e.path, Dt && (n = n.replace(/\//g, "\\")), n;
	}
	function dr(e, t) {
		const n = t ? mu : Ki;
		let r = "", { scheme: i, authority: s, path: a, query: l, fragment: o } = e;
		if (i && (r += i, r += ":"), (s || i === "file") && (r += ke, r += ke), s) {
			let c = s.indexOf("@");
			if (c !== -1) {
				const h = s.substr(0, c);
				s = s.substr(c + 1), c = h.lastIndexOf(":"), c === -1 ? r += n(h, !1, !1) : (r += n(h.substr(0, c), !1, !1), r += ":", r += n(h.substr(c + 1), !1, !0)), r += "@";
			}
			s = s.toLowerCase(), c = s.lastIndexOf(":"), c === -1 ? r += n(s, !1, !0) : (r += n(s.substr(0, c), !1, !0), r += s.substr(c));
		}
		if (a) {
			if (a.length >= 3 && a.charCodeAt(0) === 47 && a.charCodeAt(2) === 58) {
				const c = a.charCodeAt(1);
				c >= 65 && c <= 90 && (a = `/${String.fromCharCode(c + 32)}:${a.substr(3)}`);
			} else if (a.length >= 2 && a.charCodeAt(1) === 58) {
				const c = a.charCodeAt(0);
				c >= 65 && c <= 90 && (a = `${String.fromCharCode(c + 32)}:${a.substr(2)}`);
			}
			r += n(a, !0, !1);
		}
		return l && (r += "?", r += n(l, !1, !1)), o && (r += "#", r += t ? o : Ki(o, !1, !1)), r;
	}
	function es(e) {
		try {
			return decodeURIComponent(e);
		} catch {
			return e.length > 3 ? e.substr(0, 3) + es(e.substr(3)) : e;
		}
	}
	const ts = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
	function bn(e) {
		return e.match(ts) ? e.replace(ts, (t) => es(t)) : e;
	}
	var gu = class Ae extends q {
		constructor(t, n, r, i) {
			super(t, n, r, i), this.selectionStartLineNumber = t, this.selectionStartColumn = n, this.positionLineNumber = r, this.positionColumn = i;
		}
		toString() {
			return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
		}
		equalsSelection(t) {
			return Ae.selectionsEqual(this, t);
		}
		static selectionsEqual(t, n) {
			return t.selectionStartLineNumber === n.selectionStartLineNumber && t.selectionStartColumn === n.selectionStartColumn && t.positionLineNumber === n.positionLineNumber && t.positionColumn === n.positionColumn;
		}
		getDirection() {
			return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
		}
		setEndPosition(t, n) {
			return this.getDirection() === 0 ? new Ae(this.startLineNumber, this.startColumn, t, n) : new Ae(t, n, this.startLineNumber, this.startColumn);
		}
		getPosition() {
			return new G(this.positionLineNumber, this.positionColumn);
		}
		getSelectionStart() {
			return new G(this.selectionStartLineNumber, this.selectionStartColumn);
		}
		setStartPosition(t, n) {
			return this.getDirection() === 0 ? new Ae(t, n, this.endLineNumber, this.endColumn) : new Ae(this.endLineNumber, this.endColumn, t, n);
		}
		static fromPositions(t, n = t) {
			return new Ae(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static fromRange(t, n) {
			return n === 0 ? new Ae(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : new Ae(t.endLineNumber, t.endColumn, t.startLineNumber, t.startColumn);
		}
		static liftSelection(t) {
			return new Ae(t.selectionStartLineNumber, t.selectionStartColumn, t.positionLineNumber, t.positionColumn);
		}
		static selectionsArrEqual(t, n) {
			if (t && !n || !t && n) return !1;
			if (!t && !n) return !0;
			if (t.length !== n.length) return !1;
			for (let r = 0, i = t.length; r < i; r++) if (!this.selectionsEqual(t[r], n[r])) return !1;
			return !0;
		}
		static isISelection(t) {
			return !!t && typeof t.selectionStartLineNumber == "number" && typeof t.selectionStartColumn == "number" && typeof t.positionLineNumber == "number" && typeof t.positionColumn == "number";
		}
		static createWithDirection(t, n, r, i, s) {
			return s === 0 ? new Ae(t, n, r, i) : new Ae(r, i, t, n);
		}
	};
	const ns = Object.create(null);
	function u(e, t) {
		if (qo(t)) {
			const n = ns[t];
			if (n === void 0) throw new Error(`${e} references an unknown codicon: ${t}`);
			t = n;
		}
		return ns[e] = t, { id: e };
	}
	const du = {
		add: u("add", 6e4),
		plus: u("plus", 6e4),
		gistNew: u("gist-new", 6e4),
		repoCreate: u("repo-create", 6e4),
		lightbulb: u("lightbulb", 60001),
		lightBulb: u("light-bulb", 60001),
		repo: u("repo", 60002),
		repoDelete: u("repo-delete", 60002),
		gistFork: u("gist-fork", 60003),
		repoForked: u("repo-forked", 60003),
		gitPullRequest: u("git-pull-request", 60004),
		gitPullRequestAbandoned: u("git-pull-request-abandoned", 60004),
		recordKeys: u("record-keys", 60005),
		keyboard: u("keyboard", 60005),
		tag: u("tag", 60006),
		gitPullRequestLabel: u("git-pull-request-label", 60006),
		tagAdd: u("tag-add", 60006),
		tagRemove: u("tag-remove", 60006),
		person: u("person", 60007),
		personFollow: u("person-follow", 60007),
		personOutline: u("person-outline", 60007),
		personFilled: u("person-filled", 60007),
		sourceControl: u("source-control", 60008),
		mirror: u("mirror", 60009),
		mirrorPublic: u("mirror-public", 60009),
		star: u("star", 60010),
		starAdd: u("star-add", 60010),
		starDelete: u("star-delete", 60010),
		starEmpty: u("star-empty", 60010),
		comment: u("comment", 60011),
		commentAdd: u("comment-add", 60011),
		alert: u("alert", 60012),
		warning: u("warning", 60012),
		search: u("search", 60013),
		searchSave: u("search-save", 60013),
		logOut: u("log-out", 60014),
		signOut: u("sign-out", 60014),
		logIn: u("log-in", 60015),
		signIn: u("sign-in", 60015),
		eye: u("eye", 60016),
		eyeUnwatch: u("eye-unwatch", 60016),
		eyeWatch: u("eye-watch", 60016),
		circleFilled: u("circle-filled", 60017),
		primitiveDot: u("primitive-dot", 60017),
		closeDirty: u("close-dirty", 60017),
		debugBreakpoint: u("debug-breakpoint", 60017),
		debugBreakpointDisabled: u("debug-breakpoint-disabled", 60017),
		debugHint: u("debug-hint", 60017),
		terminalDecorationSuccess: u("terminal-decoration-success", 60017),
		primitiveSquare: u("primitive-square", 60018),
		edit: u("edit", 60019),
		pencil: u("pencil", 60019),
		info: u("info", 60020),
		issueOpened: u("issue-opened", 60020),
		gistPrivate: u("gist-private", 60021),
		gitForkPrivate: u("git-fork-private", 60021),
		lock: u("lock", 60021),
		mirrorPrivate: u("mirror-private", 60021),
		close: u("close", 60022),
		removeClose: u("remove-close", 60022),
		x: u("x", 60022),
		repoSync: u("repo-sync", 60023),
		sync: u("sync", 60023),
		clone: u("clone", 60024),
		desktopDownload: u("desktop-download", 60024),
		beaker: u("beaker", 60025),
		microscope: u("microscope", 60025),
		vm: u("vm", 60026),
		deviceDesktop: u("device-desktop", 60026),
		file: u("file", 60027),
		more: u("more", 60028),
		ellipsis: u("ellipsis", 60028),
		kebabHorizontal: u("kebab-horizontal", 60028),
		mailReply: u("mail-reply", 60029),
		reply: u("reply", 60029),
		organization: u("organization", 60030),
		organizationFilled: u("organization-filled", 60030),
		organizationOutline: u("organization-outline", 60030),
		newFile: u("new-file", 60031),
		fileAdd: u("file-add", 60031),
		newFolder: u("new-folder", 60032),
		fileDirectoryCreate: u("file-directory-create", 60032),
		trash: u("trash", 60033),
		trashcan: u("trashcan", 60033),
		history: u("history", 60034),
		clock: u("clock", 60034),
		folder: u("folder", 60035),
		fileDirectory: u("file-directory", 60035),
		symbolFolder: u("symbol-folder", 60035),
		logoGithub: u("logo-github", 60036),
		markGithub: u("mark-github", 60036),
		github: u("github", 60036),
		terminal: u("terminal", 60037),
		console: u("console", 60037),
		repl: u("repl", 60037),
		zap: u("zap", 60038),
		symbolEvent: u("symbol-event", 60038),
		error: u("error", 60039),
		stop: u("stop", 60039),
		variable: u("variable", 60040),
		symbolVariable: u("symbol-variable", 60040),
		array: u("array", 60042),
		symbolArray: u("symbol-array", 60042),
		symbolModule: u("symbol-module", 60043),
		symbolPackage: u("symbol-package", 60043),
		symbolNamespace: u("symbol-namespace", 60043),
		symbolObject: u("symbol-object", 60043),
		symbolMethod: u("symbol-method", 60044),
		symbolFunction: u("symbol-function", 60044),
		symbolConstructor: u("symbol-constructor", 60044),
		symbolBoolean: u("symbol-boolean", 60047),
		symbolNull: u("symbol-null", 60047),
		symbolNumeric: u("symbol-numeric", 60048),
		symbolNumber: u("symbol-number", 60048),
		symbolStructure: u("symbol-structure", 60049),
		symbolStruct: u("symbol-struct", 60049),
		symbolParameter: u("symbol-parameter", 60050),
		symbolTypeParameter: u("symbol-type-parameter", 60050),
		symbolKey: u("symbol-key", 60051),
		symbolText: u("symbol-text", 60051),
		symbolReference: u("symbol-reference", 60052),
		goToFile: u("go-to-file", 60052),
		symbolEnum: u("symbol-enum", 60053),
		symbolValue: u("symbol-value", 60053),
		symbolRuler: u("symbol-ruler", 60054),
		symbolUnit: u("symbol-unit", 60054),
		activateBreakpoints: u("activate-breakpoints", 60055),
		archive: u("archive", 60056),
		arrowBoth: u("arrow-both", 60057),
		arrowDown: u("arrow-down", 60058),
		arrowLeft: u("arrow-left", 60059),
		arrowRight: u("arrow-right", 60060),
		arrowSmallDown: u("arrow-small-down", 60061),
		arrowSmallLeft: u("arrow-small-left", 60062),
		arrowSmallRight: u("arrow-small-right", 60063),
		arrowSmallUp: u("arrow-small-up", 60064),
		arrowUp: u("arrow-up", 60065),
		bell: u("bell", 60066),
		bold: u("bold", 60067),
		book: u("book", 60068),
		bookmark: u("bookmark", 60069),
		debugBreakpointConditionalUnverified: u("debug-breakpoint-conditional-unverified", 60070),
		debugBreakpointConditional: u("debug-breakpoint-conditional", 60071),
		debugBreakpointConditionalDisabled: u("debug-breakpoint-conditional-disabled", 60071),
		debugBreakpointDataUnverified: u("debug-breakpoint-data-unverified", 60072),
		debugBreakpointData: u("debug-breakpoint-data", 60073),
		debugBreakpointDataDisabled: u("debug-breakpoint-data-disabled", 60073),
		debugBreakpointLogUnverified: u("debug-breakpoint-log-unverified", 60074),
		debugBreakpointLog: u("debug-breakpoint-log", 60075),
		debugBreakpointLogDisabled: u("debug-breakpoint-log-disabled", 60075),
		briefcase: u("briefcase", 60076),
		broadcast: u("broadcast", 60077),
		browser: u("browser", 60078),
		bug: u("bug", 60079),
		calendar: u("calendar", 60080),
		caseSensitive: u("case-sensitive", 60081),
		check: u("check", 60082),
		checklist: u("checklist", 60083),
		chevronDown: u("chevron-down", 60084),
		chevronLeft: u("chevron-left", 60085),
		chevronRight: u("chevron-right", 60086),
		chevronUp: u("chevron-up", 60087),
		chromeClose: u("chrome-close", 60088),
		chromeMaximize: u("chrome-maximize", 60089),
		chromeMinimize: u("chrome-minimize", 60090),
		chromeRestore: u("chrome-restore", 60091),
		circleOutline: u("circle-outline", 60092),
		circle: u("circle", 60092),
		debugBreakpointUnverified: u("debug-breakpoint-unverified", 60092),
		terminalDecorationIncomplete: u("terminal-decoration-incomplete", 60092),
		circleSlash: u("circle-slash", 60093),
		circuitBoard: u("circuit-board", 60094),
		clearAll: u("clear-all", 60095),
		clippy: u("clippy", 60096),
		closeAll: u("close-all", 60097),
		cloudDownload: u("cloud-download", 60098),
		cloudUpload: u("cloud-upload", 60099),
		code: u("code", 60100),
		collapseAll: u("collapse-all", 60101),
		colorMode: u("color-mode", 60102),
		commentDiscussion: u("comment-discussion", 60103),
		creditCard: u("credit-card", 60105),
		dash: u("dash", 60108),
		dashboard: u("dashboard", 60109),
		database: u("database", 60110),
		debugContinue: u("debug-continue", 60111),
		debugDisconnect: u("debug-disconnect", 60112),
		debugPause: u("debug-pause", 60113),
		debugRestart: u("debug-restart", 60114),
		debugStart: u("debug-start", 60115),
		debugStepInto: u("debug-step-into", 60116),
		debugStepOut: u("debug-step-out", 60117),
		debugStepOver: u("debug-step-over", 60118),
		debugStop: u("debug-stop", 60119),
		debug: u("debug", 60120),
		deviceCameraVideo: u("device-camera-video", 60121),
		deviceCamera: u("device-camera", 60122),
		deviceMobile: u("device-mobile", 60123),
		diffAdded: u("diff-added", 60124),
		diffIgnored: u("diff-ignored", 60125),
		diffModified: u("diff-modified", 60126),
		diffRemoved: u("diff-removed", 60127),
		diffRenamed: u("diff-renamed", 60128),
		diff: u("diff", 60129),
		diffSidebyside: u("diff-sidebyside", 60129),
		discard: u("discard", 60130),
		editorLayout: u("editor-layout", 60131),
		emptyWindow: u("empty-window", 60132),
		exclude: u("exclude", 60133),
		extensions: u("extensions", 60134),
		eyeClosed: u("eye-closed", 60135),
		fileBinary: u("file-binary", 60136),
		fileCode: u("file-code", 60137),
		fileMedia: u("file-media", 60138),
		filePdf: u("file-pdf", 60139),
		fileSubmodule: u("file-submodule", 60140),
		fileSymlinkDirectory: u("file-symlink-directory", 60141),
		fileSymlinkFile: u("file-symlink-file", 60142),
		fileZip: u("file-zip", 60143),
		files: u("files", 60144),
		filter: u("filter", 60145),
		flame: u("flame", 60146),
		foldDown: u("fold-down", 60147),
		foldUp: u("fold-up", 60148),
		fold: u("fold", 60149),
		folderActive: u("folder-active", 60150),
		folderOpened: u("folder-opened", 60151),
		gear: u("gear", 60152),
		gift: u("gift", 60153),
		gistSecret: u("gist-secret", 60154),
		gist: u("gist", 60155),
		gitCommit: u("git-commit", 60156),
		gitCompare: u("git-compare", 60157),
		compareChanges: u("compare-changes", 60157),
		gitMerge: u("git-merge", 60158),
		githubAction: u("github-action", 60159),
		githubAlt: u("github-alt", 60160),
		globe: u("globe", 60161),
		grabber: u("grabber", 60162),
		graph: u("graph", 60163),
		gripper: u("gripper", 60164),
		heart: u("heart", 60165),
		home: u("home", 60166),
		horizontalRule: u("horizontal-rule", 60167),
		hubot: u("hubot", 60168),
		inbox: u("inbox", 60169),
		issueReopened: u("issue-reopened", 60171),
		issues: u("issues", 60172),
		italic: u("italic", 60173),
		jersey: u("jersey", 60174),
		json: u("json", 60175),
		bracket: u("bracket", 60175),
		kebabVertical: u("kebab-vertical", 60176),
		key: u("key", 60177),
		law: u("law", 60178),
		lightbulbAutofix: u("lightbulb-autofix", 60179),
		linkExternal: u("link-external", 60180),
		link: u("link", 60181),
		listOrdered: u("list-ordered", 60182),
		listUnordered: u("list-unordered", 60183),
		liveShare: u("live-share", 60184),
		loading: u("loading", 60185),
		location: u("location", 60186),
		mailRead: u("mail-read", 60187),
		mail: u("mail", 60188),
		markdown: u("markdown", 60189),
		megaphone: u("megaphone", 60190),
		mention: u("mention", 60191),
		milestone: u("milestone", 60192),
		gitPullRequestMilestone: u("git-pull-request-milestone", 60192),
		mortarBoard: u("mortar-board", 60193),
		move: u("move", 60194),
		multipleWindows: u("multiple-windows", 60195),
		mute: u("mute", 60196),
		noNewline: u("no-newline", 60197),
		note: u("note", 60198),
		octoface: u("octoface", 60199),
		openPreview: u("open-preview", 60200),
		package: u("package", 60201),
		paintcan: u("paintcan", 60202),
		pin: u("pin", 60203),
		play: u("play", 60204),
		run: u("run", 60204),
		plug: u("plug", 60205),
		preserveCase: u("preserve-case", 60206),
		preview: u("preview", 60207),
		project: u("project", 60208),
		pulse: u("pulse", 60209),
		question: u("question", 60210),
		quote: u("quote", 60211),
		radioTower: u("radio-tower", 60212),
		reactions: u("reactions", 60213),
		references: u("references", 60214),
		refresh: u("refresh", 60215),
		regex: u("regex", 60216),
		remoteExplorer: u("remote-explorer", 60217),
		remote: u("remote", 60218),
		remove: u("remove", 60219),
		replaceAll: u("replace-all", 60220),
		replace: u("replace", 60221),
		repoClone: u("repo-clone", 60222),
		repoForcePush: u("repo-force-push", 60223),
		repoPull: u("repo-pull", 60224),
		repoPush: u("repo-push", 60225),
		report: u("report", 60226),
		requestChanges: u("request-changes", 60227),
		rocket: u("rocket", 60228),
		rootFolderOpened: u("root-folder-opened", 60229),
		rootFolder: u("root-folder", 60230),
		rss: u("rss", 60231),
		ruby: u("ruby", 60232),
		saveAll: u("save-all", 60233),
		saveAs: u("save-as", 60234),
		save: u("save", 60235),
		screenFull: u("screen-full", 60236),
		screenNormal: u("screen-normal", 60237),
		searchStop: u("search-stop", 60238),
		server: u("server", 60240),
		settingsGear: u("settings-gear", 60241),
		settings: u("settings", 60242),
		shield: u("shield", 60243),
		smiley: u("smiley", 60244),
		sortPrecedence: u("sort-precedence", 60245),
		splitHorizontal: u("split-horizontal", 60246),
		splitVertical: u("split-vertical", 60247),
		squirrel: u("squirrel", 60248),
		starFull: u("star-full", 60249),
		starHalf: u("star-half", 60250),
		symbolClass: u("symbol-class", 60251),
		symbolColor: u("symbol-color", 60252),
		symbolConstant: u("symbol-constant", 60253),
		symbolEnumMember: u("symbol-enum-member", 60254),
		symbolField: u("symbol-field", 60255),
		symbolFile: u("symbol-file", 60256),
		symbolInterface: u("symbol-interface", 60257),
		symbolKeyword: u("symbol-keyword", 60258),
		symbolMisc: u("symbol-misc", 60259),
		symbolOperator: u("symbol-operator", 60260),
		symbolProperty: u("symbol-property", 60261),
		wrench: u("wrench", 60261),
		wrenchSubaction: u("wrench-subaction", 60261),
		symbolSnippet: u("symbol-snippet", 60262),
		tasklist: u("tasklist", 60263),
		telescope: u("telescope", 60264),
		textSize: u("text-size", 60265),
		threeBars: u("three-bars", 60266),
		thumbsdown: u("thumbsdown", 60267),
		thumbsup: u("thumbsup", 60268),
		tools: u("tools", 60269),
		triangleDown: u("triangle-down", 60270),
		triangleLeft: u("triangle-left", 60271),
		triangleRight: u("triangle-right", 60272),
		triangleUp: u("triangle-up", 60273),
		twitter: u("twitter", 60274),
		unfold: u("unfold", 60275),
		unlock: u("unlock", 60276),
		unmute: u("unmute", 60277),
		unverified: u("unverified", 60278),
		verified: u("verified", 60279),
		versions: u("versions", 60280),
		vmActive: u("vm-active", 60281),
		vmOutline: u("vm-outline", 60282),
		vmRunning: u("vm-running", 60283),
		watch: u("watch", 60284),
		whitespace: u("whitespace", 60285),
		wholeWord: u("whole-word", 60286),
		window: u("window", 60287),
		wordWrap: u("word-wrap", 60288),
		zoomIn: u("zoom-in", 60289),
		zoomOut: u("zoom-out", 60290),
		listFilter: u("list-filter", 60291),
		listFlat: u("list-flat", 60292),
		listSelection: u("list-selection", 60293),
		selection: u("selection", 60293),
		listTree: u("list-tree", 60294),
		debugBreakpointFunctionUnverified: u("debug-breakpoint-function-unverified", 60295),
		debugBreakpointFunction: u("debug-breakpoint-function", 60296),
		debugBreakpointFunctionDisabled: u("debug-breakpoint-function-disabled", 60296),
		debugStackframeActive: u("debug-stackframe-active", 60297),
		circleSmallFilled: u("circle-small-filled", 60298),
		debugStackframeDot: u("debug-stackframe-dot", 60298),
		terminalDecorationMark: u("terminal-decoration-mark", 60298),
		debugStackframe: u("debug-stackframe", 60299),
		debugStackframeFocused: u("debug-stackframe-focused", 60299),
		debugBreakpointUnsupported: u("debug-breakpoint-unsupported", 60300),
		symbolString: u("symbol-string", 60301),
		debugReverseContinue: u("debug-reverse-continue", 60302),
		debugStepBack: u("debug-step-back", 60303),
		debugRestartFrame: u("debug-restart-frame", 60304),
		debugAlt: u("debug-alt", 60305),
		callIncoming: u("call-incoming", 60306),
		callOutgoing: u("call-outgoing", 60307),
		menu: u("menu", 60308),
		expandAll: u("expand-all", 60309),
		feedback: u("feedback", 60310),
		gitPullRequestReviewer: u("git-pull-request-reviewer", 60310),
		groupByRefType: u("group-by-ref-type", 60311),
		ungroupByRefType: u("ungroup-by-ref-type", 60312),
		account: u("account", 60313),
		gitPullRequestAssignee: u("git-pull-request-assignee", 60313),
		bellDot: u("bell-dot", 60314),
		debugConsole: u("debug-console", 60315),
		library: u("library", 60316),
		output: u("output", 60317),
		runAll: u("run-all", 60318),
		syncIgnored: u("sync-ignored", 60319),
		pinned: u("pinned", 60320),
		githubInverted: u("github-inverted", 60321),
		serverProcess: u("server-process", 60322),
		serverEnvironment: u("server-environment", 60323),
		pass: u("pass", 60324),
		issueClosed: u("issue-closed", 60324),
		stopCircle: u("stop-circle", 60325),
		playCircle: u("play-circle", 60326),
		record: u("record", 60327),
		debugAltSmall: u("debug-alt-small", 60328),
		vmConnect: u("vm-connect", 60329),
		cloud: u("cloud", 60330),
		merge: u("merge", 60331),
		export: u("export", 60332),
		graphLeft: u("graph-left", 60333),
		magnet: u("magnet", 60334),
		notebook: u("notebook", 60335),
		redo: u("redo", 60336),
		checkAll: u("check-all", 60337),
		pinnedDirty: u("pinned-dirty", 60338),
		passFilled: u("pass-filled", 60339),
		circleLargeFilled: u("circle-large-filled", 60340),
		circleLarge: u("circle-large", 60341),
		circleLargeOutline: u("circle-large-outline", 60341),
		combine: u("combine", 60342),
		gather: u("gather", 60342),
		table: u("table", 60343),
		variableGroup: u("variable-group", 60344),
		typeHierarchy: u("type-hierarchy", 60345),
		typeHierarchySub: u("type-hierarchy-sub", 60346),
		typeHierarchySuper: u("type-hierarchy-super", 60347),
		gitPullRequestCreate: u("git-pull-request-create", 60348),
		runAbove: u("run-above", 60349),
		runBelow: u("run-below", 60350),
		notebookTemplate: u("notebook-template", 60351),
		debugRerun: u("debug-rerun", 60352),
		workspaceTrusted: u("workspace-trusted", 60353),
		workspaceUntrusted: u("workspace-untrusted", 60354),
		workspaceUnknown: u("workspace-unknown", 60355),
		terminalCmd: u("terminal-cmd", 60356),
		terminalDebian: u("terminal-debian", 60357),
		terminalLinux: u("terminal-linux", 60358),
		terminalPowershell: u("terminal-powershell", 60359),
		terminalTmux: u("terminal-tmux", 60360),
		terminalUbuntu: u("terminal-ubuntu", 60361),
		terminalBash: u("terminal-bash", 60362),
		arrowSwap: u("arrow-swap", 60363),
		copy: u("copy", 60364),
		personAdd: u("person-add", 60365),
		filterFilled: u("filter-filled", 60366),
		wand: u("wand", 60367),
		debugLineByLine: u("debug-line-by-line", 60368),
		inspect: u("inspect", 60369),
		layers: u("layers", 60370),
		layersDot: u("layers-dot", 60371),
		layersActive: u("layers-active", 60372),
		compass: u("compass", 60373),
		compassDot: u("compass-dot", 60374),
		compassActive: u("compass-active", 60375),
		azure: u("azure", 60376),
		issueDraft: u("issue-draft", 60377),
		gitPullRequestClosed: u("git-pull-request-closed", 60378),
		gitPullRequestDraft: u("git-pull-request-draft", 60379),
		debugAll: u("debug-all", 60380),
		debugCoverage: u("debug-coverage", 60381),
		runErrors: u("run-errors", 60382),
		folderLibrary: u("folder-library", 60383),
		debugContinueSmall: u("debug-continue-small", 60384),
		beakerStop: u("beaker-stop", 60385),
		graphLine: u("graph-line", 60386),
		graphScatter: u("graph-scatter", 60387),
		pieChart: u("pie-chart", 60388),
		bracketDot: u("bracket-dot", 60389),
		bracketError: u("bracket-error", 60390),
		lockSmall: u("lock-small", 60391),
		azureDevops: u("azure-devops", 60392),
		verifiedFilled: u("verified-filled", 60393),
		newline: u("newline", 60394),
		layout: u("layout", 60395),
		layoutActivitybarLeft: u("layout-activitybar-left", 60396),
		layoutActivitybarRight: u("layout-activitybar-right", 60397),
		layoutPanelLeft: u("layout-panel-left", 60398),
		layoutPanelCenter: u("layout-panel-center", 60399),
		layoutPanelJustify: u("layout-panel-justify", 60400),
		layoutPanelRight: u("layout-panel-right", 60401),
		layoutPanel: u("layout-panel", 60402),
		layoutSidebarLeft: u("layout-sidebar-left", 60403),
		layoutSidebarRight: u("layout-sidebar-right", 60404),
		layoutStatusbar: u("layout-statusbar", 60405),
		layoutMenubar: u("layout-menubar", 60406),
		layoutCentered: u("layout-centered", 60407),
		target: u("target", 60408),
		indent: u("indent", 60409),
		recordSmall: u("record-small", 60410),
		errorSmall: u("error-small", 60411),
		terminalDecorationError: u("terminal-decoration-error", 60411),
		arrowCircleDown: u("arrow-circle-down", 60412),
		arrowCircleLeft: u("arrow-circle-left", 60413),
		arrowCircleRight: u("arrow-circle-right", 60414),
		arrowCircleUp: u("arrow-circle-up", 60415),
		layoutSidebarRightOff: u("layout-sidebar-right-off", 60416),
		layoutPanelOff: u("layout-panel-off", 60417),
		layoutSidebarLeftOff: u("layout-sidebar-left-off", 60418),
		blank: u("blank", 60419),
		heartFilled: u("heart-filled", 60420),
		map: u("map", 60421),
		mapHorizontal: u("map-horizontal", 60421),
		foldHorizontal: u("fold-horizontal", 60421),
		mapFilled: u("map-filled", 60422),
		mapHorizontalFilled: u("map-horizontal-filled", 60422),
		foldHorizontalFilled: u("fold-horizontal-filled", 60422),
		circleSmall: u("circle-small", 60423),
		bellSlash: u("bell-slash", 60424),
		bellSlashDot: u("bell-slash-dot", 60425),
		commentUnresolved: u("comment-unresolved", 60426),
		gitPullRequestGoToChanges: u("git-pull-request-go-to-changes", 60427),
		gitPullRequestNewChanges: u("git-pull-request-new-changes", 60428),
		searchFuzzy: u("search-fuzzy", 60429),
		commentDraft: u("comment-draft", 60430),
		send: u("send", 60431),
		sparkle: u("sparkle", 60432),
		insert: u("insert", 60433),
		mic: u("mic", 60434),
		thumbsdownFilled: u("thumbsdown-filled", 60435),
		thumbsupFilled: u("thumbsup-filled", 60436),
		coffee: u("coffee", 60437),
		snake: u("snake", 60438),
		game: u("game", 60439),
		vr: u("vr", 60440),
		chip: u("chip", 60441),
		piano: u("piano", 60442),
		music: u("music", 60443),
		micFilled: u("mic-filled", 60444),
		repoFetch: u("repo-fetch", 60445),
		copilot: u("copilot", 60446),
		lightbulbSparkle: u("lightbulb-sparkle", 60447),
		robot: u("robot", 60448),
		sparkleFilled: u("sparkle-filled", 60449),
		diffSingle: u("diff-single", 60450),
		diffMultiple: u("diff-multiple", 60451),
		surroundWith: u("surround-with", 60452),
		share: u("share", 60453),
		gitStash: u("git-stash", 60454),
		gitStashApply: u("git-stash-apply", 60455),
		gitStashPop: u("git-stash-pop", 60456),
		vscode: u("vscode", 60457),
		vscodeInsiders: u("vscode-insiders", 60458),
		codeOss: u("code-oss", 60459),
		runCoverage: u("run-coverage", 60460),
		runAllCoverage: u("run-all-coverage", 60461),
		coverage: u("coverage", 60462),
		githubProject: u("github-project", 60463),
		mapVertical: u("map-vertical", 60464),
		foldVertical: u("fold-vertical", 60464),
		mapVerticalFilled: u("map-vertical-filled", 60465),
		foldVerticalFilled: u("fold-vertical-filled", 60465),
		goToSearch: u("go-to-search", 60466),
		percentage: u("percentage", 60467),
		sortPercentage: u("sort-percentage", 60467),
		attach: u("attach", 60468),
		goToEditingSession: u("go-to-editing-session", 60469),
		editSession: u("edit-session", 60470),
		codeReview: u("code-review", 60471),
		copilotWarning: u("copilot-warning", 60472),
		python: u("python", 60473),
		copilotLarge: u("copilot-large", 60474),
		copilotWarningLarge: u("copilot-warning-large", 60475),
		keyboardTab: u("keyboard-tab", 60476),
		copilotBlocked: u("copilot-blocked", 60477),
		copilotNotConnected: u("copilot-not-connected", 60478),
		flag: u("flag", 60479),
		lightbulbEmpty: u("lightbulb-empty", 60480),
		symbolMethodArrow: u("symbol-method-arrow", 60481),
		copilotUnavailable: u("copilot-unavailable", 60482),
		repoPinned: u("repo-pinned", 60483),
		keyboardTabAbove: u("keyboard-tab-above", 60484),
		keyboardTabBelow: u("keyboard-tab-below", 60485),
		gitPullRequestDone: u("git-pull-request-done", 60486),
		mcp: u("mcp", 60487),
		extensionsLarge: u("extensions-large", 60488),
		layoutPanelDock: u("layout-panel-dock", 60489),
		layoutSidebarLeftDock: u("layout-sidebar-left-dock", 60490),
		layoutSidebarRightDock: u("layout-sidebar-right-dock", 60491),
		copilotInProgress: u("copilot-in-progress", 60492),
		copilotError: u("copilot-error", 60493),
		copilotSuccess: u("copilot-success", 60494),
		chatSparkle: u("chat-sparkle", 60495),
		searchSparkle: u("search-sparkle", 60496),
		editSparkle: u("edit-sparkle", 60497),
		copilotSnooze: u("copilot-snooze", 60498),
		sendToRemoteAgent: u("send-to-remote-agent", 60499),
		commentDiscussionSparkle: u("comment-discussion-sparkle", 60500),
		chatSparkleWarning: u("chat-sparkle-warning", 60501),
		chatSparkleError: u("chat-sparkle-error", 60502),
		collection: u("collection", 60503),
		newCollection: u("new-collection", 60504),
		thinking: u("thinking", 60505),
		build: u("build", 60506),
		commentDiscussionQuote: u("comment-discussion-quote", 60507),
		cursor: u("cursor", 60508),
		eraser: u("eraser", 60509),
		fileText: u("file-text", 60510),
		quotes: u("quotes", 60512),
		rename: u("rename", 60513),
		runWithDeps: u("run-with-deps", 60514),
		debugConnected: u("debug-connected", 60515),
		strikethrough: u("strikethrough", 60516),
		openInProduct: u("open-in-product", 60517),
		indexZero: u("index-zero", 60518),
		agent: u("agent", 60519),
		editCode: u("edit-code", 60520),
		repoSelected: u("repo-selected", 60521),
		skip: u("skip", 60522),
		mergeInto: u("merge-into", 60523),
		gitBranchChanges: u("git-branch-changes", 60524),
		gitBranchStagedChanges: u("git-branch-staged-changes", 60525),
		gitBranchConflicts: u("git-branch-conflicts", 60526),
		gitBranch: u("git-branch", 60527),
		gitBranchCreate: u("git-branch-create", 60527),
		gitBranchDelete: u("git-branch-delete", 60527),
		searchLarge: u("search-large", 60528),
		terminalGitBash: u("terminal-git-bash", 60529),
		windowActive: u("window-active", 60530),
		forward: u("forward", 60531),
		download: u("download", 60532),
		clockface: u("clockface", 60533),
		unarchive: u("unarchive", 60534),
		sessionInProgress: u("session-in-progress", 60535),
		collectionSmall: u("collection-small", 60536),
		vmSmall: u("vm-small", 60537),
		cloudSmall: u("cloud-small", 60538),
		addSmall: u("add-small", 60539),
		removeSmall: u("remove-small", 60540),
		worktreeSmall: u("worktree-small", 60541),
		worktree: u("worktree", 60542),
		screenCut: u("screen-cut", 60543),
		ask: u("ask", 60544),
		openai: u("openai", 60545),
		claude: u("claude", 60546),
		openInWindow: u("open-in-window", 60547),
		newSession: u("new-session", 60548),
		terminalSecure: u("terminal-secure", 60549),
		chatImport: u("chat-import", 60550),
		chatExport: u("chat-export", 60551),
		shareWindow: u("share-window", 60552),
		circleSlashCompact: u("circle-slash-compact", 60553),
		copilotCompact: u("copilot-compact", 60554),
		folderOpenedCompact: u("folder-opened-compact", 60555),
		folderCompact: u("folder-compact", 60556),
		gearCompact: u("gear-compact", 60557),
		gitBranchCompact: u("git-branch-compact", 60558),
		libraryCompact: u("library-compact", 60559),
		recordKeysCompact: u("record-keys-compact", 60560),
		remoteCompact: u("remote-compact", 60561),
		repoForkedCompact: u("repo-forked-compact", 60562),
		repoCompact: u("repo-compact", 60563),
		shieldCompact: u("shield-compact", 60564),
		sparkleCompact: u("sparkle-compact", 60565),
		symbolColorCompact: u("symbol-color-compact", 60566),
		windowCompact: u("window-compact", 60567),
		errorCompact: u("error-compact", 60568),
		warningCompact: u("warning-compact", 60569),
		passCompact: u("pass-compact", 60570),
		important: u("important", 60571),
		importantCompact: u("important-compact", 60572),
		rocketCompact: u("rocket-compact", 60573),
		unpin: u("unpin", 60574),
		addCompact: u("add-compact", 60575),
		attachCompact: u("attach-compact", 60576),
		beakerCompact: u("beaker-compact", 60577),
		checkCompact: u("check-compact", 60578),
		checklistCompact: u("checklist-compact", 60579),
		chevronDownCompact: u("chevron-down-compact", 60580),
		chevronLeftCompact: u("chevron-left-compact", 60581),
		chevronRightCompact: u("chevron-right-compact", 60582),
		chevronUpCompact: u("chevron-up-compact", 60583),
		circleFilledCompact: u("circle-filled-compact", 60584),
		circleSmallFilledCompact: u("circle-small-filled-compact", 60585),
		closeCompact: u("close-compact", 60586),
		collapseAllCompact: u("collapse-all-compact", 60587),
		commentCompact: u("comment-compact", 60588),
		commentUnresolvedCompact: u("comment-unresolved-compact", 60589),
		debugConnectedCompact: u("debug-connected-compact", 60590),
		debugDisconnectCompact: u("debug-disconnect-compact", 60591),
		editCompact: u("edit-compact", 60592),
		fileMediaCompact: u("file-media-compact", 60593),
		gitFetch: u("git-fetch", 60594),
		lightbulbCompact: u("lightbulb-compact", 60595),
		loadingCompact: u("loading-compact", 60596),
		passFilledCompact: u("pass-filled-compact", 60597),
		projectCompact: u("project-compact", 60598),
		refreshCompact: u("refresh-compact", 60599),
		searchCompact: u("search-compact", 60600),
		sessionInProgressCompact: u("session-in-progress-compact", 60601),
		syncCompact: u("sync-compact", 60602),
		terminalCompact: u("terminal-compact", 60603),
		vmPending: u("vm-pending", 60604),
		worktreeCompact: u("worktree-compact", 60605),
		developerTools: u("developer-tools", 60606),
		cloudCompact: u("cloud-compact", 60607),
		agentCompact: u("agent-compact", 60608),
		askCompact: u("ask-compact", 60609),
		settingsCompact: u("settings-compact", 60610),
		vmCompact: u("vm-compact", 60611),
		runCompact: u("run-compact", 60612),
		gitPullRequestComment: u("git-pull-request-comment", 60613),
		gitPullRequestError: u("git-pull-request-error", 60614),
		rightPanelHide: u("right-panel-hide", 60615),
		rightPanelShow: u("right-panel-show", 60616),
		vscodeInsidersOutline: u("vscode-insiders-outline", 60617),
		vscodeOutline: u("vscode-outline", 60618),
		voiceMode: u("voice-mode", 60619),
		voiceModeCompact: u("voice-mode-compact", 60620)
	}, pu = {
		dialogError: u("dialog-error", "error"),
		dialogWarning: u("dialog-warning", "warning"),
		dialogInfo: u("dialog-info", "info"),
		dialogClose: u("dialog-close", "close"),
		treeItemExpanded: u("tree-item-expanded", "chevron-down"),
		treeFilterOnTypeOn: u("tree-filter-on-type-on", "list-filter"),
		treeFilterOnTypeOff: u("tree-filter-on-type-off", "list-selection"),
		treeFilterClear: u("tree-filter-clear", "close"),
		treeItemLoading: u("tree-item-loading", "loading"),
		menuSelection: u("menu-selection", "check"),
		menuSubmenu: u("menu-submenu", "chevron-right"),
		menuBarMore: u("menubar-more", "more"),
		scrollbarButtonLeft: u("scrollbar-button-left", "triangle-left"),
		scrollbarButtonRight: u("scrollbar-button-right", "triangle-right"),
		scrollbarButtonUp: u("scrollbar-button-up", "triangle-up"),
		scrollbarButtonDown: u("scrollbar-button-down", "triangle-down"),
		toolBarMore: u("toolbar-more", "more"),
		quickInputBack: u("quick-input-back", "arrow-left"),
		dropDownButton: u("drop-down-button", 60084),
		symbolCustomColor: u("symbol-customcolor", 60252),
		exportIcon: u("export", 60332),
		workspaceUnspecified: u("workspace-unspecified", 60355),
		newLine: u("newline", 60394),
		thumbsDownFilled: u("thumbsdown-filled", 60435),
		thumbsUpFilled: u("thumbsup-filled", 60436),
		gitFetch: u("git-fetch", 60445),
		lightbulbSparkleAutofix: u("lightbulb-sparkle-autofix", 60447),
		debugBreakpointPending: u("debug-breakpoint-pending", 60377),
		chatImport: u("chat-import", 60550),
		chatExport: u("chat-export", 60551)
	}, $ = {
		...du,
		...pu
	};
	var bu = class {
		constructor() {
			this._tokenizationSupports = /* @__PURE__ */ new Map(), this._factories = /* @__PURE__ */ new Map(), this._onDidChange = new xe(), this.onDidChange = this._onDidChange.event, this._colorMap = null;
		}
		handleChange(e) {
			this._onDidChange.fire({
				changedLanguages: e,
				changedColorMap: !1
			});
		}
		register(e, t) {
			return this._tokenizationSupports.set(e, t), this.handleChange([e]), Ft(() => {
				this._tokenizationSupports.get(e) === t && (this._tokenizationSupports.delete(e), this.handleChange([e]));
			});
		}
		get(e) {
			return this._tokenizationSupports.get(e) || null;
		}
		registerFactory(e, t) {
			this._factories.get(e)?.dispose();
			const n = new yu(this, e, t);
			return this._factories.set(e, n), Ft(() => {
				const r = this._factories.get(e);
				!r || r !== n || (this._factories.delete(e), r.dispose());
			});
		}
		async getOrCreate(e) {
			const t = this.get(e);
			if (t) return t;
			const n = this._factories.get(e);
			return !n || n.isResolved ? null : (await n.resolve(), this.get(e));
		}
		isResolved(e) {
			if (this.get(e)) return !0;
			const t = this._factories.get(e);
			return !!(!t || t.isResolved);
		}
		setColorMap(e) {
			this._colorMap = e, this._onDidChange.fire({
				changedLanguages: Array.from(this._tokenizationSupports.keys()),
				changedColorMap: !0
			});
		}
		getColorMap() {
			return this._colorMap;
		}
		getDefaultBackground() {
			return this._colorMap && this._colorMap.length > 2 ? this._colorMap[2] : null;
		}
	}, yu = class extends Vt {
		get isResolved() {
			return this._isResolved;
		}
		constructor(e, t, n) {
			super(), this._registry = e, this._languageId = t, this._factory = n, this._isDisposed = !1, this._resolvePromise = null, this._isResolved = !1;
		}
		dispose() {
			this._isDisposed = !0, super.dispose();
		}
		async resolve() {
			return this._resolvePromise || (this._resolvePromise = this._create()), this._resolvePromise;
		}
		async _create() {
			const e = await this._factory.tokenizationSupport;
			this._isResolved = !0, e && !this._isDisposed && this._register(this._registry.register(this._languageId, e));
		}
	}, vu = class {
		constructor(e, t, n) {
			this.offset = e, this.type = t, this.language = n, this._tokenBrand = void 0;
		}
		toString() {
			return "(" + this.offset + ", " + this.type + ")";
		}
	}, rs;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(rs || (rs = {}));
	var is;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, $.symbolMethod), t.set(1, $.symbolFunction), t.set(2, $.symbolConstructor), t.set(3, $.symbolField), t.set(4, $.symbolVariable), t.set(5, $.symbolClass), t.set(6, $.symbolStruct), t.set(7, $.symbolInterface), t.set(8, $.symbolModule), t.set(9, $.symbolProperty), t.set(10, $.symbolEvent), t.set(11, $.symbolOperator), t.set(12, $.symbolUnit), t.set(13, $.symbolValue), t.set(15, $.symbolEnum), t.set(14, $.symbolConstant), t.set(15, $.symbolEnum), t.set(16, $.symbolEnumMember), t.set(17, $.symbolKeyword), t.set(28, $.symbolSnippet), t.set(18, $.symbolText), t.set(19, $.symbolColor), t.set(20, $.symbolFile), t.set(21, $.symbolReference), t.set(22, $.symbolCustomColor), t.set(23, $.symbolFolder), t.set(24, $.symbolTypeParameter), t.set(25, $.account), t.set(26, $.issues), t.set(27, $.tools);
		function n(a) {
			let l = t.get(a);
			return l || (console.info("No codicon found for CompletionItemKind " + a), l = $.symbolProperty), l;
		}
		e.toIcon = n;
		function r(a) {
			switch (a) {
				case 0: return B(763, "Method");
				case 1: return B(764, "Function");
				case 2: return B(765, "Constructor");
				case 3: return B(766, "Field");
				case 4: return B(767, "Variable");
				case 5: return B(768, "Class");
				case 6: return B(769, "Struct");
				case 7: return B(770, "Interface");
				case 8: return B(771, "Module");
				case 9: return B(772, "Property");
				case 10: return B(773, "Event");
				case 11: return B(774, "Operator");
				case 12: return B(775, "Unit");
				case 13: return B(776, "Value");
				case 14: return B(777, "Constant");
				case 15: return B(778, "Enum");
				case 16: return B(779, "Enum Member");
				case 17: return B(780, "Keyword");
				case 18: return B(781, "Text");
				case 19: return B(782, "Color");
				case 20: return B(783, "File");
				case 21: return B(784, "Reference");
				case 22: return B(785, "Custom Color");
				case 23: return B(786, "Folder");
				case 24: return B(787, "Type Parameter");
				case 25: return B(788, "User");
				case 26: return B(789, "Issue");
				case 27: return B(790, "Tool");
				case 28: return B(791, "Snippet");
				default: return "";
			}
		}
		e.toLabel = r;
		const i = /* @__PURE__ */ new Map();
		i.set("method", 0), i.set("function", 1), i.set("constructor", 2), i.set("field", 3), i.set("variable", 4), i.set("class", 5), i.set("struct", 6), i.set("interface", 7), i.set("module", 8), i.set("property", 9), i.set("event", 10), i.set("operator", 11), i.set("unit", 12), i.set("value", 13), i.set("constant", 14), i.set("enum", 15), i.set("enum-member", 16), i.set("enumMember", 16), i.set("keyword", 17), i.set("snippet", 28), i.set("text", 18), i.set("color", 19), i.set("file", 20), i.set("reference", 21), i.set("customcolor", 22), i.set("folder", 23), i.set("type-parameter", 24), i.set("typeParameter", 24), i.set("account", 25), i.set("issue", 26), i.set("tool", 27);
		function s(a, l) {
			let o = i.get(a);
			return typeof o > "u" && !l && (o = 9), o;
		}
		e.fromString = s;
	})(is || (is = {}));
	var ss;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(ss || (ss = {}));
	var as;
	(function(e) {
		e[e.Code = 1] = "Code", e[e.Label = 2] = "Label";
	})(as || (as = {}));
	var os;
	(function(e) {
		e[e.Accepted = 0] = "Accepted", e[e.Rejected = 1] = "Rejected", e[e.Ignored = 2] = "Ignored";
	})(os || (os = {}));
	var ls;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.PasteAs = 1] = "PasteAs";
	})(ls || (ls = {}));
	var us;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(us || (us = {}));
	var cs;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(cs || (cs = {}));
	B(792, "array"), B(793, "boolean"), B(794, "class"), B(795, "constant"), B(796, "constructor"), B(797, "enumeration"), B(798, "enumeration member"), B(799, "event"), B(800, "field"), B(801, "file"), B(802, "function"), B(803, "interface"), B(804, "key"), B(805, "method"), B(806, "module"), B(807, "namespace"), B(808, "null"), B(809, "number"), B(810, "object"), B(811, "operator"), B(812, "package"), B(813, "property"), B(814, "string"), B(815, "struct"), B(816, "type parameter"), B(817, "variable");
	var fs;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, $.symbolFile), t.set(1, $.symbolModule), t.set(2, $.symbolNamespace), t.set(3, $.symbolPackage), t.set(4, $.symbolClass), t.set(5, $.symbolMethod), t.set(6, $.symbolProperty), t.set(7, $.symbolField), t.set(8, $.symbolConstructor), t.set(9, $.symbolEnum), t.set(10, $.symbolInterface), t.set(11, $.symbolFunction), t.set(12, $.symbolVariable), t.set(13, $.symbolConstant), t.set(14, $.symbolString), t.set(15, $.symbolNumber), t.set(16, $.symbolBoolean), t.set(17, $.symbolArray), t.set(18, $.symbolObject), t.set(19, $.symbolKey), t.set(20, $.symbolNull), t.set(21, $.symbolEnumMember), t.set(22, $.symbolStruct), t.set(23, $.symbolEvent), t.set(24, $.symbolOperator), t.set(25, $.symbolTypeParameter);
		function n(s) {
			let a = t.get(s);
			return a || (console.info("No codicon found for SymbolKind " + s), a = $.symbolProperty), a;
		}
		e.toIcon = n;
		const r = /* @__PURE__ */ new Map();
		r.set(0, 20), r.set(1, 8), r.set(2, 8), r.set(3, 8), r.set(4, 5), r.set(5, 0), r.set(6, 9), r.set(7, 3), r.set(8, 2), r.set(9, 15), r.set(10, 7), r.set(11, 1), r.set(12, 4), r.set(13, 14), r.set(14, 18), r.set(15, 13), r.set(16, 13), r.set(17, 13), r.set(18, 13), r.set(19, 17), r.set(20, 13), r.set(21, 16), r.set(22, 6), r.set(23, 10), r.set(24, 11), r.set(25, 24);
		function i(s) {
			let a = r.get(s);
			return a === void 0 && (console.info("No completion kind found for SymbolKind " + s), a = 20), a;
		}
		e.toCompletionKind = i;
	})(fs || (fs = {}));
	(class Ze {
		static {
			this.Comment = new Ze("comment");
		}
		static {
			this.Imports = new Ze("imports");
		}
		static {
			this.Region = new Ze("region");
		}
		static fromValue(t) {
			switch (t) {
				case "comment": return Ze.Comment;
				case "imports": return Ze.Imports;
				case "region": return Ze.Region;
			}
			return new Ze(t);
		}
		constructor(t) {
			this.value = t;
		}
	});
	var hs;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})(hs || (hs = {}));
	var ms;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(ms || (ms = {}));
	var gs;
	(function(e) {
		function t(n) {
			return !n || typeof n != "object" ? !1 : typeof n.id == "string" && typeof n.title == "string";
		}
		e.is = t;
	})(gs || (gs = {}));
	var ds;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(ds || (ds = {}));
	new bu();
	var ps;
	(function(e) {
		e[e.Unknown = 0] = "Unknown", e[e.Disabled = 1] = "Disabled", e[e.Enabled = 2] = "Enabled";
	})(ps || (ps = {}));
	var bs;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.Auto = 2] = "Auto";
	})(bs || (bs = {}));
	var ys;
	(function(e) {
		e[e.None = 0] = "None", e[e.KeepWhitespace = 1] = "KeepWhitespace", e[e.InsertAsSnippet = 4] = "InsertAsSnippet";
	})(ys || (ys = {}));
	var vs;
	(function(e) {
		e[e.Method = 0] = "Method", e[e.Function = 1] = "Function", e[e.Constructor = 2] = "Constructor", e[e.Field = 3] = "Field", e[e.Variable = 4] = "Variable", e[e.Class = 5] = "Class", e[e.Struct = 6] = "Struct", e[e.Interface = 7] = "Interface", e[e.Module = 8] = "Module", e[e.Property = 9] = "Property", e[e.Event = 10] = "Event", e[e.Operator = 11] = "Operator", e[e.Unit = 12] = "Unit", e[e.Value = 13] = "Value", e[e.Constant = 14] = "Constant", e[e.Enum = 15] = "Enum", e[e.EnumMember = 16] = "EnumMember", e[e.Keyword = 17] = "Keyword", e[e.Text = 18] = "Text", e[e.Color = 19] = "Color", e[e.File = 20] = "File", e[e.Reference = 21] = "Reference", e[e.Customcolor = 22] = "Customcolor", e[e.Folder = 23] = "Folder", e[e.TypeParameter = 24] = "TypeParameter", e[e.User = 25] = "User", e[e.Issue = 26] = "Issue", e[e.Tool = 27] = "Tool", e[e.Snippet = 28] = "Snippet";
	})(vs || (vs = {}));
	var ws;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(ws || (ws = {}));
	var Ls;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.TriggerCharacter = 1] = "TriggerCharacter", e[e.TriggerForIncompleteCompletions = 2] = "TriggerForIncompleteCompletions";
	})(Ls || (Ls = {}));
	var _s;
	(function(e) {
		e[e.EXACT = 0] = "EXACT", e[e.ABOVE = 1] = "ABOVE", e[e.BELOW = 2] = "BELOW";
	})(_s || (_s = {}));
	var Ns;
	(function(e) {
		e[e.NotSet = 0] = "NotSet", e[e.ContentFlush = 1] = "ContentFlush", e[e.RecoverFromMarkers = 2] = "RecoverFromMarkers", e[e.Explicit = 3] = "Explicit", e[e.Paste = 4] = "Paste", e[e.Undo = 5] = "Undo", e[e.Redo = 6] = "Redo";
	})(Ns || (Ns = {}));
	var Ss;
	(function(e) {
		e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(Ss || (Ss = {}));
	var As;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(As || (As = {}));
	var xs;
	(function(e) {
		e[e.None = 0] = "None", e[e.Keep = 1] = "Keep", e[e.Brackets = 2] = "Brackets", e[e.Advanced = 3] = "Advanced", e[e.Full = 4] = "Full";
	})(xs || (xs = {}));
	var ks;
	(function(e) {
		e[e.acceptSuggestionOnCommitCharacter = 0] = "acceptSuggestionOnCommitCharacter", e[e.acceptSuggestionOnEnter = 1] = "acceptSuggestionOnEnter", e[e.accessibilitySupport = 2] = "accessibilitySupport", e[e.accessibilityPageSize = 3] = "accessibilityPageSize", e[e.allowOverflow = 4] = "allowOverflow", e[e.allowVariableLineHeights = 5] = "allowVariableLineHeights", e[e.allowVariableFonts = 6] = "allowVariableFonts", e[e.allowVariableFontsInAccessibilityMode = 7] = "allowVariableFontsInAccessibilityMode", e[e.ariaLabel = 8] = "ariaLabel", e[e.ariaRequired = 9] = "ariaRequired", e[e.autoClosingBrackets = 10] = "autoClosingBrackets", e[e.autoClosingComments = 11] = "autoClosingComments", e[e.screenReaderAnnounceInlineSuggestion = 12] = "screenReaderAnnounceInlineSuggestion", e[e.autoClosingDelete = 13] = "autoClosingDelete", e[e.autoClosingOvertype = 14] = "autoClosingOvertype", e[e.autoClosingQuotes = 15] = "autoClosingQuotes", e[e.autoIndent = 16] = "autoIndent", e[e.autoIndentOnPaste = 17] = "autoIndentOnPaste", e[e.autoIndentOnPasteWithinString = 18] = "autoIndentOnPasteWithinString", e[e.automaticLayout = 19] = "automaticLayout", e[e.autoSurround = 20] = "autoSurround", e[e.bracketPairColorization = 21] = "bracketPairColorization", e[e.guides = 22] = "guides", e[e.codeLens = 23] = "codeLens", e[e.codeLensFontFamily = 24] = "codeLensFontFamily", e[e.codeLensFontSize = 25] = "codeLensFontSize", e[e.colorDecorators = 26] = "colorDecorators", e[e.colorDecoratorsLimit = 27] = "colorDecoratorsLimit", e[e.columnSelection = 28] = "columnSelection", e[e.comments = 29] = "comments", e[e.contextmenu = 30] = "contextmenu", e[e.copyWithSyntaxHighlighting = 31] = "copyWithSyntaxHighlighting", e[e.cursorBlinking = 32] = "cursorBlinking", e[e.cursorSmoothCaretAnimation = 33] = "cursorSmoothCaretAnimation", e[e.cursorStyle = 34] = "cursorStyle", e[e.cursorSurroundingLines = 35] = "cursorSurroundingLines", e[e.cursorSurroundingLinesStyle = 36] = "cursorSurroundingLinesStyle", e[e.cursorWidth = 37] = "cursorWidth", e[e.cursorHeight = 38] = "cursorHeight", e[e.disableLayerHinting = 39] = "disableLayerHinting", e[e.disableMonospaceOptimizations = 40] = "disableMonospaceOptimizations", e[e.domReadOnly = 41] = "domReadOnly", e[e.dragAndDrop = 42] = "dragAndDrop", e[e.dropIntoEditor = 43] = "dropIntoEditor", e[e.editContext = 44] = "editContext", e[e.emptySelectionClipboard = 45] = "emptySelectionClipboard", e[e.experimentalGpuAcceleration = 46] = "experimentalGpuAcceleration", e[e.experimentalWhitespaceRendering = 47] = "experimentalWhitespaceRendering", e[e.extraEditorClassName = 48] = "extraEditorClassName", e[e.fastScrollSensitivity = 49] = "fastScrollSensitivity", e[e.find = 50] = "find", e[e.fixedOverflowWidgets = 51] = "fixedOverflowWidgets", e[e.folding = 52] = "folding", e[e.foldingStrategy = 53] = "foldingStrategy", e[e.foldingHighlight = 54] = "foldingHighlight", e[e.foldingImportsByDefault = 55] = "foldingImportsByDefault", e[e.foldingMaximumRegions = 56] = "foldingMaximumRegions", e[e.unfoldOnClickAfterEndOfLine = 57] = "unfoldOnClickAfterEndOfLine", e[e.fontFamily = 58] = "fontFamily", e[e.fontInfo = 59] = "fontInfo", e[e.fontLigatures = 60] = "fontLigatures", e[e.fontSize = 61] = "fontSize", e[e.fontWeight = 62] = "fontWeight", e[e.fontVariations = 63] = "fontVariations", e[e.formatOnPaste = 64] = "formatOnPaste", e[e.formatOnType = 65] = "formatOnType", e[e.glyphMargin = 66] = "glyphMargin", e[e.gotoLocation = 67] = "gotoLocation", e[e.hideCursorInOverviewRuler = 68] = "hideCursorInOverviewRuler", e[e.hover = 69] = "hover", e[e.inDiffEditor = 70] = "inDiffEditor", e[e.inlineSuggest = 71] = "inlineSuggest", e[e.letterSpacing = 72] = "letterSpacing", e[e.lightbulb = 73] = "lightbulb", e[e.lineDecorationsWidth = 74] = "lineDecorationsWidth", e[e.lineHeight = 75] = "lineHeight", e[e.lineNumbers = 76] = "lineNumbers", e[e.lineNumbersMinChars = 77] = "lineNumbersMinChars", e[e.linkedEditing = 78] = "linkedEditing", e[e.links = 79] = "links", e[e.matchBrackets = 80] = "matchBrackets", e[e.minimap = 81] = "minimap", e[e.mouseStyle = 82] = "mouseStyle", e[e.mouseWheelScrollSensitivity = 83] = "mouseWheelScrollSensitivity", e[e.mouseWheelZoom = 84] = "mouseWheelZoom", e[e.multiCursorMergeOverlapping = 85] = "multiCursorMergeOverlapping", e[e.multiCursorModifier = 86] = "multiCursorModifier", e[e.mouseMiddleClickAction = 87] = "mouseMiddleClickAction", e[e.multiCursorPaste = 88] = "multiCursorPaste", e[e.multiCursorLimit = 89] = "multiCursorLimit", e[e.occurrencesHighlight = 90] = "occurrencesHighlight", e[e.occurrencesHighlightDelay = 91] = "occurrencesHighlightDelay", e[e.overtypeCursorStyle = 92] = "overtypeCursorStyle", e[e.overtypeOnPaste = 93] = "overtypeOnPaste", e[e.overviewRulerBorder = 94] = "overviewRulerBorder", e[e.overviewRulerLanes = 95] = "overviewRulerLanes", e[e.padding = 96] = "padding", e[e.pasteAs = 97] = "pasteAs", e[e.parameterHints = 98] = "parameterHints", e[e.peekWidgetDefaultFocus = 99] = "peekWidgetDefaultFocus", e[e.placeholder = 100] = "placeholder", e[e.definitionLinkOpensInPeek = 101] = "definitionLinkOpensInPeek", e[e.quickSuggestions = 102] = "quickSuggestions", e[e.quickSuggestionsDelay = 103] = "quickSuggestionsDelay", e[e.readOnly = 104] = "readOnly", e[e.readOnlyMessage = 105] = "readOnlyMessage", e[e.renameOnType = 106] = "renameOnType", e[e.renderRichScreenReaderContent = 107] = "renderRichScreenReaderContent", e[e.renderControlCharacters = 108] = "renderControlCharacters", e[e.renderFinalNewline = 109] = "renderFinalNewline", e[e.renderLineHighlight = 110] = "renderLineHighlight", e[e.renderLineHighlightOnlyWhenFocus = 111] = "renderLineHighlightOnlyWhenFocus", e[e.renderValidationDecorations = 112] = "renderValidationDecorations", e[e.renderWhitespace = 113] = "renderWhitespace", e[e.revealHorizontalRightPadding = 114] = "revealHorizontalRightPadding", e[e.roundedSelection = 115] = "roundedSelection", e[e.rulers = 116] = "rulers", e[e.scrollbar = 117] = "scrollbar", e[e.scrollBeyondLastColumn = 118] = "scrollBeyondLastColumn", e[e.scrollBeyondLastLine = 119] = "scrollBeyondLastLine", e[e.scrollPredominantAxis = 120] = "scrollPredominantAxis", e[e.selectionClipboard = 121] = "selectionClipboard", e[e.selectionHighlight = 122] = "selectionHighlight", e[e.selectionHighlightMaxLength = 123] = "selectionHighlightMaxLength", e[e.selectionHighlightMultiline = 124] = "selectionHighlightMultiline", e[e.selectOnLineNumbers = 125] = "selectOnLineNumbers", e[e.showFoldingControls = 126] = "showFoldingControls", e[e.showUnused = 127] = "showUnused", e[e.snippetSuggestions = 128] = "snippetSuggestions", e[e.smartSelect = 129] = "smartSelect", e[e.smoothScrolling = 130] = "smoothScrolling", e[e.stickyScroll = 131] = "stickyScroll", e[e.stickyTabStops = 132] = "stickyTabStops", e[e.stopRenderingLineAfter = 133] = "stopRenderingLineAfter", e[e.suggest = 134] = "suggest", e[e.suggestFontSize = 135] = "suggestFontSize", e[e.suggestLineHeight = 136] = "suggestLineHeight", e[e.suggestOnTriggerCharacters = 137] = "suggestOnTriggerCharacters", e[e.suggestSelection = 138] = "suggestSelection", e[e.tabCompletion = 139] = "tabCompletion", e[e.tabIndex = 140] = "tabIndex", e[e.trimWhitespaceOnDelete = 141] = "trimWhitespaceOnDelete", e[e.unicodeHighlighting = 142] = "unicodeHighlighting", e[e.unusualLineTerminators = 143] = "unusualLineTerminators", e[e.useShadowDOM = 144] = "useShadowDOM", e[e.useTabStops = 145] = "useTabStops", e[e.wordBreak = 146] = "wordBreak", e[e.wordSegmenterLocales = 147] = "wordSegmenterLocales", e[e.wordSeparators = 148] = "wordSeparators", e[e.wordWrap = 149] = "wordWrap", e[e.wordWrapBreakAfterCharacters = 150] = "wordWrapBreakAfterCharacters", e[e.wordWrapBreakBeforeCharacters = 151] = "wordWrapBreakBeforeCharacters", e[e.wordWrapColumn = 152] = "wordWrapColumn", e[e.wordWrapOverride1 = 153] = "wordWrapOverride1", e[e.wordWrapOverride2 = 154] = "wordWrapOverride2", e[e.wrappingIndent = 155] = "wrappingIndent", e[e.wrappingStrategy = 156] = "wrappingStrategy", e[e.showDeprecated = 157] = "showDeprecated", e[e.inertialScroll = 158] = "inertialScroll", e[e.inlayHints = 159] = "inlayHints", e[e.wrapOnEscapedLineFeeds = 160] = "wrapOnEscapedLineFeeds", e[e.effectiveCursorStyle = 161] = "effectiveCursorStyle", e[e.editorClassName = 162] = "editorClassName", e[e.pixelRatio = 163] = "pixelRatio", e[e.tabFocusMode = 164] = "tabFocusMode", e[e.layoutInfo = 165] = "layoutInfo", e[e.wrappingInfo = 166] = "wrappingInfo", e[e.defaultColorDecorators = 167] = "defaultColorDecorators", e[e.colorDecoratorsActivatedOn = 168] = "colorDecoratorsActivatedOn", e[e.inlineCompletionsAccessibilityVerbose = 169] = "inlineCompletionsAccessibilityVerbose", e[e.effectiveEditContext = 170] = "effectiveEditContext", e[e.scrollOnMiddleClick = 171] = "scrollOnMiddleClick", e[e.effectiveAllowVariableFonts = 172] = "effectiveAllowVariableFonts", e[e.doubleClickSelectsBlock = 173] = "doubleClickSelectsBlock";
	})(ks || (ks = {}));
	var Rs;
	(function(e) {
		e[e.TextDefined = 0] = "TextDefined", e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(Rs || (Rs = {}));
	var Es;
	(function(e) {
		e[e.LF = 0] = "LF", e[e.CRLF = 1] = "CRLF";
	})(Es || (Es = {}));
	var Ts;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(Ts || (Ts = {}));
	var Ms;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(Ms || (Ms = {}));
	var Cs;
	(function(e) {
		e[e.None = 0] = "None", e[e.Indent = 1] = "Indent", e[e.IndentOutdent = 2] = "IndentOutdent", e[e.Outdent = 3] = "Outdent";
	})(Cs || (Cs = {}));
	var Ps;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})(Ps || (Ps = {}));
	var Is;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(Is || (Is = {}));
	var Fs;
	(function(e) {
		e[e.Accepted = 0] = "Accepted", e[e.Rejected = 1] = "Rejected", e[e.Ignored = 2] = "Ignored";
	})(Fs || (Fs = {}));
	var Vs;
	(function(e) {
		e[e.Code = 1] = "Code", e[e.Label = 2] = "Label";
	})(Vs || (Vs = {}));
	var Ds;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(Ds || (Ds = {}));
	var pr;
	(function(e) {
		e[e.DependsOnKbLayout = -1] = "DependsOnKbLayout", e[e.Unknown = 0] = "Unknown", e[e.Backspace = 1] = "Backspace", e[e.Tab = 2] = "Tab", e[e.Enter = 3] = "Enter", e[e.Shift = 4] = "Shift", e[e.Ctrl = 5] = "Ctrl", e[e.Alt = 6] = "Alt", e[e.PauseBreak = 7] = "PauseBreak", e[e.CapsLock = 8] = "CapsLock", e[e.Escape = 9] = "Escape", e[e.Space = 10] = "Space", e[e.PageUp = 11] = "PageUp", e[e.PageDown = 12] = "PageDown", e[e.End = 13] = "End", e[e.Home = 14] = "Home", e[e.LeftArrow = 15] = "LeftArrow", e[e.UpArrow = 16] = "UpArrow", e[e.RightArrow = 17] = "RightArrow", e[e.DownArrow = 18] = "DownArrow", e[e.Insert = 19] = "Insert", e[e.Delete = 20] = "Delete", e[e.Digit0 = 21] = "Digit0", e[e.Digit1 = 22] = "Digit1", e[e.Digit2 = 23] = "Digit2", e[e.Digit3 = 24] = "Digit3", e[e.Digit4 = 25] = "Digit4", e[e.Digit5 = 26] = "Digit5", e[e.Digit6 = 27] = "Digit6", e[e.Digit7 = 28] = "Digit7", e[e.Digit8 = 29] = "Digit8", e[e.Digit9 = 30] = "Digit9", e[e.KeyA = 31] = "KeyA", e[e.KeyB = 32] = "KeyB", e[e.KeyC = 33] = "KeyC", e[e.KeyD = 34] = "KeyD", e[e.KeyE = 35] = "KeyE", e[e.KeyF = 36] = "KeyF", e[e.KeyG = 37] = "KeyG", e[e.KeyH = 38] = "KeyH", e[e.KeyI = 39] = "KeyI", e[e.KeyJ = 40] = "KeyJ", e[e.KeyK = 41] = "KeyK", e[e.KeyL = 42] = "KeyL", e[e.KeyM = 43] = "KeyM", e[e.KeyN = 44] = "KeyN", e[e.KeyO = 45] = "KeyO", e[e.KeyP = 46] = "KeyP", e[e.KeyQ = 47] = "KeyQ", e[e.KeyR = 48] = "KeyR", e[e.KeyS = 49] = "KeyS", e[e.KeyT = 50] = "KeyT", e[e.KeyU = 51] = "KeyU", e[e.KeyV = 52] = "KeyV", e[e.KeyW = 53] = "KeyW", e[e.KeyX = 54] = "KeyX", e[e.KeyY = 55] = "KeyY", e[e.KeyZ = 56] = "KeyZ", e[e.Meta = 57] = "Meta", e[e.ContextMenu = 58] = "ContextMenu", e[e.F1 = 59] = "F1", e[e.F2 = 60] = "F2", e[e.F3 = 61] = "F3", e[e.F4 = 62] = "F4", e[e.F5 = 63] = "F5", e[e.F6 = 64] = "F6", e[e.F7 = 65] = "F7", e[e.F8 = 66] = "F8", e[e.F9 = 67] = "F9", e[e.F10 = 68] = "F10", e[e.F11 = 69] = "F11", e[e.F12 = 70] = "F12", e[e.F13 = 71] = "F13", e[e.F14 = 72] = "F14", e[e.F15 = 73] = "F15", e[e.F16 = 74] = "F16", e[e.F17 = 75] = "F17", e[e.F18 = 76] = "F18", e[e.F19 = 77] = "F19", e[e.F20 = 78] = "F20", e[e.F21 = 79] = "F21", e[e.F22 = 80] = "F22", e[e.F23 = 81] = "F23", e[e.F24 = 82] = "F24", e[e.NumLock = 83] = "NumLock", e[e.ScrollLock = 84] = "ScrollLock", e[e.Semicolon = 85] = "Semicolon", e[e.Equal = 86] = "Equal", e[e.Comma = 87] = "Comma", e[e.Minus = 88] = "Minus", e[e.Period = 89] = "Period", e[e.Slash = 90] = "Slash", e[e.Backquote = 91] = "Backquote", e[e.BracketLeft = 92] = "BracketLeft", e[e.Backslash = 93] = "Backslash", e[e.BracketRight = 94] = "BracketRight", e[e.Quote = 95] = "Quote", e[e.OEM_8 = 96] = "OEM_8", e[e.IntlBackslash = 97] = "IntlBackslash", e[e.Numpad0 = 98] = "Numpad0", e[e.Numpad1 = 99] = "Numpad1", e[e.Numpad2 = 100] = "Numpad2", e[e.Numpad3 = 101] = "Numpad3", e[e.Numpad4 = 102] = "Numpad4", e[e.Numpad5 = 103] = "Numpad5", e[e.Numpad6 = 104] = "Numpad6", e[e.Numpad7 = 105] = "Numpad7", e[e.Numpad8 = 106] = "Numpad8", e[e.Numpad9 = 107] = "Numpad9", e[e.NumpadMultiply = 108] = "NumpadMultiply", e[e.NumpadAdd = 109] = "NumpadAdd", e[e.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", e[e.NumpadSubtract = 111] = "NumpadSubtract", e[e.NumpadDecimal = 112] = "NumpadDecimal", e[e.NumpadDivide = 113] = "NumpadDivide", e[e.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", e[e.ABNT_C1 = 115] = "ABNT_C1", e[e.ABNT_C2 = 116] = "ABNT_C2", e[e.AudioVolumeMute = 117] = "AudioVolumeMute", e[e.AudioVolumeUp = 118] = "AudioVolumeUp", e[e.AudioVolumeDown = 119] = "AudioVolumeDown", e[e.BrowserSearch = 120] = "BrowserSearch", e[e.BrowserHome = 121] = "BrowserHome", e[e.BrowserBack = 122] = "BrowserBack", e[e.BrowserForward = 123] = "BrowserForward", e[e.MediaTrackNext = 124] = "MediaTrackNext", e[e.MediaTrackPrevious = 125] = "MediaTrackPrevious", e[e.MediaStop = 126] = "MediaStop", e[e.MediaPlayPause = 127] = "MediaPlayPause", e[e.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", e[e.LaunchMail = 129] = "LaunchMail", e[e.LaunchApp2 = 130] = "LaunchApp2", e[e.Clear = 131] = "Clear", e[e.MAX_VALUE = 132] = "MAX_VALUE";
	})(pr || (pr = {}));
	var br;
	(function(e) {
		e[e.Hint = 1] = "Hint", e[e.Info = 2] = "Info", e[e.Warning = 4] = "Warning", e[e.Error = 8] = "Error";
	})(br || (br = {}));
	var yr;
	(function(e) {
		e[e.Unnecessary = 1] = "Unnecessary", e[e.Deprecated = 2] = "Deprecated";
	})(yr || (yr = {}));
	var Os;
	(function(e) {
		e[e.Inline = 1] = "Inline", e[e.Gutter = 2] = "Gutter";
	})(Os || (Os = {}));
	var $s;
	(function(e) {
		e[e.Normal = 1] = "Normal", e[e.Underlined = 2] = "Underlined";
	})($s || ($s = {}));
	var Bs;
	(function(e) {
		e[e.UNKNOWN = 0] = "UNKNOWN", e[e.TEXTAREA = 1] = "TEXTAREA", e[e.GUTTER_GLYPH_MARGIN = 2] = "GUTTER_GLYPH_MARGIN", e[e.GUTTER_LINE_NUMBERS = 3] = "GUTTER_LINE_NUMBERS", e[e.GUTTER_LINE_DECORATIONS = 4] = "GUTTER_LINE_DECORATIONS", e[e.GUTTER_VIEW_ZONE = 5] = "GUTTER_VIEW_ZONE", e[e.CONTENT_TEXT = 6] = "CONTENT_TEXT", e[e.CONTENT_EMPTY = 7] = "CONTENT_EMPTY", e[e.CONTENT_VIEW_ZONE = 8] = "CONTENT_VIEW_ZONE", e[e.CONTENT_WIDGET = 9] = "CONTENT_WIDGET", e[e.OVERVIEW_RULER = 10] = "OVERVIEW_RULER", e[e.SCROLLBAR = 11] = "SCROLLBAR", e[e.OVERLAY_WIDGET = 12] = "OVERLAY_WIDGET", e[e.OUTSIDE_EDITOR = 13] = "OUTSIDE_EDITOR";
	})(Bs || (Bs = {}));
	var Us;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})(Us || (Us = {}));
	var qs;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(qs || (qs = {}));
	var js;
	(function(e) {
		e[e.TOP_RIGHT_CORNER = 0] = "TOP_RIGHT_CORNER", e[e.BOTTOM_RIGHT_CORNER = 1] = "BOTTOM_RIGHT_CORNER", e[e.TOP_CENTER = 2] = "TOP_CENTER";
	})(js || (js = {}));
	var Ws;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(Ws || (Ws = {}));
	var Hs;
	(function(e) {
		e[e.Word = 0] = "Word", e[e.Line = 1] = "Line", e[e.Suggest = 2] = "Suggest";
	})(Hs || (Hs = {}));
	var zs;
	(function(e) {
		e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.None = 2] = "None", e[e.LeftOfInjectedText = 3] = "LeftOfInjectedText", e[e.RightOfInjectedText = 4] = "RightOfInjectedText";
	})(zs || (zs = {}));
	var Gs;
	(function(e) {
		e[e.Off = 0] = "Off", e[e.On = 1] = "On", e[e.Relative = 2] = "Relative", e[e.Interval = 3] = "Interval", e[e.Custom = 4] = "Custom";
	})(Gs || (Gs = {}));
	var Js;
	(function(e) {
		e[e.None = 0] = "None", e[e.Text = 1] = "Text", e[e.Blocks = 2] = "Blocks";
	})(Js || (Js = {}));
	var Xs;
	(function(e) {
		e[e.Smooth = 0] = "Smooth", e[e.Immediate = 1] = "Immediate";
	})(Xs || (Xs = {}));
	var Qs;
	(function(e) {
		e[e.Auto = 1] = "Auto", e[e.Hidden = 2] = "Hidden", e[e.Visible = 3] = "Visible";
	})(Qs || (Qs = {}));
	var vr;
	(function(e) {
		e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
	})(vr || (vr = {}));
	var Ys;
	(function(e) {
		e.Off = "off", e.OnCode = "onCode", e.On = "on";
	})(Ys || (Ys = {}));
	var Zs;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(Zs || (Zs = {}));
	var Ks;
	(function(e) {
		e[e.File = 0] = "File", e[e.Module = 1] = "Module", e[e.Namespace = 2] = "Namespace", e[e.Package = 3] = "Package", e[e.Class = 4] = "Class", e[e.Method = 5] = "Method", e[e.Property = 6] = "Property", e[e.Field = 7] = "Field", e[e.Constructor = 8] = "Constructor", e[e.Enum = 9] = "Enum", e[e.Interface = 10] = "Interface", e[e.Function = 11] = "Function", e[e.Variable = 12] = "Variable", e[e.Constant = 13] = "Constant", e[e.String = 14] = "String", e[e.Number = 15] = "Number", e[e.Boolean = 16] = "Boolean", e[e.Array = 17] = "Array", e[e.Object = 18] = "Object", e[e.Key = 19] = "Key", e[e.Null = 20] = "Null", e[e.EnumMember = 21] = "EnumMember", e[e.Struct = 22] = "Struct", e[e.Event = 23] = "Event", e[e.Operator = 24] = "Operator", e[e.TypeParameter = 25] = "TypeParameter";
	})(Ks || (Ks = {}));
	var e1;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(e1 || (e1 = {}));
	var t1;
	(function(e) {
		e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
	})(t1 || (t1 = {}));
	var n1;
	(function(e) {
		e[e.Hidden = 0] = "Hidden", e[e.Blink = 1] = "Blink", e[e.Smooth = 2] = "Smooth", e[e.Phase = 3] = "Phase", e[e.Expand = 4] = "Expand", e[e.Solid = 5] = "Solid";
	})(n1 || (n1 = {}));
	var r1;
	(function(e) {
		e[e.Line = 1] = "Line", e[e.Block = 2] = "Block", e[e.Underline = 3] = "Underline", e[e.LineThin = 4] = "LineThin", e[e.BlockOutline = 5] = "BlockOutline", e[e.UnderlineThin = 6] = "UnderlineThin";
	})(r1 || (r1 = {}));
	var i1;
	(function(e) {
		e[e.AlwaysGrowsWhenTypingAtEdges = 0] = "AlwaysGrowsWhenTypingAtEdges", e[e.NeverGrowsWhenTypingAtEdges = 1] = "NeverGrowsWhenTypingAtEdges", e[e.GrowsOnlyWhenTypingBefore = 2] = "GrowsOnlyWhenTypingBefore", e[e.GrowsOnlyWhenTypingAfter = 3] = "GrowsOnlyWhenTypingAfter";
	})(i1 || (i1 = {}));
	var s1;
	(function(e) {
		e[e.None = 0] = "None", e[e.Same = 1] = "Same", e[e.Indent = 2] = "Indent", e[e.DeepIndent = 3] = "DeepIndent";
	})(s1 || (s1 = {}));
	var wu = class {
		static {
			this.CtrlCmd = 2048;
		}
		static {
			this.Shift = 1024;
		}
		static {
			this.Alt = 512;
		}
		static {
			this.WinCtrl = 256;
		}
		static chord(e, t) {
			return Ql(e, t);
		}
	};
	function Lu() {
		return {
			editor: void 0,
			languages: void 0,
			CancellationTokenSource: zl,
			Emitter: xe,
			KeyCode: pr,
			KeyMod: wu,
			Position: G,
			Range: q,
			Selection: gu,
			SelectionDirection: vr,
			MarkerSeverity: br,
			MarkerTag: yr,
			Uri: qe,
			Token: vu
		};
	}
	var a1, l1, _u = class {
		constructor(e, t) {
			this.uri = e, this.value = t;
		}
	};
	function Nu(e) {
		return Array.isArray(e);
	}
	(class tn {
		static {
			this.defaultToKey = (t) => t.toString();
		}
		constructor(t, n) {
			if (this[a1] = "ResourceMap", t instanceof tn) this.map = new Map(t.map), this.toKey = n ?? tn.defaultToKey;
			else if (Nu(t)) {
				this.map = /* @__PURE__ */ new Map(), this.toKey = n ?? tn.defaultToKey;
				for (const [r, i] of t) this.set(r, i);
			} else this.map = /* @__PURE__ */ new Map(), this.toKey = t ?? tn.defaultToKey;
		}
		set(t, n) {
			return this.map.set(this.toKey(t), new _u(t, n)), this;
		}
		get(t) {
			return this.map.get(this.toKey(t))?.value;
		}
		has(t) {
			return this.map.has(this.toKey(t));
		}
		get size() {
			return this.map.size;
		}
		clear() {
			this.map.clear();
		}
		delete(t) {
			return this.map.delete(this.toKey(t));
		}
		forEach(t, n) {
			typeof n < "u" && (t = t.bind(n));
			for (const [r, i] of this.map) t(i.value, i.uri, this);
		}
		*values() {
			for (const t of this.map.values()) yield t.value;
		}
		*keys() {
			for (const t of this.map.values()) yield t.uri;
		}
		*entries() {
			for (const t of this.map.values()) yield [t.uri, t.value];
		}
		*[(a1 = Symbol.toStringTag, Symbol.iterator)]() {
			for (const [, t] of this.map) yield [t.uri, t.value];
		}
	});
	var Su = class {
		constructor() {
			this[l1] = "LinkedMap", this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
		}
		clear() {
			this._map.clear(), this._head = void 0, this._tail = void 0, this._size = 0, this._state++;
		}
		isEmpty() {
			return !this._head && !this._tail;
		}
		get size() {
			return this._size;
		}
		get first() {
			return this._head?.value;
		}
		get last() {
			return this._tail?.value;
		}
		has(e) {
			return this._map.has(e);
		}
		get(e, t = 0) {
			const n = this._map.get(e);
			if (n) return t !== 0 && this.touch(n, t), n.value;
		}
		set(e, t, n = 0) {
			let r = this._map.get(e);
			if (r) r.value = t, n !== 0 && this.touch(r, n);
			else {
				switch (r = {
					key: e,
					value: t,
					next: void 0,
					previous: void 0
				}, n) {
					case 0:
						this.addItemLast(r);
						break;
					case 1:
						this.addItemFirst(r);
						break;
					case 2:
						this.addItemLast(r);
						break;
					default: this.addItemLast(r);
				}
				this._map.set(e, r), this._size++;
			}
			return this;
		}
		delete(e) {
			return !!this.remove(e);
		}
		remove(e) {
			const t = this._map.get(e);
			if (t) return this._map.delete(e), this.removeItem(t), this._size--, t.value;
		}
		shift() {
			if (!this._head && !this._tail) return;
			if (!this._head || !this._tail) throw new Error("Invalid list");
			const e = this._head;
			return this._map.delete(e.key), this.removeItem(e), this._size--, e.value;
		}
		forEach(e, t) {
			const n = this._state;
			let r = this._head;
			for (; r;) {
				if (t ? e.bind(t)(r.value, r.key, this) : e(r.value, r.key, this), this._state !== n) throw new Error("LinkedMap got modified during iteration.");
				r = r.next;
			}
		}
		keys() {
			const e = this, t = this._state;
			let n = this._head;
			const r = {
				[Symbol.iterator]() {
					return r;
				},
				[Symbol.dispose]() {},
				next() {
					if (e._state !== t) throw new Error("LinkedMap got modified during iteration.");
					if (n) {
						const i = {
							value: n.key,
							done: !1
						};
						return n = n.next, i;
					} else return {
						value: void 0,
						done: !0
					};
				}
			};
			return r;
		}
		values() {
			const e = this, t = this._state;
			let n = this._head;
			const r = {
				[Symbol.iterator]() {
					return r;
				},
				[Symbol.dispose]() {},
				next() {
					if (e._state !== t) throw new Error("LinkedMap got modified during iteration.");
					if (n) {
						const i = {
							value: n.value,
							done: !1
						};
						return n = n.next, i;
					} else return {
						value: void 0,
						done: !0
					};
				}
			};
			return r;
		}
		entries() {
			const e = this, t = this._state;
			let n = this._head;
			const r = {
				[Symbol.iterator]() {
					return r;
				},
				[Symbol.dispose]() {},
				next() {
					if (e._state !== t) throw new Error("LinkedMap got modified during iteration.");
					if (n) {
						const i = {
							value: [n.key, n.value],
							done: !1
						};
						return n = n.next, i;
					} else return {
						value: void 0,
						done: !0
					};
				}
			};
			return r;
		}
		[(l1 = Symbol.toStringTag, Symbol.iterator)]() {
			return this.entries();
		}
		trimOld(e) {
			if (e >= this.size) return;
			if (e === 0) {
				this.clear();
				return;
			}
			let t = this._head, n = this.size;
			for (; t && n > e;) this._map.delete(t.key), t = t.next, n--;
			this._head = t, this._size = n, t && (t.previous = void 0), this._state++;
		}
		trimNew(e) {
			if (e >= this.size) return;
			if (e === 0) {
				this.clear();
				return;
			}
			let t = this._tail, n = this.size;
			for (; t && n > e;) this._map.delete(t.key), t = t.previous, n--;
			this._tail = t, this._size = n, t && (t.next = void 0), this._state++;
		}
		addItemFirst(e) {
			if (!this._head && !this._tail) this._tail = e;
			else if (this._head) e.next = this._head, this._head.previous = e;
			else throw new Error("Invalid list");
			this._head = e, this._state++;
		}
		addItemLast(e) {
			if (!this._head && !this._tail) this._head = e;
			else if (this._tail) e.previous = this._tail, this._tail.next = e;
			else throw new Error("Invalid list");
			this._tail = e, this._state++;
		}
		removeItem(e) {
			if (e === this._head && e === this._tail) this._head = void 0, this._tail = void 0;
			else if (e === this._head) {
				if (!e.next) throw new Error("Invalid list");
				e.next.previous = void 0, this._head = e.next;
			} else if (e === this._tail) {
				if (!e.previous) throw new Error("Invalid list");
				e.previous.next = void 0, this._tail = e.previous;
			} else {
				const t = e.next, n = e.previous;
				if (!t || !n) throw new Error("Invalid list");
				t.previous = n, n.next = t;
			}
			e.next = void 0, e.previous = void 0, this._state++;
		}
		touch(e, t) {
			if (!this._head || !this._tail) throw new Error("Invalid list");
			if (!(t !== 1 && t !== 2)) {
				if (t === 1) {
					if (e === this._head) return;
					const n = e.next, r = e.previous;
					e === this._tail ? (r.next = void 0, this._tail = r) : (n.previous = r, r.next = n), e.previous = void 0, e.next = this._head, this._head.previous = e, this._head = e, this._state++;
				} else if (t === 2) {
					if (e === this._tail) return;
					const n = e.next, r = e.previous;
					e === this._head ? (n.previous = void 0, this._head = n) : (n.previous = r, r.next = n), e.next = void 0, e.previous = this._tail, this._tail.next = e, this._tail = e, this._state++;
				}
			}
		}
		toJSON() {
			const e = [];
			return this.forEach((t, n) => {
				e.push([n, t]);
			}), e;
		}
		fromJSON(e) {
			this.clear();
			for (const [t, n] of e) this.set(t, n);
		}
	}, Au = class extends Su {
		constructor(e, t = 1) {
			super(), this._limit = e, this._ratio = Math.min(Math.max(0, t), 1);
		}
		get limit() {
			return this._limit;
		}
		set limit(e) {
			this._limit = e, this.checkTrim();
		}
		get(e, t = 2) {
			return super.get(e, t);
		}
		peek(e) {
			return super.get(e, 0);
		}
		set(e, t) {
			return super.set(e, t, 2), this;
		}
		checkTrim() {
			this.size > this._limit && this.trim(Math.round(this._limit * this._ratio));
		}
	}, xu = class extends Au {
		constructor(e, t = 1) {
			super(e, t);
		}
		trim(e) {
			this.trimOld(e);
		}
		set(e, t) {
			return super.set(e, t), this.checkTrim(), this;
		}
	}, ku = class {
		constructor() {
			this.map = /* @__PURE__ */ new Map();
		}
		add(e, t) {
			let n = this.map.get(e);
			n || (n = /* @__PURE__ */ new Set(), this.map.set(e, n)), n.add(t);
		}
		delete(e, t) {
			const n = this.map.get(e);
			n && (n.delete(t), n.size === 0 && this.map.delete(e));
		}
		forEach(e, t) {
			const n = this.map.get(e);
			n && n.forEach(t);
		}
	};
	new xu(10);
	var c1;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(c1 || (c1 = {}));
	var f1;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(f1 || (f1 = {}));
	var h1;
	(function(e) {
		e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
	})(h1 || (h1 = {}));
	var m1;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})(m1 || (m1 = {}));
	function Ru(e) {
		if (!e || e.length === 0) return !1;
		for (let t = 0, n = e.length; t < n; t++) {
			const r = e.charCodeAt(t);
			if (r === 10) return !0;
			if (r === 92) {
				if (t++, t >= n) break;
				const i = e.charCodeAt(t);
				if (i === 110 || i === 114 || i === 87) return !0;
			}
		}
		return !1;
	}
	function Eu(e, t, n, r, i) {
		if (r === 0) return !0;
		const s = t.charCodeAt(r - 1);
		if (e.get(s) !== 0 || s === 13 || s === 10) return !0;
		if (i > 0) {
			const a = t.charCodeAt(r);
			if (e.get(a) !== 0) return !0;
		}
		return !1;
	}
	function Tu(e, t, n, r, i) {
		if (r + i === n) return !0;
		const s = t.charCodeAt(r + i);
		if (e.get(s) !== 0 || s === 13 || s === 10) return !0;
		if (i > 0) {
			const a = t.charCodeAt(r + i - 1);
			if (e.get(a) !== 0) return !0;
		}
		return !1;
	}
	function Mu(e, t, n, r, i) {
		return Eu(e, t, n, r, i) && Tu(e, t, n, r, i);
	}
	var Cu = class {
		constructor(e, t) {
			this._wordSeparators = e, this._searchRegex = t, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
		}
		reset(e) {
			this._searchRegex.lastIndex = e, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
		}
		next(e) {
			const t = e.length;
			let n;
			do {
				if (this._prevMatchStartIndex + this._prevMatchLength === t || (n = this._searchRegex.exec(e), !n)) return null;
				const r = n.index, i = n[0].length;
				if (r === this._prevMatchStartIndex && i === this._prevMatchLength) {
					if (i === 0) {
						_l(e, t, this._searchRegex.lastIndex) > 65535 ? this._searchRegex.lastIndex += 2 : this._searchRegex.lastIndex += 1;
						continue;
					}
					return null;
				}
				if (this._prevMatchStartIndex = r, this._prevMatchLength = i, !this._wordSeparators || Mu(this._wordSeparators, e, t, r, i)) return n;
			} while (n);
			return null;
		}
	};
	const Pu = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
	function Iu(e = "") {
		let t = "(-?\\d*\\.\\d\\w*)|([^";
		for (const n of Pu) e.indexOf(n) >= 0 || (t += "\\" + n);
		return t += "\\s]+)", new RegExp(t, "g");
	}
	const g1 = Iu();
	function d1(e) {
		let t = g1;
		if (e && e instanceof RegExp) if (e.global) t = e;
		else {
			let n = "g";
			e.ignoreCase && (n += "i"), e.multiline && (n += "m"), e.unicode && (n += "u"), t = new RegExp(e.source, n);
		}
		return t.lastIndex = 0, t;
	}
	const p1 = new zo();
	p1.unshift({
		maxLen: 1e3,
		windowSize: 15,
		timeBudget: 150
	});
	function wr(e, t, n, r, i) {
		if (t = d1(t), i || (i = on.first(p1)), n.length > i.maxLen) {
			let c = e - i.maxLen / 2;
			return c < 0 ? c = 0 : r += c, n = n.substring(c, e + i.maxLen / 2), wr(e, t, n, r, i);
		}
		const s = Date.now(), a = e - 1 - r;
		let l = -1, o = null;
		for (let c = 1; !(Date.now() - s >= i.timeBudget); c++) {
			const h = a - i.windowSize * c;
			t.lastIndex = Math.max(0, h);
			const f = Fu(t, n, a, l);
			if (!f && o || (o = f, h <= 0)) break;
			l = h;
		}
		if (o) {
			const c = {
				word: o[0],
				startColumn: r + 1 + o.index,
				endColumn: r + 1 + o.index + o[0].length
			};
			return t.lastIndex = 0, c;
		}
		return null;
	}
	function Fu(e, t, n, r) {
		let i;
		for (; i = e.exec(t);) {
			const s = i.index || 0;
			if (s <= n && e.lastIndex >= n) return i;
			if (r > 0 && s > r) return null;
		}
		return null;
	}
	var Vu = class {
		static computeUnicodeHighlights(e, t, n) {
			const r = n ? n.startLineNumber : 1, i = n ? n.endLineNumber : e.getLineCount(), s = new b1(t), a = s.getCandidateCodePoints();
			let l;
			a === "allNonBasicAscii" ? l = /* @__PURE__ */ new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g") : l = new RegExp(`${Du(Array.from(a))}`, "g");
			const o = new Cu(null, l), c = [];
			let h = !1, f, m = 0, g = 0, d = 0;
			e: for (let p = r, y = i; p <= y; p++) {
				const L = e.getLineContent(p), _ = L.length;
				o.reset(0);
				do
					if (f = o.next(L), f) {
						let b = f.index, N = f.index + f[0].length;
						if (b > 0) hn(L.charCodeAt(b - 1)) && b--;
						if (N + 1 < _) hn(L.charCodeAt(N - 1)) && N++;
						const v = L.substring(b, N);
						let S = wr(b + 1, g1, L, 0);
						S && S.endColumn <= b + 1 && (S = null);
						const w = s.shouldHighlightNonBasicASCII(v, S ? S.word : null);
						if (w !== 0) {
							if (w === 3 ? m++ : w === 2 ? g++ : w === 1 ? d++ : Bo(), c.length >= 1e3) {
								h = !0;
								break e;
							}
							c.push(new q(p, b + 1, p, N + 1));
						}
					}
				while (f);
			}
			return {
				ranges: c,
				hasMore: h,
				ambiguousCharacterCount: m,
				invisibleCharacterCount: g,
				nonBasicAsciiCharacterCount: d
			};
		}
		static computeUnicodeHighlightReason(e, t) {
			const n = new b1(t);
			switch (n.shouldHighlightNonBasicASCII(e, null)) {
				case 0: return null;
				case 2: return { kind: 1 };
				case 3: {
					const r = e.codePointAt(0), i = n.ambiguousCharacters.getPrimaryConfusable(r), s = ir.getLocales().filter((a) => !ir.getInstance(/* @__PURE__ */ new Set([...t.allowedLocales, a])).isAmbiguous(r));
					return {
						kind: 0,
						confusableWith: String.fromCodePoint(i),
						notAmbiguousInLocales: s
					};
				}
				case 1: return { kind: 2 };
			}
		}
	};
	function Du(e, t) {
		return `[${bl(e.map((n) => String.fromCodePoint(n)).join(""))}]`;
	}
	var b1 = class {
		constructor(e) {
			this.options = e, this.allowedCodePoints = new Set(e.allowedCodePoints), this.ambiguousCharacters = ir.getInstance(new Set(e.allowedLocales));
		}
		getCandidateCodePoints() {
			if (this.options.nonBasicASCII) return "allNonBasicAscii";
			const e = /* @__PURE__ */ new Set();
			if (this.options.invisibleCharacters) for (const t of sr.codePoints) y1(String.fromCodePoint(t)) || e.add(t);
			if (this.options.ambiguousCharacters) for (const t of this.ambiguousCharacters.getConfusableCodePoints()) e.add(t);
			for (const t of this.allowedCodePoints) e.delete(t);
			return e;
		}
		shouldHighlightNonBasicASCII(e, t) {
			const n = e.codePointAt(0);
			if (this.allowedCodePoints.has(n)) return 0;
			if (this.options.nonBasicASCII) return 1;
			let r = !1, i = !1;
			if (t) for (const s of t) {
				const a = s.codePointAt(0), l = Sl(s);
				r = r || l, !l && !this.ambiguousCharacters.isAmbiguous(a) && !sr.isInvisibleCharacter(a) && (i = !0);
			}
			return !r && i ? 0 : this.options.invisibleCharacters && !y1(e) && sr.isInvisibleCharacter(n) ? 2 : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(n) ? 3 : 0;
		}
	};
	function y1(e) {
		return e === " " || e === `
` || e === "	";
	}
	var Bt = class {
		constructor(e, t, n) {
			this.changes = e, this.moves = t, this.hitTimeout = n;
		}
	}, v1 = class {
		constructor(e, t) {
			this.lineRangeMapping = e, this.changes = t;
		}
	};
	function Ou(e, t, n = (r, i) => r === i) {
		if (e === t) return !0;
		if (!e || !t || e.length !== t.length) return !1;
		for (let r = 0, i = e.length; r < i; r++) if (!n(e[r], t[r])) return !1;
		return !0;
	}
	function* $u(e, t) {
		let n, r;
		for (const i of e) r !== void 0 && t(r, i) ? n.push(i) : (n && (yield n), n = [i]), r = i;
		n && (yield n);
	}
	function Bu(e, t) {
		for (let n = 0; n <= e.length; n++) t(n === 0 ? void 0 : e[n - 1], n === e.length ? void 0 : e[n]);
	}
	function Uu(e, t) {
		for (let n = 0; n < e.length; n++) t(n === 0 ? void 0 : e[n - 1], e[n], n + 1 === e.length ? void 0 : e[n + 1]);
	}
	function qu(e, t) {
		for (const n of t) e.push(n);
	}
	var Lr;
	(function(e) {
		function t(s) {
			return s < 0;
		}
		e.isLessThan = t;
		function n(s) {
			return s <= 0;
		}
		e.isLessThanOrEqual = n;
		function r(s) {
			return s > 0;
		}
		e.isGreaterThan = r;
		function i(s) {
			return s === 0;
		}
		e.isNeitherLessOrGreaterThan = i, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
	})(Lr || (Lr = {}));
	function dt(e, t) {
		return (n, r) => t(e(n), e(r));
	}
	const Ut = (e, t) => e - t;
	function ju(e) {
		return (t, n) => -e(t, n);
	}
	(class $n {
		static {
			this.empty = new $n((t) => {});
		}
		constructor(t) {
			this.iterate = t;
		}
		toArray() {
			const t = [];
			return this.iterate((n) => (t.push(n), !0)), t;
		}
		filter(t) {
			return new $n((n) => this.iterate((r) => t(r) ? n(r) : !0));
		}
		map(t) {
			return new $n((n) => this.iterate((r) => n(t(r))));
		}
		findLast(t) {
			let n;
			return this.iterate((r) => (t(r) && (n = r), !0)), n;
		}
		findLastMaxBy(t) {
			let n, r = !0;
			return this.iterate((i) => ((r || Lr.isGreaterThan(t(i, n))) && (r = !1, n = i), !0)), n;
		}
	});
	var j = class ve {
		static fromTo(t, n) {
			return new ve(t, n);
		}
		static addRange(t, n) {
			let r = 0;
			for (; r < n.length && n[r].endExclusive < t.start;) r++;
			let i = r;
			for (; i < n.length && n[i].start <= t.endExclusive;) i++;
			if (r === i) n.splice(r, 0, t);
			else {
				const s = Math.min(t.start, n[r].start), a = Math.max(t.endExclusive, n[i - 1].endExclusive);
				n.splice(r, i - r, new ve(s, a));
			}
		}
		static tryCreate(t, n) {
			if (!(t > n)) return new ve(t, n);
		}
		static ofLength(t) {
			return new ve(0, t);
		}
		static ofStartAndLength(t, n) {
			return new ve(t, t + n);
		}
		static emptyAt(t) {
			return new ve(t, t);
		}
		constructor(t, n) {
			if (this.start = t, this.endExclusive = n, t > n) throw new ae(`Invalid range: ${this.toString()}`);
		}
		get isEmpty() {
			return this.start === this.endExclusive;
		}
		delta(t) {
			return new ve(this.start + t, this.endExclusive + t);
		}
		deltaStart(t) {
			return new ve(this.start + t, this.endExclusive);
		}
		deltaEnd(t) {
			return new ve(this.start, this.endExclusive + t);
		}
		get length() {
			return this.endExclusive - this.start;
		}
		toString() {
			return `[${this.start}, ${this.endExclusive})`;
		}
		equals(t) {
			return this.start === t.start && this.endExclusive === t.endExclusive;
		}
		containsRange(t) {
			return this.start <= t.start && t.endExclusive <= this.endExclusive;
		}
		contains(t) {
			return this.start <= t && t < this.endExclusive;
		}
		join(t) {
			return new ve(Math.min(this.start, t.start), Math.max(this.endExclusive, t.endExclusive));
		}
		intersect(t) {
			const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
			if (n <= r) return new ve(n, r);
		}
		intersectionLength(t) {
			const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
			return Math.max(0, r - n);
		}
		intersects(t) {
			return Math.max(this.start, t.start) < Math.min(this.endExclusive, t.endExclusive);
		}
		intersectsOrTouches(t) {
			return Math.max(this.start, t.start) <= Math.min(this.endExclusive, t.endExclusive);
		}
		isBefore(t) {
			return this.endExclusive <= t.start;
		}
		isAfter(t) {
			return this.start >= t.endExclusive;
		}
		slice(t) {
			return t.slice(this.start, this.endExclusive);
		}
		substring(t) {
			return t.substring(this.start, this.endExclusive);
		}
		clip(t) {
			if (this.isEmpty) throw new ae(`Invalid clipping range: ${this.toString()}`);
			return Math.max(this.start, Math.min(this.endExclusive - 1, t));
		}
		clipCyclic(t) {
			if (this.isEmpty) throw new ae(`Invalid clipping range: ${this.toString()}`);
			return t < this.start ? this.endExclusive - (this.start - t) % this.length : t >= this.endExclusive ? this.start + (t - this.start) % this.length : t;
		}
		forEach(t) {
			for (let n = this.start; n < this.endExclusive; n++) t(n);
		}
		joinRightTouching(t) {
			if (this.endExclusive !== t.start) throw new ae(`Invalid join: ${this.toString()} and ${t.toString()}`);
			return new ve(this.start, t.endExclusive);
		}
		withMargin(t, n) {
			return n === void 0 && (n = t), new ve(this.start - t, this.endExclusive + n);
		}
	};
	function pt(e, t) {
		const n = bt(e, t);
		return n === -1 ? void 0 : e[n];
	}
	function bt(e, t, n = 0, r = e.length) {
		let i = n, s = r;
		for (; i < s;) {
			const a = Math.floor((i + s) / 2);
			t(e[a]) ? i = a + 1 : s = a;
		}
		return i - 1;
	}
	function Wu(e, t) {
		const n = _r(e, t);
		return n === e.length ? void 0 : e[n];
	}
	function _r(e, t, n = 0, r = e.length) {
		let i = n, s = r;
		for (; i < s;) {
			const a = Math.floor((i + s) / 2);
			t(e[a]) ? s = a : i = a + 1;
		}
		return i;
	}
	var w1 = class Mo {
		static {
			this.assertInvariants = !1;
		}
		constructor(t) {
			this._array = t, this._findLastMonotonousLastIdx = 0;
		}
		findLastMonotonous(t) {
			if (Mo.assertInvariants) {
				if (this._prevFindLastPredicate) {
					for (const r of this._array) if (this._prevFindLastPredicate(r) && !t(r)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
				}
				this._prevFindLastPredicate = t;
			}
			const n = bt(this._array, t, this._findLastMonotonousLastIdx);
			return this._findLastMonotonousLastIdx = n + 1, n === -1 ? void 0 : this._array[n];
		}
	}, J = class Me {
		static ofLength(t, n) {
			return new Me(t, t + n);
		}
		static fromRange(t) {
			return new Me(t.startLineNumber, t.endLineNumber);
		}
		static fromRangeInclusive(t) {
			return new Me(t.startLineNumber, t.endLineNumber + 1);
		}
		static {
			this.compareByStart = dt((t) => t.startLineNumber, Ut);
		}
		static joinMany(t) {
			if (t.length === 0) return [];
			let n = new yn(t[0].slice());
			for (let r = 1; r < t.length; r++) n = n.getUnion(new yn(t[r].slice()));
			return n.ranges;
		}
		static join(t) {
			if (t.length === 0) throw new ae("lineRanges cannot be empty");
			let n = t[0].startLineNumber, r = t[0].endLineNumberExclusive;
			for (let i = 1; i < t.length; i++) n = Math.min(n, t[i].startLineNumber), r = Math.max(r, t[i].endLineNumberExclusive);
			return new Me(n, r);
		}
		static deserialize(t) {
			return new Me(t[0], t[1]);
		}
		constructor(t, n) {
			if (t > n) throw new ae(`startLineNumber ${t} cannot be after endLineNumberExclusive ${n}`);
			this.startLineNumber = t, this.endLineNumberExclusive = n;
		}
		contains(t) {
			return this.startLineNumber <= t && t < this.endLineNumberExclusive;
		}
		get isEmpty() {
			return this.startLineNumber === this.endLineNumberExclusive;
		}
		delta(t) {
			return new Me(this.startLineNumber + t, this.endLineNumberExclusive + t);
		}
		deltaLength(t) {
			return new Me(this.startLineNumber, this.endLineNumberExclusive + t);
		}
		get length() {
			return this.endLineNumberExclusive - this.startLineNumber;
		}
		join(t) {
			return new Me(Math.min(this.startLineNumber, t.startLineNumber), Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive));
		}
		toString() {
			return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
		}
		intersect(t) {
			const n = Math.max(this.startLineNumber, t.startLineNumber), r = Math.min(this.endLineNumberExclusive, t.endLineNumberExclusive);
			if (n <= r) return new Me(n, r);
		}
		intersectsStrict(t) {
			return this.startLineNumber < t.endLineNumberExclusive && t.startLineNumber < this.endLineNumberExclusive;
		}
		intersectsOrTouches(t) {
			return this.startLineNumber <= t.endLineNumberExclusive && t.startLineNumber <= this.endLineNumberExclusive;
		}
		equals(t) {
			return this.startLineNumber === t.startLineNumber && this.endLineNumberExclusive === t.endLineNumberExclusive;
		}
		toInclusiveRange() {
			return this.isEmpty ? null : new q(this.startLineNumber, 1, this.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER);
		}
		toExclusiveRange() {
			return new q(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
		}
		mapToLineArray(t) {
			const n = [];
			for (let r = this.startLineNumber; r < this.endLineNumberExclusive; r++) n.push(t(r));
			return n;
		}
		forEach(t) {
			for (let n = this.startLineNumber; n < this.endLineNumberExclusive; n++) t(n);
		}
		serialize() {
			return [this.startLineNumber, this.endLineNumberExclusive];
		}
		toOffsetRange() {
			return new j(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
		}
		addMargin(t, n) {
			return new Me(this.startLineNumber - t, this.endLineNumberExclusive + n);
		}
	}, yn = class Ct {
		constructor(t = []) {
			this._normalizedRanges = t;
		}
		get ranges() {
			return this._normalizedRanges;
		}
		addRange(t) {
			if (t.length === 0) return;
			const n = _r(this._normalizedRanges, (i) => i.endLineNumberExclusive >= t.startLineNumber), r = bt(this._normalizedRanges, (i) => i.startLineNumber <= t.endLineNumberExclusive) + 1;
			if (n === r) this._normalizedRanges.splice(n, 0, t);
			else if (n === r - 1) {
				const i = this._normalizedRanges[n];
				this._normalizedRanges[n] = i.join(t);
			} else {
				const i = this._normalizedRanges[n].join(this._normalizedRanges[r - 1]).join(t);
				this._normalizedRanges.splice(n, r - n, i);
			}
		}
		contains(t) {
			const n = pt(this._normalizedRanges, (r) => r.startLineNumber <= t);
			return !!n && n.endLineNumberExclusive > t;
		}
		intersects(t) {
			const n = pt(this._normalizedRanges, (r) => r.startLineNumber < t.endLineNumberExclusive);
			return !!n && n.endLineNumberExclusive > t.startLineNumber;
		}
		getUnion(t) {
			if (this._normalizedRanges.length === 0) return t;
			if (t._normalizedRanges.length === 0) return this;
			const n = [];
			let r = 0, i = 0, s = null;
			for (; r < this._normalizedRanges.length || i < t._normalizedRanges.length;) {
				let a = null;
				if (r < this._normalizedRanges.length && i < t._normalizedRanges.length) {
					const l = this._normalizedRanges[r], o = t._normalizedRanges[i];
					l.startLineNumber < o.startLineNumber ? (a = l, r++) : (a = o, i++);
				} else r < this._normalizedRanges.length ? (a = this._normalizedRanges[r], r++) : (a = t._normalizedRanges[i], i++);
				s === null ? s = a : s.endLineNumberExclusive >= a.startLineNumber ? s = new J(s.startLineNumber, Math.max(s.endLineNumberExclusive, a.endLineNumberExclusive)) : (n.push(s), s = a);
			}
			return s !== null && n.push(s), new Ct(n);
		}
		subtractFrom(t) {
			const n = _r(this._normalizedRanges, (a) => a.endLineNumberExclusive >= t.startLineNumber), r = bt(this._normalizedRanges, (a) => a.startLineNumber <= t.endLineNumberExclusive) + 1;
			if (n === r) return new Ct([t]);
			const i = [];
			let s = t.startLineNumber;
			for (let a = n; a < r; a++) {
				const l = this._normalizedRanges[a];
				l.startLineNumber > s && i.push(new J(s, l.startLineNumber)), s = l.endLineNumberExclusive;
			}
			return s < t.endLineNumberExclusive && i.push(new J(s, t.endLineNumberExclusive)), new Ct(i);
		}
		toString() {
			return this._normalizedRanges.map((t) => t.toString()).join(", ");
		}
		getIntersection(t) {
			const n = [];
			let r = 0, i = 0;
			for (; r < this._normalizedRanges.length && i < t._normalizedRanges.length;) {
				const s = this._normalizedRanges[r], a = t._normalizedRanges[i], l = s.intersect(a);
				l && !l.isEmpty && n.push(l), s.endLineNumberExclusive < a.endLineNumberExclusive ? r++ : i++;
			}
			return new Ct(n);
		}
		getWithDelta(t) {
			return new Ct(this._normalizedRanges.map((n) => n.delta(t)));
		}
	}, yt = class We {
		static {
			this.zero = new We(0, 0);
		}
		static betweenPositions(t, n) {
			return t.lineNumber === n.lineNumber ? new We(0, n.column - t.column) : new We(n.lineNumber - t.lineNumber, n.column - 1);
		}
		static fromPosition(t) {
			return new We(t.lineNumber - 1, t.column - 1);
		}
		static ofRange(t) {
			return We.betweenPositions(t.getStartPosition(), t.getEndPosition());
		}
		static ofText(t) {
			let n = 0, r = 0;
			for (const i of t) i === `
` ? (n++, r = 0) : r++;
			return new We(n, r);
		}
		constructor(t, n) {
			this.lineCount = t, this.columnCount = n;
		}
		isGreaterThanOrEqualTo(t) {
			return this.lineCount !== t.lineCount ? this.lineCount > t.lineCount : this.columnCount >= t.columnCount;
		}
		add(t) {
			return t.lineCount === 0 ? new We(this.lineCount, this.columnCount + t.columnCount) : new We(this.lineCount + t.lineCount, t.columnCount);
		}
		createRange(t) {
			return this.lineCount === 0 ? new q(t.lineNumber, t.column, t.lineNumber, t.column + this.columnCount) : new q(t.lineNumber, t.column, t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		toRange() {
			return new q(1, 1, this.lineCount + 1, this.columnCount + 1);
		}
		toLineRange() {
			return J.ofLength(1, this.lineCount + 1);
		}
		addToPosition(t) {
			return this.lineCount === 0 ? new G(t.lineNumber, t.column + this.columnCount) : new G(t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		toString() {
			return `${this.lineCount},${this.columnCount}`;
		}
	}, Hu = class {
		getOffsetRange(e) {
			return new j(this.getOffset(e.getStartPosition()), this.getOffset(e.getEndPosition()));
		}
		getRange(e) {
			return q.fromPositions(this.getPosition(e.start), this.getPosition(e.endExclusive));
		}
		getStringReplacement(e) {
			return new qt.deps.StringReplacement(this.getOffsetRange(e.range), e.text);
		}
		getTextReplacement(e) {
			return new qt.deps.TextReplacement(this.getRange(e.replaceRange), e.newText);
		}
		getTextEdit(e) {
			const t = e.replacements.map((n) => this.getTextReplacement(n));
			return new qt.deps.TextEdit(t);
		}
	}, qt = class {
		static {
			this._deps = void 0;
		}
		static get deps() {
			if (!this._deps) throw new Error("Dependencies not set. Call _setDependencies first.");
			return this._deps;
		}
	};
	function zu(e) {
		qt._deps = e;
	}
	var L1 = class extends Hu {
		constructor(e) {
			super(), this.text = e;
		}
		get lineStartOffsetByLineIdx() {
			return this._lineStartOffsetByLineIdx || this._computeLineOffsets(), this._lineStartOffsetByLineIdx;
		}
		get lineEndOffsetByLineIdx() {
			return this._lineEndOffsetByLineIdx || this._computeLineOffsets(), this._lineEndOffsetByLineIdx;
		}
		_computeLineOffsets() {
			this._lineStartOffsetByLineIdx = [], this._lineEndOffsetByLineIdx = [], this._lineStartOffsetByLineIdx.push(0);
			for (let e = 0; e < this.text.length; e++) this.text.charAt(e) === `
` && (this._lineStartOffsetByLineIdx.push(e + 1), e > 0 && this.text.charAt(e - 1) === "\r" ? this._lineEndOffsetByLineIdx.push(e - 1) : this._lineEndOffsetByLineIdx.push(e));
			this._lineEndOffsetByLineIdx.push(this.text.length);
		}
		getOffset(e) {
			const t = this._validatePosition(e);
			return this.lineStartOffsetByLineIdx[t.lineNumber - 1] + t.column - 1;
		}
		_validatePosition(e) {
			if (e.lineNumber < 1) return new G(1, 1);
			const t = this.textLength.lineCount + 1;
			if (e.lineNumber > t) return new G(t, this.getLineLength(t) + 1);
			if (e.column < 1) return new G(e.lineNumber, 1);
			const n = this.getLineLength(e.lineNumber);
			return e.column - 1 > n ? new G(e.lineNumber, n + 1) : e;
		}
		getPosition(e) {
			const t = bt(this.lineStartOffsetByLineIdx, (i) => i <= e);
			return new G(t + 1, e - this.lineStartOffsetByLineIdx[t] + 1);
		}
		get textLength() {
			const e = this.lineStartOffsetByLineIdx.length - 1;
			return new qt.deps.TextLength(e, this.text.length - this.lineStartOffsetByLineIdx[e]);
		}
		getLineLength(e) {
			return this.lineEndOffsetByLineIdx[e - 1] - this.lineStartOffsetByLineIdx[e - 1];
		}
	}, _1 = class {
		constructor() {
			this._transformer = void 0;
		}
		get endPositionExclusive() {
			return this.length.addToPosition(new G(1, 1));
		}
		get lineRange() {
			return this.length.toLineRange();
		}
		getValue() {
			return this.getValueOfRange(this.length.toRange());
		}
		getValueOfOffsetRange(e) {
			return this.getValueOfRange(this.getTransformer().getRange(e));
		}
		getLineLength(e) {
			return this.getValueOfRange(new q(e, 1, e, Number.MAX_SAFE_INTEGER)).length;
		}
		getTransformer() {
			return this._transformer || (this._transformer = new L1(this.getValue())), this._transformer;
		}
		getLineAt(e) {
			return this.getValueOfRange(new q(e, 1, e, Number.MAX_SAFE_INTEGER));
		}
	}, Gu = class extends _1 {
		constructor(e, t) {
			Uo(t >= 1), super(), this._getLineContent = e, this._lineCount = t;
		}
		getValueOfRange(e) {
			if (e.startLineNumber === e.endLineNumber) return this._getLineContent(e.startLineNumber).substring(e.startColumn - 1, e.endColumn - 1);
			let t = this._getLineContent(e.startLineNumber).substring(e.startColumn - 1);
			for (let n = e.startLineNumber + 1; n < e.endLineNumber; n++) t += `
` + this._getLineContent(n);
			return t += `
` + this._getLineContent(e.endLineNumber).substring(0, e.endColumn - 1), t;
		}
		getLineLength(e) {
			return this._getLineContent(e).length;
		}
		get length() {
			const e = this._getLineContent(this._lineCount);
			return new yt(this._lineCount - 1, e.length);
		}
	}, vn = class extends Gu {
		constructor(e) {
			super((t) => e[t - 1], e.length);
		}
	}, wn = class extends _1 {
		constructor(e) {
			super(), this.value = e, this._t = new L1(this.value);
		}
		getValueOfRange(e) {
			return this._t.getOffsetRange(e).substring(this.value);
		}
		get length() {
			return this._t.textLength;
		}
		getTransformer() {
			return this._t;
		}
	}, Ju = class hi {
		static fromStringEdit(t, n) {
			const r = t.replacements.map((i) => Ln.fromStringReplacement(i, n));
			return new hi(r);
		}
		static fromParallelReplacementsUnsorted(t) {
			const n = t.slice().sort(dt((r) => r.range, q.compareRangesUsingStarts));
			return new hi(n);
		}
		constructor(t) {
			this.replacements = t, It(() => Hn(t, (n, r) => n.range.getEndPosition().isBeforeOrEqual(r.range.getStartPosition())));
		}
		mapPosition(t) {
			let n = 0, r = 0, i = 0;
			for (const s of this.replacements) {
				const a = s.range.getStartPosition();
				if (t.isBeforeOrEqual(a)) break;
				const l = s.range.getEndPosition(), o = yt.ofText(s.text);
				if (t.isBefore(l)) {
					const c = new G(a.lineNumber + n, a.column + (a.lineNumber + n === r ? i : 0));
					return _n(c, o.addToPosition(c));
				}
				a.lineNumber + n !== r && (i = 0), n += o.lineCount - (s.range.endLineNumber - s.range.startLineNumber), o.lineCount === 0 ? l.lineNumber !== a.lineNumber ? i += o.columnCount - (l.column - 1) : i += o.columnCount - (l.column - a.column) : i = o.columnCount, r = l.lineNumber + n;
			}
			return new G(t.lineNumber + n, t.column + (t.lineNumber + n === r ? i : 0));
		}
		mapRange(t) {
			function n(i) {
				return i instanceof G ? i : i.getStartPosition();
			}
			function r(i) {
				return i instanceof G ? i : i.getEndPosition();
			}
			return _n(n(this.mapPosition(t.getStartPosition())), r(this.mapPosition(t.getEndPosition())));
		}
		apply(t) {
			let n = "", r = new G(1, 1);
			for (const s of this.replacements) {
				const a = s.range, l = a.getStartPosition(), o = a.getEndPosition(), c = _n(r, l);
				c.isEmpty() || (n += t.getValueOfRange(c)), n += s.text, r = o;
			}
			const i = _n(r, t.endPositionExclusive);
			return i.isEmpty() || (n += t.getValueOfRange(i)), n;
		}
		applyToString(t) {
			const n = new wn(t);
			return this.apply(n);
		}
		getNewRanges() {
			const t = [];
			let n = 0, r = 0, i = 0;
			for (const s of this.replacements) {
				const a = yt.ofText(s.text), l = G.lift({
					lineNumber: s.range.startLineNumber + r,
					column: s.range.startColumn + (s.range.startLineNumber === n ? i : 0)
				}), o = a.createRange(l);
				t.push(o), r = o.endLineNumber - s.range.endLineNumber, i = o.endColumn - s.range.endColumn, n = s.range.endLineNumber;
			}
			return t;
		}
		toReplacement(t) {
			if (this.replacements.length === 0) throw new ae();
			if (this.replacements.length === 1) return this.replacements[0];
			const n = this.replacements[0].range.getStartPosition(), r = this.replacements[this.replacements.length - 1].range.getEndPosition();
			let i = "";
			for (let s = 0; s < this.replacements.length; s++) {
				const a = this.replacements[s];
				if (i += a.text, s < this.replacements.length - 1) {
					const l = this.replacements[s + 1], o = q.fromPositions(a.range.getEndPosition(), l.range.getStartPosition()), c = t.getValueOfRange(o);
					i += c;
				}
			}
			return new Ln(q.fromPositions(n, r), i);
		}
		toString(t) {
			return t === void 0 ? this.replacements.map((n) => n.toString()).join(`
`) : typeof t == "string" ? this.toString(new wn(t)) : this.replacements.length === 0 ? "" : this.replacements.map((n) => {
				const i = t.getValueOfRange(n.range), s = q.fromPositions(new G(Math.max(1, n.range.startLineNumber - 1), 1), n.range.getStartPosition());
				let a = t.getValueOfRange(s);
				a.length > 10 && (a = "..." + a.substring(a.length - 10));
				const l = q.fromPositions(n.range.getEndPosition(), new G(n.range.endLineNumber + 1, 1));
				let o = t.getValueOfRange(l);
				o.length > 10 && (o = o.substring(0, 10) + "...");
				let c = i;
				if (c.length > 10) {
					const f = Math.floor(5);
					c = c.substring(0, f) + "..." + c.substring(c.length - f);
				}
				let h = n.text;
				if (h.length > 10) {
					const f = Math.floor(5);
					h = h.substring(0, f) + "..." + h.substring(h.length - f);
				}
				return c.length === 0 ? `${a}❰${h}❱${o}` : `${a}❰${c}↦${h}❱${o}`;
			}).join(`
`);
		}
	}, Ln = class ut {
		static joinReplacements(t, n) {
			if (t.length === 0) throw new ae();
			if (t.length === 1) return t[0];
			const r = t[0].range.getStartPosition(), i = t[t.length - 1].range.getEndPosition();
			let s = "";
			for (let a = 0; a < t.length; a++) {
				const l = t[a];
				if (s += l.text, a < t.length - 1) {
					const o = t[a + 1], c = q.fromPositions(l.range.getEndPosition(), o.range.getStartPosition()), h = n.getValueOfRange(c);
					s += h;
				}
			}
			return new ut(q.fromPositions(r, i), s);
		}
		static fromStringReplacement(t, n) {
			return new ut(n.getTransformer().getRange(t.replaceRange), t.newText);
		}
		static delete(t) {
			return new ut(t, "");
		}
		constructor(t, n) {
			this.range = t, this.text = n;
		}
		get isEmpty() {
			return this.range.isEmpty() && this.text.length === 0;
		}
		static equals(t, n) {
			return t.range.equalsRange(n.range) && t.text === n.text;
		}
		equals(t) {
			return ut.equals(this, t);
		}
		removeCommonPrefixAndSuffix(t) {
			return this.removeCommonPrefix(t).removeCommonSuffix(t);
		}
		removeCommonPrefix(t) {
			const n = t.getValueOfRange(this.range).replaceAll(`\r
`, `
`), r = this.text.replaceAll(`\r
`, `
`), i = tr(n, r), s = yt.ofText(n.substring(0, i)).addToPosition(this.range.getStartPosition()), a = r.substring(i), l = q.fromPositions(s, this.range.getEndPosition());
			return new ut(l, a);
		}
		removeCommonSuffix(t) {
			const n = t.getValueOfRange(this.range).replaceAll(`\r
`, `
`), r = this.text.replaceAll(`\r
`, `
`), i = nr(n, r), s = yt.ofText(n.substring(0, n.length - i)).addToPosition(this.range.getStartPosition()), a = r.substring(0, r.length - i), l = q.fromPositions(this.range.getStartPosition(), s);
			return new ut(l, a);
		}
		toString() {
			const t = this.range.getStartPosition(), n = this.range.getEndPosition();
			return `(${t.lineNumber},${t.column} -> ${n.lineNumber},${n.column}): "${this.text}"`;
		}
	};
	function _n(e, t) {
		if (e.lineNumber === t.lineNumber && e.column === Number.MAX_SAFE_INTEGER) return q.fromPositions(t, t);
		if (!e.isBeforeOrEqual(t)) throw new ae("start must be before end");
		return new q(e.lineNumber, e.column, t.lineNumber, t.column);
	}
	var tt = class Pt {
		static inverse(t, n, r) {
			const i = [];
			let s = 1, a = 1;
			for (const o of t) {
				const c = new Pt(new J(s, o.original.startLineNumber), new J(a, o.modified.startLineNumber));
				c.modified.isEmpty || i.push(c), s = o.original.endLineNumberExclusive, a = o.modified.endLineNumberExclusive;
			}
			const l = new Pt(new J(s, n + 1), new J(a, r + 1));
			return l.modified.isEmpty || i.push(l), i;
		}
		static clip(t, n, r) {
			const i = [];
			for (const s of t) {
				const a = s.original.intersect(n), l = s.modified.intersect(r);
				a && !a.isEmpty && l && !l.isEmpty && i.push(new Pt(a, l));
			}
			return i;
		}
		constructor(t, n) {
			this.original = t, this.modified = n;
		}
		toString() {
			return `{${this.original.toString()}->${this.modified.toString()}}`;
		}
		flip() {
			return new Pt(this.modified, this.original);
		}
		join(t) {
			return new Pt(this.original.join(t.original), this.modified.join(t.modified));
		}
		toRangeMapping() {
			const t = this.original.toInclusiveRange(), n = this.modified.toInclusiveRange();
			if (t && n) return new Pe(t, n);
			if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
				if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1)) throw new ae("not a valid diff");
				return new Pe(new q(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new q(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			} else return new Pe(new q(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), new q(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER));
		}
		toRangeMapping2(t, n) {
			if (N1(this.original.endLineNumberExclusive, t) && N1(this.modified.endLineNumberExclusive, n)) return new Pe(new q(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new q(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			if (!this.original.isEmpty && !this.modified.isEmpty) return new Pe(q.fromPositions(new G(this.original.startLineNumber, 1), vt(new G(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), q.fromPositions(new G(this.modified.startLineNumber, 1), vt(new G(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1) return new Pe(q.fromPositions(vt(new G(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), t), vt(new G(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), q.fromPositions(vt(new G(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), n), vt(new G(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			throw new ae();
		}
	};
	function vt(e, t) {
		if (e.lineNumber < 1) return new G(1, 1);
		if (e.lineNumber > t.length) return new G(t.length, t[t.length - 1].length + 1);
		const n = t[e.lineNumber - 1];
		return e.column > n.length + 1 ? new G(e.lineNumber, n.length + 1) : e;
	}
	function N1(e, t) {
		return e >= 1 && e <= t.length;
	}
	var jt = class Bn extends tt {
		static fromRangeMappings(t) {
			const n = J.join(t.map((i) => J.fromRangeInclusive(i.originalRange))), r = J.join(t.map((i) => J.fromRangeInclusive(i.modifiedRange)));
			return new Bn(n, r, t);
		}
		constructor(t, n, r) {
			super(t, n), this.innerChanges = r;
		}
		flip() {
			return new Bn(this.modified, this.original, this.innerChanges?.map((t) => t.flip()));
		}
		withInnerChangesFromLineRanges() {
			return new Bn(this.original, this.modified, [this.toRangeMapping()]);
		}
	}, Pe = class mi {
		static fromEdit(t) {
			const n = t.getNewRanges();
			return t.replacements.map((r, i) => new mi(r.range, n[i]));
		}
		static assertSorted(t) {
			for (let n = 1; n < t.length; n++) {
				const r = t[n - 1], i = t[n];
				if (!(r.originalRange.getEndPosition().isBeforeOrEqual(i.originalRange.getStartPosition()) && r.modifiedRange.getEndPosition().isBeforeOrEqual(i.modifiedRange.getStartPosition()))) throw new ae("Range mappings must be sorted");
			}
		}
		constructor(t, n) {
			this.originalRange = t, this.modifiedRange = n;
		}
		toString() {
			return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
		}
		flip() {
			return new mi(this.modifiedRange, this.originalRange);
		}
		toTextEdit(t) {
			const n = t.getValueOfRange(this.modifiedRange);
			return new Ln(this.originalRange, n);
		}
	};
	function Nr(e, t, n, r = !1) {
		const i = [];
		for (const s of $u(e.map((a) => Xu(a, t, n)), (a, l) => a.original.intersectsOrTouches(l.original) || a.modified.intersectsOrTouches(l.modified))) {
			const a = s[0], l = s[s.length - 1];
			i.push(new jt(a.original.join(l.original), a.modified.join(l.modified), s.map((o) => o.innerChanges[0])));
		}
		return It(() => !r && i.length > 0 && (i[0].modified.startLineNumber !== i[0].original.startLineNumber || n.length.lineCount - i[i.length - 1].modified.endLineNumberExclusive !== t.length.lineCount - i[i.length - 1].original.endLineNumberExclusive) ? !1 : Hn(i, (s, a) => a.original.startLineNumber - s.original.endLineNumberExclusive === a.modified.startLineNumber - s.modified.endLineNumberExclusive && s.original.endLineNumberExclusive < a.original.startLineNumber && s.modified.endLineNumberExclusive < a.modified.startLineNumber)), i;
	}
	function Xu(e, t, n) {
		let r = 0, i = 0;
		e.modifiedRange.endColumn === 1 && e.originalRange.endColumn === 1 && e.originalRange.startLineNumber + r <= e.originalRange.endLineNumber && e.modifiedRange.startLineNumber + r <= e.modifiedRange.endLineNumber && (i = -1), e.modifiedRange.startColumn - 1 >= n.getLineLength(e.modifiedRange.startLineNumber) && e.originalRange.startColumn - 1 >= t.getLineLength(e.originalRange.startLineNumber) && e.originalRange.startLineNumber <= e.originalRange.endLineNumber + i && e.modifiedRange.startLineNumber <= e.modifiedRange.endLineNumber + i && (r = 1);
		return new jt(new J(e.originalRange.startLineNumber + r, e.originalRange.endLineNumber + 1 + i), new J(e.modifiedRange.startLineNumber + r, e.modifiedRange.endLineNumber + 1 + i), [e]);
	}
	const Qu = 3;
	var Yu = class {
		computeDiff(e, t, n) {
			const r = new ec(e, t, {
				maxComputationTime: n.maxComputationTimeMs,
				shouldIgnoreTrimWhitespace: n.ignoreTrimWhitespace,
				shouldComputeCharChanges: !0,
				shouldMakePrettyDiff: !0,
				shouldPostProcessCharChanges: !0
			}).computeDiff(), i = [];
			let s = null;
			for (const a of r.changes) {
				let l;
				a.originalEndLineNumber === 0 ? l = new J(a.originalStartLineNumber + 1, a.originalStartLineNumber + 1) : l = new J(a.originalStartLineNumber, a.originalEndLineNumber + 1);
				let o;
				a.modifiedEndLineNumber === 0 ? o = new J(a.modifiedStartLineNumber + 1, a.modifiedStartLineNumber + 1) : o = new J(a.modifiedStartLineNumber, a.modifiedEndLineNumber + 1);
				let c = new jt(l, o, a.charChanges?.map((h) => new Pe(new q(h.originalStartLineNumber, h.originalStartColumn, h.originalEndLineNumber, h.originalEndColumn), new q(h.modifiedStartLineNumber, h.modifiedStartColumn, h.modifiedEndLineNumber, h.modifiedEndColumn))));
				s && (s.modified.endLineNumberExclusive === c.modified.startLineNumber || s.original.endLineNumberExclusive === c.original.startLineNumber) && (c = new jt(s.original.join(c.original), s.modified.join(c.modified), s.innerChanges && c.innerChanges ? s.innerChanges.concat(c.innerChanges) : void 0), i.pop()), i.push(c), s = c;
			}
			return It(() => Hn(i, (a, l) => l.original.startLineNumber - a.original.endLineNumberExclusive === l.modified.startLineNumber - a.modified.endLineNumberExclusive && a.original.endLineNumberExclusive < l.original.startLineNumber && a.modified.endLineNumberExclusive < l.modified.startLineNumber)), new Bt(i, [], r.quitEarly);
		}
	};
	function S1(e, t, n, r) {
		return new Wi(e, t, n).ComputeDiff(r);
	}
	var A1 = class {
		constructor(e) {
			const t = [], n = [];
			for (let r = 0, i = e.length; r < i; r++) t[r] = Ar(e[r], 1), n[r] = xr(e[r], 1);
			this.lines = e, this._startColumns = t, this._endColumns = n;
		}
		getElements() {
			const e = [];
			for (let t = 0, n = this.lines.length; t < n; t++) e[t] = this.lines[t].substring(this._startColumns[t] - 1, this._endColumns[t] - 1);
			return e;
		}
		getStrictElement(e) {
			return this.lines[e];
		}
		getStartLineNumber(e) {
			return e + 1;
		}
		getEndLineNumber(e) {
			return e + 1;
		}
		createCharSequence(e, t, n) {
			const r = [], i = [], s = [];
			let a = 0;
			for (let l = t; l <= n; l++) {
				const o = this.lines[l], c = e ? this._startColumns[l] : 1, h = e ? this._endColumns[l] : o.length + 1;
				for (let f = c; f < h; f++) r[a] = o.charCodeAt(f - 1), i[a] = l + 1, s[a] = f, a++;
				!e && l < n && (r[a] = 10, i[a] = l + 1, s[a] = o.length + 1, a++);
			}
			return new Zu(r, i, s);
		}
	}, Zu = class {
		constructor(e, t, n) {
			this._charCodes = e, this._lineNumbers = t, this._columns = n;
		}
		toString() {
			return "[" + this._charCodes.map((e, t) => (e === 10 ? "\\n" : String.fromCharCode(e)) + `-(${this._lineNumbers[t]},${this._columns[t]})`).join(", ") + "]";
		}
		_assertIndex(e, t) {
			if (e < 0 || e >= t.length) throw new Error("Illegal index");
		}
		getElements() {
			return this._charCodes;
		}
		getStartLineNumber(e) {
			return e > 0 && e === this._lineNumbers.length ? this.getEndLineNumber(e - 1) : (this._assertIndex(e, this._lineNumbers), this._lineNumbers[e]);
		}
		getEndLineNumber(e) {
			return e === -1 ? this.getStartLineNumber(e + 1) : (this._assertIndex(e, this._lineNumbers), this._charCodes[e] === 10 ? this._lineNumbers[e] + 1 : this._lineNumbers[e]);
		}
		getStartColumn(e) {
			return e > 0 && e === this._columns.length ? this.getEndColumn(e - 1) : (this._assertIndex(e, this._columns), this._columns[e]);
		}
		getEndColumn(e) {
			return e === -1 ? this.getStartColumn(e + 1) : (this._assertIndex(e, this._columns), this._charCodes[e] === 10 ? 1 : this._columns[e] + 1);
		}
	}, Nn = class Co {
		constructor(t, n, r, i, s, a, l, o) {
			this.originalStartLineNumber = t, this.originalStartColumn = n, this.originalEndLineNumber = r, this.originalEndColumn = i, this.modifiedStartLineNumber = s, this.modifiedStartColumn = a, this.modifiedEndLineNumber = l, this.modifiedEndColumn = o;
		}
		static createFromDiffChange(t, n, r) {
			const i = n.getStartLineNumber(t.originalStart), s = n.getStartColumn(t.originalStart), a = n.getEndLineNumber(t.originalStart + t.originalLength - 1), l = n.getEndColumn(t.originalStart + t.originalLength - 1), o = r.getStartLineNumber(t.modifiedStart), c = r.getStartColumn(t.modifiedStart), h = r.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1), f = r.getEndColumn(t.modifiedStart + t.modifiedLength - 1);
			return new Co(i, s, a, l, o, c, h, f);
		}
	};
	function Ku(e) {
		if (e.length <= 1) return e;
		const t = [e[0]];
		let n = t[0];
		for (let r = 1, i = e.length; r < i; r++) {
			const s = e[r], a = s.originalStart - (n.originalStart + n.originalLength), l = s.modifiedStart - (n.modifiedStart + n.modifiedLength);
			Math.min(a, l) < Qu ? (n.originalLength = s.originalStart + s.originalLength - n.originalStart, n.modifiedLength = s.modifiedStart + s.modifiedLength - n.modifiedStart) : (t.push(s), n = s);
		}
		return t;
	}
	var Sr = class Po {
		constructor(t, n, r, i, s) {
			this.originalStartLineNumber = t, this.originalEndLineNumber = n, this.modifiedStartLineNumber = r, this.modifiedEndLineNumber = i, this.charChanges = s;
		}
		static createFromDiffResult(t, n, r, i, s, a, l) {
			let o, c, h, f, m;
			if (n.originalLength === 0 ? (o = r.getStartLineNumber(n.originalStart) - 1, c = 0) : (o = r.getStartLineNumber(n.originalStart), c = r.getEndLineNumber(n.originalStart + n.originalLength - 1)), n.modifiedLength === 0 ? (h = i.getStartLineNumber(n.modifiedStart) - 1, f = 0) : (h = i.getStartLineNumber(n.modifiedStart), f = i.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1)), a && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && s()) {
				const g = r.createCharSequence(t, n.originalStart, n.originalStart + n.originalLength - 1), d = i.createCharSequence(t, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1);
				if (g.getElements().length > 0 && d.getElements().length > 0) {
					let p = S1(g, d, s, !0).changes;
					l && (p = Ku(p)), m = [];
					for (let y = 0, L = p.length; y < L; y++) m.push(Nn.createFromDiffChange(p[y], g, d));
				}
			}
			return new Po(o, c, h, f, m);
		}
	}, ec = class {
		constructor(e, t, n) {
			this.shouldComputeCharChanges = n.shouldComputeCharChanges, this.shouldPostProcessCharChanges = n.shouldPostProcessCharChanges, this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace, this.shouldMakePrettyDiff = n.shouldMakePrettyDiff, this.originalLines = e, this.modifiedLines = t, this.original = new A1(e), this.modified = new A1(t), this.continueLineDiff = x1(n.maxComputationTime), this.continueCharDiff = x1(n.maxComputationTime === 0 ? 0 : Math.min(n.maxComputationTime, 5e3));
		}
		computeDiff() {
			if (this.original.lines.length === 1 && this.original.lines[0].length === 0) return this.modified.lines.length === 1 && this.modified.lines[0].length === 0 ? {
				quitEarly: !1,
				changes: []
			} : {
				quitEarly: !1,
				changes: [{
					originalStartLineNumber: 1,
					originalEndLineNumber: 1,
					modifiedStartLineNumber: 1,
					modifiedEndLineNumber: this.modified.lines.length,
					charChanges: void 0
				}]
			};
			if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) return {
				quitEarly: !1,
				changes: [{
					originalStartLineNumber: 1,
					originalEndLineNumber: this.original.lines.length,
					modifiedStartLineNumber: 1,
					modifiedEndLineNumber: 1,
					charChanges: void 0
				}]
			};
			const e = S1(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff), t = e.changes, n = e.quitEarly;
			if (this.shouldIgnoreTrimWhitespace) {
				const a = [];
				for (let l = 0, o = t.length; l < o; l++) a.push(Sr.createFromDiffResult(this.shouldIgnoreTrimWhitespace, t[l], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
				return {
					quitEarly: n,
					changes: a
				};
			}
			const r = [];
			let i = 0, s = 0;
			for (let a = -1, l = t.length; a < l; a++) {
				const o = a + 1 < l ? t[a + 1] : null, c = o ? o.originalStart : this.originalLines.length, h = o ? o.modifiedStart : this.modifiedLines.length;
				for (; i < c && s < h;) {
					const f = this.originalLines[i], m = this.modifiedLines[s];
					if (f !== m) {
						{
							let g = Ar(f, 1), d = Ar(m, 1);
							for (; g > 1 && d > 1 && f.charCodeAt(g - 2) === m.charCodeAt(d - 2);) g--, d--;
							(g > 1 || d > 1) && this._pushTrimWhitespaceCharChange(r, i + 1, 1, g, s + 1, 1, d);
						}
						{
							let g = xr(f, 1), d = xr(m, 1);
							const p = f.length + 1, y = m.length + 1;
							for (; g < p && d < y && f.charCodeAt(g - 1) === f.charCodeAt(d - 1);) g++, d++;
							(g < p || d < y) && this._pushTrimWhitespaceCharChange(r, i + 1, g, p, s + 1, d, y);
						}
					}
					i++, s++;
				}
				o && (r.push(Sr.createFromDiffResult(this.shouldIgnoreTrimWhitespace, o, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges)), i += o.originalLength, s += o.modifiedLength);
			}
			return {
				quitEarly: n,
				changes: r
			};
		}
		_pushTrimWhitespaceCharChange(e, t, n, r, i, s, a) {
			if (this._mergeTrimWhitespaceCharChange(e, t, n, r, i, s, a)) return;
			let l;
			this.shouldComputeCharChanges && (l = [new Nn(t, n, t, r, i, s, i, a)]), e.push(new Sr(t, t, i, i, l));
		}
		_mergeTrimWhitespaceCharChange(e, t, n, r, i, s, a) {
			const l = e.length;
			if (l === 0) return !1;
			const o = e[l - 1];
			return o.originalEndLineNumber === 0 || o.modifiedEndLineNumber === 0 ? !1 : o.originalEndLineNumber === t && o.modifiedEndLineNumber === i ? (this.shouldComputeCharChanges && o.charChanges && o.charChanges.push(new Nn(t, n, t, r, i, s, i, a)), !0) : o.originalEndLineNumber + 1 === t && o.modifiedEndLineNumber + 1 === i ? (o.originalEndLineNumber = t, o.modifiedEndLineNumber = i, this.shouldComputeCharChanges && o.charChanges && o.charChanges.push(new Nn(t, n, t, r, i, s, i, a)), !0) : !1;
		}
	};
	function Ar(e, t) {
		const n = wl(e);
		return n === -1 ? t : n + 1;
	}
	function xr(e, t) {
		const n = Ll(e);
		return n === -1 ? t : n + 2;
	}
	function x1(e) {
		if (e === 0) return () => !0;
		const t = Date.now();
		return () => Date.now() - t < e;
	}
	var wt = class gi {
		static trivial(t, n) {
			return new gi([new ye(j.ofLength(t.length), j.ofLength(n.length))], !1);
		}
		static trivialTimedOut(t, n) {
			return new gi([new ye(j.ofLength(t.length), j.ofLength(n.length))], !0);
		}
		constructor(t, n) {
			this.diffs = t, this.hitTimeout = n;
		}
	}, ye = class He {
		static invert(t, n) {
			const r = [];
			return Bu(t, (i, s) => {
				r.push(He.fromOffsetPairs(i ? i.getEndExclusives() : nt.zero, s ? s.getStarts() : new nt(n, (i ? i.seq2Range.endExclusive - i.seq1Range.endExclusive : 0) + n)));
			}), r;
		}
		static fromOffsetPairs(t, n) {
			return new He(new j(t.offset1, n.offset1), new j(t.offset2, n.offset2));
		}
		static assertSorted(t) {
			let n;
			for (const r of t) {
				if (n && !(n.seq1Range.endExclusive <= r.seq1Range.start && n.seq2Range.endExclusive <= r.seq2Range.start)) throw new ae("Sequence diffs must be sorted");
				n = r;
			}
		}
		constructor(t, n) {
			this.seq1Range = t, this.seq2Range = n;
		}
		swap() {
			return new He(this.seq2Range, this.seq1Range);
		}
		toString() {
			return `${this.seq1Range} <-> ${this.seq2Range}`;
		}
		join(t) {
			return new He(this.seq1Range.join(t.seq1Range), this.seq2Range.join(t.seq2Range));
		}
		delta(t) {
			return t === 0 ? this : new He(this.seq1Range.delta(t), this.seq2Range.delta(t));
		}
		deltaStart(t) {
			return t === 0 ? this : new He(this.seq1Range.deltaStart(t), this.seq2Range.deltaStart(t));
		}
		deltaEnd(t) {
			return t === 0 ? this : new He(this.seq1Range.deltaEnd(t), this.seq2Range.deltaEnd(t));
		}
		intersect(t) {
			const n = this.seq1Range.intersect(t.seq1Range), r = this.seq2Range.intersect(t.seq2Range);
			if (!(!n || !r)) return new He(n, r);
		}
		getStarts() {
			return new nt(this.seq1Range.start, this.seq2Range.start);
		}
		getEndExclusives() {
			return new nt(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
		}
	}, nt = class Un {
		static {
			this.zero = new Un(0, 0);
		}
		static {
			this.max = new Un(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
		}
		constructor(t, n) {
			this.offset1 = t, this.offset2 = n;
		}
		toString() {
			return `${this.offset1} <-> ${this.offset2}`;
		}
		delta(t) {
			return t === 0 ? this : new Un(this.offset1 + t, this.offset2 + t);
		}
		equals(t) {
			return this.offset1 === t.offset1 && this.offset2 === t.offset2;
		}
	}, kr = class Io {
		static {
			this.instance = new Io();
		}
		isValid() {
			return !0;
		}
	}, tc = class {
		constructor(e) {
			if (this.timeout = e, this.startTime = Date.now(), this.valid = !0, e <= 0) throw new ae("timeout must be positive");
		}
		isValid() {
			return !(Date.now() - this.startTime < this.timeout) && this.valid && (this.valid = !1), this.valid;
		}
	}, Rr = class {
		constructor(e, t) {
			this.width = e, this.height = t, this.array = [], this.array = new Array(e * t);
		}
		get(e, t) {
			return this.array[e + t * this.width];
		}
		set(e, t, n) {
			this.array[e + t * this.width] = n;
		}
	};
	function Er(e) {
		return e === 32 || e === 9;
	}
	var k1 = class di {
		static {
			this.chrKeys = /* @__PURE__ */ new Map();
		}
		static getKey(t) {
			let n = this.chrKeys.get(t);
			return n === void 0 && (n = this.chrKeys.size, this.chrKeys.set(t, n)), n;
		}
		constructor(t, n, r) {
			this.range = t, this.lines = n, this.source = r, this.histogram = [];
			let i = 0;
			for (let s = t.startLineNumber - 1; s < t.endLineNumberExclusive - 1; s++) {
				const a = n[s];
				for (let o = 0; o < a.length; o++) {
					i++;
					const c = a[o], h = di.getKey(c);
					this.histogram[h] = (this.histogram[h] || 0) + 1;
				}
				i++;
				const l = di.getKey(`
`);
				this.histogram[l] = (this.histogram[l] || 0) + 1;
			}
			this.totalCount = i;
		}
		computeSimilarity(t) {
			let n = 0;
			const r = Math.max(this.histogram.length, t.histogram.length);
			for (let i = 0; i < r; i++) n += Math.abs((this.histogram[i] ?? 0) - (t.histogram[i] ?? 0));
			return 1 - n / (this.totalCount + t.totalCount);
		}
	}, nc = class {
		compute(e, t, n = kr.instance, r) {
			if (e.length === 0 || t.length === 0) return wt.trivial(e, t);
			const i = new Rr(e.length, t.length), s = new Rr(e.length, t.length), a = new Rr(e.length, t.length);
			for (let g = 0; g < e.length; g++) for (let d = 0; d < t.length; d++) {
				if (!n.isValid()) return wt.trivialTimedOut(e, t);
				const p = g === 0 ? 0 : i.get(g - 1, d), y = d === 0 ? 0 : i.get(g, d - 1);
				let L;
				e.getElement(g) === t.getElement(d) ? (g === 0 || d === 0 ? L = 0 : L = i.get(g - 1, d - 1), g > 0 && d > 0 && s.get(g - 1, d - 1) === 3 && (L += a.get(g - 1, d - 1)), L += r ? r(g, d) : 1) : L = -1;
				const _ = Math.max(p, y, L);
				if (_ === L) {
					const b = g > 0 && d > 0 ? a.get(g - 1, d - 1) : 0;
					a.set(g, d, b + 1), s.set(g, d, 3);
				} else _ === p ? (a.set(g, d, 0), s.set(g, d, 1)) : _ === y && (a.set(g, d, 0), s.set(g, d, 2));
				i.set(g, d, _);
			}
			const l = [];
			let o = e.length, c = t.length;
			function h(g, d) {
				(g + 1 !== o || d + 1 !== c) && l.push(new ye(new j(g + 1, o), new j(d + 1, c))), o = g, c = d;
			}
			let f = e.length - 1, m = t.length - 1;
			for (; f >= 0 && m >= 0;) s.get(f, m) === 3 ? (h(f, m), f--, m--) : s.get(f, m) === 1 ? f-- : m--;
			return h(-1, -1), l.reverse(), new wt(l, !1);
		}
	}, R1 = class {
		compute(e, t, n = kr.instance) {
			if (e.length === 0 || t.length === 0) return wt.trivial(e, t);
			const r = e, i = t;
			function s(d, p) {
				for (; d < r.length && p < i.length && r.getElement(d) === i.getElement(p);) d++, p++;
				return d;
			}
			let a = 0;
			const l = new rc();
			l.set(0, s(0, 0));
			const o = new ic();
			o.set(0, l.get(0) === 0 ? null : new E1(null, 0, 0, l.get(0)));
			let c = 0;
			e: for (;;) {
				if (a++, !n.isValid()) return wt.trivialTimedOut(r, i);
				const d = -Math.min(a, i.length + a % 2), p = Math.min(a, r.length + a % 2);
				for (c = d; c <= p; c += 2) {
					const y = c === p ? -1 : l.get(c + 1), L = c === d ? -1 : l.get(c - 1) + 1, _ = Math.min(Math.max(y, L), r.length), b = _ - c;
					if (_ > r.length || b > i.length) continue;
					const N = s(_, b);
					l.set(c, N);
					const v = _ === y ? o.get(c + 1) : o.get(c - 1);
					if (o.set(c, N !== _ ? new E1(v, _, b, N - _) : v), l.get(c) === r.length && l.get(c) - c === i.length) break e;
				}
			}
			let h = o.get(c);
			const f = [];
			let m = r.length, g = i.length;
			for (;;) {
				const d = h ? h.x + h.length : 0, p = h ? h.y + h.length : 0;
				if ((d !== m || p !== g) && f.push(new ye(new j(d, m), new j(p, g))), !h) break;
				m = h.x, g = h.y, h = h.prev;
			}
			return f.reverse(), new wt(f, !1);
		}
	}, E1 = class {
		constructor(e, t, n, r) {
			this.prev = e, this.x = t, this.y = n, this.length = r;
		}
	}, rc = class {
		constructor() {
			this.positiveArr = /* @__PURE__ */ new Int32Array(10), this.negativeArr = /* @__PURE__ */ new Int32Array(10);
		}
		get(e) {
			return e < 0 ? (e = -e - 1, this.negativeArr[e]) : this.positiveArr[e];
		}
		set(e, t) {
			if (e < 0) {
				if (e = -e - 1, e >= this.negativeArr.length) {
					const n = this.negativeArr;
					this.negativeArr = new Int32Array(n.length * 2), this.negativeArr.set(n);
				}
				this.negativeArr[e] = t;
			} else {
				if (e >= this.positiveArr.length) {
					const n = this.positiveArr;
					this.positiveArr = new Int32Array(n.length * 2), this.positiveArr.set(n);
				}
				this.positiveArr[e] = t;
			}
		}
	}, ic = class {
		constructor() {
			this.positiveArr = [], this.negativeArr = [];
		}
		get(e) {
			return e < 0 ? (e = -e - 1, this.negativeArr[e]) : this.positiveArr[e];
		}
		set(e, t) {
			e < 0 ? (e = -e - 1, this.negativeArr[e] = t) : this.positiveArr[e] = t;
		}
	}, Sn = class {
		constructor(e, t, n) {
			this.lines = e, this.range = t, this.considerWhitespaceChanges = n, this.elements = [], this.firstElementOffsetByLineIdx = [], this.lineStartOffsets = [], this.trimmedWsLengthsByLineIdx = [], this.firstElementOffsetByLineIdx.push(0);
			for (let r = this.range.startLineNumber; r <= this.range.endLineNumber; r++) {
				let i = e[r - 1], s = 0;
				r === this.range.startLineNumber && this.range.startColumn > 1 && (s = this.range.startColumn - 1, i = i.substring(s)), this.lineStartOffsets.push(s);
				let a = 0;
				if (!n) {
					const o = i.trimStart();
					a = i.length - o.length, i = o.trimEnd();
				}
				this.trimmedWsLengthsByLineIdx.push(a);
				const l = r === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - s - a, i.length) : i.length;
				for (let o = 0; o < l; o++) this.elements.push(i.charCodeAt(o));
				r < this.range.endLineNumber && (this.elements.push(10), this.firstElementOffsetByLineIdx.push(this.elements.length));
			}
		}
		toString() {
			return `Slice: "${this.text}"`;
		}
		get text() {
			return this.getText(new j(0, this.length));
		}
		getText(e) {
			return this.elements.slice(e.start, e.endExclusive).map((t) => String.fromCharCode(t)).join("");
		}
		getElement(e) {
			return this.elements[e];
		}
		get length() {
			return this.elements.length;
		}
		getBoundaryScore(e) {
			const t = C1(e > 0 ? this.elements[e - 1] : -1), n = C1(e < this.elements.length ? this.elements[e] : -1);
			if (t === 7 && n === 8) return 0;
			if (t === 8) return 150;
			let r = 0;
			return t !== n && (r += 10, t === 0 && n === 1 && (r += 1)), r += M1(t), r += M1(n), r;
		}
		translateOffset(e, t = "right") {
			const n = bt(this.firstElementOffsetByLineIdx, (i) => i <= e), r = e - this.firstElementOffsetByLineIdx[n];
			return new G(this.range.startLineNumber + n, 1 + this.lineStartOffsets[n] + r + (r === 0 && t === "left" ? 0 : this.trimmedWsLengthsByLineIdx[n]));
		}
		translateRange(e) {
			const t = this.translateOffset(e.start, "right"), n = this.translateOffset(e.endExclusive, "left");
			return n.isBefore(t) ? q.fromPositions(n, n) : q.fromPositions(t, n);
		}
		findWordContaining(e) {
			if (e < 0 || e >= this.elements.length || !Lt(this.elements[e])) return;
			let t = e;
			for (; t > 0 && Lt(this.elements[t - 1]);) t--;
			let n = e;
			for (; n < this.elements.length && Lt(this.elements[n]);) n++;
			return new j(t, n);
		}
		findSubWordContaining(e) {
			if (e < 0 || e >= this.elements.length || !Lt(this.elements[e])) return;
			let t = e;
			for (; t > 0 && Lt(this.elements[t - 1]) && !T1(this.elements[t]);) t--;
			let n = e;
			for (; n < this.elements.length && Lt(this.elements[n]) && !T1(this.elements[n]);) n++;
			return new j(t, n);
		}
		countLinesIn(e) {
			return this.translateOffset(e.endExclusive).lineNumber - this.translateOffset(e.start).lineNumber;
		}
		isStronglyEqual(e, t) {
			return this.elements[e] === this.elements[t];
		}
		extendToFullLines(e) {
			return new j(pt(this.firstElementOffsetByLineIdx, (r) => r <= e.start) ?? 0, Wu(this.firstElementOffsetByLineIdx, (r) => e.endExclusive <= r) ?? this.elements.length);
		}
	};
	function Lt(e) {
		return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57;
	}
	function T1(e) {
		return e >= 65 && e <= 90;
	}
	const sc = {
		0: 0,
		1: 0,
		2: 0,
		3: 10,
		4: 2,
		5: 30,
		6: 3,
		7: 10,
		8: 10
	};
	function M1(e) {
		return sc[e];
	}
	function C1(e) {
		return e === 10 ? 8 : e === 13 ? 7 : Er(e) ? 6 : e >= 97 && e <= 122 ? 0 : e >= 65 && e <= 90 ? 1 : e >= 48 && e <= 57 ? 2 : e === -1 ? 3 : e === 44 || e === 59 ? 5 : 4;
	}
	function ac(e, t, n, r, i, s) {
		let { moves: a, excludedChanges: l } = lc(e, t, n, s);
		if (!s.isValid()) return [];
		const o = uc(e.filter((c) => !l.has(c)), r, i, t, n, s);
		return qu(a, o), a = cc(a), a = a.filter((c) => {
			const h = c.original.toOffsetRange().slice(t).map((f) => f.trim());
			return h.join(`
`).length >= 15 && oc(h, (f) => f.length >= 2) >= 2;
		}), a = fc(e, a), a;
	}
	function oc(e, t) {
		let n = 0;
		for (const r of e) t(r) && n++;
		return n;
	}
	function lc(e, t, n, r) {
		const i = [], s = e.filter((o) => o.modified.isEmpty && o.original.length >= 3).map((o) => new k1(o.original, t, o)), a = new Set(e.filter((o) => o.original.isEmpty && o.modified.length >= 3).map((o) => new k1(o.modified, n, o))), l = /* @__PURE__ */ new Set();
		for (const o of s) {
			let c = -1, h;
			for (const f of a) {
				const m = o.computeSimilarity(f);
				m > c && (c = m, h = f);
			}
			if (c > .9 && h && (a.delete(h), i.push(new tt(o.range, h.range)), l.add(o.source), l.add(h.source)), !r.isValid()) return {
				moves: i,
				excludedChanges: l
			};
		}
		return {
			moves: i,
			excludedChanges: l
		};
	}
	function uc(e, t, n, r, i, s) {
		const a = [], l = new ku();
		for (const m of e) for (let g = m.original.startLineNumber; g < m.original.endLineNumberExclusive - 2; g++) {
			const d = `${t[g - 1]}:${t[g + 1 - 1]}:${t[g + 2 - 1]}`;
			l.add(d, { range: new J(g, g + 3) });
		}
		const o = [];
		e.sort(dt((m) => m.modified.startLineNumber, Ut));
		for (const m of e) {
			let g = [];
			for (let d = m.modified.startLineNumber; d < m.modified.endLineNumberExclusive - 2; d++) {
				const p = `${n[d - 1]}:${n[d + 1 - 1]}:${n[d + 2 - 1]}`, y = new J(d, d + 3), L = [];
				l.forEach(p, ({ range: _ }) => {
					for (const N of g) if (N.originalLineRange.endLineNumberExclusive + 1 === _.endLineNumberExclusive && N.modifiedLineRange.endLineNumberExclusive + 1 === y.endLineNumberExclusive) {
						N.originalLineRange = new J(N.originalLineRange.startLineNumber, _.endLineNumberExclusive), N.modifiedLineRange = new J(N.modifiedLineRange.startLineNumber, y.endLineNumberExclusive), L.push(N);
						return;
					}
					const b = {
						modifiedLineRange: y,
						originalLineRange: _
					};
					o.push(b), L.push(b);
				}), g = L;
			}
			if (!s.isValid()) return [];
		}
		o.sort(ju(dt((m) => m.modifiedLineRange.length, Ut)));
		const c = new yn(), h = new yn();
		for (const m of o) {
			const g = m.modifiedLineRange.startLineNumber - m.originalLineRange.startLineNumber, d = c.subtractFrom(m.modifiedLineRange), p = h.subtractFrom(m.originalLineRange).getWithDelta(g), y = d.getIntersection(p);
			for (const L of y.ranges) {
				if (L.length < 3) continue;
				const _ = L, b = L.delta(-g);
				a.push(new tt(b, _)), c.addRange(_), h.addRange(b);
			}
		}
		a.sort(dt((m) => m.original.startLineNumber, Ut));
		const f = new w1(e);
		for (let m = 0; m < a.length; m++) {
			const g = a[m], d = f.findLastMonotonous((S) => S.original.startLineNumber <= g.original.startLineNumber), p = pt(e, (S) => S.modified.startLineNumber <= g.modified.startLineNumber), y = Math.max(g.original.startLineNumber - d.original.startLineNumber, g.modified.startLineNumber - p.modified.startLineNumber), L = f.findLastMonotonous((S) => S.original.startLineNumber < g.original.endLineNumberExclusive), _ = pt(e, (S) => S.modified.startLineNumber < g.modified.endLineNumberExclusive), b = Math.max(L.original.endLineNumberExclusive - g.original.endLineNumberExclusive, _.modified.endLineNumberExclusive - g.modified.endLineNumberExclusive);
			let N;
			for (N = 0; N < y; N++) {
				const S = g.original.startLineNumber - N - 1, w = g.modified.startLineNumber - N - 1;
				if (S > r.length || w > i.length || c.contains(w) || h.contains(S) || !P1(r[S - 1], i[w - 1], s)) break;
			}
			N > 0 && (h.addRange(new J(g.original.startLineNumber - N, g.original.startLineNumber)), c.addRange(new J(g.modified.startLineNumber - N, g.modified.startLineNumber)));
			let v;
			for (v = 0; v < b; v++) {
				const S = g.original.endLineNumberExclusive + v, w = g.modified.endLineNumberExclusive + v;
				if (S > r.length || w > i.length || c.contains(w) || h.contains(S) || !P1(r[S - 1], i[w - 1], s)) break;
			}
			v > 0 && (h.addRange(new J(g.original.endLineNumberExclusive, g.original.endLineNumberExclusive + v)), c.addRange(new J(g.modified.endLineNumberExclusive, g.modified.endLineNumberExclusive + v))), (N > 0 || v > 0) && (a[m] = new tt(new J(g.original.startLineNumber - N, g.original.endLineNumberExclusive + v), new J(g.modified.startLineNumber - N, g.modified.endLineNumberExclusive + v)));
		}
		return a;
	}
	function P1(e, t, n) {
		if (e.trim() === t.trim()) return !0;
		if (e.length > 300 && t.length > 300) return !1;
		const r = new R1().compute(new Sn([e], new q(1, 1, 1, e.length), !1), new Sn([t], new q(1, 1, 1, t.length), !1), n);
		let i = 0;
		const s = ye.invert(r.diffs, e.length);
		for (const o of s) o.seq1Range.forEach((c) => {
			Er(e.charCodeAt(c)) || i++;
		});
		function a(o) {
			let c = 0;
			for (let h = 0; h < e.length; h++) Er(o.charCodeAt(h)) || c++;
			return c;
		}
		const l = a(e.length > t.length ? e : t);
		return i / l > .6 && l > 10;
	}
	function cc(e) {
		if (e.length === 0) return e;
		e.sort(dt((n) => n.original.startLineNumber, Ut));
		const t = [e[0]];
		for (let n = 1; n < e.length; n++) {
			const r = t[t.length - 1], i = e[n], s = i.original.startLineNumber - r.original.endLineNumberExclusive, a = i.modified.startLineNumber - r.modified.endLineNumberExclusive;
			if (s >= 0 && a >= 0 && s + a <= 2) {
				t[t.length - 1] = r.join(i);
				continue;
			}
			t.push(i);
		}
		return t;
	}
	function fc(e, t) {
		const n = new w1(e);
		return t = t.filter((r) => (n.findLastMonotonous((i) => i.original.startLineNumber < r.original.endLineNumberExclusive) || new tt(new J(1, 1), new J(1, 1))) !== pt(e, (i) => i.modified.startLineNumber < r.modified.endLineNumberExclusive)), t;
	}
	function I1(e, t, n) {
		let r = n;
		return r = F1(e, t, r), r = F1(e, t, r), r = hc(e, t, r), r;
	}
	function F1(e, t, n) {
		if (n.length === 0) return n;
		const r = [];
		r.push(n[0]);
		for (let s = 1; s < n.length; s++) {
			const a = r[r.length - 1];
			let l = n[s];
			if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
				const o = l.seq1Range.start - a.seq1Range.endExclusive;
				let c;
				for (c = 1; c <= o && !(e.getElement(l.seq1Range.start - c) !== e.getElement(l.seq1Range.endExclusive - c) || t.getElement(l.seq2Range.start - c) !== t.getElement(l.seq2Range.endExclusive - c)); c++);
				if (c--, c === o) {
					r[r.length - 1] = new ye(new j(a.seq1Range.start, l.seq1Range.endExclusive - o), new j(a.seq2Range.start, l.seq2Range.endExclusive - o));
					continue;
				}
				l = l.delta(-c);
			}
			r.push(l);
		}
		const i = [];
		for (let s = 0; s < r.length - 1; s++) {
			const a = r[s + 1];
			let l = r[s];
			if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
				const o = a.seq1Range.start - l.seq1Range.endExclusive;
				let c;
				for (c = 0; c < o && !(!e.isStronglyEqual(l.seq1Range.start + c, l.seq1Range.endExclusive + c) || !t.isStronglyEqual(l.seq2Range.start + c, l.seq2Range.endExclusive + c)); c++);
				if (c === o) {
					r[s + 1] = new ye(new j(l.seq1Range.start + o, a.seq1Range.endExclusive), new j(l.seq2Range.start + o, a.seq2Range.endExclusive));
					continue;
				}
				c > 0 && (l = l.delta(c));
			}
			i.push(l);
		}
		return r.length > 0 && i.push(r[r.length - 1]), i;
	}
	function hc(e, t, n) {
		if (!e.getBoundaryScore || !t.getBoundaryScore) return n;
		for (let r = 0; r < n.length; r++) {
			const i = r > 0 ? n[r - 1] : void 0, s = n[r], a = r + 1 < n.length ? n[r + 1] : void 0, l = new j(i ? i.seq1Range.endExclusive + 1 : 0, a ? a.seq1Range.start - 1 : e.length), o = new j(i ? i.seq2Range.endExclusive + 1 : 0, a ? a.seq2Range.start - 1 : t.length);
			s.seq1Range.isEmpty ? n[r] = V1(s, e, t, l, o) : s.seq2Range.isEmpty && (n[r] = V1(s.swap(), t, e, o, l).swap());
		}
		return n;
	}
	function V1(e, t, n, r, i) {
		let a = 1;
		for (; e.seq1Range.start - a >= r.start && e.seq2Range.start - a >= i.start && n.isStronglyEqual(e.seq2Range.start - a, e.seq2Range.endExclusive - a) && a < 100;) a++;
		a--;
		let l = 0;
		for (; e.seq1Range.start + l < r.endExclusive && e.seq2Range.endExclusive + l < i.endExclusive && n.isStronglyEqual(e.seq2Range.start + l, e.seq2Range.endExclusive + l) && l < 100;) l++;
		if (a === 0 && l === 0) return e;
		let o = 0, c = -1;
		for (let h = -a; h <= l; h++) {
			const f = e.seq2Range.start + h, m = e.seq2Range.endExclusive + h, g = e.seq1Range.start + h, d = t.getBoundaryScore(g) + n.getBoundaryScore(f) + n.getBoundaryScore(m);
			d > c && (c = d, o = h);
		}
		return e.delta(o);
	}
	function mc(e, t, n) {
		const r = [];
		for (const i of n) {
			const s = r[r.length - 1];
			if (!s) {
				r.push(i);
				continue;
			}
			i.seq1Range.start - s.seq1Range.endExclusive <= 2 || i.seq2Range.start - s.seq2Range.endExclusive <= 2 ? r[r.length - 1] = new ye(s.seq1Range.join(i.seq1Range), s.seq2Range.join(i.seq2Range)) : r.push(i);
		}
		return r;
	}
	function D1(e, t, n, r, i = !1) {
		const s = ye.invert(n, e.length), a = [];
		let l = new nt(0, 0);
		function o(c, h) {
			if (c.offset1 < l.offset1 || c.offset2 < l.offset2) return;
			const f = r(e, c.offset1), m = r(t, c.offset2);
			if (!f || !m) return;
			let g = new ye(f, m);
			const d = g.intersect(h);
			let p = d.seq1Range.length, y = d.seq2Range.length;
			for (; s.length > 0;) {
				const L = s[0];
				if (!(L.seq1Range.intersects(g.seq1Range) || L.seq2Range.intersects(g.seq2Range))) break;
				const N = new ye(r(e, L.seq1Range.start), r(t, L.seq2Range.start)), v = N.intersect(L);
				if (p += v.seq1Range.length, y += v.seq2Range.length, g = g.join(N), g.seq1Range.endExclusive >= L.seq1Range.endExclusive) s.shift();
				else break;
			}
			(i && p + y < g.seq1Range.length + g.seq2Range.length || p + y < (g.seq1Range.length + g.seq2Range.length) * 2 / 3) && a.push(g), l = g.getEndExclusives();
		}
		for (; s.length > 0;) {
			const c = s.shift();
			c.seq1Range.isEmpty || (o(c.getStarts(), c), o(c.getEndExclusives().delta(-1), c));
		}
		return gc(n, a);
	}
	function gc(e, t) {
		const n = [];
		for (; e.length > 0 || t.length > 0;) {
			const r = e[0], i = t[0];
			let s;
			r && (!i || r.seq1Range.start < i.seq1Range.start) ? s = e.shift() : s = t.shift(), n.length > 0 && n[n.length - 1].seq1Range.endExclusive >= s.seq1Range.start ? n[n.length - 1] = n[n.length - 1].join(s) : n.push(s);
		}
		return n;
	}
	function dc(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let i = 0, s;
		do {
			s = !1;
			const l = [r[0]];
			for (let o = 1; o < r.length; o++) {
				let f = function(m, g) {
					const d = new j(h.seq1Range.endExclusive, c.seq1Range.start);
					return e.getText(d).replace(/\s/g, "").length <= 4 && (m.seq1Range.length + m.seq2Range.length > 5 || g.seq1Range.length + g.seq2Range.length > 5);
				};
				const c = r[o], h = l[l.length - 1];
				f(h, c) ? (s = !0, l[l.length - 1] = l[l.length - 1].join(c)) : l.push(c);
			}
			r = l;
		} while (i++ < 10 && s);
		return r;
	}
	function pc(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let i = 0, s;
		do {
			s = !1;
			const o = [r[0]];
			for (let c = 1; c < r.length; c++) {
				let m = function(g, d) {
					const p = new j(f.seq1Range.endExclusive, h.seq1Range.start);
					if (e.countLinesIn(p) > 5 || p.length > 500) return !1;
					const y = e.getText(p).trim();
					if (y.length > 20 || y.split(/\r\n|\r|\n/).length > 1) return !1;
					const L = e.countLinesIn(g.seq1Range), _ = g.seq1Range.length, b = t.countLinesIn(g.seq2Range), N = g.seq2Range.length, v = e.countLinesIn(d.seq1Range), S = d.seq1Range.length, w = t.countLinesIn(d.seq2Range), k = d.seq2Range.length, P = 130;
					function D(T) {
						return Math.min(T, P);
					}
					return Math.pow(Math.pow(D(L * 40 + _), 1.5) + Math.pow(D(b * 40 + N), 1.5), 1.5) + Math.pow(Math.pow(D(v * 40 + S), 1.5) + Math.pow(D(w * 40 + k), 1.5), 1.5) > (P ** 1.5) ** 1.5 * 1.3;
				};
				const h = r[c], f = o[o.length - 1];
				m(f, h) ? (s = !0, o[o.length - 1] = o[o.length - 1].join(h)) : o.push(h);
			}
			r = o;
		} while (i++ < 10 && s);
		const a = [];
		return Uu(r, (o, c, h) => {
			let f = c;
			function m(_) {
				return _.length > 0 && _.trim().length <= 3 && c.seq1Range.length + c.seq2Range.length > 100;
			}
			const g = e.extendToFullLines(c.seq1Range), d = e.getText(new j(g.start, c.seq1Range.start));
			m(d) && (f = f.deltaStart(-d.length));
			const p = e.getText(new j(c.seq1Range.endExclusive, g.endExclusive));
			m(p) && (f = f.deltaEnd(p.length));
			const y = ye.fromOffsetPairs(o ? o.getEndExclusives() : nt.zero, h ? h.getStarts() : nt.max), L = f.intersect(y);
			a.length > 0 && L.getStarts().equals(a[a.length - 1].getEndExclusives()) ? a[a.length - 1] = a[a.length - 1].join(L) : a.push(L);
		}), a;
	}
	var O1 = class {
		constructor(e, t) {
			this.trimmedHash = e, this.lines = t;
		}
		getElement(e) {
			return this.trimmedHash[e];
		}
		get length() {
			return this.trimmedHash.length;
		}
		getBoundaryScore(e) {
			return 1e3 - ((e === 0 ? 0 : $1(this.lines[e - 1])) + (e === this.lines.length ? 0 : $1(this.lines[e])));
		}
		getText(e) {
			return this.lines.slice(e.start, e.endExclusive).join(`
`);
		}
		isStronglyEqual(e, t) {
			return this.lines[e] === this.lines[t];
		}
	};
	function $1(e) {
		let t = 0;
		for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9);) t++;
		return t;
	}
	var bc = class {
		constructor() {
			this.dynamicProgrammingDiffing = new nc(), this.myersDiffingAlgorithm = new R1();
		}
		computeDiff(e, t, n) {
			if (e.length <= 1 && Ou(e, t, (S, w) => S === w)) return new Bt([], [], !1);
			if (e.length === 1 && e[0].length === 0 || t.length === 1 && t[0].length === 0) return new Bt([new jt(new J(1, e.length + 1), new J(1, t.length + 1), [new Pe(new q(1, 1, e.length, e[e.length - 1].length + 1), new q(1, 1, t.length, t[t.length - 1].length + 1))])], [], !1);
			const r = n.maxComputationTimeMs === 0 ? kr.instance : new tc(n.maxComputationTimeMs), i = !n.ignoreTrimWhitespace, s = /* @__PURE__ */ new Map();
			function a(S) {
				let w = s.get(S);
				return w === void 0 && (w = s.size, s.set(S, w)), w;
			}
			const l = e.map((S) => a(S.trim())), o = t.map((S) => a(S.trim())), c = new O1(l, e), h = new O1(o, t), f = c.length + h.length < 1700 ? this.dynamicProgrammingDiffing.compute(c, h, r, (S, w) => e[S] === t[w] ? t[w].length === 0 ? .1 : 1 + Math.log(1 + t[w].length) : .99) : this.myersDiffingAlgorithm.compute(c, h, r);
			let m = f.diffs, g = f.hitTimeout;
			m = I1(c, h, m), m = dc(c, h, m);
			const d = [], p = (S) => {
				if (i) for (let w = 0; w < S; w++) {
					const k = y + w, P = L + w;
					if (e[k] !== t[P]) {
						const D = this.refineDiff(e, t, new ye(new j(k, k + 1), new j(P, P + 1)), r, i, n);
						for (const T of D.mappings) d.push(T);
						D.hitTimeout && (g = !0);
					}
				}
			};
			let y = 0, L = 0;
			for (const S of m) {
				It(() => S.seq1Range.start - y === S.seq2Range.start - L), p(S.seq1Range.start - y), y = S.seq1Range.endExclusive, L = S.seq2Range.endExclusive;
				const w = this.refineDiff(e, t, S, r, i, n);
				w.hitTimeout && (g = !0);
				for (const k of w.mappings) d.push(k);
			}
			p(e.length - y);
			const N = Nr(d, new vn(e), new vn(t));
			let v = [];
			return n.computeMoves && (v = this.computeMoves(N, e, t, l, o, r, i, n)), It(() => {
				function S(k, P) {
					if (k.lineNumber < 1 || k.lineNumber > P.length) return !1;
					const D = P[k.lineNumber - 1];
					return !(k.column < 1 || k.column > D.length + 1);
				}
				function w(k, P) {
					return !(k.startLineNumber < 1 || k.startLineNumber > P.length + 1 || k.endLineNumberExclusive < 1 || k.endLineNumberExclusive > P.length + 1);
				}
				for (const k of N) {
					if (!k.innerChanges) return !1;
					for (const P of k.innerChanges) if (!(S(P.modifiedRange.getStartPosition(), t) && S(P.modifiedRange.getEndPosition(), t) && S(P.originalRange.getStartPosition(), e) && S(P.originalRange.getEndPosition(), e))) return !1;
					if (!w(k.modified, t) || !w(k.original, e)) return !1;
				}
				return !0;
			}), new Bt(N, v, g);
		}
		computeMoves(e, t, n, r, i, s, a, l) {
			return ac(e, t, n, r, i, s).map((o) => {
				return new v1(o, Nr(this.refineDiff(t, n, new ye(o.original.toOffsetRange(), o.modified.toOffsetRange()), s, a, l).mappings, new vn(t), new vn(n), !0));
			});
		}
		refineDiff(e, t, n, r, i, s) {
			const a = yc(n).toRangeMapping2(e, t), l = new Sn(e, a.originalRange, i), o = new Sn(t, a.modifiedRange, i), c = l.length + o.length < 500 ? this.dynamicProgrammingDiffing.compute(l, o, r) : this.myersDiffingAlgorithm.compute(l, o, r);
			let h = c.diffs;
			return h = I1(l, o, h), h = D1(l, o, h, (f, m) => f.findWordContaining(m)), s.extendToSubwords && (h = D1(l, o, h, (f, m) => f.findSubWordContaining(m), !0)), h = mc(l, o, h), h = pc(l, o, h), {
				mappings: h.map((f) => new Pe(l.translateRange(f.seq1Range), o.translateRange(f.seq2Range))),
				hitTimeout: c.hitTimeout
			};
		}
	};
	function yc(e) {
		return new tt(new J(e.seq1Range.start + 1, e.seq1Range.endExclusive + 1), new J(e.seq2Range.start + 1, e.seq2Range.endExclusive + 1));
	}
	var Ge;
	(function(e) {
		e.inMemory = "inmemory", e.vscode = "vscode", e.internal = "private", e.walkThrough = "walkThrough", e.walkThroughSnippet = "walkThroughSnippet", e.http = "http", e.https = "https", e.file = "file", e.mailto = "mailto", e.untitled = "untitled", e.data = "data", e.command = "command", e.vscodeRemote = "vscode-remote", e.vscodeRemoteResource = "vscode-remote-resource", e.vscodeManagedRemoteResource = "vscode-managed-remote-resource", e.vscodeUserData = "vscode-userdata", e.vscodeCustomEditor = "vscode-custom-editor", e.vscodeNotebookCell = "vscode-notebook-cell", e.vscodeNotebookCellMetadata = "vscode-notebook-cell-metadata", e.vscodeNotebookCellMetadataDiff = "vscode-notebook-cell-metadata-diff", e.vscodeNotebookCellOutput = "vscode-notebook-cell-output", e.vscodeNotebookCellOutputDiff = "vscode-notebook-cell-output-diff", e.vscodeNotebookMetadata = "vscode-notebook-metadata", e.vscodeInteractiveInput = "vscode-interactive-input", e.vscodeSettings = "vscode-settings", e.vscodeWorkspaceTrust = "vscode-workspace-trust", e.vscodeTerminal = "vscode-terminal", e.vscodeImageCarousel = "vscode-image-carousel", e.vscodeChatCodeBlock = "vscode-chat-code-block", e.vscodeChatCodeCompareBlock = "vscode-chat-code-compare-block", e.vscodeChatEditor = "vscode-chat-editor", e.vscodeChatInput = "chatSessionInput", e.vscodeLocalChatSession = "vscode-chat-session", e.webviewPanel = "webview-panel", e.vscodeWebview = "vscode-webview", e.vscodeBrowser = "vscode-browser", e.extension = "extension", e.vscodeFileResource = "vscode-file", e.tmp = "tmp", e.vsls = "vsls", e.vscodeSourceControl = "vscode-scm", e.commentsInput = "comment", e.codeSetting = "code-setting", e.outputChannel = "output", e.accessibleView = "accessible-view", e.chatEditingSnapshotScheme = "chat-editing-snapshot-text-model", e.chatEditingModel = "chat-editing-text-model", e.copilotPr = "copilot-pr";
	})(Ge || (Ge = {}));
	var vc = class {
		constructor() {
			this._hosts = Object.create(null), this._ports = Object.create(null), this._connectionTokens = Object.create(null), this._preferredWebSchema = "http", this._delegate = null, this._serverRootPath = "/";
		}
		setPreferredWebSchema(e) {
			this._preferredWebSchema = e;
		}
		get _remoteResourcesPath() {
			return he.join(this._serverRootPath, Ge.vscodeRemoteResource);
		}
		rewrite(e) {
			if (this._delegate) try {
				return this._delegate(e);
			} catch (a) {
				return Oo(a), e;
			}
			const t = e.authority;
			let n = this._hosts[t];
			n && n.indexOf(":") !== -1 && n.indexOf("[") === -1 && (n = `[${n}]`);
			const r = this._ports[t], i = this._connectionTokens[t];
			let s = `path=${encodeURIComponent(e.path)}`;
			return typeof i == "string" && (s += `&tkn=${encodeURIComponent(i)}`), qe.from({
				scheme: tl ? this._preferredWebSchema : Ge.vscodeRemoteResource,
				authority: `${n}:${r}`,
				path: this._remoteResourcesPath,
				query: s
			});
		}
	};
	const wc = new vc(), Lc = "vs/../../node_modules", _c = "vscode-app";
	const Sc = new class pi {
		static {
			this.FALLBACK_AUTHORITY = _c;
		}
		asBrowserUri(t) {
			const n = this.toUri(t);
			return this.uriToBrowserUri(n);
		}
		uriToBrowserUri(t) {
			return t.scheme === Ge.vscodeRemote ? wc.rewrite(t) : t.scheme === Ge.file && (el || nl === `${Ge.vscodeFileResource}://${pi.FALLBACK_AUTHORITY}`) ? t.with({
				scheme: Ge.vscodeFileResource,
				authority: t.authority || pi.FALLBACK_AUTHORITY,
				query: null,
				fragment: null
			}) : t;
		}
		toUri(t) {
			if (qe.isUri(t)) return t;
			if (globalThis._VSCODE_FILE_ROOT) {
				const n = globalThis._VSCODE_FILE_ROOT;
				if (/^\w[\w\d+.-]*:\/\//.test(n)) return qe.joinPath(qe.parse(n, !0), t);
				const r = su(n, t);
				return qe.file(r);
			}
			throw new Error("Cannot determine URI for module id!");
		}
	}();
	var B1;
	(function(e) {
		const t = /* @__PURE__ */ new Map([
			["1", { "Cross-Origin-Opener-Policy": "same-origin" }],
			["2", { "Cross-Origin-Embedder-Policy": "require-corp" }],
			["3", {
				"Cross-Origin-Opener-Policy": "same-origin",
				"Cross-Origin-Embedder-Policy": "require-corp"
			}]
		]);
		e.CoopAndCoep = Object.freeze(t.get("3"));
		const n = "vscode-coi";
		function r(s) {
			let a;
			typeof s == "string" ? a = new URL(s).searchParams : s instanceof URL ? a = s.searchParams : qe.isUri(s) && (a = new URL(s.toString(!0)).searchParams);
			const l = a?.get(n);
			if (l) return t.get(l);
		}
		e.getHeadersFromQuery = r;
		function i(s, a, l) {
			if (!globalThis.crossOriginIsolated) return;
			const o = a && l ? "3" : l ? "2" : "1";
			s instanceof URLSearchParams ? s.set(n, o) : s[n] = o;
		}
		e.addSearchParam = i;
	})(B1 || (B1 = {}));
	function Ac(e, t) {
		(globalThis._VSCODE_PRODUCT_JSON ?? globalThis.vscode?.context?.configuration()?.product)?.commit;
		const r = `${e}/${t}`, i = `${Lc}/${r}`;
		return Sc.asBrowserUri(i).toString(!0);
	}
	var xc = class {
		constructor(e) {
			this.replacements = e;
			let t = -1;
			for (const n of e) {
				if (!(n.replaceRange.start >= t)) throw new ae(`Edits must be disjoint and sorted. Found ${n} after ${t}`);
				t = n.replaceRange.endExclusive;
			}
		}
		toString() {
			return `[${this.replacements.map((e) => e.toString()).join(", ")}]`;
		}
		normalize() {
			const e = [];
			let t;
			for (const n of this.replacements) if (!(n.getNewLength() === 0 && n.replaceRange.length === 0)) {
				if (t && t.replaceRange.endExclusive === n.replaceRange.start) {
					const r = t.tryJoinTouching(n);
					if (r) {
						t = r;
						continue;
					}
				}
				t && e.push(t), t = n;
			}
			return t && e.push(t), this._createNew(e);
		}
		compose(e) {
			const t = this.normalize(), n = e.normalize();
			if (t.isEmpty()) return n;
			if (n.isEmpty()) return t;
			const r = [...t.replacements], i = [];
			let s = 0;
			for (const a of n.replacements) {
				for (;;) {
					const h = r[0];
					if (!h || h.replaceRange.start + s + h.getNewLength() >= a.replaceRange.start) break;
					r.shift(), i.push(h), s += h.getNewLength() - h.replaceRange.length;
				}
				const l = s;
				let o, c;
				for (;;) {
					const h = r[0];
					if (!h || h.replaceRange.start + s > a.replaceRange.endExclusive) break;
					o || (o = h), c = h, r.shift(), s += h.getNewLength() - h.replaceRange.length;
				}
				if (!o) i.push(a.delta(-s));
				else {
					const h = Math.min(o.replaceRange.start, a.replaceRange.start - l), f = a.replaceRange.start - (o.replaceRange.start + l);
					if (f > 0) {
						const p = o.slice(j.emptyAt(h), new j(0, f));
						i.push(p);
					}
					if (!c) throw new ae("Invariant violation: lastIntersecting is undefined");
					const m = c.replaceRange.endExclusive + s - a.replaceRange.endExclusive;
					if (m > 0) {
						const p = c.slice(j.ofStartAndLength(c.replaceRange.endExclusive, 0), new j(c.getNewLength() - m, c.getNewLength()));
						r.unshift(p), s -= p.getNewLength() - p.replaceRange.length;
					}
					const g = new j(h, a.replaceRange.endExclusive - s), d = a.slice(g, new j(0, a.getNewLength()));
					i.push(d);
				}
			}
			for (;;) {
				const a = r.shift();
				if (!a) break;
				i.push(a);
			}
			return this._createNew(i).normalize();
		}
		getNewRanges() {
			const e = [];
			let t = 0;
			for (const n of this.replacements) e.push(j.ofStartAndLength(n.replaceRange.start + t, n.getNewLength())), t += n.getLengthDelta();
			return e;
		}
		isEmpty() {
			return this.replacements.length === 0;
		}
		applyToOffsetOrUndefined(e) {
			let t = 0;
			for (const n of this.replacements) if (n.replaceRange.start <= e) {
				if (e < n.replaceRange.endExclusive) return;
				t += n.getNewLength() - n.replaceRange.length;
			} else break;
			return e + t;
		}
	}, kc = class {
		constructor(e) {
			this.replaceRange = e;
		}
		delta(e) {
			return this.slice(this.replaceRange.delta(e), new j(0, this.getNewLength()));
		}
		getLengthDelta() {
			return this.getNewLength() - this.replaceRange.length;
		}
		toString() {
			return `{ ${this.replaceRange.toString()} -> ${this.getNewLength()} }`;
		}
		get isEmpty() {
			return this.getNewLength() === 0 && this.replaceRange.length === 0;
		}
		getRangeAfterReplace() {
			return new j(this.replaceRange.start, this.replaceRange.start + this.getNewLength());
		}
	}, Rc = class extends xc {
		apply(e) {
			const t = [];
			let n = 0;
			for (const r of this.replacements) t.push(e.substring(n, r.replaceRange.start)), t.push(r.newText), n = r.replaceRange.endExclusive;
			return t.push(e.substring(n)), t.join("");
		}
		removeCommonSuffixPrefix(e) {
			const t = [];
			for (const n of this.replacements) {
				const r = n.removeCommonSuffixPrefix(e);
				r.isEmpty || t.push(r);
			}
			return new U1(t);
		}
	}, Ec = class extends kc {
		constructor(e, t) {
			super(e), this.newText = t;
		}
		getNewLength() {
			return this.newText.length;
		}
		toString() {
			return `${this.replaceRange} -> ${JSON.stringify(this.newText)}`;
		}
		replace(e) {
			return e.substring(0, this.replaceRange.start) + this.newText + e.substring(this.replaceRange.endExclusive);
		}
		removeCommonSuffixPrefix(e) {
			const t = e.substring(this.replaceRange.start, this.replaceRange.endExclusive), n = tr(t, this.newText), r = Math.min(t.length - n, this.newText.length - n, nr(t, this.newText));
			return new Tr(new j(this.replaceRange.start + n, this.replaceRange.endExclusive - r), this.newText.substring(n, this.newText.length - r));
		}
		removeCommonSuffixAndPrefix(e) {
			return this.removeCommonSuffix(e).removeCommonPrefix(e);
		}
		removeCommonPrefix(e) {
			const n = tr(this.replaceRange.substring(e), this.newText);
			return n === 0 ? this : this.slice(this.replaceRange.deltaStart(n), new j(n, this.newText.length));
		}
		removeCommonSuffix(e) {
			const n = nr(this.replaceRange.substring(e), this.newText);
			return n === 0 ? this : this.slice(this.replaceRange.deltaEnd(-n), new j(0, this.newText.length - n));
		}
		toJson() {
			return {
				txt: this.newText,
				pos: this.replaceRange.start,
				len: this.replaceRange.length
			};
		}
	}, U1 = class nn extends Rc {
		static {
			this.empty = new nn([]);
		}
		static replace(t, n) {
			return new nn([new Tr(t, n)]);
		}
		static compose(t) {
			if (t.length === 0) return nn.empty;
			let n = t[0];
			for (let r = 1; r < t.length; r++) n = n.compose(t[r]);
			return n;
		}
		constructor(t) {
			super(t);
		}
		_createNew(t) {
			return new nn(t);
		}
	}, Tr = class rn extends Ec {
		static insert(t, n) {
			return new rn(j.emptyAt(t), n);
		}
		static replace(t, n) {
			return new rn(t, n);
		}
		equals(t) {
			return this.replaceRange.equals(t.replaceRange) && this.newText === t.newText;
		}
		tryJoinTouching(t) {
			return new rn(this.replaceRange.joinRightTouching(t.replaceRange), this.newText + t.newText);
		}
		slice(t, n) {
			return new rn(t, n ? n.substring(this.newText) : this.newText);
		}
	};
	zu({
		StringEdit: U1,
		StringReplacement: Tr,
		TextReplacement: Ln,
		TextEdit: Ju,
		TextLength: yt
	});
	let Mr, Cr, Pr;
	function q1() {
		return Mr || (Mr = import(`${Ac("@vscode/diff", "dist/index.js")}`)), Mr;
	}
	function Tc(e) {
		return e ? (Pr || (Pr = q1().then((t) => t.createDiffComputer({ useWasm: !0 }))), Pr) : (Cr || (Cr = q1().then((t) => t.createDiffComputer({ useWasm: !1 }))), Cr);
	}
	async function j1(e) {
		return new Mc(await Tc(e));
	}
	var Mc = class {
		constructor(e) {
			this._computer = e;
		}
		computeDiff(e, t, n) {
			const r = new wn(e.join(`
`)), i = new wn(t.join(`
`)), s = this._computer.computeDiff(r.value, i.value, {
				ignoreTrimWhitespace: !0,
				computeMoves: n.computeMoves,
				extendToSubwords: n.extendToSubwords
			}), a = r.getTransformer(), l = i.getTransformer(), o = [];
			let c = 0;
			for (const m of s.edits.replacements) {
				const g = m.range.start + c, d = g + m.newText.length, p = a.getRange(new j(m.range.start, m.range.endExclusive)), y = l.getRange(new j(g, d));
				o.push(new Pe(p, y)), c += m.newText.length - (m.range.endExclusive - m.range.start);
			}
			const h = Nr(o, r, i), f = [];
			if (n.computeMoves) for (const m of s.moves) {
				const g = a.getPosition(m.range.original.start), d = a.getPosition(m.range.original.endExclusive), p = l.getPosition(m.range.modified.start), y = l.getPosition(m.range.modified.endExclusive), L = new J(g.lineNumber, d.lineNumber), _ = new J(p.lineNumber, y.lineNumber);
				f.push(new v1(new tt(L, _), []));
			}
			return new Bt(h, f, s.hitTimeout);
		}
	};
	const An = {
		getLegacy: () => new Yu(),
		getDefault: () => new bc(),
		getAdvancedExternal: () => j1(!1),
		getAdvancedWasm: () => j1(!0)
	};
	function Je(e, t) {
		const n = Math.pow(10, t);
		return Math.round(e * n) / n;
	}
	var A = class {
		constructor(e, t, n, r = 1) {
			this._rgbaBrand = void 0, this.r = Math.min(255, Math.max(0, e)) | 0, this.g = Math.min(255, Math.max(0, t)) | 0, this.b = Math.min(255, Math.max(0, n)) | 0, this.a = Je(Math.max(Math.min(1, r), 0), 3);
		}
		static equals(e, t) {
			return e.r === t.r && e.g === t.g && e.b === t.b && e.a === t.a;
		}
	}, rt = class sn {
		constructor(t, n, r, i) {
			this._hslaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = Je(Math.max(Math.min(1, n), 0), 3), this.l = Je(Math.max(Math.min(1, r), 0), 3), this.a = Je(Math.max(Math.min(1, i), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.l === n.l && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, i = t.b / 255, s = t.a, a = Math.max(n, r, i), l = Math.min(n, r, i);
			let o = 0, c = 0;
			const h = (l + a) / 2, f = a - l;
			if (f > 0) {
				switch (c = Math.min(h <= .5 ? f / (2 * h) : f / (2 - 2 * h), 1), a) {
					case n:
						o = (r - i) / f + (r < i ? 6 : 0);
						break;
					case r:
						o = (i - n) / f + 2;
						break;
					case i: o = (n - r) / f + 4;
				}
				o *= 60, o = Math.round(o);
			}
			return new sn(o, c, h, s);
		}
		static _hue2rgb(t, n, r) {
			return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (n - t) * 6 * r : r < 1 / 2 ? n : r < 2 / 3 ? t + (n - t) * (2 / 3 - r) * 6 : t;
		}
		static toRGBA(t) {
			const n = t.h / 360, { s: r, l: i, a: s } = t;
			let a, l, o;
			if (r === 0) a = l = o = i;
			else {
				const c = i < .5 ? i * (1 + r) : i + r - i * r, h = 2 * i - c;
				a = sn._hue2rgb(h, c, n + 1 / 3), l = sn._hue2rgb(h, c, n), o = sn._hue2rgb(h, c, n - 1 / 3);
			}
			return new A(Math.round(a * 255), Math.round(l * 255), Math.round(o * 255), s);
		}
	}, xn = class Fo {
		constructor(t, n, r, i) {
			this._hsvaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = Je(Math.max(Math.min(1, n), 0), 3), this.v = Je(Math.max(Math.min(1, r), 0), 3), this.a = Je(Math.max(Math.min(1, i), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.v === n.v && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, i = t.b / 255, s = Math.max(n, r, i), a = s - Math.min(n, r, i), l = s === 0 ? 0 : a / s;
			let o;
			return a === 0 ? o = 0 : s === n ? o = ((r - i) / a % 6 + 6) % 6 : s === r ? o = (i - n) / a + 2 : o = (n - r) / a + 4, new Fo(Math.round(o * 60), l, s, t.a);
		}
		static toRGBA(t) {
			const { h: n, s: r, v: i, a: s } = t, a = i * r, l = a * (1 - Math.abs(n / 60 % 2 - 1)), o = i - a;
			let [c, h, f] = [
				0,
				0,
				0
			];
			return n < 60 ? (c = a, h = l) : n < 120 ? (c = l, h = a) : n < 180 ? (h = a, f = l) : n < 240 ? (h = l, f = a) : n < 300 ? (c = l, f = a) : n <= 360 && (c = a, f = l), c = Math.round((c + o) * 255), h = Math.round((h + o) * 255), f = Math.round((f + o) * 255), new A(c, h, f, s);
		}
	}, kn = class re {
		static fromHex(t) {
			return re.Format.CSS.parseHex(t) || re.red;
		}
		static equals(t, n) {
			return !t && !n ? !0 : !t || !n ? !1 : t.equals(n);
		}
		get hsla() {
			return this._hsla ? this._hsla : rt.fromRGBA(this.rgba);
		}
		get hsva() {
			return this._hsva ? this._hsva : xn.fromRGBA(this.rgba);
		}
		constructor(t) {
			if (t) if (t instanceof A) this.rgba = t;
			else if (t instanceof rt) this._hsla = t, this.rgba = rt.toRGBA(t);
			else if (t instanceof xn) this._hsva = t, this.rgba = xn.toRGBA(t);
			else throw new Error("Invalid color ctor argument");
			else throw new Error("Color needs a value");
		}
		equals(t) {
			return !!t && A.equals(this.rgba, t.rgba) && rt.equals(this.hsla, t.hsla) && xn.equals(this.hsva, t.hsva);
		}
		getRelativeLuminance() {
			const t = re._relativeLuminanceForComponent(this.rgba.r), n = re._relativeLuminanceForComponent(this.rgba.g), r = re._relativeLuminanceForComponent(this.rgba.b);
			return Je(.2126 * t + .7152 * n + .0722 * r, 4);
		}
		static _relativeLuminanceForComponent(t) {
			const n = t / 255;
			return n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
		}
		isLighter() {
			return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 >= 128;
		}
		isLighterThan(t) {
			return this.getRelativeLuminance() > t.getRelativeLuminance();
		}
		isDarkerThan(t) {
			return this.getRelativeLuminance() < t.getRelativeLuminance();
		}
		lighten(t) {
			return new re(new rt(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * t, this.hsla.a));
		}
		darken(t) {
			return new re(new rt(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * t, this.hsla.a));
		}
		transparent(t) {
			const { r: n, g: r, b: i, a: s } = this.rgba;
			return new re(new A(n, r, i, s * t));
		}
		isTransparent() {
			return this.rgba.a === 0;
		}
		isOpaque() {
			return this.rgba.a === 1;
		}
		opposite() {
			return new re(new A(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
		}
		mix(t, n = .5) {
			const r = Math.min(Math.max(n, 0), 1), i = this.rgba, s = t.rgba, a = i.r + (s.r - i.r) * r, l = i.g + (s.g - i.g) * r, o = i.b + (s.b - i.b) * r, c = i.a + (s.a - i.a) * r;
			return new re(new A(a, l, o, c));
		}
		makeOpaque(t) {
			if (this.isOpaque() || t.rgba.a !== 1) return this;
			const { r: n, g: r, b: i, a: s } = this.rgba;
			return new re(new A(t.rgba.r - s * (t.rgba.r - n), t.rgba.g - s * (t.rgba.g - r), t.rgba.b - s * (t.rgba.b - i), 1));
		}
		toString() {
			return this._toString || (this._toString = re.Format.CSS.format(this)), this._toString;
		}
		toNumber32Bit() {
			return this._toNumber32Bit || (this._toNumber32Bit = (this.rgba.r << 24 | this.rgba.g << 16 | this.rgba.b << 8 | this.rgba.a * 255 << 0) >>> 0), this._toNumber32Bit;
		}
		static getLighterColor(t, n, r) {
			if (t.isLighterThan(n)) return t;
			r = r || .5;
			const i = t.getRelativeLuminance(), s = n.getRelativeLuminance();
			return r = r * (s - i) / s, t.lighten(r);
		}
		static getDarkerColor(t, n, r) {
			if (t.isDarkerThan(n)) return t;
			r = r || .5;
			const i = t.getRelativeLuminance(), s = n.getRelativeLuminance();
			return r = r * (i - s) / i, t.darken(r);
		}
		static {
			this.white = new re(new A(255, 255, 255, 1));
		}
		static {
			this.black = new re(new A(0, 0, 0, 1));
		}
		static {
			this.red = new re(new A(255, 0, 0, 1));
		}
		static {
			this.blue = new re(new A(0, 0, 255, 1));
		}
		static {
			this.green = new re(new A(0, 255, 0, 1));
		}
		static {
			this.cyan = new re(new A(0, 255, 255, 1));
		}
		static {
			this.lightgrey = new re(new A(211, 211, 211, 1));
		}
		static {
			this.transparent = new re(new A(0, 0, 0, 0));
		}
	};
	(function(e) {
		(function(t) {
			(function(n) {
				function r(p) {
					return p.rgba.a === 1 ? `rgb(${p.rgba.r}, ${p.rgba.g}, ${p.rgba.b})` : e.Format.CSS.formatRGBA(p);
				}
				n.formatRGB = r;
				function i(p) {
					return `rgba(${p.rgba.r}, ${p.rgba.g}, ${p.rgba.b}, ${+p.rgba.a.toFixed(2)})`;
				}
				n.formatRGBA = i;
				function s(p) {
					return p.hsla.a === 1 ? `hsl(${p.hsla.h}, ${Math.round(p.hsla.s * 100)}%, ${Math.round(p.hsla.l * 100)}%)` : e.Format.CSS.formatHSLA(p);
				}
				n.formatHSL = s;
				function a(p) {
					return `hsla(${p.hsla.h}, ${Math.round(p.hsla.s * 100)}%, ${Math.round(p.hsla.l * 100)}%, ${p.hsla.a.toFixed(2)})`;
				}
				n.formatHSLA = a;
				function l(p) {
					const y = p.toString(16);
					return y.length !== 2 ? "0" + y : y;
				}
				function o(p) {
					return `#${l(p.rgba.r)}${l(p.rgba.g)}${l(p.rgba.b)}`;
				}
				n.formatHex = o;
				function c(p, y = !1) {
					return y && p.rgba.a === 1 ? e.Format.CSS.formatHex(p) : `#${l(p.rgba.r)}${l(p.rgba.g)}${l(p.rgba.b)}${l(Math.round(p.rgba.a * 255))}`;
				}
				n.formatHexA = c;
				function h(p) {
					return p.isOpaque() ? e.Format.CSS.formatHex(p) : e.Format.CSS.formatRGBA(p);
				}
				n.format = h;
				function f(p) {
					if (p === "transparent") return e.transparent;
					if (p.startsWith("#")) return g(p);
					if (p.startsWith("rgba(")) {
						const y = p.match(/rgba\((?<r>(?:\+|-)?\d+), *(?<g>(?:\+|-)?\d+), *(?<b>(?:\+|-)?\d+), *(?<a>(?:\+|-)?\d+(\.\d+)?)\)/);
						if (!y) throw new Error("Invalid color format " + p);
						return new e(new A(parseInt(y.groups?.r ?? "0"), parseInt(y.groups?.g ?? "0"), parseInt(y.groups?.b ?? "0"), parseFloat(y.groups?.a ?? "0")));
					}
					if (p.startsWith("rgb(")) {
						const y = p.match(/rgb\((?<r>(?:\+|-)?\d+), *(?<g>(?:\+|-)?\d+), *(?<b>(?:\+|-)?\d+)\)/);
						if (!y) throw new Error("Invalid color format " + p);
						return new e(new A(parseInt(y.groups?.r ?? "0"), parseInt(y.groups?.g ?? "0"), parseInt(y.groups?.b ?? "0")));
					}
					return m(p);
				}
				n.parse = f;
				function m(p) {
					switch (p) {
						case "aliceblue": return new e(new A(240, 248, 255, 1));
						case "antiquewhite": return new e(new A(250, 235, 215, 1));
						case "aqua": return new e(new A(0, 255, 255, 1));
						case "aquamarine": return new e(new A(127, 255, 212, 1));
						case "azure": return new e(new A(240, 255, 255, 1));
						case "beige": return new e(new A(245, 245, 220, 1));
						case "bisque": return new e(new A(255, 228, 196, 1));
						case "black": return new e(new A(0, 0, 0, 1));
						case "blanchedalmond": return new e(new A(255, 235, 205, 1));
						case "blue": return new e(new A(0, 0, 255, 1));
						case "blueviolet": return new e(new A(138, 43, 226, 1));
						case "brown": return new e(new A(165, 42, 42, 1));
						case "burlywood": return new e(new A(222, 184, 135, 1));
						case "cadetblue": return new e(new A(95, 158, 160, 1));
						case "chartreuse": return new e(new A(127, 255, 0, 1));
						case "chocolate": return new e(new A(210, 105, 30, 1));
						case "coral": return new e(new A(255, 127, 80, 1));
						case "cornflowerblue": return new e(new A(100, 149, 237, 1));
						case "cornsilk": return new e(new A(255, 248, 220, 1));
						case "crimson": return new e(new A(220, 20, 60, 1));
						case "cyan": return new e(new A(0, 255, 255, 1));
						case "darkblue": return new e(new A(0, 0, 139, 1));
						case "darkcyan": return new e(new A(0, 139, 139, 1));
						case "darkgoldenrod": return new e(new A(184, 134, 11, 1));
						case "darkgray": return new e(new A(169, 169, 169, 1));
						case "darkgreen": return new e(new A(0, 100, 0, 1));
						case "darkgrey": return new e(new A(169, 169, 169, 1));
						case "darkkhaki": return new e(new A(189, 183, 107, 1));
						case "darkmagenta": return new e(new A(139, 0, 139, 1));
						case "darkolivegreen": return new e(new A(85, 107, 47, 1));
						case "darkorange": return new e(new A(255, 140, 0, 1));
						case "darkorchid": return new e(new A(153, 50, 204, 1));
						case "darkred": return new e(new A(139, 0, 0, 1));
						case "darksalmon": return new e(new A(233, 150, 122, 1));
						case "darkseagreen": return new e(new A(143, 188, 143, 1));
						case "darkslateblue": return new e(new A(72, 61, 139, 1));
						case "darkslategray": return new e(new A(47, 79, 79, 1));
						case "darkslategrey": return new e(new A(47, 79, 79, 1));
						case "darkturquoise": return new e(new A(0, 206, 209, 1));
						case "darkviolet": return new e(new A(148, 0, 211, 1));
						case "deeppink": return new e(new A(255, 20, 147, 1));
						case "deepskyblue": return new e(new A(0, 191, 255, 1));
						case "dimgray": return new e(new A(105, 105, 105, 1));
						case "dimgrey": return new e(new A(105, 105, 105, 1));
						case "dodgerblue": return new e(new A(30, 144, 255, 1));
						case "firebrick": return new e(new A(178, 34, 34, 1));
						case "floralwhite": return new e(new A(255, 250, 240, 1));
						case "forestgreen": return new e(new A(34, 139, 34, 1));
						case "fuchsia": return new e(new A(255, 0, 255, 1));
						case "gainsboro": return new e(new A(220, 220, 220, 1));
						case "ghostwhite": return new e(new A(248, 248, 255, 1));
						case "gold": return new e(new A(255, 215, 0, 1));
						case "goldenrod": return new e(new A(218, 165, 32, 1));
						case "gray": return new e(new A(128, 128, 128, 1));
						case "green": return new e(new A(0, 128, 0, 1));
						case "greenyellow": return new e(new A(173, 255, 47, 1));
						case "grey": return new e(new A(128, 128, 128, 1));
						case "honeydew": return new e(new A(240, 255, 240, 1));
						case "hotpink": return new e(new A(255, 105, 180, 1));
						case "indianred": return new e(new A(205, 92, 92, 1));
						case "indigo": return new e(new A(75, 0, 130, 1));
						case "ivory": return new e(new A(255, 255, 240, 1));
						case "khaki": return new e(new A(240, 230, 140, 1));
						case "lavender": return new e(new A(230, 230, 250, 1));
						case "lavenderblush": return new e(new A(255, 240, 245, 1));
						case "lawngreen": return new e(new A(124, 252, 0, 1));
						case "lemonchiffon": return new e(new A(255, 250, 205, 1));
						case "lightblue": return new e(new A(173, 216, 230, 1));
						case "lightcoral": return new e(new A(240, 128, 128, 1));
						case "lightcyan": return new e(new A(224, 255, 255, 1));
						case "lightgoldenrodyellow": return new e(new A(250, 250, 210, 1));
						case "lightgray": return new e(new A(211, 211, 211, 1));
						case "lightgreen": return new e(new A(144, 238, 144, 1));
						case "lightgrey": return new e(new A(211, 211, 211, 1));
						case "lightpink": return new e(new A(255, 182, 193, 1));
						case "lightsalmon": return new e(new A(255, 160, 122, 1));
						case "lightseagreen": return new e(new A(32, 178, 170, 1));
						case "lightskyblue": return new e(new A(135, 206, 250, 1));
						case "lightslategray": return new e(new A(119, 136, 153, 1));
						case "lightslategrey": return new e(new A(119, 136, 153, 1));
						case "lightsteelblue": return new e(new A(176, 196, 222, 1));
						case "lightyellow": return new e(new A(255, 255, 224, 1));
						case "lime": return new e(new A(0, 255, 0, 1));
						case "limegreen": return new e(new A(50, 205, 50, 1));
						case "linen": return new e(new A(250, 240, 230, 1));
						case "magenta": return new e(new A(255, 0, 255, 1));
						case "maroon": return new e(new A(128, 0, 0, 1));
						case "mediumaquamarine": return new e(new A(102, 205, 170, 1));
						case "mediumblue": return new e(new A(0, 0, 205, 1));
						case "mediumorchid": return new e(new A(186, 85, 211, 1));
						case "mediumpurple": return new e(new A(147, 112, 219, 1));
						case "mediumseagreen": return new e(new A(60, 179, 113, 1));
						case "mediumslateblue": return new e(new A(123, 104, 238, 1));
						case "mediumspringgreen": return new e(new A(0, 250, 154, 1));
						case "mediumturquoise": return new e(new A(72, 209, 204, 1));
						case "mediumvioletred": return new e(new A(199, 21, 133, 1));
						case "midnightblue": return new e(new A(25, 25, 112, 1));
						case "mintcream": return new e(new A(245, 255, 250, 1));
						case "mistyrose": return new e(new A(255, 228, 225, 1));
						case "moccasin": return new e(new A(255, 228, 181, 1));
						case "navajowhite": return new e(new A(255, 222, 173, 1));
						case "navy": return new e(new A(0, 0, 128, 1));
						case "oldlace": return new e(new A(253, 245, 230, 1));
						case "olive": return new e(new A(128, 128, 0, 1));
						case "olivedrab": return new e(new A(107, 142, 35, 1));
						case "orange": return new e(new A(255, 165, 0, 1));
						case "orangered": return new e(new A(255, 69, 0, 1));
						case "orchid": return new e(new A(218, 112, 214, 1));
						case "palegoldenrod": return new e(new A(238, 232, 170, 1));
						case "palegreen": return new e(new A(152, 251, 152, 1));
						case "paleturquoise": return new e(new A(175, 238, 238, 1));
						case "palevioletred": return new e(new A(219, 112, 147, 1));
						case "papayawhip": return new e(new A(255, 239, 213, 1));
						case "peachpuff": return new e(new A(255, 218, 185, 1));
						case "peru": return new e(new A(205, 133, 63, 1));
						case "pink": return new e(new A(255, 192, 203, 1));
						case "plum": return new e(new A(221, 160, 221, 1));
						case "powderblue": return new e(new A(176, 224, 230, 1));
						case "purple": return new e(new A(128, 0, 128, 1));
						case "rebeccapurple": return new e(new A(102, 51, 153, 1));
						case "red": return new e(new A(255, 0, 0, 1));
						case "rosybrown": return new e(new A(188, 143, 143, 1));
						case "royalblue": return new e(new A(65, 105, 225, 1));
						case "saddlebrown": return new e(new A(139, 69, 19, 1));
						case "salmon": return new e(new A(250, 128, 114, 1));
						case "sandybrown": return new e(new A(244, 164, 96, 1));
						case "seagreen": return new e(new A(46, 139, 87, 1));
						case "seashell": return new e(new A(255, 245, 238, 1));
						case "sienna": return new e(new A(160, 82, 45, 1));
						case "silver": return new e(new A(192, 192, 192, 1));
						case "skyblue": return new e(new A(135, 206, 235, 1));
						case "slateblue": return new e(new A(106, 90, 205, 1));
						case "slategray": return new e(new A(112, 128, 144, 1));
						case "slategrey": return new e(new A(112, 128, 144, 1));
						case "snow": return new e(new A(255, 250, 250, 1));
						case "springgreen": return new e(new A(0, 255, 127, 1));
						case "steelblue": return new e(new A(70, 130, 180, 1));
						case "tan": return new e(new A(210, 180, 140, 1));
						case "teal": return new e(new A(0, 128, 128, 1));
						case "thistle": return new e(new A(216, 191, 216, 1));
						case "tomato": return new e(new A(255, 99, 71, 1));
						case "turquoise": return new e(new A(64, 224, 208, 1));
						case "violet": return new e(new A(238, 130, 238, 1));
						case "wheat": return new e(new A(245, 222, 179, 1));
						case "white": return new e(new A(255, 255, 255, 1));
						case "whitesmoke": return new e(new A(245, 245, 245, 1));
						case "yellow": return new e(new A(255, 255, 0, 1));
						case "yellowgreen": return new e(new A(154, 205, 50, 1));
						default: return null;
					}
				}
				function g(p) {
					const y = p.length;
					if (y === 0 || p.charCodeAt(0) !== 35) return null;
					if (y === 7) return new e(new A(16 * d(p.charCodeAt(1)) + d(p.charCodeAt(2)), 16 * d(p.charCodeAt(3)) + d(p.charCodeAt(4)), 16 * d(p.charCodeAt(5)) + d(p.charCodeAt(6)), 1));
					if (y === 9) return new e(new A(16 * d(p.charCodeAt(1)) + d(p.charCodeAt(2)), 16 * d(p.charCodeAt(3)) + d(p.charCodeAt(4)), 16 * d(p.charCodeAt(5)) + d(p.charCodeAt(6)), (16 * d(p.charCodeAt(7)) + d(p.charCodeAt(8))) / 255));
					if (y === 4) {
						const L = d(p.charCodeAt(1)), _ = d(p.charCodeAt(2)), b = d(p.charCodeAt(3));
						return new e(new A(16 * L + L, 16 * _ + _, 16 * b + b));
					}
					if (y === 5) {
						const L = d(p.charCodeAt(1)), _ = d(p.charCodeAt(2)), b = d(p.charCodeAt(3)), N = d(p.charCodeAt(4));
						return new e(new A(16 * L + L, 16 * _ + _, 16 * b + b, (16 * N + N) / 255));
					}
					return null;
				}
				n.parseHex = g;
				function d(p) {
					switch (p) {
						case 48: return 0;
						case 49: return 1;
						case 50: return 2;
						case 51: return 3;
						case 52: return 4;
						case 53: return 5;
						case 54: return 6;
						case 55: return 7;
						case 56: return 8;
						case 57: return 9;
						case 97: return 10;
						case 65: return 10;
						case 98: return 11;
						case 66: return 11;
						case 99: return 12;
						case 67: return 12;
						case 100: return 13;
						case 68: return 13;
						case 101: return 14;
						case 69: return 14;
						case 102: return 15;
						case 70: return 15;
					}
					return 0;
				}
			})(t.CSS || (t.CSS = {}));
		})(e.Format || (e.Format = {}));
	})(kn || (kn = {}));
	function W1(e) {
		const t = [];
		for (const n of e) {
			const r = Number(n);
			(r || r === 0 && n.replace(/\s/g, "") !== "") && t.push(r);
		}
		return t;
	}
	function Ir(e, t, n, r) {
		return {
			red: e / 255,
			blue: n / 255,
			green: t / 255,
			alpha: r
		};
	}
	function Wt(e, t) {
		const n = t.index, r = t[0].length;
		if (n === void 0) return;
		const i = e.positionAt(n);
		return {
			startLineNumber: i.lineNumber,
			startColumn: i.column,
			endLineNumber: i.lineNumber,
			endColumn: i.column + r
		};
	}
	function Cc(e, t) {
		if (!e) return;
		const n = kn.Format.CSS.parseHex(t);
		if (n) return {
			range: e,
			color: Ir(n.rgba.r, n.rgba.g, n.rgba.b, n.rgba.a)
		};
	}
	function H1(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = W1(t[0].values());
		return {
			range: e,
			color: Ir(r[0], r[1], r[2], n ? r[3] : 1)
		};
	}
	function z1(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = W1(t[0].values()), i = new kn(new rt(r[0], r[1] / 100, r[2] / 100, n ? r[3] : 1));
		return {
			range: e,
			color: Ir(i.rgba.r, i.rgba.g, i.rgba.b, i.rgba.a)
		};
	}
	function Ht(e, t) {
		return typeof e == "string" ? [...e.matchAll(t)] : e.findMatches(t);
	}
	function Pc(e) {
		const t = [], n = Ht(e, /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%\/]*\))|^(#)([A-Fa-f0-9]{3})\b|^(#)([A-Fa-f0-9]{4})\b|^(#)([A-Fa-f0-9]{6})\b|^(#)([A-Fa-f0-9]{8})\b|(?<=['"\s])(#)([A-Fa-f0-9]{3})\b|(?<=['"\s])(#)([A-Fa-f0-9]{4})\b|(?<=['"\s])(#)([A-Fa-f0-9]{6})\b|(?<=['"\s])(#)([A-Fa-f0-9]{8})\b/gm);
		if (n.length > 0) for (const r of n) {
			const i = r.filter((o) => o !== void 0), s = i[1], a = i[2];
			if (!a) continue;
			let l;
			s === "rgb" ? l = H1(Wt(e, r), Ht(a, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*[\s,]\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*[\s,]\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm), !1) : s === "rgba" ? l = H1(Wt(e, r), Ht(a, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*[\s,]\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*[\s,]\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*(?:[\s,]|[\s]*\/)\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm), !0) : s === "hsl" ? l = z1(Wt(e, r), Ht(a, /^\(\s*((?:360(?:\.0+)?|(?:36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])(?:\.\d+)?))\s*[\s,]\s*(100(?:\.0+)?|\d{1,2}[.]\d*|\d{1,2})%\s*[\s,]\s*(100(?:\.0+)?|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm), !1) : s === "hsla" ? l = z1(Wt(e, r), Ht(a, /^\(\s*((?:360(?:\.0+)?|(?:36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])(?:\.\d+)?))\s*[\s,]\s*(100(?:\.0+)?|\d{1,2}[.]\d*|\d{1,2})%\s*[\s,]\s*(100(?:\.0+)?|\d{1,2}[.]\d*|\d{1,2})%\s*(?:[\s,]|[\s]*\/)\s*(0[.][0-9]+|[.][0-9]+|[01][.]0*|[01])\s*\)$/gm), !0) : s === "#" && (l = Cc(Wt(e, r), s + a)), l && t.push(l);
		}
		return t;
	}
	function Ic(e) {
		return !e || typeof e.getValue != "function" || typeof e.positionAt != "function" ? [] : Pc(e);
	}
	const Fc = /^-+|-+$/g, Vc = 100;
	function Dc(e, t) {
		let n = [];
		if (t.findRegionSectionHeaders && t.foldingRules?.markers) {
			const r = Oc(e, t);
			n = n.concat(r);
		}
		if (t.findMarkSectionHeaders) {
			const r = $c(e, t);
			n = n.concat(r);
		}
		return n;
	}
	function Oc(e, t) {
		const n = [], r = e.getLineCount();
		for (let i = 1; i <= r; i++) {
			const s = e.getLineContent(i), a = s.match(t.foldingRules.markers.start);
			if (a) {
				const l = {
					startLineNumber: i,
					startColumn: a[0].length + 1,
					endLineNumber: i,
					endColumn: s.length + 1
				};
				if (l.endColumn > l.startColumn) {
					const o = {
						range: l,
						...Bc(s.substring(a[0].length)),
						shouldBeInComments: !1
					};
					(o.text || o.hasSeparatorLine) && n.push(o);
				}
			}
		}
		return n;
	}
	function $c(e, t) {
		const n = [], r = e.getLineCount();
		if (!t.markSectionHeaderRegex || t.markSectionHeaderRegex.trim() === "") return n;
		const i = Ru(t.markSectionHeaderRegex), s = new RegExp(t.markSectionHeaderRegex, `gdm${i ? "s" : ""}`);
		if (yl(s)) return n;
		for (let a = 1; a <= r; a += 95) {
			const l = Math.min(a + Vc - 1, r), o = [];
			for (let f = a; f <= l; f++) o.push(e.getLineContent(f));
			const c = o.join(`
`);
			s.lastIndex = 0;
			let h;
			for (; (h = s.exec(c)) !== null;) {
				const f = c.substring(0, h.index), m = (f.match(/\n/g) || []).length, g = a + m, d = h[0].split(`
`), p = d.length, y = g + p - 1, L = f.lastIndexOf(`
`) + 1, _ = h.index - L + 1, b = d[d.length - 1], N = {
					range: {
						startLineNumber: g,
						startColumn: _,
						endLineNumber: y,
						endColumn: p === 1 ? _ + h[0].length : b.length + 1
					},
					text: (h.groups ?? {}).label ?? "",
					hasSeparatorLine: ((h.groups ?? {}).separator ?? "") !== "",
					shouldBeInComments: !0
				};
				(N.text || N.hasSeparatorLine) && (n.length === 0 || n[n.length - 1].range.endLineNumber < N.range.startLineNumber) && n.push(N), s.lastIndex = h.index + h[0].length;
			}
		}
		return n;
	}
	function Bc(e) {
		e = e.trim();
		const t = e.startsWith("-");
		return e = e.replace(Fc, ""), {
			text: e,
			hasSeparatorLine: t
		};
	}
	(function() {
		const e = globalThis;
		typeof e.requestIdleCallback != "function" || e.cancelIdleCallback;
	})();
	var G1 = class {
		get isRejected() {
			return this.outcome?.outcome === 1;
		}
		get isSettled() {
			return !!this.outcome;
		}
		constructor() {
			this.p = new Promise((e, t) => {
				this.completeCallback = e, this.errorCallback = t;
			});
		}
		complete(e) {
			return this.isSettled ? Promise.resolve() : new Promise((t) => {
				this.completeCallback(e), this.outcome = {
					outcome: 0,
					value: e
				}, t();
			});
		}
		error(e) {
			return this.isSettled ? Promise.resolve() : new Promise((t) => {
				this.errorCallback(e), this.outcome = {
					outcome: 1,
					value: e
				}, t();
			});
		}
		cancel() {
			return this.error(new Li());
		}
	}, J1;
	(function(e) {
		async function t(r) {
			let i;
			const s = await Promise.all(r.map((a) => a.then((l) => l, (l) => {
				i || (i = l);
			})));
			if (typeof i < "u") throw i;
			return s;
		}
		e.settled = t;
		function n(r) {
			return new Promise(async (i, s) => {
				try {
					await r(i, s);
				} catch (a) {
					s(a);
				}
			});
		}
		e.withAsyncBody = n;
	})(J1 || (J1 = {}));
	var qc = class {
		constructor() {
			this._unsatisfiedConsumers = [], this._unconsumedValues = [];
		}
		get hasFinalValue() {
			return !!this._finalValue;
		}
		produce(e) {
			if (this._ensureNoFinalValue(), this._unsatisfiedConsumers.length > 0) {
				const t = this._unsatisfiedConsumers.shift();
				this._resolveOrRejectDeferred(t, e);
			} else this._unconsumedValues.push(e);
		}
		produceFinal(e) {
			this._ensureNoFinalValue(), this._finalValue = e;
			for (const t of this._unsatisfiedConsumers) this._resolveOrRejectDeferred(t, e);
			this._unsatisfiedConsumers.length = 0;
		}
		_ensureNoFinalValue() {
			if (this._finalValue) throw new ae("ProducerConsumer: cannot produce after final value has been set");
		}
		_resolveOrRejectDeferred(e, t) {
			t.ok ? e.complete(t.value) : e.error(t.error);
		}
		consume() {
			if (this._unconsumedValues.length > 0 || this._finalValue) {
				const e = this._unconsumedValues.length > 0 ? this._unconsumedValues.shift() : this._finalValue;
				return e.ok ? Promise.resolve(e.value) : Promise.reject(e.error);
			} else {
				const e = new G1();
				return this._unsatisfiedConsumers.push(e), e.p;
			}
		}
	};
	(class we {
		constructor(t, n) {
			this._onReturn = n, this._producerConsumer = new qc(), this._iterator = {
				next: () => this._producerConsumer.consume(),
				return: () => (this._onReturn?.(), Promise.resolve({
					done: !0,
					value: void 0
				})),
				throw: async (r) => (this._finishError(r), {
					done: !0,
					value: void 0
				})
			}, queueMicrotask(async () => {
				const r = t({
					emitOne: (i) => this._producerConsumer.produce({
						ok: !0,
						value: {
							done: !1,
							value: i
						}
					}),
					emitMany: (i) => {
						for (const s of i) this._producerConsumer.produce({
							ok: !0,
							value: {
								done: !1,
								value: s
							}
						});
					},
					reject: (i) => this._finishError(i)
				});
				if (!this._producerConsumer.hasFinalValue) try {
					await r, this._finishOk();
				} catch (i) {
					this._finishError(i);
				}
			});
		}
		static fromArray(t) {
			return new we((n) => {
				n.emitMany(t);
			});
		}
		static fromPromise(t) {
			return new we(async (n) => {
				n.emitMany(await t);
			});
		}
		static fromPromisesResolveOrder(t) {
			return new we(async (n) => {
				await Promise.all(t.map(async (r) => n.emitOne(await r)));
			});
		}
		static merge(t) {
			return new we(async (n) => {
				await Promise.all(t.map(async (r) => {
					for await (const i of r) n.emitOne(i);
				}));
			});
		}
		static {
			this.EMPTY = we.fromArray([]);
		}
		static map(t, n) {
			return new we(async (r) => {
				for await (const i of t) r.emitOne(n(i));
			});
		}
		static tee(t) {
			let n, r;
			const i = new G1(), s = async () => {
				if (!(!n || !r)) try {
					for await (const a of t) n.emitOne(a), r.emitOne(a);
				} catch (a) {
					n.reject(a), r.reject(a);
				} finally {
					i.complete();
				}
			};
			return [new we(async (a) => (n = a, s(), i.p)), new we(async (a) => (r = a, s(), i.p))];
		}
		map(t) {
			return we.map(this, t);
		}
		static coalesce(t) {
			return we.filter(t, (n) => !!n);
		}
		coalesce() {
			return we.coalesce(this);
		}
		static filter(t, n) {
			return new we(async (r) => {
				for await (const i of t) n(i) && r.emitOne(i);
			});
		}
		filter(t) {
			return we.filter(this, t);
		}
		_finishOk() {
			this._producerConsumer.hasFinalValue || this._producerConsumer.produceFinal({
				ok: !0,
				value: {
					done: !0,
					value: void 0
				}
			});
		}
		_finishError(t) {
			this._producerConsumer.hasFinalValue || this._producerConsumer.produceFinal({
				ok: !1,
				error: t
			});
		}
		[Symbol.asyncIterator]() {
			return this._iterator;
		}
	});
	var jc = class {
		constructor(e) {
			this.values = e, this.prefixSum = new Uint32Array(e.length), this.prefixSumValidIndex = /* @__PURE__ */ new Int32Array(1), this.prefixSumValidIndex[0] = -1;
		}
		insertValues(e, t) {
			e = mt(e);
			const n = this.values, r = this.prefixSum, i = t.length;
			return i === 0 ? !1 : (this.values = new Uint32Array(n.length + i), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e), e + i), this.values.set(t, e), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSum = new Uint32Array(this.values.length), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		setValue(e, t) {
			return e = mt(e), t = mt(t), this.values[e] === t ? !1 : (this.values[e] = t, e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), !0);
		}
		removeValues(e, t) {
			e = mt(e), t = mt(t);
			const n = this.values, r = this.prefixSum;
			if (e >= n.length) return !1;
			const i = n.length - e;
			return t >= i && (t = i), t === 0 ? !1 : (this.values = new Uint32Array(n.length - t), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e + t), e), this.prefixSum = new Uint32Array(this.values.length), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		getTotalSum() {
			return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
		}
		getPrefixSum(e) {
			return e < 0 ? 0 : (e = mt(e), this._getPrefixSum(e));
		}
		_getPrefixSum(e) {
			if (e <= this.prefixSumValidIndex[0]) return this.prefixSum[e];
			let t = this.prefixSumValidIndex[0] + 1;
			t === 0 && (this.prefixSum[0] = this.values[0], t++), e >= this.values.length && (e = this.values.length - 1);
			for (let n = t; n <= e; n++) this.prefixSum[n] = this.prefixSum[n - 1] + this.values[n];
			return this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], e), this.prefixSum[e];
		}
		getIndexOf(e) {
			e = Math.floor(e), this.getTotalSum();
			let t = 0, n = this.values.length - 1, r = 0, i = 0, s = 0;
			for (; t <= n;) if (r = t + (n - t) / 2 | 0, i = this.prefixSum[r], s = i - this.values[r], e < s) n = r - 1;
			else if (e >= i) t = r + 1;
			else break;
			return new Wc(r, e - s);
		}
	}, Wc = class {
		constructor(e, t) {
			this.index = e, this.remainder = t, this._prefixSumIndexOfResultBrand = void 0, this.index = e, this.remainder = t;
		}
	}, Hc = class {
		constructor(e, t, n, r) {
			this._uri = e, this._lines = t, this._eol = n, this._versionId = r, this._lineStarts = null, this._cachedTextValue = null;
		}
		dispose() {
			this._lines.length = 0;
		}
		get version() {
			return this._versionId;
		}
		getText() {
			return this._cachedTextValue === null && (this._cachedTextValue = this._lines.join(this._eol)), this._cachedTextValue;
		}
		onEvents(e) {
			e.eol && e.eol !== this._eol && (this._eol = e.eol, this._lineStarts = null);
			const t = e.changes;
			for (const n of t) this._acceptDeleteRange(n.range), this._acceptInsertText(new G(n.range.startLineNumber, n.range.startColumn), n.text);
			this._versionId = e.versionId, this._cachedTextValue = null;
		}
		_ensureLineStarts() {
			if (!this._lineStarts) {
				const e = this._eol.length, t = this._lines.length, n = new Uint32Array(t);
				for (let r = 0; r < t; r++) n[r] = this._lines[r].length + e;
				this._lineStarts = new jc(n);
			}
		}
		_setLineText(e, t) {
			this._lines[e] = t, this._lineStarts && this._lineStarts.setValue(e, this._lines[e].length + this._eol.length);
		}
		_acceptDeleteRange(e) {
			if (e.startLineNumber === e.endLineNumber) {
				if (e.startColumn === e.endColumn) return;
				this._setLineText(e.startLineNumber - 1, this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) + this._lines[e.startLineNumber - 1].substring(e.endColumn - 1));
				return;
			}
			this._setLineText(e.startLineNumber - 1, this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) + this._lines[e.endLineNumber - 1].substring(e.endColumn - 1)), this._lines.splice(e.startLineNumber, e.endLineNumber - e.startLineNumber), this._lineStarts && this._lineStarts.removeValues(e.startLineNumber, e.endLineNumber - e.startLineNumber);
		}
		_acceptInsertText(e, t) {
			if (t.length === 0) return;
			const n = vl(t);
			if (n.length === 1) {
				this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0] + this._lines[e.lineNumber - 1].substring(e.column - 1));
				return;
			}
			n[n.length - 1] += this._lines[e.lineNumber - 1].substring(e.column - 1), this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0]);
			const r = new Uint32Array(n.length - 1);
			for (let i = 1; i < n.length; i++) this._lines.splice(e.lineNumber + i - 1, 0, n[i]), r[i - 1] = n[i].length + this._eol.length;
			this._lineStarts && this._lineStarts.insertValues(e.lineNumber, r);
		}
	}, zc = class {
		constructor() {
			this._models = Object.create(null);
		}
		getModel(e) {
			return this._models[e];
		}
		getModels() {
			const e = [];
			return Object.keys(this._models).forEach((t) => e.push(this._models[t])), e;
		}
		$acceptNewModel(e) {
			this._models[e.url] = new Gc(qe.parse(e.url), e.lines, e.EOL, e.versionId);
		}
		$acceptModelChanged(e, t) {
			this._models[e] && this._models[e].onEvents(t);
		}
		$acceptRemovedModel(e) {
			this._models[e] && delete this._models[e];
		}
	}, Gc = class extends Hc {
		get uri() {
			return this._uri;
		}
		get eol() {
			return this._eol;
		}
		getValue() {
			return this.getText();
		}
		findMatches(e) {
			const t = [];
			for (let n = 0; n < this._lines.length; n++) {
				const r = this._lines[n], i = this.offsetAt(new G(n + 1, 1)), s = r.matchAll(e);
				for (const a of s) (a.index || a.index === 0) && (a.index = a.index + i), t.push(a);
			}
			return t;
		}
		getLinesContent() {
			return this._lines.slice(0);
		}
		getLineCount() {
			return this._lines.length;
		}
		getLineContent(e) {
			return this._lines[e - 1];
		}
		getWordAtPosition(e, t) {
			const n = wr(e.column, d1(t), this._lines[e.lineNumber - 1], 0);
			return n ? new q(e.lineNumber, n.startColumn, e.lineNumber, n.endColumn) : null;
		}
		words(e) {
			const t = this._lines, n = this._wordenize.bind(this);
			let r = 0, i = "", s = 0, a = [];
			return { *[Symbol.iterator]() {
				for (;;) if (s < a.length) {
					const l = i.substring(a[s].start, a[s].end);
					s += 1, yield l;
				} else if (r < t.length) i = t[r], a = n(i, e), s = 0, r += 1;
				else break;
			} };
		}
		getLineWords(e, t) {
			const n = this._lines[e - 1], r = this._wordenize(n, t), i = [];
			for (const s of r) i.push({
				word: n.substring(s.start, s.end),
				startColumn: s.start + 1,
				endColumn: s.end + 1
			});
			return i;
		}
		_wordenize(e, t) {
			const n = [];
			let r;
			for (t.lastIndex = 0; (r = t.exec(e)) && r[0].length !== 0;) n.push({
				start: r.index,
				end: r.index + r[0].length
			});
			return n;
		}
		getValueInRange(e) {
			if (e = this._validateRange(e), e.startLineNumber === e.endLineNumber) return this._lines[e.startLineNumber - 1].substring(e.startColumn - 1, e.endColumn - 1);
			const t = this._eol, n = e.startLineNumber - 1, r = e.endLineNumber - 1, i = [];
			i.push(this._lines[n].substring(e.startColumn - 1));
			for (let s = n + 1; s < r; s++) i.push(this._lines[s]);
			return i.push(this._lines[r].substring(0, e.endColumn - 1)), i.join(t);
		}
		offsetAt(e) {
			return e = this._validatePosition(e), this._ensureLineStarts(), this._lineStarts.getPrefixSum(e.lineNumber - 2) + (e.column - 1);
		}
		positionAt(e) {
			e = Math.floor(e), e = Math.max(0, e), this._ensureLineStarts();
			const t = this._lineStarts.getIndexOf(e), n = this._lines[t.index].length;
			return {
				lineNumber: 1 + t.index,
				column: 1 + Math.min(t.remainder, n)
			};
		}
		_validateRange(e) {
			const t = this._validatePosition({
				lineNumber: e.startLineNumber,
				column: e.startColumn
			}), n = this._validatePosition({
				lineNumber: e.endLineNumber,
				column: e.endColumn
			});
			return t.lineNumber !== e.startLineNumber || t.column !== e.startColumn || n.lineNumber !== e.endLineNumber || n.column !== e.endColumn ? {
				startLineNumber: t.lineNumber,
				startColumn: t.column,
				endLineNumber: n.lineNumber,
				endColumn: n.column
			} : e;
		}
		_validatePosition(e) {
			if (!G.isIPosition(e)) throw new Error("bad position");
			let { lineNumber: t, column: n } = e, r = !1;
			if (t < 1) t = 1, n = 1, r = !0;
			else if (t > this._lines.length) t = this._lines.length, n = this._lines[t - 1].length + 1, r = !0;
			else {
				const i = this._lines[t - 1].length + 1;
				n < 1 ? (n = 1, r = !0) : n > i && (n = i, r = !0);
			}
			return r ? {
				lineNumber: t,
				column: n
			} : e;
		}
	}, Jc = class qn {
		constructor(t = null) {
			this._foreignModule = t, this._requestHandlerBrand = void 0, this._workerTextModelSyncServer = new zc();
		}
		dispose() {}
		async $ping() {
			return "pong";
		}
		_getModel(t) {
			return this._workerTextModelSyncServer.getModel(t);
		}
		getModels() {
			return this._workerTextModelSyncServer.getModels();
		}
		$acceptNewModel(t) {
			this._workerTextModelSyncServer.$acceptNewModel(t);
		}
		$acceptModelChanged(t, n) {
			this._workerTextModelSyncServer.$acceptModelChanged(t, n);
		}
		$acceptRemovedModel(t) {
			this._workerTextModelSyncServer.$acceptRemovedModel(t);
		}
		async $computeUnicodeHighlights(t, n, r) {
			const i = this._getModel(t);
			return i ? Vu.computeUnicodeHighlights(i, n, r) : {
				ranges: [],
				hasMore: !1,
				ambiguousCharacterCount: 0,
				invisibleCharacterCount: 0,
				nonBasicAsciiCharacterCount: 0
			};
		}
		async $findSectionHeaders(t, n) {
			const r = this._getModel(t);
			return r ? Dc(r, n) : [];
		}
		async $computeDiff(t, n, r, i) {
			const s = this._getModel(t), a = this._getModel(n);
			if (!s || !a) return null;
			const l = await Xc(i);
			return qn.computeDiff(s, a, r, l);
		}
		static computeDiff(t, n, r, i) {
			const s = t.getLinesContent(), a = n.getLinesContent(), l = i.computeDiff(s, a, r), o = l.changes.length > 0 ? !1 : this._modelsAreIdentical(t, n);
			function c(h) {
				return h.map((f) => [
					f.original.startLineNumber,
					f.original.endLineNumberExclusive,
					f.modified.startLineNumber,
					f.modified.endLineNumberExclusive,
					f.innerChanges?.map((m) => [
						m.originalRange.startLineNumber,
						m.originalRange.startColumn,
						m.originalRange.endLineNumber,
						m.originalRange.endColumn,
						m.modifiedRange.startLineNumber,
						m.modifiedRange.startColumn,
						m.modifiedRange.endLineNumber,
						m.modifiedRange.endColumn
					])
				]);
			}
			return {
				identical: o,
				quitEarly: l.hitTimeout,
				changes: c(l.changes),
				moves: l.moves.map((h) => [
					h.lineRangeMapping.original.startLineNumber,
					h.lineRangeMapping.original.endLineNumberExclusive,
					h.lineRangeMapping.modified.startLineNumber,
					h.lineRangeMapping.modified.endLineNumberExclusive,
					c(h.changes)
				])
			};
		}
		static _modelsAreIdentical(t, n) {
			const r = t.getLineCount();
			if (r !== n.getLineCount()) return !1;
			for (let i = 1; i <= r; i++) if (t.getLineContent(i) !== n.getLineContent(i)) return !1;
			return !0;
		}
		static {
			this._diffLimit = 1e5;
		}
		async $computeMoreMinimalEdits(t, n, r) {
			const i = this._getModel(t);
			if (!i) return n;
			const s = [];
			let a;
			n = n.slice(0).sort((o, c) => o.range && c.range ? q.compareRangesUsingStarts(o.range, c.range) : (o.range ? 0 : 1) - (c.range ? 0 : 1));
			let l = 0;
			for (let o = 1; o < n.length; o++) q.getEndPosition(n[l].range).equals(q.getStartPosition(n[o].range)) ? (n[l].range = q.fromPositions(q.getStartPosition(n[l].range), q.getEndPosition(n[o].range)), n[l].text += n[o].text) : (l++, n[l] = n[o]);
			n.length = l + 1;
			for (let { range: o, text: c, eol: h } of n) {
				if (typeof h == "number" && (a = h), q.isEmpty(o) && !c) continue;
				const f = i.getValueInRange(o);
				if (c = c.replace(/\r\n|\n|\r/g, i.eol), f === c) continue;
				if (Math.max(c.length, f.length) > qn._diffLimit) {
					s.push({
						range: o,
						text: c
					});
					continue;
				}
				const m = Dl(f, c, r), g = i.offsetAt(q.lift(o).getStartPosition());
				for (const d of m) {
					const p = i.positionAt(g + d.originalStart), y = i.positionAt(g + d.originalStart + d.originalLength), L = {
						text: c.substr(d.modifiedStart, d.modifiedLength),
						range: {
							startLineNumber: p.lineNumber,
							startColumn: p.column,
							endLineNumber: y.lineNumber,
							endColumn: y.column
						}
					};
					i.getValueInRange(L.range) !== L.text && s.push(L);
				}
			}
			return typeof a == "number" && s.push({
				eol: a,
				text: "",
				range: {
					startLineNumber: 0,
					startColumn: 0,
					endLineNumber: 0,
					endColumn: 0
				}
			}), s;
		}
		async $computeLinks(t) {
			const n = this._getModel(t);
			return n ? Wl(n) : null;
		}
		async $computeDefaultDocumentColors(t) {
			const n = this._getModel(t);
			return n ? Ic(n) : null;
		}
		static {
			this._suggestionsLimit = 1e4;
		}
		async $textualSuggest(t, n, r, i) {
			const s = new ki(), a = new RegExp(r, i), l = /* @__PURE__ */ new Set();
			e: for (const o of t) {
				const c = this._getModel(o);
				if (c) {
					for (const h of c.words(a)) if (!(h === n || !isNaN(Number(h))) && (l.add(h), l.size > qn._suggestionsLimit)) break e;
				}
			}
			return {
				words: Array.from(l),
				duration: s.elapsed()
			};
		}
		async $computeWordRanges(t, n, r, i) {
			const s = this._getModel(t);
			if (!s) return Object.create(null);
			const a = new RegExp(r, i), l = Object.create(null);
			for (let o = n.startLineNumber; o < n.endLineNumber; o++) {
				const c = s.getLineWords(o, a);
				for (const h of c) {
					if (!isNaN(Number(h.word))) continue;
					let f = l[h.word];
					f || (f = [], l[h.word] = f), f.push({
						startLineNumber: o,
						startColumn: h.startColumn,
						endLineNumber: o,
						endColumn: h.endColumn
					});
				}
			}
			return l;
		}
		async $navigateValueSet(t, n, r, i, s) {
			const a = this._getModel(t);
			if (!a) return null;
			const l = new RegExp(i, s);
			n.startColumn === n.endColumn && (n = {
				startLineNumber: n.startLineNumber,
				startColumn: n.startColumn,
				endLineNumber: n.endLineNumber,
				endColumn: n.endColumn + 1
			});
			const o = a.getValueInRange(n), c = a.getWordAtPosition({
				lineNumber: n.startLineNumber,
				column: n.startColumn
			}, l);
			if (!c) return null;
			const h = a.getValueInRange(c);
			return Hl.INSTANCE.navigateValueSet(n, o, c, h, r);
		}
		$fmr(t, n) {
			if (!this._foreignModule || typeof this._foreignModule[t] != "function") return Promise.reject(/* @__PURE__ */ new Error("Missing requestHandler or method: " + t));
			try {
				return Promise.resolve(this._foreignModule[t].apply(this._foreignModule, n));
			} catch (r) {
				return Promise.reject(r);
			}
		}
	};
	typeof importScripts == "function" && (globalThis.monaco = Lu());
	function Xc(e) {
		switch (e) {
			case "legacy": return An.getLegacy();
			case "advanced": return An.getDefault();
			case "advanced-external": return An.getAdvancedExternal();
			case "advanced-wasm": return An.getAdvancedWasm();
		}
	}
	var Qc = class bi {
		static {
			this.CHANNEL_NAME = "editorWorkerHost";
		}
		static getChannel(t) {
			return t.getChannel(bi.CHANNEL_NAME);
		}
		static setChannel(t, n) {
			t.setChannel(bi.CHANNEL_NAME, n);
		}
	};
	function Yc(e) {
		let t;
		const n = Pl((r) => {
			const i = Qc.getChannel(r);
			return t = e({
				host: new Proxy({}, { get(s, a, l) {
					if (a !== "then") {
						if (typeof a != "string") throw new Error("Not supported");
						return (...o) => i.$fhr(a, o);
					}
				} }),
				getMirrorModels: () => n.requestHandler.getModels()
			}), new Jc(t);
		});
		return t;
	}
	function Kc(e) {
		self.onmessage = (t) => {
			Yc((n) => e(n, t.data));
		};
	}
	function Vr(e, t = !1) {
		const n = e.length;
		let r = 0, i = "", s = 0, a = 16, l = 0, o = 0, c = 0, h = 0, f = 0;
		function m(b, N) {
			let v = 0, S = 0;
			for (; v < b;) {
				let w = e.charCodeAt(r);
				if (w >= 48 && w <= 57) S = S * 16 + w - 48;
				else if (w >= 65 && w <= 70) S = S * 16 + w - 65 + 10;
				else if (w >= 97 && w <= 102) S = S * 16 + w - 97 + 10;
				else break;
				r++, v++;
			}
			return v < b && (S = -1), S;
		}
		function g(b) {
			r = b, i = "", s = 0, a = 16, f = 0;
		}
		function d() {
			let b = r;
			if (e.charCodeAt(r) === 48) r++;
			else for (r++; r < e.length && _t(e.charCodeAt(r));) r++;
			if (r < e.length && e.charCodeAt(r) === 46) if (r++, r < e.length && _t(e.charCodeAt(r))) for (r++; r < e.length && _t(e.charCodeAt(r));) r++;
			else return f = 3, e.substring(b, r);
			let N = r;
			if (r < e.length && (e.charCodeAt(r) === 69 || e.charCodeAt(r) === 101)) if (r++, (r < e.length && e.charCodeAt(r) === 43 || e.charCodeAt(r) === 45) && r++, r < e.length && _t(e.charCodeAt(r))) {
				for (r++; r < e.length && _t(e.charCodeAt(r));) r++;
				N = r;
			} else f = 3;
			return e.substring(b, N);
		}
		function p() {
			let b = "", N = r;
			for (;;) {
				if (r >= n) {
					b += e.substring(N, r), f = 2;
					break;
				}
				const v = e.charCodeAt(r);
				if (v === 34) {
					b += e.substring(N, r), r++;
					break;
				}
				if (v === 92) {
					if (b += e.substring(N, r), r++, r >= n) {
						f = 2;
						break;
					}
					switch (e.charCodeAt(r++)) {
						case 34:
							b += "\"";
							break;
						case 92:
							b += "\\";
							break;
						case 47:
							b += "/";
							break;
						case 98:
							b += "\b";
							break;
						case 102:
							b += "\f";
							break;
						case 110:
							b += `
`;
							break;
						case 114:
							b += "\r";
							break;
						case 116:
							b += "	";
							break;
						case 117:
							const S = m(4);
							S >= 0 ? b += String.fromCharCode(S) : f = 4;
							break;
						default: f = 5;
					}
					N = r;
					continue;
				}
				if (v >= 0 && v <= 31) if (zt(v)) {
					b += e.substring(N, r), f = 2;
					break;
				} else f = 6;
				r++;
			}
			return b;
		}
		function y() {
			if (i = "", f = 0, s = r, o = l, h = c, r >= n) return s = n, a = 17;
			let b = e.charCodeAt(r);
			if (Dr(b)) {
				do
					r++, i += String.fromCharCode(b), b = e.charCodeAt(r);
				while (Dr(b));
				return a = 15;
			}
			if (zt(b)) return r++, i += String.fromCharCode(b), b === 13 && e.charCodeAt(r) === 10 && (r++, i += `
`), l++, c = r, a = 14;
			switch (b) {
				case 123: return r++, a = 1;
				case 125: return r++, a = 2;
				case 91: return r++, a = 3;
				case 93: return r++, a = 4;
				case 58: return r++, a = 6;
				case 44: return r++, a = 5;
				case 34: return r++, i = p(), a = 10;
				case 47:
					const N = r - 1;
					if (e.charCodeAt(r + 1) === 47) {
						for (r += 2; r < n && !zt(e.charCodeAt(r));) r++;
						return i = e.substring(N, r), a = 12;
					}
					if (e.charCodeAt(r + 1) === 42) {
						r += 2;
						const v = n - 1;
						let S = !1;
						for (; r < v;) {
							const w = e.charCodeAt(r);
							if (w === 42 && e.charCodeAt(r + 1) === 47) {
								r += 2, S = !0;
								break;
							}
							r++, zt(w) && (w === 13 && e.charCodeAt(r) === 10 && r++, l++, c = r);
						}
						return S || (r++, f = 1), i = e.substring(N, r), a = 13;
					}
					return i += String.fromCharCode(b), r++, a = 16;
				case 45: if (i += String.fromCharCode(b), r++, r === n || !_t(e.charCodeAt(r))) return a = 16;
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57: return i += d(), a = 11;
				default:
					for (; r < n && L(b);) r++, b = e.charCodeAt(r);
					if (s !== r) {
						switch (i = e.substring(s, r), i) {
							case "true": return a = 8;
							case "false": return a = 9;
							case "null": return a = 7;
						}
						return a = 16;
					}
					return i += String.fromCharCode(b), r++, a = 16;
			}
		}
		function L(b) {
			if (Dr(b) || zt(b)) return !1;
			switch (b) {
				case 125:
				case 93:
				case 123:
				case 91:
				case 34:
				case 58:
				case 44:
				case 47: return !1;
			}
			return !0;
		}
		function _() {
			let b;
			do
				b = y();
			while (b >= 12 && b <= 15);
			return b;
		}
		return {
			setPosition: g,
			getPosition: () => r,
			scan: t ? _ : y,
			getToken: () => a,
			getTokenValue: () => i,
			getTokenOffset: () => s,
			getTokenLength: () => r - s,
			getTokenStartLine: () => o,
			getTokenStartCharacter: () => s - h,
			getTokenError: () => f
		};
	}
	function Dr(e) {
		return e === 32 || e === 9;
	}
	function zt(e) {
		return e === 10 || e === 13;
	}
	function _t(e) {
		return e >= 48 && e <= 57;
	}
	var X1;
	(function(e) {
		e[e.lineFeed = 10] = "lineFeed", e[e.carriageReturn = 13] = "carriageReturn", e[e.space = 32] = "space", e[e._0 = 48] = "_0", e[e._1 = 49] = "_1", e[e._2 = 50] = "_2", e[e._3 = 51] = "_3", e[e._4 = 52] = "_4", e[e._5 = 53] = "_5", e[e._6 = 54] = "_6", e[e._7 = 55] = "_7", e[e._8 = 56] = "_8", e[e._9 = 57] = "_9", e[e.a = 97] = "a", e[e.b = 98] = "b", e[e.c = 99] = "c", e[e.d = 100] = "d", e[e.e = 101] = "e", e[e.f = 102] = "f", e[e.g = 103] = "g", e[e.h = 104] = "h", e[e.i = 105] = "i", e[e.j = 106] = "j", e[e.k = 107] = "k", e[e.l = 108] = "l", e[e.m = 109] = "m", e[e.n = 110] = "n", e[e.o = 111] = "o", e[e.p = 112] = "p", e[e.q = 113] = "q", e[e.r = 114] = "r", e[e.s = 115] = "s", e[e.t = 116] = "t", e[e.u = 117] = "u", e[e.v = 118] = "v", e[e.w = 119] = "w", e[e.x = 120] = "x", e[e.y = 121] = "y", e[e.z = 122] = "z", e[e.A = 65] = "A", e[e.B = 66] = "B", e[e.C = 67] = "C", e[e.D = 68] = "D", e[e.E = 69] = "E", e[e.F = 70] = "F", e[e.G = 71] = "G", e[e.H = 72] = "H", e[e.I = 73] = "I", e[e.J = 74] = "J", e[e.K = 75] = "K", e[e.L = 76] = "L", e[e.M = 77] = "M", e[e.N = 78] = "N", e[e.O = 79] = "O", e[e.P = 80] = "P", e[e.Q = 81] = "Q", e[e.R = 82] = "R", e[e.S = 83] = "S", e[e.T = 84] = "T", e[e.U = 85] = "U", e[e.V = 86] = "V", e[e.W = 87] = "W", e[e.X = 88] = "X", e[e.Y = 89] = "Y", e[e.Z = 90] = "Z", e[e.asterisk = 42] = "asterisk", e[e.backslash = 92] = "backslash", e[e.closeBrace = 125] = "closeBrace", e[e.closeBracket = 93] = "closeBracket", e[e.colon = 58] = "colon", e[e.comma = 44] = "comma", e[e.dot = 46] = "dot", e[e.doubleQuote = 34] = "doubleQuote", e[e.minus = 45] = "minus", e[e.openBrace = 123] = "openBrace", e[e.openBracket = 91] = "openBracket", e[e.plus = 43] = "plus", e[e.slash = 47] = "slash", e[e.formFeed = 12] = "formFeed", e[e.tab = 9] = "tab";
	})(X1 || (X1 = {}));
	const Se = new Array(20).fill(0).map((e, t) => " ".repeat(t)), Nt = 200, Q1 = {
		" ": {
			"\n": new Array(Nt).fill(0).map((e, t) => `
` + " ".repeat(t)),
			"\r": new Array(Nt).fill(0).map((e, t) => "\r" + " ".repeat(t)),
			"\r\n": new Array(Nt).fill(0).map((e, t) => `\r
` + " ".repeat(t))
		},
		"	": {
			"\n": new Array(Nt).fill(0).map((e, t) => `
` + "	".repeat(t)),
			"\r": new Array(Nt).fill(0).map((e, t) => "\r" + "	".repeat(t)),
			"\r\n": new Array(Nt).fill(0).map((e, t) => `\r
` + "	".repeat(t))
		}
	}, e0 = [
		`
`,
		"\r",
		`\r
`
	];
	function t0(e, t, n) {
		let r, i, s, a, l;
		if (t) {
			for (a = t.offset, l = a + t.length, s = a; s > 0 && !Y1(e, s - 1);) s--;
			let v = l;
			for (; v < e.length && !Y1(e, v);) v++;
			i = e.substring(s, v), r = n0(i, n);
		} else i = e, r = 0, s = 0, a = 0, l = e.length;
		const o = r0(n, e), c = e0.includes(o);
		let h = 0, f = 0, m;
		n.insertSpaces ? m = Se[n.tabSize || 4] ?? St(Se[1], n.tabSize || 4) : m = "	";
		const g = m === "	" ? "	" : " ";
		let d = Vr(i, !1), p = !1;
		function y() {
			if (h > 1) return St(o, h) + St(m, r + f);
			const v = m.length * (r + f);
			return !c || v > Q1[g][o].length ? o + St(m, r + f) : v <= 0 ? o : Q1[g][o][v];
		}
		function L() {
			let v = d.scan();
			for (h = 0; v === 15 || v === 14;) v === 14 && n.keepLines ? h += 1 : v === 14 && (h = 1), v = d.scan();
			return p = v === 16 || d.getTokenError() !== 0, v;
		}
		const _ = [];
		function b(v, S, w) {
			!p && (!t || S < l && w > a) && e.substring(S, w) !== v && _.push({
				offset: S,
				length: w - S,
				content: v
			});
		}
		let N = L();
		if (n.keepLines && h > 0 && b(St(o, h), 0, 0), N !== 17) {
			let v = d.getTokenOffset() + s;
			b(m.length * r < 20 && n.insertSpaces ? Se[m.length * r] : St(m, r), s, v);
		}
		for (; N !== 17;) {
			let v = d.getTokenOffset() + d.getTokenLength() + s, S = L(), w = "", k = !1;
			for (; h === 0 && (S === 12 || S === 13);) {
				let D = d.getTokenOffset() + s;
				b(Se[1], v, D), v = d.getTokenOffset() + d.getTokenLength() + s, k = S === 12, w = k ? y() : "", S = L();
			}
			if (S === 2) N !== 1 && f--, n.keepLines && h > 0 || !n.keepLines && N !== 1 ? w = y() : n.keepLines && (w = Se[1]);
			else if (S === 4) N !== 3 && f--, n.keepLines && h > 0 || !n.keepLines && N !== 3 ? w = y() : n.keepLines && (w = Se[1]);
			else {
				switch (N) {
					case 3:
					case 1:
						f++, n.keepLines && h > 0 || !n.keepLines ? w = y() : w = Se[1];
						break;
					case 5:
						n.keepLines && h > 0 || !n.keepLines ? w = y() : w = Se[1];
						break;
					case 12:
						w = y();
						break;
					case 13:
						h > 0 ? w = y() : k || (w = Se[1]);
						break;
					case 6:
						n.keepLines && h > 0 ? w = y() : k || (w = Se[1]);
						break;
					case 10:
						n.keepLines && h > 0 ? w = y() : S === 6 && !k && (w = "");
						break;
					case 7:
					case 8:
					case 9:
					case 11:
					case 2:
					case 4:
						n.keepLines && h > 0 ? w = y() : (S === 12 || S === 13) && !k ? w = Se[1] : S !== 5 && S !== 17 && (p = !0);
						break;
					case 16: p = !0;
				}
				h > 0 && (S === 12 || S === 13) && (w = y());
			}
			S === 17 && (n.keepLines && h > 0 ? w = y() : w = n.insertFinalNewline ? o : "");
			const P = d.getTokenOffset() + s;
			b(w, v, P), N = S;
		}
		return _;
	}
	function St(e, t) {
		let n = "";
		for (let r = 0; r < t; r++) n += e;
		return n;
	}
	function n0(e, t) {
		let n = 0, r = 0;
		const i = t.tabSize || 4;
		for (; n < e.length;) {
			let s = e.charAt(n);
			if (s === Se[1]) r++;
			else if (s === "	") r += i;
			else break;
			n++;
		}
		return Math.floor(r / i);
	}
	function r0(e, t) {
		for (let n = 0; n < t.length; n++) {
			const r = t.charAt(n);
			if (r === "\r") return n + 1 < t.length && t.charAt(n + 1) === `
` ? `\r
` : "\r";
			if (r === `
`) return `
`;
		}
		return e && e.eol || `
`;
	}
	function Y1(e, t) {
		return `\r
`.indexOf(e.charAt(t)) !== -1;
	}
	var Rn;
	(function(e) {
		e.DEFAULT = { allowTrailingComma: !1 };
	})(Rn || (Rn = {}));
	function i0(e, t = [], n = Rn.DEFAULT) {
		let r = null, i = [];
		const s = [];
		function a(l) {
			Array.isArray(i) ? i.push(l) : r !== null && (i[r] = l);
		}
		return a0(e, {
			onObjectBegin: () => {
				const l = {};
				a(l), s.push(i), i = l, r = null;
			},
			onObjectProperty: (l) => {
				r = l;
			},
			onObjectEnd: () => {
				i = s.pop();
			},
			onArrayBegin: () => {
				const l = [];
				a(l), s.push(i), i = l, r = null;
			},
			onArrayEnd: () => {
				i = s.pop();
			},
			onLiteralValue: a,
			onError: (l, o, c) => {
				t.push({
					error: l,
					offset: o,
					length: c
				});
			}
		}, n), i[0];
	}
	function Z1(e) {
		if (!e.parent || !e.parent.children) return [];
		const t = Z1(e.parent);
		if (e.parent.type === "property") {
			const n = e.parent.children[0].value;
			t.push(n);
		} else if (e.parent.type === "array") {
			const n = e.parent.children.indexOf(e);
			n !== -1 && t.push(n);
		}
		return t;
	}
	function Or(e) {
		switch (e.type) {
			case "array": return e.children.map(Or);
			case "object":
				const t = Object.create(null);
				for (let n of e.children) {
					const r = n.children[1];
					r && (t[n.children[0].value] = Or(r));
				}
				return t;
			case "null":
			case "string":
			case "number":
			case "boolean": return e.value;
			default: return;
		}
	}
	function s0(e, t, n = !1) {
		return t >= e.offset && t < e.offset + e.length || n && t === e.offset + e.length;
	}
	function K1(e, t, n = !1) {
		if (s0(e, t, n)) {
			const r = e.children;
			if (Array.isArray(r)) for (let i = 0; i < r.length && r[i].offset <= t; i++) {
				const s = K1(r[i], t, n);
				if (s) return s;
			}
			return e;
		}
	}
	function a0(e, t, n = Rn.DEFAULT) {
		const r = Vr(e, !1), i = [];
		function s(R) {
			return R ? () => R(r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter()) : () => !0;
		}
		function a(R) {
			return R ? () => R(r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter(), () => i.slice()) : () => !0;
		}
		function l(R) {
			return R ? (M) => R(M, r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter()) : () => !0;
		}
		function o(R) {
			return R ? (M) => R(M, r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter(), () => i.slice()) : () => !0;
		}
		const c = a(t.onObjectBegin), h = o(t.onObjectProperty), f = s(t.onObjectEnd), m = a(t.onArrayBegin), g = s(t.onArrayEnd), d = o(t.onLiteralValue), p = l(t.onSeparator), y = s(t.onComment), L = l(t.onError), _ = n && n.disallowComments, b = n && n.allowTrailingComma;
		function N() {
			for (;;) {
				const R = r.scan();
				switch (r.getTokenError()) {
					case 4:
						v(14);
						break;
					case 5:
						v(15);
						break;
					case 3:
						v(13);
						break;
					case 1:
						_ || v(11);
						break;
					case 2:
						v(12);
						break;
					case 6: v(16);
				}
				switch (R) {
					case 12:
					case 13:
						_ ? v(10) : y();
						break;
					case 16:
						v(1);
						break;
					case 15:
					case 14: break;
					default: return R;
				}
			}
		}
		function v(R, M = [], E = []) {
			if (L(R), M.length + E.length > 0) {
				let V = r.getToken();
				for (; V !== 17;) {
					if (M.indexOf(V) !== -1) {
						N();
						break;
					} else if (E.indexOf(V) !== -1) break;
					V = N();
				}
			}
		}
		function S(R) {
			const M = r.getTokenValue();
			return R ? d(M) : (h(M), i.push(M)), N(), !0;
		}
		function w() {
			switch (r.getToken()) {
				case 11:
					const R = r.getTokenValue();
					let M = Number(R);
					isNaN(M) && (v(2), M = 0), d(M);
					break;
				case 7:
					d(null);
					break;
				case 8:
					d(!0);
					break;
				case 9:
					d(!1);
					break;
				default: return !1;
			}
			return N(), !0;
		}
		function k() {
			return r.getToken() !== 10 ? (v(3, [], [2, 5]), !1) : (S(!1), r.getToken() === 6 ? (p(":"), N(), T() || v(4, [], [2, 5])) : v(5, [], [2, 5]), i.pop(), !0);
		}
		function P() {
			c(), N();
			let R = !1;
			for (; r.getToken() !== 2 && r.getToken() !== 17;) {
				if (r.getToken() === 5) {
					if (R || v(4, [], []), p(","), N(), r.getToken() === 2 && b) break;
				} else R && v(6, [], []);
				k() || v(4, [], [2, 5]), R = !0;
			}
			return f(), r.getToken() !== 2 ? v(7, [2], []) : N(), !0;
		}
		function D() {
			m(), N();
			let R = !0, M = !1;
			for (; r.getToken() !== 4 && r.getToken() !== 17;) {
				if (r.getToken() === 5) {
					if (M || v(4, [], []), p(","), N(), r.getToken() === 4 && b) break;
				} else M && v(6, [], []);
				R ? (i.push(0), R = !1) : i[i.length - 1]++, T() || v(4, [], [4, 5]), M = !0;
			}
			return g(), R || i.pop(), r.getToken() !== 4 ? v(8, [4], []) : N(), !0;
		}
		function T() {
			switch (r.getToken()) {
				case 3: return D();
				case 1: return P();
				case 10: return S(!0);
				default: return w();
			}
		}
		return N(), r.getToken() === 17 ? n.allowEmptyContent ? !0 : (v(4, [], []), !1) : T() ? (r.getToken() !== 17 && v(9, [], []), !0) : (v(4, [], []), !1);
	}
	const it = Vr;
	var ea;
	(function(e) {
		e[e.None = 0] = "None", e[e.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 4] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 6] = "InvalidCharacter";
	})(ea || (ea = {}));
	var ta;
	(function(e) {
		e[e.OpenBraceToken = 1] = "OpenBraceToken", e[e.CloseBraceToken = 2] = "CloseBraceToken", e[e.OpenBracketToken = 3] = "OpenBracketToken", e[e.CloseBracketToken = 4] = "CloseBracketToken", e[e.CommaToken = 5] = "CommaToken", e[e.ColonToken = 6] = "ColonToken", e[e.NullKeyword = 7] = "NullKeyword", e[e.TrueKeyword = 8] = "TrueKeyword", e[e.FalseKeyword = 9] = "FalseKeyword", e[e.StringLiteral = 10] = "StringLiteral", e[e.NumericLiteral = 11] = "NumericLiteral", e[e.LineCommentTrivia = 12] = "LineCommentTrivia", e[e.BlockCommentTrivia = 13] = "BlockCommentTrivia", e[e.LineBreakTrivia = 14] = "LineBreakTrivia", e[e.Trivia = 15] = "Trivia", e[e.Unknown = 16] = "Unknown", e[e.EOF = 17] = "EOF";
	})(ta || (ta = {}));
	const o0 = i0, l0 = K1, u0 = Z1, c0 = Or;
	var na;
	(function(e) {
		e[e.InvalidSymbol = 1] = "InvalidSymbol", e[e.InvalidNumberFormat = 2] = "InvalidNumberFormat", e[e.PropertyNameExpected = 3] = "PropertyNameExpected", e[e.ValueExpected = 4] = "ValueExpected", e[e.ColonExpected = 5] = "ColonExpected", e[e.CommaExpected = 6] = "CommaExpected", e[e.CloseBraceExpected = 7] = "CloseBraceExpected", e[e.CloseBracketExpected = 8] = "CloseBracketExpected", e[e.EndOfFileExpected = 9] = "EndOfFileExpected", e[e.InvalidCommentToken = 10] = "InvalidCommentToken", e[e.UnexpectedEndOfComment = 11] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 12] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 13] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 14] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 15] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 16] = "InvalidCharacter";
	})(na || (na = {}));
	function f0(e, t, n) {
		return t0(e, t, n);
	}
	function At(e, t) {
		if (e === t) return !0;
		if (e == null || t === null || t === void 0 || typeof e != typeof t || typeof e != "object" || Array.isArray(e) !== Array.isArray(t)) return !1;
		let n, r;
		if (Array.isArray(e)) {
			if (e.length !== t.length) return !1;
			for (n = 0; n < e.length; n++) if (!At(e[n], t[n])) return !1;
		} else {
			const i = [];
			for (r in e) i.push(r);
			i.sort();
			const s = [];
			for (r in t) s.push(r);
			if (s.sort(), !At(i, s)) return !1;
			for (n = 0; n < i.length; n++) if (!At(e[i[n]], t[i[n]])) return !1;
		}
		return !0;
	}
	function me(e) {
		return typeof e == "number";
	}
	function Re(e) {
		return typeof e < "u";
	}
	function Ie(e) {
		return typeof e == "boolean";
	}
	function ra(e) {
		return typeof e == "string";
	}
	function Xe(e) {
		return typeof e == "object" && e !== null && !Array.isArray(e);
	}
	function h0(e, t) {
		if (e.length < t.length) return !1;
		for (let n = 0; n < t.length; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}
	function Gt(e, t) {
		const n = e.length - t.length;
		return n > 0 ? e.lastIndexOf(t) === n : n === 0 ? e === t : !1;
	}
	function En(e) {
		let t = "";
		h0(e, "(?i)") && (e = e.substring(4), t = "i");
		try {
			return new RegExp(e, t + "u");
		} catch {
			try {
				return new RegExp(e, t);
			} catch {
				return;
			}
		}
	}
	function ia(e) {
		let t = 0;
		for (let n = 0; n < e.length; n++) {
			t++;
			const r = e.charCodeAt(n);
			55296 <= r && r <= 56319 && n++;
		}
		return t;
	}
	var sa;
	(function(e) {
		function t(n) {
			return typeof n == "string";
		}
		e.is = t;
	})(sa || (sa = {}));
	var $r;
	(function(e) {
		function t(n) {
			return typeof n == "string";
		}
		e.is = t;
	})($r || ($r = {}));
	var aa;
	(function(e) {
		e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647;
		function t(n) {
			return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
		}
		e.is = t;
	})(aa || (aa = {}));
	var Tn;
	(function(e) {
		e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647;
		function t(n) {
			return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
		}
		e.is = t;
	})(Tn || (Tn = {}));
	var K;
	(function(e) {
		function t(r, i) {
			return r === Number.MAX_VALUE && (r = Tn.MAX_VALUE), i === Number.MAX_VALUE && (i = Tn.MAX_VALUE), {
				line: r,
				character: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.objectLiteral(i) && x.uinteger(i.line) && x.uinteger(i.character);
		}
		e.is = n;
	})(K || (K = {}));
	var H;
	(function(e) {
		function t(r, i, s, a) {
			if (x.uinteger(r) && x.uinteger(i) && x.uinteger(s) && x.uinteger(a)) return {
				start: K.create(r, i),
				end: K.create(s, a)
			};
			if (K.is(r) && K.is(i)) return {
				start: r,
				end: i
			};
			throw new Error(`Range#create called with invalid arguments[${r}, ${i}, ${s}, ${a}]`);
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.objectLiteral(i) && K.is(i.start) && K.is(i.end);
		}
		e.is = n;
	})(H || (H = {}));
	var xt;
	(function(e) {
		function t(r, i) {
			return {
				uri: r,
				range: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.objectLiteral(i) && H.is(i.range) && (x.string(i.uri) || x.undefined(i.uri));
		}
		e.is = n;
	})(xt || (xt = {}));
	var oa;
	(function(e) {
		function t(r, i, s, a) {
			return {
				targetUri: r,
				targetRange: i,
				targetSelectionRange: s,
				originSelectionRange: a
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.objectLiteral(i) && H.is(i.targetRange) && x.string(i.targetUri) && H.is(i.targetSelectionRange) && (H.is(i.originSelectionRange) || x.undefined(i.originSelectionRange));
		}
		e.is = n;
	})(oa || (oa = {}));
	var Br;
	(function(e) {
		function t(r, i, s, a) {
			return {
				red: r,
				green: i,
				blue: s,
				alpha: a
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return x.objectLiteral(i) && x.numberRange(i.red, 0, 1) && x.numberRange(i.green, 0, 1) && x.numberRange(i.blue, 0, 1) && x.numberRange(i.alpha, 0, 1);
		}
		e.is = n;
	})(Br || (Br = {}));
	var la;
	(function(e) {
		function t(r, i) {
			return {
				range: r,
				color: i
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return x.objectLiteral(i) && H.is(i.range) && Br.is(i.color);
		}
		e.is = n;
	})(la || (la = {}));
	var ua;
	(function(e) {
		function t(r, i, s) {
			return {
				label: r,
				textEdit: i,
				additionalTextEdits: s
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return x.objectLiteral(i) && x.string(i.label) && (x.undefined(i.textEdit) || Fe.is(i)) && (x.undefined(i.additionalTextEdits) || x.typedArray(i.additionalTextEdits, Fe.is));
		}
		e.is = n;
	})(ua || (ua = {}));
	var Jt;
	(function(e) {
		e.Comment = "comment", e.Imports = "imports", e.Region = "region";
	})(Jt || (Jt = {}));
	var ca;
	(function(e) {
		function t(r, i, s, a, l, o) {
			const c = {
				startLine: r,
				endLine: i
			};
			return x.defined(s) && (c.startCharacter = s), x.defined(a) && (c.endCharacter = a), x.defined(l) && (c.kind = l), x.defined(o) && (c.collapsedText = o), c;
		}
		e.create = t;
		function n(r) {
			const i = r;
			return x.objectLiteral(i) && x.uinteger(i.startLine) && x.uinteger(i.startLine) && (x.undefined(i.startCharacter) || x.uinteger(i.startCharacter)) && (x.undefined(i.endCharacter) || x.uinteger(i.endCharacter)) && (x.undefined(i.kind) || x.string(i.kind));
		}
		e.is = n;
	})(ca || (ca = {}));
	var Ur;
	(function(e) {
		function t(r, i) {
			return {
				location: r,
				message: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && xt.is(i.location) && x.string(i.message);
		}
		e.is = n;
	})(Ur || (Ur = {}));
	var Le;
	(function(e) {
		e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4;
	})(Le || (Le = {}));
	var fa;
	(function(e) {
		e.Unnecessary = 1, e.Deprecated = 2;
	})(fa || (fa = {}));
	var ha;
	(function(e) {
		function t(n) {
			const r = n;
			return x.objectLiteral(r) && x.string(r.href);
		}
		e.is = t;
	})(ha || (ha = {}));
	var je;
	(function(e) {
		function t(r, i, s, a, l, o) {
			let c = {
				range: r,
				message: i
			};
			return x.defined(s) && (c.severity = s), x.defined(a) && (c.code = a), x.defined(l) && (c.source = l), x.defined(o) && (c.relatedInformation = o), c;
		}
		e.create = t;
		function n(r) {
			var i;
			let s = r;
			return x.defined(s) && H.is(s.range) && x.string(s.message) && (x.number(s.severity) || x.undefined(s.severity)) && (x.integer(s.code) || x.string(s.code) || x.undefined(s.code)) && (x.undefined(s.codeDescription) || x.string((i = s.codeDescription) === null || i === void 0 ? void 0 : i.href)) && (x.string(s.source) || x.undefined(s.source)) && (x.undefined(s.relatedInformation) || x.typedArray(s.relatedInformation, Ur.is));
		}
		e.is = n;
	})(je || (je = {}));
	var kt;
	(function(e) {
		function t(r, i, ...s) {
			let a = {
				title: r,
				command: i
			};
			return x.defined(s) && s.length > 0 && (a.arguments = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && x.string(i.title) && x.string(i.command);
		}
		e.is = n;
	})(kt || (kt = {}));
	var Fe;
	(function(e) {
		function t(s, a) {
			return {
				range: s,
				newText: a
			};
		}
		e.replace = t;
		function n(s, a) {
			return {
				range: {
					start: s,
					end: s
				},
				newText: a
			};
		}
		e.insert = n;
		function r(s) {
			return {
				range: s,
				newText: ""
			};
		}
		e.del = r;
		function i(s) {
			const a = s;
			return x.objectLiteral(a) && x.string(a.newText) && H.is(a.range);
		}
		e.is = i;
	})(Fe || (Fe = {}));
	var qr;
	(function(e) {
		function t(r, i, s) {
			const a = { label: r };
			return i !== void 0 && (a.needsConfirmation = i), s !== void 0 && (a.description = s), a;
		}
		e.create = t;
		function n(r) {
			const i = r;
			return x.objectLiteral(i) && x.string(i.label) && (x.boolean(i.needsConfirmation) || i.needsConfirmation === void 0) && (x.string(i.description) || i.description === void 0);
		}
		e.is = n;
	})(qr || (qr = {}));
	var Rt;
	(function(e) {
		function t(n) {
			const r = n;
			return x.string(r);
		}
		e.is = t;
	})(Rt || (Rt = {}));
	var ma;
	(function(e) {
		function t(s, a, l) {
			return {
				range: s,
				newText: a,
				annotationId: l
			};
		}
		e.replace = t;
		function n(s, a, l) {
			return {
				range: {
					start: s,
					end: s
				},
				newText: a,
				annotationId: l
			};
		}
		e.insert = n;
		function r(s, a) {
			return {
				range: s,
				newText: "",
				annotationId: a
			};
		}
		e.del = r;
		function i(s) {
			const a = s;
			return Fe.is(a) && (qr.is(a.annotationId) || Rt.is(a.annotationId));
		}
		e.is = i;
	})(ma || (ma = {}));
	var jr;
	(function(e) {
		function t(r, i) {
			return {
				textDocument: r,
				edits: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && Jr.is(i.textDocument) && Array.isArray(i.edits);
		}
		e.is = n;
	})(jr || (jr = {}));
	var Wr;
	(function(e) {
		function t(r, i, s) {
			let a = {
				kind: "create",
				uri: r
			};
			return i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (a.options = i), s !== void 0 && (a.annotationId = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && i.kind === "create" && x.string(i.uri) && (i.options === void 0 || (i.options.overwrite === void 0 || x.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || x.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || Rt.is(i.annotationId));
		}
		e.is = n;
	})(Wr || (Wr = {}));
	var Hr;
	(function(e) {
		function t(r, i, s, a) {
			let l = {
				kind: "rename",
				oldUri: r,
				newUri: i
			};
			return s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (l.options = s), a !== void 0 && (l.annotationId = a), l;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && i.kind === "rename" && x.string(i.oldUri) && x.string(i.newUri) && (i.options === void 0 || (i.options.overwrite === void 0 || x.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || x.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || Rt.is(i.annotationId));
		}
		e.is = n;
	})(Hr || (Hr = {}));
	var zr;
	(function(e) {
		function t(r, i, s) {
			let a = {
				kind: "delete",
				uri: r
			};
			return i !== void 0 && (i.recursive !== void 0 || i.ignoreIfNotExists !== void 0) && (a.options = i), s !== void 0 && (a.annotationId = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && i.kind === "delete" && x.string(i.uri) && (i.options === void 0 || (i.options.recursive === void 0 || x.boolean(i.options.recursive)) && (i.options.ignoreIfNotExists === void 0 || x.boolean(i.options.ignoreIfNotExists))) && (i.annotationId === void 0 || Rt.is(i.annotationId));
		}
		e.is = n;
	})(zr || (zr = {}));
	var Gr;
	(function(e) {
		function t(n) {
			let r = n;
			return r && (r.changes !== void 0 || r.documentChanges !== void 0) && (r.documentChanges === void 0 || r.documentChanges.every((i) => x.string(i.kind) ? Wr.is(i) || Hr.is(i) || zr.is(i) : jr.is(i)));
		}
		e.is = t;
	})(Gr || (Gr = {}));
	var ga;
	(function(e) {
		function t(r) {
			return { uri: r };
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && x.string(i.uri);
		}
		e.is = n;
	})(ga || (ga = {}));
	var da;
	(function(e) {
		function t(r, i) {
			return {
				uri: r,
				version: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && x.string(i.uri) && x.integer(i.version);
		}
		e.is = n;
	})(da || (da = {}));
	var Jr;
	(function(e) {
		function t(r, i) {
			return {
				uri: r,
				version: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && x.string(i.uri) && (i.version === null || x.integer(i.version));
		}
		e.is = n;
	})(Jr || (Jr = {}));
	var pa;
	(function(e) {
		function t(r, i, s, a) {
			return {
				uri: r,
				languageId: i,
				version: s,
				text: a
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && x.string(i.uri) && x.string(i.languageId) && x.integer(i.version) && x.string(i.text);
		}
		e.is = n;
	})(pa || (pa = {}));
	var st;
	(function(e) {
		e.PlainText = "plaintext", e.Markdown = "markdown";
		function t(n) {
			const r = n;
			return r === e.PlainText || r === e.Markdown;
		}
		e.is = t;
	})(st || (st = {}));
	var Xt;
	(function(e) {
		function t(n) {
			const r = n;
			return x.objectLiteral(n) && st.is(r.kind) && x.string(r.value);
		}
		e.is = t;
	})(Xt || (Xt = {}));
	var _e;
	(function(e) {
		e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25;
	})(_e || (_e = {}));
	var ie;
	(function(e) {
		e.PlainText = 1, e.Snippet = 2;
	})(ie || (ie = {}));
	var ba;
	(function(e) {
		e.Deprecated = 1;
	})(ba || (ba = {}));
	var ya;
	(function(e) {
		function t(r, i, s) {
			return {
				newText: r,
				insert: i,
				replace: s
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return i && x.string(i.newText) && H.is(i.insert) && H.is(i.replace);
		}
		e.is = n;
	})(ya || (ya = {}));
	var va;
	(function(e) {
		e.asIs = 1, e.adjustIndentation = 2;
	})(va || (va = {}));
	var wa;
	(function(e) {
		function t(n) {
			const r = n;
			return r && (x.string(r.detail) || r.detail === void 0) && (x.string(r.description) || r.description === void 0);
		}
		e.is = t;
	})(wa || (wa = {}));
	var Xr;
	(function(e) {
		function t(n) {
			return { label: n };
		}
		e.create = t;
	})(Xr || (Xr = {}));
	var La;
	(function(e) {
		function t(n, r) {
			return {
				items: n || [],
				isIncomplete: !!r
			};
		}
		e.create = t;
	})(La || (La = {}));
	var Mn;
	(function(e) {
		function t(r) {
			return r.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
		}
		e.fromPlainText = t;
		function n(r) {
			const i = r;
			return x.string(i) || x.objectLiteral(i) && x.string(i.language) && x.string(i.value);
		}
		e.is = n;
	})(Mn || (Mn = {}));
	var _a;
	(function(e) {
		function t(n) {
			let r = n;
			return !!r && x.objectLiteral(r) && (Xt.is(r.contents) || Mn.is(r.contents) || x.typedArray(r.contents, Mn.is)) && (n.range === void 0 || H.is(n.range));
		}
		e.is = t;
	})(_a || (_a = {}));
	var Na;
	(function(e) {
		function t(n, r) {
			return r ? {
				label: n,
				documentation: r
			} : { label: n };
		}
		e.create = t;
	})(Na || (Na = {}));
	var Sa;
	(function(e) {
		function t(n, r, ...i) {
			let s = { label: n };
			return x.defined(r) && (s.documentation = r), x.defined(i) ? s.parameters = i : s.parameters = [], s;
		}
		e.create = t;
	})(Sa || (Sa = {}));
	var Aa;
	(function(e) {
		e.Text = 1, e.Read = 2, e.Write = 3;
	})(Aa || (Aa = {}));
	var xa;
	(function(e) {
		function t(n, r) {
			let i = { range: n };
			return x.number(r) && (i.kind = r), i;
		}
		e.create = t;
	})(xa || (xa = {}));
	var Ve;
	(function(e) {
		e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26;
	})(Ve || (Ve = {}));
	var ka;
	(function(e) {
		e.Deprecated = 1;
	})(ka || (ka = {}));
	var Ra;
	(function(e) {
		function t(n, r, i, s, a) {
			let l = {
				name: n,
				kind: r,
				location: {
					uri: s,
					range: i
				}
			};
			return a && (l.containerName = a), l;
		}
		e.create = t;
	})(Ra || (Ra = {}));
	var Ea;
	(function(e) {
		function t(n, r, i, s) {
			return s !== void 0 ? {
				name: n,
				kind: r,
				location: {
					uri: i,
					range: s
				}
			} : {
				name: n,
				kind: r,
				location: { uri: i }
			};
		}
		e.create = t;
	})(Ea || (Ea = {}));
	var Ta;
	(function(e) {
		function t(r, i, s, a, l, o) {
			let c = {
				name: r,
				detail: i,
				kind: s,
				range: a,
				selectionRange: l
			};
			return o !== void 0 && (c.children = o), c;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && x.string(i.name) && x.number(i.kind) && H.is(i.range) && H.is(i.selectionRange) && (i.detail === void 0 || x.string(i.detail)) && (i.deprecated === void 0 || x.boolean(i.deprecated)) && (i.children === void 0 || Array.isArray(i.children)) && (i.tags === void 0 || Array.isArray(i.tags));
		}
		e.is = n;
	})(Ta || (Ta = {}));
	var Ma;
	(function(e) {
		e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll";
	})(Ma || (Ma = {}));
	var Cn;
	(function(e) {
		e.Invoked = 1, e.Automatic = 2;
	})(Cn || (Cn = {}));
	var Ca;
	(function(e) {
		function t(r, i, s) {
			let a = { diagnostics: r };
			return i != null && (a.only = i), s != null && (a.triggerKind = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && x.typedArray(i.diagnostics, je.is) && (i.only === void 0 || x.typedArray(i.only, x.string)) && (i.triggerKind === void 0 || i.triggerKind === Cn.Invoked || i.triggerKind === Cn.Automatic);
		}
		e.is = n;
	})(Ca || (Ca = {}));
	var Pa;
	(function(e) {
		function t(r, i, s) {
			let a = { title: r }, l = !0;
			return typeof i == "string" ? (l = !1, a.kind = i) : kt.is(i) ? a.command = i : a.edit = i, l && s !== void 0 && (a.kind = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && x.string(i.title) && (i.diagnostics === void 0 || x.typedArray(i.diagnostics, je.is)) && (i.kind === void 0 || x.string(i.kind)) && (i.edit !== void 0 || i.command !== void 0) && (i.command === void 0 || kt.is(i.command)) && (i.isPreferred === void 0 || x.boolean(i.isPreferred)) && (i.edit === void 0 || Gr.is(i.edit));
		}
		e.is = n;
	})(Pa || (Pa = {}));
	var Ia;
	(function(e) {
		function t(r, i) {
			let s = { range: r };
			return x.defined(i) && (s.data = i), s;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && H.is(i.range) && (x.undefined(i.command) || kt.is(i.command));
		}
		e.is = n;
	})(Ia || (Ia = {}));
	var Fa;
	(function(e) {
		function t(r, i) {
			return {
				tabSize: r,
				insertSpaces: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && x.uinteger(i.tabSize) && x.boolean(i.insertSpaces);
		}
		e.is = n;
	})(Fa || (Fa = {}));
	var Va;
	(function(e) {
		function t(r, i, s) {
			return {
				range: r,
				target: i,
				data: s
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.defined(i) && H.is(i.range) && (x.undefined(i.target) || x.string(i.target));
		}
		e.is = n;
	})(Va || (Va = {}));
	var Pn;
	(function(e) {
		function t(r, i) {
			return {
				range: r,
				parent: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return x.objectLiteral(i) && H.is(i.range) && (i.parent === void 0 || e.is(i.parent));
		}
		e.is = n;
	})(Pn || (Pn = {}));
	var Da;
	(function(e) {
		e.namespace = "namespace", e.type = "type", e.class = "class", e.enum = "enum", e.interface = "interface", e.struct = "struct", e.typeParameter = "typeParameter", e.parameter = "parameter", e.variable = "variable", e.property = "property", e.enumMember = "enumMember", e.event = "event", e.function = "function", e.method = "method", e.macro = "macro", e.keyword = "keyword", e.modifier = "modifier", e.comment = "comment", e.string = "string", e.number = "number", e.regexp = "regexp", e.operator = "operator", e.decorator = "decorator";
	})(Da || (Da = {}));
	var Oa;
	(function(e) {
		e.declaration = "declaration", e.definition = "definition", e.readonly = "readonly", e.static = "static", e.deprecated = "deprecated", e.abstract = "abstract", e.async = "async", e.modification = "modification", e.documentation = "documentation", e.defaultLibrary = "defaultLibrary";
	})(Oa || (Oa = {}));
	var $a;
	(function(e) {
		function t(n) {
			const r = n;
			return x.objectLiteral(r) && (r.resultId === void 0 || typeof r.resultId == "string") && Array.isArray(r.data) && (r.data.length === 0 || typeof r.data[0] == "number");
		}
		e.is = t;
	})($a || ($a = {}));
	var Ba;
	(function(e) {
		function t(r, i) {
			return {
				range: r,
				text: i
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return i != null && H.is(i.range) && x.string(i.text);
		}
		e.is = n;
	})(Ba || (Ba = {}));
	var Ua;
	(function(e) {
		function t(r, i, s) {
			return {
				range: r,
				variableName: i,
				caseSensitiveLookup: s
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return i != null && H.is(i.range) && x.boolean(i.caseSensitiveLookup) && (x.string(i.variableName) || i.variableName === void 0);
		}
		e.is = n;
	})(Ua || (Ua = {}));
	var qa;
	(function(e) {
		function t(r, i) {
			return {
				range: r,
				expression: i
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return i != null && H.is(i.range) && (x.string(i.expression) || i.expression === void 0);
		}
		e.is = n;
	})(qa || (qa = {}));
	var ja;
	(function(e) {
		function t(r, i) {
			return {
				frameId: r,
				stoppedLocation: i
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return x.defined(i) && H.is(r.stoppedLocation);
		}
		e.is = n;
	})(ja || (ja = {}));
	var Qr;
	(function(e) {
		e.Type = 1, e.Parameter = 2;
		function t(n) {
			return n === 1 || n === 2;
		}
		e.is = t;
	})(Qr || (Qr = {}));
	var Yr;
	(function(e) {
		function t(r) {
			return { value: r };
		}
		e.create = t;
		function n(r) {
			const i = r;
			return x.objectLiteral(i) && (i.tooltip === void 0 || x.string(i.tooltip) || Xt.is(i.tooltip)) && (i.location === void 0 || xt.is(i.location)) && (i.command === void 0 || kt.is(i.command));
		}
		e.is = n;
	})(Yr || (Yr = {}));
	var Wa;
	(function(e) {
		function t(r, i, s) {
			const a = {
				position: r,
				label: i
			};
			return s !== void 0 && (a.kind = s), a;
		}
		e.create = t;
		function n(r) {
			const i = r;
			return x.objectLiteral(i) && K.is(i.position) && (x.string(i.label) || x.typedArray(i.label, Yr.is)) && (i.kind === void 0 || Qr.is(i.kind)) && i.textEdits === void 0 || x.typedArray(i.textEdits, Fe.is) && (i.tooltip === void 0 || x.string(i.tooltip) || Xt.is(i.tooltip)) && (i.paddingLeft === void 0 || x.boolean(i.paddingLeft)) && (i.paddingRight === void 0 || x.boolean(i.paddingRight));
		}
		e.is = n;
	})(Wa || (Wa = {}));
	var Ha;
	(function(e) {
		function t(n) {
			return {
				kind: "snippet",
				value: n
			};
		}
		e.createSnippet = t;
	})(Ha || (Ha = {}));
	var za;
	(function(e) {
		function t(n, r, i, s) {
			return {
				insertText: n,
				filterText: r,
				range: i,
				command: s
			};
		}
		e.create = t;
	})(za || (za = {}));
	var Ga;
	(function(e) {
		function t(n) {
			return { items: n };
		}
		e.create = t;
	})(Ga || (Ga = {}));
	var Ja;
	(function(e) {
		e.Invoked = 0, e.Automatic = 1;
	})(Ja || (Ja = {}));
	var Xa;
	(function(e) {
		function t(n, r) {
			return {
				range: n,
				text: r
			};
		}
		e.create = t;
	})(Xa || (Xa = {}));
	var Qa;
	(function(e) {
		function t(n, r) {
			return {
				triggerKind: n,
				selectedCompletionInfo: r
			};
		}
		e.create = t;
	})(Qa || (Qa = {}));
	var Ya;
	(function(e) {
		function t(n) {
			const r = n;
			return x.objectLiteral(r) && $r.is(r.uri) && x.string(r.name);
		}
		e.is = t;
	})(Ya || (Ya = {}));
	var Za;
	(function(e) {
		function t(s, a, l, o) {
			return new m0(s, a, l, o);
		}
		e.create = t;
		function n(s) {
			let a = s;
			return !!(x.defined(a) && x.string(a.uri) && (x.undefined(a.languageId) || x.string(a.languageId)) && x.uinteger(a.lineCount) && x.func(a.getText) && x.func(a.positionAt) && x.func(a.offsetAt));
		}
		e.is = n;
		function r(s, a) {
			let l = s.getText(), o = i(a, (h, f) => {
				let m = h.range.start.line - f.range.start.line;
				return m === 0 ? h.range.start.character - f.range.start.character : m;
			}), c = l.length;
			for (let h = o.length - 1; h >= 0; h--) {
				let f = o[h], m = s.offsetAt(f.range.start), g = s.offsetAt(f.range.end);
				if (g <= c) l = l.substring(0, m) + f.newText + l.substring(g, l.length);
				else throw new Error("Overlapping edit");
				c = m;
			}
			return l;
		}
		e.applyEdits = r;
		function i(s, a) {
			if (s.length <= 1) return s;
			const l = s.length / 2 | 0, o = s.slice(0, l), c = s.slice(l);
			i(o, a), i(c, a);
			let h = 0, f = 0, m = 0;
			for (; h < o.length && f < c.length;) a(o[h], c[f]) <= 0 ? s[m++] = o[h++] : s[m++] = c[f++];
			for (; h < o.length;) s[m++] = o[h++];
			for (; f < c.length;) s[m++] = c[f++];
			return s;
		}
	})(Za || (Za = {}));
	var m0 = class {
		constructor(e, t, n, r) {
			this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0;
		}
		get uri() {
			return this._uri;
		}
		get languageId() {
			return this._languageId;
		}
		get version() {
			return this._version;
		}
		getText(e) {
			if (e) {
				let t = this.offsetAt(e.start), n = this.offsetAt(e.end);
				return this._content.substring(t, n);
			}
			return this._content;
		}
		update(e, t) {
			this._content = e.text, this._version = t, this._lineOffsets = void 0;
		}
		getLineOffsets() {
			if (this._lineOffsets === void 0) {
				let e = [], t = this._content, n = !0;
				for (let r = 0; r < t.length; r++) {
					n && (e.push(r), n = !1);
					let i = t.charAt(r);
					n = i === "\r" || i === `
`, i === "\r" && r + 1 < t.length && t.charAt(r + 1) === `
` && r++;
				}
				n && t.length > 0 && e.push(t.length), this._lineOffsets = e;
			}
			return this._lineOffsets;
		}
		positionAt(e) {
			e = Math.max(Math.min(e, this._content.length), 0);
			let t = this.getLineOffsets(), n = 0, r = t.length;
			if (r === 0) return K.create(0, e);
			for (; n < r;) {
				let s = Math.floor((n + r) / 2);
				t[s] > e ? r = s : n = s + 1;
			}
			let i = n - 1;
			return K.create(i, e - t[i]);
		}
		offsetAt(e) {
			let t = this.getLineOffsets();
			if (e.line >= t.length) return this._content.length;
			if (e.line < 0) return 0;
			let n = t[e.line], r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
			return Math.max(Math.min(n + e.character, r), n);
		}
		get lineCount() {
			return this.getLineOffsets().length;
		}
	}, x;
	(function(e) {
		const t = Object.prototype.toString;
		function n(g) {
			return typeof g < "u";
		}
		e.defined = n;
		function r(g) {
			return typeof g > "u";
		}
		e.undefined = r;
		function i(g) {
			return g === !0 || g === !1;
		}
		e.boolean = i;
		function s(g) {
			return t.call(g) === "[object String]";
		}
		e.string = s;
		function a(g) {
			return t.call(g) === "[object Number]";
		}
		e.number = a;
		function l(g, d, p) {
			return t.call(g) === "[object Number]" && d <= g && g <= p;
		}
		e.numberRange = l;
		function o(g) {
			return t.call(g) === "[object Number]" && -2147483648 <= g && g <= 2147483647;
		}
		e.integer = o;
		function c(g) {
			return t.call(g) === "[object Number]" && 0 <= g && g <= 2147483647;
		}
		e.uinteger = c;
		function h(g) {
			return t.call(g) === "[object Function]";
		}
		e.func = h;
		function f(g) {
			return g !== null && typeof g == "object";
		}
		e.objectLiteral = f;
		function m(g, d) {
			return Array.isArray(g) && g.every(d);
		}
		e.typedArray = m;
	})(x || (x = {}));
	var Ka = class yi {
		constructor(t, n, r, i) {
			this._uri = t, this._languageId = n, this._version = r, this._content = i, this._lineOffsets = void 0;
		}
		get uri() {
			return this._uri;
		}
		get languageId() {
			return this._languageId;
		}
		get version() {
			return this._version;
		}
		getText(t) {
			if (t) {
				const n = this.offsetAt(t.start), r = this.offsetAt(t.end);
				return this._content.substring(n, r);
			}
			return this._content;
		}
		update(t, n) {
			for (let r of t) if (yi.isIncremental(r)) {
				const i = to(r.range), s = this.offsetAt(i.start), a = this.offsetAt(i.end);
				this._content = this._content.substring(0, s) + r.text + this._content.substring(a, this._content.length);
				const l = Math.max(i.start.line, 0), o = Math.max(i.end.line, 0);
				let c = this._lineOffsets;
				const h = eo(r.text, !1, s);
				if (o - l === h.length) for (let m = 0, g = h.length; m < g; m++) c[m + l + 1] = h[m];
				else h.length < 1e4 ? c.splice(l + 1, o - l, ...h) : this._lineOffsets = c = c.slice(0, l + 1).concat(h, c.slice(o + 1));
				const f = r.text.length - (a - s);
				if (f !== 0) for (let m = l + 1 + h.length, g = c.length; m < g; m++) c[m] = c[m] + f;
			} else if (yi.isFull(r)) this._content = r.text, this._lineOffsets = void 0;
			else throw new Error("Unknown change event received");
			this._version = n;
		}
		getLineOffsets() {
			return this._lineOffsets === void 0 && (this._lineOffsets = eo(this._content, !0)), this._lineOffsets;
		}
		positionAt(t) {
			t = Math.max(Math.min(t, this._content.length), 0);
			let n = this.getLineOffsets(), r = 0, i = n.length;
			if (i === 0) return {
				line: 0,
				character: t
			};
			for (; r < i;) {
				let a = Math.floor((r + i) / 2);
				n[a] > t ? i = a : r = a + 1;
			}
			let s = r - 1;
			return {
				line: s,
				character: t - n[s]
			};
		}
		offsetAt(t) {
			let n = this.getLineOffsets();
			if (t.line >= n.length) return this._content.length;
			if (t.line < 0) return 0;
			let r = n[t.line], i = t.line + 1 < n.length ? n[t.line + 1] : this._content.length;
			return Math.max(Math.min(r + t.character, i), r);
		}
		get lineCount() {
			return this.getLineOffsets().length;
		}
		static isIncremental(t) {
			let n = t;
			return n != null && typeof n.text == "string" && n.range !== void 0 && (n.rangeLength === void 0 || typeof n.rangeLength == "number");
		}
		static isFull(t) {
			let n = t;
			return n != null && typeof n.text == "string" && n.range === void 0 && n.rangeLength === void 0;
		}
	}, Ee;
	(function(e) {
		function t(i, s, a, l) {
			return new Ka(i, s, a, l);
		}
		e.create = t;
		function n(i, s, a) {
			if (i instanceof Ka) return i.update(s, a), i;
			throw new Error("TextDocument.update: document must be created by TextDocument.create");
		}
		e.update = n;
		function r(i, s) {
			let a = i.getText(), l = Zr(s.map(g0), (h, f) => {
				let m = h.range.start.line - f.range.start.line;
				return m === 0 ? h.range.start.character - f.range.start.character : m;
			}), o = 0;
			const c = [];
			for (const h of l) {
				let f = i.offsetAt(h.range.start);
				if (f < o) throw new Error("Overlapping edit");
				f > o && c.push(a.substring(o, f)), h.newText.length && c.push(h.newText), o = i.offsetAt(h.range.end);
			}
			return c.push(a.substr(o)), c.join("");
		}
		e.applyEdits = r;
	})(Ee || (Ee = {}));
	function Zr(e, t) {
		if (e.length <= 1) return e;
		const n = e.length / 2 | 0, r = e.slice(0, n), i = e.slice(n);
		Zr(r, t), Zr(i, t);
		let s = 0, a = 0, l = 0;
		for (; s < r.length && a < i.length;) t(r[s], i[a]) <= 0 ? e[l++] = r[s++] : e[l++] = i[a++];
		for (; s < r.length;) e[l++] = r[s++];
		for (; a < i.length;) e[l++] = i[a++];
		return e;
	}
	function eo(e, t, n = 0) {
		const r = t ? [n] : [];
		for (let i = 0; i < e.length; i++) {
			let s = e.charCodeAt(i);
			(s === 13 || s === 10) && (s === 13 && i + 1 < e.length && e.charCodeAt(i + 1) === 10 && i++, r.push(n + i + 1));
		}
		return r;
	}
	function to(e) {
		const t = e.start, n = e.end;
		return t.line > n.line || t.line === n.line && t.character > n.character ? {
			start: n,
			end: t
		} : e;
	}
	function g0(e) {
		const t = to(e.range);
		return t !== e.range ? {
			newText: e.newText,
			range: t
		} : e;
	}
	var X;
	(function(e) {
		e[e.Undefined = 0] = "Undefined", e[e.EnumValueMismatch = 1] = "EnumValueMismatch", e[e.Deprecated = 2] = "Deprecated", e[e.UnexpectedEndOfComment = 257] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 258] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 259] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 260] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 261] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 262] = "InvalidCharacter", e[e.PropertyExpected = 513] = "PropertyExpected", e[e.CommaExpected = 514] = "CommaExpected", e[e.ColonExpected = 515] = "ColonExpected", e[e.ValueExpected = 516] = "ValueExpected", e[e.CommaOrCloseBacketExpected = 517] = "CommaOrCloseBacketExpected", e[e.CommaOrCloseBraceExpected = 518] = "CommaOrCloseBraceExpected", e[e.TrailingComma = 519] = "TrailingComma", e[e.DuplicateKey = 520] = "DuplicateKey", e[e.CommentNotPermitted = 521] = "CommentNotPermitted", e[e.PropertyKeysMustBeDoublequoted = 528] = "PropertyKeysMustBeDoublequoted", e[e.SchemaResolveError = 768] = "SchemaResolveError", e[e.SchemaUnsupportedFeature = 769] = "SchemaUnsupportedFeature";
	})(X || (X = {}));
	var Te;
	(function(e) {
		e[e.v3 = 3] = "v3", e[e.v4 = 4] = "v4", e[e.v6 = 6] = "v6", e[e.v7 = 7] = "v7", e[e.v2019_09 = 19] = "v2019_09", e[e.v2020_12 = 20] = "v2020_12";
	})(Te || (Te = {}));
	var Kr;
	(function(e) {
		e.LATEST = { textDocument: { completion: { completionItem: {
			documentationFormat: [st.Markdown, st.PlainText],
			commitCharactersSupport: !0,
			labelDetailsSupport: !0
		} } } };
	})(Kr || (Kr = {}));
	function C(...e) {
		const t = e[0];
		let n, r, i;
		if (typeof t == "string") n = t, r = t, e.splice(0, 1), i = !e || typeof e[0] != "object" ? e : e[0];
		else if (t instanceof Array) {
			const s = e.slice(1);
			if (t.length !== s.length + 1) throw new Error("expected a string as the first argument to l10n.t");
			let a = t[0];
			for (let l = 1; l < t.length; l++) a += `{${l - 1}}` + t[l];
			return C(a, ...s);
		} else r = t.message, n = r, t.comment && t.comment.length > 0 && (n += `/${Array.isArray(t.comment) ? t.comment.join("") : t.comment}`), i = t.args ?? {};
		return p0(r, i);
	}
	var d0 = /{([^}]+)}/g;
	function p0(e, t) {
		return Object.keys(t).length === 0 ? e : e.replace(d0, (n, r) => t[r] ?? n);
	}
	const b0 = {
		"color-hex": {
			errorMessage: C("Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."),
			pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/
		},
		"date-time": {
			errorMessage: C("String is not a RFC3339 date-time."),
			pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
		},
		date: {
			errorMessage: C("String is not a RFC3339 date."),
			pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i
		},
		time: {
			errorMessage: C("String is not a RFC3339 time."),
			pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
		},
		email: {
			errorMessage: C("String is not an e-mail address."),
			pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/
		},
		hostname: {
			errorMessage: C("String is not a hostname."),
			pattern: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i
		},
		ipv4: {
			errorMessage: C("String is not an IPv4 address."),
			pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/
		},
		ipv6: {
			errorMessage: C("String is not an IPv6 address."),
			pattern: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i
		}
	};
	var at = class {
		constructor(e, t, n = 0) {
			this.offset = t, this.length = n, this.parent = e;
		}
		get children() {
			return [];
		}
		toString() {
			return "type: " + this.type + " (" + this.offset + "/" + this.length + ")" + (this.parent ? " parent: {" + this.parent.toString() + "}" : "");
		}
	}, y0 = class extends at {
		constructor(e, t) {
			super(e, t), this.type = "null", this.value = null;
		}
	}, no = class extends at {
		constructor(e, t, n) {
			super(e, n), this.type = "boolean", this.value = t;
		}
	}, v0 = class extends at {
		constructor(e, t) {
			super(e, t), this.type = "array", this.items = [];
		}
		get children() {
			return this.items;
		}
	}, w0 = class extends at {
		constructor(e, t) {
			super(e, t), this.type = "number", this.isInteger = !0, this.value = NaN;
		}
	}, ei = class extends at {
		constructor(e, t, n) {
			super(e, t, n), this.type = "string", this.value = "";
		}
	}, L0 = class extends at {
		constructor(e, t, n) {
			super(e, t), this.type = "property", this.colonOffset = -1, this.keyNode = n;
		}
		get children() {
			return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
		}
	}, _0 = class extends at {
		constructor(e, t) {
			super(e, t), this.type = "object", this.properties = [];
		}
		get children() {
			return this.properties;
		}
	};
	function Ne(e) {
		return Ie(e) ? e ? {} : { not: {} } : e;
	}
	var ro;
	(function(e) {
		e[e.Key = 0] = "Key", e[e.Enum = 1] = "Enum";
	})(ro || (ro = {}));
	const N0 = {
		"http://json-schema.org/draft-03/schema#": Te.v3,
		"http://json-schema.org/draft-04/schema#": Te.v4,
		"http://json-schema.org/draft-06/schema#": Te.v6,
		"http://json-schema.org/draft-07/schema#": Te.v7,
		"https://json-schema.org/draft/2019-09/schema": Te.v2019_09,
		"https://json-schema.org/draft/2020-12/schema": Te.v2020_12
	};
	var io = class {
		constructor(e) {
			this.schemaDraft = e;
		}
	}, S0 = class Vo {
		constructor(t = -1, n) {
			this.focusOffset = t, this.exclude = n, this.schemas = [];
		}
		add(t) {
			this.schemas.push(t);
		}
		merge(t) {
			Array.prototype.push.apply(this.schemas, t.schemas);
		}
		include(t) {
			return (this.focusOffset === -1 || so(t, this.focusOffset)) && t !== this.exclude;
		}
		newSub() {
			return new Vo(-1, this.exclude);
		}
	}, Qt = class {
		constructor() {}
		get schemas() {
			return [];
		}
		add(e) {}
		merge(e) {}
		include(e) {
			return !0;
		}
		newSub() {
			return this;
		}
	};
	Qt.instance = new Qt();
	var ge = class {
		constructor() {
			this.problems = [], this.propertiesMatches = 0, this.processedProperties = /* @__PURE__ */ new Set(), this.propertiesValueMatches = 0, this.primaryValueMatches = 0, this.enumValueMatch = !1, this.enumValues = void 0;
		}
		hasProblems() {
			return !!this.problems.length;
		}
		merge(e) {
			this.problems = this.problems.concat(e.problems), this.propertiesMatches += e.propertiesMatches, this.propertiesValueMatches += e.propertiesValueMatches, this.mergeProcessedProperties(e);
		}
		mergeEnumValues(e) {
			if (!this.enumValueMatch && !e.enumValueMatch && this.enumValues && e.enumValues) {
				this.enumValues = this.enumValues.concat(e.enumValues);
				for (const t of this.problems) t.code === X.EnumValueMismatch && (t.message = C("Value is not accepted. Valid values: {0}.", this.enumValues.map((n) => JSON.stringify(n)).join(", ")));
			}
		}
		mergePropertyMatch(e) {
			this.problems = this.problems.concat(e.problems), this.propertiesMatches++, (e.enumValueMatch || !e.hasProblems() && e.propertiesMatches) && this.propertiesValueMatches++, e.enumValueMatch && e.enumValues && e.enumValues.length === 1 && this.primaryValueMatches++;
		}
		mergeProcessedProperties(e) {
			e.processedProperties.forEach((t) => this.processedProperties.add(t));
		}
		compare(e) {
			const t = this.hasProblems();
			return t !== e.hasProblems() ? t ? -1 : 1 : this.enumValueMatch !== e.enumValueMatch ? e.enumValueMatch ? -1 : 1 : this.primaryValueMatches !== e.primaryValueMatches ? this.primaryValueMatches - e.primaryValueMatches : this.propertiesValueMatches !== e.propertiesValueMatches ? this.propertiesValueMatches - e.propertiesValueMatches : this.propertiesMatches - e.propertiesMatches;
		}
	};
	function A0(e, t = []) {
		return new ao(e, t, []);
	}
	function ot(e) {
		return c0(e);
	}
	function ti(e) {
		return u0(e);
	}
	function so(e, t, n = !1) {
		return t >= e.offset && t < e.offset + e.length || n && t === e.offset + e.length;
	}
	var ao = class {
		constructor(e, t = [], n = []) {
			this.root = e, this.syntaxErrors = t, this.comments = n;
		}
		getNodeFromOffset(e, t = !1) {
			if (this.root) return l0(this.root, e, t);
		}
		visit(e) {
			if (this.root) {
				const t = (n) => {
					let r = e(n);
					const i = n.children;
					if (Array.isArray(i)) for (let s = 0; s < i.length && r; s++) r = t(i[s]);
					return r;
				};
				t(this.root);
			}
		}
		validate(e, t, n = Le.Warning, r) {
			if (this.root && t) {
				const i = new ge();
				return le(this.root, t, i, Qt.instance, new io(r ?? oo(t))), i.problems.map((s) => {
					const a = H.create(e.positionAt(s.location.offset), e.positionAt(s.location.offset + s.location.length));
					return je.create(a, s.message, s.severity ?? n, s.code);
				});
			}
		}
		getMatchingSchemas(e, t = -1, n) {
			if (this.root && e) {
				const r = new S0(t, n), s = new io(oo(e));
				return le(this.root, e, new ge(), r, s), r.schemas;
			}
			return [];
		}
	};
	function oo(e, t = Te.v2020_12) {
		let n = e.$schema;
		return n ? N0[n] ?? t : t;
	}
	function le(e, t, n, r, i) {
		if (!e || !r.include(e)) return;
		if (e.type === "property") return le(e.valueNode, t, n, r, i);
		const s = e;
		switch (a(), s.type) {
			case "object":
				h(s);
				break;
			case "array":
				c(s);
				break;
			case "string":
				o(s);
				break;
			case "number": l(s);
		}
		r.add({
			node: s,
			schema: t
		});
		function a() {
			function f(_) {
				return s.type === _ || _ === "integer" && s.type === "number" && s.isInteger;
			}
			if (Array.isArray(t.type) ? t.type.some(f) || n.problems.push({
				location: {
					offset: s.offset,
					length: s.length
				},
				message: t.errorMessage || C("Incorrect type. Expected one of {0}.", t.type.join(", "))
			}) : t.type && (f(t.type) || n.problems.push({
				location: {
					offset: s.offset,
					length: s.length
				},
				message: t.errorMessage || C("Incorrect type. Expected \"{0}\".", t.type)
			})), Array.isArray(t.allOf)) for (const _ of t.allOf) {
				const b = new ge(), N = r.newSub();
				le(s, Ne(_), b, N, i), n.merge(b), r.merge(N);
			}
			const m = Ne(t.not);
			if (m) {
				const _ = new ge(), b = r.newSub();
				le(s, m, _, b, i), _.hasProblems() || n.problems.push({
					location: {
						offset: s.offset,
						length: s.length
					},
					message: t.errorMessage || C("Matches a schema that is not allowed.")
				});
				for (const N of b.schemas) N.inverted = !N.inverted, r.add(N);
			}
			const g = (_, b) => {
				const N = [];
				let v;
				for (const S of _) {
					const w = Ne(S), k = new ge(), P = r.newSub();
					if (le(s, w, k, P, i), k.hasProblems() || N.push(w), !v) v = {
						schema: w,
						validationResult: k,
						matchingSchemas: P
					};
					else if (!b && !k.hasProblems() && !v.validationResult.hasProblems()) v.matchingSchemas.merge(P), v.validationResult.propertiesMatches += k.propertiesMatches, v.validationResult.propertiesValueMatches += k.propertiesValueMatches, v.validationResult.mergeProcessedProperties(k);
					else {
						const D = k.compare(v.validationResult);
						D > 0 ? v = {
							schema: w,
							validationResult: k,
							matchingSchemas: P
						} : D === 0 && (v.matchingSchemas.merge(P), v.validationResult.mergeEnumValues(k));
					}
				}
				return N.length > 1 && b && n.problems.push({
					location: {
						offset: s.offset,
						length: 1
					},
					message: C("Matches multiple schemas when only one must validate.")
				}), v && (n.merge(v.validationResult), r.merge(v.matchingSchemas)), N.length;
			};
			Array.isArray(t.anyOf) && g(t.anyOf, !1), Array.isArray(t.oneOf) && g(t.oneOf, !0);
			const d = (_) => {
				const b = new ge(), N = r.newSub();
				le(s, Ne(_), b, N, i), n.merge(b), r.merge(N);
			}, p = (_, b, N) => {
				const v = Ne(_), S = new ge(), w = r.newSub();
				le(s, v, S, w, i), r.merge(w), n.mergeProcessedProperties(S), S.hasProblems() ? N && d(N) : b && d(b);
			}, y = Ne(t.if);
			if (y && p(y, Ne(t.then), Ne(t.else)), Array.isArray(t.enum)) {
				const _ = ot(s);
				let b = !1;
				for (const N of t.enum) if (At(_, N)) {
					b = !0;
					break;
				}
				n.enumValues = t.enum, n.enumValueMatch = b, b || n.problems.push({
					location: {
						offset: s.offset,
						length: s.length
					},
					code: X.EnumValueMismatch,
					message: t.errorMessage || C("Value is not accepted. Valid values: {0}.", t.enum.map((N) => JSON.stringify(N)).join(", "))
				});
			}
			if (Re(t.const)) At(ot(s), t.const) ? n.enumValueMatch = !0 : (n.problems.push({
				location: {
					offset: s.offset,
					length: s.length
				},
				code: X.EnumValueMismatch,
				message: t.errorMessage || C("Value must be {0}.", JSON.stringify(t.const))
			}), n.enumValueMatch = !1), n.enumValues = [t.const];
			let L = t.deprecationMessage;
			if (L || t.deprecated) {
				L = L || C("Value is deprecated");
				let _ = s.parent?.type === "property" ? s.parent : s;
				n.problems.push({
					location: {
						offset: _.offset,
						length: _.length
					},
					severity: Le.Warning,
					message: L,
					code: X.Deprecated
				});
			}
		}
		function l(f) {
			const m = f.value;
			function g(N) {
				const v = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(N.toString());
				return v && {
					value: Number(v[1] + (v[2] || "")),
					multiplier: (v[2]?.length || 0) - (parseInt(v[3]) || 0)
				};
			}
			if (me(t.multipleOf)) {
				let N = -1;
				if (Number.isInteger(t.multipleOf)) N = m % t.multipleOf;
				else {
					let v = g(t.multipleOf), S = g(m);
					if (v && S) {
						const w = 10 ** Math.abs(S.multiplier - v.multiplier);
						S.multiplier < v.multiplier ? S.value *= w : v.value *= w, N = S.value % v.value;
					}
				}
				N !== 0 && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: C("Value is not divisible by {0}.", t.multipleOf)
				});
			}
			function d(N, v) {
				if (me(v)) return v;
				if (Ie(v) && v) return N;
			}
			function p(N, v) {
				if (!Ie(v) || !v) return N;
			}
			const y = d(t.minimum, t.exclusiveMinimum);
			me(y) && m <= y && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("Value is below the exclusive minimum of {0}.", y)
			});
			const L = d(t.maximum, t.exclusiveMaximum);
			me(L) && m >= L && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("Value is above the exclusive maximum of {0}.", L)
			});
			const _ = p(t.minimum, t.exclusiveMinimum);
			me(_) && m < _ && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("Value is below the minimum of {0}.", _)
			});
			const b = p(t.maximum, t.exclusiveMaximum);
			me(b) && m > b && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("Value is above the maximum of {0}.", b)
			});
		}
		function o(f) {
			if (me(t.minLength) && ia(f.value) < t.minLength && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("String is shorter than the minimum length of {0}.", t.minLength)
			}), me(t.maxLength) && ia(f.value) > t.maxLength && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("String is longer than the maximum length of {0}.", t.maxLength)
			}), ra(t.pattern) && (En(t.pattern)?.test(f.value) || n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: t.patternErrorMessage || t.errorMessage || C("String does not match the pattern of \"{0}\".", t.pattern)
			})), t.format) switch (t.format) {
				case "uri":
				case "uri-reference":
					{
						let g;
						if (!f.value) g = C("URI expected.");
						else {
							const d = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(f.value);
							d ? !d[2] && t.format === "uri" && (g = C("URI with a scheme is expected.")) : g = C("URI is expected.");
						}
						g && n.problems.push({
							location: {
								offset: f.offset,
								length: f.length
							},
							message: t.patternErrorMessage || t.errorMessage || C("String is not a URI: {0}", g)
						});
					}
					break;
				case "color-hex":
				case "date-time":
				case "date":
				case "time":
				case "email":
				case "hostname":
				case "ipv4":
				case "ipv6":
					const m = b0[t.format];
					(!f.value || !m.pattern.exec(f.value)) && n.problems.push({
						location: {
							offset: f.offset,
							length: f.length
						},
						message: t.patternErrorMessage || t.errorMessage || m.errorMessage
					});
			}
		}
		function c(f) {
			let m, g;
			i.schemaDraft >= Te.v2020_12 ? (m = t.prefixItems, g = Array.isArray(t.items) ? void 0 : t.items) : (m = Array.isArray(t.items) ? t.items : void 0, g = Array.isArray(t.items) ? t.additionalItems : t.items);
			let d = 0;
			if (m !== void 0) {
				const _ = Math.min(m.length, f.items.length);
				for (; d < _; d++) {
					const b = m[d], N = Ne(b), v = new ge(), S = f.items[d];
					S && (le(S, N, v, r, i), n.mergePropertyMatch(v)), n.processedProperties.add(String(d));
				}
			}
			if (g !== void 0 && d < f.items.length) if (typeof g == "boolean") for (g === !1 && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("Array has too many items according to schema. Expected {0} or fewer.", d)
			}); d < f.items.length; d++) n.processedProperties.add(String(d)), n.propertiesValueMatches++;
			else for (; d < f.items.length; d++) {
				const _ = new ge();
				le(f.items[d], g, _, r, i), n.mergePropertyMatch(_), n.processedProperties.add(String(d));
			}
			const p = Ne(t.contains);
			if (p) {
				let _ = 0;
				for (let b = 0; b < f.items.length; b++) {
					const N = f.items[b], v = new ge();
					le(N, p, v, Qt.instance, i), v.hasProblems() || (_++, i.schemaDraft >= Te.v2020_12 && n.processedProperties.add(String(b)));
				}
				_ === 0 && !me(t.minContains) && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: t.errorMessage || C("Array does not contain required item.")
				}), me(t.minContains) && _ < t.minContains && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: t.errorMessage || C("Array has too few items that match the contains contraint. Expected {0} or more.", t.minContains)
				}), me(t.maxContains) && _ > t.maxContains && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: t.errorMessage || C("Array has too many items that match the contains contraint. Expected {0} or less.", t.maxContains)
				});
			}
			const y = t.unevaluatedItems;
			if (y !== void 0) for (let _ = 0; _ < f.items.length; _++) {
				if (!n.processedProperties.has(String(_))) if (y === !1) n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: C("Item does not match any validation rule from the array.")
				});
				else {
					const b = new ge();
					le(f.items[_], t.unevaluatedItems, b, r, i), n.mergePropertyMatch(b);
				}
				n.processedProperties.add(String(_)), n.propertiesValueMatches++;
			}
			if (me(t.minItems) && f.items.length < t.minItems && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("Array has too few items. Expected {0} or more.", t.minItems)
			}), me(t.maxItems) && f.items.length > t.maxItems && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("Array has too many items. Expected {0} or fewer.", t.maxItems)
			}), t.uniqueItems === !0) {
				let b = function() {
					for (let N = 0; N < _.length - 1; N++) {
						const v = _[N];
						for (let S = N + 1; S < _.length; S++) if (At(v, _[S])) return !0;
					}
					return !1;
				};
				const _ = ot(f);
				b() && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: C("Array has duplicate items.")
				});
			}
		}
		function h(f) {
			const m = Object.create(null), g = /* @__PURE__ */ new Set();
			for (const b of f.properties) {
				const N = b.keyNode.value;
				m[N] = b.valueNode, g.add(N);
			}
			if (Array.isArray(t.required)) {
				for (const b of t.required) if (!m[b]) {
					const N = f.parent && f.parent.type === "property" && f.parent.keyNode, v = N ? {
						offset: N.offset,
						length: N.length
					} : {
						offset: f.offset,
						length: 1
					};
					n.problems.push({
						location: v,
						message: C("Missing property \"{0}\".", b)
					});
				}
			}
			const d = (b) => {
				g.delete(b), n.processedProperties.add(b);
			};
			if (t.properties) for (const b of Object.keys(t.properties)) {
				d(b);
				const N = t.properties[b], v = m[b];
				if (v) if (Ie(N)) if (N) n.propertiesMatches++, n.propertiesValueMatches++;
				else {
					const S = v.parent;
					n.problems.push({
						location: {
							offset: S.keyNode.offset,
							length: S.keyNode.length
						},
						message: t.errorMessage || C("Property {0} is not allowed.", b)
					});
				}
				else {
					const S = new ge();
					le(v, N, S, r, i), n.mergePropertyMatch(S);
				}
			}
			if (t.patternProperties) for (const b of Object.keys(t.patternProperties)) {
				const N = En(b);
				if (N) {
					const v = [];
					for (const S of g) if (N.test(S)) {
						v.push(S);
						const w = m[S];
						if (w) {
							const k = t.patternProperties[b];
							if (Ie(k)) if (k) n.propertiesMatches++, n.propertiesValueMatches++;
							else {
								const P = w.parent;
								n.problems.push({
									location: {
										offset: P.keyNode.offset,
										length: P.keyNode.length
									},
									message: t.errorMessage || C("Property {0} is not allowed.", S)
								});
							}
							else {
								const P = new ge();
								le(w, k, P, r, i), n.mergePropertyMatch(P);
							}
						}
					}
					v.forEach(d);
				}
			}
			const p = t.additionalProperties;
			if (p !== void 0) for (const b of g) {
				d(b);
				const N = m[b];
				if (N) {
					if (p === !1) {
						const v = N.parent;
						n.problems.push({
							location: {
								offset: v.keyNode.offset,
								length: v.keyNode.length
							},
							message: t.errorMessage || C("Property {0} is not allowed.", b)
						});
					} else if (p !== !0) {
						const v = new ge();
						le(N, p, v, r, i), n.mergePropertyMatch(v);
					}
				}
			}
			const y = t.unevaluatedProperties;
			if (y !== void 0) {
				const b = [];
				for (const N of g) if (!n.processedProperties.has(N)) {
					b.push(N);
					const v = m[N];
					if (v) {
						if (y === !1) {
							const S = v.parent;
							n.problems.push({
								location: {
									offset: S.keyNode.offset,
									length: S.keyNode.length
								},
								message: t.errorMessage || C("Property {0} is not allowed.", N)
							});
						} else if (y !== !0) {
							const S = new ge();
							le(v, y, S, r, i), n.mergePropertyMatch(S);
						}
					}
				}
				b.forEach(d);
			}
			if (me(t.maxProperties) && f.properties.length > t.maxProperties && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("Object has more properties than limit of {0}.", t.maxProperties)
			}), me(t.minProperties) && f.properties.length < t.minProperties && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: C("Object has fewer properties than the required number of {0}", t.minProperties)
			}), t.dependentRequired) for (const b in t.dependentRequired) {
				const N = m[b], v = t.dependentRequired[b];
				N && Array.isArray(v) && _(b, v);
			}
			if (t.dependentSchemas) for (const b in t.dependentSchemas) {
				const N = m[b], v = t.dependentSchemas[b];
				N && Xe(v) && _(b, v);
			}
			if (t.dependencies) for (const b in t.dependencies) m[b] && _(b, t.dependencies[b]);
			const L = Ne(t.propertyNames);
			if (L) for (const b of f.properties) {
				const N = b.keyNode;
				N && le(N, L, n, Qt.instance, i);
			}
			function _(b, N) {
				if (Array.isArray(N)) for (const v of N) m[v] ? n.propertiesValueMatches++ : n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: C("Object is missing property {0} required by property {1}.", v, b)
				});
				else {
					const v = Ne(N);
					if (v) {
						const S = new ge();
						le(f, v, S, r, i), n.mergePropertyMatch(S);
					}
				}
			}
		}
	}
	function x0(e, t) {
		const n = [];
		let r = -1;
		const i = e.getText(), s = it(i, !1), a = t && t.collectComments ? [] : void 0;
		function l() {
			for (;;) {
				const v = s.scan();
				switch (h(), v) {
					case 12:
					case 13:
						Array.isArray(a) && a.push(H.create(e.positionAt(s.getTokenOffset()), e.positionAt(s.getTokenOffset() + s.getTokenLength())));
						break;
					case 15:
					case 14: break;
					default: return v;
				}
			}
		}
		function o(v, S, w, k, P = Le.Error) {
			if (n.length === 0 || w !== r) {
				const D = H.create(e.positionAt(w), e.positionAt(k));
				n.push(je.create(D, v, P, S, e.languageId)), r = w;
			}
		}
		function c(v, S, w = void 0, k = [], P = []) {
			let D = s.getTokenOffset(), T = s.getTokenOffset() + s.getTokenLength();
			if (D === T && D > 0) {
				for (D--; D > 0 && /\s/.test(i.charAt(D));) D--;
				T = D + 1;
			}
			if (o(v, S, D, T), w && f(w, !1), k.length + P.length > 0) {
				let R = s.getToken();
				for (; R !== 17;) {
					if (k.indexOf(R) !== -1) {
						l();
						break;
					} else if (P.indexOf(R) !== -1) break;
					R = l();
				}
			}
			return w;
		}
		function h() {
			switch (s.getTokenError()) {
				case 4: return c(C("Invalid unicode sequence in string."), X.InvalidUnicode), !0;
				case 5: return c(C("Invalid escape character in string."), X.InvalidEscapeCharacter), !0;
				case 3: return c(C("Unexpected end of number."), X.UnexpectedEndOfNumber), !0;
				case 1: return c(C("Unexpected end of comment."), X.UnexpectedEndOfComment), !0;
				case 2: return c(C("Unexpected end of string."), X.UnexpectedEndOfString), !0;
				case 6: return c(C("Invalid characters in string. Control characters must be escaped."), X.InvalidCharacter), !0;
			}
			return !1;
		}
		function f(v, S) {
			return v.length = s.getTokenOffset() + s.getTokenLength() - v.offset, S && l(), v;
		}
		function m(v) {
			if (s.getToken() !== 3) return;
			const S = new v0(v, s.getTokenOffset());
			l();
			let w = !1;
			for (; s.getToken() !== 4 && s.getToken() !== 17;) {
				if (s.getToken() === 5) {
					w || c(C("Value expected"), X.ValueExpected);
					const P = s.getTokenOffset();
					if (l(), s.getToken() === 4) {
						w && o(C("Trailing comma"), X.TrailingComma, P, P + 1);
						continue;
					}
				} else w && c(C("Expected comma"), X.CommaExpected);
				const k = b(S);
				k ? S.items.push(k) : c(C("Value expected"), X.ValueExpected, void 0, [], [4, 5]), w = !0;
			}
			return s.getToken() !== 4 ? c(C("Expected comma or closing bracket"), X.CommaOrCloseBacketExpected, S) : f(S, !0);
		}
		const g = new ei(void 0, 0, 0);
		function d(v, S) {
			const w = new L0(v, s.getTokenOffset(), g);
			let k = y(w);
			if (!k) if (s.getToken() === 16) {
				c(C("Property keys must be doublequoted"), X.PropertyKeysMustBeDoublequoted);
				const D = new ei(w, s.getTokenOffset(), s.getTokenLength());
				D.value = s.getTokenValue(), k = D, l();
			} else return;
			if (w.keyNode = k, k.value !== "//") {
				const D = S[k.value];
				D ? (o(C("Duplicate object key"), X.DuplicateKey, w.keyNode.offset, w.keyNode.offset + w.keyNode.length, Le.Warning), Xe(D) && o(C("Duplicate object key"), X.DuplicateKey, D.keyNode.offset, D.keyNode.offset + D.keyNode.length, Le.Warning), S[k.value] = !0) : S[k.value] = w;
			}
			if (s.getToken() === 6) w.colonOffset = s.getTokenOffset(), l();
			else if (c(C("Colon expected"), X.ColonExpected), s.getToken() === 10 && e.positionAt(k.offset + k.length).line < e.positionAt(s.getTokenOffset()).line) return w.length = k.length, w;
			const P = b(w);
			return P ? (w.valueNode = P, w.length = P.offset + P.length - w.offset, w) : c(C("Value expected"), X.ValueExpected, w, [], [2, 5]);
		}
		function p(v) {
			if (s.getToken() !== 1) return;
			const S = new _0(v, s.getTokenOffset()), w = Object.create(null);
			l();
			let k = !1;
			for (; s.getToken() !== 2 && s.getToken() !== 17;) {
				if (s.getToken() === 5) {
					k || c(C("Property expected"), X.PropertyExpected);
					const D = s.getTokenOffset();
					if (l(), s.getToken() === 2) {
						k && o(C("Trailing comma"), X.TrailingComma, D, D + 1);
						continue;
					}
				} else k && c(C("Expected comma"), X.CommaExpected);
				const P = d(S, w);
				P ? S.properties.push(P) : c(C("Property expected"), X.PropertyExpected, void 0, [], [2, 5]), k = !0;
			}
			return s.getToken() !== 2 ? c(C("Expected comma or closing brace"), X.CommaOrCloseBraceExpected, S) : f(S, !0);
		}
		function y(v) {
			if (s.getToken() !== 10) return;
			const S = new ei(v, s.getTokenOffset());
			return S.value = s.getTokenValue(), f(S, !0);
		}
		function L(v) {
			if (s.getToken() !== 11) return;
			const S = new w0(v, s.getTokenOffset());
			if (s.getTokenError() === 0) {
				const w = s.getTokenValue();
				try {
					const k = JSON.parse(w);
					if (!me(k)) return c(C("Invalid number format."), X.Undefined, S);
					S.value = k;
				} catch {
					return c(C("Invalid number format."), X.Undefined, S);
				}
				S.isInteger = w.indexOf(".") === -1;
			}
			return f(S, !0);
		}
		function _(v) {
			switch (s.getToken()) {
				case 7: return f(new y0(v, s.getTokenOffset()), !0);
				case 8: return f(new no(v, !0, s.getTokenOffset()), !0);
				case 9: return f(new no(v, !1, s.getTokenOffset()), !0);
				default: return;
			}
		}
		function b(v) {
			return m(v) || p(v) || y(v) || L(v) || _(v);
		}
		let N;
		return l() !== 17 && (N = b(N), N ? s.getToken() !== 17 && c(C("End of file expected."), X.Undefined) : c(C("Expected a JSON object, array or literal."), X.Undefined)), new ao(N, n, a);
	}
	function ni(e, t, n) {
		if (e !== null && typeof e == "object") {
			const r = t + "	";
			if (Array.isArray(e)) {
				if (e.length === 0) return "[]";
				let i = `[
`;
				for (let s = 0; s < e.length; s++) i += r + ni(e[s], r, n), s < e.length - 1 && (i += ","), i += `
`;
				return i += t + "]", i;
			} else {
				const i = Object.keys(e);
				if (i.length === 0) return "{}";
				let s = `{
`;
				for (let a = 0; a < i.length; a++) {
					const l = i[a];
					s += r + JSON.stringify(l) + ": " + ni(e[l], r, n), a < i.length - 1 && (s += ","), s += `
`;
				}
				return s += t + "}", s;
			}
		}
		return n(e);
	}
	var k0 = class {
		constructor(e, t = [], n = Promise, r = {}) {
			this.schemaService = e, this.contributions = t, this.promiseConstructor = n, this.clientCapabilities = r;
		}
		doResolve(e) {
			for (let t = this.contributions.length - 1; t >= 0; t--) {
				const n = this.contributions[t].resolveCompletion;
				if (n) {
					const r = n(e);
					if (r) return r;
				}
			}
			return this.promiseConstructor.resolve(e);
		}
		doComplete(e, t, n) {
			const r = {
				items: [],
				isIncomplete: !1
			}, i = e.getText(), s = e.offsetAt(t);
			let a = n.getNodeFromOffset(s, !0);
			if (this.isInComment(e, a ? a.offset : 0, s)) return Promise.resolve(r);
			if (a && s === a.offset + a.length && s > 0) {
				const f = i[s - 1];
				(a.type === "object" && f === "}" || a.type === "array" && f === "]") && (a = a.parent);
			}
			const l = this.getCurrentWord(e, s);
			let o;
			if (a && (a.type === "string" || a.type === "number" || a.type === "boolean" || a.type === "null")) o = H.create(e.positionAt(a.offset), e.positionAt(a.offset + a.length));
			else {
				let f = s - l.length;
				f > 0 && i[f - 1] === "\"" && f--, o = H.create(e.positionAt(f), t);
			}
			const c = /* @__PURE__ */ new Map(), h = {
				add: (f) => {
					let m = f.label;
					const g = c.get(m);
					if (g) g.documentation || (g.documentation = f.documentation), g.detail || (g.detail = f.detail), g.labelDetails || (g.labelDetails = f.labelDetails);
					else {
						if (m = m.replace(/[\n]/g, "↵"), m.length > 60) {
							const d = m.substr(0, 57).trim() + "...";
							c.has(d) || (m = d);
						}
						f.textEdit = Fe.replace(o, f.insertText), f.label = m, c.set(m, f), r.items.push(f);
					}
				},
				setAsIncomplete: () => {
					r.isIncomplete = !0;
				},
				error: (f) => {
					console.error(f);
				},
				getNumberOfProposals: () => r.items.length
			};
			return this.schemaService.getSchemaForResource(e.uri, n).then((f) => {
				const m = [];
				let g = !0, d = "", p;
				if (a && a.type === "string") {
					const L = a.parent;
					L && L.type === "property" && L.keyNode === a && (g = !L.valueNode, p = L, d = i.substr(a.offset + 1, a.length - 2), L && (a = L.parent));
				}
				if (a && a.type === "object") {
					if (a.offset === s) return r;
					a.properties.forEach((b) => {
						(!p || p !== b) && c.set(b.keyNode.value, Xr.create("__"));
					});
					let L = "";
					g && (L = this.evaluateSeparatorAfter(e, e.offsetAt(o.end))), f ? this.getPropertyCompletions(f, n, a, g, L, h) : this.getSchemaLessPropertyCompletions(n, a, d, h);
					const _ = ti(a);
					this.contributions.forEach((b) => {
						const N = b.collectPropertyCompletions(e.uri, _, l, g, L === "", h);
						N && m.push(N);
					}), !f && l.length > 0 && i.charAt(s - l.length - 1) !== "\"" && (h.add({
						kind: _e.Property,
						label: this.getLabelForValue(l),
						insertText: this.getInsertTextForProperty(l, void 0, !1, L),
						insertTextFormat: ie.Snippet,
						documentation: ""
					}), h.setAsIncomplete());
				}
				const y = {};
				return f ? this.getValueCompletions(f, n, a, s, e, h, y) : this.getSchemaLessValueCompletions(n, a, s, e, h), this.contributions.length > 0 && this.getContributedValueCompletions(n, a, s, e, h, m), this.promiseConstructor.all(m).then(() => {
					if (h.getNumberOfProposals() === 0) {
						let L = s;
						a && (a.type === "string" || a.type === "number" || a.type === "boolean" || a.type === "null") && (L = a.offset + a.length);
						const _ = this.evaluateSeparatorAfter(e, L);
						this.addFillerValueCompletions(y, _, h);
					}
					return r;
				});
			});
		}
		getPropertyCompletions(e, t, n, r, i, s) {
			t.getMatchingSchemas(e.schema, n.offset).forEach((a) => {
				if (a.node === n && !a.inverted) {
					const l = a.schema.properties;
					l && Object.keys(l).forEach((c) => {
						const h = l[c];
						if (typeof h == "object" && !h.deprecationMessage && !h.doNotSuggest) {
							const f = {
								kind: _e.Property,
								label: c,
								insertText: this.getInsertTextForProperty(c, h, r, i),
								insertTextFormat: ie.Snippet,
								filterText: this.getFilterTextForValue(c),
								documentation: this.fromMarkup(h.markdownDescription) || h.description || ""
							};
							h.suggestSortText !== void 0 && (f.sortText = h.suggestSortText), f.insertText && Gt(f.insertText, `$1${i}`) && (f.command = {
								title: "Suggest",
								command: "editor.action.triggerSuggest"
							}), s.add(f);
						}
					});
					const o = a.schema.propertyNames;
					if (typeof o == "object" && !o.deprecationMessage && !o.doNotSuggest) {
						const c = (h, f = void 0) => {
							const m = {
								kind: _e.Property,
								label: h,
								insertText: this.getInsertTextForProperty(h, void 0, r, i),
								insertTextFormat: ie.Snippet,
								filterText: this.getFilterTextForValue(h),
								documentation: f || this.fromMarkup(o.markdownDescription) || o.description || ""
							};
							o.suggestSortText !== void 0 && (m.sortText = o.suggestSortText), m.insertText && Gt(m.insertText, `$1${i}`) && (m.command = {
								title: "Suggest",
								command: "editor.action.triggerSuggest"
							}), s.add(m);
						};
						if (o.enum) for (let h = 0; h < o.enum.length; h++) {
							let f;
							o.markdownEnumDescriptions && h < o.markdownEnumDescriptions.length ? f = this.fromMarkup(o.markdownEnumDescriptions[h]) : o.enumDescriptions && h < o.enumDescriptions.length && (f = o.enumDescriptions[h]), c(o.enum[h], f);
						}
						o.const && c(o.const);
					}
				}
			});
		}
		getSchemaLessPropertyCompletions(e, t, n, r) {
			const i = (s) => {
				s.properties.forEach((a) => {
					const l = a.keyNode.value;
					r.add({
						kind: _e.Property,
						label: l,
						insertText: this.getInsertTextForValue(l, ""),
						insertTextFormat: ie.Snippet,
						filterText: this.getFilterTextForValue(l),
						documentation: ""
					});
				});
			};
			if (t.parent) if (t.parent.type === "property") {
				const s = t.parent.keyNode.value;
				e.visit((a) => (a.type === "property" && a !== t.parent && a.keyNode.value === s && a.valueNode && a.valueNode.type === "object" && i(a.valueNode), !0));
			} else t.parent.type === "array" && t.parent.items.forEach((s) => {
				s.type === "object" && s !== t && i(s);
			});
			else t.type === "object" && r.add({
				kind: _e.Property,
				label: "$schema",
				insertText: this.getInsertTextForProperty("$schema", void 0, !0, ""),
				insertTextFormat: ie.Snippet,
				documentation: "",
				filterText: this.getFilterTextForValue("$schema")
			});
		}
		getSchemaLessValueCompletions(e, t, n, r, i) {
			let s = n;
			if (t && (t.type === "string" || t.type === "number" || t.type === "boolean" || t.type === "null") && (s = t.offset + t.length, t = t.parent), !t) {
				i.add({
					kind: this.getSuggestionKind("object"),
					label: "Empty object",
					insertText: this.getInsertTextForValue({}, ""),
					insertTextFormat: ie.Snippet,
					documentation: ""
				}), i.add({
					kind: this.getSuggestionKind("array"),
					label: "Empty array",
					insertText: this.getInsertTextForValue([], ""),
					insertTextFormat: ie.Snippet,
					documentation: ""
				});
				return;
			}
			const a = this.evaluateSeparatorAfter(r, s), l = (o) => {
				o.parent && !so(o.parent, n, !0) && i.add({
					kind: this.getSuggestionKind(o.type),
					label: this.getLabelTextForMatchingNode(o, r),
					insertText: this.getInsertTextForMatchingNode(o, r, a),
					insertTextFormat: ie.Snippet,
					documentation: ""
				}), o.type === "boolean" && this.addBooleanValueCompletion(!o.value, a, i);
			};
			if (t.type === "property" && n > (t.colonOffset || 0)) {
				const o = t.valueNode;
				if (o && (n > o.offset + o.length || o.type === "object" || o.type === "array")) return;
				const c = t.keyNode.value;
				e.visit((h) => (h.type === "property" && h.keyNode.value === c && h.valueNode && l(h.valueNode), !0)), c === "$schema" && t.parent && !t.parent.parent && this.addDollarSchemaCompletions(a, i);
			}
			if (t.type === "array") if (t.parent && t.parent.type === "property") {
				const o = t.parent.keyNode.value;
				e.visit((c) => (c.type === "property" && c.keyNode.value === o && c.valueNode && c.valueNode.type === "array" && c.valueNode.items.forEach(l), !0));
			} else t.items.forEach(l);
		}
		getValueCompletions(e, t, n, r, i, s, a) {
			let l = r, o, c;
			if (n && (n.type === "string" || n.type === "number" || n.type === "boolean" || n.type === "null") && (l = n.offset + n.length, c = n, n = n.parent), !n) {
				this.addSchemaValueCompletions(e.schema, "", s, a);
				return;
			}
			if (n.type === "property" && r > (n.colonOffset || 0)) {
				const h = n.valueNode;
				if (h && r > h.offset + h.length) return;
				o = n.keyNode.value, n = n.parent;
			}
			if (n && (o !== void 0 || n.type === "array")) {
				const h = this.evaluateSeparatorAfter(i, l), f = t.getMatchingSchemas(e.schema, n.offset, c);
				for (const m of f) if (m.node === n && !m.inverted && m.schema) {
					if (n.type === "array" && m.schema.items) {
						let g = s;
						if (m.schema.uniqueItems) {
							const d = /* @__PURE__ */ new Set();
							n.children.forEach((p) => {
								p.type !== "array" && p.type !== "object" && d.add(this.getLabelForValue(ot(p)));
							}), g = {
								...s,
								add(p) {
									d.has(p.label) || s.add(p);
								}
							};
						}
						if (Array.isArray(m.schema.items)) {
							const d = this.findItemAtOffset(n, i, r);
							d < m.schema.items.length && this.addSchemaValueCompletions(m.schema.items[d], h, g, a);
						} else this.addSchemaValueCompletions(m.schema.items, h, g, a);
					}
					if (o !== void 0) {
						let g = !1;
						if (m.schema.properties) {
							const d = m.schema.properties[o];
							d && (g = !0, this.addSchemaValueCompletions(d, h, s, a));
						}
						if (m.schema.patternProperties && !g) {
							for (const d of Object.keys(m.schema.patternProperties)) if (En(d)?.test(o)) {
								g = !0;
								const p = m.schema.patternProperties[d];
								this.addSchemaValueCompletions(p, h, s, a);
							}
						}
						if (m.schema.additionalProperties && !g) {
							const d = m.schema.additionalProperties;
							this.addSchemaValueCompletions(d, h, s, a);
						}
					}
				}
				o === "$schema" && !n.parent && this.addDollarSchemaCompletions(h, s), a.boolean && (this.addBooleanValueCompletion(!0, h, s), this.addBooleanValueCompletion(!1, h, s)), a.null && this.addNullValueCompletion(h, s);
			}
		}
		getContributedValueCompletions(e, t, n, r, i, s) {
			if (!t) this.contributions.forEach((a) => {
				const l = a.collectDefaultCompletions(r.uri, i);
				l && s.push(l);
			});
			else if ((t.type === "string" || t.type === "number" || t.type === "boolean" || t.type === "null") && (t = t.parent), t && t.type === "property" && n > (t.colonOffset || 0)) {
				const a = t.keyNode.value, l = t.valueNode;
				if ((!l || n <= l.offset + l.length) && t.parent) {
					const o = ti(t.parent);
					this.contributions.forEach((c) => {
						const h = c.collectValueCompletions(r.uri, o, a, i);
						h && s.push(h);
					});
				}
			}
		}
		addSchemaValueCompletions(e, t, n, r) {
			typeof e == "object" && (this.addEnumValueCompletions(e, t, n), this.addDefaultValueCompletions(e, t, n), this.collectTypes(e, r), Array.isArray(e.allOf) && e.allOf.forEach((i) => this.addSchemaValueCompletions(i, t, n, r)), Array.isArray(e.anyOf) && e.anyOf.forEach((i) => this.addSchemaValueCompletions(i, t, n, r)), Array.isArray(e.oneOf) && e.oneOf.forEach((i) => this.addSchemaValueCompletions(i, t, n, r)));
		}
		addDefaultValueCompletions(e, t, n, r = 0) {
			let i = !1;
			if (Re(e.default)) {
				let s = e.type, a = e.default;
				for (let o = r; o > 0; o--) a = [a], s = "array";
				const l = {
					kind: this.getSuggestionKind(s),
					label: this.getLabelForValue(a),
					insertText: this.getInsertTextForValue(a, t),
					insertTextFormat: ie.Snippet
				};
				this.doesSupportsLabelDetails() ? l.labelDetails = { description: C("Default value") } : l.detail = C("Default value"), n.add(l), i = !0;
			}
			Array.isArray(e.examples) && e.examples.forEach((s) => {
				let a = e.type, l = s;
				for (let o = r; o > 0; o--) l = [l], a = "array";
				n.add({
					kind: this.getSuggestionKind(a),
					label: this.getLabelForValue(l),
					insertText: this.getInsertTextForValue(l, t),
					insertTextFormat: ie.Snippet
				}), i = !0;
			}), Array.isArray(e.defaultSnippets) && e.defaultSnippets.forEach((s) => {
				let a = e.type, l = s.body, o = s.label, c, h;
				if (Re(l)) {
					e.type;
					for (let f = r; f > 0; f--) l = [l];
					c = this.getInsertTextForSnippetValue(l, t), h = this.getFilterTextForSnippetValue(l), o = o || this.getLabelForSnippetValue(l);
				} else if (typeof s.bodyText == "string") {
					let f = "", m = "", g = "";
					for (let d = r; d > 0; d--) f = f + g + `[
`, m = m + `
` + g + "]", g += "	", a = "array";
					c = f + g + s.bodyText.split(`
`).join(`
` + g) + m + t, o = o || c, h = c.replace(/[\n]/g, "");
				} else return;
				n.add({
					kind: this.getSuggestionKind(a),
					label: o,
					documentation: this.fromMarkup(s.markdownDescription) || s.description,
					insertText: c,
					insertTextFormat: ie.Snippet,
					filterText: h
				}), i = !0;
			}), !i && typeof e.items == "object" && !Array.isArray(e.items) && r < 5 && this.addDefaultValueCompletions(e.items, t, n, r + 1);
		}
		addEnumValueCompletions(e, t, n) {
			if (Re(e.const) && n.add({
				kind: this.getSuggestionKind(e.type),
				label: this.getLabelForValue(e.const),
				insertText: this.getInsertTextForValue(e.const, t),
				insertTextFormat: ie.Snippet,
				documentation: this.fromMarkup(e.markdownDescription) || e.description
			}), Array.isArray(e.enum)) for (let r = 0, i = e.enum.length; r < i; r++) {
				const s = e.enum[r];
				let a = this.fromMarkup(e.markdownDescription) || e.description;
				e.markdownEnumDescriptions && r < e.markdownEnumDescriptions.length && this.doesSupportMarkdown() ? a = this.fromMarkup(e.markdownEnumDescriptions[r]) : e.enumDescriptions && r < e.enumDescriptions.length && (a = e.enumDescriptions[r]), n.add({
					kind: this.getSuggestionKind(e.type),
					label: this.getLabelForValue(s),
					insertText: this.getInsertTextForValue(s, t),
					insertTextFormat: ie.Snippet,
					documentation: a
				});
			}
		}
		collectTypes(e, t) {
			if (Array.isArray(e.enum) || Re(e.const)) return;
			const n = e.type;
			Array.isArray(n) ? n.forEach((r) => t[r] = !0) : n && (t[n] = !0);
		}
		addFillerValueCompletions(e, t, n) {
			e.object && n.add({
				kind: this.getSuggestionKind("object"),
				label: "{}",
				insertText: this.getInsertTextForGuessedValue({}, t),
				insertTextFormat: ie.Snippet,
				detail: C("New object"),
				documentation: ""
			}), e.array && n.add({
				kind: this.getSuggestionKind("array"),
				label: "[]",
				insertText: this.getInsertTextForGuessedValue([], t),
				insertTextFormat: ie.Snippet,
				detail: C("New array"),
				documentation: ""
			});
		}
		addBooleanValueCompletion(e, t, n) {
			n.add({
				kind: this.getSuggestionKind("boolean"),
				label: e ? "true" : "false",
				insertText: this.getInsertTextForValue(e, t),
				insertTextFormat: ie.Snippet,
				documentation: ""
			});
		}
		addNullValueCompletion(e, t) {
			t.add({
				kind: this.getSuggestionKind("null"),
				label: "null",
				insertText: "null" + e,
				insertTextFormat: ie.Snippet,
				documentation: ""
			});
		}
		addDollarSchemaCompletions(e, t) {
			this.schemaService.getRegisteredSchemaIds((n) => n === "http" || n === "https").forEach((n) => {
				n.startsWith("http://json-schema.org/draft-") && (n = n + "#"), t.add({
					kind: _e.Module,
					label: this.getLabelForValue(n),
					filterText: this.getFilterTextForValue(n),
					insertText: this.getInsertTextForValue(n, e),
					insertTextFormat: ie.Snippet,
					documentation: ""
				});
			});
		}
		getLabelForValue(e) {
			return JSON.stringify(e);
		}
		getValueFromLabel(e) {
			return JSON.parse(e);
		}
		getFilterTextForValue(e) {
			return JSON.stringify(e);
		}
		getFilterTextForSnippetValue(e) {
			return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
		}
		getLabelForSnippetValue(e) {
			return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
		}
		getInsertTextForPlainText(e) {
			return e.replace(/[\\\$\}]/g, "\\$&");
		}
		getInsertTextForValue(e, t) {
			const n = JSON.stringify(e, null, "	");
			return n === "{}" ? "{$1}" + t : n === "[]" ? "[$1]" + t : this.getInsertTextForPlainText(n + t);
		}
		getInsertTextForSnippetValue(e, t) {
			return ni(e, "", (r) => typeof r == "string" && r[0] === "^" ? r.substr(1) : JSON.stringify(r)) + t;
		}
		getInsertTextForGuessedValue(e, t) {
			switch (typeof e) {
				case "object": return e === null ? "${1:null}" + t : this.getInsertTextForValue(e, t);
				case "string":
					let n = JSON.stringify(e);
					return n = n.substr(1, n.length - 2), n = this.getInsertTextForPlainText(n), "\"${1:" + n + "}\"" + t;
				case "number":
				case "boolean": return "${1:" + JSON.stringify(e) + "}" + t;
			}
			return this.getInsertTextForValue(e, t);
		}
		getSuggestionKind(e) {
			if (Array.isArray(e)) {
				const t = e;
				e = t.length > 0 ? t[0] : void 0;
			}
			if (!e) return _e.Value;
			switch (e) {
				case "string": return _e.Value;
				case "object": return _e.Module;
				case "property": return _e.Property;
				default: return _e.Value;
			}
		}
		getLabelTextForMatchingNode(e, t) {
			switch (e.type) {
				case "array": return "[]";
				case "object": return "{}";
				default: return t.getText().substr(e.offset, e.length);
			}
		}
		getInsertTextForMatchingNode(e, t, n) {
			switch (e.type) {
				case "array": return this.getInsertTextForValue([], n);
				case "object": return this.getInsertTextForValue({}, n);
				default:
					const r = t.getText().substr(e.offset, e.length) + n;
					return this.getInsertTextForPlainText(r);
			}
		}
		getInsertTextForProperty(e, t, n, r) {
			const i = this.getInsertTextForValue(e, "");
			if (!n) return i;
			const s = i + ": ";
			let a, l = 0;
			if (t) {
				if (Array.isArray(t.defaultSnippets)) {
					if (t.defaultSnippets.length === 1) {
						const o = t.defaultSnippets[0].body;
						Re(o) && (a = this.getInsertTextForSnippetValue(o, ""));
					}
					l += t.defaultSnippets.length;
				}
				if (t.enum && (!a && t.enum.length === 1 && (a = this.getInsertTextForGuessedValue(t.enum[0], "")), l += t.enum.length), Re(t.const) && (a || (a = this.getInsertTextForGuessedValue(t.const, "")), l++), Re(t.default) && (a || (a = this.getInsertTextForGuessedValue(t.default, "")), l++), Array.isArray(t.examples) && t.examples.length && (a || (a = this.getInsertTextForGuessedValue(t.examples[0], "")), l += t.examples.length), l === 0) {
					let o = Array.isArray(t.type) ? t.type[0] : t.type;
					switch (o || (t.properties ? o = "object" : t.items && (o = "array")), o) {
						case "boolean":
							a = "$1";
							break;
						case "string":
							a = "\"$1\"";
							break;
						case "object":
							a = "{$1}";
							break;
						case "array":
							a = "[$1]";
							break;
						case "number":
						case "integer":
							a = "${1:0}";
							break;
						case "null":
							a = "${1:null}";
							break;
						default: return i;
					}
				}
			}
			return (!a || l > 1) && (a = "$1"), s + a + r;
		}
		getCurrentWord(e, t) {
			let n = t - 1;
			const r = e.getText();
			for (; n >= 0 && ` 	
\r\v":{[,]}`.indexOf(r.charAt(n)) === -1;) n--;
			return r.substring(n + 1, t);
		}
		evaluateSeparatorAfter(e, t) {
			const n = it(e.getText(), !0);
			switch (n.setPosition(t), n.scan()) {
				case 5:
				case 2:
				case 4:
				case 17: return "";
				default: return ",";
			}
		}
		findItemAtOffset(e, t, n) {
			const r = it(t.getText(), !0), i = e.items;
			for (let s = i.length - 1; s >= 0; s--) {
				const a = i[s];
				if (n > a.offset + a.length) return r.setPosition(a.offset + a.length), r.scan() === 5 && n >= r.getTokenOffset() + r.getTokenLength() ? s + 1 : s;
				if (n >= a.offset) return s;
			}
			return 0;
		}
		isInComment(e, t, n) {
			const r = it(e.getText(), !1);
			r.setPosition(t);
			let i = r.scan();
			for (; i !== 17 && r.getTokenOffset() + r.getTokenLength() < n;) i = r.scan();
			return (i === 12 || i === 13) && r.getTokenOffset() <= n;
		}
		fromMarkup(e) {
			if (e && this.doesSupportMarkdown()) return {
				kind: st.Markdown,
				value: e
			};
		}
		doesSupportMarkdown() {
			if (!Re(this.supportsMarkdown)) {
				const e = this.clientCapabilities.textDocument?.completion?.completionItem?.documentationFormat;
				this.supportsMarkdown = Array.isArray(e) && e.indexOf(st.Markdown) !== -1;
			}
			return this.supportsMarkdown;
		}
		doesSupportsCommitCharacters() {
			return Re(this.supportsCommitCharacters) || (this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.commitCharactersSupport), this.supportsCommitCharacters;
		}
		doesSupportsLabelDetails() {
			return Re(this.labelDetailsSupport) || (this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.labelDetailsSupport), this.labelDetailsSupport;
		}
	}, R0 = class {
		constructor(e, t = [], n) {
			this.schemaService = e, this.contributions = t, this.promise = n || Promise;
		}
		doHover(e, t, n) {
			const r = e.offsetAt(t);
			let i = n.getNodeFromOffset(r);
			if (!i || (i.type === "object" || i.type === "array") && r > i.offset + 1 && r < i.offset + i.length - 1) return this.promise.resolve(null);
			const s = i;
			if (i.type === "string") {
				const c = i.parent;
				if (c && c.type === "property" && c.keyNode === i && (i = c.valueNode, !i)) return this.promise.resolve(null);
			}
			const a = H.create(e.positionAt(s.offset), e.positionAt(s.offset + s.length)), l = (c) => ({
				contents: c,
				range: a
			}), o = ti(i);
			for (let c = this.contributions.length - 1; c >= 0; c--) {
				const h = this.contributions[c].getInfoContribution(e.uri, o);
				if (h) return h.then((f) => l(f));
			}
			return this.schemaService.getSchemaForResource(e.uri, n).then((c) => {
				if (c && i) {
					const h = n.getMatchingSchemas(c.schema, i.offset);
					let f, m, g, d;
					h.every((y) => {
						if (y.node === i && !y.inverted && y.schema && (f = f || y.schema.title, m = m || y.schema.markdownDescription || ri(y.schema.description), y.schema.enum)) {
							const L = y.schema.enum.indexOf(ot(i));
							y.schema.markdownEnumDescriptions ? g = y.schema.markdownEnumDescriptions[L] : y.schema.enumDescriptions && (g = ri(y.schema.enumDescriptions[L])), g && (d = y.schema.enum[L], typeof d != "string" && (d = JSON.stringify(d)));
						}
						return !0;
					});
					let p = "";
					return f && (p = ri(f)), m && (p.length > 0 && (p += `

`), p += m), g && (p.length > 0 && (p += `

`), p += `\`${E0(d)}\`: ${g}`), l([p]);
				}
				return null;
			});
		}
	};
	function ri(e) {
		if (e) return e.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, `$1

$3`).replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
	}
	function E0(e) {
		return e.indexOf("`") !== -1 ? "`` " + e + " ``" : e;
	}
	var T0 = class {
		constructor(e, t) {
			this.jsonSchemaService = e, this.promise = t, this.validationEnabled = !0;
		}
		configure(e) {
			e && (this.validationEnabled = e.validate !== !1, this.commentSeverity = e.allowComments ? void 0 : Le.Error);
		}
		doValidation(e, t, n, r) {
			if (!this.validationEnabled) return this.promise.resolve([]);
			const i = [], s = {}, a = (o) => {
				const c = o.range.start.line + " " + o.range.start.character + " " + o.message;
				s[c] || (s[c] = !0, i.push(o));
			}, l = (o) => {
				let c = n?.trailingCommas ? In(n.trailingCommas) : Le.Error, h = n?.comments ? In(n.comments) : this.commentSeverity, f = n?.schemaValidation ? In(n.schemaValidation) : Le.Warning, m = n?.schemaRequest ? In(n.schemaRequest) : Le.Warning;
				if (o) {
					const g = (d, p) => {
						if (t.root && m) {
							const y = t.root, L = y.type === "object" ? y.properties[0] : void 0;
							if (L && L.keyNode.value === "$schema") {
								const _ = L.valueNode || L, b = H.create(e.positionAt(_.offset), e.positionAt(_.offset + _.length));
								a(je.create(b, d, m, p));
							} else {
								const _ = H.create(e.positionAt(y.offset), e.positionAt(y.offset + 1));
								a(je.create(_, d, m, p));
							}
						}
					};
					if (o.errors.length) g(o.errors[0], X.SchemaResolveError);
					else if (f) {
						for (const p of o.warnings) g(p, X.SchemaUnsupportedFeature);
						const d = t.validate(e, o.schema, f, n?.schemaDraft);
						d && d.forEach(a);
					}
					lo(o.schema) && (h = void 0), uo(o.schema) && (c = void 0);
				}
				for (const g of t.syntaxErrors) {
					if (g.code === X.TrailingComma) {
						if (typeof c != "number") continue;
						g.severity = c;
					}
					a(g);
				}
				if (typeof h == "number") {
					const g = C("Comments are not permitted in JSON.");
					t.comments.forEach((d) => {
						a(je.create(d, g, h, X.CommentNotPermitted));
					});
				}
				return i;
			};
			if (r) {
				const o = r.id || "schemaservice://untitled/" + M0++;
				return this.jsonSchemaService.registerExternalSchema({
					uri: o,
					schema: r
				}).getResolvedSchema().then((c) => l(c));
			}
			return this.jsonSchemaService.getSchemaForResource(e.uri, t).then((o) => l(o));
		}
		getLanguageStatus(e, t) {
			return { schemas: this.jsonSchemaService.getSchemaURIsForResource(e.uri, t) };
		}
	};
	let M0 = 0;
	function lo(e) {
		if (e && typeof e == "object") {
			if (Ie(e.allowComments)) return e.allowComments;
			if (e.allOf) for (const t of e.allOf) {
				const n = lo(t);
				if (Ie(n)) return n;
			}
		}
	}
	function uo(e) {
		if (e && typeof e == "object") {
			if (Ie(e.allowTrailingCommas)) return e.allowTrailingCommas;
			const t = e;
			if (Ie(t.allowsTrailingCommas)) return t.allowsTrailingCommas;
			if (e.allOf) for (const n of e.allOf) {
				const r = uo(n);
				if (Ie(r)) return r;
			}
		}
	}
	function In(e) {
		switch (e) {
			case "error": return Le.Error;
			case "warning": return Le.Warning;
			case "ignore": return;
		}
	}
	const co = 48, C0 = 57, ii = 97, P0 = 102;
	function te(e) {
		return e < co ? 0 : e <= C0 ? e - co : (e < ii && (e += 32), e >= ii && e <= P0 ? e - ii + 10 : 0);
	}
	function I0(e) {
		if (e[0] === "#") switch (e.length) {
			case 4: return {
				red: te(e.charCodeAt(1)) * 17 / 255,
				green: te(e.charCodeAt(2)) * 17 / 255,
				blue: te(e.charCodeAt(3)) * 17 / 255,
				alpha: 1
			};
			case 5: return {
				red: te(e.charCodeAt(1)) * 17 / 255,
				green: te(e.charCodeAt(2)) * 17 / 255,
				blue: te(e.charCodeAt(3)) * 17 / 255,
				alpha: te(e.charCodeAt(4)) * 17 / 255
			};
			case 7: return {
				red: (te(e.charCodeAt(1)) * 16 + te(e.charCodeAt(2))) / 255,
				green: (te(e.charCodeAt(3)) * 16 + te(e.charCodeAt(4))) / 255,
				blue: (te(e.charCodeAt(5)) * 16 + te(e.charCodeAt(6))) / 255,
				alpha: 1
			};
			case 9: return {
				red: (te(e.charCodeAt(1)) * 16 + te(e.charCodeAt(2))) / 255,
				green: (te(e.charCodeAt(3)) * 16 + te(e.charCodeAt(4))) / 255,
				blue: (te(e.charCodeAt(5)) * 16 + te(e.charCodeAt(6))) / 255,
				alpha: (te(e.charCodeAt(7)) * 16 + te(e.charCodeAt(8))) / 255
			};
		}
	}
	var F0 = class {
		constructor(e) {
			this.schemaService = e;
		}
		findDocumentSymbols(e, t, n = { resultLimit: Number.MAX_VALUE }) {
			const r = t.root;
			if (!r) return [];
			let i = n.resultLimit || Number.MAX_VALUE;
			const s = e.uri;
			if ((s === "vscode://defaultsettings/keybindings.json" || Gt(s.toLowerCase(), "/user/keybindings.json")) && r.type === "array") {
				const f = [];
				for (const m of r.items) if (m.type === "object") {
					for (const g of m.properties) if (g.keyNode.value === "key" && g.valueNode) {
						const d = xt.create(e.uri, Qe(e, m));
						if (f.push({
							name: fo(g.valueNode),
							kind: Ve.Function,
							location: d
						}), i--, i <= 0) return n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), f;
					}
				}
				return f;
			}
			const a = [{
				node: r,
				containerName: ""
			}];
			let l = 0, o = !1;
			const c = [], h = (f, m) => {
				f.type === "array" ? f.items.forEach((g) => {
					g && a.push({
						node: g,
						containerName: m
					});
				}) : f.type === "object" && f.properties.forEach((g) => {
					const d = g.valueNode;
					if (d) if (i > 0) {
						i--;
						const p = xt.create(e.uri, Qe(e, g)), y = m ? m + "." + g.keyNode.value : g.keyNode.value;
						c.push({
							name: this.getKeyLabel(g),
							kind: this.getSymbolKind(d.type),
							location: p,
							containerName: m
						}), a.push({
							node: d,
							containerName: y
						});
					} else o = !0;
				});
			};
			for (; l < a.length;) {
				const f = a[l++];
				h(f.node, f.containerName);
			}
			return o && n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), c;
		}
		findDocumentSymbols2(e, t, n = { resultLimit: Number.MAX_VALUE }) {
			const r = t.root;
			if (!r) return [];
			let i = n.resultLimit || Number.MAX_VALUE;
			const s = e.uri;
			if ((s === "vscode://defaultsettings/keybindings.json" || Gt(s.toLowerCase(), "/user/keybindings.json")) && r.type === "array") {
				const f = [];
				for (const m of r.items) if (m.type === "object") {
					for (const g of m.properties) if (g.keyNode.value === "key" && g.valueNode) {
						const d = Qe(e, m), p = Qe(e, g.keyNode);
						if (f.push({
							name: fo(g.valueNode),
							kind: Ve.Function,
							range: d,
							selectionRange: p
						}), i--, i <= 0) return n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), f;
					}
				}
				return f;
			}
			const a = [], l = [{
				node: r,
				result: a
			}];
			let o = 0, c = !1;
			const h = (f, m) => {
				f.type === "array" ? f.items.forEach((g, d) => {
					if (g) if (i > 0) {
						i--;
						const p = Qe(e, g), y = p, L = {
							name: String(d),
							kind: this.getSymbolKind(g.type),
							range: p,
							selectionRange: y,
							children: []
						};
						m.push(L), l.push({
							result: L.children,
							node: g
						});
					} else c = !0;
				}) : f.type === "object" && f.properties.forEach((g) => {
					const d = g.valueNode;
					if (d) if (i > 0) {
						i--;
						const p = Qe(e, g), y = Qe(e, g.keyNode), L = [], _ = {
							name: this.getKeyLabel(g),
							kind: this.getSymbolKind(d.type),
							range: p,
							selectionRange: y,
							children: L,
							detail: this.getDetail(d)
						};
						m.push(_), l.push({
							result: L,
							node: d
						});
					} else c = !0;
				});
			};
			for (; o < l.length;) {
				const f = l[o++];
				h(f.node, f.result);
			}
			return c && n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), a;
		}
		getSymbolKind(e) {
			switch (e) {
				case "object": return Ve.Module;
				case "string": return Ve.String;
				case "number": return Ve.Number;
				case "array": return Ve.Array;
				case "boolean": return Ve.Boolean;
				default: return Ve.Variable;
			}
		}
		getKeyLabel(e) {
			let t = e.keyNode.value;
			return t && (t = t.replace(/[\n]/g, "↵")), t && t.trim() ? t : `"${t}"`;
		}
		getDetail(e) {
			if (e) {
				if (e.type === "boolean" || e.type === "number" || e.type === "null" || e.type === "string") return String(e.value);
				if (e.type === "array") return e.children.length ? void 0 : "[]";
				if (e.type === "object") return e.children.length ? void 0 : "{}";
			}
		}
		findDocumentColors(e, t, n) {
			return this.schemaService.getSchemaForResource(e.uri, t).then((r) => {
				const i = [];
				if (r) {
					let s = n && typeof n.resultLimit == "number" ? n.resultLimit : Number.MAX_VALUE;
					const a = t.getMatchingSchemas(r.schema), l = {};
					for (const o of a) if (!o.inverted && o.schema && (o.schema.format === "color" || o.schema.format === "color-hex") && o.node && o.node.type === "string") {
						const c = String(o.node.offset);
						if (!l[c]) {
							const h = I0(ot(o.node));
							if (h) {
								const f = Qe(e, o.node);
								i.push({
									color: h,
									range: f
								});
							}
							if (l[c] = !0, s--, s <= 0) return n && n.onResultLimitExceeded && n.onResultLimitExceeded(e.uri), i;
						}
					}
				}
				return i;
			});
		}
		getColorPresentations(e, t, n, r) {
			const i = [], s = Math.round(n.red * 255), a = Math.round(n.green * 255), l = Math.round(n.blue * 255);
			function o(h) {
				const f = h.toString(16);
				return f.length !== 2 ? "0" + f : f;
			}
			let c;
			return n.alpha === 1 ? c = `#${o(s)}${o(a)}${o(l)}` : c = `#${o(s)}${o(a)}${o(l)}${o(Math.round(n.alpha * 255))}`, i.push({
				label: c,
				textEdit: Fe.replace(r, JSON.stringify(c))
			}), i;
		}
	};
	function Qe(e, t) {
		return H.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length));
	}
	function fo(e) {
		return ot(e) || C("<empty>");
	}
	const si = {
		schemaAssociations: [],
		schemas: {
			"http://json-schema.org/draft-04/schema#": {
				$schema: "http://json-schema.org/draft-04/schema#",
				definitions: {
					schemaArray: {
						type: "array",
						minItems: 1,
						items: { $ref: "#" }
					},
					positiveInteger: {
						type: "integer",
						minimum: 0
					},
					positiveIntegerDefault0: { allOf: [{ $ref: "#/definitions/positiveInteger" }, { default: 0 }] },
					simpleTypes: {
						type: "string",
						enum: [
							"array",
							"boolean",
							"integer",
							"null",
							"number",
							"object",
							"string"
						]
					},
					stringArray: {
						type: "array",
						items: { type: "string" },
						minItems: 1,
						uniqueItems: !0
					}
				},
				type: "object",
				properties: {
					id: {
						type: "string",
						format: "uri"
					},
					$schema: {
						type: "string",
						format: "uri"
					},
					title: { type: "string" },
					description: { type: "string" },
					default: {},
					multipleOf: {
						type: "number",
						minimum: 0,
						exclusiveMinimum: !0
					},
					maximum: { type: "number" },
					exclusiveMaximum: {
						type: "boolean",
						default: !1
					},
					minimum: { type: "number" },
					exclusiveMinimum: {
						type: "boolean",
						default: !1
					},
					maxLength: { allOf: [{ $ref: "#/definitions/positiveInteger" }] },
					minLength: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] },
					pattern: {
						type: "string",
						format: "regex"
					},
					additionalItems: {
						anyOf: [{ type: "boolean" }, { $ref: "#" }],
						default: {}
					},
					items: {
						anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
						default: {}
					},
					maxItems: { allOf: [{ $ref: "#/definitions/positiveInteger" }] },
					minItems: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] },
					uniqueItems: {
						type: "boolean",
						default: !1
					},
					maxProperties: { allOf: [{ $ref: "#/definitions/positiveInteger" }] },
					minProperties: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] },
					required: { allOf: [{ $ref: "#/definitions/stringArray" }] },
					additionalProperties: {
						anyOf: [{ type: "boolean" }, { $ref: "#" }],
						default: {}
					},
					definitions: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					properties: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					patternProperties: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					dependencies: {
						type: "object",
						additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
					},
					enum: {
						type: "array",
						minItems: 1,
						uniqueItems: !0
					},
					type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
						type: "array",
						items: { $ref: "#/definitions/simpleTypes" },
						minItems: 1,
						uniqueItems: !0
					}] },
					format: { anyOf: [{
						type: "string",
						enum: [
							"date-time",
							"uri",
							"email",
							"hostname",
							"ipv4",
							"ipv6",
							"regex"
						]
					}, { type: "string" }] },
					allOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] },
					anyOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] },
					oneOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] },
					not: { allOf: [{ $ref: "#" }] }
				},
				dependencies: {
					exclusiveMaximum: ["maximum"],
					exclusiveMinimum: ["minimum"]
				},
				default: {}
			},
			"http://json-schema.org/draft-07/schema#": {
				definitions: {
					schemaArray: {
						type: "array",
						minItems: 1,
						items: { $ref: "#" }
					},
					nonNegativeInteger: {
						type: "integer",
						minimum: 0
					},
					nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] },
					simpleTypes: { enum: [
						"array",
						"boolean",
						"integer",
						"null",
						"number",
						"object",
						"string"
					] },
					stringArray: {
						type: "array",
						items: { type: "string" },
						uniqueItems: !0,
						default: []
					}
				},
				type: ["object", "boolean"],
				properties: {
					$id: {
						type: "string",
						format: "uri-reference"
					},
					$schema: {
						type: "string",
						format: "uri"
					},
					$ref: {
						type: "string",
						format: "uri-reference"
					},
					$comment: { type: "string" },
					title: { type: "string" },
					description: { type: "string" },
					default: !0,
					readOnly: {
						type: "boolean",
						default: !1
					},
					examples: {
						type: "array",
						items: !0
					},
					multipleOf: {
						type: "number",
						exclusiveMinimum: 0
					},
					maximum: { type: "number" },
					exclusiveMaximum: { type: "number" },
					minimum: { type: "number" },
					exclusiveMinimum: { type: "number" },
					maxLength: { $ref: "#/definitions/nonNegativeInteger" },
					minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
					pattern: {
						type: "string",
						format: "regex"
					},
					additionalItems: { $ref: "#" },
					items: {
						anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
						default: !0
					},
					maxItems: { $ref: "#/definitions/nonNegativeInteger" },
					minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
					uniqueItems: {
						type: "boolean",
						default: !1
					},
					contains: { $ref: "#" },
					maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
					minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
					required: { $ref: "#/definitions/stringArray" },
					additionalProperties: { $ref: "#" },
					definitions: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					properties: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					patternProperties: {
						type: "object",
						additionalProperties: { $ref: "#" },
						propertyNames: { format: "regex" },
						default: {}
					},
					dependencies: {
						type: "object",
						additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
					},
					propertyNames: { $ref: "#" },
					const: !0,
					enum: {
						type: "array",
						items: !0,
						minItems: 1,
						uniqueItems: !0
					},
					type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
						type: "array",
						items: { $ref: "#/definitions/simpleTypes" },
						minItems: 1,
						uniqueItems: !0
					}] },
					format: { type: "string" },
					contentMediaType: { type: "string" },
					contentEncoding: { type: "string" },
					if: { $ref: "#" },
					then: { $ref: "#" },
					else: { $ref: "#" },
					allOf: { $ref: "#/definitions/schemaArray" },
					anyOf: { $ref: "#/definitions/schemaArray" },
					oneOf: { $ref: "#/definitions/schemaArray" },
					not: { $ref: "#" }
				},
				default: !0
			}
		}
	}, V0 = {
		id: C("A unique identifier for the schema."),
		$schema: C("The schema to verify this document against."),
		title: C("A descriptive title of the element."),
		description: C("A long description of the element. Used in hover menus and suggestions."),
		default: C("A default value. Used by suggestions."),
		multipleOf: C("A number that should cleanly divide the current value (i.e. have no remainder)."),
		maximum: C("The maximum numerical value, inclusive by default."),
		exclusiveMaximum: C("Makes the maximum property exclusive."),
		minimum: C("The minimum numerical value, inclusive by default."),
		exclusiveMinimum: C("Makes the minimum property exclusive."),
		maxLength: C("The maximum length of a string."),
		minLength: C("The minimum length of a string."),
		pattern: C("A regular expression to match the string against. It is not implicitly anchored."),
		additionalItems: C("For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."),
		items: C("For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
		maxItems: C("The maximum number of items that can be inside an array. Inclusive."),
		minItems: C("The minimum number of items that can be inside an array. Inclusive."),
		uniqueItems: C("If all of the items in the array must be unique. Defaults to false."),
		maxProperties: C("The maximum number of properties an object can have. Inclusive."),
		minProperties: C("The minimum number of properties an object can have. Inclusive."),
		required: C("An array of strings that lists the names of all properties required on this object."),
		additionalProperties: C("Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."),
		definitions: C("Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
		properties: C("A map of property names to schemas for each property."),
		patternProperties: C("A map of regular expressions on property names to schemas for matching properties."),
		dependencies: C("A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
		enum: C("The set of literal values that are valid."),
		type: C("Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
		format: C("Describes the format expected for the value."),
		allOf: C("An array of schemas, all of which must match."),
		anyOf: C("An array of schemas, where at least one must match."),
		oneOf: C("An array of schemas, exactly one of which must match."),
		not: C("A schema which must not match."),
		$id: C("A unique identifier for the schema."),
		$ref: C("Reference a definition hosted on any location."),
		$comment: C("Comments from schema authors to readers or maintainers of the schema."),
		readOnly: C("Indicates that the value of the instance is managed exclusively by the owning authority."),
		examples: C("Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
		contains: C("An array instance is valid against \"contains\" if at least one of its elements is valid against the given schema."),
		propertyNames: C("If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
		const: C("An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
		contentMediaType: C("Describes the media type of a string property."),
		contentEncoding: C("Describes the content encoding of a string property."),
		if: C("The validation outcome of the \"if\" subschema controls which of the \"then\" or \"else\" keywords are evaluated."),
		then: C("The \"if\" subschema is used for validation when the \"if\" subschema succeeds."),
		else: C("The \"else\" subschema is used for validation when the \"if\" subschema fails.")
	};
	for (const e in si.schemas) {
		const t = si.schemas[e];
		for (const n in t.properties) {
			let r = t.properties[n];
			typeof r == "boolean" && (r = t.properties[n] = {});
			const i = V0[n];
			i && (r.description = i);
		}
	}
	var ho;
	(() => {
		var e = { 470: (i) => {
			function s(o) {
				if (typeof o != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(o));
			}
			function a(o, c) {
				for (var h, f = "", m = 0, g = -1, d = 0, p = 0; p <= o.length; ++p) {
					if (p < o.length) h = o.charCodeAt(p);
					else {
						if (h === 47) break;
						h = 47;
					}
					if (h === 47) {
						if (!(g === p - 1 || d === 1)) if (g !== p - 1 && d === 2) {
							if (f.length < 2 || m !== 2 || f.charCodeAt(f.length - 1) !== 46 || f.charCodeAt(f.length - 2) !== 46) {
								if (f.length > 2) {
									var y = f.lastIndexOf("/");
									if (y !== f.length - 1) {
										y === -1 ? (f = "", m = 0) : m = (f = f.slice(0, y)).length - 1 - f.lastIndexOf("/"), g = p, d = 0;
										continue;
									}
								} else if (f.length === 2 || f.length === 1) {
									f = "", m = 0, g = p, d = 0;
									continue;
								}
							}
							c && (f.length > 0 ? f += "/.." : f = "..", m = 2);
						} else f.length > 0 ? f += "/" + o.slice(g + 1, p) : f = o.slice(g + 1, p), m = p - g - 1;
						g = p, d = 0;
					} else h === 46 && d !== -1 ? ++d : d = -1;
				}
				return f;
			}
			var l = {
				resolve: function() {
					for (var o, c = "", h = !1, f = arguments.length - 1; f >= -1 && !h; f--) {
						var m;
						f >= 0 ? m = arguments[f] : (o === void 0 && (o = process.cwd()), m = o), s(m), m.length !== 0 && (c = m + "/" + c, h = m.charCodeAt(0) === 47);
					}
					return c = a(c, !h), h ? c.length > 0 ? "/" + c : "/" : c.length > 0 ? c : ".";
				},
				normalize: function(o) {
					if (s(o), o.length === 0) return ".";
					var c = o.charCodeAt(0) === 47, h = o.charCodeAt(o.length - 1) === 47;
					return (o = a(o, !c)).length !== 0 || c || (o = "."), o.length > 0 && h && (o += "/"), c ? "/" + o : o;
				},
				isAbsolute: function(o) {
					return s(o), o.length > 0 && o.charCodeAt(0) === 47;
				},
				join: function() {
					if (arguments.length === 0) return ".";
					for (var o, c = 0; c < arguments.length; ++c) {
						var h = arguments[c];
						s(h), h.length > 0 && (o === void 0 ? o = h : o += "/" + h);
					}
					return o === void 0 ? "." : l.normalize(o);
				},
				relative: function(o, c) {
					if (s(o), s(c), o === c || (o = l.resolve(o)) === (c = l.resolve(c))) return "";
					for (var h = 1; h < o.length && o.charCodeAt(h) === 47; ++h);
					for (var f = o.length, m = f - h, g = 1; g < c.length && c.charCodeAt(g) === 47; ++g);
					for (var d = c.length - g, p = m < d ? m : d, y = -1, L = 0; L <= p; ++L) {
						if (L === p) {
							if (d > p) {
								if (c.charCodeAt(g + L) === 47) return c.slice(g + L + 1);
								if (L === 0) return c.slice(g + L);
							} else m > p && (o.charCodeAt(h + L) === 47 ? y = L : L === 0 && (y = 0));
							break;
						}
						var _ = o.charCodeAt(h + L);
						if (_ !== c.charCodeAt(g + L)) break;
						_ === 47 && (y = L);
					}
					var b = "";
					for (L = h + y + 1; L <= f; ++L) L !== f && o.charCodeAt(L) !== 47 || (b.length === 0 ? b += ".." : b += "/..");
					return b.length > 0 ? b + c.slice(g + y) : (g += y, c.charCodeAt(g) === 47 && ++g, c.slice(g));
				},
				_makeLong: function(o) {
					return o;
				},
				dirname: function(o) {
					if (s(o), o.length === 0) return ".";
					for (var c = o.charCodeAt(0), h = c === 47, f = -1, m = !0, g = o.length - 1; g >= 1; --g) if ((c = o.charCodeAt(g)) === 47) {
						if (!m) {
							f = g;
							break;
						}
					} else m = !1;
					return f === -1 ? h ? "/" : "." : h && f === 1 ? "//" : o.slice(0, f);
				},
				basename: function(o, c) {
					if (c !== void 0 && typeof c != "string") throw new TypeError("\"ext\" argument must be a string");
					s(o);
					var h, f = 0, m = -1, g = !0;
					if (c !== void 0 && c.length > 0 && c.length <= o.length) {
						if (c.length === o.length && c === o) return "";
						var d = c.length - 1, p = -1;
						for (h = o.length - 1; h >= 0; --h) {
							var y = o.charCodeAt(h);
							if (y === 47) {
								if (!g) {
									f = h + 1;
									break;
								}
							} else p === -1 && (g = !1, p = h + 1), d >= 0 && (y === c.charCodeAt(d) ? --d == -1 && (m = h) : (d = -1, m = p));
						}
						return f === m ? m = p : m === -1 && (m = o.length), o.slice(f, m);
					}
					for (h = o.length - 1; h >= 0; --h) if (o.charCodeAt(h) === 47) {
						if (!g) {
							f = h + 1;
							break;
						}
					} else m === -1 && (g = !1, m = h + 1);
					return m === -1 ? "" : o.slice(f, m);
				},
				extname: function(o) {
					s(o);
					for (var c = -1, h = 0, f = -1, m = !0, g = 0, d = o.length - 1; d >= 0; --d) {
						var p = o.charCodeAt(d);
						if (p !== 47) f === -1 && (m = !1, f = d + 1), p === 46 ? c === -1 ? c = d : g !== 1 && (g = 1) : c !== -1 && (g = -1);
						else if (!m) {
							h = d + 1;
							break;
						}
					}
					return c === -1 || f === -1 || g === 0 || g === 1 && c === f - 1 && c === h + 1 ? "" : o.slice(c, f);
				},
				format: function(o) {
					if (o === null || typeof o != "object") throw new TypeError("The \"pathObject\" argument must be of type Object. Received type " + typeof o);
					return (function(c, h) {
						var f = h.dir || h.root, m = h.base || (h.name || "") + (h.ext || "");
						return f ? f === h.root ? f + m : f + "/" + m : m;
					})(0, o);
				},
				parse: function(o) {
					s(o);
					var c = {
						root: "",
						dir: "",
						base: "",
						ext: "",
						name: ""
					};
					if (o.length === 0) return c;
					var h, f = o.charCodeAt(0), m = f === 47;
					m ? (c.root = "/", h = 1) : h = 0;
					for (var g = -1, d = 0, p = -1, y = !0, L = o.length - 1, _ = 0; L >= h; --L) if ((f = o.charCodeAt(L)) !== 47) p === -1 && (y = !1, p = L + 1), f === 46 ? g === -1 ? g = L : _ !== 1 && (_ = 1) : g !== -1 && (_ = -1);
					else if (!y) {
						d = L + 1;
						break;
					}
					return g === -1 || p === -1 || _ === 0 || _ === 1 && g === p - 1 && g === d + 1 ? p !== -1 && (c.base = c.name = d === 0 && m ? o.slice(1, p) : o.slice(d, p)) : (d === 0 && m ? (c.name = o.slice(1, g), c.base = o.slice(1, p)) : (c.name = o.slice(d, g), c.base = o.slice(d, p)), c.ext = o.slice(g, p)), d > 0 ? c.dir = o.slice(0, d - 1) : m && (c.dir = "/"), c;
				},
				sep: "/",
				delimiter: ":",
				win32: null,
				posix: null
			};
			l.posix = l, i.exports = l;
		} }, t = {};
		function n(i) {
			var s = t[i];
			if (s !== void 0) return s.exports;
			var a = t[i] = { exports: {} };
			return e[i](a, a.exports, n), a.exports;
		}
		n.d = (i, s) => {
			for (var a in s) n.o(s, a) && !n.o(i, a) && Object.defineProperty(i, a, {
				enumerable: !0,
				get: s[a]
			});
		}, n.o = (i, s) => Object.prototype.hasOwnProperty.call(i, s), n.r = (i) => {
			typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
		};
		var r = {};
		(() => {
			let i;
			n.r(r), n.d(r, {
				URI: () => m,
				Utils: () => D
			}), typeof process == "object" ? i = process.platform === "win32" : typeof navigator == "object" && (i = navigator.userAgent.indexOf("Windows") >= 0);
			const s = /^\w[\w\d+.-]*$/, a = /^\//, l = /^\/\//;
			function o(T, R) {
				if (!T.scheme && R) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${T.authority}", path: "${T.path}", query: "${T.query}", fragment: "${T.fragment}"}`);
				if (T.scheme && !s.test(T.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
				if (T.path) {
					if (T.authority) {
						if (!a.test(T.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
					} else if (l.test(T.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
				}
			}
			const c = "", h = "/", f = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
			class m {
				static isUri(R) {
					return R instanceof m || !!R && typeof R.authority == "string" && typeof R.fragment == "string" && typeof R.path == "string" && typeof R.query == "string" && typeof R.scheme == "string" && typeof R.fsPath == "string" && typeof R.with == "function" && typeof R.toString == "function";
				}
				scheme;
				authority;
				path;
				query;
				fragment;
				constructor(R, M, E, V, I, F = !1) {
					typeof R == "object" ? (this.scheme = R.scheme || c, this.authority = R.authority || c, this.path = R.path || c, this.query = R.query || c, this.fragment = R.fragment || c) : (this.scheme = (function(O, U) {
						return O || U ? O : "file";
					})(R, F), this.authority = M || c, this.path = (function(O, U) {
						switch (O) {
							case "https":
							case "http":
							case "file": U ? U[0] !== h && (U = h + U) : U = h;
						}
						return U;
					})(this.scheme, E || c), this.query = V || c, this.fragment = I || c, o(this, F));
				}
				get fsPath() {
					return _(this);
				}
				with(R) {
					if (!R) return this;
					let { scheme: M, authority: E, path: V, query: I, fragment: F } = R;
					return M === void 0 ? M = this.scheme : M === null && (M = c), E === void 0 ? E = this.authority : E === null && (E = c), V === void 0 ? V = this.path : V === null && (V = c), I === void 0 ? I = this.query : I === null && (I = c), F === void 0 ? F = this.fragment : F === null && (F = c), M === this.scheme && E === this.authority && V === this.path && I === this.query && F === this.fragment ? this : new d(M, E, V, I, F);
				}
				static parse(R, M = !1) {
					const E = f.exec(R);
					return E ? new d(E[2] || c, S(E[4] || c), S(E[5] || c), S(E[7] || c), S(E[9] || c), M) : new d(c, c, c, c, c);
				}
				static file(R) {
					let M = c;
					if (i && (R = R.replace(/\\/g, h)), R[0] === h && R[1] === h) {
						const E = R.indexOf(h, 2);
						E === -1 ? (M = R.substring(2), R = h) : (M = R.substring(2, E), R = R.substring(E) || h);
					}
					return new d("file", M, R, c, c);
				}
				static from(R) {
					const M = new d(R.scheme, R.authority, R.path, R.query, R.fragment);
					return o(M, !0), M;
				}
				toString(R = !1) {
					return b(this, R);
				}
				toJSON() {
					return this;
				}
				static revive(R) {
					if (R) {
						if (R instanceof m) return R;
						{
							const M = new d(R);
							return M._formatted = R.external, M._fsPath = R._sep === g ? R.fsPath : null, M;
						}
					}
					return R;
				}
			}
			const g = i ? 1 : void 0;
			class d extends m {
				_formatted = null;
				_fsPath = null;
				get fsPath() {
					return this._fsPath || (this._fsPath = _(this)), this._fsPath;
				}
				toString(R = !1) {
					return R ? b(this, !0) : (this._formatted || (this._formatted = b(this, !1)), this._formatted);
				}
				toJSON() {
					const R = { $mid: 1 };
					return this._fsPath && (R.fsPath = this._fsPath, R._sep = g), this._formatted && (R.external = this._formatted), this.path && (R.path = this.path), this.scheme && (R.scheme = this.scheme), this.authority && (R.authority = this.authority), this.query && (R.query = this.query), this.fragment && (R.fragment = this.fragment), R;
				}
			}
			const p = {
				58: "%3A",
				47: "%2F",
				63: "%3F",
				35: "%23",
				91: "%5B",
				93: "%5D",
				64: "%40",
				33: "%21",
				36: "%24",
				38: "%26",
				39: "%27",
				40: "%28",
				41: "%29",
				42: "%2A",
				43: "%2B",
				44: "%2C",
				59: "%3B",
				61: "%3D",
				32: "%20"
			};
			function y(T, R, M) {
				let E, V = -1;
				for (let I = 0; I < T.length; I++) {
					const F = T.charCodeAt(I);
					if (F >= 97 && F <= 122 || F >= 65 && F <= 90 || F >= 48 && F <= 57 || F === 45 || F === 46 || F === 95 || F === 126 || R && F === 47 || M && F === 91 || M && F === 93 || M && F === 58) V !== -1 && (E += encodeURIComponent(T.substring(V, I)), V = -1), E !== void 0 && (E += T.charAt(I));
					else {
						E === void 0 && (E = T.substr(0, I));
						const O = p[F];
						O !== void 0 ? (V !== -1 && (E += encodeURIComponent(T.substring(V, I)), V = -1), E += O) : V === -1 && (V = I);
					}
				}
				return V !== -1 && (E += encodeURIComponent(T.substring(V))), E !== void 0 ? E : T;
			}
			function L(T) {
				let R;
				for (let M = 0; M < T.length; M++) {
					const E = T.charCodeAt(M);
					E === 35 || E === 63 ? (R === void 0 && (R = T.substr(0, M)), R += p[E]) : R !== void 0 && (R += T[M]);
				}
				return R !== void 0 ? R : T;
			}
			function _(T, R) {
				let M;
				return M = T.authority && T.path.length > 1 && T.scheme === "file" ? `//${T.authority}${T.path}` : T.path.charCodeAt(0) === 47 && (T.path.charCodeAt(1) >= 65 && T.path.charCodeAt(1) <= 90 || T.path.charCodeAt(1) >= 97 && T.path.charCodeAt(1) <= 122) && T.path.charCodeAt(2) === 58 ? T.path[1].toLowerCase() + T.path.substr(2) : T.path, i && (M = M.replace(/\//g, "\\")), M;
			}
			function b(T, R) {
				const M = R ? L : y;
				let E = "", { scheme: V, authority: I, path: F, query: O, fragment: U } = T;
				if (V && (E += V, E += ":"), (I || V === "file") && (E += h, E += h), I) {
					let z = I.indexOf("@");
					if (z !== -1) {
						const Q = I.substr(0, z);
						I = I.substr(z + 1), z = Q.lastIndexOf(":"), z === -1 ? E += M(Q, !1, !1) : (E += M(Q.substr(0, z), !1, !1), E += ":", E += M(Q.substr(z + 1), !1, !0)), E += "@";
					}
					I = I.toLowerCase(), z = I.lastIndexOf(":"), z === -1 ? E += M(I, !1, !0) : (E += M(I.substr(0, z), !1, !0), E += I.substr(z));
				}
				if (F) {
					if (F.length >= 3 && F.charCodeAt(0) === 47 && F.charCodeAt(2) === 58) {
						const z = F.charCodeAt(1);
						z >= 65 && z <= 90 && (F = `/${String.fromCharCode(z + 32)}:${F.substr(3)}`);
					} else if (F.length >= 2 && F.charCodeAt(1) === 58) {
						const z = F.charCodeAt(0);
						z >= 65 && z <= 90 && (F = `${String.fromCharCode(z + 32)}:${F.substr(2)}`);
					}
					E += M(F, !0, !1);
				}
				return O && (E += "?", E += M(O, !1, !1)), U && (E += "#", E += R ? U : y(U, !1, !1)), E;
			}
			function N(T) {
				try {
					return decodeURIComponent(T);
				} catch {
					return T.length > 3 ? T.substr(0, 3) + N(T.substr(3)) : T;
				}
			}
			const v = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
			function S(T) {
				return T.match(v) ? T.replace(v, ((R) => N(R))) : T;
			}
			var w = n(470);
			const k = w.posix || w, P = "/";
			var D;
			(function(T) {
				T.joinPath = function(R, ...M) {
					return R.with({ path: k.join(R.path, ...M) });
				}, T.resolvePath = function(R, ...M) {
					let E = R.path, V = !1;
					E[0] !== P && (E = P + E, V = !0);
					let I = k.resolve(E, ...M);
					return V && I[0] === P && !R.authority && (I = I.substring(1)), R.with({ path: I });
				}, T.dirname = function(R) {
					if (R.path.length === 0 || R.path === P) return R;
					let M = k.dirname(R.path);
					return M.length === 1 && M.charCodeAt(0) === 46 && (M = ""), R.with({ path: M });
				}, T.basename = function(R) {
					return k.basename(R.path);
				}, T.extname = function(R) {
					return k.extname(R.path);
				};
			})(D || (D = {}));
		})(), ho = r;
	})();
	const { URI: Et, Utils: If } = ho;
	function D0(e, t) {
		if (typeof e != "string") throw new TypeError("Expected a string");
		const n = String(e);
		let r = "";
		const i = !!t, s = !!t;
		let a = !1;
		const l = t && typeof t.flags == "string" ? t.flags : "";
		let o;
		for (let c = 0, h = n.length; c < h; c++) switch (o = n[c], o) {
			case "/":
			case "$":
			case "^":
			case "+":
			case ".":
			case "(":
			case ")":
			case "=":
			case "!":
			case "|":
				r += "\\" + o;
				break;
			case "?": if (i) {
				r += ".";
				break;
			}
			case "[":
			case "]": if (i) {
				r += o;
				break;
			}
			case "{": if (i) {
				a = !0, r += "(";
				break;
			}
			case "}": if (i) {
				a = !1, r += ")";
				break;
			}
			case ",":
				if (a) {
					r += "|";
					break;
				}
				r += "\\" + o;
				break;
			case "*":
				const f = n[c - 1];
				let m = 1;
				for (; n[c + 1] === "*";) m++, c++;
				const g = n[c + 1];
				s ? m > 1 && (f === "/" || f === void 0 || f === "{" || f === ",") && (g === "/" || g === void 0 || g === "," || g === "}") ? (g === "/" ? c++ : f === "/" && r.endsWith("\\/") && (r = r.substr(0, r.length - 2)), r += "((?:[^/]*(?:/|$))*)") : r += "([^/]*)" : r += ".*";
				break;
			default: r += o;
		}
		return (!l || !~l.indexOf("g")) && (r = "^" + r + "$"), new RegExp(r, l);
	}
	const O0 = "!", $0 = "/";
	var B0 = class {
		constructor(e, t, n) {
			this.folderUri = t, this.uris = n, this.globWrappers = [];
			try {
				for (let r of e) {
					const i = r[0] !== O0;
					i || (r = r.substring(1)), r.length > 0 && (r[0] === $0 && (r = r.substring(1)), this.globWrappers.push({
						regexp: D0("**/" + r, {
							extended: !0,
							globstar: !0
						}),
						include: i
					}));
				}
				t && (t = go(t), t.endsWith("/") || (t = t + "/"), this.folderUri = t);
			} catch {
				this.globWrappers.length = 0, this.uris = [];
			}
		}
		matchesPattern(e) {
			if (this.folderUri && !e.startsWith(this.folderUri)) return !1;
			let t = !1;
			for (const { regexp: n, include: r } of this.globWrappers) n.test(e) && (t = r);
			return t;
		}
		getURIs() {
			return this.uris;
		}
	}, U0 = class {
		constructor(e, t, n) {
			this.service = e, this.uri = t, this.dependencies = /* @__PURE__ */ new Set(), this.anchors = void 0, n && (this.unresolvedSchema = this.service.promise.resolve(new Yt(n)));
		}
		getUnresolvedSchema() {
			return this.unresolvedSchema || (this.unresolvedSchema = this.service.loadSchema(this.uri)), this.unresolvedSchema;
		}
		getResolvedSchema() {
			return this.resolvedSchema || (this.resolvedSchema = this.getUnresolvedSchema().then((e) => this.service.resolveSchemaContent(e, this))), this.resolvedSchema;
		}
		clearSchema() {
			const e = !!this.unresolvedSchema;
			return this.resolvedSchema = void 0, this.unresolvedSchema = void 0, this.dependencies.clear(), this.anchors = void 0, e;
		}
	}, Yt = class {
		constructor(e, t = []) {
			this.schema = e, this.errors = t;
		}
	}, mo = class {
		constructor(e, t = [], n = [], r) {
			this.schema = e, this.errors = t, this.warnings = n, this.schemaDraft = r;
		}
		getSection(e) {
			const t = this.getSectionRecursive(e, this.schema);
			if (t) return Ne(t);
		}
		getSectionRecursive(e, t) {
			if (!t || typeof t == "boolean" || e.length === 0) return t;
			const n = e.shift();
			if (t.properties && typeof t.properties[n]) return this.getSectionRecursive(e, t.properties[n]);
			if (t.patternProperties) {
				for (const r of Object.keys(t.patternProperties)) if (En(r)?.test(n)) return this.getSectionRecursive(e, t.patternProperties[r]);
			} else {
				if (typeof t.additionalProperties == "object") return this.getSectionRecursive(e, t.additionalProperties);
				if (n.match("[0-9]+")) {
					if (Array.isArray(t.items)) {
						const r = parseInt(n, 10);
						if (!isNaN(r) && t.items[r]) return this.getSectionRecursive(e, t.items[r]);
					} else if (t.items) return this.getSectionRecursive(e, t.items);
				}
			}
		}
	}, q0 = class {
		constructor(e, t, n) {
			this.contextService = t, this.requestService = e, this.promiseConstructor = n || Promise, this.callOnDispose = [], this.contributionSchemas = {}, this.contributionAssociations = [], this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {};
		}
		getRegisteredSchemaIds(e) {
			return Object.keys(this.registeredSchemasIds).filter((t) => {
				const n = Et.parse(t).scheme;
				return n !== "schemaservice" && (!e || e(n));
			});
		}
		get promise() {
			return this.promiseConstructor;
		}
		dispose() {
			for (; this.callOnDispose.length > 0;) this.callOnDispose.pop()();
		}
		onResourceChange(e) {
			this.cachedSchemaForResource = void 0;
			let t = !1;
			e = Ye(e);
			const n = [e], r = Object.keys(this.schemasById).map((i) => this.schemasById[i]);
			for (; n.length;) {
				const i = n.pop();
				for (let s = 0; s < r.length; s++) {
					const a = r[s];
					a && (a.uri === i || a.dependencies.has(i)) && (a.uri !== i && n.push(a.uri), a.clearSchema() && (t = !0), r[s] = void 0);
				}
			}
			return t;
		}
		setSchemaContributions(e) {
			if (e.schemas) {
				const t = e.schemas;
				for (const n in t) {
					const r = Ye(n);
					this.contributionSchemas[r] = this.addSchemaHandle(r, t[n]);
				}
			}
			if (Array.isArray(e.schemaAssociations)) {
				const t = e.schemaAssociations;
				for (let n of t) {
					const r = n.uris.map(Ye), i = this.addFilePatternAssociation(n.pattern, n.folderUri, r);
					this.contributionAssociations.push(i);
				}
			}
		}
		addSchemaHandle(e, t) {
			const n = new U0(this, e, t);
			return this.schemasById[e] = n, n;
		}
		getOrAddSchemaHandle(e, t) {
			return this.schemasById[e] || this.addSchemaHandle(e, t);
		}
		addFilePatternAssociation(e, t, n) {
			const r = new B0(e, t, n);
			return this.filePatternAssociations.push(r), r;
		}
		registerExternalSchema(e) {
			const t = Ye(e.uri);
			return this.registeredSchemasIds[t] = !0, this.cachedSchemaForResource = void 0, e.fileMatch && e.fileMatch.length && this.addFilePatternAssociation(e.fileMatch, e.folderUri, [t]), e.schema ? this.addSchemaHandle(t, e.schema) : this.getOrAddSchemaHandle(t);
		}
		clearExternalSchemas() {
			this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {}, this.cachedSchemaForResource = void 0;
			for (const e in this.contributionSchemas) this.schemasById[e] = this.contributionSchemas[e], this.registeredSchemasIds[e] = !0;
			for (const e of this.contributionAssociations) this.filePatternAssociations.push(e);
		}
		getResolvedSchema(e) {
			const t = Ye(e), n = this.schemasById[t];
			return n ? n.getResolvedSchema() : this.promise.resolve(void 0);
		}
		loadSchema(e) {
			if (!this.requestService) {
				const t = C("Unable to load schema from '{0}'. No schema request service available", Zt(e));
				return this.promise.resolve(new Yt({}, [t]));
			}
			return e.startsWith("http://json-schema.org/") && (e = "https" + e.substring(4)), this.requestService(e).then((t) => {
				if (!t) return new Yt({}, [C("Unable to load schema from '{0}': No content.", Zt(e))]);
				const n = [];
				t.charCodeAt(0) === 65279 && (n.push(C("Problem reading content from '{0}': UTF-8 with BOM detected, only UTF 8 is allowed.", Zt(e))), t = t.trimStart());
				let r = {};
				const i = [];
				return r = o0(t, i), i.length && n.push(C("Unable to parse content from '{0}': Parse error at offset {1}.", Zt(e), i[0].offset)), new Yt(r, n);
			}, (t) => {
				let n = t.toString();
				const r = t.toString().split("Error: ");
				return r.length > 1 && (n = r[1]), Gt(n, ".") && (n = n.substr(0, n.length - 1)), new Yt({}, [C("Unable to load schema from '{0}': {1}.", Zt(e), n)]);
			});
		}
		resolveSchemaContent(e, t) {
			const n = e.errors.slice(0), r = e.schema;
			let i = r.$schema ? Ye(r.$schema) : void 0;
			if (i === "http://json-schema.org/draft-03/schema") return this.promise.resolve(new mo({}, [C("Draft-03 schemas are not supported.")], [], i));
			let s = /* @__PURE__ */ new Set();
			const a = this.contextService, l = (d, p) => {
				p = decodeURIComponent(p);
				let y = d;
				return p[0] === "/" && (p = p.substring(1)), p.split("/").some((L) => (L = L.replace(/~1/g, "/").replace(/~0/g, "~"), y = y[L], !y)), y;
			}, o = (d, p, y) => (p.anchors || (p.anchors = g(d)), p.anchors.get(y)), c = (d, p) => {
				for (const y in p) p.hasOwnProperty(y) && y !== "id" && y !== "$id" && (d[y] = p[y]);
			}, h = (d, p, y, L) => {
				let _;
				L === void 0 || L.length === 0 ? _ = p : L.charAt(0) === "/" ? _ = l(p, L) : _ = o(p, y, L), _ ? c(d, _) : n.push(C("$ref '{0}' in '{1}' can not be resolved.", L || "", y.uri));
			}, f = (d, p, y, L) => {
				a && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/\/.*/.test(p) && (p = a.resolveRelativePath(p, L.uri)), p = Ye(p);
				const _ = this.getOrAddSchemaHandle(p);
				return _.getUnresolvedSchema().then((b) => {
					if (L.dependencies.add(p), b.errors.length) {
						const N = y ? p + "#" + y : p;
						n.push(C("Problems loading reference '{0}': {1}", N, b.errors[0]));
					}
					return h(d, b.schema, _, y), m(d, b.schema, _);
				});
			}, m = (d, p, y) => {
				const L = [];
				return this.traverseNodes(d, (_) => {
					const b = /* @__PURE__ */ new Set();
					for (; _.$ref;) {
						const N = _.$ref, v = N.split("#", 2);
						if (delete _.$ref, v[0].length > 0) {
							L.push(f(_, v[0], v[1], y));
							return;
						} else if (!b.has(N)) {
							const S = v[1];
							h(_, p, y, S), b.add(N);
						}
					}
					_.$recursiveRef && s.add("$recursiveRef"), _.$dynamicRef && s.add("$dynamicRef");
				}), this.promise.all(L);
			}, g = (d) => {
				const p = /* @__PURE__ */ new Map();
				return this.traverseNodes(d, (y) => {
					const L = y.$id || y.id, _ = ra(L) && L.charAt(0) === "#" ? L.substring(1) : y.$anchor;
					_ && (p.has(_) ? n.push(C("Duplicate anchor declaration: '{0}'", _)) : p.set(_, y)), y.$recursiveAnchor && s.add("$recursiveAnchor"), y.$dynamicAnchor && s.add("$dynamicAnchor");
				}), p;
			};
			return m(r, r, t).then((d) => {
				let p = [];
				return s.size && p.push(C("The schema uses meta-schema features ({0}) that are not yet supported by the validator.", Array.from(s.keys()).join(", "))), new mo(r, n, p, i);
			});
		}
		traverseNodes(e, t) {
			if (!e || typeof e != "object") return Promise.resolve(null);
			const n = /* @__PURE__ */ new Set(), r = (...c) => {
				for (const h of c) Xe(h) && l.push(h);
			}, i = (...c) => {
				for (const h of c) if (Xe(h)) for (const f in h) {
					const m = h[f];
					Xe(m) && l.push(m);
				}
			}, s = (...c) => {
				for (const h of c) if (Array.isArray(h)) for (const f of h) Xe(f) && l.push(f);
			}, a = (c) => {
				if (Array.isArray(c)) for (const h of c) Xe(h) && l.push(h);
				else Xe(c) && l.push(c);
			}, l = [e];
			let o = l.pop();
			for (; o;) n.has(o) || (n.add(o), t(o), r(o.additionalItems, o.additionalProperties, o.not, o.contains, o.propertyNames, o.if, o.then, o.else, o.unevaluatedItems, o.unevaluatedProperties), i(o.definitions, o.$defs, o.properties, o.patternProperties, o.dependencies, o.dependentSchemas), s(o.anyOf, o.allOf, o.oneOf, o.prefixItems), a(o.items)), o = l.pop();
		}
		getSchemaFromProperty(e, t) {
			if (t.root?.type === "object") {
				for (const n of t.root.properties) if (n.keyNode.value === "$schema" && n.valueNode?.type === "string") {
					let r = n.valueNode.value;
					return this.contextService && !/^\w[\w\d+.-]*:/.test(r) && (r = this.contextService.resolveRelativePath(r, e)), r;
				}
			}
		}
		getAssociatedSchemas(e) {
			const t = Object.create(null), n = [], r = go(e);
			for (const i of this.filePatternAssociations) if (i.matchesPattern(r)) for (const s of i.getURIs()) t[s] || (n.push(s), t[s] = !0);
			return n;
		}
		getSchemaURIsForResource(e, t) {
			let n = t && this.getSchemaFromProperty(e, t);
			return n ? [n] : this.getAssociatedSchemas(e);
		}
		getSchemaForResource(e, t) {
			if (t) {
				let i = this.getSchemaFromProperty(e, t);
				if (i) {
					const s = Ye(i);
					return this.getOrAddSchemaHandle(s).getResolvedSchema();
				}
			}
			if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === e) return this.cachedSchemaForResource.resolvedSchema;
			const n = this.getAssociatedSchemas(e), r = n.length > 0 ? this.createCombinedSchema(e, n).getResolvedSchema() : this.promise.resolve(void 0);
			return this.cachedSchemaForResource = {
				resource: e,
				resolvedSchema: r
			}, r;
		}
		createCombinedSchema(e, t) {
			if (t.length === 1) return this.getOrAddSchemaHandle(t[0]);
			{
				const n = "schemaservice://combinedSchema/" + encodeURIComponent(e), r = { allOf: t.map((i) => ({ $ref: i })) };
				return this.addSchemaHandle(n, r);
			}
		}
		getMatchingSchemas(e, t, n) {
			if (n) {
				const r = n.id || "schemaservice://untitled/matchingSchemas/" + j0++;
				return this.addSchemaHandle(r, n).getResolvedSchema().then((i) => t.getMatchingSchemas(i.schema).filter((s) => !s.inverted));
			}
			return this.getSchemaForResource(e.uri, t).then((r) => r ? t.getMatchingSchemas(r.schema).filter((i) => !i.inverted) : []);
		}
	};
	let j0 = 0;
	function Ye(e) {
		try {
			return Et.parse(e).toString(!0);
		} catch {
			return e;
		}
	}
	function go(e) {
		try {
			return Et.parse(e).with({
				fragment: null,
				query: null
			}).toString(!0);
		} catch {
			return e;
		}
	}
	function Zt(e) {
		try {
			const t = Et.parse(e);
			if (t.scheme === "file") return t.fsPath;
		} catch {}
		return e;
	}
	function W0(e, t) {
		const n = [], r = [], i = [];
		let s = -1;
		const a = it(e.getText(), !1);
		let l = a.scan();
		function o(d) {
			n.push(d), r.push(i.length);
		}
		for (; l !== 17;) {
			switch (l) {
				case 1:
				case 3: {
					const d = e.positionAt(a.getTokenOffset()).line, p = {
						startLine: d,
						endLine: d,
						kind: l === 1 ? "object" : "array"
					};
					i.push(p);
					break;
				}
				case 2:
				case 4: {
					const d = l === 2 ? "object" : "array";
					if (i.length > 0 && i[i.length - 1].kind === d) {
						const p = i.pop(), y = e.positionAt(a.getTokenOffset()).line;
						p && y > p.startLine + 1 && s !== p.startLine && (p.endLine = y - 1, o(p), s = p.startLine);
					}
					break;
				}
				case 13: {
					const d = e.positionAt(a.getTokenOffset()).line, p = e.positionAt(a.getTokenOffset() + a.getTokenLength()).line;
					a.getTokenError() === 1 && d + 1 < e.lineCount ? a.setPosition(e.offsetAt(K.create(d + 1, 0))) : d < p && (o({
						startLine: d,
						endLine: p,
						kind: Jt.Comment
					}), s = d);
					break;
				}
				case 12: {
					const d = e.getText().substr(a.getTokenOffset(), a.getTokenLength()).match(/^\/\/\s*#(region\b)|(endregion\b)/);
					if (d) {
						const p = e.positionAt(a.getTokenOffset()).line;
						if (d[1]) {
							const y = {
								startLine: p,
								endLine: p,
								kind: Jt.Region
							};
							i.push(y);
						} else {
							let y = i.length - 1;
							for (; y >= 0 && i[y].kind !== Jt.Region;) y--;
							if (y >= 0) {
								const L = i[y];
								i.length = y, p > L.startLine && s !== L.startLine && (L.endLine = p, o(L), s = L.startLine);
							}
						}
					}
					break;
				}
			}
			l = a.scan();
		}
		const c = t && t.rangeLimit;
		if (typeof c != "number" || n.length <= c) return n;
		t && t.onRangeLimitExceeded && t.onRangeLimitExceeded(e.uri);
		const h = [];
		for (let d of r) d < 30 && (h[d] = (h[d] || 0) + 1);
		let f = 0, m = 0;
		for (let d = 0; d < h.length; d++) {
			const p = h[d];
			if (p) {
				if (p + f > c) {
					m = d;
					break;
				}
				f += p;
			}
		}
		const g = [];
		for (let d = 0; d < n.length; d++) {
			const p = r[d];
			typeof p == "number" && (p < m || p === m && f++ < c) && g.push(n[d]);
		}
		return g;
	}
	function H0(e, t, n) {
		function r(l) {
			let o = e.offsetAt(l), c = n.getNodeFromOffset(o, !0);
			const h = [];
			for (; c;) {
				switch (c.type) {
					case "string":
					case "object":
					case "array":
						const m = c.offset + 1, g = c.offset + c.length - 1;
						m < g && o >= m && o <= g && h.push(i(m, g)), h.push(i(c.offset, c.offset + c.length));
						break;
					case "number":
					case "boolean":
					case "null":
					case "property": h.push(i(c.offset, c.offset + c.length));
				}
				if (c.type === "property" || c.parent && c.parent.type === "array") {
					const m = a(c.offset + c.length, 5);
					m !== -1 && h.push(i(c.offset, m));
				}
				c = c.parent;
			}
			let f;
			for (let m = h.length - 1; m >= 0; m--) f = Pn.create(h[m], f);
			return f || (f = Pn.create(H.create(l, l))), f;
		}
		function i(l, o) {
			return H.create(e.positionAt(l), e.positionAt(o));
		}
		const s = it(e.getText(), !0);
		function a(l, o) {
			return s.setPosition(l), s.scan() === o ? s.getTokenOffset() + s.getTokenLength() : -1;
		}
		return t.map(r);
	}
	function ai(e, t, n) {
		let r;
		if (n) {
			const s = e.offsetAt(n.start);
			r = {
				offset: s,
				length: e.offsetAt(n.end) - s
			};
		}
		const i = {
			tabSize: t ? t.tabSize : 4,
			insertSpaces: t?.insertSpaces === !0,
			insertFinalNewline: t?.insertFinalNewline === !0,
			eol: `
`,
			keepLines: t?.keepLines === !0
		};
		return f0(e.getText(), r, i).map((s) => Fe.replace(H.create(e.positionAt(s.offset), e.positionAt(s.offset + s.length)), s.content));
	}
	var se;
	(function(e) {
		e[e.Object = 0] = "Object", e[e.Array = 1] = "Array";
	})(se || (se = {}));
	var Fn = class {
		constructor(e, t) {
			this.propertyName = e ?? "", this.beginningLineNumber = t, this.childrenProperties = [], this.lastProperty = !1, this.noKeyName = !1;
		}
		addChildProperty(e) {
			if (e.parent = this, this.childrenProperties.length > 0) {
				let t = 0;
				e.noKeyName ? t = this.childrenProperties.length : t = G0(this.childrenProperties, e, z0), t < 0 && (t = t * -1 - 1), this.childrenProperties.splice(t, 0, e);
			} else this.childrenProperties.push(e);
			return e;
		}
	};
	function z0(e, t) {
		const n = e.propertyName.toLowerCase(), r = t.propertyName.toLowerCase();
		return n < r ? -1 : n > r ? 1 : 0;
	}
	function G0(e, t, n) {
		const r = t.propertyName.toLowerCase(), i = e[0].propertyName.toLowerCase(), s = e[e.length - 1].propertyName.toLowerCase();
		if (r < i) return 0;
		if (r > s) return e.length;
		let a = 0, l = e.length - 1;
		for (; a <= l;) {
			let o = l + a >> 1, c = n(t, e[o]);
			if (c > 0) a = o + 1;
			else if (c < 0) l = o - 1;
			else return o;
		}
		return -a - 1;
	}
	function J0(e, t) {
		const n = {
			...t,
			keepLines: !1
		}, r = Ee.applyEdits(e, ai(e, n, void 0)), i = Ee.create("test://test.json", "json", 0, r), s = Q0(i, X0(i)), a = ai(s, n, void 0), l = Ee.applyEdits(s, a);
		return [Fe.replace(H.create(K.create(0, 0), e.positionAt(e.getText().length)), l)];
	}
	function X0(e) {
		const t = e.getText(), n = it(t, !1);
		let r = new Fn(), i = r, s = r, a = r, l, o = 0, c = 0, h, f, m = -1, g = -1, d = 0, p = 0, y = [], L = !1, _ = !1;
		for (; (l = n.scan()) !== 17;) {
			if (L === !0 && l !== 14 && l !== 15 && l !== 12 && l !== 13 && s.endLineNumber === void 0) {
				let b = n.getTokenStartLine();
				f === 2 || f === 4 ? a.endLineNumber = b - 1 : s.endLineNumber = b - 1, d = b, L = !1;
			}
			if (_ === !0 && l !== 14 && l !== 15 && l !== 12 && l !== 13 && (d = n.getTokenStartLine(), _ = !1), n.getTokenStartLine() !== o) {
				for (let b = o; b < n.getTokenStartLine(); b++) {
					const N = e.getText(H.create(K.create(b, 0), K.create(b + 1, 0))).length;
					c = c + N;
				}
				o = n.getTokenStartLine();
			}
			switch (l) {
				case 10:
					if (h === void 0 || h === 1 || h === 5 && y[y.length - 1] === se.Object) {
						const b = new Fn(n.getTokenValue(), d);
						a = s, s = i.addChildProperty(b);
					}
					break;
				case 3:
					if (r.beginningLineNumber === void 0 && (r.beginningLineNumber = n.getTokenStartLine()), y[y.length - 1] === se.Object) i = s;
					else if (y[y.length - 1] === se.Array) {
						const b = new Fn(n.getTokenValue(), d);
						b.noKeyName = !0, a = s, s = i.addChildProperty(b), i = s;
					}
					y.push(se.Array), s.type = se.Array, d = n.getTokenStartLine(), d++;
					break;
				case 1:
					if (r.beginningLineNumber === void 0) r.beginningLineNumber = n.getTokenStartLine();
					else if (y[y.length - 1] === se.Array) {
						const b = new Fn(n.getTokenValue(), d);
						b.noKeyName = !0, a = s, s = i.addChildProperty(b);
					}
					s.type = se.Object, y.push(se.Object), i = s, d = n.getTokenStartLine(), d++;
					break;
				case 4:
					p = n.getTokenStartLine(), y.pop(), s.endLineNumber === void 0 && (h === 2 || h === 4) && (s.endLineNumber = p - 1, s.lastProperty = !0, s.lineWhereToAddComma = m, s.indexWhereToAddComa = g, a = s, s = s ? s.parent : void 0, i = s), r.endLineNumber = p, d = p + 1;
					break;
				case 2:
					p = n.getTokenStartLine(), y.pop(), h !== 1 && (s.endLineNumber === void 0 && (s.endLineNumber = p - 1, s.lastProperty = !0, s.lineWhereToAddComma = m, s.indexWhereToAddComa = g), a = s, s = s ? s.parent : void 0, i = s), r.endLineNumber = n.getTokenStartLine(), d = p + 1;
					break;
				case 5:
					p = n.getTokenStartLine(), s.endLineNumber === void 0 && (y[y.length - 1] === se.Object || y[y.length - 1] === se.Array && (h === 2 || h === 4)) && (s.endLineNumber = p, s.commaIndex = n.getTokenOffset() - c, s.commaLine = p), (h === 2 || h === 4) && (a = s, s = s ? s.parent : void 0, i = s), d = p + 1;
					break;
				case 13: h === 5 && m === n.getTokenStartLine() && (y[y.length - 1] === se.Array && (f === 2 || f === 4) || y[y.length - 1] === se.Object) && (y[y.length - 1] === se.Array && (f === 2 || f === 4) || y[y.length - 1] === se.Object) && (s.endLineNumber = void 0, L = !0), (h === 1 || h === 3) && m === n.getTokenStartLine() && (_ = !0);
			}
			l !== 14 && l !== 13 && l !== 12 && l !== 15 && (f = h, h = l, m = n.getTokenStartLine(), g = n.getTokenOffset() + n.getTokenLength() - c);
		}
		return r;
	}
	function Q0(e, t) {
		if (t.childrenProperties.length === 0) return e;
		const n = Ee.create("test://test.json", "json", 0, e.getText()), r = [];
		for (po(r, t, t.beginningLineNumber); r.length > 0;) {
			const i = r.shift(), s = i.propertyTreeArray;
			let a = i.beginningLineNumber;
			for (let l = 0; l < s.length; l++) {
				const o = s[l], c = H.create(K.create(o.beginningLineNumber, 0), K.create(o.endLineNumber + 1, 0)), h = e.getText(c), f = Ee.create("test://test.json", "json", 0, h);
				if (o.lastProperty === !0 && l !== s.length - 1) {
					const d = o.lineWhereToAddComma - o.beginningLineNumber, p = o.indexWhereToAddComa, y = {
						range: H.create(K.create(d, p), K.create(d, p)),
						text: ","
					};
					Ee.update(f, [y], 1);
				} else if (o.lastProperty === !1 && l === s.length - 1) {
					const d = o.commaIndex, p = o.commaLine - o.beginningLineNumber, y = {
						range: H.create(K.create(p, d), K.create(p, d + 1)),
						text: ""
					};
					Ee.update(f, [y], 1);
				}
				const m = o.endLineNumber - o.beginningLineNumber + 1, g = {
					range: H.create(K.create(a, 0), K.create(a + m, 0)),
					text: f.getText()
				};
				Ee.update(n, [g], 1), po(r, o, a), a = a + m;
			}
		}
		return n;
	}
	function po(e, t, n) {
		if (t.childrenProperties.length !== 0) if (t.type === se.Object) {
			let r = 1 / 0;
			for (const s of t.childrenProperties) s.beginningLineNumber < r && (r = s.beginningLineNumber);
			const i = r - t.beginningLineNumber;
			n = n + i, e.push(new yo(n, t.childrenProperties));
		} else t.type === se.Array && bo(e, t, n);
	}
	function bo(e, t, n) {
		for (const r of t.childrenProperties) {
			if (r.type === se.Object) {
				let i = 1 / 0;
				for (const a of r.childrenProperties) a.beginningLineNumber < i && (i = a.beginningLineNumber);
				const s = i - r.beginningLineNumber;
				e.push(new yo(n + r.beginningLineNumber - t.beginningLineNumber + s, r.childrenProperties));
			}
			r.type === se.Array && bo(e, r, n + r.beginningLineNumber - t.beginningLineNumber);
		}
	}
	var yo = class {
		constructor(e, t) {
			this.beginningLineNumber = e, this.propertyTreeArray = t;
		}
	};
	function Y0(e, t) {
		const n = [];
		return t.visit((r) => {
			if (r.type === "property" && r.keyNode.value === "$ref" && r.valueNode?.type === "string") {
				const i = r.valueNode.value, s = K0(t, i);
				if (s) {
					const a = e.positionAt(s.offset);
					n.push({
						target: `${e.uri}#${a.line + 1},${a.character + 1}`,
						range: Z0(e, r.valueNode)
					});
				}
			}
			return !0;
		}), Promise.resolve(n);
	}
	function Z0(e, t) {
		return H.create(e.positionAt(t.offset + 1), e.positionAt(t.offset + t.length - 1));
	}
	function K0(e, t) {
		const n = ef(t);
		return n ? oi(n, e.root) : null;
	}
	function oi(e, t) {
		if (!t) return null;
		if (e.length === 0) return t;
		const n = e.shift();
		if (t && t.type === "object") {
			const r = t.properties.find((i) => i.keyNode.value === n);
			return r ? oi(e, r.valueNode) : null;
		} else if (t && t.type === "array" && n.match(/^(0|[1-9][0-9]*)$/)) {
			const r = Number.parseInt(n), i = t.items[r];
			return i ? oi(e, i) : null;
		}
		return null;
	}
	function ef(e) {
		return e === "#" ? [] : e[0] !== "#" || e[1] !== "/" ? null : e.substring(2).split(/\//).map(tf);
	}
	function tf(e) {
		return e.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	function nf(e) {
		const t = e.promiseConstructor || Promise, n = new q0(e.schemaRequestService, e.workspaceContext, t);
		n.setSchemaContributions(si);
		const r = new k0(n, e.contributions, t, e.clientCapabilities), i = new R0(n, e.contributions, t), s = new F0(n), a = new T0(n, t);
		return {
			configure: (l) => {
				n.clearExternalSchemas(), l.schemas?.forEach(n.registerExternalSchema.bind(n)), a.configure(l);
			},
			resetSchema: (l) => n.onResourceChange(l),
			doValidation: a.doValidation.bind(a),
			getLanguageStatus: a.getLanguageStatus.bind(a),
			parseJSONDocument: (l) => x0(l, { collectComments: !0 }),
			newJSONDocument: (l, o) => A0(l, o),
			getMatchingSchemas: n.getMatchingSchemas.bind(n),
			doResolve: r.doResolve.bind(r),
			doComplete: r.doComplete.bind(r),
			findDocumentSymbols: s.findDocumentSymbols.bind(s),
			findDocumentSymbols2: s.findDocumentSymbols2.bind(s),
			findDocumentColors: s.findDocumentColors.bind(s),
			getColorPresentations: s.getColorPresentations.bind(s),
			doHover: i.doHover.bind(i),
			getFoldingRanges: W0,
			getSelectionRanges: H0,
			findDefinition: () => Promise.resolve([]),
			findLinks: Y0,
			format: (l, o, c) => ai(l, c, o),
			sort: (l, o) => J0(l, o)
		};
	}
	let vo;
	typeof fetch < "u" && (vo = function(e) {
		return fetch(e).then((t) => t.text());
	});
	var rf = class {
		constructor(e, t) {
			this._ctx = e, this._languageSettings = t.languageSettings, this._languageId = t.languageId, this._languageService = nf({
				workspaceContext: { resolveRelativePath: (n, r) => of(r.substr(0, r.lastIndexOf("/") + 1), n) },
				schemaRequestService: t.enableSchemaRequest ? vo : void 0,
				clientCapabilities: Kr.LATEST
			}), this._languageService.configure(this._languageSettings);
		}
		async doValidation(e) {
			let t = this._getTextDocument(e);
			if (t) {
				let n = this._languageService.parseJSONDocument(t);
				return this._languageService.doValidation(t, n, this._languageSettings);
			}
			return Promise.resolve([]);
		}
		async doComplete(e, t) {
			let n = this._getTextDocument(e);
			if (!n) return null;
			let r = this._languageService.parseJSONDocument(n);
			return this._languageService.doComplete(n, t, r);
		}
		async doResolve(e) {
			return this._languageService.doResolve(e);
		}
		async doHover(e, t) {
			let n = this._getTextDocument(e);
			if (!n) return null;
			let r = this._languageService.parseJSONDocument(n);
			return this._languageService.doHover(n, t, r);
		}
		async format(e, t, n) {
			let r = this._getTextDocument(e);
			if (!r) return [];
			let i = this._languageService.format(r, t, n);
			return Promise.resolve(i);
		}
		async resetSchema(e) {
			return Promise.resolve(this._languageService.resetSchema(e));
		}
		async findDocumentSymbols(e) {
			let t = this._getTextDocument(e);
			if (!t) return [];
			let n = this._languageService.parseJSONDocument(t), r = this._languageService.findDocumentSymbols2(t, n);
			return Promise.resolve(r);
		}
		async findDocumentColors(e) {
			let t = this._getTextDocument(e);
			if (!t) return [];
			let n = this._languageService.parseJSONDocument(t), r = this._languageService.findDocumentColors(t, n);
			return Promise.resolve(r);
		}
		async getColorPresentations(e, t, n) {
			let r = this._getTextDocument(e);
			if (!r) return [];
			let i = this._languageService.parseJSONDocument(r), s = this._languageService.getColorPresentations(r, i, t, n);
			return Promise.resolve(s);
		}
		async getFoldingRanges(e, t) {
			let n = this._getTextDocument(e);
			if (!n) return [];
			let r = this._languageService.getFoldingRanges(n, t);
			return Promise.resolve(r);
		}
		async getSelectionRanges(e, t) {
			let n = this._getTextDocument(e);
			if (!n) return [];
			let r = this._languageService.parseJSONDocument(n), i = this._languageService.getSelectionRanges(n, t, r);
			return Promise.resolve(i);
		}
		async parseJSONDocument(e) {
			let t = this._getTextDocument(e);
			if (!t) return null;
			let n = this._languageService.parseJSONDocument(t);
			return Promise.resolve(n);
		}
		async getMatchingSchemas(e) {
			let t = this._getTextDocument(e);
			if (!t) return [];
			let n = this._languageService.parseJSONDocument(t);
			return Promise.resolve(this._languageService.getMatchingSchemas(t, n));
		}
		_getTextDocument(e) {
			let t = this._ctx.getMirrorModels();
			for (let n of t) if (n.uri.toString() === e) return Ee.create(e, this._languageId, n.version, n.getValue());
			return null;
		}
	};
	const sf = 47, li = 46;
	function af(e) {
		return e.charCodeAt(0) === sf;
	}
	function of(e, t) {
		if (af(t)) {
			const n = Et.parse(e), r = t.split("/");
			return n.with({ path: wo(r) }).toString();
		}
		return lf(e, t);
	}
	function wo(e) {
		const t = [];
		for (const r of e) r.length === 0 || r.length === 1 && r.charCodeAt(0) === li || (r.length === 2 && r.charCodeAt(0) === li && r.charCodeAt(1) === li ? t.pop() : t.push(r));
		e.length > 1 && e[e.length - 1].length === 0 && t.push("");
		let n = t.join("/");
		return e[0].length === 0 && (n = "/" + n), n;
	}
	function lf(e, ...t) {
		const n = Et.parse(e), r = n.path.split("/");
		for (let i of t) r.push(...i.split("/"));
		return n.with({ path: wo(r) }).toString();
	}
	self.onmessage = () => {
		Kc((e, t) => new rf(e, t));
	};
})();

//# sourceMappingURL=json.worker-DI02pyM8.js.map