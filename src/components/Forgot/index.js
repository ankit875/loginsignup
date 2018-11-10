import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { userForgot } from './../../api';
import { Link, Redirect } from 'react-router-dom';


const FormItem = Form.Item;

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            status: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err){
                console.log('Received values of form', values)
                userForgot(values, ({authorized, message: msg}) => {
                    this.setState({status: 'done'});
                    if(authorized)
                    message.success(msg)
                    else
                    message.error(msg);
                })
                this.setState({ status: 'pending' });
            } else {
                message.error('Provided email value is not valid');
                this.setState({status: ''});
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { status } = this.state;
        return (
            <div style={{ width: '400px', margin: 'auto', marginTop: '100px' }}>
                <Form onSubmit={this.handleSubmit} className='forgot-form'>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input type="email" prefix={<Icon type="user" 
                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button block type="primary" htmlType="submit"
                        className="login-form-button"
                        loading={status === 'pending' ? true: false}>
                            Reset Password
                        </Button>
                        <Link to='/signin'>Go Back</Link>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(Forgot)
