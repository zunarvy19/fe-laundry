<script setup lang="ts">
import { computed, ref } from 'vue'

const { data: locations, pending } = useApi<any[]>('/locations')

// Filter hanya lokasi yang aktif
const activeLocations = computed(() => {
  return locations.value?.filter(loc => loc.is_active) || []
})

// State untuk multiple locations: memilih lokasi mana yang tampil di Map
const selectedLocation = ref<any>(null)

// Menentukan Map URL
const getMapUrl = (lat: number, lng: number) => {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`
}

// Watch activeLocations untuk menset default selectedLocation jika multi-branch
watchEffect(() => {
  if (activeLocations.value && activeLocations.value.length > 0 && !selectedLocation.value) {
    selectedLocation.value = activeLocations.value[0]
  }
})
</script>

<template>
  <section class="py-20 px-6 bg-slate-50" id="locations">
    <div class="max-w-7xl mx-auto">
      <div class="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="max-w-2xl">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lokasi Kami</h2>
          <p class="text-slate-600 text-lg">Kunjungi outlet laundry kami yang tersebar di beberapa titik untuk memberikan layanan pencucian terbaik tanpa antre panjang.</p>
        </div>
        <div v-if="activeLocations.length > 0" class="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm text-sm font-bold text-slate-700">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          {{ activeLocations.length }} Cabang Beroperasi
        </div>
      </div>

      <div v-if="pending" class="flex justify-center my-20">
        <div class="animate-pulse flex flex-col items-center gap-3">
          <div class="w-12 h-12 bg-slate-200 rounded-full"></div>
          <div class="w-32 h-4 bg-slate-200 rounded"></div>
        </div>
      </div>
      
      <div v-else-if="!activeLocations.length" class="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <span class="material-symbols-outlined text-5xl text-slate-300 mb-4 block">location_off</span>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Belum Ada Data Lokasi</h3>
        <p class="text-slate-500">Informasi cabang dan lokasi sedang dalam pembaruan.</p>
      </div>

      <div v-else>
        <!-- ==== SINGLE LOCATION UI ==== -->
        <div v-if="activeLocations.length === 1" class="bg-white rounded-[2rem] p-4 md:p-8 shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-8 items-center group">
          <div class="w-full lg:w-1/2 flex flex-col gap-6 md:px-4">
            <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-2">
              <span class="material-symbols-outlined text-3xl">storefront</span>
            </div>
            <div>
              <h3 class="text-3xl font-extrabold text-slate-900 mb-3">{{ activeLocations[0].name }}</h3>
              <p class="text-slate-600 text-lg leading-relaxed">{{ activeLocations[0].address }}</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Koordinat Lat</div>
                <div class="font-mono font-medium text-slate-700">{{ activeLocations[0].latitude.toFixed(6) }}</div>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Koordinat Lng</div>
                <div class="font-mono font-medium text-slate-700">{{ activeLocations[0].longitude.toFixed(6) }}</div>
              </div>
            </div>

            <a :href="`https://maps.google.com/?q=${activeLocations[0].latitude},${activeLocations[0].longitude}`" target="_blank" class="mt-4 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-4 px-8 rounded-xl font-bold transition-all shadow-md group-hover:shadow-lg w-full sm:w-auto">
              <span class="material-symbols-outlined">directions</span>
              Dapatkan Rute
            </a>
          </div>
          <div class="w-full lg:w-1/2 h-[400px] lg:h-[500px] rounded-[1.5rem] overflow-hidden border border-slate-200 relative bg-slate-100">
            <iframe 
              width="100%" 
              height="100%" 
              style="border:0" 
              loading="lazy" 
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade" 
              :src="getMapUrl(activeLocations[0].latitude, activeLocations[0].longitude)">
            </iframe>
          </div>
        </div>

        <!-- ==== MULTIPLE LOCATIONS UI ==== -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Sidebar Nav (3 columns on desktop) -->
          <div class="lg:col-span-4 flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <button 
              v-for="loc in activeLocations" 
              :key="loc.id"
              @click="selectedLocation = loc"
              class="w-full text-left p-6 rounded-2xl transition-all border outline-none relative overflow-hidden"
              :class="selectedLocation?.id === loc.id ? 'bg-white border-primary shadow-lg ring-1 ring-primary' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'"
            >
              <div v-if="selectedLocation?.id === loc.id" class="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
              
              <div class="flex items-start gap-4">
                <div class="mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors" :class="selectedLocation?.id === loc.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'">
                  <span class="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-1" :class="selectedLocation?.id === loc.id ? 'text-primary' : 'text-slate-900'">{{ loc.name }}</h4>
                  <p class="text-sm line-clamp-2" :class="selectedLocation?.id === loc.id ? 'text-slate-700' : 'text-slate-500'">{{ loc.address }}</p>
                </div>
              </div>
            </button>
          </div>

          <!-- Main Interactive Map Area (9 columns on desktop) -->
          <div class="lg:col-span-8 bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col">
            <div class="h-[400px] lg:h-[500px] rounded-[1.5rem] overflow-hidden bg-slate-100 relative w-full border border-slate-100">
              <iframe 
                v-if="selectedLocation"
                class="w-full h-full absolute inset-0 transition-opacity duration-500" 
                style="border:0" 
                loading="lazy" 
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade" 
                :src="getMapUrl(selectedLocation.latitude, selectedLocation.longitude)">
              </iframe>
            </div>
            
            <div v-if="selectedLocation" class="mt-6 px-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Koordinat Saat Ini</p>
                <div class="flex items-center gap-3 font-mono text-sm font-medium text-slate-700">
                  <span class="bg-slate-100 px-2 py-1 rounded">Lat: {{ selectedLocation.latitude.toFixed(6) }}</span>
                  <span class="bg-slate-100 px-2 py-1 rounded">Lng: {{ selectedLocation.longitude.toFixed(6) }}</span>
                </div>
              </div>
              
              <a :href="`https://maps.google.com/?q=${selectedLocation.latitude},${selectedLocation.longitude}`" target="_blank" class="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 px-6 rounded-xl font-bold transition-all shadow-md mt-2 sm:mt-0 text-sm">
                Buka di Maps Lengkap
                <span class="material-symbols-outlined text-lg">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>
