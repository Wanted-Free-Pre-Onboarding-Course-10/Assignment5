import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TestResGraphql {
  constructor(id: number) {
    this.id = id;
  }
  // pk
  @Field((type) => Int)
  id!: number;
}
