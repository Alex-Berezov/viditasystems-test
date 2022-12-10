import { DocsState, DocsAction, DocsActionType } from '../../types/docsType'

const initialState: DocsState = {
  docs: [],
  loading: false,
  error: null
}

export const docsReducers = (state = initialState, action: DocsAction): DocsState => {
  switch (action.type) {
    case DocsActionType.FETCH_DOCS:
      return { loading: true, error: null, docs: [] }

    case DocsActionType.DOCS_SUCCESS:
      return { loading: false, error: null, docs: action.payload }
    
    case DocsActionType.DOCS_ERROR:
      return { loading: false, error: action.payload, docs: [] }
  
    default:
      return state
  }
}