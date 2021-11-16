import { Field, Int, ArgsType } from '@nestjs/graphql';
@ArgsType()
export class TestReqGraphql {
  // pk
  @Field((type) => Int)
  id: number;
}
