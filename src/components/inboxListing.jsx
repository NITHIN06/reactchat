import { useEffect, useState } from 'react';
import './chat.css'
import ChatElement from './ChatElement';
import { doc, onSnapshot, orderBy, query, collection, where, or, startAt, endAt, collectionGroup } from "firebase/firestore";

export default function InboxListing({inboxes,setChat}) {
    
    return (
        <div className="half right-border">
            <h1 className='bottom-border'>Inbox</h1>
            <div className="chats">
                <ul>
                    {
                        inboxes.map((inbox) => (
                            <li key={inbox.key} onClick={()=>{setChat(inbox.key)}}><ChatElement inbox={inbox.data} /></li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}