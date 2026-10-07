import { Service } from '@angular/core';
import { Vehiculo } from '../Interface/vehiculo';

@Service()
export class VehiculoService {
  private listaVehiculos: Vehiculo[] = [
    {
      nombre: 'Sedán Confort',
      imagen: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
      precio: 72000,
      marca: 'AutoMax',
      modelo: 'Confort',
      anio: 2025,
      categoria: 'Sedanes',
      descripcion: 'Vehículo para la ciudad. Cuenta con cinco asientos, aire acondicionado, cámara de retroceso y transmisión automática.'
    },
    {
      nombre: 'SUV Familiar',
      imagen: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80',
      precio: 112000,
      marca: 'AutoMax',
      modelo: 'Adventure',
      anio: 2026,
      categoria: 'SUV',
      descripcion: 'Espacio para toda la familia. Incluye maletera amplia, pantalla multimedia, sensores de estacionamiento y seis airbags.'
    },
    {
      nombre: 'Camioneta Trabajo',
      imagen: 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=80',
      precio: 135000,
      marca: 'AutoMax',
      modelo: 'Force',
      anio: 2025,
      categoria: 'Camionetas',
      descripcion: 'Camioneta de doble cabina para trabajo y viajes. Cuenta con tracción 4x4, motor diésel y una amplia zona de carga.'
    },
    {
      nombre: 'Deportivo Sport',
      imagen: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
      precio: 198000,
      marca: 'AutoMax',
      modelo: 'Sport',
      anio: 2026,
      categoria: 'Deportivos',
      descripcion: 'Diseño deportivo con motor turbo, asientos deportivos, transmisión automática y modos de conducción.'
    }
  ]

  guardar(vehiculo: Vehiculo) {
    this.listaVehiculos.push(vehiculo)
  }

  mostrar() {
    return this.listaVehiculos
  }
}