import React, { Component, createRef } from 'react';
import Header from '../../components/Header'
import {connect} from 'react-redux'
import Axios from 'axios'
import { API_URL, priceFormatter, dateformat } from '../../helpers/idrformat';
import Notfound from '../notfound'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import ButtonUi from '../../components/button'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import {AddcartAction} from '../../redux/Actions'
import Swal from 'sweetalert2';
class history extends Component {
    state = {
        history:[],
        isOpen:false,
        pilihan:0,
        bukti:createRef(),
        cc:createRef()
    }
    componentDidMount(){
        // Axios.get(`${API_URL}/carts?userId=${this.props.id}&_expand=product`)
        console.log(this.props.id)
        Axios.get(`${API_URL}/transactions`,{
            params:{
                userId:this.props.id,
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({history:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }


    renderHistory=()=>{
        console.log(this.state.history)
        return this.state.history.map((val,index)=>{
            return(
                <TableRow key={val.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.metode}</TableCell>
                    <TableCell>{dateformat(val.tanggalPembayaran)}</TableCell>
                    <TableCell><ButtonUi onClick={this.onCheckOutClick}  className='my-3' >
                                CheckOut
                            </ButtonUi></TableCell>

                </TableRow>
            )
        })
    }

    // transaction itu ada id,status,userId,tanggalpembayaran,metode,buktipembayaran,
    // transactionDetails id,transactionId,productId,price,qty
    

    render() {
        if(this.props.role==='user') {
            return (
                <div className=' pt-3' style={{paddingLeft:'10%',paddingRight:'10%'}}>
                        <Paper >
                            <TableContainer >
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>Nama Product</TableCell>
                                            <TableCell style={{width:'200px'}}>Gambar</TableCell>
                                            <TableCell style={{width:'200px'}}>Qty</TableCell>
                                            <TableCell>Harga</TableCell>
                                            <TableCell>Subtotal</TableCell>
                                            
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.renderHistory()}
                                    </TableBody>
                                    <TableFooter>
                                        <TableCell colSpan={4}></TableCell>
                                        <TableCell style={{fontWeight:'700',color:'black',fontSize:20}}>Subtotal Harga</TableCell>
                                        <TableCell style={{color:'black',fontSize:20}}>{priceFormatter(this.renderTotalHarga())}</TableCell>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            
                        </Paper>
                    </div>
            );
        }else{
            return(
                <Notfound/>
            )
        }
    }
}
const MapstatetoProps=({Auth})=>{
    return {
        ...Auth
    }
}
export default connect(MapstatetoProps,{AddcartAction})(history);