import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { GetListDto } from './Dto/getListDto';
import * as moment from 'moment';
@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
    private connection: Connection,
  ) {}

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
