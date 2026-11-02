import { Component } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

interface Persona {
id:number;
dni:string;
nombre:string;
fechaNacimiento:string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-persona',
  styleUrl: './persona.css',
  templateUrl: './persona.html',
})

export class PersonaComponent {
personas: Persona[]=[];

dni = '';
nombre = '';
fechaNacimiento = '';
indiceEditar = -1;

constructor(private router: Router){
if(localStorage.getItem('SesionBasica') !== 'si'){
  this.router.navigate(['/login']);
  return;
}
  const datos = localStorage.getItem('PersonasBasico');
  if (datos != null){
    this.personas = JSON.parse(datos);
  }
}

cerrarSesion()
{
  localStorage.removeItem('SesionBasico');
  this.router.navigate(['/login]']);
  return;
}

guardar()
{
  if(this.dni.trim() === '' || this.nombre.trim() === '' || this.fechaNacimiento === ''){
    alert('Complete los 3 campos');
    return;
  }
  if(this.indiceEditar === -1){
    let nuevoId = 1;
    for(const persona of this.personas){
      if(persona.id >= nuevoId){
        nuevoId = persona.id + 1;
      }
    }

    const nuevaPersona: Persona = {
      id: nuevoId,
      dni: this.dni.trim(),
      nombre: this.nombre.trim(),
      fechaNacimiento: this.fechaNacimiento,
    }

    this.personas.push(nuevaPersona);
    this.guardarLocalStorage();
    this.limpiar();
  }else{
    this.personas[this.indiceEditar].dni = this.dni.trim();
    this.personas[this.indiceEditar].nombre = this.nombre.trim();
    this.personas[this.indiceEditar].fechaNacimiento = this.fechaNacimiento;

  }
}

editar(indice:number)
{
  this.indiceEditar = indice;
  this.dni = this.personas[indice].dni;
  this.nombre = this.personas[indice].nombre;
  this.fechaNacimiento = this.personas[indice].fechaNacimiento;
}

eliminar(indice:number)
{}

limpiar()
{
  this.dni = '';
  this.nombre = '';
  this.fechaNacimiento = '';
  this.indiceEditar = -1;
}

guardarLocalStorage()
{
  localStorage.setItem('PersonasBasico', JSON.stringify(this.personas));
}

}
