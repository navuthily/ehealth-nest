import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class UpdateInterceptor implements NestInterceptor {
  // private nameA;
  // private nameB;


  // constructor(a, b){
  //   this.nameA = a;
  //   this.nameB = b;
  // }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { body,user,params } = context.switchToHttp().getRequest();

    const {createdBy, updatedBy, createdAt, updatedAt ,...props } = body

    context.switchToHttp().getRequest().body = { ...props, updatedBy: user.id, id: +params.id} //params.id là id khi update


    console.log(context.switchToHttp().getRequest().body);
    

    return next
      .handle()
      .pipe(
        tap(() => console.log(3333333333333333))
      );

  }
}
