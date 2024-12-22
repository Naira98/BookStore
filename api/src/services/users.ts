import supabase from "./db";

export const findBookBy = async (findBy: string, value: string | number) => {
    let { data: user, error } = await supabase
      .from("books")
      .select()
      .eq(findBy, value)
      .maybeSingle();
  
    if (error) {
      throw new Error(error.message);
    }
    return user;
  };