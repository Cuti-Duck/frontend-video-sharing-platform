export interface SearchForm {
    q: string
    type: string | undefined
    sortBy: string
    limit: number
    offset: number
}