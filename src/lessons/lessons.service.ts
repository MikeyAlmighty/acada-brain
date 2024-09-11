import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { CreateLessonDto } from "./dto/create-lesson.dto";
import { Lesson } from "./lesson.entity";
import { Question } from "./question.entity";
import { Answer } from "./answer.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createLesson(
    lessonDetails: CreateLessonDto,
    video: Express.Multer.File,
  ) {
    const { id, questions, title, description } = lessonDetails;

    this.eventEmitter.emit("user.video.upload", {
      lessonId: id,
      video,
    });

    // Create a new Lesson
    const newLesson = this.lessonRepository.create({
      id,
      title,
      createdAt: new Date(),
      releaseDate: new Date(),
      description,
    });

    const savedLesson = await this.lessonRepository.save(newLesson);
    // Process and save questions and answers
    const questionEntities = await Promise.all(
      questions.map(async ({ question, answers }) => {
        // Create answer entities
        const answerEntities = await Promise.all(
          answers.map(async ({ option, isCorrect }) => {
            return this.answerRepository.create({
              id: uuidv4(),
              option,
              isCorrect,
            });
          }),
        );

        // Save answers
        const savedAnswers = await this.answerRepository.save(answerEntities);

        // Create question entity with saved answers
        const questionEntity = this.questionRepository.create({
          id: uuidv4(),
          lesson: savedLesson,
          question,
          answers: savedAnswers,
        });

        return questionEntity;
      }),
    );

    // Save questions
    await this.questionRepository.save(questionEntities);
  }

  getAll() {
    return this.lessonRepository.find({
      relations: ["questions"],
      relationLoadStrategy: "join",
    });
  }

  findLessonById(id: string) {
    return this.lessonRepository.findOne({
      where: { id },
      relations: ["questions"],
    });
  }

  updateById() {}

  deleteLesson(id: string) {
    return this.lessonRepository.delete({ id });
  }
}
