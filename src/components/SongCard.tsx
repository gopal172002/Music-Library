import React, { useState } from 'react';
import {
    Card,
    CardMedia,
    Typography,
    IconButton,
    Box,
    Tooltip
} from '@mui/material';
import {
    Delete as DeleteIcon,
    AccessTime as AccessTimeIcon,
    PlayCircleFilled as PlayCircleFilledIcon
} from '@mui/icons-material';
import type { SxProps, Theme } from '@mui/material';
import type { Song } from '../data/mockSongs';

interface SongCardProps {
    song: Song & { coverImage?: string };
    onDelete?: (id: number) => void;
    isAdmin?: boolean;
    sx?: SxProps<Theme>;
}

const SongCard: React.FC<SongCardProps> = ({ song, onDelete, isAdmin, sx }) => {
    const [hovered, setHovered] = useState(false);
    const spotifyGreen = '#1DB954';
    const coverImage = song.coverImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIXhNzfdiN9Cn-x2qjSAY-zxAuyYlCrzXxJQ&s';

    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                minHeight: 64,
                boxShadow: 'none',
                borderRadius: 0,
                background: '#181818',
                m: 0,
                p: 0,
                position: 'relative',
                '&:hover': {
                    background: '#232323'
                },
                transition: 'background 0.2s',
                ...sx
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
           
            <Box sx={{ position: 'relative', width: 48, height: 48, minWidth: 48, minHeight: 48, mx: 2 }}>
                <CardMedia
                    component="img"
                    image={coverImage}
                    alt={song.title}
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1,
                        objectFit: 'cover',
                        filter: hovered ? 'brightness(0.7)' : 'none',
                        transition: 'filter 0.2s'
                    }}
                />
                {hovered && (
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: spotifyGreen,
                            bgcolor: 'rgba(0,0,0,0.7)',
                            p: 0,
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' }
                        }}
                        size="large"
                    >
                        <PlayCircleFilledIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                )}
            </Box>
           
            <Box sx={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 700,
                        color: 'white',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: 16
                    }}
                >
                    {song.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, marginTop: 1, alignItems: 'center', minWidth: 0 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#b3b3b3',
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: 13
                        }}
                    >
                        {song.artist}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#888',
                            fontWeight: 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: 12
                        }}
                    >
                        • {song.album}
                    </Typography>
                </Box>
            </Box>
            
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: isAdmin ? 0 : 3 }}>
                <AccessTimeIcon sx={{ color: '#b3b3b3', fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" sx={{ color: '#b3b3b3', fontWeight: 500, fontSize: 13 }}>
                    {song.duration}
                </Typography>
            </Box>
            
            {isAdmin && onDelete && (
                <Tooltip title="Delete Song">
                    <IconButton
                        onClick={() => onDelete(song.id)}
                        color="error"
                        size="small"
                        sx={{
                            ml: 1,
                            color: '#fff',
                            '&:hover': {
                                color: spotifyGreen,
                                bgcolor: 'rgba(40,40,40,0.7)'
                            }
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Card>
    );
};

export default SongCard; 