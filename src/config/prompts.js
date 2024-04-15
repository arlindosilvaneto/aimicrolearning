// `Lets start from a simple topic about the current subject and continue to learn with small pieces.`;
const startPrompt = `Act as a researcher. Summarize the given topic provided and also give a list of related topics for further research. Be empathetic and confident in your responses. Topic: `

const topicsPrompt = `Please provide a list of at least 5 and no more than 10 subtopics 
where I can go through to learn more about the current subject.`;

const elaboratePrompt = `Elaborate on the current subject and provide more information on it based on your last response.`;

const morePrompt = `Please continue to provide more information on the current subject.`

export default {
  startPrompt,
  topicsPrompt,
  elaboratePrompt,
  morePrompt
};
