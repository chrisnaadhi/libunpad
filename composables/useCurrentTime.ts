import { ref, onBeforeUnmount } from "vue";

const date = new Date();

export const useCurrentTime = () => {
  const currentTime = ref(new Date());
  const updateCurrentTime = () => {
    currentTime.value = new Date();
  };

  const updateTimeInterval = setInterval(updateCurrentTime, 1000);

  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval);
  });

  return { currentTime };
};

export const getActualMonth = () => {
  return computed(() => {
    if (date.getMonth() + 1 >= 10) {
      return date.getMonth() + 1;
    } else {
      return "0" + (date.getMonth() + 1);
    }
  });
};

export const getDateToday = () => {
  const tanggal = date.getDate();
  const bulan = getActualMonth();
  const tahun = date.getFullYear();
  const today = `${tahun}-${bulan.value}-${tanggal}T00:00:00+07:00`;

  return { today };
};

export const getThisMonth = () => {
  const bulan = getActualMonth();
  const tahun = date.getFullYear();
  const thisMonth = [`${tahun}-${bulan.value}-01T00:00:00+07:00`, `$NOW()`];

  return { thisMonth };
};

export const getAllMonthly = (
  bulan: string,
  tanggalAwal: string,
  tanggalAkhir: string
) => {
  const tahun = date.getFullYear();
  const monthly = [
    `${tahun}-${bulan}-${tanggalAwal}T00:00:00+07:00`,
    `${tahun}-${bulan}-${tanggalAkhir}T23:59:00+07:00`,
  ];

  return { monthly };
};

export const getFirstLastMonth = (tanggal: string) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${tanggal}`;
};

export const getTotalDays = (bulan: any, tahun: any) => {
  const date = new Date(tahun, bulan, 1);

  date.setMonth(date.getMonth() + 1);
  date.setDate(0);

  return date.getDate();
};

export const extendedEveningServiceTime = () => {
  const date = new Date();
  const tahun = date.getFullYear();
  const bulan = date.getMonth() + 1;
  const tanggal = date.getDate();

  return [
    `${tahun}-${bulan}-${tanggal}T15:30:00+07:00`,
    `${tahun}-${bulan}-${tanggal}T17:30:00+07:00`,
  ];
};

export const readableDate = (tanggal: string) => {
  const checkDate = new Date(tanggal);
  const hari = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
  }).format(checkDate);
  const tgl = checkDate.getDate();
  const bulan = new Intl.DateTimeFormat("id-ID", {
    month: "long",
  }).format(checkDate);

  return `${hari}, ${tgl} ${bulan}`;
};

export const convertTimeZone = (time: string) => {
  const newDate = new Date(time);
  const formatted = newDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeFormat = newDate.toLocaleTimeString("id-ID", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  if (!time) return "Belum diperbarui";
  return `${formatted} ${timeFormat}`;
};

export const jamPiketPegawai = (hari: number) => {
  if (hari < 6) {
    return "16.00 - 17.30 WIB";
  } else {
    return "09.00 - 12.00 WIB";
  }
};
