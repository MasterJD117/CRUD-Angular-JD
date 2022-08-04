import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { faSquarePen, faTrash} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/Cliente';


@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  faSquarePen=faSquarePen;
  faTrash=faTrash;

  constructor(public clientesService: ClientesService,
              private toastr: ToastrService) { }
  ngOnInit(): void {
    this.clientesService.getClientes();
  }
  deleteCliente(id: string ) {
    this.clientesService.deleteCliente(id).subscribe(data => {
      this.toastr.warning('Registro Eliminado','El cliente ha sido eliminado');
      this.clientesService.getClientes();
    });
  }
  edit(cliente: Cliente){
    this.clientesService.update(cliente);
  }
}
