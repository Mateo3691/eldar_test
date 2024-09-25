import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Item } from '../core/models/item';
import { HttpService } from '../core/services/http-service.service';
import { UserCardComponent } from '../shared/user-card/user-card.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    TableModule,  
    CommonModule, 
    TagModule,
    ButtonModule, 
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    TagModule,
    UserCardComponent
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  http = inject(HttpService);
  
  isTableLoading: WritableSignal<boolean> = signal(false);
  itemList: WritableSignal<Item[]> = signal([]);

  searchValue: string | undefined;

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    console.log("ENTRA AÑL METODO")
    // this.isTableLoading.set(true);
    this.http.getData().subscribe((itemsData: any) => {
      this.itemList.update(() => itemsData);
      console.log("ITEMS",this.itemList())
      this.isTableLoading.set(false);
    })
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }
}
