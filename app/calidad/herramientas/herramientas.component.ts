import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss','../../loadingArrows.css']
})
export class HerramientasComponent implements OnInit{
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 1;
  cardTitle="Salones abiertos:";

  abiertos= true;
  cerrados= false;
  calificando= false;
  completados= false;
  opciones = false;
  opcionesMessage="Mostrar opciones";

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'Ctrl', field: 'id_salon' },
    {headerName: 'Certificacion', field: 'certificacion' },
    {headerName: 'Capacidad', field: 'capacidad' },
    {headerName: 'Lugar', field: 'lugar' },
    {headerName: 'Fecha', field: 'fecha'},
    {headerName: 'Estado', field: 'estado'},

  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
  }

  rowData: any;

  crearSalon(){
    this.router.navigate(['calidad/salones/crear-salon']);
  }
  masOpciones(){
    this.opciones=!this.opciones;
    if(this.opciones){
      this.opcionesMessage= "Ocultar opciones"
    }else{
      this.opcionesMessage= "Mostrar opciones"
    }
  }
  abiertosMostrar(){
    this.niegaTodo();
    this.abiertos  = true;
    this.cardTitle="Salones abiertos:";
    this.relodeMainGrid('0');
  }
  cerradosMostrar(){
    this.niegaTodo();
    this.cerrados  = true;
    this.cardTitle="Salones cerrados:";
    this.relodeMainGrid('1');
  }
  calificandoMostrar(){
    this.niegaTodo();
    this.calificando  = true;
    this.cardTitle="Salones por calificar:";
    this.relodeMainGrid('2');
  }
  completosMostrar(){
    this.niegaTodo();
    this.completados  = true;
    this.cardTitle="Salones completados:";
    this.relodeMainGrid('3');
  }
  niegaTodo(){
    this.abiertos = false;
    this.cerrados = false;
    this.calificando = false;
    this.completados = false;
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllSalonesCalidad');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', '0');
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            this.cargando=this.cargando-1;
                                          });
  }
  relodeMainGrid(status){
    this.cargando=1;
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllSalonesCalidad');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', status);
    this.http.get(url, {search}).subscribe(res => {
      this.respRelodMainGrid(res.json());                                     
    });
  }
  respRelodMainGrid(res: any){
    this.cargando=this.cargando-1;
    console.log(res);
    if(res.registros==0){
        this.rowData="";
    }else{
      this.rowData= res;
    }
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_salon;
      
    });
      this.router.navigate(['calidad/salones/salon-detail/'+id]);
  }

}
