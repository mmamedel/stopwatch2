import { atom } from "recoil"

export const TimeState = atom({
  key: 'TimeState',
  default: 0
})

export const IsPausedState = atom({
  key: 'IsPausedState',
  default: true
})