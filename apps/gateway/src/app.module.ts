import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginInlineTrace,
} from 'apollo-server-core';
import { decode, JwtPayload } from 'jsonwebtoken';
require('dotenv').config();

interface IHeadersContainer {
  headers?: Record<string, string>;
}
interface IContextArgs {
  req?: IHeadersContainer;
  connection?: { context: IHeadersContainer };
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const payload = await decode(context.jwt);
    // console.log(payload);
    request.http.headers.set('x-user-id', payload);
  }
}

@Module({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: (AuthenticatedDataSource) => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            {
              name: 'SV_EHEALTH',
              url: `${process.env.SV_EHEALTH_IP}:${process.env.SV_EHEALTH_PORT}/graphql`,
            },
            {
              name: 'SV_FAMILY',
              url: `${process.env.SV_FAMILY_IP}:${process.env.SV_FAMILY_PORT}/graphql`,
            },
          ],
        },
        server: {
          context: ({ request }) => {
            return {
              jwt: request?.headers?.authorization,
            };
          },
          cors: false,
          plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
              cdnUrl: `${process.env.SV_GATEWAY_IP}:${process.env.SV_GATEWAY_PORT}`,
            }),
            // ApolloServerPluginInlineTrace(),
          ],
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {}

// @Module({
//   imports: [
//     GraphQLGatewayModule.forRoot({
//       server: {
//         // ... Apollo server options
//         debug: true,
//         cors: false,
//         plugins: [
//           ApolloServerPluginLandingPageGraphQLPlayground({
//             cdnUrl: `${process.env.SV_GATEWAY_IP}:${process.env.SV_GATEWAY_PORT}`,
//           }),
//           ApolloServerPluginInlineTrace(),
//         ],
//         context: ({ req }) => ({
//           jwt: req.headers.authorization,
//         }),
//       },
//       gateway: {
//         serviceList: [
//           {
//             name: 'thongtinluotkham',
//             // url: 'http://localhost:3001/graphql'
//             url: `${process.env.SV_EHEALTH_IP}:${process.env.SV_EHEALTH_PORT}/graphql`,
//           },
//           {
//             name: 'posph66EhH',
//             // url: 'http://localhost:3002/graphql'
//             url: `${process.env.SV_FAMILY_IP}:${process.env.SV_FAMILY_PORT}/graphql`,
//           },
//         ],
//       },
//     }),
//   ],
// })
// export class AppModule {}
