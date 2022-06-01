"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('User bp9aco9m7rh7y0yzzash')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('user')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/api/docs', app, document, {
        explorer: true,
        swaggerOptions: {
            filter: true,
        },
    });
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.useStaticAssets((0, path_1.resolve)('./dist/public'));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log('server on port', port);
}
bootstrap();
//# sourceMappingURL=main.js.map