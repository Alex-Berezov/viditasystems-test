import { Dispatch } from "redux"
import { documents1API } from "../../API/documents1API"
import { documents2API } from "../../API/documents2API"
import { DocsAction, DocsActionType } from '../../types/docsType'

export const fetchDocs = () => {
  return async (dispatch: Dispatch<DocsAction>) => {
    try {
      dispatch({ type: DocsActionType.FETCH_DOCS })

      const data = await documents1API.getDocuments1()
      const data2 = await documents2API.getDocuments2()
      const mergedDocs = [...data, ...data2]

      dispatch({ type: DocsActionType.DOCS_SUCCESS, payload: mergedDocs })
    } catch (error) {
      dispatch({
        type: DocsActionType.DOCS_ERROR,
        payload: 'Ошибка загрузки списка заказов'
      })
    }
  }
}
