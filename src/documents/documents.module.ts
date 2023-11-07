import { Module } from '@nestjs/common';
import { DocumentsService } from './services/documents.service';
import { CryptoService } from './services/crypto.service';

import { DocumentsController } from './controller/documents.controller';
import { QRService } from './services/qr.service';

@Module({
  providers: [DocumentsService, CryptoService, QRService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
