import { Args, Query, Resolver } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SubjectGraphqlReqDto } from './dto/subject.graphql.req';
import { SubjectGraphqlResDto } from './dto/subject.graphql.res';

@Resolver('Subject')
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}
  private logger = new Logger('SubjectResolver');

  @Query(() => [SubjectGraphqlResDto])
  async searchSubjects(
    @Args(ValidationPipe)
    subjectGraphqlReqDto: SubjectGraphqlReqDto,
  ) {
    const subjectGraphqlResDtos = await this.subjectService.searchSubjects(
      subjectGraphqlReqDto,
    );

    return subjectGraphqlResDtos;
  }
}
