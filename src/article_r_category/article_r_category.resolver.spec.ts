import { Test, TestingModule } from '@nestjs/testing';
import { ArticleRCategoryResolver } from './article_r_category.resolver';

describe('ArticleRCategoryResolver', () => {
  let resolver: ArticleRCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleRCategoryResolver],
    }).compile();

    resolver = module.get<ArticleRCategoryResolver>(ArticleRCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
