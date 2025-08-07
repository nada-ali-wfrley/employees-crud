import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employees } from '../../services/employees';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-edit-employee',
   imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css'
})
export class EditEmployee {
 @Output() employeeUpdated = new EventEmitter<void>();
  @ViewChild('editModalRef') editModal!: ElementRef;

  employeeForm!: FormGroup;
  employeeId!: number;

  constructor(private fb: FormBuilder, private employeeService: Employees) {
    this.employeeForm = this.fb.group({
      empName: ['', Validators.required],
      empEmail: ['', [Validators.required, Validators.email]],
      empAddress: ['', Validators.required],
      empPhone: ['', [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]],
    });
  }

  
open(id: number) {
  this.employeeId = id;

  this.employeeService.getById(id).subscribe({
    next: (emp) => {
      this.employeeForm.patchValue({
        empName: emp.empName,
        empEmail: emp.empEmail,
        empAddress: emp.empAddress,
        empPhone: emp.empPhone
      });

      
      const modal = new bootstrap.Modal(this.editModal.nativeElement);
      modal.show();
    },
    error: (err) => {
      console.error('Error loading employee:', err);
      
    }
  });
}

  submitForm() {
  if (this.employeeForm.valid) {
    const updatedData = {
      empId:this.employeeId,
      ...this.employeeForm.value
    };

    this.employeeService.update(this.employeeId, updatedData).subscribe({
      next: () => {
        console.log('Employee updated', updatedData);
        this.employeeUpdated.emit(); 

        const modal = bootstrap.Modal.getInstance(this.editModal.nativeElement);
        modal?.hide();
      },
      error: (err) => {
        console.error('Update failed:', err);
       
      }
    });
  }
}

}
