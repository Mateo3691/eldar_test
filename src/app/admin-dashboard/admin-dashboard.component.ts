
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Item } from '../core/models/item';
import { HttpService } from '../core/services/http-service.service';
import { LoadFormsService } from '../core/services/load-forms.service';
import { ToasterService } from '../core/services/toaster.service';
import { FieldErrorComponent } from '../shared/field-error/field-error.component';
import { UserCardComponent } from '../shared/user-card/user-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableModule, 
    ToastModule, 
    CommonModule, 
    TagModule,
    ReactiveFormsModule,
    DropdownModule, 
    ButtonModule, 
    InputTextModule,
    DialogModule, 
    FormsModule,
    UserCardComponent,
    FieldErrorComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{
  http = inject(HttpService);
  toastService = inject(ToasterService);
  loadFormSrv = inject(LoadFormsService);
  
  isTableLoading: WritableSignal<boolean> = signal(false);
  itemList: WritableSignal<Item[]> = signal([])
  
  searchValue: string | undefined;
  clonedProducts: { [s: string]: Item } = {};
  showModal: boolean = false;
  newItemForm: FormGroup = this.loadFormSrv.tableDataForm();

  get newItemFormValid() {
    return this.newItemForm.valid; 
  }

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

  onRowEditInit(item: Item): void {
    this.clonedProducts[String(item['id'])] = { ...item };
  }

  onRowEditSave(item: Item, index: any): void {
    this.http.updateItem(item).subscribe((res: any) => {
      this.itemList.update(items => {
        const nuevosProductos = [...items];
        nuevosProductos[index] = res;
        return nuevosProductos;
      });
      this.toastService.showSuccessMssg('Se guardó correctamente.');
    }, err => {
      this.toastService.showErrorMssg('Error al actualizar.');
      this.itemList.update(items => {
        const nuevosProductos = [...items];
        nuevosProductos[index] = this.clonedProducts[String(item['id'])];
        return nuevosProductos;
      });
    })

    delete this.clonedProducts[String(item['id'])];
  }

  onRowEditCancel(item: Item, index: any): void {
    this.itemList.update(items => {
      const nuevosProductos = [...items];
      nuevosProductos[index] = this.clonedProducts[String(item['id'])];
      return nuevosProductos;
    });
    delete this.clonedProducts[String(item['id'])];
  }

  controlDialog(status: boolean): void {
    this.showModal = status;
    if(status)
      this.newItemForm = this.loadFormSrv.tableDataForm();
  }

  addItem(){
    const req = this.newItemForm.value;
    this.http.createItem(req).subscribe((res: any) => {
      this.itemList.update(items => [...items, res]);
      this.toastService.showSuccessMssg('Se agregó correctamente.');
      this.showModal = false;
    }, err => {
      this.toastService.showErrorMssg('Error al agregar.');
    })
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }
}
