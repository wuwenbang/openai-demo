import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: inputValue }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      // setInputValue("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>星座运势</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>今日星座运势</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="value"
            placeholder="请输入星座"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input type="submit" value="生成今日运势" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
