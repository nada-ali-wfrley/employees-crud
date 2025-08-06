import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employees } from '../../services/employees';
import { Employee } from '../../models/employee';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-all-employees',
   imports: [MatTableModule, MatPaginatorModule, FormsModule, CommonModule],
  templateUrl: './all-employees.html',
  styleUrl: './all-employees.css',
  providers: [Employees]
})

export class AllEmployees implements AfterViewInit, OnInit {
  // displayedColumns: string[] = ['id', 'name',  'email','address', 'phone', 'actions'];
  // dataSource = new MatTableDataSource<Employee>();
 employees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];
  currentSortColumn: string='';
  sortDirection: string='';

  constructor(private employeesService: Employees) {}
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe((event: PageEvent) => this.onPageChange(event));
    }
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
      this.setPaginatedData();
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
  }

  setPaginatedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = this.employees.slice(start, end);
    console.log(this.paginatedEmployees[0].empAddress)
  }
sortBy(column: keyof Employee) {
  if (this.currentSortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.currentSortColumn = column;
    this.sortDirection = 'asc';
  }
  
  this.setPaginatedData(); // تعيدي ترتيب وعرض البيانات
}

  editEmployee(id:any) {
    // Logic to edit employee
    console.log('Edit employee with ID:', id);
  }
  deleteEmployee(id: any) {
    this.employeesService.delete(id)
      .subscribe({
        next: () => {
          console.log('Deleted employee with ID:', id);
          this.loadData(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        }
      });
  }
}