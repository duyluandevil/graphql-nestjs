import { Test, TestingModule } from '@nestjs/testing';
import { ArticleRCategoryService } from './article_r_category.service';

describe('ArticleRCategoryService', () => {
  let service: ArticleRCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleRCategoryService],
    }).compile();

    service = module.get<ArticleRCategoryService>(ArticleRCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
