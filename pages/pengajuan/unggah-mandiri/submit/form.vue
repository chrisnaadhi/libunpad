<script setup>
const router = useRouter();
const config = useRuntimeConfig();

const back = () => {
  router.go(-1);
}

const communityUrl = config.public.dSpacePublic + 'core/communities/a9d392c7-cabd-44e5-9a06-d86281c307c2/subcommunities'

const { data: getCommunityList } = await useFetch(communityUrl);
const communityList = await getCommunityList.value;
const communities = communityList['_embedded']?.subcommunities;

const selectedFaculty = ref("");
const selectedProgramStudy = ref("");
const listOfSelectedFaculty = ref([]);

const onSelectedFaculty = async () => {
  const fetchProgramStudy = config.public.dSpacePublic + 'core/communities/' + selectedFaculty.value + '/subcommunities';
  if (selectedFaculty.value) {
    const listOfProdi = await $fetch(fetchProgramStudy);
    const getListProdi = await listOfProdi
    listOfSelectedFaculty.value = getListProdi['_embedded']?.subcommunities
  } else {
    listOfSelectedFaculty.value = []
  }

  console.log(selectedFaculty.value)
  console.log(listOfSelectedFaculty.value)
}

console.log(communities);
</script>

<template>
  <section>
    <h2 class="text-center">Form Unggah Mandiri</h2>
    <p>
      {{ selectedFaculty }}
    </p>
    <form @submit|prevent="">
      <div class="input-block">
        <label for="fakultas">Fakultas:</label>
        <select name="fakultas" id="fakultas" class="input-area" v-model="selectedFaculty" @change="onSelectedFaculty">
          <option value="" selected disabled>Pilih Fakultas</option>
          <option v-for="community in communities" :value="community.uuid">{{ community.name }}</option>
        </select>
      </div>
      <div class="input-block">
        <label for="prodi">Program Studi</label>
        <select name="prodi" id="prodi" class="input-area" v-model="selectedProgramStudy" :disabled="selectedFaculty === ''">
          <option value="" selected disabled>Pilih Fakultas terlebih dahulu</option>
          <option v-for="prodi in listOfSelectedFaculty"  :value="prodi.uuid">{{ prodi.name }}</option>
        </select>
      </div>
      <div class="input-block">
        <label for="nama">Nama Lengkap:</label>
        <input class="input-area" type="text" name="nama" id="nama">
      </div>
    </form>

    <button @click="back">Kembali</button>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma py-10;
}

p {
  --at-apply: italic;
}

.input-area:disabled {
  --at-apply: bg-gray-300 cursor-not-allowed;
}
</style>