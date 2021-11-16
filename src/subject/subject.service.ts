import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';
import { SubjectGraphqlReqDto } from './dto/subject.graphql.req';
import { SubjectGraphqlResDto } from './dto/subject.graphql.res';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { GetListDto } from './Dto/getListDto';
import * as moment from 'moment';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  private logger = new Logger('SubjectService');

  // == 검색 기능 == //
  async searchSubjects(
    subjectGraphqlReqDto: SubjectGraphqlReqDto,
  ): Promise<SubjectGraphqlResDto[]> {
    let queryBuilder = this.subjectRepository.createQueryBuilder('Subject');

    // == make queryBuilder 호출 == //
    queryBuilder = this.makeQueryBuilder(subjectGraphqlReqDto, queryBuilder);

    // select query
    const foundSubjects: Subject[] = await queryBuilder.getMany();

    // 리턴할 dto 생성
    const subjectGraphqlResDtos: SubjectGraphqlResDto[] =
      this.makeGraphqlResponseDtos(foundSubjects);

    this.logger.debug(JSON.stringify(subjectGraphqlResDtos));

    return subjectGraphqlResDtos;
  }

  //== private methods == //
  //== 동적으로 queryBuilder 만드는 메서드 == //
  private makeQueryBuilder(
    subjectGraphqlReqDto: SubjectGraphqlReqDto,
    queryBuilder: SelectQueryBuilder<Subject>,
  ): SelectQueryBuilder<Subject> {
    // subjectRequestDto를 돌면서 dynamic where절 만들기.
    Object.keys(subjectGraphqlReqDto).forEach((key) => {
      queryBuilder = queryBuilder.andWhere(`Subject.${key} = :${key}`, {
        [`${key}`]: subjectGraphqlReqDto[`${key}`],
      });
    });

    return queryBuilder;
  }

  //== graphql response dto 생성 메서드 == //
  private makeGraphqlResponseDtos(
    foundSubjects: Subject[],
  ): SubjectGraphqlResDto[] {
    const subjectGraphqlResDtos: SubjectGraphqlResDto[] = [];

    foundSubjects.forEach((value) => {
      const subjectGraphqlResDto: SubjectGraphqlResDto =
        new SubjectGraphqlResDto(
          value.id,
          value.name,
          value.number,
          value.range,
          value.period,
          value.type,
          value.agency,
          value.step,
          value.targetCount,
          value.department,
          value.createdAt.toString(),
          value.updateAt.toString(),
        );
      subjectGraphqlResDtos.push(subjectGraphqlResDto);
    });

    return subjectGraphqlResDtos;
  }
  async getPostList(pageInfo: GetListDto) {
    const subjectList = await this.subjectRepository
      .createQueryBuilder('subject')
      .orderBy('subject.id', 'DESC')
      .limit(pageInfo.limit)
      .offset(pageInfo.offset)
      .disableEscaping()
      .getMany();
    const subjectCount = await this.subjectRepository.count();
    return { subjectList, subjectCount };
  }

  async getPostListByUpdate(pageInfo: GetListDto) {
    const nowDate = new Date();
    const dayOfMonth = nowDate.getDate();

    nowDate.setDate(dayOfMonth - 7);
    const subjectList = await this.subjectRepository
      .createQueryBuilder('subject')
      .where('subject.createdAt != subject.updateAt')
      .andWhere(`subject.updateAt > ${moment(nowDate).format('YYYY-MM-DD')}`)
      .orderBy('subject.id', 'DESC')
      .limit(pageInfo.limit)
      .offset(pageInfo.offset)
      .disableEscaping()
      .getMany();
    return subjectList;
  }
}
