import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }
  delete(cliente: Cliente): void {
    this.swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(c => c!== cliente)
            this.swalWithBootstrapButtons.fire(
              'Borrado!',
              `El cliente ${cliente.nombre} ${cliente.apellido} ha sido borrado.`,
              'success'
            )
          }
        )
      }
    })
  }
}
