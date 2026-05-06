import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE, // 'gmail'
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_PASSWORD,
    },
  });

  async sendMatchNotification(foundPet: any, mapUrl: string) {
    const mailOptions = {
      from: `"PetRadar Notificaciones" <${envs.MAILER_EMAIL}>`,
      to: envs.MAILER_EMAIL, 
      subject: '¡ALERTA! Posible coincidencia de mascota en PetRadar',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2c3e50;">¡Hemos encontrado una mascota cerca de tu zona!</h2>
          
          <h3 style="color: #16a085;">a) Datos de la mascota encontrada:</h3>
          <ul>
            <li><strong>Especie:</strong> ${foundPet.species || foundPet.title || 'No especificada'}</li>
            <li><strong>Raza:</strong> ${foundPet.breed || 'No identificada'}</li>
            <li><strong>Color:</strong> ${foundPet.color || 'No especificado'}</li>
            <li><strong>Descripción:</strong> ${foundPet.description || 'Sin descripción'}</li>
          </ul>

          <h3 style="color: #16a085;">b) Datos de contacto del Finder:</h3>
          <ul>
            <li><strong>Nombre:</strong> ${foundPet.finder_name || 'No especificado'}</li>
            <li><strong>Email:</strong> ${foundPet.finder_email || 'No especificado'}</li>
            <li><strong>Teléfono:</strong> ${foundPet.finder_phone || 'No especificado'}</li>
          </ul>

          <h3 style="color: #16a085;">c) Mapa de Ubicaciones:</h3>
          <p>Punto Rojo (Perdida) - Punto Verde (Encontrada)</p>
          <img src="${mapUrl}" alt="Mapa de PetRadar" style="max-width: 100%; border-radius: 8px; border: 1px solid #ccc;"/>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('¡Correo enviado con éxito!');
    } catch (error) {
      console.error('Error enviando el correo:', error);
    }
  }
}
