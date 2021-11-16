import { EntityRepository, Repository } from "typeorm";
import { Subject } from "./subject.entity";


@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject>{
  async createSubject(subject:Subject){
    const createdSubject = this.create(subject);
    console.log(createdSubject)
    await this.save(createdSubject);
  }
}