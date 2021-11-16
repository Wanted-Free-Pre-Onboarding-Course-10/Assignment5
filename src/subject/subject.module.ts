import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { SubjectRepository } from './subject.repository';
import { SubjectResolver } from './subject.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Subject,SubjectRepository])],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectResolver],
  exports:[TypeOrmModule]
})
export class SubjectModule {}
