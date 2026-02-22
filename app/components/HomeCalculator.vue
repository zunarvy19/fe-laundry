<script setup>
const weight = ref(5)
const serviceType = ref('reguler')

const pricing = {
  reguler: 8000,
  express: 15000,
  premium: 25000
}

const serviceNames = {
  reguler: 'Reguler',
  express: 'Express 24h',
  premium: 'Premium Care'
}

const totalCost = computed(() => {
  return weight.value * pricing[serviceType.value]
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)
}

const whatsappUrl = computed(() => {
  const message = `Halo Express Laundry! Saya ingin memesan jasa laundry.\n\nEstimasi Pesanan:\n- Layanan: ${serviceNames[serviceType.value]}\n- Berat: ${weight.value} Kg\n- Total Estimasi: ${formatCurrency(totalCost.value)}\n\nKapan kurir bisa jemput ke rumah?`
  return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
})
</script>

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
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-medium text-slate-300">Berat Pakaian</label>
                <span class="text-primary font-bold text-lg">{{ weight }} Kg</span>
              </div>
              <input 
                v-model.number="weight"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" 
                max="20" 
                min="1" 
                type="range" 
              />
              <div class="flex justify-between text-xs text-slate-400 mt-2">
                <span>1 Kg</span>
                <span>10 Kg</span>
                <span>20 Kg</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-3">Pilih Layanan</label>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  v-for="(name, key) in serviceNames" 
                  :key="key"
                  @click="serviceType = key"
                  :class="[
                    'py-2 px-1 rounded-lg text-[10px] md:text-xs font-bold transition-all border',
                    serviceType === key 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  ]"
                >
                  {{ name }}
                </button>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-white/10 border border-white/10 flex justify-between items-center">
              <span class="text-slate-300 text-sm">Estimasi Biaya ({{ serviceNames[serviceType] }})</span>
              <span class="text-2xl font-bold text-white">{{ formatCurrency(totalCost) }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center text-center space-y-6 md:border-l md:border-white/10 md:pl-12">
          <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-2">
            <span class="material-symbols-outlined text-3xl">chat</span>
          </div>
          <h3 class="text-2xl font-bold">Siap Mencuci?</h3>
          <p class="text-slate-300 text-sm">Klik tombol di bawah untuk terhubung langsung dengan admin kami via WhatsApp.</p>
          <a 
            :href="whatsappUrl" 
            target="_blank"
            class="w-full bg-white text-primary hover:bg-slate-100 py-3.5 px-6 rounded-xl font-bold transition-colors shadow-lg text-center block"
          >
            Chat Admin Sekarang
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
