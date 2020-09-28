import React, {useState,useRef, useEffect} from 'react';
import Header from '../../components/Header'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import {MdDeleteForever} from 'react-icons/md'
// import {BiEdit} from 'react-icons/bi'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {priceFormatter, API_URL} from '../../helpers/idrformat'
import ButtonUi from './../../components/button'
import axios from 'axios'
import {connect} from 'react-redux'
// import from 'react-router-dom'
// import Notfound from './../notfound'
import Axios from 'axios';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

 function StickyHeadTable(props) {
  const classes = useStyles();
  // const [modal, setModal] = useState(false);
  // const [modaledit, setModaledit] = useState(false);

  // const [addform,setaddform]=useState({
  //   namaTrip:useRef(),
  //   gambar:useRef(),
  //   tanggalmulai:useRef(),
  //   tanggalberakhir:useRef(),
  //   harga:'',
  //   descripsi:useRef()
  // })
  // const [editform,seteditform]=useState({
  //   namaTrip:useRef(),
  //   gambar:useRef(),
  //   tanggalmulai:useRef(),
  //   tanggalberakhir:useRef(),
  //   harga:'',
  //   descripsi:useRef()
  // })
  const [confirmpayment,setconfirmpayment]=useState([])
  const [temporary,settemporary]=useState([])

  useEffect(()=>{
    const fetch=()=>{
      axios.get(`${API_URL}/transactions?status=WaitingAdmin`)
      .then((res)=>{
        setconfirmpayment(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    fetch()
  },[])



  const OnAcceptClick=(input)=>{
    Axios.get(`${API_URL}/transactions/${input}`)
        .then((res)=>{
            settemporary(res.data)
            console.log(temporary)
            updatePayment(input)
        }).catch((err)=>{
            console.log(err)
        })
  }
  const updatePayment=(input)=>{
      console.log(temporary)
    Axios.patch(`${API_URL}/transactions/${input}`,{
        status: "Completed",
        // userId: temporary.userId,
        // tanggalPembayaran: temporary.tanggalPembayaran,
        // metode: temporary.metode,
        // buktipembayaran: temporary.buktipembayaran,
        // total: temporary.total    
    }).then(()=>{
        axios.get(`${API_URL}/transactions?status=WaitingAdmin`)
        .then((res)=>{
            setconfirmpayment(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
  }


  
  const renderTable=()=>{
    return confirmpayment.map((val,index)=>{
      return(
        <TableRow key={val.id}>
            <TableCell>{index+1}</TableCell>
            <TableCell>
              <div style={{maxWidth:'200px'}}>
                <img width='100%' height='100%' src={val.gambar} alt={val.namatrip}/>
              </div>
            </TableCell>
            <TableCell>{priceFormatter(val.total)}</TableCell>
            <TableCell>
                <ButtonUi onClick={()=>{OnAcceptClick(val.id)}}  className='my-3' >
                                Accept
                </ButtonUi>
            </TableCell>
        </TableRow>
      )
    })
  }


  
    return (
        <>
          <Header/>
          <div className='px-5'>
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell style={{width:'200px'}}>Gambar</TableCell>
                          <TableCell>Total</TableCell>
                          <TableCell >action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTable()}
                    </TableBody>
                    </Table>
                </TableContainer>
              </Paper>
          </div>
        </>
    );
  
}
const MapstatetoProps=({Auth})=>{
  return{
    // ...Auth,
    username:Auth.username,
    isLogin:Auth.isLogin,
    role:Auth.role
    // username:Auth.username
    // username:'dino',
    // sd
  }
}
export default connect(MapstatetoProps) (StickyHeadTable);