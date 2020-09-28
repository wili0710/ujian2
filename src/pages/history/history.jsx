import React, { Component, createRef } from 'react';
import Header from '../../components/Header'
import {connect} from 'react-redux'
import Axios from 'axios'
import { API_URL, priceFormatter, dateformat } from '../../helpers/idrformat';
import Notfound from './../notfound'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import ButtonUi from './../../components/button'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import {AddcartAction} from './../../redux/Actions'
// import Swal from 'sweetalert2';
class history extends Component {
    state = {
        history:[],
        historydetail:[],
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
                status:"Completed"
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({history:res.data})
        }).catch((err)=>{
            console.log(err)
        })
        
    }
    onDetailClick=(input)=>{
        console.log(this.props.id)
        Axios.get(`${API_URL}/transactionsdetails?transactionId=${input}`,{
            params:{
                userId:this.props.id,
                _expand:'product'
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({historydetail:res.data})
        }).catch((err)=>{
            console.log(err)
        })
        this.setState({isOpen:true})
    }
    closeDetailClick=()=>{
        this.setState({isOpen:false})
    }
    renderHistory=()=>{
        console.log(this.state.history)
        return this.state.history.map((val,index)=>{
            return(
                <TableRow key={val.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.metode}</TableCell>
                    <TableCell>{dateformat(val.tanggalPembayaran)}</TableCell>
                    <TableCell><ButtonUi onClick={()=>{this.onDetailClick(val.id)}}  className='my-3' >
                                Detail
                            </ButtonUi></TableCell>

                </TableRow>
            )
        })
    }

    renderDetail=()=>{
        console.log(this.state.historydetail)
        return this.state.historydetail.map((val,index)=>{
            return(
                <TableRow key={val.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.product.namatrip}</TableCell>
                    <TableCell>
                        <div style={{maxWidth:'200px'}}>
                            <img width='100%' height='100%' src={val.product.gambar} alt={val.product.namatrip}/>
                        </div>
                    </TableCell>
                    <TableCell>{val.qty}</TableCell>
                    <TableCell>{priceFormatter(val.product.harga)}</TableCell>
                    <TableCell>{priceFormatter(val.product.harga*val.qty)}</TableCell>
                </TableRow>
            )
        })
    }
    // transaction itu ada id,status,userId,tanggalpembayaran,metode,buktipembayaran,
    // transactionDetails id,transactionId,productId,price,qty
    renderTotalHarga=()=>{
        var total=this.state.historydetail.reduce((total,num)=>{
            return total+(num.product.harga*num.qty)
        },0)
        return total
    }

    render() {
        if(this.props.role==='user') {
            return (
                <div>
                    <Modal size='lg' isOpen={this.state.isOpen} toggle={()=>this.setState({isOpen:false})}>
                        <ModalHeader toggle={()=>this.setState({isOpen:false})}>Details</ModalHeader>
                        <ModalBody>
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
                                        {this.renderDetail()}
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
                        </ModalBody>
                        <ModalFooter>
                            <ButtonUi onClick={this.closeDetailClick}>
                                Ok
                            </ButtonUi>
                        </ModalFooter>
                    </Modal>
                    <Header/>
                    <div className='d-flex justify-content-center pt-3' style={{paddingLeft:'10%',paddingRight:'10%'}}>
                        <Paper >
                            <TableContainer >
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell style={{width:'200px'}}>Metode Pembayaran</TableCell>
                                            <TableCell style={{width:'200px'}}>Tanggal Pembayaran</TableCell>
                                            <TableCell>Detail</TableCell>
                                            
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.renderHistory()}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                        </Paper>
                    </div>
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