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

export class Concretera
{
  constructor(
    public id_concretera: string,
    public concreteras: string,
    public active: string
    ) {  }

} 


@Component({
  selector: 'app-concretera-detail',
  templateUrl: './concretera-detail.component.html',
  styleUrls: ['./concretera-detail.component.css','../../loadingArrows.css']
})
export class ConcreteraDetailComponent implements OnInit {

 
    estatus: string;
    error: string;
    cargando= 1;
    active: any;
    submitted = false;
    hidden = true;
    onSubmit() { this.submitted = true; }

    cargandoMessage: string= "";
    actualizarMessageCargando: string= "";

    global: Global;
    desBut=true;
    actBut=false;
    resppass= false;
    exitoCon = false;
    password1: string;
    npassword: string;
    id: string;

    concreteraForm: FormGroup;

    model= new Concretera(
    "", "", "");


      Concretera = {
        id_concretera: '',
        concretera:'' }
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=1;

    let url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_concretera', this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

    this.concreteraForm = new FormGroup({
      'id_concretera': new FormControl({ value:this.Concretera.id_concretera, disabled: this.hidden},  [Validators.required]), 
      'concretera':    new FormControl({ value:this.Concretera.concretera, disabled: this.hidden },    [Validators.required]),
    });

  }

    get id_concretera() { return this.concreteraForm.get('id_concretera'); }

    get concretera() { return this.concreteraForm.get('concretera'); }

  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaConcreteras(){
    this.router.navigate(['administrador/concretera']);
  }


   mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.concreteraForm.controls).forEach((controlName) => {
        this.concreteraForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    
    this.concreteraForm.controls['id_concretera']['disable']();
  }

  actualizarConcretera(){
    this.cargando=1;
    this.cargandoMessage="Cargando..."
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/concretera/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_concretera', this.id);
    formData.append('concretera', this.concreteraForm.value.concretera);

    this.http.post(url, formData).subscribe(res =>  {
                                              this.respuestaError(res.json());
                                            } );

  }


  respuestaError(resp: any){
    console.log("respuestaError this.cargando: "+this.cargando);
    this.cargando=this.cargando-1;
    console.log(resp);
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
    this.cargando=this.cargando-1;
    console.log(respuesta);
     this.concreteraForm.patchValue({
      id_concretera: respuesta.id_concretera,
      concretera: respuesta.concretera
    });
    this.status(this.active);
     
    setTimeout(()=>{
                     
                     }, 1000);  
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

  desactivarConcretera(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }
  
  activarConcretera(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

  switchActive(active: number){
    let url = `${this.global.apiRoot}/concretera/post/endpoint.php`;
    let formData:FormData = new FormData();

    if(active == 0){
      formData.append('function', 'deactivate');
    }
    else{
      formData.append('function', 'activate');
    }
    formData.append('id_concretera', this.id);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('token', this.global.token);
    this.http.post(url, formData).subscribe(res => {
                                          this.respuestaSwitch(res.json());
                                        });
       
   }
   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       location.reload();
     }
   }

}
