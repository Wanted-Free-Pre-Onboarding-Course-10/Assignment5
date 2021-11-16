import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ormconfig';
import { SubjectModule } from './subject/subject.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SubjectModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gpl',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
