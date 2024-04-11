import './Main.css';

export default function TopicInput({ handleSubmit }) {
  return (
    <form autoComplete='off' onSubmit={handleSubmit} className='form-container'>
      <input autoComplete="false" className='form-input' type="text" name="message" placeholder="Enter your initial topic..." />
      <button 
        className='submit-button send-button' 
        type="submit">
          Start Learning
      </button>
    </form>
  );
}