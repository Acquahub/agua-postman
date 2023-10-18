import styles from "./requestTitle.module.css";


export default function RequestTitle({ userInput }) {


  return (
    <div className={styles['title']}>
      <label className={styles['label']}>
        <select className={styles['select']}>
          <option>HTTP</option>
          <option>GraphQL</option>
          <option>gRPC</option>
          <option>WebSocket</option>
          <option>Socket.IO</option>
          <option>MQTT</option>
        </select>
        <div className={styles['titulo']} style={{ color: "var(--testing)" }}>
          {userInput ? userInput : "Untitled Request"}
        </div>
      </label>
    </div>
  );
}