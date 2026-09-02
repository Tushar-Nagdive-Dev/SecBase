import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  selector: 'sec-secbase-home',
  styleUrl: './secbase-home.scss',
  templateUrl: './secbase-home.html',
})
export class SecbaseHome implements OnInit {

    ngOnInit(): void {
        console.log("SecBase Home Page");
    }
}
