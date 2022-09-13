import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/esm/locale'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CycleContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CycleContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>
                <span>Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {!cycle.interruptedDate && !cycle.finishedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluida</Status>
                    )}
                  </td>
                </tr>
              )
            })}{' '}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
