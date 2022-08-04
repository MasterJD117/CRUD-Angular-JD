import { Component, OnDestroy, OnInit } from '@angular/core';
import { faUser, faPhone, faEnvelope, faCity, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';
import { Cliente } from '../../../models/Cliente';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro-clientes',
  templateUrl: './registro-clientes.component.html',
  styleUrls: ['./registro-clientes.component.css']
})
export class RegistroClientesComponent implements OnInit, OnDestroy {

  faUser = faUser;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faCity = faCity;
  faUserPlus = faUserPlus;

  form: FormGroup;
  suscription: Subscription | undefined;
  cliente: Cliente | undefined;
  idCliente!: string;

  constructor(private formBuilder: FormBuilder,
              private clienteService: ClientesService,
              private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      id: "",
      name: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      city: ['',[Validators.required]],
      phone: ['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ['',[Validators.required, Validators.email]]
    });
   }

  ngOnInit(): void {
    this.suscription = this.clienteService.getCliente$().subscribe(data => {
      console.log(data);
      this.cliente = data;
      this.form.patchValue({
        name:this.cliente.name,
        lastName:this.cliente.lastName,
        city:this.cliente.city,
        phone:this.cliente.phone,
        email:this.cliente.email
      });
      this.idCliente = this.cliente.id!;
    });
  }
  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  submit() {
    if(this.idCliente == "" || this.idCliente == null) {
      this.add();
    } else {
      this.edit();
    }
  }

  add() {
    const cliente: Cliente = {
      name: this.form.get('name')?.value,
      lastName: this.form.get('lastName')?.value,
      city: this.form.get('city')?.value,
      phone: this.form.get('phone')?.value,
      email: this.form.get('email')?.value
    }
    this.clienteService.postClient(cliente).subscribe(() => {
      this.toastr.success("Hecho", "Cliente Agregado con exito");
      this.clienteService.getClientes();
      this.form.reset();
    });
  }

  edit(){
    const cliente: Cliente = {
      id: this.cliente?.id,
      name: this.form.get('name')?.value,
      lastName: this.form.get('lastName')?.value,
      city: this.form.get('city')?.value,
      phone: this.form.get('phone')?.value,
      email: this.form.get('email')?.value
    }
    this.clienteService.updateCliente(this.idCliente, cliente).subscribe(data => {
      this.toastr.info("Registro Actualizado", "El Cliente fue actualizado");
      this.clienteService.getClientes();
      this.form.reset();
      this.idCliente = "";
    });
  }
}
