import { create } from 'zustand';

type SearchStoreState = { query: string; filterBy: string[] };
type SearchStoreAction = {
  setQuery: (query: SearchStoreState['query']) => void;
  setFilterBy: (filterBy: SearchStoreState['filterBy']) => void;
};
type SearchStore = SearchStoreState & SearchStoreAction;

export const useMenuItemSearch = create<SearchStore>()((set) => ({
  query: '',
  filterBy: [],

  setQuery: (query) => set({ query }),
  setFilterBy: (filterBy) => set({ filterBy }),
}));
