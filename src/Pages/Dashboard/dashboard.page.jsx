import React from "react";
import "../Dashboard/dashboard.css";
import ReportImage from '../Dashboard/images/four1.png';
import DonateImage from '../Dashboard/images/donate1.png';
import UsageImage from '../Dashboard/images/two.png';
import ItemImage from '../Dashboard/images/cart.png';

function Dashboard() {

    return (
        <div className="main">
            <div className="container">
                {/*    <h6 class="section-title mb-0 text-center">Latest Articles</h6>
      <h6 class="section-subtitle mb-5 text-center">Architecto provident deserunt eveniet libero</h6>
*/}
                <div className="row">
                    <div className="col-md-3">
                        <div
                            className="card border-0 mb-4"
                            style={{ paddingTop: 40, paddingBottom: 30 }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <img
                                    src={DonateImage}
                                    alt=""
                                    className=""
                                    width="31%"
                                    style={{}}
                                />
                            </div>
                            <div className="card-body" style={{ textAlign: "center" }}>
                                <h6 className="card-title">देनगी </h6>
                                <p>देनगी चि नोद जोडा</p>
                                <br />
                                <div
                                    className="form-group col-12 mb-0"
                                    style={{ textAlign: "center" }}
                                >
                                    <a  href="/AddDonation" type="submit" className="btn btn-primary rounded w-md mt-3">
                                        देणगी
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div
                            className="card border-0 mb-4"
                            style={{ paddingTop: 40, paddingBottom: 30 }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <img src={UsageImage} alt="" className="" width="32%" />
                            </div>
                            <div className="card-body" style={{ textAlign: "center" }}>
                                <h6 className="card-title">खर्च </h6>
                                <p>खर्च रेकॉर्ड जोडा</p>
                                <br />
                                <div className="form-group col-12 mb-0">
                                    <a href="/AddUsage" type="submit" className="btn btn-primary rounded w-md mt-3">
                                        खर्च
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div
                            className="card border-0 mb-4"
                            style={{ paddingTop: 40, paddingBottom: 30 }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <img src={ItemImage} alt="" className="" width="32%" />
                            </div>
                            <div className="card-body" style={{ textAlign: "center" }}>
                                <h6 className="card-title"> वस्तू </h6>
                                <p>नवीन वस्तू जोडा</p>
                                <br />
                                <div className="form-group col-12 mb-0">
                                    <a  href="/AddItem" className="btn btn-primary rounded w-md mt-3" >
                                        वस्तु
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div
                            className="card border-0 mb-4"
                            style={{ paddingTop: 40, paddingBottom: 30 }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <img src={ReportImage} alt="" className="" width="26%;" />
                            </div>
                            <div className="card-body" style={{ textAlign: "center" }}>
                                <h6 className="card-title">रिपोर्ट</h6>
                                <p>तयार करा आणि डाउनलोड करा रिपोर्ट दररोज / मासिक / वार्षिक</p>
                                <div className="form-group col-12 mb-0">
                                    <a href="/Reports" type="submit" className="btn btn-primary rounded w-md mt-3">
                                        रिपोर्ट
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard