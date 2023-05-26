import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const Scanner = ({ isScanning, onScannedQRCode }) => {
    useEffect(() => {
        // if (isScanning) {
            const video = document.getElementById('reader');
            const html5Qrcode = new Html5Qrcode('reader', true);
            Html5Qrcode.getCameras().then(devices => {
                /**
                 * devices would be an array of objects of type:
                 * { id: "id", label: "label" }
                */
                if (devices && devices.length) {
                    html5Qrcode.start(
                        { facingMode: 'environment' },
                        {
                            fps: 10,    // Optional, frame per seconds for qr code scanning
                            qrbox: { width: 250, height: 500 }  // Optional, if you want bounded box UI
                        },
                        async (decodedText, decodedResult) => {
                            console.log('DECODED', decodedText);
                            onScannedQRCode(decodedText);
                            html5Qrcode.stop();
                        },
                        (errorMessage) => {
                            // ERROR IS THROWN WHEN NO BARCODE IS FOUND                            
                        })
                        .catch((err, b) => {
                            console.log('ERR', err, b)
                        });
                }
            }).catch(err => {
                // handle err
            });
        // }
    }, [isScanning]);

    return (
        <div id='reader' style={{
            height: '30vh', width: '100%', position: 'relative',
        }} />
    );
}

export default Scanner;