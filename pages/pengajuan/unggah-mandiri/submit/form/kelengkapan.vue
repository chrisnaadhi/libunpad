<script setup>
definePageMeta({
  middleware: "authentication-check",
});

const router = useRouter();
const config = useRuntimeConfig();
const submitter = getSubmitterData();

const bearer = useCookie("dsAccessToken");
const dSpaceToken = useCookie("X-XSRF-TOKEN");

const { data } = useAuth();
const date = new Date();
const month = getActualMonth();
const val = ref("Kelengkapan Berkas Tugas Akhir");

const back = () => {
  router.go(-1);
};

const fetchData = (id) => {
  return config.public.dSpacePublic + "/core/communities/" + id;
};

const getKelengkapanData = await fetchDspaceItemLogs(data.value.user.email);

const getFakultas = await $fetch(
  fetchData(getKelengkapanData[0].id_fakultas ?? submitter.fakultas)
);
const getJenjang = await $fetch(
  fetchData(getKelengkapanData[0].id_jenjang ?? submitter.jenjang)
);
const getProdi = await $fetch(
  `${config.public.dSpacePublic}/core/collections/${getKelengkapanData[0].id_prodi ?? submitter.programStudi
  }`
);
const getWorkSpaceItem = await $fetch(`${config.public.dSpacePublic}/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}/item`, {
  credentials: "include",
  headers: new Headers({
    Authorization: "Bearer " + bearer.value.accessToken,
    "X-XSRF-TOKEN": `${dSpaceToken.value}`,
  })
})

console.log(getWorkSpaceItem.metadata["dc.contributor.author"][0].value)

// Form Metadata
const judul = ref(getWorkSpaceItem.metadata["dc.title"]?.[0]?.value ?? "");
const abstrak = ref(getWorkSpaceItem.metadata["dc.description.abstract"]?.[0]?.value ?? "");
const kataKunci = ref(getWorkSpaceItem.metadata["dc.subject"]?.[0]?.value ?? "");
const bahasa = ref("");
const kelulusan = ref(getWorkSpaceItem.metadata["dc.date.issued"]?.[0]?.value ?? "");
const pembimbing1 = ref(getWorkSpaceItem.metadata["dc.contributor.advisor"]?.[0]?.value ?? "");
const pembimbing2 = ref(getWorkSpaceItem.metadata["dc.contributor.advisor"]?.[1]?.value ?? "");
const pembimbing3 = ref(getWorkSpaceItem.metadata["dc.contributor.advisor"]?.[2]?.value ?? "");

