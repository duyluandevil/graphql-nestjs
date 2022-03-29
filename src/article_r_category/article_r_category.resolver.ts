/* eslint-disable prettier/prettier */
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ArticleRCategoryService } from './article_r_category.service';
import { Article_R_Category, CreateARCInput } from './article_r_category_schema';

@Resolver()
export class ArticleRCategoryResolver {
    constructor(private articleRCategoryService: ArticleRCategoryService){}

    @Query(() => [Article_R_Category])
    async article_r_category(@Args("limit") limit: string){
        return this.articleRCategoryService.findAll(Number.parseInt(limit));
    }

    @Mutation(()=> [Article_R_Category])
    async createArticleRCategory(@Args('input') arc: CreateARCInput){
        return this.articleRCategoryService.createArticleRCategory(arc);
    }
}
