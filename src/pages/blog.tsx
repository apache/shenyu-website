
import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './blog.module.css';
import blogInfo from '../data/blogInfo';
// import BrowserOnly from '@docusaurus/BrowserOnly';


function Blog() {
    const [activeAnchor, setActiveAnchor] = useState(0);
    let list = useRef([React.createRef(), React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef()])
    let contentList = useRef([React.createRef(), React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef()])

    useEffect(() => {
        window.addEventListener('scroll', () => {
            for (let i = 0; i < contentList.current.length; i++) {
                let dist = contentList.current[i].current.getBoundingClientRect().y
                if (dist >= 90 && dist <= 300) {
                    setActiveAnchor(i)
                }
            }
        });
        return () => window.removeEventListener('scroll', () => { });
    }, []);

    return (
        <Layout title="Blog">
             <div className={styles.container}>
                    <div className={styles.content}>
                        {
                            blogInfo.map((item, key) => {
                                return (
                                    <div className={styles.categray} key={key}>
                                        <div className={styles.darkAnchor} id={item.categray}></div>
                                        <div ref={contentList.current[key]} className={styles.title}>{item.categray} </div>
                                        {item.posts.map((post, key) => {
                                            return (
                                                <div className={styles.card} key={key}>
                                                    {/* <img className={styles.cardImage} src={post.cover}  width='200' height={140}></img> */}
                                                    <div className={styles.postTitle} onClick={() => window.location.href = "http://localhost:3000/blog/" + post.src}>{post.title}</div>
                                                    <div className={styles.author}> {post.author}   &ensp; &ensp;     {post.date} </div>
                                                    <div className={styles.postAbs}>{post.abs}</div>
                                                    <div className={styles.read} onClick={() => window.location.href = "http://localhost:3000/blog/" + post.src}> Read More </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.catalogue}>
                        <div className={styles.catalogueBox}>
                            <ul className={styles.catalogueBoxUl} >
                                {
                                    blogInfo.map((item, index) => {
                                        const route = '#' + item.categray
                                        const id = 'Cata' + item.categray
                                        return (
                                            <li key={index} className={styles.catalogueBoxLi} id={id} ><a ref={list.current[index]} href={route} id='catalogueBoxA' className={styles.catalogueBoxA} style={{color: activeAnchor==index ? 'var(--ifm-color-primary)' :'var(--ifm-toc-link-color)'}} onClick={() => setActiveAnchor(index)}>{item.categray}</a></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
    );
}

export default Blog;