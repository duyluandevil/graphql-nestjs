/* eslint-disable prettier/prettier */
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiResponseModule } from './api-response/api-response.module';
import 'dotenv/config'; //import dotenv


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING),
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ArticleModule,
    CategoryModule,
    ApiResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
