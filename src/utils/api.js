import { supabase } from '../utils/supabase';

//create

export const makeFriends = async (obj) => {
  await supabase
    .from('friends')
    .insert(obj)
    .single();
  window.location.reload();
}


//read

export const getFriends = async () => {
    const { data } = await supabase
    .from('friends')
    .select('*');
    return data
}

//delete

export const deleteFriend = async (id) => {
  await supabase
  .from('friends')
  .delete()
  .eq('id', id);
  window.location.reload();
}