const saveMetadata = async () => {
  
  const itemsList = {
    "dc.contributor.author": [
      {
        value: getKelengkapanData[0].nama_lengkap ?? submitter.namaLengkap,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.title": [
      {
        value: judul.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.description.abstract": [
      {
        value: abstrak.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.keywords": [
      {
        value: kataKunci.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.date.issued": [
      {
        value: kelulusan.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.contributor.advisor": [
      {
        value: pembimbing1.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
      {
        value: pembimbing2.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
      {
        value: pembimbing3.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
  };
  console.log(itemsList)

  const headerItems = {
    Accept: "*/*",
    Authorization: "Bearer " + bearer.value.accessToken,
    "X-XSRF-TOKEN": dSpaceToken.value ?? "",
    Cookie: "DSPACE-XSRF-COOKIE=" + dSpaceToken.value,
    "Content-Type": "application/json",
  }

  try {
    await $fetch(
      config.public.dSpacePublic +
      `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: new Headers(headerItems),
        body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.contributor.author", "value":${JSON.stringify(itemsList["dc.contributor.author"])}}]`,
      }
    );
    await $fetch(
      config.public.dSpacePublic +
      `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: new Headers(headerItems),
        body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.title", "value":${JSON.stringify(itemsList["dc.title"])}}]`,
      }
    );
    await $fetch(
      config.public.dSpacePublic +
      `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: new Headers(headerItems),
        body: `[{"op": "add", "path": "/sections/traditionalpagetwo/dc.description.abstract", "value":${JSON.stringify(itemsList["dc.description.abstract"])}}]`,
      }
    );
    await $fetch(
      config.public.dSpacePublic +
      `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: new Headers(headerItems),
        body: `[{"op": "add", "path": "/sections/traditionalpagetwo/dc.subject", "value":${JSON.stringify(itemsList["dc.keywords"])}}]`,
      }
    );
    await $fetch(
      config.public.dSpacePublic +
      `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: new Headers(headerItems),
        body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.date.issued", "value":${JSON.stringify(itemsList["dc.date.issued"])}}]`,
      }
    );
    await $fetch(
      config.public.dSpacePublic +
      `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: new Headers(headerItems),
        body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.contributor.advisor", "value":${JSON.stringify(itemsList["dc.contributor.advisor"])}}]`,
      }
    );
    console.log("DONE!");
  } catch (error) {
    console.log(error);
  }
};

// Form Files
</script>

<template>
  <section>
    <h3 class="text-center pt-5">{{ val }}</h3>
    <div class="flex flex-col items-center justify-center mt-4">
      <article>
        <div class="heading-section">
          <h3>Biodata Pengunggah</h3>
        </div>
        <div class="flex gap-4 mt-4">
          <div>
            <p>Nama Lengkap</p>
            <p>NPM</p>
            <p>Email</p>
            <p>Jenjang</p>
            <p>Program Studi</p>
            <p>Fakultas</p>
          </div>
          <div>
            <p class="font-semibold">
              : {{ getKelengkapanData[0].nama_lengkap ?? submitter.namaLengkap }}
            </p>
            <p class="font-semibold">
              : {{ getKelengkapanData[0].npm ?? submitter.npm }}
            </p>
            <p class="font-semibold">
              : {{ getKelengkapanData[0].email ?? submitter.email }}
            </p>
            <p class="font-semibold">: {{ getJenjang.name ?? getJenjang }}</p>
            <p class="font-semibold">: {{ getProdi.name ?? getProdi }}</p>
            <p class="font-semibold">: {{ getFakultas.name ?? getFakultas }}</p>
          </div>
        </div>
      </article>
      <article class="w-full my-10 px-5">
        <div>
          <div class="heading-section">
            <h3>Informasi Detil Tugas Akhir</h3>
          </div>
          <form @submit.prevent="saveMetadata">
            <div class="input-block">
              <label for="judul">Judul Tugas Akhir <span class="text-red">*</span> :
              </label>
              <input class="input-area" type="text" name="judul" id="judul" placeholder="Masukkan Judul Tugas Akhir"
                v-model="judul" required />
            </div>
            <div class="input-block">
              <label for="abstrak">Abstrak (Indonesia / Inggris)
                <span class="text-red">*</span> :</label>
              <textarea class="input-area" type="text" name="abstrak" id="abstrak" rows="15"
                placeholder="Masukkan Abstrak Berbahasa Indonesia (gunakan Bahasa Inggris jika tidak ada Abstrak Indonesia)"
                v-model="abstrak" required />
            </div>
            <div class="flex gap-3">
              <div class="input-block">
                <label for="keyword">Kata Kunci :</label>
                <input class="input-area" type="text" name="keyword" id="keyword" placeholder="Maksimum 3 Kata Kunci"
                  v-model="kataKunci" />
                <p class="description-helper">
                  Gunakan Tanda Koma (,) untuk memisahkan kata kunci. Maksimum 3
                  Kata Kunci. <br />
                  <span class="font-semibold text-orange-8">Contoh: Perpustakaan, Diseminasi Informasi, Literasi
                    Pendidikan</span>
                </p>
              </div>
              <div class="input-block">
                <label for="bahasa">Bahasa :</label>
                <select class="input-area" type="text" name="bahasa" id="bahasa"
                  placeholder="Bahasa yang digunakan dalam Tugas Akhir" v-model="bahasa">
                  <option value="" selected disabled>
                    Pilih Bahasa yang digunakan dalam Tugas Akhir
                  </option>
                  <option value="indonesia">Bahasa Indonesia</option>
                  <option value="inggris">Bahasa Inggris</option>
                </select>
              </div>
              <div class="input-block">
                <label for="kelulusan">Tanggal Sidang / Kelulusan :</label>
                <input class="input-area" type="date" name="kelulusan" id="kelulusan" v-model="kelulusan" />
              </div>
            </div>
            <div class="flex gap-3">
              <div class="input-block">
                <label for="pembimbing1">Pembimbing 1 :</label>
                <input class="input-area" type="text" name="pembimbing1" id="pembimbing1"
                  placeholder="Nama Lengkap Pembimbing Kedua" v-model="pembimbing1" />
              </div>
              <div class="input-block">
                <label for="pembimbing2">Pembimbing 2 :</label>
                <input class="input-area" type="text" name="pembimbing2" id="pembimbing2"
                  placeholder="Nama Lengkap Pembimbing Kedua" v-model="pembimbing2" />
              </div>
              <div class="input-block">
                <label for="pembimbing3">Pembimbing 3 :</label>
                <input class="input-area" type="text" name="pembimbing3" id="pembimbing3"
                  placeholder="Nama Lengkap Pembimbing Kedua" v-model="pembimbing3" />
              </div>
            </div>
            <p class="description-helper text-center">
              **Kosongkan jika tidak ada
            </p>
            <p>{{ getKelengkapanData[0] }}</p>
            <button class="btn bg-green-5 text-white w-full mt-5" @click.prevent="saveMetadata">
              Simpan
            </button>
          </form>
        </div>
      </article>
      <article class="w-full my-10 px-5">
        <div class="heading-section">
          <h3>Data Berkas</h3>
        </div>
        <div class="flex flex-col w-full mt-5 lg:(flex-row gap-15)">
          <div class="w-full">
            <h4>Berkas Awal</h4>
            <div class="input-block">
              <label for="cover">Cover :</label>
              <input type="file" name="cover" id="cover" class="file-input" />
            </div>
            <div class="input-block">
              <label for="abstrak">Abstrak (Indonesia & Inggris) :</label>
              <input type="file" name="abstrakfile" id="abstrakfile" class="file-input" />
            </div>
            <div class="input-block">
              <label for="pernyataan">Lembar Pernyataan (yang sudah ditandatangani) :</label>
              <input type="file" name="pernyataan" id="pernyataan" class="file-input" />
            </div>
            <div class="input-block">
              <label for="pengesahan">Lembar Pengesahan (yang sudah ditandatangani) :</label>
              <input type="file" name="pengesahan" id="pengesahan" class="file-input" />
            </div>
            <div class="input-block">
              <label for="daftarisi">Daftar Isi :</label>
              <input type="file" name="daftarisi" id="daftarisi" class="file-input" />
            </div>
            <div class="input-block">
              <label for="daftartabel">Daftar Tabel :</label>
              <input type="file" name="daftartabel" id="daftartabel" class="file-input" />
            </div>
            <div class="input-block">
              <label for="daftargambar">Daftar Gambar :</label>
              <input type="file" name="daftargambar" id="daftargambar" class="file-input" />
            </div>
            <div class="input-block">
              <label for="daftarlampiran">Daftar Lampiran :</label>
              <input type="file" name="daftarlampiran" id="daftarlampiran" class="file-input" />
            </div>
            <div class="input-block">
              <label for="daftarlampiran">Surat Pernyataan Publikasi Karya Ilmiah:</label>
              <input type="file" name="daftarlampiran" id="daftarlampiran" class="file-input" />
            </div>
            <div class="input-block">
              <label for="daftarlampiran">Surat Pernyataan Kesamaan Isi Dokumen :</label>
              <input type="file" name="daftarlampiran" id="daftarlampiran" class="file-input" />
            </div>
          </div>
          <div class="w-full">
            <h4>Berkas Konten</h4>
            <div class="input-block">
              <label for="bab1">Bab 1 :</label>
              <input type="file" name="bab1" id="bab1" class="file-input" />
            </div>
            <div class="input-block">
              <label for="bab2">Bab 2 :</label>
              <input type="file" name="bab2" id="bab2" class="file-input" />
            </div>
            <div class="input-block">
              <label for="bab3">Bab 3 :</label>
              <input type="file" name="bab3" id="bab3" class="file-input" />
            </div>
            <div class="input-block">
              <label for="bab4">Bab 4 :</label>
              <input type="file" name="bab4" id="bab4" class="file-input" />
            </div>
            <div class="input-block">
              <label for="bab5">Bab 5 :</label>
              <input type="file" name="bab5" id="bab5" class="file-input" />
            </div>
            <div class="input-block">
              <label for="bab6">Bab 6 :</label>
              <input type="file" name="bab6" id="bab6" class="file-input" />
            </div>
            <div class="input-block">
              <label for="lampiran">Lampiran :</label>
              <input type="file" name="lampiran" id="lampiran" class="file-input" />
            </div>
            <div class="input-block">
              <label for="daftarpustaka">Daftar Pustaka :</label>
              <input type="file" name="daftarpustaka" id="daftarpustaka" class="file-input" />
            </div>
            <div class="input-block">
              <label for="fullteks">Full Teks :</label>
              <input type="file" name="fullteks" id="fullteks" class="file-input" />
            </div>
          </div>
        </div>
        <button class="btn bg-green-5 text-white w-full mt-5">Simpan</button>
      </article>
      <div class="mt-5">
        <h5 class="text-red font-semibold text-center">
          Silahkan isi terlebih dahulu biodata untuk mengunggah!
        </h5>
      </div>
      <div class="flex items-center justify-center my-10" v-if="getKelengkapanData.length === 0">
        <button @click="back" class="btn bg-orange text-white py-1">
          Kembali
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

p {
  --at-apply: italic;
}

.description-helper {
  --at-apply: text-sm text-gray italic;
}

.heading-section {
  --at-apply: bg-orange text-white px-5 py-1 rounded w-full max-w-md ma text-center;
}

.file-input {
  --at-apply: w-full bg-orange-50 text-gray-5 border border-orange-300 cursor-pointer rounded-bl rounded-tl file:(bg-orange text-white px-3 py-2 mr-3 border-none cursor-pointer);
}
</style>
