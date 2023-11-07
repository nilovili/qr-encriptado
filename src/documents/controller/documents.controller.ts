// documents.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { DocumentsService } from '../services/documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

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
}
