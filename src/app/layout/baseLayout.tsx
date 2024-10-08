import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import * as Sentry from "@sentry/react";

import { Layout } from '@/shared/ui';

Sentry.init({
  dsn: "https://3359b7dc2d57d7688c4c99a593949a48@o4508087975608320.ingest.de.sentry.io/4508087980654672",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const baseLayout = <Layout header={<Header />} footer={<Footer />} />;

export { baseLayout };

const App = () => (
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    {baseLayout}
  </Sentry.ErrorBoundary>
);

export default App;
