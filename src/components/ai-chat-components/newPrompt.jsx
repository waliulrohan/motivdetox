'use client'
import { useForm } from "react-hook-form";
import { ArrowUp } from 'lucide-react';
import model from "@/lib/gemini";
import MessageItem from "./messageItem";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const NewPrompt = ({messages, conversationId}) => {
    const [message, setMessage] = useState("");
    const [answer, setAnswer] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const endRef = useRef(null);
    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    }, [answer, message]);

    const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			message: '',
		},
	});

    const chat = model.startChat({
        history: messages.map(message => ({
          role: message.role,
          parts: [{ text: message.parts[0].text }]
        })),
        generationConfig: {
        //   maxOutputTokens: 200,
        },
      });

     const queryClient = useQueryClient();

     const mutation = useMutation({
        mutationFn: async({text, role}) => {
           const response = await axios.post(`/api/ai/chat`, { text, isNewConversation: false, conversationIdFromBody: conversationId, role });
           return response;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["messages", conversationId] })
          .then(() => {
            setAnswer('');
            setMessage('');
            setIsProcessing(false);
          });
        },
        onError: (err) => {
          console.log("error in mutation : ", err);
          setIsProcessing(false);
        },
     });

     const add = async (text, isInitial) => {
      setIsProcessing(true);
      if (!isInitial) setMessage(text);
  
      try {
        const result = await chat.sendMessageStream(text);
        let accumulatedText = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            accumulatedText += chunkText;
            setAnswer(accumulatedText);
        }
        if(!isInitial) {
          mutation.mutate({text, role: "user"});
          console.log('inside is initial')
        }
        console.log(accumulatedText)
        mutation.mutate({text: accumulatedText, role: "model"});
        console.log(accumulatedText)

      } catch (err) {
        console.log(err);
      }
    };
  

	const onSubmit = async(data) => {
    add(data.message, false);
	};

   // THE USE EFFECT WILL MAKE IT SAVE IN THE DATABASE TWICE IN DEVELOPMENT
   // IN PRODUCTION WE DON'T NEED IT
   const hasRun = useRef(false);

   useEffect(() => {
     if (!hasRun.current) {
       if (messages?.length === 1) {
         add(messages[0].parts[0].text, true);
       }
     }
     hasRun.current = true;
   }, []);

  return (
    <>
     {message && <MessageItem key={Math.random()} message={message} role="user" />}
     {answer && (
       <MessageItem
         key={Math.random()}
         message={
           <Markdown
            
           >
             {answer}
           </Markdown>
         }
         role="model"
       />
     )}

     <div ref={endRef} />
    <div className="w-full p-4 flex flex-row items-center justify-center fixed bottom-0 left-0 right-0">
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row gap-2 items-center justify-center w-4/5 bg-slate-600 py-2 px-4 rounded-lg"
        >
            <div className="flex-grow relative">
                <textarea
                    autoCorrect='off'
                    id="message"
                    {...register('message', { required: 'Message is required' })}
                    className="block w-full bg-transparent text-white outline-none resize-none rounded-md p-2 pr-10 min-h-[40px] max-h-[120px]"
                    placeholder="Enter your message"
                    rows={1}
                    onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                />
            </div>

            <button
                type="submit"
                className="rounded-full bg-blue-500 hover:bg-blue-600 transition-colors px-3 py-3 text-white"
            >
                <ArrowUp size={20} />
            </button>
        </form>
    </div>

    </>
  );
};

export default NewPrompt;