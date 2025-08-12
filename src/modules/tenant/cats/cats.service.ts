import { Inject, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from '../entities/cat.entity';
import { DataSource, UpdateResult } from 'typeorm';
import { CONNECTION } from 'src/modules/tenancy/tenancy.symbol';

@Injectable()
export class CatsService {
  constructor(
    @Inject(CONNECTION)
    private readonly connection: DataSource,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const catRepo = this.connection.getRepository(Cat);

    const cat = catRepo.create({
      name: createCatDto.name,
      color: createCatDto.color,
    });

    return await catRepo.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    const catRepo = this.connection.getRepository(Cat);
    return catRepo.find();
  }

  async findOne(id: number): Promise<Cat | null> {
    const catRepo = this.connection.getRepository(Cat);
    return catRepo.findOne({ where: { id } });
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<UpdateResult> {
    const catRepo = this.connection.getRepository(Cat);
    return catRepo.update(id, updateCatDto);
  }

  async remove(id: number): Promise<void> {
    const catRepo = this.connection.getRepository(Cat);
    await catRepo.delete(id);
  }
}
