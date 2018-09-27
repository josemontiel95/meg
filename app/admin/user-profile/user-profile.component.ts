import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario }    from './Usuario';
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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css','../../loadingArrows.css']
})
export class UserProfileComponent implements OnInit {


    private gridApi;
    private gridColumnApi;
    rowSelection;
    columnDefs;
    rowData: any;
    mis_emp: Array<any>;
    mis_roles: Array<any>;
    hiddenMedica = true;

    foto: string;
    estatus: string;
    submitted = false;
    hidden = true;
    llenadoDone = false;
    mis_rolesActivos: Array<any>;
    mis_lab: Array<any>;
    mis_pm: Array<any>;
    imgUrl = "";
    cargando= 3;
    onSubmit() { this.submitted = true; }
    ine;
    licencia;
    curp;
    rfc;
    imss;
    contrato;
    ineIcon;
    licenciaIcon;
    curpIcon;
    rfcIcon;
    imssIcon;
    contratoIcon;

    userForm: FormGroup;

    medicCardForm: FormGroup;

    historial=false;

    Usuario= {
              id_usuario: '',
              rol_usuario_id: '',
              nombre: '',
              apellido: '',
              emailPersonal: '',
              emailCorporativo: '',
              curpNo: '',
              rfcNo: '',
              imssNo: '',
              pm_id: '',
              empresa_id: '',
              tipo: ''
            };

    MediCard= {
              tipoSangre: '',
              fechaDeNac: '',
              alergias: '',
              conEmerNombre: '',
              conEmerParentesco: '',
              conEmerTelefono: '',
              observacionesMedicas: ''
            };

  tipos = [{"tipo":"Externo", "id":"0"},{"tipo":"Interno", "id":"1"}];

