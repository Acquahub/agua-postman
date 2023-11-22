import styles from "./requestMaker.module.css";

import Tabs from "./tabs";
import HeadersTab from "./tabs/headersTab";
import ParamsTab from "./tabs/paramsTab";
import BodyTab from "./tabs/bodyTab";

import RequestTitle from "../../components/requestMaker/requestTitle";
import RequestBar from "./requestBar";
import RequestURLInput from "../../components/requestMaker/requestURLInput";
import {useEffect, useState} from "react";

export default function RequestMaker({selectedRequest}) {


  const tabs = [
    {
      name: 'Params',
      element: <ParamsTab selectedRequest={selectedRequest} />
    },
    {
      name: 'Headers',
      element: <HeadersTab selectedRequest={selectedRequest}  />
    },
    {
      name: 'Body',
      element: <BodyTab />
    }
  ];

  const [userInput, setUserInput] = useState('');

  function getUserInput (input){
    setUserInput(input)
  }

  return (
    <div className={styles['container']}>
      <RequestURLInput userInput={userInput} />
      <RequestTitle userInput={userInput} selectedRequest={selectedRequest} />
      <RequestBar selectedRequest={selectedRequest} userInputCallback={getUserInput} />
      <Tabs tabs={tabs} />
    </div>
  );
}