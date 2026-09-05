/* ./src/app/common/recovery-pdf-template/recovery-pdf-template */
import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'sec-recovery-pdf-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- A4 Size Container mapped to pixels (800x1131), hidden off-screen -->
    <div id="secbase-recovery-template"
         class="absolute -left-[9999px] top-0 w-[800px] h-[1131px] bg-white border-8 border-black p-12 flex flex-col justify-start">

      <!-- Header -->
      <div class="border-b-8 border-black pb-8 mb-12 flex justify-between items-end">
        <div>
          <h1 class="text-7xl font-black uppercase tracking-tighter">SECBASE</h1>
          <p class="text-2xl font-bold mt-2">Zero-Knowledge Architecture</p>
        </div>
        <div class="bg-black text-white px-6 py-3 border-4 border-black text-2xl font-black uppercase shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          Recovery Kit
        </div>
      </div>

      <!-- High Contrast Warning Block -->
      <div class="bg-yellow-300 border-8 border-black p-8 mb-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h2 class="text-4xl font-black mb-4 uppercase text-black">CRITICAL SECURITY WARNING</h2>
        <p class="text-2xl font-bold leading-relaxed text-black">
          This document contains the unencrypted master key to your Enclave.
          If you lose this, your data is mathematically unrecoverable.
          If a malicious actor finds this, they own your entire vault.
          Store this document in a secure, offline location immediately.
        </p>
      </div>

      <!-- Metadata Grid -->
      <div class="grid grid-cols-2 gap-8 mb-16">
        <div class="border-4 border-black p-6 bg-gray-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <label class="font-black text-gray-500 uppercase tracking-widest mb-2 block">Enclave Profile</label>
          <div class="text-4xl font-black truncate">{{ profileName }}</div>
        </div>
        <div class="border-4 border-black p-6 bg-gray-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <label class="font-black text-gray-500 uppercase tracking-widest mb-2 block">Generated On</label>
          <div class="text-4xl font-black">{{ currentDate | date:'longDate' }}</div>
        </div>
      </div>

      <!-- The Payload -->
      <div class="border-8 border-black p-12 relative mt-auto mb-32 bg-cyan-100 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        <div class="absolute -top-6 left-8 bg-black text-white px-4 py-2 font-black uppercase tracking-widest border-4 border-black">
          Master Password
        </div>
        <div class="text-5xl font-mono font-black break-all leading-snug tracking-wider">
          {{ masterPassword }}
        </div>
      </div>
    </div>
  `
})
export class RecoveryPdfTemplateComponent implements OnInit {
  @Input({required: true}) profileName!: string;
  @Input({required: true}) masterPassword!: string;

  currentDate = new Date();

  ngOnInit(): void {
      console.log('RecoveryPdfTemplateComponent');
  }

}
