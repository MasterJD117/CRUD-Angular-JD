import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  Url = 'https://localhost:5001/';
  Api = 'api/clientes/';
  list: Cliente[] = [];
  private updateFormulario =new BehaviorSubject<Cliente>({} as any);
  constructor(private http: HttpClient) { }

  postClient(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.Url + this.Api, cliente);
  }
  getClientes(){
    return this.http.get(this.Url + this.Api).toPromise()
    .then(data => {
      this.list = data as Cliente[];
      return;
    });
  }
  deleteCliente(id: string): Observable<Cliente>{
    return this.http.delete<Cliente>(this.Url + this.Api + id);
  }

  getCliente(){
    this.http.get(this.Url + this.Api).toPromise()
      .then(data => {
        this.list = data as Cliente[];
      });
  }
  updateCliente(id: string, cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(this.Url + this.Api + id, cliente);
  }
  update(cliente: Cliente){
    this.updateFormulario.next(cliente)
  }
  getCliente$(): Observable<Cliente>{
    return this.updateFormulario.asObservable();
  }
}
