import React, { Component } from "react";
import TimeAgo from "react-timeago";
import { Row, Col, Empty, Button } from "antd";
import "./Board.css";
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  displayBoard = () => {
    return this.state.data.map((taskList) => {
      return (
        <div className="taskList">
          <div className="taskListHead">{taskList.name}</div>
          <div className="tasks">
            {this.displayTasks(taskList)}
            <Button
              onClick={() => {
                this.props.onAddNewTaskClick(taskList._id);
              }}
              type="link"
              className="addNewTask"
            >
              Add New Task
            </Button>
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
                <div className="taskHead">{task.name}</div>
              </Col>
              <Col span={14}>
                <div className="taskDueOn">
                  <TimeAgo date={task.due_date} />
                </div>
              </Col>
            </Row>
            <Row className="taskDescriptionContainer">
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
