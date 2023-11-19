import { useEffect } from 'react';
import './chat.css'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function ChatElement(props) {
    console.log(props.inbox);
    // const messagesRef = collection(props.db,"chats", props.inbox['ad']+'_'+props.inbox['user']);

    
    useEffect(()=>{
        
    }, [])
    return (
        <div className="">
            <p>{props.inbox.ad}_{props.inbox.user}</p>
        </div>
    );
}