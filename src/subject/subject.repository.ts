import { EntityRepository, Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { SUBJECT_NUMBER } from '../common/subject.property';
import { SubjectGraphqlReqDto } from './dto/subject.graphql.req';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { GetListDto } from './dto/getListDto';
import * as moment from 'moment';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {
  async searchSubjects(
    subjectGraphqlReqDto: SubjectGraphqlReqDto,
  ): Promise<Subject[]> {
    let queryBuilder = this.createQueryBuilder('Subject');

    // == make queryBuilder 호출 == //
    queryBuilder = this.makeQueryBuilder(subjectGraphqlReqDto, queryBuilder);

    // select query
    const foundSubjects: Subject[] = await queryBuilder.getMany();

    return foundSubjects;
  }

  async getPostList(pageInfo: GetListDto): Promise<Subject[]> {
    const subjectList = await this.createQueryBuilder('subject')
      .orderBy('subject.id', 'DESC')
      .limit(pageInfo.limit)
      .offset(pageInfo.offset)
      .disableEscaping()
      .getMany();

    return subjectList;
  }

  async getPageCount(): Promise<number> {
    return await this.count();
  }

  async getPostListByUpdate(
    pageInfo: GetListDto,
    nowDate: Date,
  ): Promise<Subject[]> {
    const subjectList = await this.createQueryBuilder('subject')
      .where('subject.createdAt != subject.updateAt')
      .andWhere(`subject.updateAt > ${moment(nowDate).format('YYYY-MM-DD')}`)
      .orderBy('subject.id', 'DESC')
      .limit(pageInfo.limit)
      .offset(pageInfo.offset)
      .disableEscaping()
      .getMany();

    return subjectList;
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
  findSubjectByNumber(subject, subjectNumber) {
    return this.findOne({
      number: subject[subjectNumber],
    });
  }
  async updateSubject(subject, subjectNumber, state) {
    let result;
    try {
      result = await this.update({ number: subject[SUBJECT_NUMBER] }, state);
    } catch (e) {
      throw e;
    }
    return result;
  }

  async createSubject(subject: Subject) {
    const createdSubject = this.create(subject);
    await this.save(createdSubject);
  }
}
