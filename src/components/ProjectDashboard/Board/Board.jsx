import React, { Component } from "react";
import TimeAgo from "react-timeago";
import { Row, Col, Empty, Button, Tooltip } from "antd";
import "./Board.css";
import moment from "moment";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      leader_id: props.leader_id,
      user_id: props.user_id,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      leader_id: nextProps.leader_id,
      user_id: nextProps.user_id,
    });
  }

  displayBoard = () => {
    return this.state.data.map((taskList, index) => {
      return (
        <div className="taskList">
          <div className="taskListHead">{taskList.name}</div>
          <div className="tasks">
            {this.displayTasks(taskList)}
            {index === 0 || index === 1 || index === 2 ? (
              <Button
                onClick={() => {
                  this.props.onAddNewTaskClick(taskList._id);
                }}
                type="link"
                className="addNewTask"
                disabled
              >
                Add New Task
              </Button>
            ) : (
              <Button
                onClick={() => {
                  this.props.onAddNewTaskClick(taskList._id);
                }}
                type="link"
                className="addNewTask"
                disabled={this.state.leader_id !== this.state.user_id}
              >
                Add New Task
              </Button>
            )}
          </div>
        </div>
      );
    });
  };

  displayTasks = (taskList) => {
    if (taskList.tasks.length !== 0) {
      return taskList.tasks.map((task) => {
        return (
          <div
            onClick={() => {
              this.hanldeTaskClick(task);
            }}
            className="taskContainer"
          >
            <Row className="taskHeadContainer">
              <Col span={10}>
                <div className="taskHead">
                  <Tooltip title={task.name}>{task.name}</Tooltip>
                </div>
              </Col>
              <Col span={14}>
                <div className="taskDueOn">
                  <Tooltip
                    title={moment(task.due_date).format(
                      "dddd, MMMM Do YYYY, h:mm a"
                    )}
                  >
                    <TimeAgo date={task.due_date} />
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Row className="taskDescriptionContainer custom_scroll">
              <Col span={24}>
                <div className="taskDescription">{task.description} </div>
              </Col>
            </Row>
          </div>
        );
      });
    } else {
      return (
        <Empty
          imageStyle={{ height: "inherit", width: "inherit" }}
          description="No Any Task(s)"
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          // className="emptyStyles"
        />
      );
    }
  };

  hanldeTaskClick = (task) => {
    this.props.onTaskClick(task);
  };
  render() {
    return (
      <div className="Board">
        <Row>
          <Col className="mainContainer">
            {this.displayBoard()}
            <Button
              onClick={() => {
                this.props.onAddNewTaskListClick();
              }}
              type="primary"
              className="addNewTaskList"
              disabled={this.state.leader_id !== this.state.user_id}
            >
              Add New Task List
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Board;
