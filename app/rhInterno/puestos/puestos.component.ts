import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.scss','../../loadingArrows.css']
})
export class PuestosComponent implements OnInit{
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id= "";
  nombre= "";
  prefijo= "";
  foto= "";
  cliente= "";
  active="";
  hidden=false;
  desBut=true;
  actBut=false;
  imgUrl="";
  cargando= 1;
  historial=false;
  rowClassRules;
  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'Ctrl', field: 'id_puesto' },
      {headerName: 'Puesto', field: 'puesto' },

    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-green-warning": function(params) {
        var color = params.data.active;
        return color == 1;
      },
      "row-red-warning": function(params) {
        var color = params.data.active;
        return color == 0;
      }
    };
  }

  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
    this.cargando=1;
  }


  crearObra(){
    this.router.navigate(['recursosHumanos/puestos/crear-puesto']);
  }

  detalleObra(){ //Cambialo a detalleObra
    this.router.navigate(['recursosHumanos/puestos/puesto-detail/'+this.id]);
  }
  

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/puesto/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', '0');
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.llenadoValidator(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }
  mostrarTodo(){
    this.cargando=this.cargando+1;
    this.historial=true;
    let url = `${this.global.apiRoot}/puesto/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', '-1');
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.llenadoValidator(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }
  reloadMainGrid(){
    this.cargando=this.cargando+1;
    this.historial=false;
    let url = `${this.global.apiRoot}/puesto/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', '0');
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.llenadoValidator(res.json());
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
    this.cargando=this.cargando-1;
  }

  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
     
    }
  }


   menosDetalles(){
     this.hidden=false;
   }


   



   onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";


    selectedRows.forEach(function(selectedRow, index) {
      id = selectedRow.id_puesto;
    });
    this.id=id;
    this.detalleObra();
  }


}