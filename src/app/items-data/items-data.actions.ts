import { createAction, props } from '@ngrx/store';
import { Item } from '../core/models/item.model';

export const loadItems = createAction('[Items] Load Items');
export const loadItemsSuccess = createAction(
  '[Items] Load Items Success',
  props<{ items: Item[] }>()
);

export const addItem = createAction(
  '[Items] Add Item',
  props<{ item: Item }>()
);
export const addItemSuccess = createAction(
  '[Items] Add Item Success',
  props<{ item: Item }>()
);

export const updateItem = createAction(
  '[Items] Update Item',
  props<{ item: Item }>()
);
export const updateItemSuccess = createAction(
  '[Items] Update Item Success',
  props<{ item: Item }>()
);