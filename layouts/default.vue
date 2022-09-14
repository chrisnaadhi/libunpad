<template>
  <main class="bg-gray-50">
    <Head>
      <Title>GLAM Kandaga Unpad | Universitas Padjadjaran</Title>
    </Head>
    <NavigationBar />
    <slot />
    <FooterSection :show-list="true" />
  </main>
</template>