  sangres = [{"tipo":"O−", "id":"0"},{"tipo":"O+", "id":"1"},{"tipo":"A−", "id":"3"},{"tipo":"A+", "id":"4"},{"tipo":"B−", "id":"5"},{"tipo":"B+", "id":"6"},{"tipo":"AB−", "id":"7"},{"tipo":"AB+", "id":"8"},{"tipo":"otra..", "id":"9"}];


    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    resppass= false;
    exitoCon = false;
    password1: string;
    npassword: string;
    id: string;
    size: number;
    rowClassRules;

  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { 
      this.columnDefs = [
      {headerName: 'Ctrl', field: 'id_certificaciones' },
      {headerName: 'Certificacion', field: 'certificacion' },
      {headerName: 'Aprobada', field: 'aprobada'},
      {headerName: 'Fecha de aprovaci&oacute;n', field: 'aprobadaFecha' },
      {headerName: 'Estado No', field: 'color' },
      {headerName: 'Fecha de Vigencia', field: 'fechaVigencia' },
      {headerName: 'Estado', field: 'estado' },
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
      }
    };
   }

  historialCompleto(){
    this.cargando=1;
    this.historial=true;
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getFullCertificacionesByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('id_usuario', this.id);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }
  historialActual(){
    this.cargando=1;
    this.historial=false;
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getCertificacionesByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('id_usuario', this.id);
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
  onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id_usuario_salon = "";
    var id_salon =  "";
    var certificacion = "";
    var active = "";

    selectedRows.forEach(function(selectedRow, index) {
      id_usuario_salon = selectedRow.id_usuario_salon;
      id_salon = selectedRow.id_salon;
      certificacion = selectedRow.certificacion;
      active = selectedRow.active;
    });
    if(this.historial){
      if(active=="1"){
        if(window.confirm("¿Estas seguro que quieres que el sistema ignore esta certificación?")){
          this.changeSalonUsuario_State(id_usuario_salon,active);
        }
      }else{
        if(window.confirm("¿Estas seguro que quieres que el sistema deje de ignorar esta certificación?")){
          this.changeSalonUsuario_State(id_usuario_salon,active);
        }
      }
    }else{
      // funcionalidad de redireccionar al perfil del salon
    }
   
    //this.displayShortDescription(id_ordenDeTrabajo, obra, nombre_jefe_brigada_id, actividades, condicionesTrabajo, fechaInicio, fechaFin, active,activeColor);
  }
  changeSalonUsuario_State(id_usuario_salon,active){
    let state = (active = 1) ? '0': '1';
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    this.cargando=1;
    formData.append('function',         'toggleActiveUsuarioSalon');
    formData.append('token',            this.global.token);
    formData.append('rol_usuario_id',   '1001');


    formData.append('id_usuario_salon', id_usuario_salon);
    formData.append('state',        state);

    this.http.post(url, formData).subscribe(res => this.respuestaToggle(res.json()) );
  }
  respuestaToggle(resp: any){
    this.cargando=this.cargando-1;
    if(resp.error!=0)
    {
      window.alert(resp.estatus);
      location.reload();
    }else{
      if(this.historial){
        let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
        let search = new URLSearchParams();
        search.set('function', 'getCertificacionesByID');
        search.set('token', this.global.token);
        search.set('rol_usuario_id', "1001");
        search.set('id_usuario', this.id);
        this.http.get(url, {search}).subscribe(res => {
                                                console.log(res.json());
                                                this.llenaTabla(res.json());
                                                this.gridApi.sizeColumnsToFit();
                                              });
      }else{
        let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
        let search = new URLSearchParams();
        search.set('function', 'getFullCertificacionesByID');
        search.set('token', this.global.token);
        search.set('rol_usuario_id', "1001");
        search.set('id_usuario', this.id);
        this.http.get(url, {search}).subscribe(res => {
                                                console.log(res.json());
                                                this.llenaTabla(res.json());
                                                this.gridApi.sizeColumnsToFit();
                                              });

      }
    }
  }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=4;

    let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });

    url = `${this.global.apiRoot}/empresa/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function',          'getForDroptdownAdmin');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaEmpresas(res.json());
                                                 });

    url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
     search = new URLSearchParams();
    search.set('function',          'getProjectManagersForDroptdown');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaPM(res.json());
                                                 });

    search = new URLSearchParams();
    search.set('function', 'getIDByToken');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
                                                 this.llenadoValidator(res.json());
                                               });

    this.userForm = new FormGroup({
      'id_usuario':          new FormControl( { value:this.Usuario.id_usuario,       disabled: true },         [Validators.required]), 
      'rol_usuario_id':      new FormControl( { value:this.Usuario.rol_usuario_id,   disabled: this.hidden },  [Validators.required]), 
      'nombre':              new FormControl( { value:this.Usuario.nombre,           disabled: this.hidden },  [Validators.required]), 
      'apellido':            new FormControl( { value:this.Usuario.apellido,         disabled: this.hidden },  [Validators.required]), 
      'emailPersonal':       new FormControl( { value:this.Usuario.emailPersonal,    disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]), 
      'emailCorporativo':    new FormControl( { value:this.Usuario.emailCorporativo, disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]), 
      'curpNo':              new FormControl( { value:this.Usuario.curpNo,           disabled: this.hidden },  [Validators.required]), 
      'rfcNo':               new FormControl( { value:this.Usuario.rfcNo,            disabled: this.hidden },  [Validators.required, Validators.pattern("^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))|^(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3})) ")]),
      'imssNo':              new FormControl( { value:this.Usuario.imssNo,           disabled: this.hidden },  [Validators.required]), 
      'pm_id':               new FormControl( { value:this.Usuario.pm_id,            disabled: this.hidden },  [Validators.required]), 
      'empresa_id':          new FormControl( { value:this.Usuario.empresa_id,       disabled: this.hidden },  [Validators.required]), 
      'tipo':                new FormControl( { value:this.Usuario.tipo,             disabled: this.hidden },  [Validators.required])
    });

    this.medicCardForm = new FormGroup({
      'tipoSangre':          new FormControl( { value:this.MediCard.tipoSangre,           disabled: this.hidden },  [Validators.required]), 
      'fechaDeNac':          new FormControl( { value:this.MediCard.fechaDeNac,           disabled: this.hidden },  [Validators.required]), 
      'alergias':            new FormControl( { value:this.MediCard.alergias,             disabled: this.hidden }), 
      'conEmerNombre':       new FormControl( { value:this.MediCard.conEmerNombre,        disabled: this.hidden },  [Validators.required]), 
      'conEmerParentesco':   new FormControl( { value:this.MediCard.conEmerParentesco,    disabled: this.hidden },  [Validators.required]), 
      'conEmerTelefono':     new FormControl( { value:this.MediCard.conEmerTelefono,      disabled: this.hidden },  [Validators.required, Validators.pattern("^([0-9])*$")]), 
      'observacionesMedicas':new FormControl( { value:this.MediCard.observacionesMedicas, disabled: this.hidden })
    });
  }

  //userForm
  get id_usuario()       { return this.userForm.get('id_usuario'); }
  get rol_usuario_id()   { return this.userForm.get('rol_usuario_id'); }
  get nombre()           { return this.userForm.get('nombre'); }
  get apellido()         { return this.userForm.get('apellido'); }
  get emailPersonal()    { return this.userForm.get('emailPersonal'); }
  get emailCorporativo() { return this.userForm.get('emailCorporativo'); }
  get curpNo()           { return this.userForm.get('curpNo'); }
  get rfcNo()            { return this.userForm.get('rfcNo'); }
  get imssNo()           { return this.userForm.get('imssNo'); }
  get pm_id()            { return this.userForm.get('pm_id'); }
  get empresa_id()       { return this.userForm.get('empresa_id'); }
  get tipo()             { return this.userForm.get('tipo'); }

  //medicCardForm
  get tipoSangre()           { return this.medicCardForm.get('tipoSangre'); }
  get fechaDeNac()           { return this.medicCardForm.get('fechaDeNac'); }
  get alergias()             { return this.medicCardForm.get('alergias'); }
  get conEmerNombre()        { return this.medicCardForm.get('conEmerNombre'); }
  get conEmerParentesco()    { return this.medicCardForm.get('conEmerParentesco'); }
  get conEmerTelefono()      { return this.medicCardForm.get('conEmerTelefono'); }
  get observacionesMedicas() { return this.medicCardForm.get('observacionesMedicas'); }


  llenaEmpresas(resp: any){
    this.mis_emp= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_emp[_i]=resp[_i];

    }
    console.log(this.mis_emp);
    this.cargando=this.cargando-1;
  }

  llenaPM(resp: any){
    this.mis_pm= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_pm[_i]=resp[_i];

    }
    console.log(this.mis_pm);
    this.cargando=this.cargando-1;
  }

  rolValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  llenadoValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  llenaRoles(resp: any){
        console.log(resp);
      this.mis_roles= new Array(resp.length);
      var j=resp.length-1;
      for (var _i = 0; _i < resp.length; _i++ )
      {
        this.mis_roles[_i]=resp[j];
        j--;
      }
      this.cargando=this.cargando-1;
      console.log("llenaTipos this.cargando: "+this.cargando);
    }

  llenaLaboratorio(resp: any){
       console.log(resp);

      this.mis_lab= new Array(resp.length);
      for (var _i = 0; _i < resp.length; _i++ )
      {
        this.mis_lab[_i]=resp[_i];
      }
      this.cargando=this.cargando-1;
      console.log("llenaTipos this.cargando: "+this.cargando);
  }

  regresaUsuario(){
    this.router.navigate(['administrador/usuarios']);
  }


  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.userForm.controls).forEach((controlName) => {
        this.userForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.userForm.controls['id_usuario']['disable']();
  }
  mostrarFichaMedica(){
    this.hiddenMedica = !this.hiddenMedica;
    const state = this.hiddenMedica ? 'disable' : 'enable';

    Object.keys(this.medicCardForm.controls).forEach((controlName) => {
        this.medicCardForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
  }


  actualizarUsuario(){
    let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
    let formData:FormData = new FormData();
    this.cargando=1;
    formData.append('function',         'upDateAdmin');
    formData.append('token',            this.global.token);
    formData.append('rol_usuario_id',   '1001');

    formData.append('id_usuario',        this.userForm.getRawValue().id_usuario);
    formData.append('new_rol_usuario_id',this.userForm.value.rol_usuario_id);
    formData.append('nombre',            this.userForm.value.nombre);
    formData.append('apellido',          this.userForm.value.apellido);
    formData.append('emailPersonal',     this.userForm.value.emailPersonal);
    formData.append('emailCorporativo',  this.userForm.value.emailCorporativo);
    formData.append('curpNo',            this.userForm.value.curpNo);
    formData.append('rfcNo',             this.userForm.value.rfcNo);
    formData.append('imssNo',            this.userForm.value.imssNo);
    formData.append('pm_id',             this.userForm.value.pm_id);
    formData.append('empresa_id',        this.userForm.value.empresa_id);
    formData.append('tipo',              this.userForm.value.tipo);

    this.http.post(url, formData).subscribe(res => this.respuestaError(res.json()) );
  }

  actualizarCartaMedica(){
    let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
    let formData:FormData = new FormData();
    this.cargando=1;

    formData.append('function',              'upDateAdminMediCard');
    formData.append('token',                 this.global.token);
    formData.append('rol_usuario_id',        '1001');

    formData.append('id_usuario',            this.userForm.value.id_usuario);
    formData.append('tipoSangre',            this.medicCardForm.value.tipoSangre);
    formData.append('fechaDeNac',            this.medicCardForm.value.fechaDeNac);
    formData.append('alergias',              this.medicCardForm.value.alergias);
    formData.append('conEmerNombre',         this.medicCardForm.value.conEmerNombre);
    formData.append('conEmerParentesco',     this.medicCardForm.value.conEmerParentesco);
    formData.append('conEmerTelefono',       this.medicCardForm.value.conEmerTelefono);
    formData.append('observacionesMedicas',  this.medicCardForm.value.observacionesMedicas);

    this.http.post(url, formData).subscribe(res => this.respuestaErrorMedi(res.json()) );
  }

  respuestaError(resp: any){
    this.cargando=this.cargando-1;
    if(resp.error!=0)
    {
      window.alert(resp.estatus);
      location.reload();
    }
    else
    {
      this.mostrar();
      //location.reload();
    }
  }
  respuestaErrorMedi(resp: any){
    this.cargando=this.cargando-1;
    if(resp.error!=0)
    {
      window.alert(resp.estatus);
      location.reload();
    }
    else
    {
      this.mostrarFichaMedica();
      //location.reload();
    }
  }


  subirFoto(){
    this.router.navigate(['administrador/insertar-foto/'+this.id]);
  }

  subirDoc(docNo: any ){
    this.router.navigate(['administrador/insertar-documento/'+this.id+'/'+docNo]);
  }

  llenado(respuesta: any){
    console.log(respuesta);
    this.id=respuesta.id_usuario;
    this.userForm.patchValue({
      id_usuario:        respuesta.id_usuario,
      rol_usuario_id:    respuesta.rol_usuario_id,
      nombre:            respuesta.nombre,
      apellido:          respuesta.apellido,
      emailPersonal:     respuesta.emailPersonal,
      emailCorporativo:  respuesta.emailCorporativo,
      curpNo:            respuesta.curpNo,
      rfcNo:             respuesta.rfcNo,
      imssNo:            respuesta.imssNo,
      pm_id:             respuesta.pm_id,
      empresa_id:        respuesta.empresa_id,
      tipo:              respuesta.tipo,
    });
    this.medicCardForm.patchValue({
      tipoSangre:            respuesta.tipoSangre,
      fechaDeNac:            respuesta.fechaDeNac,
      alergias:              respuesta.alergias,
      conEmerNombre:         respuesta.conEmerNombre,
      conEmerParentesco:     respuesta.conEmerParentesco,
      conEmerTelefono:       respuesta.conEmerTelefono,
      observacionesMedicas:  respuesta.observacionesMedicas
    });
    this.ine =       respuesta.ine;
    this.licencia =  respuesta.licencia;
    this.curp =      respuesta.curp;
    this.rfc =       respuesta.rfc;
    this.imss =      respuesta.imss;
    this.contrato =  respuesta.contrato;

    if(this.ine=="null"){
      this.ineIcon = "assets/img/missing.png";
    }else{
      this.ineIcon = "assets/img/doc.png";
    }

    if(this.licencia=="null"){
      this.licenciaIcon = "assets/img/missing.png";
    }else{
      this.licenciaIcon = "assets/img/doc.png";
    }

    if(this.curp=="null"){
      this.curpIcon = "assets/img/missing.png";
    }else{
      this.curpIcon = "assets/img/doc.png";
    }

    if(this.rfc=="null"){
      this.rfcIcon = "assets/img/missing.png";
    }else{
      this.rfcIcon = "assets/img/doc.png";
    }

    if(this.imss=="null"){
      this.imssIcon = "assets/img/missing.png";
    }else{
      this.imssIcon = "assets/img/doc.png";
    }

    if(this.contrato=="null"){
      this.contratoIcon = "assets/img/missing.png";
    }else{
      this.contratoIcon = "assets/img/doc.png";
    }




    if(respuesta.isRolActive==0){
      this.addRol(respuesta.rol_usuario_id,respuesta.rol);
    }
    if(respuesta.isLaboratorioActive==0){
      this. addLabs(respuesta.laboratorio_id, respuesta.laboratorio );
    }
    this.id = respuesta.id_usuario; //De aqui sacamos id para parametrisarlo en el método subirFoto.
    console.log(respuesta.foto);
    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }
    else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }
    this.cargando=this.cargando-1;
    this.llenadoDone=true;
  }

  addRol(rol_usuario_id: any,rol: any){
    let aux= new Array(this.mis_roles.length+1);

    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_roles[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_rol_usuario':rol_usuario_id,'rol':"*Desactivado*"+rol+"*Desactivado*"};
      }
    }
    this.mis_roles= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_roles[_i]=aux[_i];
    }
  }
  abrirINE(){
    if(this.ine=="null"){

    }else{
      window.open(this.global.assetsRoot+this.ine, "_blank");
    }
  }
  abrirLicencia(){
    if(this.licencia=="null"){
      window.alert("No existe archivo para este empleado");
    }else{
      window.open(this.global.assetsRoot+this.licencia, "_blank");
    }
  }
  abrirCURP(){
    if(this.curp=="null"){
      window.alert("No existe archivo para este empleado");
    }else{
      window.open(this.global.assetsRoot+this.curp, "_blank");
    }
  }
  abrirRFC(){
    if(this.rfc=="null"){
      window.alert("No existe archivo para este empleado");
    }else{
      window.open(this.global.assetsRoot+this.rfc, "_blank");
    }
  }
  abrirIMSS(){
    if(this.imss=="null"){
      window.alert("No existe archivo para este empleado");
    }else{
      window.open(this.global.assetsRoot+this.imss, "_blank");
    }
  }
  abrirContrato(){
    if(this.contrato=="null"){
      window.alert("No existe archivo para este empleado");
    }else{
      window.open(this.global.assetsRoot+this.contrato, "_blank");
    }
  }
  
  addLabs(laboratorio_id: any,laboratorio: any){
    let aux= new Array(this.mis_lab.length+1);

    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_lab[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_laboratorio':laboratorio_id,'laboratorio':"*Desactivado*"+laboratorio+"*Desactivado*"};
      }
    }
    this.mis_lab= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_lab[_i]=aux[_i];
    }
  }
}
