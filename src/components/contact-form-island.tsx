import { ErrorBoundary } from './error-boundary';
import { ContactForm } from './contact-form';

interface Props {
  accessKey: string;
}

export function ContactFormIsland({ accessKey }: Props) {
  return (
    <ErrorBoundary>
      <ContactForm accessKey={accessKey} />
    </ErrorBoundary>
  );
}
