import './App.css';
import React, {useEffect, useState} from "react";
import {CheckCircleTwoTone, ExclamationCircleOutlined} from "@ant-design/icons";
import {Table, Tag} from "antd";
import {useInterval} from "./setInterval";


let url = "http://localhost:8080";
if (window.location.hostname.indexOf("cohort-four.com") > -1) {
    url = "https://api.cohort-four.com";
}

let checkmark = (key) => (_, data) => {
    let value = data[key]
    if (value) {
        return <CheckCircleTwoTone style={{fontSize: '32px'}} twoToneColor="#52c41a"/>;
    }
    return <ExclamationCircleOutlined style={{color: "gray", fontSize: '32px'}}/>;
}

function App() {
    const [data, setData] = useState();

    // fetch on initial load
    useEffect(() => {
        fetch(url + "/deploys").then(d => d.json()).then(d => setData(d.data.users));
    }, [])

    // refetch every 10s
    useInterval(() => {
        fetch(url + "/deploys").then(d => d.json()).then(d => setData(d.data.users));
    }, 10 * 1000)

    const github = <Tag color="#1677ff">Github</Tag>;
    const aws = <Tag color="teal">AWS</Tag>;
    const s3 = <Tag color="green">S3 Buckets</Tag>;
    const rds = <Tag color="green">RDS</Tag>;
    const cloudfront = <Tag color="green">Cloudfront Distribution</Tag>;
    const acm = <Tag color="green">Certificate Manager</Tag>;
    const errors = <Tag color="gray">Errors</Tag>;

    const blog_frontend = <Tag color="blue">Blog Frontend</Tag>;
    const blog_backend = <Tag color="blue">Blog Backend</Tag>;
    const capstone_frontend = <Tag color="purple">Capstone Frontend</Tag>;
    const capstone_backend = <Tag color="purple">Capstone Backend</Tag>;
    
    return (
        <>
            <div style={{padding: "10px"}}>
                <h1 style={{color: 'black'}}>Week 21 | DevOps Deploy Board</h1>
            </div>
            <Table pagination={false} dataSource={data} columns={[
                {
                    title: <b>Username</b>,
                    dataIndex: 'username',
                    key: 'username',
                    render: (_, data) => <a href={"https://github.com/" + data.github_handle}>{data.github_handle}</a>
                },
                {
                    title: <p>{github}<br/>{blog_backend}</p>,
                    dataIndex: 'has_git_frontend_blog',
                    key: 'has_git_frontend_blog',
                    render: checkmark('has_git_frontend_blog')
                },
                {
                    title: <p>{github}<br/>{blog_frontend}</p>,
                    dataIndex: 'has_git_backend_blog',
                    key: 'has_git_backend_blog',
                    render: checkmark('has_git_backend_blog')
                },
                {
                    title: <p>{aws}<br/>{s3}</p>,
                    dataIndex: 'has_s3_buckets',
                    key: 'has_s3_buckets',
                    render: checkmark('has_s3_buckets')
                },
                {
                    title: <p>{aws}<br/>{cloudfront}</p>,
                    dataIndex: 'has_cloudfronts',
                    key: 'has_cloudfronts',
                    render: checkmark('has_cloudfronts')
                },
                {
                    title: <p>{aws}<br/>{rds}</p>,
                    dataIndex: 'has_rds',
                    key: 'has_rds',
                    render: checkmark('has_rds')
                },
                {
                    title: <p>{aws}<br/>{acm}</p>,
                    dataIndex: 'has_acms',
                    key: 'has_acms',
                    render: checkmark('has_acms')
                },
                {
                    title: <p>{aws}<br/>{errors}</p>,
                    dataIndex: 'errors',
                    key: 'errors',
                    render: (_, data) => <textarea cols={20} rows={1}>{data.error}</textarea>
                },
                {
                    title: <p>{github}<br/>{capstone_frontend}</p>,
                    dataIndex: 'has_git_frontend_capstone',
                    key: 'has_git_frontend_capstone',
                    render: checkmark('has_git_frontend_capstone')
                },
                {
                    title: <p>{github}<br/>{capstone_backend}</p>,
                    dataIndex: 'has_git_backend_capstone',
                    key: 'has_git_backend_capstone',
                    render: checkmark('has_git_backend_capstone')
                }
            ]}/>
            <div style={{padding: "10px"}}>
                <a href="https://github.com/de1ux/deploy-board-backend">Backend</a> | <a
                href="https://github.com/de1ux/deploy-board-frontend">Frontend</a>
            </div>

        </>
    );
}

export default App;
