import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ormconfig';
import { SubjectModule } from './subject/subject.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Subject } from './subject/subject.entity';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),TypeOrmModule.forFeature([Subject]), SubjectModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
