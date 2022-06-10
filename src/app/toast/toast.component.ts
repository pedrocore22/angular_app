import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  isShowToast: boolean = false;
  messageToast: string = '';
  classToast: string = '';

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.getToastMessages()
                     .subscribe((data: any) => {  
                        let timer;
                        if (this.isShowToast) {
                          timer = setTimeout(() => {
                            this.isShowToast = false;
                          }, 0);
                        } 
                        this.isShowToast = true;
                        timer = setTimeout(() => {
                          this.isShowToast = false;
                        }, 5000);        
                        this.messageToast = data.messageToast;
                        this.classToast = data.classToast;

                     })
  }

}
