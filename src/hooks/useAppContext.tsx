import { AppContext } from "../components/App/App";
import { useContext } from "react";

export default function useAppContext() {
  return useContext(AppContext);
}
