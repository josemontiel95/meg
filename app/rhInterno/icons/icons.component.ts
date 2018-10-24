import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css','../../loadingArrows.css']
})
export class IconsComponent implements OnInit{
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id= "";
  nombre= "";
  apellido= "";
  foto= "";
  rol= "";
  active="";
  hidden=false;
  historial=false;
  desBut=true;
  actBut=false;
  imgUrl="";
  cargando= 1;
  opciones=false;
  opcionesMessage="Mostrar opciones";
  rowClassRules;
  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'Ctrl', field: 'id_usuario' },
      {headerName: 'N.D.E.', field: 'noDeEmpleado' },
      {headerName: 'Nombre', field: 'nombre' },
      {headerName: 'Email coorporativo', field: 'emailCorporativo' },
      {headerName: 'Fecha de Nacimiento', field: 'fechaDeNac' },
      {headerName: 'Puesto', field: 'puesto' },
      {headerName: 'Rol', field: 'rol' },
      {headerName: 'Activo', field: 'active' },

    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-red-warning": function(params) {
        var color = params.data.color;
        return color == 0;
      },
      "row-green-warning": function(params) {
        var color = params.data.color;
        return color == 1;
      }
    };

  }

  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
    this.cargando=1;
  }


  crearUsuario(){
    this.router.navigate(['recursosHumanos/usuarios/crear-usuario']);
  }

  detalleUsuario(){
    this.router.navigate(['recursosHumanos/usuarios/user-detail/'+this.id]);
  }

  cambiaCargando(aux3: any){
    this.cargando=this.cargando+aux3;
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRh');
    search.set('token', this.global.token);
    search.set('status', '0');
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }
  quitarHistorial(){
    this.cargando=1;
    this.historial=false;
    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRh');
    search.set('token', this.global.token);
    search.set('status', '0');
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
    this.cargando=this.cargando-1;
      console.log("llenaTipos this.cargando: "+this.cargando);
  }

   menosDetalles(){
     this.hidden=false;
   }
   masOpciones(){
     this.opciones=!this.opciones;
     if(this.opciones){
       this.opcionesMessage= "Ocultar opciones"
     }else{
       this.opcionesMessage= "Mostrar opciones"
     }
   }

  cargarHistorial(){
    this.cargando=1;
    this.historial=true;
    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRh');
    search.set('token', this.global.token);
    search.set('status', '-1');
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.llenaTabla(res.json());
      this.gridApi.sizeColumnsToFit();
    });
  }


   onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var nombre = "";
    var apellido = "";
    var foto = "";
    var rol = "";
    var active = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_usuario;
      nombre += selectedRow.nombre;
      apellido += selectedRow.apellido;
      foto += selectedRow.foto;
      rol += selectedRow.rol;
      active += selectedRow.active;
    });
    this.displayShortDescription(id, nombre, apellido, foto, rol, active);
  }

  displayShortDescription(id: any, nombre: any, apellido: any, foto: any, rol: any, active: any){
    

    this.hidden=true;
    //activar 
    this.id=id;
    this.nombre=nombre;
    this.apellido=apellido;
    this.foto=foto;
    this.rol=rol;

    if(this.foto== "null"){
      this.imgUrl="../assets/img/gabino.jpg";
    }else{
      this.imgUrl= this.global.assetsRoot+this.foto;
    }


    if(active == "Si")
    {
      this.desBut = true;
      this.actBut= false;
    }
    else{
      if (active == "No") {
        this.desBut = false;
        this.actBut= true;
      }
    }
  }




}
