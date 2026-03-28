import { supabase } from "./supabase";

/**
 * Fetches all rows from `site_settings` and returns them
 * as a simple key-value object, e.g. { company_name: "404 Services", logo_url: "/logo.png" }
 */
export async function getSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) {
    console.error("Failed to fetch site_settings:", error.message);
    // Return safe defaults so the site never breaks
    return {
      company_name: "404 Services",
      logo_url: "/404 slogo.png",
    };
  }

  const settings = {};
  data.forEach((row) => {
    settings[row.key] = row.value;
  });

  return settings;
}

/**
 * Upserts a single setting row by key.
 */
export async function updateSetting(key, value) {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

  if (error) {
    console.error(`Failed to update setting "${key}":`, error.message);
    return false;
  }
  return true;
}
