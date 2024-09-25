import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  mssgSrv = inject(MessageService);

  clear() {
    this.mssgSrv.clear();
  }

  showSuccessMssg(text: string) {
    this.clear();
    this.mssgSrv.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showErrorMssg(text: string) {
    this.clear();
    this.mssgSrv.add({ severity: 'error', summary: 'Error', detail: text });
  }
}
