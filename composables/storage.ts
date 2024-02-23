import Minio from "minio";

const config = useRuntimeConfig();

export const minioClient = new Minio.Client({
  endPoint: "",
  port: 9090,
  useSSL: false,
  accessKey: "",
  secretKey: "",
});
