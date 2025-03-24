import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LockOutlined, UserOutlined,MailOutlined,  MenuFoldOutlined, AppstoreTwoTone,
    ShopTwoTone, EditTwoTone, CopyTwoTone, ProfileTwoTone,MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Table, Input ,Form} from "antd";
const { Sider, Header, Content } = Layout;


const StudentRegister = () => {
      const [collapsed, setCollapsed] = useState(false);
    
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (


    <Layout className="h-screen overflow-hidden">
    <Sider className="h-screen" trigger={null} collapsible collapsed={collapsed}>
      <Menu className="h-full overflow-auto" theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="/admin" icon={<AppstoreTwoTone />}>
          <Link to="/admin">Dashboard</Link>
        </Menu.Item>
        <Menu.SubMenu key="sub1" icon={<ShopTwoTone />} title="Instructor">
          <Menu.Item key="/admin/instructor" icon={<CopyTwoTone />}>
            <Link to="/admin/instructor">Instructor List</Link>
          </Menu.Item>
          <Menu.Item key="/admin/instructor-register" icon={<EditTwoTone />}>
            <Link to="/admin/instructor-register">Create Instructor</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<ProfileTwoTone />} title="Student">
          <Menu.Item key="/admin/student" icon={<CopyTwoTone />}>
            <Link to="/admin/student">Student List</Link>
          </Menu.Item>
          <Menu.Item key="/admin/student-register" icon={<EditTwoTone />}>
            <Link to="/admin/student-register">Create Student</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>

    <Layout>
      <Header style={{ padding: 0, background: "white" }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: "16px", width: 64, height: 64 }}
        />
      </Header>
      <Content className="" style={{ margin: "24px 16px", padding: 24, background: "white", height: "100vh" }}>
      <h2 className="text-lg font-bold mt-6 mb-4">create Student</h2>

      <div className='h-[100%] flex justify-center items-center'>
    <Form className=''
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
     

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Create 
        </Button>
      </Form.Item>
    </Form>
    </div>
     
      </Content>
    </Layout>
  </Layout>

  
  );
};
export default StudentRegister;