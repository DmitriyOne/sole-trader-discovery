// Client-safe exports only. `insertResponse` is server-only — import it
// directly from "@/entities/response/api/insertResponse" in server code.
export {
  responseSchema,
  TENURE_VALUES,
  SURVEY_STEPS,
  type TResponseInput,
  type TStep,
  type TTenure,
} from "./model/schema";
