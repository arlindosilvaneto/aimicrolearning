import { useState, useEffect } from 'react';

import openai from 'openai';
import { useContext } from 'react';
import { AppContext } from '../App';


export default function useOpenAI() {
  const [openaiInstance, setOpenaiInstance] = useState(null);
  const [sending, setSending] = useState(false);
  const [topics, setTopics] = useState([]);
  const [history, setHistory] = useState([]);

  const { apiKey } = useContext(AppContext);

  useEffect(() => {
    if (!openaiInstance) {
      const openaiInstance = new openai.OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      setOpenaiInstance(openaiInstance);
    }
  }, [openaiInstance, apiKey]);

  const sendMessage = async (prompt, topicMessage = false, messageProcessor = (message) => message) => {
    try {
      const lastMessages = history.length > 0 ? [history[history.length - 1]] : [];
      const userMessages = [...topics, ...lastMessages];
      // .map(message => ({
      //   role: message.role,
      //   content: message.content.substring(
      //     0, Math.max(500, message.content.length)
      //   )
      // }));
      const completion = await sendOpenAIMessage(prompt, 'user', userMessages);

      // add last prompt and response to messages
      setHistory([
        ...history,
        ...[
          { content: prompt, role: 'user' },
          messageProcessor(completion)
        ]
      ]);

      if (topicMessage) {
        setTopics([
          ...topics,
          completion
        ]);
      }
    } catch (error) {
      console.error('Error during OpenAI message:', error);
    }
  };

  const restart = () => {
    setHistory([]);
    setTopics([]);
  }

  const sendOpenAIMessage = async (prompt, role = 'user', contextMessages = []) => {
    setSending(true);

    try {
      const content = { role, content: prompt };

      const response = await openaiInstance.chat.completions.create({
        // engine: 'davinci',
        model: 'gpt-3.5-turbo',
        messages: [...contextMessages, content],
        temperature: 0.7,
        // max_tokens: 150
      });

      setSending(false);

      return response.choices[0].message;
    } catch (error) {
      console.error('Error:', error);
      setSending(false);
      throw error;
    }
  };

  return [sending, history, sendMessage, restart];
}