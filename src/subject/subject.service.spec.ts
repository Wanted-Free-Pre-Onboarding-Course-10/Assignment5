import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { Subject } from './subject.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import Mock = jest.Mock;

class MockRepository {
  datas: Subject[] = [];

  // createQueryBuilder(tableName: string) {}
}

describe('SubjectService', () => {
  let service: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: getRepositoryToken(Subject),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<SubjectService>(SubjectService);
  });

  // == id로 검색 ==//
  it('', async () => {
    //given
    //when
    //then
  });
});
