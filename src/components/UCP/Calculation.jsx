import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { saveUCPResult } from "../../Actions";
class Calculation extends Component {
  state = {};
  componentDidMount = () => {
    let ucp =
      (this.props.uucw + this.props.uaw) * this.props.tcf * this.props.ecf;
    this.props.saveResult(ucp);
  };
  render() {
    return (
      <Row className="UCP">
        <Col span={24} className="calculation"> 
          <div>The UCP is calculated based on the following formula:</div>
          <div>UCP = (UUCW + UAW) x TCF x ECF</div>
          <div>
            UCP = ({this.props.uucw} + {this.props.uaw}) x {this.props.tcf} x{" "}
            {this.props.ecf}
          </div>
          <div>UCP = {this.props.ucp}</div>
          <div>Your project contains {this.props.ucp} Use Case Points.</div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  uucw: state.UUCW.result,
  uaw: state.UAW.result,
  tcf: state.TCF.result,
  ecf: state.ECF.result,
  ucp: state.UCP.result,
});

const mapDispatchToProps = {
  saveResult: saveUCPResult,
};

Calculation = connect(mapStateToProps, mapDispatchToProps)(Calculation);

export default Calculation;
