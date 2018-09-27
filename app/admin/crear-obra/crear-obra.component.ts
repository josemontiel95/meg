import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { Obra }    from './Obra';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

  //Esto es un dummy, borralo despues.

@Component({
  selector: 'app-crear-obra',
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.scss','../../loadingArrows.css']
})
export class CrearObraComponent implements OnInit
  {
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
  foto: string;

  submitted = false;
  hidden = false;
  cargando= 2;
  mis_pm: Array<any>;

  proyectoForm: FormGroup;

  Proyecto = {
   proyecto:'',
   nombreContable:'',
   cliente:'',
   pm_id:''
  }

  cargandoMessage: string= "";
  actualizarMessageCargando: string= "";

  //inicio y llenados
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
   let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',          'getProjectManagersForDroptdown');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaPM(res.json());
                                                 });
     this.proyectoForm = new FormGroup({
      'proyecto':           new FormControl({ value:this.Proyecto.proyecto,          disabled: this.hidden },  [Validators.required]), 
      'nombreContable':     new FormControl({ value:this.Proyecto.nombreContable,    disabled: this.hidden },  [Validators.required]), 
      'cliente':            new FormControl({ value:this.Proyecto.cliente,           disabled: this.hidden },  [Validators.required]), 
      'pm_id':              new FormControl({ value:this.Proyecto.pm_id,             disabled: this.hidden },  [Validators.required])
      
    });
  }

  get proyecto()              { return this.proyectoForm.get('proyecto'); }
  get nombreContable()        { return this.proyectoForm.get('nombreContable'); }
  get cliente()               { return this.proyectoForm.get('cliente'); }
  get pm_id()                 { return this.proyectoForm.get('pm_id'); }

  llenaPM(resp: any){
    this.mis_pm= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_pm[_i]=resp[_i];

    }
    console.log(this.mis_pm);
    this.cargando=this.cargando-1;
  }

  regresaProyecto(){
    this.router.navigate(['administrador/proyectos']);
  }

//insertar-foto


  onSubmit() { this.submitted = true; }


  crearProyecto(){
    this.cargando=1;
    this.cargandoMessage="Guardando...";
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/proyectos/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',           'insertAdmin');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);
    
    formData.append('proyecto',               this.proyectoForm.value.proyecto);
    formData.append('nombreContable',         this.proyectoForm.value.nombreContable );
    formData.append('cliente',                this.proyectoForm.value.cliente);
    formData.append('pm_id',                  this.proyectoForm.value.pm_id);
    this.cargandoMessage="Cargando...";
    this.http.post(url, formData).subscribe(res => this.diplay(res.json()) );
    

  }

  diplay(crearResp: any){
    this.cargando=this.cargando-1;
    if(crearResp.error==0){
      this.cargandoMessage="";
      this.actualizarMessageCargando=crearResp.estatus;
      console.log(crearResp);
      setTimeout(()=>{ 
        this.router.navigate(['administrador/proyectos/proyecto-detail/'+crearResp.id_proyecto]);
      }, 1800);       
    }else{
      this.actualizarMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.cargandoMessage=crearResp.estatus;
          window.alert(this.cargandoMessage);
          console.log(crearResp);
          let token: string;
          token= localStorage.getItem("token");
          let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
          let search = new URLSearchParams();
          search.set('function', 'cerrarSesion');
          search.set('token', token);
          this.http.get(url, {search}).subscribe(res => {
                                                      console.log(res.json().estatus);
                                                      this.router.navigate(['login']); 
                                                    });
          break;
        case 2:
          this.cargandoMessage=crearResp.estatus;
          window.alert(this.cargandoMessage);
          break;
      }
      
    }
    

  }


}