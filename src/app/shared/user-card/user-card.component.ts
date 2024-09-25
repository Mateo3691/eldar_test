import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    AvatarGroupModule,
    AvatarModule,
    BadgeModule,
    CardModule
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  //obtengo la informacion del usuario
  @Input() userName: string | null = '';
  @Input() userRole: string | null = '';
}
