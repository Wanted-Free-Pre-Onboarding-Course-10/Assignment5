import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { GetListDto } from './Dto/getListDto'
@Injectable()
export class SubjectService {

    constructor(
        @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
        private connection: Connection
    ) {

    }

    async getPostList(pageInfo: GetListDto) {
        const subjectList = await
            this.subjectRepository
                .createQueryBuilder('subject')
                .orderBy('subject.id', 'DESC')
                .limit(pageInfo.limit)
                .offset(pageInfo.offset)
                .disableEscaping()
                .getMany()
        const subjectCount = await
            this.subjectRepository
                .count();
        return { subjectList, subjectCount };
    }

    async getPostListByUpdate() {

    }
}
