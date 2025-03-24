import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Link ,useLocation } from "react-router-dom";

import {
  ProfileTwoTone,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreTwoTone,
  ShopTwoTone,
  EditTwoTone,
  CopyTwoTone,
} from "@ant-design/icons";

const { Sider, Content ,Header} = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();


  const toggleSidebar = () => setCollapsed(!collapsed);

  const data = [
    { month: "Jan", sales: 5 },
    { month: "Feb", sales: 10 },
    { month: "Mar", sales: 20 },
    { month: "Apr", sales: 25 },
    { month: "May", sales: 30 },
    { month: "Jun", sales: 35 },
    { month: "Jul", sales: 40 },
    { month: "Aug", sales: 45 },
    { month: "Sep", sales: 50 },
    { month: "Oct", sales: 55 },
    { month: "Nov", sales: 60 },
    { month: "Dec", sales: 65 },
  ];

  const pieData = [
    { name: "react.js", value: 34.3 },
    { name: "node.js", value: 25.7 },
    { name: "python", value: 18.6 },
    { name: "Other", value: 21.4 },
  ];
  
  const colors = ["#4F46E5", "#EC4899", "#22C55E", "#FACC15"];

  return (
    <Layout className="h-screen overflow-hidden">
       <Sider
        className="h-screen"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical fixed" />
        <Menu
          className="h-full overflow-auto"
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          
        >
    
<Menu.Item key="/admin"  icon={ <AppstoreTwoTone />}>
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

          <Menu.SubMenu key="" icon={<ProfileTwoTone />} title="Student">
            <Menu.Item key="/admin/student" icon={<CopyTwoTone />}>
            <Link to="/admin/student">Student List</Link>
            </Menu.Item>
            <Menu.Item key="/admin/student-register" icon={<EditTwoTone />}>
              <Link to="/admin/student-register">Create Student</Link>
            </Menu.Item>
            </Menu.SubMenu>

        
          
          {/* <Menu.Item key="2" icon={<MenuFoldOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<MenuFoldOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.SubMenu key="sub2" icon={<UserAddOutlined />} title="nav 4">
            <Menu.Item key="2-1" icon={<UserAddOutlined />}>
              subnav 2-1
            </Menu.Item>
            <Menu.Item key="2-2" icon={<UserAddOutlined />}>
              subnav 2-2
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4" icon={<MenuFoldOutlined />}>
            nav 5
          </Menu.Item> */}
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: 'white' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>

        <Content className="p-4 bg-gray-100 min-h-screen overflow-auto">
          <h1 className="text-xl font-bold mb-3">Hi, Welcome Back!</h1>

          {/* Overview & Sales Summary */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Line Chart */}
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Overview</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sales Summary Cards */}
            <div className="col-span-3 grid grid-cols-2 gap-4">
              {[
                { title: "Total Courses", value: "20" },
                { title: "Total student", value: "10" },
                { title: "Total instructor", value: "15" },
                { title: "Total sales", value: "$1000" },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="text-xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Popular Products */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">-----</h2>
            </div>

            {/* Loyal Customers */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">-----</h2>
            </div>

            {/* Top Selling Categories */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">------</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
