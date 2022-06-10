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
    let timer: any;
    this.toastService.getToastMessages()
                     .subscribe((data: any) => {
                        if(this.isShowToast) {
                          clearTimeout(timer);
                        } 
                        this.isShowToast = true;
                        this.messageToast = data.messageToast;
                        this.classToast = data.classToast;
                        timer = setTimeout(() => {
                          this.isShowToast = false;
                        }, 5000);        

                     })
  }

}
