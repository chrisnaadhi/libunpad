// tracing.mjs
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-proto";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { SimpleLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { NodeSDK } from "@opentelemetry/sdk-node";

const endpoint = process.env.KANDAGA_OTEL_ENDPOINT;
const auth = process.env.KANDAGA_OTEL_AUTH;
const org = process.env.KANDAGA_OTEL_ORG || "default";
const serviceName = process.env.KANDAGA_OTEL_SERVICE_NAME || "kandaga-frontend";

if (!endpoint) {
  console.log(
    "[tracing] KANDAGA_OTEL_ENDPOINT not set, skipping OpenTelemetry setup",
  );
} else {
  const headers = {
    Authorization: "Basic " + Buffer.from(auth || "").toString("base64"),
    organization: org,
  };

  const sdk = new NodeSDK({
    resource: new Resource({
      "service.name": serviceName,
      "service.version": process.env.npm_package_version || "1.0.0",
      "deployment.environment": process.env.NODE_ENV || "production",
    }),
    traceExporter: new OTLPTraceExporter({
      url: `${endpoint}/v1/traces`,
      headers,
    }),
    logRecordProcessors: [
      new SimpleLogRecordProcessor(
        new OTLPLogExporter({
          url: `${endpoint}/v1/logs`,
          headers,
        }),
      ),
    ],
    instrumentations: [
      getNodeAutoInstrumentations({
        "@opentelemetry/instrumentation-fs": { enabled: false },
      }),
    ],
  });

  sdk.start();
  console.log("[tracing] OpenTelemetry started →", endpoint);

  process.on("SIGTERM", () => {
    sdk
      .shutdown()
      .then(() => console.log("[tracing] OpenTelemetry shut down"))
      .catch((err) => console.error("[tracing] Shutdown error", err));
  });
}
