<script setup>
import IconCommunity from '@/components/icons/IconCommunity.vue'
</script>

<template>
  <header class="fixed top-0 left-0 right-0 bg-blue-600 text-white p-2 shadow-md z-50">
    <div class="container mx-auto flex justify-between items-center">
      <IconCommunity />
      <nav>
        <ul class="flex space-x-6">
          <li class="flex justify-center items-center">
            <a href="#" class="hover:text-blue-200 text-center transition">صفحه اصلی</a>
          </li>
          <li class="flex justify-center items-center">
            <a href="#" class="hover:text-blue-200 text-center transition">محصولات</a>
          </li>
          <li class="flex justify-center items-center">
            <a href="#" class="hover:text-blue-200 text-center transition">تماس با ما</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
