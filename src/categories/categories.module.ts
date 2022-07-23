import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorires } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categorires])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
