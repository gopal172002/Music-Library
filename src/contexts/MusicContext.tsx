import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Song } from '../data/mockSongs';
import { mockSongs } from '../data/mockSongs';

interface MusicContextType {
    songs: Song[];
    filteredSongs: Song[];
    groupedSongs: Record<string, Song[]>;
    filterBy: (field: keyof Song, value: string) => void;
    sortBy: (field: keyof Song) => void;
    groupBy: (field: keyof Song) => void;
    clearFilters: () => void;
    addSong: (song: Omit<Song, 'id'>) => void;
    deleteSong: (id: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        console.error('MusicContext is undefined. Make sure MusicProvider is wrapping the component.');
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [songs, setSongs] = useState<Song[]>(mockSongs);
    const [filterField, setFilterField] = useState<keyof Song | null>(null);
    const [filterValue, setFilterValue] = useState('');
    const [sortField, setSortField] = useState<keyof Song>('title');
    const [groupField, setGroupField] = useState<keyof Song>('album');

    const filterBy = useCallback((field: keyof Song, value: string) => {
        setFilterField(field);
        setFilterValue(value);
    }, []);

    const sortBy = useCallback((field: keyof Song) => {
        setSortField(field);
    }, []);

    const groupBy = useCallback((field: keyof Song) => {
        setGroupField(field);
    }, []);

    const clearFilters = useCallback(() => {
        setFilterField(null);
        setFilterValue('');
        setSortField('title');
        setGroupField('album');
    }, []);

    const addSong = useCallback((song: Omit<Song, 'id'>) => {
        setSongs(prev => [...prev, { ...song, id: Math.max(...prev.map(s => s.id)) + 1 }]);
    }, []);

    const deleteSong = useCallback((id: number) => {
        setSongs(prev => prev.filter(song => song.id !== id));
    }, []);

    const filteredSongs = useMemo(() => {
        let result = [...songs];


        if (filterField && filterValue) {
            result = result.filter(song => {
                const fieldValue = String(song[filterField]).toLowerCase();
                return fieldValue.includes(filterValue.toLowerCase());
            });
        }


        result.sort((a, b) => {
            const aValue = String(a[sortField]).toLowerCase();
            const bValue = String(b[sortField]).toLowerCase();
            return aValue.localeCompare(bValue);
        });

        return result;
    }, [songs, filterField, filterValue, sortField]);

    const groupedSongs = useMemo(() => {
        if (!filteredSongs.length) {
            return { 'All Songs': [] };
        }

        return filteredSongs.reduce((groups, song) => {
            const key = String(song[groupField]);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(song);
            return groups;
        }, {} as Record<string, Song[]>);
    }, [filteredSongs, groupField]);

    const value = {
        songs,
        filteredSongs,
        groupedSongs,
        filterBy,
        sortBy,
        groupBy,
        clearFilters,
        addSong,
        deleteSong
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
}; 