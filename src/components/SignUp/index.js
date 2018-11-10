import React, { Component } from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import { userSignup } from './../../api';
import { Link, Redirect } from 'react-router-dom';

const FormItem = Form.Item;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email: '',
      password: '',
      confirmPassword:'',
      errorText: '',
      success: false
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { password, confirmPassword } = values;
        if(password !== confirmPassword) message.error("Password does not match");
        else if(password.length < 6) message.error("Password should be of minimum 6 characters")
        else{
          userSignup(values, ({success, message:msg}) => {
            if(success){
              message.success(msg);
              this.setState({ success:true })
            }
            else message.error(msg)
          })
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { success } = this.state;
    return success === true ? (<Redirect to='/signin' />) : (
      <div style={{ width: '400px', margin: 'auto', marginTop: '100px' }}>
        <Form onSubmit={this.handleSubmit} className="signup-form">
        <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input placeholder="Name" type="text"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
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
            {getFieldDecorator('confirmPassword', {
              rules: [{ required: true, message: 'Please again enter your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" block htmlType="submit" className="signup-form-button">
              Sign Up
          </Button>
            Or <Link to='/signin'>Signin Now !</Link>
          </FormItem>
        </Form>
      </div >
    )
  }
}

export default Form.create()(SignUp);
