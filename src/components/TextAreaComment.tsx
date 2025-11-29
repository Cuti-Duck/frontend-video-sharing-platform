'use client'

import { useRef } from "react";

export function TextAreaComment({value,setValue,handle}:{value:string,setValue:(value:string)=>void, handle:()=>void}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const autoResize = () => {
        const t = textareaRef.current;
        if (!t) return;

        t.style.height = "auto"; // reset trước
        t.style.height = t.scrollHeight + "px"; // set theo nội dung
    };

    return (
        <div className="mt-2">
            <textarea 
                ref={textareaRef}
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                onInput={autoResize}
                className="
                    no-scrollbar
                    w-full 
                    border-b 
                    border-[#2f2f2f]
                    focus:border-white
                    outline-none 
                    resize-none 
                    pb-1 
                    transition-all"
                rows={1}
                placeholder="Add a Comment..."
            />
            {value.trim() &&
                <div className="flex justify-end">
                    <button onClick={()=>handle()} className="bg-[#2f2f2f] text-white px-4 py-1 rounded hover:bg-[#838383] transition">Submit</button>
                </div>
            }
        </div>
    )
}