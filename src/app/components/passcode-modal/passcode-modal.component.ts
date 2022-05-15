import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-passcode-modal',
  templateUrl: './passcode-modal.component.html',
  styleUrls: ['./passcode-modal.component.css'],
})
export class PasscodeModalComponent implements OnInit {
  @Input() id!: number;
  @Output() passcodeEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  submitPasscode(passcode: string): void {
    const re = /\d{6}/;
    const passcodeText = document.querySelector('#passcodeText');

    if (!passcode || !re.exec(passcode)) {
      alert('Enter a valid passcode!');
      return;
    }

    // Emit validated passcode
    this.passcodeEvent.emit(passcode);
    // Clear passcode
    (passcodeText as HTMLInputElement).value = '';
  }
}
