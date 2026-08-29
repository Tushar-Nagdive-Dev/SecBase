import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  imports: [
    RouterLink,
    HlmButton
  ],
  selector: 'app-welcome',
  styleUrl: './welcome.css',
  templateUrl: './welcome.html'
})
export class Welcome {}
