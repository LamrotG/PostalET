import { cookies } from "next/headers";
import type { Language } from "@/lib/language-context";

export async function getServerLanguage(): Promise<Language> {
  const store = await cookies();
  return store.get("lang")?.value === "am" ? "am" : "en";
}
