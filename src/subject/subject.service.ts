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
} from '../common/subject.property';
import { SubjectRepository } from './subject.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Subject } from './subject.entity';
import { SubjectGraphqlReqDto } from './dto/subject.graphql.req';
import { SubjectGraphqlResDto } from './dto/subject.graphql.res';
import { GetListDto } from './dto/getListDto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async updateData() {
    const options = {
      url: `https://api.odcloud.kr/api/3074271/v1/uddi:cfc19dda-6f75-4c57-86a8-bb9c8b103887?serviceKey=${process.env.SERVICE_KEY}&page=1&perPage=1000`,
      method: 'GET',
    };
    //batch를 자주하지 않기 때문에 큰 자원낭비라고 판단하지 않아... 이렇게 했다.
    //그래도 최소한 덜 세이브를 하기 위해서... 변경한다.
    const result = request(options, async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body).data;
        for (const subject of result) {
          const found = this.subjectRepository.findSubjectByNumber(
            subject,
            SUBJECT_NUMBER,
          );
          if (found) {
            for (const [key] of Object.entries(found)) {
              if (found[key] !== subject[SUBJECT_NUMBER]) {
                await this.subjectRepository.updateSubject(
                  subject,
                  SUBJECT_NUMBER,
                  this.getSubject(subject),
                );
                break;
              }
            }
          } else {
            const newSubject = this.subjectRepository.create(
              this.getSubject(subject),
            );
            await this.subjectRepository.createSubject(newSubject);
          }
        }
      } else throw error;
    });

    return '업데이트를 성공했습니다.';
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
    subjectGraphqlReqDto: SubjectGraphqlReqDto,
  ): Promise<SubjectGraphqlResDto[]> {
    const foundSubjects = await this.subjectRepository.searchSubjects(
      subjectGraphqlReqDto,
    );

    // 리턴할 dto 생성
    const subjectGraphqlResDtos: SubjectGraphqlResDto[] =
      this.makeGraphqlResponseDtos(foundSubjects);

    this.logger.debug(JSON.stringify(subjectGraphqlResDtos));

    return subjectGraphqlResDtos;
  }

  async getPostList(pageInfo: GetListDto) {
    const subjectList = await this.subjectRepository.getPostList(pageInfo);
    const totalCount = await this.subjectRepository.getPageCount();
    return { subjectList, totalCount };
  }

  async getPostListByUpdate(pageInfo: GetListDto) {
    const nowDate = new Date();
    const dayOfMonth = nowDate.getDate();

    nowDate.setDate(dayOfMonth - 7);

    const subjectList = await this.subjectRepository.getPostListByUpdate(
      pageInfo,
      nowDate,
    );
    return subjectList;
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
}
