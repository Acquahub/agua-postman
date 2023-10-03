import styles from "./requestMaker.module.css";

import Tabs from "./tabs";
import HeadersTab from "./tabs/headersTab";
import ParamsTab from "./tabs/paramsTab";
import BodyTab from "./tabs/bodyTab";

import RequestTitle from "../../components/requestMaker/requestTitle";
import RequestBar from "./requestBar";

const tabs = [
  {
    name: 'Params',
    element: <ParamsTab />
  },
  {
    name: 'Headers',
    element: <HeadersTab />
  },
  {
    name: 'Body',
    element: <BodyTab />
  }
];

export default function RequestMaker() {

  return (
    <div className={styles['container']}>
      <RequestTitle />
      <RequestBar />
      <Tabs tabs={tabs} />
    </div>
  );
}