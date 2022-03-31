import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/article/article.schema';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Article.name, schema: ArticleSchema }
  ]) ],
  providers: [UserService, UserResolver]
})
export class UserModule {}
