import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, Select, message } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const InstructorDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);

  // Get Token & User Data from Local Storage (or other storage)

  const userData = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage
  const { user,accessToken } = userData || {}; // Extract email and username
  const {email,username}=user
  console.log(accessToken)

  // Open Modal
  const showModal = () => setIsModalOpen(true);

  // Close Modal
  const handleCancel = () => setIsModalOpen(false);

  // Handle Form Submit
  const handleSubmit = async (values) => {
    if (!video || !image) {
      message.error("Please upload both video and image!");
      return;
    }


    const formData = {
      title: values.title,
      description: values.description,
      price: values.price,
      category: values.category,
      videoFile: video.originFileObj,  // File object remains intact
      imageFile: image.originFileObj,  // File object remains intact
      email: email,
      author: username,
      token: accessToken
  };



  console.log(formData)

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/api/courses/create",
        formData, // ✅ Send FormData properly
        {
          headers: {
            "Content-Type": "multipart/form-data",
           "Authorization": `Bearer ${accessToken}`, // ✅ Attach Token
          },
        }
      );
  
      if (response.status === 201) {
        message.success("Course uploaded successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Failed to upload course.");
    }
  };
  

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Floating Add Course Button */}
      <div
        className="w-56 h-56 bg-white shadow-lg rounded-2xl flex flex-col items-center justify-center cursor-pointer border border-gray-300 hover:shadow-xl transition"
        onClick={showModal}
      >
        <PlusOutlined className="text-4xl text-blue-500" />
        <p className="text-lg text-gray-700 font-semibold mt-2">
          Upload Course
        </p>
      </div>

      {/* Modal Form */}
      <Modal title="Upload Course" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* Title */}
          <Form.Item label="Course Title" name="title" rules={[{ required: true, message: "Enter course title" }]}>
            <Input placeholder="Enter course title" />
          </Form.Item>

          {/* Description */}
          <Form.Item label="Course Description" name="description" rules={[{ required: true, message: "Enter course description" }]}>
            <Input.TextArea placeholder="Enter course description" rows={3} />
          </Form.Item>

          {/* Price */}
          <Form.Item label="Course Price ($)" name="price" rules={[{ required: true, message: "Enter course price" }]}>
            <Input type="number" placeholder="Enter price" />
          </Form.Item>

          {/* Category */}
          <Form.Item label="Category" name="category" rules={[{ required: true, message: "Select a category" }]}>
            <Select placeholder="Select category">
              <Option value="Frontend">Frontend</Option>
              <Option value="Backend">Backend</Option>
              <Option value="Fullstack">Fullstack</Option>
              <Option value="UI/UX">UI/UX</Option>
            </Select>
          </Form.Item>

          {/* Video Upload */}
          <Form.Item label="Upload Video" rules={[{ required: true, message: "Upload a video" }]}>
            <Upload
              beforeUpload={(file) => {
                setVideo(file);
                return false;
              }}
              accept="video/*"
              showUploadList={{ showRemoveIcon: true }}
            >
              <Button icon={<UploadOutlined />}>Select Video</Button>
            </Upload>
          </Form.Item>

          {/* Image Upload */}
          <Form.Item label="Upload Image" rules={[{ required: true, message: "Upload an image" }]}>
            <Upload
              beforeUpload={(file) => {
                setImage(file);
                return false;
              }}
              accept="image/*"
              showUploadList={{ showRemoveIcon: true }}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Course
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InstructorDashboard
