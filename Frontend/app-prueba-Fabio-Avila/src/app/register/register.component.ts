import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ApiService } from './../service/api/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  newUser: Product = {
    id: 0, // Puedes dejarlo en 0 o asignar un valor según tu lógica
    usuario: '',
    clave: '',
    nombre_de_usuario: '',
    apellido_de_usuario: '',
    email: '',
    estadoUsuario: 'ACTIVO'
  };
  confirmPassword = '';

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  errorMessage: string = ''; // Variable para mostrar mensajes de error
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  successMessage: string = ''; // Variable para mostrar mensajes de éxito


  constructor(private apiService: ApiService) {}

  registerUser() {
    // Verifica si las contraseñas coinciden
    if (this.newUser.clave !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Llamada al servicio de la API para registrar al nuevo usuario
    this.apiService.registerUser(this.newUser).subscribe(
      response => {
        this.successMessage = 'Usuario registrado con éxito: ' + response.message;
        // Puedes realizar acciones adicionales después del registro, como redireccionar al usuario.
      },
      error => {
        this.errorMessage = 'Error al registrar usuario: ' + error.message;
        // Puedes mostrar un mensaje de error al usuario.
      }
    );
    
  }
}
