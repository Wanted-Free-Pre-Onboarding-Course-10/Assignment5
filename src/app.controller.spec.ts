import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectService } from './subject/subject.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subject } from './subject/subject.entity';

const mockSubjectService = {};
const mockSubjectRepository = {};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: SubjectService,
          useValue: mockSubjectService,
        },
        {
          provide: getRepositoryToken(Subject),
          useValue: mockSubjectRepository,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  test('', () => {
    // given
    // when
    // then
  });
});
