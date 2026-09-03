import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoadingService } from '@core/services/loading.service';

@Component({
  imports: [
    MatIconModule
  ],
  selector: 'sec-loading',
  styleUrl: './loading.scss',
  templateUrl: './loading.html',
})
export class Loading {
  loadingService = inject(LoadingService);
}
