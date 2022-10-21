import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import API_URL from '../../API/API_CONFIG.json';
import qs from 'qs';
import '../Usage/usage.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Alert from 'react-bootstrap/Alert';

class Usage extends React.Component {
  constructor() {
    super();
    this.state = {
      from_date: '',
      to_date: '',
      ModelShow: false,
      columnDef: [{ field: 'USAGE_TYPE' ,headerName:'खर्च प्रकार'}, { field: 'PRODUCT_NM', filter: 'agTextColumnFilter',headerName:'वस्तूचे नाव' }, { field: 'QUANTITY', filter: 'agNumberColumnFilter', headerName:'मात्रा' },{ field: 'AMOUNT', filter: 'agNumberColumnFilter' ,headerName:'रक्कम'}, { field: 'PERSON_COUNT', filter: 'agNumberColumnFilter',headerName:'विद्यार्थी संख्या' }, { field: 'RECORD_DATE', type: ['dateColumn', 'nonEditableColumn'], width: 220, headerName:'तारिख'}],
      rowData: null,
      defaultColDef: {
        sortable: true,
        resizable: true,
        initialWidth: 200,
        wrapHeaderText: true,
        autoHeaderHeight: true,
      },
      rowClassRules : {
        'government':(params) => {
            var Type = params.data.USAGE_TYPE
            return (Type === 'सरकार')
        },
       'private' : 'data.USAGE_TYPE === "खाजगी"'

    },
      rowModelType: 'serverSide',
      paginationPageSize: 20,
      cacheBlockSize: 20,
      UsageTypeList: [],
      ProductList: [],
      search_text: null,
      SelectedUsageType: 1,
      SelectedProduct: null,
      RecordDate:null,
      Quantity:0,
      Person_count:0,
      Amount:0,
      IsAdded:null,
      IsResMsg:null
    }



    this.GirdData = this.GirdData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleGridData = this.handleGridData.bind(this);
    this.handleFormDataChange = this.handleFormDataChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  GirdData(params) {

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let bodyData = {
      from_date: this.state.from_date,
      to_date: this.state.to_date
    }

    let para = qs.stringify(bodyData)

    axios.post(API_URL.GetUsage, para).then((res) => {
      this.setState({
        rowData: res.data[0]
      })
    }).catch((err) => {
      alert("Something Went Wrong")
    })
  }

  handleGridData(params) {

    let bodyData = {
      from_date: this.state.from_date,
      to_date: this.state.to_date
    }
    let para = qs.stringify(bodyData)
    console.log(para)
    axios.post(API_URL.GetUsage, para).then((res) => {
      this.setState({
        rowData: res.data[0]
      })
    }).catch((err) => {
      alert("Something Went Wrong")
    })

    params.preventDefault();
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

  handleDateChange(params) {

    if (params.target.id === '1') {
      this.setState({
        from_date: params.target.value
      })

    } else {
      this.setState({
        to_date: params.target.value
      })
    }
  }

  handleFormDataChange(params) {

    if (params.target.id === 'UsageType') {
      this.setState({

        SelectedUsageType: Number(params.target.value)

      })} else if(params.target.id === 'RecordDate'){
        this.setState({
          RecordDate:params.target.value
        })

      }else if(params.target.id === 'Quantity'){
        this.setState({
          Quantity:Number(params.target.value)
        })

      }else if(params.target.id === 'Amount') {

        this.setState({
          Amount:Number(params.target.value)
        })

      }else {
        this.setState({
          Person_count:Number(params.target.value)

        })
      }
  }

  componentDidMount() {

    let bodyData = {
      search_text: this.state.search_text
    }
    let para = qs.stringify(bodyData)

    axios.get(API_URL.GetDonationType).then((res) => {
      this.setState({
        UsageTypeList: res.data[0]
      })
    }).catch((err) => {
      alert("Something Went Wrong")
    })

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

  onInputChange(params){
  let bodyData = {
    search_text: params
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

}

onChange(params){
  this.setState({
    SelectedProduct:params
  })
}

handleSave(params){

  let bodyData = {
    record_type:2,
    donation_type:this.state.SelectedUsageType,
    product:this.state.SelectedProduct.value,
    record_date:this.state.RecordDate,
    quantity:this.state.Quantity,
    person_count:this.state.Person_count,
    amount:this.state.Amount
  }

  let para = qs.stringify(bodyData)

  axios.post(API_URL.AddDonation, para).then((res) => {
    if(res.data[0][0].status === 1){
        window.location.reload()
      } else{

        this.setState({
          IsAdded:res.data[0][0].status,
          IsResMsg:res.data[0][0].Msg
        })
      }
   }).catch((err) => {
     alert("Something Went Wrong")
   })

}

  render() {
    const UsageType = this.state.UsageTypeList;
    const ProductList = this.state.ProductList;
    return (
      <>
        <Modal show={this.state.ModelShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>खर्च रेकॉर्ड जोडा</Modal.Title>
          </Modal.Header>
          {this.state.IsAdded === 1 ? <Alert key="success" variant="success">खर्च जोडला आहे</Alert> :
           this.state.IsAdded === 0  ? <Alert key="danger" variant="danger">{this.state.IsResMsg}</Alert>:
           ""
          }
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridDonnationType">
                  <Form.Label>खर्च प्रकार</Form.Label>
                  <Form.Select id='UsageType' defaultValue="Choose Type" value={this.state.SelectedUsageType} onChange={this.handleFormDataChange}>
                    {
                      UsageType.map((e) => <option key={e.ID} value={e.ID}>{e.DONATION_TYPE}</option>)
                    }
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} id="formGridProduct">
                  <Form.Label>वस्तु</Form.Label>
                  <Select
                  maxMenuHeight={220}
                  menuPlacement="auto"
                  value={this.state.SelectedProduct}
                  options={ProductList}
                  onInputChange={this.onInputChange}
                  onChange={this.onChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>रेकॉर्ड तारीख</Form.Label>
                  <Form.Control id="RecordDate" type='date' onChange={this.handleFormDataChange}/>
                </Form.Group>
                <Form.Group as={Col} >
                  <Form.Label>मात्रा(Kg)</Form.Label>
                  <Form.Control id="Quantity" type='Number' onChange={this.handleFormDataChange}/>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} >
                  <Form.Label>रक्कम</Form.Label>
                  <Form.Control id="Amount" type='Number' onChange={this.handleFormDataChange}/>
                </Form.Group>
                <Form.Group as={Col} >
                  <Form.Label>विद्यार्थी संख्या</Form.Label>
                  <Form.Control id="PersonCount" type='Number' onChange={this.handleFormDataChange}/>
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} > 
            बंद
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
            खर्च रेकॉर्ड जोडा
            </Button>
          </Modal.Footer>
        </Modal>

        <div className='ag-theme-alpine container-1' style={{ height: "80%", width: "80%" }}>
          <Form>
            <Row>
              <Col>
                <Form.Control id='1' type='date' placeholder='From Date' value={this.state.from_date} onChange={this.handleDateChange} />
              </Col>
              <Col>
                <Form.Control id='2' type='date' placeholder='To date' value={this.state.to_date} onChange={this.handleDateChange} />
              </Col>
              <Col xs="auto">
                <Button type="submit" className="mb-2" onClick={this.handleGridData}>
                क्लिक करा
                </Button>
              </Col>
              <Col xs="auto" >
                <Button className="mb-2" variant="primary" onClick={this.handleShow}>
                खर्च रेकॉर्ड जोडा
                </Button>
              </Col>
            </Row>
          </Form>
          <br />
          <AgGridReact
            columnDefs={this.state.columnDef}
            rowData={this.state.rowData}
            defaultColDef={this.state.defaultColDef}
            rowClassRules={this.state.rowClassRules}
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

export default Usage