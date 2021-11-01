var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, pushScopeId, popScopeId, createElementVNode, warn, getCurrentScope, onScopeDispose, ref, unref, watch, onMounted, createBlock, Transition, withCtx, withDirectives, normalizeStyle, createCommentVNode, renderSlot, toDisplayString, Fragment, withModifiers, vShow, isVNode, createVNode, render as render$1, reactive, onBeforeUnmount, toRefs, resolveComponent } from "vue";
const mainColor = "#015a9e";
const menuText = "#bfcbd9";
const menuActiveText = "#409eff";
const subMenuActiveText = "#f4f4f5";
const menuBg = "#304156";
const menuHover = "#263445";
const subMenuBg = "#1f2d3d";
const subMenuHover = "#001528";
const sideBarWidth = "210px";
const navbarBackground = "#1f2834";
const navbarColor = "#FFF";
const textColor = "#333";
const textColorSecond = "#666";
const textColorThree = "#999";
const textActiveColor = "#409eff";
const lineColor = "#e1e1e1";
var variables = {
  mainColor,
  menuText,
  menuActiveText,
  subMenuActiveText,
  menuBg,
  menuHover,
  subMenuBg,
  subMenuHover,
  sideBarWidth,
  navbarBackground,
  navbarColor,
  textColor,
  textColorSecond,
  textColorThree,
  textActiveColor,
  lineColor
};
var index_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$2 = defineComponent({
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggle-click"],
  setup(_, context) {
    const fill = computed(() => {
      return variables.navbarColor;
    });
    const toggleClick = () => {
      context.emit("toggle-click");
    };
    return {
      toggleClick,
      fill
    };
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-4e6f274c"), n = n(), popScopeId(), n);
const _hoisted_1$3 = ["fill"];
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", { d: "M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" }, null, -1));
const _hoisted_3$1 = [
  _hoisted_2$2
];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    style: { "padding": "0 15px" },
    class: normalizeClass([{ "is-active": _ctx.isActive }]),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleClick && _ctx.toggleClick(...args))
  }, [
    (openBlock(), createElementBlock("svg", {
      class: "svg-icon1",
      "font-size": "10px",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
      width: "64",
      height: "64",
      fill: _ctx.fill
    }, _hoisted_3$1, 8, _hoisted_1$3))
  ], 2);
}
var index$3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-4e6f274c"]]);
var __glob_0_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": index$3
});
let $ELEMENT = {};
const getConfig = (key) => {
  return $ELEMENT[key];
};
function fromPairs(pairs) {
  var index2 = -1, length = pairs == null ? 0 : pairs.length, result = {};
  while (++index2 < length) {
    var pair = pairs[index2];
    result[pair[0]] = pair[1];
  }
  return result;
}
var fromPairs_1 = fromPairs;
var isServer = typeof window === "undefined";
Object.freeze({});
Object.freeze([]);
const isObject = (val) => val !== null && typeof val === "object";
const trimArr = function(s) {
  return (s || "").split(" ").filter((item) => !!item.trim());
};
const on = function(element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element === null || element === void 0 ? void 0 : element.addEventListener(event, handler, useCapture);
  }
};
function addClass(el, cls) {
  if (!el)
    return;
  let className = el.getAttribute("class") || "";
  const curClass = trimArr(className);
  const classes = (cls || "").split(" ").filter((item) => !curClass.includes(item) && !!item.trim());
  if (el.classList) {
    el.classList.add(...classes);
  } else {
    className += ` ${classes.join(" ")}`;
    el.setAttribute("class", className);
  }
}
function removeClass(el, cls) {
  if (!el || !cls)
    return;
  const classes = trimArr(cls);
  let curClass = el.getAttribute("class") || "";
  if (el.classList) {
    el.classList.remove(...classes);
    return;
  }
  classes.forEach((item) => {
    curClass = curClass.replace(` ${item} `, " ");
  });
  const className = trimArr(curClass).join(" ");
  el.setAttribute("class", className);
}
const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace"
};
const onTouchMove = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const onModalClick = () => {
  PopupManager === null || PopupManager === void 0 ? void 0 : PopupManager.doOnModalClick();
};
let hasModal = false;
let zIndex;
const getModal = function() {
  if (isServer)
    return;
  let modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement("div");
    PopupManager.modalDom = modalDom;
    on(modalDom, "touchmove", onTouchMove);
    on(modalDom, "click", onModalClick);
  }
  return modalDom;
};
const instances$1 = {};
const PopupManager = {
  modalFade: true,
  modalDom: void 0,
  zIndex,
  getInstance(id) {
    return instances$1[id];
  },
  register(id, instance) {
    if (id && instance) {
      instances$1[id] = instance;
    }
  },
  deregister(id) {
    if (id) {
      instances$1[id] = null;
      delete instances$1[id];
    }
  },
  nextZIndex() {
    return ++PopupManager.zIndex;
  },
  modalStack: [],
  doOnModalClick() {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem)
      return;
    const instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal.value) {
      instance.close();
    }
  },
  openModal(id, zIndex2, dom, modalClass, modalFade) {
    if (isServer)
      return;
    if (!id || zIndex2 === void 0)
      return;
    this.modalFade = modalFade;
    const modalStack = this.modalStack;
    for (let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }
    const modalDom = getModal();
    addClass(modalDom, "v-modal");
    if (this.modalFade && !hasModal) {
      addClass(modalDom, "v-modal-enter");
    }
    if (modalClass) {
      const classArr = modalClass.trim().split(/\s+/);
      classArr.forEach((item) => addClass(modalDom, item));
    }
    setTimeout(() => {
      removeClass(modalDom, "v-modal-enter");
    }, 200);
    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }
    if (zIndex2) {
      modalDom.style.zIndex = String(zIndex2);
    }
    modalDom.tabIndex = 0;
    modalDom.style.display = "";
    this.modalStack.push({ id, zIndex: zIndex2, modalClass });
  },
  closeModal(id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();
    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          const classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach((item) => removeClass(modalDom, item));
        }
        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }
    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, "v-modal-leave");
      }
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode)
            modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = "none";
          PopupManager.modalDom = void 0;
        }
        removeClass(modalDom, "v-modal-leave");
      }, 200);
    }
  }
};
Object.defineProperty(PopupManager, "zIndex", {
  configurable: true,
  get() {
    if (zIndex === void 0) {
      zIndex = getConfig("zIndex") || 2e3;
    }
    return zIndex;
  },
  set(value) {
    zIndex = value;
  }
});
const getTopPopup = function() {
  if (isServer)
    return;
  if (PopupManager.modalStack.length > 0) {
    const topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup)
      return;
    const instance = PopupManager.getInstance(topPopup.id);
    return instance;
  }
};
if (!isServer) {
  on(window, "keydown", function(event) {
    if (event.code === EVENT_CODE.esc) {
      const topPopup = getTopPopup();
      if (topPopup && topPopup.closeOnPressEscape.value) {
        topPopup.handleClose ? topPopup.handleClose() : topPopup.handleAction ? topPopup.handleAction("cancel") : topPopup.close();
      }
    }
  });
}
var PopupManager$1 = PopupManager;
const wrapperKey = Symbol();
const propKey = Symbol();
function buildProp(option, key) {
  if (!isObject(option) || !!option[propKey])
    return option;
  const { values, required, default: defaultValue, type, validator } = option;
  const _validator = values || validator ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = [...values, defaultValue];
      valid || (valid = allowedValues.includes(val));
    }
    if (validator)
      valid || (valid = validator(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
    }
    return valid;
  } : void 0;
  return {
    type: typeof type === "object" && Object.getOwnPropertySymbols(type).includes(wrapperKey) ? type[wrapperKey] : type,
    required: !!required,
    default: defaultValue,
    validator: _validator,
    [propKey]: true
  };
}
const buildProps = (props) => fromPairs_1(Object.entries(props).map(([key, option]) => [
  key,
  buildProp(option, key)
]));
const definePropType = (val) => ({ [wrapperKey]: val });
const withInstallFunction = (fn, name) => {
  fn.install = (app) => {
    app.config.globalProperties[name] = fn;
  };
  return fn;
};
const isClient = typeof window !== "undefined";
const isString = (val) => typeof val === "string";
const noop = () => {
};
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function useTimeoutFn(cb, interval, options = {}) {
  const { immediate = true } = options;
  const isPending = ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, unref(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop);
  return {
    isPending,
    start,
    stop
  };
}
const defaultWindow = isClient ? window : void 0;
isClient ? window.document : void 0;
isClient ? window.navigator : void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = watch(() => unref(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
const messageTypes = ["success", "info", "warning", "error"];
const messageProps = buildProps({
  customClass: {
    type: String,
    default: ""
  },
  center: {
    type: Boolean,
    default: false
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3e3
  },
  iconClass: {
    type: String,
    default: ""
  },
  id: {
    type: String,
    default: ""
  },
  message: {
    type: definePropType([String, Object]),
    default: ""
  },
  onClose: {
    type: definePropType(Function),
    required: false
  },
  showClose: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    values: messageTypes,
    default: "info"
  },
  offset: {
    type: Number,
    default: 20
  },
  zIndex: {
    type: Number,
    default: 0
  }
});
const messageEmits = {
  destroy: () => true
};
const typeMap = {
  success: "el-icon-success",
  info: "el-icon-info",
  warning: "el-icon-warning",
  error: "el-icon-error"
};
var script = defineComponent({
  name: "ElMessage",
  props: messageProps,
  emits: messageEmits,
  setup(props) {
    const visible = ref(false);
    let timer = void 0;
    const typeClass = computed(() => {
      var _a;
      return props.iconClass ? props.iconClass : (_a = typeMap[props.type]) != null ? _a : "";
    });
    const customStyle = computed(() => ({
      top: `${props.offset}px`,
      zIndex: props.zIndex
    }));
    function startTimer() {
      if (props.duration > 0) {
        ({ stop: timer } = useTimeoutFn(() => {
          if (visible.value)
            close2();
        }, props.duration));
      }
    }
    function clearTimer() {
      timer == null ? void 0 : timer();
    }
    function close2() {
      visible.value = false;
    }
    function keydown({ code }) {
      if (code === EVENT_CODE.esc) {
        if (visible.value) {
          close2();
        }
      } else {
        startTimer();
      }
    }
    onMounted(() => {
      startTimer();
      visible.value = true;
    });
    useEventListener(document, "keydown", keydown);
    return {
      typeClass,
      customStyle,
      visible,
      close: close2,
      clearTimer,
      startTimer
    };
  }
});
const _hoisted_1$2 = ["id"];
const _hoisted_2$1 = {
  key: 0,
  class: "el-message__content"
};
const _hoisted_3 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    name: "el-message-fade",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("destroy"))
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        id: _ctx.id,
        class: normalizeClass([
          "el-message",
          _ctx.type && !_ctx.iconClass ? `el-message--${_ctx.type}` : "",
          _ctx.center ? "is-center" : "",
          _ctx.showClose ? "is-closable" : "",
          _ctx.customClass
        ]),
        style: normalizeStyle(_ctx.customStyle),
        role: "alert",
        onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args)),
        onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.startTimer && _ctx.startTimer(...args))
      }, [
        _ctx.type || _ctx.iconClass ? (openBlock(), createElementBlock("i", {
          key: 0,
          class: normalizeClass(["el-message__icon", _ctx.typeClass, _ctx.iconClass])
        }, null, 2)) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default", {}, () => [
          !_ctx.dangerouslyUseHTMLString ? (openBlock(), createElementBlock("p", _hoisted_2$1, toDisplayString(_ctx.message), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
            createElementVNode("p", {
              class: "el-message__content",
              innerHTML: _ctx.message
            }, null, 8, _hoisted_3)
          ], 2112))
        ]),
        _ctx.showClose ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "el-message__closeBtn el-icon-close",
          onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.close && _ctx.close(...args), ["stop"]))
        })) : createCommentVNode("v-if", true)
      ], 46, _hoisted_1$2), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 3
  }, 8, ["onBeforeLeave"]);
}
script.render = render;
script.__file = "packages/components/message/src/message.vue";
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const instances = [];
let seed = 1;
const message = function(options = {}) {
  if (isServer)
    return { close: () => void 0 };
  if (typeof options === "string" || isVNode(options)) {
    options = { message: options };
  }
  let verticalOffset = options.offset || 20;
  instances.forEach(({ vm: vm2 }) => {
    var _a;
    verticalOffset += (((_a = vm2.el) == null ? void 0 : _a.offsetHeight) || 0) + 16;
  });
  verticalOffset += 16;
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const props = __spreadProps(__spreadValues2({
    zIndex: PopupManager$1.nextZIndex(),
    offset: verticalOffset
  }, options), {
    id,
    onClose: () => {
      close(id, userOnClose);
    }
  });
  const container = document.createElement("div");
  container.className = `container_${id}`;
  const message2 = props.message;
  const vm = createVNode(script, props, isVNode(props.message) ? { default: () => message2 } : null);
  vm.props.onDestroy = () => {
    render$1(null, container);
  };
  render$1(vm, container);
  instances.push({ vm });
  document.body.appendChild(container.firstElementChild);
  return {
    close: () => vm.component.proxy.visible = false
  };
};
messageTypes.forEach((type) => {
  message[type] = (options = {}) => {
    if (typeof options === "string" || isVNode(options)) {
      options = {
        message: options
      };
    }
    return message(__spreadProps(__spreadValues2({}, options), {
      type
    }));
  };
});
function close(id, userOnClose) {
  const idx = instances.findIndex(({ vm: vm2 }) => id === vm2.component.props.id);
  if (idx === -1)
    return;
  const { vm } = instances[idx];
  if (!vm)
    return;
  userOnClose == null ? void 0 : userOnClose(vm);
  const removedHeight = vm.el.offsetHeight;
  instances.splice(idx, 1);
  const len = instances.length;
  if (len < 1)
    return;
  for (let i = idx; i < len; i++) {
    const pos = parseInt(instances[i].vm.el.style["top"], 10) - removedHeight - 16;
    instances[i].vm.component.props.offset = pos;
  }
}
function closeAll() {
  var _a;
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component;
    (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.close();
  }
}
message.closeAll = closeAll;
const ElMessage = withInstallFunction(message, "$message");
var screenfull$1 = { exports: {} };
/*!
* screenfull
* v5.1.0 - 2020-12-24
* (c) Sindre Sorhus; MIT License
*/
(function(module) {
  (function() {
    var document2 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
    var isCommonjs = module.exports;
    var fn = function() {
      var val;
      var fnMap = [
        [
          "requestFullscreen",
          "exitFullscreen",
          "fullscreenElement",
          "fullscreenEnabled",
          "fullscreenchange",
          "fullscreenerror"
        ],
        [
          "webkitRequestFullscreen",
          "webkitExitFullscreen",
          "webkitFullscreenElement",
          "webkitFullscreenEnabled",
          "webkitfullscreenchange",
          "webkitfullscreenerror"
        ],
        [
          "webkitRequestFullScreen",
          "webkitCancelFullScreen",
          "webkitCurrentFullScreenElement",
          "webkitCancelFullScreen",
          "webkitfullscreenchange",
          "webkitfullscreenerror"
        ],
        [
          "mozRequestFullScreen",
          "mozCancelFullScreen",
          "mozFullScreenElement",
          "mozFullScreenEnabled",
          "mozfullscreenchange",
          "mozfullscreenerror"
        ],
        [
          "msRequestFullscreen",
          "msExitFullscreen",
          "msFullscreenElement",
          "msFullscreenEnabled",
          "MSFullscreenChange",
          "MSFullscreenError"
        ]
      ];
      var i = 0;
      var l = fnMap.length;
      var ret = {};
      for (; i < l; i++) {
        val = fnMap[i];
        if (val && val[1] in document2) {
          for (i = 0; i < val.length; i++) {
            ret[fnMap[0][i]] = val[i];
          }
          return ret;
        }
      }
      return false;
    }();
    var eventNameMap = {
      change: fn.fullscreenchange,
      error: fn.fullscreenerror
    };
    var screenfull2 = {
      request: function(element, options) {
        return new Promise(function(resolve, reject) {
          var onFullScreenEntered = function() {
            this.off("change", onFullScreenEntered);
            resolve();
          }.bind(this);
          this.on("change", onFullScreenEntered);
          element = element || document2.documentElement;
          var returnPromise = element[fn.requestFullscreen](options);
          if (returnPromise instanceof Promise) {
            returnPromise.then(onFullScreenEntered).catch(reject);
          }
        }.bind(this));
      },
      exit: function() {
        return new Promise(function(resolve, reject) {
          if (!this.isFullscreen) {
            resolve();
            return;
          }
          var onFullScreenExit = function() {
            this.off("change", onFullScreenExit);
            resolve();
          }.bind(this);
          this.on("change", onFullScreenExit);
          var returnPromise = document2[fn.exitFullscreen]();
          if (returnPromise instanceof Promise) {
            returnPromise.then(onFullScreenExit).catch(reject);
          }
        }.bind(this));
      },
      toggle: function(element, options) {
        return this.isFullscreen ? this.exit() : this.request(element, options);
      },
      onchange: function(callback) {
        this.on("change", callback);
      },
      onerror: function(callback) {
        this.on("error", callback);
      },
      on: function(event, callback) {
        var eventName = eventNameMap[event];
        if (eventName) {
          document2.addEventListener(eventName, callback, false);
        }
      },
      off: function(event, callback) {
        var eventName = eventNameMap[event];
        if (eventName) {
          document2.removeEventListener(eventName, callback, false);
        }
      },
      raw: fn
    };
    if (!fn) {
      if (isCommonjs) {
        module.exports = { isEnabled: false };
      } else {
        window.screenfull = { isEnabled: false };
      }
      return;
    }
    Object.defineProperties(screenfull2, {
      isFullscreen: {
        get: function() {
          return Boolean(document2[fn.fullscreenElement]);
        }
      },
      element: {
        enumerable: true,
        get: function() {
          return document2[fn.fullscreenElement];
        }
      },
      isEnabled: {
        enumerable: true,
        get: function() {
          return Boolean(document2[fn.fullscreenEnabled]);
        }
      }
    });
    if (isCommonjs) {
      module.exports = screenfull2;
    } else {
      window.screenfull = screenfull2;
    }
  })();
})(screenfull$1);
var screenfull = screenfull$1.exports;
const sf = screenfull;
const _sfc_main$1 = defineComponent({
  name: "Screenfull",
  setup() {
    const state = reactive({
      isFullscreen: false,
      click: () => {
        if (!sf.isEnabled) {
          ElMessage({
            message: "you browser can not work",
            type: "warning"
          });
          return false;
        }
        sf.toggle();
      }
    });
    const change = () => {
      if (sf.isEnabled) {
        state.isFullscreen = sf.isFullscreen;
      }
    };
    onMounted(() => {
      if (sf.isEnabled) {
        sf.on("change", change);
      }
    });
    onBeforeUnmount(() => {
      if (sf.isEnabled) {
        sf.off("change", change);
      }
    });
    return __spreadValues({}, toRefs(state));
  }
});
const _hoisted_1$1 = { id: "screenfull" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    _ctx.isFullscreen ? (openBlock(), createElementBlock("div", {
      key: 0,
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.click && _ctx.click(...args))
    }, [
      createVNode(_component_svg_icon, {
        name: "exit-fullscreen",
        "font-size": "17px"
      })
    ])) : (openBlock(), createElementBlock("div", {
      key: 1,
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.click && _ctx.click(...args))
    }, [
      createVNode(_component_svg_icon, {
        name: "fullscreen",
        "font-size": "17px"
      })
    ]))
  ]);
}
var index$2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var __glob_0_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": index$2
});
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon"
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: variables.navbarColor || "#333"
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  }
});
const _hoisted_1 = {
  "aria-hidden": "true",
  class: "svg-icon"
};
const _hoisted_2 = ["xlink:href", "fill"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1, [
    createElementVNode("use", {
      "xlink:href": _ctx.symbolId,
      fill: _ctx.color
    }, null, 8, _hoisted_2)
  ]);
}
var index$1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c8a70580"]]);
var __glob_0_2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": index$1
});
const files = { "./Hamburger/index.vue": __glob_0_0, "./Screenfull/index.vue": __glob_0_1, "./SvgIcon/index.vue": __glob_0_2 };
function index(app) {
  Object.keys(files).forEach((fileName) => {
    if (fileName.indexOf("demo") > -1) {
      return;
    }
    const module = files[fileName];
    const moduleName = fileName.replace(/^\.\/(.*)\/(.*)\.\w+$/, "$1");
    app.component(moduleName, module.default || module);
  });
}
export { index as default };
