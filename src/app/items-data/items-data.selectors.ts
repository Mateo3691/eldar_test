import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsData } from '../core/models/items-data.model';

export const selectItemsState = createFeatureSelector<ItemsData>('dataItems');

export const selectItemsRes = createSelector(
    selectItemsState,
    (state) => state.items
);
