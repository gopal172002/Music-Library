import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Paper,
    Collapse,
    Stack,
    Tooltip,
    InputAdornment,
    Button
} from '@mui/material';
import {
    Clear as ClearIcon,
    Search as SearchIcon,
    Sort as SortIcon,
    Group as GroupIcon
} from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import type { Song } from '../data/mockSongs';

interface FilterControlsProps {
    onFilter: (field: keyof Song, value: string) => void;
    onSort: (field: keyof Song) => void;
    onGroupBy: (field: keyof Song) => void;
    onClear: () => void;
}

const filterFields: { value: keyof Song; label: string }[] = [
    { value: 'title', label: 'Title' },
    { value: 'artist', label: 'Artist' },
    { value: 'album', label: 'Album' },
    { value: 'genre', label: 'Genre' },
    { value: 'year', label: 'Year' }
];

const FilterControls: React.FC<FilterControlsProps> = ({
    onFilter,
    onSort,
    onGroupBy,
    onClear
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [filterField, setFilterField] = useState<keyof Song>('title');
    const [filterValue, setFilterValue] = useState('');
    const [sortField, setSortField] = useState<keyof Song>('title');
    const [groupField, setGroupField] = useState<keyof Song>('album');
    const [hasActiveFilters, setHasActiveFilters] = useState(false);

    useEffect(() => {
        if (filterValue.trim()) {
            onFilter(filterField, filterValue);
        } else {
            onClear();
        }

        const hasActiveFilter = filterValue.trim() !== '';
        const hasActiveSort = sortField !== 'title';
        const hasActiveGroup = groupField !== 'album';
        setHasActiveFilters(hasActiveFilter || hasActiveSort || hasActiveGroup);
    }, [filterField, filterValue, onFilter, onClear, sortField, groupField]);

    useEffect(() => {
        onSort(sortField);

        const hasActiveFilter = filterValue.trim() !== '';
        const hasActiveSort = sortField !== 'title';
        const hasActiveGroup = groupField !== 'album';
        setHasActiveFilters(hasActiveFilter || hasActiveSort || hasActiveGroup);
    }, [sortField, onSort, filterValue, groupField]);

    useEffect(() => {
        onGroupBy(groupField);

        const hasActiveFilter = filterValue.trim() !== '';
        const hasActiveSort = sortField !== 'title';
        const hasActiveGroup = groupField !== 'album';
        setHasActiveFilters(hasActiveFilter || hasActiveSort || hasActiveGroup);
    }, [groupField, onGroupBy, filterValue, sortField]);

    const handleClearFilters = () => {
        setFilterValue('');
        setFilterField('title');
        setSortField('title');
        setGroupField('album');
        onClear();
        setHasActiveFilters(false);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Button
                onClick={() => setIsExpanded(!isExpanded)}
                startIcon={isExpanded ? <FilterListOffIcon /> : <FilterListIcon />}
                sx={{
                    bgcolor: '#1DB954',
                    color: 'white',
                    '&:hover': {
                        bgcolor: '#1ed760',
                        transform: 'scale(1.02)',
                    },
                    boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
                    borderRadius: '25px',
                    px: 3,
                    py: 1.5,
                    minWidth: 120,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease-in-out',
                }}
            >
                {isExpanded ? 'Hide Filters' : 'Show Filters'}
            </Button>

            <Collapse in={isExpanded}>
                <Paper
                    elevation={0}
                    sx={{
                        bgcolor: '#282828',
                        border: '1px solid #404040',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        mt: 3,
                        width: '100%',
                        '&:hover': {
                            borderColor: '#1DB954',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                        }
                    }}
                >
                    <Box sx={{ p: 4, width: '100%' }}>
                        <Stack
                            direction="row"
                            spacing={4}
                            alignItems="center"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            sx={{ width: '100%' }}
                        >

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1, minWidth: 300 }}>
                                <SearchIcon sx={{ color: '#1DB954', fontSize: 20 }} />
                                <FormControl sx={{ minWidth: 160 }} size="small">
                                    <InputLabel sx={{ color: '#b3b3b3' }}>Filter By</InputLabel>
                                    <Select
                                        value={filterField}
                                        label="Filter By"
                                        onChange={(e) => setFilterField(e.target.value as keyof Song)}
                                        sx={{
                                            bgcolor: '#3E3E3E',
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#404040',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#1DB954',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#1DB954',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#1DB954',
                                            }
                                        }}
                                    >
                                        {filterFields.map((field) => (
                                            <MenuItem
                                                key={field.value}
                                                value={field.value}
                                                sx={{
                                                    bgcolor: '#3E3E3E',
                                                    color: 'white',
                                                    '&:hover': {
                                                        bgcolor: '#404040',
                                                    },
                                                    '&.Mui-selected': {
                                                        bgcolor: '#1DB954',
                                                        '&:hover': {
                                                            bgcolor: '#1ed760',
                                                        }
                                                    }
                                                }}
                                            >
                                                {field.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="Search..."
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                    size="small"
                                    sx={{
                                        minWidth: 220,
                                        flex: 1,
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: '#3E3E3E',
                                            color: 'white',
                                            '& fieldset': {
                                                borderColor: '#404040',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1DB954',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1DB954',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#b3b3b3',
                                            '&.Mui-focused': {
                                                color: '#1DB954',
                                            }
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'white',
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: filterValue && (
                                            <InputAdornment position="end">
                                                <Tooltip title="Clear search">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => setFilterValue('')}
                                                        edge="end"
                                                        sx={{ color: '#1DB954' }}
                                                    >
                                                        <ClearIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>


                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, minWidth: 200 }}>
                                <SortIcon sx={{ color: '#1DB954', fontSize: 20 }} />
                                <FormControl sx={{ minWidth: 160 }} size="small">
                                    <InputLabel sx={{ color: '#b3b3b3' }}>Sort By</InputLabel>
                                    <Select
                                        value={sortField}
                                        label="Sort By"
                                        onChange={(e) => setSortField(e.target.value as keyof Song)}
                                        sx={{
                                            bgcolor: '#3E3E3E',
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#404040',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#1DB954',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#1DB954',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#1DB954',
                                            }
                                        }}
                                    >
                                        {filterFields.map((field) => (
                                            <MenuItem
                                                key={field.value}
                                                value={field.value}
                                                sx={{
                                                    bgcolor: '#3E3E3E',
                                                    color: 'white',
                                                    '&:hover': {
                                                        bgcolor: '#404040',
                                                    },
                                                    '&.Mui-selected': {
                                                        bgcolor: '#1DB954',
                                                        '&:hover': {
                                                            bgcolor: '#1ed760',
                                                        }
                                                    }
                                                }}
                                            >
                                                {field.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>


                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, minWidth: 200 }}>
                                <GroupIcon sx={{ color: '#1DB954', fontSize: 20 }} />
                                <FormControl sx={{ minWidth: 160 }} size="small">
                                    <InputLabel sx={{ color: '#b3b3b3' }}>Group By</InputLabel>
                                    <Select
                                        value={groupField}
                                        label="Group By"
                                        onChange={(e) => setGroupField(e.target.value as keyof Song)}
                                        sx={{
                                            bgcolor: '#3E3E3E',
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#404040',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#1DB954',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#1DB954',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#1DB954',
                                            }
                                        }}
                                    >
                                        {filterFields.map((field) => (
                                            <MenuItem
                                                key={field.value}
                                                value={field.value}
                                                sx={{
                                                    bgcolor: '#3E3E3E',
                                                    color: 'white',
                                                    '&:hover': {
                                                        bgcolor: '#404040',
                                                    },
                                                    '&.Mui-selected': {
                                                        bgcolor: '#1DB954',
                                                        '&:hover': {
                                                            bgcolor: '#1ed760',
                                                        }
                                                    }
                                                }}
                                            >
                                                {field.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>


                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, minWidth: 220, flex: '0 0 auto' }}>
                                {hasActiveFilters && (
                                    <Tooltip title="Clear all filters">
                                        <Button
                                            onClick={handleClearFilters}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                borderColor: '#1DB954',
                                                color: '#1DB954',
                                                '&:hover': {
                                                    borderColor: '#1ed760',
                                                    bgcolor: 'rgba(29, 185, 84, 0.1)',
                                                },
                                                borderRadius: '20px',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Clear All
                                        </Button>
                                    </Tooltip>
                                )}
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
            </Collapse>
        </Box>
    );
};

export default FilterControls; 