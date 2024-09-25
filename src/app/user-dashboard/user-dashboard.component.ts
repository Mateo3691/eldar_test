import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Item } from '../core/models/item';
import { HttpService } from '../core/services/http-service.service';
import { TableComponent } from '../shared/table/table.component';
import { UserCardComponent } from '../shared/user-card/user-card.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    UserCardComponent,
    TableComponent
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  http = inject(HttpService);
  
  isTableLoading: WritableSignal<boolean> = signal(false);
  itemList: WritableSignal<Item[]> = signal([]);
  filterFields: Array<string> = ['id', 'title', 'body'];

  searchValue: string | undefined;

  ngOnInit(): void {
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
