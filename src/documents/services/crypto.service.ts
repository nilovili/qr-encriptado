// crypto.service.ts
import { Injectable } from '@nestjs/common';
import * as forge from 'node-forge';

@Injectable()
export class CryptoService {
  private readonly privateKey: forge.pki.PrivateKey;
  private readonly publicKey: forge.pki.PublicKey;

  constructor() {
    // En un entorno de producción, deberías almacenar y cargar las claves de manera segura
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
  }

  signData(data: string): string {
    const md = forge.md.sha256.create();
    md.update(data, 'utf8');
    // Aserción de tipo para 'privateKey' como cualquier para evitar el error de TypeScript
    const signature = (this.privateKey as any).sign(md);
    return forge.util.encode64(signature);
  }

  getPublicKey(): string {
    return forge.pki.publicKeyToPem(this.publicKey);
  }
}
