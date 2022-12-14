import { DocsState, DocsAction, DocsActionType } from '../../types/docsType'

const initialStateDocs: DocsState = {
  docs: [],
  loading: false,
  error: null
}

export const docsReducers = (state = initialStateDocs, action: DocsAction): DocsState => {
  switch (action.type) {
    case DocsActionType.FETCH_DOCS:
      return { loading: true, error: null, docs: [] }

    case DocsActionType.UPDATE_ITEM_STATUS:
      return {
        ...state,
        docs: state.docs.map(item => {
          return item.id === action.payload
            ? { ...item, status: 'archive' }
            : item
        })
      }

    case DocsActionType.DOCS_SUCCESS:
      return { loading: false, error: null, docs: action.payload }
    
    case DocsActionType.DOCS_ERROR:
      return { loading: false, error: action.payload, docs: [] }
  
    default:
      return state
  }
}
