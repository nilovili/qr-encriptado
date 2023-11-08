// documents.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { DocumentsService } from '../services/documents.service';
import { ArchivosService } from '../services/archivos.service';

@Controller('documents')
export class DocumentsController {
  constructor(
    private documentsService: DocumentsService,
    private archivosService: ArchivosService,
  ) {}

  @Get('generate')
  async generateDocument(@Res() res: Response) {
    const userData = {
      identityCard: '1234567890',
      name: 'NILO SORUCO',
      // ...otros datos del usuario
    };
    try {
      const documentBuffer =
        await this.documentsService.generateDocument(userData);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="report.pdf"`);
      res.send(documentBuffer);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al generar el documento.');
    }
  }

  @Get(':nombreArchivo')
  leerArchivo(@Param('nombreArchivo') nombreArchivo: string): string {
    return this.archivosService.leerArchivoTxt(nombreArchivo);
  }
}
