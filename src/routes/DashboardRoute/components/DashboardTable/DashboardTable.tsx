import { FC, useEffect, useState } from 'react'
import { IDocuments } from '../../../../types/Types'
import { sortByField } from '../../utils/sortByField'
import StatusButton from '../StatusButton/StatusButton'
import './styles.scss'

type docsWithCheckedType = {
  "id": string,
  "name": string
}

interface DashboardTableProps {
  docs: Array<IDocuments>
  filtredItems: Array<IDocuments>
  docsWithChecked: Array<docsWithCheckedType>
  setDocsWithChecked: (arr: Array<docsWithCheckedType>) => void
}

const DashboardTable: FC<DashboardTableProps> = (
  { docs, filtredItems, docsWithChecked, setDocsWithChecked }
) => {
  const volumeSum = docs.reduce((sum, current) => sum + current.volume, 0)
  const qtySum = docs.reduce((sum, current) => sum + current.qty, 0)
  const [theadChecked, setTheadChecked] = useState(false)

  const checkedAll = () => {
    setTheadChecked(!theadChecked)
    !theadChecked
      ? setDocsWithChecked([...docs.map((item: IDocuments) => {
          return {
            "id": item.id,
            "name": item.name
          }
        })])
      : setDocsWithChecked([])
  }

  useEffect(() => {
    if (docsWithChecked.length === docs.length && docsWithChecked.length) return setTheadChecked(true)
    if (!docsWithChecked.length) return setTheadChecked(false)
  }, [docs.length, docsWithChecked])

  const checkedItem = (id: string, name: string) => {
    if (!docsWithChecked.find((item: any) => item.id === id)) {
      setDocsWithChecked([...docsWithChecked, {"id": id, "name": name},])
    } else {
      setDocsWithChecked([...docsWithChecked.filter((item: any) => item.id !== id)])
    }
  }
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => checkedAll()}>
            <input
              type="checkbox"
              checked={theadChecked}
              onChange={() => checkedAll()}
            />
          </th>
          <th>Name</th>
          <th>Delivery date</th>
          <th>status</th>
          <th>qty</th>       
          <th>sum</th>
          <th>volume</th> 
          <th>currency</th>
          <th>Всего</th>
        </tr>
      </thead>
      <tbody>
        {
          filtredItems.sort(sortByField('delivery_date')).map(item => {
            return (
              <tr
                key={item.id}
                onClick={() => checkedItem(item.id, item.name)}
              >
                <td>
                  <input
                    type="checkbox"
                    onChange={() => checkedItem(item.id, item.name)}
                    checked={!!docsWithChecked.find((el: any) => el.id === item.id)}
                    />
                </td>
                <td>{item.name}</td>
                <td>{item.delivery_date}</td>
                <td>
                  <StatusButton mod={item.status} children={item.status} />
                </td>
                <td>{item.qty}</td>
                <td>{item.sum}</td>
                <td>{item.volume}</td>
                <td>{item.currency}</td>
                <td>{item.sum + item.qty} {item.currency}</td>
              </tr>
            )
          })
        }
      </tbody>
      <tfoot>
        <tr>
          <td>Общий обьем: <b>{volumeSum}</b></td>
          <td>Общее количество: <b>{qtySum}</b></td>
        </tr>
      </tfoot>
    </table>
  )
}

export default DashboardTable