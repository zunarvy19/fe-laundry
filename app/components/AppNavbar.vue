<script setup>
const isOpen = ref(false)

// Function to toggle menu
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

// Close menu when a link is clicked
const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-slate-200 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <span class="text-xl font-bold tracking-tight text-slate-900">Express Laundry</span>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <NuxtLink to="/" class="text-slate-600 hover:text-primary transition-colors duration-300 font-medium text-sm px-1 py-2">Home</NuxtLink>
        <NuxtLink to="/#features" class="text-slate-600 hover:text-primary transition-colors duration-300 font-medium text-sm px-1 py-2">Service</NuxtLink>
        <NuxtLink to="/#pricing" class="text-slate-600 hover:text-primary transition-colors duration-300 font-medium text-sm px-1 py-2">Pricing</NuxtLink>

      <!-- Desktop Button -->
      <div class="hidden md:flex items-center">
        <span class="flex flex-row items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-300 font-bold text-sm shadow-md shadow-primary/20 cursor-pointer">
          <a href="#" class="no-underline">Pesan Sekarang</a>
        </span>
      </div>
      </div>



      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="text-slate-900 p-2 focus:outline-none" aria-label="Toggle Menu">
          <div class="w-6 h-5 relative flex flex-col justify-between">
            <span :class="['w-full h-0.5 bg-slate-900 rounded-full transition-all duration-300', isOpen ? 'rotate-45 translate-y-2' : '']"></span>
            <span :class="['w-full h-0.5 bg-slate-900 rounded-full transition-all duration-300', isOpen ? 'opacity-0' : '']"></span>
            <span :class="['w-full h-0.5 bg-slate-900 rounded-full transition-all duration-300', isOpen ? '-rotate-45 -translate-y-2.5' : '']"></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isOpen" class="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-6">
        <div class="flex flex-col gap-5">
          <NuxtLink to="/" @click="closeMenu" class="text-lg font-semibold text-slate-900">Home</NuxtLink>
          <NuxtLink to="/#features" @click="closeMenu" class="text-lg font-semibold text-slate-900">Service</NuxtLink>
          <NuxtLink to="/#pricing" @click="closeMenu" class="text-lg font-semibold text-slate-900">Pricing</NuxtLink>
          
          <div class="pt-4 mt-2 border-t border-slate-100">
            <a href="#" @click="closeMenu" class="flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20">
              <LucideSendHorizontal :size="20" />
              Pesan Sekarang
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

