import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sec-recovery-pdf-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- A4 Size Container (800x1131). HEX colors strictly enforced for html2canvas compatibility. -->
    <div id="secbase-recovery-template"
         class="absolute -left-[9999px] top-0 w-[800px] h-[1131px] bg-[#ffffff] border-8 border-[#000000] p-12 flex flex-col justify-start text-[#000000]">

      <!-- Header -->
      <div class="border-b-8 border-[#000000] pb-8 mb-12 flex justify-between items-end">
        <div>
          <h1 class="text-7xl font-black uppercase tracking-tighter text-[#000000]">SECBASE</h1>
          <p class="text-2xl font-bold mt-2 text-[#000000]">Zero-Knowledge Architecture</p>
        </div>
        <div class="bg-[#000000] text-[#ffffff] px-6 py-3 border-4 border-[#000000] text-2xl font-black uppercase shadow-[6px_6px_0px_0px_#ffffff]">
          Recovery Kit
        </div>
      </div>

      <!-- High Contrast Warning Block (Using Hex for Yellow-300) -->
      <div class="bg-[#fde047] border-8 border-[#000000] p-8 mb-16 shadow-[12px_12px_0px_0px_#000000]">
        <h2 class="text-4xl font-black mb-4 uppercase text-[#000000]">CRITICAL SECURITY WARNING</h2>
        <p class="text-2xl font-bold leading-relaxed text-[#000000]">
          This document contains the unencrypted master key to your Enclave.
          If you lose this, your data is mathematically unrecoverable.
          If a malicious actor finds this, they own your entire vault.
          Store this document in a secure, offline location immediately.
        </p>
      </div>

      <!-- Metadata Grid (Using Hex for Gray-50 and Gray-500) -->
      <div class="grid grid-cols-2 gap-8 mb-16">
        <div class="border-4 border-[#000000] p-6 bg-[#f9fafb] shadow-[6px_6px_0px_0px_#000000]">
          <label class="font-black text-[#6b7280] uppercase tracking-widest mb-2 block">Enclave Profile</label>
          <div class="text-4xl font-black truncate text-[#000000]">{{ profileName }}</div>
        </div>
        <div class="border-4 border-[#000000] p-6 bg-[#f9fafb] shadow-[6px_6px_0px_0px_#000000]">
          <label class="font-black text-[#6b7280] uppercase tracking-widest mb-2 block">Generated On</label>
          <div class="text-4xl font-black text-[#000000]">{{ currentDate | date:'longDate' }}</div>
        </div>
      </div>

      <!-- The Payload (Using Hex for Cyan-100) -->
      <div class="border-8 border-[#000000] p-12 relative mt-auto mb-32 bg-[#cffafe] shadow-[16px_16px_0px_0px_#000000]">
        <div class="absolute -top-6 left-8 bg-[#000000] text-[#ffffff] px-4 py-2 font-black uppercase tracking-widest border-4 border-[#000000]">
          Master Password
        </div>
        <div class="text-5xl font-mono font-black break-all leading-snug tracking-wider text-[#000000]">
          {{ masterPassword }}
        </div>
      </div>
    </div>
  `
})
export class RecoveryPdfTemplateComponent {
  @Input({required: true}) profileName!: string;
  @Input({required: true}) masterPassword!: string;

  currentDate = new Date();
}