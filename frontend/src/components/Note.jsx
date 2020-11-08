import React, { useState } from 'react'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons'

import { Modal, Drawer, message } from 'antd'



const Note = ({ data, del, edit }) => {

    const { confirm } = Modal

    // edit drawer
    const [editview, setEditview] = useState(false)
    const closeEditView = () => setEditview(false)
    const openEditView = () => setEditview(true)

    const [newData, setNewData] = useState({ text: '' })
    const onchangeText = (event) => {
        setNewData({
            ...newData,
            [event.target.name]: event.target.value
        })
    }

    // actions handle
    const delNote = async () => {
        // del(data._id)
        confirm({
            title: 'Are you sure?',
            icon: <DeleteOutlined />,
            content: 'You want to delete this note. Then click OK',
            onOk() {
                del(data._id)
            }
        })
    }

    const editNote = (event) => {
        event.preventDefault()
        // edit(data._id, newData)
        if (newData.text.length < 2) {
            // error
            message.error('Error! it can\'t be empty or less that 2 characters')
        }
        else {
            // procced
            // message.success('Note updated...!')
            edit(data._id, newData)
        }
    }


    // styles
    const style = {
        li: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '10px 0',
            color: '#343434',
            padding: '5px 10px',
            minHeight: '40px',
            whiteSpace: 'pre-line',
            verticalAlign: 'bottom',
            borderBottom: '1px solid #CCDEFD'
        },
        noteText: {
            marginRight: '5px'
        },
        actions_wrap: {
            display: 'inline-block',
            height: '100%',
            marginleft: '6px'
        },
        actions: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '5px',
            cursor: 'pointer',
            color: '#FFFFFF',
            backgroundColor: '#5175EB',
            padding: '8px',
            borderRadius: '50%'
        }
    }

    return(
        <>
            <li style={style.li}>
                <span style={style.noteText}><i>{ data.text }</i></span>
                <span style={style.actions_wrap}>
                    <span style={style.actions}>
                        <EditOutlined onClick={ openEditView } />
                    </span>
                    <span style={style.actions}>
                        <DeleteOutlined onClick={ delNote } />
                    </span>
                </span>
            </li>

            <Drawer 
                placement={'right'}
                closable={true}
                title="Edit Note"
                visible={editview}
                onClose={closeEditView}
            >
             <textarea className="list_edit" rows={15} cols={27} name="text" defaultValue={data.text} onChange={onchangeText} />
             <br />
             <button type="submit" className="btn_main" onClick={editNote}>Update</button>
            </Drawer>
        </>
    )
}

export default Note