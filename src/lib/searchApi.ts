import { SearchForm } from "@/types/search"
import axiosClient from "./axiosClient";

const SearchApi = {
    Search: async(data: SearchForm) => {
        const params: Record<string, string | number | undefined> = {
            q: data.q,
            type: data.type || undefined,
            sortBy: data.sortBy || undefined,
            limit: data.limit,
            offset: data.offset
        };
        return axiosClient.get(`/Search`,{ params })
    }
}
export default SearchApi