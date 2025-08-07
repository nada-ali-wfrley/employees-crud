import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employees } from '../../services/employees';

declare var bootstrap: any;

@Component({
  selector: 'app-delete-employee',
 imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './delete-employee.html',
  styleUrl: './delete-employee.css'
})
export class DeleteEmployee {
@Output() employeeDeleted = new EventEmitter<void>();
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  private employeeIdToDelete!: number;

  constructor(private employeeService: Employees) {}

  open(id: number) {
    this.employeeIdToDelete = id;
    const modal = new bootstrap.Modal(this.deleteModal.nativeElement);
    modal.show();
  }

  confirmDelete() {
    this.employeeService.delete(this.employeeIdToDelete).subscribe(() => {
      const modal = bootstrap.Modal.getInstance(this.deleteModal.nativeElement);
      modal.hide();
      this.employeeDeleted.emit();
    });
  }
}
