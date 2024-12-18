import supabase from "./db";

export const register = async (
  full_name: string,
  email: string,
  password: string,
  phone: string,
  picture: string | null
) => {
  try {
    const { data: id, error } = await supabase
      .from("users")
      .insert([
        {
          full_name,
          email,
          password,
          phone,
          picture,
          role: "user",
          wallet: 0,
        },
      ])
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return id;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    let { data: user, error } = await supabase
      .from("users")
      .select("id, full_name, email")
      .eq("email", email);
    if (error) {
      throw new Error(error.message);
    }
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
};
// export const register = async() => {
//     try {

//     } catch (err) {
//         console.log(err)
//         return err
//     }

// }
