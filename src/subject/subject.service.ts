import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as request from 'request';
import {
  SUBJECT_AGENCY,
  SUBJECT_DEPARTMENT,
  SUBJECT_NAME,
  SUBJECT_NUMBER,
  SUBJECT_PERIOD,
  SUBJECT_RANGE,
  SUBJECT_STEP,
  SUBJECT_TARGET_COUNT,
  SUBJECT_TYPE,
} from 'src/common/subject.property';
import { SubjectRepository } from './subject.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';
import { SubjectGraphqlReqDto } from './dto/subject.graphql.req';
import { SubjectGraphqlResDto } from './dto/subject.graphql.res';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { GetListDto } from './dto/getListDto';
import * as moment from 'moment';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async upDateData() {
    const options = {
      url: `https://api.odcloud.kr/api/3074271/v1/uddi:cfc19dda-6f75-4c57-86a8-bb9c8b103887?serviceKey=${process.env.SERVICE_KEY}&page=1&perPage=1000`,
      method: 'GET',
    };
    //batch를 자주하지 않기 때문에 큰 자원낭비라고 판단하지 않아... 이렇게 했다.
    //그래도 최소한 덜 세이브를 하기 위해서... 변경한다.
    request(options, async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body).data;
        for (const subject of result) {
          const found = await this.subjectRepository.findOne({
            number: subject[SUBJECT_NUMBER],
          });
          if (found) {
            for (const [key] of Object.entries(found)) {
              if (found[key] !== subject[SUBJECT_NUMBER]) {
                await this.subjectRepository.update(
                  { number: subject[SUBJECT_NUMBER] },
                  this.getSubject(subject),
                );
                break;
              }
            }
          } else {
            const newSubject = this.subjectRepository.create(
              this.getSubject(subject),
            );
            await this.subjectRepository.save(newSubject);
          }
        }
      }
    });
  }

  getSubject(subject) {
    return {
      name: subject[SUBJECT_NAME],
      number: subject[SUBJECT_NUMBER],
      period: subject[SUBJECT_PERIOD],
      range: subject[SUBJECT_RANGE],
      type: subject[SUBJECT_TYPE],
      agency: subject[SUBJECT_AGENCY],
      step: subject[SUBJECT_STEP],
      targetCount: subject[SUBJECT_TARGET_COUNT],
      department: subject[SUBJECT_DEPARTMENT],
    };
  }
  private logger = new Logger('SubjectService');

  // == 검색 기능 == //
  async searchSubjects(
    subjectGraphqlReqDto: SubjectGraphqlReqDto): Promise<SubjectGraphqlResDto[]> {
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
