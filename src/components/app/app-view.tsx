/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const fontCss = css`
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
`;

const buttonCss = css`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const playCss = css`
  background: green;
`;

export interface AppViewProps {
  timeLabel: string;
  isPaused: boolean;
  togglePaused: () => void;
  reset: () => void;
}

export const AppView = (props: AppViewProps) => (
  <div css={fontCss}>
    <h1>{props.timeLabel}</h1>
    <button css={buttonCss} onClick={props.reset} disabled={!props.isPaused}>
      Reset
    </button>
    <button css={[buttonCss, playCss]} onClick={props.togglePaused}>
      {props.isPaused ? "Start" : "Pause"}
    </button>
  </div>
);
