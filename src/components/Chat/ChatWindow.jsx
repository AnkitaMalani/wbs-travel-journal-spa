/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { getChatHistory } from '@/data';
import Form from './Form';
import Chat from './Chat';
function ChatWindow() {
  // let us reference DOM element for scroll effect
  const chatRef = useRef();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(localStorage.getItem('chatId'));

  // scroll to bottom of chat when new message is added
  useEffect(() => {
    chatRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  useEffect(() => {
    const getAndSetChatHistory = async () => {
      try {
        const { history } = await getChatHistory(chatId);

        if (!history) throw new Error('History not found');

        setMessages(history);
      } catch (error) {
        console.log(error);
        localStorage.removeItem('chatId');
      }
    };

    chatId && getAndSetChatHistory();
  }, []);

  return (
    <div className='h-screen container mx-auto p-5 flex flex-col justify-between gap-5'>
      <Chat chatRef={chatRef} messages={messages} />
      <Form chatRef={chatRef} setMessages={setMessages} chatId={chatId} setChatId={setChatId} />
      <ToastContainer autoClose={1500} theme='colored' />
    </div>
  );
}

export default ChatWindow;