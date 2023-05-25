import { Box, useTheme } from "@mui/material";
import NextImage from 'next/image';
import { getPrimaryColor } from "../../lib/theme";

const Gem = ({ size = 50, sx, empty = false, type }) => {
    const theme = useTheme();

    if (!type) {
        type = theme.laserbeatzMode;
    }

    const getGemIcon = (gemType) => {
        switch (gemType) {
            case 'emerald':
                return 'gem-emerald.png';
            case 'ember':
                return 'gem-ember.png';
            case 'ruby':
                return 'gem-ruby.png';
            default:
                return 'gem-emerald.png';
        }
    }

    return (
        <Box sx={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', ...sx }}>
            {empty
                ? <Box sx={{ width: size - 5, height: size - 5, border: `1px solid ${getPrimaryColor(type)}`, borderRadius: 50 }} />
                : <NextImage layout='fill' src={`/img/icons/${getGemIcon(type)}`} />
            }
        </Box>
    );
}

export default Gem;