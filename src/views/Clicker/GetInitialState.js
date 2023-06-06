import firebaseApp from "../../firebase/credentials"

import { getFirestore } from "firebase/firestore";

const initialState = {
    clicks: { amount: 0 },
    auto: { cost: 10, amount: 0 },
    double: { cost: 20, amount: 0 },
    multi: { cost: 100, amount: 0 },
    mega: { cost: 1000, amount: 0 },
    ultra: { cost: 10000, amount: 0 },
    monster: { cost: 100000, amount: 0 },
  };

export default function getInitialState ({user})  {

  try{

    const db = getFirestore(firebaseApp)

    const userSnapshot = db.collection(process.env.REACT_APP_FIRESTORE_COLLECTION).doc(user.email).get()

    if (userSnapshot.exists()){

      return userSnapshot.data()

    }else {

      return initialState

    }

  }catch(error){

    console.log(error)

    return initialState 

  }

}
  
