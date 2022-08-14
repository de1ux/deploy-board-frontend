import './App.css';
import React, {useEffect, useState} from "react";
import {CheckCircleTwoTone, ExclamationCircleOutlined} from "@ant-design/icons";
import {Layout, Table, Tag} from "antd";
import {useInterval} from "./setInterval";

const {Header, Footer, Sider, Content} = Layout;


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
        fetch("http://localhost:8080/deploys").then(d => d.json()).then(d => setData(d.data));
    }, [])

    // refetch every 30s
    useInterval(() => {
        fetch("http://localhost:8080/deploys").then(d => d.json()).then(d => setData(d.data));
    }, 15 * 1000)

    const github = <Tag color="blue">Github</Tag>;
    const heroku = <Tag color="green">Heroku</Tag>;
    const blog = <Tag color="gold">Blog</Tag>;
    const capstone = <Tag color="purple">Capstone</Tag>;
    const frontend = <Tag>frontend</Tag>
    const backend = <Tag>backend</Tag>

    return (
        <>
            <Layout style={{padding: 20}}>
                <div>
                    <h1 style={{color: 'black'}}>Week 21 | DevOps Deploy Board</h1>
                </div>
                <Content>
                    <Table pagination={false} dataSource={data} columns={[
                        {
                            title: <b>Username</b>,
                            dataIndex: 'username',
                            key: 'username',
                            render: (_, data) => <a href={"https://github.com/" + data.username}>{data.username}</a>
                        },
                        {
                            title: <p>{github} {blog} {frontend}</p>,
                            dataIndex: 'git_frontend_blog',
                            key: 'git_frontend_blog',
                            render: checkmark('git_frontend_blog')
                        },
                        {
                            title: <p>{github} {blog} {backend}</p>,
                            dataIndex: 'git_backend_blog',
                            key: 'git_backend_blog',
                            render: checkmark('git_backend_blog')
                        },
                        {
                            title: <p>{heroku} {blog} {frontend}</p>,
                            dataIndex: 'heroku_frontend_blog',
                            key: 'heroku_frontend_blog',
                            render: checkmark('heroku_frontend_blog')
                        },
                        {
                            title: <p>{heroku} {blog} {backend}</p>,
                            dataIndex: 'heroku_backend_blog',
                            key: 'heroku_backend_blog',
                            render: checkmark('heroku_backend_blog')
                        },
                        {
                            title: <p>{github} {capstone} {frontend}</p>,
                            dataIndex: 'git_frontend_capstone',
                            key: 'git_frontend_capstone',
                            render: checkmark('git_frontend_capstone')
                        },
                        {
                            title: <p>{github} {capstone} {backend}</p>,
                            dataIndex: 'git_backend_capstone',
                            key: 'git_backend_capstone',
                            render: checkmark('git_backend_capstone')
                        },
                        {
                            title: <p>{heroku} {capstone} {frontend}</p>,
                            dataIndex: 'heroku_frontend_capstone',
                            key: 'heroku_frontend_capstone',
                            render: checkmark('heroku_frontend_capstone')
                        },
                        {
                            title: <p>{heroku} {capstone} {backend}</p>,
                            dataIndex: 'heroku_backend_capstone',
                            key: 'heroku_backend_capstone',
                            render: checkmark('heroku_backend_capstone')
                        }
                    ]}/>
                </Content>
                <div>
                    Source on Github
                </div>
            </Layout>

        </>
    );
}

export default App;
