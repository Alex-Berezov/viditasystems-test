import { IDocuments } from "./Types"

export interface DocsState {
  docs: Array<IDocuments>
  loading: boolean
  error: null | string
}

export enum DocsActionType {
  FETCH_DOCS = 'FETCH_DOCS',
  UPDATE_ITEM_STATUS = 'UPDATE_ITEM_STATUS',
  DOCS_SUCCESS = 'DOCS_SUCCESS',
  DOCS_ERROR = 'DOCS_ERROR'
}

interface FetchDocsAction {
  type: DocsActionType.FETCH_DOCS
}

interface UpdateDocsAction {
  type: DocsActionType.UPDATE_ITEM_STATUS,
  payload: string
}

interface DocsSuccessAction {
  type: DocsActionType.DOCS_SUCCESS,
  payload: Array<IDocuments>
}

interface DocsErrorAction {
  type: DocsActionType.DOCS_ERROR,
  payload: string
}

export type DocsAction =
  FetchDocsAction
  | UpdateDocsAction
  | DocsSuccessAction
  | DocsErrorAction