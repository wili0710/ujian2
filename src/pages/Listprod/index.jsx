import React, { Component } from 'react';
import Header from '../../components/Header'
import './listprod.css'
import { 
    Breadcrumb, BreadcrumbItem, Card, CardImg} from 'reactstrap';
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { API_URL,priceFormatter, dateformat } from '../../helpers/idrformat';
class ListProd extends Component {
    state = {
        Products:[]
      }
    componentDidMount(){
        var tanggalsekarang=new Date().getTime()
        console.log(tanggalsekarang)
        Axios.get(`${API_URL}/products?tanggalberakhir_gte=${tanggalsekarang}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({Products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onChangeFilter=(input)=>{
        var filter=input
        var tanggalsekarang=new Date().getTime()
        console.log(filter)
        Axios.get(`${API_URL}/products?tanggalberakhir_gte=${tanggalsekarang}&namatrip_like=${filter}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({Products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    renderCard=()=>{
        return this.state.Products.map((val)=>{
            return(
                <div key={val.id} className="col-md-3 px-2 py-2">
                    <Link to={'/products/'+val.id}>
                        <Card className='kartu card-rounded'>
                            <CardImg top width="100%" className='card-rounded' height={200} src={val.gambar} alt="Card image cap" />
                            <div class="overlay card-rounded">
                                <div class="text">
                                    <div>
                                        {val.namatrip}
                                    </div>
                                    <div>
                                        {priceFormatter(val.harga)}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>
            )
        })
    }
    render() { 
        return (
            <div>
                <Header/>
                <div className='pt-3 px-4'>
                    <Breadcrumb className='tranparant m-0 px-2'>
                        <BreadcrumbItem ><Link className='link-class' to="/">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Products</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="ml-3">
                        Filter
                        <input className="ml-3" placeholder="Nama Trip" onChange={event=>this.onChangeFilter(event.target.value)}>
                        </input>
                    </div>
                    <div className="row p-0 m-0">
                        {this.renderCard()}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default ListProd;