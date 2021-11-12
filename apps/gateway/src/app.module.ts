import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginInlineTrace, } from 'apollo-server-core';

interface IHeadersContainer {
  headers?: Record<string, string>;
}
interface IContextArgs {
  req?: IHeadersContainer;
  connection?: { context: IHeadersContainer };
}

@Module({
  imports: [
    GraphQLGatewayModule.forRoot({
    
      server: {
        // ... Apollo server options
        
        debug: true,
        cors: false,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground({cdnUrl: 'http://localhost:3000'}), ApolloServerPluginInlineTrace(),],
        // logger: {
        //   // Ordered from least-severe to most-severe.
        //   debug(message?: any): void {
        //     console.log(message)
        //   },
        //   info(message?: any): void {
        //     console.log(message)
        //   },
        //   warn(message?: any): void {
        //     console.log(message)
        //   },
        //   error(message?: any): void {
        //     console.log(message)
        //   }
        // },
        context: ({ req, connection }: IContextArgs) => ({
          
          req: { ...req, ...connection?.context },
        }),
      },
      
      gateway: {
        
        serviceList: [
          { name: 'thongtinluotkham', url: 'http://localhost:3001/graphql' },
          { name: 'posph66EhH', url: 'http://localhost:3002/graphql' },
        ],
      },
    }),
  ],
})
export class AppModule { }
