import React, { Component } from "react";
import { connect } from "react-redux";
import { increaseNumber, decreaseNumber } from "../../Actions";
class Counter extends Component {
  state = {
    num: 0,
  };
  render() {
    return (
      <div>
        <input
          type="button"
          value="+"
          onClick={() => {
            this.props.increase(1);
          }}
        />
        <div style={{ fontSize: "3rem" }}>{this.props.num}</div>

        <input
          type="button"
          value="-"
          onClick={() => {
            this.props.decrease(4);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  num: state.counter.num,
});

const mapDispatchToProps = {
  increase: increaseNumber,
  decrease: decreaseNumber,
};

Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default Counter;
