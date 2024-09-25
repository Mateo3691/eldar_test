import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Item } from '../../core/models/item.model';
import { LoadFormsService } from '../../core/services/load-forms.service';
import { ToasterService } from '../../core/services/toaster.service';
import { FieldErrorComponent } from '../field-error/field-error.component';

@Component({
  selector: 'app-table',
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
    FieldErrorComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() dataItems: WritableSignal<Item[]> = signal([]);
  //@Input() dataItems: Item[] = [];
  @Input() loadingTable: WritableSignal<boolean> = signal(false);
  @Input() filterFields: Array<string> = [];
  @Input() isEditable: boolean = true;
  @Output() rowEditSave: EventEmitter<Item> = new EventEmitter();
  @Output() addItem: EventEmitter<Item> = new EventEmitter();

  toastService = inject(ToasterService);
  loadFormSrv = inject(LoadFormsService);

  searchValue: string | undefined;

  clonedProducts: { [s: string]: Item } = {};
  showModal: boolean = false;
  newItemForm: FormGroup = this.loadFormSrv.tableDataForm();

  get newItemFormValid() {
    return this.newItemForm.valid; 
  }

  onRowEditInit(item: Item): void {
    this.clonedProducts[String(item['id'])] = { ...item };
  }

  onRowEditSave(item: Item): void {
    this.rowEditSave.emit(item);
    this.clonedProducts[String(item['id'])];
  }

  onRowEditCancel(item: Item, index: any): void {
    this.dataItems.update(items => {
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

  onAddItem(){
    const req = this.newItemForm.value;
    this.addItem.emit(req);
    this.controlDialog(false);
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }
}
