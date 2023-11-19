import ChatContent from "../components/chatContent";
import InboxListing from "../components/inboxListing";
import './chatroom.css'
import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { doc, onSnapshot, orderBy, query, collection, where, or, startAt, endAt, collectionGroup } from "firebase/firestore";

function ChatPage() {
    const firebaseConfig = {
        apiKey: "AIzaSyD7lp21yJF8P3wR_R1yY9o6zfhmJA5NNE0",
        authDomain: "seconds-50f08.firebaseapp.com",
        databaseURL: "https://seconds-50f08-default-rtdb.firebaseio.com",
        projectId: "seconds-50f08",
        storageBucket: "seconds-50f08.appspot.com",
        messagingSenderId: "154634392802",
        appId: "1:154634392802:web:52a5a3ab969ac1da897abb",
        measurementId: "G-7G5L17N6TL"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [inboxes, setInboxes] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState();
    const user = "6";


    const ad_id = "23";
    const user_id = "6";

    useEffect(()=>{
        const q = query(collectionGroup(db, "chats"),
            or(where("ad", "==", ad_id),
            where("user", "==", user_id)),
            );
        const unsub = onSnapshot(q, (querySnapshot) => {
            const chats = [];
            querySnapshot?.forEach((doc, collection) => {
                chats.push({"key":doc.id, "data":doc.data()});
            });
            setInboxes(chats)
        })

        return () => {
            unsub();
        };

    }, []);

    

    return (
        <div className="page-boundary flex-row">
            <InboxListing inboxes={inboxes} setChat={setChat} />
            <ChatContent messages={messages} chat={chat} db={db} setMessages={setMessages} user_id={user_id}/>
        </div>
    )
}

export default ChatPage;