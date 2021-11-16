import { Field, ArgsType } from '@nestjs/graphql';
import { NotEquals } from 'class-validator';

@ArgsType()
export class SubjectGraphqlReqDto {
  // pk
  @Field({ nullable: true })
  @NotEquals(null)
  id?: number;

  // 과제 명
  @Field({ nullable: true })
  @NotEquals(null)
  name?: string;

  // 과제 번호 (unique)
  @Field({ nullable: true })
  @NotEquals(null)
  number?: string;

  //연구 기간 (년일수도, 개월일수도)
  @Field({ nullable: true })
  @NotEquals(null)
  period?: string;

  //연구 범위(~기관)
  @Field({ nullable: true })
  // @IsString()
  @NotEquals(null)
  range?: string;

  // 연구 종류
  @Field({ nullable: true })
  @NotEquals(null)
  type?: string;

  // 연구 책임 기관
  @Field({ nullable: true })
  @NotEquals(null)
  agency?: string;

  // 임상 시험 단계
  @Field({ nullable: true })
  @NotEquals(null)
  step?: string;

  // 피연구자 수
  @Field({ nullable: true })
  @NotEquals(null)
  targetCount?: number;

  // 진료 과
  @Field({ nullable: true })
  @NotEquals(null)
  department?: string;
}
