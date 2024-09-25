import { createReducer, on } from '@ngrx/store';
import { ItemsData } from '../core/models/items-data.model';
import * as act from './items-data.actions';

const initState: ItemsData = {items: []};

export const itemsReducer = createReducer(
    initState,
  on(act.loadItemsSuccess, (state, { items }) => ({ ...state, items: items })),
  on(act.addItemSuccess, (state, { item }) => ({ ...state, items: [...state.items, item] })),
  on(act.updateItemSuccess, (state, { item }) => ({
    ...state, items:state.items.map((i) => (i.id === item.id ? item : i))
  }))
);