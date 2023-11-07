// documents.service.ts
import { Injectable } from '@nestjs/common';
import { PDFDocument, rgb } from 'pdf-lib';
import { QRService } from './qr.service';

@Injectable()
export class DocumentsService {
  constructor(private qrService: QRService) {}

  async generateDocument(userData: any): Promise<Buffer> {
    // Generar el QR code como imagen
    const dataToSign = `Cédula: ${userData.identityCard}, Nombre: ${userData.name}`;
    const qrCodeBase64 =
      await this.qrService.generateSignedQRBase64(dataToSign);

    // Asegúrate de eliminar el prefijo de datos si está presente en el base64
    const qrCodeData = qrCodeBase64.split(',')[1] || qrCodeBase64;

    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Añadir una página al documento
    const page = pdfDoc.addPage();

    // Decodificar el QR de Base64 a un Uint8Array
    const qrImage = Buffer.from(qrCodeData, 'base64');

    // Insertar el código QR en el PDF
    const qrImageEmbed = await pdfDoc.embedPng(qrImage);
    const qrImageDims = qrImageEmbed.scale(1); // Ajustar la escala si es necesario

    // Posicionar el código QR en la página
    page.drawImage(qrImageEmbed, {
      x: page.getWidth() / 2 - qrImageDims.width / 2,
      y: page.getHeight() / 2 - qrImageDims.height / 2,
      width: qrImageDims.width,
      height: qrImageDims.height,
    });

    // Añadir texto o lo que sea necesario en tu PDF
    page.drawText(`Documento de ${userData.name}`, {
      x: 50,
      y: page.getHeight() - 50,
      size: 12,
      color: rgb(0, 0, 0),
    });

    // Serializar el PDFDocument a bytes
    const pdfBytes = await pdfDoc.save();

    // Convertir el Uint8Array a Buffer
    return Buffer.from(pdfBytes);
  }
}
