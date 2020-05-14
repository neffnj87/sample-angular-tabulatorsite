import { Component, OnInit } from '@angular/core';
import Tabulator from 'node_modules/tabulator-tables/dist/js/tabulator.js';

import { IColumns } from './servercolumns.js';
import { ServerDataService } from './servertable-service';


@Component({
  selector: 'app-servertable',
  templateUrl: './servertable.component.html',
  styleUrls: ['./servertable.component.css']
})

export class ServerTableByTeamComponent implements OnInit {
  serverTable: Tabulator;
  tableData: IColumns[] = [];
  columns: any[] = [];
  errorMessage: string;
  servers: IColumns[] = [];

  constructor(private serverDataService: ServerDataService) {   }

  ngOnInit(): void {
    this.generateTable();
  }

  generateTable() {
    this.serverDataService.getServers().subscribe({
      next: servers => {
        this.servers = servers,
        this.tableData = this.servers;
        this.serverTable = new Tabulator('#server-table', {
          height: 500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically
          data: this.tableData, // assign data to table
          layout: 'fitDataFill', // fit columns to width of table (optional)
          pagination: 'local', // set pagination
          paginationSize: 10, // set default number of rows per page
          paginationSizeSelector: [ 10, 50, 100], // set the options for number of rows per page
          groupBy: 'team',
          groupToggleElement: 'header', // To toggle group by clicking on the header
          responsiveLayout: 'collapse', // What does the responsive button do?
          responsiveLayoutCollapseStartOpen: false,
          dataTree: true,
          dataTreeElementColumn: 'alias',
          selectable: true,
          clipboard: 'copy',
          columns: [ // Define Table Columns
            {formatter: 'rowSelection', titleFormatter: 'rowSelection', hozAlign: 'center', headerSort: false},
            {formatter: 'responsiveCollapse', width: 30, hozAlign: 'center', resizable: false, headerSort: false},
            {title: 'ServerAlias', field: 'alias',  width: 300, headerFilter: 'input', responsive: 0, download: false,
            cellClick(e, cell) {const value = cell.getValue(); console.log(value); } },
            {
              title: 'Purpose',
              hozAlign: 'center',
              columns: [
                {title: 'Application', field: 'app',  sorter: 'date', hozAlign: 'center', headerFilter: 'input', responsive: 1,
                download: false, cellClick(e, cell) {console.log(cell.getValue()); } },
                {title: 'Team', field: 'team',  sorter: 'date', hozAlign: 'center', headerFilter: 'input', responsive: 1,
                download: false, cellClick(e, cell) {console.log(cell.getValue()); } },
              ]
            },
            {
              title: 'Server Information',
              hozAlign: 'center',
              columns: [
                {title: 'User@FQDN', field: 'login', width: 200, sorter: 'date', hozAlign: 'center', headerFilter: 'input', responsive: 3,
                download: true, cellClick(e, cell) {const login = cell.getValue(); } },
                {title: 'DataCenter', field: 'location', headerFilter: 'input', responsive: 2,
                download: false, cellClick(e, cell) {console.log(cell.getValue()); } },
                {title: 'CPU Count', field: 'cpus', headerFilter: 'input', responsive: 4,
                download: false, cellClick(e, cell) {console.log(cell.getValue()); } },
              ]
            },
          ],
          rowSelectionChanged(data, rows) {
            // update selected row counter on selection change
            document.getElementById('select-stats').innerHTML = data.length;
            // console.log(rows);
            // console.log(length);
          },
          // cellClick(e, cell, login){
          //   console.log(login);
          // },
        });
      }});
    }

    getLogins() {
      // const logins = document.getElementById('select-stats').innerHTML;
      // const logins = document.querySelectorAll('div.tabulator-selected > div[tabulator-field="login"], innerText.value');
      const logins = Array.from(document.querySelectorAll('div.tabulator-selected > div[tabulator-field="login"] '));
      // const logins = Array.from(document.querySelectorAll('div.tabulator-selected > div:nth-child(6) '));
      const numLogins = logins.length;
      console.log(logins);
      const val = logins[0].outerText; // this is how you get the value from the nodelist
      console.log(val);
      // console.log(numLogins);
      // let i = 0;
      // for (; i < numLogins; i++ ) {
      //   console.log(i);
      //   // const out = document.getElementsByName('[\$\i].innerText');
      //   // console.log(Object.getOwnPropertyNames('[0].outerText'));
      // }
      // const username = logins.innerText.values();
    }
}
