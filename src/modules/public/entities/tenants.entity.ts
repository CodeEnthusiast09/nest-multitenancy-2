import { Entity, Column } from 'typeorm';
import { AbstractEntity } from 'src/abstract.entity';

@Entity({ schema: 'public', name: 'tenants' })
export class Tenant extends AbstractEntity {
  @Column({ unique: true })
  name: string;
}
