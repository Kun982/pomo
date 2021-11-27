<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div id="nav">
      <router-link to="/">
        <img
          src="../public/usething/icon/round-schedule-24px.svg"
          alt=""
        >
      </router-link>
      <router-link to="/settings">
        <img
          src="../public/usething/icon/round-list-24px.svg"
          alt=""
        >
      </router-link>
      <router-link to="/music">
        <img
          src="../public/usething/icon/round-library_music-24px.svg"
          alt=""
        >
      </router-link>
    </div>

  </div>
</template>

<style lang="scss">
</style>
