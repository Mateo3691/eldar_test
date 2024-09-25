import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserName, selectUserRole } from '../auth/auth.selectors';
import { Item } from '../core/models/item.model';
import { ToasterService } from '../core/services/toaster.service';
import { addItem, loadItems, updateItem } from '../items-data/items-data.actions';
import { selectItemsRes } from '../items-data/items-data.selectors';
import { TableComponent } from '../shared/table/table.component';
import { UserCardComponent } from '../shared/user-card/user-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    UserCardComponent,
    TableComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  store = inject(Store);
  toastService = inject(ToasterService);
  
  isTableLoading: WritableSignal<boolean> = signal(false);
  itemList: WritableSignal<Item[]> = signal([]);
  //itemList: Item[] = [];
  filterFields: Array<string> = ['id', 'title', 'body'];
  role$: Observable<string> | undefined;
  userName$: Observable<string> | undefined;
  itemsData$: Observable<Item[]> | undefined;
  tableEditable: boolean = false;

  ngOnInit(): void {
    this.initStoreObs();
    this.loadItems();
  }

  initStoreObs(): void {
    this.role$ = this.store.select(selectUserRole);
    this.userName$ = this.store.select(selectUserName)
    this.itemsData$ = this.store.select(selectItemsRes)

    this.role$.subscribe({
      next: role => {
        this.tableEditable = role === 'admin';
      }
    })

    this.itemsData$.subscribe({
      next: data => {
        this.itemList.update(() =>  JSON.parse(JSON.stringify(data)));
        this.isTableLoading.set(false);
        this.toastService.showSuccessMssg('Información cargada.')
      },
      error: error => {
        this.toastService.showErrorMssg('Error al cargar.');
      }}
    )
  }

  loadItems(): void {
    this.store.dispatch(loadItems());
  }

  onAddItem(req: Item){
    this.store.dispatch(addItem({item: req}));
  }

  onSaveEditedItem(req: Item){
    this.store.dispatch(updateItem({item: req}));
  }
}
