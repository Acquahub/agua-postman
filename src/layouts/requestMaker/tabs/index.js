import { useState } from "react";
import styles from "./tabs.module.css";

export default function Tabs({ tabs }) {

  const [currentTab, setCurrentTab] = useState(tabs[0].name);

  const handlerTabClicked = (tab) => {
    setCurrentTab(tab);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['tabs']}>
        {tabs.map((tab) => {
          return (
            <div
              onClick={() => handlerTabClicked(tab.name)}
              className={styles['tabItem'] + ' ' + (currentTab === tab.name ? styles['activeTabItem'] : '')}>
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className={styles['content']}>
        {(tabs.find((tab) => tab.name === currentTab)).element}
      </div>
    </div>
  );
}