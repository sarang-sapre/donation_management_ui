import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import API_URL from '../../API/API_CONFIG.json';
import qs from 'qs';
import '../Product/product.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      ModelShow: false,
      columnDef: [{ field: 'ID' , width: 220, headerName:'ITEM ID'}, { field: 'PRODUCT_NM', filter: 'agTextColumnFilter', width: 220, headerName:'ITEM NAME'}],
      rowData: null,
      defaultColDef: {
        sortable: true,
        resizable: true,
        initialWidth: 200,
        wrapHeaderText: true,
        autoHeaderHeight: true,
      },
      rowModelType: 'serverSide',
      paginationPageSize: 20,
      cacheBlockSize: 20,
      NewProduct:null,
      IsAdded:null
    }

    this.GirdData = this.GirdData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  GirdData(params) {

    let bodyData = {
      search_text: ""
    }
  
    let para = qs.stringify(bodyData)
  
    axios.post(API_URL.GetProductList, para).then((res) => {
      this.setState({
        rowData: res.data[0]
      })
     }).catch((err) => {
       alert("Something Went Wrong")
     })


  }

  handleChange(params){
    this.setState({
      NewProduct:params.target.value
    })
  }

  handleShow(params) {
    this.setState({
      ModelShow: true
    })

  }

  handleClose(params) {
    this.setState({
      ModelShow: false
    })
  window.location.reload()
  }



  componentDidMount() {

    let bodyData = {
      search_text: ""
    }
  
    let para = qs.stringify(bodyData)
  
    axios.post(API_URL.GetProductList, para).then((res) => {
      let array =[]
       res.data[0].forEach((e) => array.push({value:e.ID, label:e.PRODUCT_NM}))
       this.setState({
         ProductList:array
       })
     }).catch((err) => {
       alert("Something Went Wrong")
     })

  };



onChange(params){
  this.setState({
    SelectedProduct:params
  })
}

handleSave(params){

  let bodyData = {
    product_name:this.state.NewProduct
  }

  let para = qs.stringify(bodyData)

  axios.post(API_URL.AddProduct, para).then((res) => {
    console.log(res.data[0][0].status)
        this.setState({
          IsAdded:res.data[0][0].status
        })
   }).catch((err) => {
     alert("Something Went Wrong")
   })

}

  render() {
    return (
      <>
        <Modal show={this.state.ModelShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          {this.state.IsAdded === 1 ? <Alert key="success" variant="success">Donation Is Added</Alert> :
           this.state.IsAdded === 0  ? <Alert key="danger" variant="danger">Something Went Wrong</Alert>:
           ""
          }
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Item name</Form.Label>
                  <Form.Control id="ItemName" type='text' onChange={this.handleChange}/>
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} > 
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <div className='ag-theme-alpine container-1' style={{ height: "80%", width: "30%" }}>
          <Form>
            <Row>
              <Col xs="auto" >
                <Button className="mb-2" variant="primary" onClick={this.handleShow}>
                  Add Item
                </Button>
              </Col>
            </Row>
          </Form>
          <br />
          <AgGridReact
            columnDefs={this.state.columnDef}
            rowData={this.state.rowData}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.GirdData}
            pagination={true}
            paginationPageSize={this.state.paginationPageSize}
            cacheBlockSize={this.state.cacheBlockSize}
          />
        </div>
      </>
    )
  }
}

export default ProductList