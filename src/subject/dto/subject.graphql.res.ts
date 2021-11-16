import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SubjectGraphqlResDto {
  constructor(
    id: number,
    name: string,
    number: string,
    range: string,
    period: string,
    type: string,
    agency: string,
    step: string,
    targetCount: number,
    department: string,
    createdDate: string,
    updatedDate: string,
  ) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.range = range;
    this.period = period;
    this.type = type;
    this.agency = agency;
    this.step = step;
    this.targetCount = targetCount;
    this.department = department;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }

  // pk
  @Field({ nullable: true })
  id!: number;

  // 과제 명
  @Field({ nullable: true })
  name!: string;

  // 과제 번호 (unique)
  @Field({ nullable: true })
  number!: string;

  //연구 기간
  @Field({ nullable: true })
  period!: string;

  //연구 범위
  @Field({ nullable: true })
  range!: string;

  // 연구 종류
  @Field({ nullable: true })
  type!: string;

  // 연구 책임 기관
  @Field({ nullable: true })
  agency!: string;

  // 임상 시험 단계
  @Field({ nullable: true })
  step!: string;

  // 피연구자 수
  @Field({ nullable: true })
  targetCount!: number;

  // 진료 과
  @Field({ nullable: true })
  department!: string;

  // 생성 날짜
  @Field({ nullable: true })
  createdDate!: string;

  // 수정 날짜
  @Field({ nullable: true })
  updatedDate!: string;
}
