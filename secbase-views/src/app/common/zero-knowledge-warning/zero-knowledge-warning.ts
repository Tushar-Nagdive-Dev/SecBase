import {Component, Inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {ZeroKnowledgeAction} from '@core/interfaces/app.interface';

@Component({
  imports: [],
  selector: 'sec-zero-knowledge-warning',
  styleUrl: './zero-knowledge-warning.scss',
  templateUrl: './zero-knowledge-warning.html',
})
export class ZeroKnowledgeWarning {
  constructor(
    public dialogRef: DialogRef<ZeroKnowledgeAction>,
    @Inject(DIALOG_DATA) public data: { profileName: string }
  ) {}

  close(action: ZeroKnowledgeAction) {
    this.dialogRef.close(action);
  }
}
