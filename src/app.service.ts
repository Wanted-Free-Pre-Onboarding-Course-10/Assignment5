import { Injectable } from '@nestjs/common';
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
} from './common/subject.property';
import { Repository } from 'typeorm';
import { Subject } from './subject/subject.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  getTest(): string {
    return 'hello test';
  }
  async getData() {
    const options = {
      url: `https://api.odcloud.kr/api/3074271/v1/uddi:cfc19dda-6f75-4c57-86a8-bb9c8b103887?serviceKey=${process.env.SERVICE_KEY}&page=1&perPage=1000`,
      method: 'GET',
    };

    request(options, async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        for (const subject of JSON.parse(body).data) {
          const convertedSubject = {
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
          try {
            const createdSubject =
              this.subjectRepository.create(convertedSubject);
            await this.subjectRepository.save(createdSubject);
          } catch (error) {
            // console.log(error);
          }
        }
      }
    });
    return '임상정보 DB에 삽입 성공!'
  }
}
