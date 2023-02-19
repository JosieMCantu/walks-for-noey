import { supabase } from '../utils/supabase';

//create
//read

export const getFriends = async () => {
  try {
    const { data, error } = await supabase.from("friends").select("*");
    if (error) throw error;
    if (data !== null) { 
      console.log('DATA', data);
    }
  } catch (error) {
    console.log(error.message);
  }
}

//update
//delete
