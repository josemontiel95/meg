import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-salonuser-detail',
  templateUrl: './salon-user-detail.component.html',
  styleUrls: ['./salon-user-detail.component.css','../../loadingArrows.css']
})
export class SalonUsuarioDetailComponent implements OnInit {

  estatus: string;
  error: string;
  historico= false;
  cargando;
  active: any;
  submitted = false;
  hidden = true;
  mis_certif: Array<any>;
  mis_lab: Array<any>;
  imgUrl = "";
  onSubmit() { this.submitted = true; }

  usuario_salonForm: FormGroup;
  usuario_salon = {
    id_usuario_salon: '',
    nombre:'',
    certificacion:'',
    diasValidos:'',
    asistencia: '',
    asisteciaFecha: '',
    aprobada: '',
    aprobadaFecha: '',
    fechaVigencia: '',
    id_salon: '',
    folio:''
  }


    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    His=true;
    qrFoto;
    doc;
    qrFotoIcon;
    docIcon;

    folioQR;
    prefijo;
    nombreQR;
    curpNo;
    ocupacion;
    puesto;
    razonSocial;
    rfc;
    curso;
    horas;
    periodoEje;
    areaTematica;
    capacitador;

    resppass= false;
    exitoCon = false;
    password1: string;
    npassword: string;
    id: string;
  
    private gridApi;
    private gridColumnApi;
    rowSelection;
    columnDefs;
    statusSalon;

    abiertos= false;
    cerrados= false;
    calificando= false;
    completados= false;
    falta= false;
    statusTitle="";
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=2;

