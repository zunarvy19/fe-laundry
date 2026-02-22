<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-slate-200 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-xl font-bold tracking-tight text-slate-900 ">Express Laundry</span>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="text-slate-900 hover:text-primary transition-colors duration-300">Home</NuxtLink>
        <NuxtLink to="/about" class="text-slate-900 hover:text-primary transition-colors duration-300">Service</NuxtLink>
        <NuxtLink to="/contact" class="text-slate-900 hover:text-primary transition-colors duration-300">Pricing</NuxtLink>
      </div>
      <div class="flex items-center gap-3">
        <span class="flex flex-row items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/80 transition-colors duration-300 font-medium shadow-sm shadow-primary">
          <LucideSendHorizontal :size="18" />
          <a href="#" class="">Pesan Sekarang</a>
        </span>
      </div>
    </div>
  </nav>
</template>