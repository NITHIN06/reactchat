import { useEffect, useState } from "react";
import { doc, onSnapshot, orderBy, query, collection, where, or, startAt, endAt, collectionGroup } from "firebase/firestore";


export default function ChatContent(props) {
    const [ad_id,setAd_id]=useState();
    const [user_id,setUser]=useState();

    useEffect(()=>{

        const getChats = () =>{
            console.log(props?.chat)
            props.setMessages([]);
            const unsub = onSnapshot(collection(props.db, "chats", props?.chat, "messages"), (collection) => {
                const megs = []
                collection.forEach((doc) => {
                    megs.push({"key":doc.id, "data":doc.data()});
                });
                props.setMessages(megs);
            });

            return () => {
                unsub();
            };
        };
        props?.chat && getChats();
        setAd_id(props?.chat?.split("_")[0]);
        setUser(props?.chat?.split("_")[1]);
    },[props?.chat])
    return(
        <div className="half">
            <h1 className="bottom-border">{(props?.user_id===user_id) ? ad_id : user_id}</h1>
            <div className="flex-col">
            {props.messages.map((msg)=>(
                <ChatMessageBox msg={msg.data} send={props.user_id===msg.data.sender} key={msg.key}/>
            ))}
            </div>
        </div>
    )
}

function ChatMessageBox(props)
{
    
    return(
        <div className={`${props?.send ? "chat_right" : "chat_left"} chat_box`} >
            <p>{props?.msg?.text}</p>
        </div>
    )
}