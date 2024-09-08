'use client'
import { useForm } from "react-hook-form";
import { ArrowUp } from 'lucide-react';
import model from "@/lib/gemini";
import MessageItem from "./messageItem";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

const NewPrompt = () => {
    const [message, setMessage] = useState("");
    const [answer, setAnswer] = useState("");

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
        history: [
        //   data?.history.map(({ role, parts }) => ({
        //     role,
        //     parts: [{ text: parts[0].text }],
        //   })),
        ],
        generationConfig: {
        //   maxOutputTokens: 200,
        },
      });

	const onSubmit = async(data) => {
		// Handle form submission
		console.log(data);
        setMessage(data.message);
        
        const result = await chat.sendMessageStream(data.message);
        let accumulatedText = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            accumulatedText += chunkText;
            setAnswer(accumulatedText);
        }

	};

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
    <div className="w-full p-4 flex flex-row items-center justify-center sticky bottom-0">
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