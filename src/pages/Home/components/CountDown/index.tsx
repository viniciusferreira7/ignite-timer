import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { CycleContext } from '../..'
import {
  CountDownContainer,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
interface CountDownProps {
  minutes: string
  seconds: string
  activeCycle: Cycle | undefined
  handleInterruptCycle: () => void
  isSubmitTask: boolean
}

export function CountDown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CycleContext)

  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: NodeJS.Timer

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDiference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setAmountSecondPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondPassed(secondsDiference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycleId) {
      document.title = `Ignite Timer ${minutes}:${seconds}`
    }
  }, [activeCycleId, seconds, minutes])

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
