import { Body, Controller, Post, Get, Delete, UsePipes, Patch, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { ZodValidationPipe } from '../zod-validation.pipe';
import createRoleSchema from './dto/role-create.dto';
import updateRoleSchema from './dto/role-update.dto';
import { AuthJWTGuard } from 'src/auth/auth.guard';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';

@Controller('roles')
@UseGuards(AuthJWTGuard, RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles('admin')
  @UsePipes(new ZodValidationPipe(createRoleSchema))
  create (@Body() body: { name: string }) {
    return this.roleService.createRole(body.name);
  }

  @Get()
  @Roles('admin')
  read() {
    return this.roleService.readRoles();
  }

  @Patch()
  @Roles('admin')
  @UsePipes(new ZodValidationPipe(updateRoleSchema))
  update(@Body() body: { id: number, name: string }) {
    return this.roleService.updateRole(body.id, body.name);
  }

  @Delete()
  @Roles('admin')
  delete(@Body() body: { id: number }) {
    return this.roleService.deleteRole(body.id)
  }
}
