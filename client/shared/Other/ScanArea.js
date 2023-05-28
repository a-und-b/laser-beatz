import { useTheme } from "@mui/material";
import ScanPlaceholder from "./ScanPlaceholder";
import Scanner from "./Scanner";

const ScanArea = ({ isScanning, onScannedQRCode }) => {
    const theme = useTheme();

    return (
        <>
            {
                isScanning
                    ? (
                        <Scanner isScanning={isScanning} onScannedQRCode={onScannedQRCode} />
                    )
                    : (
                        <ScanPlaceholder fill={theme.palette.primary.main} />
                    )
            }
        </>
    );
}

export default ScanArea;