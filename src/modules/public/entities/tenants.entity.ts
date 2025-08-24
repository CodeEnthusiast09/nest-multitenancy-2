import { Entity, Column } from 'typeorm';
import { AbstractEntity } from 'src/abstract.entity';

@Entity({ schema: 'public', name: 'tenants' })
export class Tenant extends AbstractEntity {
  @Column({ unique: true })
  company_name: string;

  @Column()
  company_email: string;

  @Column()
  company_phone_number: string;

  @Column()
  slug: string;
}
