import { HandPalm, Play } from 'phosphor-react'
import {
  CountDownContainer,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CountDownProps {
  minutes: string
  seconds: string
  activeCycle: Cycle | undefined
  handleInterruptCycle: () => void
  isSubmitTask: boolean
}

export function CountDown({
  minutes,
  seconds,
  activeCycle,
  handleInterruptCycle,
  isSubmitTask,
}: CountDownProps) {
  return (
    <>
      <CountDownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountDownContainer>
      {activeCycle ? (
        <StopCountDownButton type="button" onClick={handleInterruptCycle}>
          <HandPalm size={24} />
          Interromper
        </StopCountDownButton>
      ) : (
        <StartCountDownButton type="submit" disabled={isSubmitTask}>
          <Play size={24} />
          Começar
        </StartCountDownButton>
      )}
    </>
  )
}
