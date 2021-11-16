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
    if (id) this.id = id;
    if (name) this.name = name;
    if (number) this.number = number;
    if (range) this.range = range;
    if (period) this.period = period;
    if (type) this.type = type;
    if (agency) this.agency = agency;
    if (step) this.step = step;
    if (targetCount) this.targetCount = targetCount;
    if (department) this.department = department;
    if (createdDate) this.createdDate = createdDate;
    if (updatedDate) this.updatedDate = updatedDate;
  }

  // pk
  @Field({ nullable: true })
  id?: number;

  // 과제 명
  @Field({ nullable: true })
  name?: string;

  // 과제 번호 (unique)
  @Field({ nullable: true })
  number?: string;

  //연구 기간
  @Field({ nullable: true })
  period?: string;

  //연구 범위
  @Field({ nullable: true })
  range?: string;

  // 연구 종류
  @Field({ nullable: true })
  type?: string;

  // 연구 책임 기관
  @Field({ nullable: true })
  agency?: string;

  // 임상 시험 단계
  @Field({ nullable: true })
  step?: string;

  // 피연구자 수
  @Field({ nullable: true })
  targetCount?: number;

  // 진료 과
  @Field({ nullable: true })
  department?: string;

  // 생성 날짜
  @Field({ nullable: true })
  createdDate?: string;

  // 수정 날짜
  @Field({ nullable: true })
  updatedDate?: string;
}
