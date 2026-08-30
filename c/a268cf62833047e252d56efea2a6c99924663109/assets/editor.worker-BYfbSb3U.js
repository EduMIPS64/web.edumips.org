(function() {
	var Vs = class {
		constructor() {
			this.listeners = [], this.unexpectedErrorHandler = function(e) {
				setTimeout(() => {
					throw e.stack ? Ot.isErrorNoTelemetry(e) ? new Ot(e.message + `

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
	const Gn = new Vs();
	function gt(e) {
		Xn(e) || Gn.onUnexpectedError(e);
	}
	function qs(e) {
		Xn(e) || Gn.onUnexpectedExternalError(e);
	}
	function zt(e) {
		if (e instanceof Error) {
			const { name: t, message: n, cause: r } = e;
			return {
				$isError: !0,
				name: t,
				message: n,
				stack: e.stacktrace || e.stack,
				noTelemetry: Ot.isErrorNoTelemetry(e),
				cause: r ? zt(r) : void 0,
				code: e.code
			};
		}
		return e;
	}
	const Us = "Canceled";
	function Xn(e) {
		return e instanceof Qn ? !0 : e instanceof Error && e.name === "Canceled" && e.message === "Canceled";
	}
	var Qn = class extends Error {
		constructor() {
			super(Us), this.name = this.message;
		}
	}, Ot = class Vn extends Error {
		constructor(t) {
			super(t), this.name = "CodeExpectedError";
		}
		static fromError(t) {
			if (t instanceof Vn) return t;
			const n = new Vn();
			return n.message = t.message, n.stack = t.stack, n;
		}
		static isErrorNoTelemetry(t) {
			return t.name === "CodeExpectedError";
		}
	}, Y = class Ns extends Error {
		constructor(t) {
			super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, Ns.prototype);
		}
	};
	function $s(e, t = "Unreachable") {
		throw new Error(t);
	}
	function Ws(e, t = "unexpected state") {
		if (!e) throw typeof t == "string" ? new Y(`Assertion Failed: ${t}`) : t;
	}
	function Je(e) {
		if (!e()) {
			debugger;
			e(), gt(new Y("Assertion Failed"));
		}
	}
	function jt(e, t) {
		let n = 0;
		for (; n < e.length - 1;) {
			const r = e[n], s = e[n + 1];
			if (!t(r, s)) return !1;
			n++;
		}
		return !0;
	}
	function Hs(e) {
		return typeof e == "string";
	}
	function zs(e) {
		return !!e && typeof e[Symbol.iterator] == "function";
	}
	var pt;
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
		function* s(w) {
			yield w;
		}
		e.single = s;
		function a(w) {
			return t(w) ? w : s(w);
		}
		e.wrap = a;
		function o(w) {
			return w ?? n;
		}
		e.from = o;
		function* l(w) {
			for (let L = w.length - 1; L >= 0; L--) yield w[L];
		}
		e.reverse = l;
		function u(w) {
			return !w || w[Symbol.iterator]().next().done === !0;
		}
		e.isEmpty = u;
		function c(w) {
			return w[Symbol.iterator]().next().value;
		}
		e.first = c;
		function h(w, L) {
			let x = 0;
			for (const $ of w) if (L($, x++)) return !0;
			return !1;
		}
		e.some = h;
		function m(w, L) {
			let x = 0;
			for (const $ of w) if (!L($, x++)) return !1;
			return !0;
		}
		e.every = m;
		function f(w, L) {
			for (const x of w) if (L(x)) return x;
		}
		e.find = f;
		function* d(w, L) {
			for (const x of w) L(x) && (yield x);
		}
		e.filter = d;
		function* b(w, L) {
			let x = 0;
			for (const $ of w) yield L($, x++);
		}
		e.map = b;
		function* p(w, L) {
			let x = 0;
			for (const $ of w) yield* L($, x++);
		}
		e.flatMap = p;
		function* v(...w) {
			for (const L of w) zs(L) ? yield* L : yield L;
		}
		e.concat = v;
		function _(w, L, x) {
			let $ = x;
			for (const R of w) $ = L($, R);
			return $;
		}
		e.reduce = _;
		function N(w) {
			let L = 0;
			for (const x of w) L++;
			return L;
		}
		e.length = N;
		function* y(w, L, x = w.length) {
			for (L < -w.length && (L = 0), L < 0 && (L += w.length), x < 0 ? x += w.length : x > w.length && (x = w.length); L < x; L++) yield w[L];
		}
		e.slice = y;
		function A(w, L = Number.POSITIVE_INFINITY) {
			const x = [];
			if (L === 0) return [x, w];
			const $ = w[Symbol.iterator]();
			for (let R = 0; R < L; R++) {
				const ue = $.next();
				if (ue.done) return [x, e.empty()];
				x.push(ue.value);
			}
			return [x, { [Symbol.iterator]() {
				return $;
			} }];
		}
		e.consume = A;
		async function B(w) {
			const L = [];
			for await (const x of w) L.push(x);
			return L;
		}
		e.asyncToArray = B;
		async function C(w) {
			let L = [];
			for await (const x of w) L = L.concat(x);
			return L;
		}
		e.asyncToArrayFlat = C;
	})(pt || (pt = {}));
	function Yn(e) {
		if (pt.is(e)) {
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
	function Os(...e) {
		return Ze(() => Yn(e));
	}
	var js = class {
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
	function Ze(e) {
		return new js(e);
	}
	var Gt = class Ss {
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
				Yn(this._toDispose);
			} finally {
				this._toDispose.clear();
			}
		}
		add(t) {
			if (!t || t === Ke.None) return t;
			if (t === this) throw new Error("Cannot register a disposable on itself!");
			return this._isDisposed ? Ss.DISABLE_DISPOSED_WARNING || console.warn((/* @__PURE__ */ new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!")).stack) : this._toDispose.add(t), t;
		}
		delete(t) {
			if (t) {
				if (t === this) throw new Error("Cannot dispose a disposable on itself!");
				this._toDispose.delete(t), t.dispose();
			}
		}
	}, Ke = class {
		static {
			this.None = Object.freeze({ dispose() {} });
		}
		constructor() {
			this._store = new Gt(), this._store;
		}
		dispose() {
			this._store.dispose();
		}
		_register(e) {
			if (e === this) throw new Error("Cannot register a disposable on itself!");
			return this._store.add(e);
		}
	}, j = class Bt {
		static {
			this.Undefined = new Bt(void 0);
		}
		constructor(t) {
			this.element = t, this.next = Bt.Undefined, this.prev = Bt.Undefined;
		}
	}, Gs = class {
		constructor() {
			this._first = j.Undefined, this._last = j.Undefined, this._size = 0;
		}
		get size() {
			return this._size;
		}
		isEmpty() {
			return this._first === j.Undefined;
		}
		clear() {
			let e = this._first;
			for (; e !== j.Undefined;) {
				const t = e.next;
				e.prev = j.Undefined, e.next = j.Undefined, e = t;
			}
			this._first = j.Undefined, this._last = j.Undefined, this._size = 0;
		}
		unshift(e) {
			return this._insert(e, !1);
		}
		push(e) {
			return this._insert(e, !0);
		}
		_insert(e, t) {
			const n = new j(e);
			if (this._first === j.Undefined) this._first = n, this._last = n;
			else if (t) {
				const s = this._last;
				this._last = n, n.prev = s, s.next = n;
			} else {
				const s = this._first;
				this._first = n, n.next = s, s.prev = n;
			}
			this._size += 1;
			let r = !1;
			return () => {
				r || (r = !0, this._remove(n));
			};
		}
		shift() {
			if (this._first !== j.Undefined) {
				const e = this._first.element;
				return this._remove(this._first), e;
			}
		}
		pop() {
			if (this._last !== j.Undefined) {
				const e = this._last.element;
				return this._remove(this._last), e;
			}
		}
		_remove(e) {
			if (e.prev !== j.Undefined && e.next !== j.Undefined) {
				const t = e.prev;
				t.next = e.next, e.next.prev = t;
			} else e.prev === j.Undefined && e.next === j.Undefined ? (this._first = j.Undefined, this._last = j.Undefined) : e.next === j.Undefined ? (this._last = this._last.prev, this._last.next = j.Undefined) : e.prev === j.Undefined && (this._first = this._first.next, this._first.prev = j.Undefined);
			this._size -= 1;
		}
		*[Symbol.iterator]() {
			let e = this._first;
			for (; e !== j.Undefined;) yield e.element, e = e.next;
		}
	};
	function Xs() {
		return globalThis._VSCODE_NLS_MESSAGES;
	}
	function Jn() {
		return globalThis._VSCODE_NLS_LANGUAGE;
	}
	const Qs = Jn() === "pseudo" || typeof document < "u" && document.location && typeof document.location.hash == "string" && document.location.hash.indexOf("pseudo=true") >= 0;
	function Zn(e, t) {
		let n;
		return t.length === 0 ? n = e : n = e.replace(/\{(\d+)\}/g, (r, s) => {
			const a = t[s[0]];
			let o = r;
			return typeof a == "string" ? o = a : (typeof a == "number" || typeof a == "boolean" || a === void 0 || a === null) && (o = String(a)), o;
		}), Qs && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n;
	}
	function D(e, t, ...n) {
		return Zn(typeof e == "number" ? Ys(e, t) : t, n);
	}
	function Ys(e, t) {
		const n = Xs()?.[e];
		if (typeof n != "string") {
			if (typeof t == "string") return t;
			throw new Error(`!!! NLS MISSING: ${e} !!!`);
		}
		return n;
	}
	let bt = !1, wt = !1, vt = !1, Kn = !1, Xt = !1, pe;
	const be = globalThis;
	let se;
	typeof be.vscode < "u" && typeof be.vscode.process < "u" ? se = be.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (se = process);
	const Ks = typeof se?.versions?.electron == "string" && se?.type === "renderer";
	if (typeof se == "object") {
		bt = se.platform === "win32", wt = se.platform === "darwin", vt = se.platform === "linux", vt && se.env.SNAP && se.env.SNAP_REVISION, se.env.CI || se.env.BUILD_ARTIFACTSTAGINGDIRECTORY || se.env.GITHUB_WORKSPACE;
		const e = se.env.VSCODE_NLS_CONFIG;
		if (e) try {
			const t = JSON.parse(e);
			t.userLocale, t.osLocale, t.resolvedLanguage, t.languagePack?.translationsConfigFile;
		} catch {}
		Kn = !0;
	} else typeof navigator == "object" && !Ks ? (pe = navigator.userAgent, bt = pe.indexOf("Windows") >= 0, wt = pe.indexOf("Macintosh") >= 0, (pe.indexOf("Macintosh") >= 0 || pe.indexOf("iPad") >= 0 || pe.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints, vt = pe.indexOf("Linux") >= 0, pe?.indexOf("Mobi"), Xt = !0, Jn(), navigator.language.toLowerCase()) : console.error("Unable to resolve platform.");
	const et = bt, ei = wt, ti = Kn, ni = Xt, ri = Xt && typeof be.importScripts == "function" ? be.origin : void 0, de = pe, si = typeof be.postMessage == "function" && !be.importScripts;
	(() => {
		if (si) {
			const e = [];
			be.addEventListener("message", (n) => {
				if (n.data && n.data.vscodeScheduleAsyncWork) for (let r = 0, s = e.length; r < s; r++) {
					const a = e[r];
					if (a.id === n.data.vscodeScheduleAsyncWork) {
						e.splice(r, 1), a.callback();
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
				}), be.postMessage({ vscodeScheduleAsyncWork: r }, "*");
			};
		}
		return (e) => setTimeout(e);
	})();
	const ai = !!(de && de.indexOf("Chrome") >= 0);
	de && de.indexOf("Firefox");
	!ai && de && de.indexOf("Safari");
	de && de.indexOf("Edg/");
	de && de.indexOf("Android");
	let Fe;
	const Jt = globalThis.vscode;
	if (typeof Jt < "u" && typeof Jt.process < "u") {
		const e = Jt.process;
		Fe = {
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
	} else typeof process < "u" && typeof process?.versions?.node == "string" ? Fe = {
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
	} : Fe = {
		get platform() {
			return et ? "win32" : ei ? "darwin" : "linux";
		},
		get arch() {},
		get env() {
			return {};
		},
		cwd() {
			return "/";
		}
	};
	const yt = Fe.cwd, e1 = Fe.env, oi = Fe.platform, li = globalThis.performance.now.bind(globalThis.performance);
	var t1 = class Rs {
		static create(t) {
			return new Rs(t);
		}
		constructor(t) {
			this._now = t === !1 ? Date.now : li, this._startTime = this._now(), this._stopTime = -1;
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
	const ui = 100, n1 = 6e4;
	function r1() {
		return !!e1.VSCODE_DEV;
	}
	var Zt;
	(function(e) {
		e.None = () => Ke.None;
		function t(M, S, E) {
			return f(M, () => {}, 0, void 0, S ?? !0, void 0, E);
		}
		e.defer = t;
		function n(M) {
			return (S, E = null, k) => {
				let T = !1, F;
				return F = M((U) => {
					if (!T) return F ? F.dispose() : T = !0, S.call(E, U);
				}, null, k), T && F.dispose(), F;
			};
		}
		e.once = n;
		function r(M, S) {
			return e.once(e.filter(M, S));
		}
		e.onceIf = r;
		function s(M, S, E) {
			return h((k, T = null, F) => M((U) => k.call(T, S(U)), null, F), E);
		}
		e.map = s;
		function a(M, S, E) {
			return h((k, T = null, F) => M((U) => {
				S(U), k.call(T, U);
			}, null, F), E);
		}
		e.forEach = a;
		function o(M, S, E) {
			return h((k, T = null, F) => M((U) => S(U) && k.call(T, U), null, F), E);
		}
		e.filter = o;
		function l(M) {
			return M;
		}
		e.signal = l;
		function u(...M) {
			return (S, E = null, k) => m(Os(...M.map((T) => T((F) => S.call(E, F)))), k);
		}
		e.any = u;
		function c(M, S, E, k) {
			let T = E;
			return s(M, (F) => (T = S(T, F), T), k);
		}
		e.reduce = c;
		function h(M, S) {
			let E;
			const k = new he({
				onWillAddFirstListener() {
					E = M(k.fire, k);
				},
				onDidRemoveLastListener() {
					E?.dispose();
				}
			});
			return S?.add(k), k.event;
		}
		function m(M, S) {
			return S instanceof Array ? S.push(M) : S && S.add(M), M;
		}
		function f(M, S, E = 100, k = !1, T = !1, F, U) {
			let K, O, re, ee = 0, Z;
			const Ge = new he({
				leakWarningThreshold: F,
				onWillAddFirstListener() {
					K = M((nl) => {
						ee++, O = S(O, nl), k && !re && (Ge.fire(O), O = void 0), Z = () => {
							const rl = O;
							O = void 0, re = void 0, (!k || ee > 1) && Ge.fire(rl), ee = 0;
						}, typeof E == "number" ? (re && clearTimeout(re), re = setTimeout(Z, E)) : re === void 0 && (re = null, queueMicrotask(Z));
					});
				},
				onWillRemoveListener() {
					T && ee > 0 && Z?.();
				},
				onDidRemoveLastListener() {
					Z = void 0, K.dispose();
				}
			});
			return U?.add(Ge), Ge.event;
		}
		e.debounce = f;
		function d(M, S = 0, E, k) {
			return e.debounce(M, (T, F) => T ? (T.push(F), T) : [F], S, void 0, E ?? !0, void 0, k);
		}
		e.accumulate = d;
		function b(M, S, E = 100, k = !0, T = !0, F, U) {
			let K, O, re, ee = 0;
			const Z = new he({
				leakWarningThreshold: F,
				onWillAddFirstListener() {
					K = M((Ge) => {
						ee++, O = S(O, Ge), re === void 0 && (k && (Z.fire(O), O = void 0, ee = 0), typeof E == "number" ? re = setTimeout(() => {
							T && ee > 0 && Z.fire(O), O = void 0, re = void 0, ee = 0;
						}, E) : (re = 0, queueMicrotask(() => {
							T && ee > 0 && Z.fire(O), O = void 0, re = void 0, ee = 0;
						})));
					});
				},
				onDidRemoveLastListener() {
					K.dispose();
				}
			});
			return U?.add(Z), Z.event;
		}
		e.throttle = b;
		function p(M, S = (k, T) => k === T, E) {
			let k = !0, T;
			return o(M, (F) => {
				const U = k || !S(F, T);
				return k = !1, T = F, U;
			}, E);
		}
		e.latch = p;
		function v(M, S, E) {
			return [e.filter(M, S, E), e.filter(M, (k) => !S(k), E)];
		}
		e.split = v;
		function _(M, S, E = !1, k = [], T) {
			let F = k.slice(), U;
			r1() && (U = {
				stack: s1.create(),
				timerId: setTimeout(() => {
					F && F.length > 0 && U && !U.warned && (U.warned = !0, console.warn(`[Event.buffer][${S}] potential LEAK detected: ${F.length} events buffered for ${n1 / 1e3}s without being consumed. Buffered here:`), U.stack.print());
				}, n1),
				warned: !1
			}, T && T.add(Ze(() => clearTimeout(U.timerId))));
			const K = () => {
				U && clearTimeout(U.timerId);
			};
			let O = M((Z) => {
				F ? (F.push(Z), r1() && U && !U.warned && F.length >= ui && (U.warned = !0, console.warn(`[Event.buffer][${S}] potential LEAK detected: ${F.length} events buffered without being consumed. Buffered here:`), U.stack.print())) : ee.fire(Z);
			});
			T && T.add(O);
			const re = () => {
				F?.forEach((Z) => ee.fire(Z)), F = null, K();
			}, ee = new he({
				onWillAddFirstListener() {
					O || (O = M((Z) => ee.fire(Z)), T && T.add(O));
				},
				onDidAddFirstListener() {
					F && (E ? setTimeout(re) : re());
				},
				onDidRemoveLastListener() {
					O && O.dispose(), O = null, K();
				}
			});
			return T && T.add(ee), ee.event;
		}
		e.buffer = _;
		function N(M, S) {
			return (k, T, F) => {
				const U = S(new A());
				return M(function(K) {
					const O = U.evaluate(K);
					O !== y && k.call(T, O);
				}, void 0, F);
			};
		}
		e.chain = N;
		const y = Symbol("HaltChainable");
		class A {
			constructor() {
				this.steps = [];
			}
			map(S) {
				return this.steps.push(S), this;
			}
			forEach(S) {
				return this.steps.push((E) => (S(E), E)), this;
			}
			filter(S) {
				return this.steps.push((E) => S(E) ? E : y), this;
			}
			reduce(S, E) {
				let k = E;
				return this.steps.push((T) => (k = S(k, T), k)), this;
			}
			latch(S = (E, k) => E === k) {
				let E = !0, k;
				return this.steps.push((T) => {
					const F = E || !S(T, k);
					return E = !1, k = T, F ? T : y;
				}), this;
			}
			evaluate(S) {
				for (const E of this.steps) if (S = E(S), S === y) break;
				return S;
			}
		}
		function B(M, S, E = (k) => k) {
			const k = (...K) => U.fire(E(...K)), T = () => M.on(S, k), F = () => M.removeListener(S, k), U = new he({
				onWillAddFirstListener: T,
				onDidRemoveLastListener: F
			});
			return U.event;
		}
		e.fromNodeEventEmitter = B;
		function C(M, S, E = (k) => k) {
			const k = (...K) => U.fire(E(...K)), T = () => M.addEventListener(S, k), F = () => M.removeEventListener(S, k), U = new he({
				onWillAddFirstListener: T,
				onDidRemoveLastListener: F
			});
			return U.event;
		}
		e.fromDOMEventEmitter = C;
		function w(M, S) {
			let E, k;
			const T = new Promise((F) => {
				k = n(M)(F), en(k, S), E = () => {
					a1(k, S);
				};
			});
			return T.cancel = E, S && T.finally(() => a1(k, S)), T;
		}
		e.toPromise = w;
		function L(M, S) {
			return M((E) => S.fire(E));
		}
		e.forward = L;
		function x(M, S, E) {
			return S(E), M((k) => S(k));
		}
		e.runAndSubscribe = x;
		class $ {
			constructor(S, E) {
				this._observable = S, this._counter = 0, this._hasChanged = !1;
				const k = {
					onWillAddFirstListener: () => {
						S.addObserver(this), this._observable.reportChanges();
					},
					onDidRemoveLastListener: () => {
						S.removeObserver(this);
					}
				};
				this.emitter = new he(k), E && E.add(this.emitter);
			}
			beginUpdate(S) {
				this._counter++;
			}
			handlePossibleChange(S) {}
			handleChange(S, E) {
				this._hasChanged = !0;
			}
			endUpdate(S) {
				this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
			}
		}
		function R(M, S) {
			return new $(M, S).emitter.event;
		}
		e.fromObservable = R;
		function ue(M) {
			return (S, E, k) => {
				let T = 0, F = !1;
				const U = {
					beginUpdate() {
						T++;
					},
					endUpdate() {
						T--, T === 0 && (M.reportChanges(), F && (F = !1, S.call(E)));
					},
					handlePossibleChange() {},
					handleChange() {
						F = !0;
					}
				};
				M.addObserver(U), M.reportChanges();
				const K = { dispose() {
					M.removeObserver(U);
				} };
				return en(K, k), K;
			};
		}
		e.fromObservableLight = ue;
	})(Zt || (Zt = {}));
	var ci = class qn {
		static {
			this.all = /* @__PURE__ */ new Set();
		}
		static {
			this._idPool = 0;
		}
		constructor(t) {
			this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${qn._idPool++}`, qn.all.add(this);
		}
		start(t) {
			this._stopWatch = new t1(), this.listenerCount = t;
		}
		stop() {
			if (this._stopWatch) {
				const t = this._stopWatch.elapsed();
				this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
			}
		}
	};
	let hi = -1;
	var mi = class xs {
		static {
			this._idPool = 1;
		}
		constructor(t, n, r = (xs._idPool++).toString(16).padStart(3, "0")) {
			this._errorHandler = t, this.threshold = n, this.name = r, this._warnCountdown = 0;
		}
		dispose() {
			this._stacks?.clear();
		}
		check(t, n) {
			const r = this.threshold;
			if (r <= 0 || n < r) return;
			this._stacks || (this._stacks = /* @__PURE__ */ new Map());
			const s = this._stacks.get(t.value) || 0;
			if (this._stacks.set(t.value, s + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
				this._warnCountdown = r * .5;
				const [a, o] = this.getMostFrequentStack(), l = /^[0-9a-f]+$/i.test(this.name) ? void 0 : this.name, u = `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${o}):`;
				console.warn(u), console.warn(a);
				const h = new i1(o / n > .3 ? "dominated" : "popular", u, a, n, l);
				this._errorHandler(h);
			}
			return () => {
				const a = this._stacks.get(t.value) || 0;
				this._stacks.set(t.value, a - 1);
			};
		}
		getMostFrequentStack() {
			if (!this._stacks) return;
			let t, n = 0;
			for (const [r, s] of this._stacks) (!t || n < s) && (t = [r, s], n = s);
			return t;
		}
	}, s1 = class Cs {
		static create() {
			return new Cs((/* @__PURE__ */ new Error()).stack ?? "");
		}
		constructor(t) {
			this.value = t;
		}
		print() {
			console.warn(this.value.split(`
`).slice(2).join(`
`));
		}
	}, i1 = class As extends Error {
		constructor(t, n, r, s, a) {
			super(a ? `[${a}] potential listener LEAK detected, ${t}` : `potential listener LEAK detected, ${t}`), this.name = "ListenerLeakError", this.kind = t, this.listenerCount = s, this.details = n, this.stack = r;
		}
		static is(t) {
			return t instanceof As || t instanceof Error && typeof t.kind == "string" && typeof t.listenerCount == "number";
		}
	}, fi = class extends i1 {
		constructor(e, t, n, r, s) {
			super(e, t, n, r, s), this.name = "ListenerRefusalError";
		}
	}, Kt = class {
		constructor(e) {
			this.value = e;
		}
	};
	const di = 2;
	var he = class {
		constructor(e) {
			this._size = 0, this._options = e, this._leakageMon = this._options?.leakWarningThreshold ? new mi(e?.onListenerError ?? gt, this._options?.leakWarningThreshold ?? hi, this._options?.leakWarningName) : void 0, this._perfMon = this._options?._profName ? new ci(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
		}
		dispose() {
			this._disposed || (this._disposed = !0, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose());
		}
		get event() {
			return this._event ??= (e, t, n) => {
				if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
					const o = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
					console.warn(o);
					const l = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], c = new fi(l[1] / this._size > .3 ? "dominated" : "popular", `${o}. HINT: Stack shows most frequent listener (${l[1]}-times)`, l[0], this._size, this._options?.leakWarningName);
					return (this._options?.onListenerError || gt)(c), Ke.None;
				}
				if (this._disposed) return Ke.None;
				t && (e = e.bind(t));
				const r = new Kt(e);
				let s;
				this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * .2) && (r.stack = s1.create(), s = this._leakageMon.check(r.stack, this._size + 1)), this._listeners ? this._listeners instanceof Kt ? (this._deliveryQueue ??= new gi(), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._options?.onDidAddListener?.(this), this._size++;
				const a = Ze(() => {
					s?.(), this._removeListener(r);
				});
				return en(a, n), a;
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
			if (this._size * di <= t.length) {
				let s = 0;
				for (let a = 0; a < t.length; a++) t[a] ? t[s++] = t[a] : r && s < this._deliveryQueue.end && (this._deliveryQueue.end--, s < this._deliveryQueue.i && this._deliveryQueue.i--);
				t.length = s;
			}
		}
		_deliver(e, t) {
			if (!e) return;
			const n = this._options?.onListenerError || gt;
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
			if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Kt) this._deliver(this._listeners, e);
			else {
				const t = this._deliveryQueue;
				t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
			}
			this._perfMon?.stop();
		}
		hasListeners() {
			return this._size > 0;
		}
	}, gi = class {
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
	function en(e, t) {
		t instanceof Gt ? t.add(e) : Array.isArray(t) && t.push(e);
	}
	function a1(e, t) {
		if (t instanceof Gt) t.delete(e);
		else if (Array.isArray(t)) {
			const n = t.indexOf(e);
			n !== -1 && t.splice(n, 1);
		}
		e.dispose();
	}
	function pi(e) {
		return e;
	}
	var bi = class {
		constructor(e, t) {
			this.lastCache = void 0, this.lastArgKey = void 0, typeof e == "function" ? (this._fn = e, this._computeKey = pi) : (this._fn = t, this._computeKey = e.getCacheKey);
		}
		get(e) {
			const t = this._computeKey(e);
			return this.lastArgKey !== t && (this.lastArgKey = t, this.lastCache = this._fn(e)), this.lastCache;
		}
	}, Ae;
	(function(e) {
		e[e.Uninitialized = 0] = "Uninitialized", e[e.Running = 1] = "Running", e[e.Completed = 2] = "Completed";
	})(Ae || (Ae = {}));
	var tn = class {
		constructor(e) {
			this.executor = e, this._state = Ae.Uninitialized;
		}
		get value() {
			if (this._state === Ae.Uninitialized) {
				this._state = Ae.Running;
				try {
					this._value = this.executor();
				} catch (e) {
					this._error = e;
				} finally {
					this._state = Ae.Completed;
				}
			} else if (this._state === Ae.Running) throw new Error("Cannot read the value of a lazy that is being initialized");
			if (this._error) throw this._error;
			return this._value;
		}
		get rawValue() {
			return this._value;
		}
	};
	function wi(e) {
		return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
	}
	function vi(e) {
		return e.source === "^" || e.source === "^$" || e.source === "$" || e.source === "^\\s*$" ? !1 : !!(e.exec("") && e.lastIndex === 0);
	}
	function yi(e) {
		return e.split(/\r\n|\r|\n/);
	}
	function _i(e) {
		for (let t = 0, n = e.length; t < n; t++) {
			const r = e.charCodeAt(t);
			if (r !== 32 && r !== 9) return t;
		}
		return -1;
	}
	function Li(e, t = e.length - 1) {
		for (let n = t; n >= 0; n--) {
			const r = e.charCodeAt(n);
			if (r !== 32 && r !== 9) return n;
		}
		return -1;
	}
	function o1(e) {
		return e >= 65 && e <= 90;
	}
	function nn(e, t) {
		const n = Math.min(e.length, t.length);
		let r;
		for (r = 0; r < n; r++) if (e.charCodeAt(r) !== t.charCodeAt(r)) return r;
		return n;
	}
	function rn(e, t) {
		const n = Math.min(e.length, t.length);
		let r;
		const s = e.length - 1, a = t.length - 1;
		for (r = 0; r < n; r++) if (e.charCodeAt(s - r) !== t.charCodeAt(a - r)) return r;
		return n;
	}
	function _t(e) {
		return 55296 <= e && e <= 56319;
	}
	function sn(e) {
		return 56320 <= e && e <= 57343;
	}
	function l1(e, t) {
		return (e - 55296 << 10) + (t - 56320) + 65536;
	}
	function Ni(e, t, n) {
		const r = e.charCodeAt(n);
		if (_t(r) && n + 1 < t) {
			const s = e.charCodeAt(n + 1);
			if (sn(s)) return l1(r, s);
		}
		return r;
	}
	const Si = /^[\t\n\r\x20-\x7E]*$/;
	function Ri(e) {
		return Si.test(e);
	}
	(class ut {
		static {
			this._INSTANCE = null;
		}
		static getInstance() {
			return ut._INSTANCE || (ut._INSTANCE = new ut()), ut._INSTANCE;
		}
		constructor() {
			this._data = xi();
		}
		getGraphemeBreakType(t) {
			if (t < 32) return t === 10 ? 3 : t === 13 ? 2 : 4;
			if (t < 127) return 0;
			const n = this._data, r = n.length / 3;
			let s = 1;
			for (; s <= r;) if (t < n[3 * s]) s = 2 * s;
			else if (t > n[3 * s + 1]) s = 2 * s + 1;
			else return n[3 * s + 2];
			return 0;
		}
	});
	function xi() {
		return JSON.parse("[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]");
	}
	var an = class ct {
		static {
			this.ambiguousCharacterData = new tn(() => JSON.parse("{\"_common\":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,1523,96,8242,96,1370,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,118002,50,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,118003,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,118004,52,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,118005,53,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,118006,54,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,118007,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,118008,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,118009,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,117974,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,117975,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71913,67,71922,67,65315,67,8557,67,8450,67,8493,67,117976,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,117977,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,117978,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,117979,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,117980,71,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,117981,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,117983,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,117984,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,118001,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,117982,108,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,117985,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,117986,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,117987,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,118000,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,117988,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,117989,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,117990,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,117991,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,117992,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,117993,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,117994,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,117995,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71910,87,71919,87,117996,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,117997,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,117998,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,71909,90,66293,90,65338,90,8484,90,8488,90,117999,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65283,35,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],\"_default\":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"cs\":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"de\":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"es\":[8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"fr\":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"it\":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"ja\":[8211,45,8218,44,65281,33,8216,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65292,44,65297,49,65307,59],\"ko\":[8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"pl\":[65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"pt-BR\":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"qps-ploc\":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"ru\":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"tr\":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],\"zh-hans\":[160,32,65374,126,8218,44,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65297,49],\"zh-hant\":[8211,45,65374,126,8218,44,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89]}"));
		}
		static {
			this.cache = new bi((t) => {
				const n = t.split(",");
				function r(h) {
					const m = /* @__PURE__ */ new Map();
					for (let f = 0; f < h.length; f += 2) m.set(h[f], h[f + 1]);
					return m;
				}
				function s(h, m) {
					const f = new Map(h);
					for (const [d, b] of m) f.set(d, b);
					return f;
				}
				function a(h, m) {
					if (!h) return m;
					const f = /* @__PURE__ */ new Map();
					for (const [d, b] of h) m.has(d) && f.set(d, b);
					return f;
				}
				const o = this.ambiguousCharacterData.value;
				let l = n.filter((h) => !h.startsWith("_") && Object.hasOwn(o, h));
				l.length === 0 && (l = ["_default"]);
				let u;
				for (const h of l) {
					const m = r(o[h]);
					u = a(u, m);
				}
				const c = s(r(o._common), u);
				return new ct(c);
			});
		}
		static getInstance(t) {
			return ct.cache.get(Array.from(t).join(","));
		}
		static {
			this._locales = new tn(() => Object.keys(ct.ambiguousCharacterData.value).filter((t) => !t.startsWith("_")));
		}
		static getLocales() {
			return ct._locales.value;
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
	}, on = class Vt {
		static getRawData() {
			return JSON.parse("{\"_common\":[11,12,13,127,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999],\"cs\":[173,8203,12288],\"de\":[173,8203,12288],\"es\":[8203,12288],\"fr\":[173,8203,12288],\"it\":[160,173,12288],\"ja\":[173],\"ko\":[173,12288],\"pl\":[173,8203,12288],\"pt-BR\":[173,8203,12288],\"qps-ploc\":[160,173,8203,12288],\"ru\":[173,12288],\"tr\":[160,173,8203,12288],\"zh-hans\":[160,173,8203,12288],\"zh-hant\":[173,12288]}");
		}
		static {
			this._data = void 0;
		}
		static getData() {
			return this._data || (this._data = new Set([...Object.values(Vt.getRawData())].flat())), this._data;
		}
		static isInvisibleCharacter(t) {
			return Vt.getData().has(t);
		}
		static get codePoints() {
			return Vt.getData();
		}
	};
	const ln = "default", Ci = "$initialize";
	var Ai = class {
		constructor(e, t, n, r, s) {
			this.vsWorker = e, this.req = t, this.channel = n, this.method = r, this.args = s, this.type = 0;
		}
	}, u1 = class {
		constructor(e, t, n, r) {
			this.vsWorker = e, this.seq = t, this.res = n, this.err = r, this.type = 1;
		}
	}, Ei = class {
		constructor(e, t, n, r, s) {
			this.vsWorker = e, this.req = t, this.channel = n, this.eventName = r, this.arg = s, this.type = 2;
		}
	}, ki = class {
		constructor(e, t, n) {
			this.vsWorker = e, this.req = t, this.event = n, this.type = 3;
		}
	}, Mi = class {
		constructor(e, t) {
			this.vsWorker = e, this.req = t, this.type = 4;
		}
	}, Pi = class {
		constructor(e) {
			this._workerId = -1, this._handler = e, this._lastSentReq = 0, this._pendingReplies = Object.create(null), this._pendingEmitters = /* @__PURE__ */ new Map(), this._pendingEvents = /* @__PURE__ */ new Map();
		}
		setWorkerId(e) {
			this._workerId = e;
		}
		async sendMessage(e, t, n) {
			const r = String(++this._lastSentReq);
			return new Promise((s, a) => {
				this._pendingReplies[r] = {
					resolve: s,
					reject: a
				}, this._send(new Ai(this._workerId, r, e, t, n));
			});
		}
		listen(e, t, n) {
			let r = null;
			const s = new he({
				onWillAddFirstListener: () => {
					r = String(++this._lastSentReq), this._pendingEmitters.set(r, s), this._send(new Ei(this._workerId, r, e, t, n));
				},
				onDidRemoveLastListener: () => {
					this._pendingEmitters.delete(r), this._send(new Mi(this._workerId, r)), r = null;
				}
			});
			return s.event;
		}
		handleMessage(e) {
			!e || !e.vsWorker || this._workerId !== -1 && e.vsWorker !== this._workerId || this._handleMessage(e);
		}
		createProxyToRemoteChannel(e, t) {
			return new Proxy(Object.create(null), { get: (n, r) => (typeof r == "string" && !n[r] && (h1(r) ? n[r] = (s) => this.listen(e, r, s) : c1(r) ? n[r] = this.listen(e, r, void 0) : r.charCodeAt(0) === 36 && (n[r] = async (...s) => (await t?.(), this.sendMessage(e, r, s)))), n[r]) });
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
				this._send(new u1(this._workerId, t, n, void 0));
			}, (n) => {
				n.detail instanceof Error && (n.detail = zt(n.detail)), this._send(new u1(this._workerId, t, void 0, zt(n)));
			});
		}
		_handleSubscribeEventMessage(e) {
			const t = e.req, n = this._handler.handleEvent(e.channel, e.eventName, e.arg)((r) => {
				this._send(new ki(this._workerId, t, r));
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
	function c1(e) {
		return e[0] === "o" && e[1] === "n" && o1(e.charCodeAt(2));
	}
	function h1(e) {
		return /^onDynamic/.test(e) && o1(e.charCodeAt(9));
	}
	var Ti = class {
		constructor(e, t) {
			this._localChannels = /* @__PURE__ */ new Map(), this._remoteChannels = /* @__PURE__ */ new Map(), this._protocol = new Pi({
				sendMessage: (n, r) => {
					e(n, r);
				},
				handleMessage: (n, r, s) => this._handleMessage(n, r, s),
				handleEvent: (n, r, s) => this._handleEvent(n, r, s)
			}), this.requestHandler = t(this);
		}
		onmessage(e) {
			this._protocol.handleMessage(e);
		}
		_handleMessage(e, t, n) {
			if (e === ln && t === Ci) return this.initialize(n[0]);
			const r = e === ln ? this.requestHandler : this._localChannels.get(e);
			if (!r) return Promise.reject(/* @__PURE__ */ new Error(`Missing channel ${e} on worker thread`));
			const s = r[t];
			if (typeof s != "function") return Promise.reject(/* @__PURE__ */ new Error(`Missing method ${t} on worker thread channel ${e}`));
			try {
				return Promise.resolve(s.apply(r, n));
			} catch (a) {
				return Promise.reject(a);
			}
		}
		_handleEvent(e, t, n) {
			const r = e === ln ? this.requestHandler : this._localChannels.get(e);
			if (!r) throw new Error(`Missing channel ${e} on worker thread`);
			if (h1(t)) {
				const s = r[t];
				if (typeof s != "function") throw new Error(`Missing dynamic event ${t} on request handler.`);
				const a = s.call(r, n);
				if (typeof a != "function") throw new Error(`Missing dynamic event ${t} on request handler.`);
				return a;
			}
			if (c1(t)) {
				const s = r[t];
				if (typeof s != "function") throw new Error(`Missing event ${t} on request handler.`);
				return s;
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
	let m1 = !1;
	function Di(e) {
		if (m1) throw new Error("WebWorker already initialized!");
		m1 = !0;
		const t = new Ti((n) => globalThis.postMessage(n), (n) => e(n));
		return globalThis.onmessage = (n) => {
			t.onmessage(n.data);
		}, t;
	}
	var Se = class {
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
	const f1 = typeof Buffer < "u";
	new tn(() => /* @__PURE__ */ new Uint8Array(256));
	let un;
	var Fi = class Es {
		static wrap(t) {
			return f1 && !Buffer.isBuffer(t) && (t = Buffer.from(t.buffer, t.byteOffset, t.byteLength)), new Es(t);
		}
		constructor(t) {
			this.buffer = t, this.byteLength = this.buffer.byteLength;
		}
		toString() {
			return f1 ? this.buffer.toString() : (un || (un = new TextDecoder(void 0, { ignoreBOM: !0 })), un.decode(this.buffer));
		}
	};
	const d1 = "0123456789abcdef";
	function Ii({ buffer: e }) {
		let t = "";
		for (let n = 0; n < e.length; n++) {
			const r = e[n];
			t += d1[r >>> 4], t += d1[r & 15];
		}
		return t;
	}
	function g1(e, t) {
		return (t << 5) - t + e | 0;
	}
	function Bi(e, t) {
		t = g1(149417, t);
		for (let n = 0, r = e.length; n < r; n++) t = g1(e.charCodeAt(n), t);
		return t;
	}
	function cn(e, t, n = 32) {
		const r = n - t, s = ~((1 << r) - 1);
		return (e << t | (s & e) >>> r) >>> 0;
	}
	function tt(e, t = 32) {
		return e instanceof ArrayBuffer ? Ii(Fi.wrap(new Uint8Array(e))) : (e >>> 0).toString(16).padStart(t / 4, "0");
	}
	(class ks {
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
			let s = this._buffLen, a = this._leftoverHighSurrogate, o, l;
			for (a !== 0 ? (o = a, l = -1, a = 0) : (o = t.charCodeAt(0), l = 0);;) {
				let u = o;
				if (_t(o)) if (l + 1 < n) {
					const c = t.charCodeAt(l + 1);
					sn(c) ? (l++, u = l1(o, c)) : u = 65533;
				} else {
					a = o;
					break;
				}
				else sn(o) && (u = 65533);
				if (s = this._push(r, s, u), l++, l < n) o = t.charCodeAt(l);
				else break;
			}
			this._buffLen = s, this._leftoverHighSurrogate = a;
		}
		_push(t, n, r) {
			return r < 128 ? t[n++] = r : r < 2048 ? (t[n++] = 192 | (r & 1984) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : r < 65536 ? (t[n++] = 224 | (r & 61440) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : (t[n++] = 240 | (r & 1835008) >>> 18, t[n++] = 128 | (r & 258048) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0), n >= 64 && (this._step(), n -= 64, this._totalLen += 64, t[0] = t[64], t[1] = t[65], t[2] = t[66]), n;
		}
		digest() {
			return this._finished || (this._finished = !0, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), tt(this._h0) + tt(this._h1) + tt(this._h2) + tt(this._h3) + tt(this._h4);
		}
		_wrapUp() {
			this._buff[this._buffLen++] = 128, this._buff.subarray(this._buffLen).fill(0), this._buffLen > 56 && (this._step(), this._buff.fill(0));
			const t = 8 * this._totalLen;
			this._buffDV.setUint32(56, Math.floor(t / 4294967296), !1), this._buffDV.setUint32(60, t % 4294967296, !1), this._step();
		}
		_step() {
			const t = ks._bigBlock32, n = this._buffDV;
			for (let m = 0; m < 64; m += 4) t.setUint32(m, n.getUint32(m, !1), !1);
			for (let m = 64; m < 320; m += 4) t.setUint32(m, cn(t.getUint32(m - 12, !1) ^ t.getUint32(m - 32, !1) ^ t.getUint32(m - 56, !1) ^ t.getUint32(m - 64, !1), 1), !1);
			let r = this._h0, s = this._h1, a = this._h2, o = this._h3, l = this._h4, u, c, h;
			for (let m = 0; m < 80; m++) m < 20 ? (u = s & a | ~s & o, c = 1518500249) : m < 40 ? (u = s ^ a ^ o, c = 1859775393) : m < 60 ? (u = s & a | s & o | a & o, c = 2400959708) : (u = s ^ a ^ o, c = 3395469782), h = cn(r, 5) + u + l + c + t.getUint32(m * 4, !1) & 4294967295, l = o, o = a, a = cn(s, 30), s = r, r = h;
			this._h0 = this._h0 + r & 4294967295, this._h1 = this._h1 + s & 4294967295, this._h2 = this._h2 + a & 4294967295, this._h3 = this._h3 + o & 4294967295, this._h4 = this._h4 + l & 4294967295;
		}
	});
	var p1 = class {
		constructor(e) {
			this.source = e;
		}
		getElements() {
			const e = this.source, t = new Int32Array(e.length);
			for (let n = 0, r = e.length; n < r; n++) t[n] = e.charCodeAt(n);
			return t;
		}
	};
	function Vi(e, t, n) {
		return new w1(new p1(e), new p1(t)).ComputeDiff(n).changes;
	}
	var Ie = class {
		static Assert(e, t) {
			if (!e) throw new Error(t);
		}
	}, Be = class {
		static Copy(e, t, n, r, s) {
			for (let a = 0; a < s; a++) n[r + a] = e[t + a];
		}
		static Copy2(e, t, n, r, s) {
			for (let a = 0; a < s; a++) n[r + a] = e[t + a];
		}
	}, b1 = class {
		constructor() {
			this.m_changes = [], this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824, this.m_originalCount = 0, this.m_modifiedCount = 0;
		}
		MarkNextChange() {
			(this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.m_changes.push(new Se(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount)), this.m_originalCount = 0, this.m_modifiedCount = 0, this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824;
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
	}, w1 = class Xe {
		constructor(t, n, r = null) {
			this.ContinueProcessingPredicate = r, this._originalSequence = t, this._modifiedSequence = n;
			const [s, a, o] = Xe._getElements(t), [l, u, c] = Xe._getElements(n);
			this._hasStrings = o && c, this._originalStringElements = s, this._originalElementsOrHash = a, this._modifiedStringElements = l, this._modifiedElementsOrHash = u, this.m_forwardHistory = [], this.m_reverseHistory = [];
		}
		static _isStringArray(t) {
			return t.length > 0 && typeof t[0] == "string";
		}
		static _getElements(t) {
			const n = t.getElements();
			if (Xe._isStringArray(n)) {
				const r = new Int32Array(n.length);
				for (let s = 0, a = n.length; s < a; s++) r[s] = Bi(n[s], 0);
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
			return this.ElementsAreEqual(t, n) ? Xe._getStrictElement(this._originalSequence, t) === Xe._getStrictElement(this._modifiedSequence, n) : !1;
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
		_ComputeDiff(t, n, r, s, a) {
			const o = [!1];
			let l = this.ComputeDiffRecursive(t, n, r, s, o);
			return a && (l = this.PrettifyChanges(l)), {
				quitEarly: o[0],
				changes: l
			};
		}
		ComputeDiffRecursive(t, n, r, s, a) {
			for (a[0] = !1; t <= n && r <= s && this.ElementsAreEqual(t, r);) t++, r++;
			for (; n >= t && s >= r && this.ElementsAreEqual(n, s);) n--, s--;
			if (t > n || r > s) {
				let m;
				return r <= s ? (Ie.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), m = [new Se(t, 0, r, s - r + 1)]) : t <= n ? (Ie.Assert(r === s + 1, "modifiedStart should only be one more than modifiedEnd"), m = [new Se(t, n - t + 1, r, 0)]) : (Ie.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), Ie.Assert(r === s + 1, "modifiedStart should only be one more than modifiedEnd"), m = []), m;
			}
			const o = [0], l = [0], u = this.ComputeRecursionPoint(t, n, r, s, o, l, a), c = o[0], h = l[0];
			if (u !== null) return u;
			if (!a[0]) {
				const m = this.ComputeDiffRecursive(t, c, r, h, a);
				let f = [];
				return a[0] ? f = [new Se(c + 1, n - (c + 1) + 1, h + 1, s - (h + 1) + 1)] : f = this.ComputeDiffRecursive(c + 1, n, h + 1, s, a), this.ConcatenateChanges(m, f);
			}
			return [new Se(t, n - t + 1, r, s - r + 1)];
		}
		WALKTRACE(t, n, r, s, a, o, l, u, c, h, m, f, d, b, p, v, _, N) {
			let y = null, A = null, B = new b1(), C = n, w = r, L = d[0] - v[0] - s, x = -1073741824, $ = this.m_forwardHistory.length - 1;
			do {
				const R = L + t;
				R === C || R < w && c[R - 1] < c[R + 1] ? (m = c[R + 1], b = m - L - s, m < x && B.MarkNextChange(), x = m, B.AddModifiedElement(m + 1, b), L = R + 1 - t) : (m = c[R - 1] + 1, b = m - L - s, m < x && B.MarkNextChange(), x = m - 1, B.AddOriginalElement(m, b + 1), L = R - 1 - t), $ >= 0 && (c = this.m_forwardHistory[$], t = c[0], C = 1, w = c.length - 1);
			} while (--$ >= -1);
			if (y = B.getReverseChanges(), N[0]) {
				let R = d[0] + 1, ue = v[0] + 1;
				if (y !== null && y.length > 0) {
					const M = y[y.length - 1];
					R = Math.max(R, M.getOriginalEnd()), ue = Math.max(ue, M.getModifiedEnd());
				}
				A = [new Se(R, f - R + 1, ue, p - ue + 1)];
			} else {
				B = new b1(), C = o, w = l, L = d[0] - v[0] - u, x = 1073741824, $ = _ ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
				do {
					const R = L + a;
					R === C || R < w && h[R - 1] >= h[R + 1] ? (m = h[R + 1] - 1, b = m - L - u, m > x && B.MarkNextChange(), x = m + 1, B.AddOriginalElement(m + 1, b + 1), L = R + 1 - a) : (m = h[R - 1], b = m - L - u, m > x && B.MarkNextChange(), x = m, B.AddModifiedElement(m + 1, b + 1), L = R - 1 - a), $ >= 0 && (h = this.m_reverseHistory[$], a = h[0], C = 1, w = h.length - 1);
				} while (--$ >= -1);
				A = B.getChanges();
			}
			return this.ConcatenateChanges(y, A);
		}
		ComputeRecursionPoint(t, n, r, s, a, o, l) {
			let u = 0, c = 0, h = 0, m = 0, f = 0, d = 0;
			t--, r--, a[0] = 0, o[0] = 0, this.m_forwardHistory = [], this.m_reverseHistory = [];
			const b = n - t + (s - r), p = b + 1, v = new Int32Array(p), _ = new Int32Array(p), N = s - r, y = n - t, A = t - r, B = n - s, C = (y - N) % 2 === 0;
			v[N] = t, _[y] = n, l[0] = !1;
			for (let w = 1; w <= b / 2 + 1; w++) {
				let L = 0, x = 0;
				h = this.ClipDiagonalBound(N - w, w, N, p), m = this.ClipDiagonalBound(N + w, w, N, p);
				for (let R = h; R <= m; R += 2) {
					R === h || R < m && v[R - 1] < v[R + 1] ? u = v[R + 1] : u = v[R - 1] + 1, c = u - (R - N) - A;
					const ue = u;
					for (; u < n && c < s && this.ElementsAreEqual(u + 1, c + 1);) u++, c++;
					if (v[R] = u, u + c > L + x && (L = u, x = c), !C && Math.abs(R - y) <= w - 1 && u >= _[R]) return a[0] = u, o[0] = c, ue <= _[R] && w <= 1448 ? this.WALKTRACE(N, h, m, A, y, f, d, B, v, _, u, n, a, c, s, o, C, l) : null;
				}
				const $ = (L - t + (x - r) - w) / 2;
				if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(L, $)) return l[0] = !0, a[0] = L, o[0] = x, $ > 0 && w <= 1448 ? this.WALKTRACE(N, h, m, A, y, f, d, B, v, _, u, n, a, c, s, o, C, l) : (t++, r++, [new Se(t, n - t + 1, r, s - r + 1)]);
				f = this.ClipDiagonalBound(y - w, w, y, p), d = this.ClipDiagonalBound(y + w, w, y, p);
				for (let R = f; R <= d; R += 2) {
					R === f || R < d && _[R - 1] >= _[R + 1] ? u = _[R + 1] - 1 : u = _[R - 1], c = u - (R - y) - B;
					const ue = u;
					for (; u > t && c > r && this.ElementsAreEqual(u, c);) u--, c--;
					if (_[R] = u, C && Math.abs(R - N) <= w && u <= v[R]) return a[0] = u, o[0] = c, ue >= v[R] && w <= 1448 ? this.WALKTRACE(N, h, m, A, y, f, d, B, v, _, u, n, a, c, s, o, C, l) : null;
				}
				if (w <= 1447) {
					let R = new Int32Array(m - h + 2);
					R[0] = N - h + 1, Be.Copy2(v, h, R, 1, m - h + 1), this.m_forwardHistory.push(R), R = new Int32Array(d - f + 2), R[0] = y - f + 1, Be.Copy2(_, f, R, 1, d - f + 1), this.m_reverseHistory.push(R);
				}
			}
			return this.WALKTRACE(N, h, m, A, y, f, d, B, v, _, u, n, a, c, s, o, C, l);
		}
		PrettifyChanges(t) {
			for (let n = 0; n < t.length; n++) {
				const r = t[n], s = n < t.length - 1 ? t[n + 1].originalStart : this._originalElementsOrHash.length, a = n < t.length - 1 ? t[n + 1].modifiedStart : this._modifiedElementsOrHash.length, o = r.originalLength > 0, l = r.modifiedLength > 0;
				for (; r.originalStart + r.originalLength < s && r.modifiedStart + r.modifiedLength < a && (!o || this.OriginalElementsAreEqual(r.originalStart, r.originalStart + r.originalLength)) && (!l || this.ModifiedElementsAreEqual(r.modifiedStart, r.modifiedStart + r.modifiedLength));) {
					const c = this.ElementsAreStrictEqual(r.originalStart, r.modifiedStart);
					if (this.ElementsAreStrictEqual(r.originalStart + r.originalLength, r.modifiedStart + r.modifiedLength) && !c) break;
					r.originalStart++, r.modifiedStart++;
				}
				const u = [null];
				if (n < t.length - 1 && this.ChangesOverlap(t[n], t[n + 1], u)) {
					t[n] = u[0], t.splice(n + 1, 1), n--;
					continue;
				}
			}
			for (let n = t.length - 1; n >= 0; n--) {
				const r = t[n];
				let s = 0, a = 0;
				if (n > 0) {
					const m = t[n - 1];
					s = m.originalStart + m.originalLength, a = m.modifiedStart + m.modifiedLength;
				}
				const o = r.originalLength > 0, l = r.modifiedLength > 0;
				let u = 0, c = this._boundaryScore(r.originalStart, r.originalLength, r.modifiedStart, r.modifiedLength);
				for (let m = 1;; m++) {
					const f = r.originalStart - m, d = r.modifiedStart - m;
					if (f < s || d < a || o && !this.OriginalElementsAreEqual(f, f + r.originalLength) || l && !this.ModifiedElementsAreEqual(d, d + r.modifiedLength)) break;
					const b = (f === s && d === a ? 5 : 0) + this._boundaryScore(f, r.originalLength, d, r.modifiedLength);
					b > c && (c = b, u = m);
				}
				r.originalStart -= u, r.modifiedStart -= u;
				const h = [null];
				if (n > 0 && this.ChangesOverlap(t[n - 1], t[n], h)) {
					t[n - 1] = h[0], t.splice(n, 1), n++;
					continue;
				}
			}
			if (this._hasStrings) for (let n = 1, r = t.length; n < r; n++) {
				const s = t[n - 1], a = t[n], o = a.originalStart - s.originalStart - s.originalLength, l = s.originalStart, u = a.originalStart + a.originalLength, c = u - l, h = s.modifiedStart, m = a.modifiedStart + a.modifiedLength, f = m - h;
				if (o < 5 && c < 20 && f < 20) {
					const d = this._findBetterContiguousSequence(l, c, h, f, o);
					if (d) {
						const [b, p] = d;
						(b !== s.originalStart + s.originalLength || p !== s.modifiedStart + s.modifiedLength) && (s.originalLength = b - s.originalStart, s.modifiedLength = p - s.modifiedStart, a.originalStart = b + o, a.modifiedStart = p + o, a.originalLength = u - a.originalStart, a.modifiedLength = m - a.modifiedStart);
					}
				}
			}
			return t;
		}
		_findBetterContiguousSequence(t, n, r, s, a) {
			if (n < a || s < a) return null;
			const o = t + n - a + 1, l = r + s - a + 1;
			let u = 0, c = 0, h = 0;
			for (let m = t; m < o; m++) for (let f = r; f < l; f++) {
				const d = this._contiguousSequenceScore(m, f, a);
				d > 0 && d > u && (u = d, c = m, h = f);
			}
			return u > 0 ? [c, h] : null;
		}
		_contiguousSequenceScore(t, n, r) {
			let s = 0;
			for (let a = 0; a < r; a++) {
				if (!this.ElementsAreEqual(t + a, n + a)) return 0;
				s += this._originalStringElements[t + a].length;
			}
			return s;
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
		_boundaryScore(t, n, r, s) {
			return (this._OriginalRegionIsBoundary(t, n) ? 1 : 0) + (this._ModifiedRegionIsBoundary(r, s) ? 1 : 0);
		}
		ConcatenateChanges(t, n) {
			const r = [];
			if (t.length === 0 || n.length === 0) return n.length > 0 ? n : t;
			if (this.ChangesOverlap(t[t.length - 1], n[0], r)) {
				const s = new Array(t.length + n.length - 1);
				return Be.Copy(t, 0, s, 0, t.length - 1), s[t.length - 1] = r[0], Be.Copy(n, 1, s, t.length, n.length - 1), s;
			} else {
				const s = new Array(t.length + n.length);
				return Be.Copy(t, 0, s, 0, t.length), Be.Copy(n, 0, s, t.length, n.length), s;
			}
		}
		ChangesOverlap(t, n, r) {
			if (Ie.Assert(t.originalStart <= n.originalStart, "Left change is not less than or equal to right change"), Ie.Assert(t.modifiedStart <= n.modifiedStart, "Left change is not less than or equal to right change"), t.originalStart + t.originalLength >= n.originalStart || t.modifiedStart + t.modifiedLength >= n.modifiedStart) {
				const s = t.originalStart;
				let a = t.originalLength;
				const o = t.modifiedStart;
				let l = t.modifiedLength;
				return t.originalStart + t.originalLength >= n.originalStart && (a = n.originalStart + n.originalLength - t.originalStart), t.modifiedStart + t.modifiedLength >= n.modifiedStart && (l = n.modifiedStart + n.modifiedLength - t.modifiedStart), r[0] = new Se(s, a, o, l), !0;
			} else return r[0] = null, !1;
		}
		ClipDiagonalBound(t, n, r, s) {
			if (t >= 0 && t < s) return t;
			const a = r, o = s - r - 1, l = n % 2 === 0;
			return t < 0 ? l === (a % 2 === 0) ? 0 : 1 : l === (o % 2 === 0) ? s - 1 : s - 2;
		}
	}, W = class Te {
		constructor(t, n) {
			this.lineNumber = t, this.column = n;
		}
		with(t = this.lineNumber, n = this.column) {
			return t === this.lineNumber && n === this.column ? this : new Te(t, n);
		}
		delta(t = 0, n = 0) {
			return this.with(Math.max(1, this.lineNumber + t), Math.max(1, this.column + n));
		}
		equals(t) {
			return Te.equals(this, t);
		}
		static equals(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.lineNumber === n.lineNumber && t.column === n.column;
		}
		isBefore(t) {
			return Te.isBefore(this, t);
		}
		static isBefore(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column < n.column;
		}
		isBeforeOrEqual(t) {
			return Te.isBeforeOrEqual(this, t);
		}
		static isBeforeOrEqual(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column <= n.column;
		}
		static compare(t, n) {
			const r = t.lineNumber | 0, s = n.lineNumber | 0;
			return r === s ? (t.column | 0) - (n.column | 0) : r - s;
		}
		clone() {
			return new Te(this.lineNumber, this.column);
		}
		toString() {
			return "(" + this.lineNumber + "," + this.column + ")";
		}
		static lift(t) {
			return new Te(t.lineNumber, t.column);
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
	}, I = class X {
		constructor(t, n, r, s) {
			t > r || t === r && n > s ? (this.startLineNumber = r, this.startColumn = s, this.endLineNumber = t, this.endColumn = n) : (this.startLineNumber = t, this.startColumn = n, this.endLineNumber = r, this.endColumn = s);
		}
		isEmpty() {
			return X.isEmpty(this);
		}
		static isEmpty(t) {
			return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn;
		}
		containsPosition(t) {
			return X.containsPosition(this, t);
		}
		static containsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column < t.startColumn || n.lineNumber === t.endLineNumber && n.column > t.endColumn);
		}
		static strictContainsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column <= t.startColumn || n.lineNumber === t.endLineNumber && n.column >= t.endColumn);
		}
		containsRange(t) {
			return X.containsRange(this, t);
		}
		static containsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn < t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn > t.endColumn);
		}
		strictContainsRange(t) {
			return X.strictContainsRange(this, t);
		}
		static strictContainsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn <= t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn >= t.endColumn);
		}
		plusRange(t) {
			return X.plusRange(this, t);
		}
		static plusRange(t, n) {
			let r, s, a, o;
			return n.startLineNumber < t.startLineNumber ? (r = n.startLineNumber, s = n.startColumn) : n.startLineNumber === t.startLineNumber ? (r = n.startLineNumber, s = Math.min(n.startColumn, t.startColumn)) : (r = t.startLineNumber, s = t.startColumn), n.endLineNumber > t.endLineNumber ? (a = n.endLineNumber, o = n.endColumn) : n.endLineNumber === t.endLineNumber ? (a = n.endLineNumber, o = Math.max(n.endColumn, t.endColumn)) : (a = t.endLineNumber, o = t.endColumn), new X(r, s, a, o);
		}
		intersectRanges(t) {
			return X.intersectRanges(this, t);
		}
		static intersectRanges(t, n) {
			let r = t.startLineNumber, s = t.startColumn, a = t.endLineNumber, o = t.endColumn;
			const l = n.startLineNumber, u = n.startColumn, c = n.endLineNumber, h = n.endColumn;
			return r < l ? (r = l, s = u) : r === l && (s = Math.max(s, u)), a > c ? (a = c, o = h) : a === c && (o = Math.min(o, h)), r > a || r === a && s > o ? null : new X(r, s, a, o);
		}
		equalsRange(t) {
			return X.equalsRange(this, t);
		}
		static equalsRange(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.startLineNumber === n.startLineNumber && t.startColumn === n.startColumn && t.endLineNumber === n.endLineNumber && t.endColumn === n.endColumn;
		}
		getEndPosition() {
			return X.getEndPosition(this);
		}
		static getEndPosition(t) {
			return new W(t.endLineNumber, t.endColumn);
		}
		getStartPosition() {
			return X.getStartPosition(this);
		}
		static getStartPosition(t) {
			return new W(t.startLineNumber, t.startColumn);
		}
		toString() {
			return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
		}
		setEndPosition(t, n) {
			return new X(this.startLineNumber, this.startColumn, t, n);
		}
		setStartPosition(t, n) {
			return new X(t, n, this.endLineNumber, this.endColumn);
		}
		collapseToStart() {
			return X.collapseToStart(this);
		}
		static collapseToStart(t) {
			return new X(t.startLineNumber, t.startColumn, t.startLineNumber, t.startColumn);
		}
		collapseToEnd() {
			return X.collapseToEnd(this);
		}
		static collapseToEnd(t) {
			return new X(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn);
		}
		delta(t) {
			return new X(this.startLineNumber + t, this.startColumn, this.endLineNumber + t, this.endColumn);
		}
		isSingleLine() {
			return this.startLineNumber === this.endLineNumber;
		}
		static fromPositions(t, n = t) {
			return new X(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static lift(t) {
			return t ? new X(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : null;
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
				const r = t.startLineNumber | 0, s = n.startLineNumber | 0;
				if (r === s) {
					const a = t.startColumn | 0, o = n.startColumn | 0;
					if (a === o) {
						const l = t.endLineNumber | 0, u = n.endLineNumber | 0;
						return l === u ? (t.endColumn | 0) - (n.endColumn | 0) : l - u;
					}
					return a - o;
				}
				return r - s;
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
	function v1(e) {
		return e < 0 ? 0 : e > 255 ? 255 : e | 0;
	}
	function Ve(e) {
		return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0;
	}
	var qi = class Ms {
		constructor(t) {
			const n = v1(t);
			this._defaultValue = n, this._asciiMap = Ms._createAsciiMap(n), this._map = /* @__PURE__ */ new Map();
		}
		static _createAsciiMap(t) {
			const n = /* @__PURE__ */ new Uint8Array(256);
			return n.fill(t), n;
		}
		set(t, n) {
			const r = v1(n);
			t >= 0 && t < 256 ? this._asciiMap[t] = r : this._map.set(t, r);
		}
		get(t) {
			return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue;
		}
		clear() {
			this._asciiMap.fill(this._defaultValue), this._map.clear();
		}
	}, Ui = class {
		constructor(e, t, n) {
			const r = new Uint8Array(e * t);
			for (let s = 0, a = e * t; s < a; s++) r[s] = n;
			this._data = r, this.rows = e, this.cols = t;
		}
		get(e, t) {
			return this._data[e * this.cols + t];
		}
		set(e, t, n) {
			this._data[e * this.cols + t] = n;
		}
	}, $i = class {
		constructor(e) {
			let t = 0, n = 0;
			for (let s = 0, a = e.length; s < a; s++) {
				const [o, l, u] = e[s];
				l > t && (t = l), o > n && (n = o), u > n && (n = u);
			}
			t++, n++;
			const r = new Ui(n, t, 0);
			for (let s = 0, a = e.length; s < a; s++) {
				const [o, l, u] = e[s];
				r.set(o, l, u);
			}
			this._states = r, this._maxCharCode = t;
		}
		nextState(e, t) {
			return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t);
		}
	};
	let hn = null;
	function Wi() {
		return hn === null && (hn = new $i([
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
		])), hn;
	}
	let nt = null;
	function Hi() {
		if (nt === null) {
			nt = new qi(0);
			const e = ` 	<>'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…|`;
			for (let n = 0; n < 36; n++) nt.set(e.charCodeAt(n), 1);
			const t = ".,;:";
			for (let n = 0; n < 4; n++) nt.set(t.charCodeAt(n), 2);
		}
		return nt;
	}
	var zi = class Un {
		static _createLink(t, n, r, s, a) {
			let o = a - 1;
			do {
				const l = n.charCodeAt(o);
				if (t.get(l) !== 2) break;
				o--;
			} while (o > s);
			if (s > 0) {
				const l = n.charCodeAt(s - 1), u = n.charCodeAt(o);
				(l === 40 && u === 41 || l === 91 && u === 93 || l === 123 && u === 125) && o--;
			}
			return {
				range: {
					startLineNumber: r,
					startColumn: s + 1,
					endLineNumber: r,
					endColumn: o + 2
				},
				url: n.substring(s, o + 1)
			};
		}
		static computeLinks(t, n = Wi()) {
			const r = Hi(), s = [];
			for (let a = 1, o = t.getLineCount(); a <= o; a++) {
				const l = t.getLineContent(a), u = l.length;
				let c = 0, h = 0, m = 0, f = 1, d = !1, b = !1, p = !1, v = !1;
				for (; c < u;) {
					let _ = !1;
					const N = l.charCodeAt(c);
					if (f === 13) {
						let y;
						switch (N) {
							case 40:
								d = !0, y = 0;
								break;
							case 41:
								y = d ? 0 : 1;
								break;
							case 91:
								p = !0, b = !0, y = 0;
								break;
							case 93:
								p = !1, y = b ? 0 : 1;
								break;
							case 123:
								v = !0, y = 0;
								break;
							case 125:
								y = v ? 0 : 1;
								break;
							case 39:
							case 34:
							case 96:
								m === N ? y = 1 : m === 39 || m === 34 || m === 96 ? y = 0 : y = 1;
								break;
							case 42:
								y = m === 42 ? 1 : 0;
								break;
							case 32:
								y = p ? 0 : 1;
								break;
							default: y = r.get(N);
						}
						y === 1 && (s.push(Un._createLink(r, l, a, h, c)), _ = !0);
					} else if (f === 12) {
						let y;
						N === 91 ? (b = !0, y = 0) : y = r.get(N), y === 1 ? _ = !0 : f = 13;
					} else f = n.nextState(f, N), f === 0 && (_ = !0);
					_ && (f = 1, d = !1, b = !1, v = !1, h = c + 1, m = N), c++;
				}
				f === 13 && s.push(Un._createLink(r, l, a, h, u));
			}
			return s;
		}
	};
	function Oi(e) {
		return !e || typeof e.getLineCount != "function" || typeof e.getLineContent != "function" ? [] : zi.computeLinks(e);
	}
	var ji = class Ps {
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
			this.INSTANCE = new Ps();
		}
		navigateValueSet(t, n, r, s, a) {
			if (t && n) {
				const o = this.doNavigateValueSet(n, a);
				if (o) return {
					range: t,
					value: o
				};
			}
			if (r && s) {
				const o = this.doNavigateValueSet(s, a);
				if (o) return {
					range: r,
					value: o
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
			let s = Number(t);
			const a = parseFloat(t);
			return !isNaN(s) && !isNaN(a) && s === a ? s === 0 && !n ? null : (s = Math.floor(s * r), s += n ? r : -r, String(s / r)) : null;
		}
		textReplace(t, n) {
			return this.valueSetsReplace(this._defaultValueSet, t, n);
		}
		valueSetsReplace(t, n, r) {
			let s = null;
			for (let a = 0, o = t.length; s === null && a < o; a++) s = this.valueSetReplace(t[a], n, r);
			return s;
		}
		valueSetReplace(t, n, r) {
			let s = t.indexOf(n);
			return s >= 0 ? (s += r ? 1 : -1, s < 0 ? s = t.length - 1 : s %= t.length, t[s]) : null;
		}
	};
	const y1 = Object.freeze(function(e, t) {
		const n = setTimeout(e.bind(t), 0);
		return { dispose() {
			clearTimeout(n);
		} };
	});
	var Lt;
	(function(e) {
		function t(n) {
			return n === e.None || n === e.Cancelled || n instanceof Nt ? !0 : !n || typeof n != "object" ? !1 : typeof n.isCancellationRequested == "boolean" && typeof n.onCancellationRequested == "function";
		}
		e.isCancellationToken = t, e.None = Object.freeze({
			isCancellationRequested: !1,
			onCancellationRequested: Zt.None
		}), e.Cancelled = Object.freeze({
			isCancellationRequested: !0,
			onCancellationRequested: y1
		});
	})(Lt || (Lt = {}));
	var Nt = class {
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
			return this._isCancelled ? y1 : (this._emitter || (this._emitter = new he()), this._emitter.event);
		}
		dispose() {
			this._emitter && (this._emitter.dispose(), this._emitter = null);
		}
	}, Gi = class {
		constructor(e) {
			this._token = void 0, this._parentListener = void 0, this._parentListener = e && e.onCancellationRequested(this.cancel, this);
		}
		get token() {
			return this._token || (this._token = new Nt()), this._token;
		}
		cancel() {
			this._token ? this._token instanceof Nt && this._token.cancel() : this._token = Lt.Cancelled;
		}
		dispose(e = !1) {
			e && this.cancel(), this._parentListener?.dispose(), this._token ? this._token instanceof Nt && this._token.dispose() : this._token = Lt.None;
		}
	}, mn = class {
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
	const St = new mn(), fn = new mn(), dn = new mn(), Xi = new Array(230), Qi = Object.create(null), Yi = Object.create(null), _1 = [];
	for (let e = 0; e <= 193; e++) _1[e] = -1;
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
		for (const s of t) {
			const [a, o, l, u, c, h, m, f, d] = s;
			if (r[o] || (r[o] = !0, Qi[l] = o, Yi[l.toLowerCase()] = o, a && (_1[o] = u)), !n[u]) {
				if (n[u] = !0, !c) throw new Error(`String representation missing for key code ${u} around scan code ${l}`);
				St.define(u, c), fn.define(u, f || c), dn.define(u, d || f || c);
			}
			h && (Xi[h] = u);
		}
	})();
	var L1;
	(function(e) {
		function t(l) {
			return St.keyCodeToStr(l);
		}
		e.toString = t;
		function n(l) {
			return St.strToKeyCode(l);
		}
		e.fromString = n;
		function r(l) {
			return fn.keyCodeToStr(l);
		}
		e.toUserSettingsUS = r;
		function s(l) {
			return dn.keyCodeToStr(l);
		}
		e.toUserSettingsGeneral = s;
		function a(l) {
			return fn.strToKeyCode(l) || dn.strToKeyCode(l);
		}
		e.fromUserSettings = a;
		function o(l) {
			if (l >= 98 && l <= 113) return null;
			switch (l) {
				case 16: return "Up";
				case 18: return "Down";
				case 15: return "Left";
				case 17: return "Right";
				case 20: return "Delete";
			}
			return St.keyCodeToStr(l);
		}
		e.toElectronAccelerator = o;
	})(L1 || (L1 = {}));
	function Ji(e, t) {
		return (e | (t & 65535) << 16 >>> 0) >>> 0;
	}
	const Zi = 65, Ki = 97, ea = 90, ta = 122, Ee = 46, J = 47, ie = 92, we = 58, na = 63;
	var N1 = class extends Error {
		constructor(e, t, n) {
			let r;
			typeof t == "string" && t.indexOf("not ") === 0 ? (r = "must not be", t = t.replace(/^not /, "")) : r = "must be";
			let s = `The "${e}" ${e.indexOf(".") !== -1 ? "property" : "argument"} ${r} of type ${t}`;
			s += `. Received type ${typeof n}`, super(s), this.code = "ERR_INVALID_ARG_TYPE";
		}
	};
	function ra(e, t) {
		if (e === null || typeof e != "object") throw new N1(t, "Object", e);
	}
	function G(e, t) {
		if (typeof e != "string") throw new N1(t, "string", e);
	}
	const ve = oi === "win32";
	function q(e) {
		return e === J || e === ie;
	}
	function gn(e) {
		return e === J;
	}
	function ye(e) {
		return e >= Zi && e <= ea || e >= Ki && e <= ta;
	}
	function Rt(e, t, n, r) {
		let s = "", a = 0, o = -1, l = 0, u = 0;
		for (let c = 0; c <= e.length; ++c) {
			if (c < e.length) u = e.charCodeAt(c);
			else {
				if (r(u)) break;
				u = J;
			}
			if (r(u)) {
				if (!(o === c - 1 || l === 1)) if (l === 2) {
					if (s.length < 2 || a !== 2 || s.charCodeAt(s.length - 1) !== Ee || s.charCodeAt(s.length - 2) !== Ee) {
						if (s.length > 2) {
							const h = s.lastIndexOf(n);
							h === -1 ? (s = "", a = 0) : (s = s.slice(0, h), a = s.length - 1 - s.lastIndexOf(n)), o = c, l = 0;
							continue;
						} else if (s.length !== 0) {
							s = "", a = 0, o = c, l = 0;
							continue;
						}
					}
					t && (s += s.length > 0 ? `${n}..` : "..", a = 2);
				} else s.length > 0 ? s += `${n}${e.slice(o + 1, c)}` : s = e.slice(o + 1, c), a = c - o - 1;
				o = c, l = 0;
			} else u === Ee && l !== -1 ? ++l : l = -1;
		}
		return s;
	}
	function sa(e) {
		return e ? `${e[0] === "." ? "" : "."}${e}` : "";
	}
	function S1(e, t) {
		ra(t, "pathObject");
		const n = t.dir || t.root, r = t.base || `${t.name || ""}${sa(t.ext)}`;
		return n ? n === t.root ? `${n}${r}` : `${n}${e}${r}` : r;
	}
	const te = {
		resolve(...e) {
			let t = "", n = "", r = !1;
			for (let s = e.length - 1; s >= -1; s--) {
				let a;
				if (s >= 0) {
					if (a = e[s], G(a, `paths[${s}]`), a.length === 0) continue;
				} else t.length === 0 ? a = yt() : (a = e1[`=${t}`] || yt(), (a === void 0 || a.slice(0, 2).toLowerCase() !== t.toLowerCase() && a.charCodeAt(2) === ie) && (a = `${t}\\`));
				const o = a.length;
				let l = 0, u = "", c = !1;
				const h = a.charCodeAt(0);
				if (o === 1) q(h) && (l = 1, c = !0);
				else if (q(h)) if (c = !0, q(a.charCodeAt(1))) {
					let m = 2, f = m;
					for (; m < o && !q(a.charCodeAt(m));) m++;
					if (m < o && m !== f) {
						const d = a.slice(f, m);
						for (f = m; m < o && q(a.charCodeAt(m));) m++;
						if (m < o && m !== f) {
							for (f = m; m < o && !q(a.charCodeAt(m));) m++;
							(m === o || m !== f) && (u = `\\\\${d}\\${a.slice(f, m)}`, l = m);
						}
					}
				} else l = 1;
				else ye(h) && a.charCodeAt(1) === we && (u = a.slice(0, 2), l = 2, o > 2 && q(a.charCodeAt(2)) && (c = !0, l = 3));
				if (u.length > 0) if (t.length > 0) {
					if (u.toLowerCase() !== t.toLowerCase()) continue;
				} else t = u;
				if (r) {
					if (t.length > 0) break;
				} else if (n = `${a.slice(l)}\\${n}`, r = c, c && t.length > 0) break;
			}
			return n = Rt(n, !r, "\\", q), r ? `${t}\\${n}` : `${t}${n}` || ".";
		},
		normalize(e) {
			G(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = 0, r, s = !1;
			const a = e.charCodeAt(0);
			if (t === 1) return gn(a) ? "\\" : e;
			if (q(a)) if (s = !0, q(e.charCodeAt(1))) {
				let l = 2, u = l;
				for (; l < t && !q(e.charCodeAt(l));) l++;
				if (l < t && l !== u) {
					const c = e.slice(u, l);
					for (u = l; l < t && q(e.charCodeAt(l));) l++;
					if (l < t && l !== u) {
						for (u = l; l < t && !q(e.charCodeAt(l));) l++;
						if (l === t) return `\\\\${c}\\${e.slice(u)}\\`;
						l !== u && (r = `\\\\${c}\\${e.slice(u, l)}`, n = l);
					}
				}
			} else n = 1;
			else ye(a) && e.charCodeAt(1) === we && (r = e.slice(0, 2), n = 2, t > 2 && q(e.charCodeAt(2)) && (s = !0, n = 3));
			let o = n < t ? Rt(e.slice(n), !s, "\\", q) : "";
			if (o.length === 0 && !s && (o = "."), o.length > 0 && q(e.charCodeAt(t - 1)) && (o += "\\"), !s && r === void 0 && e.includes(":")) {
				if (o.length >= 2 && ye(o.charCodeAt(0)) && o.charCodeAt(1) === we) return `.\\${o}`;
				let l = e.indexOf(":");
				do
					if (l === t - 1 || q(e.charCodeAt(l + 1))) return `.\\${o}`;
				while ((l = e.indexOf(":", l + 1)) !== -1);
			}
			return r === void 0 ? s ? `\\${o}` : o : s ? `${r}\\${o}` : `${r}${o}`;
		},
		isAbsolute(e) {
			G(e, "path");
			const t = e.length;
			if (t === 0) return !1;
			const n = e.charCodeAt(0);
			return q(n) || t > 2 && ye(n) && e.charCodeAt(1) === we && q(e.charCodeAt(2));
		},
		join(...e) {
			if (e.length === 0) return ".";
			let t, n;
			for (let a = 0; a < e.length; ++a) {
				const o = e[a];
				G(o, "path"), o.length > 0 && (t === void 0 ? t = n = o : t += `\\${o}`);
			}
			if (t === void 0) return ".";
			let r = !0, s = 0;
			if (typeof n == "string" && q(n.charCodeAt(0))) {
				++s;
				const a = n.length;
				a > 1 && q(n.charCodeAt(1)) && (++s, a > 2 && (q(n.charCodeAt(2)) ? ++s : r = !1));
			}
			if (r) {
				for (; s < t.length && q(t.charCodeAt(s));) s++;
				s >= 2 && (t = `\\${t.slice(s)}`);
			}
			return te.normalize(t);
		},
		relative(e, t) {
			if (G(e, "from"), G(t, "to"), e === t) return "";
			const n = te.resolve(e), r = te.resolve(t);
			if (n === r || (e = n.toLowerCase(), t = r.toLowerCase(), e === t)) return "";
			if (n.length !== e.length || r.length !== t.length) {
				const b = n.split("\\"), p = r.split("\\");
				b[b.length - 1] === "" && b.pop(), p[p.length - 1] === "" && p.pop();
				const v = b.length, _ = p.length, N = v < _ ? v : _;
				let y;
				for (y = 0; y < N && b[y].toLowerCase() === p[y].toLowerCase(); y++);
				return y === 0 ? r : y === N ? _ > N ? p.slice(y).join("\\") : v > N ? "..\\".repeat(v - 1 - y) + ".." : "" : "..\\".repeat(v - y) + p.slice(y).join("\\");
			}
			let s = 0;
			for (; s < e.length && e.charCodeAt(s) === ie;) s++;
			let a = e.length;
			for (; a - 1 > s && e.charCodeAt(a - 1) === ie;) a--;
			const o = a - s;
			let l = 0;
			for (; l < t.length && t.charCodeAt(l) === ie;) l++;
			let u = t.length;
			for (; u - 1 > l && t.charCodeAt(u - 1) === ie;) u--;
			const c = u - l, h = o < c ? o : c;
			let m = -1, f = 0;
			for (; f < h; f++) {
				const b = e.charCodeAt(s + f);
				if (b !== t.charCodeAt(l + f)) break;
				b === ie && (m = f);
			}
			if (f !== h) {
				if (m === -1) return r;
			} else {
				if (c > h) {
					if (t.charCodeAt(l + f) === ie) return r.slice(l + f + 1);
					if (f === 2) return r.slice(l + f);
				}
				o > h && (e.charCodeAt(s + f) === ie ? m = f : f === 2 && (m = 3)), m === -1 && (m = 0);
			}
			let d = "";
			for (f = s + m + 1; f <= a; ++f) (f === a || e.charCodeAt(f) === ie) && (d += d.length === 0 ? ".." : "\\..");
			return l += m, d.length > 0 ? `${d}${r.slice(l, u)}` : (r.charCodeAt(l) === ie && ++l, r.slice(l, u));
		},
		toNamespacedPath(e) {
			if (typeof e != "string" || e.length === 0) return e;
			const t = te.resolve(e);
			if (t.length <= 2) return e;
			if (t.charCodeAt(0) === ie) {
				if (t.charCodeAt(1) === ie) {
					const n = t.charCodeAt(2);
					if (n !== na && n !== Ee) return `\\\\?\\UNC\\${t.slice(2)}`;
				}
			} else if (ye(t.charCodeAt(0)) && t.charCodeAt(1) === we && t.charCodeAt(2) === ie) return `\\\\?\\${t}`;
			return t;
		},
		dirname(e) {
			G(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = -1, r = 0;
			const s = e.charCodeAt(0);
			if (t === 1) return q(s) ? e : ".";
			if (q(s)) {
				if (n = r = 1, q(e.charCodeAt(1))) {
					let l = 2, u = l;
					for (; l < t && !q(e.charCodeAt(l));) l++;
					if (l < t && l !== u) {
						for (u = l; l < t && q(e.charCodeAt(l));) l++;
						if (l < t && l !== u) {
							for (u = l; l < t && !q(e.charCodeAt(l));) l++;
							if (l === t) return e;
							l !== u && (n = r = l + 1);
						}
					}
				}
			} else ye(s) && e.charCodeAt(1) === we && (n = t > 2 && q(e.charCodeAt(2)) ? 3 : 2, r = n);
			let a = -1, o = !0;
			for (let l = t - 1; l >= r; --l) if (q(e.charCodeAt(l))) {
				if (!o) {
					a = l;
					break;
				}
			} else o = !1;
			if (a === -1) {
				if (n === -1) return ".";
				a = n;
			}
			return e.slice(0, a);
		},
		basename(e, t) {
			t !== void 0 && G(t, "suffix"), G(e, "path");
			let n = 0, r = -1, s = !0, a;
			if (e.length >= 2 && ye(e.charCodeAt(0)) && e.charCodeAt(1) === we && (n = 2), t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let o = t.length - 1, l = -1;
				for (a = e.length - 1; a >= n; --a) {
					const u = e.charCodeAt(a);
					if (q(u)) {
						if (!s) {
							n = a + 1;
							break;
						}
					} else l === -1 && (s = !1, l = a + 1), o >= 0 && (u === t.charCodeAt(o) ? --o === -1 && (r = a) : (o = -1, r = l));
				}
				return n === r ? r = l : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (a = e.length - 1; a >= n; --a) if (q(e.charCodeAt(a))) {
				if (!s) {
					n = a + 1;
					break;
				}
			} else r === -1 && (s = !1, r = a + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			G(e, "path");
			let t = 0, n = -1, r = 0, s = -1, a = !0, o = 0;
			e.length >= 2 && e.charCodeAt(1) === we && ye(e.charCodeAt(0)) && (t = r = 2);
			for (let l = e.length - 1; l >= t; --l) {
				const u = e.charCodeAt(l);
				if (q(u)) {
					if (!a) {
						r = l + 1;
						break;
					}
					continue;
				}
				s === -1 && (a = !1, s = l + 1), u === Ee ? n === -1 ? n = l : o !== 1 && (o = 1) : n !== -1 && (o = -1);
			}
			return n === -1 || s === -1 || o === 0 || o === 1 && n === s - 1 && n === r + 1 ? "" : e.slice(n, s);
		},
		format: S1.bind(null, "\\"),
		parse(e) {
			G(e, "path");
			const t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			const n = e.length;
			let r = 0, s = e.charCodeAt(0);
			if (n === 1) return q(s) ? (t.root = t.dir = e, t) : (t.base = t.name = e, t);
			if (q(s)) {
				if (r = 1, q(e.charCodeAt(1))) {
					let m = 2, f = m;
					for (; m < n && !q(e.charCodeAt(m));) m++;
					if (m < n && m !== f) {
						for (f = m; m < n && q(e.charCodeAt(m));) m++;
						if (m < n && m !== f) {
							for (f = m; m < n && !q(e.charCodeAt(m));) m++;
							m === n ? r = m : m !== f && (r = m + 1);
						}
					}
				}
			} else if (ye(s) && e.charCodeAt(1) === we) {
				if (n <= 2) return t.root = t.dir = e, t;
				if (r = 2, q(e.charCodeAt(2))) {
					if (n === 3) return t.root = t.dir = e, t;
					r = 3;
				}
			}
			r > 0 && (t.root = e.slice(0, r));
			let a = -1, o = r, l = -1, u = !0, c = e.length - 1, h = 0;
			for (; c >= r; --c) {
				if (s = e.charCodeAt(c), q(s)) {
					if (!u) {
						o = c + 1;
						break;
					}
					continue;
				}
				l === -1 && (u = !1, l = c + 1), s === Ee ? a === -1 ? a = c : h !== 1 && (h = 1) : a !== -1 && (h = -1);
			}
			return l !== -1 && (a === -1 || h === 0 || h === 1 && a === l - 1 && a === o + 1 ? t.base = t.name = e.slice(o, l) : (t.name = e.slice(o, a), t.base = e.slice(o, l), t.ext = e.slice(a, l))), o > 0 && o !== r ? t.dir = e.slice(0, o - 1) : t.dir = t.root, t;
		},
		sep: "\\",
		delimiter: ";",
		win32: null,
		posix: null
	}, ia = (() => {
		if (ve) {
			const e = /\\/g;
			return () => {
				const t = yt().replace(e, "/");
				return t.slice(t.indexOf("/"));
			};
		}
		return () => yt();
	})(), ne = {
		resolve(...e) {
			let t = "", n = !1;
			for (let r = e.length - 1; r >= 0 && !n; r--) {
				const s = e[r];
				G(s, `paths[${r}]`), s.length !== 0 && (t = `${s}/${t}`, n = s.charCodeAt(0) === J);
			}
			if (!n) {
				const r = ia();
				t = `${r}/${t}`, n = r.charCodeAt(0) === J;
			}
			return t = Rt(t, !n, "/", gn), n ? `/${t}` : t.length > 0 ? t : ".";
		},
		normalize(e) {
			if (G(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === J, n = e.charCodeAt(e.length - 1) === J;
			return e = Rt(e, !t, "/", gn), e.length === 0 ? t ? "/" : n ? "./" : "." : (n && (e += "/"), t ? `/${e}` : e);
		},
		isAbsolute(e) {
			return G(e, "path"), e.length > 0 && e.charCodeAt(0) === J;
		},
		join(...e) {
			if (e.length === 0) return ".";
			const t = [];
			for (let n = 0; n < e.length; ++n) {
				const r = e[n];
				G(r, "path"), r.length > 0 && t.push(r);
			}
			return t.length === 0 ? "." : ne.normalize(t.join("/"));
		},
		relative(e, t) {
			if (G(e, "from"), G(t, "to"), e === t || (e = ne.resolve(e), t = ne.resolve(t), e === t)) return "";
			const n = 1, r = e.length, s = r - n, a = 1, o = t.length - a, l = s < o ? s : o;
			let u = -1, c = 0;
			for (; c < l; c++) {
				const m = e.charCodeAt(n + c);
				if (m !== t.charCodeAt(a + c)) break;
				m === J && (u = c);
			}
			if (c === l) if (o > l) {
				if (t.charCodeAt(a + c) === J) return t.slice(a + c + 1);
				if (c === 0) return t.slice(a + c);
			} else s > l && (e.charCodeAt(n + c) === J ? u = c : c === 0 && (u = 0));
			let h = "";
			for (c = n + u + 1; c <= r; ++c) (c === r || e.charCodeAt(c) === J) && (h += h.length === 0 ? ".." : "/..");
			return `${h}${t.slice(a + u)}`;
		},
		toNamespacedPath(e) {
			return e;
		},
		dirname(e) {
			if (G(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === J;
			let n = -1, r = !0;
			for (let s = e.length - 1; s >= 1; --s) if (e.charCodeAt(s) === J) {
				if (!r) {
					n = s;
					break;
				}
			} else r = !1;
			return n === -1 ? t ? "/" : "." : t && n === 1 ? "//" : e.slice(0, n);
		},
		basename(e, t) {
			t !== void 0 && G(t, "suffix"), G(e, "path");
			let n = 0, r = -1, s = !0, a;
			if (t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let o = t.length - 1, l = -1;
				for (a = e.length - 1; a >= 0; --a) {
					const u = e.charCodeAt(a);
					if (u === J) {
						if (!s) {
							n = a + 1;
							break;
						}
					} else l === -1 && (s = !1, l = a + 1), o >= 0 && (u === t.charCodeAt(o) ? --o === -1 && (r = a) : (o = -1, r = l));
				}
				return n === r ? r = l : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (a = e.length - 1; a >= 0; --a) if (e.charCodeAt(a) === J) {
				if (!s) {
					n = a + 1;
					break;
				}
			} else r === -1 && (s = !1, r = a + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			G(e, "path");
			let t = -1, n = 0, r = -1, s = !0, a = 0;
			for (let o = e.length - 1; o >= 0; --o) {
				const l = e[o];
				if (l === "/") {
					if (!s) {
						n = o + 1;
						break;
					}
					continue;
				}
				r === -1 && (s = !1, r = o + 1), l === "." ? t === -1 ? t = o : a !== 1 && (a = 1) : t !== -1 && (a = -1);
			}
			return t === -1 || r === -1 || a === 0 || a === 1 && t === r - 1 && t === n + 1 ? "" : e.slice(t, r);
		},
		format: S1.bind(null, "/"),
		parse(e) {
			G(e, "path");
			const t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			const n = e.charCodeAt(0) === J;
			let r;
			n ? (t.root = "/", r = 1) : r = 0;
			let s = -1, a = 0, o = -1, l = !0, u = e.length - 1, c = 0;
			for (; u >= r; --u) {
				const h = e.charCodeAt(u);
				if (h === J) {
					if (!l) {
						a = u + 1;
						break;
					}
					continue;
				}
				o === -1 && (l = !1, o = u + 1), h === Ee ? s === -1 ? s = u : c !== 1 && (c = 1) : s !== -1 && (c = -1);
			}
			if (o !== -1) {
				const h = a === 0 && n ? 1 : a;
				s === -1 || c === 0 || c === 1 && s === o - 1 && s === a + 1 ? t.base = t.name = e.slice(h, o) : (t.name = e.slice(h, s), t.base = e.slice(h, o), t.ext = e.slice(s, o));
			}
			return a > 0 ? t.dir = e.slice(0, a - 1) : n && (t.dir = "/"), t;
		},
		sep: "/",
		delimiter: ":",
		win32: null,
		posix: null
	};
	ne.win32 = te.win32 = te, ne.posix = te.posix = ne;
	ve ? te.normalize : ne.normalize;
	const aa = ve ? te.join : ne.join;
	ve ? te.resolve : ne.resolve;
	ve ? te.relative : ne.relative;
	ve ? te.dirname : ne.dirname;
	ve ? te.basename : ne.basename;
	ve ? te.extname : ne.extname;
	ve ? te.sep : ne.sep;
	const oa = /^\w[\w\d+.-]*$/, la = /^\//, ua = /^\/\//;
	function ca(e, t) {
		if (!e.scheme && t) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);
		if (e.scheme && !oa.test(e.scheme)) {
			const n = [...e.scheme.matchAll(/[^\w\d+.-]/gu)], r = n.length > 0 ? ` Found '${n[0][0]}' at index ${n[0].index} (${n.length} total)` : "";
			throw new Error(`[UriError]: Scheme contains illegal characters.${r} (len:${e.scheme.length})`);
		}
		if (e.path) {
			if (e.authority) {
				if (!la.test(e.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
			} else if (ua.test(e.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
		}
	}
	function ha(e, t) {
		return !e && !t ? "file" : e;
	}
	function ma(e, t) {
		switch (e) {
			case "https":
			case "http":
			case "file": t ? t[0] !== me && (t = me + t) : t = me;
		}
		return t;
	}
	const z = "", me = "/", fa = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	var _e = class qt {
		static isUri(t) {
			return t instanceof qt ? !0 : !t || typeof t != "object" ? !1 : typeof t.authority == "string" && typeof t.fragment == "string" && typeof t.path == "string" && typeof t.query == "string" && typeof t.scheme == "string" && typeof t.fsPath == "string" && typeof t.with == "function" && typeof t.toString == "function";
		}
		constructor(t, n, r, s, a, o = !1) {
			typeof t == "object" ? (this.scheme = t.scheme || z, this.authority = t.authority || z, this.path = t.path || z, this.query = t.query || z, this.fragment = t.fragment || z) : (this.scheme = ha(t, o), this.authority = n || z, this.path = ma(this.scheme, r || z), this.query = s || z, this.fragment = a || z, ca(this, o));
		}
		get fsPath() {
			return pn(this, !1);
		}
		with(t) {
			if (!t) return this;
			let { scheme: n, authority: r, path: s, query: a, fragment: o } = t;
			return n === void 0 ? n = this.scheme : n === null && (n = z), r === void 0 ? r = this.authority : r === null && (r = z), s === void 0 ? s = this.path : s === null && (s = z), a === void 0 ? a = this.query : a === null && (a = z), o === void 0 ? o = this.fragment : o === null && (o = z), n === this.scheme && r === this.authority && s === this.path && a === this.query && o === this.fragment ? this : new qe(n, r, s, a, o);
		}
		static parse(t, n = !1) {
			const r = fa.exec(t);
			return r ? new qe(r[2] || z, xt(r[4] || z), xt(r[5] || z), xt(r[7] || z), xt(r[9] || z), n) : new qe(z, z, z, z, z);
		}
		static file(t) {
			let n = z;
			if (et && (t = t.replace(/\\/g, me)), t[0] === me && t[1] === me) {
				const r = t.indexOf(me, 2);
				r === -1 ? (n = t.substring(2), t = me) : (n = t.substring(2, r), t = t.substring(r) || me);
			}
			return new qe("file", n, t, z, z);
		}
		static from(t, n) {
			return new qe(t.scheme, t.authority, t.path, t.query, t.fragment, n);
		}
		static joinPath(t, ...n) {
			if (!t.path) throw new Error(`[UriError]: cannot call joinPath on URI without path: ${t.toString()}`);
			let r;
			return et && t.scheme === "file" ? r = qt.file(te.join(pn(t, !0), ...n)).path : r = ne.join(t.path, ...n), t.with({ path: r });
		}
		toString(t = !1) {
			return bn(this, t);
		}
		toJSON() {
			return this;
		}
		static revive(t) {
			if (t) {
				if (t instanceof qt) return t;
				{
					const n = new qe(t);
					return n._formatted = t.external ?? null, n._fsPath = t._sep === R1 ? t.fsPath ?? null : null, n;
				}
			} else return t;
		}
	};
	const R1 = et ? 1 : void 0;
	var qe = class extends _e {
		constructor() {
			super(...arguments), this._formatted = null, this._fsPath = null;
		}
		get fsPath() {
			return this._fsPath || (this._fsPath = pn(this, !1)), this._fsPath;
		}
		toString(e = !1) {
			return e ? bn(this, !0) : (this._formatted || (this._formatted = bn(this, !1)), this._formatted);
		}
		toJSON() {
			const e = { $mid: 1 };
			return this._fsPath && (e.fsPath = this._fsPath, e._sep = R1), this._formatted && (e.external = this._formatted), this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e;
		}
	};
	const x1 = {
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
	function C1(e, t, n) {
		let r, s = -1;
		for (let a = 0; a < e.length; a++) {
			const o = e.charCodeAt(a);
			if (o >= 97 && o <= 122 || o >= 65 && o <= 90 || o >= 48 && o <= 57 || o === 45 || o === 46 || o === 95 || o === 126 || t && o === 47 || n && o === 91 || n && o === 93 || n && o === 58) s !== -1 && (r += encodeURIComponent(e.substring(s, a)), s = -1), r !== void 0 && (r += e.charAt(a));
			else {
				r === void 0 && (r = e.substr(0, a));
				const l = x1[o];
				l !== void 0 ? (s !== -1 && (r += encodeURIComponent(e.substring(s, a)), s = -1), r += l) : s === -1 && (s = a);
			}
		}
		return s !== -1 && (r += encodeURIComponent(e.substring(s))), r !== void 0 ? r : e;
	}
	function da(e) {
		let t;
		for (let n = 0; n < e.length; n++) {
			const r = e.charCodeAt(n);
			r === 35 || r === 63 ? (t === void 0 && (t = e.substr(0, n)), t += x1[r]) : t !== void 0 && (t += e[n]);
		}
		return t !== void 0 ? t : e;
	}
	function pn(e, t) {
		let n;
		return e.authority && e.path.length > 1 && e.scheme === "file" ? n = `//${e.authority}${e.path}` : e.path.charCodeAt(0) === 47 && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122) && e.path.charCodeAt(2) === 58 ? t ? n = e.path.substr(1) : n = e.path[1].toLowerCase() + e.path.substr(2) : n = e.path, et && (n = n.replace(/\//g, "\\")), n;
	}
	function bn(e, t) {
		const n = t ? da : C1;
		let r = "", { scheme: s, authority: a, path: o, query: l, fragment: u } = e;
		if (s && (r += s, r += ":"), (a || s === "file") && (r += me, r += me), a) {
			let c = a.indexOf("@");
			if (c !== -1) {
				const h = a.substr(0, c);
				a = a.substr(c + 1), c = h.lastIndexOf(":"), c === -1 ? r += n(h, !1, !1) : (r += n(h.substr(0, c), !1, !1), r += ":", r += n(h.substr(c + 1), !1, !0)), r += "@";
			}
			a = a.toLowerCase(), c = a.lastIndexOf(":"), c === -1 ? r += n(a, !1, !0) : (r += n(a.substr(0, c), !1, !0), r += a.substr(c));
		}
		if (o) {
			if (o.length >= 3 && o.charCodeAt(0) === 47 && o.charCodeAt(2) === 58) {
				const c = o.charCodeAt(1);
				c >= 65 && c <= 90 && (o = `/${String.fromCharCode(c + 32)}:${o.substr(3)}`);
			} else if (o.length >= 2 && o.charCodeAt(1) === 58) {
				const c = o.charCodeAt(0);
				c >= 65 && c <= 90 && (o = `${String.fromCharCode(c + 32)}:${o.substr(2)}`);
			}
			r += n(o, !0, !1);
		}
		return l && (r += "?", r += n(l, !1, !1)), u && (r += "#", r += t ? u : C1(u, !1, !1)), r;
	}
	function A1(e) {
		try {
			return decodeURIComponent(e);
		} catch {
			return e.length > 3 ? e.substr(0, 3) + A1(e.substr(3)) : e;
		}
	}
	const E1 = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
	function xt(e) {
		return e.match(E1) ? e.replace(E1, (t) => A1(t)) : e;
	}
	var ga = class ce extends I {
		constructor(t, n, r, s) {
			super(t, n, r, s), this.selectionStartLineNumber = t, this.selectionStartColumn = n, this.positionLineNumber = r, this.positionColumn = s;
		}
		toString() {
			return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
		}
		equalsSelection(t) {
			return ce.selectionsEqual(this, t);
		}
		static selectionsEqual(t, n) {
			return t.selectionStartLineNumber === n.selectionStartLineNumber && t.selectionStartColumn === n.selectionStartColumn && t.positionLineNumber === n.positionLineNumber && t.positionColumn === n.positionColumn;
		}
		getDirection() {
			return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
		}
		setEndPosition(t, n) {
			return this.getDirection() === 0 ? new ce(this.startLineNumber, this.startColumn, t, n) : new ce(t, n, this.startLineNumber, this.startColumn);
		}
		getPosition() {
			return new W(this.positionLineNumber, this.positionColumn);
		}
		getSelectionStart() {
			return new W(this.selectionStartLineNumber, this.selectionStartColumn);
		}
		setStartPosition(t, n) {
			return this.getDirection() === 0 ? new ce(t, n, this.endLineNumber, this.endColumn) : new ce(this.endLineNumber, this.endColumn, t, n);
		}
		static fromPositions(t, n = t) {
			return new ce(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static fromRange(t, n) {
			return n === 0 ? new ce(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : new ce(t.endLineNumber, t.endColumn, t.startLineNumber, t.startColumn);
		}
		static liftSelection(t) {
			return new ce(t.selectionStartLineNumber, t.selectionStartColumn, t.positionLineNumber, t.positionColumn);
		}
		static selectionsArrEqual(t, n) {
			if (t && !n || !t && n) return !1;
			if (!t && !n) return !0;
			if (t.length !== n.length) return !1;
			for (let r = 0, s = t.length; r < s; r++) if (!this.selectionsEqual(t[r], n[r])) return !1;
			return !0;
		}
		static isISelection(t) {
			return !!t && typeof t.selectionStartLineNumber == "number" && typeof t.selectionStartColumn == "number" && typeof t.positionLineNumber == "number" && typeof t.positionColumn == "number";
		}
		static createWithDirection(t, n, r, s, a) {
			return a === 0 ? new ce(t, n, r, s) : new ce(r, s, t, n);
		}
	};
	const k1 = Object.create(null);
	function i(e, t) {
		if (Hs(t)) {
			const n = k1[t];
			if (n === void 0) throw new Error(`${e} references an unknown codicon: ${t}`);
			t = n;
		}
		return k1[e] = t, { id: e };
	}
	const pa = {
		add: i("add", 6e4),
		plus: i("plus", 6e4),
		gistNew: i("gist-new", 6e4),
		repoCreate: i("repo-create", 6e4),
		lightbulb: i("lightbulb", 60001),
		lightBulb: i("light-bulb", 60001),
		repo: i("repo", 60002),
		repoDelete: i("repo-delete", 60002),
		gistFork: i("gist-fork", 60003),
		repoForked: i("repo-forked", 60003),
		gitPullRequest: i("git-pull-request", 60004),
		gitPullRequestAbandoned: i("git-pull-request-abandoned", 60004),
		recordKeys: i("record-keys", 60005),
		keyboard: i("keyboard", 60005),
		tag: i("tag", 60006),
		gitPullRequestLabel: i("git-pull-request-label", 60006),
		tagAdd: i("tag-add", 60006),
		tagRemove: i("tag-remove", 60006),
		person: i("person", 60007),
		personFollow: i("person-follow", 60007),
		personOutline: i("person-outline", 60007),
		personFilled: i("person-filled", 60007),
		sourceControl: i("source-control", 60008),
		mirror: i("mirror", 60009),
		mirrorPublic: i("mirror-public", 60009),
		star: i("star", 60010),
		starAdd: i("star-add", 60010),
		starDelete: i("star-delete", 60010),
		starEmpty: i("star-empty", 60010),
		comment: i("comment", 60011),
		commentAdd: i("comment-add", 60011),
		alert: i("alert", 60012),
		warning: i("warning", 60012),
		search: i("search", 60013),
		searchSave: i("search-save", 60013),
		logOut: i("log-out", 60014),
		signOut: i("sign-out", 60014),
		logIn: i("log-in", 60015),
		signIn: i("sign-in", 60015),
		eye: i("eye", 60016),
		eyeUnwatch: i("eye-unwatch", 60016),
		eyeWatch: i("eye-watch", 60016),
		circleFilled: i("circle-filled", 60017),
		primitiveDot: i("primitive-dot", 60017),
		closeDirty: i("close-dirty", 60017),
		debugBreakpoint: i("debug-breakpoint", 60017),
		debugBreakpointDisabled: i("debug-breakpoint-disabled", 60017),
		debugHint: i("debug-hint", 60017),
		terminalDecorationSuccess: i("terminal-decoration-success", 60017),
		primitiveSquare: i("primitive-square", 60018),
		edit: i("edit", 60019),
		pencil: i("pencil", 60019),
		info: i("info", 60020),
		issueOpened: i("issue-opened", 60020),
		gistPrivate: i("gist-private", 60021),
		gitForkPrivate: i("git-fork-private", 60021),
		lock: i("lock", 60021),
		mirrorPrivate: i("mirror-private", 60021),
		close: i("close", 60022),
		removeClose: i("remove-close", 60022),
		x: i("x", 60022),
		repoSync: i("repo-sync", 60023),
		sync: i("sync", 60023),
		clone: i("clone", 60024),
		desktopDownload: i("desktop-download", 60024),
		beaker: i("beaker", 60025),
		microscope: i("microscope", 60025),
		vm: i("vm", 60026),
		deviceDesktop: i("device-desktop", 60026),
		file: i("file", 60027),
		more: i("more", 60028),
		ellipsis: i("ellipsis", 60028),
		kebabHorizontal: i("kebab-horizontal", 60028),
		mailReply: i("mail-reply", 60029),
		reply: i("reply", 60029),
		organization: i("organization", 60030),
		organizationFilled: i("organization-filled", 60030),
		organizationOutline: i("organization-outline", 60030),
		newFile: i("new-file", 60031),
		fileAdd: i("file-add", 60031),
		newFolder: i("new-folder", 60032),
		fileDirectoryCreate: i("file-directory-create", 60032),
		trash: i("trash", 60033),
		trashcan: i("trashcan", 60033),
		history: i("history", 60034),
		clock: i("clock", 60034),
		folder: i("folder", 60035),
		fileDirectory: i("file-directory", 60035),
		symbolFolder: i("symbol-folder", 60035),
		logoGithub: i("logo-github", 60036),
		markGithub: i("mark-github", 60036),
		github: i("github", 60036),
		terminal: i("terminal", 60037),
		console: i("console", 60037),
		repl: i("repl", 60037),
		zap: i("zap", 60038),
		symbolEvent: i("symbol-event", 60038),
		error: i("error", 60039),
		stop: i("stop", 60039),
		variable: i("variable", 60040),
		symbolVariable: i("symbol-variable", 60040),
		array: i("array", 60042),
		symbolArray: i("symbol-array", 60042),
		symbolModule: i("symbol-module", 60043),
		symbolPackage: i("symbol-package", 60043),
		symbolNamespace: i("symbol-namespace", 60043),
		symbolObject: i("symbol-object", 60043),
		symbolMethod: i("symbol-method", 60044),
		symbolFunction: i("symbol-function", 60044),
		symbolConstructor: i("symbol-constructor", 60044),
		symbolBoolean: i("symbol-boolean", 60047),
		symbolNull: i("symbol-null", 60047),
		symbolNumeric: i("symbol-numeric", 60048),
		symbolNumber: i("symbol-number", 60048),
		symbolStructure: i("symbol-structure", 60049),
		symbolStruct: i("symbol-struct", 60049),
		symbolParameter: i("symbol-parameter", 60050),
		symbolTypeParameter: i("symbol-type-parameter", 60050),
		symbolKey: i("symbol-key", 60051),
		symbolText: i("symbol-text", 60051),
		symbolReference: i("symbol-reference", 60052),
		goToFile: i("go-to-file", 60052),
		symbolEnum: i("symbol-enum", 60053),
		symbolValue: i("symbol-value", 60053),
		symbolRuler: i("symbol-ruler", 60054),
		symbolUnit: i("symbol-unit", 60054),
		activateBreakpoints: i("activate-breakpoints", 60055),
		archive: i("archive", 60056),
		arrowBoth: i("arrow-both", 60057),
		arrowDown: i("arrow-down", 60058),
		arrowLeft: i("arrow-left", 60059),
		arrowRight: i("arrow-right", 60060),
		arrowSmallDown: i("arrow-small-down", 60061),
		arrowSmallLeft: i("arrow-small-left", 60062),
		arrowSmallRight: i("arrow-small-right", 60063),
		arrowSmallUp: i("arrow-small-up", 60064),
		arrowUp: i("arrow-up", 60065),
		bell: i("bell", 60066),
		bold: i("bold", 60067),
		book: i("book", 60068),
		bookmark: i("bookmark", 60069),
		debugBreakpointConditionalUnverified: i("debug-breakpoint-conditional-unverified", 60070),
		debugBreakpointConditional: i("debug-breakpoint-conditional", 60071),
		debugBreakpointConditionalDisabled: i("debug-breakpoint-conditional-disabled", 60071),
		debugBreakpointDataUnverified: i("debug-breakpoint-data-unverified", 60072),
		debugBreakpointData: i("debug-breakpoint-data", 60073),
		debugBreakpointDataDisabled: i("debug-breakpoint-data-disabled", 60073),
		debugBreakpointLogUnverified: i("debug-breakpoint-log-unverified", 60074),
		debugBreakpointLog: i("debug-breakpoint-log", 60075),
		debugBreakpointLogDisabled: i("debug-breakpoint-log-disabled", 60075),
		briefcase: i("briefcase", 60076),
		broadcast: i("broadcast", 60077),
		browser: i("browser", 60078),
		bug: i("bug", 60079),
		calendar: i("calendar", 60080),
		caseSensitive: i("case-sensitive", 60081),
		check: i("check", 60082),
		checklist: i("checklist", 60083),
		chevronDown: i("chevron-down", 60084),
		chevronLeft: i("chevron-left", 60085),
		chevronRight: i("chevron-right", 60086),
		chevronUp: i("chevron-up", 60087),
		chromeClose: i("chrome-close", 60088),
		chromeMaximize: i("chrome-maximize", 60089),
		chromeMinimize: i("chrome-minimize", 60090),
		chromeRestore: i("chrome-restore", 60091),
		circleOutline: i("circle-outline", 60092),
		circle: i("circle", 60092),
		debugBreakpointUnverified: i("debug-breakpoint-unverified", 60092),
		terminalDecorationIncomplete: i("terminal-decoration-incomplete", 60092),
		circleSlash: i("circle-slash", 60093),
		circuitBoard: i("circuit-board", 60094),
		clearAll: i("clear-all", 60095),
		clippy: i("clippy", 60096),
		closeAll: i("close-all", 60097),
		cloudDownload: i("cloud-download", 60098),
		cloudUpload: i("cloud-upload", 60099),
		code: i("code", 60100),
		collapseAll: i("collapse-all", 60101),
		colorMode: i("color-mode", 60102),
		commentDiscussion: i("comment-discussion", 60103),
		creditCard: i("credit-card", 60105),
		dash: i("dash", 60108),
		dashboard: i("dashboard", 60109),
		database: i("database", 60110),
		debugContinue: i("debug-continue", 60111),
		debugDisconnect: i("debug-disconnect", 60112),
		debugPause: i("debug-pause", 60113),
		debugRestart: i("debug-restart", 60114),
		debugStart: i("debug-start", 60115),
		debugStepInto: i("debug-step-into", 60116),
		debugStepOut: i("debug-step-out", 60117),
		debugStepOver: i("debug-step-over", 60118),
		debugStop: i("debug-stop", 60119),
		debug: i("debug", 60120),
		deviceCameraVideo: i("device-camera-video", 60121),
		deviceCamera: i("device-camera", 60122),
		deviceMobile: i("device-mobile", 60123),
		diffAdded: i("diff-added", 60124),
		diffIgnored: i("diff-ignored", 60125),
		diffModified: i("diff-modified", 60126),
		diffRemoved: i("diff-removed", 60127),
		diffRenamed: i("diff-renamed", 60128),
		diff: i("diff", 60129),
		diffSidebyside: i("diff-sidebyside", 60129),
		discard: i("discard", 60130),
		editorLayout: i("editor-layout", 60131),
		emptyWindow: i("empty-window", 60132),
		exclude: i("exclude", 60133),
		extensions: i("extensions", 60134),
		eyeClosed: i("eye-closed", 60135),
		fileBinary: i("file-binary", 60136),
		fileCode: i("file-code", 60137),
		fileMedia: i("file-media", 60138),
		filePdf: i("file-pdf", 60139),
		fileSubmodule: i("file-submodule", 60140),
		fileSymlinkDirectory: i("file-symlink-directory", 60141),
		fileSymlinkFile: i("file-symlink-file", 60142),
		fileZip: i("file-zip", 60143),
		files: i("files", 60144),
		filter: i("filter", 60145),
		flame: i("flame", 60146),
		foldDown: i("fold-down", 60147),
		foldUp: i("fold-up", 60148),
		fold: i("fold", 60149),
		folderActive: i("folder-active", 60150),
		folderOpened: i("folder-opened", 60151),
		gear: i("gear", 60152),
		gift: i("gift", 60153),
		gistSecret: i("gist-secret", 60154),
		gist: i("gist", 60155),
		gitCommit: i("git-commit", 60156),
		gitCompare: i("git-compare", 60157),
		compareChanges: i("compare-changes", 60157),
		gitMerge: i("git-merge", 60158),
		githubAction: i("github-action", 60159),
		githubAlt: i("github-alt", 60160),
		globe: i("globe", 60161),
		grabber: i("grabber", 60162),
		graph: i("graph", 60163),
		gripper: i("gripper", 60164),
		heart: i("heart", 60165),
		home: i("home", 60166),
		horizontalRule: i("horizontal-rule", 60167),
		hubot: i("hubot", 60168),
		inbox: i("inbox", 60169),
		issueReopened: i("issue-reopened", 60171),
		issues: i("issues", 60172),
		italic: i("italic", 60173),
		jersey: i("jersey", 60174),
		json: i("json", 60175),
		bracket: i("bracket", 60175),
		kebabVertical: i("kebab-vertical", 60176),
		key: i("key", 60177),
		law: i("law", 60178),
		lightbulbAutofix: i("lightbulb-autofix", 60179),
		linkExternal: i("link-external", 60180),
		link: i("link", 60181),
		listOrdered: i("list-ordered", 60182),
		listUnordered: i("list-unordered", 60183),
		liveShare: i("live-share", 60184),
		loading: i("loading", 60185),
		location: i("location", 60186),
		mailRead: i("mail-read", 60187),
		mail: i("mail", 60188),
		markdown: i("markdown", 60189),
		megaphone: i("megaphone", 60190),
		mention: i("mention", 60191),
		milestone: i("milestone", 60192),
		gitPullRequestMilestone: i("git-pull-request-milestone", 60192),
		mortarBoard: i("mortar-board", 60193),
		move: i("move", 60194),
		multipleWindows: i("multiple-windows", 60195),
		mute: i("mute", 60196),
		noNewline: i("no-newline", 60197),
		note: i("note", 60198),
		octoface: i("octoface", 60199),
		openPreview: i("open-preview", 60200),
		package: i("package", 60201),
		paintcan: i("paintcan", 60202),
		pin: i("pin", 60203),
		play: i("play", 60204),
		run: i("run", 60204),
		plug: i("plug", 60205),
		preserveCase: i("preserve-case", 60206),
		preview: i("preview", 60207),
		project: i("project", 60208),
		pulse: i("pulse", 60209),
		question: i("question", 60210),
		quote: i("quote", 60211),
		radioTower: i("radio-tower", 60212),
		reactions: i("reactions", 60213),
		references: i("references", 60214),
		refresh: i("refresh", 60215),
		regex: i("regex", 60216),
		remoteExplorer: i("remote-explorer", 60217),
		remote: i("remote", 60218),
		remove: i("remove", 60219),
		replaceAll: i("replace-all", 60220),
		replace: i("replace", 60221),
		repoClone: i("repo-clone", 60222),
		repoForcePush: i("repo-force-push", 60223),
		repoPull: i("repo-pull", 60224),
		repoPush: i("repo-push", 60225),
		report: i("report", 60226),
		requestChanges: i("request-changes", 60227),
		rocket: i("rocket", 60228),
		rootFolderOpened: i("root-folder-opened", 60229),
		rootFolder: i("root-folder", 60230),
		rss: i("rss", 60231),
		ruby: i("ruby", 60232),
		saveAll: i("save-all", 60233),
		saveAs: i("save-as", 60234),
		save: i("save", 60235),
		screenFull: i("screen-full", 60236),
		screenNormal: i("screen-normal", 60237),
		searchStop: i("search-stop", 60238),
		server: i("server", 60240),
		settingsGear: i("settings-gear", 60241),
		settings: i("settings", 60242),
		shield: i("shield", 60243),
		smiley: i("smiley", 60244),
		sortPrecedence: i("sort-precedence", 60245),
		splitHorizontal: i("split-horizontal", 60246),
		splitVertical: i("split-vertical", 60247),
		squirrel: i("squirrel", 60248),
		starFull: i("star-full", 60249),
		starHalf: i("star-half", 60250),
		symbolClass: i("symbol-class", 60251),
		symbolColor: i("symbol-color", 60252),
		symbolConstant: i("symbol-constant", 60253),
		symbolEnumMember: i("symbol-enum-member", 60254),
		symbolField: i("symbol-field", 60255),
		symbolFile: i("symbol-file", 60256),
		symbolInterface: i("symbol-interface", 60257),
		symbolKeyword: i("symbol-keyword", 60258),
		symbolMisc: i("symbol-misc", 60259),
		symbolOperator: i("symbol-operator", 60260),
		symbolProperty: i("symbol-property", 60261),
		wrench: i("wrench", 60261),
		wrenchSubaction: i("wrench-subaction", 60261),
		symbolSnippet: i("symbol-snippet", 60262),
		tasklist: i("tasklist", 60263),
		telescope: i("telescope", 60264),
		textSize: i("text-size", 60265),
		threeBars: i("three-bars", 60266),
		thumbsdown: i("thumbsdown", 60267),
		thumbsup: i("thumbsup", 60268),
		tools: i("tools", 60269),
		triangleDown: i("triangle-down", 60270),
		triangleLeft: i("triangle-left", 60271),
		triangleRight: i("triangle-right", 60272),
		triangleUp: i("triangle-up", 60273),
		twitter: i("twitter", 60274),
		unfold: i("unfold", 60275),
		unlock: i("unlock", 60276),
		unmute: i("unmute", 60277),
		unverified: i("unverified", 60278),
		verified: i("verified", 60279),
		versions: i("versions", 60280),
		vmActive: i("vm-active", 60281),
		vmOutline: i("vm-outline", 60282),
		vmRunning: i("vm-running", 60283),
		watch: i("watch", 60284),
		whitespace: i("whitespace", 60285),
		wholeWord: i("whole-word", 60286),
		window: i("window", 60287),
		wordWrap: i("word-wrap", 60288),
		zoomIn: i("zoom-in", 60289),
		zoomOut: i("zoom-out", 60290),
		listFilter: i("list-filter", 60291),
		listFlat: i("list-flat", 60292),
		listSelection: i("list-selection", 60293),
		selection: i("selection", 60293),
		listTree: i("list-tree", 60294),
		debugBreakpointFunctionUnverified: i("debug-breakpoint-function-unverified", 60295),
		debugBreakpointFunction: i("debug-breakpoint-function", 60296),
		debugBreakpointFunctionDisabled: i("debug-breakpoint-function-disabled", 60296),
		debugStackframeActive: i("debug-stackframe-active", 60297),
		circleSmallFilled: i("circle-small-filled", 60298),
		debugStackframeDot: i("debug-stackframe-dot", 60298),
		terminalDecorationMark: i("terminal-decoration-mark", 60298),
		debugStackframe: i("debug-stackframe", 60299),
		debugStackframeFocused: i("debug-stackframe-focused", 60299),
		debugBreakpointUnsupported: i("debug-breakpoint-unsupported", 60300),
		symbolString: i("symbol-string", 60301),
		debugReverseContinue: i("debug-reverse-continue", 60302),
		debugStepBack: i("debug-step-back", 60303),
		debugRestartFrame: i("debug-restart-frame", 60304),
		debugAlt: i("debug-alt", 60305),
		callIncoming: i("call-incoming", 60306),
		callOutgoing: i("call-outgoing", 60307),
		menu: i("menu", 60308),
		expandAll: i("expand-all", 60309),
		feedback: i("feedback", 60310),
		gitPullRequestReviewer: i("git-pull-request-reviewer", 60310),
		groupByRefType: i("group-by-ref-type", 60311),
		ungroupByRefType: i("ungroup-by-ref-type", 60312),
		account: i("account", 60313),
		gitPullRequestAssignee: i("git-pull-request-assignee", 60313),
		bellDot: i("bell-dot", 60314),
		debugConsole: i("debug-console", 60315),
		library: i("library", 60316),
		output: i("output", 60317),
		runAll: i("run-all", 60318),
		syncIgnored: i("sync-ignored", 60319),
		pinned: i("pinned", 60320),
		githubInverted: i("github-inverted", 60321),
		serverProcess: i("server-process", 60322),
		serverEnvironment: i("server-environment", 60323),
		pass: i("pass", 60324),
		issueClosed: i("issue-closed", 60324),
		stopCircle: i("stop-circle", 60325),
		playCircle: i("play-circle", 60326),
		record: i("record", 60327),
		debugAltSmall: i("debug-alt-small", 60328),
		vmConnect: i("vm-connect", 60329),
		cloud: i("cloud", 60330),
		merge: i("merge", 60331),
		export: i("export", 60332),
		graphLeft: i("graph-left", 60333),
		magnet: i("magnet", 60334),
		notebook: i("notebook", 60335),
		redo: i("redo", 60336),
		checkAll: i("check-all", 60337),
		pinnedDirty: i("pinned-dirty", 60338),
		passFilled: i("pass-filled", 60339),
		circleLargeFilled: i("circle-large-filled", 60340),
		circleLarge: i("circle-large", 60341),
		circleLargeOutline: i("circle-large-outline", 60341),
		combine: i("combine", 60342),
		gather: i("gather", 60342),
		table: i("table", 60343),
		variableGroup: i("variable-group", 60344),
		typeHierarchy: i("type-hierarchy", 60345),
		typeHierarchySub: i("type-hierarchy-sub", 60346),
		typeHierarchySuper: i("type-hierarchy-super", 60347),
		gitPullRequestCreate: i("git-pull-request-create", 60348),
		runAbove: i("run-above", 60349),
		runBelow: i("run-below", 60350),
		notebookTemplate: i("notebook-template", 60351),
		debugRerun: i("debug-rerun", 60352),
		workspaceTrusted: i("workspace-trusted", 60353),
		workspaceUntrusted: i("workspace-untrusted", 60354),
		workspaceUnknown: i("workspace-unknown", 60355),
		terminalCmd: i("terminal-cmd", 60356),
		terminalDebian: i("terminal-debian", 60357),
		terminalLinux: i("terminal-linux", 60358),
		terminalPowershell: i("terminal-powershell", 60359),
		terminalTmux: i("terminal-tmux", 60360),
		terminalUbuntu: i("terminal-ubuntu", 60361),
		terminalBash: i("terminal-bash", 60362),
		arrowSwap: i("arrow-swap", 60363),
		copy: i("copy", 60364),
		personAdd: i("person-add", 60365),
		filterFilled: i("filter-filled", 60366),
		wand: i("wand", 60367),
		debugLineByLine: i("debug-line-by-line", 60368),
		inspect: i("inspect", 60369),
		layers: i("layers", 60370),
		layersDot: i("layers-dot", 60371),
		layersActive: i("layers-active", 60372),
		compass: i("compass", 60373),
		compassDot: i("compass-dot", 60374),
		compassActive: i("compass-active", 60375),
		azure: i("azure", 60376),
		issueDraft: i("issue-draft", 60377),
		gitPullRequestClosed: i("git-pull-request-closed", 60378),
		gitPullRequestDraft: i("git-pull-request-draft", 60379),
		debugAll: i("debug-all", 60380),
		debugCoverage: i("debug-coverage", 60381),
		runErrors: i("run-errors", 60382),
		folderLibrary: i("folder-library", 60383),
		debugContinueSmall: i("debug-continue-small", 60384),
		beakerStop: i("beaker-stop", 60385),
		graphLine: i("graph-line", 60386),
		graphScatter: i("graph-scatter", 60387),
		pieChart: i("pie-chart", 60388),
		bracketDot: i("bracket-dot", 60389),
		bracketError: i("bracket-error", 60390),
		lockSmall: i("lock-small", 60391),
		azureDevops: i("azure-devops", 60392),
		verifiedFilled: i("verified-filled", 60393),
		newline: i("newline", 60394),
		layout: i("layout", 60395),
		layoutActivitybarLeft: i("layout-activitybar-left", 60396),
		layoutActivitybarRight: i("layout-activitybar-right", 60397),
		layoutPanelLeft: i("layout-panel-left", 60398),
		layoutPanelCenter: i("layout-panel-center", 60399),
		layoutPanelJustify: i("layout-panel-justify", 60400),
		layoutPanelRight: i("layout-panel-right", 60401),
		layoutPanel: i("layout-panel", 60402),
		layoutSidebarLeft: i("layout-sidebar-left", 60403),
		layoutSidebarRight: i("layout-sidebar-right", 60404),
		layoutStatusbar: i("layout-statusbar", 60405),
		layoutMenubar: i("layout-menubar", 60406),
		layoutCentered: i("layout-centered", 60407),
		target: i("target", 60408),
		indent: i("indent", 60409),
		recordSmall: i("record-small", 60410),
		errorSmall: i("error-small", 60411),
		terminalDecorationError: i("terminal-decoration-error", 60411),
		arrowCircleDown: i("arrow-circle-down", 60412),
		arrowCircleLeft: i("arrow-circle-left", 60413),
		arrowCircleRight: i("arrow-circle-right", 60414),
		arrowCircleUp: i("arrow-circle-up", 60415),
		layoutSidebarRightOff: i("layout-sidebar-right-off", 60416),
		layoutPanelOff: i("layout-panel-off", 60417),
		layoutSidebarLeftOff: i("layout-sidebar-left-off", 60418),
		blank: i("blank", 60419),
		heartFilled: i("heart-filled", 60420),
		map: i("map", 60421),
		mapHorizontal: i("map-horizontal", 60421),
		foldHorizontal: i("fold-horizontal", 60421),
		mapFilled: i("map-filled", 60422),
		mapHorizontalFilled: i("map-horizontal-filled", 60422),
		foldHorizontalFilled: i("fold-horizontal-filled", 60422),
		circleSmall: i("circle-small", 60423),
		bellSlash: i("bell-slash", 60424),
		bellSlashDot: i("bell-slash-dot", 60425),
		commentUnresolved: i("comment-unresolved", 60426),
		gitPullRequestGoToChanges: i("git-pull-request-go-to-changes", 60427),
		gitPullRequestNewChanges: i("git-pull-request-new-changes", 60428),
		searchFuzzy: i("search-fuzzy", 60429),
		commentDraft: i("comment-draft", 60430),
		send: i("send", 60431),
		sparkle: i("sparkle", 60432),
		insert: i("insert", 60433),
		mic: i("mic", 60434),
		thumbsdownFilled: i("thumbsdown-filled", 60435),
		thumbsupFilled: i("thumbsup-filled", 60436),
		coffee: i("coffee", 60437),
		snake: i("snake", 60438),
		game: i("game", 60439),
		vr: i("vr", 60440),
		chip: i("chip", 60441),
		piano: i("piano", 60442),
		music: i("music", 60443),
		micFilled: i("mic-filled", 60444),
		repoFetch: i("repo-fetch", 60445),
		copilot: i("copilot", 60446),
		lightbulbSparkle: i("lightbulb-sparkle", 60447),
		robot: i("robot", 60448),
		sparkleFilled: i("sparkle-filled", 60449),
		diffSingle: i("diff-single", 60450),
		diffMultiple: i("diff-multiple", 60451),
		surroundWith: i("surround-with", 60452),
		share: i("share", 60453),
		gitStash: i("git-stash", 60454),
		gitStashApply: i("git-stash-apply", 60455),
		gitStashPop: i("git-stash-pop", 60456),
		vscode: i("vscode", 60457),
		vscodeInsiders: i("vscode-insiders", 60458),
		codeOss: i("code-oss", 60459),
		runCoverage: i("run-coverage", 60460),
		runAllCoverage: i("run-all-coverage", 60461),
		coverage: i("coverage", 60462),
		githubProject: i("github-project", 60463),
		mapVertical: i("map-vertical", 60464),
		foldVertical: i("fold-vertical", 60464),
		mapVerticalFilled: i("map-vertical-filled", 60465),
		foldVerticalFilled: i("fold-vertical-filled", 60465),
		goToSearch: i("go-to-search", 60466),
		percentage: i("percentage", 60467),
		sortPercentage: i("sort-percentage", 60467),
		attach: i("attach", 60468),
		goToEditingSession: i("go-to-editing-session", 60469),
		editSession: i("edit-session", 60470),
		codeReview: i("code-review", 60471),
		copilotWarning: i("copilot-warning", 60472),
		python: i("python", 60473),
		copilotLarge: i("copilot-large", 60474),
		copilotWarningLarge: i("copilot-warning-large", 60475),
		keyboardTab: i("keyboard-tab", 60476),
		copilotBlocked: i("copilot-blocked", 60477),
		copilotNotConnected: i("copilot-not-connected", 60478),
		flag: i("flag", 60479),
		lightbulbEmpty: i("lightbulb-empty", 60480),
		symbolMethodArrow: i("symbol-method-arrow", 60481),
		copilotUnavailable: i("copilot-unavailable", 60482),
		repoPinned: i("repo-pinned", 60483),
		keyboardTabAbove: i("keyboard-tab-above", 60484),
		keyboardTabBelow: i("keyboard-tab-below", 60485),
		gitPullRequestDone: i("git-pull-request-done", 60486),
		mcp: i("mcp", 60487),
		extensionsLarge: i("extensions-large", 60488),
		layoutPanelDock: i("layout-panel-dock", 60489),
		layoutSidebarLeftDock: i("layout-sidebar-left-dock", 60490),
		layoutSidebarRightDock: i("layout-sidebar-right-dock", 60491),
		copilotInProgress: i("copilot-in-progress", 60492),
		copilotError: i("copilot-error", 60493),
		copilotSuccess: i("copilot-success", 60494),
		chatSparkle: i("chat-sparkle", 60495),
		searchSparkle: i("search-sparkle", 60496),
		editSparkle: i("edit-sparkle", 60497),
		copilotSnooze: i("copilot-snooze", 60498),
		sendToRemoteAgent: i("send-to-remote-agent", 60499),
		commentDiscussionSparkle: i("comment-discussion-sparkle", 60500),
		chatSparkleWarning: i("chat-sparkle-warning", 60501),
		chatSparkleError: i("chat-sparkle-error", 60502),
		collection: i("collection", 60503),
		newCollection: i("new-collection", 60504),
		thinking: i("thinking", 60505),
		build: i("build", 60506),
		commentDiscussionQuote: i("comment-discussion-quote", 60507),
		cursor: i("cursor", 60508),
		eraser: i("eraser", 60509),
		fileText: i("file-text", 60510),
		quotes: i("quotes", 60512),
		rename: i("rename", 60513),
		runWithDeps: i("run-with-deps", 60514),
		debugConnected: i("debug-connected", 60515),
		strikethrough: i("strikethrough", 60516),
		openInProduct: i("open-in-product", 60517),
		indexZero: i("index-zero", 60518),
		agent: i("agent", 60519),
		editCode: i("edit-code", 60520),
		repoSelected: i("repo-selected", 60521),
		skip: i("skip", 60522),
		mergeInto: i("merge-into", 60523),
		gitBranchChanges: i("git-branch-changes", 60524),
		gitBranchStagedChanges: i("git-branch-staged-changes", 60525),
		gitBranchConflicts: i("git-branch-conflicts", 60526),
		gitBranch: i("git-branch", 60527),
		gitBranchCreate: i("git-branch-create", 60527),
		gitBranchDelete: i("git-branch-delete", 60527),
		searchLarge: i("search-large", 60528),
		terminalGitBash: i("terminal-git-bash", 60529),
		windowActive: i("window-active", 60530),
		forward: i("forward", 60531),
		download: i("download", 60532),
		clockface: i("clockface", 60533),
		unarchive: i("unarchive", 60534),
		sessionInProgress: i("session-in-progress", 60535),
		collectionSmall: i("collection-small", 60536),
		vmSmall: i("vm-small", 60537),
		cloudSmall: i("cloud-small", 60538),
		addSmall: i("add-small", 60539),
		removeSmall: i("remove-small", 60540),
		worktreeSmall: i("worktree-small", 60541),
		worktree: i("worktree", 60542),
		screenCut: i("screen-cut", 60543),
		ask: i("ask", 60544),
		openai: i("openai", 60545),
		claude: i("claude", 60546),
		openInWindow: i("open-in-window", 60547),
		newSession: i("new-session", 60548),
		terminalSecure: i("terminal-secure", 60549),
		chatImport: i("chat-import", 60550),
		chatExport: i("chat-export", 60551),
		shareWindow: i("share-window", 60552),
		circleSlashCompact: i("circle-slash-compact", 60553),
		copilotCompact: i("copilot-compact", 60554),
		folderOpenedCompact: i("folder-opened-compact", 60555),
		folderCompact: i("folder-compact", 60556),
		gearCompact: i("gear-compact", 60557),
		gitBranchCompact: i("git-branch-compact", 60558),
		libraryCompact: i("library-compact", 60559),
		recordKeysCompact: i("record-keys-compact", 60560),
		remoteCompact: i("remote-compact", 60561),
		repoForkedCompact: i("repo-forked-compact", 60562),
		repoCompact: i("repo-compact", 60563),
		shieldCompact: i("shield-compact", 60564),
		sparkleCompact: i("sparkle-compact", 60565),
		symbolColorCompact: i("symbol-color-compact", 60566),
		windowCompact: i("window-compact", 60567),
		errorCompact: i("error-compact", 60568),
		warningCompact: i("warning-compact", 60569),
		passCompact: i("pass-compact", 60570),
		important: i("important", 60571),
		importantCompact: i("important-compact", 60572),
		rocketCompact: i("rocket-compact", 60573),
		unpin: i("unpin", 60574),
		addCompact: i("add-compact", 60575),
		attachCompact: i("attach-compact", 60576),
		beakerCompact: i("beaker-compact", 60577),
		checkCompact: i("check-compact", 60578),
		checklistCompact: i("checklist-compact", 60579),
		chevronDownCompact: i("chevron-down-compact", 60580),
		chevronLeftCompact: i("chevron-left-compact", 60581),
		chevronRightCompact: i("chevron-right-compact", 60582),
		chevronUpCompact: i("chevron-up-compact", 60583),
		circleFilledCompact: i("circle-filled-compact", 60584),
		circleSmallFilledCompact: i("circle-small-filled-compact", 60585),
		closeCompact: i("close-compact", 60586),
		collapseAllCompact: i("collapse-all-compact", 60587),
		commentCompact: i("comment-compact", 60588),
		commentUnresolvedCompact: i("comment-unresolved-compact", 60589),
		debugConnectedCompact: i("debug-connected-compact", 60590),
		debugDisconnectCompact: i("debug-disconnect-compact", 60591),
		editCompact: i("edit-compact", 60592),
		fileMediaCompact: i("file-media-compact", 60593),
		gitFetch: i("git-fetch", 60594),
		lightbulbCompact: i("lightbulb-compact", 60595),
		loadingCompact: i("loading-compact", 60596),
		passFilledCompact: i("pass-filled-compact", 60597),
		projectCompact: i("project-compact", 60598),
		refreshCompact: i("refresh-compact", 60599),
		searchCompact: i("search-compact", 60600),
		sessionInProgressCompact: i("session-in-progress-compact", 60601),
		syncCompact: i("sync-compact", 60602),
		terminalCompact: i("terminal-compact", 60603),
		vmPending: i("vm-pending", 60604),
		worktreeCompact: i("worktree-compact", 60605),
		developerTools: i("developer-tools", 60606),
		cloudCompact: i("cloud-compact", 60607),
		agentCompact: i("agent-compact", 60608),
		askCompact: i("ask-compact", 60609),
		settingsCompact: i("settings-compact", 60610),
		vmCompact: i("vm-compact", 60611),
		runCompact: i("run-compact", 60612),
		gitPullRequestComment: i("git-pull-request-comment", 60613),
		gitPullRequestError: i("git-pull-request-error", 60614),
		rightPanelHide: i("right-panel-hide", 60615),
		rightPanelShow: i("right-panel-show", 60616),
		vscodeInsidersOutline: i("vscode-insiders-outline", 60617),
		vscodeOutline: i("vscode-outline", 60618),
		voiceMode: i("voice-mode", 60619),
		voiceModeCompact: i("voice-mode-compact", 60620)
	}, ba = {
		dialogError: i("dialog-error", "error"),
		dialogWarning: i("dialog-warning", "warning"),
		dialogInfo: i("dialog-info", "info"),
		dialogClose: i("dialog-close", "close"),
		treeItemExpanded: i("tree-item-expanded", "chevron-down"),
		treeFilterOnTypeOn: i("tree-filter-on-type-on", "list-filter"),
		treeFilterOnTypeOff: i("tree-filter-on-type-off", "list-selection"),
		treeFilterClear: i("tree-filter-clear", "close"),
		treeItemLoading: i("tree-item-loading", "loading"),
		menuSelection: i("menu-selection", "check"),
		menuSubmenu: i("menu-submenu", "chevron-right"),
		menuBarMore: i("menubar-more", "more"),
		scrollbarButtonLeft: i("scrollbar-button-left", "triangle-left"),
		scrollbarButtonRight: i("scrollbar-button-right", "triangle-right"),
		scrollbarButtonUp: i("scrollbar-button-up", "triangle-up"),
		scrollbarButtonDown: i("scrollbar-button-down", "triangle-down"),
		toolBarMore: i("toolbar-more", "more"),
		quickInputBack: i("quick-input-back", "arrow-left"),
		dropDownButton: i("drop-down-button", 60084),
		symbolCustomColor: i("symbol-customcolor", 60252),
		exportIcon: i("export", 60332),
		workspaceUnspecified: i("workspace-unspecified", 60355),
		newLine: i("newline", 60394),
		thumbsDownFilled: i("thumbsdown-filled", 60435),
		thumbsUpFilled: i("thumbsup-filled", 60436),
		gitFetch: i("git-fetch", 60445),
		lightbulbSparkleAutofix: i("lightbulb-sparkle-autofix", 60447),
		debugBreakpointPending: i("debug-breakpoint-pending", 60377),
		chatImport: i("chat-import", 60550),
		chatExport: i("chat-export", 60551)
	}, P = {
		...pa,
		...ba
	};
	var wa = class {
		constructor() {
			this._tokenizationSupports = /* @__PURE__ */ new Map(), this._factories = /* @__PURE__ */ new Map(), this._onDidChange = new he(), this.onDidChange = this._onDidChange.event, this._colorMap = null;
		}
		handleChange(e) {
			this._onDidChange.fire({
				changedLanguages: e,
				changedColorMap: !1
			});
		}
		register(e, t) {
			return this._tokenizationSupports.set(e, t), this.handleChange([e]), Ze(() => {
				this._tokenizationSupports.get(e) === t && (this._tokenizationSupports.delete(e), this.handleChange([e]));
			});
		}
		get(e) {
			return this._tokenizationSupports.get(e) || null;
		}
		registerFactory(e, t) {
			this._factories.get(e)?.dispose();
			const n = new va(this, e, t);
			return this._factories.set(e, n), Ze(() => {
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
	}, va = class extends Ke {
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
	}, ya = class {
		constructor(e, t, n) {
			this.offset = e, this.type = t, this.language = n, this._tokenBrand = void 0;
		}
		toString() {
			return "(" + this.offset + ", " + this.type + ")";
		}
	}, M1;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(M1 || (M1 = {}));
	var P1;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, P.symbolMethod), t.set(1, P.symbolFunction), t.set(2, P.symbolConstructor), t.set(3, P.symbolField), t.set(4, P.symbolVariable), t.set(5, P.symbolClass), t.set(6, P.symbolStruct), t.set(7, P.symbolInterface), t.set(8, P.symbolModule), t.set(9, P.symbolProperty), t.set(10, P.symbolEvent), t.set(11, P.symbolOperator), t.set(12, P.symbolUnit), t.set(13, P.symbolValue), t.set(15, P.symbolEnum), t.set(14, P.symbolConstant), t.set(15, P.symbolEnum), t.set(16, P.symbolEnumMember), t.set(17, P.symbolKeyword), t.set(28, P.symbolSnippet), t.set(18, P.symbolText), t.set(19, P.symbolColor), t.set(20, P.symbolFile), t.set(21, P.symbolReference), t.set(22, P.symbolCustomColor), t.set(23, P.symbolFolder), t.set(24, P.symbolTypeParameter), t.set(25, P.account), t.set(26, P.issues), t.set(27, P.tools);
		function n(o) {
			let l = t.get(o);
			return l || (console.info("No codicon found for CompletionItemKind " + o), l = P.symbolProperty), l;
		}
		e.toIcon = n;
		function r(o) {
			switch (o) {
				case 0: return D(763, "Method");
				case 1: return D(764, "Function");
				case 2: return D(765, "Constructor");
				case 3: return D(766, "Field");
				case 4: return D(767, "Variable");
				case 5: return D(768, "Class");
				case 6: return D(769, "Struct");
				case 7: return D(770, "Interface");
				case 8: return D(771, "Module");
				case 9: return D(772, "Property");
				case 10: return D(773, "Event");
				case 11: return D(774, "Operator");
				case 12: return D(775, "Unit");
				case 13: return D(776, "Value");
				case 14: return D(777, "Constant");
				case 15: return D(778, "Enum");
				case 16: return D(779, "Enum Member");
				case 17: return D(780, "Keyword");
				case 18: return D(781, "Text");
				case 19: return D(782, "Color");
				case 20: return D(783, "File");
				case 21: return D(784, "Reference");
				case 22: return D(785, "Custom Color");
				case 23: return D(786, "Folder");
				case 24: return D(787, "Type Parameter");
				case 25: return D(788, "User");
				case 26: return D(789, "Issue");
				case 27: return D(790, "Tool");
				case 28: return D(791, "Snippet");
				default: return "";
			}
		}
		e.toLabel = r;
		const s = /* @__PURE__ */ new Map();
		s.set("method", 0), s.set("function", 1), s.set("constructor", 2), s.set("field", 3), s.set("variable", 4), s.set("class", 5), s.set("struct", 6), s.set("interface", 7), s.set("module", 8), s.set("property", 9), s.set("event", 10), s.set("operator", 11), s.set("unit", 12), s.set("value", 13), s.set("constant", 14), s.set("enum", 15), s.set("enum-member", 16), s.set("enumMember", 16), s.set("keyword", 17), s.set("snippet", 28), s.set("text", 18), s.set("color", 19), s.set("file", 20), s.set("reference", 21), s.set("customcolor", 22), s.set("folder", 23), s.set("type-parameter", 24), s.set("typeParameter", 24), s.set("account", 25), s.set("issue", 26), s.set("tool", 27);
		function a(o, l) {
			let u = s.get(o);
			return typeof u > "u" && !l && (u = 9), u;
		}
		e.fromString = a;
	})(P1 || (P1 = {}));
	var T1;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(T1 || (T1 = {}));
	var D1;
	(function(e) {
		e[e.Code = 1] = "Code", e[e.Label = 2] = "Label";
	})(D1 || (D1 = {}));
	var F1;
	(function(e) {
		e[e.Accepted = 0] = "Accepted", e[e.Rejected = 1] = "Rejected", e[e.Ignored = 2] = "Ignored";
	})(F1 || (F1 = {}));
	var I1;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.PasteAs = 1] = "PasteAs";
	})(I1 || (I1 = {}));
	var B1;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(B1 || (B1 = {}));
	var V1;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(V1 || (V1 = {}));
	D(792, "array"), D(793, "boolean"), D(794, "class"), D(795, "constant"), D(796, "constructor"), D(797, "enumeration"), D(798, "enumeration member"), D(799, "event"), D(800, "field"), D(801, "file"), D(802, "function"), D(803, "interface"), D(804, "key"), D(805, "method"), D(806, "module"), D(807, "namespace"), D(808, "null"), D(809, "number"), D(810, "object"), D(811, "operator"), D(812, "package"), D(813, "property"), D(814, "string"), D(815, "struct"), D(816, "type parameter"), D(817, "variable");
	var q1;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, P.symbolFile), t.set(1, P.symbolModule), t.set(2, P.symbolNamespace), t.set(3, P.symbolPackage), t.set(4, P.symbolClass), t.set(5, P.symbolMethod), t.set(6, P.symbolProperty), t.set(7, P.symbolField), t.set(8, P.symbolConstructor), t.set(9, P.symbolEnum), t.set(10, P.symbolInterface), t.set(11, P.symbolFunction), t.set(12, P.symbolVariable), t.set(13, P.symbolConstant), t.set(14, P.symbolString), t.set(15, P.symbolNumber), t.set(16, P.symbolBoolean), t.set(17, P.symbolArray), t.set(18, P.symbolObject), t.set(19, P.symbolKey), t.set(20, P.symbolNull), t.set(21, P.symbolEnumMember), t.set(22, P.symbolStruct), t.set(23, P.symbolEvent), t.set(24, P.symbolOperator), t.set(25, P.symbolTypeParameter);
		function n(a) {
			let o = t.get(a);
			return o || (console.info("No codicon found for SymbolKind " + a), o = P.symbolProperty), o;
		}
		e.toIcon = n;
		const r = /* @__PURE__ */ new Map();
		r.set(0, 20), r.set(1, 8), r.set(2, 8), r.set(3, 8), r.set(4, 5), r.set(5, 0), r.set(6, 9), r.set(7, 3), r.set(8, 2), r.set(9, 15), r.set(10, 7), r.set(11, 1), r.set(12, 4), r.set(13, 14), r.set(14, 18), r.set(15, 13), r.set(16, 13), r.set(17, 13), r.set(18, 13), r.set(19, 17), r.set(20, 13), r.set(21, 16), r.set(22, 6), r.set(23, 10), r.set(24, 11), r.set(25, 24);
		function s(a) {
			let o = r.get(a);
			return o === void 0 && (console.info("No completion kind found for SymbolKind " + a), o = 20), o;
		}
		e.toCompletionKind = s;
	})(q1 || (q1 = {}));
	(class Ce {
		static {
			this.Comment = new Ce("comment");
		}
		static {
			this.Imports = new Ce("imports");
		}
		static {
			this.Region = new Ce("region");
		}
		static fromValue(t) {
			switch (t) {
				case "comment": return Ce.Comment;
				case "imports": return Ce.Imports;
				case "region": return Ce.Region;
			}
			return new Ce(t);
		}
		constructor(t) {
			this.value = t;
		}
	});
	var U1;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})(U1 || (U1 = {}));
	var $1;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})($1 || ($1 = {}));
	var W1;
	(function(e) {
		function t(n) {
			return !n || typeof n != "object" ? !1 : typeof n.id == "string" && typeof n.title == "string";
		}
		e.is = t;
	})(W1 || (W1 = {}));
	var H1;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(H1 || (H1 = {}));
	new wa();
	var z1;
	(function(e) {
		e[e.Unknown = 0] = "Unknown", e[e.Disabled = 1] = "Disabled", e[e.Enabled = 2] = "Enabled";
	})(z1 || (z1 = {}));
	var O1;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.Auto = 2] = "Auto";
	})(O1 || (O1 = {}));
	var j1;
	(function(e) {
		e[e.None = 0] = "None", e[e.KeepWhitespace = 1] = "KeepWhitespace", e[e.InsertAsSnippet = 4] = "InsertAsSnippet";
	})(j1 || (j1 = {}));
	var G1;
	(function(e) {
		e[e.Method = 0] = "Method", e[e.Function = 1] = "Function", e[e.Constructor = 2] = "Constructor", e[e.Field = 3] = "Field", e[e.Variable = 4] = "Variable", e[e.Class = 5] = "Class", e[e.Struct = 6] = "Struct", e[e.Interface = 7] = "Interface", e[e.Module = 8] = "Module", e[e.Property = 9] = "Property", e[e.Event = 10] = "Event", e[e.Operator = 11] = "Operator", e[e.Unit = 12] = "Unit", e[e.Value = 13] = "Value", e[e.Constant = 14] = "Constant", e[e.Enum = 15] = "Enum", e[e.EnumMember = 16] = "EnumMember", e[e.Keyword = 17] = "Keyword", e[e.Text = 18] = "Text", e[e.Color = 19] = "Color", e[e.File = 20] = "File", e[e.Reference = 21] = "Reference", e[e.Customcolor = 22] = "Customcolor", e[e.Folder = 23] = "Folder", e[e.TypeParameter = 24] = "TypeParameter", e[e.User = 25] = "User", e[e.Issue = 26] = "Issue", e[e.Tool = 27] = "Tool", e[e.Snippet = 28] = "Snippet";
	})(G1 || (G1 = {}));
	var X1;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(X1 || (X1 = {}));
	var Q1;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.TriggerCharacter = 1] = "TriggerCharacter", e[e.TriggerForIncompleteCompletions = 2] = "TriggerForIncompleteCompletions";
	})(Q1 || (Q1 = {}));
	var Y1;
	(function(e) {
		e[e.EXACT = 0] = "EXACT", e[e.ABOVE = 1] = "ABOVE", e[e.BELOW = 2] = "BELOW";
	})(Y1 || (Y1 = {}));
	var J1;
	(function(e) {
		e[e.NotSet = 0] = "NotSet", e[e.ContentFlush = 1] = "ContentFlush", e[e.RecoverFromMarkers = 2] = "RecoverFromMarkers", e[e.Explicit = 3] = "Explicit", e[e.Paste = 4] = "Paste", e[e.Undo = 5] = "Undo", e[e.Redo = 6] = "Redo";
	})(J1 || (J1 = {}));
	var Z1;
	(function(e) {
		e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(Z1 || (Z1 = {}));
	var K1;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(K1 || (K1 = {}));
	var er;
	(function(e) {
		e[e.None = 0] = "None", e[e.Keep = 1] = "Keep", e[e.Brackets = 2] = "Brackets", e[e.Advanced = 3] = "Advanced", e[e.Full = 4] = "Full";
	})(er || (er = {}));
	var tr;
	(function(e) {
		e[e.acceptSuggestionOnCommitCharacter = 0] = "acceptSuggestionOnCommitCharacter", e[e.acceptSuggestionOnEnter = 1] = "acceptSuggestionOnEnter", e[e.accessibilitySupport = 2] = "accessibilitySupport", e[e.accessibilityPageSize = 3] = "accessibilityPageSize", e[e.allowOverflow = 4] = "allowOverflow", e[e.allowVariableLineHeights = 5] = "allowVariableLineHeights", e[e.allowVariableFonts = 6] = "allowVariableFonts", e[e.allowVariableFontsInAccessibilityMode = 7] = "allowVariableFontsInAccessibilityMode", e[e.ariaLabel = 8] = "ariaLabel", e[e.ariaRequired = 9] = "ariaRequired", e[e.autoClosingBrackets = 10] = "autoClosingBrackets", e[e.autoClosingComments = 11] = "autoClosingComments", e[e.screenReaderAnnounceInlineSuggestion = 12] = "screenReaderAnnounceInlineSuggestion", e[e.autoClosingDelete = 13] = "autoClosingDelete", e[e.autoClosingOvertype = 14] = "autoClosingOvertype", e[e.autoClosingQuotes = 15] = "autoClosingQuotes", e[e.autoIndent = 16] = "autoIndent", e[e.autoIndentOnPaste = 17] = "autoIndentOnPaste", e[e.autoIndentOnPasteWithinString = 18] = "autoIndentOnPasteWithinString", e[e.automaticLayout = 19] = "automaticLayout", e[e.autoSurround = 20] = "autoSurround", e[e.bracketPairColorization = 21] = "bracketPairColorization", e[e.guides = 22] = "guides", e[e.codeLens = 23] = "codeLens", e[e.codeLensFontFamily = 24] = "codeLensFontFamily", e[e.codeLensFontSize = 25] = "codeLensFontSize", e[e.colorDecorators = 26] = "colorDecorators", e[e.colorDecoratorsLimit = 27] = "colorDecoratorsLimit", e[e.columnSelection = 28] = "columnSelection", e[e.comments = 29] = "comments", e[e.contextmenu = 30] = "contextmenu", e[e.copyWithSyntaxHighlighting = 31] = "copyWithSyntaxHighlighting", e[e.cursorBlinking = 32] = "cursorBlinking", e[e.cursorSmoothCaretAnimation = 33] = "cursorSmoothCaretAnimation", e[e.cursorStyle = 34] = "cursorStyle", e[e.cursorSurroundingLines = 35] = "cursorSurroundingLines", e[e.cursorSurroundingLinesStyle = 36] = "cursorSurroundingLinesStyle", e[e.cursorWidth = 37] = "cursorWidth", e[e.cursorHeight = 38] = "cursorHeight", e[e.disableLayerHinting = 39] = "disableLayerHinting", e[e.disableMonospaceOptimizations = 40] = "disableMonospaceOptimizations", e[e.domReadOnly = 41] = "domReadOnly", e[e.dragAndDrop = 42] = "dragAndDrop", e[e.dropIntoEditor = 43] = "dropIntoEditor", e[e.editContext = 44] = "editContext", e[e.emptySelectionClipboard = 45] = "emptySelectionClipboard", e[e.experimentalGpuAcceleration = 46] = "experimentalGpuAcceleration", e[e.experimentalWhitespaceRendering = 47] = "experimentalWhitespaceRendering", e[e.extraEditorClassName = 48] = "extraEditorClassName", e[e.fastScrollSensitivity = 49] = "fastScrollSensitivity", e[e.find = 50] = "find", e[e.fixedOverflowWidgets = 51] = "fixedOverflowWidgets", e[e.folding = 52] = "folding", e[e.foldingStrategy = 53] = "foldingStrategy", e[e.foldingHighlight = 54] = "foldingHighlight", e[e.foldingImportsByDefault = 55] = "foldingImportsByDefault", e[e.foldingMaximumRegions = 56] = "foldingMaximumRegions", e[e.unfoldOnClickAfterEndOfLine = 57] = "unfoldOnClickAfterEndOfLine", e[e.fontFamily = 58] = "fontFamily", e[e.fontInfo = 59] = "fontInfo", e[e.fontLigatures = 60] = "fontLigatures", e[e.fontSize = 61] = "fontSize", e[e.fontWeight = 62] = "fontWeight", e[e.fontVariations = 63] = "fontVariations", e[e.formatOnPaste = 64] = "formatOnPaste", e[e.formatOnType = 65] = "formatOnType", e[e.glyphMargin = 66] = "glyphMargin", e[e.gotoLocation = 67] = "gotoLocation", e[e.hideCursorInOverviewRuler = 68] = "hideCursorInOverviewRuler", e[e.hover = 69] = "hover", e[e.inDiffEditor = 70] = "inDiffEditor", e[e.inlineSuggest = 71] = "inlineSuggest", e[e.letterSpacing = 72] = "letterSpacing", e[e.lightbulb = 73] = "lightbulb", e[e.lineDecorationsWidth = 74] = "lineDecorationsWidth", e[e.lineHeight = 75] = "lineHeight", e[e.lineNumbers = 76] = "lineNumbers", e[e.lineNumbersMinChars = 77] = "lineNumbersMinChars", e[e.linkedEditing = 78] = "linkedEditing", e[e.links = 79] = "links", e[e.matchBrackets = 80] = "matchBrackets", e[e.minimap = 81] = "minimap", e[e.mouseStyle = 82] = "mouseStyle", e[e.mouseWheelScrollSensitivity = 83] = "mouseWheelScrollSensitivity", e[e.mouseWheelZoom = 84] = "mouseWheelZoom", e[e.multiCursorMergeOverlapping = 85] = "multiCursorMergeOverlapping", e[e.multiCursorModifier = 86] = "multiCursorModifier", e[e.mouseMiddleClickAction = 87] = "mouseMiddleClickAction", e[e.multiCursorPaste = 88] = "multiCursorPaste", e[e.multiCursorLimit = 89] = "multiCursorLimit", e[e.occurrencesHighlight = 90] = "occurrencesHighlight", e[e.occurrencesHighlightDelay = 91] = "occurrencesHighlightDelay", e[e.overtypeCursorStyle = 92] = "overtypeCursorStyle", e[e.overtypeOnPaste = 93] = "overtypeOnPaste", e[e.overviewRulerBorder = 94] = "overviewRulerBorder", e[e.overviewRulerLanes = 95] = "overviewRulerLanes", e[e.padding = 96] = "padding", e[e.pasteAs = 97] = "pasteAs", e[e.parameterHints = 98] = "parameterHints", e[e.peekWidgetDefaultFocus = 99] = "peekWidgetDefaultFocus", e[e.placeholder = 100] = "placeholder", e[e.definitionLinkOpensInPeek = 101] = "definitionLinkOpensInPeek", e[e.quickSuggestions = 102] = "quickSuggestions", e[e.quickSuggestionsDelay = 103] = "quickSuggestionsDelay", e[e.readOnly = 104] = "readOnly", e[e.readOnlyMessage = 105] = "readOnlyMessage", e[e.renameOnType = 106] = "renameOnType", e[e.renderRichScreenReaderContent = 107] = "renderRichScreenReaderContent", e[e.renderControlCharacters = 108] = "renderControlCharacters", e[e.renderFinalNewline = 109] = "renderFinalNewline", e[e.renderLineHighlight = 110] = "renderLineHighlight", e[e.renderLineHighlightOnlyWhenFocus = 111] = "renderLineHighlightOnlyWhenFocus", e[e.renderValidationDecorations = 112] = "renderValidationDecorations", e[e.renderWhitespace = 113] = "renderWhitespace", e[e.revealHorizontalRightPadding = 114] = "revealHorizontalRightPadding", e[e.roundedSelection = 115] = "roundedSelection", e[e.rulers = 116] = "rulers", e[e.scrollbar = 117] = "scrollbar", e[e.scrollBeyondLastColumn = 118] = "scrollBeyondLastColumn", e[e.scrollBeyondLastLine = 119] = "scrollBeyondLastLine", e[e.scrollPredominantAxis = 120] = "scrollPredominantAxis", e[e.selectionClipboard = 121] = "selectionClipboard", e[e.selectionHighlight = 122] = "selectionHighlight", e[e.selectionHighlightMaxLength = 123] = "selectionHighlightMaxLength", e[e.selectionHighlightMultiline = 124] = "selectionHighlightMultiline", e[e.selectOnLineNumbers = 125] = "selectOnLineNumbers", e[e.showFoldingControls = 126] = "showFoldingControls", e[e.showUnused = 127] = "showUnused", e[e.snippetSuggestions = 128] = "snippetSuggestions", e[e.smartSelect = 129] = "smartSelect", e[e.smoothScrolling = 130] = "smoothScrolling", e[e.stickyScroll = 131] = "stickyScroll", e[e.stickyTabStops = 132] = "stickyTabStops", e[e.stopRenderingLineAfter = 133] = "stopRenderingLineAfter", e[e.suggest = 134] = "suggest", e[e.suggestFontSize = 135] = "suggestFontSize", e[e.suggestLineHeight = 136] = "suggestLineHeight", e[e.suggestOnTriggerCharacters = 137] = "suggestOnTriggerCharacters", e[e.suggestSelection = 138] = "suggestSelection", e[e.tabCompletion = 139] = "tabCompletion", e[e.tabIndex = 140] = "tabIndex", e[e.trimWhitespaceOnDelete = 141] = "trimWhitespaceOnDelete", e[e.unicodeHighlighting = 142] = "unicodeHighlighting", e[e.unusualLineTerminators = 143] = "unusualLineTerminators", e[e.useShadowDOM = 144] = "useShadowDOM", e[e.useTabStops = 145] = "useTabStops", e[e.wordBreak = 146] = "wordBreak", e[e.wordSegmenterLocales = 147] = "wordSegmenterLocales", e[e.wordSeparators = 148] = "wordSeparators", e[e.wordWrap = 149] = "wordWrap", e[e.wordWrapBreakAfterCharacters = 150] = "wordWrapBreakAfterCharacters", e[e.wordWrapBreakBeforeCharacters = 151] = "wordWrapBreakBeforeCharacters", e[e.wordWrapColumn = 152] = "wordWrapColumn", e[e.wordWrapOverride1 = 153] = "wordWrapOverride1", e[e.wordWrapOverride2 = 154] = "wordWrapOverride2", e[e.wrappingIndent = 155] = "wrappingIndent", e[e.wrappingStrategy = 156] = "wrappingStrategy", e[e.showDeprecated = 157] = "showDeprecated", e[e.inertialScroll = 158] = "inertialScroll", e[e.inlayHints = 159] = "inlayHints", e[e.wrapOnEscapedLineFeeds = 160] = "wrapOnEscapedLineFeeds", e[e.effectiveCursorStyle = 161] = "effectiveCursorStyle", e[e.editorClassName = 162] = "editorClassName", e[e.pixelRatio = 163] = "pixelRatio", e[e.tabFocusMode = 164] = "tabFocusMode", e[e.layoutInfo = 165] = "layoutInfo", e[e.wrappingInfo = 166] = "wrappingInfo", e[e.defaultColorDecorators = 167] = "defaultColorDecorators", e[e.colorDecoratorsActivatedOn = 168] = "colorDecoratorsActivatedOn", e[e.inlineCompletionsAccessibilityVerbose = 169] = "inlineCompletionsAccessibilityVerbose", e[e.effectiveEditContext = 170] = "effectiveEditContext", e[e.scrollOnMiddleClick = 171] = "scrollOnMiddleClick", e[e.effectiveAllowVariableFonts = 172] = "effectiveAllowVariableFonts", e[e.doubleClickSelectsBlock = 173] = "doubleClickSelectsBlock";
	})(tr || (tr = {}));
	var nr;
	(function(e) {
		e[e.TextDefined = 0] = "TextDefined", e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(nr || (nr = {}));
	var rr;
	(function(e) {
		e[e.LF = 0] = "LF", e[e.CRLF = 1] = "CRLF";
	})(rr || (rr = {}));
	var sr;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(sr || (sr = {}));
	var ir;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(ir || (ir = {}));
	var ar;
	(function(e) {
		e[e.None = 0] = "None", e[e.Indent = 1] = "Indent", e[e.IndentOutdent = 2] = "IndentOutdent", e[e.Outdent = 3] = "Outdent";
	})(ar || (ar = {}));
	var or;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})(or || (or = {}));
	var lr;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(lr || (lr = {}));
	var ur;
	(function(e) {
		e[e.Accepted = 0] = "Accepted", e[e.Rejected = 1] = "Rejected", e[e.Ignored = 2] = "Ignored";
	})(ur || (ur = {}));
	var cr;
	(function(e) {
		e[e.Code = 1] = "Code", e[e.Label = 2] = "Label";
	})(cr || (cr = {}));
	var hr;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(hr || (hr = {}));
	var wn;
	(function(e) {
		e[e.DependsOnKbLayout = -1] = "DependsOnKbLayout", e[e.Unknown = 0] = "Unknown", e[e.Backspace = 1] = "Backspace", e[e.Tab = 2] = "Tab", e[e.Enter = 3] = "Enter", e[e.Shift = 4] = "Shift", e[e.Ctrl = 5] = "Ctrl", e[e.Alt = 6] = "Alt", e[e.PauseBreak = 7] = "PauseBreak", e[e.CapsLock = 8] = "CapsLock", e[e.Escape = 9] = "Escape", e[e.Space = 10] = "Space", e[e.PageUp = 11] = "PageUp", e[e.PageDown = 12] = "PageDown", e[e.End = 13] = "End", e[e.Home = 14] = "Home", e[e.LeftArrow = 15] = "LeftArrow", e[e.UpArrow = 16] = "UpArrow", e[e.RightArrow = 17] = "RightArrow", e[e.DownArrow = 18] = "DownArrow", e[e.Insert = 19] = "Insert", e[e.Delete = 20] = "Delete", e[e.Digit0 = 21] = "Digit0", e[e.Digit1 = 22] = "Digit1", e[e.Digit2 = 23] = "Digit2", e[e.Digit3 = 24] = "Digit3", e[e.Digit4 = 25] = "Digit4", e[e.Digit5 = 26] = "Digit5", e[e.Digit6 = 27] = "Digit6", e[e.Digit7 = 28] = "Digit7", e[e.Digit8 = 29] = "Digit8", e[e.Digit9 = 30] = "Digit9", e[e.KeyA = 31] = "KeyA", e[e.KeyB = 32] = "KeyB", e[e.KeyC = 33] = "KeyC", e[e.KeyD = 34] = "KeyD", e[e.KeyE = 35] = "KeyE", e[e.KeyF = 36] = "KeyF", e[e.KeyG = 37] = "KeyG", e[e.KeyH = 38] = "KeyH", e[e.KeyI = 39] = "KeyI", e[e.KeyJ = 40] = "KeyJ", e[e.KeyK = 41] = "KeyK", e[e.KeyL = 42] = "KeyL", e[e.KeyM = 43] = "KeyM", e[e.KeyN = 44] = "KeyN", e[e.KeyO = 45] = "KeyO", e[e.KeyP = 46] = "KeyP", e[e.KeyQ = 47] = "KeyQ", e[e.KeyR = 48] = "KeyR", e[e.KeyS = 49] = "KeyS", e[e.KeyT = 50] = "KeyT", e[e.KeyU = 51] = "KeyU", e[e.KeyV = 52] = "KeyV", e[e.KeyW = 53] = "KeyW", e[e.KeyX = 54] = "KeyX", e[e.KeyY = 55] = "KeyY", e[e.KeyZ = 56] = "KeyZ", e[e.Meta = 57] = "Meta", e[e.ContextMenu = 58] = "ContextMenu", e[e.F1 = 59] = "F1", e[e.F2 = 60] = "F2", e[e.F3 = 61] = "F3", e[e.F4 = 62] = "F4", e[e.F5 = 63] = "F5", e[e.F6 = 64] = "F6", e[e.F7 = 65] = "F7", e[e.F8 = 66] = "F8", e[e.F9 = 67] = "F9", e[e.F10 = 68] = "F10", e[e.F11 = 69] = "F11", e[e.F12 = 70] = "F12", e[e.F13 = 71] = "F13", e[e.F14 = 72] = "F14", e[e.F15 = 73] = "F15", e[e.F16 = 74] = "F16", e[e.F17 = 75] = "F17", e[e.F18 = 76] = "F18", e[e.F19 = 77] = "F19", e[e.F20 = 78] = "F20", e[e.F21 = 79] = "F21", e[e.F22 = 80] = "F22", e[e.F23 = 81] = "F23", e[e.F24 = 82] = "F24", e[e.NumLock = 83] = "NumLock", e[e.ScrollLock = 84] = "ScrollLock", e[e.Semicolon = 85] = "Semicolon", e[e.Equal = 86] = "Equal", e[e.Comma = 87] = "Comma", e[e.Minus = 88] = "Minus", e[e.Period = 89] = "Period", e[e.Slash = 90] = "Slash", e[e.Backquote = 91] = "Backquote", e[e.BracketLeft = 92] = "BracketLeft", e[e.Backslash = 93] = "Backslash", e[e.BracketRight = 94] = "BracketRight", e[e.Quote = 95] = "Quote", e[e.OEM_8 = 96] = "OEM_8", e[e.IntlBackslash = 97] = "IntlBackslash", e[e.Numpad0 = 98] = "Numpad0", e[e.Numpad1 = 99] = "Numpad1", e[e.Numpad2 = 100] = "Numpad2", e[e.Numpad3 = 101] = "Numpad3", e[e.Numpad4 = 102] = "Numpad4", e[e.Numpad5 = 103] = "Numpad5", e[e.Numpad6 = 104] = "Numpad6", e[e.Numpad7 = 105] = "Numpad7", e[e.Numpad8 = 106] = "Numpad8", e[e.Numpad9 = 107] = "Numpad9", e[e.NumpadMultiply = 108] = "NumpadMultiply", e[e.NumpadAdd = 109] = "NumpadAdd", e[e.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", e[e.NumpadSubtract = 111] = "NumpadSubtract", e[e.NumpadDecimal = 112] = "NumpadDecimal", e[e.NumpadDivide = 113] = "NumpadDivide", e[e.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", e[e.ABNT_C1 = 115] = "ABNT_C1", e[e.ABNT_C2 = 116] = "ABNT_C2", e[e.AudioVolumeMute = 117] = "AudioVolumeMute", e[e.AudioVolumeUp = 118] = "AudioVolumeUp", e[e.AudioVolumeDown = 119] = "AudioVolumeDown", e[e.BrowserSearch = 120] = "BrowserSearch", e[e.BrowserHome = 121] = "BrowserHome", e[e.BrowserBack = 122] = "BrowserBack", e[e.BrowserForward = 123] = "BrowserForward", e[e.MediaTrackNext = 124] = "MediaTrackNext", e[e.MediaTrackPrevious = 125] = "MediaTrackPrevious", e[e.MediaStop = 126] = "MediaStop", e[e.MediaPlayPause = 127] = "MediaPlayPause", e[e.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", e[e.LaunchMail = 129] = "LaunchMail", e[e.LaunchApp2 = 130] = "LaunchApp2", e[e.Clear = 131] = "Clear", e[e.MAX_VALUE = 132] = "MAX_VALUE";
	})(wn || (wn = {}));
	var vn;
	(function(e) {
		e[e.Hint = 1] = "Hint", e[e.Info = 2] = "Info", e[e.Warning = 4] = "Warning", e[e.Error = 8] = "Error";
	})(vn || (vn = {}));
	var yn;
	(function(e) {
		e[e.Unnecessary = 1] = "Unnecessary", e[e.Deprecated = 2] = "Deprecated";
	})(yn || (yn = {}));
	var mr;
	(function(e) {
		e[e.Inline = 1] = "Inline", e[e.Gutter = 2] = "Gutter";
	})(mr || (mr = {}));
	var fr;
	(function(e) {
		e[e.Normal = 1] = "Normal", e[e.Underlined = 2] = "Underlined";
	})(fr || (fr = {}));
	var dr;
	(function(e) {
		e[e.UNKNOWN = 0] = "UNKNOWN", e[e.TEXTAREA = 1] = "TEXTAREA", e[e.GUTTER_GLYPH_MARGIN = 2] = "GUTTER_GLYPH_MARGIN", e[e.GUTTER_LINE_NUMBERS = 3] = "GUTTER_LINE_NUMBERS", e[e.GUTTER_LINE_DECORATIONS = 4] = "GUTTER_LINE_DECORATIONS", e[e.GUTTER_VIEW_ZONE = 5] = "GUTTER_VIEW_ZONE", e[e.CONTENT_TEXT = 6] = "CONTENT_TEXT", e[e.CONTENT_EMPTY = 7] = "CONTENT_EMPTY", e[e.CONTENT_VIEW_ZONE = 8] = "CONTENT_VIEW_ZONE", e[e.CONTENT_WIDGET = 9] = "CONTENT_WIDGET", e[e.OVERVIEW_RULER = 10] = "OVERVIEW_RULER", e[e.SCROLLBAR = 11] = "SCROLLBAR", e[e.OVERLAY_WIDGET = 12] = "OVERLAY_WIDGET", e[e.OUTSIDE_EDITOR = 13] = "OUTSIDE_EDITOR";
	})(dr || (dr = {}));
	var gr;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})(gr || (gr = {}));
	var pr;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(pr || (pr = {}));
	var br;
	(function(e) {
		e[e.TOP_RIGHT_CORNER = 0] = "TOP_RIGHT_CORNER", e[e.BOTTOM_RIGHT_CORNER = 1] = "BOTTOM_RIGHT_CORNER", e[e.TOP_CENTER = 2] = "TOP_CENTER";
	})(br || (br = {}));
	var wr;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(wr || (wr = {}));
	var vr;
	(function(e) {
		e[e.Word = 0] = "Word", e[e.Line = 1] = "Line", e[e.Suggest = 2] = "Suggest";
	})(vr || (vr = {}));
	var yr;
	(function(e) {
		e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.None = 2] = "None", e[e.LeftOfInjectedText = 3] = "LeftOfInjectedText", e[e.RightOfInjectedText = 4] = "RightOfInjectedText";
	})(yr || (yr = {}));
	var _r;
	(function(e) {
		e[e.Off = 0] = "Off", e[e.On = 1] = "On", e[e.Relative = 2] = "Relative", e[e.Interval = 3] = "Interval", e[e.Custom = 4] = "Custom";
	})(_r || (_r = {}));
	var Lr;
	(function(e) {
		e[e.None = 0] = "None", e[e.Text = 1] = "Text", e[e.Blocks = 2] = "Blocks";
	})(Lr || (Lr = {}));
	var Nr;
	(function(e) {
		e[e.Smooth = 0] = "Smooth", e[e.Immediate = 1] = "Immediate";
	})(Nr || (Nr = {}));
	var Sr;
	(function(e) {
		e[e.Auto = 1] = "Auto", e[e.Hidden = 2] = "Hidden", e[e.Visible = 3] = "Visible";
	})(Sr || (Sr = {}));
	var _n;
	(function(e) {
		e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
	})(_n || (_n = {}));
	var Rr;
	(function(e) {
		e.Off = "off", e.OnCode = "onCode", e.On = "on";
	})(Rr || (Rr = {}));
	var xr;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(xr || (xr = {}));
	var Cr;
	(function(e) {
		e[e.File = 0] = "File", e[e.Module = 1] = "Module", e[e.Namespace = 2] = "Namespace", e[e.Package = 3] = "Package", e[e.Class = 4] = "Class", e[e.Method = 5] = "Method", e[e.Property = 6] = "Property", e[e.Field = 7] = "Field", e[e.Constructor = 8] = "Constructor", e[e.Enum = 9] = "Enum", e[e.Interface = 10] = "Interface", e[e.Function = 11] = "Function", e[e.Variable = 12] = "Variable", e[e.Constant = 13] = "Constant", e[e.String = 14] = "String", e[e.Number = 15] = "Number", e[e.Boolean = 16] = "Boolean", e[e.Array = 17] = "Array", e[e.Object = 18] = "Object", e[e.Key = 19] = "Key", e[e.Null = 20] = "Null", e[e.EnumMember = 21] = "EnumMember", e[e.Struct = 22] = "Struct", e[e.Event = 23] = "Event", e[e.Operator = 24] = "Operator", e[e.TypeParameter = 25] = "TypeParameter";
	})(Cr || (Cr = {}));
	var Ar;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(Ar || (Ar = {}));
	var Er;
	(function(e) {
		e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
	})(Er || (Er = {}));
	var kr;
	(function(e) {
		e[e.Hidden = 0] = "Hidden", e[e.Blink = 1] = "Blink", e[e.Smooth = 2] = "Smooth", e[e.Phase = 3] = "Phase", e[e.Expand = 4] = "Expand", e[e.Solid = 5] = "Solid";
	})(kr || (kr = {}));
	var Mr;
	(function(e) {
		e[e.Line = 1] = "Line", e[e.Block = 2] = "Block", e[e.Underline = 3] = "Underline", e[e.LineThin = 4] = "LineThin", e[e.BlockOutline = 5] = "BlockOutline", e[e.UnderlineThin = 6] = "UnderlineThin";
	})(Mr || (Mr = {}));
	var Pr;
	(function(e) {
		e[e.AlwaysGrowsWhenTypingAtEdges = 0] = "AlwaysGrowsWhenTypingAtEdges", e[e.NeverGrowsWhenTypingAtEdges = 1] = "NeverGrowsWhenTypingAtEdges", e[e.GrowsOnlyWhenTypingBefore = 2] = "GrowsOnlyWhenTypingBefore", e[e.GrowsOnlyWhenTypingAfter = 3] = "GrowsOnlyWhenTypingAfter";
	})(Pr || (Pr = {}));
	var Tr;
	(function(e) {
		e[e.None = 0] = "None", e[e.Same = 1] = "Same", e[e.Indent = 2] = "Indent", e[e.DeepIndent = 3] = "DeepIndent";
	})(Tr || (Tr = {}));
	var _a = class {
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
			return Ji(e, t);
		}
	};
	function La() {
		return {
			editor: void 0,
			languages: void 0,
			CancellationTokenSource: Gi,
			Emitter: he,
			KeyCode: wn,
			KeyMod: _a,
			Position: W,
			Range: I,
			Selection: ga,
			SelectionDirection: _n,
			MarkerSeverity: vn,
			MarkerTag: yn,
			Uri: _e,
			Token: ya
		};
	}
	var Dr, Ir, Na = class {
		constructor(e, t) {
			this.uri = e, this.value = t;
		}
	};
	function Sa(e) {
		return Array.isArray(e);
	}
	(class ht {
		static {
			this.defaultToKey = (t) => t.toString();
		}
		constructor(t, n) {
			if (this[Dr] = "ResourceMap", t instanceof ht) this.map = new Map(t.map), this.toKey = n ?? ht.defaultToKey;
			else if (Sa(t)) {
				this.map = /* @__PURE__ */ new Map(), this.toKey = n ?? ht.defaultToKey;
				for (const [r, s] of t) this.set(r, s);
			} else this.map = /* @__PURE__ */ new Map(), this.toKey = t ?? ht.defaultToKey;
		}
		set(t, n) {
			return this.map.set(this.toKey(t), new Na(t, n)), this;
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
			for (const [r, s] of this.map) t(s.value, s.uri, this);
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
		*[(Dr = Symbol.toStringTag, Symbol.iterator)]() {
			for (const [, t] of this.map) yield [t.uri, t.value];
		}
	});
	var Ra = class {
		constructor() {
			this[Ir] = "LinkedMap", this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
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
						const s = {
							value: n.key,
							done: !1
						};
						return n = n.next, s;
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
						const s = {
							value: n.value,
							done: !1
						};
						return n = n.next, s;
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
						const s = {
							value: [n.key, n.value],
							done: !1
						};
						return n = n.next, s;
					} else return {
						value: void 0,
						done: !0
					};
				}
			};
			return r;
		}
		[(Ir = Symbol.toStringTag, Symbol.iterator)]() {
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
	}, xa = class extends Ra {
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
	}, Ca = class extends xa {
		constructor(e, t = 1) {
			super(e, t);
		}
		trim(e) {
			this.trimOld(e);
		}
		set(e, t) {
			return super.set(e, t), this.checkTrim(), this;
		}
	}, Aa = class {
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
	new Ca(10);
	var Vr;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(Vr || (Vr = {}));
	var qr;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(qr || (qr = {}));
	var Ur;
	(function(e) {
		e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
	})(Ur || (Ur = {}));
	var $r;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})($r || ($r = {}));
	function Ea(e) {
		if (!e || e.length === 0) return !1;
		for (let t = 0, n = e.length; t < n; t++) {
			const r = e.charCodeAt(t);
			if (r === 10) return !0;
			if (r === 92) {
				if (t++, t >= n) break;
				const s = e.charCodeAt(t);
				if (s === 110 || s === 114 || s === 87) return !0;
			}
		}
		return !1;
	}
	function ka(e, t, n, r, s) {
		if (r === 0) return !0;
		const a = t.charCodeAt(r - 1);
		if (e.get(a) !== 0 || a === 13 || a === 10) return !0;
		if (s > 0) {
			const o = t.charCodeAt(r);
			if (e.get(o) !== 0) return !0;
		}
		return !1;
	}
	function Ma(e, t, n, r, s) {
		if (r + s === n) return !0;
		const a = t.charCodeAt(r + s);
		if (e.get(a) !== 0 || a === 13 || a === 10) return !0;
		if (s > 0) {
			const o = t.charCodeAt(r + s - 1);
			if (e.get(o) !== 0) return !0;
		}
		return !1;
	}
	function Pa(e, t, n, r, s) {
		return ka(e, t, n, r, s) && Ma(e, t, n, r, s);
	}
	var Ta = class {
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
				const r = n.index, s = n[0].length;
				if (r === this._prevMatchStartIndex && s === this._prevMatchLength) {
					if (s === 0) {
						Ni(e, t, this._searchRegex.lastIndex) > 65535 ? this._searchRegex.lastIndex += 2 : this._searchRegex.lastIndex += 1;
						continue;
					}
					return null;
				}
				if (this._prevMatchStartIndex = r, this._prevMatchLength = s, !this._wordSeparators || Pa(this._wordSeparators, e, t, r, s)) return n;
			} while (n);
			return null;
		}
	};
	const Da = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
	function Fa(e = "") {
		let t = "(-?\\d*\\.\\d\\w*)|([^";
		for (const n of Da) e.indexOf(n) >= 0 || (t += "\\" + n);
		return t += "\\s]+)", new RegExp(t, "g");
	}
	const Wr = Fa();
	function Hr(e) {
		let t = Wr;
		if (e && e instanceof RegExp) if (e.global) t = e;
		else {
			let n = "g";
			e.ignoreCase && (n += "i"), e.multiline && (n += "m"), e.unicode && (n += "u"), t = new RegExp(e.source, n);
		}
		return t.lastIndex = 0, t;
	}
	const zr = new Gs();
	zr.unshift({
		maxLen: 1e3,
		windowSize: 15,
		timeBudget: 150
	});
	function Ln(e, t, n, r, s) {
		if (t = Hr(t), s || (s = pt.first(zr)), n.length > s.maxLen) {
			let c = e - s.maxLen / 2;
			return c < 0 ? c = 0 : r += c, n = n.substring(c, e + s.maxLen / 2), Ln(e, t, n, r, s);
		}
		const a = Date.now(), o = e - 1 - r;
		let l = -1, u = null;
		for (let c = 1; !(Date.now() - a >= s.timeBudget); c++) {
			const h = o - s.windowSize * c;
			t.lastIndex = Math.max(0, h);
			const m = Ia(t, n, o, l);
			if (!m && u || (u = m, h <= 0)) break;
			l = h;
		}
		if (u) {
			const c = {
				word: u[0],
				startColumn: r + 1 + u.index,
				endColumn: r + 1 + u.index + u[0].length
			};
			return t.lastIndex = 0, c;
		}
		return null;
	}
	function Ia(e, t, n, r) {
		let s;
		for (; s = e.exec(t);) {
			const a = s.index || 0;
			if (a <= n && e.lastIndex >= n) return s;
			if (r > 0 && a > r) return null;
		}
		return null;
	}
	var Ba = class {
		static computeUnicodeHighlights(e, t, n) {
			const r = n ? n.startLineNumber : 1, s = n ? n.endLineNumber : e.getLineCount(), a = new Or(t), o = a.getCandidateCodePoints();
			let l;
			o === "allNonBasicAscii" ? l = /* @__PURE__ */ new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g") : l = new RegExp(`${Va(Array.from(o))}`, "g");
			const u = new Ta(null, l), c = [];
			let h = !1, m, f = 0, d = 0, b = 0;
			e: for (let p = r, v = s; p <= v; p++) {
				const _ = e.getLineContent(p), N = _.length;
				u.reset(0);
				do
					if (m = u.next(_), m) {
						let y = m.index, A = m.index + m[0].length;
						if (y > 0) _t(_.charCodeAt(y - 1)) && y--;
						if (A + 1 < N) _t(_.charCodeAt(A - 1)) && A++;
						const B = _.substring(y, A);
						let C = Ln(y + 1, Wr, _, 0);
						C && C.endColumn <= y + 1 && (C = null);
						const w = a.shouldHighlightNonBasicASCII(B, C ? C.word : null);
						if (w !== 0) {
							if (w === 3 ? f++ : w === 2 ? d++ : w === 1 ? b++ : $s(), c.length >= 1e3) {
								h = !0;
								break e;
							}
							c.push(new I(p, y + 1, p, A + 1));
						}
					}
				while (m);
			}
			return {
				ranges: c,
				hasMore: h,
				ambiguousCharacterCount: f,
				invisibleCharacterCount: d,
				nonBasicAsciiCharacterCount: b
			};
		}
		static computeUnicodeHighlightReason(e, t) {
			const n = new Or(t);
			switch (n.shouldHighlightNonBasicASCII(e, null)) {
				case 0: return null;
				case 2: return { kind: 1 };
				case 3: {
					const r = e.codePointAt(0), s = n.ambiguousCharacters.getPrimaryConfusable(r), a = an.getLocales().filter((o) => !an.getInstance(/* @__PURE__ */ new Set([...t.allowedLocales, o])).isAmbiguous(r));
					return {
						kind: 0,
						confusableWith: String.fromCodePoint(s),
						notAmbiguousInLocales: a
					};
				}
				case 1: return { kind: 2 };
			}
		}
	};
	function Va(e, t) {
		return `[${wi(e.map((n) => String.fromCodePoint(n)).join(""))}]`;
	}
	var Or = class {
		constructor(e) {
			this.options = e, this.allowedCodePoints = new Set(e.allowedCodePoints), this.ambiguousCharacters = an.getInstance(new Set(e.allowedLocales));
		}
		getCandidateCodePoints() {
			if (this.options.nonBasicASCII) return "allNonBasicAscii";
			const e = /* @__PURE__ */ new Set();
			if (this.options.invisibleCharacters) for (const t of on.codePoints) jr(String.fromCodePoint(t)) || e.add(t);
			if (this.options.ambiguousCharacters) for (const t of this.ambiguousCharacters.getConfusableCodePoints()) e.add(t);
			for (const t of this.allowedCodePoints) e.delete(t);
			return e;
		}
		shouldHighlightNonBasicASCII(e, t) {
			const n = e.codePointAt(0);
			if (this.allowedCodePoints.has(n)) return 0;
			if (this.options.nonBasicASCII) return 1;
			let r = !1, s = !1;
			if (t) for (const a of t) {
				const o = a.codePointAt(0), l = Ri(a);
				r = r || l, !l && !this.ambiguousCharacters.isAmbiguous(o) && !on.isInvisibleCharacter(o) && (s = !0);
			}
			return !r && s ? 0 : this.options.invisibleCharacters && !jr(e) && on.isInvisibleCharacter(n) ? 2 : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(n) ? 3 : 0;
		}
	};
	function jr(e) {
		return e === " " || e === `
` || e === "	";
	}
	var rt = class {
		constructor(e, t, n) {
			this.changes = e, this.moves = t, this.hitTimeout = n;
		}
	}, Gr = class {
		constructor(e, t) {
			this.lineRangeMapping = e, this.changes = t;
		}
	};
	function qa(e, t, n = (r, s) => r === s) {
		if (e === t) return !0;
		if (!e || !t || e.length !== t.length) return !1;
		for (let r = 0, s = e.length; r < s; r++) if (!n(e[r], t[r])) return !1;
		return !0;
	}
	function* Ua(e, t) {
		let n, r;
		for (const s of e) r !== void 0 && t(r, s) ? n.push(s) : (n && (yield n), n = [s]), r = s;
		n && (yield n);
	}
	function $a(e, t) {
		for (let n = 0; n <= e.length; n++) t(n === 0 ? void 0 : e[n - 1], n === e.length ? void 0 : e[n]);
	}
	function Wa(e, t) {
		for (let n = 0; n < e.length; n++) t(n === 0 ? void 0 : e[n - 1], e[n], n + 1 === e.length ? void 0 : e[n + 1]);
	}
	function Ha(e, t) {
		for (const n of t) e.push(n);
	}
	var Nn;
	(function(e) {
		function t(a) {
			return a < 0;
		}
		e.isLessThan = t;
		function n(a) {
			return a <= 0;
		}
		e.isLessThanOrEqual = n;
		function r(a) {
			return a > 0;
		}
		e.isGreaterThan = r;
		function s(a) {
			return a === 0;
		}
		e.isNeitherLessOrGreaterThan = s, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
	})(Nn || (Nn = {}));
	function Ue(e, t) {
		return (n, r) => t(e(n), e(r));
	}
	const st = (e, t) => e - t;
	function za(e) {
		return (t, n) => -e(t, n);
	}
	(class Ut {
		static {
			this.empty = new Ut((t) => {});
		}
		constructor(t) {
			this.iterate = t;
		}
		toArray() {
			const t = [];
			return this.iterate((n) => (t.push(n), !0)), t;
		}
		filter(t) {
			return new Ut((n) => this.iterate((r) => t(r) ? n(r) : !0));
		}
		map(t) {
			return new Ut((n) => this.iterate((r) => n(t(r))));
		}
		findLast(t) {
			let n;
			return this.iterate((r) => (t(r) && (n = r), !0)), n;
		}
		findLastMaxBy(t) {
			let n, r = !0;
			return this.iterate((s) => ((r || Nn.isGreaterThan(t(s, n))) && (r = !1, n = s), !0)), n;
		}
	});
	var V = class oe {
		static fromTo(t, n) {
			return new oe(t, n);
		}
		static addRange(t, n) {
			let r = 0;
			for (; r < n.length && n[r].endExclusive < t.start;) r++;
			let s = r;
			for (; s < n.length && n[s].start <= t.endExclusive;) s++;
			if (r === s) n.splice(r, 0, t);
			else {
				const a = Math.min(t.start, n[r].start), o = Math.max(t.endExclusive, n[s - 1].endExclusive);
				n.splice(r, s - r, new oe(a, o));
			}
		}
		static tryCreate(t, n) {
			if (!(t > n)) return new oe(t, n);
		}
		static ofLength(t) {
			return new oe(0, t);
		}
		static ofStartAndLength(t, n) {
			return new oe(t, t + n);
		}
		static emptyAt(t) {
			return new oe(t, t);
		}
		constructor(t, n) {
			if (this.start = t, this.endExclusive = n, t > n) throw new Y(`Invalid range: ${this.toString()}`);
		}
		get isEmpty() {
			return this.start === this.endExclusive;
		}
		delta(t) {
			return new oe(this.start + t, this.endExclusive + t);
		}
		deltaStart(t) {
			return new oe(this.start + t, this.endExclusive);
		}
		deltaEnd(t) {
			return new oe(this.start, this.endExclusive + t);
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
			return new oe(Math.min(this.start, t.start), Math.max(this.endExclusive, t.endExclusive));
		}
		intersect(t) {
			const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
			if (n <= r) return new oe(n, r);
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
			if (this.isEmpty) throw new Y(`Invalid clipping range: ${this.toString()}`);
			return Math.max(this.start, Math.min(this.endExclusive - 1, t));
		}
		clipCyclic(t) {
			if (this.isEmpty) throw new Y(`Invalid clipping range: ${this.toString()}`);
			return t < this.start ? this.endExclusive - (this.start - t) % this.length : t >= this.endExclusive ? this.start + (t - this.start) % this.length : t;
		}
		forEach(t) {
			for (let n = this.start; n < this.endExclusive; n++) t(n);
		}
		joinRightTouching(t) {
			if (this.endExclusive !== t.start) throw new Y(`Invalid join: ${this.toString()} and ${t.toString()}`);
			return new oe(this.start, t.endExclusive);
		}
		withMargin(t, n) {
			return n === void 0 && (n = t), new oe(this.start - t, this.endExclusive + n);
		}
	};
	function $e(e, t) {
		const n = We(e, t);
		return n === -1 ? void 0 : e[n];
	}
	function We(e, t, n = 0, r = e.length) {
		let s = n, a = r;
		for (; s < a;) {
			const o = Math.floor((s + a) / 2);
			t(e[o]) ? s = o + 1 : a = o;
		}
		return s - 1;
	}
	function Oa(e, t) {
		const n = Sn(e, t);
		return n === e.length ? void 0 : e[n];
	}
	function Sn(e, t, n = 0, r = e.length) {
		let s = n, a = r;
		for (; s < a;) {
			const o = Math.floor((s + a) / 2);
			t(e[o]) ? a = o : s = o + 1;
		}
		return s;
	}
	var Xr = class Ts {
		static {
			this.assertInvariants = !1;
		}
		constructor(t) {
			this._array = t, this._findLastMonotonousLastIdx = 0;
		}
		findLastMonotonous(t) {
			if (Ts.assertInvariants) {
				if (this._prevFindLastPredicate) {
					for (const r of this._array) if (this._prevFindLastPredicate(r) && !t(r)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
				}
				this._prevFindLastPredicate = t;
			}
			const n = We(this._array, t, this._findLastMonotonousLastIdx);
			return this._findLastMonotonousLastIdx = n + 1, n === -1 ? void 0 : this._array[n];
		}
	}, H = class fe {
		static ofLength(t, n) {
			return new fe(t, t + n);
		}
		static fromRange(t) {
			return new fe(t.startLineNumber, t.endLineNumber);
		}
		static fromRangeInclusive(t) {
			return new fe(t.startLineNumber, t.endLineNumber + 1);
		}
		static {
			this.compareByStart = Ue((t) => t.startLineNumber, st);
		}
		static joinMany(t) {
			if (t.length === 0) return [];
			let n = new Ct(t[0].slice());
			for (let r = 1; r < t.length; r++) n = n.getUnion(new Ct(t[r].slice()));
			return n.ranges;
		}
		static join(t) {
			if (t.length === 0) throw new Y("lineRanges cannot be empty");
			let n = t[0].startLineNumber, r = t[0].endLineNumberExclusive;
			for (let s = 1; s < t.length; s++) n = Math.min(n, t[s].startLineNumber), r = Math.max(r, t[s].endLineNumberExclusive);
			return new fe(n, r);
		}
		static deserialize(t) {
			return new fe(t[0], t[1]);
		}
		constructor(t, n) {
			if (t > n) throw new Y(`startLineNumber ${t} cannot be after endLineNumberExclusive ${n}`);
			this.startLineNumber = t, this.endLineNumberExclusive = n;
		}
		contains(t) {
			return this.startLineNumber <= t && t < this.endLineNumberExclusive;
		}
		get isEmpty() {
			return this.startLineNumber === this.endLineNumberExclusive;
		}
		delta(t) {
			return new fe(this.startLineNumber + t, this.endLineNumberExclusive + t);
		}
		deltaLength(t) {
			return new fe(this.startLineNumber, this.endLineNumberExclusive + t);
		}
		get length() {
			return this.endLineNumberExclusive - this.startLineNumber;
		}
		join(t) {
			return new fe(Math.min(this.startLineNumber, t.startLineNumber), Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive));
		}
		toString() {
			return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
		}
		intersect(t) {
			const n = Math.max(this.startLineNumber, t.startLineNumber), r = Math.min(this.endLineNumberExclusive, t.endLineNumberExclusive);
			if (n <= r) return new fe(n, r);
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
			return this.isEmpty ? null : new I(this.startLineNumber, 1, this.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER);
		}
		toExclusiveRange() {
			return new I(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
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
			return new V(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
		}
		addMargin(t, n) {
			return new fe(this.startLineNumber - t, this.endLineNumberExclusive + n);
		}
	}, Ct = class Qe {
		constructor(t = []) {
			this._normalizedRanges = t;
		}
		get ranges() {
			return this._normalizedRanges;
		}
		addRange(t) {
			if (t.length === 0) return;
			const n = Sn(this._normalizedRanges, (s) => s.endLineNumberExclusive >= t.startLineNumber), r = We(this._normalizedRanges, (s) => s.startLineNumber <= t.endLineNumberExclusive) + 1;
			if (n === r) this._normalizedRanges.splice(n, 0, t);
			else if (n === r - 1) {
				const s = this._normalizedRanges[n];
				this._normalizedRanges[n] = s.join(t);
			} else {
				const s = this._normalizedRanges[n].join(this._normalizedRanges[r - 1]).join(t);
				this._normalizedRanges.splice(n, r - n, s);
			}
		}
		contains(t) {
			const n = $e(this._normalizedRanges, (r) => r.startLineNumber <= t);
			return !!n && n.endLineNumberExclusive > t;
		}
		intersects(t) {
			const n = $e(this._normalizedRanges, (r) => r.startLineNumber < t.endLineNumberExclusive);
			return !!n && n.endLineNumberExclusive > t.startLineNumber;
		}
		getUnion(t) {
			if (this._normalizedRanges.length === 0) return t;
			if (t._normalizedRanges.length === 0) return this;
			const n = [];
			let r = 0, s = 0, a = null;
			for (; r < this._normalizedRanges.length || s < t._normalizedRanges.length;) {
				let o = null;
				if (r < this._normalizedRanges.length && s < t._normalizedRanges.length) {
					const l = this._normalizedRanges[r], u = t._normalizedRanges[s];
					l.startLineNumber < u.startLineNumber ? (o = l, r++) : (o = u, s++);
				} else r < this._normalizedRanges.length ? (o = this._normalizedRanges[r], r++) : (o = t._normalizedRanges[s], s++);
				a === null ? a = o : a.endLineNumberExclusive >= o.startLineNumber ? a = new H(a.startLineNumber, Math.max(a.endLineNumberExclusive, o.endLineNumberExclusive)) : (n.push(a), a = o);
			}
			return a !== null && n.push(a), new Qe(n);
		}
		subtractFrom(t) {
			const n = Sn(this._normalizedRanges, (o) => o.endLineNumberExclusive >= t.startLineNumber), r = We(this._normalizedRanges, (o) => o.startLineNumber <= t.endLineNumberExclusive) + 1;
			if (n === r) return new Qe([t]);
			const s = [];
			let a = t.startLineNumber;
			for (let o = n; o < r; o++) {
				const l = this._normalizedRanges[o];
				l.startLineNumber > a && s.push(new H(a, l.startLineNumber)), a = l.endLineNumberExclusive;
			}
			return a < t.endLineNumberExclusive && s.push(new H(a, t.endLineNumberExclusive)), new Qe(s);
		}
		toString() {
			return this._normalizedRanges.map((t) => t.toString()).join(", ");
		}
		getIntersection(t) {
			const n = [];
			let r = 0, s = 0;
			for (; r < this._normalizedRanges.length && s < t._normalizedRanges.length;) {
				const a = this._normalizedRanges[r], o = t._normalizedRanges[s], l = a.intersect(o);
				l && !l.isEmpty && n.push(l), a.endLineNumberExclusive < o.endLineNumberExclusive ? r++ : s++;
			}
			return new Qe(n);
		}
		getWithDelta(t) {
			return new Qe(this._normalizedRanges.map((n) => n.delta(t)));
		}
	}, He = class Le {
		static {
			this.zero = new Le(0, 0);
		}
		static betweenPositions(t, n) {
			return t.lineNumber === n.lineNumber ? new Le(0, n.column - t.column) : new Le(n.lineNumber - t.lineNumber, n.column - 1);
		}
		static fromPosition(t) {
			return new Le(t.lineNumber - 1, t.column - 1);
		}
		static ofRange(t) {
			return Le.betweenPositions(t.getStartPosition(), t.getEndPosition());
		}
		static ofText(t) {
			let n = 0, r = 0;
			for (const s of t) s === `
` ? (n++, r = 0) : r++;
			return new Le(n, r);
		}
		constructor(t, n) {
			this.lineCount = t, this.columnCount = n;
		}
		isGreaterThanOrEqualTo(t) {
			return this.lineCount !== t.lineCount ? this.lineCount > t.lineCount : this.columnCount >= t.columnCount;
		}
		add(t) {
			return t.lineCount === 0 ? new Le(this.lineCount, this.columnCount + t.columnCount) : new Le(this.lineCount + t.lineCount, t.columnCount);
		}
		createRange(t) {
			return this.lineCount === 0 ? new I(t.lineNumber, t.column, t.lineNumber, t.column + this.columnCount) : new I(t.lineNumber, t.column, t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		toRange() {
			return new I(1, 1, this.lineCount + 1, this.columnCount + 1);
		}
		toLineRange() {
			return H.ofLength(1, this.lineCount + 1);
		}
		addToPosition(t) {
			return this.lineCount === 0 ? new W(t.lineNumber, t.column + this.columnCount) : new W(t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		toString() {
			return `${this.lineCount},${this.columnCount}`;
		}
	}, ja = class {
		getOffsetRange(e) {
			return new V(this.getOffset(e.getStartPosition()), this.getOffset(e.getEndPosition()));
		}
		getRange(e) {
			return I.fromPositions(this.getPosition(e.start), this.getPosition(e.endExclusive));
		}
		getStringReplacement(e) {
			return new it.deps.StringReplacement(this.getOffsetRange(e.range), e.text);
		}
		getTextReplacement(e) {
			return new it.deps.TextReplacement(this.getRange(e.replaceRange), e.newText);
		}
		getTextEdit(e) {
			const t = e.replacements.map((n) => this.getTextReplacement(n));
			return new it.deps.TextEdit(t);
		}
	}, it = class {
		static {
			this._deps = void 0;
		}
		static get deps() {
			if (!this._deps) throw new Error("Dependencies not set. Call _setDependencies first.");
			return this._deps;
		}
	};
	function Ga(e) {
		it._deps = e;
	}
	var Qr = class extends ja {
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
			if (e.lineNumber < 1) return new W(1, 1);
			const t = this.textLength.lineCount + 1;
			if (e.lineNumber > t) return new W(t, this.getLineLength(t) + 1);
			if (e.column < 1) return new W(e.lineNumber, 1);
			const n = this.getLineLength(e.lineNumber);
			return e.column - 1 > n ? new W(e.lineNumber, n + 1) : e;
		}
		getPosition(e) {
			const t = We(this.lineStartOffsetByLineIdx, (s) => s <= e);
			return new W(t + 1, e - this.lineStartOffsetByLineIdx[t] + 1);
		}
		get textLength() {
			const e = this.lineStartOffsetByLineIdx.length - 1;
			return new it.deps.TextLength(e, this.text.length - this.lineStartOffsetByLineIdx[e]);
		}
		getLineLength(e) {
			return this.lineEndOffsetByLineIdx[e - 1] - this.lineStartOffsetByLineIdx[e - 1];
		}
	}, Yr = class {
		constructor() {
			this._transformer = void 0;
		}
		get endPositionExclusive() {
			return this.length.addToPosition(new W(1, 1));
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
			return this.getValueOfRange(new I(e, 1, e, Number.MAX_SAFE_INTEGER)).length;
		}
		getTransformer() {
			return this._transformer || (this._transformer = new Qr(this.getValue())), this._transformer;
		}
		getLineAt(e) {
			return this.getValueOfRange(new I(e, 1, e, Number.MAX_SAFE_INTEGER));
		}
	}, Xa = class extends Yr {
		constructor(e, t) {
			Ws(t >= 1), super(), this._getLineContent = e, this._lineCount = t;
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
			return new He(this._lineCount - 1, e.length);
		}
	}, At = class extends Xa {
		constructor(e) {
			super((t) => e[t - 1], e.length);
		}
	}, Et = class extends Yr {
		constructor(e) {
			super(), this.value = e, this._t = new Qr(this.value);
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
	}, Qa = class $n {
		static fromStringEdit(t, n) {
			const r = t.replacements.map((s) => kt.fromStringReplacement(s, n));
			return new $n(r);
		}
		static fromParallelReplacementsUnsorted(t) {
			const n = t.slice().sort(Ue((r) => r.range, I.compareRangesUsingStarts));
			return new $n(n);
		}
		constructor(t) {
			this.replacements = t, Je(() => jt(t, (n, r) => n.range.getEndPosition().isBeforeOrEqual(r.range.getStartPosition())));
		}
		mapPosition(t) {
			let n = 0, r = 0, s = 0;
			for (const a of this.replacements) {
				const o = a.range.getStartPosition();
				if (t.isBeforeOrEqual(o)) break;
				const l = a.range.getEndPosition(), u = He.ofText(a.text);
				if (t.isBefore(l)) {
					const c = new W(o.lineNumber + n, o.column + (o.lineNumber + n === r ? s : 0));
					return Mt(c, u.addToPosition(c));
				}
				o.lineNumber + n !== r && (s = 0), n += u.lineCount - (a.range.endLineNumber - a.range.startLineNumber), u.lineCount === 0 ? l.lineNumber !== o.lineNumber ? s += u.columnCount - (l.column - 1) : s += u.columnCount - (l.column - o.column) : s = u.columnCount, r = l.lineNumber + n;
			}
			return new W(t.lineNumber + n, t.column + (t.lineNumber + n === r ? s : 0));
		}
		mapRange(t) {
			function n(s) {
				return s instanceof W ? s : s.getStartPosition();
			}
			function r(s) {
				return s instanceof W ? s : s.getEndPosition();
			}
			return Mt(n(this.mapPosition(t.getStartPosition())), r(this.mapPosition(t.getEndPosition())));
		}
		apply(t) {
			let n = "", r = new W(1, 1);
			for (const a of this.replacements) {
				const o = a.range, l = o.getStartPosition(), u = o.getEndPosition(), c = Mt(r, l);
				c.isEmpty() || (n += t.getValueOfRange(c)), n += a.text, r = u;
			}
			const s = Mt(r, t.endPositionExclusive);
			return s.isEmpty() || (n += t.getValueOfRange(s)), n;
		}
		applyToString(t) {
			const n = new Et(t);
			return this.apply(n);
		}
		getNewRanges() {
			const t = [];
			let n = 0, r = 0, s = 0;
			for (const a of this.replacements) {
				const o = He.ofText(a.text), l = W.lift({
					lineNumber: a.range.startLineNumber + r,
					column: a.range.startColumn + (a.range.startLineNumber === n ? s : 0)
				}), u = o.createRange(l);
				t.push(u), r = u.endLineNumber - a.range.endLineNumber, s = u.endColumn - a.range.endColumn, n = a.range.endLineNumber;
			}
			return t;
		}
		toReplacement(t) {
			if (this.replacements.length === 0) throw new Y();
			if (this.replacements.length === 1) return this.replacements[0];
			const n = this.replacements[0].range.getStartPosition(), r = this.replacements[this.replacements.length - 1].range.getEndPosition();
			let s = "";
			for (let a = 0; a < this.replacements.length; a++) {
				const o = this.replacements[a];
				if (s += o.text, a < this.replacements.length - 1) {
					const l = this.replacements[a + 1], u = I.fromPositions(o.range.getEndPosition(), l.range.getStartPosition()), c = t.getValueOfRange(u);
					s += c;
				}
			}
			return new kt(I.fromPositions(n, r), s);
		}
		toString(t) {
			return t === void 0 ? this.replacements.map((n) => n.toString()).join(`
`) : typeof t == "string" ? this.toString(new Et(t)) : this.replacements.length === 0 ? "" : this.replacements.map((n) => {
				const s = t.getValueOfRange(n.range), a = I.fromPositions(new W(Math.max(1, n.range.startLineNumber - 1), 1), n.range.getStartPosition());
				let o = t.getValueOfRange(a);
				o.length > 10 && (o = "..." + o.substring(o.length - 10));
				const l = I.fromPositions(n.range.getEndPosition(), new W(n.range.endLineNumber + 1, 1));
				let u = t.getValueOfRange(l);
				u.length > 10 && (u = u.substring(0, 10) + "...");
				let c = s;
				if (c.length > 10) {
					const m = Math.floor(5);
					c = c.substring(0, m) + "..." + c.substring(c.length - m);
				}
				let h = n.text;
				if (h.length > 10) {
					const m = Math.floor(5);
					h = h.substring(0, m) + "..." + h.substring(h.length - m);
				}
				return c.length === 0 ? `${o}❰${h}❱${u}` : `${o}❰${c}↦${h}❱${u}`;
			}).join(`
`);
		}
	}, kt = class De {
		static joinReplacements(t, n) {
			if (t.length === 0) throw new Y();
			if (t.length === 1) return t[0];
			const r = t[0].range.getStartPosition(), s = t[t.length - 1].range.getEndPosition();
			let a = "";
			for (let o = 0; o < t.length; o++) {
				const l = t[o];
				if (a += l.text, o < t.length - 1) {
					const u = t[o + 1], c = I.fromPositions(l.range.getEndPosition(), u.range.getStartPosition()), h = n.getValueOfRange(c);
					a += h;
				}
			}
			return new De(I.fromPositions(r, s), a);
		}
		static fromStringReplacement(t, n) {
			return new De(n.getTransformer().getRange(t.replaceRange), t.newText);
		}
		static delete(t) {
			return new De(t, "");
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
			return De.equals(this, t);
		}
		removeCommonPrefixAndSuffix(t) {
			return this.removeCommonPrefix(t).removeCommonSuffix(t);
		}
		removeCommonPrefix(t) {
			const n = t.getValueOfRange(this.range).replaceAll(`\r
`, `
`), r = this.text.replaceAll(`\r
`, `
`), s = nn(n, r), a = He.ofText(n.substring(0, s)).addToPosition(this.range.getStartPosition()), o = r.substring(s), l = I.fromPositions(a, this.range.getEndPosition());
			return new De(l, o);
		}
		removeCommonSuffix(t) {
			const n = t.getValueOfRange(this.range).replaceAll(`\r
`, `
`), r = this.text.replaceAll(`\r
`, `
`), s = rn(n, r), a = He.ofText(n.substring(0, n.length - s)).addToPosition(this.range.getStartPosition()), o = r.substring(0, r.length - s), l = I.fromPositions(this.range.getStartPosition(), a);
			return new De(l, o);
		}
		toString() {
			const t = this.range.getStartPosition(), n = this.range.getEndPosition();
			return `(${t.lineNumber},${t.column} -> ${n.lineNumber},${n.column}): "${this.text}"`;
		}
	};
	function Mt(e, t) {
		if (e.lineNumber === t.lineNumber && e.column === Number.MAX_SAFE_INTEGER) return I.fromPositions(t, t);
		if (!e.isBeforeOrEqual(t)) throw new Y("start must be before end");
		return new I(e.lineNumber, e.column, t.lineNumber, t.column);
	}
	var ke = class Ye {
		static inverse(t, n, r) {
			const s = [];
			let a = 1, o = 1;
			for (const u of t) {
				const c = new Ye(new H(a, u.original.startLineNumber), new H(o, u.modified.startLineNumber));
				c.modified.isEmpty || s.push(c), a = u.original.endLineNumberExclusive, o = u.modified.endLineNumberExclusive;
			}
			const l = new Ye(new H(a, n + 1), new H(o, r + 1));
			return l.modified.isEmpty || s.push(l), s;
		}
		static clip(t, n, r) {
			const s = [];
			for (const a of t) {
				const o = a.original.intersect(n), l = a.modified.intersect(r);
				o && !o.isEmpty && l && !l.isEmpty && s.push(new Ye(o, l));
			}
			return s;
		}
		constructor(t, n) {
			this.original = t, this.modified = n;
		}
		toString() {
			return `{${this.original.toString()}->${this.modified.toString()}}`;
		}
		flip() {
			return new Ye(this.modified, this.original);
		}
		join(t) {
			return new Ye(this.original.join(t.original), this.modified.join(t.modified));
		}
		toRangeMapping() {
			const t = this.original.toInclusiveRange(), n = this.modified.toInclusiveRange();
			if (t && n) return new ge(t, n);
			if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
				if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1)) throw new Y("not a valid diff");
				return new ge(new I(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new I(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			} else return new ge(new I(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), new I(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER));
		}
		toRangeMapping2(t, n) {
			if (Jr(this.original.endLineNumberExclusive, t) && Jr(this.modified.endLineNumberExclusive, n)) return new ge(new I(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new I(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			if (!this.original.isEmpty && !this.modified.isEmpty) return new ge(I.fromPositions(new W(this.original.startLineNumber, 1), ze(new W(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), I.fromPositions(new W(this.modified.startLineNumber, 1), ze(new W(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1) return new ge(I.fromPositions(ze(new W(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), t), ze(new W(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), I.fromPositions(ze(new W(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), n), ze(new W(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			throw new Y();
		}
	};
	function ze(e, t) {
		if (e.lineNumber < 1) return new W(1, 1);
		if (e.lineNumber > t.length) return new W(t.length, t[t.length - 1].length + 1);
		const n = t[e.lineNumber - 1];
		return e.column > n.length + 1 ? new W(e.lineNumber, n.length + 1) : e;
	}
	function Jr(e, t) {
		return e >= 1 && e <= t.length;
	}
	var at = class $t extends ke {
		static fromRangeMappings(t) {
			const n = H.join(t.map((s) => H.fromRangeInclusive(s.originalRange))), r = H.join(t.map((s) => H.fromRangeInclusive(s.modifiedRange)));
			return new $t(n, r, t);
		}
		constructor(t, n, r) {
			super(t, n), this.innerChanges = r;
		}
		flip() {
			return new $t(this.modified, this.original, this.innerChanges?.map((t) => t.flip()));
		}
		withInnerChangesFromLineRanges() {
			return new $t(this.original, this.modified, [this.toRangeMapping()]);
		}
	}, ge = class Wn {
		static fromEdit(t) {
			const n = t.getNewRanges();
			return t.replacements.map((r, s) => new Wn(r.range, n[s]));
		}
		static assertSorted(t) {
			for (let n = 1; n < t.length; n++) {
				const r = t[n - 1], s = t[n];
				if (!(r.originalRange.getEndPosition().isBeforeOrEqual(s.originalRange.getStartPosition()) && r.modifiedRange.getEndPosition().isBeforeOrEqual(s.modifiedRange.getStartPosition()))) throw new Y("Range mappings must be sorted");
			}
		}
		constructor(t, n) {
			this.originalRange = t, this.modifiedRange = n;
		}
		toString() {
			return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
		}
		flip() {
			return new Wn(this.modifiedRange, this.originalRange);
		}
		toTextEdit(t) {
			const n = t.getValueOfRange(this.modifiedRange);
			return new kt(this.originalRange, n);
		}
	};
	function Rn(e, t, n, r = !1) {
		const s = [];
		for (const a of Ua(e.map((o) => Ya(o, t, n)), (o, l) => o.original.intersectsOrTouches(l.original) || o.modified.intersectsOrTouches(l.modified))) {
			const o = a[0], l = a[a.length - 1];
			s.push(new at(o.original.join(l.original), o.modified.join(l.modified), a.map((u) => u.innerChanges[0])));
		}
		return Je(() => !r && s.length > 0 && (s[0].modified.startLineNumber !== s[0].original.startLineNumber || n.length.lineCount - s[s.length - 1].modified.endLineNumberExclusive !== t.length.lineCount - s[s.length - 1].original.endLineNumberExclusive) ? !1 : jt(s, (a, o) => o.original.startLineNumber - a.original.endLineNumberExclusive === o.modified.startLineNumber - a.modified.endLineNumberExclusive && a.original.endLineNumberExclusive < o.original.startLineNumber && a.modified.endLineNumberExclusive < o.modified.startLineNumber)), s;
	}
	function Ya(e, t, n) {
		let r = 0, s = 0;
		e.modifiedRange.endColumn === 1 && e.originalRange.endColumn === 1 && e.originalRange.startLineNumber + r <= e.originalRange.endLineNumber && e.modifiedRange.startLineNumber + r <= e.modifiedRange.endLineNumber && (s = -1), e.modifiedRange.startColumn - 1 >= n.getLineLength(e.modifiedRange.startLineNumber) && e.originalRange.startColumn - 1 >= t.getLineLength(e.originalRange.startLineNumber) && e.originalRange.startLineNumber <= e.originalRange.endLineNumber + s && e.modifiedRange.startLineNumber <= e.modifiedRange.endLineNumber + s && (r = 1);
		return new at(new H(e.originalRange.startLineNumber + r, e.originalRange.endLineNumber + 1 + s), new H(e.modifiedRange.startLineNumber + r, e.modifiedRange.endLineNumber + 1 + s), [e]);
	}
	const Ja = 3;
	var Za = class {
		computeDiff(e, t, n) {
			const r = new to(e, t, {
				maxComputationTime: n.maxComputationTimeMs,
				shouldIgnoreTrimWhitespace: n.ignoreTrimWhitespace,
				shouldComputeCharChanges: !0,
				shouldMakePrettyDiff: !0,
				shouldPostProcessCharChanges: !0
			}).computeDiff(), s = [];
			let a = null;
			for (const o of r.changes) {
				let l;
				o.originalEndLineNumber === 0 ? l = new H(o.originalStartLineNumber + 1, o.originalStartLineNumber + 1) : l = new H(o.originalStartLineNumber, o.originalEndLineNumber + 1);
				let u;
				o.modifiedEndLineNumber === 0 ? u = new H(o.modifiedStartLineNumber + 1, o.modifiedStartLineNumber + 1) : u = new H(o.modifiedStartLineNumber, o.modifiedEndLineNumber + 1);
				let c = new at(l, u, o.charChanges?.map((h) => new ge(new I(h.originalStartLineNumber, h.originalStartColumn, h.originalEndLineNumber, h.originalEndColumn), new I(h.modifiedStartLineNumber, h.modifiedStartColumn, h.modifiedEndLineNumber, h.modifiedEndColumn))));
				a && (a.modified.endLineNumberExclusive === c.modified.startLineNumber || a.original.endLineNumberExclusive === c.original.startLineNumber) && (c = new at(a.original.join(c.original), a.modified.join(c.modified), a.innerChanges && c.innerChanges ? a.innerChanges.concat(c.innerChanges) : void 0), s.pop()), s.push(c), a = c;
			}
			return Je(() => jt(s, (o, l) => l.original.startLineNumber - o.original.endLineNumberExclusive === l.modified.startLineNumber - o.modified.endLineNumberExclusive && o.original.endLineNumberExclusive < l.original.startLineNumber && o.modified.endLineNumberExclusive < l.modified.startLineNumber)), new rt(s, [], r.quitEarly);
		}
	};
	function Zr(e, t, n, r) {
		return new w1(e, t, n).ComputeDiff(r);
	}
	var Kr = class {
		constructor(e) {
			const t = [], n = [];
			for (let r = 0, s = e.length; r < s; r++) t[r] = Cn(e[r], 1), n[r] = An(e[r], 1);
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
			const r = [], s = [], a = [];
			let o = 0;
			for (let l = t; l <= n; l++) {
				const u = this.lines[l], c = e ? this._startColumns[l] : 1, h = e ? this._endColumns[l] : u.length + 1;
				for (let m = c; m < h; m++) r[o] = u.charCodeAt(m - 1), s[o] = l + 1, a[o] = m, o++;
				!e && l < n && (r[o] = 10, s[o] = l + 1, a[o] = u.length + 1, o++);
			}
			return new Ka(r, s, a);
		}
	}, Ka = class {
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
	}, Pt = class Ds {
		constructor(t, n, r, s, a, o, l, u) {
			this.originalStartLineNumber = t, this.originalStartColumn = n, this.originalEndLineNumber = r, this.originalEndColumn = s, this.modifiedStartLineNumber = a, this.modifiedStartColumn = o, this.modifiedEndLineNumber = l, this.modifiedEndColumn = u;
		}
		static createFromDiffChange(t, n, r) {
			const s = n.getStartLineNumber(t.originalStart), a = n.getStartColumn(t.originalStart), o = n.getEndLineNumber(t.originalStart + t.originalLength - 1), l = n.getEndColumn(t.originalStart + t.originalLength - 1), u = r.getStartLineNumber(t.modifiedStart), c = r.getStartColumn(t.modifiedStart), h = r.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1), m = r.getEndColumn(t.modifiedStart + t.modifiedLength - 1);
			return new Ds(s, a, o, l, u, c, h, m);
		}
	};
	function eo(e) {
		if (e.length <= 1) return e;
		const t = [e[0]];
		let n = t[0];
		for (let r = 1, s = e.length; r < s; r++) {
			const a = e[r], o = a.originalStart - (n.originalStart + n.originalLength), l = a.modifiedStart - (n.modifiedStart + n.modifiedLength);
			Math.min(o, l) < Ja ? (n.originalLength = a.originalStart + a.originalLength - n.originalStart, n.modifiedLength = a.modifiedStart + a.modifiedLength - n.modifiedStart) : (t.push(a), n = a);
		}
		return t;
	}
	var xn = class Fs {
		constructor(t, n, r, s, a) {
			this.originalStartLineNumber = t, this.originalEndLineNumber = n, this.modifiedStartLineNumber = r, this.modifiedEndLineNumber = s, this.charChanges = a;
		}
		static createFromDiffResult(t, n, r, s, a, o, l) {
			let u, c, h, m, f;
			if (n.originalLength === 0 ? (u = r.getStartLineNumber(n.originalStart) - 1, c = 0) : (u = r.getStartLineNumber(n.originalStart), c = r.getEndLineNumber(n.originalStart + n.originalLength - 1)), n.modifiedLength === 0 ? (h = s.getStartLineNumber(n.modifiedStart) - 1, m = 0) : (h = s.getStartLineNumber(n.modifiedStart), m = s.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1)), o && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && a()) {
				const d = r.createCharSequence(t, n.originalStart, n.originalStart + n.originalLength - 1), b = s.createCharSequence(t, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1);
				if (d.getElements().length > 0 && b.getElements().length > 0) {
					let p = Zr(d, b, a, !0).changes;
					l && (p = eo(p)), f = [];
					for (let v = 0, _ = p.length; v < _; v++) f.push(Pt.createFromDiffChange(p[v], d, b));
				}
			}
			return new Fs(u, c, h, m, f);
		}
	}, to = class {
		constructor(e, t, n) {
			this.shouldComputeCharChanges = n.shouldComputeCharChanges, this.shouldPostProcessCharChanges = n.shouldPostProcessCharChanges, this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace, this.shouldMakePrettyDiff = n.shouldMakePrettyDiff, this.originalLines = e, this.modifiedLines = t, this.original = new Kr(e), this.modified = new Kr(t), this.continueLineDiff = es(n.maxComputationTime), this.continueCharDiff = es(n.maxComputationTime === 0 ? 0 : Math.min(n.maxComputationTime, 5e3));
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
			const e = Zr(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff), t = e.changes, n = e.quitEarly;
			if (this.shouldIgnoreTrimWhitespace) {
				const o = [];
				for (let l = 0, u = t.length; l < u; l++) o.push(xn.createFromDiffResult(this.shouldIgnoreTrimWhitespace, t[l], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
				return {
					quitEarly: n,
					changes: o
				};
			}
			const r = [];
			let s = 0, a = 0;
			for (let o = -1, l = t.length; o < l; o++) {
				const u = o + 1 < l ? t[o + 1] : null, c = u ? u.originalStart : this.originalLines.length, h = u ? u.modifiedStart : this.modifiedLines.length;
				for (; s < c && a < h;) {
					const m = this.originalLines[s], f = this.modifiedLines[a];
					if (m !== f) {
						{
							let d = Cn(m, 1), b = Cn(f, 1);
							for (; d > 1 && b > 1 && m.charCodeAt(d - 2) === f.charCodeAt(b - 2);) d--, b--;
							(d > 1 || b > 1) && this._pushTrimWhitespaceCharChange(r, s + 1, 1, d, a + 1, 1, b);
						}
						{
							let d = An(m, 1), b = An(f, 1);
							const p = m.length + 1, v = f.length + 1;
							for (; d < p && b < v && m.charCodeAt(d - 1) === m.charCodeAt(b - 1);) d++, b++;
							(d < p || b < v) && this._pushTrimWhitespaceCharChange(r, s + 1, d, p, a + 1, b, v);
						}
					}
					s++, a++;
				}
				u && (r.push(xn.createFromDiffResult(this.shouldIgnoreTrimWhitespace, u, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges)), s += u.originalLength, a += u.modifiedLength);
			}
			return {
				quitEarly: n,
				changes: r
			};
		}
		_pushTrimWhitespaceCharChange(e, t, n, r, s, a, o) {
			if (this._mergeTrimWhitespaceCharChange(e, t, n, r, s, a, o)) return;
			let l;
			this.shouldComputeCharChanges && (l = [new Pt(t, n, t, r, s, a, s, o)]), e.push(new xn(t, t, s, s, l));
		}
		_mergeTrimWhitespaceCharChange(e, t, n, r, s, a, o) {
			const l = e.length;
			if (l === 0) return !1;
			const u = e[l - 1];
			return u.originalEndLineNumber === 0 || u.modifiedEndLineNumber === 0 ? !1 : u.originalEndLineNumber === t && u.modifiedEndLineNumber === s ? (this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new Pt(t, n, t, r, s, a, s, o)), !0) : u.originalEndLineNumber + 1 === t && u.modifiedEndLineNumber + 1 === s ? (u.originalEndLineNumber = t, u.modifiedEndLineNumber = s, this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new Pt(t, n, t, r, s, a, s, o)), !0) : !1;
		}
	};
	function Cn(e, t) {
		const n = _i(e);
		return n === -1 ? t : n + 1;
	}
	function An(e, t) {
		const n = Li(e);
		return n === -1 ? t : n + 2;
	}
	function es(e) {
		if (e === 0) return () => !0;
		const t = Date.now();
		return () => Date.now() - t < e;
	}
	var Oe = class Hn {
		static trivial(t, n) {
			return new Hn([new ae(V.ofLength(t.length), V.ofLength(n.length))], !1);
		}
		static trivialTimedOut(t, n) {
			return new Hn([new ae(V.ofLength(t.length), V.ofLength(n.length))], !0);
		}
		constructor(t, n) {
			this.diffs = t, this.hitTimeout = n;
		}
	}, ae = class Ne {
		static invert(t, n) {
			const r = [];
			return $a(t, (s, a) => {
				r.push(Ne.fromOffsetPairs(s ? s.getEndExclusives() : Me.zero, a ? a.getStarts() : new Me(n, (s ? s.seq2Range.endExclusive - s.seq1Range.endExclusive : 0) + n)));
			}), r;
		}
		static fromOffsetPairs(t, n) {
			return new Ne(new V(t.offset1, n.offset1), new V(t.offset2, n.offset2));
		}
		static assertSorted(t) {
			let n;
			for (const r of t) {
				if (n && !(n.seq1Range.endExclusive <= r.seq1Range.start && n.seq2Range.endExclusive <= r.seq2Range.start)) throw new Y("Sequence diffs must be sorted");
				n = r;
			}
		}
		constructor(t, n) {
			this.seq1Range = t, this.seq2Range = n;
		}
		swap() {
			return new Ne(this.seq2Range, this.seq1Range);
		}
		toString() {
			return `${this.seq1Range} <-> ${this.seq2Range}`;
		}
		join(t) {
			return new Ne(this.seq1Range.join(t.seq1Range), this.seq2Range.join(t.seq2Range));
		}
		delta(t) {
			return t === 0 ? this : new Ne(this.seq1Range.delta(t), this.seq2Range.delta(t));
		}
		deltaStart(t) {
			return t === 0 ? this : new Ne(this.seq1Range.deltaStart(t), this.seq2Range.deltaStart(t));
		}
		deltaEnd(t) {
			return t === 0 ? this : new Ne(this.seq1Range.deltaEnd(t), this.seq2Range.deltaEnd(t));
		}
		intersect(t) {
			const n = this.seq1Range.intersect(t.seq1Range), r = this.seq2Range.intersect(t.seq2Range);
			if (!(!n || !r)) return new Ne(n, r);
		}
		getStarts() {
			return new Me(this.seq1Range.start, this.seq2Range.start);
		}
		getEndExclusives() {
			return new Me(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
		}
	}, Me = class Wt {
		static {
			this.zero = new Wt(0, 0);
		}
		static {
			this.max = new Wt(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
		}
		constructor(t, n) {
			this.offset1 = t, this.offset2 = n;
		}
		toString() {
			return `${this.offset1} <-> ${this.offset2}`;
		}
		delta(t) {
			return t === 0 ? this : new Wt(this.offset1 + t, this.offset2 + t);
		}
		equals(t) {
			return this.offset1 === t.offset1 && this.offset2 === t.offset2;
		}
	}, En = class Is {
		static {
			this.instance = new Is();
		}
		isValid() {
			return !0;
		}
	}, no = class {
		constructor(e) {
			if (this.timeout = e, this.startTime = Date.now(), this.valid = !0, e <= 0) throw new Y("timeout must be positive");
		}
		isValid() {
			return !(Date.now() - this.startTime < this.timeout) && this.valid && (this.valid = !1), this.valid;
		}
	}, kn = class {
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
	function Mn(e) {
		return e === 32 || e === 9;
	}
	var ts = class zn {
		static {
			this.chrKeys = /* @__PURE__ */ new Map();
		}
		static getKey(t) {
			let n = this.chrKeys.get(t);
			return n === void 0 && (n = this.chrKeys.size, this.chrKeys.set(t, n)), n;
		}
		constructor(t, n, r) {
			this.range = t, this.lines = n, this.source = r, this.histogram = [];
			let s = 0;
			for (let a = t.startLineNumber - 1; a < t.endLineNumberExclusive - 1; a++) {
				const o = n[a];
				for (let u = 0; u < o.length; u++) {
					s++;
					const c = o[u], h = zn.getKey(c);
					this.histogram[h] = (this.histogram[h] || 0) + 1;
				}
				s++;
				const l = zn.getKey(`
`);
				this.histogram[l] = (this.histogram[l] || 0) + 1;
			}
			this.totalCount = s;
		}
		computeSimilarity(t) {
			let n = 0;
			const r = Math.max(this.histogram.length, t.histogram.length);
			for (let s = 0; s < r; s++) n += Math.abs((this.histogram[s] ?? 0) - (t.histogram[s] ?? 0));
			return 1 - n / (this.totalCount + t.totalCount);
		}
	}, ro = class {
		compute(e, t, n = En.instance, r) {
			if (e.length === 0 || t.length === 0) return Oe.trivial(e, t);
			const s = new kn(e.length, t.length), a = new kn(e.length, t.length), o = new kn(e.length, t.length);
			for (let d = 0; d < e.length; d++) for (let b = 0; b < t.length; b++) {
				if (!n.isValid()) return Oe.trivialTimedOut(e, t);
				const p = d === 0 ? 0 : s.get(d - 1, b), v = b === 0 ? 0 : s.get(d, b - 1);
				let _;
				e.getElement(d) === t.getElement(b) ? (d === 0 || b === 0 ? _ = 0 : _ = s.get(d - 1, b - 1), d > 0 && b > 0 && a.get(d - 1, b - 1) === 3 && (_ += o.get(d - 1, b - 1)), _ += r ? r(d, b) : 1) : _ = -1;
				const N = Math.max(p, v, _);
				if (N === _) {
					const y = d > 0 && b > 0 ? o.get(d - 1, b - 1) : 0;
					o.set(d, b, y + 1), a.set(d, b, 3);
				} else N === p ? (o.set(d, b, 0), a.set(d, b, 1)) : N === v && (o.set(d, b, 0), a.set(d, b, 2));
				s.set(d, b, N);
			}
			const l = [];
			let u = e.length, c = t.length;
			function h(d, b) {
				(d + 1 !== u || b + 1 !== c) && l.push(new ae(new V(d + 1, u), new V(b + 1, c))), u = d, c = b;
			}
			let m = e.length - 1, f = t.length - 1;
			for (; m >= 0 && f >= 0;) a.get(m, f) === 3 ? (h(m, f), m--, f--) : a.get(m, f) === 1 ? m-- : f--;
			return h(-1, -1), l.reverse(), new Oe(l, !1);
		}
	}, ns = class {
		compute(e, t, n = En.instance) {
			if (e.length === 0 || t.length === 0) return Oe.trivial(e, t);
			const r = e, s = t;
			function a(b, p) {
				for (; b < r.length && p < s.length && r.getElement(b) === s.getElement(p);) b++, p++;
				return b;
			}
			let o = 0;
			const l = new so();
			l.set(0, a(0, 0));
			const u = new io();
			u.set(0, l.get(0) === 0 ? null : new rs(null, 0, 0, l.get(0)));
			let c = 0;
			e: for (;;) {
				if (o++, !n.isValid()) return Oe.trivialTimedOut(r, s);
				const b = -Math.min(o, s.length + o % 2), p = Math.min(o, r.length + o % 2);
				for (c = b; c <= p; c += 2) {
					const v = c === p ? -1 : l.get(c + 1), _ = c === b ? -1 : l.get(c - 1) + 1, N = Math.min(Math.max(v, _), r.length), y = N - c;
					if (N > r.length || y > s.length) continue;
					const A = a(N, y);
					l.set(c, A);
					const B = N === v ? u.get(c + 1) : u.get(c - 1);
					if (u.set(c, A !== N ? new rs(B, N, y, A - N) : B), l.get(c) === r.length && l.get(c) - c === s.length) break e;
				}
			}
			let h = u.get(c);
			const m = [];
			let f = r.length, d = s.length;
			for (;;) {
				const b = h ? h.x + h.length : 0, p = h ? h.y + h.length : 0;
				if ((b !== f || p !== d) && m.push(new ae(new V(b, f), new V(p, d))), !h) break;
				f = h.x, d = h.y, h = h.prev;
			}
			return m.reverse(), new Oe(m, !1);
		}
	}, rs = class {
		constructor(e, t, n, r) {
			this.prev = e, this.x = t, this.y = n, this.length = r;
		}
	}, so = class {
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
	}, io = class {
		constructor() {
			this.positiveArr = [], this.negativeArr = [];
		}
		get(e) {
			return e < 0 ? (e = -e - 1, this.negativeArr[e]) : this.positiveArr[e];
		}
		set(e, t) {
			e < 0 ? (e = -e - 1, this.negativeArr[e] = t) : this.positiveArr[e] = t;
		}
	}, Tt = class {
		constructor(e, t, n) {
			this.lines = e, this.range = t, this.considerWhitespaceChanges = n, this.elements = [], this.firstElementOffsetByLineIdx = [], this.lineStartOffsets = [], this.trimmedWsLengthsByLineIdx = [], this.firstElementOffsetByLineIdx.push(0);
			for (let r = this.range.startLineNumber; r <= this.range.endLineNumber; r++) {
				let s = e[r - 1], a = 0;
				r === this.range.startLineNumber && this.range.startColumn > 1 && (a = this.range.startColumn - 1, s = s.substring(a)), this.lineStartOffsets.push(a);
				let o = 0;
				if (!n) {
					const u = s.trimStart();
					o = s.length - u.length, s = u.trimEnd();
				}
				this.trimmedWsLengthsByLineIdx.push(o);
				const l = r === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - a - o, s.length) : s.length;
				for (let u = 0; u < l; u++) this.elements.push(s.charCodeAt(u));
				r < this.range.endLineNumber && (this.elements.push(10), this.firstElementOffsetByLineIdx.push(this.elements.length));
			}
		}
		toString() {
			return `Slice: "${this.text}"`;
		}
		get text() {
			return this.getText(new V(0, this.length));
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
			const t = as(e > 0 ? this.elements[e - 1] : -1), n = as(e < this.elements.length ? this.elements[e] : -1);
			if (t === 7 && n === 8) return 0;
			if (t === 8) return 150;
			let r = 0;
			return t !== n && (r += 10, t === 0 && n === 1 && (r += 1)), r += is(t), r += is(n), r;
		}
		translateOffset(e, t = "right") {
			const n = We(this.firstElementOffsetByLineIdx, (s) => s <= e), r = e - this.firstElementOffsetByLineIdx[n];
			return new W(this.range.startLineNumber + n, 1 + this.lineStartOffsets[n] + r + (r === 0 && t === "left" ? 0 : this.trimmedWsLengthsByLineIdx[n]));
		}
		translateRange(e) {
			const t = this.translateOffset(e.start, "right"), n = this.translateOffset(e.endExclusive, "left");
			return n.isBefore(t) ? I.fromPositions(n, n) : I.fromPositions(t, n);
		}
		findWordContaining(e) {
			if (e < 0 || e >= this.elements.length || !je(this.elements[e])) return;
			let t = e;
			for (; t > 0 && je(this.elements[t - 1]);) t--;
			let n = e;
			for (; n < this.elements.length && je(this.elements[n]);) n++;
			return new V(t, n);
		}
		findSubWordContaining(e) {
			if (e < 0 || e >= this.elements.length || !je(this.elements[e])) return;
			let t = e;
			for (; t > 0 && je(this.elements[t - 1]) && !ss(this.elements[t]);) t--;
			let n = e;
			for (; n < this.elements.length && je(this.elements[n]) && !ss(this.elements[n]);) n++;
			return new V(t, n);
		}
		countLinesIn(e) {
			return this.translateOffset(e.endExclusive).lineNumber - this.translateOffset(e.start).lineNumber;
		}
		isStronglyEqual(e, t) {
			return this.elements[e] === this.elements[t];
		}
		extendToFullLines(e) {
			return new V($e(this.firstElementOffsetByLineIdx, (r) => r <= e.start) ?? 0, Oa(this.firstElementOffsetByLineIdx, (r) => e.endExclusive <= r) ?? this.elements.length);
		}
	};
	function je(e) {
		return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57;
	}
	function ss(e) {
		return e >= 65 && e <= 90;
	}
	const ao = {
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
	function is(e) {
		return ao[e];
	}
	function as(e) {
		return e === 10 ? 8 : e === 13 ? 7 : Mn(e) ? 6 : e >= 97 && e <= 122 ? 0 : e >= 65 && e <= 90 ? 1 : e >= 48 && e <= 57 ? 2 : e === -1 ? 3 : e === 44 || e === 59 ? 5 : 4;
	}
	function oo(e, t, n, r, s, a) {
		let { moves: o, excludedChanges: l } = uo(e, t, n, a);
		if (!a.isValid()) return [];
		const u = co(e.filter((c) => !l.has(c)), r, s, t, n, a);
		return Ha(o, u), o = ho(o), o = o.filter((c) => {
			const h = c.original.toOffsetRange().slice(t).map((m) => m.trim());
			return h.join(`
`).length >= 15 && lo(h, (m) => m.length >= 2) >= 2;
		}), o = mo(e, o), o;
	}
	function lo(e, t) {
		let n = 0;
		for (const r of e) t(r) && n++;
		return n;
	}
	function uo(e, t, n, r) {
		const s = [], a = e.filter((u) => u.modified.isEmpty && u.original.length >= 3).map((u) => new ts(u.original, t, u)), o = new Set(e.filter((u) => u.original.isEmpty && u.modified.length >= 3).map((u) => new ts(u.modified, n, u))), l = /* @__PURE__ */ new Set();
		for (const u of a) {
			let c = -1, h;
			for (const m of o) {
				const f = u.computeSimilarity(m);
				f > c && (c = f, h = m);
			}
			if (c > .9 && h && (o.delete(h), s.push(new ke(u.range, h.range)), l.add(u.source), l.add(h.source)), !r.isValid()) return {
				moves: s,
				excludedChanges: l
			};
		}
		return {
			moves: s,
			excludedChanges: l
		};
	}
	function co(e, t, n, r, s, a) {
		const o = [], l = new Aa();
		for (const f of e) for (let d = f.original.startLineNumber; d < f.original.endLineNumberExclusive - 2; d++) {
			const b = `${t[d - 1]}:${t[d + 1 - 1]}:${t[d + 2 - 1]}`;
			l.add(b, { range: new H(d, d + 3) });
		}
		const u = [];
		e.sort(Ue((f) => f.modified.startLineNumber, st));
		for (const f of e) {
			let d = [];
			for (let b = f.modified.startLineNumber; b < f.modified.endLineNumberExclusive - 2; b++) {
				const p = `${n[b - 1]}:${n[b + 1 - 1]}:${n[b + 2 - 1]}`, v = new H(b, b + 3), _ = [];
				l.forEach(p, ({ range: N }) => {
					for (const A of d) if (A.originalLineRange.endLineNumberExclusive + 1 === N.endLineNumberExclusive && A.modifiedLineRange.endLineNumberExclusive + 1 === v.endLineNumberExclusive) {
						A.originalLineRange = new H(A.originalLineRange.startLineNumber, N.endLineNumberExclusive), A.modifiedLineRange = new H(A.modifiedLineRange.startLineNumber, v.endLineNumberExclusive), _.push(A);
						return;
					}
					const y = {
						modifiedLineRange: v,
						originalLineRange: N
					};
					u.push(y), _.push(y);
				}), d = _;
			}
			if (!a.isValid()) return [];
		}
		u.sort(za(Ue((f) => f.modifiedLineRange.length, st)));
		const c = new Ct(), h = new Ct();
		for (const f of u) {
			const d = f.modifiedLineRange.startLineNumber - f.originalLineRange.startLineNumber, b = c.subtractFrom(f.modifiedLineRange), p = h.subtractFrom(f.originalLineRange).getWithDelta(d), v = b.getIntersection(p);
			for (const _ of v.ranges) {
				if (_.length < 3) continue;
				const N = _, y = _.delta(-d);
				o.push(new ke(y, N)), c.addRange(N), h.addRange(y);
			}
		}
		o.sort(Ue((f) => f.original.startLineNumber, st));
		const m = new Xr(e);
		for (let f = 0; f < o.length; f++) {
			const d = o[f], b = m.findLastMonotonous((C) => C.original.startLineNumber <= d.original.startLineNumber), p = $e(e, (C) => C.modified.startLineNumber <= d.modified.startLineNumber), v = Math.max(d.original.startLineNumber - b.original.startLineNumber, d.modified.startLineNumber - p.modified.startLineNumber), _ = m.findLastMonotonous((C) => C.original.startLineNumber < d.original.endLineNumberExclusive), N = $e(e, (C) => C.modified.startLineNumber < d.modified.endLineNumberExclusive), y = Math.max(_.original.endLineNumberExclusive - d.original.endLineNumberExclusive, N.modified.endLineNumberExclusive - d.modified.endLineNumberExclusive);
			let A;
			for (A = 0; A < v; A++) {
				const C = d.original.startLineNumber - A - 1, w = d.modified.startLineNumber - A - 1;
				if (C > r.length || w > s.length || c.contains(w) || h.contains(C) || !os(r[C - 1], s[w - 1], a)) break;
			}
			A > 0 && (h.addRange(new H(d.original.startLineNumber - A, d.original.startLineNumber)), c.addRange(new H(d.modified.startLineNumber - A, d.modified.startLineNumber)));
			let B;
			for (B = 0; B < y; B++) {
				const C = d.original.endLineNumberExclusive + B, w = d.modified.endLineNumberExclusive + B;
				if (C > r.length || w > s.length || c.contains(w) || h.contains(C) || !os(r[C - 1], s[w - 1], a)) break;
			}
			B > 0 && (h.addRange(new H(d.original.endLineNumberExclusive, d.original.endLineNumberExclusive + B)), c.addRange(new H(d.modified.endLineNumberExclusive, d.modified.endLineNumberExclusive + B))), (A > 0 || B > 0) && (o[f] = new ke(new H(d.original.startLineNumber - A, d.original.endLineNumberExclusive + B), new H(d.modified.startLineNumber - A, d.modified.endLineNumberExclusive + B)));
		}
		return o;
	}
	function os(e, t, n) {
		if (e.trim() === t.trim()) return !0;
		if (e.length > 300 && t.length > 300) return !1;
		const r = new ns().compute(new Tt([e], new I(1, 1, 1, e.length), !1), new Tt([t], new I(1, 1, 1, t.length), !1), n);
		let s = 0;
		const a = ae.invert(r.diffs, e.length);
		for (const u of a) u.seq1Range.forEach((c) => {
			Mn(e.charCodeAt(c)) || s++;
		});
		function o(u) {
			let c = 0;
			for (let h = 0; h < e.length; h++) Mn(u.charCodeAt(h)) || c++;
			return c;
		}
		const l = o(e.length > t.length ? e : t);
		return s / l > .6 && l > 10;
	}
	function ho(e) {
		if (e.length === 0) return e;
		e.sort(Ue((n) => n.original.startLineNumber, st));
		const t = [e[0]];
		for (let n = 1; n < e.length; n++) {
			const r = t[t.length - 1], s = e[n], a = s.original.startLineNumber - r.original.endLineNumberExclusive, o = s.modified.startLineNumber - r.modified.endLineNumberExclusive;
			if (a >= 0 && o >= 0 && a + o <= 2) {
				t[t.length - 1] = r.join(s);
				continue;
			}
			t.push(s);
		}
		return t;
	}
	function mo(e, t) {
		const n = new Xr(e);
		return t = t.filter((r) => (n.findLastMonotonous((s) => s.original.startLineNumber < r.original.endLineNumberExclusive) || new ke(new H(1, 1), new H(1, 1))) !== $e(e, (s) => s.modified.startLineNumber < r.modified.endLineNumberExclusive)), t;
	}
	function ls(e, t, n) {
		let r = n;
		return r = us(e, t, r), r = us(e, t, r), r = fo(e, t, r), r;
	}
	function us(e, t, n) {
		if (n.length === 0) return n;
		const r = [];
		r.push(n[0]);
		for (let a = 1; a < n.length; a++) {
			const o = r[r.length - 1];
			let l = n[a];
			if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
				const u = l.seq1Range.start - o.seq1Range.endExclusive;
				let c;
				for (c = 1; c <= u && !(e.getElement(l.seq1Range.start - c) !== e.getElement(l.seq1Range.endExclusive - c) || t.getElement(l.seq2Range.start - c) !== t.getElement(l.seq2Range.endExclusive - c)); c++);
				if (c--, c === u) {
					r[r.length - 1] = new ae(new V(o.seq1Range.start, l.seq1Range.endExclusive - u), new V(o.seq2Range.start, l.seq2Range.endExclusive - u));
					continue;
				}
				l = l.delta(-c);
			}
			r.push(l);
		}
		const s = [];
		for (let a = 0; a < r.length - 1; a++) {
			const o = r[a + 1];
			let l = r[a];
			if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
				const u = o.seq1Range.start - l.seq1Range.endExclusive;
				let c;
				for (c = 0; c < u && !(!e.isStronglyEqual(l.seq1Range.start + c, l.seq1Range.endExclusive + c) || !t.isStronglyEqual(l.seq2Range.start + c, l.seq2Range.endExclusive + c)); c++);
				if (c === u) {
					r[a + 1] = new ae(new V(l.seq1Range.start + u, o.seq1Range.endExclusive), new V(l.seq2Range.start + u, o.seq2Range.endExclusive));
					continue;
				}
				c > 0 && (l = l.delta(c));
			}
			s.push(l);
		}
		return r.length > 0 && s.push(r[r.length - 1]), s;
	}
	function fo(e, t, n) {
		if (!e.getBoundaryScore || !t.getBoundaryScore) return n;
		for (let r = 0; r < n.length; r++) {
			const s = r > 0 ? n[r - 1] : void 0, a = n[r], o = r + 1 < n.length ? n[r + 1] : void 0, l = new V(s ? s.seq1Range.endExclusive + 1 : 0, o ? o.seq1Range.start - 1 : e.length), u = new V(s ? s.seq2Range.endExclusive + 1 : 0, o ? o.seq2Range.start - 1 : t.length);
			a.seq1Range.isEmpty ? n[r] = cs(a, e, t, l, u) : a.seq2Range.isEmpty && (n[r] = cs(a.swap(), t, e, u, l).swap());
		}
		return n;
	}
	function cs(e, t, n, r, s) {
		let o = 1;
		for (; e.seq1Range.start - o >= r.start && e.seq2Range.start - o >= s.start && n.isStronglyEqual(e.seq2Range.start - o, e.seq2Range.endExclusive - o) && o < 100;) o++;
		o--;
		let l = 0;
		for (; e.seq1Range.start + l < r.endExclusive && e.seq2Range.endExclusive + l < s.endExclusive && n.isStronglyEqual(e.seq2Range.start + l, e.seq2Range.endExclusive + l) && l < 100;) l++;
		if (o === 0 && l === 0) return e;
		let u = 0, c = -1;
		for (let h = -o; h <= l; h++) {
			const m = e.seq2Range.start + h, f = e.seq2Range.endExclusive + h, d = e.seq1Range.start + h, b = t.getBoundaryScore(d) + n.getBoundaryScore(m) + n.getBoundaryScore(f);
			b > c && (c = b, u = h);
		}
		return e.delta(u);
	}
	function go(e, t, n) {
		const r = [];
		for (const s of n) {
			const a = r[r.length - 1];
			if (!a) {
				r.push(s);
				continue;
			}
			s.seq1Range.start - a.seq1Range.endExclusive <= 2 || s.seq2Range.start - a.seq2Range.endExclusive <= 2 ? r[r.length - 1] = new ae(a.seq1Range.join(s.seq1Range), a.seq2Range.join(s.seq2Range)) : r.push(s);
		}
		return r;
	}
	function hs(e, t, n, r, s = !1) {
		const a = ae.invert(n, e.length), o = [];
		let l = new Me(0, 0);
		function u(c, h) {
			if (c.offset1 < l.offset1 || c.offset2 < l.offset2) return;
			const m = r(e, c.offset1), f = r(t, c.offset2);
			if (!m || !f) return;
			let d = new ae(m, f);
			const b = d.intersect(h);
			let p = b.seq1Range.length, v = b.seq2Range.length;
			for (; a.length > 0;) {
				const _ = a[0];
				if (!(_.seq1Range.intersects(d.seq1Range) || _.seq2Range.intersects(d.seq2Range))) break;
				const A = new ae(r(e, _.seq1Range.start), r(t, _.seq2Range.start)), B = A.intersect(_);
				if (p += B.seq1Range.length, v += B.seq2Range.length, d = d.join(A), d.seq1Range.endExclusive >= _.seq1Range.endExclusive) a.shift();
				else break;
			}
			(s && p + v < d.seq1Range.length + d.seq2Range.length || p + v < (d.seq1Range.length + d.seq2Range.length) * 2 / 3) && o.push(d), l = d.getEndExclusives();
		}
		for (; a.length > 0;) {
			const c = a.shift();
			c.seq1Range.isEmpty || (u(c.getStarts(), c), u(c.getEndExclusives().delta(-1), c));
		}
		return po(n, o);
	}
	function po(e, t) {
		const n = [];
		for (; e.length > 0 || t.length > 0;) {
			const r = e[0], s = t[0];
			let a;
			r && (!s || r.seq1Range.start < s.seq1Range.start) ? a = e.shift() : a = t.shift(), n.length > 0 && n[n.length - 1].seq1Range.endExclusive >= a.seq1Range.start ? n[n.length - 1] = n[n.length - 1].join(a) : n.push(a);
		}
		return n;
	}
	function bo(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let s = 0, a;
		do {
			a = !1;
			const l = [r[0]];
			for (let u = 1; u < r.length; u++) {
				let m = function(f, d) {
					const b = new V(h.seq1Range.endExclusive, c.seq1Range.start);
					return e.getText(b).replace(/\s/g, "").length <= 4 && (f.seq1Range.length + f.seq2Range.length > 5 || d.seq1Range.length + d.seq2Range.length > 5);
				};
				const c = r[u], h = l[l.length - 1];
				m(h, c) ? (a = !0, l[l.length - 1] = l[l.length - 1].join(c)) : l.push(c);
			}
			r = l;
		} while (s++ < 10 && a);
		return r;
	}
	function wo(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let s = 0, a;
		do {
			a = !1;
			const u = [r[0]];
			for (let c = 1; c < r.length; c++) {
				let f = function(d, b) {
					const p = new V(m.seq1Range.endExclusive, h.seq1Range.start);
					if (e.countLinesIn(p) > 5 || p.length > 500) return !1;
					const v = e.getText(p).trim();
					if (v.length > 20 || v.split(/\r\n|\r|\n/).length > 1) return !1;
					const _ = e.countLinesIn(d.seq1Range), N = d.seq1Range.length, y = t.countLinesIn(d.seq2Range), A = d.seq2Range.length, B = e.countLinesIn(b.seq1Range), C = b.seq1Range.length, w = t.countLinesIn(b.seq2Range), L = b.seq2Range.length, x = 130;
					function $(R) {
						return Math.min(R, x);
					}
					return Math.pow(Math.pow($(_ * 40 + N), 1.5) + Math.pow($(y * 40 + A), 1.5), 1.5) + Math.pow(Math.pow($(B * 40 + C), 1.5) + Math.pow($(w * 40 + L), 1.5), 1.5) > (x ** 1.5) ** 1.5 * 1.3;
				};
				const h = r[c], m = u[u.length - 1];
				f(m, h) ? (a = !0, u[u.length - 1] = u[u.length - 1].join(h)) : u.push(h);
			}
			r = u;
		} while (s++ < 10 && a);
		const o = [];
		return Wa(r, (u, c, h) => {
			let m = c;
			function f(N) {
				return N.length > 0 && N.trim().length <= 3 && c.seq1Range.length + c.seq2Range.length > 100;
			}
			const d = e.extendToFullLines(c.seq1Range), b = e.getText(new V(d.start, c.seq1Range.start));
			f(b) && (m = m.deltaStart(-b.length));
			const p = e.getText(new V(c.seq1Range.endExclusive, d.endExclusive));
			f(p) && (m = m.deltaEnd(p.length));
			const v = ae.fromOffsetPairs(u ? u.getEndExclusives() : Me.zero, h ? h.getStarts() : Me.max), _ = m.intersect(v);
			o.length > 0 && _.getStarts().equals(o[o.length - 1].getEndExclusives()) ? o[o.length - 1] = o[o.length - 1].join(_) : o.push(_);
		}), o;
	}
	var ms = class {
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
			return 1e3 - ((e === 0 ? 0 : fs(this.lines[e - 1])) + (e === this.lines.length ? 0 : fs(this.lines[e])));
		}
		getText(e) {
			return this.lines.slice(e.start, e.endExclusive).join(`
`);
		}
		isStronglyEqual(e, t) {
			return this.lines[e] === this.lines[t];
		}
	};
	function fs(e) {
		let t = 0;
		for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9);) t++;
		return t;
	}
	var vo = class {
		constructor() {
			this.dynamicProgrammingDiffing = new ro(), this.myersDiffingAlgorithm = new ns();
		}
		computeDiff(e, t, n) {
			if (e.length <= 1 && qa(e, t, (C, w) => C === w)) return new rt([], [], !1);
			if (e.length === 1 && e[0].length === 0 || t.length === 1 && t[0].length === 0) return new rt([new at(new H(1, e.length + 1), new H(1, t.length + 1), [new ge(new I(1, 1, e.length, e[e.length - 1].length + 1), new I(1, 1, t.length, t[t.length - 1].length + 1))])], [], !1);
			const r = n.maxComputationTimeMs === 0 ? En.instance : new no(n.maxComputationTimeMs), s = !n.ignoreTrimWhitespace, a = /* @__PURE__ */ new Map();
			function o(C) {
				let w = a.get(C);
				return w === void 0 && (w = a.size, a.set(C, w)), w;
			}
			const l = e.map((C) => o(C.trim())), u = t.map((C) => o(C.trim())), c = new ms(l, e), h = new ms(u, t), m = c.length + h.length < 1700 ? this.dynamicProgrammingDiffing.compute(c, h, r, (C, w) => e[C] === t[w] ? t[w].length === 0 ? .1 : 1 + Math.log(1 + t[w].length) : .99) : this.myersDiffingAlgorithm.compute(c, h, r);
			let f = m.diffs, d = m.hitTimeout;
			f = ls(c, h, f), f = bo(c, h, f);
			const b = [], p = (C) => {
				if (s) for (let w = 0; w < C; w++) {
					const L = v + w, x = _ + w;
					if (e[L] !== t[x]) {
						const $ = this.refineDiff(e, t, new ae(new V(L, L + 1), new V(x, x + 1)), r, s, n);
						for (const R of $.mappings) b.push(R);
						$.hitTimeout && (d = !0);
					}
				}
			};
			let v = 0, _ = 0;
			for (const C of f) {
				Je(() => C.seq1Range.start - v === C.seq2Range.start - _), p(C.seq1Range.start - v), v = C.seq1Range.endExclusive, _ = C.seq2Range.endExclusive;
				const w = this.refineDiff(e, t, C, r, s, n);
				w.hitTimeout && (d = !0);
				for (const L of w.mappings) b.push(L);
			}
			p(e.length - v);
			const A = Rn(b, new At(e), new At(t));
			let B = [];
			return n.computeMoves && (B = this.computeMoves(A, e, t, l, u, r, s, n)), Je(() => {
				function C(L, x) {
					if (L.lineNumber < 1 || L.lineNumber > x.length) return !1;
					const $ = x[L.lineNumber - 1];
					return !(L.column < 1 || L.column > $.length + 1);
				}
				function w(L, x) {
					return !(L.startLineNumber < 1 || L.startLineNumber > x.length + 1 || L.endLineNumberExclusive < 1 || L.endLineNumberExclusive > x.length + 1);
				}
				for (const L of A) {
					if (!L.innerChanges) return !1;
					for (const x of L.innerChanges) if (!(C(x.modifiedRange.getStartPosition(), t) && C(x.modifiedRange.getEndPosition(), t) && C(x.originalRange.getStartPosition(), e) && C(x.originalRange.getEndPosition(), e))) return !1;
					if (!w(L.modified, t) || !w(L.original, e)) return !1;
				}
				return !0;
			}), new rt(A, B, d);
		}
		computeMoves(e, t, n, r, s, a, o, l) {
			return oo(e, t, n, r, s, a).map((u) => {
				return new Gr(u, Rn(this.refineDiff(t, n, new ae(u.original.toOffsetRange(), u.modified.toOffsetRange()), a, o, l).mappings, new At(t), new At(n), !0));
			});
		}
		refineDiff(e, t, n, r, s, a) {
			const o = yo(n).toRangeMapping2(e, t), l = new Tt(e, o.originalRange, s), u = new Tt(t, o.modifiedRange, s), c = l.length + u.length < 500 ? this.dynamicProgrammingDiffing.compute(l, u, r) : this.myersDiffingAlgorithm.compute(l, u, r);
			let h = c.diffs;
			return h = ls(l, u, h), h = hs(l, u, h, (m, f) => m.findWordContaining(f)), a.extendToSubwords && (h = hs(l, u, h, (m, f) => m.findSubWordContaining(f), !0)), h = go(l, u, h), h = wo(l, u, h), {
				mappings: h.map((m) => new ge(l.translateRange(m.seq1Range), u.translateRange(m.seq2Range))),
				hitTimeout: c.hitTimeout
			};
		}
	};
	function yo(e) {
		return new ke(new H(e.seq1Range.start + 1, e.seq1Range.endExclusive + 1), new H(e.seq2Range.start + 1, e.seq2Range.endExclusive + 1));
	}
	var Re;
	(function(e) {
		e.inMemory = "inmemory", e.vscode = "vscode", e.internal = "private", e.walkThrough = "walkThrough", e.walkThroughSnippet = "walkThroughSnippet", e.http = "http", e.https = "https", e.file = "file", e.mailto = "mailto", e.untitled = "untitled", e.data = "data", e.command = "command", e.vscodeRemote = "vscode-remote", e.vscodeRemoteResource = "vscode-remote-resource", e.vscodeManagedRemoteResource = "vscode-managed-remote-resource", e.vscodeUserData = "vscode-userdata", e.vscodeCustomEditor = "vscode-custom-editor", e.vscodeNotebookCell = "vscode-notebook-cell", e.vscodeNotebookCellMetadata = "vscode-notebook-cell-metadata", e.vscodeNotebookCellMetadataDiff = "vscode-notebook-cell-metadata-diff", e.vscodeNotebookCellOutput = "vscode-notebook-cell-output", e.vscodeNotebookCellOutputDiff = "vscode-notebook-cell-output-diff", e.vscodeNotebookMetadata = "vscode-notebook-metadata", e.vscodeInteractiveInput = "vscode-interactive-input", e.vscodeSettings = "vscode-settings", e.vscodeWorkspaceTrust = "vscode-workspace-trust", e.vscodeTerminal = "vscode-terminal", e.vscodeImageCarousel = "vscode-image-carousel", e.vscodeChatCodeBlock = "vscode-chat-code-block", e.vscodeChatCodeCompareBlock = "vscode-chat-code-compare-block", e.vscodeChatEditor = "vscode-chat-editor", e.vscodeChatInput = "chatSessionInput", e.vscodeLocalChatSession = "vscode-chat-session", e.webviewPanel = "webview-panel", e.vscodeWebview = "vscode-webview", e.vscodeBrowser = "vscode-browser", e.extension = "extension", e.vscodeFileResource = "vscode-file", e.tmp = "tmp", e.vsls = "vsls", e.vscodeSourceControl = "vscode-scm", e.commentsInput = "comment", e.codeSetting = "code-setting", e.outputChannel = "output", e.accessibleView = "accessible-view", e.chatEditingSnapshotScheme = "chat-editing-snapshot-text-model", e.chatEditingModel = "chat-editing-text-model", e.copilotPr = "copilot-pr";
	})(Re || (Re = {}));
	var _o = class {
		constructor() {
			this._hosts = Object.create(null), this._ports = Object.create(null), this._connectionTokens = Object.create(null), this._preferredWebSchema = "http", this._delegate = null, this._serverRootPath = "/";
		}
		setPreferredWebSchema(e) {
			this._preferredWebSchema = e;
		}
		get _remoteResourcesPath() {
			return ne.join(this._serverRootPath, Re.vscodeRemoteResource);
		}
		rewrite(e) {
			if (this._delegate) try {
				return this._delegate(e);
			} catch (o) {
				return qs(o), e;
			}
			const t = e.authority;
			let n = this._hosts[t];
			n && n.indexOf(":") !== -1 && n.indexOf("[") === -1 && (n = `[${n}]`);
			const r = this._ports[t], s = this._connectionTokens[t];
			let a = `path=${encodeURIComponent(e.path)}`;
			return typeof s == "string" && (a += `&tkn=${encodeURIComponent(s)}`), _e.from({
				scheme: ni ? this._preferredWebSchema : Re.vscodeRemoteResource,
				authority: `${n}:${r}`,
				path: this._remoteResourcesPath,
				query: a
			});
		}
	};
	const Lo = new _o(), No = "vs/../../node_modules", So = "vscode-app";
	const xo = new class On {
		static {
			this.FALLBACK_AUTHORITY = So;
		}
		asBrowserUri(t) {
			const n = this.toUri(t);
			return this.uriToBrowserUri(n);
		}
		uriToBrowserUri(t) {
			return t.scheme === Re.vscodeRemote ? Lo.rewrite(t) : t.scheme === Re.file && (ti || ri === `${Re.vscodeFileResource}://${On.FALLBACK_AUTHORITY}`) ? t.with({
				scheme: Re.vscodeFileResource,
				authority: t.authority || On.FALLBACK_AUTHORITY,
				query: null,
				fragment: null
			}) : t;
		}
		toUri(t) {
			if (_e.isUri(t)) return t;
			if (globalThis._VSCODE_FILE_ROOT) {
				const n = globalThis._VSCODE_FILE_ROOT;
				if (/^\w[\w\d+.-]*:\/\//.test(n)) return _e.joinPath(_e.parse(n, !0), t);
				const r = aa(n, t);
				return _e.file(r);
			}
			throw new Error("Cannot determine URI for module id!");
		}
	}();
	var ds;
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
		function r(a) {
			let o;
			typeof a == "string" ? o = new URL(a).searchParams : a instanceof URL ? o = a.searchParams : _e.isUri(a) && (o = new URL(a.toString(!0)).searchParams);
			const l = o?.get(n);
			if (l) return t.get(l);
		}
		e.getHeadersFromQuery = r;
		function s(a, o, l) {
			if (!globalThis.crossOriginIsolated) return;
			const u = o && l ? "3" : l ? "2" : "1";
			a instanceof URLSearchParams ? a.set(n, u) : a[n] = u;
		}
		e.addSearchParam = s;
	})(ds || (ds = {}));
	function Co(e, t) {
		(globalThis._VSCODE_PRODUCT_JSON ?? globalThis.vscode?.context?.configuration()?.product)?.commit;
		const r = `${e}/${t}`, s = `${No}/${r}`;
		return xo.asBrowserUri(s).toString(!0);
	}
	var Ao = class {
		constructor(e) {
			this.replacements = e;
			let t = -1;
			for (const n of e) {
				if (!(n.replaceRange.start >= t)) throw new Y(`Edits must be disjoint and sorted. Found ${n} after ${t}`);
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
			const r = [...t.replacements], s = [];
			let a = 0;
			for (const o of n.replacements) {
				for (;;) {
					const h = r[0];
					if (!h || h.replaceRange.start + a + h.getNewLength() >= o.replaceRange.start) break;
					r.shift(), s.push(h), a += h.getNewLength() - h.replaceRange.length;
				}
				const l = a;
				let u, c;
				for (;;) {
					const h = r[0];
					if (!h || h.replaceRange.start + a > o.replaceRange.endExclusive) break;
					u || (u = h), c = h, r.shift(), a += h.getNewLength() - h.replaceRange.length;
				}
				if (!u) s.push(o.delta(-a));
				else {
					const h = Math.min(u.replaceRange.start, o.replaceRange.start - l), m = o.replaceRange.start - (u.replaceRange.start + l);
					if (m > 0) {
						const p = u.slice(V.emptyAt(h), new V(0, m));
						s.push(p);
					}
					if (!c) throw new Y("Invariant violation: lastIntersecting is undefined");
					const f = c.replaceRange.endExclusive + a - o.replaceRange.endExclusive;
					if (f > 0) {
						const p = c.slice(V.ofStartAndLength(c.replaceRange.endExclusive, 0), new V(c.getNewLength() - f, c.getNewLength()));
						r.unshift(p), a -= p.getNewLength() - p.replaceRange.length;
					}
					const d = new V(h, o.replaceRange.endExclusive - a), b = o.slice(d, new V(0, o.getNewLength()));
					s.push(b);
				}
			}
			for (;;) {
				const o = r.shift();
				if (!o) break;
				s.push(o);
			}
			return this._createNew(s).normalize();
		}
		getNewRanges() {
			const e = [];
			let t = 0;
			for (const n of this.replacements) e.push(V.ofStartAndLength(n.replaceRange.start + t, n.getNewLength())), t += n.getLengthDelta();
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
	}, Eo = class {
		constructor(e) {
			this.replaceRange = e;
		}
		delta(e) {
			return this.slice(this.replaceRange.delta(e), new V(0, this.getNewLength()));
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
			return new V(this.replaceRange.start, this.replaceRange.start + this.getNewLength());
		}
	}, ko = class extends Ao {
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
			return new gs(t);
		}
	}, Mo = class extends Eo {
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
			const t = e.substring(this.replaceRange.start, this.replaceRange.endExclusive), n = nn(t, this.newText), r = Math.min(t.length - n, this.newText.length - n, rn(t, this.newText));
			return new Pn(new V(this.replaceRange.start + n, this.replaceRange.endExclusive - r), this.newText.substring(n, this.newText.length - r));
		}
		removeCommonSuffixAndPrefix(e) {
			return this.removeCommonSuffix(e).removeCommonPrefix(e);
		}
		removeCommonPrefix(e) {
			const n = nn(this.replaceRange.substring(e), this.newText);
			return n === 0 ? this : this.slice(this.replaceRange.deltaStart(n), new V(n, this.newText.length));
		}
		removeCommonSuffix(e) {
			const n = rn(this.replaceRange.substring(e), this.newText);
			return n === 0 ? this : this.slice(this.replaceRange.deltaEnd(-n), new V(0, this.newText.length - n));
		}
		toJson() {
			return {
				txt: this.newText,
				pos: this.replaceRange.start,
				len: this.replaceRange.length
			};
		}
	}, gs = class mt extends ko {
		static {
			this.empty = new mt([]);
		}
		static replace(t, n) {
			return new mt([new Pn(t, n)]);
		}
		static compose(t) {
			if (t.length === 0) return mt.empty;
			let n = t[0];
			for (let r = 1; r < t.length; r++) n = n.compose(t[r]);
			return n;
		}
		constructor(t) {
			super(t);
		}
		_createNew(t) {
			return new mt(t);
		}
	}, Pn = class ft extends Mo {
		static insert(t, n) {
			return new ft(V.emptyAt(t), n);
		}
		static replace(t, n) {
			return new ft(t, n);
		}
		equals(t) {
			return this.replaceRange.equals(t.replaceRange) && this.newText === t.newText;
		}
		tryJoinTouching(t) {
			return new ft(this.replaceRange.joinRightTouching(t.replaceRange), this.newText + t.newText);
		}
		slice(t, n) {
			return new ft(t, n ? n.substring(this.newText) : this.newText);
		}
	};
	Ga({
		StringEdit: gs,
		StringReplacement: Pn,
		TextReplacement: kt,
		TextEdit: Qa,
		TextLength: He
	});
	let Tn, Dn, Fn;
	function ps() {
		return Tn || (Tn = import(`${Co("@vscode/diff", "dist/index.js")}`)), Tn;
	}
	function Po(e) {
		return e ? (Fn || (Fn = ps().then((t) => t.createDiffComputer({ useWasm: !0 }))), Fn) : (Dn || (Dn = ps().then((t) => t.createDiffComputer({ useWasm: !1 }))), Dn);
	}
	async function bs(e) {
		return new To(await Po(e));
	}
	var To = class {
		constructor(e) {
			this._computer = e;
		}
		computeDiff(e, t, n) {
			const r = new Et(e.join(`
`)), s = new Et(t.join(`
`)), a = this._computer.computeDiff(r.value, s.value, {
				ignoreTrimWhitespace: !0,
				computeMoves: n.computeMoves,
				extendToSubwords: n.extendToSubwords
			}), o = r.getTransformer(), l = s.getTransformer(), u = [];
			let c = 0;
			for (const f of a.edits.replacements) {
				const d = f.range.start + c, b = d + f.newText.length, p = o.getRange(new V(f.range.start, f.range.endExclusive)), v = l.getRange(new V(d, b));
				u.push(new ge(p, v)), c += f.newText.length - (f.range.endExclusive - f.range.start);
			}
			const h = Rn(u, r, s), m = [];
			if (n.computeMoves) for (const f of a.moves) {
				const d = o.getPosition(f.range.original.start), b = o.getPosition(f.range.original.endExclusive), p = l.getPosition(f.range.modified.start), v = l.getPosition(f.range.modified.endExclusive), _ = new H(d.lineNumber, b.lineNumber), N = new H(p.lineNumber, v.lineNumber);
				m.push(new Gr(new ke(_, N), []));
			}
			return new rt(h, m, a.hitTimeout);
		}
	};
	const Dt = {
		getLegacy: () => new Za(),
		getDefault: () => new vo(),
		getAdvancedExternal: () => bs(!1),
		getAdvancedWasm: () => bs(!0)
	};
	function xe(e, t) {
		const n = Math.pow(10, t);
		return Math.round(e * n) / n;
	}
	var g = class {
		constructor(e, t, n, r = 1) {
			this._rgbaBrand = void 0, this.r = Math.min(255, Math.max(0, e)) | 0, this.g = Math.min(255, Math.max(0, t)) | 0, this.b = Math.min(255, Math.max(0, n)) | 0, this.a = xe(Math.max(Math.min(1, r), 0), 3);
		}
		static equals(e, t) {
			return e.r === t.r && e.g === t.g && e.b === t.b && e.a === t.a;
		}
	}, Pe = class dt {
		constructor(t, n, r, s) {
			this._hslaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = xe(Math.max(Math.min(1, n), 0), 3), this.l = xe(Math.max(Math.min(1, r), 0), 3), this.a = xe(Math.max(Math.min(1, s), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.l === n.l && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, s = t.b / 255, a = t.a, o = Math.max(n, r, s), l = Math.min(n, r, s);
			let u = 0, c = 0;
			const h = (l + o) / 2, m = o - l;
			if (m > 0) {
				switch (c = Math.min(h <= .5 ? m / (2 * h) : m / (2 - 2 * h), 1), o) {
					case n:
						u = (r - s) / m + (r < s ? 6 : 0);
						break;
					case r:
						u = (s - n) / m + 2;
						break;
					case s: u = (n - r) / m + 4;
				}
				u *= 60, u = Math.round(u);
			}
			return new dt(u, c, h, a);
		}
		static _hue2rgb(t, n, r) {
			return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (n - t) * 6 * r : r < 1 / 2 ? n : r < 2 / 3 ? t + (n - t) * (2 / 3 - r) * 6 : t;
		}
		static toRGBA(t) {
			const n = t.h / 360, { s: r, l: s, a } = t;
			let o, l, u;
			if (r === 0) o = l = u = s;
			else {
				const c = s < .5 ? s * (1 + r) : s + r - s * r, h = 2 * s - c;
				o = dt._hue2rgb(h, c, n + 1 / 3), l = dt._hue2rgb(h, c, n), u = dt._hue2rgb(h, c, n - 1 / 3);
			}
			return new g(Math.round(o * 255), Math.round(l * 255), Math.round(u * 255), a);
		}
	}, Ft = class Bs {
		constructor(t, n, r, s) {
			this._hsvaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = xe(Math.max(Math.min(1, n), 0), 3), this.v = xe(Math.max(Math.min(1, r), 0), 3), this.a = xe(Math.max(Math.min(1, s), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.v === n.v && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, s = t.b / 255, a = Math.max(n, r, s), o = a - Math.min(n, r, s), l = a === 0 ? 0 : o / a;
			let u;
			return o === 0 ? u = 0 : a === n ? u = ((r - s) / o % 6 + 6) % 6 : a === r ? u = (s - n) / o + 2 : u = (n - r) / o + 4, new Bs(Math.round(u * 60), l, a, t.a);
		}
		static toRGBA(t) {
			const { h: n, s: r, v: s, a } = t, o = s * r, l = o * (1 - Math.abs(n / 60 % 2 - 1)), u = s - o;
			let [c, h, m] = [
				0,
				0,
				0
			];
			return n < 60 ? (c = o, h = l) : n < 120 ? (c = l, h = o) : n < 180 ? (h = o, m = l) : n < 240 ? (h = l, m = o) : n < 300 ? (c = l, m = o) : n <= 360 && (c = o, m = l), c = Math.round((c + u) * 255), h = Math.round((h + u) * 255), m = Math.round((m + u) * 255), new g(c, h, m, a);
		}
	}, It = class Q {
		static fromHex(t) {
			return Q.Format.CSS.parseHex(t) || Q.red;
		}
		static equals(t, n) {
			return !t && !n ? !0 : !t || !n ? !1 : t.equals(n);
		}
		get hsla() {
			return this._hsla ? this._hsla : Pe.fromRGBA(this.rgba);
		}
		get hsva() {
			return this._hsva ? this._hsva : Ft.fromRGBA(this.rgba);
		}
		constructor(t) {
			if (t) if (t instanceof g) this.rgba = t;
			else if (t instanceof Pe) this._hsla = t, this.rgba = Pe.toRGBA(t);
			else if (t instanceof Ft) this._hsva = t, this.rgba = Ft.toRGBA(t);
			else throw new Error("Invalid color ctor argument");
			else throw new Error("Color needs a value");
		}
		equals(t) {
			return !!t && g.equals(this.rgba, t.rgba) && Pe.equals(this.hsla, t.hsla) && Ft.equals(this.hsva, t.hsva);
		}
		getRelativeLuminance() {
			const t = Q._relativeLuminanceForComponent(this.rgba.r), n = Q._relativeLuminanceForComponent(this.rgba.g), r = Q._relativeLuminanceForComponent(this.rgba.b);
			return xe(.2126 * t + .7152 * n + .0722 * r, 4);
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
			return new Q(new Pe(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * t, this.hsla.a));
		}
		darken(t) {
			return new Q(new Pe(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * t, this.hsla.a));
		}
		transparent(t) {
			const { r: n, g: r, b: s, a } = this.rgba;
			return new Q(new g(n, r, s, a * t));
		}
		isTransparent() {
			return this.rgba.a === 0;
		}
		isOpaque() {
			return this.rgba.a === 1;
		}
		opposite() {
			return new Q(new g(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
		}
		mix(t, n = .5) {
			const r = Math.min(Math.max(n, 0), 1), s = this.rgba, a = t.rgba, o = s.r + (a.r - s.r) * r, l = s.g + (a.g - s.g) * r, u = s.b + (a.b - s.b) * r, c = s.a + (a.a - s.a) * r;
			return new Q(new g(o, l, u, c));
		}
		makeOpaque(t) {
			if (this.isOpaque() || t.rgba.a !== 1) return this;
			const { r: n, g: r, b: s, a } = this.rgba;
			return new Q(new g(t.rgba.r - a * (t.rgba.r - n), t.rgba.g - a * (t.rgba.g - r), t.rgba.b - a * (t.rgba.b - s), 1));
		}
		toString() {
			return this._toString || (this._toString = Q.Format.CSS.format(this)), this._toString;
		}
		toNumber32Bit() {
			return this._toNumber32Bit || (this._toNumber32Bit = (this.rgba.r << 24 | this.rgba.g << 16 | this.rgba.b << 8 | this.rgba.a * 255 << 0) >>> 0), this._toNumber32Bit;
		}
		static getLighterColor(t, n, r) {
			if (t.isLighterThan(n)) return t;
			r = r || .5;
			const s = t.getRelativeLuminance(), a = n.getRelativeLuminance();
			return r = r * (a - s) / a, t.lighten(r);
		}
		static getDarkerColor(t, n, r) {
			if (t.isDarkerThan(n)) return t;
			r = r || .5;
			const s = t.getRelativeLuminance(), a = n.getRelativeLuminance();
			return r = r * (s - a) / s, t.darken(r);
		}
		static {
			this.white = new Q(new g(255, 255, 255, 1));
		}
		static {
			this.black = new Q(new g(0, 0, 0, 1));
		}
		static {
			this.red = new Q(new g(255, 0, 0, 1));
		}
		static {
			this.blue = new Q(new g(0, 0, 255, 1));
		}
		static {
			this.green = new Q(new g(0, 255, 0, 1));
		}
		static {
			this.cyan = new Q(new g(0, 255, 255, 1));
		}
		static {
			this.lightgrey = new Q(new g(211, 211, 211, 1));
		}
		static {
			this.transparent = new Q(new g(0, 0, 0, 0));
		}
	};
	(function(e) {
		(function(t) {
			(function(n) {
				function r(p) {
					return p.rgba.a === 1 ? `rgb(${p.rgba.r}, ${p.rgba.g}, ${p.rgba.b})` : e.Format.CSS.formatRGBA(p);
				}
				n.formatRGB = r;
				function s(p) {
					return `rgba(${p.rgba.r}, ${p.rgba.g}, ${p.rgba.b}, ${+p.rgba.a.toFixed(2)})`;
				}
				n.formatRGBA = s;
				function a(p) {
					return p.hsla.a === 1 ? `hsl(${p.hsla.h}, ${Math.round(p.hsla.s * 100)}%, ${Math.round(p.hsla.l * 100)}%)` : e.Format.CSS.formatHSLA(p);
				}
				n.formatHSL = a;
				function o(p) {
					return `hsla(${p.hsla.h}, ${Math.round(p.hsla.s * 100)}%, ${Math.round(p.hsla.l * 100)}%, ${p.hsla.a.toFixed(2)})`;
				}
				n.formatHSLA = o;
				function l(p) {
					const v = p.toString(16);
					return v.length !== 2 ? "0" + v : v;
				}
				function u(p) {
					return `#${l(p.rgba.r)}${l(p.rgba.g)}${l(p.rgba.b)}`;
				}
				n.formatHex = u;
				function c(p, v = !1) {
					return v && p.rgba.a === 1 ? e.Format.CSS.formatHex(p) : `#${l(p.rgba.r)}${l(p.rgba.g)}${l(p.rgba.b)}${l(Math.round(p.rgba.a * 255))}`;
				}
				n.formatHexA = c;
				function h(p) {
					return p.isOpaque() ? e.Format.CSS.formatHex(p) : e.Format.CSS.formatRGBA(p);
				}
				n.format = h;
				function m(p) {
					if (p === "transparent") return e.transparent;
					if (p.startsWith("#")) return d(p);
					if (p.startsWith("rgba(")) {
						const v = p.match(/rgba\((?<r>(?:\+|-)?\d+), *(?<g>(?:\+|-)?\d+), *(?<b>(?:\+|-)?\d+), *(?<a>(?:\+|-)?\d+(\.\d+)?)\)/);
						if (!v) throw new Error("Invalid color format " + p);
						return new e(new g(parseInt(v.groups?.r ?? "0"), parseInt(v.groups?.g ?? "0"), parseInt(v.groups?.b ?? "0"), parseFloat(v.groups?.a ?? "0")));
					}
					if (p.startsWith("rgb(")) {
						const v = p.match(/rgb\((?<r>(?:\+|-)?\d+), *(?<g>(?:\+|-)?\d+), *(?<b>(?:\+|-)?\d+)\)/);
						if (!v) throw new Error("Invalid color format " + p);
						return new e(new g(parseInt(v.groups?.r ?? "0"), parseInt(v.groups?.g ?? "0"), parseInt(v.groups?.b ?? "0")));
					}
					return f(p);
				}
				n.parse = m;
				function f(p) {
					switch (p) {
						case "aliceblue": return new e(new g(240, 248, 255, 1));
						case "antiquewhite": return new e(new g(250, 235, 215, 1));
						case "aqua": return new e(new g(0, 255, 255, 1));
						case "aquamarine": return new e(new g(127, 255, 212, 1));
						case "azure": return new e(new g(240, 255, 255, 1));
						case "beige": return new e(new g(245, 245, 220, 1));
						case "bisque": return new e(new g(255, 228, 196, 1));
						case "black": return new e(new g(0, 0, 0, 1));
						case "blanchedalmond": return new e(new g(255, 235, 205, 1));
						case "blue": return new e(new g(0, 0, 255, 1));
						case "blueviolet": return new e(new g(138, 43, 226, 1));
						case "brown": return new e(new g(165, 42, 42, 1));
						case "burlywood": return new e(new g(222, 184, 135, 1));
						case "cadetblue": return new e(new g(95, 158, 160, 1));
						case "chartreuse": return new e(new g(127, 255, 0, 1));
						case "chocolate": return new e(new g(210, 105, 30, 1));
						case "coral": return new e(new g(255, 127, 80, 1));
						case "cornflowerblue": return new e(new g(100, 149, 237, 1));
						case "cornsilk": return new e(new g(255, 248, 220, 1));
						case "crimson": return new e(new g(220, 20, 60, 1));
						case "cyan": return new e(new g(0, 255, 255, 1));
						case "darkblue": return new e(new g(0, 0, 139, 1));
						case "darkcyan": return new e(new g(0, 139, 139, 1));
						case "darkgoldenrod": return new e(new g(184, 134, 11, 1));
						case "darkgray": return new e(new g(169, 169, 169, 1));
						case "darkgreen": return new e(new g(0, 100, 0, 1));
						case "darkgrey": return new e(new g(169, 169, 169, 1));
						case "darkkhaki": return new e(new g(189, 183, 107, 1));
						case "darkmagenta": return new e(new g(139, 0, 139, 1));
						case "darkolivegreen": return new e(new g(85, 107, 47, 1));
						case "darkorange": return new e(new g(255, 140, 0, 1));
						case "darkorchid": return new e(new g(153, 50, 204, 1));
						case "darkred": return new e(new g(139, 0, 0, 1));
						case "darksalmon": return new e(new g(233, 150, 122, 1));
						case "darkseagreen": return new e(new g(143, 188, 143, 1));
						case "darkslateblue": return new e(new g(72, 61, 139, 1));
						case "darkslategray": return new e(new g(47, 79, 79, 1));
						case "darkslategrey": return new e(new g(47, 79, 79, 1));
						case "darkturquoise": return new e(new g(0, 206, 209, 1));
						case "darkviolet": return new e(new g(148, 0, 211, 1));
						case "deeppink": return new e(new g(255, 20, 147, 1));
						case "deepskyblue": return new e(new g(0, 191, 255, 1));
						case "dimgray": return new e(new g(105, 105, 105, 1));
						case "dimgrey": return new e(new g(105, 105, 105, 1));
						case "dodgerblue": return new e(new g(30, 144, 255, 1));
						case "firebrick": return new e(new g(178, 34, 34, 1));
						case "floralwhite": return new e(new g(255, 250, 240, 1));
						case "forestgreen": return new e(new g(34, 139, 34, 1));
						case "fuchsia": return new e(new g(255, 0, 255, 1));
						case "gainsboro": return new e(new g(220, 220, 220, 1));
						case "ghostwhite": return new e(new g(248, 248, 255, 1));
						case "gold": return new e(new g(255, 215, 0, 1));
						case "goldenrod": return new e(new g(218, 165, 32, 1));
						case "gray": return new e(new g(128, 128, 128, 1));
						case "green": return new e(new g(0, 128, 0, 1));
						case "greenyellow": return new e(new g(173, 255, 47, 1));
						case "grey": return new e(new g(128, 128, 128, 1));
						case "honeydew": return new e(new g(240, 255, 240, 1));
						case "hotpink": return new e(new g(255, 105, 180, 1));
						case "indianred": return new e(new g(205, 92, 92, 1));
						case "indigo": return new e(new g(75, 0, 130, 1));
						case "ivory": return new e(new g(255, 255, 240, 1));
						case "khaki": return new e(new g(240, 230, 140, 1));
						case "lavender": return new e(new g(230, 230, 250, 1));
						case "lavenderblush": return new e(new g(255, 240, 245, 1));
						case "lawngreen": return new e(new g(124, 252, 0, 1));
						case "lemonchiffon": return new e(new g(255, 250, 205, 1));
						case "lightblue": return new e(new g(173, 216, 230, 1));
						case "lightcoral": return new e(new g(240, 128, 128, 1));
						case "lightcyan": return new e(new g(224, 255, 255, 1));
						case "lightgoldenrodyellow": return new e(new g(250, 250, 210, 1));
						case "lightgray": return new e(new g(211, 211, 211, 1));
						case "lightgreen": return new e(new g(144, 238, 144, 1));
						case "lightgrey": return new e(new g(211, 211, 211, 1));
						case "lightpink": return new e(new g(255, 182, 193, 1));
						case "lightsalmon": return new e(new g(255, 160, 122, 1));
						case "lightseagreen": return new e(new g(32, 178, 170, 1));
						case "lightskyblue": return new e(new g(135, 206, 250, 1));
						case "lightslategray": return new e(new g(119, 136, 153, 1));
						case "lightslategrey": return new e(new g(119, 136, 153, 1));
						case "lightsteelblue": return new e(new g(176, 196, 222, 1));
						case "lightyellow": return new e(new g(255, 255, 224, 1));
						case "lime": return new e(new g(0, 255, 0, 1));
						case "limegreen": return new e(new g(50, 205, 50, 1));
						case "linen": return new e(new g(250, 240, 230, 1));
						case "magenta": return new e(new g(255, 0, 255, 1));
						case "maroon": return new e(new g(128, 0, 0, 1));
						case "mediumaquamarine": return new e(new g(102, 205, 170, 1));
						case "mediumblue": return new e(new g(0, 0, 205, 1));
						case "mediumorchid": return new e(new g(186, 85, 211, 1));
						case "mediumpurple": return new e(new g(147, 112, 219, 1));
						case "mediumseagreen": return new e(new g(60, 179, 113, 1));
						case "mediumslateblue": return new e(new g(123, 104, 238, 1));
						case "mediumspringgreen": return new e(new g(0, 250, 154, 1));
						case "mediumturquoise": return new e(new g(72, 209, 204, 1));
						case "mediumvioletred": return new e(new g(199, 21, 133, 1));
						case "midnightblue": return new e(new g(25, 25, 112, 1));
						case "mintcream": return new e(new g(245, 255, 250, 1));
						case "mistyrose": return new e(new g(255, 228, 225, 1));
						case "moccasin": return new e(new g(255, 228, 181, 1));
						case "navajowhite": return new e(new g(255, 222, 173, 1));
						case "navy": return new e(new g(0, 0, 128, 1));
						case "oldlace": return new e(new g(253, 245, 230, 1));
						case "olive": return new e(new g(128, 128, 0, 1));
						case "olivedrab": return new e(new g(107, 142, 35, 1));
						case "orange": return new e(new g(255, 165, 0, 1));
						case "orangered": return new e(new g(255, 69, 0, 1));
						case "orchid": return new e(new g(218, 112, 214, 1));
						case "palegoldenrod": return new e(new g(238, 232, 170, 1));
						case "palegreen": return new e(new g(152, 251, 152, 1));
						case "paleturquoise": return new e(new g(175, 238, 238, 1));
						case "palevioletred": return new e(new g(219, 112, 147, 1));
						case "papayawhip": return new e(new g(255, 239, 213, 1));
						case "peachpuff": return new e(new g(255, 218, 185, 1));
						case "peru": return new e(new g(205, 133, 63, 1));
						case "pink": return new e(new g(255, 192, 203, 1));
						case "plum": return new e(new g(221, 160, 221, 1));
						case "powderblue": return new e(new g(176, 224, 230, 1));
						case "purple": return new e(new g(128, 0, 128, 1));
						case "rebeccapurple": return new e(new g(102, 51, 153, 1));
						case "red": return new e(new g(255, 0, 0, 1));
						case "rosybrown": return new e(new g(188, 143, 143, 1));
						case "royalblue": return new e(new g(65, 105, 225, 1));
						case "saddlebrown": return new e(new g(139, 69, 19, 1));
						case "salmon": return new e(new g(250, 128, 114, 1));
						case "sandybrown": return new e(new g(244, 164, 96, 1));
						case "seagreen": return new e(new g(46, 139, 87, 1));
						case "seashell": return new e(new g(255, 245, 238, 1));
						case "sienna": return new e(new g(160, 82, 45, 1));
						case "silver": return new e(new g(192, 192, 192, 1));
						case "skyblue": return new e(new g(135, 206, 235, 1));
						case "slateblue": return new e(new g(106, 90, 205, 1));
						case "slategray": return new e(new g(112, 128, 144, 1));
						case "slategrey": return new e(new g(112, 128, 144, 1));
						case "snow": return new e(new g(255, 250, 250, 1));
						case "springgreen": return new e(new g(0, 255, 127, 1));
						case "steelblue": return new e(new g(70, 130, 180, 1));
						case "tan": return new e(new g(210, 180, 140, 1));
						case "teal": return new e(new g(0, 128, 128, 1));
						case "thistle": return new e(new g(216, 191, 216, 1));
						case "tomato": return new e(new g(255, 99, 71, 1));
						case "turquoise": return new e(new g(64, 224, 208, 1));
						case "violet": return new e(new g(238, 130, 238, 1));
						case "wheat": return new e(new g(245, 222, 179, 1));
						case "white": return new e(new g(255, 255, 255, 1));
						case "whitesmoke": return new e(new g(245, 245, 245, 1));
						case "yellow": return new e(new g(255, 255, 0, 1));
						case "yellowgreen": return new e(new g(154, 205, 50, 1));
						default: return null;
					}
				}
				function d(p) {
					const v = p.length;
					if (v === 0 || p.charCodeAt(0) !== 35) return null;
					if (v === 7) return new e(new g(16 * b(p.charCodeAt(1)) + b(p.charCodeAt(2)), 16 * b(p.charCodeAt(3)) + b(p.charCodeAt(4)), 16 * b(p.charCodeAt(5)) + b(p.charCodeAt(6)), 1));
					if (v === 9) return new e(new g(16 * b(p.charCodeAt(1)) + b(p.charCodeAt(2)), 16 * b(p.charCodeAt(3)) + b(p.charCodeAt(4)), 16 * b(p.charCodeAt(5)) + b(p.charCodeAt(6)), (16 * b(p.charCodeAt(7)) + b(p.charCodeAt(8))) / 255));
					if (v === 4) {
						const _ = b(p.charCodeAt(1)), N = b(p.charCodeAt(2)), y = b(p.charCodeAt(3));
						return new e(new g(16 * _ + _, 16 * N + N, 16 * y + y));
					}
					if (v === 5) {
						const _ = b(p.charCodeAt(1)), N = b(p.charCodeAt(2)), y = b(p.charCodeAt(3)), A = b(p.charCodeAt(4));
						return new e(new g(16 * _ + _, 16 * N + N, 16 * y + y, (16 * A + A) / 255));
					}
					return null;
				}
				n.parseHex = d;
				function b(p) {
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
	})(It || (It = {}));
	function ws(e) {
		const t = [];
		for (const n of e) {
			const r = Number(n);
			(r || r === 0 && n.replace(/\s/g, "") !== "") && t.push(r);
		}
		return t;
	}
	function In(e, t, n, r) {
		return {
			red: e / 255,
			blue: n / 255,
			green: t / 255,
			alpha: r
		};
	}
	function ot(e, t) {
		const n = t.index, r = t[0].length;
		if (n === void 0) return;
		const s = e.positionAt(n);
		return {
			startLineNumber: s.lineNumber,
			startColumn: s.column,
			endLineNumber: s.lineNumber,
			endColumn: s.column + r
		};
	}
	function Do(e, t) {
		if (!e) return;
		const n = It.Format.CSS.parseHex(t);
		if (n) return {
			range: e,
			color: In(n.rgba.r, n.rgba.g, n.rgba.b, n.rgba.a)
		};
	}
	function vs(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = ws(t[0].values());
		return {
			range: e,
			color: In(r[0], r[1], r[2], n ? r[3] : 1)
		};
	}
	function ys(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = ws(t[0].values()), s = new It(new Pe(r[0], r[1] / 100, r[2] / 100, n ? r[3] : 1));
		return {
			range: e,
			color: In(s.rgba.r, s.rgba.g, s.rgba.b, s.rgba.a)
		};
	}
	function lt(e, t) {
		return typeof e == "string" ? [...e.matchAll(t)] : e.findMatches(t);
	}
	function Fo(e) {
		const t = [], n = lt(e, /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%\/]*\))|^(#)([A-Fa-f0-9]{3})\b|^(#)([A-Fa-f0-9]{4})\b|^(#)([A-Fa-f0-9]{6})\b|^(#)([A-Fa-f0-9]{8})\b|(?<=['"\s])(#)([A-Fa-f0-9]{3})\b|(?<=['"\s])(#)([A-Fa-f0-9]{4})\b|(?<=['"\s])(#)([A-Fa-f0-9]{6})\b|(?<=['"\s])(#)([A-Fa-f0-9]{8})\b/gm);
		if (n.length > 0) for (const r of n) {
			const s = r.filter((u) => u !== void 0), a = s[1], o = s[2];
			if (!o) continue;
			let l;
			a === "rgb" ? l = vs(ot(e, r), lt(o, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*[\s,]\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*[\s,]\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm), !1) : a === "rgba" ? l = vs(ot(e, r), lt(o, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*[\s,]\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*[\s,]\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*(?:[\s,]|[\s]*\/)\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm), !0) : a === "hsl" ? l = ys(ot(e, r), lt(o, /^\(\s*((?:360(?:\.0+)?|(?:36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])(?:\.\d+)?))\s*[\s,]\s*(100(?:\.0+)?|\d{1,2}[.]\d*|\d{1,2})%\s*[\s,]\s*(100(?:\.0+)?|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm), !1) : a === "hsla" ? l = ys(ot(e, r), lt(o, /^\(\s*((?:360(?:\.0+)?|(?:36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])(?:\.\d+)?))\s*[\s,]\s*(100(?:\.0+)?|\d{1,2}[.]\d*|\d{1,2})%\s*[\s,]\s*(100(?:\.0+)?|\d{1,2}[.]\d*|\d{1,2})%\s*(?:[\s,]|[\s]*\/)\s*(0[.][0-9]+|[.][0-9]+|[01][.]0*|[01])\s*\)$/gm), !0) : a === "#" && (l = Do(ot(e, r), a + o)), l && t.push(l);
		}
		return t;
	}
	function Io(e) {
		return !e || typeof e.getValue != "function" || typeof e.positionAt != "function" ? [] : Fo(e);
	}
	const Bo = /^-+|-+$/g, Vo = 100;
	function qo(e, t) {
		let n = [];
		if (t.findRegionSectionHeaders && t.foldingRules?.markers) {
			const r = Uo(e, t);
			n = n.concat(r);
		}
		if (t.findMarkSectionHeaders) {
			const r = $o(e, t);
			n = n.concat(r);
		}
		return n;
	}
	function Uo(e, t) {
		const n = [], r = e.getLineCount();
		for (let s = 1; s <= r; s++) {
			const a = e.getLineContent(s), o = a.match(t.foldingRules.markers.start);
			if (o) {
				const l = {
					startLineNumber: s,
					startColumn: o[0].length + 1,
					endLineNumber: s,
					endColumn: a.length + 1
				};
				if (l.endColumn > l.startColumn) {
					const u = {
						range: l,
						...Wo(a.substring(o[0].length)),
						shouldBeInComments: !1
					};
					(u.text || u.hasSeparatorLine) && n.push(u);
				}
			}
		}
		return n;
	}
	function $o(e, t) {
		const n = [], r = e.getLineCount();
		if (!t.markSectionHeaderRegex || t.markSectionHeaderRegex.trim() === "") return n;
		const s = Ea(t.markSectionHeaderRegex), a = new RegExp(t.markSectionHeaderRegex, `gdm${s ? "s" : ""}`);
		if (vi(a)) return n;
		for (let o = 1; o <= r; o += 95) {
			const l = Math.min(o + Vo - 1, r), u = [];
			for (let m = o; m <= l; m++) u.push(e.getLineContent(m));
			const c = u.join(`
`);
			a.lastIndex = 0;
			let h;
			for (; (h = a.exec(c)) !== null;) {
				const m = c.substring(0, h.index), f = (m.match(/\n/g) || []).length, d = o + f, b = h[0].split(`
`), p = b.length, v = d + p - 1, _ = m.lastIndexOf(`
`) + 1, N = h.index - _ + 1, y = b[b.length - 1], A = {
					range: {
						startLineNumber: d,
						startColumn: N,
						endLineNumber: v,
						endColumn: p === 1 ? N + h[0].length : y.length + 1
					},
					text: (h.groups ?? {}).label ?? "",
					hasSeparatorLine: ((h.groups ?? {}).separator ?? "") !== "",
					shouldBeInComments: !0
				};
				(A.text || A.hasSeparatorLine) && (n.length === 0 || n[n.length - 1].range.endLineNumber < A.range.startLineNumber) && n.push(A), a.lastIndex = h.index + h[0].length;
			}
		}
		return n;
	}
	function Wo(e) {
		e = e.trim();
		const t = e.startsWith("-");
		return e = e.replace(Bo, ""), {
			text: e,
			hasSeparatorLine: t
		};
	}
	(function() {
		const e = globalThis;
		typeof e.requestIdleCallback != "function" || e.cancelIdleCallback;
	})();
	var _s = class {
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
			return this.error(new Qn());
		}
	}, Ls;
	(function(e) {
		async function t(r) {
			let s;
			const a = await Promise.all(r.map((o) => o.then((l) => l, (l) => {
				s || (s = l);
			})));
			if (typeof s < "u") throw s;
			return a;
		}
		e.settled = t;
		function n(r) {
			return new Promise(async (s, a) => {
				try {
					await r(s, a);
				} catch (o) {
					a(o);
				}
			});
		}
		e.withAsyncBody = n;
	})(Ls || (Ls = {}));
	var zo = class {
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
			if (this._finalValue) throw new Y("ProducerConsumer: cannot produce after final value has been set");
		}
		_resolveOrRejectDeferred(e, t) {
			t.ok ? e.complete(t.value) : e.error(t.error);
		}
		consume() {
			if (this._unconsumedValues.length > 0 || this._finalValue) {
				const e = this._unconsumedValues.length > 0 ? this._unconsumedValues.shift() : this._finalValue;
				return e.ok ? Promise.resolve(e.value) : Promise.reject(e.error);
			} else {
				const e = new _s();
				return this._unsatisfiedConsumers.push(e), e.p;
			}
		}
	};
	(class le {
		constructor(t, n) {
			this._onReturn = n, this._producerConsumer = new zo(), this._iterator = {
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
					emitOne: (s) => this._producerConsumer.produce({
						ok: !0,
						value: {
							done: !1,
							value: s
						}
					}),
					emitMany: (s) => {
						for (const a of s) this._producerConsumer.produce({
							ok: !0,
							value: {
								done: !1,
								value: a
							}
						});
					},
					reject: (s) => this._finishError(s)
				});
				if (!this._producerConsumer.hasFinalValue) try {
					await r, this._finishOk();
				} catch (s) {
					this._finishError(s);
				}
			});
		}
		static fromArray(t) {
			return new le((n) => {
				n.emitMany(t);
			});
		}
		static fromPromise(t) {
			return new le(async (n) => {
				n.emitMany(await t);
			});
		}
		static fromPromisesResolveOrder(t) {
			return new le(async (n) => {
				await Promise.all(t.map(async (r) => n.emitOne(await r)));
			});
		}
		static merge(t) {
			return new le(async (n) => {
				await Promise.all(t.map(async (r) => {
					for await (const s of r) n.emitOne(s);
				}));
			});
		}
		static {
			this.EMPTY = le.fromArray([]);
		}
		static map(t, n) {
			return new le(async (r) => {
				for await (const s of t) r.emitOne(n(s));
			});
		}
		static tee(t) {
			let n, r;
			const s = new _s(), a = async () => {
				if (!(!n || !r)) try {
					for await (const o of t) n.emitOne(o), r.emitOne(o);
				} catch (o) {
					n.reject(o), r.reject(o);
				} finally {
					s.complete();
				}
			};
			return [new le(async (o) => (n = o, a(), s.p)), new le(async (o) => (r = o, a(), s.p))];
		}
		map(t) {
			return le.map(this, t);
		}
		static coalesce(t) {
			return le.filter(t, (n) => !!n);
		}
		coalesce() {
			return le.coalesce(this);
		}
		static filter(t, n) {
			return new le(async (r) => {
				for await (const s of t) n(s) && r.emitOne(s);
			});
		}
		filter(t) {
			return le.filter(this, t);
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
	var Oo = class {
		constructor(e) {
			this.values = e, this.prefixSum = new Uint32Array(e.length), this.prefixSumValidIndex = /* @__PURE__ */ new Int32Array(1), this.prefixSumValidIndex[0] = -1;
		}
		insertValues(e, t) {
			e = Ve(e);
			const n = this.values, r = this.prefixSum, s = t.length;
			return s === 0 ? !1 : (this.values = new Uint32Array(n.length + s), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e), e + s), this.values.set(t, e), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSum = new Uint32Array(this.values.length), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		setValue(e, t) {
			return e = Ve(e), t = Ve(t), this.values[e] === t ? !1 : (this.values[e] = t, e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), !0);
		}
		removeValues(e, t) {
			e = Ve(e), t = Ve(t);
			const n = this.values, r = this.prefixSum;
			if (e >= n.length) return !1;
			const s = n.length - e;
			return t >= s && (t = s), t === 0 ? !1 : (this.values = new Uint32Array(n.length - t), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e + t), e), this.prefixSum = new Uint32Array(this.values.length), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		getTotalSum() {
			return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
		}
		getPrefixSum(e) {
			return e < 0 ? 0 : (e = Ve(e), this._getPrefixSum(e));
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
			let t = 0, n = this.values.length - 1, r = 0, s = 0, a = 0;
			for (; t <= n;) if (r = t + (n - t) / 2 | 0, s = this.prefixSum[r], a = s - this.values[r], e < a) n = r - 1;
			else if (e >= s) t = r + 1;
			else break;
			return new jo(r, e - a);
		}
	}, jo = class {
		constructor(e, t) {
			this.index = e, this.remainder = t, this._prefixSumIndexOfResultBrand = void 0, this.index = e, this.remainder = t;
		}
	}, Go = class {
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
			for (const n of t) this._acceptDeleteRange(n.range), this._acceptInsertText(new W(n.range.startLineNumber, n.range.startColumn), n.text);
			this._versionId = e.versionId, this._cachedTextValue = null;
		}
		_ensureLineStarts() {
			if (!this._lineStarts) {
				const e = this._eol.length, t = this._lines.length, n = new Uint32Array(t);
				for (let r = 0; r < t; r++) n[r] = this._lines[r].length + e;
				this._lineStarts = new Oo(n);
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
			const n = yi(t);
			if (n.length === 1) {
				this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0] + this._lines[e.lineNumber - 1].substring(e.column - 1));
				return;
			}
			n[n.length - 1] += this._lines[e.lineNumber - 1].substring(e.column - 1), this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0]);
			const r = new Uint32Array(n.length - 1);
			for (let s = 1; s < n.length; s++) this._lines.splice(e.lineNumber + s - 1, 0, n[s]), r[s - 1] = n[s].length + this._eol.length;
			this._lineStarts && this._lineStarts.insertValues(e.lineNumber, r);
		}
	}, Xo = class {
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
			this._models[e.url] = new Qo(_e.parse(e.url), e.lines, e.EOL, e.versionId);
		}
		$acceptModelChanged(e, t) {
			this._models[e] && this._models[e].onEvents(t);
		}
		$acceptRemovedModel(e) {
			this._models[e] && delete this._models[e];
		}
	}, Qo = class extends Go {
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
				const r = this._lines[n], s = this.offsetAt(new W(n + 1, 1)), a = r.matchAll(e);
				for (const o of a) (o.index || o.index === 0) && (o.index = o.index + s), t.push(o);
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
			const n = Ln(e.column, Hr(t), this._lines[e.lineNumber - 1], 0);
			return n ? new I(e.lineNumber, n.startColumn, e.lineNumber, n.endColumn) : null;
		}
		words(e) {
			const t = this._lines, n = this._wordenize.bind(this);
			let r = 0, s = "", a = 0, o = [];
			return { *[Symbol.iterator]() {
				for (;;) if (a < o.length) {
					const l = s.substring(o[a].start, o[a].end);
					a += 1, yield l;
				} else if (r < t.length) s = t[r], o = n(s, e), a = 0, r += 1;
				else break;
			} };
		}
		getLineWords(e, t) {
			const n = this._lines[e - 1], r = this._wordenize(n, t), s = [];
			for (const a of r) s.push({
				word: n.substring(a.start, a.end),
				startColumn: a.start + 1,
				endColumn: a.end + 1
			});
			return s;
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
			const t = this._eol, n = e.startLineNumber - 1, r = e.endLineNumber - 1, s = [];
			s.push(this._lines[n].substring(e.startColumn - 1));
			for (let a = n + 1; a < r; a++) s.push(this._lines[a]);
			return s.push(this._lines[r].substring(0, e.endColumn - 1)), s.join(t);
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
			if (!W.isIPosition(e)) throw new Error("bad position");
			let { lineNumber: t, column: n } = e, r = !1;
			if (t < 1) t = 1, n = 1, r = !0;
			else if (t > this._lines.length) t = this._lines.length, n = this._lines[t - 1].length + 1, r = !0;
			else {
				const s = this._lines[t - 1].length + 1;
				n < 1 ? (n = 1, r = !0) : n > s && (n = s, r = !0);
			}
			return r ? {
				lineNumber: t,
				column: n
			} : e;
		}
	}, Yo = class Ht {
		constructor(t = null) {
			this._foreignModule = t, this._requestHandlerBrand = void 0, this._workerTextModelSyncServer = new Xo();
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
			const s = this._getModel(t);
			return s ? Ba.computeUnicodeHighlights(s, n, r) : {
				ranges: [],
				hasMore: !1,
				ambiguousCharacterCount: 0,
				invisibleCharacterCount: 0,
				nonBasicAsciiCharacterCount: 0
			};
		}
		async $findSectionHeaders(t, n) {
			const r = this._getModel(t);
			return r ? qo(r, n) : [];
		}
		async $computeDiff(t, n, r, s) {
			const a = this._getModel(t), o = this._getModel(n);
			if (!a || !o) return null;
			const l = await Jo(s);
			return Ht.computeDiff(a, o, r, l);
		}
		static computeDiff(t, n, r, s) {
			const a = t.getLinesContent(), o = n.getLinesContent(), l = s.computeDiff(a, o, r), u = l.changes.length > 0 ? !1 : this._modelsAreIdentical(t, n);
			function c(h) {
				return h.map((m) => [
					m.original.startLineNumber,
					m.original.endLineNumberExclusive,
					m.modified.startLineNumber,
					m.modified.endLineNumberExclusive,
					m.innerChanges?.map((f) => [
						f.originalRange.startLineNumber,
						f.originalRange.startColumn,
						f.originalRange.endLineNumber,
						f.originalRange.endColumn,
						f.modifiedRange.startLineNumber,
						f.modifiedRange.startColumn,
						f.modifiedRange.endLineNumber,
						f.modifiedRange.endColumn
					])
				]);
			}
			return {
				identical: u,
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
			for (let s = 1; s <= r; s++) if (t.getLineContent(s) !== n.getLineContent(s)) return !1;
			return !0;
		}
		static {
			this._diffLimit = 1e5;
		}
		async $computeMoreMinimalEdits(t, n, r) {
			const s = this._getModel(t);
			if (!s) return n;
			const a = [];
			let o;
			n = n.slice(0).sort((u, c) => u.range && c.range ? I.compareRangesUsingStarts(u.range, c.range) : (u.range ? 0 : 1) - (c.range ? 0 : 1));
			let l = 0;
			for (let u = 1; u < n.length; u++) I.getEndPosition(n[l].range).equals(I.getStartPosition(n[u].range)) ? (n[l].range = I.fromPositions(I.getStartPosition(n[l].range), I.getEndPosition(n[u].range)), n[l].text += n[u].text) : (l++, n[l] = n[u]);
			n.length = l + 1;
			for (let { range: u, text: c, eol: h } of n) {
				if (typeof h == "number" && (o = h), I.isEmpty(u) && !c) continue;
				const m = s.getValueInRange(u);
				if (c = c.replace(/\r\n|\n|\r/g, s.eol), m === c) continue;
				if (Math.max(c.length, m.length) > Ht._diffLimit) {
					a.push({
						range: u,
						text: c
					});
					continue;
				}
				const f = Vi(m, c, r), d = s.offsetAt(I.lift(u).getStartPosition());
				for (const b of f) {
					const p = s.positionAt(d + b.originalStart), v = s.positionAt(d + b.originalStart + b.originalLength), _ = {
						text: c.substr(b.modifiedStart, b.modifiedLength),
						range: {
							startLineNumber: p.lineNumber,
							startColumn: p.column,
							endLineNumber: v.lineNumber,
							endColumn: v.column
						}
					};
					s.getValueInRange(_.range) !== _.text && a.push(_);
				}
			}
			return typeof o == "number" && a.push({
				eol: o,
				text: "",
				range: {
					startLineNumber: 0,
					startColumn: 0,
					endLineNumber: 0,
					endColumn: 0
				}
			}), a;
		}
		async $computeLinks(t) {
			const n = this._getModel(t);
			return n ? Oi(n) : null;
		}
		async $computeDefaultDocumentColors(t) {
			const n = this._getModel(t);
			return n ? Io(n) : null;
		}
		static {
			this._suggestionsLimit = 1e4;
		}
		async $textualSuggest(t, n, r, s) {
			const a = new t1(), o = new RegExp(r, s), l = /* @__PURE__ */ new Set();
			e: for (const u of t) {
				const c = this._getModel(u);
				if (c) {
					for (const h of c.words(o)) if (!(h === n || !isNaN(Number(h))) && (l.add(h), l.size > Ht._suggestionsLimit)) break e;
				}
			}
			return {
				words: Array.from(l),
				duration: a.elapsed()
			};
		}
		async $computeWordRanges(t, n, r, s) {
			const a = this._getModel(t);
			if (!a) return Object.create(null);
			const o = new RegExp(r, s), l = Object.create(null);
			for (let u = n.startLineNumber; u < n.endLineNumber; u++) {
				const c = a.getLineWords(u, o);
				for (const h of c) {
					if (!isNaN(Number(h.word))) continue;
					let m = l[h.word];
					m || (m = [], l[h.word] = m), m.push({
						startLineNumber: u,
						startColumn: h.startColumn,
						endLineNumber: u,
						endColumn: h.endColumn
					});
				}
			}
			return l;
		}
		async $navigateValueSet(t, n, r, s, a) {
			const o = this._getModel(t);
			if (!o) return null;
			const l = new RegExp(s, a);
			n.startColumn === n.endColumn && (n = {
				startLineNumber: n.startLineNumber,
				startColumn: n.startColumn,
				endLineNumber: n.endLineNumber,
				endColumn: n.endColumn + 1
			});
			const u = o.getValueInRange(n), c = o.getWordAtPosition({
				lineNumber: n.startLineNumber,
				column: n.startColumn
			}, l);
			if (!c) return null;
			const h = o.getValueInRange(c);
			return ji.INSTANCE.navigateValueSet(n, u, c, h, r);
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
	typeof importScripts == "function" && (globalThis.monaco = La());
	function Jo(e) {
		switch (e) {
			case "legacy": return Dt.getLegacy();
			case "advanced": return Dt.getDefault();
			case "advanced-external": return Dt.getAdvancedExternal();
			case "advanced-wasm": return Dt.getAdvancedWasm();
		}
	}
	var Zo = class jn {
		static {
			this.CHANNEL_NAME = "editorWorkerHost";
		}
		static getChannel(t) {
			return t.getChannel(jn.CHANNEL_NAME);
		}
		static setChannel(t, n) {
			t.setChannel(jn.CHANNEL_NAME, n);
		}
	};
	function Ko(e) {
		let t;
		const n = Di((r) => {
			const s = Zo.getChannel(r);
			return t = e({
				host: new Proxy({}, { get(a, o, l) {
					if (o !== "then") {
						if (typeof o != "string") throw new Error("Not supported");
						return (...u) => s.$fhr(o, u);
					}
				} }),
				getMirrorModels: () => n.requestHandler.getModels()
			}), new Yo(t);
		});
		return t;
	}
	let el = !1;
	function tl() {
		return el;
	}
	self.onmessage = () => {
		tl() || Ko(() => ({}));
	};
})();

//# sourceMappingURL=editor.worker-BYfbSb3U.js.map