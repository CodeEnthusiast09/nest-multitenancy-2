import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dtos/create-tenant.dto';
import { SignUpDto } from './auth/dto/sign-up.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(
    @Body('tenant') createTenantDto: CreateTenantDto,
    @Body('user') signUpDto: SignUpDto,
  ) {
    try {
      const result = await this.tenantService.createTenant(
        createTenantDto,
        signUpDto,
      );
      return {
        message: `Tenant '${createTenantDto.company_name}' and User created successfully`,
        tenant: result.tenant,
        user: result.user,
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unexpected error occurred';

      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
