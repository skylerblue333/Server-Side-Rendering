<template>
  <div class="app-container">
    <header>
      <h1>Enterprise SSR Platform</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </nav>
    </header>
    
    <main>
      <NuxtPage />
    </main>
    
    <footer>
      <p>&copy; 2026 Enterprise Solutions</p>
    </footer>
  </div>
</template>

<style>
.app-container { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
header { border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
nav a { margin-right: 15px; color: #00dc82; text-decoration: none; font-weight: bold; }
footer { margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; color: #666; text-align: center; }
</style>
