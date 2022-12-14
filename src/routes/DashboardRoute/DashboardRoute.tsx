import { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useAction'
import Modal from '../../components/Modal/Modal'
import './styles.scss'
import { ICheckedItems, IDocuments } from '../../types/Types'
import ItemSearch from './components/ItemSearch/ItemSearch'
import useSearch from '../../hooks/useSearch'
import useItemsSearch from './hooks/useItemsSearch'
import DashboardTable from './components/DashboardTable/DashboardTable'

const DashboardRoute: FC = () => {
  const { docs } = useTypedSelector(state => state.docs)
  const { fetchDocs, updateItemStatus } = useActions()
  const [cancelModalActive, setCencelModalActive] = useState(false)
  const [docsWithChecked, setDocsWithChecked] = useState<ICheckedItems[]>([])
  const searchItem = useSearch('')
  const { searchedItems } = useItemsSearch(docs, searchItem.value)
  const [filtredItems, setFiltredItems] = useState<Array<IDocuments>>(docs)

  useEffect(() => {
    fetchDocs()
  }, [])

  useEffect(() => {
    setFiltredItems(searchedItems)
  }, [searchItem.value, searchedItems])

  const cancelItems = () => {
    setCencelModalActive(false)
    setDocsWithChecked([])
  }

  const updateDocsItems = (id: ICheckedItems[]) => {
    updateItemStatus(id)
    setCencelModalActive(false)
  }

  return (
    <div className='dashboard'>
      <ItemSearch {...searchItem} />

      <DashboardTable
        docs={docs}
        filtredItems={filtredItems}
        docsWithChecked={docsWithChecked}
        setDocsWithChecked={setDocsWithChecked}
      />

      <button className="cancelButton" onClick={() => setCencelModalActive(true)}>
        Аннулировать
      </button>

      <Modal active={cancelModalActive} setActive={setCencelModalActive}>
        <div className="modalHeader">
          <h3>Аннулировать товары</h3>
        </div>
        <div className="modalBody">
          {
            !docsWithChecked.length
              ? 'Нечего аннулировать.'
              : 'Вы уверены что хотите аннулировать товар(ы):'
          }
          
          <p className="cancelItems">
            {
              docsWithChecked.map((el: any) => {
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
          <button
            className={!docsWithChecked.length ? 'modalButtonConfirm disabled' : 'modalButtonConfirm'}
            disabled={!docsWithChecked.length}
            onClick={() => updateDocsItems(docsWithChecked)}
          >
            Применить
          </button>
          <button 
            className="modalButtonCancel" 
            onClick={() => cancelItems()}
          >
            Отклонить
          </button>
        </div>
      </Modal>

    </div>
  )
}

export default DashboardRoute