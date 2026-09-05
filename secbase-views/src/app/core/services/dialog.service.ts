/*
* ./src/app/core/services/dialog.service.ts
* */
import {inject, Injectable} from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import {Observable} from 'rxjs';
import {ZeroKnowledgeAction} from '@core/interfaces/app.interface';
import {ZeroKnowledgeWarning} from '../../common/zero-knowledge-warning/zero-knowledge-warning';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(Dialog);

  /**
   * Opens the stark Neo-Brutalist Zero-Knowledge warning dialog.
   * Returns an Observable resolving to the user's explicit choice.
   */
  openZeroKnowledgeWarning(profileName: string): Observable<ZeroKnowledgeAction | undefined> {
    const dialogRef = this.dialog.open<ZeroKnowledgeAction>(ZeroKnowledgeWarning, {
      minWidth: '300px',
      disableClose: true,
      backdropClass: 'bg-black/60',
      data: { profileName }
    });

    return dialogRef.closed;
  }
}
