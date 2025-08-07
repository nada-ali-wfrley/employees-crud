import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { Employees } from '../../services/employees';

declare var bootstrap: any;
@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee  {



  @Output() employeeAdded = new EventEmitter<void>();
  @ViewChild('addModal') addModal!: ElementRef;

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder , private employeeService: Employees) {
    this.employeeForm = this.fb.group({
      empName: ['', Validators.required],
      empEmail: ['', [Validators.required, Validators.email]],
      empAddress: ['', Validators.required],
      empPhone: ['', [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]],
    });
  }


  open() {
    const modal = new bootstrap.Modal(this.addModal.nativeElement);
    modal.show();
  }

  submitForm() {
    if (this.employeeForm.valid) {
      
      const newEmployee: Employee = this.employeeForm.value;
      console.log('New employee:', this.employeeForm.value);
      this.employeeService.add(newEmployee).subscribe(
        {
          next:(data)=>{
      this.employeeAdded.emit();
          },
          error:(err)=>{
       console.error('Failed to add employee:', err);

          }
        }
      )


      const modal = bootstrap.Modal.getInstance(this.addModal.nativeElement);
      modal.hide();
      this.employeeForm.reset();
    }
  }
}


