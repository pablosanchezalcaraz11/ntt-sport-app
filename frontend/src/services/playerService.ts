import { supabase } from "../supabaseClient";

export const getPlayersService = async () => {
    const { data, error } = await supabase.from('players').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
};

export const createPlayerService = async (nickname: string, level: number, trophies: any[] = []) => {
    const { data, error } = await supabase.from('players').insert([{ nickname, level, trophies }]).select();
    if (error) throw error;
    return data[0];
};

export const deletePlayerService = async (id: string) => {
    const { error } = await supabase.from('players').delete().eq('id', id);
    if (error) throw error;
};

export const addTrophyService = async (id: string, newTrophy: { game: string, tournament: string }) => {
    const { data: player, error: fetchError } = await supabase.from('players').select('trophies').eq('id', id).single();
    if (fetchError) throw fetchError;
    const updatedTrophies = [...(player.trophies || []), newTrophy];
    const { data, error: updateError } = await supabase.from('players').update({ trophies: updatedTrophies }).eq('id', id).select();
    if (updateError) throw updateError;
    return data[0];
};