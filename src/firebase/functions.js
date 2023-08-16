import { getDocs,doc,setDoc, getDoc, } from "firebase/firestore";

import { collectionRef,db} from "./config";

async function getScore() {

    const scoreSnapshot = await getDocs(collectionRef);
    const scoreList = scoreSnapshot.docs.map(doc => doc.data());
    return(scoreList)
}

async function getTop3()
{
    const ladderBoard = await getScore()
    ladderBoard.sort((a,b)=>{
        return b.score-a.score;
    })
    
    const topThreeScores = ladderBoard.slice(0, 3);
    return topThreeScores;
}

async function addOrUpdateUser(name,score)
{

    const updatedName = name.toUpperCase();
    const docRef = doc(db, 'score-table', updatedName);

    const docSnapshot = await getDoc(docRef);

    //is user exists
    if(docSnapshot.exists())
    {
        const data = docSnapshot.data();
        const existingScore = Number(data.score)

        if(existingScore<score)
        {
            await setDoc(docRef, { name:updatedName, score:score }, { merge: true });
        }
    }
    
    //if user does not exist
    else
    {
        await setDoc(docRef, { name:updatedName, score:score }, { merge: true });
    }


}

export {getScore,addOrUpdateUser,getTop3}
