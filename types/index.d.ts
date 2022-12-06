export {};

declare global {
  interface Article {
    id?: string | number;
    title?: string | any;
    content?: string;
    status?: string;
  }

  interface Item {
    biodata_user?: any;
    institusi?: string;
    nama_ruangan?: string | null;
    identitas_anggota?: string | any;
  }
}
