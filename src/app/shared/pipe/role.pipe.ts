import { Authority } from '@Core/config/authority.constants';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role',
  standalone: true
})
export class RolePipe implements PipeTransform {
  private static readonly roleMap: Record<string, string> = {
    [Authority.ADMIN]: 'Admin',
    [Authority.USER]: 'User'
  };

  transform(value: string): string {
    return RolePipe.roleMap[value as string] || 'N/A';
  }
}
