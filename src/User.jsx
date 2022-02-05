import * as React from 'react';
import { connect } from 'react-redux';
import { GetUsers } from './store/taskActions';
import { EditUser } from './store/taskActions';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Input } from 'antd';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editRecord: null,
            newFirstName:null,
            newLastName:null,
        }
    }

    componentDidMount() {
        this.props.getUsersFn();
    }



    render() {

        const columns = [
            {
                title: 'Sr No',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'First Name',
                dataIndex: 'first_name',
                key: 'first_name',
                render: (text, record) => {
                    if (this.state.editRecord != null && record.id == this.state.editRecord.id) {
                        return <Input value={this.state.newFirstName} 
                            onChange={(e) => { this.setState({ newFirstName: e.target.value }) }} />
                    }
                    else {
                        return <>{text}</>
                    }
                }
            },
            {
                title: 'Last Name',
                dataIndex: 'last_name',
                key: 'last_name',
                render: (text, record) => {
                    if (this.state.editRecord != null && record.id == this.state.editRecord.id) {
                        return <Input value={this.state.newLastName} 
                            onChange={(e) => { this.setState({ newLastName: e.target.value }) }} />
                    }
                    else {
                        return <>{text}</>
                    }
                }
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        {
                            (this.state.editRecord==null || this.state.editRecord.id!=record.id) &&
                            <a onClick={() => { 
                                    this.setState({ newFirstName:record.first_name,
                                        newLastName:record.last_name,
                                    editRecord: record }) 
                            }}>Edit</a>

                        }
                        {
                            this.state.editRecord!=null && this.state.editRecord.id==record.id &&
                            <a onClick={() => { 
                            this.props.editUserFn({...record,
                                first_name:this.state.newFirstName,
                                last_name:this.state.newLastName,
                                });
                                this.setState({ editRecord: null }) }}>Save</a>
                        }
                        <a className={"delete-btn"}>Delete</a>
                    </Space>
                ),
            },
        ];

        return (
            <div className={"user-list-wrapper"}>
                <div className={"user-table-header"}>User List</div>
                <Table
                    key={"user-table"}
                    columns={columns}
                    dataSource={this.props.usersList || []} />
            </div>

        );
    }

}

User.propTypes = {
    getUsersFn: PropTypes.func,
    editUserFn:PropTypes.func,
    usersList: PropTypes.array
};

const mapStateToProps = (state) => {
    //console.log(state.appReducer,"--------Users: state.task.Users")
    return {
        usersList: state.appReducer.Users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsersFn: () => dispatch(GetUsers()),
        editUserFn:(u)=>dispatch(EditUser(u))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(User)
