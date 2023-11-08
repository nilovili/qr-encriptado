import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ArchivosService {
  private readonly basePath: string = path.join(__dirname, '../../../assets');

  leerArchivoTxt(nombreArchivo: string): string {
    const rutaCompleta = path.join(this.basePath, nombreArchivo);
    try {
      const contenido = fs.readFileSync(rutaCompleta, 'utf8');
      return contenido;
    } catch (error) {
      throw new Error('Error al leer el archivo: ' + error.message);
    }
  }
}
