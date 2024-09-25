import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Item } from '../core/models/item';
import { HttpService } from '../core/services/http-service.service';
import { LoadFormsService } from '../core/services/load-forms.service';
import { ToasterService } from '../core/services/toaster.service';
import { TableComponent } from '../shared/table/table.component';
import { UserCardComponent } from '../shared/user-card/user-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    UserCardComponent,
    TableComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{
  http = inject(HttpService);
  toastService = inject(ToasterService);
  loadFormSrv = inject(LoadFormsService);
  
  isTableLoading: WritableSignal<boolean> = signal(false);
  itemList: WritableSignal<Item[]> = signal([]);
  filterFields: Array<string> = ['id', 'title', 'body'];

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
