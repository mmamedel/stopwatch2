// js/components/app/index.js
import {pipe} from "https://cdn.skypack.dev/ramda@^0.27.1";

// js/components/app/app-presenter.js
import {useCallback, useEffect, useMemo} from "https://cdn.skypack.dev/react@^17.0.1";
import {not, inc} from "https://cdn.skypack.dev/ramda@^0.27.1";
import {useRecoilState} from "https://cdn.skypack.dev/recoil@^0.1.3";

// js/models/index.js
import {atom} from "https://cdn.skypack.dev/recoil@^0.1.3";
var TimeState = atom({
  key: "TimeState",
  default: 0
});
var IsPausedState = atom({
  key: "IsPausedState",
  default: true
});

// js/helpers/time.js
var padNumber = (n) => n < 10 ? `0${n}` : `${n}`;
var secInMin = 60;
var minInHour = secInMin;
var centInSec = 100;
var centInMin = secInMin * centInSec;
var centInHour = minInHour * centInMin;
var hourInCent = (cent) => Math.floor(cent / centInHour);
var timeToTimecode = (cent) => {
  const h = hourInCent(cent);
  const m = Math.floor(cent / centInMin) - h * 60;
  const s = Math.floor(cent / centInSec) - h * 3600 - m * 60;
  const c = cent - s * centInSec - m * centInMin - h * centInHour;
  return `${padNumber(h)}:${padNumber(m)}:${padNumber(s)}:${padNumber(c)}`;
};

// js/components/app/app-presenter.js
function AppPresenter() {
  const [time, setTime] = useRecoilState(TimeState);
  const [isPaused, setIsPaused] = useRecoilState(IsPausedState);
  const togglePaused = useCallback(() => setIsPaused(not), [setIsPaused]);
  const reset = useCallback(() => setTime(0), [setTime]);
  const timeLabel = useMemo(() => timeToTimecode(time), [time]);
  useEffect(() => {
    const interval = !isPaused ? setInterval(() => setTime(inc), 10) : void 0;
    return () => interval && clearInterval(interval);
  }, [isPaused, setTime]);
  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.code === "Space")
        togglePaused();
      if (e.code === "Backspace" && isPaused)
        reset();
    };
  }, [togglePaused, reset, isPaused]);
  return {
    timeLabel,
    isPaused,
    togglePaused,
    reset
  };
}

// js/components/app/app-view.js
import {css, jsx} from "https://cdn.skypack.dev/@emotion/react@^11.1.5";
var containerCss = css`
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
`;
var timeCodeCss = css`
  font-size: 16vw;
  font-weight: bold;
`;
var buttonSize = 20;
var buttonCss = css`
  width: ${buttonSize}vw;
  height: ${buttonSize}vw;
  border-radius: ${buttonSize / 2}vw;
  font-size: ${buttonSize / 5}vw;
`;
var playCss = css`
  background: green;
`;
var AppView = (props) => /* @__PURE__ */ jsx("div", {
  css: containerCss
}, /* @__PURE__ */ jsx("div", {
  css: timeCodeCss
}, props.timeLabel), /* @__PURE__ */ jsx("button", {
  css: buttonCss,
  onClick: props.reset,
  disabled: !props.isPaused
}, "Reset"), /* @__PURE__ */ jsx("button", {
  css: [buttonCss, playCss],
  onClick: props.togglePaused
}, props.isPaused ? "Start" : "Pause"));

// js/components/app/index.js
var App = pipe(AppPresenter, AppView);

// js/index.js
import React from "https://cdn.skypack.dev/react@^17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@^17.0.1";
import {RecoilRoot} from "https://cdn.skypack.dev/recoil@^0.1.3";
ReactDOM.render(/* @__PURE__ */ React.createElement(RecoilRoot, null, /* @__PURE__ */ React.createElement(App, null)), document.getElementById("root"));
