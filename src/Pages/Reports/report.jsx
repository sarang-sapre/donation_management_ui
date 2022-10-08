import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../Reports/report.css";
import axios from "axios";
import API_URL from '../../API/API_CONFIG.json';
import qs from 'qs';
import fileDownload from 'js-file-download';


class Reports extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading:false,
            ReportType:null,
            DonationType:0,
            IntervalType:null,
            from_date:null,
            to_date:null,
            Year:null,
            Month:null,
            IsDaily:false,
            IsMonthly:false,
            IsYearly:false
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(params) {

    if(params.target.id === 'ReportType'){
        this.setState({
            ReportType: params.target.value,
        })
    }else if(params.target.id === 'DataType'){

        this.setState({
            DonationType:params.target.value
        })

    }else if(params.target.id === 'IntervalType'){

        this.setState({
            IntervalType:params.target.value
        })

        if(params.target.value === 'DAILY'){
            this.setState({
                IsDaily:true,
                IsMonthly:false,
                IsYearly:false
            })
        } else if(params.target.value === 'MONTHLY'){
            this.setState({
                IsMonthly:true,
                IsDaily:false,
                IsYearly:false
            })
        }else {
            this.setState({
                IsYearly:true,
                IsMonthly:false,
                IsDaily:false
            })
        }
    } else if(params.target.id === 'Month'){
        this.setState({
            Month:params.target.value
        })
    }else if(params.target.id === 'Year'){
        this.setState({
            Year:params.target.value
        })
    } else {

        if(params.target.id === 'FromDate'){
        this.setState({
            from_date:params.target.value
        })
    }else{
        this.setState({
            to_date:params.target.value
        })
    }

    }

    }

    handleSubmit(params) {
        this.setState({
            isLoading:true
        })

        let bodyData = {
            interval_type:this.state.IntervalType,
            donation_type:this.state.DonationType,
            month:this.state.Month,
            year:this.state.Year,
            from_date:this.state.from_date,
            to_date:this.state.to_date
          }
          console.log(bodyData)

          if(this.state.ReportType === '1'){

          let para = qs.stringify(bodyData)
          axios.post(API_URL.DonationReport, para,{responseType :"blob"}).then((res) => {
            fileDownload(res.data,"output.xlsx")  
          }).catch((err) => {
            alert("Something Went Wrong")
          })
 
        } else if(this.state.ReportType === '2'){

          let para = qs.stringify(bodyData)
          axios.post(API_URL.UsageReport, para,{responseType :"blob"}).then((res) => {
            fileDownload(res.data,"output.xlsx")  
          }).catch((err) => {
            alert("Something Went Wrong")
          })

        } else{

            alert("Select Report Type")
        }
    }


    render() {
        return (
            <div className="Container-1">
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridReportType">
                            <Form.Label>Report Type</Form.Label>
                            <Form.Select id='ReportType' defaultValue="Choose Type" onChange={this.handleChange}>
                            <option value="">Select Option</option>
                                <option value={1}>Donation</option>
                                <option value={2}>Usage</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridReportType">
                            <Form.Label>Data Type</Form.Label>
                            <Form.Select id='DataType' defaultValue="Choose Type" onChange={this.handleChange}>
                            <option value="">Select Option</option>
                                <option value={1}>GOVERNMENT</option>
                                <option value={2}>PRIVATE</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} id="formGridIntervalType">
                            <Form.Label>Interval Type</Form.Label>
                            <Form.Select id='IntervalType' defaultValue="Choose Type" onChange={this.handleChange}>
                            <option value="">Select Option</option>
                                <option value="DAILY">Daily</option>
                                <option value="MONTHLY">Monthly</option>
                                <option value="YEARLY">Yearly</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    {
                    this.state.IsMonthly ?
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Month</Form.Label>
                            <Form.Select id="Month" defaultValue="Choose Type" onChange={this.handleChange}>
                            <option value="">Select Option</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Year</Form.Label>
                            <Form.Control id='Year' type='Text' onChange={this.handleChange}/>
                        </Form.Group>
                    </Row> 
                    : this.state.IsYearly ? 
                    <Row className="mb-3">
                            <Form.Group as={Col}>
                            <Form.Label>Year</Form.Label>
                            <Form.Control id='Year' type='Text' onChange={this.handleChange}/>
                        </Form.Group>
                    </Row> 
                    :this.state.IsDaily ?
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>From Date</Form.Label>
                            <Form.Control id="FromDate" type='date' onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>To Date</Form.Label>
                            <Form.Control id="ToDate" type='date' onChange={this.handleChange}/>
                        </Form.Group>
                    </Row> : ""
                      }
                    <Row className="mb-3">
                        <Button
                            variant="primary"
                            disabled={this.state.ReportType === null && this.state.DonationType === null && this.state.IntervalType === null ? true :false}
                            onClick={this.handleSubmit}
                        >
                            Generate And Download
                        </Button>
                    </Row>

                </Form>
            </div>

        )
    }
}

export default Reports