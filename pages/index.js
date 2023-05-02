import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [poemInput, setPoemInput] = useState("");

  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ poem: poemInput}),
      });

      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      console.log(data.result);

    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Chinese Poetry Translator!</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>

      <main className={styles.main}>
        <h3>Translate My Poem!</h3>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            name="prompt"
            placeholder="Enter the poem in Chinese!"
            value={poemInput}
            onChange={(e) => setPoemInput(e.target.value)}
          />
          <input type="submit" value="Generate translation" />
        </form>
        <div className={styles.result} id="result">
        {
          result.split("/n").map((line) => (<div>{line}</div>))
        }
        </div>
        
      </main>
    </div>
  );
}
