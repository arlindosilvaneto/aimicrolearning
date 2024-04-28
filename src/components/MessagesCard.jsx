import Markdown from 'react-markdown';
import './MessagesCard.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { removeStopwords } from 'stopword';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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

const renderers = {
  a({children, href}) {
    return(
      <div className='link-wrapper'>
        <Link to={href}>🔗 {children}</Link>
      </div>
    );
  }
}

export function MessagesCard({ history, onAction}) {
  const navigate = useHistory();

  const messages = history.filter(message => message && message.role !== 'user');

  return (
    <>
      <div className='message-wrapper'>      
        <div className='card-wrapper'>
          {messages.map((message, index) => (
            <div key={index} className='card'>
              <Markdown components={renderers} 
                children={replaceSentences(message.content)} />
            </div>
          ))}
        </div>
      </div>

      <div className='button-bar'>
          <button onClick={() => onAction('drop')}>❌<br/><span>Restart</span></button>
          <button onClick={() => onAction('elaborate')}>🔄<br/><span>Elaborate</span></button>
          <button onClick={() => onAction('topics')}>🔠<br/><span>Topics</span></button>
          <button onClick={() => navigate.push('settings') }>⚙️<br/><span>Settings</span></button>
      </div>
    </>
  );
}
