import { Field, ArgsType } from '@nestjs/graphql';
import { NotEquals } from 'class-validator';
import { IS_NOT_EMPTY_DTO_MSG } from '../../message/message';

@ArgsType()
export class SubjectGraphqlReqDto {
  // pk
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  id?: number;

  // 과제 명
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  name?: string;

  // 과제 번호 (unique)
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  number?: string;

  //연구 기간 (년일수도, 개월일수도)
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  period?: string;

  //연구 범위(~기관)
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  range?: string;

  // 연구 종류
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  type?: string;

  // 연구 책임 기관
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  agency?: string;

  // 임상 시험 단계
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  step?: string;

  // 피연구자 수
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  targetCount?: number;

  // 진료 과
  @Field({ nullable: true })
  @NotEquals(null, { message: IS_NOT_EMPTY_DTO_MSG })
  department?: string;
}
