import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dtos/create-tenant.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  getHello(): string {
    return this.tenantService.getHello();
  }

  @Post()
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    try {
      const { name } = createTenantDto;
      await this.tenantService.createTenant(name);
      return { message: `Tenant '${name}' created successfully` };
    } catch (error) {
      throw new HttpException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
