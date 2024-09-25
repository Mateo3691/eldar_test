import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserName, selectUserRole } from '../auth/auth.selectors';
import { Item } from '../core/models/item.model';
import { ApiService } from '../core/services/api.service';
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
  http = inject(ApiService);
  store = inject(Store);
  
  isTableLoading: WritableSignal<boolean> = signal(false);
  itemList: WritableSignal<Item[]> = signal([]);
  filterFields: Array<string> = ['id', 'title', 'body'];
  role$: Observable<string> | undefined;
  userName$: Observable<string> | undefined;
  tableEditable: boolean = false;

  ngOnInit(): void {
    this.role$ = this.store.select(selectUserRole);
    this.userName$ = this.store.select(selectUserName)

    this.role$.subscribe((role: string) => {
      this.tableEditable = role === 'admin';
    })
    console.log("USER DATA",this.role$ , this.userName$)
    this.loadItems();
  }

  loadItems(): void {
    this.isTableLoading.set(true);
    this.http.getData().subscribe((itemsData: any) => {
      this.itemList.update(() => itemsData);
      this.isTableLoading.set(false);
    })
  }
}
