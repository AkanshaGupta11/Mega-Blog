import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

//control hi react hook form -->  res for taking state 
export default function RTE({
    name,
    control,
    label,
    defaultVal = ""
}) {
  return (

    // initialValue: This prop sets the initial content that will be displayed in the TinyMCE editor when it first loads.
    //  In this case, the editor will start with the text "default val".
    // <Editor 
    //     initialValue = "default val"
    //     init = {
    //         {branding : false,
    //         height: 500,
    //         // menubar: true,: This option controls the visibility of the editor's menubar 
    //         // (the menu bar at the very top of the editor, typically containing "File", "Edit", "View", "Insert", "Format", "Tools", and "Help"). Setting it to true makes it visib
    //         menubar: true,
    //         plugins: ["image",
    //             "advlist",
    //             "autolink",
    //             "lists",
    //             "link",
    //             "image",
    //             "charmap",
    //             "preview",
    //             "anchor",
    //             "searchreplace",
    //             "visualblocks",
    //             "code",
    //             "fullscreen",
    //             "insertdatetime",
    //             "media",
    //             "table",
    //             "code",
    //             "help",
    //             "wordcount",
    //             "anchor",

    //         ],
    //         // toolbar: "...": This string defines the buttons that will appear in the editor's toolbar. 
    //         // The | acts as a separator to group buttons.
    //         toolbar:
    //         "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
    //         content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
    //         }
    //     }
    // />

<div className='w-full'>
    {label &&
    <label className='inline-block mb-1 pl-1'>
        {label}
    </label> }
        {/* //docs */}
    <Controller
    name = {name || "content"}
    control = {control} 


    render = {({field: {onChange}})=>(
        <Editor 
        initialValue = {defaultVal}
        init = {
            {
            initialValue: defaultVal,
            height: 500,
            // menubar: true,: This option controls the visibility of the editor's menubar 
            // (the menu bar at the very top of the editor, typically containing "File", "Edit", "View", "Insert", "Format", "Tools", and "Help"). Setting it to true makes it visib
            menubar: true,
            plugins: ["image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",

            ],
            // toolbar: "...": This string defines the buttons that will appear in the editor's toolbar. 
            // The | acts as a separator to group buttons.
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }
        }
        onEditorChange={onChange}
    />
    )}
    /> 

</div>
  )
}

// editor seperate jagah bn rha 
// vha se khi tho use krenge ==> how will get ref  --> y tho forwardrefy --> controller reacthook form 