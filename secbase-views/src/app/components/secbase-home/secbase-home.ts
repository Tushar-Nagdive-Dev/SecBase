import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule
  ],
  selector: 'sec-secbase-home',
  styleUrl: './secbase-home.scss',
  templateUrl: './secbase-home.html',
})
export class SecbaseHome {}
