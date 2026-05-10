import { useState } from "react";
import styles from "./Tabs.module.scss";

export const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabHeaders = [];
    const tabContents = [];

    children.forEach((child, index) => {
        tabHeaders.push(
            <button
                key={index}
                className={`${styles["tab-button"]} ${activeTab === index ? styles.active : ""}`}
                onClick={() => setActiveTab(index)}
            >
                {child.props.header}
            </button>
        );

        tabContents.push(child);
    });
 

    return <section className={styles["tab-container"]}>
        <div className={styles["tabs-headers"]}>{tabHeaders}</div>
        <div className={styles["tabs-contents"]}>{tabContents[activeTab]}</div>
    </section>;
}


export const TabPanel = ({ header, children }) => {
    return <div>{children}</div>;
};