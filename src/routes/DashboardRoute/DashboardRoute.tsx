import React, { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useAction'
import Modal from '../../components/Modal/Modal'

import './styles.scss'

const DashboardRoute: FC = () => {
  const { docs } = useTypedSelector(state => state.docs)
  const { fetchDocs } = useActions()
  const volumeSum = docs.reduce((sum, current) => sum + current.volume, 0)
  const qtySum = docs.reduce((sum, current) => sum + current.qty, 0)
  const [cancelModalActive, setCencelModalActive] = useState(false)

  useEffect(() => {
    fetchDocs()
  }, [])

  console.log('====================================');
  console.log('docs >>', docs.map(el => console.log('el >>', el)));
  console.log('====================================');

  return (
    <div className='dashboard'>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
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
                <tr key={item.id}>
                  <td><input type="checkbox" /></td>
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
            item1, item2, item3
          </p>
        </div>
        <div className="modalButtonsGroup">
          <button className="modalButtonConfirm">Применить</button>
          <button className="modalButtonCancel">Отклонить</button>
        </div>
      </Modal>
    </div>
  )
}

export default DashboardRoute