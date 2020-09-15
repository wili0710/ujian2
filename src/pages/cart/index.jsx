import React, { Component } from 'react';
import Header from '../../components/Header'
import {connect} from 'react-redux'
import Axios from 'axios'
import { API_URL, priceFormatter } from '../../helpers/idrformat';
import Notfound from './../notfound'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import ButtonUi from './../../components/button'

class Cart extends Component {
    state = {
        cart:[]
    }
    componentDidMount(){
        // Axios.get(`${API_URL}/carts?userId=${this.props.id}&_expand=product`)
        Axios.get(`${API_URL}/carts`,{
            params:{
                userId:this.props.id,
                _expand:'product'
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({cart:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }


    renderTotalHarga=()=>{
        var total=this.state.cart.reduce((total,num)=>{
            return total+(num.product.harga*num.qty)
        },0)
        return total
    }

    renderCart=()=>{
        return this.state.cart.map((val,index)=>{
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

    // transaction itu ada id,status,checkoutdate,userId,tanggalpembayaran
    // transactionDetails id,transactionId,productId,price,qty

    onCheckOutClick=()=>{
        Axios.post(`${API_URL}/transactions`,{
            status:'WaitingPayment',
            checkoutDate:new Date().getTime(),
            userId:this.props.id,
            tanggalPembayaran:''
        }).then((res)=>{
            var arr=[]
            this.state.cart.forEach((val)=>{
                arr.push(Axios.post(`${API_URL}/transactionsdetails`,{
                    transactionId:res.data.id,
                    productId:val.productId,
                    price: parseInt(val.product.harga),
                    qty:val.qty
                }))
            })
            Axios.all(arr).then((res1)=>{
                var deletearr=[]
                this.state.cart.forEach((val)=>{
                    deletearr.push(Axios.delete(`${API_URL}/carts/${val.id}`))
                })
                Axios.all(deletearr)
                .then(()=>{
                    Axios.get(`${API_URL}/carts`,{
                        params:{
                            userId:this.props.id,
                            _expand:'product'
                        }
                    })
                    .then((res3)=>{
                        console.log(res3.data)
                        this.setState({cart:res3.data})
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((Err)=>{
                    console.log(Err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{

        })
    }

    render() {
        if(this.props.role==='user') {
            return (
                <div>
                    <Header/>
                    <div className=' pt-3' style={{paddingLeft:'10%',paddingRight:'10%'}}>
                        <Paper >
                            <TableContainer >
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell style={{width:'200px'}}>Nama Trip</TableCell>
                                            <TableCell style={{width:'200px'}}>Gambar</TableCell>
                                            <TableCell>Jumlah</TableCell>
                                            <TableCell>Harga</TableCell>
                                            <TableCell>subtotal Harga</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.renderCart()}
                                    </TableBody>
                                    <TableFooter>
                                        <TableCell colSpan={4}></TableCell>
                                        <TableCell style={{fontWeight:'700',color:'black',fontSize:20}}>Subtotal Harga</TableCell>
                                        <TableCell style={{color:'black',fontSize:20}}>{priceFormatter(this.renderTotalHarga())}</TableCell>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <ButtonUi onClick={this.onCheckOutClick}  className='my-3' >
                                CheckOut
                            </ButtonUi>
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
export default connect(MapstatetoProps)(Cart);