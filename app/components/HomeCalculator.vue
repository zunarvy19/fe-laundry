<template>
  <section class="py-20 px-6 bg-white">
    <div class="max-w-4xl mx-auto bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-[100px] opacity-20"></div>
      <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-4">Hitung Biaya Laundry</h2>
          <p class="text-slate-300 mb-8">Estimasi biaya laundry kamu sebelum memesan. Transparan tanpa kejutan.</p>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Berat Pakaian (Kg)</label>
              <input class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" max="20" min="1" type="range" value="5" />
              <div class="flex justify-between text-xs text-slate-400 mt-2">
                <span>1 Kg</span>
                <span>10 Kg</span>
                <span>20 Kg</span>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-white/10 border border-white/10 flex justify-between items-center">
              <span class="text-slate-300 text-sm">Estimasi Biaya (Reguler)</span>
              <span class="text-2xl font-bold text-white">Rp 40.000</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center text-center space-y-6 md:border-l md:border-white/10 md:pl-12">
          <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-2">
            <span class="material-symbols-outlined text-3xl">chat</span>
          </div>
          <h3 class="text-2xl font-bold">Siap Mencuci?</h3>
          <p class="text-slate-300 text-sm">Klik tombol di bawah untuk terhubung langsung dengan admin kami via WhatsApp.</p>
          <button class="w-full bg-white text-primary hover:bg-slate-100 py-3.5 px-6 rounded-xl font-bold transition-colors shadow-lg">
            Chat Admin Sekarang
          </button>
        </div>
      </div>
    </div>
  </section>
</template>