    let url = `${this.global.apiRoot}/usuario_salones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',       'getInfoForQR');
    search.set('token',            this.global.token);
    search.set('rol_usuario_id',   this.global.rol);
    search.set('id_usuario_salon', this.id);
    this.http.get(url, {search}).subscribe(res => this.llenadoQRInfo(res.json()) );

    url = `${this.global.apiRoot}/usuario_salones/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function',       'getSalonUsuarioByIDCalidad');
    search.set('token',            this.global.token);
    search.set('rol_usuario_id',   this.global.rol);
    search.set('id_usuario_salon', this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

    this.usuario_salonForm = new FormGroup({
      'id_usuario_salon':       new FormControl({ value:this.usuario_salon.id_usuario_salon,     disabled: this.hidden },  [Validators.required]),         
      'nombre':                 new FormControl({ value:this.usuario_salon.nombre,               disabled: this.hidden },  [Validators.required]), 
      'certificacion':          new FormControl({ value:this.usuario_salon.certificacion,        disabled: this.hidden },  [Validators.required]), 
      'diasValidos':            new FormControl({ value:this.usuario_salon.diasValidos,          disabled: this.hidden },  [Validators.required]),
      'asistencia':             new FormControl({ value:this.usuario_salon.asistencia,           disabled: this.hidden },  [Validators.required]),         
      'asisteciaFecha':         new FormControl({ value:this.usuario_salon.asisteciaFecha,       disabled: this.hidden },  [Validators.required]), 
      'aprobada':               new FormControl({ value:this.usuario_salon.aprobada,             disabled: this.hidden },  [Validators.required]), 
      'aprobadaFecha':          new FormControl({ value:this.usuario_salon.aprobadaFecha,        disabled: this.hidden },  [Validators.required]),
      'fechaVigencia':          new FormControl({ value:this.usuario_salon.fechaVigencia,        disabled: this.hidden },  [Validators.required]), 
      'id_salon':               new FormControl({ value:this.usuario_salon.id_salon,             disabled: this.hidden },  [Validators.required]),
      'folio':                  new FormControl({ value:this.usuario_salon.folio,                disabled: this.hidden },  [Validators.required])
      
    });
  }
  get id_usuario_salon() { return this.usuario_salonForm.get('id_usuario_salon'); }
  get nombre()           { return this.usuario_salonForm.get('nombre'); }
  get certificacion()    { return this.usuario_salonForm.get('certificacion'); }
  get diasValidos()      { return this.usuario_salonForm.get('diasValidos'); }
  get asistencia()       { return this.usuario_salonForm.get('asistencia'); }
  get asisteciaFecha()   { return this.usuario_salonForm.get('asisteciaFecha'); }
  get aprobada()         { return this.usuario_salonForm.get('aprobada'); }
  get aprobadaFecha()    { return this.usuario_salonForm.get('aprobadaFecha'); }
  get fechaVigencia()    { return this.usuario_salonForm.get('fechaVigencia'); }
  get id_salon()         { return this.usuario_salonForm.get('id_salon'); }
  get folio()            { return this.usuario_salonForm.get('folio'); }



  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaSalones(){
    this.router.navigate(['calidad/salones/']);
  }
 toogleFalta(){
   this.falta=!this.falta;
 }
 mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.usuario_salonForm.controls).forEach((controlName) => {
        this.usuario_salonForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.usuario_salonForm.controls['id_salon']['disable']();
  }

  llenadoQRInfo(resp){
    this.cargando=this.cargando-1;
    console.log(resp);

      this.folioQR = resp.folio;
      this.prefijo = resp.prefijo;
      this.nombreQR= resp.nombre;
      this.curpNo = resp.curpNo;
      this.ocupacion = resp.ocupacion;
      this.puesto = resp.puesto;
      this.razonSocial = resp.razonSocial;
      this.rfc = resp.rfc;
      this.curso = resp.curso;
      this.horas = resp.hrs;
      this.periodoEje = resp.periodoEjecucion;
      this.areaTematica = resp.areaTematica;
      this.capacitador = resp.capacitador;
  }
  respuestaError(resp: any){
    this.cargando=this.cargando-1;
    console.log(resp);
    if(resp.error!=0){
      window.alert(resp.estatus);
      location.reload();
    }else{
      this.mostrar();
      //this.router.navigate(['calidad/salones/']);
    }
  }


  llenado(respuesta: any){
    console.log(respuesta);

    this.usuario_salonForm.patchValue({
      id_usuario_salon:respuesta.id_usuario_salon,
      nombre:          respuesta.nombre,
      certificacion:   respuesta.certificacion,
      diasValidos:     respuesta.diasValidos,
      asistencia:      respuesta.asistencia,
      asisteciaFecha:  respuesta.asisteciaFecha,
      aprobada:        respuesta.aprobada,
      aprobadaFecha:   respuesta.aprobadaFecha,
      fechaVigencia:   respuesta.fechaVigencia,
      id_salon:        respuesta.id_salon,
      folio:           respuesta.folio
    });
    this.qrFoto =  respuesta.qrFoto;
    this.doc    =  respuesta.doc;

    if(this.qrFoto=="null"){
      this.qrFotoIcon = "assets/img/missing.png";
    }else{
      this.qrFotoIcon =this.global.assetsRoot+this.qrFoto;
    }

    if(this.doc=="null"){
      this.docIcon = "assets/img/missing.png";
    }else{
      this.docIcon = "assets/img/doc.png";
    }
    
   this.active= respuesta.active;
   this.status(this.active);
   this.cargando=this.cargando-1;
   console.log("llenado this.cargando: "+this.cargando);
             
  }
 

  status(active: any){
    if (active == 1) {
     this.actBut = false;
     this.desBut = true;
    }else{
     this.actBut= true;
     this.desBut= false;
    }
  }
  abrirDoc(){
    if(this.doc=="null"){
      window.alert("No existe archivo para este empleado");
    }else{
      window.open(this.global.assetsRoot+this.doc, "_blank");
    }
  }

  subirDoc(docNo: any ){
    this.router.navigate(['calidad/insertar-comprobanteQR/'+this.id+'/'+docNo]);
  }

  desactivarHerramienta(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarHerramienta(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

   verHistorial(){
  this.His=!this.His;
  }

   switchHistorial(active: number){
     let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
       formData.append('function', 'activate');
      }
        formData.append('id_herramienta', this.id);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
       
   }

   switchActive(active: number){
     let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
       formData.append('function', 'activate');
      }
        formData.append('id_herramienta', this.id);
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
       //location.reload();
     }
   }

}
