import Markdown from 'react-markdown';
import './MessagesCard.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { removeStopwords } from 'stopword';

const QUERY_LIMIT = 150;

function encodeToURL(text) {
  return encodeURIComponent(text);
}

function replaceSentences(text) {
  return text.replace(/^(\d+\.\s)(.+)$/gm, (match, index, content) => {
    const mainTopic = content.split(':')[0];

    if(mainTopic[0] === text) {
      const shortContent = removeStopwords(content.split(' ')).join(' ').substring(0, QUERY_LIMIT);
      
      return `${index}[${content}](?q=${encodeToURL(shortContent)})`;
    } 

    return `${index}[${content}](?q=${encodeToURL(mainTopic)})`;
  });
}

const renderes = {
  a({children, href}) {
    return  <Link to={href}>🔗 {children}</Link>
  }
}

export function MessagesCard({ history, stats, onAction}) {
  const showStats = () => {
    const content = `📊 Stats:\n
    Prompt Tokens: ${stats.usage.prompt_tokens}
    Completion Tokens: ${stats.usage.completion_tokens}
    Total Tokens: ${stats.usage.total_tokens}`;

    window.alert(content);
  }

  return (
    <div className='message-wrapper'>
        <div className='card-wrapper'>
          <div className='card'>
            <a onClick={showStats} className='stats'>ℹ️</a>
            <Markdown components={renderes} 
              children={replaceSentences(history[history.length - 1].content)} />
          </div>
        </div>

        <div className='buttons'>
          <button onClick={() => onAction('drop')}>❌<br/><span>Restart</span></button>
          <button onClick={() => onAction('more')}>🆙<br/><span>More</span></button>
          <button onClick={() => onAction('elaborate')}>🔄<br/><span>Elaborate</span></button>
          <button onClick={() => onAction('topics')}>🔠<br/><span>Topics</span></button>
        </div>
    </div>
  );
}
