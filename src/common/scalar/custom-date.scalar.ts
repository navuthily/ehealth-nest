import type { CustomScalar } from '@nestjs/graphql';
import { Scalar } from '@nestjs/graphql';
import type { ValueNode } from 'graphql';
import { Kind } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<any, Date> {
  description = 'Date custom scalar type';

  toIsoString(date) {
    const tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num) {
        const norm = Math.floor(Math.abs(num));

        return (norm < 10 ? '0' : '') + norm;
      };

    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()) +
      dif +
      pad(tzo / 60) +
      ':' +
      pad(tzo % 60)
    );
  }

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): any {
    if (!value) {
      return null;
    }
    const dt = new Date(value);
    return this.toIsoString(dt); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return new Date();
  }
}
