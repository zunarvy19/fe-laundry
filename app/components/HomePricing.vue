<template>
  <section class="py-24 px-6 bg-soft-violet/30 relative" id="pricing">
    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Paket Laundry Pilihan</h2>
        <p class="text-slate-600 text-lg">Pilih paket yang sesuai dengan kebutuhan dan urgency kamu.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 items-start">
        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative">
          <h3 class="text-xl font-bold text-slate-900 mb-2">Reguler</h3>
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-4xl font-extrabold text-slate-900">Rp 8k</span>
            <span class="text-slate-500 font-medium">/kg</span>
          </div>
          <p class="text-sm text-slate-500 mb-6 font-medium bg-slate-100 inline-block px-3 py-1 rounded-lg">Selesai 3 Hari Kerja</p>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-3 text-slate-600 text-sm">
              <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span> Cuci Kering Setrika
            </li>
            <li class="flex items-center gap-3 text-slate-600 text-sm">
              <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span> Pewangi Standar
            </li>
            <li class="flex items-center gap-3 text-slate-400 text-sm">
              <span class="material-symbols-outlined text-lg">cancel</span> Antar Jemput Prioritas
            </li>
          </ul>
          <button class="w-full py-3 rounded-xl border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors">Pilih Reguler</button>
        </div>
        <div class="bg-white rounded-2xl p-8 border-2 border-primary shadow-xl shadow-primary/10 relative transform md:-translate-y-4 z-10">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg">Most Chosen</div>
          <h3 class="text-xl font-bold text-primary mb-2">Express 24h</h3>
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-4xl font-extrabold text-slate-900">Rp 15k</span>
            <span class="text-slate-500 font-medium">/kg</span>
          </div>
          <p class="text-sm text-primary mb-6 font-bold bg-primary/10 inline-block px-3 py-1 rounded-lg">Selesai Besok (24 Jam)</p>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-3 text-slate-600 text-sm font-medium">
              <span class="material-symbols-outlined text-primary text-lg">check_circle</span> Cuci Kering Setrika
            </li>
            <li class="flex items-center gap-3 text-slate-600 text-sm font-medium">
              <span class="material-symbols-outlined text-primary text-lg">check_circle</span> Pewangi Premium Long-lasting
            </li>
            <li class="flex items-center gap-3 text-slate-600 text-sm font-medium">
              <span class="material-symbols-outlined text-primary text-lg">check_circle</span> Antar Jemput Prioritas
            </li>
            <li class="flex items-center gap-3 text-slate-600 text-sm font-medium">
              <span class="material-symbols-outlined text-primary text-lg">check_circle</span> Garansi Kehilangan
            </li>
          </ul>
          <button class="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">Pilih Express</button>
        </div>
        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative">
          <h3 class="text-xl font-bold text-slate-900 mb-2">Premium Care</h3>
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-4xl font-extrabold text-slate-900">Rp 25k</span>
            <span class="text-slate-500 font-medium">/kg</span>
          </div>
          <p class="text-sm text-slate-500 mb-6 font-medium bg-slate-100 inline-block px-3 py-1 rounded-lg">Perawatan Khusus</p>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-3 text-slate-600 text-sm">
              <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span> Dry Clean / Wet Clean
            </li>
            <li class="flex items-center gap-3 text-slate-600 text-sm">
              <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span> Treatment Noda
            </li>
            <li class="flex items-center gap-3 text-slate-600 text-sm">
              <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span> Hanger & Packaging Eksklusif
            </li>
          </ul>
          <button class="w-full py-3 rounded-xl border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors">Pilih Premium</button>
        </div>
      </div>
    </div>
  </section>
</template>
