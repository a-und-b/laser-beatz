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
                return 'gem-emerald.svg';
            case 'ember':
                return 'gem-ember.svg';
            case 'ruby':
                return 'gem-ruby.svg';
            default:
                return 'gem-emerald.svg';
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