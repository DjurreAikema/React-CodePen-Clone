import React, {useState} from 'react'
import './Editor.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import {Controlled as ControlledEditor} from 'react-codemirror2'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompressAlt, faExpandAlt} from '@fortawesome/free-solid-svg-icons'

export default function Editor(props) {
    const [open, setOpen] = useState(true)

    const {
        language,
        name,
        value,
        onChange
    } = props

    function handleChange(editor, data, value) {
        onChange(value)
    }

    return (
        <div className={`editor ${open ? '' : 'editor__collapsed'}`}>
            <div className="editor__title">
                {name}
                <button onClick={() => setOpen(prevOpen => !prevOpen)} type="button" className="editor__button">
                    <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
                </button>
            </div>
            <ControlledEditor 
                onBeforeChange={handleChange}
                value={value}
                className="editor__codeMirror"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true
                }}
            />
        </div>
    )
}
