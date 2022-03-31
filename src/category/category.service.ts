/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import category from '../data/category';
import { Category, CategoryDocument, CreateCategoryInput, UpdateCategoryInput } from './category.schema';

//mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JsonResponse } from 'src/category/category.schema';

@Injectable()
export class CategoryService {
  category: Partial<Category>[];
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  //find for read
  async find(query) {
    const { page, limit, search } = query;

    //validate data
    if (query.page && isNaN(query.page)) {
      throw new Error('Param page is not number');
    }
    if (query.limit && isNaN(query.limit)) {
      throw new Error('Param limit is not number');
    }

    //create skip for use pagnigation
    const skip = (query.page-1) * query.limit;

    const arrayResult = await this.categoryModel.find({
      name: new RegExp(query.search)
    }).limit(query.limit).skip(skip);

    return arrayResult;

    //is limit exists?
    if (!query.limit) {
      //limit is null

      //is search exists?
      if (!query.search) {
        //search is null
        if (!query.page) return this.categoryModel.find().limit(10);
        // page is null return all user with default limit
        else
          return this.categoryModel
            .find()
            .limit(10)
            .skip(5 * Number.parseInt(query.page)); // page is not null return all user with default limit
      } else {
        //search is not null
        if (!query.page)
          return this.categoryModel
            .find({ name: new RegExp(query.search) })
            .limit(10);
        else
          return this.categoryModel
            .find({ name: new RegExp(query.search) })
            .limit(10)
            .skip(5 * Number.parseInt(query.page)); //câu hỏi
      }
    } else {
      //limit is not null

      if (!query.search) {
        //search is null
        if (!query.page)
          return this.categoryModel.find().limit(Number.parseInt(query.limit));
        // page is null return all user with default limit
        else
          return this.categoryModel
            .find()
            .limit(Number.parseInt(query.limit))
            .skip(5 * Number.parseInt(query.page)); // page is not null return all user with default limit
      } else {
        //search is not null
        if (!query.page)
          return this.categoryModel
            .find({ name: new RegExp(query.search) })
            .limit(Number.parseInt(query.limit));
        else
          return this.categoryModel
            .find({ name: new RegExp(query.search) })
            .limit(Number.parseInt(query.limit))
            .skip(5 * Number.parseInt(query.page));
      }
    }
  }

  //func validate data input for category
  checkData(category: CreateCategoryInput) {
    let flag = true;
    if (category.name.length < 3 || category.name.length > 20) flag = false;
    else if (category.description.length < 10 || category.name.length > 200)
      flag = false;

    return flag;
  }

  async createCategory(nCategory: CreateCategoryInput) {
    const categoryMatchName = await this.categoryModel.findOne({
      name: nCategory.name,
    }); //create variable containing user with username if find

    if (!categoryMatchName) {
      //user not find
      if (this.checkData(nCategory)) {
        //validate
        //if all input's true, create new
        const categoryAddToMongoDB = new this.categoryModel(); //create new object for store

        //store field record
        categoryAddToMongoDB.name = nCategory.name;
        categoryAddToMongoDB.description = nCategory.description;

        categoryAddToMongoDB.save();

        //create json to respone
        const jsonRes = new JsonResponse();
        jsonRes.success = true;
        jsonRes.message = 'Create new category is successfully';
        jsonRes.data = categoryAddToMongoDB;
        return jsonRes;
      } else {
        //create json to respone
        const jsonRes = new JsonResponse();
        jsonRes.success = false;
        jsonRes.message = 'Create new category is failed';
        return jsonRes;
      }
    } else {
      //create json to respone
      const jsonRes = new JsonResponse();
      jsonRes.success = false;
      jsonRes.message = 'Name is exist in database';
      return jsonRes;
    }
  }

  async deleteCategory(id: string) {
    //validate
    if (await this.categoryModel.findOne({ _id: id })) {
      if ((await this.categoryModel.deleteOne({ _id: id })).deletedCount === 1) {
        const jsonRes = new JsonResponse();
        jsonRes.success = true;
        jsonRes.message = 'Delete category successfully';
        return jsonRes;
      }
    } else {
      const jsonRes = new JsonResponse();
      jsonRes.success = false;
      jsonRes.message = 'Delete category failed';
      return jsonRes;
    }
  }

  async updateCategory(id: string, uCategory: CreateCategoryInput) {
    const currentCategory = await this.categoryModel.findOne({ _id: id });
    if (currentCategory) {
      if (this.checkData(uCategory)) {
        //validate data, if have user, update
        currentCategory.name = uCategory.name;
        currentCategory.description = uCategory.description;
        currentCategory.save();

        //create json to respone
        const jsonRes = new JsonResponse();
        jsonRes.success = true;
        jsonRes.message = 'Update information of category is successfully';
        jsonRes.data = await this.categoryModel.findOne({ _id: id });
        return jsonRes;
      } else {
        //create json to respone
        const jsonRes = new JsonResponse();
        jsonRes.success = false;
        jsonRes.message =
          'Update information of category is failed, wrong input data';
        jsonRes.data = await this.categoryModel.findOne({ _id: id });
        return jsonRes;
      }
    } else {
      const jsonRes = new JsonResponse();
      jsonRes.success = false;
      jsonRes.message = 'Category is not exists in databse';
      return jsonRes;
    }
    // console.log(await this.userModel.findOne({_id: id}))
  }
}


