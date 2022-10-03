import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  formPerson: FormGroup;
  documentTypes: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.formPerson = formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      lastname: [{value: null, disabled: false}, [Validators.required]],
      documentNumber: [{value: null, disabled: false}, [Validators.required]],
      documentTypeId: [{value: null, disabled: false}, [Validators.required]],
      birthday: [{value: null, disabled: false}, []],
    })
  }

  ngOnInit(): void {
    this.personService.getTypeDocument().subscribe(documentTypes => {
      this.documentTypes = documentTypes;
    })
  }

  cancelar(): void {
    this.back();
  }

  back(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRouter
    })
  }

  guardar(): void {
    const person = this.formPerson.getRawValue();
    this.personService.delete(person).subscribe(x => {
      alert('Se eliminó correctamente');
      this.back();
    })
  }
}
