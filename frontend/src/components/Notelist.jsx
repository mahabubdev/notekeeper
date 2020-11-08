import React from 'react'
import Note from './Note'
import axios from 'axios'
import { message } from 'antd'
import { baseURL } from '../config/api'

const NoteList = ({ notes, actions }) => {

    // message alerts
    const actionsError = (msg) => {
        message.error(msg)
    }

    const actionsMsg = (msg) => {
        message.success(msg)
    }

    // actions
    const deleteNote = async (noteID) => {
        await axios.delete( baseURL + '/del/' + noteID )
        .then(res => {
            actions()
            actionsMsg(res.data.msg)
        })
        .catch(err => {
            // console.log('Error: ' + err.message)
            actionsError(err.message)
        })
    }

    const editNote = async (noteID, reqdata) => {
        await axios.put( baseURL + '/edit/' + noteID, reqdata, {
            headers: {
                'Content-Type': 'application/json'
            }
        } )
        .then(res => {
            actions()
            actionsMsg(res.data.msg)
        })
        .catch(err => {
            // console.log('Error: ' + err.message)
            actionsError(err.message)
        })
    }

    return(
        <>
            {
                notes.map(note => (
                    <Note key={note._id} data={note} del={deleteNote} edit={editNote} />
                ))
            }
        </>
    )
}

export default NoteList