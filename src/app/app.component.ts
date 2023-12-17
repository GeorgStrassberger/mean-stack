import { Component } from '@angular/core';
import { PrintService } from './service/print/print.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'mean-stack';

  constructor(private printServic: PrintService){}

  onPrintIt(){
    this.printServic.onPrint('print-section');
  }
}
