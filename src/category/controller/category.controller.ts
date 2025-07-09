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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('category')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiOperation({ summary: "Cria uma categoria" })
  @Roles('admin')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Lista todas as categorias" })
  @ApiResponse({
    status: 200,
    description: 'Lista todas categorias',
    schema: {
      example: [
        {
          id: 4,
          name: "Destaques"
        },
        {
          id: 1,
          name: "Corte Masculino"
        },
        {
          id: 2,
          name: "Barba"
        },
        {
          id: 3,
          name: "Sobrancelha"
        }
      ]
    }
  })
  @Roles('admin', 'client')
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Lista categorias por Id" })
  @ApiResponse({
    status: 200,
    description: "Lista categorias por Id",
    schema: {
      example: {
        id: 4,
        name: "Destaques",
        service: [
          {
            id: 1,
            name: "Corte de cabelo",
            description: "Corte de cabelo navalhado",
            duration: 40,
            price: 30,
            createdAt: "2025-05-16T21:53:28.857Z",
            updatedAt: "2025-05-16T21:53:28.857Z"
          }
        ]
      }
    }
  })
  @Roles('admin', 'client')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Deleta categoria"})
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
  @ApiResponse({
    status: 200,
    description: 'Detalhes da categoria com serviços aninhados',
    schema: {
      example: {
        id: 3,
        name: "Destaques",
        createdAt: "2025-05-25T21:14:29.907Z",
        atualizedAt: "2025-05-25T21:14:29.907Z",
        service: [
          {
            id: 1,
            name: "Corte de cabelo",
            description: "Corte de cabelo navalhado",
            duration: 40,
            price: 30,
            createdAt: "2025-05-16T21:53:28.857Z",
            updatedAt: "2025-05-16T21:53:28.857Z"
          }
        ]
      }
    }
  })
  @Roles('admin')
  async removeService(@Param('id') id: number, @Body() serviceId: object) {
    return this.categoryService.removeService(id, serviceId);
  }
}
