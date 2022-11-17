import create from 'zustand'
import shallow from 'zustand/shallow'
import { mountStoreDevtool } from 'simple-zustand-devtools'

import { Filters } from '../entities/Filter'

export type State = {
  filter: Filters
}

export type Actions = {
  setFilter: (filter: Filters) => void
}

export const useFilterStore = create<State & Actions>((set) => ({
  filter: 'All',
  setFilter: (filter) => set({ filter }),
}))

export const useFilter = () => {
  const { filter, setFilter } = useFilterStore(
    (state) => ({ filter: state.filter, setFilter: state.setFilter }),
    shallow,
  )

  return { filter, setFilter }
}

/* ====== devtools ====== */
if (import.meta.env.DEV) {
  mountStoreDevtool('Filter', useFilterStore)
}
