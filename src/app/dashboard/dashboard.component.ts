
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Item } from '../models/item';
import { HttpService } from '../services/http-service.service';
import { LoadFormsService } from '../services/load-forms.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableModule, 
    ToastModule, 
    CommonModule, 
    TagModule, 
    ReactiveFormsModule,
    DropdownModule, 
    ButtonModule, 
    InputTextModule,
    DialogModule, 
    FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  http = inject(HttpService);
  toastService = inject(ToasterService);
  loadFormSrv = inject(LoadFormsService);
  newItemForm: FormGroup = this.loadFormSrv.tableDataForm();

  itemList: Item[] = [];
  clonedProducts: { [s: string]: Item } = {};
  isTableLoading: WritableSignal<boolean> = signal(false);
  showModal: boolean = false;

  get newItemFormValid() {
    return this.newItemForm.valid; 
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isTableLoading.set(true);
    this.http.getData().subscribe((items: any) => {
      this.itemList = items;
      this.isTableLoading.set(false);
      console.log("ITEMS",this.itemList)
    })
  }

  onRowEditInit(item: Item): void {
    console.log("A EDITAR ", item)
    this.clonedProducts[String(item['id'])] = { ...item };
  }

  onRowEditSave(item: Item, index: any): void {
    console.log("GUARDAR EDICION ", item)
    this.http.updateItem(item).subscribe((res: any) => {
      this.itemList[index] = res as Item;
      this.toastService.showSuccessMssg('Se guardó correctamente.');
    }, err => {
      this.toastService.showErrorMssg('Error al actualizar.');
      this.itemList[index] = this.clonedProducts[String(item['id'])]
    })

    delete this.clonedProducts[String(item['id'])];
  }

  onRowEditCancel(item: Item, index: any): void {
    this.itemList[index] = this.clonedProducts[String(item['id'])];
    delete this.clonedProducts[String(item['id'])];
    console.log("SE CANCELO LA EDICION DE ", index)
  }

  controlDialog(status: boolean): void {
    this.showModal = status;
    if(status)
      this.newItemForm = this.loadFormSrv.tableDataForm();
  }

  addItem(){
    const req = this.newItemForm.value;
    this.http.createItem(req).subscribe((res: any) => {
      this.itemList[this.itemList.length] = (res as Item);
      this.toastService.showSuccessMssg('Se agregó correctamente.');
      this.showModal = false;
    }, err => {
      this.toastService.showErrorMssg('Error al agregar.');
    })
  }
}
