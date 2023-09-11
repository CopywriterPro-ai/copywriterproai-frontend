import React, { useState, useRef } from "react";
import styled from "styled-components";
import Head from "next/head";

const credential = {
  username: "nafis",
  password: "nafisGPT$",
};

export default function Brainstorming() {
  const contentEditableRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [cred, setCred] = useState({ username: "", password: "" });
  const [prompt, setPrompt] = useState({ system: "" });
  const [result, setResult] = useState("");
  const [usage, setUsage] = useState(null);

  const handleSignIn = () => {
    if (
      cred.username === credential.username &&
      cred.password === credential.password
    ) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  };

  const handleGenerate = async () => {
    if (loading) return;

    let textContent = "";
    if (contentEditableRef.current) {
      textContent = contentEditableRef.current.innerText;
    }

    const messages = [
      { role: "system", content: prompt.system },
      { role: "user", content: textContent },
    ];

    try {
      setLoading(true);
      setUsage(null);
      const res = await fetch("/api/brainstorming", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
      const _result = await res.json();
      if (
        Array.isArray(_result.choices) &&
        _result.choices.length &&
        _result.choices[0].message.content
      ) {
        setResult(_result.choices[0].message.content);
        setUsage(_result.usage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Head>
        <title>Brainstorming</title>
      </Head>
      {allowed ? (
        <>
          <Textarea
            placeholder="You are a helpful assistant"
            onChange={(e) => setPrompt({ system: e.target.value })}
            defaultValue={prompt.system}
          ></Textarea>
          <ContentEditable
            ref={contentEditableRef}
            contentEditable
          ></ContentEditable>
          <div>
            <Btn
              loading={loading ? "true" : "false"}
              disabled={loading}
              onClick={handleGenerate}
            >
              Generate
            </Btn>
          </div>
          {usage && <pre>{JSON.stringify(usage)}</pre>}
          {result.length ? <Result>{result}</Result> : null}
        </>
      ) : (
        <SignIn>
          <div>
            <label htmlFor="username">User name</label>
            <input
              type="text"
              id="username"
              value={cred.username}
              onChange={(e) => setCred({ ...cred, username: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={cred.password}
              onChange={(e) => setCred({ ...cred, password: e.target.value })}
            />
          </div>
          <button onClick={handleSignIn} type="submit">
            Sign in
          </button>
        </SignIn>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px 0;
  width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: vertical;
  margin-bottom: 25px;
`;

const ContentEditable = styled.div`
  width: 100%;
  min-height: 400px;
  background-color: #efefef;
  border-radius: 6px;
  padding: 4px;
`;

const Btn = styled.button`
  margin-top: 15px;
  border: 0;
  background-color: ${({ loading }) => (loading === "true" ? "black" : "navy")};
  color: white;
  padding: 2px 10px;
  border-radius: 2px;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const Result = styled.div`
  background-color: #e7e7e7;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 50px;
  font-size: 14px;
`;

const SignIn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
