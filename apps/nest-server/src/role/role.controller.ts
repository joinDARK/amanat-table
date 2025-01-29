import { Body, Controller, Post, Get, Delete, UsePipes, Patch } from '@nestjs/common';
import { RoleService } from './role.service';
import { ZodValidationPipe } from '../zod-validation.pipe';
import createRoleSchema from './dto/role-create.dto';
import updateRoleSchema from './dto/role-update.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createRoleSchema))
  create (@Body() body: { name: string }) {
    return this.roleService.createRole(body.name);
  }

  @Get()
  read() {
    return this.roleService.readRoles();
  }

  @Patch()
  @UsePipes(new ZodValidationPipe(updateRoleSchema))
  update(@Body() body: { id: number, name: string }) {
    return this.roleService.updateRole(body.id, body.name);
  }

  @Delete()
  delete(@Body() body: { id: number }) {
    return this.roleService.deleteRole(body.id)
  }
}
