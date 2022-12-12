var inputText = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

function debounce(cb, wait) {
  var timer;
  var debouncedFunc = (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, wait);
  };
  return debouncedFunc;
}
//if within waiting period, set shouldWait to true ,and we don't call function
//if after waiting period, we need to call function and set the shouldWait to false
function throttleStep1(cb, wait) {
  let shouldWait = false;
  var throttleFunc = (...args) => {
    if (shouldWait) return;
    //immediately call cb function
    cb.apply(this, args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, wait);
  };
  return throttleFunc;
}
//lastArg used to save previous call's parameter
function throttle(cb, wait) {
  let shouldWait = false;
  var lastArgs;
  const timeoutFunc = () => {
    //if lastArg is null, we did same as last step,
    //else: call cb with lastArgs and reset lastArg to null, restart wait period(shouldwait = false) for the next one
    if (lastArgs == null) {
      shouldWait = false;
    } else {
      cb.apply(this, lastArgs);
      lastArgs = null;
      setTimeout(timeoutFunc, wait);
    }
  };
  var throttleFunc = (...args) => {
    if (shouldWait) {
      lastArgs = args;
      return;
    }
    cb.apply(this, args);
    shouldWait = true;
    setTimeout(timeoutFunc, wait);
  };
  return throttleFunc;
}

const updateDebounceText = debounce((newText) => {
  debounceText.textContent = newText;
}, 1000);

const updateThrottleText = throttle((newText) => {
  throttleText.textContent = newText;
}, 1000);

inputText.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
});
