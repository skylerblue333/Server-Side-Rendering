<template>
  <div>
    <h2>Dashboard</h2>
    <p>This page is server-side rendered, ensuring optimal SEO and fast initial page loads.</p>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Performance Score</h3>
        <p class="value">99/100</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 20px; }
.stat-card { padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fafafa; }
.value { font-size: 2em; font-weight: bold; color: #333; margin: 10px 0 0; }
</style>
