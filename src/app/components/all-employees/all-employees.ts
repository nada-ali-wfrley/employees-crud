import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employees } from '../../services/employees';
import { Employee } from '../../models/employee';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddEmployee } from '../add-employee/add-employee';
import { EditEmployee } from '../edit-employee/edit-employee';
import { DeleteEmployee } from '../delete-employee/delete-employee';


@Component({
  selector: 'app-all-employees',
   imports: [MatTableModule, MatPaginatorModule, FormsModule, CommonModule,AddEmployee,EditEmployee,DeleteEmployee],
  templateUrl: './all-employees.html',
  styleUrl: './all-employees.css',
  providers: [Employees]
})

export class AllEmployees implements AfterViewInit, OnInit {

 employees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild('addEmployeeModal') addEmployeeModal!: AddEmployee;
 @ViewChild('editEmployeeModal') editEmployeeModal!: EditEmployee;
@ViewChild('deleteEmployeeModal') deleteEmployeeModal!: DeleteEmployee;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];
  currentSortColumn: string='';
  sortDirection: string='';
  noData: boolean=false;

  constructor(private employeesService: Employees,private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
   
     this.setPaginatedData();
  this.cdr.detectChanges(); 
    
      

  }

 ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.employeesService.getAll() 
      .subscribe({
        next:(data) => {
          console.log('Employees loaded:', data);
         this.employees = data;
         if(!this.employees)
         {
          this.noData=true;
         }
         else{
          this.noData=false;
         }
      this.setPaginatedData();
this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }

   } );
  

  }
onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
   this.setPaginatedData();
this.cdr.detectChanges();
  }

  setPaginatedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = this.employees.slice(start, end);
  }
sortBy(column: keyof Employee) {
  if (this.currentSortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.currentSortColumn = column;
    this.sortDirection = 'asc';
  }
  
  this.setPaginatedData();
this.cdr.detectChanges();
}
openAddModal() {
    this.addEmployeeModal.open();
  }

  onEmployeeAdded() {
   
    this.loadData();
  }

editEmployee(id: any) {
  this.editEmployeeModal.open(id);
}

onEmployeeUpdated() {
  this.loadData();
}

deleteEmployee(id: any) {
  this.deleteEmployeeModal.open(id);
}

onEmployeeDeleted() {
  this.loadData();
}
}