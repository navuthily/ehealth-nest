import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { join } from 'path';
import { AppModule } from './app.module';
// var serviceAccount = require('../../nhaxe.json');
// require('dotenv').config()

async function bootstrap(): Promise<NestFastifyApplication> {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: false },
  );

  app.useStaticAssets({
    root: join(__dirname, '../../../../../../', 'public'),
    prefix: '/',
  });

  // app
  //   .getHttpAdapter()
  //   .getInstance()
  //   .addHook('onRoute', (opts) => {
  //     console.log(opts.url);
  //   });
  // app.useGlobalInterceptors(new LoggingInterceptor());
  const serviceAccount: ServiceAccount = {
    // type: "service_account",
    projectId: 'nhaxe-b3567',
    // "private_key_id": "b838f321499fc08f85679c09169e61a35c1da137",
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDaxjCLJc6isyqH\n4S/WJ77Y3YECYlXgd//cUqiR8lZK/PsB9gX5BzBwR/MNXl9OHZvnF2hbQcvyth+Z\nE5ZG4gtj6QMY4UoCKYIwkjrHSngBN3q1GDGaZ+WEnoF384BANvHeetlLgY4tAkOW\ncnm9A8U+ZXrxW5Yr2pMHoOoLotxej5k6o3NVBlpqMgu0XO4ncXK49lUeR+mqjxVR\nRqbn9vzldG9Cdop42tZdwqkRID2/k/7VNRC22fM0Q1Y8PapL7E1uuU/kf7HKgaUn\netyKivUL8QsgQ5AdiSiFaoCX4SOk5W6z24tEQdojkuQkJB7PLMdXTS4OIMcmDrqM\nLXneHR0hAgMBAAECggEAAWSY+DdXgOGiuQiS/a5NSr+jDc4dC22/K8as1ShPomjI\nwzwHEOVB2qqqHHsGAMMLcDvV47wcG5ubURXq32Daw0YvYWUEk+XCUvto33ZI5CLX\nk6Prs67C+1KYKuCif8IrzUOfauGwY1bqAdEQ924o3zE9qJARgU4qEM62c8hTxnA5\nCyArN00MUxBZvVkm3h1+nSnYduZSxUrH8kcgVG1YJ6tSjfPJBQTFcKY7hhIg5JWD\nnKISwPCUkQX+KSjKuzvtCEOt/ICfoL4laEsgwhm2TtCKOY3rxnqVprLDdkwk8TmK\nagvOSdVqD/8WJx0XLvQ/fcSJKQVyjTf1ekEpLmo2gQKBgQD+6z78wLVxzBObUJs7\nfPqSvAg2YggseXr/MwqvqnTcHrLmnpHKxxldPPv6qPV+qI/+lejcadfI2NqXn6yw\nqwhAyfkZcoe94fq1Z/yPCT3DfzxkVgoOzAFmKoD5XKZ/9SdGfdq6YvtXdoL/dJv0\n462WrBvY772IpOtjtRCyrq2soQKBgQDbs7PuZuiiJn65lJOwAn1UVw/mGuBol7/p\nERhps3X/3o/bVPJlq1PMRFlL2cf1KHE3lRe0dK5EIwvXJ2YKPAIyS4yLYRZp0dn0\nLOdjvQU9plX1Fj81MQY7Yp0z/Rrb5tB+7c07AXl+iDzWDMSfJZJbZJEQEMRmafje\nWWoUV+UggQKBgF1MWCdFmKLnoB1uKQJiwYrGyvKsenVcmMmiMr0MU+zkR3Hkg1OF\n/yCC225oPEF5DAqPb0SMcG+P/qETza5zSnf78/F+W3QBqzKNtn/bUAGnJcFLRC8a\nN0DfOYkKgd2/KfrAwTcKVxcxxswcL6A3XCcTIrYJOIM0aPp7IHtlNydBAoGAdgFq\n1tVdhKLKlGFyhiqAKMnulzi+ak9/2+67vyKOcdWYTUWuQN+qTeA0WmJqXYrQbPte\n1SWK6LwuQu09iKe8wkkD/2Uxhbsap2VrD45af0eViePeJXLklwcbyu3a/FxYhqSy\nBEyBdm40xv/qqFSk7QPySr/Gzf+DleJO8QhY4IECgYApltzdbM7+PMVo9GWPnTLn\nyV2223nruD+fqapIjeLdTQ9b+MZdBzpXSAQ6MutYq/w9Z9sQf9qRIDXWqrErRKru\nttXGo3GOJmdRSMhBceWiNaQKC0JM5N4t7mTGMu9ZuJOowHEeWOMjNUp0A5ShOgn1\noF+XgRFGl8J+BMmSEa2x9g==\n-----END PRIVATE KEY-----\n',
    clientEmail:
      'firebase-adminsdk-3374h@nhaxe-b3567.iam.gserviceaccount.com',
    // "client_id": "113745615481446636403",
    // "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    // "token_uri": "https://oauth2.googleapis.com/token",
    // "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    // "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3374h%40nhaxe-b3567.iam.gserviceaccount.com"
  };

  const b = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nhaxe-b3567.firebaseio.com',
  });
  app.listen(`${process.env.SV_GATEWAY_PORT}`, '0.0.0.0');
  return app;
}
void bootstrap();
