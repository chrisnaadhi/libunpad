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
    return "0" + (date.getMonth() + 1);
  });
};

export const getDateToday = () => {
  const tanggal = date.getDate();
  const bulan = getActualMonth();
  const tahun = date.getFullYear();
  const today = `${tahun}-${bulan.value}-${tanggal}`;

  return { today };
};

export const getThisMonth = () => {
  const bulan = getActualMonth();
  const tahun = date.getFullYear();
  const thisMonth = [`${tahun}-${bulan.value}-01`, `$NOW()`];

  return { thisMonth };
};
