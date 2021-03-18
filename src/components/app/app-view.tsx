/** @jsx jsx */
import { css, jsx } from '@emotion/react'

//#region Styles
const containerCss = css`
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
`
const timeCodeCss = css`
  font-size: 16vw;
  font-weight: bold;
`
const buttonSize = 20
const buttonCss = css`
  width: ${buttonSize}vw;
  height: ${buttonSize}vw;
  border-radius: ${buttonSize / 2}vw;
  font-size: ${buttonSize / 5}vw;
`
const playCss = css`
  background: green;
`
//#endregion
export interface AppViewProps {
  timeLabel: string
  isPaused: boolean
  togglePaused: () => void
  reset: () => void
}

export const AppView = (props: AppViewProps) => (
  <div css={containerCss}>
    <div css={timeCodeCss}>{props.timeLabel}</div>
    <button css={buttonCss} onClick={props.reset} disabled={!props.isPaused}>
      Reset
    </button>
    <button css={[buttonCss, playCss]} onClick={props.togglePaused}>
      {props.isPaused ? 'Start' : 'Pause'}
    </button>
  </div>
)
