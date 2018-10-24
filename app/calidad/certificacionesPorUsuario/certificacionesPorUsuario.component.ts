import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'certificacionesPorUsuario',
  templateUrl: './certificacionesPorUsuario.component.html',
  styleUrls: ['./certificacionesPorUsuario.component.css','../../loadingArrows.css']
})
export class CertificacionesPorUsuarioComponent implements OnInit{
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowClassRules;
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
  historico=false;
  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'N.D.E.', field: 'noDeEmpleado' },
      {headerName: 'Nombre', field: 'nombre' },
      {headerName: 'Ctrl Salon', field: 'id_salon' },
      {headerName: 'Certificacion', field: 'certificacion' },
      {headerName: 'Fecha aprobaci&oacute;n', field: 'aprobadaFecha' },
      {headerName: 'Vigencia', field: 'fechaVigencia' },
      {headerName: 'Estado', field: 'estado' }
    ];
    this.rowSelection = "single";
   this.rowClassRules = {
      "row-green-warning": function(params) {
        var color = params.data.color;
        return color == 0;
      },
      "row-yelloy-warning": function(params) {
        var color = params.data.color;
        return color == 1;
      },
      "row-orange-warning": function(params) {
        var color = params.data.color;
        return color == 2;
      },
      "row-red-warning": function(params) {
        var color = params.data.color;
        return color == 3;
      },
      "row-blue-warning": function(params) {
        var color = params.data.color;
        return color == -2;
      }
    };
  }

  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
    this.cargando=1;
  }


  crearObra(){
    this.router.navigate(['calidad/proyectos/crear-proyecto']);
  }
  

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllCertificacionesCalidad');
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
  historicoMostrar(){
    this.cargando=1;
    this.historico=true;
    let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
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
  historicoDesaparecer(){
    this.cargando=1;
    this.historico=false;
    let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
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

   desactivarUsuario(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarUsuario(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

   switchActive(active: number){
     let url = `${this.global.apiRoot}/obra/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
        formData.append('function', 'activate');
      }
        formData.append('id_obra', this.id);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
   }

   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
       location.reload();
     }
   }


   onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";


    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_usuario_salon;
    });
      this.router.navigate(['calidad/salones/salon-user-detail/'+id]);
  }

  
}