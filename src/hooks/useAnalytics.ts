import { useLocation } from "@reach/router"
import { useEffect } from "react";
import ReactGA from "react-ga";
import { logger } from "../utils/logger";

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
    logger("navigation:", location.pathname + location.search)
  }, [location.pathname, location.search])
}