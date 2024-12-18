import config from "../config/config";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";

const supabase = createClient<Database>(config.supabase.url, config.supabase.service_key);

export default supabase;
