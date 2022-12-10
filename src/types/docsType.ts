import { IDocuments } from "./Types"

export interface DocsState {
  docs: Array<IDocuments>
  loading: boolean
  error: null | string
}

export enum DocsActionType {
  FETCH_DOCS = 'FETCH_DOCS',
  DOCS_SUCCESS = 'DOCS_SUCCESS',
  DOCS_ERROR = 'DOCS_ERROR'
}

interface FetchDocsAction {
  type: DocsActionType.FETCH_DOCS
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
  | DocsSuccessAction
  | DocsErrorAction