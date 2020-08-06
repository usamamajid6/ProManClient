import React, { Component } from "react";
import TimeAgo from "react-timeago";
import {
  Row,
  Col,
  Empty,
  Button,
  Tooltip,
  Typography,
  Menu,
  Dropdown,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { FixedSizeList as RWList } from "react-window";
import "./Board.css";
import moment from "moment";
const { Paragraph } = Typography;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      leader_id: props.leader_id,
      user_id: props.user_id,
      sort_task_list_by: "created_date_descending",
      apply_sort_to_task_list: null,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      data: nextProps.data,
      leader_id: nextProps.leader_id,
      user_id: nextProps.user_id,
    });
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps !== prevState) {
  //     return ({ total: nextProps.total }) // <- this is setState equivalent
  //   }
  //   return null
  // }

  // shouldComponentUpdate = (nextProps, prevProps) => {
  //   if (nextProps !== prevProps) {
  //     this.setState({
  //       data: nextProps.data,
  //       leader_id: nextProps.leader_id,
  //       user_id: nextProps.user_id,
  //     });
  //   }
  // };

  displayMoreDropdown = (index) => {
    return (
      <Menu>
        <Menu.Item>
          <Button
            onClick={() => {
              this.setState({
                sort_task_list_by: "created_date_ascending",
                apply_sort_to_task_list: index,
              });
            }}
            type="link"
          >
            Sort By Creation Date (Ascending)
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => {
              this.setState({
                sort_task_list_by: "created_date_descending",
                apply_sort_to_task_list: index,
              });
            }}
            type="link"
          >
            Sort By Creation Date (Descending)
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => {
              this.setState({
                sort_task_list_by: "due_date_ascending",
                apply_sort_to_task_list: index,
              });
            }}
            type="link"
          >
            Sort By Due Date (Ascending)
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => {
              this.setState({
                sort_task_list_by: "due_date_descending",
                apply_sort_to_task_list: index,
              });
            }}
            type="link"
          >
            Sort By Due Date (Descending)
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => {
              this.setState({
                sort_task_list_by: "last_updated_at",
                apply_sort_to_task_list: index,
              });
            }}
            type="link"
          >
            Sort By Last Updated At
          </Button>
        </Menu.Item>
      </Menu>
    );
  };

  displayBoard = () => {
    return this.state.data.map((taskList, index) => {
      return (
        <div className="taskList">
          <div className="taskListHeadContainer">
            <Row>
              <Col span={16}>
                <Paragraph
                  className="taskListHead"
                  ellipsis
                  style={{ color: "black", padding: "0", margin: "0" }}
                >
                  <Tooltip title={taskList.name}> {taskList.name}</Tooltip>
                </Paragraph>
              </Col>
              <Col span={8}>
                <div className="more">
                  <Dropdown
                    overlay={this.displayMoreDropdown(index)}
                    placement="bottomLeft"
                  >
                    <MoreOutlined className="cursorPointer" />
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </div>
          <div className="tasks">
            {this.displayTasks(taskList, index)}
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

  sortTasks = (tasks, taskListIndex) => {
    if (this.state.apply_sort_to_task_list !== null) {
      if (this.state.apply_sort_to_task_list === taskListIndex) {
        if (this.state.sort_task_list_by === "created_date_ascending") {
          tasks.sort((a, b) => moment(a.createdAt) - moment(b.createdAt));
        }
        if (this.state.sort_task_list_by === "created_date_descending") {
          tasks.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        }
        if (this.state.sort_task_list_by === "due_date_ascending") {
          tasks.sort((a, b) => moment(a.due_date) - moment(b.due_date));
        }
        if (this.state.sort_task_list_by === "due_date_descending") {
          tasks.sort((a, b) => moment(b.due_date) - moment(a.due_date));
        }
        if (this.state.sort_task_list_by === "last_updated_at") {
          tasks.sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
        }
      }
    }
    return tasks;
  };

  displayStatusORDueOn = (task) => {
    if (task.status === "done") {
      return (
        <div className="taskDueOn" style={{ color: "#327523" }}>
          <Tooltip title={moment(task.due_date).format("llll")}>Done</Tooltip>
        </div>
      );
    }
    if (task.status === "pending") {
      return (
        <div className="taskDueOn" style={{ color: "#524c4c" }}>
          <Tooltip title={moment(task.due_date).format("llll")}>
            Pending
          </Tooltip>
        </div>
      );
    }
    if (task.status === "in-progress") {
      return (
        <div className="taskDueOn">
          <Tooltip title={moment(task.due_date).format("llll")}>
            <TimeAgo date={task.due_date} />
          </Tooltip>
        </div>
      );
    }
  };

  displayTasks = (taskList, index) => {
    let tasks = taskList.tasks;
    tasks = this.sortTasks(tasks, index);
    if (tasks.length !== 0) {
      return tasks.map((task) => {
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
                  <Tooltip title={task.name}>
                    <Paragraph
                      ellipsis
                      style={{ color: "black", padding: "0", margin: "0" }}
                    >
                      {task.name}
                    </Paragraph>
                  </Tooltip>
                </div>
              </Col>
              <Col span={14}>{this.displayStatusORDueOn(task)}</Col>
            </Row>
            <Row className="taskDescriptionContainer custom_scroll">
              <Col span={24}>
                <div className="taskDescription">
                  <Paragraph
                    ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
                    style={{ color: "black", padding: "0", margin: "0" }}
                  >
                    {task.description}
                  </Paragraph>
                </div>
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
          <Col className="mainContainer custom_scroll">
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
