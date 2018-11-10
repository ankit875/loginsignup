import React, { Component } from 'react';
import { Form, Icon, message, Input, Button } from 'antd';
import { userReset } from './../../api';
import { Redirect } from 'react-router-dom';
const FormItem = Form.Item;

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { authorized: false }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { token } = this.props.match.params;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                const { password, confirmPassword } = values;
                if (password !== confirmPassword || password.length < 6) {
                    message.error("password does not match");
                }
                else {
                    const finalData = {
                        token: token,
                        password: password
                    }
                    userReset(finalData, (object) => {
                        const { authorized, message: responseMessage } = object;
                        message.info(responseMessage);
                        if (authorized === true) {
                            setTimeout(() => {
                                this.setState({ authorized: true })
                            }, 3000);
                        }
                    })
                }

            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { authorized } = this.state;
        return authorized === true ? (<Redirect to='/signin' />) : (
            <div style={{ width: '400px', margin: 'auto', marginTop: '100px' }}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: "Please Input your password" }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('confirmPassword', {
                            rules: [{ required: true, message: "Please Input your confirm password" }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25' }} />} type="password" placeholder="Confirm Password" />
                        )}
                    </FormItem>
                    <Button block type="primary" htmlType="Update Password" className="login-form-button">
                        Update Password
                    </Button>
                </Form>
            </div>
        )
    }
}
export default Form.create()(ResetPassword);