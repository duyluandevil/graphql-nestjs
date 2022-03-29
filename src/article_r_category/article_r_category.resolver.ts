/* eslint-disable prettier/prettier */
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ArticleRCategoryService } from './article_r_category.service';
import { Article_R_Category } from './article_r_category_schema';

@Resolver()
export class ArticleRCategoryResolver {
    constructor(private articleRCategoryService: ArticleRCategoryService){}

    @Query(() => [Article_R_Category])
    async article_r_category(@Args("limit") limit: string){
        return this.articleRCategoryService.findAll(Number.parseInt(limit));
    }
}
