import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { HomeContainer } from './styles'

import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CycleContext'

const newCycleFormValidationScheme = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmount: zod.number().min(1).max(60),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationScheme>

export function Home() {
  const { createNewCycle } = useContext(CycleContext)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationScheme),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitTask = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown isSubmitTask={isSubmitTask} />
      </form>
    </HomeContainer>
  )
}
