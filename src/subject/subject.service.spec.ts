import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './subject.repository';
import { SubjectGraphqlReqDto } from './dto/subject.graphql.req';
import { Subject } from './subject.entity';
import exp from 'constants';
import { GetListDto } from './dto/getListDto';

const mockRepository = {
  searchSubjects: jest.fn(),
  getPostList: jest.fn(),
  getPageCount: jest.fn(),
  getPostListByUpdate: jest.fn(),
};

jest.mock('request');
describe('SubjectService', () => {
  let service: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: SubjectRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SubjectService>(SubjectService);
  });

  // == 임상 정보 검색 ==//
  describe('searchSubjects test', () => {
    it('id 만으로 임상 정보 검색 성공', async () => {
      //given
      const subjectGraphqlReqDto: SubjectGraphqlReqDto = {
        id: 8,
      };
      //when
      mockRepository.searchSubjects.mockResolvedValueOnce([
        {
          id: subjectGraphqlReqDto.id,
          createdAt: '2021-11-13T16:57:28.000Z',
          updateAt: '2021-11-15T16:57:28.000Z',
          name: '우울증 임상연구네트워크구축',
          number: 'C140012',
          period: '11개월',
          range: '국내다기관',
          type: '관찰연구',
          agency: '가톨릭대 여의도성모병원',
          step: '코호트',
          targetCount: 300,
          department: 'Pediatrics',
        },
      ]);

      const result = await mockRepository.searchSubjects(subjectGraphqlReqDto);
      //then
      expect(result).toBeTruthy();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });

    it('id, 과제명으로 임상 정보 검색 성공', async () => {
      //given
      const subjectGraphqlReqDto: SubjectGraphqlReqDto = {
        id: 8,
        name: '우울증 임상연구네트워크구축',
      };
      //when
      mockRepository.searchSubjects.mockResolvedValueOnce([
        {
          id: subjectGraphqlReqDto.id,
          createdAt: '2021-11-13T16:57:28.000Z',
          updateAt: '2021-11-15T16:57:28.000Z',
          name: subjectGraphqlReqDto.name,
          number: 'C140012',
          period: '11개월',
          range: '국내다기관',
          type: '관찰연구',
          agency: '가톨릭대 여의도성모병원',
          step: '코호트',
          targetCount: 300,
          department: 'Pediatrics',
        },
      ]);

      const result = await mockRepository.searchSubjects(subjectGraphqlReqDto);
      //then
      expect(result).toBeTruthy();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });

    it('id, 과제명, 과제번호 만으로 임상 정보 검색 성공', async () => {
      //given
      const subjectGraphqlReqDto: SubjectGraphqlReqDto = {
        id: 8,
        name: '우울증 임상연구네트워크구축',
        number: 'C140012',
      };
      //when
      mockRepository.searchSubjects.mockResolvedValueOnce([
        {
          id: subjectGraphqlReqDto.id,
          createdAt: '2021-11-13T16:57:28.000Z',
          updateAt: '2021-11-15T16:57:28.000Z',
          name: subjectGraphqlReqDto.name,
          number: subjectGraphqlReqDto.number,
          period: '11개월',
          range: '국내다기관',
          type: '관찰연구',
          agency: '가톨릭대 여의도성모병원',
          step: '코호트',
          targetCount: 300,
          department: 'Pediatrics',
        },
      ]);

      const result = await mockRepository.searchSubjects(subjectGraphqlReqDto);
      //then
      expect(result).toBeTruthy();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });

    it('임상 정보 검색 - 결과 없음', async () => {
      //given
      const subjectGraphqlReqDto: any = {
        id: 200,
      };
      //when
      mockRepository.searchSubjects.mockResolvedValueOnce([]);

      const result = await mockRepository.searchSubjects(subjectGraphqlReqDto);
      //then
      expect(result).toBeTruthy();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(0);
      expect(result).toEqual([]);
    });
  });

  // == 임상 정보 리스트 조회 == //
  describe('getPostList test', () => {
    it('임상 정보 리스트 조회 - 성공', async () => {
      //given
      const pageInfo: GetListDto = { limit: 2, offset: 0 };
      mockRepository.getPostList.mockResolvedValueOnce([
        {
          id: 8,
          createdAt: '2021-11-13T16:57:28.000Z',
          updateAt: '2021-11-15T16:57:28.000Z',
          name: '우울증 임상연구네트워크구축',
          number: 'C140012',
          period: '11개월',
          range: '국내다기관',
          type: '관찰연구',
          agency: '가톨릭대 여의도성모병원',
          step: '코호트',
          targetCount: 300,
          department: 'Pediatrics',
        },
        {
          id: 7,
          createdAt: '2021-11-14T16:57:26.000Z',
          updateAt: '2021-11-15T16:57:26.000Z',
          name: '악성림프종의 임상양상과 항암 화학요법의 치료 성적 조사 및 예후 예측 지표 분석, retrospective study',
          number: 'C110007',
          period: null,
          range: '단일기관',
          type: '관찰연구',
          agency: '가톨릭대 서울성모병원',
          step: 'case-only',
          targetCount: 200,
          department: 'Hematology',
        },
      ]);
      mockRepository.getPageCount.mockResolvedValueOnce(5);

      //when
      const result = await service.getPostList(pageInfo);

      //then
      expect(result.subjectList.length).toEqual(2);
      expect(result.totalCount).toEqual(5);
    });
    it('임상 정보 리스트 조회 - DB에 데이터는 있는데 해당 페이지에 데이터 없음', async () => {
      //given
      const pageInfo: GetListDto = { limit: 2, offset: 100 };
      mockRepository.getPostList.mockResolvedValueOnce([]);
      mockRepository.getPageCount.mockResolvedValueOnce(5);

      //when
      const result = await service.getPostList(pageInfo);

      //then
      expect(result.subjectList.length).toEqual(0);
      expect(result.totalCount).toEqual(5);
    });
    it('임상 정보 리스트 조회 - DB에 데이터 자체가 없음', async () => {
      //given
      const pageInfo: GetListDto = { limit: 2, offset: 100 };
      mockRepository.getPostList.mockResolvedValueOnce([]);
      mockRepository.getPageCount.mockResolvedValueOnce(0);

      //when
      const result = await service.getPostList(pageInfo);

      //then
      expect(result.subjectList.length).toEqual(0);
      expect(result.totalCount).toEqual(0);
    });
  });

  // == 임상 정보 최근 일주일 업데이트 조회 == //
  describe('getPostListByUpdate', () => {
    it('최근 일주일 내에 업데이트된 데이터 2개 존재', async () => {
      //given
      const pageInfo: GetListDto = { limit: 10, offset: 0 };
      mockRepository.getPostListByUpdate.mockResolvedValueOnce([
        {
          id: 8,
          createdAt: '2021-11-13T16:57:28.000Z',
          updateAt: '2021-11-15T16:57:28.000Z',
          name: '우울증 임상연구네트워크구축',
          number: 'C140012',
          period: '11개월',
          range: '국내다기관',
          type: '관찰연구',
          agency: '가톨릭대 여의도성모병원',
          step: '코호트',
          targetCount: 300,
          department: 'Pediatrics',
        },
        {
          id: 7,
          createdAt: '2021-11-14T16:57:26.000Z',
          updateAt: '2021-11-15T16:57:26.000Z',
          name: '악성림프종의 임상양상과 항암 화학요법의 치료 성적 조사 및 예후 예측 지표 분석, retrospective study',
          number: 'C110007',
          period: null,
          range: '단일기관',
          type: '관찰연구',
          agency: '가톨릭대 서울성모병원',
          step: 'case-only',
          targetCount: 200,
          department: 'Hematology',
        },
      ]);
      //when
      const result = await service.getPostListByUpdate(pageInfo);
      //then
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(2);
    });
    it('최근 일주일 내에 업데이트된 데이터 없거나 해당 페이지에 업데이트된 데이터 없음', async () => {
      //given
      const pageInfo: GetListDto = { limit: 10, offset: 0 };
      mockRepository.getPostListByUpdate.mockResolvedValueOnce([]);
      //when
      const result = await service.getPostListByUpdate(pageInfo);
      //then
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(0);
    });
  });
});
