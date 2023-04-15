import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator, FormArray, FormBuilder, AbstractControl } from "@angular/forms";
import { LocalService } from '../localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  custForm: FormGroup;
  submitted: boolean = false;
  FormArray: any;
  form: any;
  data: any;

  constructor(
    private fb: FormBuilder,
    private localstroge: LocalService,
    private router: Router
  ) {

    this.custForm = new FormGroup({
      name: new FormControl("", [Validators.required,]),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      interset: new FormArray([
        new FormGroup({
          title: new FormControl(''),
        })
      ])
    });
  }
  OnSubmit(value: any) {
  
    console.log(value)
    //this.localstroge.saveData("Details", JSON.stringify([value]));
    this.router.navigate(['/view'], {state: value});
   
  }
  

  get errorControl() {
    return this.custForm.controls;
  }

  get n(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get interset(): FormArray {
    return this.custForm.get('interset') as FormArray;
  }
  removeinterset(index: number) {
    this.interset.removeAt(index);
  }
  
  addinterset() {
    this.interset.push(
      new FormGroup({
        title: new FormControl(""),
      })
    );
  }
}