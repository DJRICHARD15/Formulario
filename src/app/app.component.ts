import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'sweetAlert';

  constructor(private fb: FormBuilder){}

  registerForm: FormGroup
  names: String
  lastnames: String
  mail: string
  phone: string
  message: String

  ngOnInit() {
    this.createregisterForm()
  }

    createregisterForm() {
      this.registerForm = this.fb.group({
        names: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-zñ]{2,} [A-Z]+[a-zñ]{2,}$')]],
        lastnames: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-zñ]{2,} [A-Z]+[a-zñ]{2,}$')]],
        mail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z]+[a-zA-Z0-9._-ñ]*@[a-z]+[a-z0-9]*.[a-z]{2,3}[.]?[a-z]{2,3}$')]],
        phone: ['', [Validators.required, Validators.pattern('(09)+[0-9]{1,8}')]],
        alternativePhone: this.fb.array([])
      })   
    }

    get alternativePhone(){
      return this.registerForm.get('alternativePhone') as FormArray
    }

    addAlternativePhone(){
      const celular = <FormArray>this.registerForm.controls['alternativePhone']
      celular.push(this.fb.group({alternativePhone: []}))
    }


  submit() {
    if (this.registerForm.invalid) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Es necesario ingresar datos',
        footer: 'Holi :v'
      })
      
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      
      Toast.fire({
        type: 'success',
        title: 'Datos Ingresados Correctamente'
      })
    }
  }
}  
