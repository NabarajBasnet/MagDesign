'use client'

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const User = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: <>Hello World! 👁</>
    })
    return (
        <>
            <div>
                <h1>User</h1>
                <EditorContent editor={editor} />
            </div>
        </>
    )
}

export default User;