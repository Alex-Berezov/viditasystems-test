import React, { FC, useEffect, useRef, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useAction'
import Modal from '../../components/Modal/Modal'

import './styles.scss'
import { IDocuments } from '../../types/Types'

const DashboardRoute: FC = () => {
  const { docs } = useTypedSelector(state => state.docs)
  const { fetchDocs } = useActions()
  const volumeSum = docs.reduce((sum, current) => sum + current.volume, 0)
  const qtySum = docs.reduce((sum, current) => sum + current.qty, 0)
  const [cancelModalActive, setCencelModalActive] = useState(false)

  const [docsWithChecked, setDocsWithChecked] = useState<any>([])
  const [theadChecked, setTheadChecked] = useState(false)
  

  useEffect(() => {
    fetchDocs()
  }, [])

  useEffect(() => {
    if (docsWithChecked.length === docs.length && docsWithChecked.length) return setTheadChecked(true)
    if (!docsWithChecked.length) return setTheadChecked(false)
  }, [docsWithChecked])

  const checkedItem = (id: string, name: string) => {
    if (!docsWithChecked.find((item: any) => item.id === id)) {
      setDocsWithChecked([...docsWithChecked, {"id": id, "name": name},])
    } else {
      setDocsWithChecked([...docsWithChecked.filter((item: any) => item.id !== id)])
    }
  }

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

  return (
    <div className='dashboard'>
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
            docs.map(item => {
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
                  <td>{item.status}</td>
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

      <button className="cancelButton" onClick={() => setCencelModalActive(true)}>
        Аннулировать
      </button>

      <Modal active={cancelModalActive} setActive={setCencelModalActive}>
        <div className="modalHeader">
          <h3>Аннулировать товары</h3>
        </div>
        <div className="modalBody">
          Вы уверены что хотите аннулировать товар(ы):
          
          <p className="cancelItems">
            {
              docsWithChecked.map((el: any, i: number) => {
                if (docsWithChecked[docsWithChecked.length - 1].name === el.name) {
                  return <b key={el.id}>{el.name}.</b>
                } else {
                  return <b key={el.id}>{el.name}, </b>
                }
              })
            }
          </p>
        </div>
        <div className="modalButtonsGroup">
          <button className="modalButtonConfirm">Применить</button>
          <button 
            className="modalButtonCancel" 
            onClick={() => setCencelModalActive(false)}
          >
            Отклонить
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DashboardRoute