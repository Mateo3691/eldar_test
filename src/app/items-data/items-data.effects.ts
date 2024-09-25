import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { addItem, addItemSuccess, loadItems, loadItemsSuccess, updateItem, updateItemSuccess } from './items-data.actions';
import { ItemsDataService } from './items-data.service';

export class ItemsEffects {
  router = inject(Router);
  actions$ = inject(Actions);
  itemsDataService = inject(ItemsDataService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      switchMap(() => this.itemsDataService.getData().pipe(
        map((items: any ) => loadItemsSuccess({ items }))
      ))
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItem),
      switchMap((action) => this.itemsDataService.createItem(action.item).pipe(
        map((item: any ) => addItemSuccess({ item }))
      ))
    )
  );

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateItem),
      switchMap((action) => this.itemsDataService.updateItem(action.item).pipe(
        map((item: any )=> updateItemSuccess({ item }))
      ))
    )
  );
}