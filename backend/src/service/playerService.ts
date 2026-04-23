import { supabase } from "../../supabaseClient";

// Definimos la interfaz para mantener la estructura de datos clara
interface Player {
    id: string;
    nickname: string;
    level: number;
    trophies: any[];
}

/**
 * Crea un nuevo jugador en la tabla de Supabase aceptando trofeos.
 */
export const createPlayerService = async (nickname: string, level: number, trophies: any[] = []): Promise<Player> => {
    const { data, error } = await supabase
        .from('players')
        .insert([{ 
            nickname, 
            level, 
            trophies // <--- AHORA SÍ guarda lo que envías desde el front
        }])
        .select();

    if (error) {
        console.error("Error al crear jugador:", error);
        throw error;
    }
    return data[0];
};
/**
 * Añade un trofeo a un jugador aceptando CUALQUIER juego.
 */
export const addTrophyService = async (playerId: string, trophy: { game: string, tournament: string }) => {
    // 1. Buscamos al jugador actual
    const { data: player, error: fetchError } = await supabase
        .from('players')
        .select('trophies')
        .eq('id', playerId)
        .single();

    if (fetchError || !player) throw new Error("Jugador no encontrado");

    // 2. Preparamos el nuevo array (si es null, creamos uno vacío)
    const currentTrophies = player.trophies || [];
    const updatedTrophies = [...currentTrophies, trophy];

    // 3. Actualizamos
    const { data, error: updateError } = await supabase
        .from('players')
        .update({ trophies: updatedTrophies })
        .eq('id', playerId)
        .select()
        .single();

    if (updateError) throw updateError;
    return data;
};
/**
 * Obtiene el perfil de un jugador por su ID directamente de la DB.
 */
export const getPlayerByIdService = async (id: string): Promise<Player | null> => {
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;
    return data;
};

/**
 * Obtiene todos los jugadores y aplica la lógica automática de trofeos.
 */
export const getPlayersService = async () => {
    const { data: players, error } = await supabase
        .from('players')
        .select('id, nickname, level, trophies') // Recuperar los trofeos como un array completo
        .order('created_at', { ascending: false }); // Ordenar por fecha de creación

    if (error) {
        console.error("Error al obtener jugadores:", error);
        return [];
    }

    // MAPEO: Ajustar para incluir títulos de trofeos
    return players.map(player => {
        let displayNickname = player.nickname;

        // Lógica Automática: Nivel >= 90 pone trofeo
        if (player.level >= 90) {
            displayNickname += " 🏆";
        }

        // Si tiene trofeos reales en Supabase, agrega detalles
        const trophiesDetails = player.trophies && Array.isArray(player.trophies)
            ? player.trophies.map(trophy => {
                const game = trophy.game || "Juego desconocido";
                const tournament = trophy.tournament || "Torneo desconocido";
                return `${game} - ${tournament}`;
            }).join(', ')
            : '';

        return {
            ...player,
            nickname: displayNickname,
            trophiesDetails // Agregar detalles de trofeos al objeto
        };
    });
};

/**
 * Elimina un jugador de la base de datos.
 */
export const deletePlayerService = async (id: string): Promise<void> => {
    const { error } = await supabase.from('players').delete().eq('id', id);
    if (error) {
        console.error("Error al eliminar jugador:", error);
        throw error;
    }
};
