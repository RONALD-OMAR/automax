import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Vehiculo } from '../../Interface/vehiculo';
import {
  form,
  min,
  max,
  required,
  FormField
} from '@angular/forms/signals';
import { VehiculoService } from '../../services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  imports: [FormField, CurrencyPipe],
  selector: 'app-automax',
  styleUrl: './automax.css',
  templateUrl: './automax.html',
})
export class Automax {
  private vehiculoService = inject(VehiculoService)

  listaVehiculos: Vehiculo[] = []

  categorias: string[] = [
    'Sedanes',
    'SUV',
    'Camionetas',
    'Deportivos'
  ]

  categoriaSeleccionada = signal('Todos')

  vehiculoModelo = signal<Vehiculo>({
    nombre: '',
    imagen: '',
    precio: 0,
    marca: '',
    modelo: '',
    anio: 2026,
    categoria: '',
    descripcion: ''
  })

  vehiculoFormulario = form(this.vehiculoModelo, (esquema) => {
    required(esquema.nombre, {
      message: 'El nombre del vehículo es obligatorio'
    })

    required(esquema.imagen, {
      message: 'El enlace de la imagen es obligatorio'
    })

    required(esquema.precio, {
      message: 'El precio es obligatorio'
    })

    min(esquema.precio, 1, {
      message: 'El precio debe ser mayor que cero'
    })

    required(esquema.marca, {
      message: 'La marca es obligatoria'
    })

    required(esquema.modelo, {
      message: 'El modelo es obligatorio'
    })

    required(esquema.anio, {
      message: 'El año es obligatorio'
    })

    min(esquema.anio, 1900, {
      message: 'El año mínimo es 1900'
    })

    max(esquema.anio, 2027, {
      message: 'El año máximo es 2027'
    })

    required(esquema.categoria, {
      message: 'Selecciona una categoría'
    })

    required(esquema.descripcion, {
      message: 'Las características son obligatorias'
    })
  })

  constructor() {
    this.mostrarVehiculos()
  }

  guardarVehiculo(evento: Event) {
    evento.preventDefault()

    if (this.vehiculoFormulario().invalid()) {
      Swal.fire({
        title: 'Revisa el formulario',
        text: 'Completa correctamente los datos del vehículo.',
        icon: 'warning',
        confirmButtonColor: '#dc3545'
      })
      return
    }

    let vehiculo: Vehiculo = {
      nombre: this.vehiculoModelo().nombre.trim(),
      imagen: this.vehiculoModelo().imagen.trim(),
      precio: this.vehiculoModelo().precio,
      marca: this.vehiculoModelo().marca.trim(),
      modelo: this.vehiculoModelo().modelo.trim(),
      anio: this.vehiculoModelo().anio,
      categoria: this.vehiculoModelo().categoria,
      descripcion: this.vehiculoModelo().descripcion.trim()
    }

    if (
      vehiculo.nombre === '' ||
      vehiculo.marca === '' ||
      vehiculo.modelo === '' ||
      vehiculo.descripcion === '' ||
      vehiculo.imagen === ''
    ) {
      Swal.fire({
        title: 'Datos incompletos',
        text: 'Los campos no pueden contener solamente espacios.',
        icon: 'warning',
        confirmButtonColor: '#dc3545'
      })
      return
    }

    if (
      !vehiculo.imagen.startsWith('https://') &&
      !vehiculo.imagen.startsWith('http://')
    ) {
      Swal.fire({
        title: 'Revisa la imagen',
        text: 'Coloca un enlace de imagen que empiece con https:// o http://.',
        icon: 'warning',
        confirmButtonColor: '#dc3545'
      })
      return
    }

    if (!Number.isInteger(vehiculo.anio)) {
      Swal.fire({
        title: 'Revisa el año',
        text: 'El año debe ser un número entero.',
        icon: 'warning',
        confirmButtonColor: '#dc3545'
      })
      return
    }

    this.vehiculoService.guardar(vehiculo)
    this.mostrarVehiculos()
    this.categoriaSeleccionada.set('Todos')
    this.limpiar()

    Swal.fire({
      title: 'Vehículo registrado',
      text: 'El vehículo se agregó correctamente al catálogo.',
      icon: 'success',
      confirmButtonColor: '#dc3545'
    })
  }

  mostrarVehiculos() {
    this.listaVehiculos = this.vehiculoService.mostrar()
  }

  filtrarCategoria(categoria: string) {
    this.categoriaSeleccionada.set(categoria)
  }

  verDetalles(vehiculo: Vehiculo) {
    Swal.fire({
      title: vehiculo.nombre,
      text: vehiculo.descripcion,
      imageUrl: vehiculo.imagen,
      imageAlt: vehiculo.nombre,
      imageWidth: 420,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#dc3545'
    })
  }

  consultarPromocion() {
    Swal.fire({
      title: 'Promoción de demostración',
      text: 'En este proyecto académico, la promoción incluye un mantenimiento básico de cortesía para vehículos seleccionados. No constituye una oferta comercial real.',
      icon: 'info',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#dc3545'
    })
  }

  limpiar() {
    this.vehiculoFormulario().reset({
      nombre: '',
      imagen: '',
      precio: 0,
      marca: '',
      modelo: '',
      anio: 2026,
      categoria: '',
      descripcion: ''
    })
  }
}