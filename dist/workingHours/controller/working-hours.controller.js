"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingHoursController = void 0;
const common_1 = require("@nestjs/common");
const working_hours_service_1 = require("../service/working-hours.service");
const create_working_hour_dto_1 = require("../DTO/create-working-hour.dto");
const update_working_hour_dto_1 = require("../DTO/update-working-hour.dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../user/guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
let WorkingHoursController = class WorkingHoursController {
    workingHoursService;
    constructor(workingHoursService) {
        this.workingHoursService = workingHoursService;
    }
    async create(createWorkingHourDto) {
        return this.workingHoursService.create(createWorkingHourDto);
    }
    async findAll() {
        return this.workingHoursService.findAll();
    }
    async findOne(id) {
        return this.workingHoursService.findOne(+id);
    }
    update(id, updateWorkingHourDto) {
        return this.workingHoursService.update(+id, updateWorkingHourDto);
    }
    remove(id) {
        return this.workingHoursService.remove(+id);
    }
};
exports.WorkingHoursController = WorkingHoursController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_working_hour_dto_1.CreateWorkingHourDto]),
    __metadata("design:returntype", Promise)
], WorkingHoursController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkingHoursController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkingHoursController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_working_hour_dto_1.UpdateWorkingHourDto]),
    __metadata("design:returntype", void 0)
], WorkingHoursController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkingHoursController.prototype, "remove", null);
exports.WorkingHoursController = WorkingHoursController = __decorate([
    (0, common_1.Controller)('working-hours'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [working_hours_service_1.WorkingHoursService])
], WorkingHoursController);
//# sourceMappingURL=working-hours.controller.js.map