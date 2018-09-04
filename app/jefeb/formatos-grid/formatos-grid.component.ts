import { Component, ViewChild ,OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formatos-grid',
  templateUrl: './formatos-grid.component.html',
  styleUrls: ['./formatos-grid.component.css']
})
export class FormatosGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  id_orden: string;
  rowSelection;
  columnDefs;
  rowClassRules;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'InformeNo.', field: 'formatoNo' },
    {headerName: 'Tipo', field: 'tipo' }
      
    ];
    this.rowSelection = "single";

    this.rowClassRules = {
      "sick-days-warning": function(params) {
        var numSickDays = params.data.status;
        return numSickDays === 0;
      },
      "sick-days-breach": "data.status == 1"
    };
  }

  rowData: any;

  ngOnInit() {
      this.data.currentGlobal.subscribe(global => this.global = global);
      this.route.params.subscribe( params => this.id_orden=params.id);
  }


  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFormatos');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  llenaTabla(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      this.rowData =repuesta;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var ruta = false;
    selectedRows.forEach(function(selectedRow, index) {
      if(selectedRow.tipo == "REVENIMIENTO"){
         id += selectedRow.id_formato;
         //window.alert(selectedRow.id_formato);
         ruta = true;
      }else if(selectedRow.tipo == "CONTROL DE CONCRETO HIDRAULICO"){
        id += selectedRow.id_formato;
        //window.alert(selectedRow.id_formato);
        ruta = false;
      }
            
    });
    if(ruta == false){
      this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_orden +'/'+id]);
    }else if(ruta == true) {
      this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+this.id_orden +'/'+id]);
    }
    //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_orden +'/'+id]);
  }


}
