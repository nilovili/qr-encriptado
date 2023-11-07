// qr.service.ts
import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { CryptoService } from './crypto.service';

@Injectable()
export class QRService {
  constructor(private cryptoService: CryptoService) {}

  async generateSignedQRBase64(data: string): Promise<string> {
    const signature = this.cryptoService.signData(data);
    // Puedes incluir más datos si es necesario
    const qrData = JSON.stringify({ data, signature });
    return QRCode.toDataURL(qrData);
  }
}
