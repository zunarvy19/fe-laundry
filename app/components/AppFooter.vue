<template>
  <footer class="bg-white  border-t border-slate-200 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span class="material-symbols-outlined text-lg">local_laundry_service</span>
            </div>
            <span class="text-lg font-bold text-slate-900">Express Laundry</span>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">Solusi laundry modern untuk kamu yang sibuk. Cepat, bersih, dan terpercaya.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 mb-4">Layanan</h4>
          <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><a class="hover:text-primary" href="#">Kiloan Regular</a></li>
            <li><a class="hover:text-primary" href="#">Express 24h</a></li>
            <li><a class="hover:text-primary" href="#">Dry Cleaning</a></li>
            <li><a class="hover:text-primary" href="#">Karpet & Bedcover</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 mb-4">Perusahaan</h4>
          <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><a class="hover:text-primary" href="#">Tentang Kami</a></li>
            <li><a class="hover:text-primary" href="#">Karir</a></li>
            <li><a class="hover:text-primary" href="#">Blog</a></li>
            <li><a class="hover:text-primary" href="#">Kontak</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 mb-4">Support</h4>
          <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><a class="hover:text-primary" href="#">Pusat Bantuan</a></li>
            <li><a class="hover:text-primary" href="#">Syarat & Ketentuan</a></li>
            <li><a class="hover:text-primary" href="#">Kebijakan Privasi</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-slate-400">© {{new Date().getFullYear()}} Express Laundry Indonesia. All rights reserved.</p>
        <div class="flex gap-4">
          <a class="text-slate-400 hover:text-primary transition-colors" href="#">
            <span class="material-symbols-outlined">public</span>
          </a>
          <a class="text-slate-400 hover:text-primary transition-colors" href="#">
            <span class="material-symbols-outlined">alternate_email</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>