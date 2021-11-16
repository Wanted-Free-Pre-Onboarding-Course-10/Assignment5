import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ormconfig';
import { SubjectModule } from './subject/subject.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Subject } from './subject/subject.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),TypeOrmModule.forFeature([Subject]), SubjectModule, ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gpl',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
        };
        return graphQLFormattedError;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
