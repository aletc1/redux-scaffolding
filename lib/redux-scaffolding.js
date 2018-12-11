module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function getProperty(object, propertyName) {
    var parts = propertyName.split("."), length = parts.length, i, property = object || {};
    for (i = 0; i < length; i++) {
        if (!property)
            return undefined;
        property = property[parts[i]];
    }
    return property;
}
exports.getProperty = getProperty;
function mergeBranch(state, branch, partialState) {
    var parts = branch.split(".");
    var obj = state;
    for (var idx = 0; idx < parts.length - 1; idx++) {
        var o = obj[parts[idx]];
        if (o) {
            obj = o;
        }
        else {
            obj = obj[parts[idx]] = {};
        }
    }
    return obj[parts[idx]] = Object.assign(obj[parts[idx]] || {}, partialState);
}
exports.mergeBranch = mergeBranch;
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[index], index, array)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.asyncForEach = asyncForEach;
exports.clone = function (object) {
    if (typeof object === 'object')
        return Object.assign({}, object);
    return object;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUJBQTRCLE1BQVcsRUFBRSxZQUFvQjtJQUN6RCxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUMvQixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFDckIsQ0FBQyxFQUNELFFBQVEsR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDO0lBRTVCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pCLElBQUksQ0FBQyxRQUFRO1lBQ1QsT0FBTyxTQUFTLENBQUM7UUFDckIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQztJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFiRCxrQ0FhQztBQUVELHFCQUE0QixLQUFVLEVBQUUsTUFBYyxFQUFFLFlBQWlCO0lBQ3JFLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0IsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ2hCLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEVBQUU7WUFDSCxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7YUFBTTtZQUNILEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO1NBQzdCO0tBQ0o7SUFDRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDaEYsQ0FBQztBQVpELGtDQVlDO0FBRUQsc0JBQW1DLEtBQVksRUFBRSxRQUFrRTs7Ozs7O29CQUN0RyxLQUFLLEdBQUcsQ0FBQzs7O3lCQUFFLENBQUEsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUE7b0JBQ3BDLHFCQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFBOztvQkFBMUMsU0FBMEMsQ0FBQTs7O29CQURKLEtBQUssRUFBRSxDQUFBOzs7Ozs7Q0FHcEQ7QUFKRCxvQ0FJQztBQUVZLFFBQUEsS0FBSyxHQUFHLFVBQUksTUFBVztJQUNoQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFDMUIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQU0sQ0FBQztJQUMxQyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUEifQ==

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var utils_2 = __webpack_require__(0);
var AsyncAction = /** @class */ (function () {
    function AsyncAction() {
    }
    return AsyncAction;
}());
exports.AsyncAction = AsyncAction;
var SagaControl = /** @class */ (function () {
    function SagaControl(repository) {
        this._repository = repository;
    }
    SagaControl.prototype.wait = function () {
        var actionNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionNames[_i] = arguments[_i];
        }
        return {
            actionNames: actionNames,
            args: undefined,
            type: 'wait'
        };
    };
    SagaControl.prototype.update = function (actionName, newState) {
        return {
            actionNames: [actionName],
            args: newState,
            type: 'update'
        };
    };
    SagaControl.prototype.dispatch = function (actionName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return {
            actionNames: [actionName],
            args: args,
            type: 'dispatch'
        };
    };
    return SagaControl;
}());
exports.SagaControl = SagaControl;
var ReduxRepository = /** @class */ (function () {
    function ReduxRepository(initialState) {
        this._state = initialState;
        this._store = null;
        this._dynamicReducers = [];
    }
    Object.defineProperty(ReduxRepository.prototype, "state", {
        get: function () { return this._state; },
        enumerable: true,
        configurable: true
    });
    ReduxRepository.prototype.dispatchAsync = function (actionName, promise) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            _this.dispatch(actionName + "_STARTED", args);
            promise
                .then(function (result) {
                _this.dispatch.apply(_this, [actionName + "_SUCCEEDED", result].concat(args));
                resolve(result);
            })
                .catch(function (error) {
                _this.dispatch.apply(_this, [actionName + "_FAILED", error].concat(args));
                reject(error);
            });
        });
    };
    ReduxRepository.prototype.dispatch = function (actionName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        if (!this._store)
            throw new Error("The repository '" + this.constructor.name + "' is not associated with any store");
        var storeInfo = Reflect.getMetadata('__STORE', this);
        (_a = this._store).dispatch.apply(_a, [storeInfo.namespace + "/" + actionName].concat(args));
    };
    ReduxRepository.prototype.addReducer = function (actionName, reducer, actionType) {
        var storeInfo = Reflect.getMetadata('__STORE', this);
        var reducerDef = new ReducerDefinition(actionName, storeInfo.attachTo, this, reducer, actionType);
        if (this._store)
            throw new Error("Cannot add new reducer because the repository is mounted on a store.");
        else
            this._dynamicReducers.push(reducerDef);
    };
    return ReduxRepository;
}());
exports.ReduxRepository = ReduxRepository;
var ReducerDefinition = /** @class */ (function () {
    function ReducerDefinition(actionName, branch, repository, reducer, actionType) {
        this.actionName = actionName;
        this.reducer = reducer;
        this.branch = branch;
        this.repository = repository;
        this.actionType = actionType;
    }
    return ReducerDefinition;
}());
exports.ReducerDefinition = ReducerDefinition;
var ReduxStoreBuilder = /** @class */ (function () {
    function ReduxStoreBuilder() {
        this._reducers = new Map();
        this._store = null;
        this._repositories = new Map();
        this._initialState = {};
        this._transientReducers = new Map();
    }
    Object.defineProperty(ReduxStoreBuilder.prototype, "state", {
        get: function () { return this._store.getState(); },
        enumerable: true,
        configurable: true
    });
    ReduxStoreBuilder.prototype.getRootReducer = function (rootReducer) {
        var _this = this;
        return function (state, action) {
            var reducerDefinition = _this._reducers.get(action.type);
            var transientReducers = _this._transientReducers.get(action.type);
            if (!reducerDefinition && !transientReducers && !rootReducer) {
                if (!rootReducer && (!action.type || (!action.type.startsWith("@@redux/") && !action.type.startsWith("@@INIT")))) {
                    console.log("WARNING: Reducer for '" + action.type + "' not found");
                }
                return rootReducer == null ? state : rootReducer(state, action);
            }
            if (reducerDefinition) {
                var partialState = reducerDefinition.reducer(action);
                reducerDefinition.repository._state = utils_1.mergeBranch(state, reducerDefinition.branch, partialState);
            }
            if (transientReducers) {
                transientReducers.forEach(function (transientReducer) {
                    state = transientReducer.reducer.apply(transientReducer, [state].concat((action.payload || [])));
                    transientReducer.repository._state = utils_1.getProperty(state, transientReducer.branch);
                });
                _this._transientReducers.delete(action.type);
            }
            return utils_2.clone(rootReducer == null ? state : rootReducer(state, action));
        };
    };
    ReduxStoreBuilder.prototype.getStore = function (state, rootReducer, createStore) {
        createStore = createStore || redux_1.createStore;
        return this._store = createStore(this.getRootReducer(rootReducer), state || this._initialState);
    };
    ReduxStoreBuilder.prototype.addReducer = function (actionName, branch, target, reducer, actionType) {
        this._reducers.set(actionName, new ReducerDefinition(actionName, branch, target, reducer, actionType));
    };
    ReduxStoreBuilder.prototype.dispatch = function (actionName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this._store)
            throw new Error("Redux store not initialized. Please call storeBuilder.getStore()");
        this._store.dispatch({
            type: actionName,
            payload: args
        });
    };
    ReduxStoreBuilder.prototype.enhanceReducer = function (partialActionName, namespace, repository, branch, reducerMethod, actionType) {
        var _this = this;
        var actionName = namespace + "/" + partialActionName;
        switch (actionType) {
            case 'AsyncAction': {
                var actionMethods = reducerMethod();
                if (actionMethods.onStart)
                    this.addReducer(actionName + "_STARTED", branch, repository, function (action) {
                        return actionMethods.onStart.apply(actionMethods, action.payload);
                    }, 'Simple');
                if (actionMethods.onSuccess)
                    this.addReducer(actionName + "_SUCCEEDED", branch, repository, function (action) {
                        return actionMethods.onSuccess.apply(actionMethods, [action.payload[0]].concat((action.payload ? action.payload.slice(1) : undefined)));
                    }, 'Simple');
                if (actionMethods.onError)
                    this.addReducer(actionName + "_FAILED", branch, repository, function (action) {
                        return actionMethods.onError.apply(actionMethods, [action.payload[0]].concat((action.payload ? action.payload.slice(1) : undefined)));
                    }, 'Simple');
                break;
            }
            case 'Saga':
                this.addReducer(actionName, branch, repository, function (action) { return __awaiter(_this, void 0, void 0, function () {
                    var iterator;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                iterator = reducerMethod.bind(repository).apply(void 0, [new SagaControl(repository)].concat(action.payload));
                                return [4 /*yield*/, this.processIterator(repository, actionName, branch, iterator)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }, 'Saga');
                break;
            default:
                {
                    this.addReducer(actionName, branch, repository, function (action) {
                        return reducerMethod.bind(repository).apply(void 0, action.payload);
                    }, 'Simple');
                    break;
                }
        }
    };
    ReduxStoreBuilder.prototype.addTransientReducer = function (actionName, reducer) {
        var reducers = this._transientReducers.get(actionName);
        if (reducers)
            reducers.push(reducer);
        else
            this._transientReducers.set(actionName, [reducer]);
    };
    ReduxStoreBuilder.prototype.processIterator = function (repository, actionName, branch, iterator, args) {
        return __awaiter(this, void 0, void 0, function () {
            var result, reduxStore;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = undefined;
                        _a.label = 1;
                    case 1: return [4 /*yield*/, iterator.next(args || repository.state)];
                    case 2:
                        result = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (result && !result.value && !result.done) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        reduxStore = repository._store;
                        if (result == undefined || result.done)
                            return [2 /*return*/, repository.state];
                        return [4 /*yield*/, utils_1.asyncForEach(result.value.actionNames, function (valueActionName) { return __awaiter(_this, void 0, void 0, function () {
                                var nextActionName, _a;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            nextActionName = valueActionName.startsWith("@@") ? valueActionName : actionName + "_" + valueActionName;
                                            _a = result.value.type;
                                            switch (_a) {
                                                case 'wait': return [3 /*break*/, 1];
                                                case 'update': return [3 /*break*/, 2];
                                                case 'dispatch': return [3 /*break*/, 3];
                                            }
                                            return [3 /*break*/, 5];
                                        case 1:
                                            this.addTransientReducer(nextActionName, {
                                                actionName: nextActionName,
                                                actionType: 'Simple',
                                                branch: branch,
                                                repository: repository,
                                                reducer: function (state, args) {
                                                    setTimeout(function () { return _this.processIterator(repository, actionName, branch, iterator, { type: nextActionName, payload: args }); });
                                                    return state;
                                                }
                                            });
                                            return [3 /*break*/, 5];
                                        case 2:
                                            this.addTransientReducer(nextActionName, {
                                                actionName: nextActionName,
                                                actionType: 'Simple',
                                                branch: branch,
                                                repository: repository,
                                                reducer: function (state, args) {
                                                    utils_1.mergeBranch(state, branch, args || {});
                                                    setTimeout(function () { return _this.processIterator(repository, actionName, branch, iterator); });
                                                    return state;
                                                }
                                            });
                                            reduxStore.dispatch.apply(reduxStore, [nextActionName].concat(result.value.args));
                                            return [3 /*break*/, 5];
                                        case 3:
                                            reduxStore.dispatch.apply(reduxStore, [nextActionName].concat(result.value.args));
                                            return [4 /*yield*/, this.processIterator(repository, actionName, branch, iterator)];
                                        case 4: return [2 /*return*/, _b.sent()];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, repository.state];
                }
            });
        });
    };
    ReduxStoreBuilder.prototype.addRepository = function (repository) {
        var _this = this;
        var storeInfo = Reflect.getMetadata('__STORE', repository);
        if (storeInfo == null || !storeInfo.namespace || storeInfo.attachTo == '')
            throw new Error("Attribute @repository is missing on repository '" + typeof repository + "'");
        this._repositories.set(repository.constructor.name, { repository: repository, attachTo: storeInfo.attachTo });
        var repo = repository;
        repo._store = this;
        if (repo._dynamicReducers) {
            repo._dynamicReducers.forEach(function (reducerDef) {
                _this.enhanceReducer(reducerDef.actionName, storeInfo.namespace, repository, reducerDef.branch, reducerDef.reducer, reducerDef.actionType);
            });
        }
        utils_1.mergeBranch(this._initialState, storeInfo.attachTo, repository._state);
        var branch = storeInfo.attachTo;
        Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).forEach(function (name) {
            var reducer = Reflect.getMetadata('__ACTION', repository, name);
            if (reducer && reducer.actionNames) {
                reducer.actionNames.forEach(function (partialActionName) {
                    var reducerMethod = repository[name].bind(repository);
                    _this.enhanceReducer(partialActionName, storeInfo.namespace, repository, branch, reducerMethod, reducer.actionType);
                });
            }
        });
    };
    return ReduxStoreBuilder;
}());
exports.ReduxStoreBuilder = ReduxStoreBuilder;
exports.storeBuilder = new ReduxStoreBuilder();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQWtGO0FBQ2xGLGlDQUFnRTtBQUNoRSxpQ0FBZ0M7QUFFaEM7SUFBQTtJQUlBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSnFCLGtDQUFXO0FBZ0JqQztJQUdJLHFCQUFtQixVQUFnQztRQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sMEJBQUksR0FBWDtRQUFZLHFCQUF3QjthQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7WUFBeEIsZ0NBQXdCOztRQUNoQyxPQUFPO1lBQ0gsV0FBVyxFQUFFLFdBQVc7WUFDeEIsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsTUFBTTtTQUNELENBQUM7SUFDcEIsQ0FBQztJQUNNLDRCQUFNLEdBQWIsVUFBYyxVQUFrQixFQUFFLFFBQWE7UUFDM0MsT0FBTztZQUNILFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUN6QixJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxRQUFRO1NBQ0gsQ0FBQztJQUNwQixDQUFDO0lBQ00sOEJBQVEsR0FBZixVQUFnQixVQUFrQjtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O1FBQzlDLE9BQU87WUFDSCxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDekIsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsVUFBVTtTQUNMLENBQUM7SUFDcEIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQztBQTVCWSxrQ0FBVztBQThCeEI7SUFPSSx5QkFBWSxZQUFvQjtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVks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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(1);
exports.AsyncAction = types_1.AsyncAction;
exports.ReduxRepository = types_1.ReduxRepository;
exports.SagaControl = types_1.SagaControl;
exports.storeBuilder = types_1.storeBuilder;
var attributes_1 = __webpack_require__(5);
exports.reduce = attributes_1.reduce;
exports.repository = attributes_1.repository;
exports.connect = attributes_1.connect;
exports.saga = attributes_1.saga;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUE2RjtBQUFwRiw4QkFBQSxXQUFXLENBQUE7QUFBRSxrQ0FBQSxlQUFlLENBQUE7QUFBRSw4QkFBQSxXQUFXLENBQUE7QUFBYywrQkFBQSxZQUFZLENBQUE7QUFDNUUsMkNBQWdFO0FBQXZELDhCQUFBLE1BQU0sQ0FBQTtBQUFFLGtDQUFBLFVBQVUsQ0FBQTtBQUFFLCtCQUFBLE9BQU8sQ0FBQTtBQUFFLDRCQUFBLElBQUksQ0FBQSJ9

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(1);
__webpack_require__(6);
var react_redux_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(0);
function repository(namespace, attachTo) {
    return function (constructor) {
        if (!namespace.startsWith("@@"))
            throw new Error("Namespace should start with @@");
        Reflect.defineMetadata("__STORE", { namespace: namespace, attachTo: attachTo }, constructor.prototype);
        return constructor;
    };
}
exports.repository = repository;
function reduce() {
    var actionNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actionNames[_i] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        actionNames.forEach(function (actionName) {
            if (actionName.startsWith("@"))
                throw new Error("Action name cannot contain namespace information inside a repository");
        });
        var type = Reflect.getMetadata("design:returntype", target, propertyKey);
        Reflect.defineMetadata("__ACTION", { actionNames: actionNames, actionType: type ? type.name : undefined }, target, propertyKey);
        return descriptor;
    };
}
exports.reduce = reduce;
function saga() {
    var actionNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actionNames[_i] = arguments[_i];
    }
    return function (target, propertyKey) {
        Reflect.defineMetadata("__ACTION", { actionNames: actionNames, actionType: 'Saga' }, target, propertyKey);
        return target;
    };
}
exports.saga = saga;
function connect() {
    var repositories = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        repositories[_i] = arguments[_i];
    }
    return function (constructor) {
        var props = {};
        repositories.forEach(function (repoInfo) {
            var repositoryName = repoInfo[1].name;
            Object.defineProperty(props, repoInfo[0], {
                get: function () {
                    var repoDefinition = types_1.storeBuilder._repositories.get(repositoryName);
                    if (!repoDefinition) {
                        throw new Error("Repository '" + repositoryName + "' not registered in the store. Use storeBuilder.addRepository(repo) to register the repository");
                    }
                    return repoDefinition.repository;
                },
                enumerable: true,
                configurable: true,
            });
        });
        return react_redux_1.connect(function (state) {
            var newState = {};
            repositories.forEach(function (repoInfo) {
                var repoDefinition = types_1.storeBuilder._repositories.get(repoInfo[1].name);
                if (!repoDefinition)
                    throw new Error("Repository '" + repoInfo[1].name + "' not registered in the store. Use storeBuilder.addRepository(repo) to register the repository");
                newState[repoInfo[0]] = { state: utils_1.getProperty(state, repoDefinition.attachTo) };
            });
            return newState || {};
        }, function () { return props; })(constructor);
    };
}
exports.connect = connect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBcUU7QUFDckUsNEJBQTBCO0FBQzFCLDJDQUFxRDtBQUNyRCxpQ0FBcUM7QUFFckMsb0JBQTJCLFNBQWlCLEVBQUUsUUFBZ0I7SUFDMUQsT0FBTyxVQUE2QixXQUFzQjtRQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZHLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFQRCxnQ0FPQztBQUVEO0lBQXVCLHFCQUF3QjtTQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7UUFBeEIsZ0NBQXdCOztJQUMzQyxPQUFPLFVBQTBELE1BQVcsRUFBRSxXQUE0QixFQUFFLFVBQTBEO1FBQ2xLLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO1lBQzFCLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7Z0JBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0VBQXNFLENBQUMsQ0FBQztRQUNoRyxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMs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

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ })
/******/ ]);
//# sourceMappingURL=redux-scaffolding.js.map