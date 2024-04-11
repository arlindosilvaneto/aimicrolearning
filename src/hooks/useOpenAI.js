import { useState, useEffect } from 'react';
import { removeStopwords } from 'stopword';

import openai from 'openai';
import { useContext } from 'react';
import { AppContext } from '../App';


export default function useOpenAI() {
  const [openaiInstance, setOpenaiInstance] = useState(null);
  const [sending, setSending] = useState(false);
  const [topics, setTopics] = useState([]);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({});

  const { apiKey } = useContext(AppContext);

  const CONTEXT_LIMIT = 150;

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
      const context = userMessages.map(({ content, role }) => {
        const shortContent = removeStopwords(content.split(' ')).join(' ');

        return {
          content: shortContent.substring(0, CONTEXT_LIMIT),
          role
        }
      });
      const completion = await sendOpenAIMessage(prompt, 'user', context);

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

      if (openaiInstance) {
        const response = await openaiInstance.chat.completions.create({
          // engine: 'davinci',
          model: 'gpt-3.5-turbo',
          messages: [...contextMessages, content],
          temperature: 0.7,
          // max_tokens: 150
        });

        setSending(false);
        setStats({
          ...stats,
          usage: response.usage
        });
        console.table(response.usage);

        return response.choices[0].message;
      }
    } catch (error) {
      console.error('Error:', error);
      setSending(false);
      throw error;
    }
  };

  return { sending, history, sendMessage, restart, stats };
}