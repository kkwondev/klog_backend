import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateAndUpdateRequestDto } from './dtos/create-update.request.dto';
import { DeleteRequestDto } from './dtos/delete.request.dto';
import { GetRequestDto } from './dtos/get.request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { responseError } from '../tools/reseponse-error.tools';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() { name }: CreateAndUpdateRequestDto) {
    try {
      const category = await this.categoriesService.create(name);

      if (category) {
        return { message: 'SUCCESS', category };
      }
    } catch (e) {
      responseError(e);
    }
  }

  @Post('delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Body() { categoryId }: DeleteRequestDto) {
    try {
      const deleteCategory = await this.categoriesService.delete(categoryId);

      if (deleteCategory) {
        return { message: 'SUCCESS', deleteCategory };
      }
    } catch (e) {
      responseError(e);
    }
  }

  @Get('list')
  async list() {
    try {
      const list = await this.categoriesService.list();
      return { message: 'SUCCESS', list };
    } catch (e) {
      responseError(e);
    }
  }

  @Get(':categoryId')
  async get(@Param() { categoryId }: GetRequestDto) {
    try {
      const category = await this.categoriesService.get(categoryId);
      return { message: 'SUCCESS', category: category || {} };
    } catch (e) {
      responseError(e);
    }
  }

  @Post(':categoryId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param() { categoryId }: GetRequestDto,
    @Body() { name }: CreateAndUpdateRequestDto,
  ) {
    try {
      const category = await this.categoriesService.update(name, categoryId);
      return {
        message: 'SUCCESS',
        category: { affected: category.affected, name },
      };
    } catch (e) {
      responseError(e);
    }
  }
}
