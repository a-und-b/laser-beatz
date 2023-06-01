import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../provider/GlobalProvider";


const ScannedQuest = () => {
    const router = useRouter();
    const { user } = useContext(GlobalContext);

    const solveQuest = async (questId) => {
        const quest = user.quests.filter((quest) => quest.questId === questId)[0];
        await updateQuest(user, quest);

        if (false) {
            router.push('/finishedSideQuest');
        }
    };

    useEffect(() => {
        if (router) {
            console.log(router.query.slug[0].split('-')[1]);
            console.log(router);
            const questId = router.query.slug[0].split('-')[1];
            solveQuest(questId);
            // SCAN ORIGIN
        }
    }, []);

    return (
        <></>
    );
}

export default ScannedQuest;