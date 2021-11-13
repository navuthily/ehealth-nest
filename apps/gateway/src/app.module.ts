import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginInlineTrace,
} from 'apollo-server-core';
require('dotenv').config();

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
        plugins: [
          ApolloServerPluginLandingPageGraphQLPlayground({
            cdnUrl: `${process.env.SV_GATEWAY_IP}:${process.env.SV_GATEWAY_PORT}`,
          }),
          ApolloServerPluginInlineTrace(),
        ],
        context: ({ req, connection }: IContextArgs) => ({
          req: { ...req, ...connection?.context },
        }),
      },

      gateway: {
        serviceList: [
          {
            name: 'thongtinluotkham',
            // url: 'http://localhost:3001/graphql'
            url: `${process.env.SV_EHEALTH_IP}:${process.env.SV_EHEALTH_PORT}/graphql`,
          },
          {
            name: 'posph66EhH',
            // url: 'http://localhost:3002/graphql'
            url: `${process.env.SV_FAMILY_IP}:${process.env.SV_FAMILY_PORT}/graphql`,
          },
        ],
      },
    }),
  ],
})
export class AppModule {}
