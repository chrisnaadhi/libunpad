<script setup>
import { getSubmitterData } from '~/composables/dspaceKit';

definePageMeta({
  middleware: "authentication-check"
})

const config = useRuntimeConfig();
const router = useRouter();
const submitter = getSubmitterData();
const faculty = useCookie("programFakultas")
const study = useCookie("programStudi");
const collection = useCookie("programStudiKoleksi");
const dSpaceToken = useCookie("X-XSRF-TOKEN");
const bearer = useCookie("dsAccessToken");

const { data } = useAuth();
const { createItems } = useDirectusItems();

const submitLoading = ref(false);

const getKelengkapanData = await fetchDspaceItemLogs(data.value.user.email)

if (getKelengkapanData.length > 0) {
  await navigateTo("/pengajuan/unggah-mandiri/submit/form/kelengkapan")
} 

submitter.email = data.value.user.email

const communityUrl = config.public.dSpacePublic + '/core/communities/a9d392c7-cabd-44e5-9a06-d86281c307c2/subcommunities'

const { data: getCommunityList } = await useFetch(communityUrl);
const communityList = await getCommunityList.value;
const communities = communityList['_embedded']?.subcommunities;

const listOfSelectedFaculty = ref([]);
const listOfSelectedJenjang = ref([]);
const showModal = ref(false);

const onSelectedFaculty = async () => {
  const fetchProgramStudy = config.public.dSpacePublic + '/core/communities/' + submitter.fakultas + '/subcommunities';
  if (submitter.fakultas) {
    const listOfProdi = await $fetch(fetchProgramStudy);
    const getListProdi = await listOfProdi
    listOfSelectedFaculty.value = getListProdi['_embedded']?.subcommunities
    listOfSelectedJenjang.value = []
  } else {
    listOfSelectedFaculty.value = []
  }
  faculty.value = submitter.fakultas;
}

const onSelectedJenjang = async () => {
  const fetchCollection = config.public.dSpacePublic + '/core/communities/' + submitter.jenjang + '/collections';
  if (submitter.jenjang) {
    const listOfCollect = await $fetch(fetchCollection);
    const getListOfCollection = await listOfCollect;
    listOfSelectedJenjang.value = getListOfCollection['_embedded']?.collections;
  } else {
    listOfSelectedJenjang.value = []
  }
  study.value = submitter.jenjang;
}

const onSelectedCollection = async () => {
  collection.value = submitter.programStudi;
}

const displayModal = () => {
  showModal.value = !showModal.value
}

const back = () => {
  router.go(-1);
}

const nextSubmit = async () => {
  if (submitter.fakultas && submitter.programStudi && submitter.jenjang && submitter.namaLengkap && submitter.npm) {
    submitLoading.value = true;
    await $fetch(`${config.public.dSpacePublic}/submission/workspaceitems`, {
      method: "POST",
      credentials: "include",
      headers: new Headers({
        Accept: "*/*",
        Authorization: "Bearer " + bearer.value.accessToken,
        "X-XSRF-TOKEN": `${dSpaceToken.value}`,
        "Content-Type": "application/json",
      }),
      query: {
        owningCollection: submitter.programStudi
      },
      async onResponse({ response }) {
        console.log(response)
        await createItems({
          collection: "log_dspace_items",
          items: {
            email: data.value.user.email,
            npm: submitter.npm,
            nama_lengkap: submitter.namaLengkap,
            id_fakultas: submitter.fakultas,
            id_jenjang: submitter.jenjang,
            id_prodi: submitter.programStudi,
            id_workspaceitems: response?._data?.id,
            id_itemuuid: response?._data?._embedded?.item?.id
          }
        })
      }
    })
    await navigateTo("/pengajuan/unggah-mandiri/submit/form/kelengkapan");
  } else {
    console.log("Failed")
    displayModal();
  }
}
</script>

<template>
  <div>
    <div class="mt--27">
      <ModalBase v-show="showModal" @close="displayModal">
        <div class="flex flex-col items-center bg-white p-5 gap-2">
          <h5>Silahkan Lengkapi seluruh form sebelum melanjutkan!</h5>
          <button @click="!showModal" class="btn bg-orange text-white py-1 px-5">Ok</button>
        </div>
      </ModalBase>
    </div>
    <section>
      <h2 class="text-center">Form Unggah Mandiri</h2>
      <form @submit|prevent="" class="mx-5">
        <div class="input-block">
          <label for="fakultas">Fakultas :</label>
          <select name="fakultas" id="fakultas" class="input-area" v-model="submitter.fakultas"
            @change="onSelectedFaculty">
            <option value="" selected disabled>Pilih Fakultas</option>
            <option v-for="community in communities" :value="community.uuid">{{ community.name }}</option>
          </select>
        </div>
        <div class="input-block">
          <label for="prodi">Jenjang Pendidikan :</label>
          <select name="prodi" id="prodi" class="input-area" v-model="submitter.jenjang" @change="onSelectedJenjang"
            :disabled="submitter.fakultas === ''">
            <option value="" selected disabled>Pilih Fakultas terlebih dahulu</option>
            <option v-for="prodi in listOfSelectedFaculty" :value="prodi.uuid">{{ prodi.name }}</option>
          </select>
        </div>
        <div class="input-block">
          <label for="koleksi">Program Studi :</label>
          <select name="koleksi" id="koleksi" class="input-area" v-model="submitter.programStudi"
            @change="onSelectedCollection" :disabled="submitter.jenjang === ''">
            <option value="" selected disabled>Pilih Jenjang terlebih dahulu</option>
            <option v-for="koleksi in listOfSelectedJenjang" :value="koleksi.uuid">{{ koleksi.name }}</option>
          </select>
        </div>
        <div class="input-block">
          <label for="nama">Nama Lengkap :</label>
          <input class="input-area" type="text" name="nama" id="nama" v-model="submitter.namaLengkap">
        </div>
        <div class="input-block">
          <label for="npm">Nomor Pokok Mahasiswa (NPM) :</label>
          <input class="input-area" type="number" name="npm" id="npm" v-model="submitter.npm">
        </div>
        <div class="input-block">
          <label for="email">E-Mail :</label>
          <input class="input-area" type="text" name="email" id="email" :value="submitter.email" disabled>
        </div>
      </form>
      <div class="my-5 flex flex-col lg:flex-row gap-3  mx-5">
        <button class="btn bg-red text-white w-full" @click="back"> &leftarrow;Kembali</button>
        <button class="btn bg-orange text-white w-full" @click="nextSubmit">
          <span v-if="submitLoading" class="flex gap-3 items-center justify-center">
            <div class="loader"></div>
            Mengirim...
          </span>
          <span v-else>
            Selanjutnya &rightarrow;
          </span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma pb-10 pt-30 relative;
}

p {
  --at-apply: italic;
}

button:disabled {
  --at-apply: bg-gray-300 cursor-not-allowed text-dark;
}

.input-area:disabled {
  --at-apply: bg-gray-300 cursor-not-allowed;
}
</style>