import Markdown from 'react-markdown';
import './MessagesCard.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const linkThreshold = 100;

function encodeToURL(text) {
  return encodeURIComponent(text);
}

function replaceSentences(text) {
  return text.replace(/^(\d+\.\s)(.+)$/gm, (match, index, content) => {
    if(content.length <= linkThreshold) {
      return `${index}[${content}](?q=${encodeToURL(content)})`;
    } else {
      return `${index}${content}`;
    }
  });
}

const renderes = {
  a({children, href}) {
    console.log(href)
    return  <Link to={href}>🔗 {children}</Link>
  }
}

export function MessagesCard({ history, onAction}) {
  return (
    <div className='message-wrapper'>
        <div className='card-wrapper'>
          <div className='card'>
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
