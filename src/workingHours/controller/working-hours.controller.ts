import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkingHoursService } from '../service/working-hours.service';
import { CreateWorkingHourDto } from '../DTO/create-working-hour.dto';
import { UpdateWorkingHourDto } from '../DTO/update-working-hour.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('working-hours')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class WorkingHoursController {
  constructor(private readonly workingHoursService: WorkingHoursService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createWorkingHourDto: CreateWorkingHourDto) {
    return this.workingHoursService.create(createWorkingHourDto);
  }

  @Get()
  @Roles('admin', 'client')
  async findAll() {
    return this.workingHoursService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'client')
  async findOne(@Param('id') id: string) {
    return this.workingHoursService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkingHourDto: UpdateWorkingHourDto,
  ) {
    return this.workingHoursService.update(+id, updateWorkingHourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workingHoursService.remove(+id);
  }
}
