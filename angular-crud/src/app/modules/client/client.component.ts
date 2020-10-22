import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Client, ClientsList } from '~app/models/client';
import { ConfirmComponent } from '~components/confirm/confirm.component';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';
import { AuthService } from '~services/auth.service';
import { ClientService } from '~services/client.service';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    providers: [ClientService]
})
export class ClientComponent implements AfterViewInit, OnInit {
    public readonly displayedColumns = ['id', 'cpf', 'name', 'action'];
    public readonly pageSizeOptions = [5, 10, 20, 40, 100];
    public pageSize = 20;
    public dataSource = new MatTableDataSource<Client>();
    public pageEvent: PageEvent;
    public resultsLength = 0;
    public page = 1;
    public isLoading = false;
    public isTotalReached = false;
    public totalItems = 0;
    public search = '';
    public value: string;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(
        private cdr: ChangeDetectorRef,
        private clientService: ClientService,
        private authService: AuthService,
        private router: Router,
        public dialog: MatDialog,
        public snack: MatSnackBar
    ) { }

    public ngOnInit(): void {
        if (!this.authService.loggedIn.getValue()) {
            this.router.navigate(['/login']);
        }
    }

    public ngAfterViewInit(): void {
        this.getData();
    }

    public ngAfterViewChecked(): void {
        this.cdr.detectChanges();
    }

    private openSnack(data: any): void {
        this.snack.openFromComponent(SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    }

    public onPaginateChange(event: any): void {
        this.page = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getData();
    }

    public applyFilter(filterValue: string): void {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.search = filterValue;
        this.getData();
    }

    private getData(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoading = true;
                    return this.clientService.getList(
                        this.sort.active,
                        this.sort.direction,
                        this.pageSize,
                        this.page,
                        this.search
                    );
                }),
                map((data: ClientsList) => {
                    this.isLoading = false;
                    this.isTotalReached = false;
                    this.totalItems = data.totalElements;
                    return data.content;
                }),
                catchError(() => {
                    this.isLoading = false;
                    this.isTotalReached = true;
                    return observableOf([]);
                })
            ).subscribe((data: Client[]) => this.dataSource.data = data);
    }

    public edit(row: Client): void {
        this.clientService.getOne(row.id).subscribe((data: Client) => {
            if (data) {
                this.router.navigate([`/client/form/${data.id}`]);
            }
        });
    }

    public save(): void {
        this.router.navigate(['/client/form']);
    }

    public delete(row: Client): void {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '250px',
            data: {
                title: 'Delete record',
                message: 'Are you sure you want to delete this record?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.clientService.delete(row.id).subscribe((data: any) => {
                    this.openSnack(data);

                    if (data.success) {
                        this.paginator._changePageSize(this.paginator.pageSize);
                    }
                });
            }
        });
    }

}
