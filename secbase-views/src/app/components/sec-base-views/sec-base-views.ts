import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  selector: 'sec-sec-base-views',
  styleUrl: './sec-base-views.scss',
  templateUrl: './sec-base-views.html',
})
export class SecBaseViews implements OnInit {

  readonly isLeftOpen = signal<boolean>(true);
  readonly isRightOpen = signal<boolean>(false);
  readonly isTopOpen = signal<boolean>(false);

  readonly credentialsProfileCount = signal<number>(2);
  readonly secretsProfileCount = signal<number>(4);

  ngOnInit(): void {
    
  }

  toggleLeft() { 
    this.isLeftOpen.update(v => !v); 
  }

  toggleRight() { 
    this.isRightOpen.update(v => !v); 
  }

  toggleTop() { 
    this.isTopOpen.update(v => !v); 
  }

}
