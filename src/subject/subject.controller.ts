import { Controller, Get } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get('/')
  upDateData() {
    return this.subjectService.upDateData();
  }
  
}
