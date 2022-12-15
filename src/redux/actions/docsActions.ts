import { Dispatch } from "redux"
import { documents1API } from "../../API/documents1API"
import { documents2API } from "../../API/documents2API"
import { DocsAction, DocsActionType } from '../../types/docsType'
import { ICheckedItems } from "../../types/Types"

export const fetchDocs = () => {
  return async (dispatch: Dispatch<DocsAction>) => {
    try {
      dispatch({ type: DocsActionType.FETCH_DOCS })

      const data = await documents1API.getDocuments1()
      const data2 = await documents2API.getDocuments2()
      const mergedDocs = [...data, ...data2]

      dispatch({ type: DocsActionType.DOCS_SUCCESS, payload: mergedDocs || [] })
    } catch (error) {
      dispatch({
        type: DocsActionType.DOCS_ERROR,
        payload: 'Ошибка загрузки списка заказов'
      })
    }
  }
}

export const updateItemStatus = (itemsArr: ICheckedItems[]) => {
  return async (dispatch: Dispatch<DocsAction>) => {
    try {
      dispatch({ type: DocsActionType.FETCH_DOCS })

      const data = await documents1API.getDocuments1()
      const data2 = await documents2API.getDocuments2()
      const mergedDocs = [...data, ...data2]

      data.forEach(item => {
        itemsArr.forEach(async elem => {
          if (item.id === elem.id) {
            await documents1API.updateDocuments1Item(elem.id)
            dispatch({ type: DocsActionType.UPDATE_ITEM_STATUS, payload: elem.id})
          }
        })
      })

      data2.forEach(item => {
        itemsArr.forEach(async elem => {
          if (item.id === elem.id) {
            await documents2API.updateDocuments2Item(elem.id)
            dispatch({ type: DocsActionType.UPDATE_ITEM_STATUS, payload: elem.id})
          }
        })
      })

      dispatch({ type: DocsActionType.DOCS_SUCCESS, payload: mergedDocs || [] })
    } catch (error) {
      dispatch({
        type: DocsActionType.DOCS_ERROR,
        payload: 'Ошибка обновления статуса заказа'
      })
    }
  }
}
