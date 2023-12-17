import { Injectable } from '@angular/core';
import { NgxPrintService, PrintOptions } from 'ngx-print';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  // printSectionId: string|null = null;
  // printTitle: string|null = null;
  // useExistingCss: boolean = false;
  // bodyClass: string = '';
  // previewOnly: boolean = false;
  // closeWindow: boolean = true;
  // printDelay: number = 0;

  constructor(private printService: NgxPrintService) { }


  onPrint(printSectionID: string){
    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: printSectionID,
      printTitle: 'MyTitle',
      useExistingCss: false,
      bodyClass: '',
      previewOnly: false,
      closeWindow: false,
      printDelay: 0
  });
  this.printService.print(customPrintOptions)
  }
}
