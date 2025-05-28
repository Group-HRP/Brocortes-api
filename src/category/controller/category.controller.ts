import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Options,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../DTO/create-category.dto';
import { UpdateCategoryDto } from '../DTO/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('category')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Roles('admin', 'client')
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'client')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  @Patch('service/:id')
  @Roles('admin')
  async removeService(@Param('id') id: string, @Body() serviceId: string) {
    return this.categoryService.removeService(+id, +serviceId);
  }
}
