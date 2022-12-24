export interface IPaginacao<T> {
  count: number
  next?: string
  previous?: string
  nextPage: number
  previousPage: number
  results: T[]
}

export interface ISearchData {
  id: number
  title: string
}
