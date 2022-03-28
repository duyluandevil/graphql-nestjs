import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => String)
  async Hello() {
    return 'Hello world';
  }
}
