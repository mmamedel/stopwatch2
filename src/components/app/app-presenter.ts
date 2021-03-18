import { useCallback, useEffect, useMemo } from 'react'
import { AppViewProps } from './app-view'
import { not, inc } from 'ramda'
import { useRecoilState } from 'recoil'
import { TimeState, IsPausedState } from '@/models'
import { timeToTimecode } from '@/helpers/time'

export function AppPresenter(): AppViewProps {
  const [time, setTime] = useRecoilState(TimeState)
  const [isPaused, setIsPaused] = useRecoilState(IsPausedState)

  const togglePaused = useCallback(() => setIsPaused(not), [setIsPaused])
  const reset = useCallback(() => setTime(0), [setTime])
  const timeLabel = useMemo(() => timeToTimecode(time), [time])

  //#region Internal clock
  useEffect(() => {
    const interval = !isPaused ? setInterval(() => setTime(inc), 10) : undefined
    return () => interval && clearInterval(interval)
  }, [isPaused, setTime])
  //#endregion

  //#region Shortcuts
  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.code === 'Space') togglePaused()
      if (e.code === 'Backspace' && isPaused) reset()
    }
  }, [togglePaused, reset, isPaused])
  //#endregion

  return {
    timeLabel,
    isPaused,
    togglePaused,
    reset
  }
}
