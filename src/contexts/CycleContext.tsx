import { createContext, ReactNode, useState } from 'react'
import { newCycleFormData } from '../pages/Home'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondPassed: number
  setSecondPassed: (amount: number) => void
  markCurrentCycleAsFinished: () => void
  handleInterruptCycle: () => void
  handleCreateNewCycle: (data: newCycleFormData) => void
  isSubmitTask: boolean | undefined
}

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: { children: ReactNode }) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  function handleCreateNewCycle(data: newCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    setAmountSecondPassed(0)

    // if (reset) {
    //   reset()
    // }
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function setSecondPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondPassed,
        handleInterruptCycle,
        handleCreateNewCycle,
        markCurrentCycleAsFinished,
        setSecondPassed,
        isSubmitTask,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
