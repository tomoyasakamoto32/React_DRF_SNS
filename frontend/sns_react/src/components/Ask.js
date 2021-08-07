import React, {useState, useEffect, useContext} from 'react'
import {ApiContext} from '../context/ApiContext'
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {RiMailAddLine} from 'react-icons/ri';
import {IoMdClose} from 'react-icons/io';
import {IoMdSend} from 'react-icons/io';
import {IoIosSend} from 'react-icons/io';

const useStyles = makeStyles((theme)=>({
    button: {
        margin: theme.spacing(1),
    },
    text: {
        margin: theme.spacing(3),
    }
})
)

const Ask = (props) => {
    const classes = useStyles()
    Modal.setAppElement('#root')
    const {changeApprovalRequest, sendDMCont} = useContext(ApiContext)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [text, setText] = useState('')
    const {ask, prof} = props

    const customStyles = {
        content: {
            top: '50%',
            left: '42%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%.-50%)'
        }
    }
    const handleInputChange = ()=> event => {
        const value = event.target.value
        setText(value)
    }
    const sendDM = () => {
        const uploadDM = new FormData()
        uploadDM.append("receiver", ask.askForm)
        uploadDM.append("message", text)
        sendDMCont(uploadDM)
        setModalIsOpen(false)
    }
    const changeApproval = () => {
        const uploadDataAsk = new FormData()
        uploadDataAsk.append("askTo", ask.askTo)
        uploadDataAsk.append("approved", true)
        changeApprovalRequest(uploadDataAsk, ask)
    }

    return (
        <li className="list-item">
            <h4>{prof[0].nickName}</h4>
            { !ask.approved ? 
                <Button size="small" className={classes.button} variant="contained" color="primary" onClick={()=>changeApproval()}> Approve</Button> :
                <button className="mail" onClick={()=>setModalIsOpen(true)}><RiMailAddLine/></button>
            }
            <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)} style={customStyles}>
                <Typography>Message</Typography>
                <TextField className={classes.text} type="text" onChange={handleInputChange()}/>
                <br/>
                <button className="btn-modal" onClick={()=>sendDM()}><IoIosSend/></button>
                <button className="btn-modal" onClick={()=>setModalIsOpen(false)}><IoMdClose/></button>
            </Modal>
        </li>
    )
}

export default Ask
