const React = require('react');
import { Button, Input, Form, Layout, Menu, AutoComplete, SubMenu, Select  } from 'antd';
const Option = Select.Option;
import kn from '../../../assets/server'
const AutoCompleteOption = AutoComplete.Option;
export default {
  state: {
    collapsed: false,
    book: {
      title: false,
      description: false,
    }
  },
  defaultProps: {
    style: {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 }
    }
  },
  residences: [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }],
  itemStyle: {
    labelCol: {
      xs: { span: 14 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 14 },
      sm: { span: 10 },
    },
  },
  tailItemStyle: {
    wrapperCol: {
      xs: {
        span: 14,
          offset: 0,
      },
      sm: {
        span: 16,
          offset: 8,
      },
    },
  },
  prefixSelector: function() {
    return this.props.form.getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    )
  },
  handleWebsiteChange: function(value) {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  },
  websiteOptions: function() {
    const { autoCompleteResult } = this.state;
    return autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  checkPassword: function(rule, value, callback) {
    const form = this.props.form;

    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  },
  checkConfirm: function(rule, value, callback) {
    const form = this.props.form;

    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },
  handleConfirmBlur: function(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  },
};
