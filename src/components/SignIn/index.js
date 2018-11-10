import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { userLogin } from './../../api';
import { Link , Redirect } from 'react-router-dom';


const FormItem = Form.Item;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authorized: false
    };
  }
  handleSubmit = (e) => {
   
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        userLogin(values, ({success, message:msg}) => {
          if(success){
            message.success(msg);
            this.setState({authorized: true})
          }
          else message.error(msg);
        })
      }
      else{
        message.error('Provided email value is not valid');  
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { authorized } = this.state;
    return authorized === true ? (<Redirect to = '/dashboard' />):(
      <div style={{ width: '400px', margin: 'auto', marginTop: '100px' }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input type="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
          <Link to='/forgot' style={{float: 'right'}}>Forgot Password</Link>
            <Button type="primary" block htmlType="submit" 
            className="login-form-button"
            >
              Log in
          </Button>
            Or <Link to='/signup'>Signup Now !</Link>
          </FormItem>
        </Form>
      </div >
    )
  }
}

export default Form.create()(SignIn);
