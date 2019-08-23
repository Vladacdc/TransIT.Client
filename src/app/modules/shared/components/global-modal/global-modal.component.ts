import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CrudService } from '../../../core/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from 'src/app/modules/shared/models/supplier';


@Component({
  selector: 'app-global-modal',
  templateUrl: './global-modal.component.html',
  styleUrls: ['./global-modal.component.scss']
})
export class GlobalModalComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

    generalForm: FormGroup;


    ngOnInit() {  
      
       this.generalForm = this.addSupplierFormGroup(); 
    
    }  
      controls: any[] = [
        { 
          conteinerType: "input", 
          fCName: "inputName",
          placeHolder: "TypeInput",
          labelName: "label1",
          required: true
        },
        {
          conteinerType: "select",
          fCName: "selectName",
          placeHolder: "TypeSelect",
          labelName: "label2",
          required: false
        },
        {
          conteinerType: "date",
          fCName: "dateName",
          placeHolder: "sometext",
          labelName: "label2",
          required: true
        },
      ];

    private addSupplierFormGroup():FormGroup{
      return this.formBuilder.group({  
          inputName: ['', Validators.required],
          inputNam2e: [''],
        });
      }
    }
