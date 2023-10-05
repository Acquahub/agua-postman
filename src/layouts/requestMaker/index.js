import styles from "./requestMaker.module.css";

import Tabs from "./tabs";
import HeadersTab from "./tabs/headersTab";
import ParamsTab from "./tabs/paramsTab";
import BodyTab from "./tabs/bodyTab";

import RequestTitle from "../../components/requestMaker/requestTitle";
import RequestBar from "./requestBar";
import RequestURLInput from "../../components/requestMaker/requestURLInput";
import { useState } from "react";

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

  const [userInput, setUserInput] = useState('');

  function getUserInput (input){
    setUserInput(input)
  }

  return (
    <div className={styles['container']}>
      <RequestURLInput userInput={userInput} />
      <RequestTitle userInput={userInput} />
      <RequestBar userInputCallback={getUserInput} />
      <Tabs tabs={tabs} />
    </div>
  );
}