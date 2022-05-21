import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CreateInterceptor implements NestInterceptor {
  // private nameA;
  // private nameB;


  // constructor(a, b){
  //   this.nameA = a;
  //   this.nameB = b;
  // }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let { body,user } = context.switchToHttp().getRequest();
    console.log("123213",user)

    const {createdBy, updatedBy, createdAt, updatedAt ,...props } = body
    
    context.switchToHttp().getRequest().body = { ...props, createdBy: user.id }

    
    return next
      .handle()
      .pipe();
  }
}
