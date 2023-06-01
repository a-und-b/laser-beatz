import { useRouter } from "next/router";
import { useEffect } from "react";


const ScannedQuest = () => {
    const router = useRouter();

    useEffect(() => {
        if (router) {
            console.log(router.query.slug[0].split('-')[1]);
            console.log(router);
            switch (router.query.slug[0].split('-')[1]) {
                case '1':
                    router.push('/questDreamDecoder');
                    break;
                case '2':
                    router.push('/questDigitalDistrict');
                    break;
                case '3':
                    router.push('/questCryptoStation');
                    break;
                case '4':
                    router.push('/');
                    break;
                case '5':
                    router.push('/');
                    break;
                case '6':
                    router.push('/');
                    break;
                case '7':
                    router.push('/');
                    break;
                case '8':
                    router.push('/questFutureLab');
                    break;
                case '9':
                    router.push('/questMangaCorner');
                    break;
                case '10':
                    router.push('/questArcadeStation');
                    break;
                case '11':
                    router.push('/questNeonSchminke');
                    break;
                case '12':
                    router.push('/questGrafittiStation');
                    break;
                case '13':
                    router.push('/questAutoTuning');
                    break;
                case '14':
                    router.push('/');
                    break;
                case '15':
                    router.push('/');
                    break;
            }
        }
    }, []);

    return (
        <></>
    );
}

export default ScannedQuest;