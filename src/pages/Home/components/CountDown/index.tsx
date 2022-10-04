import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { CycleContext } from '../../../../contexts/CycleContext'
import {
  CountDownContainer,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

interface CountDownProps {
  isSubmitTask: boolean | undefined
}

export function CountDown({ isSubmitTask }: CountDownProps) {
  const {
    activeCycle,
    activeCycleId,
    amountSecondPassed,
    setSecondPassed,
    markCurrentCycleAsFinished,
    interruptCurrentCycle,
  } = useContext(CycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: NodeJS.Timer

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDiference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondPassed(secondsDiference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondPassed,
  ])

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
        <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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
