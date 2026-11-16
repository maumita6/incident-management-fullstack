import { Component, input, output, viewChild, AfterViewInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter } from '@angular/core';
import { TableColumn } from '../../../models/tablecolumn.model';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule, MatDividerModule
  ],
  standalone: true,
  selector: 'app-mat-table',
  styleUrl: './mat-table.css',
  templateUrl: './mat-table.html',
})
export class MatTableComponent<T> implements AfterViewInit {

  columns = input.required<TableColumn[]>();
  showActions = input.required<boolean>();
  dataSource = new MatTableDataSource<T>();
  data = input.required<T[]>();

  edit = output<T>();
  deleteAction = output<T>();
  view = output<T>();

  private paginator = viewChild(MatPaginator);
  private sort = viewChild(MatSort);

  actionClicked(action: 'edit' | 'delete', row: T) {
    if (action === 'edit') {
      this.edit.emit(row);
      // console.log(this.edit)
    } else if (action === 'delete') {
      this.deleteAction.emit(row);
      // console.log(this.delete)
    }
  }

  displayedColumns: string[] = [];

  getDisplayColumns(): string[] {
    const keys: string[] = this.columns().map((column: TableColumn) => String(column.key));
    console.log('keys', keys, this.columns());
    if (this.showActions()) {
      keys.push('actions');
    }
    return keys;
  }
  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
      this.displayedColumns = this.getDisplayColumns();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator() ?? null;
    this.dataSource.sort = this.sort() ?? null;
  }

  onAction(action: 'edit' | 'delete', row: T) {
    this.actionClicked(action, row);
  }

  onDelete(id: any): void {
    this.deleteAction.emit(id);
    console.log('ondelete clicked in mat table---', id)
  }

  onEdit(id: any): void {
    this.edit.emit(id);
    console.log('edit clicked in mat table---', id)
  }

  onView(id: any): void {
    this.view.emit(id);
  }
}
