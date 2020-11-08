import React, { useState, useEffect } from 'react'

import axios from 'axios'

import {
    message,
    Skeleton
} from 'antd'


import NoteList from './../components/Notelist'

import { baseURL } from '../config/api'

const HomePage = () => {

    const [loading, setLoading] = useState(true)

    const setReload = () => setLoading(true)

    const [newnote, setNewnote] = useState({ text: '' })

    const [allnotes, setAllnotes] = useState({
        loaded: false,
        data: null
    })

    const resetThisNote = () => setNewnote({ text: '' })

    const onChangeThisNote = (event) => {
        setNewnote({
            ...newnote,
            [event.target.name]: event.target.value
        })
    }

    const sendNewNote = (event) => {
        event.preventDefault()
        // send create request
        axios.post(baseURL + '/create', newnote, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            setLoading(true)
        })
        .catch(err => {
            console.log('Error : ' + err.message)
        })
        // reset
        resetThisNote()
    }

    // fetch all notes
    useEffect(() => {
        if (loading) {
            // reset not loaded
            setAllnotes({
                ...allnotes,
                loaded: false
            })

            axios.get(baseURL + '/all')
            .then(res => {
                // set updated data
                setAllnotes({
                    ...allnotes,
                    loaded: true,
                    data: res.data.notes
                })
            })
            .catch(err => {
                console.error(err.message)
            })

            setLoading(false)
        }
    }, [loading])

    return (
        <>
            <div className="page-wrapper">
                <h2>Note Keeper</h2>
                <div className="page-container">
                    <form onSubmit={ sendNewNote }>
                        <textarea rows={10} cols={50} placeholder="Write a new note" name="text" onChange={ onChangeThisNote } value={ newnote.text }></textarea>
                        <button className="btn_main" type="submit">
                            {
                                loading ? ('Please wait') : ('Add Note')
                            }
                        </button>
                        <hr />
                    </form>
                    <div className="all_notes">
                        <ul>
                            {
                                allnotes.loaded ? (
                                    allnotes.data &&  allnotes.data.length > 0 ? (
                                        <NoteList notes={allnotes.data} actions={setReload} />
                                    ) : (
                                        <li>Empty notes! Please create one</li>
                                    )
                                ) : (
                                    <Skeleton active />
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
