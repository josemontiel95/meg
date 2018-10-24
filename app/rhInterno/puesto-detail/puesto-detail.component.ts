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

export class Password
{
  constructor(
    public password1: string, 
    public npassword: string, 

    ) {  }

}

@Component({
  selector: 'app-puesto-detail',
  templateUrl: './puesto-detail.component.html',
  styleUrls: ['./puesto-detail.component.css','../../loadingArrows.css']
})
export class PuestoDetailComponent implements OnInit {
  foto: string;

  puestosForm: FormGroup;

  Puesto = {
   id_puesto:'',
   puesto:'',
  }

  cargandoMessage: string= "";
  actualizarMessageCargando: string= "";

  submitted = false;
  hidden = true;
  cargando= 3;
  imgUrl = "";
  estatus: string;
  onSubmit() { this.submitted = true; }

  loginMessage: string= "";
  loginresp: LoginResp;
  global: Global;
  
  active;
  id: string;
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=1;

    let url = `${this.global.apiRoot}/puesto/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',            'getByIDAdmin');
    search.set('token',               this.global.token);
    search.set('rol_usuario_id',      this.global.rol);
    search.set('id_puesto',             this.id);
    this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
      this.llenadoValidator(res.json());
    });

    this.puestosForm = new FormGroup({
      'id_puesto':         new FormControl({ value:this.Puesto.id_puesto,    disabled: true },         [Validators.required]),         
      'puesto':            new FormControl({ value:this.Puesto.puesto,       disabled: this.hidden },  [Validators.required]), 
    });
  }

  get id_puesto()            { return this.puestosForm.get('id_puesto'); }
  get puesto()               { return this.puestosForm.get('puesto'); }


  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }



  regresaObra(){
    this.router.navigate(['recursosHumanos/puestos']);
  }

    toogleActive(){
    if(this.active){
      if(window.confirm("¿Seguro que deseas desactivar la empresa?")){
        this.toogleActiveCall("0");
      }else{
        
      }
    }else{
      if(window.confirm("¿Seguro que deseas activar la empresa?")){
        this.toogleActiveCall("1");
      }else{

      }
    }
  }
  toogleActiveCall(status){
    this.cargando= this.cargando + 1;
    let url = `${this.global.apiRoot}/puesto/post/endpoint.php`;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let formData:FormData = new FormData();
    formData.append('function',       'toogleActive');
    formData.append('rol_usuario_id', "1002");
    formData.append('token',          this.global.token);

    formData.append('id_puesto',     this.id);
    formData.append('status',         status);
    this.http.post(url, formData).subscribe(res => {
      this.toogleActiveCallValidator(res.json());
    });
  }
  toogleActiveCallValidator(respuesta: any){
    this.cargando= this.cargando - 1;
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      this.active=!this.active;
    }
  }

  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.puestosForm.controls).forEach((controlName) => {
        this.puestosForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.puestosForm.controls['id_puesto']['disable']();
  }


  actualizarObra(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/puesto/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',           'upDateAdmin');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);
    
    formData.append('id_puesto',         this.id);
    formData.append('puesto',            this.puestosForm.value.puesto);

    
    this.http.post(url, formData).subscribe(res => this.respuestaError(res.json()) );


  }


  respuestaError(resp: any){
    this.cargando=this.cargando-1;
    if(resp.error!=0){
      window.alert(resp.estatus);
      location.reload();
    }else{
      this.mostrar();
    }
    this.cargandoMessage="";
    this.actualizarMessageCargando=resp.estatus;
     setTimeout(()=>{ 
                     this.actualizarMessageCargando="";
                     }, 3500); 
  }


  llenado(respuesta: any){
    console.log("llenado :: respuesta:");
    console.log(respuesta);
    
    this.puestosForm.patchValue({
      id_puesto:          respuesta.id_puesto,
      puesto:             respuesta.puesto
    });

    if(respuesta.active==1){
      this.active=true;
    }else if(respuesta.active==0){
      this.active=false;
    }

    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }
    setTimeout(()=>{  
      this.cargando=this.cargando-1;
      console.log("llenado this.cargando: "+this.cargando);
    }, 0);
  }
  


}
