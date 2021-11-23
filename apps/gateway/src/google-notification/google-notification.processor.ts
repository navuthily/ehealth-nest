import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { HttpService } from '@nestjs/axios';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Processor('google-notification')
@Injectable()
export class GoogleNotificationProcessor {
  constructor(private httpService: HttpService) {}
  // private readonly logger = new Logger(AudioProcessor.name);
  @Process('nhaxe')
  async handleTranscode(job: Job) {
    const data = job.data;
    const barcode_a = data.barcode.substr(3, 1);
    const barcode_b = data.barcode.substr(10, 2);
    const plateNumber = data.plateNumber;

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

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://nhaxe-b3567.firebaseio.com',
    });
    const a = await admin.messaging().sendToTopic(
      'all',
      {
        notification: {
          title: '$FooCorp up 1.43% on the day',
          body: `{"condition": "('all' in topics)","notification" : {"body" : "Tầng: "${barcode_a}" - Slot:"${barcode_b}." \\nBiển số: "${plateNumber}" ","title": "Có xe mới"}}`,
        },
      },
      {
        // dryRun: true,
      },
    );
    console.log(a);

    // await admin
    //   .messaging()
    //   .sendToDevice(
    //     fcmtoken,
    //     `{"condition": "('all' in topics)","notification" : {"body" : "Tầng: "${barcode_a}" - Slot:"${barcode_b}." \\nBiển số: "${plateNumber}" ","title": "Có xe mới"}}`,
    //   );
    // this.httpService.post(
    //   'https://fcm.googleapis.com/fcm/send',
    //   `{"condition": "('all' in topics)","notification" : {"body" : "Tầng: "${barcode_a}" - Slot:"${barcode_b}." \\nBiển số: "${plateNumber}" ","title": "Có xe mới"}}`,
    //   {
    //     data:  `{"condition": "('all' in topics)","notification" : {"body" : "Tầng: "${barcode_a}" - Slot:"${barcode_b}." \\nBiển số: "${plateNumber}" ","title": "Có xe mới"}}`,
    //     headers: {
    //       Authorization:
    //         'key=AAAAzrSe-nE:APA91bGBV0ZUPBu7GFtT5Jdlary-2BlL3frNITxldsbtuAjcLDwkFmy6K3MDD49PwmfauATXUE9GoDu60cNB0TZQixBm4iU65ioWKWj49qJMa0gR3aB5pEqdrdhwVTsTX9N2Kb1gB8T_',
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );
    // console.log('DONE');

    // const firebaseApp = initializeApp({
    //   apiKey:
    //     'AAAAzrSe-nE:APA91bGBV0ZUPBu7GFtT5Jdlary-2BlL3frNITxldsbtuAjcLDwkFmy6K3MDD49PwmfauATXUE9GoDu60cNB0TZQixBm4iU65ioWKWj49qJMa0gR3aB5pEqdrdhwVTsTX9N2Kb1gB8T_',
    //   // authDomain: 'project-id.firebaseapp.com',
    //   // databaseURL: 'https://project-id.firebaseio.com',
    //   // projectId: 'project-id',
    //   // storageBucket: 'project-id.appspot.com',
    //   // messagingSenderId: 'sender-id',
    //   // appId: 'app-id',
    //   // measurementId: 'G-measurement-id',
    // });
    // const messaging = getMessaging(firebaseApp);

    // const topic = 'topics';
    // const message = {
    //   notification: {
    //     title: '$FooCorp up 1.43% on the day',
    //     body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
    //   },
    //   condition: "('all' in topics)"
    // };

    // // Send a message to devices subscribed to the provided topic.
    // getMessaging()
    //   .send(message)
    //   .then((response) => {
    //     // Response is a message ID string.
    //     console.log('Successfully sent message:', response);
    //   })
    //   .catch((error) => {
    //     console.log('Error sending message:', error);
    //   });
  }
}
