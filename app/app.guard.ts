import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from "./data.service";
import { Global } from "./interfaces/int.Global";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {
    Routes,
    RouterModule,
    Router,
    ActivatedRoute,
    CanActivate,
    CanActivateChild,
    CanDeactivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AppGuard implements OnInit, CanActivateChild{
	global: Global;
	constructor(private data: DataService, private http: Http) { }

	ngOnInit() {
    	
	}

	canActivateChild(){
		this.data.currentGlobal.subscribe(global => this.global = global);
		let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
      	let search = new URLSearchParams();
      	search.set('function', 'validateSesion');
      	search.set('token', this.global.token);
      	search.set('rol_usuario_id', this.global.rol );
      	return this.http.get(url, {search}).map(res=>{
      				console.log(res.json().estatus);
			       	if ( res.json().error === 0 ) return true;
			       	return false;
			    });
	}


}
