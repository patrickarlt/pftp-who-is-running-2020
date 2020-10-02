import ReactGA from 'react-ga';
import cuid from "cuid";

export function logger(...messages: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...messages);
  }
}

export function sendEvent({ category, action, label, nonInteraction = false }: { category: string, action: string, label?: string, nonInteraction?: boolean }) {
  ReactGA.event({
    category,
    action,
    label,
    nonInteraction
  });
}

export function startTiming(mark: string) {
  if (window.performance) {
    performance.mark(mark);
  }
}

export function stopTiming(startMark: string, { category = "Resource", variable = "load" }: { category?: string, variable?: string, label?: string }) {
  if (window.performance) {
    const label = cuid();
    const endMark = cuid();
    performance.mark(endMark);
    performance.measure(label, startMark, endMark);
    const [entry] = window.performance.getEntriesByName(label, "measure");
    logger(`performance ${startMark}:`, entry);
    ReactGA.timing({
      category,
      variable,
      value: entry.duration,
      label: startMark
    });
  }
}