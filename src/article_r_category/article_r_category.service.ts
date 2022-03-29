/* eslint-disable prettier/prettier */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import articleRCategory from 'src/data/article.r.category';

@Injectable()
export class ArticleRCategoryService {

    async findAll(limit: number){
        return articleRCategory.splice(0, limit);
        // console.log(articleRCategory.splice(0, limit))
    }

    async findArticleById(categoryId: number){

        // let arrayMatch = articleRCategory.find(e => e.categoryId === categoryId.toString())
        console.log("Hello")
    }
}
