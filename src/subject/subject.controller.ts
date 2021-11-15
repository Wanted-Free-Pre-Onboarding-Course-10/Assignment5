import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetListDto } from './Dto/getListDto'
import { SubjectService } from './subject.service';
@Controller('subject')
export class SubjectController {

    constructor(private subjectService: SubjectService) { }

    @Get('/list')
    getSubjectList(@Query() query: GetListDto) {
        const limit = Number(query.limit);
        const offset = Number(query.offset);
        const pageInfo = { limit: limit, offset: offset }
        return this.subjectService.getPostList(pageInfo);
    }
}
